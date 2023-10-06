"use strict";
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = exports.tapLeafHash = exports.TAP_LEAF_VERSION = exports._sortPubkeys = exports.SigHashCoder = exports.SignatureHash = exports.Address = exports.WIF = exports.parseWitnessProgram = exports.programToWitness = exports.OutScript = exports.p2tr_ms = exports.p2tr_pk = exports.p2tr_ns = exports.combinations = exports.p2tr = exports.TAPROOT_UNSPENDABLE_KEY = exports.taprootListToTree = exports.p2ms = exports.p2wpkh = exports.p2wsh = exports.p2sh = exports.p2pkh = exports.p2pk = exports.RawPSBTV2 = exports.RawPSBTV0 = exports._DebugPSBT = exports._RawPSBTV2 = exports._RawPSBTV0 = exports.TaprootControlBlock = exports.RawTx = exports.RawWitness = exports.RawOutput = exports.RawInput = exports.VarBytes = exports.BTCArray = exports.CompactSize = exports.Script = exports.OPNum = exports.OP = exports.cmp = exports.Decimal = exports.DEFAULT_SEQUENCE = exports.DEFAULT_LOCKTIME = exports.DEFAULT_VERSION = exports.PRECISION = exports.NETWORK = exports.taprootTweakPubkey = exports.taprootTweakPrivKey = exports.base58check = void 0;
exports.PSBTCombine = exports.bip32Path = exports.sortedMultisig = exports.multisig = exports.getAddress = void 0;
/*! micro-btc-signer - MIT License (c) 2022 Paul Miller (paulmillr.com) */
var secp = require("@noble/secp256k1");
var base = require("@scure/base");
var sha256_1 = require("@noble/hashes/sha256");
var hmac_1 = require("@noble/hashes/hmac");
var ripemd160_1 = require("@noble/hashes/ripemd160");
var P = require("micro-packed");
var hash160 = function (msg) { return (0, ripemd160_1.ripemd160)((0, sha256_1.sha256)(msg)); };
var sha256x2 = function () {
    var msgs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        msgs[_i] = arguments[_i];
    }
    return (0, sha256_1.sha256)((0, sha256_1.sha256)(concat.apply(void 0, msgs)));
};
var concat = P.concatBytes;
// Make base58check work
exports.base58check = base.base58check(sha256_1.sha256);
// Enable sync API for noble-secp256k1
secp.utils.hmacSha256Sync = function (key) {
    var msgs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        msgs[_i - 1] = arguments[_i];
    }
    return (0, hmac_1.hmac)(sha256_1.sha256, key, concat.apply(void 0, msgs));
};
secp.utils.sha256Sync = function () {
    var msgs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        msgs[_i] = arguments[_i];
    }
    return (0, sha256_1.sha256)(concat.apply(void 0, msgs));
};
var taggedHash = secp.utils.taggedHashSync;
var PubT;
(function (PubT) {
    PubT[PubT["ecdsa"] = 0] = "ecdsa";
    PubT[PubT["schnorr"] = 1] = "schnorr";
})(PubT || (PubT = {}));
var validatePubkey = function (pub, type) {
    var len = pub.length;
    if (type === PubT.ecdsa) {
        if (len === 32)
            throw new Error('Expected non-Schnorr key');
    }
    else if (type === PubT.schnorr) {
        if (len !== 32)
            throw new Error('Expected 32-byte Schnorr key');
    }
    else {
        throw new Error('Unknown key type');
    }
    secp.Point.fromHex(pub); // does assertValidity
    return pub;
};
function isValidPubkey(pub, type) {
    try {
        return !!validatePubkey(pub, type);
    }
    catch (e) {
        return false;
    }
}
// Not best way, but closest to bitcoin implementation (easier to check)
var hasLowR = function (sig) { return secp.Signature.fromHex(sig).toCompactRawBytes()[0] < 0x80; };
// TODO: move to @noble/secp256k1?
function signECDSA(hash, privateKey, lowR) {
    if (lowR === void 0) { lowR = false; }
    var sig = secp.signSync(hash, privateKey, { canonical: true });
    if (lowR && !hasLowR(sig)) {
        var extraEntropy = new Uint8Array(32);
        for (var cnt = 0; cnt < Number.MAX_SAFE_INTEGER; cnt++) {
            extraEntropy.set(P.U32LE.encode(cnt));
            sig = secp.signSync(hash, privateKey, { canonical: true, extraEntropy: extraEntropy });
            if (hasLowR(sig))
                break;
        }
    }
    return sig;
}
function taprootTweakPrivKey(privKey, merkleRoot) {
    if (merkleRoot === void 0) { merkleRoot = new Uint8Array(); }
    var n = secp.CURVE.n;
    var priv = secp.utils._normalizePrivateKey(privKey);
    var point = secp.Point.fromPrivateKey(priv);
    var tweak = taggedHash('TapTweak', point.toRawX(), merkleRoot);
    var privWithProperY = point.hasEvenY() ? priv : n - priv;
    var tweaked = secp.utils.mod(privWithProperY + secp.utils._normalizePrivateKey(tweak), n);
    return secp.utils._bigintTo32Bytes(tweaked);
}
exports.taprootTweakPrivKey = taprootTweakPrivKey;
function taprootTweakPubkey(pubKey, h) {
    var tweak = taggedHash('TapTweak', pubKey, h);
    var tweaked = secp.Point.fromHex(pubKey).add(secp.Point.fromPrivateKey(tweak));
    return [tweaked.toRawX(), !tweaked.hasEvenY()];
}
exports.taprootTweakPubkey = taprootTweakPubkey;
// Can be 33 or 64 bytes
var PubKeyECDSA = P.validate(P.bytes(null), function (pub) { return validatePubkey(pub, PubT.ecdsa); });
var PubKeySchnorr = P.validate(P.bytes(32), function (pub) { return validatePubkey(pub, PubT.schnorr); });
var SignatureSchnorr = P.validate(P.bytes(null), function (sig) {
    if (sig.length !== 64 && sig.length !== 65)
        throw new Error('Schnorr signature should be 64 or 65 bytes long');
    return sig;
});
function uniqPubkey(pubkeys) {
    var map = {};
    for (var _i = 0, pubkeys_1 = pubkeys; _i < pubkeys_1.length; _i++) {
        var pub = pubkeys_1[_i];
        var key = base.hex.encode(pub);
        if (map[key])
            throw new Error("Multisig: non-uniq pubkey: ".concat(pubkeys.map(base.hex.encode)));
        map[key] = true;
    }
}
exports.NETWORK = {
    bech32: 'bc',
    pubKeyHash: 0x00,
    scriptHash: 0x05,
    wif: 0x80,
};
exports.PRECISION = 8;
exports.DEFAULT_VERSION = 2;
exports.DEFAULT_LOCKTIME = 0;
exports.DEFAULT_SEQUENCE = 4294967295;
var EMPTY32 = new Uint8Array(32);
// Utils
exports.Decimal = P.coders.decimal(exports.PRECISION);
function cmp(a, b) {
    if (a instanceof Uint8Array && b instanceof Uint8Array) {
        // -1 -> a<b, 0 -> a==b, 1 -> a>b
        var len = Math.min(a.length, b.length);
        for (var i = 0; i < len; i++)
            if (a[i] != b[i])
                return Math.sign(a[i] - b[i]);
        return Math.sign(a.length - b.length);
    }
    else if (a instanceof Uint8Array || b instanceof Uint8Array)
        throw new Error("cmp: wrong values a=".concat(a, " b=").concat(b));
    if ((typeof a === 'bigint' && typeof b === 'number') ||
        (typeof a === 'number' && typeof b === 'bigint')) {
        a = BigInt(a);
        b = BigInt(b);
    }
    if (a === undefined || b === undefined)
        throw new Error("cmp: wrong values a=".concat(a, " b=").concat(b));
    // Default js comparasion
    return Number(a > b) - Number(a < b);
}
exports.cmp = cmp;
// Coders
// prettier-ignore
var OP;
(function (OP) {
    OP[OP["OP_0"] = 0] = "OP_0";
    OP[OP["PUSHDATA1"] = 76] = "PUSHDATA1";
    OP[OP["PUSHDATA2"] = 77] = "PUSHDATA2";
    OP[OP["PUSHDATA4"] = 78] = "PUSHDATA4";
    OP[OP["1NEGATE"] = 79] = "1NEGATE";
    OP[OP["RESERVED"] = 80] = "RESERVED";
    OP[OP["OP_1"] = 81] = "OP_1";
    OP[OP["OP_2"] = 82] = "OP_2";
    OP[OP["OP_3"] = 83] = "OP_3";
    OP[OP["OP_4"] = 84] = "OP_4";
    OP[OP["OP_5"] = 85] = "OP_5";
    OP[OP["OP_6"] = 86] = "OP_6";
    OP[OP["OP_7"] = 87] = "OP_7";
    OP[OP["OP_8"] = 88] = "OP_8";
    OP[OP["OP_9"] = 89] = "OP_9";
    OP[OP["OP_10"] = 90] = "OP_10";
    OP[OP["OP_11"] = 91] = "OP_11";
    OP[OP["OP_12"] = 92] = "OP_12";
    OP[OP["OP_13"] = 93] = "OP_13";
    OP[OP["OP_14"] = 94] = "OP_14";
    OP[OP["OP_15"] = 95] = "OP_15";
    OP[OP["OP_16"] = 96] = "OP_16";
    // Control
    OP[OP["NOP"] = 97] = "NOP";
    OP[OP["VER"] = 98] = "VER";
    OP[OP["IF"] = 99] = "IF";
    OP[OP["NOTIF"] = 100] = "NOTIF";
    OP[OP["VERIF"] = 101] = "VERIF";
    OP[OP["VERNOTIF"] = 102] = "VERNOTIF";
    OP[OP["ELSE"] = 103] = "ELSE";
    OP[OP["ENDIF"] = 104] = "ENDIF";
    OP[OP["VERIFY"] = 105] = "VERIFY";
    OP[OP["RETURN"] = 106] = "RETURN";
    // Stack
    OP[OP["TOALTSTACK"] = 107] = "TOALTSTACK";
    OP[OP["FROMALTSTACK"] = 108] = "FROMALTSTACK";
    OP[OP["2DROP"] = 109] = "2DROP";
    OP[OP["2DUP"] = 110] = "2DUP";
    OP[OP["3DUP"] = 111] = "3DUP";
    OP[OP["2OVER"] = 112] = "2OVER";
    OP[OP["2ROT"] = 113] = "2ROT";
    OP[OP["2SWAP"] = 114] = "2SWAP";
    OP[OP["IFDUP"] = 115] = "IFDUP";
    OP[OP["DEPTH"] = 116] = "DEPTH";
    OP[OP["DROP"] = 117] = "DROP";
    OP[OP["DUP"] = 118] = "DUP";
    OP[OP["NIP"] = 119] = "NIP";
    OP[OP["OVER"] = 120] = "OVER";
    OP[OP["PICK"] = 121] = "PICK";
    OP[OP["ROLL"] = 122] = "ROLL";
    OP[OP["ROT"] = 123] = "ROT";
    OP[OP["SWAP"] = 124] = "SWAP";
    OP[OP["TUCK"] = 125] = "TUCK";
    // Splice
    OP[OP["CAT"] = 126] = "CAT";
    OP[OP["SUBSTR"] = 127] = "SUBSTR";
    OP[OP["LEFT"] = 128] = "LEFT";
    OP[OP["RIGHT"] = 129] = "RIGHT";
    OP[OP["SIZE"] = 130] = "SIZE";
    // Boolean logic
    OP[OP["INVERT"] = 131] = "INVERT";
    OP[OP["AND"] = 132] = "AND";
    OP[OP["OR"] = 133] = "OR";
    OP[OP["XOR"] = 134] = "XOR";
    OP[OP["EQUAL"] = 135] = "EQUAL";
    OP[OP["EQUALVERIFY"] = 136] = "EQUALVERIFY";
    OP[OP["RESERVED1"] = 137] = "RESERVED1";
    OP[OP["RESERVED2"] = 138] = "RESERVED2";
    // Numbers
    OP[OP["1ADD"] = 139] = "1ADD";
    OP[OP["1SUB"] = 140] = "1SUB";
    OP[OP["2MUL"] = 141] = "2MUL";
    OP[OP["2DIV"] = 142] = "2DIV";
    OP[OP["NEGATE"] = 143] = "NEGATE";
    OP[OP["ABS"] = 144] = "ABS";
    OP[OP["NOT"] = 145] = "NOT";
    OP[OP["0NOTEQUAL"] = 146] = "0NOTEQUAL";
    OP[OP["ADD"] = 147] = "ADD";
    OP[OP["SUB"] = 148] = "SUB";
    OP[OP["MUL"] = 149] = "MUL";
    OP[OP["DIV"] = 150] = "DIV";
    OP[OP["MOD"] = 151] = "MOD";
    OP[OP["LSHIFT"] = 152] = "LSHIFT";
    OP[OP["RSHIFT"] = 153] = "RSHIFT";
    OP[OP["BOOLAND"] = 154] = "BOOLAND";
    OP[OP["BOOLOR"] = 155] = "BOOLOR";
    OP[OP["NUMEQUAL"] = 156] = "NUMEQUAL";
    OP[OP["NUMEQUALVERIFY"] = 157] = "NUMEQUALVERIFY";
    OP[OP["NUMNOTEQUAL"] = 158] = "NUMNOTEQUAL";
    OP[OP["LESSTHAN"] = 159] = "LESSTHAN";
    OP[OP["GREATERTHAN"] = 160] = "GREATERTHAN";
    OP[OP["LESSTHANOREQUAL"] = 161] = "LESSTHANOREQUAL";
    OP[OP["GREATERTHANOREQUAL"] = 162] = "GREATERTHANOREQUAL";
    OP[OP["MIN"] = 163] = "MIN";
    OP[OP["MAX"] = 164] = "MAX";
    OP[OP["WITHIN"] = 165] = "WITHIN";
    // Crypto
    OP[OP["RIPEMD160"] = 166] = "RIPEMD160";
    OP[OP["SHA1"] = 167] = "SHA1";
    OP[OP["SHA256"] = 168] = "SHA256";
    OP[OP["HASH160"] = 169] = "HASH160";
    OP[OP["HASH256"] = 170] = "HASH256";
    OP[OP["CODESEPARATOR"] = 171] = "CODESEPARATOR";
    OP[OP["CHECKSIG"] = 172] = "CHECKSIG";
    OP[OP["CHECKSIGVERIFY"] = 173] = "CHECKSIGVERIFY";
    OP[OP["CHECKMULTISIG"] = 174] = "CHECKMULTISIG";
    OP[OP["CHECKMULTISIGVERIFY"] = 175] = "CHECKMULTISIGVERIFY";
    // Expansion
    OP[OP["NOP1"] = 176] = "NOP1";
    OP[OP["CHECKLOCKTIMEVERIFY"] = 177] = "CHECKLOCKTIMEVERIFY";
    OP[OP["CHECKSEQUENCEVERIFY"] = 178] = "CHECKSEQUENCEVERIFY";
    OP[OP["NOP4"] = 179] = "NOP4";
    OP[OP["NOP5"] = 180] = "NOP5";
    OP[OP["NOP6"] = 181] = "NOP6";
    OP[OP["NOP7"] = 182] = "NOP7";
    OP[OP["NOP8"] = 183] = "NOP8";
    OP[OP["NOP9"] = 184] = "NOP9";
    OP[OP["NOP10"] = 185] = "NOP10";
    // BIP 342
    OP[OP["CHECKSIGADD"] = 186] = "CHECKSIGADD";
    // Invalid
    OP[OP["INVALID"] = 255] = "INVALID";
})(OP = exports.OP || (exports.OP = {}));
// OP_\n to numeric value
// TODO: maybe add numbers to script parser for this case?
// prettier-ignore
var OPNum;
(function (OPNum) {
    OPNum[OPNum["OP_0"] = 0] = "OP_0";
    OPNum[OPNum["OP_1"] = 1] = "OP_1";
    OPNum[OPNum["OP_2"] = 2] = "OP_2";
    OPNum[OPNum["OP_3"] = 3] = "OP_3";
    OPNum[OPNum["OP_4"] = 4] = "OP_4";
    OPNum[OPNum["OP_5"] = 5] = "OP_5";
    OPNum[OPNum["OP_6"] = 6] = "OP_6";
    OPNum[OPNum["OP_7"] = 7] = "OP_7";
    OPNum[OPNum["OP_8"] = 8] = "OP_8";
    OPNum[OPNum["OP_9"] = 9] = "OP_9";
    OPNum[OPNum["OP_10"] = 10] = "OP_10";
    OPNum[OPNum["OP_11"] = 11] = "OP_11";
    OPNum[OPNum["OP_12"] = 12] = "OP_12";
    OPNum[OPNum["OP_13"] = 13] = "OP_13";
    OPNum[OPNum["OP_14"] = 14] = "OP_14";
    OPNum[OPNum["OP_15"] = 15] = "OP_15";
    OPNum[OPNum["OP_16"] = 16] = "OP_16";
})(OPNum = exports.OPNum || (exports.OPNum = {}));
function OPtoNumber(op) {
    if (typeof op === 'string' && OP[op] !== undefined && OPNum[op] !== undefined)
        return OPNum[op];
}
// Converts script bytes to parsed script
// 5221030000000000000000000000000000000000000000000000000000000000000001210300000000000000000000000000000000000000000000000000000000000000022103000000000000000000000000000000000000000000000000000000000000000353ae
// =>
// OP_2
//   030000000000000000000000000000000000000000000000000000000000000001
//   030000000000000000000000000000000000000000000000000000000000000002
//   030000000000000000000000000000000000000000000000000000000000000003
//   OP_3
//   CHECKMULTISIG
// TODO: simplify like CompactSize?
exports.Script = P.wrap({
    encodeStream: function (w, value) {
        for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
            var o = value_1[_i];
            if (typeof o === 'string') {
                if (OP[o] === undefined)
                    throw new Error("Unknown opcode=".concat(o));
                w.byte(OP[o]);
                continue;
            }
            var len = o.length;
            if (len < OP.PUSHDATA1)
                w.byte(len);
            else if (len <= 0xff) {
                w.byte(OP.PUSHDATA1);
                w.byte(len);
            }
            else if (len <= 0xffff) {
                w.byte(OP.PUSHDATA2);
                w.bytes(P.U16LE.encode(len));
            }
            else {
                w.byte(OP.PUSHDATA4);
                w.bytes(P.U32LE.encode(len));
            }
            w.bytes(o);
        }
    },
    decodeStream: function (r) {
        var out = [];
        while (!r.isEnd()) {
            var cur = r.byte();
            // if 0 < cur < 78
            if (OP.OP_0 < cur && cur <= OP.PUSHDATA4) {
                var len = void 0;
                if (cur < OP.PUSHDATA1)
                    len = cur;
                else if (cur === OP.PUSHDATA1)
                    len = P.U8.decodeStream(r);
                else if (cur === OP.PUSHDATA2)
                    len = P.U16LE.decodeStream(r);
                else if (cur === OP.PUSHDATA4)
                    len = P.U32LE.decodeStream(r);
                else
                    throw new Error('Should be not possible');
                out.push(r.bytes(len));
            }
            else {
                var op = OP[cur];
                if (op === undefined)
                    throw new Error("Unknown opcode=".concat(cur.toString(16)));
                out.push(op);
            }
        }
        return out;
    },
});
// BTC specific variable length integer encoding
// https://en.bitcoin.it/wiki/Protocol_documentation#Variable_length_integer
var CSLimits = {
    0xfd: [0xfd, 2, 253n, 65535n],
    0xfe: [0xfe, 4, 65536n, 4294967295n],
    0xff: [0xff, 8, 4294967296n, 18446744073709551615n],
};
exports.CompactSize = P.wrap({
    encodeStream: function (w, value) {
        if (typeof value === 'number')
            value = BigInt(value);
        if (0n <= value && value <= 252n)
            return w.byte(Number(value));
        for (var _i = 0, _a = Object.values(CSLimits); _i < _a.length; _i++) {
            var _b = _a[_i], flag = _b[0], bytes = _b[1], start = _b[2], stop = _b[3];
            if (start > value || value > stop)
                continue;
            w.byte(flag);
            for (var i = 0; i < bytes; i++)
                w.byte(Number((value >> (8n * BigInt(i))) & 0xffn));
            return;
        }
        throw w.err("VarInt too big: ".concat(value));
    },
    decodeStream: function (r) {
        var b0 = r.byte();
        if (b0 <= 0xfc)
            return BigInt(b0);
        var _a = CSLimits[b0], _ = _a[0], bytes = _a[1], start = _a[2];
        var num = 0n;
        for (var i = 0; i < bytes; i++)
            num |= BigInt(r.byte()) << (8n * BigInt(i));
        if (num < start)
            throw r.err("Wrong CompactSize(".concat(8 * bytes, ")"));
        return num;
    },
});
// Same thing, but in number instead of bigint. Checks for safe integer inside
var CompactSizeLen = P.apply(exports.CompactSize, P.coders.number);
// Array of size <CompactSize>
var BTCArray = function (t) { return P.array(exports.CompactSize, t); };
exports.BTCArray = BTCArray;
// ui8a of size <CompactSize>
exports.VarBytes = P.bytes(exports.CompactSize);
exports.RawInput = P.struct({
    hash: P.bytes(32, true),
    index: P.U32LE,
    finalScriptSig: exports.VarBytes,
    sequence: P.U32LE, // ?
});
exports.RawOutput = P.struct({ amount: P.U64LE, script: exports.VarBytes });
var EMPTY_OUTPUT = {
    amount: 0xffffffffffffffffn,
    script: P.EMPTY,
};
// SegWit v0 stack of witness buffers
exports.RawWitness = P.array(CompactSizeLen, exports.VarBytes);
// https://en.bitcoin.it/wiki/Protocol_documentation#tx
// TODO: more tests. Unsigned tx has version=2 for some reason,
// probably we're exporting broken unsigned tx
// Related: https://github.com/bitcoin/bips/blob/master/bip-0068.mediawiki
var _RawTx = P.struct({
    version: P.I32LE,
    segwitFlag: P.flag(new Uint8Array([0x00, 0x01])),
    inputs: (0, exports.BTCArray)(exports.RawInput),
    outputs: (0, exports.BTCArray)(exports.RawOutput),
    witnesses: P.flagged('segwitFlag', P.array('inputs/length', exports.RawWitness)),
    // Need to handle that?
    // < 500000000	Block number at which this transaction is unlocked
    // >= 500000000	UNIX timestamp at which this transaction is unlocked
    lockTime: P.U32LE,
});
function validateRawTx(tx) {
    if (tx.segwitFlag && tx.witnesses && !tx.witnesses.length)
        throw new Error('Segwit flag with empty witnesses array');
    return tx;
}
exports.RawTx = P.validate(_RawTx, validateRawTx);
var BIP32Der = P.struct({
    fingerprint: P.U32BE,
    path: P.array(null, P.U32LE),
});
// <control byte with leaf version and parity bit> <internal key p> <C> <E> <AB>
var _TaprootControlBlock = P.struct({
    version: P.U8,
    internalKey: P.bytes(32),
    merklePath: P.array(null, P.bytes(32)),
});
exports.TaprootControlBlock = P.validate(_TaprootControlBlock, function (cb) {
    if (cb.merklePath.length > 128)
        throw new Error('TaprootControlBlock: merklePath should be of length 0..128 (inclusive)');
    return cb;
});
var TaprootBIP32Der = P.struct({
    hashes: P.array(CompactSizeLen, P.bytes(32)),
    der: BIP32Der,
});
// {name: [tag, keyCoder, valueCoder]}
var PSBTGlobal = {
    // TODO: RAW TX here
    unsignedTx: [0x00, false, exports.RawTx, [0], [2], [0]],
    // The 78 byte serialized extended public key as defined by BIP 32.
    xpub: [0x01, P.bytes(78), BIP32Der, [], [], [0, 2]],
    txVersion: [0x02, false, P.U32LE, [2], [0], [2]],
    fallbackLocktime: [0x03, false, P.U32LE, [], [0], [2]],
    inputCount: [0x04, false, CompactSizeLen, [2], [0], [2]],
    outputCount: [0x05, false, CompactSizeLen, [2], [0], [2]],
    // bitfield
    txModifiable: [0x06, false, P.U8, [], [0], [2]],
    version: [0xfb, false, P.U32LE, [], [], [0, 2]],
    // key = <identifierlen> <identifier> <subtype> <subkeydata>
    propietary: [0xfc, P.bytes(null), P.bytes(null), [], [], [0, 2]],
};
var PSBTInput = {
    nonWitnessUtxo: [0x00, false, exports.RawTx, [], [], [0, 2]],
    witnessUtxo: [0x01, false, exports.RawOutput, [], [], [0, 2]],
    partialSig: [0x02, PubKeyECDSA, P.bytes(null), [], [], [0, 2]],
    sighashType: [0x03, false, P.U32LE, [], [], [0, 2]],
    redeemScript: [0x04, false, P.bytes(null), [], [], [0, 2]],
    witnessScript: [0x05, false, P.bytes(null), [], [], [0, 2]],
    bip32Derivation: [0x06, PubKeyECDSA, BIP32Der, [], [], [0, 2]],
    finalScriptSig: [0x07, false, P.bytes(null), [], [], [0, 2]],
    finalScriptWitness: [0x08, false, exports.RawWitness, [], [], [0, 2]],
    porCommitment: [0x09, false, P.bytes(null), [], [], [0, 2]],
    ripemd160: [0x0a, P.bytes(20), P.bytes(null), [], [], [0, 2]],
    sha256: [0x0b, P.bytes(32), P.bytes(null), [], [], [0, 2]],
    hash160: [0x0c, P.bytes(20), P.bytes(null), [], [], [0, 2]],
    hash256: [0x0d, P.bytes(32), P.bytes(null), [], [], [0, 2]],
    hash: [0x0e, false, P.bytes(32), [2], [0], [2]],
    index: [0x0f, false, P.U32LE, [2], [0], [2]],
    sequence: [0x10, false, P.U32LE, [], [0], [2]],
    requiredTimeLocktime: [0x11, false, P.U32LE, [], [0], [2]],
    requiredHeightLocktime: [0x12, false, P.U32LE, [], [0], [2]],
    tapKeySig: [0x13, false, SignatureSchnorr, [], [], [0, 2]],
    tapScriptSig: [
        0x14,
        P.struct({ pubKey: PubKeySchnorr, leafHash: P.bytes(32) }),
        SignatureSchnorr,
        [],
        [],
        [0, 2],
    ],
    // value = <bytes script> <8-bit uint leaf version>
    tapLeafScript: [0x15, exports.TaprootControlBlock, P.bytes(null), [], [], [0, 2]],
    tapBip32Derivation: [0x16, P.bytes(32), TaprootBIP32Der, [], [], [0, 2]],
    tapInternalKey: [0x17, false, PubKeySchnorr, [], [], [0, 2]],
    tapMerkleRoot: [0x18, false, P.bytes(32), [], [], [0, 2]],
    propietary: [0xfc, P.bytes(null), P.bytes(null), [], [], [0, 2]],
};
// All other keys removed when finalizing
var PSBTInputFinalKeys = [
    'hash',
    'sequence',
    'index',
    'witnessUtxo',
    'nonWitnessUtxo',
    'finalScriptSig',
    'finalScriptWitness',
    'unknown',
];
// Can be modified even on signed input
var PSBTInputUnsignedKeys = [
    'partialSig',
    'finalScriptSig',
    'finalScriptWitness',
    'tapKeySig',
    'tapScriptSig',
];
var PSBTOutput = {
    redeemScript: [0x00, false, P.bytes(null), [], [], [0, 2]],
    witnessScript: [0x01, false, P.bytes(null), [], [], [0, 2]],
    bip32Derivation: [0x02, PubKeyECDSA, BIP32Der, [], [], [0, 2]],
    amount: [0x03, false, P.I64LE, [2], [0], [2]],
    script: [0x04, false, P.bytes(null), [2], [0], [2]],
    tapInternalKey: [0x05, false, PubKeySchnorr, [], [], [0, 2]],
    /*
    {<8-bit uint depth> <8-bit uint leaf version> <compact size uint scriptlen> <bytes script>}*
    */
    tapTree: [
        0x06,
        false,
        P.array(null, P.struct({
            depth: P.U8,
            version: P.U8,
            script: exports.VarBytes,
        })),
        [],
        [],
        [0, 2],
    ],
    tapBip32Derivation: [0x07, PubKeySchnorr, TaprootBIP32Der, [], [], [0, 2]],
    propietary: [0xfc, P.bytes(null), P.bytes(null), [], [], [0, 2]],
};
// Can be modified even on signed input
var PSBTOutputUnsignedKeys = [];
var PSBTKeyPair = P.array(P.NULL, P.struct({
    //  <key> := <keylen> <keytype> <keydata> WHERE keylen = len(keytype)+len(keydata)
    key: P.prefix(CompactSizeLen, P.struct({ type: CompactSizeLen, key: P.bytes(null) })),
    //  <value> := <valuelen> <valuedata>
    value: P.bytes(CompactSizeLen),
}));
var PSBTUnknownKey = P.struct({ type: CompactSizeLen, key: P.bytes(null) });
// Key cannot be 'unknown', value coder cannot be array for elements with empty key
function PSBTKeyMap(psbtEnum) {
    // -> Record<type, [keyName, ...coders]>
    var byType = {};
    for (var k in psbtEnum) {
        var _a = psbtEnum[k], num = _a[0], kc = _a[1], vc = _a[2];
        byType[num] = [k, kc, vc];
    }
    return P.wrap({
        encodeStream: function (w, value) {
            var out = [];
            var _loop_1 = function (name) {
                var val = value[name];
                if (val === undefined)
                    return "continue";
                var _c = psbtEnum[name], type_1 = _c[0], kc = _c[1], vc = _c[2];
                if (!kc)
                    out.push({ key: { type: type_1, key: P.EMPTY }, value: vc.encode(val) });
                else {
                    // TODO: check here if there is duplicate keys
                    var kv = val.map(function (_a) {
                        var k = _a[0], v = _a[1];
                        return [
                            kc.encode(k),
                            vc.encode(v),
                        ];
                    });
                    // sort by keys
                    kv.sort(function (a, b) { return cmp(a[0], b[0]); });
                    for (var _d = 0, kv_1 = kv; _d < kv_1.length; _d++) {
                        var _e = kv_1[_d], key = _e[0], value_2 = _e[1];
                        out.push({ key: { key: key, type: type_1 }, value: value_2 });
                    }
                }
            };
            // Because we use order of psbtEnum, keymap is sorted here
            for (var name in psbtEnum) {
                _loop_1(name);
            }
            if (value.unknown) {
                value.unknown.sort(function (a, b) { return cmp(a[0], b[0]); });
                for (var _i = 0, _a = value.unknown; _i < _a.length; _i++) {
                    var _b = _a[_i], k = _b[0], v = _b[1];
                    out.push({ key: PSBTUnknownKey.decode(k), value: v });
                }
            }
            PSBTKeyPair.encodeStream(w, out);
        },
        decodeStream: function (r) {
            var raw = PSBTKeyPair.decodeStream(r);
            var out = {};
            var noKey = {};
            for (var _i = 0, raw_1 = raw; _i < raw_1.length; _i++) {
                var elm = raw_1[_i];
                var name = 'unknown';
                var key = elm.key.key;
                var value = elm.value;
                if (byType[elm.key.type]) {
                    var _a = byType[elm.key.type], _name = _a[0], kc = _a[1], vc = _a[2];
                    name = _name;
                    if (!kc && key.length) {
                        throw new Error("PSBT: Non-empty key for ".concat(name, " (key=").concat(base.hex.encode(key), " value=").concat(base.hex.encode(value)));
                    }
                    key = kc ? kc.decode(key) : undefined;
                    value = vc.decode(value);
                    if (!kc) {
                        if (out[name])
                            throw new Error("PSBT: Same keys: ".concat(name, " (key=").concat(key, " value=").concat(value, ")"));
                        out[name] = value;
                        noKey[name] = true;
                        continue;
                    }
                }
                else {
                    // For unknown: add key type inside key
                    key = PSBTUnknownKey.encode({ type: elm.key.type, key: elm.key.key });
                }
                // Only keyed elements at this point
                if (noKey[name])
                    throw new Error("PSBT: Key type with empty key and no key=".concat(name, " val=").concat(value));
                if (!out[name])
                    out[name] = [];
                out[name].push([key, value]);
            }
            return out;
        },
    });
}
// Basic sanity check for scripts
function checkWSH(s, witnessScript) {
    if (!P.equalBytes(s.hash, (0, sha256_1.sha256)(witnessScript)))
        throw new Error('checkScript: wsh wrong witnessScript hash');
    var w = exports.OutScript.decode(witnessScript);
    if (w.type === 'tr' || w.type === 'tr_ns' || w.type === 'tr_ms')
        throw new Error("checkScript: P2".concat(w.type, " cannot be wrapped in P2SH"));
    if (w.type === 'wpkh' || w.type === 'sh')
        throw new Error("checkScript: P2".concat(w.type, " cannot be wrapped in P2WSH"));
}
function checkScript(script, redeemScript, witnessScript) {
    // TODO: revalidate
    if (script) {
        var s = exports.OutScript.decode(script);
        // TODO: ms||pk maybe work, but there will be no address
        if (s.type === 'tr_ns' || s.type === 'tr_ms' || s.type === 'ms' || s.type == 'pk')
            throw new Error("checkScript: non-wrapped ".concat(s.type));
        if (s.type === 'sh' && redeemScript) {
            if (!P.equalBytes(s.hash, hash160(redeemScript)))
                throw new Error('checkScript: sh wrong redeemScript hash');
            var r = exports.OutScript.decode(redeemScript);
            if (r.type === 'tr' || r.type === 'tr_ns' || r.type === 'tr_ms')
                throw new Error("checkScript: P2".concat(r.type, " cannot be wrapped in P2SH"));
            // Not sure if this unspendable, but we cannot represent this via PSBT
            if (r.type === 'sh')
                throw new Error('checkScript: P2SH cannot be wrapped in P2SH');
        }
        if (s.type === 'wsh' && witnessScript)
            checkWSH(s, witnessScript);
    }
    if (redeemScript) {
        var r = exports.OutScript.decode(redeemScript);
        if (r.type === 'wsh' && witnessScript)
            checkWSH(r, witnessScript);
    }
}
var PSBTInputCoder = P.validate(PSBTKeyMap(PSBTInput), function (i) {
    if (i.finalScriptWitness && !i.finalScriptWitness.length)
        throw new Error('validateInput: wmpty finalScriptWitness');
    //if (i.finalScriptSig && !i.finalScriptSig.length) throw new Error('validateInput: empty finalScriptSig');
    if (i.partialSig && !i.partialSig.length)
        throw new Error('Empty partialSig');
    if (i.partialSig)
        for (var _i = 0, _a = i.partialSig; _i < _a.length; _i++) {
            var _b = _a[_i], k = _b[0], v = _b[1];
            validatePubkey(k, PubT.ecdsa);
        }
    if (i.bip32Derivation)
        for (var _c = 0, _d = i.bip32Derivation; _c < _d.length; _c++) {
            var _e = _d[_c], k = _e[0], v = _e[1];
            validatePubkey(k, PubT.ecdsa);
        }
    // Locktime = unsigned little endian integer greater than or equal to 500000000 representing
    if (i.requiredTimeLocktime !== undefined && i.requiredTimeLocktime < 500000000)
        throw new Error("validateInput: wrong timeLocktime=".concat(i.requiredTimeLocktime));
    // unsigned little endian integer greater than 0 and less than 500000000
    if (i.requiredHeightLocktime !== undefined &&
        (i.requiredHeightLocktime <= 0 || i.requiredHeightLocktime >= 500000000))
        throw new Error("validateInput: wrong heighLocktime=".concat(i.requiredHeightLocktime));
    if (i.nonWitnessUtxo && i.index !== undefined) {
        var last = i.nonWitnessUtxo.outputs.length - 1;
        if (i.index > last)
            throw new Error("validateInput: index(".concat(i.index, ") not in nonWitnessUtxo"));
        var prevOut = i.nonWitnessUtxo.outputs[i.index];
        if (i.witnessUtxo &&
            (!P.equalBytes(i.witnessUtxo.script, prevOut.script) ||
                i.witnessUtxo.amount !== prevOut.amount))
            throw new Error('validateInput: witnessUtxo different from nonWitnessUtxo');
    }
    if (i.tapLeafScript) {
        // tap leaf version appears here twice: in control block and at the end of script
        for (var _f = 0, _g = i.tapLeafScript; _f < _g.length; _f++) {
            var _h = _g[_f], k = _h[0], v = _h[1];
            if ((k.version & 254) !== v[v.length - 1])
                throw new Error('validateInput: tapLeafScript version mimatch');
            if (v[v.length - 1] & 1)
                throw new Error('validateInput: tapLeafScript version has parity bit!');
        }
    }
    return i;
});
var PSBTOutputCoder = P.validate(PSBTKeyMap(PSBTOutput), function (o) {
    if (o.bip32Derivation)
        for (var _i = 0, _a = o.bip32Derivation; _i < _a.length; _i++) {
            var _b = _a[_i], k = _b[0], v = _b[1];
            validatePubkey(k, PubT.ecdsa);
        }
    return o;
});
var PSBTGlobalCoder = P.validate(PSBTKeyMap(PSBTGlobal), function (g) {
    var version = g.version || 0;
    if (version === 0) {
        if (!g.unsignedTx)
            throw new Error('PSBTv0: missing unsignedTx');
        if (g.unsignedTx.segwitFlag || g.unsignedTx.witnesses)
            throw new Error('PSBTv0: witness in unsingedTx');
        for (var _i = 0, _a = g.unsignedTx.inputs; _i < _a.length; _i++) {
            var inp = _a[_i];
            if (inp.finalScriptSig && inp.finalScriptSig.length)
                throw new Error('PSBTv0: input scriptSig found in unsignedTx');
        }
    }
    return g;
});
exports._RawPSBTV0 = P.struct({
    magic: P.magic(P.string(new Uint8Array([0xff])), 'psbt'),
    global: PSBTGlobalCoder,
    inputs: P.array('global/unsignedTx/inputs/length', PSBTInputCoder),
    outputs: P.array(null, PSBTOutputCoder),
});
exports._RawPSBTV2 = P.struct({
    magic: P.magic(P.string(new Uint8Array([0xff])), 'psbt'),
    global: PSBTGlobalCoder,
    inputs: P.array('global/inputCount', PSBTInputCoder),
    outputs: P.array('global/outputCount', PSBTOutputCoder),
});
exports._DebugPSBT = P.struct({
    magic: P.magic(P.string(new Uint8Array([0xff])), 'psbt'),
    items: P.array(null, P.apply(P.array(P.NULL, P.tuple([P.hex(CompactSizeLen), P.bytes(exports.CompactSize)])), P.coders.dict())),
});
function validatePSBTFields(version, info, lst) {
    for (var k in lst) {
        if (k === 'unknown')
            continue;
        if (!info[k])
            continue;
        var _a = info[k].slice(-3), reqInc = _a[0], reqExc = _a[1], allowInc = _a[2];
        if (reqExc.includes(version) || !allowInc.includes(version))
            throw new Error("PSBTv".concat(version, ": field ").concat(k, " is not allowed"));
    }
    for (var k in info) {
        var _b = info[k].slice(-3), reqInc = _b[0], reqExc = _b[1], allowInc = _b[2];
        if (reqInc.includes(version) && lst[k] === undefined)
            throw new Error("PSBTv".concat(version, ": missing required field ").concat(k));
    }
}
function cleanPSBTFields(version, info, lst) {
    var out = {};
    for (var k in lst) {
        if (k !== 'unknown') {
            if (!info[k])
                continue;
            var _a = info[k].slice(-3), reqInc = _a[0], reqExc = _a[1], allowInc = _a[2];
            if (reqExc.includes(version) || !allowInc.includes(version))
                continue;
        }
        out[k] = lst[k];
    }
    return out;
}
function validatePSBT(tx) {
    var version = (tx && tx.global && tx.global.version) || 0;
    validatePSBTFields(version, PSBTGlobal, tx.global);
    for (var _i = 0, _a = tx.inputs; _i < _a.length; _i++) {
        var i = _a[_i];
        validatePSBTFields(version, PSBTInput, i);
    }
    for (var _b = 0, _c = tx.outputs; _b < _c.length; _b++) {
        var o = _c[_b];
        validatePSBTFields(version, PSBTOutput, o);
    }
    // We allow only one empty element at the end of map (compat with bitcoinjs-lib bug)
    var inputCount = !version ? tx.global.unsignedTx.inputs.length : tx.global.inputCount;
    if (tx.inputs.length < inputCount)
        throw new Error('Not enough inputs');
    var inputsLeft = tx.inputs.slice(inputCount);
    if (inputsLeft.length > 1 || (inputsLeft.length && Object.keys(inputsLeft[0]).length))
        throw new Error("Unexpected inputs left in tx=".concat(inputsLeft));
    // Same for inputs
    var outputCount = !version ? tx.global.unsignedTx.outputs.length : tx.global.outputCount;
    if (tx.outputs.length < outputCount)
        throw new Error('Not outputs inputs');
    var outputsLeft = tx.outputs.slice(outputCount);
    if (outputsLeft.length > 1 || (outputsLeft.length && Object.keys(outputsLeft[0]).length))
        throw new Error("Unexpected outputs left in tx=".concat(outputsLeft));
    return tx;
}
// Check if object doens't have custom constructor (like Uint8Array/Array)
var isPlainObject = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Object]' && obj.constructor === Object;
};
function type(v) {
    if (v instanceof Uint8Array)
        return 'bytes';
    if (Array.isArray(v))
        return 'array';
    if (['number', 'string', 'bigint', 'boolean', 'undefined'].includes(typeof v))
        return typeof v;
    if (v === null)
        return 'null'; // typeof null=object
    if (isPlainObject(v))
        return 'object';
    throw new Error("Unknown type=".concat(v));
}
// Basic structure merge: object = {...old, ...new}, arrays = old.concat(new). other -> replace
// function merge<T extends PSBTKeyMap>(
//   psbtEnum: T,
//   val: PSBTKeyMapKeys<T>,
//   cur?: PSBTKeyMapKeys<T>
// ): PSBTKeyMapKeys<T> {
// }
function mergeKeyMap(psbtEnum, val, cur, allowedFields) {
    var res = __assign(__assign({}, cur), val);
    var _loop_2 = function (k) {
        var key = k;
        var _a = psbtEnum[key], _ = _a[0], kC = _a[1], vC = _a[2];
        var cannotChange = allowedFields && !allowedFields.includes(k);
        if (val[k] === undefined && k in val) {
            if (cannotChange)
                throw new Error("Cannot remove signed field=".concat(k));
            delete res[k];
        }
        else if (kC) {
            var oldKV = (cur && cur[k] ? cur[k] : []);
            var newKV = val[key];
            if (newKV) {
                if (!Array.isArray(newKV))
                    throw new Error("keyMap(".concat(k, "): KV pairs should be [k, v][]"));
                // Decode hex in k-v
                newKV = newKV.map(function (val) {
                    if (val.length !== 2)
                        throw new Error("keyMap(".concat(k, "): KV pairs should be [k, v][]"));
                    return [
                        typeof val[0] === 'string' ? kC.decode(base.hex.decode(val[0])) : val[0],
                        typeof val[1] === 'string' ? vC.decode(base.hex.decode(val[1])) : val[1],
                    ];
                });
                var map_1 = {};
                var add = function (kStr, k, v) {
                    if (map_1[kStr] === undefined) {
                        map_1[kStr] = [k, v];
                        return;
                    }
                    var oldVal = base.hex.encode(vC.encode(map_1[kStr][1]));
                    var newVal = base.hex.encode(vC.encode(v));
                    if (oldVal !== newVal)
                        throw new Error("keyMap(".concat(key, "): same key=").concat(kStr, " oldVal=").concat(oldVal, " newVal=").concat(newVal));
                };
                for (var _i = 0, oldKV_1 = oldKV; _i < oldKV_1.length; _i++) {
                    var _b = oldKV_1[_i], k_1 = _b[0], v = _b[1];
                    var kStr = base.hex.encode(kC.encode(k_1));
                    add(kStr, k_1, v);
                }
                for (var _c = 0, newKV_1 = newKV; _c < newKV_1.length; _c++) {
                    var _d = newKV_1[_c], k_2 = _d[0], v = _d[1];
                    var kStr = base.hex.encode(kC.encode(k_2));
                    // undefined removes previous value
                    if (v === undefined)
                        delete map_1[kStr];
                    else
                        add(kStr, k_2, v);
                }
                res[key] = Object.values(map_1);
            }
        }
        else if (typeof res[k] === 'string') {
            res[k] = vC.decode(base.hex.decode(res[k]));
        }
    };
    // All arguments can be provided as hex
    for (var k in psbtEnum) {
        _loop_2(k);
    }
    // Remove unknown keys
    for (var k in res)
        if (!psbtEnum[k])
            delete res[k];
    return res;
}
exports.RawPSBTV0 = P.validate(exports._RawPSBTV0, validatePSBT);
exports.RawPSBTV2 = P.validate(exports._RawPSBTV2, validatePSBT);
// (TxHash, Idx)
var TxHashIdx = P.struct({ hash: P.bytes(32, true), index: P.U32LE });
// /Coders
var isBytes = function (b) { return b instanceof Uint8Array; };
var OutPK = {
    encode: function (from) {
        if (from.length !== 2 ||
            !P.isBytes(from[0]) ||
            !isValidPubkey(from[0], PubT.ecdsa) ||
            from[1] !== 'CHECKSIG')
            return;
        return { type: 'pk', pubkey: from[0] };
    },
    decode: function (to) { return (to.type === 'pk' ? [to.pubkey, 'CHECKSIG'] : undefined); },
};
var p2pk = function (pubkey, network) {
    if (network === void 0) { network = exports.NETWORK; }
    if (!isValidPubkey(pubkey, PubT.ecdsa))
        throw new Error('P2PK: invalid publicKey');
    return {
        type: 'pk',
        script: exports.OutScript.encode({ type: 'pk', pubkey: pubkey }),
    };
};
exports.p2pk = p2pk;
var OutPKH = {
    encode: function (from) {
        if (from.length !== 5 || from[0] !== 'DUP' || from[1] !== 'HASH160' || !isBytes(from[2]))
            return;
        if (from[3] !== 'EQUALVERIFY' || from[4] !== 'CHECKSIG')
            return;
        return { type: 'pkh', hash: from[2] };
    },
    decode: function (to) {
        return to.type === 'pkh' ? ['DUP', 'HASH160', to.hash, 'EQUALVERIFY', 'CHECKSIG'] : undefined;
    },
};
var p2pkh = function (publicKey, network) {
    if (network === void 0) { network = exports.NETWORK; }
    if (!isValidPubkey(publicKey, PubT.ecdsa))
        throw new Error('P2PKH: invalid publicKey');
    var hash = hash160(publicKey);
    return {
        type: 'pkh',
        script: exports.OutScript.encode({ type: 'pkh', hash: hash }),
        address: Address(network).encode({ type: 'pkh', hash: hash }),
    };
};
exports.p2pkh = p2pkh;
var OutSH = {
    encode: function (from) {
        if (from.length !== 3 || from[0] !== 'HASH160' || !isBytes(from[1]) || from[2] !== 'EQUAL')
            return;
        return { type: 'sh', hash: from[1] };
    },
    decode: function (to) {
        return to.type === 'sh' ? ['HASH160', to.hash, 'EQUAL'] : undefined;
    },
};
var p2sh = function (child, network) {
    if (network === void 0) { network = exports.NETWORK; }
    var hash = hash160(child.script);
    var script = exports.OutScript.encode({ type: 'sh', hash: hash });
    checkScript(script, child.script, child.witnessScript);
    var res = {
        type: 'sh',
        redeemScript: child.script,
        script: exports.OutScript.encode({ type: 'sh', hash: hash }),
        address: Address(network).encode({ type: 'sh', hash: hash }),
    };
    if (child.witnessScript)
        res.witnessScript = child.witnessScript;
    return res;
};
exports.p2sh = p2sh;
var OutWSH = {
    encode: function (from) {
        if (from.length !== 2 || from[0] !== 'OP_0' || !isBytes(from[1]))
            return;
        if (from[1].length !== 32)
            return;
        return { type: 'wsh', hash: from[1] };
    },
    decode: function (to) { return (to.type === 'wsh' ? ['OP_0', to.hash] : undefined); },
};
var p2wsh = function (child, network) {
    if (network === void 0) { network = exports.NETWORK; }
    var hash = (0, sha256_1.sha256)(child.script);
    var script = exports.OutScript.encode({ type: 'wsh', hash: hash });
    checkScript(script, undefined, child.script);
    return {
        type: 'wsh',
        witnessScript: child.script,
        script: exports.OutScript.encode({ type: 'wsh', hash: hash }),
        address: Address(network).encode({ type: 'wsh', hash: hash }),
    };
};
exports.p2wsh = p2wsh;
var OutWPKH = {
    encode: function (from) {
        if (from.length !== 2 || from[0] !== 'OP_0' || !isBytes(from[1]))
            return;
        if (from[1].length !== 20)
            return;
        return { type: 'wpkh', hash: from[1] };
    },
    decode: function (to) { return (to.type === 'wpkh' ? ['OP_0', to.hash] : undefined); },
};
var p2wpkh = function (publicKey, network) {
    if (network === void 0) { network = exports.NETWORK; }
    if (!isValidPubkey(publicKey, PubT.ecdsa))
        throw new Error('P2WPKH: invalid publicKey');
    if (publicKey.length === 65)
        throw new Error('P2WPKH: uncompressed public key');
    var hash = hash160(publicKey);
    return {
        type: 'wpkh',
        script: exports.OutScript.encode({ type: 'wpkh', hash: hash }),
        address: Address(network).encode({ type: 'wpkh', hash: hash }),
    };
};
exports.p2wpkh = p2wpkh;
var OutMS = {
    encode: function (from) {
        var last = from.length - 1;
        if (from[last] !== 'CHECKMULTISIG')
            return;
        var m = OPtoNumber(from[0]);
        var n = OPtoNumber(from[last - 1]);
        if (m === undefined || n === undefined)
            throw new Error('OutScript.encode/multisig wrong params');
        var pubkeys = from.slice(1, -2); // Any is ok, check in for later
        if (n !== pubkeys.length)
            throw new Error('OutScript.encode/multisig: wrong length');
        return { type: 'ms', m: m, pubkeys: pubkeys }; // we don't need n, since it is the same as pubkeys
    },
    // checkmultisig(n, ..pubkeys, m)
    decode: function (to) {
        return to.type === 'ms'
            ? __spreadArray(__spreadArray(["OP_".concat(to.m)], to.pubkeys, true), ["OP_".concat(to.pubkeys.length), 'CHECKMULTISIG'], false) : undefined;
    },
};
var p2ms = function (m, pubkeys, allowSamePubkeys) {
    if (allowSamePubkeys === void 0) { allowSamePubkeys = false; }
    if (!allowSamePubkeys)
        uniqPubkey(pubkeys);
    return { type: 'ms', script: exports.OutScript.encode({ type: 'ms', pubkeys: pubkeys, m: m }) };
};
exports.p2ms = p2ms;
var OutTR = {
    encode: function (from) {
        if (from.length !== 2 || from[0] !== 'OP_1' || !isBytes(from[1]))
            return;
        return { type: 'tr', pubkey: from[1] };
    },
    decode: function (to) { return (to.type === 'tr' ? ['OP_1', to.pubkey] : undefined); },
};
// Helper for generating binary tree from list, with weights
function taprootListToTree(taprootList) {
    // Clone input in order to not corrupt it
    var lst = Array.from(taprootList);
    // We have at least 2 elements => can create branch
    while (lst.length >= 2) {
        // Sort: elements with smallest weight are in the end of queue
        lst.sort(function (a, b) { return (b.weight || 1) - (a.weight || 1); });
        var b = lst.pop();
        var a = lst.pop();
        var weight = ((a === null || a === void 0 ? void 0 : a.weight) || 1) + ((b === null || b === void 0 ? void 0 : b.weight) || 1);
        lst.push({
            weight: weight,
            // Unwrap children array
            childs: [a.childs || a, b.childs || b],
        });
    }
    // At this point there is always 1 element in lst
    var last = lst[0];
    return (last.childs || last);
}
exports.taprootListToTree = taprootListToTree;
function checkTaprootScript(script, allowUnknowOutput) {
    if (allowUnknowOutput === void 0) { allowUnknowOutput = false; }
    var out = exports.OutScript.decode(script);
    if (out.type === 'unknown' && allowUnknowOutput)
        return;
    if (!['tr_ns', 'tr_ms'].includes(out.type))
        throw new Error("P2TR: invalid leaf script=".concat(out.type));
}
function taprootHashTree(tree, allowUnknowOutput) {
    var _a;
    if (allowUnknowOutput === void 0) { allowUnknowOutput = false; }
    if (!tree)
        throw new Error('taprootHashTree: empty tree');
    if (Array.isArray(tree) && tree.length === 1)
        tree = tree[0];
    // Terminal node (leaf)
    if (!Array.isArray(tree)) {
        var version = tree.leafVersion, leafScript = tree.script, tapInternalKey = tree.tapInternalKey;
        // Earliest tree walk where we can validate tapScripts
        if (tree.tapLeafScript || (tree.tapMerkleRoot && !P.equalBytes(tree.tapMerkleRoot, P.EMPTY)))
            throw new Error('P2TR: tapRoot leafScript cannot have tree');
        // Just to be sure that it is spendable
        if (tapInternalKey && P.equalBytes(tapInternalKey, exports.TAPROOT_UNSPENDABLE_KEY))
            throw new Error('P2TR: tapRoot leafScript cannot have unspendble key');
        var script = typeof leafScript === 'string' ? base.hex.decode(leafScript) : leafScript;
        checkTaprootScript(script, allowUnknowOutput);
        return {
            type: 'leaf',
            tapInternalKey: tapInternalKey,
            version: version,
            script: script,
            hash: (0, exports.tapLeafHash)(script, version),
        };
    }
    // If tree / branch is not binary tree, convert it
    if (tree.length !== 2)
        tree = taprootListToTree(tree);
    if (tree.length !== 2)
        throw new Error('hashTree: non binary tree!');
    // branch
    // NOTE: both nodes should exist
    var left = taprootHashTree(tree[0], allowUnknowOutput);
    var right = taprootHashTree(tree[1], allowUnknowOutput);
    // We cannot swap left/right here, since it will change structure of tree
    var _b = [left.hash, right.hash], lH = _b[0], rH = _b[1];
    if (cmp(rH, lH) === -1)
        _a = [rH, lH], lH = _a[0], rH = _a[1];
    return { type: 'branch', left: left, right: right, hash: taggedHash('TapBranch', lH, rH) };
}
function taprootAddPath(tree, path) {
    if (path === void 0) { path = []; }
    if (!tree)
        throw new Error("taprootAddPath: empty tree");
    if (tree.type === 'leaf')
        return __assign(__assign({}, tree), { path: path });
    if (tree.type !== 'branch')
        throw new Error("taprootAddPath: wrong type=".concat(tree));
    return __assign(__assign({}, tree), { path: path, 
        // Left element has right hash in path and otherwise
        left: taprootAddPath(tree.left, __spreadArray([tree.right.hash], path, true)), right: taprootAddPath(tree.right, __spreadArray([tree.left.hash], path, true)) });
}
function taprootWalkTree(tree) {
    if (!tree)
        throw new Error("taprootAddPath: empty tree");
    if (tree.type === 'leaf')
        return [tree];
    if (tree.type !== 'branch')
        throw new Error("taprootWalkTree: wrong type=".concat(tree));
    return __spreadArray(__spreadArray([], taprootWalkTree(tree.left), true), taprootWalkTree(tree.right), true);
}
// Another stupid decision, where lack of standard affects security.
// Multisig needs to be generated with some key.
// We are using approach from BIP 341/bitcoinjs-lib: SHA256(uncompressedDER(SECP256K1_GENERATOR_POINT))
// It is possible to switch SECP256K1_GENERATOR_POINT with some random point;
// but it's too complex to prove.
// Also used by bitcoin-core and bitcoinjs-lib
exports.TAPROOT_UNSPENDABLE_KEY = (0, sha256_1.sha256)(secp.Point.BASE.toRawBytes(false));
// Works as key OR tree.
// If we only have tree, need to add unspendable key, otherwise
// complex multisig wallet can be spent by owner of key only. See TAPROOT_UNSPENDABLE_KEY
function p2tr(internalPubKey, tree, network, allowUnknowOutput) {
    if (network === void 0) { network = exports.NETWORK; }
    if (allowUnknowOutput === void 0) { allowUnknowOutput = false; }
    // Unspendable
    if (!internalPubKey && !tree)
        throw new Error('p2tr: should have pubKey or scriptTree (or both)');
    var pubKey = typeof internalPubKey === 'string'
        ? base.hex.decode(internalPubKey)
        : internalPubKey || exports.TAPROOT_UNSPENDABLE_KEY;
    if (!isValidPubkey(pubKey, PubT.schnorr))
        throw new Error('p2tr: non-schnorr pubkey');
    var hashedTree = tree ? taprootAddPath(taprootHashTree(tree, allowUnknowOutput)) : undefined;
    var tapMerkleRoot = hashedTree ? hashedTree.hash : undefined;
    var _a = taprootTweakPubkey(pubKey, tapMerkleRoot || P.EMPTY), tweakedPubkey = _a[0], parity = _a[1];
    var leaves;
    if (hashedTree) {
        leaves = taprootWalkTree(hashedTree).map(function (l) { return (__assign(__assign({}, l), { controlBlock: exports.TaprootControlBlock.encode({
                version: (l.version || exports.TAP_LEAF_VERSION) + +parity,
                internalKey: l.tapInternalKey || pubKey,
                merklePath: l.path,
            }) })); });
    }
    var tapLeafScript;
    if (leaves) {
        tapLeafScript = leaves.map(function (l) { return [
            exports.TaprootControlBlock.decode(l.controlBlock),
            concat(l.script, new Uint8Array([l.version || exports.TAP_LEAF_VERSION])),
        ]; });
    }
    var res = {
        type: 'tr',
        script: exports.OutScript.encode({ type: 'tr', pubkey: tweakedPubkey }),
        address: Address(network).encode({ type: 'tr', pubkey: tweakedPubkey }),
        // For tests
        tweakedPubkey: tweakedPubkey,
        // PSBT stuff
        tapInternalKey: pubKey,
    };
    // Just in case someone would want to select a specific script
    if (leaves)
        res.leaves = leaves;
    if (tapLeafScript)
        res.tapLeafScript = tapLeafScript;
    if (tapMerkleRoot)
        res.tapMerkleRoot = tapMerkleRoot;
    return res;
}
exports.p2tr = p2tr;
var OutTRNS = {
    encode: function (from) {
        var last = from.length - 1;
        if (from[last] !== 'CHECKSIG')
            return;
        var pubkeys = [];
        for (var i = 0; i < last; i++) {
            var elm = from[i];
            if (i & 1) {
                if (elm !== 'CHECKSIGVERIFY')
                    throw new Error('OutScript.encode/tr_ns: wrong element');
                if (i === last - 1)
                    throw new Error('OutScript.encode/tr_ns: wrong element');
                continue;
            }
            if (!isBytes(elm))
                throw new Error('OutScript.encode/tr_ns: wrong element');
            pubkeys.push(elm);
        }
        return { type: 'tr_ns', pubkeys: pubkeys };
    },
    decode: function (to) {
        if (to.type !== 'tr_ns')
            return;
        var out = [];
        for (var i = 0; i < to.pubkeys.length - 1; i++)
            out.push(to.pubkeys[i], 'CHECKSIGVERIFY');
        out.push(to.pubkeys[to.pubkeys.length - 1], 'CHECKSIG');
        return out;
    },
};
// Returns all combinations of size M from lst
function combinations(m, list) {
    var res = [];
    if (!Array.isArray(list))
        throw new Error('combinations: lst arg should be array');
    var n = list.length;
    if (m > n)
        throw new Error('combinations: m > lst.length, no combinations possible');
    /*
    Basically works as M nested loops like:
    for (;idx[0]<lst.length;idx[0]++) for (idx[1]=idx[0]+1;idx[1]<lst.length;idx[1]++)
    but since we cannot create nested loops dynamically, we unroll it to a single loop
    */
    var idx = Array.from({ length: m }, function (_, i) { return i; });
    var last = idx.length - 1;
    main: for (;;) {
        res.push(idx.map(function (i) { return list[i]; }));
        idx[last] += 1;
        var i = last;
        // Propagate increment
        // NOTE: idx[i] cannot be bigger than n-m+i, otherwise last elements in right part will overflow
        for (; i >= 0 && idx[i] > n - m + i; i--) {
            idx[i] = 0;
            // Overflow in idx[0], break
            if (i === 0)
                break main;
            idx[i - 1] += 1;
        }
        // Propagate: idx[i+1] = idx[idx]+1
        for (i += 1; i < idx.length; i++)
            idx[i] = idx[i - 1] + 1;
    }
    return res;
}
exports.combinations = combinations;
/**
 * M-of-N multi-leaf wallet via p2tr_ns. If m == n, single script is emitted.
 * Takes O(n^2) if m != n. 99-of-100 is ok, 5-of-100 is not.
 * `2-of-[A,B,C] => [A,B] | [A,C] | [B,C]`
 */
var p2tr_ns = function (m, pubkeys, allowSamePubkeys) {
    if (allowSamePubkeys === void 0) { allowSamePubkeys = false; }
    if (!allowSamePubkeys)
        uniqPubkey(pubkeys);
    return combinations(m, pubkeys).map(function (i) { return ({
        type: 'tr_ns',
        script: exports.OutScript.encode({ type: 'tr_ns', pubkeys: i }),
    }); });
};
exports.p2tr_ns = p2tr_ns;
// Taproot public key (case of p2tr_ns)
var p2tr_pk = function (pubkey) { return (0, exports.p2tr_ns)(1, [pubkey], undefined)[0]; };
exports.p2tr_pk = p2tr_pk;
var OutTRMS = {
    encode: function (from) {
        var last = from.length - 1;
        if (from[last] !== 'NUMEQUAL' || from[1] !== 'CHECKSIG')
            return;
        var pubkeys = [];
        var m = OPtoNumber(from[last - 1]);
        if (m === undefined)
            return;
        for (var i = 0; i < last - 1; i++) {
            var elm = from[i];
            if (i & 1) {
                if (elm !== (i === 1 ? 'CHECKSIG' : 'CHECKSIGADD'))
                    throw new Error('OutScript.encode/tr_ms: wrong element');
                continue;
            }
            if (!isBytes(elm))
                throw new Error('OutScript.encode/tr_ms: wrong key element');
            pubkeys.push(elm);
        }
        return { type: 'tr_ms', pubkeys: pubkeys, m: m };
    },
    decode: function (to) {
        if (to.type !== 'tr_ms')
            return;
        var out = [to.pubkeys[0], 'CHECKSIG'];
        for (var i = 1; i < to.pubkeys.length; i++)
            out.push(to.pubkeys[i], 'CHECKSIGADD');
        out.push("OP_".concat(to.m), 'NUMEQUAL');
        return out;
    },
};
function p2tr_ms(m, pubkeys, allowSamePubkeys) {
    if (allowSamePubkeys === void 0) { allowSamePubkeys = false; }
    if (!allowSamePubkeys)
        uniqPubkey(pubkeys);
    return {
        type: 'tr_ms',
        script: exports.OutScript.encode({ type: 'tr_ms', pubkeys: pubkeys, m: m }),
    };
}
exports.p2tr_ms = p2tr_ms;
var OutUnknown = {
    encode: function (from) {
        return { type: 'unknown', script: exports.Script.encode(from) };
    },
    decode: function (to) {
        return to.type === 'unknown' ? exports.Script.decode(to.script) : undefined;
    },
};
// /Payments
var OutScripts = [
    OutPK,
    OutPKH,
    OutSH,
    OutWSH,
    OutWPKH,
    OutMS,
    OutTR,
    OutTRNS,
    OutTRMS,
    OutUnknown,
];
// TODO: we can support user supplied output scripts now
// - addOutScript
// - removeOutScript
// - We can do that as log we modify array in-place
var _OutScript = P.apply(exports.Script, P.coders.match(OutScripts));
// We can validate this once, because of packed & coders
exports.OutScript = P.validate(_OutScript, function (i) {
    if (i.type === 'pk' && !isValidPubkey(i.pubkey, PubT.ecdsa))
        throw new Error('OutScript/pk: wrong key');
    if ((i.type === 'pkh' || i.type === 'sh' || i.type === 'wpkh') &&
        (!isBytes(i.hash) || i.hash.length !== 20))
        throw new Error("OutScript/".concat(i.type, ": wrong hash"));
    if (i.type === 'wsh' && (!isBytes(i.hash) || i.hash.length !== 32))
        throw new Error("OutScript/wsh: wrong hash");
    if (i.type === 'tr' && (!isBytes(i.pubkey) || !isValidPubkey(i.pubkey, PubT.schnorr)))
        throw new Error('OutScript/tr: wrong taproot public key');
    if (i.type === 'ms' || i.type === 'tr_ns' || i.type === 'tr_ms')
        if (!Array.isArray(i.pubkeys))
            throw new Error('OutScript/multisig: wrong pubkeys array');
    if (i.type === 'ms') {
        var n = i.pubkeys.length;
        for (var _i = 0, _a = i.pubkeys; _i < _a.length; _i++) {
            var p = _a[_i];
            if (!isValidPubkey(p, PubT.ecdsa))
                throw new Error('OutScript/multisig: wrong pubkey');
        }
        if (i.m <= 0 || n > 16 || i.m > n)
            throw new Error('OutScript/multisig: invalid params');
    }
    if (i.type === 'tr_ns' || i.type === 'tr_ms') {
        for (var _b = 0, _c = i.pubkeys; _b < _c.length; _b++) {
            var p = _c[_b];
            if (!isValidPubkey(p, PubT.schnorr))
                throw new Error("OutScript/".concat(i.type, ": wrong pubkey"));
        }
    }
    if (i.type === 'tr_ms') {
        var n = i.pubkeys.length;
        if (i.m <= 0 || n > 16 || i.m > n)
            throw new Error('OutScript/tr_ms: invalid params');
    }
    return i;
});
// Address
// TODO: clean-up
function validateWitness(version, data) {
    if (data.length < 2 || data.length > 40)
        throw new Error('Witness: invalid length');
    if (version > 16)
        throw new Error('Witness: invalid version');
    if (version === 0 && !(data.length === 20 || data.length === 32))
        throw new Error('Witness: invalid length for version');
}
function programToWitness(version, data, network) {
    if (network === void 0) { network = exports.NETWORK; }
    validateWitness(version, data);
    var coder = version === 0 ? base.bech32 : base.bech32m;
    return coder.encode(network.bech32, [version].concat(coder.toWords(data)));
}
exports.programToWitness = programToWitness;
// TODO: remove?
function parseWitnessProgram(version, data) {
    validateWitness(version, data);
    var encodedVersion = version > 0 ? version + 0x50 : version;
    return concat(new Uint8Array([encodedVersion]), exports.VarBytes.encode(Uint8Array.from(data)));
}
exports.parseWitnessProgram = parseWitnessProgram;
function formatKey(hashed, prefix) {
    return exports.base58check.encode(concat(Uint8Array.from(prefix), hashed));
}
function WIF(network) {
    if (network === void 0) { network = exports.NETWORK; }
    return {
        encode: function (privKey) {
            var compressed = concat(privKey, new Uint8Array([0x01]));
            return formatKey(compressed.subarray(0, 33), [network.wif]);
        },
        decode: function (wif) {
            var parsed = exports.base58check.decode(wif);
            if (parsed[0] !== network.wif)
                throw new Error('Wrong WIF prefix');
            parsed = parsed.subarray(1);
            // Check what it is. Compressed flag?
            if (parsed.length !== 33)
                throw new Error('Wrong WIF length');
            if (parsed[32] !== 0x01)
                throw new Error('Wrong WIF postfix');
            return parsed.subarray(0, -1);
        },
    };
}
exports.WIF = WIF;
// Returns OutType, which can be used to create outscript
function Address(network) {
    if (network === void 0) { network = exports.NETWORK; }
    return {
        encode: function (from) {
            var type = from.type;
            if (type === 'wpkh')
                return programToWitness(0, from.hash, network);
            else if (type === 'wsh')
                return programToWitness(0, from.hash, network);
            else if (type === 'tr')
                return programToWitness(1, from.pubkey, network);
            else if (type === 'pkh')
                return formatKey(from.hash, [network.pubKeyHash]);
            else if (type === 'sh')
                return formatKey(from.hash, [network.scriptHash]);
            return 1;
        },
        decode: function (address) {
            if (address.length < 14 || address.length > 74)
                throw new Error('Invalid address length');
            // Bech32
            if (network.bech32 && address.toLowerCase().startsWith(network.bech32)) {
                var res = void 0;
                try {
                    res = base.bech32.decode(address);
                    if (res.words[0] !== 0)
                        throw new Error("bech32: wrong version=".concat(res.words[0]));
                }
                catch (_) {
                    // Starting from version 1 it is decoded as bech32m
                    res = base.bech32m.decode(address);
                    if (res.words[0] === 0)
                        throw new Error("bech32m: wrong version=".concat(res.words[0]));
                }
                if (res.prefix !== network.bech32)
                    throw new Error("wrong bech32 prefix=".concat(res.prefix));
                var _a = res.words, version = _a[0], program = _a.slice(1);
                var data_1 = base.bech32.fromWords(program);
                validateWitness(version, data_1);
                if (version === 0 && data_1.length === 32)
                    return { type: 'wsh', hash: data_1 };
                else if (version === 0 && data_1.length === 20)
                    return { type: 'wpkh', hash: data_1 };
                else if (version === 1 && data_1.length === 32)
                    return { type: 'tr', pubkey: data_1 };
                else
                    throw new Error('Unkown witness program');
            }
            var data = base.base58.decode(address);
            if (data.length !== 25)
                throw new Error('Invalid base58 address');
            // Pay To Public Key Hash
            if (data[0] === network.pubKeyHash) {
                var bytes = base.base58.decode(address);
                return { type: 'pkh', hash: bytes.slice(1, bytes.length - 4) };
            }
            else if (data[0] === network.scriptHash) {
                var bytes = base.base58.decode(address);
                return {
                    type: 'sh',
                    hash: base.base58.decode(address).slice(1, bytes.length - 4),
                };
            }
            throw new Error("Invalid address prefix=".concat(data[0]));
        },
    };
}
exports.Address = Address;
// /Address
var SignatureHash;
(function (SignatureHash) {
    SignatureHash[SignatureHash["DEFAULT"] = 0] = "DEFAULT";
    SignatureHash[SignatureHash["ALL"] = 1] = "ALL";
    SignatureHash[SignatureHash["NONE"] = 2] = "NONE";
    SignatureHash[SignatureHash["SINGLE"] = 3] = "SINGLE";
    SignatureHash[SignatureHash["ANYONECANPAY"] = 128] = "ANYONECANPAY";
    SignatureHash[SignatureHash["ALL_SIGHASH_ANYONECANPAY"] = 129] = "ALL_SIGHASH_ANYONECANPAY";
    SignatureHash[SignatureHash["NONE_SIGHASH_ANYONECANPAY"] = 130] = "NONE_SIGHASH_ANYONECANPAY";
    SignatureHash[SignatureHash["SINGLE_SIGHASH_ANYONECANPAY"] = 131] = "SINGLE_SIGHASH_ANYONECANPAY";
})(SignatureHash = exports.SignatureHash || (exports.SignatureHash = {}));
exports.SigHashCoder = P.apply(P.U32LE, P.coders.tsEnum(SignatureHash));
function sum(arr) {
    return arr.map(function (n) { return BigInt(n); }).reduce(function (a, b) { return a + b; });
}
// TODO: encoder maybe?
function unpackSighash(hashType) {
    var masked = hashType & 31;
    return {
        isAny: !!(hashType & 128),
        isNone: masked === 2,
        isSingle: masked === 3,
    };
}
var _sortPubkeys = function (pubkeys) { return Array.from(pubkeys).sort(cmp); };
exports._sortPubkeys = _sortPubkeys;
var def = {
    sequence: function (n) { return (n === undefined ? exports.DEFAULT_SEQUENCE : n); },
    lockTime: function (n) { return (n === undefined ? exports.DEFAULT_LOCKTIME : n); },
};
exports.TAP_LEAF_VERSION = 0xc0;
var tapLeafHash = function (script, version) {
    if (version === void 0) { version = exports.TAP_LEAF_VERSION; }
    return taggedHash('TapLeaf', new Uint8Array([version]), exports.VarBytes.encode(script));
};
exports.tapLeafHash = tapLeafHash;
function getTaprootKeys(privKey, pubKey, internalKey, merkleRoot) {
    if (merkleRoot === void 0) { merkleRoot = P.EMPTY; }
    if (P.equalBytes(internalKey, pubKey)) {
        privKey = taprootTweakPrivKey(privKey, merkleRoot);
        pubKey = secp.schnorr.getPublicKey(privKey);
    }
    return { privKey: privKey, pubKey: pubKey };
}
var Transaction = /** @class */ (function () {
    function Transaction(version, lockTime, PSBTVersion, opts) {
        if (version === void 0) { version = exports.DEFAULT_VERSION; }
        if (lockTime === void 0) { lockTime = 0; }
        if (PSBTVersion === void 0) { PSBTVersion = 0; }
        if (opts === void 0) { opts = {}; }
        this.PSBTVersion = PSBTVersion;
        this.opts = opts;
        this.global = {};
        this.inputs = [];
        this.outputs = [];
        if (lockTime !== exports.DEFAULT_LOCKTIME)
            this.global.fallbackLocktime = lockTime;
        this.global.txVersion = version;
    }
    // Import
    Transaction.fromRaw = function (raw, opts) {
        if (opts === void 0) { opts = {}; }
        var parsed = exports.RawTx.decode(raw);
        var tx = new Transaction(parsed.version, parsed.lockTime, undefined, opts);
        for (var _i = 0, _a = parsed.outputs; _i < _a.length; _i++) {
            var o = _a[_i];
            tx.addOutput(o);
        }
        tx.outputs = parsed.outputs;
        tx.inputs = parsed.inputs;
        if (parsed.witnesses) {
            for (var i = 0; i < parsed.witnesses.length; i++)
                tx.inputs[i].finalScriptWitness = parsed.witnesses[i];
        }
        return tx;
    };
    // PSBT
    Transaction.fromPSBT = function (psbt, opts) {
        if (opts === void 0) { opts = {}; }
        var parsed;
        try {
            parsed = exports.RawPSBTV0.decode(psbt);
        }
        catch (e0) {
            try {
                parsed = exports.RawPSBTV2.decode(psbt);
            }
            catch (e2) {
                // Throw error for v0 parsing, since it popular, otherwise it would be shadowed by v2 error
                throw e0;
            }
        }
        var version = parsed.global.version || 0;
        var unsigned = parsed.global.unsignedTx;
        var txVersion = !version ? unsigned === null || unsigned === void 0 ? void 0 : unsigned.version : parsed.global.txVersion;
        var lockTime = !version ? unsigned === null || unsigned === void 0 ? void 0 : unsigned.lockTime : parsed.global.fallbackLocktime;
        var tx = new Transaction(txVersion, lockTime, version, opts);
        // We need slice here, because otherwise
        var inputCount = !version ? unsigned === null || unsigned === void 0 ? void 0 : unsigned.inputs.length : parsed.global.inputCount;
        tx.inputs = parsed.inputs.slice(0, inputCount).map(function (i, j) {
            var _a;
            return (__assign(__assign({ finalScriptSig: P.EMPTY }, (_a = parsed.global.unsignedTx) === null || _a === void 0 ? void 0 : _a.inputs[j]), i));
        });
        var outputCount = !version ? unsigned === null || unsigned === void 0 ? void 0 : unsigned.outputs.length : parsed.global.outputCount;
        tx.outputs = parsed.outputs.slice(0, outputCount).map(function (i, j) {
            var _a;
            return (__assign(__assign({}, i), (_a = parsed.global.unsignedTx) === null || _a === void 0 ? void 0 : _a.outputs[j]));
        });
        tx.global = __assign(__assign({}, parsed.global), { txVersion: txVersion }); // just in case propietary/unknown fields
        if (lockTime !== exports.DEFAULT_LOCKTIME)
            tx.global.fallbackLocktime = lockTime;
        return tx;
    };
    Transaction.prototype.toPSBT = function (ver) {
        if (ver === void 0) { ver = this.PSBTVersion; }
        var inputs = this.inputs.map(function (i) { return cleanPSBTFields(ver, PSBTInput, i); });
        for (var _i = 0, inputs_1 = inputs; _i < inputs_1.length; _i++) {
            var inp = inputs_1[_i];
            // Don't serialize empty fields
            if (inp.partialSig && !inp.partialSig.length)
                delete inp.partialSig;
            if (inp.finalScriptSig && !inp.finalScriptSig.length)
                delete inp.finalScriptSig;
            if (inp.finalScriptWitness && !inp.finalScriptWitness.length)
                delete inp.finalScriptWitness;
        }
        var outputs = this.outputs.map(function (i) { return cleanPSBTFields(ver, PSBTOutput, i); });
        if (ver && ver !== 2)
            throw new Error("Wrong PSBT version=".concat(ver));
        var global = __assign({}, this.global);
        if (!ver) {
            global.unsignedTx = exports.RawTx.decode(this.unsignedTx);
            delete global.fallbackLocktime;
            delete global.txVersion;
        }
        else {
            global.version = ver;
            global.txVersion = this.version;
            global.inputCount = this.inputs.length;
            global.outputCount = this.outputs.length;
            if (global.fallbackLocktime && global.fallbackLocktime === exports.DEFAULT_LOCKTIME)
                delete global.fallbackLocktime;
        }
        if (this.opts.bip174jsCompat) {
            if (!inputs.length)
                inputs.push({});
            if (!outputs.length)
                outputs.push({});
        }
        return (ver === 2 ? exports.RawPSBTV2 : exports.RawPSBTV0).encode({
            global: global,
            inputs: inputs,
            outputs: outputs,
        });
    };
    Object.defineProperty(Transaction.prototype, "lockTime", {
        // BIP370 lockTime (https://github.com/bitcoin/bips/blob/master/bip-0370.mediawiki#determining-lock-time)
        get: function () {
            var height = exports.DEFAULT_LOCKTIME;
            var heightCnt = 0;
            var time = exports.DEFAULT_LOCKTIME;
            var timeCnt = 0;
            for (var _i = 0, _a = this.inputs; _i < _a.length; _i++) {
                var i = _a[_i];
                if (i.requiredHeightLocktime) {
                    height = Math.max(height, i.requiredHeightLocktime);
                    heightCnt++;
                }
                if (i.requiredTimeLocktime) {
                    time = Math.max(time, i.requiredTimeLocktime);
                    timeCnt++;
                }
            }
            if (heightCnt && heightCnt >= timeCnt)
                return height;
            if (time !== exports.DEFAULT_LOCKTIME)
                return time;
            return this.global.fallbackLocktime || exports.DEFAULT_LOCKTIME;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Transaction.prototype, "version", {
        get: function () {
            // Should be not possible
            if (this.global.txVersion === undefined)
                throw new Error('No global.txVersion');
            return this.global.txVersion;
        },
        enumerable: false,
        configurable: true
    });
    Transaction.prototype.inputStatus = function (idx) {
        this.checkInputIdx(idx);
        var input = this.inputs[idx];
        // Finalized
        if (input.finalScriptSig && input.finalScriptSig.length)
            return 'finalized';
        if (input.finalScriptWitness && input.finalScriptWitness.length)
            return 'finalized';
        // Signed taproot
        if (input.tapKeySig)
            return 'signed';
        if (input.tapScriptSig && input.tapScriptSig.length)
            return 'signed';
        // Signed
        if (input.partialSig && input.partialSig.length)
            return 'signed';
        return 'unsigned';
    };
    // TODO: re-use in preimages
    Transaction.prototype.inputSighash = function (idx) {
        this.checkInputIdx(idx);
        var sighash = this.inputType(this.inputs[idx]).sighash;
        // ALL or DEFAULT -- everything signed
        // NONE           -- all inputs + no outputs
        // SINGLE         -- all inputs + output with same index
        // ALL + ANYONE   -- specific input + all outputs
        // NONE + ANYONE  -- specific input + no outputs
        // SINGLE         -- specific inputs + output with same index
        var sigOutputs = sighash === SignatureHash.DEFAULT ? SignatureHash.ALL : sighash & 3;
        var sigInputs = sighash & SignatureHash.ANYONECANPAY;
        return { sigInputs: sigInputs, sigOutputs: sigOutputs };
    };
    Transaction.prototype.signStatus = function () {
        // if addInput or addOutput is not possible, then all inputs or outputs are signed
        var addInput = true, addOutput = true;
        var inputs = [], outputs = [];
        for (var idx = 0; idx < this.inputs.length; idx++) {
            var status = this.inputStatus(idx);
            // Unsigned input doesn't affect anything
            if (status === 'unsigned')
                continue;
            var _a = this.inputSighash(idx), sigInputs = _a.sigInputs, sigOutputs = _a.sigOutputs;
            // Input type
            if (sigInputs === SignatureHash.ANYONECANPAY)
                inputs.push(idx);
            else
                addInput = false;
            // Output type
            if (sigOutputs === SignatureHash.ALL)
                addOutput = false;
            else if (sigOutputs === SignatureHash.SINGLE)
                outputs.push(idx);
            else if (sigOutputs === SignatureHash.NONE) {
                // Doesn't affect any outputs at all
            }
            else
                throw new Error("Wrong signature hash output type: ".concat(sigOutputs));
        }
        return { addInput: addInput, addOutput: addOutput, inputs: inputs, outputs: outputs };
    };
    Object.defineProperty(Transaction.prototype, "isFinal", {
        get: function () {
            for (var idx = 0; idx < this.inputs.length; idx++)
                if (this.inputStatus(idx) !== 'finalized')
                    return false;
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Transaction.prototype, "hasWitnesses", {
        // Info utils
        get: function () {
            var out = false;
            for (var _i = 0, _a = this.inputs; _i < _a.length; _i++) {
                var i = _a[_i];
                if (i.finalScriptWitness && i.finalScriptWitness.length)
                    out = true;
            }
            return out;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Transaction.prototype, "weight", {
        // https://en.bitcoin.it/wiki/Weight_units
        get: function () {
            if (!this.isFinal)
                throw new Error('Transaction is not finalized');
            // TODO: Can we find out how much witnesses/script will be used before signing?
            var out = 32;
            if (this.hasWitnesses)
                out += 2;
            out += 4 * CompactSizeLen.encode(this.inputs.length).length;
            out += 4 * CompactSizeLen.encode(this.outputs.length).length;
            for (var _i = 0, _a = this.inputs; _i < _a.length; _i++) {
                var i = _a[_i];
                out += 160 + 4 * exports.VarBytes.encode(i.finalScriptSig).length;
            }
            for (var _b = 0, _c = this.outputs; _b < _c.length; _b++) {
                var o = _c[_b];
                out += 32 + 4 * exports.VarBytes.encode(o.script).length;
            }
            if (this.hasWitnesses) {
                for (var _d = 0, _e = this.inputs; _d < _e.length; _d++) {
                    var i = _e[_d];
                    if (i.finalScriptWitness)
                        out += exports.RawWitness.encode(i.finalScriptWitness).length;
                }
            }
            return out;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Transaction.prototype, "vsize", {
        get: function () {
            return Math.ceil(this.weight / 4);
        },
        enumerable: false,
        configurable: true
    });
    Transaction.prototype.toBytes = function (withScriptSig, withWitness) {
        if (withScriptSig === void 0) { withScriptSig = false; }
        if (withWitness === void 0) { withWitness = false; }
        return exports.RawTx.encode({
            version: this.version,
            lockTime: this.lockTime,
            inputs: this.inputs.map(function (i) { return (__assign(__assign({}, i), { finalScriptSig: (withScriptSig && i.finalScriptSig) || P.EMPTY })); }),
            outputs: this.outputs,
            witnesses: this.inputs.map(function (i) { return i.finalScriptWitness || []; }),
            segwitFlag: withWitness && this.hasWitnesses,
        });
    };
    Object.defineProperty(Transaction.prototype, "unsignedTx", {
        get: function () {
            return this.toBytes(false, false);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Transaction.prototype, "hex", {
        get: function () {
            return base.hex.encode(this.toBytes(true, this.hasWitnesses));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Transaction.prototype, "hash", {
        // TODO: hash requires non-empty script in inputs, why?
        get: function () {
            if (!this.isFinal)
                throw new Error('Transaction is not finalized');
            return base.hex.encode(sha256x2(this.toBytes(true)));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Transaction.prototype, "id", {
        get: function () {
            if (!this.isFinal)
                throw new Error('Transaction is not finalized');
            return base.hex.encode(sha256x2(this.toBytes(true)).reverse());
        },
        enumerable: false,
        configurable: true
    });
    // Input stuff
    Transaction.prototype.checkInputIdx = function (idx) {
        if (!Number.isSafeInteger(idx) || 0 > idx || idx >= this.inputs.length)
            throw new Error("Wrong input index=".concat(idx));
    };
    // Modification
    Transaction.prototype.normalizeInput = function (i, cur, allowedFields) {
        var res = __assign(__assign({}, cur), i);
        if (res.sequence === undefined)
            res.sequence = exports.DEFAULT_SEQUENCE;
        if (typeof res.hash === 'string')
            res.hash = base.hex.decode(res.hash).reverse();
        if (res.tapMerkleRoot === null)
            delete res.tapMerkleRoot;
        res = mergeKeyMap(PSBTInput, res, cur, allowedFields);
        PSBTInputCoder.encode(res);
        if (res.hash === undefined || res.index === undefined)
            throw new Error('Transaction/input: hash and index required');
        // Cannot move in PSBTInputCoder, since it requires opts for parsing
        if (res.nonWitnessUtxo) {
            var outputs = res.nonWitnessUtxo.outputs;
            if (outputs.length - 1 < res.index)
                throw new Error('nonWitnessUtxo: incorect output index');
            var tx = Transaction.fromRaw(exports.RawTx.encode(res.nonWitnessUtxo), this.opts);
            var hash = base.hex.encode(res.hash);
            if (tx.id !== hash)
                throw new Error("nonWitnessUtxo: wrong hash, exp=".concat(hash, " got=").concat(tx.id));
        }
        // TODO: use this.prevout?
        var prevOut;
        if (res.nonWitnessUtxo && i.index !== undefined)
            prevOut = res.nonWitnessUtxo.outputs[res.index];
        else if (res.witnessUtxo)
            prevOut = res.witnessUtxo;
        if (!this.opts.disableScriptCheck)
            checkScript(prevOut && prevOut.script, res.redeemScript, res.witnessScript);
        return res;
    };
    Transaction.prototype.addInput = function (input) {
        if (!this.signStatus().addInput)
            throw new Error('Tx has signed inputs, cannot add new one');
        this.inputs.push(this.normalizeInput(input));
        return this.inputs.length - 1;
    };
    Transaction.prototype.updateInput = function (idx, input) {
        this.checkInputIdx(idx);
        var allowedFields = undefined;
        var status = this.signStatus();
        if (!status.addInput || status.inputs.includes(idx))
            allowedFields = PSBTInputUnsignedKeys;
        this.inputs[idx] = this.normalizeInput(input, this.inputs[idx], allowedFields);
    };
    // Output stuff
    Transaction.prototype.checkOutputIdx = function (idx) {
        if (!Number.isSafeInteger(idx) || 0 > idx || idx >= this.outputs.length)
            throw new Error("Wrong output index=".concat(idx));
    };
    Transaction.prototype.normalizeOutput = function (o, cur, allowedFields) {
        var res = __assign(__assign({}, cur), o);
        if (res.amount !== undefined)
            res.amount = typeof res.amount === 'string' ? exports.Decimal.decode(res.amount) : res.amount;
        res = mergeKeyMap(PSBTOutput, res, cur, allowedFields);
        PSBTOutputCoder.encode(res);
        if (res.script === undefined || res.amount === undefined)
            throw new Error('Transaction/output: script and amount required');
        if (!this.opts.allowUnknowOutput && exports.OutScript.decode(res.script).type === 'unknown') {
            throw new Error('Transaction/output: unknown output script type, there is a chance that input is unspendable. Pass allowUnkownScript=true, if you sure');
        }
        if (!this.opts.disableScriptCheck)
            checkScript(res.script, res.redeemScript, res.witnessScript);
        return res;
    };
    Transaction.prototype.addOutput = function (o) {
        if (!this.signStatus().addOutput)
            throw new Error('Tx has signed outputs, cannot add new one');
        this.outputs.push(this.normalizeOutput(o));
        return this.outputs.length - 1;
    };
    Transaction.prototype.updateOutput = function (idx, output) {
        this.checkOutputIdx(idx);
        var allowedFields = undefined;
        var status = this.signStatus();
        if (!status.addOutput || status.outputs.includes(idx))
            allowedFields = PSBTOutputUnsignedKeys;
        this.outputs[idx] = this.normalizeOutput(output, this.outputs[idx], allowedFields);
    };
    Transaction.prototype.addOutputAddress = function (address, amount, network) {
        if (network === void 0) { network = exports.NETWORK; }
        return this.addOutput({
            script: exports.OutScript.encode(Address(network).decode(address)),
            amount: typeof amount === 'string' ? exports.Decimal.decode(amount) : amount,
        });
    };
    Object.defineProperty(Transaction.prototype, "fee", {
        // Utils
        get: function () {
            var res = 0n;
            for (var _i = 0, _a = this.inputs; _i < _a.length; _i++) {
                var i = _a[_i];
                var prevOut = this.prevOut(i);
                if (!prevOut)
                    throw new Error('Empty input amount');
                res += prevOut.amount;
            }
            for (var _b = 0, _c = this.outputs; _b < _c.length; _b++) {
                var i = _c[_b];
                res -= i.amount;
            }
            return res;
        },
        enumerable: false,
        configurable: true
    });
    // Signing
    // Based on https://github.com/bitcoin/bitcoin/blob/5871b5b5ab57a0caf9b7514eb162c491c83281d5/test/functional/test_framework/script.py#L624
    // There is optimization opportunity to re-use hashes for multiple inputs for witness v0/v1,
    // but we are trying to be less complicated for audit purpose for now.
    Transaction.prototype.preimageLegacy = function (idx, prevOutScript, hashType) {
        var _a = unpackSighash(hashType), isAny = _a.isAny, isNone = _a.isNone, isSingle = _a.isSingle;
        if (idx < 0 || !Number.isSafeInteger(idx))
            throw new Error("Invalid input idx=".concat(idx));
        if ((isSingle && idx >= this.outputs.length) || idx >= this.inputs.length)
            return P.U256BE.encode(1n);
        prevOutScript = exports.Script.encode(exports.Script.decode(prevOutScript).filter(function (i) { return i !== 'CODESEPARATOR'; }));
        var inputs = this.inputs.map(function (input, inputIdx) { return (__assign(__assign({}, input), { finalScriptSig: inputIdx === idx ? prevOutScript : P.EMPTY })); });
        if (isAny)
            inputs = [inputs[idx]];
        else if (isNone || isSingle) {
            inputs = inputs.map(function (input, inputIdx) { return (__assign(__assign({}, input), { sequence: inputIdx === idx ? def.sequence(input.sequence) : 0 })); });
        }
        var outputs = this.outputs;
        if (isNone)
            outputs = [];
        else if (isSingle) {
            outputs = this.outputs.slice(0, idx).fill(EMPTY_OUTPUT).concat([outputs[idx]]);
        }
        var tmpTx = exports.RawTx.encode({
            lockTime: this.lockTime,
            version: this.version,
            segwitFlag: false,
            inputs: inputs,
            outputs: outputs,
        });
        return sha256x2(tmpTx, P.I32LE.encode(hashType));
    };
    Transaction.prototype.preimageWitnessV0 = function (idx, prevOutScript, hashType, amount) {
        var _a = unpackSighash(hashType), isAny = _a.isAny, isNone = _a.isNone, isSingle = _a.isSingle;
        var inputHash = EMPTY32;
        var sequenceHash = EMPTY32;
        var outputHash = EMPTY32;
        var inputs = this.inputs;
        if (!isAny)
            inputHash = sha256x2.apply(void 0, inputs.map(TxHashIdx.encode));
        if (!isAny && !isSingle && !isNone)
            sequenceHash = sha256x2.apply(void 0, inputs.map(function (i) { return P.U32LE.encode(def.sequence(i.sequence)); }));
        if (!isSingle && !isNone) {
            outputHash = sha256x2.apply(void 0, this.outputs.map(exports.RawOutput.encode));
        }
        else if (isSingle && idx < this.outputs.length)
            outputHash = sha256x2(exports.RawOutput.encode(this.outputs[idx]));
        var input = inputs[idx];
        return sha256x2(P.I32LE.encode(this.version), inputHash, sequenceHash, P.bytes(32, true).encode(input.hash), P.U32LE.encode(input.index), exports.VarBytes.encode(prevOutScript), P.U64LE.encode(amount), P.U32LE.encode(def.sequence(input.sequence)), outputHash, P.U32LE.encode(this.lockTime), P.U32LE.encode(hashType));
    };
    Transaction.prototype.preimageWitnessV1 = function (idx, prevOutScript, hashType, amount, codeSeparator, leafScript, leafVer, annex) {
        if (codeSeparator === void 0) { codeSeparator = -1; }
        if (leafVer === void 0) { leafVer = 0xc0; }
        if (!Array.isArray(amount) || this.inputs.length !== amount.length)
            throw new Error("Invalid amounts array=".concat(amount));
        if (!Array.isArray(prevOutScript) || this.inputs.length !== prevOutScript.length)
            throw new Error("Invalid prevOutScript array=".concat(prevOutScript));
        var out = [
            P.U8.encode(0),
            P.U8.encode(hashType),
            P.I32LE.encode(this.version),
            P.U32LE.encode(this.lockTime),
        ];
        var outType = hashType === SignatureHash.DEFAULT ? SignatureHash.ALL : hashType & 3;
        var inType = hashType & SignatureHash.ANYONECANPAY;
        if (inType !== SignatureHash.ANYONECANPAY) {
            out.push.apply(out, [
                this.inputs.map(TxHashIdx.encode),
                amount.map(P.U64LE.encode),
                prevOutScript.map(exports.VarBytes.encode),
                this.inputs.map(function (i) { return P.U32LE.encode(def.sequence(i.sequence)); }),
            ].map(function (i) { return (0, sha256_1.sha256)(concat.apply(void 0, i)); }));
        }
        if (outType === SignatureHash.ALL) {
            out.push((0, sha256_1.sha256)(concat.apply(void 0, this.outputs.map(exports.RawOutput.encode))));
        }
        var spendType = (annex ? 1 : 0) | (leafScript ? 2 : 0);
        out.push(new Uint8Array([spendType]));
        if (inType === SignatureHash.ANYONECANPAY) {
            var inp = this.inputs[idx];
            out.push(TxHashIdx.encode(inp), P.U64LE.encode(amount[idx]), exports.VarBytes.encode(prevOutScript[idx]), P.U32LE.encode(def.sequence(inp.sequence)));
        }
        else
            out.push(P.U32LE.encode(idx));
        if (spendType & 1)
            out.push((0, sha256_1.sha256)(exports.VarBytes.encode(annex)));
        if (outType === SignatureHash.SINGLE)
            out.push(idx < this.outputs.length ? (0, sha256_1.sha256)(exports.RawOutput.encode(this.outputs[idx])) : EMPTY32);
        if (leafScript)
            out.push((0, exports.tapLeafHash)(leafScript, leafVer), P.U8.encode(0), P.I32LE.encode(codeSeparator));
        return taggedHash.apply(void 0, __spreadArray(['TapSighash'], out, false));
    };
    // Utils for sign/finalize
    // Used pretty often, should be fast
    Transaction.prototype.prevOut = function (input) {
        if (input.nonWitnessUtxo)
            return input.nonWitnessUtxo.outputs[input.index];
        else if (input.witnessUtxo)
            return input.witnessUtxo;
        else
            throw new Error('Cannot find previous output info.');
    };
    Transaction.prototype.inputType = function (input) {
        // TODO: check here if non-segwit tx + no nonWitnessUtxo
        var txType = 'legacy';
        var defaultSighash = SignatureHash.ALL;
        var prevOut = this.prevOut(input);
        var first = exports.OutScript.decode(prevOut.script);
        var type = first.type;
        var cur = first;
        var stack = [first];
        if (first.type === 'tr') {
            defaultSighash = SignatureHash.DEFAULT;
            return {
                txType: 'taproot',
                type: 'tr',
                last: first,
                lastScript: prevOut.script,
                defaultSighash: defaultSighash,
                sighash: input.sighashType || defaultSighash,
            };
        }
        else {
            if (first.type === 'wpkh' || first.type === 'wsh')
                txType = 'segwit';
            if (first.type === 'sh') {
                if (!input.redeemScript)
                    throw new Error('inputType: sh without redeemScript');
                var child = exports.OutScript.decode(input.redeemScript);
                if (child.type === 'wpkh' || child.type === 'wsh')
                    txType = 'segwit';
                stack.push(child);
                cur = child;
                type += "-".concat(child.type);
            }
            // wsh can be inside sh
            if (cur.type === 'wsh') {
                if (!input.witnessScript)
                    throw new Error('inputType: wsh without witnessScript');
                var child = exports.OutScript.decode(input.witnessScript);
                if (child.type === 'wsh')
                    txType = 'segwit';
                stack.push(child);
                cur = child;
                type += "-".concat(child.type);
            }
            // TODO: check for uncompressed public keys in segwit tx
            var last = stack[stack.length - 1];
            if (last.type === 'sh' || last.type === 'wsh')
                throw new Error('inputType: sh/wsh cannot be terminal type');
            var lastScript = exports.OutScript.encode(last);
            var res = {
                type: type,
                txType: txType,
                last: last,
                lastScript: lastScript,
                defaultSighash: defaultSighash,
                sighash: input.sighashType || defaultSighash,
            };
            return res;
        }
    };
    // TODO: signer can be privateKey OR instance of bip32 HD stuff
    Transaction.prototype.signIdx = function (privateKey, idx, allowedSighash, _auxRand) {
        this.checkInputIdx(idx);
        var input = this.inputs[idx];
        var inputType = this.inputType(input);
        // Handle BIP32 HDKey
        if (!(privateKey instanceof Uint8Array)) {
            if (!input.bip32Derivation || !input.bip32Derivation.length)
                throw new Error('bip32Derivation: empty');
            var signers = input.bip32Derivation
                .filter(function (i) { return i[1].fingerprint == privateKey.fingerprint; })
                .map(function (_a) {
                var pubKey = _a[0], path = _a[1].path;
                var s = privateKey;
                for (var _i = 0, path_1 = path; _i < path_1.length; _i++) {
                    var i = path_1[_i];
                    s = s.deriveChild(i);
                }
                if (!P.equalBytes(s.publicKey, pubKey))
                    throw new Error('bip32Derivation: wrong pubKey');
                if (!s.privateKey)
                    throw new Error('bip32Derivation: no privateKey');
                return s;
            });
            if (!signers.length)
                throw new Error("bip32Derivation: no items with fingerprint=".concat(privateKey.fingerprint));
            var signed = false;
            for (var _i = 0, signers_1 = signers; _i < signers_1.length; _i++) {
                var s = signers_1[_i];
                if (this.signIdx(s.privateKey, idx))
                    signed = true;
            }
            return signed;
        }
        // Sighash checks
        // Just for compat with bitcoinjs-lib, so users won't face unexpected behaviour.
        if (!allowedSighash)
            allowedSighash = [inputType.defaultSighash];
        var sighash = inputType.sighash;
        if (!allowedSighash.includes(sighash)) {
            throw new Error("Input with not allowed sigHash=".concat(sighash, ". Allowed: ").concat(allowedSighash.join(', ')));
        }
        // NOTE: it is possible to sign these inputs for legacy/segwit v0 (but no taproot!),
        // however this was because of bug in bitcoin-core, which remains here because of consensus.
        // If this is absolutely neccessary for you workflow, please open issue. For now it is disable to
        // avoid complicated workflow where SINGLE will block adding new outputs
        var _a = this.inputSighash(idx), sigInputs = _a.sigInputs, sigOutputs = _a.sigOutputs;
        if (sigOutputs === SignatureHash.SINGLE && idx >= this.outputs.length) {
            throw new Error("Input with sighash SINGLE, but there is no output with corresponding index=".concat(idx));
        }
        // Actual signing
        // Taproot
        var prevOut = this.prevOut(input);
        if (inputType.txType === 'taproot') {
            if (input.tapBip32Derivation)
                throw new Error('tapBip32Derivation unsupported');
            var prevOuts = this.inputs.map(this.prevOut);
            var prevOutScript = prevOuts.map(function (i) { return i.script; });
            var amount = prevOuts.map(function (i) { return i.amount; });
            var signed = false;
            var schnorrPub = secp.schnorr.getPublicKey(privateKey);
            var merkleRoot = input.tapMerkleRoot || P.EMPTY;
            if (input.tapInternalKey) {
                // internal + tweak = tweaked key
                // if internal key == current public key, we need to tweak private key,
                // otherwise sign as is. bitcoinjs implementation always wants tweaked
                // priv key to be provided
                var _b = getTaprootKeys(privateKey, schnorrPub, input.tapInternalKey, merkleRoot), pubKey = _b.pubKey, privKey = _b.privKey;
                var _c = taprootTweakPubkey(input.tapInternalKey, merkleRoot), taprootPubKey = _c[0], parity = _c[1];
                if (P.equalBytes(taprootPubKey, pubKey)) {
                    var hash = this.preimageWitnessV1(idx, prevOutScript, sighash, amount);
                    var sig = concat(secp.schnorr.signSync(hash, privKey, _auxRand), sighash !== SignatureHash.DEFAULT ? new Uint8Array([sighash]) : P.EMPTY);
                    this.updateInput(idx, { tapKeySig: sig });
                    signed = true;
                }
            }
            if (input.tapLeafScript) {
                input.tapScriptSig = input.tapScriptSig || [];
                var _loop_3 = function (cb, _script) {
                    var script = _script.subarray(0, -1);
                    var scriptDecoded = exports.Script.decode(script);
                    var ver = _script[_script.length - 1];
                    var hash = (0, exports.tapLeafHash)(script, ver);
                    var _j = getTaprootKeys(privateKey, schnorrPub, cb.internalKey, P.EMPTY // Because we cannot have nested taproot tree
                    ), pubKey = _j.pubKey, privKey = _j.privKey;
                    var pos = scriptDecoded.findIndex(function (i) { return i instanceof Uint8Array && P.equalBytes(i, pubKey); });
                    // Skip if there is no public key in tapLeafScript
                    if (pos === -1)
                        return "continue";
                    var msg = this_1.preimageWitnessV1(idx, prevOutScript, sighash, amount, undefined, script, ver);
                    var sig = concat(secp.schnorr.signSync(msg, privKey, _auxRand), sighash !== SignatureHash.DEFAULT ? new Uint8Array([sighash]) : P.EMPTY);
                    this_1.updateInput(idx, { tapScriptSig: [[{ pubKey: pubKey, leafHash: hash }, sig]] });
                    signed = true;
                };
                var this_1 = this;
                for (var _d = 0, _e = input.tapLeafScript; _d < _e.length; _d++) {
                    var _f = _e[_d], cb = _f[0], _script = _f[1];
                    _loop_3(cb, _script);
                }
            }
            if (!signed)
                throw new Error('No taproot scripts signed');
            return true;
        }
        else {
            // only compressed keys are supported for now
            var pubKey = secp.getPublicKey(privateKey, true);
            // TODO: replace with explicit checks
            // Check if script has public key or its has inside
            var hasPubkey = false;
            var pubKeyHash = hash160(pubKey);
            for (var _g = 0, _h = exports.Script.decode(inputType.lastScript); _g < _h.length; _g++) {
                var i = _h[_g];
                if (i instanceof Uint8Array && (P.equalBytes(i, pubKey) || P.equalBytes(i, pubKeyHash)))
                    hasPubkey = true;
            }
            if (!hasPubkey)
                throw new Error("Input script doesn't have pubKey: ".concat(inputType.lastScript));
            var hash = void 0;
            if (inputType.txType === 'legacy') {
                if (!this.opts.allowLegacyWitnessUtxo && !input.nonWitnessUtxo) {
                    throw new Error("Transaction/sign: legacy input without nonWitnessUtxo, can result in attack that forces paying higher fees. Pass allowLegacyWitnessUtxo=true, if you sure");
                }
                hash = this.preimageLegacy(idx, inputType.lastScript, sighash);
            }
            else if (inputType.txType === 'segwit') {
                var script = inputType.lastScript;
                // If wpkh OR sh-wpkh, wsh-wpkh is impossible, so looks ok
                // TODO: re-check
                if (inputType.last.type === 'wpkh')
                    script = exports.OutScript.encode({ type: 'pkh', hash: inputType.last.hash });
                hash = this.preimageWitnessV0(idx, script, sighash, prevOut.amount);
            }
            else
                throw new Error("Transaction/sign: unknown tx type: ".concat(inputType.txType));
            var sig = signECDSA(hash, privateKey, this.opts.lowR);
            this.updateInput(idx, {
                partialSig: [[pubKey, concat(sig, new Uint8Array([sighash]))]],
            });
        }
        return true;
    };
    // TODO: this is bad API. Will work if user creates and signs tx, but if
    // there is some complex workflow with exchanging PSBT and signing them,
    // then it is better to validate which output user signs. How could a better API look like?
    // Example: user adds input, sends to another party, then signs received input (mixer etc),
    // another user can add different input for same key and user will sign it.
    // Even worse: another user can add bip32 derivation, and spend money from different address.
    Transaction.prototype.sign = function (privateKey, allowedSighash, _auxRand) {
        var num = 0;
        for (var i = 0; i < this.inputs.length; i++) {
            try {
                if (this.signIdx(privateKey, i, allowedSighash, _auxRand))
                    num++;
            }
            catch (e) { }
        }
        if (!num)
            throw new Error('No inputs signed');
        return num;
    };
    Transaction.prototype.finalizeIdx = function (idx) {
        this.checkInputIdx(idx);
        if (this.fee < 0n)
            throw new Error('Outputs spends more than inputs amount');
        var input = this.inputs[idx];
        var inputType = this.inputType(input);
        // Taproot finalize
        if (inputType.txType === 'taproot') {
            if (input.tapKeySig)
                input.finalScriptWitness = [input.tapKeySig];
            else if (input.tapLeafScript && input.tapScriptSig) {
                // TODO: this works the same as bitcoinjs lib fork, however it is not secure,
                // since we add signatures to script which we don't understand.
                // Maybe it is better to disable it?
                // Proper way will be to create check for known scripts, however MuSig, p2tr_ns and other
                // scripts are still not standard; and it will take significant amount of work for them.
                // Sort leafs by control block length. TODO: maybe need to check script length too?
                var leafs = input.tapLeafScript.sort(function (a, b) {
                    return exports.TaprootControlBlock.encode(a[0]).length - exports.TaprootControlBlock.encode(b[0]).length;
                });
                var _loop_4 = function (cb, _script) {
                    // Last byte is version
                    var script = _script.slice(0, -1);
                    var ver = _script[_script.length - 1];
                    var outScript_1 = exports.OutScript.decode(script);
                    var hash = (0, exports.tapLeafHash)(script, ver);
                    var scriptSig = input.tapScriptSig.filter(function (i) { return P.equalBytes(i[0].leafHash, hash); });
                    var signatures = [];
                    if (outScript_1.type === 'tr_ms') {
                        var m = outScript_1.m;
                        var pubkeys = outScript_1.pubkeys;
                        var added = 0;
                        var _loop_6 = function (pub) {
                            var sigIdx = scriptSig.findIndex(function (i) { return P.equalBytes(i[0].pubKey, pub); });
                            // Should have exact amount of signatures (more -- will fail)
                            if (added === m || sigIdx === -1) {
                                signatures.push(P.EMPTY);
                                return "continue";
                            }
                            signatures.push(scriptSig[sigIdx][1]);
                            added++;
                        };
                        for (var _c = 0, pubkeys_3 = pubkeys; _c < pubkeys_3.length; _c++) {
                            var pub = pubkeys_3[_c];
                            _loop_6(pub);
                        }
                        // Should be exact same as m
                        if (added !== m)
                            return "continue";
                    }
                    else if (outScript_1.type === 'tr_ns') {
                        var _loop_7 = function (pub) {
                            var sigIdx = scriptSig.findIndex(function (i) { return P.equalBytes(i[0].pubKey, pub); });
                            if (sigIdx === -1)
                                return "continue";
                            signatures.push(scriptSig[sigIdx][1]);
                        };
                        for (var _d = 0, _e = outScript_1.pubkeys; _d < _e.length; _d++) {
                            var pub = _e[_d];
                            _loop_7(pub);
                        }
                        if (signatures.length !== outScript_1.pubkeys.length)
                            return "continue";
                    }
                    else if (outScript_1.type === 'unknown' && this_2.opts.allowUnknowInput) {
                        // Trying our best to sign what we can
                        var scriptDecoded_1 = exports.Script.decode(script);
                        signatures = scriptSig
                            .map(function (_a) {
                            var pubKey = _a[0].pubKey, signature = _a[1];
                            var pos = scriptDecoded_1.findIndex(function (i) { return i instanceof Uint8Array && P.equalBytes(i, pubKey); });
                            if (pos === -1)
                                throw new Error('finalize/taproot: cannot find position of pubkey in script');
                            return { signature: signature, pos: pos };
                        })
                            // Reverse order (because witness is stack and we take last element first from it)
                            .sort(function (a, b) { return a.pos - b.pos; })
                            .map(function (i) { return i.signature; });
                        if (!signatures.length)
                            return "continue";
                    }
                    else
                        throw new Error('Finalize: Unknown tapLeafScript');
                    // Witness is stack, so last element will be used first
                    input.finalScriptWitness = signatures
                        .reverse()
                        .concat([script, exports.TaprootControlBlock.encode(cb)]);
                    return "break";
                };
                var this_2 = this;
                for (var _i = 0, leafs_1 = leafs; _i < leafs_1.length; _i++) {
                    var _a = leafs_1[_i], cb = _a[0], _script = _a[1];
                    var state_1 = _loop_4(cb, _script);
                    if (state_1 === "break")
                        break;
                }
                if (!input.finalScriptWitness)
                    throw new Error('finalize/taproot: empty witness');
            }
            else
                throw new Error('finalize/taproot: unknown input');
            // Clean input
            for (var k in input)
                if (!PSBTInputFinalKeys.includes(k))
                    delete input[k];
            return;
        }
        var outScript = inputType.lastScript;
        var isSegwit = inputType.txType === 'segwit';
        if (!input.partialSig || !input.partialSig.length)
            throw new Error('Not enough partial sign');
        // TODO: this is completely broken, fix.
        var inputScript;
        var witness = [];
        // TODO: move input scripts closer to payments/output scripts
        // Multisig
        if (inputType.last.type === 'ms') {
            var m = inputType.last.m;
            var pubkeys = inputType.last.pubkeys;
            var signatures = [];
            var _loop_5 = function (pub) {
                var sign = input.partialSig.find(function (s) { return P.equalBytes(pub, s[0]); });
                if (!sign)
                    return "continue";
                signatures.push(sign[1]);
            };
            // partial: [pubkey, sign]
            for (var _b = 0, pubkeys_2 = pubkeys; _b < pubkeys_2.length; _b++) {
                var pub = pubkeys_2[_b];
                _loop_5(pub);
            }
            signatures = signatures.slice(0, m);
            if (signatures.length !== m) {
                throw new Error("Multisig: wrong signatures count, m=".concat(m, " n=").concat(pubkeys.length, " signatures=").concat(signatures.length));
            }
            inputScript = exports.Script.encode(__spreadArray(['OP_0'], signatures, true));
        }
        else if (inputType.last.type === 'pk') {
            inputScript = exports.Script.encode([input.partialSig[0][1]]);
        }
        else if (inputType.last.type === 'pkh') {
            // check if output is correct here
            inputScript = exports.Script.encode([input.partialSig[0][1], input.partialSig[0][0]]);
        }
        else if (inputType.last.type === 'wpkh') {
            // check if output is correct here
            inputScript = P.EMPTY;
            witness = [input.partialSig[0][1], input.partialSig[0][0]];
        }
        else if (inputType.last.type === 'unknown' && !this.opts.allowUnknowInput)
            throw new Error('Unknown inputs not allowed');
        var finalScriptSig, finalScriptWitness;
        if (input.witnessScript) {
            // P2WSH
            if (inputScript && inputScript.length > 0 && outScript && outScript.length > 0) {
                witness = exports.Script.decode(inputScript).map(function (i) {
                    if (i === 'OP_0')
                        return P.EMPTY;
                    if (i instanceof Uint8Array)
                        return i;
                    throw new Error("Wrong witness op=".concat(i));
                });
            }
            if (witness && outScript)
                witness = witness.concat(outScript);
            outScript = exports.Script.encode(['OP_0', (0, sha256_1.sha256)(outScript)]);
            inputScript = P.EMPTY;
        }
        if (isSegwit)
            finalScriptWitness = witness;
        if (input.redeemScript) {
            // P2SH
            finalScriptSig = exports.Script.encode(__spreadArray(__spreadArray([], exports.Script.decode(inputScript), true), [outScript], false));
        }
        else if (!isSegwit)
            finalScriptSig = inputScript;
        if (!finalScriptSig && !finalScriptWitness)
            throw new Error('Unknown error finalizing input');
        if (finalScriptSig)
            input.finalScriptSig = finalScriptSig;
        if (finalScriptWitness)
            input.finalScriptWitness = finalScriptWitness;
        // Clean input
        for (var k in input)
            if (!PSBTInputFinalKeys.includes(k))
                delete input[k];
    };
    Transaction.prototype.finalize = function () {
        for (var i = 0; i < this.inputs.length; i++)
            this.finalizeIdx(i);
    };
    Transaction.prototype.extract = function () {
        if (!this.isFinal)
            throw new Error('Transaction has unfinalized inputs');
        if (!this.outputs.length)
            throw new Error('Transaction has no outputs');
        // TODO: Check if inputs.amount >= outputs.amount
        return this.toBytes(true, true);
    };
    Transaction.prototype.combine = function (other) {
        for (var _i = 0, _a = ['PSBTVersion', 'version', 'lockTime']; _i < _a.length; _i++) {
            var k = _a[_i];
            if (this[k] !== other[k])
                throw new Error("Transaction/combine: different ".concat(k, " this=").concat(this[k], " other=").concat(other[k]));
        }
        for (var _b = 0, _c = ['inputs', 'outputs']; _b < _c.length; _b++) {
            var k = _c[_b];
            if (this[k].length !== other[k].length) {
                throw new Error("Transaction/combine: different ".concat(k, " length this=").concat(this[k].length, " other=").concat(other[k].length));
            }
        }
        var thisUnsigned = this.global.unsignedTx ? exports.RawTx.encode(this.global.unsignedTx) : P.EMPTY;
        var otherUnsigned = other.global.unsignedTx ? exports.RawTx.encode(other.global.unsignedTx) : P.EMPTY;
        if (!P.equalBytes(thisUnsigned, otherUnsigned))
            throw new Error("Transaction/combine: different unsigned tx");
        this.global = mergeKeyMap(PSBTGlobal, this.global, other.global);
        for (var i = 0; i < this.inputs.length; i++)
            this.updateInput(i, other.inputs[i]);
        for (var i = 0; i < this.outputs.length; i++)
            this.updateOutput(i, other.outputs[i]);
        return this;
    };
    return Transaction;
}());
exports.Transaction = Transaction;
// User facing API?
// Simple pubkey address, without complex scripts
function getAddress(type, privKey, network) {
    if (network === void 0) { network = exports.NETWORK; }
    if (type === 'tr') {
        return p2tr(secp.schnorr.getPublicKey(privKey), undefined, network).address;
    }
    var pubKey = secp.getPublicKey(privKey, true);
    if (type === 'pkh')
        return (0, exports.p2pkh)(pubKey, network).address;
    if (type === 'wpkh')
        return (0, exports.p2wpkh)(pubKey, network).address;
    throw new Error("getAddress: unknown type=".concat(type));
}
exports.getAddress = getAddress;
// TODO: rewrite
function multisig(m, pubkeys, sorted, witness) {
    if (sorted === void 0) { sorted = false; }
    if (witness === void 0) { witness = false; }
    var ms = (0, exports.p2ms)(m, sorted ? (0, exports._sortPubkeys)(pubkeys) : pubkeys);
    return witness ? (0, exports.p2wsh)(ms) : (0, exports.p2sh)(ms);
}
exports.multisig = multisig;
function sortedMultisig(m, pubkeys, witness) {
    if (witness === void 0) { witness = false; }
    return multisig(m, pubkeys, true, witness);
}
exports.sortedMultisig = sortedMultisig;
// Copy-pase from bip32 derive, maybe do something like 'bip32.parsePath'?
var HARDENED_OFFSET = 0x80000000;
function bip32Path(path) {
    var out = [];
    if (!/^[mM]'?/.test(path))
        throw new Error('Path must start with "m" or "M"');
    if (/^[mM]'?$/.test(path))
        return out;
    var parts = path.replace(/^[mM]'?\//, '').split('/');
    for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
        var c = parts_1[_i];
        var m = /^(\d+)('?)$/.exec(c);
        if (!m || m.length !== 3)
            throw new Error("Invalid child index: ".concat(c));
        var idx = +m[1];
        if (!Number.isSafeInteger(idx) || idx >= HARDENED_OFFSET)
            throw new Error('Invalid index');
        // hardened key
        if (m[2] === "'")
            idx += HARDENED_OFFSET;
        out.push(idx);
    }
    return out;
}
exports.bip32Path = bip32Path;
function PSBTCombine(psbts) {
    if (!psbts || !Array.isArray(psbts) || !psbts.length)
        throw new Error('PSBTCombine: wrong PSBT list');
    var tx = Transaction.fromPSBT(psbts[0]);
    for (var i = 1; i < psbts.length; i++)
        tx.combine(Transaction.fromPSBT(psbts[i]));
    return tx.toPSBT();
}
exports.PSBTCombine = PSBTCombine;
