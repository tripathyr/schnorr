var P = {};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(P, "__esModule", { value: true });
P.magicBytes = P.magic = P.optional = P.flagged = P.flag = P.bytesFormatted = P.lazy = P.validate = P.apply = P.hex = P.cstring = P.string = P.bytes = P.bool = P.I8 = P.U8 = P.I16BE = P.I16LE = P.U16BE = P.U16LE = P.I32BE = P.I32LE = P.U32BE = P.U32LE = P.int = P.I64BE = P.I64LE = P.U64BE = P.U64LE = P.I128BE = P.I128LE = P.U128BE = P.U128LE = P.I256BE = P.I256LE = P.U256BE = P.U256LE = P.bigint = P.bits = P.coders = P.isCoder = P.wrap = P.checkBounds = P.Writer = P.Reader = P.isBytes = P.concatBytes = P.equalBytes = P.NULL = P.EMPTY = void 0;
P.debug = P.nothing = P.base64armor = P.pointer = P.padRight = P.padLeft = P.ZeroPad = P.bitset = P.mappedTag = P.tag = P.map = P.array = P.prefix = P.tuple = P.struct = P.constant = void 0;
var base = require("@scure/base");
/**
 * TODO:
 * - Holes, simplify pointers. Hole is some sized element which is skipped at encoding,
 *   but later other elements can write to it by path
 * - Composite / tuple keys for dict
 * - Web UI for easier debugging. We can wrap every coder to something that would write
 *   start & end positions to; and we can colorize specific bytes used by specific coder
 */
// Useful default values
P.EMPTY = new Uint8Array(); // Empty bytes array
P.NULL = new Uint8Array([0]); // NULL
function equalBytes(a, b) {
    if (a.length !== b.length)
        return false;
    for (var i = 0; i < a.length; i++)
        if (a[i] !== b[i])
            return false;
    return true;
}
P.equalBytes = equalBytes;
function concatBytes() {
    var arrays = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arrays[_i] = arguments[_i];
    }
    if (arrays.length === 1)
        return arrays[0];
    var length = arrays.reduce(function (a, arr) { return a + arr.length; }, 0);
    var result = new Uint8Array(length);
    for (var i = 0, pad = 0; i < arrays.length; i++) {
        var arr = arrays[i];
        result.set(arr, pad);
        pad += arr.length;
    }
    return result;
}
P.concatBytes = concatBytes;
var isBytes = function (b) { return b instanceof Uint8Array; };
P.isBytes = isBytes;
// Utils
var Reader = /** @class */ (function () {
    function Reader(data, path, fieldPath) {
        if (path === void 0) { path = []; }
        if (fieldPath === void 0) { fieldPath = []; }
        this.data = data;
        this.path = path;
        this.fieldPath = fieldPath;
        this.pos = 0;
        this.hasPtr = false;
        this.bitBuf = 0;
        this.bitPos = 0;
    }
    Reader.prototype.err = function (msg) {
        return new Error("Reader(".concat(this.fieldPath.join('/'), "): ").concat(msg));
    };
    // read bytes by absolute offset
    Reader.prototype.absBytes = function (n) {
        if (n > this.data.length)
            throw new Error('absBytes: Unexpected end of buffer');
        return this.data.subarray(n);
    };
    Reader.prototype.bytes = function (n, peek) {
        if (peek === void 0) { peek = false; }
        if (this.bitPos)
            throw this.err('readBytes: bitPos not empty');
        if (!Number.isFinite(n))
            throw this.err("readBytes: wrong length=".concat(n));
        if (this.pos + n > this.data.length)
            throw this.err('readBytes: Unexpected end of buffer');
        var slice = this.data.subarray(this.pos, this.pos + n);
        if (!peek)
            this.pos += n;
        return slice;
    };
    Reader.prototype.byte = function (peek) {
        if (peek === void 0) { peek = false; }
        if (this.bitPos)
            throw this.err('readByte: bitPos not empty');
        return this.data[peek ? this.pos : this.pos++];
    };
    Object.defineProperty(Reader.prototype, "leftBytes", {
        get: function () {
            return this.data.length - this.pos;
        },
        enumerable: false,
        configurable: true
    });
    Reader.prototype.isEnd = function () {
        return this.pos >= this.data.length && !this.bitPos;
    };
    Reader.prototype.length = function (len) {
        var byteLen;
        if (isCoder(len))
            byteLen = Number(len.decodeStream(this));
        else if (typeof len === 'number')
            byteLen = len;
        else if (typeof len === 'string')
            byteLen = getPath(this.path, len.split('/'));
        if (typeof byteLen === 'bigint')
            byteLen = Number(byteLen);
        if (typeof byteLen !== 'number')
            throw this.err("Wrong length: ".concat(byteLen));
        return byteLen;
    };
    // Note: bits reads in BE (left to right) mode: (0b1000_0000).readBits(1) == 1
    Reader.prototype.bits = function (bits) {
        if (bits > 32)
            throw this.err('BitReader: cannot read more than 32 bits in single call');
        var out = 0;
        while (bits) {
            if (!this.bitPos) {
                this.bitBuf = this.data[this.pos++];
                this.bitPos = 8;
            }
            var take = Math.min(bits, this.bitPos);
            this.bitPos -= take;
            out = (out << take) | ((this.bitBuf >> this.bitPos) & (Math.pow(2, take) - 1));
            this.bitBuf &= Math.pow(2, this.bitPos) - 1;
            bits -= take;
        }
        // Fix signed integers
        return out >>> 0;
    };
    Reader.prototype.find = function (needle, pos) {
        if (pos === void 0) { pos = this.pos; }
        if (!(0, P.isBytes)(needle))
            throw this.err("find: needle is not bytes! ".concat(needle));
        if (this.bitPos)
            throw this.err('findByte: bitPos not empty');
        if (!needle.length)
            throw this.err("find: needle is empty");
        // indexOf should be faster than full equalBytes check
        for (var idx = pos; (idx = this.data.indexOf(needle[0], idx)) !== -1; idx++) {
            if (idx === -1)
                return;
            var leftBytes = this.data.length - idx;
            if (leftBytes < needle.length)
                return;
            if (equalBytes(needle, this.data.subarray(idx, idx + needle.length)))
                return idx;
        }
    };
    Reader.prototype.finish = function () {
        if (this.isEnd() || this.hasPtr)
            return;
        throw this.err("".concat(this.leftBytes, " bytes ").concat(this.bitPos, " bits left after unpack: ").concat(base.hex.encode(this.data.slice(this.pos))));
    };
    Reader.prototype.fieldPathPush = function (s) {
        this.fieldPath.push(s);
    };
    Reader.prototype.fieldPathPop = function () {
        this.fieldPath.pop();
    };
    return Reader;
}());
P.Reader = Reader;
var Writer = /** @class */ (function () {
    function Writer(path, fieldPath) {
        if (path === void 0) { path = []; }
        if (fieldPath === void 0) { fieldPath = []; }
        this.path = path;
        this.fieldPath = fieldPath;
        this.buffers = [];
        this.pos = 0;
        this.ptrs = [];
        this.bitBuf = 0;
        this.bitPos = 0;
    }
    Writer.prototype.err = function (msg) {
        return new Error("Writer(".concat(this.fieldPath.join('/'), "): ").concat(msg));
    };
    Writer.prototype.bytes = function (b) {
        if (this.bitPos)
            throw this.err('writeBytes: ends with non-empty bit buffer');
        this.buffers.push(b);
        this.pos += b.length;
    };
    Writer.prototype.byte = function (b) {
        if (this.bitPos)
            throw this.err('writeByte: ends with non-empty bit buffer');
        this.buffers.push(new Uint8Array([b]));
        this.pos++;
    };
    Object.defineProperty(Writer.prototype, "buffer", {
        get: function () {
            if (this.bitPos)
                throw this.err('buffer: ends with non-empty bit buffer');
            var buf = concatBytes.apply(void 0, this.buffers);
            for (var _i = 0, _a = this.ptrs; _i < _a.length; _i++) {
                var ptr = _a[_i];
                var pos = buf.length;
                buf = concatBytes(buf, ptr.buffer);
                var val = ptr.ptr.encode(pos);
                for (var i = 0; i < val.length; i++)
                    buf[ptr.pos + i] = val[i];
            }
            return buf;
        },
        enumerable: false,
        configurable: true
    });
    Writer.prototype.length = function (len, value) {
        if (len === null)
            return;
        if (isCoder(len))
            return len.encodeStream(this, value);
        var byteLen;
        if (typeof len === 'number')
            byteLen = len;
        else if (typeof len === 'string')
            byteLen = getPath(this.path, len.split('/'));
        if (typeof byteLen === 'bigint')
            byteLen = Number(byteLen);
        if (byteLen === undefined || byteLen !== value)
            throw this.err("Wrong length: ".concat(byteLen, " len=").concat(len, " exp=").concat(value));
    };
    Writer.prototype.bits = function (value, bits) {
        if (bits > 32)
            throw this.err('writeBits: cannot write more than 32 bits in single call');
        if (value >= Math.pow(2, bits))
            throw this.err("writeBits: value (".concat(value, ") >= 2**bits (").concat(bits, ")"));
        while (bits) {
            var take = Math.min(bits, 8 - this.bitPos);
            this.bitBuf = (this.bitBuf << take) | (value >> (bits - take));
            this.bitPos += take;
            bits -= take;
            value &= Math.pow(2, bits) - 1;
            if (this.bitPos === 8) {
                this.bitPos = 0;
                this.buffers.push(new Uint8Array([this.bitBuf]));
                this.pos++;
            }
        }
    };
    Writer.prototype.fieldPathPush = function (s) {
        this.fieldPath.push(s);
    };
    Writer.prototype.fieldPathPop = function () {
        this.fieldPath.pop();
    };
    return Writer;
}());
P.Writer = Writer;
// Immutable LE<->BE
var swap = function (b) { return Uint8Array.from(b).reverse(); };
function checkBounds(p, value, bits, signed) {
    if (signed) {
        // [-(2**(32-1)), 2**(32-1)-1]
        var signBit = Math.pow(2n, (bits - 1n));
        if (value < -signBit || value >= signBit)
            throw p.err('sInt: value out of bounds');
    }
    else {
        // [0, 2**32-1]
        if (0n > value || value >= Math.pow(2n, bits))
            throw p.err('uInt: value out of bounds');
    }
}
P.checkBounds = checkBounds;
// Wrap stream encoder into generic encoder
function wrap(inner) {
    return __assign(__assign({}, inner), { encode: function (value) {
            var w = new Writer();
            inner.encodeStream(w, value);
            return w.buffer;
        }, decode: function (data) {
            var r = new Reader(data);
            var res = inner.decodeStream(r);
            r.finish();
            return res;
        } });
}
P.wrap = wrap;
function getPath(objPath, path) {
    objPath = Array.from(objPath);
    var i = 0;
    for (; i < path.length; i++) {
        if (path[i] === '..')
            objPath.pop();
        else
            break;
    }
    var cur = objPath.pop();
    for (; i < path.length; i++) {
        if (!cur || cur[path[i]] === undefined)
            return undefined;
        cur = cur[path[i]];
    }
    return cur;
}
function isCoder(elm) {
    return (typeof elm.encode === 'function' &&
        typeof elm.encodeStream === 'function' &&
        typeof elm.decode === 'function' &&
        typeof elm.decodeStream === 'function');
}
P.isCoder = isCoder;
// Coders (like in @scure/base) for common operations
// TODO:
// - move to base? very generic converters, not releated to base and packed
// - encode/decode -> from/to? coder->convert?
function dict() {
    return {
        encode: function (from) {
            var to = {};
            for (var _i = 0, from_1 = from; _i < from_1.length; _i++) {
                var _a = from_1[_i], name = _a[0], value = _a[1];
                if (to[name] !== undefined)
                    throw new Error("coders.dict: same key(".concat(name, ") appears twice in struct"));
                to[name] = value;
            }
            return to;
        },
        decode: function (to) { return Object.entries(to); },
    };
}
// Safely converts bigint to number
// Sometimes pointers / tags use u64 or other big numbers which cannot be represented by number,
// but we still can use them since real value will be smaller than u32
var number = {
    encode: function (from) {
        if (from > BigInt(Number.MAX_SAFE_INTEGER))
            throw new Error("coders.number: element bigger than MAX_SAFE_INTEGER=".concat(from));
        return Number(from);
    },
    decode: function (to) { return BigInt(to); },
};
function tsEnum(e) {
    return {
        encode: function (from) { return e[from]; },
        decode: function (to) { return e[to]; },
    };
}
function decimal(precision) {
    var decimalMask = Math.pow(10n, BigInt(precision));
    return {
        encode: function (from) {
            var s = (from < 0n ? -from : from).toString(10);
            var sep = s.length - precision;
            if (sep < 0) {
                s = s.padStart(s.length - sep, '0');
                sep = 0;
            }
            var i = s.length - 1;
            for (; i >= sep && s[i] === '0'; i--)
                ;
            var _a = [s.slice(0, sep), s.slice(sep, i + 1)], int = _a[0], frac = _a[1];
            if (!int)
                int = '0';
            if (from < 0n)
                int = '-' + int;
            if (!frac)
                return int;
            return "".concat(int, ".").concat(frac);
        },
        decode: function (to) {
            var neg = false;
            if (to.startsWith('-')) {
                neg = true;
                to = to.slice(1);
            }
            var sep = to.indexOf('.');
            sep = sep === -1 ? to.length : sep;
            var _a = [to.slice(0, sep), to.slice(sep + 1)], intS = _a[0], fracS = _a[1];
            var int = BigInt(intS) * decimalMask;
            var fracLen = Math.min(fracS.length, precision);
            var frac = BigInt(fracS.slice(0, fracLen)) * Math.pow(10n, BigInt(precision - fracLen));
            var value = int + frac;
            return neg ? -value : value;
        },
    };
}
/**
 * Allows to split big conditional coders into a small one; also sort of parser combinator:
 *
 *   `encode = [Ae, Be]; decode = [Ad, Bd]`
 *   ->
 *   `match([{encode: Ae, decode: Ad}, {encode: Be; decode: Bd}])`
 *
 * 1. It is easier to reason: encode/decode of specific part are closer to each other
 * 2. Allows composable coders and ability to add conditions on runtime
 * @param lst
 * @returns
 */
function match(lst) {
    return {
        encode: function (from) {
            for (var _i = 0, lst_1 = lst; _i < lst_1.length; _i++) {
                var c = lst_1[_i];
                var elm = c.encode(from);
                if (elm !== undefined)
                    return elm;
            }
            throw new Error("match/encode: cannot find match in ".concat(from));
        },
        decode: function (to) {
            for (var _i = 0, lst_2 = lst; _i < lst_2.length; _i++) {
                var c = lst_2[_i];
                var elm = c.decode(to);
                if (elm !== undefined)
                    return elm;
            }
            throw new Error("match/decode: cannot find match in ".concat(to));
        },
    };
}
P.coders = { dict: dict, number: number, tsEnum: tsEnum, decimal: decimal, match: match };
// PackedCoders
var bits = function (len) {
    return wrap({
        encodeStream: function (w, value) { return w.bits(value, len); },
        decodeStream: function (r) { return r.bits(len); },
    });
};
P.bits = bits;
var bigint = function (size, le, signed) {
    if (le === void 0) { le = false; }
    if (signed === void 0) { signed = false; }
    return wrap({
        size: size,
        encodeStream: function (w, value) {
            if (typeof value !== 'number' && typeof value !== 'bigint')
                throw w.err("bigint: invalid value: ".concat(value));
            var _value = BigInt(value);
            var bLen = BigInt(size);
            checkBounds(w, _value, 8n * bLen, !!signed);
            var signBit = Math.pow(2n, (8n * bLen - 1n));
            if (signed && _value < 0)
                _value = _value | signBit;
            var b = [];
            for (var i = 0; i < size; i++) {
                b.push(Number(_value & 255n));
                _value >>= 8n;
            }
            var res = new Uint8Array(b).reverse();
            w.bytes(le ? res.reverse() : res);
        },
        decodeStream: function (r) {
            var bLen = BigInt(size);
            var value = r.bytes(size);
            if (le)
                value = swap(value);
            var b = swap(value);
            var signBit = Math.pow(2n, (8n * bLen - 1n));
            var res = 0n;
            for (var i = 0; i < b.length; i++)
                res |= BigInt(b[i]) << (8n * BigInt(i));
            if (signed && res & signBit)
                res = (res ^ signBit) - signBit;
            checkBounds(r, res, 8n * bLen, !!signed);
            return res;
        },
    });
};
P.bigint = bigint;
P.U256LE = (0, P.bigint)(32, true);
P.U256BE = (0, P.bigint)(32, false);
P.I256LE = (0, P.bigint)(32, true, true);
P.I256BE = (0, P.bigint)(32, false, true);
P.U128LE = (0, P.bigint)(16, true);
P.U128BE = (0, P.bigint)(16, false);
P.I128LE = (0, P.bigint)(16, true, true);
P.I128BE = (0, P.bigint)(16, false, true);
P.U64LE = (0, P.bigint)(8, true);
P.U64BE = (0, P.bigint)(8, false);
P.I64LE = (0, P.bigint)(8, true, true);
P.I64BE = (0, P.bigint)(8, false, true);
var int = function (size, le, signed) {
    if (le === void 0) { le = false; }
    if (signed === void 0) { signed = false; }
    if (size > 6)
        throw new Error('int supports size up to 6 bytes (48 bits), for other use bigint');
    return apply((0, P.bigint)(size, le, signed), P.coders.number);
};
P.int = int;
P.U32LE = (0, P.int)(4, true);
P.U32BE = (0, P.int)(4, false);
P.I32LE = (0, P.int)(4, true, true);
P.I32BE = (0, P.int)(4, false, true);
P.U16LE = (0, P.int)(2, true);
P.U16BE = (0, P.int)(2, false);
P.I16LE = (0, P.int)(2, true, true);
P.I16BE = (0, P.int)(2, false, true);
P.U8 = (0, P.int)(1, false);
P.I8 = (0, P.int)(1, false, true);
P.bool = wrap({
    size: 1,
    encodeStream: function (w, value) { return w.byte(value ? 1 : 0); },
    decodeStream: function (r) {
        var value = r.byte();
        if (value !== 0 && value !== 1)
            throw r.err("bool: invalid value ".concat(value));
        return value === 1;
    },
});
// Can be done w array, but specific implementation should be
// faster: no need to create js array of numbers.
var bytes = function (len, le) {
    if (le === void 0) { le = false; }
    return wrap({
        size: typeof len === 'number' ? len : undefined,
        encodeStream: function (w, value) {
            if (!(0, P.isBytes)(value))
                throw w.err("bytes: invalid value ".concat(value));
            if (!(0, P.isBytes)(len))
                w.length(len, value.length);
            w.bytes(le ? swap(value) : value);
            if ((0, P.isBytes)(len))
                w.bytes(len);
        },
        decodeStream: function (r) {
            var bytes;
            if ((0, P.isBytes)(len)) {
                var tPos = r.find(len);
                if (!tPos)
                    throw r.err("bytes: cannot find terminator");
                bytes = r.bytes(tPos - r.pos);
                r.bytes(len.length);
            }
            else
                bytes = r.bytes(len === null ? r.leftBytes : r.length(len));
            return le ? swap(bytes) : bytes;
        },
    });
};
P.bytes = bytes;
var string = function (len, le) {
    if (le === void 0) { le = false; }
    var inner = (0, P.bytes)(len, le);
    return wrap({
        size: inner.size,
        encodeStream: function (w, value) { return inner.encodeStream(w, base.utf8.decode(value)); },
        decodeStream: function (r) { return base.utf8.encode(inner.decodeStream(r)); },
    });
};
P.string = string;
P.cstring = (0, P.string)(P.NULL);
var hex = function (len, le, withZero) {
    if (le === void 0) { le = false; }
    if (withZero === void 0) { withZero = false; }
    var inner = (0, P.bytes)(len, le);
    return wrap({
        size: inner.size,
        encodeStream: function (w, value) {
            if (withZero && !value.startsWith('0x'))
                throw new Error('hex(withZero=true).encode input should start with 0x');
            var bytes = base.hex.decode(withZero ? value.slice(2) : value);
            return inner.encodeStream(w, bytes);
        },
        decodeStream: function (r) {
            return (withZero ? '0x' : '') + base.hex.encode(inner.decodeStream(r));
        },
    });
};
P.hex = hex;
// Interoperability with base
function apply(inner, b) {
    if (!isCoder(inner))
        throw new Error("apply: invalid inner value ".concat(inner));
    return wrap({
        size: inner.size,
        encodeStream: function (w, value) {
            var innerValue;
            try {
                innerValue = b.decode(value);
            }
            catch (e) {
                throw w.err('' + e);
            }
            return inner.encodeStream(w, innerValue);
        },
        decodeStream: function (r) {
            var innerValue = inner.decodeStream(r);
            try {
                return b.encode(innerValue);
            }
            catch (e) {
                throw r.err('' + e);
            }
        },
    });
}
P.apply = apply;
// Additional check of values both on encode and decode steps.
// E.g. to force uint32 to be 1..10
function validate(inner, fn) {
    if (!isCoder(inner))
        throw new Error("validate: invalid inner value ".concat(inner));
    return wrap({
        size: inner.size,
        encodeStream: function (w, value) { return inner.encodeStream(w, fn(value)); },
        decodeStream: function (r) { return fn(inner.decodeStream(r)); },
    });
}
P.validate = validate;
function lazy(fn) {
    return wrap({
        encodeStream: function (w, value) { return fn().encodeStream(w, value); },
        decodeStream: function (r) { return fn().decodeStream(r); },
    });
}
P.lazy = lazy;
var bytesFormatted = function (len, fmt, le) {
    if (le === void 0) { le = false; }
    var inner = (0, P.bytes)(len, le);
    return wrap({
        size: inner.size,
        encodeStream: function (w, value) { return inner.encodeStream(w, base.bytes(fmt, value)); },
        decodeStream: function (r) { return base.str(fmt, inner.decodeStream(r)); },
    });
};
P.bytesFormatted = bytesFormatted;
// Returns true if some marker exists, otherwise false. Xor argument flips behaviour
var flag = function (flagValue, xor) {
    if (xor === void 0) { xor = false; }
    return wrap({
        size: flagValue.length,
        encodeStream: function (w, value) {
            if (!!value !== xor)
                w.bytes(flagValue);
        },
        decodeStream: function (r) {
            var hasFlag = r.leftBytes >= flagValue.length;
            if (hasFlag) {
                hasFlag = equalBytes(r.bytes(flagValue.length, true), flagValue);
                // Found flag, advance cursor position
                if (hasFlag)
                    r.bytes(flagValue.length);
            }
            // hasFlag ^ xor
            return hasFlag !== xor;
        },
    });
};
P.flag = flag;
// Decode/encode only if flag found
function flagged(path, inner, def) {
    if (!isCoder(inner))
        throw new Error("flagged: invalid inner value ".concat(inner));
    return wrap({
        encodeStream: function (w, value) {
            if (typeof path === 'string') {
                if (getPath(w.path, path.split('/')))
                    inner.encodeStream(w, value);
                else if (def)
                    inner.encodeStream(w, def);
            }
            else {
                path.encodeStream(w, !!value);
                if (!!value)
                    inner.encodeStream(w, value);
                else if (def)
                    inner.encodeStream(w, def);
            }
        },
        decodeStream: function (r) {
            var hasFlag = false;
            if (typeof path === 'string')
                hasFlag = getPath(r.path, path.split('/'));
            else
                hasFlag = path.decodeStream(r);
            // If there is a flag -- decode and return value
            if (hasFlag)
                return inner.decodeStream(r);
            else if (def)
                inner.decodeStream(r);
        },
    });
}
P.flagged = flagged;
function optional(flag, inner, def) {
    if (!isCoder(flag) || !isCoder(inner))
        throw new Error("optional: invalid flag or inner value flag=".concat(flag, " inner=").concat(inner));
    return wrap({
        size: def !== undefined && flag.size && inner.size ? flag.size + inner.size : undefined,
        encodeStream: function (w, value) {
            flag.encodeStream(w, !!value);
            if (value)
                inner.encodeStream(w, value);
            else if (def !== undefined)
                inner.encodeStream(w, def);
        },
        decodeStream: function (r) {
            if (flag.decodeStream(r))
                return inner.decodeStream(r);
            else if (def !== undefined)
                inner.decodeStream(r);
        },
    });
}
P.optional = optional;
function magic(inner, constant, check) {
    if (check === void 0) { check = true; }
    if (!isCoder(inner))
        throw new Error("flagged: invalid inner value ".concat(inner));
    return wrap({
        size: inner.size,
        encodeStream: function (w, value) { return inner.encodeStream(w, constant); },
        decodeStream: function (r) {
            var value = inner.decodeStream(r);
            if ((check && typeof value !== 'object' && value !== constant) ||
                ((0, P.isBytes)(constant) && !equalBytes(constant, value))) {
                throw r.err("magic: invalid value: ".concat(value, " !== ").concat(constant));
            }
            return;
        },
    });
}
P.magic = magic;
var magicBytes = function (constant) {
    var c = typeof constant === 'string' ? base.utf8.decode(constant) : constant;
    return magic((0, P.bytes)(c.length), c);
};
P.magicBytes = magicBytes;
function constant(c) {
    return wrap({
        encodeStream: function (w, value) {
            if (value !== c)
                throw new Error("constant: invalid value ".concat(value, " (exp: ").concat(c, ")"));
        },
        decodeStream: function (r) { return c; },
    });
}
P.constant = constant;
function sizeof(fields) {
    var size = 0;
    for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
        var f = fields_1[_i];
        if (!f.size)
            return;
        size += f.size;
    }
    return size;
}
function struct(fields) {
    if (Array.isArray(fields))
        throw new Error('Packed.Struct: got array instead of object');
    return wrap({
        size: sizeof(Object.values(fields)),
        encodeStream: function (w, value) {
            if (typeof value !== 'object' || value === null)
                throw w.err("struct: invalid value ".concat(value));
            w.path.push(value);
            for (var name in fields) {
                w.fieldPathPush(name);
                var field = fields[name];
                field.encodeStream(w, value[name]);
                w.fieldPathPop();
            }
            w.path.pop();
        },
        decodeStream: function (r) {
            var res = {};
            r.path.push(res);
            for (var name in fields) {
                r.fieldPathPush(name);
                res[name] = fields[name].decodeStream(r);
                r.fieldPathPop();
            }
            r.path.pop();
            return res;
        },
    });
}
P.struct = struct;
function tuple(fields) {
    if (!Array.isArray(fields))
        throw new Error("Packed.Tuple: got ".concat(typeof fields, " instead of array"));
    return wrap({
        size: sizeof(fields),
        encodeStream: function (w, value) {
            if (!Array.isArray(value))
                throw w.err("tuple: invalid value ".concat(value));
            w.path.push(value);
            for (var i = 0; i < fields.length; i++) {
                w.fieldPathPush('' + i);
                fields[i].encodeStream(w, value[i]);
                w.fieldPathPop();
            }
            w.path.pop();
        },
        decodeStream: function (r) {
            var res = [];
            r.path.push(res);
            for (var i = 0; i < fields.length; i++) {
                r.fieldPathPush('' + i);
                res.push(fields[i].decodeStream(r));
                r.fieldPathPop();
            }
            r.path.pop();
            return res;
        },
    });
}
P.tuple = tuple;
function prefix(len, inner) {
    if (!isCoder(inner))
        throw new Error("prefix: invalid inner value ".concat(inner));
    if ((0, P.isBytes)(len))
        throw new Error("prefix: len cannot be Uint8Array");
    var b = (0, P.bytes)(len);
    return wrap({
        size: typeof len === 'number' ? len : undefined,
        encodeStream: function (w, value) {
            var wChild = new Writer(w.path, w.fieldPath);
            inner.encodeStream(wChild, value);
            b.encodeStream(w, wChild.buffer);
        },
        decodeStream: function (r) {
            var data = b.decodeStream(r);
            return inner.decodeStream(new Reader(data, r.path, r.fieldPath));
        },
    });
}
P.prefix = prefix;
function array(len, inner) {
    if (!isCoder(inner))
        throw new Error("array: invalid inner value ".concat(inner));
    return wrap({
        size: typeof len === 'number' && inner.size ? len * inner.size : undefined,
        encodeStream: function (w, value) {
            if (!Array.isArray(value))
                throw w.err("array: invalid value ".concat(value));
            if (!(0, P.isBytes)(len))
                w.length(len, value.length);
            w.path.push(value);
            for (var i = 0; i < value.length; i++) {
                w.fieldPathPush('' + i);
                var elm = value[i];
                var startPos = w.pos;
                inner.encodeStream(w, elm);
                if ((0, P.isBytes)(len)) {
                    // Terminator is bigger than elm size, so skip
                    if (len.length > w.pos - startPos)
                        continue;
                    var data = w.buffer.subarray(startPos, w.pos);
                    // There is still possible case when multiple elements create terminator,
                    // but it is hard to catch here, will be very slow
                    if (equalBytes(data.subarray(0, len.length), len))
                        throw w.err("array: inner element encoding same as separator. elm=".concat(elm, " data=").concat(data));
                }
                w.fieldPathPop();
            }
            w.path.pop();
            if ((0, P.isBytes)(len))
                w.bytes(len);
        },
        decodeStream: function (r) {
            var res = [];
            if (len === null) {
                var i = 0;
                r.path.push(res);
                while (!r.isEnd()) {
                    r.fieldPathPush('' + i++);
                    res.push(inner.decodeStream(r));
                    r.fieldPathPop();
                    if (inner.size && r.leftBytes < inner.size)
                        break;
                }
                r.path.pop();
            }
            else if ((0, P.isBytes)(len)) {
                var i = 0;
                r.path.push(res);
                while (true) {
                    if (equalBytes(r.bytes(len.length, true), len)) {
                        // Advance cursor position if terminator found
                        r.bytes(len.length);
                        break;
                    }
                    r.fieldPathPush('' + i++);
                    res.push(inner.decodeStream(r));
                    r.fieldPathPop();
                }
                r.path.pop();
            }
            else {
                r.fieldPathPush('arrayLen');
                var length = r.length(len);
                r.fieldPathPop();
                r.path.push(res);
                for (var i = 0; i < length; i++) {
                    r.fieldPathPush('' + i);
                    res.push(inner.decodeStream(r));
                    r.fieldPathPop();
                }
                r.path.pop();
            }
            return res;
        },
    });
}
P.array = array;
function map(inner, variants) {
    if (!isCoder(inner))
        throw new Error("map: invalid inner value ".concat(inner));
    var variantNames = new Map();
    for (var k in variants)
        variantNames.set(variants[k], k);
    return wrap({
        size: inner.size,
        encodeStream: function (w, value) {
            if (typeof value !== 'string')
                throw w.err("map: invalid value ".concat(value));
            if (!(value in variants))
                throw w.err("Map: unknown variant: ".concat(value));
            inner.encodeStream(w, variants[value]);
        },
        decodeStream: function (r) {
            var variant = inner.decodeStream(r);
            var name = variantNames.get(variant);
            if (name === undefined)
                throw r.err("Enum: unknown value: ".concat(variant, " ").concat(Array.from(variantNames.keys())));
            return name;
        },
    });
}
P.map = map;
function tag(tag, variants) {
    if (!isCoder(tag))
        throw new Error("tag: invalid tag value ".concat(tag));
    return wrap({
        size: tag.size,
        encodeStream: function (w, value) {
            var TAG = value.TAG, data = value.data;
            var dataType = variants[TAG];
            if (!dataType)
                throw w.err("Tag: invalid tag ".concat(TAG.toString()));
            tag.encodeStream(w, TAG);
            dataType.encodeStream(w, data);
        },
        decodeStream: function (r) {
            var TAG = tag.decodeStream(r);
            var dataType = variants[TAG];
            if (!dataType)
                throw r.err("Tag: invalid tag ".concat(TAG));
            return { TAG: TAG, data: dataType.decodeStream(r) };
        },
    });
}
P.tag = tag;
// Takes {name: [value, coder]}
function mappedTag(tagCoder, variants) {
    if (!isCoder(tagCoder))
        throw new Error("mappedTag: invalid tag value ".concat(tag));
    var mapValue = {};
    var tagValue = {};
    for (var key in variants) {
        mapValue[key] = variants[key][0];
        tagValue[key] = variants[key][1];
    }
    return tag(map(tagCoder, mapValue), tagValue);
}
P.mappedTag = mappedTag;
function bitset(names, pad) {
    if (pad === void 0) { pad = false; }
    return wrap({
        encodeStream: function (w, value) {
            if (typeof value !== 'object' || value === null)
                throw w.err("bitset: invalid value ".concat(value));
            for (var i = 0; i < names.length; i++)
                w.bits(+value[names[i]], 1);
            if (pad && names.length % 8)
                w.bits(0, 8 - (names.length % 8));
        },
        decodeStream: function (r) {
            var out = {};
            for (var i = 0; i < names.length; i++)
                out[names[i]] = !!r.bits(1);
            if (pad && names.length % 8)
                r.bits(8 - (names.length % 8));
            return out;
        },
    });
}
P.bitset = bitset;
var ZeroPad = function (_) { return 0; };
P.ZeroPad = ZeroPad;
function padLength(blockSize, len) {
    if (len % blockSize === 0)
        return 0;
    return blockSize - (len % blockSize);
}
function padLeft(blockSize, inner, padFn) {
    if (!isCoder(inner))
        throw new Error("padLeft: invalid inner value ".concat(inner));
    var _padFn = padFn || P.ZeroPad;
    if (!inner.size)
        throw new Error('padLeft with dynamic size argument is impossible');
    return wrap({
        size: inner.size + padLength(blockSize, inner.size),
        encodeStream: function (w, value) {
            var padBytes = padLength(blockSize, inner.size);
            for (var i = 0; i < padBytes; i++)
                w.byte(_padFn(i));
            inner.encodeStream(w, value);
        },
        decodeStream: function (r) {
            r.bytes(padLength(blockSize, inner.size));
            return inner.decodeStream(r);
        },
    });
}
P.padLeft = padLeft;
function padRight(blockSize, inner, padFn) {
    if (!isCoder(inner))
        throw new Error("padRight: invalid inner value ".concat(inner));
    var _padFn = padFn || P.ZeroPad;
    return wrap({
        size: inner.size ? inner.size + padLength(blockSize, inner.size) : undefined,
        encodeStream: function (w, value) {
            var pos = w.pos;
            inner.encodeStream(w, value);
            var padBytes = padLength(blockSize, w.pos - pos);
            for (var i = 0; i < padBytes; i++)
                w.byte(_padFn(i));
        },
        decodeStream: function (r) {
            var start = r.pos;
            var res = inner.decodeStream(r);
            r.bytes(padLength(blockSize, r.pos - start));
            return res;
        },
    });
}
P.padRight = padRight;
function pointer(ptr, inner, sized) {
    if (sized === void 0) { sized = false; }
    if (!isCoder(ptr))
        throw new Error("pointer: invalid ptr value ".concat(ptr));
    if (!isCoder(inner))
        throw new Error("pointer: invalid inner value ".concat(inner));
    if (!ptr.size)
        throw new Error('Pointer: unsized ptr');
    return wrap({
        size: sized ? ptr.size : undefined,
        encodeStream: function (w, value) {
            var start = w.pos;
            ptr.encodeStream(w, 0);
            w.ptrs.push({ pos: start, ptr: ptr, buffer: inner.encode(value) });
        },
        decodeStream: function (r) {
            var ptrVal = ptr.decodeStream(r);
            // This check enforces termination of parser, if there is backwards pointers,
            // then it is possible to create loop and cause DoS.
            if (ptrVal < r.pos)
                throw new Error('pointer.decodeStream pointer less than position');
            r.hasPtr = true;
            var rChild = new Reader(r.absBytes(ptrVal), r.path, r.fieldPath);
            return inner.decodeStream(rChild);
        },
    });
}
P.pointer = pointer;
// lineLen: gpg=64, ssh=70
function base64armor(name, lineLen, inner, checksum) {
    var markBegin = "-----BEGIN ".concat(name.toUpperCase(), "-----");
    var markEnd = "-----END ".concat(name.toUpperCase(), "-----");
    return {
        encode: function (value) {
            var data = inner.encode(value);
            var encoded = base.base64.encode(data);
            var lines = [];
            for (var i = 0; i < encoded.length; i += lineLen) {
                var s = encoded.slice(i, i + lineLen);
                if (s.length)
                    lines.push("".concat(encoded.slice(i, i + lineLen), "\n"));
            }
            var body = lines.join('');
            if (checksum)
                body += "=".concat(base.base64.encode(checksum(data)), "\n");
            return "".concat(markBegin, "\n\n").concat(body).concat(markEnd, "\n");
        },
        decode: function (s) {
            var lines = s.replace(markBegin, '').replace(markEnd, '').trim().split('\n');
            lines = lines.map(function (l) { return l.replace('\r', '').trim(); });
            if (checksum && lines[lines.length - 1].startsWith('=')) {
                var body = base.base64.decode(lines.slice(0, -1).join(''));
                var cs = lines[lines.length - 1].slice(1);
                var realCS = base.base64.encode(checksum(body));
                if (realCS !== cs)
                    throw new Error("Base64Armor: invalid checksum ".concat(cs, " instead of ").concat(realCS));
                return inner.decode(body);
            }
            return inner.decode(base.base64.decode(lines.join('')));
        },
    };
}
P.base64armor = base64armor;
// Does nothing at all
P.nothing = magic((0, P.bytes)(0), P.EMPTY);
function debug(inner) {
    if (!isCoder(inner))
        throw new Error("debug: invalid inner value ".concat(inner));
    var log = function (name, rw, value) {
        console.log("DEBUG/".concat(name, "(").concat(rw.fieldPath.join('/'), "):"), { type: typeof value, value: value });
        return value;
    };
    return wrap({
        size: inner.size,
        encodeStream: function (w, value) { return inner.encodeStream(w, log('encode', w, value)); },
        decodeStream: function (r) { return log('decode', r, inner.decodeStream(r)); },
    });
}
P.debug = debug;
