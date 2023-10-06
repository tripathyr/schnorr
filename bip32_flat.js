//START OF BIP32 SECTION
/*! scure-bip32 - MIT License (c) 2022 Patricio Palladino, Paul Miller (paulmillr.com) */
var bip32 = {};
(function () {
var HDKey = /** @class */ (function () {
    
var hmac = hashmini.hmac;
var ripemd160 = hashmini.ripemd160;
var sha256 = hashmini.sha256;
var sha512 = hashmini.sha512;
//var _assert_1 = require("@noble/hashes/_assert");
var utils_1 = hashmini.utils;
var modular_1 = secp.utils;
//var base_1 = base;
var Point = secp.Point;
var base58check = (0, base.base58check)(sha256);

function _assert_1(condition, message = "Assertion failed") {
  if (!condition) {
    throw new Error(message);
  }
}

function _assert_1(value, length, message = "Value is not a Uint8Array or does not have the expected length") {
  if (!(value instanceof Uint8Array) ) {
    throw new Error(message);
  }
}

const createView = (arr) => new DataView(arr.buffer, arr.byteOffset, arr.byteLength);

var __assign = (this && this.__assign) || function () {
    return Object.assign.apply(Object, arguments);
};


function utf8ToBytes(str) {
    if (typeof str !== 'string') {
        throw new TypeError(`utf8ToBytes expected string, got ${typeof str}`);
    }
    return new TextEncoder().encode(str);
}


function bytesToNumber(bytes) {
    return BigInt("0x".concat((0, utils_1.bytesToHex)(bytes)));
}
function numberToBytes(num) {
    return (0, utils_1.hexToBytes)(num.toString(16).padStart(64, '0'));
}
var MASTER_SECRET = (0, utf8ToBytes)('Bitcoin seed');
// Bitcoin hardcoded by default
var BITCOIN_VERSIONS = { private: 0x0488ade4, public: 0x0488b21e };
var HARDENED_OFFSET = 0x80000000;
var hash160 = function (data) { return (0, ripemd160)((0, sha256)(data)); };
var fromU32 = function (data) { return (0, createView)(data).getUint32(0, false); };
var toU32 = function (n) {
    if (!Number.isSafeInteger(n) || n < 0 || n > Math.pow(2, 32) - 1) {
        throw new Error("Invalid number=".concat(n, ". Should be from 0 to 2 ** 32 - 1"));
    }
    var buf = new Uint8Array(4);
    (0, createView)(buf).setUint32(0, n, false);
    return buf;
};

    function HDKey(opt) {
        this.depth = 0;
        this.index = 0;
        this.chainCode = null;
        this.parentFingerprint = 0;
        if (!opt || typeof opt !== 'object') {
            throw new Error('HDKey.constructor must not be called directly');
        }
        this.versions = opt.versions || BITCOIN_VERSIONS;
        this.depth = opt.depth || 0;
        this.chainCode = opt.chainCode;
        this.index = opt.index || 0;
        this.parentFingerprint = opt.parentFingerprint || 0;
        if (!this.depth) {
            if (this.parentFingerprint || this.index) {
                throw new Error('HDKey: zero depth with non-zero index/parent fingerprint');
            }
        }
        if (opt.publicKey && opt.privateKey) {
            throw new Error('HDKey: publicKey and privateKey at same time.');
        }
        if (opt.privateKey) {
            if (!secp.utils.isValidPrivateKey(opt.privateKey)) {
                throw new Error('Invalid private key');
            }
            this.privKey =
                typeof opt.privateKey === 'bigint' ? opt.privateKey : bytesToNumber(opt.privateKey);
            this.privKeyBytes = numberToBytes(this.privKey);
            this.pubKey = secp.getPublicKey(opt.privateKey, true);
        }
        else if (opt.publicKey) {
            this.pubKey = Point.fromHex(opt.publicKey).toRawBytes(true); // force compressed point
        }
        else {
            throw new Error('HDKey: no public or private key provided');
        }
        this.pubHash = hash160(this.pubKey);
    }
    Object.defineProperty(HDKey.prototype, "fingerprint", {
        get: function () {
            if (!this.pubHash) {
                throw new Error('No publicKey set!');
            }
            return fromU32(this.pubHash);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HDKey.prototype, "identifier", {
        get: function () {
            return this.pubHash;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HDKey.prototype, "pubKeyHash", {
        get: function () {
            return this.pubHash;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HDKey.prototype, "privateKey", {
        get: function () {
            return this.privKeyBytes || null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HDKey.prototype, "publicKey", {
        get: function () {
            return this.pubKey || null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HDKey.prototype, "privateExtendedKey", {
        get: function () {
            var priv = this.privateKey;
            if (!priv) {
                throw new Error('No private key');
            }
            return base58check.encode(this.serialize(this.versions.private, (0, utils_1.concatBytes)(new Uint8Array([0]), priv)));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HDKey.prototype, "publicExtendedKey", {
        get: function () {
            if (!this.pubKey) {
                throw new Error('No public key');
            }
            return base58check.encode(this.serialize(this.versions.public, this.pubKey));
        },
        enumerable: false,
        configurable: true
    });
    HDKey.fromMasterSeed = function (seed, versions) {
        if (versions === void 0) { versions = BITCOIN_VERSIONS; }
        (0, _assert_1)(seed);
        if (8 * seed.length < 128 || 8 * seed.length > 512) {
            throw new Error("HDKey: wrong seed length=".concat(seed.length, ". Should be between 128 and 512 bits; 256 bits is advised)"));
        }
        var I = (0, hmac)(sha512, MASTER_SECRET, seed);
        return new HDKey({
            versions: versions,
            chainCode: I.slice(32),
            privateKey: I.slice(0, 32),
        });
    };
    HDKey.fromExtendedKey = function (base58key, versions) {
        if (versions === void 0) { versions = BITCOIN_VERSIONS; }
        // => version(4) || depth(1) || fingerprint(4) || index(4) || chain(32) || key(33)
        var keyBuffer = base58check.decode(base58key);
        var keyView = (0, createView)(keyBuffer);
        var version = keyView.getUint32(0, false);
        var opt = {
            versions: versions,
            depth: keyBuffer[4],
            parentFingerprint: keyView.getUint32(5, false),
            index: keyView.getUint32(9, false),
            chainCode: keyBuffer.slice(13, 45),
        };
        var key = keyBuffer.slice(45);
        var isPriv = key[0] === 0;
        if (version !== versions[isPriv ? 'private' : 'public']) {
            throw new Error('Version mismatch');
        }
        if (isPriv) {
            return new HDKey(__assign(__assign({}, opt), { privateKey: key.slice(1) }));
        }
        else {
            return new HDKey(__assign(__assign({}, opt), { publicKey: key }));
        }
    };
    HDKey.fromJSON = function (json) {
        return HDKey.fromExtendedKey(json.xpriv);
    };
    HDKey.prototype.derive = function (path) {
        if (!/^[mM]'?/.test(path)) {
            throw new Error('Path must start with "m" or "M"');
        }
        if (/^[mM]'?$/.test(path)) {
            return this;
        }
        var parts = path.replace(/^[mM]'?\//, '').split('/');
        // tslint:disable-next-line
        var child = this;
        for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
            var c = parts_1[_i];
            var m = /^(\d+)('?)$/.exec(c);
            var m1 = m && m[1];
            if (!m || m.length !== 3 || typeof m1 !== 'string') {
                throw new Error("Invalid child index: ".concat(c));
            }
            var idx = +m1;
            if (!Number.isSafeInteger(idx) || idx >= HARDENED_OFFSET) {
                throw new Error('Invalid index');
            }
            // hardened key
            if (m[2] === "'") {
                idx += HARDENED_OFFSET;
            }
            child = child.deriveChild(idx);
        }
        return child;
    };
    HDKey.prototype.deriveChild = function (index) {
        if (!this.pubKey || !this.chainCode) {
            throw new Error('No publicKey or chainCode set');
        }
        var data = toU32(index);
        if (index >= HARDENED_OFFSET) {
            // Hardened
            var priv = this.privateKey;
            if (!priv) {
                throw new Error('Could not derive hardened child key');
            }
            // Hardened child: 0x00 || ser256(kpar) || ser32(index)
            data = (0, utils_1.concatBytes)(new Uint8Array([0]), priv, data);
        }
        else {
            // Normal child: serP(point(kpar)) || ser32(index)
            data = (0, utils_1.concatBytes)(this.pubKey, data);
        }
        var I = (0, hmac)(sha512, this.chainCode, data);
        var childTweak = bytesToNumber(I.slice(0, 32));
        var chainCode = I.slice(32);
        if (!secp.utils.isValidPrivateKey(childTweak)) {
            throw new Error('Tweak bigger than curve order');
        }
        var opt = {
            versions: this.versions,
            chainCode: chainCode,
            depth: this.depth + 1,
            parentFingerprint: this.fingerprint,
            index: index,
        };
        try {
            // Private parent key -> private child key
            if (this.privateKey) {
                var added = (0, modular_1.mod)(this.privKey + childTweak, secp.CURVE.n);
                if (!secp.utils.isValidPrivateKey(added)) {
                    throw new Error('The tweak was out of range or the resulted private key is invalid');
                }
                opt.privateKey = added;
            }
            else {
                var added = Point.fromHex(this.pubKey).add(Point.fromPrivateKey(childTweak));
                // Cryptographically impossible: hmac-sha512 preimage would need to be found
                if (added.equals(Point.ZERO)) {
                    throw new Error('The tweak was equal to negative P, which made the result key invalid');
                }
                opt.publicKey = added.toRawBytes(true);
            }
            return new HDKey(opt);
        }
        catch (err) {
            return this.deriveChild(index + 1);
        }
    };
    HDKey.prototype.sign = function (hash) {
        if (!this.privateKey) {
            throw new Error('No privateKey set!');
        }
        (0, _assert_1)(hash, 32);
        return secp.sign(hash, this.privKey).toCompactRawBytes();
    };
    HDKey.prototype.verify = function (hash, signature) {
        (0, _assert_1)(hash, 32);
        (0, _assert_1)(signature, 64);
        if (!this.publicKey) {
            throw new Error('No publicKey set!');
        }
        var sig;
        try {
            sig = secp.Signature.fromCompact(signature);
        }
        catch (error) {
            return false;
        }
        return secp.verify(sig, hash, this.publicKey);
    };
    HDKey.prototype.wipePrivateData = function () {
        this.privKey = undefined;
        if (this.privKeyBytes) {
            this.privKeyBytes.fill(0);
            this.privKeyBytes = undefined;
        }
        return this;
    };
    HDKey.prototype.toJSON = function () {
        return {
            xpriv: this.privateExtendedKey,
            xpub: this.publicExtendedKey,
        };
    };
    HDKey.prototype.serialize = function (version, key) {
        if (!this.chainCode) {
            throw new Error('No chainCode set');
        }
        (0, _assert_1)(key, 33);
        // version(4) || depth(1) || fingerprint(4) || index(4) || chain(32) || key(33)
        return (0, utils_1.concatBytes)(toU32(version), new Uint8Array([this.depth]), toU32(this.parentFingerprint), toU32(this.index), this.chainCode, key);
    };
    return HDKey;
}());
bip32.HDKey = HDKey
})();
var HDKey = bip32.HDKey;