/**
 * Taken from https://signerdemo.micro-btc.dev/
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
console.log("k is " + k.decode("0000000000000000000000000000000000000000000000000000000000000005"));
var V1 = Ti.exports,
    O1 = Symbol.for("react.element"),
    W1 = Symbol.for("react.fragment"),
    Q1 = Object.prototype.hasOwnProperty,
    G1 = V1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    Y1 = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
    };

function Lp(e, t, n) {
    var r, o = {},
        i = null,
        l = null;
    n !== void 0 && (i = "" + n), t.key !== void 0 && (i = "" + t.key), t.ref !== void 0 && (l = t.ref);
    for (r in t) Q1.call(t, r) && !Y1.hasOwnProperty(r) && (o[r] = t[r]);
    if (e && e.defaultProps)
        for (r in t = e.defaultProps, t) o[r] === void 0 && (o[r] = t[r]);
    return {
        $$typeof: O1,
        type: e,
        key: i,
        ref: l,
        props: o,
        _owner: G1.current
    }
}
qi.Fragment = W1;
qi.jsx = Lp;
qi.jsxs = Lp;
(function(e) {
    e.exports = qi
})(Ou);
const oe = Ou.exports.jsx,
    Re = Ou.exports.jsxs;

function xc(e) {
    return BigInt(`0x${Dy(e)}`)
}

function b1(e) {
    return $y(e.toString(16).padStart(64, "0"))
}
const Ue = [{
        priv: k.decode("0000000000000000000000000000000000000000000000000000000000000001"),
        ecdsaPub: k.decode("030000000000000000000000000000000000000000000000000000000000000001"),
        schnorrPub: k.decode("1212121212121212121212121212121212121212121212121212121212121212")
    }, {
        priv: k.decode("0000000000000000000000000000000000000000000000000000000000000002"),
        ecdsaPub: k.decode("030000000000000000000000000000000000000000000000000000000000000002"),
        schnorrPub: k.decode("2323232323232323232323232323232323232323232323232323232323232323")
    }, {
        priv: k.decode("0000000000000000000000000000000000000000000000000000000000000003"),
        ecdsaPub: k.decode("030000000000000000000000000000000000000000000000000000000000000003"),
        schnorrPub: k.decode("3434343434343434343434343434343434343434343434343434343434343434")
    }, {
        priv: k.decode("0000000000000000000000000000000000000000000000000000000000000004"),
        ecdsaPub: k.decode("030000000000000000000000000000000000000000000000000000000000000004"),
        schnorrPub: k.decode("4545454545454545454545454545454545454545454545454545454545454545")
    }, {
        priv: k.decode("0000000000000000000000000000000000000000000000000000000000000005"),
        ecdsaPub: k.decode("030000000000000000000000000000000000000000000000000000000000000005"),
        schnorrPub: k.decode("5656565656565656565656565656565656565656565656565656565656565656")
    }],
    X1 = Ue.slice(0, 3);

let nt = [];
for (var Cc = 0; Cc < 3; Cc++) {
    const e = we.randomPrivateKey();
    nt.push({
        priv: e,
        ecdsaPub: my(e, !0),
        schnorrPub: Ey.getPublicKey(e)
    })
}
const F = X1;
let Xe = [];
const _c = C1(F[0].ecdsaPub);
Xe.push({
    title: "Classic Public Key Hash",
    privateKeys: [k.encode(F[0].priv)],
    publicKeys: [k.encode(F[0].ecdsaPub)],
    script: k.encode(_c.script),
    scriptHash: "",
    address: _c.address,
    pubKeyType: "ECDSA"
});
const Rp = Ip(2, F.map(e => e.ecdsaPub)),
    Ac = A1(Rp);
Xe.push({
    title: "Classic Script Hash: 2 of {A, B, C}",
    privateKeys: F.map(e => k.encode(e.priv)),
    publicKeys: F.map(e => k.encode(e.ecdsaPub)),
    script: k.encode(Rp.script),
    scriptHash: k.encode(Ac.script),
    address: Ac.address,
    pubKeyType: "ECDSA"
});
const Tc = Tp(F[0].ecdsaPub);
Xe.push({
    title: "Witness Public Key Hash",
    privateKeys: [k.encode(F[0].priv)],
    publicKeys: [k.encode(F[0].ecdsaPub)],
    script: k.encode(Tc.script),
    scriptHash: "",
    address: Tc.address,
    pubKeyType: "ECDSA"
});
const Up = Ip(2, F.map(e => e.ecdsaPub)),
    Ic = I1(Up);
Xe.push({
    title: "Witness Script Hash: 2 of {A, B, C}",
    privateKeys: F.map(e => k.encode(e.priv)),
    publicKeys: F.map(e => k.encode(e.ecdsaPub)),
    script: k.encode(Up.script),
    scriptHash: k.encode(Ic.script),
    address: Ic.address,
    pubKeyType: "ECDSA"
});
const Nc = fr(F[0].schnorrPub);
Xe.push({
    title: "Taproot: Public Key",
    privateKeys: [k.encode(F[0].priv)],
    publicKeys: [k.encode(F[0].schnorrPub)],
    script: k.encode(Nc.script),
    address: Nc.address,
    pubKeyType: "Schnorr"
});
const Z1 = [z1(F[0].schnorrPub)],
    Pc = fr(void 0, Z1);
Xe.push({
    title: "Taproot: Public Key Hash",
    privateKeys: [k.encode(F[0].priv)],
    publicKeys: [k.encode(F[0].schnorrPub)],
    script: k.encode(Pc.script),
    address: Pc.address,
    pubKeyType: "Schnorr"
});
const Hp = yn(2, F.map(e => e.schnorrPub)),
    Lc = fr(void 0, Hp);
Xe.push({
    title: "Taproot Multi-Leaf: AB or AC or BC",
    privateKeys: F.map(e => k.encode(e.priv)),
    publicKeys: F.map(e => k.encode(e.schnorrPub)),
    leafScripts: Hp.map(e => k.encode(e.script)),
    script: k.encode(Lc.script),
    address: Lc.address,
    pubKeyType: "Schnorr"
});
const Bp = $1(2, F.map(e => e.schnorrPub)),
    Rc = fr(void 0, Bp);
Xe.push({
    title: "Taproot Single-Leaf: 2 of {A, B, C}",
    privateKeys: F.map(e => k.encode(e.priv)),
    publicKeys: F.map(e => k.encode(e.schnorrPub)),
    leafScripts: [k.encode(Bp.script)],
    script: k.encode(Rc.script),
    address: Rc.address,
    pubKeyType: "Schnorr"
});
const zp = yn(2, [F[1].schnorrPub, F[2].schnorrPub]),
    Uc = fr(F[0].schnorrPub, zp);
Xe.push({
    title: "Taproot Multi-Leaf: A or BC",
    privateKeys: F.map(e => k.encode(e.priv)),
    publicKeys: F.map(e => k.encode(e.schnorrPub)),
    leafScripts: zp.map(e => k.encode(e.script)),
    script: k.encode(Uc.script),
    address: Uc.address,
    pubKeyType: "Schnorr"
});
const Dp = [yn(2, [Ue[1].schnorrPub, Ue[2].schnorrPub])[0], yn(2, [Ue[1].schnorrPub, Ue[3].schnorrPub])[0], yn(2, [Ue[1].schnorrPub, Ue[4].schnorrPub])[0], yn(3, [Ue[2].schnorrPub, Ue[3].schnorrPub, Ue[4].schnorrPub])[0]],
    Hc = fr(Ue[0].schnorrPub, Dp);
Xe.push({
    title: "Taproot Multi-Leaf: A or BC or BD or BE or CDE",
    privateKeys: Ue.map(e => k.encode(e.priv)),
    publicKeys: Ue.map(e => k.encode(e.schnorrPub)),
    leafScripts: Dp.map(e => k.encode(e.script)),
    script: k.encode(Hc.script),
    address: Hc.address,
    pubKeyType: "Schnorr"
});
const $p = Yd(nt[0].priv, nt[1].ecdsaPub, !0);
Yd(nt[1].priv, nt[0].ecdsaPub, !0);
const q1 = nt[2].priv,
    J1 = nt[2].ecdsaPub,
    eg = we.mod(xc(q1) + xc($p), K.n),
    tg = b1(eg),
    Mp = z.fromHex(J1).add(z.fromPrivateKey($p.slice(1, 33))).toRawBytes(!0),
    Bc = Tp(Mp);
Xe.push({
    title: "WPKH: Diffie Hellman Key Exchange",
    privateKeys: [k.encode(nt[0].priv), k.encode(nt[1].priv), k.encode(tg)],
    publicKeys: [k.encode(nt[0].ecdsaPub), k.encode(nt[1].ecdsaPub), k.encode(Mp)],
    script: k.encode(Bc.script),
    scriptHash: "",
    address: Bc.address,
    pubKeyType: "ECDSA"
});

function ng() {
    return Re("div", {
        className: "App",
        children: [oe("h1", {
            children: "MICRO-BTC Web Demo"
        }), oe("div", {
            className: "App-main",
            children: Xe.map((e, t) => Re("div", {
                children: [oe("h2", {
                    children: e.title
                }), e.privateKeys ? Re("p", {
                    children: [Re("b", {
                        children: ["Private Key", e.privateKeys.length > 1 ? "s" : "", ":"]
                    }), oe("br", {}), e.privateKeys.map((n, r) => Re("span", {
                        children: [n, oe("br", {})]
                    }, r))]
                }) : null, e.publicKeys ? Re("p", {
                    children: [Re("b", {
                        children: [e.pubKeyType, " Public Key", e.publicKeys.length > 1 ? "s" : "", ":"]
                    }), oe("br", {}), e.publicKeys.map((n, r) => Re("span", {
                        children: [n, oe("br", {})]
                    }, r))]
                }) : null, e.leafScripts ? Re("p", {
                    children: [oe("b", {
                        children: "Leaf Scripts:"
                    }), oe("br", {}), e.leafScripts.map((n, r) => Re("span", {
                        children: [n, oe("br", {})]
                    }, r))]
                }) : null, e.script ? Re("p", {
                    children: [oe("b", {
                        children: "Script:"
                    }), oe("br", {}), e.script]
                }) : null, e.scriptHash ? Re("p", {
                    children: [oe("b", {
                        children: "Script Hash:"
                    }), oe("br", {}), e.scriptHash]
                }) : null, e.address ? Re("p", {
                    children: [oe("b", {
                        children: "Address:"
                    }), oe("br", {}), e.address]
                }) : null]
            }, t))
        })]
    })
}
Rl.createRoot(document.getElementById("root")).render(oe(r0.StrictMode, {
    children: oe(ng, {})
}));