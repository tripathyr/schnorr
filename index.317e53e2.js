(function() {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload")) return;
    for (const o of document.querySelectorAll('link[rel="modulepreload"]')) r(o);
    new MutationObserver(o => {
        for (const i of o)
            if (i.type === "childList")
                for (const l of i.addedNodes) l.tagName === "LINK" && l.rel === "modulepreload" && r(l)
    }).observe(document, {
        childList: !0,
        subtree: !0
    });

    function n(o) {
        const i = {};
        return o.integrity && (i.integrity = o.integrity), o.referrerpolicy && (i.referrerPolicy = o.referrerpolicy), o.crossorigin === "use-credentials" ? i.credentials = "include" : o.crossorigin === "anonymous" ? i.credentials = "omit" : i.credentials = "same-origin", i
    }

    function r(o) {
        if (o.ep) return;
        o.ep = !0;
        const i = n(o);
        fetch(o.href, i)
    }
})();

function Kp(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
}
var Ti = {
        exports: {}
    },
    R = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var io = Symbol.for("react.element"),
    jp = Symbol.for("react.portal"),
    Vp = Symbol.for("react.fragment"),
    Op = Symbol.for("react.strict_mode"),
    Wp = Symbol.for("react.profiler"),
    Qp = Symbol.for("react.provider"),
    Gp = Symbol.for("react.context"),
    Yp = Symbol.for("react.forward_ref"),
    bp = Symbol.for("react.suspense"),
    Xp = Symbol.for("react.memo"),
    Zp = Symbol.for("react.lazy"),
    Qu = Symbol.iterator;

function qp(e) {
    return e === null || typeof e != "object" ? null : (e = Qu && e[Qu] || e["@@iterator"], typeof e == "function" ? e : null)
}
var zc = {
        isMounted: function() {
            return !1
        },
        enqueueForceUpdate: function() {},
        enqueueReplaceState: function() {},
        enqueueSetState: function() {}
    },
    Dc = Object.assign,
    $c = {};

function sr(e, t, n) {
    this.props = e, this.context = t, this.refs = $c, this.updater = n || zc
}
sr.prototype.isReactComponent = {};
sr.prototype.setState = function(e, t) {
    if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, e, t, "setState")
};
sr.prototype.forceUpdate = function(e) {
    this.updater.enqueueForceUpdate(this, e, "forceUpdate")
};

function Mc() {}
Mc.prototype = sr.prototype;

function js(e, t, n) {
    this.props = e, this.context = t, this.refs = $c, this.updater = n || zc
}
var Vs = js.prototype = new Mc;
Vs.constructor = js;
Dc(Vs, sr.prototype);
Vs.isPureReactComponent = !0;
var Gu = Array.isArray,
    Fc = Object.prototype.hasOwnProperty,
    Os = {
        current: null
    },
    Kc = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
    };

function jc(e, t, n) {
    var r, o = {},
        i = null,
        l = null;
    if (t != null)
        for (r in t.ref !== void 0 && (l = t.ref), t.key !== void 0 && (i = "" + t.key), t) Fc.call(t, r) && !Kc.hasOwnProperty(r) && (o[r] = t[r]);
    var s = arguments.length - 2;
    if (s === 1) o.children = n;
    else if (1 < s) {
        for (var u = Array(s), a = 0; a < s; a++) u[a] = arguments[a + 2];
        o.children = u
    }
    if (e && e.defaultProps)
        for (r in s = e.defaultProps, s) o[r] === void 0 && (o[r] = s[r]);
    return {
        $$typeof: io,
        type: e,
        key: i,
        ref: l,
        props: o,
        _owner: Os.current
    }
}

function Jp(e, t) {
    return {
        $$typeof: io,
        type: e.type,
        key: t,
        ref: e.ref,
        props: e.props,
        _owner: e._owner
    }
}

function Ws(e) {
    return typeof e == "object" && e !== null && e.$$typeof === io
}

function e0(e) {
    var t = {
        "=": "=0",
        ":": "=2"
    };
    return "$" + e.replace(/[=:]/g, function(n) {
        return t[n]
    })
}
var Yu = /\/+/g;

function nl(e, t) {
    return typeof e == "object" && e !== null && e.key != null ? e0("" + e.key) : t.toString(36)
}

function Do(e, t, n, r, o) {
    var i = typeof e;
    (i === "undefined" || i === "boolean") && (e = null);
    var l = !1;
    if (e === null) l = !0;
    else switch (i) {
        case "string":
        case "number":
            l = !0;
            break;
        case "object":
            switch (e.$$typeof) {
                case io:
                case jp:
                    l = !0
            }
    }
    if (l) return l = e, o = o(l), e = r === "" ? "." + nl(l, 0) : r, Gu(o) ? (n = "", e != null && (n = e.replace(Yu, "$&/") + "/"), Do(o, t, n, "", function(a) {
        return a
    })) : o != null && (Ws(o) && (o = Jp(o, n + (!o.key || l && l.key === o.key ? "" : ("" + o.key).replace(Yu, "$&/") + "/") + e)), t.push(o)), 1;
    if (l = 0, r = r === "" ? "." : r + ":", Gu(e))
        for (var s = 0; s < e.length; s++) {
            i = e[s];
            var u = r + nl(i, s);
            l += Do(i, t, n, u, o)
        } else if (u = qp(e), typeof u == "function")
            for (e = u.call(e), s = 0; !(i = e.next()).done;) i = i.value, u = r + nl(i, s++), l += Do(i, t, n, u, o);
        else if (i === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
    return l
}

function go(e, t, n) {
    if (e == null) return e;
    var r = [],
        o = 0;
    return Do(e, r, "", "", function(i) {
        return t.call(n, i, o++)
    }), r
}

function t0(e) {
    if (e._status === -1) {
        var t = e._result;
        t = t(), t.then(function(n) {
            (e._status === 0 || e._status === -1) && (e._status = 1, e._result = n)
        }, function(n) {
            (e._status === 0 || e._status === -1) && (e._status = 2, e._result = n)
        }), e._status === -1 && (e._status = 0, e._result = t)
    }
    if (e._status === 1) return e._result.default;
    throw e._result
}
var xe = {
        current: null
    },
    $o = {
        transition: null
    },
    n0 = {
        ReactCurrentDispatcher: xe,
        ReactCurrentBatchConfig: $o,
        ReactCurrentOwner: Os
    };
R.Children = {
    map: go,
    forEach: function(e, t, n) {
        go(e, function() {
            t.apply(this, arguments)
        }, n)
    },
    count: function(e) {
        var t = 0;
        return go(e, function() {
            t++
        }), t
    },
    toArray: function(e) {
        return go(e, function(t) {
            return t
        }) || []
    },
    only: function(e) {
        if (!Ws(e)) throw Error("React.Children.only expected to receive a single React element child.");
        return e
    }
};
R.Component = sr;
R.Fragment = Vp;
R.Profiler = Wp;
R.PureComponent = js;
R.StrictMode = Op;
R.Suspense = bp;
R.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = n0;
R.cloneElement = function(e, t, n) {
    if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
    var r = Dc({}, e.props),
        o = e.key,
        i = e.ref,
        l = e._owner;
    if (t != null) {
        if (t.ref !== void 0 && (i = t.ref, l = Os.current), t.key !== void 0 && (o = "" + t.key), e.type && e.type.defaultProps) var s = e.type.defaultProps;
        for (u in t) Fc.call(t, u) && !Kc.hasOwnProperty(u) && (r[u] = t[u] === void 0 && s !== void 0 ? s[u] : t[u])
    }
    var u = arguments.length - 2;
    if (u === 1) r.children = n;
    else if (1 < u) {
        s = Array(u);
        for (var a = 0; a < u; a++) s[a] = arguments[a + 2];
        r.children = s
    }
    return {
        $$typeof: io,
        type: e.type,
        key: o,
        ref: i,
        props: r,
        _owner: l
    }
};
R.createContext = function(e) {
    return e = {
        $$typeof: Gp,
        _currentValue: e,
        _currentValue2: e,
        _threadCount: 0,
        Provider: null,
        Consumer: null,
        _defaultValue: null,
        _globalName: null
    }, e.Provider = {
        $$typeof: Qp,
        _context: e
    }, e.Consumer = e
};
R.createElement = jc;
R.createFactory = function(e) {
    var t = jc.bind(null, e);
    return t.type = e, t
};
R.createRef = function() {
    return {
        current: null
    }
};
R.forwardRef = function(e) {
    return {
        $$typeof: Yp,
        render: e
    }
};
R.isValidElement = Ws;
R.lazy = function(e) {
    return {
        $$typeof: Zp,
        _payload: {
            _status: -1,
            _result: e
        },
        _init: t0
    }
};
R.memo = function(e, t) {
    return {
        $$typeof: Xp,
        type: e,
        compare: t === void 0 ? null : t
    }
};
R.startTransition = function(e) {
    var t = $o.transition;
    $o.transition = {};
    try {
        e()
    } finally {
        $o.transition = t
    }
};
R.unstable_act = function() {
    throw Error("act(...) is not supported in production builds of React.")
};
R.useCallback = function(e, t) {
    return xe.current.useCallback(e, t)
};
R.useContext = function(e) {
    return xe.current.useContext(e)
};
R.useDebugValue = function() {};
R.useDeferredValue = function(e) {
    return xe.current.useDeferredValue(e)
};
R.useEffect = function(e, t) {
    return xe.current.useEffect(e, t)
};
R.useId = function() {
    return xe.current.useId()
};
R.useImperativeHandle = function(e, t, n) {
    return xe.current.useImperativeHandle(e, t, n)
};
R.useInsertionEffect = function(e, t) {
    return xe.current.useInsertionEffect(e, t)
};
R.useLayoutEffect = function(e, t) {
    return xe.current.useLayoutEffect(e, t)
};
R.useMemo = function(e, t) {
    return xe.current.useMemo(e, t)
};
R.useReducer = function(e, t, n) {
    return xe.current.useReducer(e, t, n)
};
R.useRef = function(e) {
    return xe.current.useRef(e)
};
R.useState = function(e) {
    return xe.current.useState(e)
};
R.useSyncExternalStore = function(e, t, n) {
    return xe.current.useSyncExternalStore(e, t, n)
};
R.useTransition = function() {
    return xe.current.useTransition()
};
R.version = "18.2.0";
(function(e) {
    e.exports = R
})(Ti);
const r0 = Kp(Ti.exports);
var Rl = {},
    Vc = {
        exports: {}
    },
    $e = {},
    Oc = {
        exports: {}
    },
    Wc = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(e) {
    function t(_, P) {
        var L = _.length;
        _.push(P);
        e: for (; 0 < L;) {
            var q = L - 1 >>> 1,
                re = _[q];
            if (0 < o(re, P)) _[q] = P, _[L] = re, L = q;
            else break e
        }
    }

    function n(_) {
        return _.length === 0 ? null : _[0]
    }

    function r(_) {
        if (_.length === 0) return null;
        var P = _[0],
            L = _.pop();
        if (L !== P) {
            _[0] = L;
            e: for (var q = 0, re = _.length, ho = re >>> 1; q < ho;) {
                var sn = 2 * (q + 1) - 1,
                    tl = _[sn],
                    un = sn + 1,
                    yo = _[un];
                if (0 > o(tl, L)) un < re && 0 > o(yo, tl) ? (_[q] = yo, _[un] = L, q = un) : (_[q] = tl, _[sn] = L, q = sn);
                else if (un < re && 0 > o(yo, L)) _[q] = yo, _[un] = L, q = un;
                else break e
            }
        }
        return P
    }

    function o(_, P) {
        var L = _.sortIndex - P.sortIndex;
        return L !== 0 ? L : _.id - P.id
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
        var i = performance;
        e.unstable_now = function() {
            return i.now()
        }
    } else {
        var l = Date,
            s = l.now();
        e.unstable_now = function() {
            return l.now() - s
        }
    }
    var u = [],
        a = [],
        f = 1,
        d = null,
        p = 3,
        g = !1,
        v = !1,
        w = !1,
        H = typeof setTimeout == "function" ? setTimeout : null,
        h = typeof clearTimeout == "function" ? clearTimeout : null,
        c = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);

    function y(_) {
        for (var P = n(a); P !== null;) {
            if (P.callback === null) r(a);
            else if (P.startTime <= _) r(a), P.sortIndex = P.expirationTime, t(u, P);
            else break;
            P = n(a)
        }
    }

    function m(_) {
        if (w = !1, y(_), !v)
            if (n(u) !== null) v = !0, Ji(E);
            else {
                var P = n(a);
                P !== null && el(m, P.startTime - _)
            }
    }

    function E(_, P) {
        v = !1, w && (w = !1, h(I), I = -1), g = !0;
        var L = p;
        try {
            for (y(P), d = n(u); d !== null && (!(d.expirationTime > P) || _ && !Ze());) {
                var q = d.callback;
                if (typeof q == "function") {
                    d.callback = null, p = d.priorityLevel;
                    var re = q(d.expirationTime <= P);
                    P = e.unstable_now(), typeof re == "function" ? d.callback = re : d === n(u) && r(u), y(P)
                } else r(u);
                d = n(u)
            }
            if (d !== null) var ho = !0;
            else {
                var sn = n(a);
                sn !== null && el(m, sn.startTime - P), ho = !1
            }
            return ho
        } finally {
            d = null, p = L, g = !1
        }
    }
    var A = !1,
        T = null,
        I = -1,
        Z = 5,
        U = -1;

    function Ze() {
        return !(e.unstable_now() - U < Z)
    }

    function dr() {
        if (T !== null) {
            var _ = e.unstable_now();
            U = _;
            var P = !0;
            try {
                P = T(!0, _)
            } finally {
                P ? pr() : (A = !1, T = null)
            }
        } else A = !1
    }
    var pr;
    if (typeof c == "function") pr = function() {
        c(dr)
    };
    else if (typeof MessageChannel < "u") {
        var Wu = new MessageChannel,
            Fp = Wu.port2;
        Wu.port1.onmessage = dr, pr = function() {
            Fp.postMessage(null)
        }
    } else pr = function() {
        H(dr, 0)
    };

    function Ji(_) {
        T = _, A || (A = !0, pr())
    }

    function el(_, P) {
        I = H(function() {
            _(e.unstable_now())
        }, P)
    }
    e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(_) {
        _.callback = null
    }, e.unstable_continueExecution = function() {
        v || g || (v = !0, Ji(E))
    }, e.unstable_forceFrameRate = function(_) {
        0 > _ || 125 < _ ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : Z = 0 < _ ? Math.floor(1e3 / _) : 5
    }, e.unstable_getCurrentPriorityLevel = function() {
        return p
    }, e.unstable_getFirstCallbackNode = function() {
        return n(u)
    }, e.unstable_next = function(_) {
        switch (p) {
            case 1:
            case 2:
            case 3:
                var P = 3;
                break;
            default:
                P = p
        }
        var L = p;
        p = P;
        try {
            return _()
        } finally {
            p = L
        }
    }, e.unstable_pauseExecution = function() {}, e.unstable_requestPaint = function() {}, e.unstable_runWithPriority = function(_, P) {
        switch (_) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                break;
            default:
                _ = 3
        }
        var L = p;
        p = _;
        try {
            return P()
        } finally {
            p = L
        }
    }, e.unstable_scheduleCallback = function(_, P, L) {
        var q = e.unstable_now();
        switch (typeof L == "object" && L !== null ? (L = L.delay, L = typeof L == "number" && 0 < L ? q + L : q) : L = q, _) {
            case 1:
                var re = -1;
                break;
            case 2:
                re = 250;
                break;
            case 5:
                re = 1073741823;
                break;
            case 4:
                re = 1e4;
                break;
            default:
                re = 5e3
        }
        return re = L + re, _ = {
            id: f++,
            callback: P,
            priorityLevel: _,
            startTime: L,
            expirationTime: re,
            sortIndex: -1
        }, L > q ? (_.sortIndex = L, t(a, _), n(u) === null && _ === n(a) && (w ? (h(I), I = -1) : w = !0, el(m, L - q))) : (_.sortIndex = re, t(u, _), v || g || (v = !0, Ji(E))), _
    }, e.unstable_shouldYield = Ze, e.unstable_wrapCallback = function(_) {
        var P = p;
        return function() {
            var L = p;
            p = P;
            try {
                return _.apply(this, arguments)
            } finally {
                p = L
            }
        }
    }
})(Wc);
(function(e) {
    e.exports = Wc
})(Oc);
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Qc = Ti.exports,
    De = Oc.exports;

function S(e) {
    for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
}
var Gc = new Set,
    Mr = {};

function _n(e, t) {
    Xn(e, t), Xn(e + "Capture", t)
}

function Xn(e, t) {
    for (Mr[e] = t, e = 0; e < t.length; e++) Gc.add(t[e])
}
var xt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"),
    Ul = Object.prototype.hasOwnProperty,
    o0 = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    bu = {},
    Xu = {};

function i0(e) {
    return Ul.call(Xu, e) ? !0 : Ul.call(bu, e) ? !1 : o0.test(e) ? Xu[e] = !0 : (bu[e] = !0, !1)
}

function l0(e, t, n, r) {
    if (n !== null && n.type === 0) return !1;
    switch (typeof t) {
        case "function":
        case "symbol":
            return !0;
        case "boolean":
            return r ? !1 : n !== null ? !n.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
        default:
            return !1
    }
}

function s0(e, t, n, r) {
    if (t === null || typeof t > "u" || l0(e, t, n, r)) return !0;
    if (r) return !1;
    if (n !== null) switch (n.type) {
        case 3:
            return !t;
        case 4:
            return t === !1;
        case 5:
            return isNaN(t);
        case 6:
            return isNaN(t) || 1 > t
    }
    return !1
}

function Ce(e, t, n, r, o, i, l) {
    this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = o, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = i, this.removeEmptyString = l
}
var ce = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
    ce[e] = new Ce(e, 0, !1, e, null, !1, !1)
});
[
    ["acceptCharset", "accept-charset"],
    ["className", "class"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"]
].forEach(function(e) {
    var t = e[0];
    ce[t] = new Ce(t, 1, !1, e[1], null, !1, !1)
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
    ce[e] = new Ce(e, 2, !1, e.toLowerCase(), null, !1, !1)
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
    ce[e] = new Ce(e, 2, !1, e, null, !1, !1)
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
    ce[e] = new Ce(e, 3, !1, e.toLowerCase(), null, !1, !1)
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
    ce[e] = new Ce(e, 3, !0, e, null, !1, !1)
});
["capture", "download"].forEach(function(e) {
    ce[e] = new Ce(e, 4, !1, e, null, !1, !1)
});
["cols", "rows", "size", "span"].forEach(function(e) {
    ce[e] = new Ce(e, 6, !1, e, null, !1, !1)
});
["rowSpan", "start"].forEach(function(e) {
    ce[e] = new Ce(e, 5, !1, e.toLowerCase(), null, !1, !1)
});
var Qs = /[\-:]([a-z])/g;

function Gs(e) {
    return e[1].toUpperCase()
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
    var t = e.replace(Qs, Gs);
    ce[t] = new Ce(t, 1, !1, e, null, !1, !1)
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
    var t = e.replace(Qs, Gs);
    ce[t] = new Ce(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1)
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
    var t = e.replace(Qs, Gs);
    ce[t] = new Ce(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1)
});
["tabIndex", "crossOrigin"].forEach(function(e) {
    ce[e] = new Ce(e, 1, !1, e.toLowerCase(), null, !1, !1)
});
ce.xlinkHref = new Ce("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
    ce[e] = new Ce(e, 1, !1, e.toLowerCase(), null, !0, !0)
});

function Ys(e, t, n, r) {
    var o = ce.hasOwnProperty(t) ? ce[t] : null;
    (o !== null ? o.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (s0(t, n, o, r) && (n = null), r || o === null ? i0(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : o.mustUseProperty ? e[o.propertyName] = n === null ? o.type === 3 ? !1 : "" : n : (t = o.attributeName, r = o.attributeNamespace, n === null ? e.removeAttribute(t) : (o = o.type, n = o === 3 || o === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))))
}
var Tt = Qc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    mo = Symbol.for("react.element"),
    Ln = Symbol.for("react.portal"),
    Rn = Symbol.for("react.fragment"),
    bs = Symbol.for("react.strict_mode"),
    Hl = Symbol.for("react.profiler"),
    Yc = Symbol.for("react.provider"),
    bc = Symbol.for("react.context"),
    Xs = Symbol.for("react.forward_ref"),
    Bl = Symbol.for("react.suspense"),
    zl = Symbol.for("react.suspense_list"),
    Zs = Symbol.for("react.memo"),
    Ut = Symbol.for("react.lazy"),
    Xc = Symbol.for("react.offscreen"),
    Zu = Symbol.iterator;

function hr(e) {
    return e === null || typeof e != "object" ? null : (e = Zu && e[Zu] || e["@@iterator"], typeof e == "function" ? e : null)
}
var b = Object.assign,
    rl;

function _r(e) {
    if (rl === void 0) try {
        throw Error()
    } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        rl = t && t[1] || ""
    }
    return `
` + rl + e
}
var ol = !1;

function il(e, t) {
    if (!e || ol) return "";
    ol = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
        if (t)
            if (t = function() {
                    throw Error()
                }, Object.defineProperty(t.prototype, "props", {
                    set: function() {
                        throw Error()
                    }
                }), typeof Reflect == "object" && Reflect.construct) {
                try {
                    Reflect.construct(t, [])
                } catch (a) {
                    var r = a
                }
                Reflect.construct(e, [], t)
            } else {
                try {
                    t.call()
                } catch (a) {
                    r = a
                }
                e.call(t.prototype)
            }
        else {
            try {
                throw Error()
            } catch (a) {
                r = a
            }
            e()
        }
    } catch (a) {
        if (a && r && typeof a.stack == "string") {
            for (var o = a.stack.split(`
`), i = r.stack.split(`
`), l = o.length - 1, s = i.length - 1; 1 <= l && 0 <= s && o[l] !== i[s];) s--;
            for (; 1 <= l && 0 <= s; l--, s--)
                if (o[l] !== i[s]) {
                    if (l !== 1 || s !== 1)
                        do
                            if (l--, s--, 0 > s || o[l] !== i[s]) {
                                var u = `
` + o[l].replace(" at new ", " at ");
                                return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u
                            } while (1 <= l && 0 <= s);
                    break
                }
        }
    } finally {
        ol = !1, Error.prepareStackTrace = n
    }
    return (e = e ? e.displayName || e.name : "") ? _r(e) : ""
}

function u0(e) {
    switch (e.tag) {
        case 5:
            return _r(e.type);
        case 16:
            return _r("Lazy");
        case 13:
            return _r("Suspense");
        case 19:
            return _r("SuspenseList");
        case 0:
        case 2:
        case 15:
            return e = il(e.type, !1), e;
        case 11:
            return e = il(e.type.render, !1), e;
        case 1:
            return e = il(e.type, !0), e;
        default:
            return ""
    }
}

function Dl(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
        case Rn:
            return "Fragment";
        case Ln:
            return "Portal";
        case Hl:
            return "Profiler";
        case bs:
            return "StrictMode";
        case Bl:
            return "Suspense";
        case zl:
            return "SuspenseList"
    }
    if (typeof e == "object") switch (e.$$typeof) {
        case bc:
            return (e.displayName || "Context") + ".Consumer";
        case Yc:
            return (e._context.displayName || "Context") + ".Provider";
        case Xs:
            var t = e.render;
            return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case Zs:
            return t = e.displayName || null, t !== null ? t : Dl(e.type) || "Memo";
        case Ut:
            t = e._payload, e = e._init;
            try {
                return Dl(e(t))
            } catch {}
    }
    return null
}

function a0(e) {
    var t = e.type;
    switch (e.tag) {
        case 24:
            return "Cache";
        case 9:
            return (t.displayName || "Context") + ".Consumer";
        case 10:
            return (t._context.displayName || "Context") + ".Provider";
        case 18:
            return "DehydratedFragment";
        case 11:
            return e = t.render, e = e.displayName || e.name || "", t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
        case 7:
            return "Fragment";
        case 5:
            return t;
        case 4:
            return "Portal";
        case 3:
            return "Root";
        case 6:
            return "Text";
        case 16:
            return Dl(t);
        case 8:
            return t === bs ? "StrictMode" : "Mode";
        case 22:
            return "Offscreen";
        case 12:
            return "Profiler";
        case 21:
            return "Scope";
        case 13:
            return "Suspense";
        case 19:
            return "SuspenseList";
        case 25:
            return "TracingMarker";
        case 1:
        case 0:
        case 17:
        case 2:
        case 14:
        case 15:
            if (typeof t == "function") return t.displayName || t.name || null;
            if (typeof t == "string") return t
    }
    return null
}

function Jt(e) {
    switch (typeof e) {
        case "boolean":
        case "number":
        case "string":
        case "undefined":
            return e;
        case "object":
            return e;
        default:
            return ""
    }
}

function Zc(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio")
}

function c0(e) {
    var t = Zc(e) ? "checked" : "value",
        n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
        r = "" + e[t];
    if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
        var o = n.get,
            i = n.set;
        return Object.defineProperty(e, t, {
            configurable: !0,
            get: function() {
                return o.call(this)
            },
            set: function(l) {
                r = "" + l, i.call(this, l)
            }
        }), Object.defineProperty(e, t, {
            enumerable: n.enumerable
        }), {
            getValue: function() {
                return r
            },
            setValue: function(l) {
                r = "" + l
            },
            stopTracking: function() {
                e._valueTracker = null, delete e[t]
            }
        }
    }
}

function vo(e) {
    e._valueTracker || (e._valueTracker = c0(e))
}

function qc(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(),
        r = "";
    return e && (r = Zc(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1
}

function Xo(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
        return e.activeElement || e.body
    } catch {
        return e.body
    }
}

function $l(e, t) {
    var n = t.checked;
    return b({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: n ?? e._wrapperState.initialChecked
    })
}

function qu(e, t) {
    var n = t.defaultValue == null ? "" : t.defaultValue,
        r = t.checked != null ? t.checked : t.defaultChecked;
    n = Jt(t.value != null ? t.value : n), e._wrapperState = {
        initialChecked: r,
        initialValue: n,
        controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null
    }
}

function Jc(e, t) {
    t = t.checked, t != null && Ys(e, "checked", t, !1)
}

function Ml(e, t) {
    Jc(e, t);
    var n = Jt(t.value),
        r = t.type;
    if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
    else if (r === "submit" || r === "reset") {
        e.removeAttribute("value");
        return
    }
    t.hasOwnProperty("value") ? Fl(e, t.type, n) : t.hasOwnProperty("defaultValue") && Fl(e, t.type, Jt(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked)
}

function Ju(e, t, n) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var r = t.type;
        if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
        t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t
    }
    n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n)
}

function Fl(e, t, n) {
    (t !== "number" || Xo(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n))
}
var Ar = Array.isArray;

function Vn(e, t, n, r) {
    if (e = e.options, t) {
        t = {};
        for (var o = 0; o < n.length; o++) t["$" + n[o]] = !0;
        for (n = 0; n < e.length; n++) o = t.hasOwnProperty("$" + e[n].value), e[n].selected !== o && (e[n].selected = o), o && r && (e[n].defaultSelected = !0)
    } else {
        for (n = "" + Jt(n), t = null, o = 0; o < e.length; o++) {
            if (e[o].value === n) {
                e[o].selected = !0, r && (e[o].defaultSelected = !0);
                return
            }
            t !== null || e[o].disabled || (t = e[o])
        }
        t !== null && (t.selected = !0)
    }
}

function Kl(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(S(91));
    return b({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: "" + e._wrapperState.initialValue
    })
}

function ea(e, t) {
    var n = t.value;
    if (n == null) {
        if (n = t.children, t = t.defaultValue, n != null) {
            if (t != null) throw Error(S(92));
            if (Ar(n)) {
                if (1 < n.length) throw Error(S(93));
                n = n[0]
            }
            t = n
        }
        t == null && (t = ""), n = t
    }
    e._wrapperState = {
        initialValue: Jt(n)
    }
}

function ef(e, t) {
    var n = Jt(t.value),
        r = Jt(t.defaultValue);
    n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r)
}

function ta(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t)
}

function tf(e) {
    switch (e) {
        case "svg":
            return "http://www.w3.org/2000/svg";
        case "math":
            return "http://www.w3.org/1998/Math/MathML";
        default:
            return "http://www.w3.org/1999/xhtml"
    }
}

function jl(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml" ? tf(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e
}
var wo, nf = function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, o) {
        MSApp.execUnsafeLocalFunction(function() {
            return e(t, n, r, o)
        })
    } : e
}(function(e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
    else {
        for (wo = wo || document.createElement("div"), wo.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = wo.firstChild; e.firstChild;) e.removeChild(e.firstChild);
        for (; t.firstChild;) e.appendChild(t.firstChild)
    }
});

function Fr(e, t) {
    if (t) {
        var n = e.firstChild;
        if (n && n === e.lastChild && n.nodeType === 3) {
            n.nodeValue = t;
            return
        }
    }
    e.textContent = t
}
var Nr = {
        animationIterationCount: !0,
        aspectRatio: !0,
        borderImageOutset: !0,
        borderImageSlice: !0,
        borderImageWidth: !0,
        boxFlex: !0,
        boxFlexGroup: !0,
        boxOrdinalGroup: !0,
        columnCount: !0,
        columns: !0,
        flex: !0,
        flexGrow: !0,
        flexPositive: !0,
        flexShrink: !0,
        flexNegative: !0,
        flexOrder: !0,
        gridArea: !0,
        gridRow: !0,
        gridRowEnd: !0,
        gridRowSpan: !0,
        gridRowStart: !0,
        gridColumn: !0,
        gridColumnEnd: !0,
        gridColumnSpan: !0,
        gridColumnStart: !0,
        fontWeight: !0,
        lineClamp: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        tabSize: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
        fillOpacity: !0,
        floodOpacity: !0,
        stopOpacity: !0,
        strokeDasharray: !0,
        strokeDashoffset: !0,
        strokeMiterlimit: !0,
        strokeOpacity: !0,
        strokeWidth: !0
    },
    f0 = ["Webkit", "ms", "Moz", "O"];
Object.keys(Nr).forEach(function(e) {
    f0.forEach(function(t) {
        t = t + e.charAt(0).toUpperCase() + e.substring(1), Nr[t] = Nr[e]
    })
});

function rf(e, t, n) {
    return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Nr.hasOwnProperty(e) && Nr[e] ? ("" + t).trim() : t + "px"
}

function of(e, t) {
    e = e.style;
    for (var n in t)
        if (t.hasOwnProperty(n)) {
            var r = n.indexOf("--") === 0,
                o = rf(n, t[n], r);
            n === "float" && (n = "cssFloat"), r ? e.setProperty(n, o) : e[n] = o
        }
}
var d0 = b({
    menuitem: !0
}, {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0
});

function Vl(e, t) {
    if (t) {
        if (d0[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(S(137, e));
        if (t.dangerouslySetInnerHTML != null) {
            if (t.children != null) throw Error(S(60));
            if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(S(61))
        }
        if (t.style != null && typeof t.style != "object") throw Error(S(62))
    }
}

function Ol(e, t) {
    if (e.indexOf("-") === -1) return typeof t.is == "string";
    switch (e) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
            return !1;
        default:
            return !0
    }
}
var Wl = null;

function qs(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e
}
var Ql = null,
    On = null,
    Wn = null;

function na(e) {
    if (e = uo(e)) {
        if (typeof Ql != "function") throw Error(S(280));
        var t = e.stateNode;
        t && (t = Ri(t), Ql(e.stateNode, e.type, t))
    }
}

function lf(e) {
    On ? Wn ? Wn.push(e) : Wn = [e] : On = e
}

function sf() {
    if (On) {
        var e = On,
            t = Wn;
        if (Wn = On = null, na(e), t)
            for (e = 0; e < t.length; e++) na(t[e])
    }
}

function uf(e, t) {
    return e(t)
}

function af() {}
var ll = !1;

function cf(e, t, n) {
    if (ll) return e(t, n);
    ll = !0;
    try {
        return uf(e, t, n)
    } finally {
        ll = !1, (On !== null || Wn !== null) && (af(), sf())
    }
}

function Kr(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var r = Ri(n);
    if (r === null) return null;
    n = r[t];
    e: switch (t) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
            (r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
            break e;
        default:
            e = !1
    }
    if (e) return null;
    if (n && typeof n != "function") throw Error(S(231, t, typeof n));
    return n
}
var Gl = !1;
if (xt) try {
    var yr = {};
    Object.defineProperty(yr, "passive", {
        get: function() {
            Gl = !0
        }
    }), window.addEventListener("test", yr, yr), window.removeEventListener("test", yr, yr)
} catch {
    Gl = !1
}

function p0(e, t, n, r, o, i, l, s, u) {
    var a = Array.prototype.slice.call(arguments, 3);
    try {
        t.apply(n, a)
    } catch (f) {
        this.onError(f)
    }
}
var Pr = !1,
    Zo = null,
    qo = !1,
    Yl = null,
    h0 = {
        onError: function(e) {
            Pr = !0, Zo = e
        }
    };

function y0(e, t, n, r, o, i, l, s, u) {
    Pr = !1, Zo = null, p0.apply(h0, arguments)
}

function g0(e, t, n, r, o, i, l, s, u) {
    if (y0.apply(this, arguments), Pr) {
        if (Pr) {
            var a = Zo;
            Pr = !1, Zo = null
        } else throw Error(S(198));
        qo || (qo = !0, Yl = a)
    }
}

function An(e) {
    var t = e,
        n = e;
    if (e.alternate)
        for (; t.return;) t = t.return;
    else {
        e = t;
        do t = e, (t.flags & 4098) !== 0 && (n = t.return), e = t.return; while (e)
    }
    return t.tag === 3 ? n : null
}

function ff(e) {
    if (e.tag === 13) {
        var t = e.memoizedState;
        if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated
    }
    return null
}

function ra(e) {
    if (An(e) !== e) throw Error(S(188))
}

function m0(e) {
    var t = e.alternate;
    if (!t) {
        if (t = An(e), t === null) throw Error(S(188));
        return t !== e ? null : e
    }
    for (var n = e, r = t;;) {
        var o = n.return;
        if (o === null) break;
        var i = o.alternate;
        if (i === null) {
            if (r = o.return, r !== null) {
                n = r;
                continue
            }
            break
        }
        if (o.child === i.child) {
            for (i = o.child; i;) {
                if (i === n) return ra(o), e;
                if (i === r) return ra(o), t;
                i = i.sibling
            }
            throw Error(S(188))
        }
        if (n.return !== r.return) n = o, r = i;
        else {
            for (var l = !1, s = o.child; s;) {
                if (s === n) {
                    l = !0, n = o, r = i;
                    break
                }
                if (s === r) {
                    l = !0, r = o, n = i;
                    break
                }
                s = s.sibling
            }
            if (!l) {
                for (s = i.child; s;) {
                    if (s === n) {
                        l = !0, n = i, r = o;
                        break
                    }
                    if (s === r) {
                        l = !0, r = i, n = o;
                        break
                    }
                    s = s.sibling
                }
                if (!l) throw Error(S(189))
            }
        }
        if (n.alternate !== r) throw Error(S(190))
    }
    if (n.tag !== 3) throw Error(S(188));
    return n.stateNode.current === n ? e : t
}

function df(e) {
    return e = m0(e), e !== null ? pf(e) : null
}

function pf(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null;) {
        var t = pf(e);
        if (t !== null) return t;
        e = e.sibling
    }
    return null
}
var hf = De.unstable_scheduleCallback,
    oa = De.unstable_cancelCallback,
    v0 = De.unstable_shouldYield,
    w0 = De.unstable_requestPaint,
    J = De.unstable_now,
    S0 = De.unstable_getCurrentPriorityLevel,
    Js = De.unstable_ImmediatePriority,
    yf = De.unstable_UserBlockingPriority,
    Jo = De.unstable_NormalPriority,
    E0 = De.unstable_LowPriority,
    gf = De.unstable_IdlePriority,
    Ii = null,
    ft = null;

function k0(e) {
    if (ft && typeof ft.onCommitFiberRoot == "function") try {
        ft.onCommitFiberRoot(Ii, e, void 0, (e.current.flags & 128) === 128)
    } catch {}
}
var rt = Math.clz32 ? Math.clz32 : _0,
    x0 = Math.log,
    C0 = Math.LN2;

function _0(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (x0(e) / C0 | 0) | 0
}
var So = 64,
    Eo = 4194304;

function Tr(e) {
    switch (e & -e) {
        case 1:
            return 1;
        case 2:
            return 2;
        case 4:
            return 4;
        case 8:
            return 8;
        case 16:
            return 16;
        case 32:
            return 32;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
            return e & 4194240;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
            return e & 130023424;
        case 134217728:
            return 134217728;
        case 268435456:
            return 268435456;
        case 536870912:
            return 536870912;
        case 1073741824:
            return 1073741824;
        default:
            return e
    }
}

function ei(e, t) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var r = 0,
        o = e.suspendedLanes,
        i = e.pingedLanes,
        l = n & 268435455;
    if (l !== 0) {
        var s = l & ~o;
        s !== 0 ? r = Tr(s) : (i &= l, i !== 0 && (r = Tr(i)))
    } else l = n & ~o, l !== 0 ? r = Tr(l) : i !== 0 && (r = Tr(i));
    if (r === 0) return 0;
    if (t !== 0 && t !== r && (t & o) === 0 && (o = r & -r, i = t & -t, o >= i || o === 16 && (i & 4194240) !== 0)) return t;
    if ((r & 4) !== 0 && (r |= n & 16), t = e.entangledLanes, t !== 0)
        for (e = e.entanglements, t &= r; 0 < t;) n = 31 - rt(t), o = 1 << n, r |= e[n], t &= ~o;
    return r
}

function A0(e, t) {
    switch (e) {
        case 1:
        case 2:
        case 4:
            return t + 250;
        case 8:
        case 16:
        case 32:
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
            return t + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
            return -1;
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
            return -1;
        default:
            return -1
    }
}

function T0(e, t) {
    for (var n = e.suspendedLanes, r = e.pingedLanes, o = e.expirationTimes, i = e.pendingLanes; 0 < i;) {
        var l = 31 - rt(i),
            s = 1 << l,
            u = o[l];
        u === -1 ? ((s & n) === 0 || (s & r) !== 0) && (o[l] = A0(s, t)) : u <= t && (e.expiredLanes |= s), i &= ~s
    }
}

function bl(e) {
    return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
}

function mf() {
    var e = So;
    return So <<= 1, (So & 4194240) === 0 && (So = 64), e
}

function sl(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t
}

function lo(e, t, n) {
    e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - rt(t), e[t] = n
}

function I0(e, t) {
    var n = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
    var r = e.eventTimes;
    for (e = e.expirationTimes; 0 < n;) {
        var o = 31 - rt(n),
            i = 1 << o;
        t[o] = 0, r[o] = -1, e[o] = -1, n &= ~i
    }
}

function eu(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n;) {
        var r = 31 - rt(n),
            o = 1 << r;
        o & t | e[r] & t && (e[r] |= t), n &= ~o
    }
}
var M = 0;

function vf(e) {
    return e &= -e, 1 < e ? 4 < e ? (e & 268435455) !== 0 ? 16 : 536870912 : 4 : 1
}
var wf, tu, Sf, Ef, kf, Xl = !1,
    ko = [],
    Vt = null,
    Ot = null,
    Wt = null,
    jr = new Map,
    Vr = new Map,
    zt = [],
    N0 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");

function ia(e, t) {
    switch (e) {
        case "focusin":
        case "focusout":
            Vt = null;
            break;
        case "dragenter":
        case "dragleave":
            Ot = null;
            break;
        case "mouseover":
        case "mouseout":
            Wt = null;
            break;
        case "pointerover":
        case "pointerout":
            jr.delete(t.pointerId);
            break;
        case "gotpointercapture":
        case "lostpointercapture":
            Vr.delete(t.pointerId)
    }
}

function gr(e, t, n, r, o, i) {
    return e === null || e.nativeEvent !== i ? (e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: i,
        targetContainers: [o]
    }, t !== null && (t = uo(t), t !== null && tu(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, o !== null && t.indexOf(o) === -1 && t.push(o), e)
}

function P0(e, t, n, r, o) {
    switch (t) {
        case "focusin":
            return Vt = gr(Vt, e, t, n, r, o), !0;
        case "dragenter":
            return Ot = gr(Ot, e, t, n, r, o), !0;
        case "mouseover":
            return Wt = gr(Wt, e, t, n, r, o), !0;
        case "pointerover":
            var i = o.pointerId;
            return jr.set(i, gr(jr.get(i) || null, e, t, n, r, o)), !0;
        case "gotpointercapture":
            return i = o.pointerId, Vr.set(i, gr(Vr.get(i) || null, e, t, n, r, o)), !0
    }
    return !1
}

function xf(e) {
    var t = fn(e.target);
    if (t !== null) {
        var n = An(t);
        if (n !== null) {
            if (t = n.tag, t === 13) {
                if (t = ff(n), t !== null) {
                    e.blockedOn = t, kf(e.priority, function() {
                        Sf(n)
                    });
                    return
                }
            } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
                e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
                return
            }
        }
    }
    e.blockedOn = null
}

function Mo(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length;) {
        var n = Zl(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
        if (n === null) {
            n = e.nativeEvent;
            var r = new n.constructor(n.type, n);
            Wl = r, n.target.dispatchEvent(r), Wl = null
        } else return t = uo(n), t !== null && tu(t), e.blockedOn = n, !1;
        t.shift()
    }
    return !0
}

function la(e, t, n) {
    Mo(e) && n.delete(t)
}

function L0() {
    Xl = !1, Vt !== null && Mo(Vt) && (Vt = null), Ot !== null && Mo(Ot) && (Ot = null), Wt !== null && Mo(Wt) && (Wt = null), jr.forEach(la), Vr.forEach(la)
}

function mr(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Xl || (Xl = !0, De.unstable_scheduleCallback(De.unstable_NormalPriority, L0)))
}

function Or(e) {
    function t(o) {
        return mr(o, e)
    }
    if (0 < ko.length) {
        mr(ko[0], e);
        for (var n = 1; n < ko.length; n++) {
            var r = ko[n];
            r.blockedOn === e && (r.blockedOn = null)
        }
    }
    for (Vt !== null && mr(Vt, e), Ot !== null && mr(Ot, e), Wt !== null && mr(Wt, e), jr.forEach(t), Vr.forEach(t), n = 0; n < zt.length; n++) r = zt[n], r.blockedOn === e && (r.blockedOn = null);
    for (; 0 < zt.length && (n = zt[0], n.blockedOn === null);) xf(n), n.blockedOn === null && zt.shift()
}
var Qn = Tt.ReactCurrentBatchConfig,
    ti = !0;

function R0(e, t, n, r) {
    var o = M,
        i = Qn.transition;
    Qn.transition = null;
    try {
        M = 1, nu(e, t, n, r)
    } finally {
        M = o, Qn.transition = i
    }
}

function U0(e, t, n, r) {
    var o = M,
        i = Qn.transition;
    Qn.transition = null;
    try {
        M = 4, nu(e, t, n, r)
    } finally {
        M = o, Qn.transition = i
    }
}

function nu(e, t, n, r) {
    if (ti) {
        var o = Zl(e, t, n, r);
        if (o === null) ml(e, t, r, ni, n), ia(e, r);
        else if (P0(o, e, t, n, r)) r.stopPropagation();
        else if (ia(e, r), t & 4 && -1 < N0.indexOf(e)) {
            for (; o !== null;) {
                var i = uo(o);
                if (i !== null && wf(i), i = Zl(e, t, n, r), i === null && ml(e, t, r, ni, n), i === o) break;
                o = i
            }
            o !== null && r.stopPropagation()
        } else ml(e, t, r, null, n)
    }
}
var ni = null;

function Zl(e, t, n, r) {
    if (ni = null, e = qs(r), e = fn(e), e !== null)
        if (t = An(e), t === null) e = null;
        else if (n = t.tag, n === 13) {
        if (e = ff(t), e !== null) return e;
        e = null
    } else if (n === 3) {
        if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
        e = null
    } else t !== e && (e = null);
    return ni = e, null
}

function Cf(e) {
    switch (e) {
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
            return 1;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "toggle":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
            return 4;
        case "message":
            switch (S0()) {
                case Js:
                    return 1;
                case yf:
                    return 4;
                case Jo:
                case E0:
                    return 16;
                case gf:
                    return 536870912;
                default:
                    return 16
            }
        default:
            return 16
    }
}
var $t = null,
    ru = null,
    Fo = null;

function _f() {
    if (Fo) return Fo;
    var e, t = ru,
        n = t.length,
        r, o = "value" in $t ? $t.value : $t.textContent,
        i = o.length;
    for (e = 0; e < n && t[e] === o[e]; e++);
    var l = n - e;
    for (r = 1; r <= l && t[n - r] === o[i - r]; r++);
    return Fo = o.slice(e, 1 < r ? 1 - r : void 0)
}

function Ko(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0
}

function xo() {
    return !0
}

function sa() {
    return !1
}

function Me(e) {
    function t(n, r, o, i, l) {
        this._reactName = n, this._targetInst = o, this.type = r, this.nativeEvent = i, this.target = l, this.currentTarget = null;
        for (var s in e) e.hasOwnProperty(s) && (n = e[s], this[s] = n ? n(i) : i[s]);
        return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1) ? xo : sa, this.isPropagationStopped = sa, this
    }
    return b(t.prototype, {
        preventDefault: function() {
            this.defaultPrevented = !0;
            var n = this.nativeEvent;
            n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = xo)
        },
        stopPropagation: function() {
            var n = this.nativeEvent;
            n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = xo)
        },
        persist: function() {},
        isPersistent: xo
    }), t
}
var ur = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function(e) {
            return e.timeStamp || Date.now()
        },
        defaultPrevented: 0,
        isTrusted: 0
    },
    ou = Me(ur),
    so = b({}, ur, {
        view: 0,
        detail: 0
    }),
    H0 = Me(so),
    ul, al, vr, Ni = b({}, so, {
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        pageX: 0,
        pageY: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        getModifierState: iu,
        button: 0,
        buttons: 0,
        relatedTarget: function(e) {
            return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget
        },
        movementX: function(e) {
            return "movementX" in e ? e.movementX : (e !== vr && (vr && e.type === "mousemove" ? (ul = e.screenX - vr.screenX, al = e.screenY - vr.screenY) : al = ul = 0, vr = e), ul)
        },
        movementY: function(e) {
            return "movementY" in e ? e.movementY : al
        }
    }),
    ua = Me(Ni),
    B0 = b({}, Ni, {
        dataTransfer: 0
    }),
    z0 = Me(B0),
    D0 = b({}, so, {
        relatedTarget: 0
    }),
    cl = Me(D0),
    $0 = b({}, ur, {
        animationName: 0,
        elapsedTime: 0,
        pseudoElement: 0
    }),
    M0 = Me($0),
    F0 = b({}, ur, {
        clipboardData: function(e) {
            return "clipboardData" in e ? e.clipboardData : window.clipboardData
        }
    }),
    K0 = Me(F0),
    j0 = b({}, ur, {
        data: 0
    }),
    aa = Me(j0),
    V0 = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified"
    },
    O0 = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta"
    },
    W0 = {
        Alt: "altKey",
        Control: "ctrlKey",
        Meta: "metaKey",
        Shift: "shiftKey"
    };

function Q0(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = W0[e]) ? !!t[e] : !1
}

function iu() {
    return Q0
}
var G0 = b({}, so, {
        key: function(e) {
            if (e.key) {
                var t = V0[e.key] || e.key;
                if (t !== "Unidentified") return t
            }
            return e.type === "keypress" ? (e = Ko(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? O0[e.keyCode] || "Unidentified" : ""
        },
        code: 0,
        location: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        repeat: 0,
        locale: 0,
        getModifierState: iu,
        charCode: function(e) {
            return e.type === "keypress" ? Ko(e) : 0
        },
        keyCode: function(e) {
            return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
        },
        which: function(e) {
            return e.type === "keypress" ? Ko(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
        }
    }),
    Y0 = Me(G0),
    b0 = b({}, Ni, {
        pointerId: 0,
        width: 0,
        height: 0,
        pressure: 0,
        tangentialPressure: 0,
        tiltX: 0,
        tiltY: 0,
        twist: 0,
        pointerType: 0,
        isPrimary: 0
    }),
    ca = Me(b0),
    X0 = b({}, so, {
        touches: 0,
        targetTouches: 0,
        changedTouches: 0,
        altKey: 0,
        metaKey: 0,
        ctrlKey: 0,
        shiftKey: 0,
        getModifierState: iu
    }),
    Z0 = Me(X0),
    q0 = b({}, ur, {
        propertyName: 0,
        elapsedTime: 0,
        pseudoElement: 0
    }),
    J0 = Me(q0),
    eh = b({}, Ni, {
        deltaX: function(e) {
            return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0
        },
        deltaY: function(e) {
            return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0
        },
        deltaZ: 0,
        deltaMode: 0
    }),
    th = Me(eh),
    nh = [9, 13, 27, 32],
    lu = xt && "CompositionEvent" in window,
    Lr = null;
xt && "documentMode" in document && (Lr = document.documentMode);
var rh = xt && "TextEvent" in window && !Lr,
    Af = xt && (!lu || Lr && 8 < Lr && 11 >= Lr),
    fa = String.fromCharCode(32),
    da = !1;

function Tf(e, t) {
    switch (e) {
        case "keyup":
            return nh.indexOf(t.keyCode) !== -1;
        case "keydown":
            return t.keyCode !== 229;
        case "keypress":
        case "mousedown":
        case "focusout":
            return !0;
        default:
            return !1
    }
}

function If(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null
}
var Un = !1;

function oh(e, t) {
    switch (e) {
        case "compositionend":
            return If(t);
        case "keypress":
            return t.which !== 32 ? null : (da = !0, fa);
        case "textInput":
            return e = t.data, e === fa && da ? null : e;
        default:
            return null
    }
}

function ih(e, t) {
    if (Un) return e === "compositionend" || !lu && Tf(e, t) ? (e = _f(), Fo = ru = $t = null, Un = !1, e) : null;
    switch (e) {
        case "paste":
            return null;
        case "keypress":
            if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
                if (t.char && 1 < t.char.length) return t.char;
                if (t.which) return String.fromCharCode(t.which)
            }
            return null;
        case "compositionend":
            return Af && t.locale !== "ko" ? null : t.data;
        default:
            return null
    }
}
var lh = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
};

function pa(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!lh[e.type] : t === "textarea"
}

function Nf(e, t, n, r) {
    lf(r), t = ri(t, "onChange"), 0 < t.length && (n = new ou("onChange", "change", null, n, r), e.push({
        event: n,
        listeners: t
    }))
}
var Rr = null,
    Wr = null;

function sh(e) {
    Ff(e, 0)
}

function Pi(e) {
    var t = zn(e);
    if (qc(t)) return e
}

function uh(e, t) {
    if (e === "change") return t
}
var Pf = !1;
if (xt) {
    var fl;
    if (xt) {
        var dl = "oninput" in document;
        if (!dl) {
            var ha = document.createElement("div");
            ha.setAttribute("oninput", "return;"), dl = typeof ha.oninput == "function"
        }
        fl = dl
    } else fl = !1;
    Pf = fl && (!document.documentMode || 9 < document.documentMode)
}

function ya() {
    Rr && (Rr.detachEvent("onpropertychange", Lf), Wr = Rr = null)
}

function Lf(e) {
    if (e.propertyName === "value" && Pi(Wr)) {
        var t = [];
        Nf(t, Wr, e, qs(e)), cf(sh, t)
    }
}

function ah(e, t, n) {
    e === "focusin" ? (ya(), Rr = t, Wr = n, Rr.attachEvent("onpropertychange", Lf)) : e === "focusout" && ya()
}

function ch(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown") return Pi(Wr)
}

function fh(e, t) {
    if (e === "click") return Pi(t)
}

function dh(e, t) {
    if (e === "input" || e === "change") return Pi(t)
}

function ph(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t
}
var it = typeof Object.is == "function" ? Object.is : ph;

function Qr(e, t) {
    if (it(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
    var n = Object.keys(e),
        r = Object.keys(t);
    if (n.length !== r.length) return !1;
    for (r = 0; r < n.length; r++) {
        var o = n[r];
        if (!Ul.call(t, o) || !it(e[o], t[o])) return !1
    }
    return !0
}

function ga(e) {
    for (; e && e.firstChild;) e = e.firstChild;
    return e
}

function ma(e, t) {
    var n = ga(e);
    e = 0;
    for (var r; n;) {
        if (n.nodeType === 3) {
            if (r = e + n.textContent.length, e <= t && r >= t) return {
                node: n,
                offset: t - e
            };
            e = r
        }
        e: {
            for (; n;) {
                if (n.nextSibling) {
                    n = n.nextSibling;
                    break e
                }
                n = n.parentNode
            }
            n = void 0
        }
        n = ga(n)
    }
}

function Rf(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Rf(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1
}

function Uf() {
    for (var e = window, t = Xo(); t instanceof e.HTMLIFrameElement;) {
        try {
            var n = typeof t.contentWindow.location.href == "string"
        } catch {
            n = !1
        }
        if (n) e = t.contentWindow;
        else break;
        t = Xo(e.document)
    }
    return t
}

function su(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true")
}

function hh(e) {
    var t = Uf(),
        n = e.focusedElem,
        r = e.selectionRange;
    if (t !== n && n && n.ownerDocument && Rf(n.ownerDocument.documentElement, n)) {
        if (r !== null && su(n)) {
            if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
            else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
                e = e.getSelection();
                var o = n.textContent.length,
                    i = Math.min(r.start, o);
                r = r.end === void 0 ? i : Math.min(r.end, o), !e.extend && i > r && (o = r, r = i, i = o), o = ma(n, i);
                var l = ma(n, r);
                o && l && (e.rangeCount !== 1 || e.anchorNode !== o.node || e.anchorOffset !== o.offset || e.focusNode !== l.node || e.focusOffset !== l.offset) && (t = t.createRange(), t.setStart(o.node, o.offset), e.removeAllRanges(), i > r ? (e.addRange(t), e.extend(l.node, l.offset)) : (t.setEnd(l.node, l.offset), e.addRange(t)))
            }
        }
        for (t = [], e = n; e = e.parentNode;) e.nodeType === 1 && t.push({
            element: e,
            left: e.scrollLeft,
            top: e.scrollTop
        });
        for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top
    }
}
var yh = xt && "documentMode" in document && 11 >= document.documentMode,
    Hn = null,
    ql = null,
    Ur = null,
    Jl = !1;

function va(e, t, n) {
    var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Jl || Hn == null || Hn !== Xo(r) || (r = Hn, "selectionStart" in r && su(r) ? r = {
        start: r.selectionStart,
        end: r.selectionEnd
    } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
        anchorNode: r.anchorNode,
        anchorOffset: r.anchorOffset,
        focusNode: r.focusNode,
        focusOffset: r.focusOffset
    }), Ur && Qr(Ur, r) || (Ur = r, r = ri(ql, "onSelect"), 0 < r.length && (t = new ou("onSelect", "select", null, t, n), e.push({
        event: t,
        listeners: r
    }), t.target = Hn)))
}

function Co(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n
}
var Bn = {
        animationend: Co("Animation", "AnimationEnd"),
        animationiteration: Co("Animation", "AnimationIteration"),
        animationstart: Co("Animation", "AnimationStart"),
        transitionend: Co("Transition", "TransitionEnd")
    },
    pl = {},
    Hf = {};
xt && (Hf = document.createElement("div").style, "AnimationEvent" in window || (delete Bn.animationend.animation, delete Bn.animationiteration.animation, delete Bn.animationstart.animation), "TransitionEvent" in window || delete Bn.transitionend.transition);

function Li(e) {
    if (pl[e]) return pl[e];
    if (!Bn[e]) return e;
    var t = Bn[e],
        n;
    for (n in t)
        if (t.hasOwnProperty(n) && n in Hf) return pl[e] = t[n];
    return e
}
var Bf = Li("animationend"),
    zf = Li("animationiteration"),
    Df = Li("animationstart"),
    $f = Li("transitionend"),
    Mf = new Map,
    wa = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");

function tn(e, t) {
    Mf.set(e, t), _n(t, [e])
}
for (var hl = 0; hl < wa.length; hl++) {
    var yl = wa[hl],
        gh = yl.toLowerCase(),
        mh = yl[0].toUpperCase() + yl.slice(1);
    tn(gh, "on" + mh)
}
tn(Bf, "onAnimationEnd");
tn(zf, "onAnimationIteration");
tn(Df, "onAnimationStart");
tn("dblclick", "onDoubleClick");
tn("focusin", "onFocus");
tn("focusout", "onBlur");
tn($f, "onTransitionEnd");
Xn("onMouseEnter", ["mouseout", "mouseover"]);
Xn("onMouseLeave", ["mouseout", "mouseover"]);
Xn("onPointerEnter", ["pointerout", "pointerover"]);
Xn("onPointerLeave", ["pointerout", "pointerover"]);
_n("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
_n("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
_n("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
_n("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
_n("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
_n("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Ir = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),
    vh = new Set("cancel close invalid load scroll toggle".split(" ").concat(Ir));

function Sa(e, t, n) {
    var r = e.type || "unknown-event";
    e.currentTarget = n, g0(r, t, void 0, e), e.currentTarget = null
}

function Ff(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
        var r = e[n],
            o = r.event;
        r = r.listeners;
        e: {
            var i = void 0;
            if (t)
                for (var l = r.length - 1; 0 <= l; l--) {
                    var s = r[l],
                        u = s.instance,
                        a = s.currentTarget;
                    if (s = s.listener, u !== i && o.isPropagationStopped()) break e;
                    Sa(o, s, a), i = u
                } else
                    for (l = 0; l < r.length; l++) {
                        if (s = r[l], u = s.instance, a = s.currentTarget, s = s.listener, u !== i && o.isPropagationStopped()) break e;
                        Sa(o, s, a), i = u
                    }
        }
    }
    if (qo) throw e = Yl, qo = !1, Yl = null, e
}

function V(e, t) {
    var n = t[os];
    n === void 0 && (n = t[os] = new Set);
    var r = e + "__bubble";
    n.has(r) || (Kf(t, e, 2, !1), n.add(r))
}

function gl(e, t, n) {
    var r = 0;
    t && (r |= 4), Kf(n, e, r, t)
}
var _o = "_reactListening" + Math.random().toString(36).slice(2);

function Gr(e) {
    if (!e[_o]) {
        e[_o] = !0, Gc.forEach(function(n) {
            n !== "selectionchange" && (vh.has(n) || gl(n, !1, e), gl(n, !0, e))
        });
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[_o] || (t[_o] = !0, gl("selectionchange", !1, t))
    }
}

function Kf(e, t, n, r) {
    switch (Cf(t)) {
        case 1:
            var o = R0;
            break;
        case 4:
            o = U0;
            break;
        default:
            o = nu
    }
    n = o.bind(null, t, n, e), o = void 0, !Gl || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (o = !0), r ? o !== void 0 ? e.addEventListener(t, n, {
        capture: !0,
        passive: o
    }) : e.addEventListener(t, n, !0) : o !== void 0 ? e.addEventListener(t, n, {
        passive: o
    }) : e.addEventListener(t, n, !1)
}

function ml(e, t, n, r, o) {
    var i = r;
    if ((t & 1) === 0 && (t & 2) === 0 && r !== null) e: for (;;) {
        if (r === null) return;
        var l = r.tag;
        if (l === 3 || l === 4) {
            var s = r.stateNode.containerInfo;
            if (s === o || s.nodeType === 8 && s.parentNode === o) break;
            if (l === 4)
                for (l = r.return; l !== null;) {
                    var u = l.tag;
                    if ((u === 3 || u === 4) && (u = l.stateNode.containerInfo, u === o || u.nodeType === 8 && u.parentNode === o)) return;
                    l = l.return
                }
            for (; s !== null;) {
                if (l = fn(s), l === null) return;
                if (u = l.tag, u === 5 || u === 6) {
                    r = i = l;
                    continue e
                }
                s = s.parentNode
            }
        }
        r = r.return
    }
    cf(function() {
        var a = i,
            f = qs(n),
            d = [];
        e: {
            var p = Mf.get(e);
            if (p !== void 0) {
                var g = ou,
                    v = e;
                switch (e) {
                    case "keypress":
                        if (Ko(n) === 0) break e;
                    case "keydown":
                    case "keyup":
                        g = Y0;
                        break;
                    case "focusin":
                        v = "focus", g = cl;
                        break;
                    case "focusout":
                        v = "blur", g = cl;
                        break;
                    case "beforeblur":
                    case "afterblur":
                        g = cl;
                        break;
                    case "click":
                        if (n.button === 2) break e;
                    case "auxclick":
                    case "dblclick":
                    case "mousedown":
                    case "mousemove":
                    case "mouseup":
                    case "mouseout":
                    case "mouseover":
                    case "contextmenu":
                        g = ua;
                        break;
                    case "drag":
                    case "dragend":
                    case "dragenter":
                    case "dragexit":
                    case "dragleave":
                    case "dragover":
                    case "dragstart":
                    case "drop":
                        g = z0;
                        break;
                    case "touchcancel":
                    case "touchend":
                    case "touchmove":
                    case "touchstart":
                        g = Z0;
                        break;
                    case Bf:
                    case zf:
                    case Df:
                        g = M0;
                        break;
                    case $f:
                        g = J0;
                        break;
                    case "scroll":
                        g = H0;
                        break;
                    case "wheel":
                        g = th;
                        break;
                    case "copy":
                    case "cut":
                    case "paste":
                        g = K0;
                        break;
                    case "gotpointercapture":
                    case "lostpointercapture":
                    case "pointercancel":
                    case "pointerdown":
                    case "pointermove":
                    case "pointerout":
                    case "pointerover":
                    case "pointerup":
                        g = ca
                }
                var w = (t & 4) !== 0,
                    H = !w && e === "scroll",
                    h = w ? p !== null ? p + "Capture" : null : p;
                w = [];
                for (var c = a, y; c !== null;) {
                    y = c;
                    var m = y.stateNode;
                    if (y.tag === 5 && m !== null && (y = m, h !== null && (m = Kr(c, h), m != null && w.push(Yr(c, m, y)))), H) break;
                    c = c.return
                }
                0 < w.length && (p = new g(p, v, null, n, f), d.push({
                    event: p,
                    listeners: w
                }))
            }
        }
        if ((t & 7) === 0) {
            e: {
                if (p = e === "mouseover" || e === "pointerover", g = e === "mouseout" || e === "pointerout", p && n !== Wl && (v = n.relatedTarget || n.fromElement) && (fn(v) || v[Ct])) break e;
                if ((g || p) && (p = f.window === f ? f : (p = f.ownerDocument) ? p.defaultView || p.parentWindow : window, g ? (v = n.relatedTarget || n.toElement, g = a, v = v ? fn(v) : null, v !== null && (H = An(v), v !== H || v.tag !== 5 && v.tag !== 6) && (v = null)) : (g = null, v = a), g !== v)) {
                    if (w = ua, m = "onMouseLeave", h = "onMouseEnter", c = "mouse", (e === "pointerout" || e === "pointerover") && (w = ca, m = "onPointerLeave", h = "onPointerEnter", c = "pointer"), H = g == null ? p : zn(g), y = v == null ? p : zn(v), p = new w(m, c + "leave", g, n, f), p.target = H, p.relatedTarget = y, m = null, fn(f) === a && (w = new w(h, c + "enter", v, n, f), w.target = y, w.relatedTarget = H, m = w), H = m, g && v) t: {
                        for (w = g, h = v, c = 0, y = w; y; y = Pn(y)) c++;
                        for (y = 0, m = h; m; m = Pn(m)) y++;
                        for (; 0 < c - y;) w = Pn(w),
                        c--;
                        for (; 0 < y - c;) h = Pn(h),
                        y--;
                        for (; c--;) {
                            if (w === h || h !== null && w === h.alternate) break t;
                            w = Pn(w), h = Pn(h)
                        }
                        w = null
                    }
                    else w = null;
                    g !== null && Ea(d, p, g, w, !1), v !== null && H !== null && Ea(d, H, v, w, !0)
                }
            }
            e: {
                if (p = a ? zn(a) : window, g = p.nodeName && p.nodeName.toLowerCase(), g === "select" || g === "input" && p.type === "file") var E = uh;
                else if (pa(p))
                    if (Pf) E = dh;
                    else {
                        E = ch;
                        var A = ah
                    }
                else(g = p.nodeName) && g.toLowerCase() === "input" && (p.type === "checkbox" || p.type === "radio") && (E = fh);
                if (E && (E = E(e, a))) {
                    Nf(d, E, n, f);
                    break e
                }
                A && A(e, p, a),
                e === "focusout" && (A = p._wrapperState) && A.controlled && p.type === "number" && Fl(p, "number", p.value)
            }
            switch (A = a ? zn(a) : window, e) {
                case "focusin":
                    (pa(A) || A.contentEditable === "true") && (Hn = A, ql = a, Ur = null);
                    break;
                case "focusout":
                    Ur = ql = Hn = null;
                    break;
                case "mousedown":
                    Jl = !0;
                    break;
                case "contextmenu":
                case "mouseup":
                case "dragend":
                    Jl = !1, va(d, n, f);
                    break;
                case "selectionchange":
                    if (yh) break;
                case "keydown":
                case "keyup":
                    va(d, n, f)
            }
            var T;
            if (lu) e: {
                switch (e) {
                    case "compositionstart":
                        var I = "onCompositionStart";
                        break e;
                    case "compositionend":
                        I = "onCompositionEnd";
                        break e;
                    case "compositionupdate":
                        I = "onCompositionUpdate";
                        break e
                }
                I = void 0
            }
            else Un ? Tf(e, n) && (I = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (I = "onCompositionStart");I && (Af && n.locale !== "ko" && (Un || I !== "onCompositionStart" ? I === "onCompositionEnd" && Un && (T = _f()) : ($t = f, ru = "value" in $t ? $t.value : $t.textContent, Un = !0)), A = ri(a, I), 0 < A.length && (I = new aa(I, e, null, n, f), d.push({
                event: I,
                listeners: A
            }), T ? I.data = T : (T = If(n), T !== null && (I.data = T)))),
            (T = rh ? oh(e, n) : ih(e, n)) && (a = ri(a, "onBeforeInput"), 0 < a.length && (f = new aa("onBeforeInput", "beforeinput", null, n, f), d.push({
                event: f,
                listeners: a
            }), f.data = T))
        }
        Ff(d, t)
    })
}

function Yr(e, t, n) {
    return {
        instance: e,
        listener: t,
        currentTarget: n
    }
}

function ri(e, t) {
    for (var n = t + "Capture", r = []; e !== null;) {
        var o = e,
            i = o.stateNode;
        o.tag === 5 && i !== null && (o = i, i = Kr(e, n), i != null && r.unshift(Yr(e, i, o)), i = Kr(e, t), i != null && r.push(Yr(e, i, o))), e = e.return
    }
    return r
}

function Pn(e) {
    if (e === null) return null;
    do e = e.return; while (e && e.tag !== 5);
    return e || null
}

function Ea(e, t, n, r, o) {
    for (var i = t._reactName, l = []; n !== null && n !== r;) {
        var s = n,
            u = s.alternate,
            a = s.stateNode;
        if (u !== null && u === r) break;
        s.tag === 5 && a !== null && (s = a, o ? (u = Kr(n, i), u != null && l.unshift(Yr(n, u, s))) : o || (u = Kr(n, i), u != null && l.push(Yr(n, u, s)))), n = n.return
    }
    l.length !== 0 && e.push({
        event: t,
        listeners: l
    })
}
var wh = /\r\n?/g,
    Sh = /\u0000|\uFFFD/g;

function ka(e) {
    return (typeof e == "string" ? e : "" + e).replace(wh, `
`).replace(Sh, "")
}

function Ao(e, t, n) {
    if (t = ka(t), ka(e) !== t && n) throw Error(S(425))
}

function oi() {}
var es = null,
    ts = null;

function ns(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null
}
var rs = typeof setTimeout == "function" ? setTimeout : void 0,
    Eh = typeof clearTimeout == "function" ? clearTimeout : void 0,
    xa = typeof Promise == "function" ? Promise : void 0,
    kh = typeof queueMicrotask == "function" ? queueMicrotask : typeof xa < "u" ? function(e) {
        return xa.resolve(null).then(e).catch(xh)
    } : rs;

function xh(e) {
    setTimeout(function() {
        throw e
    })
}

function vl(e, t) {
    var n = t,
        r = 0;
    do {
        var o = n.nextSibling;
        if (e.removeChild(n), o && o.nodeType === 8)
            if (n = o.data, n === "/$") {
                if (r === 0) {
                    e.removeChild(o), Or(t);
                    return
                }
                r--
            } else n !== "$" && n !== "$?" && n !== "$!" || r++;
        n = o
    } while (n);
    Or(t)
}

function Qt(e) {
    for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === 1 || t === 3) break;
        if (t === 8) {
            if (t = e.data, t === "$" || t === "$!" || t === "$?") break;
            if (t === "/$") return null
        }
    }
    return e
}

function Ca(e) {
    e = e.previousSibling;
    for (var t = 0; e;) {
        if (e.nodeType === 8) {
            var n = e.data;
            if (n === "$" || n === "$!" || n === "$?") {
                if (t === 0) return e;
                t--
            } else n === "/$" && t++
        }
        e = e.previousSibling
    }
    return null
}
var ar = Math.random().toString(36).slice(2),
    ct = "__reactFiber$" + ar,
    br = "__reactProps$" + ar,
    Ct = "__reactContainer$" + ar,
    os = "__reactEvents$" + ar,
    Ch = "__reactListeners$" + ar,
    _h = "__reactHandles$" + ar;

function fn(e) {
    var t = e[ct];
    if (t) return t;
    for (var n = e.parentNode; n;) {
        if (t = n[Ct] || n[ct]) {
            if (n = t.alternate, t.child !== null || n !== null && n.child !== null)
                for (e = Ca(e); e !== null;) {
                    if (n = e[ct]) return n;
                    e = Ca(e)
                }
            return t
        }
        e = n, n = e.parentNode
    }
    return null
}

function uo(e) {
    return e = e[ct] || e[Ct], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e
}

function zn(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(S(33))
}

function Ri(e) {
    return e[br] || null
}
var is = [],
    Dn = -1;

function nn(e) {
    return {
        current: e
    }
}

function O(e) {
    0 > Dn || (e.current = is[Dn], is[Dn] = null, Dn--)
}

function j(e, t) {
    Dn++, is[Dn] = e.current, e.current = t
}
var en = {},
    me = nn(en),
    Te = nn(!1),
    wn = en;

function Zn(e, t) {
    var n = e.type.contextTypes;
    if (!n) return en;
    var r = e.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
    var o = {},
        i;
    for (i in n) o[i] = t[i];
    return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = o), o
}

function Ie(e) {
    return e = e.childContextTypes, e != null
}

function ii() {
    O(Te), O(me)
}

function _a(e, t, n) {
    if (me.current !== en) throw Error(S(168));
    j(me, t), j(Te, n)
}

function jf(e, t, n) {
    var r = e.stateNode;
    if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
    r = r.getChildContext();
    for (var o in r)
        if (!(o in t)) throw Error(S(108, a0(e) || "Unknown", o));
    return b({}, n, r)
}

function li(e) {
    return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || en, wn = me.current, j(me, e), j(Te, Te.current), !0
}

function Aa(e, t, n) {
    var r = e.stateNode;
    if (!r) throw Error(S(169));
    n ? (e = jf(e, t, wn), r.__reactInternalMemoizedMergedChildContext = e, O(Te), O(me), j(me, e)) : O(Te), j(Te, n)
}
var vt = null,
    Ui = !1,
    wl = !1;

function Vf(e) {
    vt === null ? vt = [e] : vt.push(e)
}

function Ah(e) {
    Ui = !0, Vf(e)
}

function rn() {
    if (!wl && vt !== null) {
        wl = !0;
        var e = 0,
            t = M;
        try {
            var n = vt;
            for (M = 1; e < n.length; e++) {
                var r = n[e];
                do r = r(!0); while (r !== null)
            }
            vt = null, Ui = !1
        } catch (o) {
            throw vt !== null && (vt = vt.slice(e + 1)), hf(Js, rn), o
        } finally {
            M = t, wl = !1
        }
    }
    return null
}
var $n = [],
    Mn = 0,
    si = null,
    ui = 0,
    je = [],
    Ve = 0,
    Sn = null,
    wt = 1,
    St = "";

function an(e, t) {
    $n[Mn++] = ui, $n[Mn++] = si, si = e, ui = t
}

function Of(e, t, n) {
    je[Ve++] = wt, je[Ve++] = St, je[Ve++] = Sn, Sn = e;
    var r = wt;
    e = St;
    var o = 32 - rt(r) - 1;
    r &= ~(1 << o), n += 1;
    var i = 32 - rt(t) + o;
    if (30 < i) {
        var l = o - o % 5;
        i = (r & (1 << l) - 1).toString(32), r >>= l, o -= l, wt = 1 << 32 - rt(t) + o | n << o | r, St = i + e
    } else wt = 1 << i | n << o | r, St = e
}

function uu(e) {
    e.return !== null && (an(e, 1), Of(e, 1, 0))
}

function au(e) {
    for (; e === si;) si = $n[--Mn], $n[Mn] = null, ui = $n[--Mn], $n[Mn] = null;
    for (; e === Sn;) Sn = je[--Ve], je[Ve] = null, St = je[--Ve], je[Ve] = null, wt = je[--Ve], je[Ve] = null
}
var ze = null,
    Be = null,
    W = !1,
    tt = null;

function Wf(e, t) {
    var n = Oe(5, null, null, 0);
    n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n)
}

function Ta(e, t) {
    switch (e.tag) {
        case 5:
            var n = e.type;
            return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, ze = e, Be = Qt(t.firstChild), !0) : !1;
        case 6:
            return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, ze = e, Be = null, !0) : !1;
        case 13:
            return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Sn !== null ? {
                id: wt,
                overflow: St
            } : null, e.memoizedState = {
                dehydrated: t,
                treeContext: n,
                retryLane: 1073741824
            }, n = Oe(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, ze = e, Be = null, !0) : !1;
        default:
            return !1
    }
}

function ls(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0
}

function ss(e) {
    if (W) {
        var t = Be;
        if (t) {
            var n = t;
            if (!Ta(e, t)) {
                if (ls(e)) throw Error(S(418));
                t = Qt(n.nextSibling);
                var r = ze;
                t && Ta(e, t) ? Wf(r, n) : (e.flags = e.flags & -4097 | 2, W = !1, ze = e)
            }
        } else {
            if (ls(e)) throw Error(S(418));
            e.flags = e.flags & -4097 | 2, W = !1, ze = e
        }
    }
}

function Ia(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;) e = e.return;
    ze = e
}

function To(e) {
    if (e !== ze) return !1;
    if (!W) return Ia(e), W = !0, !1;
    var t;
    if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !ns(e.type, e.memoizedProps)), t && (t = Be)) {
        if (ls(e)) throw Qf(), Error(S(418));
        for (; t;) Wf(e, t), t = Qt(t.nextSibling)
    }
    if (Ia(e), e.tag === 13) {
        if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(S(317));
        e: {
            for (e = e.nextSibling, t = 0; e;) {
                if (e.nodeType === 8) {
                    var n = e.data;
                    if (n === "/$") {
                        if (t === 0) {
                            Be = Qt(e.nextSibling);
                            break e
                        }
                        t--
                    } else n !== "$" && n !== "$!" && n !== "$?" || t++
                }
                e = e.nextSibling
            }
            Be = null
        }
    } else Be = ze ? Qt(e.stateNode.nextSibling) : null;
    return !0
}

function Qf() {
    for (var e = Be; e;) e = Qt(e.nextSibling)
}

function qn() {
    Be = ze = null, W = !1
}

function cu(e) {
    tt === null ? tt = [e] : tt.push(e)
}
var Th = Tt.ReactCurrentBatchConfig;

function Je(e, t) {
    if (e && e.defaultProps) {
        t = b({}, t), e = e.defaultProps;
        for (var n in e) t[n] === void 0 && (t[n] = e[n]);
        return t
    }
    return t
}
var ai = nn(null),
    ci = null,
    Fn = null,
    fu = null;

function du() {
    fu = Fn = ci = null
}

function pu(e) {
    var t = ai.current;
    O(ai), e._currentValue = t
}

function us(e, t, n) {
    for (; e !== null;) {
        var r = e.alternate;
        if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
        e = e.return
    }
}

function Gn(e, t) {
    ci = e, fu = Fn = null, e = e.dependencies, e !== null && e.firstContext !== null && ((e.lanes & t) !== 0 && (Ae = !0), e.firstContext = null)
}

function Ye(e) {
    var t = e._currentValue;
    if (fu !== e)
        if (e = {
                context: e,
                memoizedValue: t,
                next: null
            }, Fn === null) {
            if (ci === null) throw Error(S(308));
            Fn = e, ci.dependencies = {
                lanes: 0,
                firstContext: e
            }
        } else Fn = Fn.next = e;
    return t
}
var dn = null;

function hu(e) {
    dn === null ? dn = [e] : dn.push(e)
}

function Gf(e, t, n, r) {
    var o = t.interleaved;
    return o === null ? (n.next = n, hu(t)) : (n.next = o.next, o.next = n), t.interleaved = n, _t(e, r)
}

function _t(e, t) {
    e.lanes |= t;
    var n = e.alternate;
    for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null;) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
    return n.tag === 3 ? n.stateNode : null
}
var Ht = !1;

function yu(e) {
    e.updateQueue = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
            pending: null,
            interleaved: null,
            lanes: 0
        },
        effects: null
    }
}

function Yf(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects
    })
}

function Et(e, t) {
    return {
        eventTime: e,
        lane: t,
        tag: 0,
        payload: null,
        callback: null,
        next: null
    }
}

function Gt(e, t, n) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (r = r.shared, (B & 2) !== 0) {
        var o = r.pending;
        return o === null ? t.next = t : (t.next = o.next, o.next = t), r.pending = t, _t(e, n)
    }
    return o = r.interleaved, o === null ? (t.next = t, hu(r)) : (t.next = o.next, o.next = t), r.interleaved = t, _t(e, n)
}

function jo(e, t, n) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
        var r = t.lanes;
        r &= e.pendingLanes, n |= r, t.lanes = n, eu(e, n)
    }
}

function Na(e, t) {
    var n = e.updateQueue,
        r = e.alternate;
    if (r !== null && (r = r.updateQueue, n === r)) {
        var o = null,
            i = null;
        if (n = n.firstBaseUpdate, n !== null) {
            do {
                var l = {
                    eventTime: n.eventTime,
                    lane: n.lane,
                    tag: n.tag,
                    payload: n.payload,
                    callback: n.callback,
                    next: null
                };
                i === null ? o = i = l : i = i.next = l, n = n.next
            } while (n !== null);
            i === null ? o = i = t : i = i.next = t
        } else o = i = t;
        n = {
            baseState: r.baseState,
            firstBaseUpdate: o,
            lastBaseUpdate: i,
            shared: r.shared,
            effects: r.effects
        }, e.updateQueue = n;
        return
    }
    e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t
}

function fi(e, t, n, r) {
    var o = e.updateQueue;
    Ht = !1;
    var i = o.firstBaseUpdate,
        l = o.lastBaseUpdate,
        s = o.shared.pending;
    if (s !== null) {
        o.shared.pending = null;
        var u = s,
            a = u.next;
        u.next = null, l === null ? i = a : l.next = a, l = u;
        var f = e.alternate;
        f !== null && (f = f.updateQueue, s = f.lastBaseUpdate, s !== l && (s === null ? f.firstBaseUpdate = a : s.next = a, f.lastBaseUpdate = u))
    }
    if (i !== null) {
        var d = o.baseState;
        l = 0, f = a = u = null, s = i;
        do {
            var p = s.lane,
                g = s.eventTime;
            if ((r & p) === p) {
                f !== null && (f = f.next = {
                    eventTime: g,
                    lane: 0,
                    tag: s.tag,
                    payload: s.payload,
                    callback: s.callback,
                    next: null
                });
                e: {
                    var v = e,
                        w = s;
                    switch (p = t, g = n, w.tag) {
                        case 1:
                            if (v = w.payload, typeof v == "function") {
                                d = v.call(g, d, p);
                                break e
                            }
                            d = v;
                            break e;
                        case 3:
                            v.flags = v.flags & -65537 | 128;
                        case 0:
                            if (v = w.payload, p = typeof v == "function" ? v.call(g, d, p) : v, p == null) break e;
                            d = b({}, d, p);
                            break e;
                        case 2:
                            Ht = !0
                    }
                }
                s.callback !== null && s.lane !== 0 && (e.flags |= 64, p = o.effects, p === null ? o.effects = [s] : p.push(s))
            } else g = {
                eventTime: g,
                lane: p,
                tag: s.tag,
                payload: s.payload,
                callback: s.callback,
                next: null
            }, f === null ? (a = f = g, u = d) : f = f.next = g, l |= p;
            if (s = s.next, s === null) {
                if (s = o.shared.pending, s === null) break;
                p = s, s = p.next, p.next = null, o.lastBaseUpdate = p, o.shared.pending = null
            }
        } while (1);
        if (f === null && (u = d), o.baseState = u, o.firstBaseUpdate = a, o.lastBaseUpdate = f, t = o.shared.interleaved, t !== null) {
            o = t;
            do l |= o.lane, o = o.next; while (o !== t)
        } else i === null && (o.shared.lanes = 0);
        kn |= l, e.lanes = l, e.memoizedState = d
    }
}

function Pa(e, t, n) {
    if (e = t.effects, t.effects = null, e !== null)
        for (t = 0; t < e.length; t++) {
            var r = e[t],
                o = r.callback;
            if (o !== null) {
                if (r.callback = null, r = n, typeof o != "function") throw Error(S(191, o));
                o.call(r)
            }
        }
}
var bf = new Qc.Component().refs;

function as(e, t, n, r) {
    t = e.memoizedState, n = n(r, t), n = n == null ? t : b({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n)
}
var Hi = {
    isMounted: function(e) {
        return (e = e._reactInternals) ? An(e) === e : !1
    },
    enqueueSetState: function(e, t, n) {
        e = e._reactInternals;
        var r = Se(),
            o = bt(e),
            i = Et(r, o);
        i.payload = t, n != null && (i.callback = n), t = Gt(e, i, o), t !== null && (ot(t, e, o, r), jo(t, e, o))
    },
    enqueueReplaceState: function(e, t, n) {
        e = e._reactInternals;
        var r = Se(),
            o = bt(e),
            i = Et(r, o);
        i.tag = 1, i.payload = t, n != null && (i.callback = n), t = Gt(e, i, o), t !== null && (ot(t, e, o, r), jo(t, e, o))
    },
    enqueueForceUpdate: function(e, t) {
        e = e._reactInternals;
        var n = Se(),
            r = bt(e),
            o = Et(n, r);
        o.tag = 2, t != null && (o.callback = t), t = Gt(e, o, r), t !== null && (ot(t, e, r, n), jo(t, e, r))
    }
};

function La(e, t, n, r, o, i, l) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, i, l) : t.prototype && t.prototype.isPureReactComponent ? !Qr(n, r) || !Qr(o, i) : !0
}

function Xf(e, t, n) {
    var r = !1,
        o = en,
        i = t.contextType;
    return typeof i == "object" && i !== null ? i = Ye(i) : (o = Ie(t) ? wn : me.current, r = t.contextTypes, i = (r = r != null) ? Zn(e, o) : en), t = new t(n, i), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = Hi, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = o, e.__reactInternalMemoizedMaskedChildContext = i), t
}

function Ra(e, t, n, r) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Hi.enqueueReplaceState(t, t.state, null)
}

function cs(e, t, n, r) {
    var o = e.stateNode;
    o.props = n, o.state = e.memoizedState, o.refs = bf, yu(e);
    var i = t.contextType;
    typeof i == "object" && i !== null ? o.context = Ye(i) : (i = Ie(t) ? wn : me.current, o.context = Zn(e, i)), o.state = e.memoizedState, i = t.getDerivedStateFromProps, typeof i == "function" && (as(e, t, i, n), o.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof o.getSnapshotBeforeUpdate == "function" || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (t = o.state, typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount(), t !== o.state && Hi.enqueueReplaceState(o, o.state, null), fi(e, n, o, r), o.state = e.memoizedState), typeof o.componentDidMount == "function" && (e.flags |= 4194308)
}

function wr(e, t, n) {
    if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
        if (n._owner) {
            if (n = n._owner, n) {
                if (n.tag !== 1) throw Error(S(309));
                var r = n.stateNode
            }
            if (!r) throw Error(S(147, e));
            var o = r,
                i = "" + e;
            return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === i ? t.ref : (t = function(l) {
                var s = o.refs;
                s === bf && (s = o.refs = {}), l === null ? delete s[i] : s[i] = l
            }, t._stringRef = i, t)
        }
        if (typeof e != "string") throw Error(S(284));
        if (!n._owner) throw Error(S(290, e))
    }
    return e
}

function Io(e, t) {
    throw e = Object.prototype.toString.call(t), Error(S(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e))
}

function Ua(e) {
    var t = e._init;
    return t(e._payload)
}

function Zf(e) {
    function t(h, c) {
        if (e) {
            var y = h.deletions;
            y === null ? (h.deletions = [c], h.flags |= 16) : y.push(c)
        }
    }

    function n(h, c) {
        if (!e) return null;
        for (; c !== null;) t(h, c), c = c.sibling;
        return null
    }

    function r(h, c) {
        for (h = new Map; c !== null;) c.key !== null ? h.set(c.key, c) : h.set(c.index, c), c = c.sibling;
        return h
    }

    function o(h, c) {
        return h = Xt(h, c), h.index = 0, h.sibling = null, h
    }

    function i(h, c, y) {
        return h.index = y, e ? (y = h.alternate, y !== null ? (y = y.index, y < c ? (h.flags |= 2, c) : y) : (h.flags |= 2, c)) : (h.flags |= 1048576, c)
    }

    function l(h) {
        return e && h.alternate === null && (h.flags |= 2), h
    }

    function s(h, c, y, m) {
        return c === null || c.tag !== 6 ? (c = Al(y, h.mode, m), c.return = h, c) : (c = o(c, y), c.return = h, c)
    }

    function u(h, c, y, m) {
        var E = y.type;
        return E === Rn ? f(h, c, y.props.children, m, y.key) : c !== null && (c.elementType === E || typeof E == "object" && E !== null && E.$$typeof === Ut && Ua(E) === c.type) ? (m = o(c, y.props), m.ref = wr(h, c, y), m.return = h, m) : (m = Yo(y.type, y.key, y.props, null, h.mode, m), m.ref = wr(h, c, y), m.return = h, m)
    }

    function a(h, c, y, m) {
        return c === null || c.tag !== 4 || c.stateNode.containerInfo !== y.containerInfo || c.stateNode.implementation !== y.implementation ? (c = Tl(y, h.mode, m), c.return = h, c) : (c = o(c, y.children || []), c.return = h, c)
    }

    function f(h, c, y, m, E) {
        return c === null || c.tag !== 7 ? (c = mn(y, h.mode, m, E), c.return = h, c) : (c = o(c, y), c.return = h, c)
    }

    function d(h, c, y) {
        if (typeof c == "string" && c !== "" || typeof c == "number") return c = Al("" + c, h.mode, y), c.return = h, c;
        if (typeof c == "object" && c !== null) {
            switch (c.$$typeof) {
                case mo:
                    return y = Yo(c.type, c.key, c.props, null, h.mode, y), y.ref = wr(h, null, c), y.return = h, y;
                case Ln:
                    return c = Tl(c, h.mode, y), c.return = h, c;
                case Ut:
                    var m = c._init;
                    return d(h, m(c._payload), y)
            }
            if (Ar(c) || hr(c)) return c = mn(c, h.mode, y, null), c.return = h, c;
            Io(h, c)
        }
        return null
    }

    function p(h, c, y, m) {
        var E = c !== null ? c.key : null;
        if (typeof y == "string" && y !== "" || typeof y == "number") return E !== null ? null : s(h, c, "" + y, m);
        if (typeof y == "object" && y !== null) {
            switch (y.$$typeof) {
                case mo:
                    return y.key === E ? u(h, c, y, m) : null;
                case Ln:
                    return y.key === E ? a(h, c, y, m) : null;
                case Ut:
                    return E = y._init, p(h, c, E(y._payload), m)
            }
            if (Ar(y) || hr(y)) return E !== null ? null : f(h, c, y, m, null);
            Io(h, y)
        }
        return null
    }

    function g(h, c, y, m, E) {
        if (typeof m == "string" && m !== "" || typeof m == "number") return h = h.get(y) || null, s(c, h, "" + m, E);
        if (typeof m == "object" && m !== null) {
            switch (m.$$typeof) {
                case mo:
                    return h = h.get(m.key === null ? y : m.key) || null, u(c, h, m, E);
                case Ln:
                    return h = h.get(m.key === null ? y : m.key) || null, a(c, h, m, E);
                case Ut:
                    var A = m._init;
                    return g(h, c, y, A(m._payload), E)
            }
            if (Ar(m) || hr(m)) return h = h.get(y) || null, f(c, h, m, E, null);
            Io(c, m)
        }
        return null
    }

    function v(h, c, y, m) {
        for (var E = null, A = null, T = c, I = c = 0, Z = null; T !== null && I < y.length; I++) {
            T.index > I ? (Z = T, T = null) : Z = T.sibling;
            var U = p(h, T, y[I], m);
            if (U === null) {
                T === null && (T = Z);
                break
            }
            e && T && U.alternate === null && t(h, T), c = i(U, c, I), A === null ? E = U : A.sibling = U, A = U, T = Z
        }
        if (I === y.length) return n(h, T), W && an(h, I), E;
        if (T === null) {
            for (; I < y.length; I++) T = d(h, y[I], m), T !== null && (c = i(T, c, I), A === null ? E = T : A.sibling = T, A = T);
            return W && an(h, I), E
        }
        for (T = r(h, T); I < y.length; I++) Z = g(T, h, I, y[I], m), Z !== null && (e && Z.alternate !== null && T.delete(Z.key === null ? I : Z.key), c = i(Z, c, I), A === null ? E = Z : A.sibling = Z, A = Z);
        return e && T.forEach(function(Ze) {
            return t(h, Ze)
        }), W && an(h, I), E
    }

    function w(h, c, y, m) {
        var E = hr(y);
        if (typeof E != "function") throw Error(S(150));
        if (y = E.call(y), y == null) throw Error(S(151));
        for (var A = E = null, T = c, I = c = 0, Z = null, U = y.next(); T !== null && !U.done; I++, U = y.next()) {
            T.index > I ? (Z = T, T = null) : Z = T.sibling;
            var Ze = p(h, T, U.value, m);
            if (Ze === null) {
                T === null && (T = Z);
                break
            }
            e && T && Ze.alternate === null && t(h, T), c = i(Ze, c, I), A === null ? E = Ze : A.sibling = Ze, A = Ze, T = Z
        }
        if (U.done) return n(h, T), W && an(h, I), E;
        if (T === null) {
            for (; !U.done; I++, U = y.next()) U = d(h, U.value, m), U !== null && (c = i(U, c, I), A === null ? E = U : A.sibling = U, A = U);
            return W && an(h, I), E
        }
        for (T = r(h, T); !U.done; I++, U = y.next()) U = g(T, h, I, U.value, m), U !== null && (e && U.alternate !== null && T.delete(U.key === null ? I : U.key), c = i(U, c, I), A === null ? E = U : A.sibling = U, A = U);
        return e && T.forEach(function(dr) {
            return t(h, dr)
        }), W && an(h, I), E
    }

    function H(h, c, y, m) {
        if (typeof y == "object" && y !== null && y.type === Rn && y.key === null && (y = y.props.children), typeof y == "object" && y !== null) {
            switch (y.$$typeof) {
                case mo:
                    e: {
                        for (var E = y.key, A = c; A !== null;) {
                            if (A.key === E) {
                                if (E = y.type, E === Rn) {
                                    if (A.tag === 7) {
                                        n(h, A.sibling), c = o(A, y.props.children), c.return = h, h = c;
                                        break e
                                    }
                                } else if (A.elementType === E || typeof E == "object" && E !== null && E.$$typeof === Ut && Ua(E) === A.type) {
                                    n(h, A.sibling), c = o(A, y.props), c.ref = wr(h, A, y), c.return = h, h = c;
                                    break e
                                }
                                n(h, A);
                                break
                            } else t(h, A);
                            A = A.sibling
                        }
                        y.type === Rn ? (c = mn(y.props.children, h.mode, m, y.key), c.return = h, h = c) : (m = Yo(y.type, y.key, y.props, null, h.mode, m), m.ref = wr(h, c, y), m.return = h, h = m)
                    }
                    return l(h);
                case Ln:
                    e: {
                        for (A = y.key; c !== null;) {
                            if (c.key === A)
                                if (c.tag === 4 && c.stateNode.containerInfo === y.containerInfo && c.stateNode.implementation === y.implementation) {
                                    n(h, c.sibling), c = o(c, y.children || []), c.return = h, h = c;
                                    break e
                                } else {
                                    n(h, c);
                                    break
                                }
                            else t(h, c);
                            c = c.sibling
                        }
                        c = Tl(y, h.mode, m),
                        c.return = h,
                        h = c
                    }
                    return l(h);
                case Ut:
                    return A = y._init, H(h, c, A(y._payload), m)
            }
            if (Ar(y)) return v(h, c, y, m);
            if (hr(y)) return w(h, c, y, m);
            Io(h, y)
        }
        return typeof y == "string" && y !== "" || typeof y == "number" ? (y = "" + y, c !== null && c.tag === 6 ? (n(h, c.sibling), c = o(c, y), c.return = h, h = c) : (n(h, c), c = Al(y, h.mode, m), c.return = h, h = c), l(h)) : n(h, c)
    }
    return H
}
var Jn = Zf(!0),
    qf = Zf(!1),
    ao = {},
    dt = nn(ao),
    Xr = nn(ao),
    Zr = nn(ao);

function pn(e) {
    if (e === ao) throw Error(S(174));
    return e
}

function gu(e, t) {
    switch (j(Zr, t), j(Xr, e), j(dt, ao), e = t.nodeType, e) {
        case 9:
        case 11:
            t = (t = t.documentElement) ? t.namespaceURI : jl(null, "");
            break;
        default:
            e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = jl(t, e)
    }
    O(dt), j(dt, t)
}

function er() {
    O(dt), O(Xr), O(Zr)
}

function Jf(e) {
    pn(Zr.current);
    var t = pn(dt.current),
        n = jl(t, e.type);
    t !== n && (j(Xr, e), j(dt, n))
}

function mu(e) {
    Xr.current === e && (O(dt), O(Xr))
}
var G = nn(0);

function di(e) {
    for (var t = e; t !== null;) {
        if (t.tag === 13) {
            var n = t.memoizedState;
            if (n !== null && (n = n.dehydrated, n === null || n.data === "$?" || n.data === "$!")) return t
        } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
            if ((t.flags & 128) !== 0) return t
        } else if (t.child !== null) {
            t.child.return = t, t = t.child;
            continue
        }
        if (t === e) break;
        for (; t.sibling === null;) {
            if (t.return === null || t.return === e) return null;
            t = t.return
        }
        t.sibling.return = t.return, t = t.sibling
    }
    return null
}
var Sl = [];

function vu() {
    for (var e = 0; e < Sl.length; e++) Sl[e]._workInProgressVersionPrimary = null;
    Sl.length = 0
}
var Vo = Tt.ReactCurrentDispatcher,
    El = Tt.ReactCurrentBatchConfig,
    En = 0,
    Y = null,
    te = null,
    ie = null,
    pi = !1,
    Hr = !1,
    qr = 0,
    Ih = 0;

function de() {
    throw Error(S(321))
}

function wu(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
        if (!it(e[n], t[n])) return !1;
    return !0
}

function Su(e, t, n, r, o, i) {
    if (En = i, Y = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Vo.current = e === null || e.memoizedState === null ? Rh : Uh, e = n(r, o), Hr) {
        i = 0;
        do {
            if (Hr = !1, qr = 0, 25 <= i) throw Error(S(301));
            i += 1, ie = te = null, t.updateQueue = null, Vo.current = Hh, e = n(r, o)
        } while (Hr)
    }
    if (Vo.current = hi, t = te !== null && te.next !== null, En = 0, ie = te = Y = null, pi = !1, t) throw Error(S(300));
    return e
}

function Eu() {
    var e = qr !== 0;
    return qr = 0, e
}

function at() {
    var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
    };
    return ie === null ? Y.memoizedState = ie = e : ie = ie.next = e, ie
}

function be() {
    if (te === null) {
        var e = Y.alternate;
        e = e !== null ? e.memoizedState : null
    } else e = te.next;
    var t = ie === null ? Y.memoizedState : ie.next;
    if (t !== null) ie = t, te = e;
    else {
        if (e === null) throw Error(S(310));
        te = e, e = {
            memoizedState: te.memoizedState,
            baseState: te.baseState,
            baseQueue: te.baseQueue,
            queue: te.queue,
            next: null
        }, ie === null ? Y.memoizedState = ie = e : ie = ie.next = e
    }
    return ie
}

function Jr(e, t) {
    return typeof t == "function" ? t(e) : t
}

function kl(e) {
    var t = be(),
        n = t.queue;
    if (n === null) throw Error(S(311));
    n.lastRenderedReducer = e;
    var r = te,
        o = r.baseQueue,
        i = n.pending;
    if (i !== null) {
        if (o !== null) {
            var l = o.next;
            o.next = i.next, i.next = l
        }
        r.baseQueue = o = i, n.pending = null
    }
    if (o !== null) {
        i = o.next, r = r.baseState;
        var s = l = null,
            u = null,
            a = i;
        do {
            var f = a.lane;
            if ((En & f) === f) u !== null && (u = u.next = {
                lane: 0,
                action: a.action,
                hasEagerState: a.hasEagerState,
                eagerState: a.eagerState,
                next: null
            }), r = a.hasEagerState ? a.eagerState : e(r, a.action);
            else {
                var d = {
                    lane: f,
                    action: a.action,
                    hasEagerState: a.hasEagerState,
                    eagerState: a.eagerState,
                    next: null
                };
                u === null ? (s = u = d, l = r) : u = u.next = d, Y.lanes |= f, kn |= f
            }
            a = a.next
        } while (a !== null && a !== i);
        u === null ? l = r : u.next = s, it(r, t.memoizedState) || (Ae = !0), t.memoizedState = r, t.baseState = l, t.baseQueue = u, n.lastRenderedState = r
    }
    if (e = n.interleaved, e !== null) {
        o = e;
        do i = o.lane, Y.lanes |= i, kn |= i, o = o.next; while (o !== e)
    } else o === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch]
}

function xl(e) {
    var t = be(),
        n = t.queue;
    if (n === null) throw Error(S(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch,
        o = n.pending,
        i = t.memoizedState;
    if (o !== null) {
        n.pending = null;
        var l = o = o.next;
        do i = e(i, l.action), l = l.next; while (l !== o);
        it(i, t.memoizedState) || (Ae = !0), t.memoizedState = i, t.baseQueue === null && (t.baseState = i), n.lastRenderedState = i
    }
    return [i, r]
}

function ed() {}

function td(e, t) {
    var n = Y,
        r = be(),
        o = t(),
        i = !it(r.memoizedState, o);
    if (i && (r.memoizedState = o, Ae = !0), r = r.queue, ku(od.bind(null, n, r, e), [e]), r.getSnapshot !== t || i || ie !== null && ie.memoizedState.tag & 1) {
        if (n.flags |= 2048, eo(9, rd.bind(null, n, r, o, t), void 0, null), le === null) throw Error(S(349));
        (En & 30) !== 0 || nd(n, t, o)
    }
    return o
}

function nd(e, t, n) {
    e.flags |= 16384, e = {
        getSnapshot: t,
        value: n
    }, t = Y.updateQueue, t === null ? (t = {
        lastEffect: null,
        stores: null
    }, Y.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e))
}

function rd(e, t, n, r) {
    t.value = n, t.getSnapshot = r, id(t) && ld(e)
}

function od(e, t, n) {
    return n(function() {
        id(t) && ld(e)
    })
}

function id(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
        var n = t();
        return !it(e, n)
    } catch {
        return !0
    }
}

function ld(e) {
    var t = _t(e, 1);
    t !== null && ot(t, e, 1, -1)
}

function Ha(e) {
    var t = at();
    return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Jr,
        lastRenderedState: e
    }, t.queue = e, e = e.dispatch = Lh.bind(null, Y, e), [t.memoizedState, e]
}

function eo(e, t, n, r) {
    return e = {
        tag: e,
        create: t,
        destroy: n,
        deps: r,
        next: null
    }, t = Y.updateQueue, t === null ? (t = {
        lastEffect: null,
        stores: null
    }, Y.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e
}

function sd() {
    return be().memoizedState
}

function Oo(e, t, n, r) {
    var o = at();
    Y.flags |= e, o.memoizedState = eo(1 | t, n, void 0, r === void 0 ? null : r)
}

function Bi(e, t, n, r) {
    var o = be();
    r = r === void 0 ? null : r;
    var i = void 0;
    if (te !== null) {
        var l = te.memoizedState;
        if (i = l.destroy, r !== null && wu(r, l.deps)) {
            o.memoizedState = eo(t, n, i, r);
            return
        }
    }
    Y.flags |= e, o.memoizedState = eo(1 | t, n, i, r)
}

function Ba(e, t) {
    return Oo(8390656, 8, e, t)
}

function ku(e, t) {
    return Bi(2048, 8, e, t)
}

function ud(e, t) {
    return Bi(4, 2, e, t)
}

function ad(e, t) {
    return Bi(4, 4, e, t)
}

function cd(e, t) {
    if (typeof t == "function") return e = e(), t(e),
        function() {
            t(null)
        };
    if (t != null) return e = e(), t.current = e,
        function() {
            t.current = null
        }
}

function fd(e, t, n) {
    return n = n != null ? n.concat([e]) : null, Bi(4, 4, cd.bind(null, t, e), n)
}

function xu() {}

function dd(e, t) {
    var n = be();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && wu(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e)
}

function pd(e, t) {
    var n = be();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && wu(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e)
}

function hd(e, t, n) {
    return (En & 21) === 0 ? (e.baseState && (e.baseState = !1, Ae = !0), e.memoizedState = n) : (it(n, t) || (n = mf(), Y.lanes |= n, kn |= n, e.baseState = !0), t)
}

function Nh(e, t) {
    var n = M;
    M = n !== 0 && 4 > n ? n : 4, e(!0);
    var r = El.transition;
    El.transition = {};
    try {
        e(!1), t()
    } finally {
        M = n, El.transition = r
    }
}

function yd() {
    return be().memoizedState
}

function Ph(e, t, n) {
    var r = bt(e);
    if (n = {
            lane: r,
            action: n,
            hasEagerState: !1,
            eagerState: null,
            next: null
        }, gd(e)) md(t, n);
    else if (n = Gf(e, t, n, r), n !== null) {
        var o = Se();
        ot(n, e, r, o), vd(n, t, r)
    }
}

function Lh(e, t, n) {
    var r = bt(e),
        o = {
            lane: r,
            action: n,
            hasEagerState: !1,
            eagerState: null,
            next: null
        };
    if (gd(e)) md(t, o);
    else {
        var i = e.alternate;
        if (e.lanes === 0 && (i === null || i.lanes === 0) && (i = t.lastRenderedReducer, i !== null)) try {
            var l = t.lastRenderedState,
                s = i(l, n);
            if (o.hasEagerState = !0, o.eagerState = s, it(s, l)) {
                var u = t.interleaved;
                u === null ? (o.next = o, hu(t)) : (o.next = u.next, u.next = o), t.interleaved = o;
                return
            }
        } catch {} finally {}
        n = Gf(e, t, o, r), n !== null && (o = Se(), ot(n, e, r, o), vd(n, t, r))
    }
}

function gd(e) {
    var t = e.alternate;
    return e === Y || t !== null && t === Y
}

function md(e, t) {
    Hr = pi = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t
}

function vd(e, t, n) {
    if ((n & 4194240) !== 0) {
        var r = t.lanes;
        r &= e.pendingLanes, n |= r, t.lanes = n, eu(e, n)
    }
}
var hi = {
        readContext: Ye,
        useCallback: de,
        useContext: de,
        useEffect: de,
        useImperativeHandle: de,
        useInsertionEffect: de,
        useLayoutEffect: de,
        useMemo: de,
        useReducer: de,
        useRef: de,
        useState: de,
        useDebugValue: de,
        useDeferredValue: de,
        useTransition: de,
        useMutableSource: de,
        useSyncExternalStore: de,
        useId: de,
        unstable_isNewReconciler: !1
    },
    Rh = {
        readContext: Ye,
        useCallback: function(e, t) {
            return at().memoizedState = [e, t === void 0 ? null : t], e
        },
        useContext: Ye,
        useEffect: Ba,
        useImperativeHandle: function(e, t, n) {
            return n = n != null ? n.concat([e]) : null, Oo(4194308, 4, cd.bind(null, t, e), n)
        },
        useLayoutEffect: function(e, t) {
            return Oo(4194308, 4, e, t)
        },
        useInsertionEffect: function(e, t) {
            return Oo(4, 2, e, t)
        },
        useMemo: function(e, t) {
            var n = at();
            return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e
        },
        useReducer: function(e, t, n) {
            var r = at();
            return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = {
                pending: null,
                interleaved: null,
                lanes: 0,
                dispatch: null,
                lastRenderedReducer: e,
                lastRenderedState: t
            }, r.queue = e, e = e.dispatch = Ph.bind(null, Y, e), [r.memoizedState, e]
        },
        useRef: function(e) {
            var t = at();
            return e = {
                current: e
            }, t.memoizedState = e
        },
        useState: Ha,
        useDebugValue: xu,
        useDeferredValue: function(e) {
            return at().memoizedState = e
        },
        useTransition: function() {
            var e = Ha(!1),
                t = e[0];
            return e = Nh.bind(null, e[1]), at().memoizedState = e, [t, e]
        },
        useMutableSource: function() {},
        useSyncExternalStore: function(e, t, n) {
            var r = Y,
                o = at();
            if (W) {
                if (n === void 0) throw Error(S(407));
                n = n()
            } else {
                if (n = t(), le === null) throw Error(S(349));
                (En & 30) !== 0 || nd(r, t, n)
            }
            o.memoizedState = n;
            var i = {
                value: n,
                getSnapshot: t
            };
            return o.queue = i, Ba(od.bind(null, r, i, e), [e]), r.flags |= 2048, eo(9, rd.bind(null, r, i, n, t), void 0, null), n
        },
        useId: function() {
            var e = at(),
                t = le.identifierPrefix;
            if (W) {
                var n = St,
                    r = wt;
                n = (r & ~(1 << 32 - rt(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = qr++, 0 < n && (t += "H" + n.toString(32)), t += ":"
            } else n = Ih++, t = ":" + t + "r" + n.toString(32) + ":";
            return e.memoizedState = t
        },
        unstable_isNewReconciler: !1
    },
    Uh = {
        readContext: Ye,
        useCallback: dd,
        useContext: Ye,
        useEffect: ku,
        useImperativeHandle: fd,
        useInsertionEffect: ud,
        useLayoutEffect: ad,
        useMemo: pd,
        useReducer: kl,
        useRef: sd,
        useState: function() {
            return kl(Jr)
        },
        useDebugValue: xu,
        useDeferredValue: function(e) {
            var t = be();
            return hd(t, te.memoizedState, e)
        },
        useTransition: function() {
            var e = kl(Jr)[0],
                t = be().memoizedState;
            return [e, t]
        },
        useMutableSource: ed,
        useSyncExternalStore: td,
        useId: yd,
        unstable_isNewReconciler: !1
    },
    Hh = {
        readContext: Ye,
        useCallback: dd,
        useContext: Ye,
        useEffect: ku,
        useImperativeHandle: fd,
        useInsertionEffect: ud,
        useLayoutEffect: ad,
        useMemo: pd,
        useReducer: xl,
        useRef: sd,
        useState: function() {
            return xl(Jr)
        },
        useDebugValue: xu,
        useDeferredValue: function(e) {
            var t = be();
            return te === null ? t.memoizedState = e : hd(t, te.memoizedState, e)
        },
        useTransition: function() {
            var e = xl(Jr)[0],
                t = be().memoizedState;
            return [e, t]
        },
        useMutableSource: ed,
        useSyncExternalStore: td,
        useId: yd,
        unstable_isNewReconciler: !1
    };

function tr(e, t) {
    try {
        var n = "",
            r = t;
        do n += u0(r), r = r.return; while (r);
        var o = n
    } catch (i) {
        o = `
Error generating stack: ` + i.message + `
` + i.stack
    }
    return {
        value: e,
        source: t,
        stack: o,
        digest: null
    }
}

function Cl(e, t, n) {
    return {
        value: e,
        source: null,
        stack: n ?? null,
        digest: t ?? null
    }
}

function fs(e, t) {
    try {
        console.error(t.value)
    } catch (n) {
        setTimeout(function() {
            throw n
        })
    }
}
var Bh = typeof WeakMap == "function" ? WeakMap : Map;

function wd(e, t, n) {
    n = Et(-1, n), n.tag = 3, n.payload = {
        element: null
    };
    var r = t.value;
    return n.callback = function() {
        gi || (gi = !0, Es = r), fs(e, t)
    }, n
}

function Sd(e, t, n) {
    n = Et(-1, n), n.tag = 3;
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
        var o = t.value;
        n.payload = function() {
            return r(o)
        }, n.callback = function() {
            fs(e, t)
        }
    }
    var i = e.stateNode;
    return i !== null && typeof i.componentDidCatch == "function" && (n.callback = function() {
        fs(e, t), typeof r != "function" && (Yt === null ? Yt = new Set([this]) : Yt.add(this));
        var l = t.stack;
        this.componentDidCatch(t.value, {
            componentStack: l !== null ? l : ""
        })
    }), n
}

function za(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
        r = e.pingCache = new Bh;
        var o = new Set;
        r.set(t, o)
    } else o = r.get(t), o === void 0 && (o = new Set, r.set(t, o));
    o.has(n) || (o.add(n), e = bh.bind(null, e, t, n), t.then(e, e))
}

function Da(e) {
    do {
        var t;
        if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
        e = e.return
    } while (e !== null);
    return null
}

function $a(e, t, n, r, o) {
    return (e.mode & 1) === 0 ? (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Et(-1, 1), t.tag = 2, Gt(n, t, 1))), n.lanes |= 1), e) : (e.flags |= 65536, e.lanes = o, e)
}
var zh = Tt.ReactCurrentOwner,
    Ae = !1;

function ve(e, t, n, r) {
    t.child = e === null ? qf(t, null, n, r) : Jn(t, e.child, n, r)
}

function Ma(e, t, n, r, o) {
    n = n.render;
    var i = t.ref;
    return Gn(t, o), r = Su(e, t, n, r, i, o), n = Eu(), e !== null && !Ae ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~o, At(e, t, o)) : (W && n && uu(t), t.flags |= 1, ve(e, t, r, o), t.child)
}

function Fa(e, t, n, r, o) {
    if (e === null) {
        var i = n.type;
        return typeof i == "function" && !Lu(i) && i.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = i, Ed(e, t, i, r, o)) : (e = Yo(n.type, null, r, t, t.mode, o), e.ref = t.ref, e.return = t, t.child = e)
    }
    if (i = e.child, (e.lanes & o) === 0) {
        var l = i.memoizedProps;
        if (n = n.compare, n = n !== null ? n : Qr, n(l, r) && e.ref === t.ref) return At(e, t, o)
    }
    return t.flags |= 1, e = Xt(i, r), e.ref = t.ref, e.return = t, t.child = e
}

function Ed(e, t, n, r, o) {
    if (e !== null) {
        var i = e.memoizedProps;
        if (Qr(i, r) && e.ref === t.ref)
            if (Ae = !1, t.pendingProps = r = i, (e.lanes & o) !== 0)(e.flags & 131072) !== 0 && (Ae = !0);
            else return t.lanes = e.lanes, At(e, t, o)
    }
    return ds(e, t, n, r, o)
}

function kd(e, t, n) {
    var r = t.pendingProps,
        o = r.children,
        i = e !== null ? e.memoizedState : null;
    if (r.mode === "hidden")
        if ((t.mode & 1) === 0) t.memoizedState = {
            baseLanes: 0,
            cachePool: null,
            transitions: null
        }, j(jn, He), He |= n;
        else {
            if ((n & 1073741824) === 0) return e = i !== null ? i.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = {
                baseLanes: e,
                cachePool: null,
                transitions: null
            }, t.updateQueue = null, j(jn, He), He |= e, null;
            t.memoizedState = {
                baseLanes: 0,
                cachePool: null,
                transitions: null
            }, r = i !== null ? i.baseLanes : n, j(jn, He), He |= r
        }
    else i !== null ? (r = i.baseLanes | n, t.memoizedState = null) : r = n, j(jn, He), He |= r;
    return ve(e, t, o, n), t.child
}

function xd(e, t) {
    var n = t.ref;
    (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152)
}

function ds(e, t, n, r, o) {
    var i = Ie(n) ? wn : me.current;
    return i = Zn(t, i), Gn(t, o), n = Su(e, t, n, r, i, o), r = Eu(), e !== null && !Ae ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~o, At(e, t, o)) : (W && r && uu(t), t.flags |= 1, ve(e, t, n, o), t.child)
}

function Ka(e, t, n, r, o) {
    if (Ie(n)) {
        var i = !0;
        li(t)
    } else i = !1;
    if (Gn(t, o), t.stateNode === null) Wo(e, t), Xf(t, n, r), cs(t, n, r, o), r = !0;
    else if (e === null) {
        var l = t.stateNode,
            s = t.memoizedProps;
        l.props = s;
        var u = l.context,
            a = n.contextType;
        typeof a == "object" && a !== null ? a = Ye(a) : (a = Ie(n) ? wn : me.current, a = Zn(t, a));
        var f = n.getDerivedStateFromProps,
            d = typeof f == "function" || typeof l.getSnapshotBeforeUpdate == "function";
        d || typeof l.UNSAFE_componentWillReceiveProps != "function" && typeof l.componentWillReceiveProps != "function" || (s !== r || u !== a) && Ra(t, l, r, a), Ht = !1;
        var p = t.memoizedState;
        l.state = p, fi(t, r, l, o), u = t.memoizedState, s !== r || p !== u || Te.current || Ht ? (typeof f == "function" && (as(t, n, f, r), u = t.memoizedState), (s = Ht || La(t, n, s, r, p, u, a)) ? (d || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount()), typeof l.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof l.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = u), l.props = r, l.state = u, l.context = a, r = s) : (typeof l.componentDidMount == "function" && (t.flags |= 4194308), r = !1)
    } else {
        l = t.stateNode, Yf(e, t), s = t.memoizedProps, a = t.type === t.elementType ? s : Je(t.type, s), l.props = a, d = t.pendingProps, p = l.context, u = n.contextType, typeof u == "object" && u !== null ? u = Ye(u) : (u = Ie(n) ? wn : me.current, u = Zn(t, u));
        var g = n.getDerivedStateFromProps;
        (f = typeof g == "function" || typeof l.getSnapshotBeforeUpdate == "function") || typeof l.UNSAFE_componentWillReceiveProps != "function" && typeof l.componentWillReceiveProps != "function" || (s !== d || p !== u) && Ra(t, l, r, u), Ht = !1, p = t.memoizedState, l.state = p, fi(t, r, l, o);
        var v = t.memoizedState;
        s !== d || p !== v || Te.current || Ht ? (typeof g == "function" && (as(t, n, g, r), v = t.memoizedState), (a = Ht || La(t, n, a, r, p, v, u) || !1) ? (f || typeof l.UNSAFE_componentWillUpdate != "function" && typeof l.componentWillUpdate != "function" || (typeof l.componentWillUpdate == "function" && l.componentWillUpdate(r, v, u), typeof l.UNSAFE_componentWillUpdate == "function" && l.UNSAFE_componentWillUpdate(r, v, u)), typeof l.componentDidUpdate == "function" && (t.flags |= 4), typeof l.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof l.componentDidUpdate != "function" || s === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof l.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = v), l.props = r, l.state = v, l.context = u, r = a) : (typeof l.componentDidUpdate != "function" || s === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof l.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), r = !1)
    }
    return ps(e, t, n, r, i, o)
}

function ps(e, t, n, r, o, i) {
    xd(e, t);
    var l = (t.flags & 128) !== 0;
    if (!r && !l) return o && Aa(t, n, !1), At(e, t, i);
    r = t.stateNode, zh.current = t;
    var s = l && typeof n.getDerivedStateFromError != "function" ? null : r.render();
    return t.flags |= 1, e !== null && l ? (t.child = Jn(t, e.child, null, i), t.child = Jn(t, null, s, i)) : ve(e, t, s, i), t.memoizedState = r.state, o && Aa(t, n, !0), t.child
}

function Cd(e) {
    var t = e.stateNode;
    t.pendingContext ? _a(e, t.pendingContext, t.pendingContext !== t.context) : t.context && _a(e, t.context, !1), gu(e, t.containerInfo)
}

function ja(e, t, n, r, o) {
    return qn(), cu(o), t.flags |= 256, ve(e, t, n, r), t.child
}
var hs = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0
};

function ys(e) {
    return {
        baseLanes: e,
        cachePool: null,
        transitions: null
    }
}

function _d(e, t, n) {
    var r = t.pendingProps,
        o = G.current,
        i = !1,
        l = (t.flags & 128) !== 0,
        s;
    if ((s = l) || (s = e !== null && e.memoizedState === null ? !1 : (o & 2) !== 0), s ? (i = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (o |= 1), j(G, o & 1), e === null) return ss(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? ((t.mode & 1) === 0 ? t.lanes = 1 : e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824, null) : (l = r.children, e = r.fallback, i ? (r = t.mode, i = t.child, l = {
        mode: "hidden",
        children: l
    }, (r & 1) === 0 && i !== null ? (i.childLanes = 0, i.pendingProps = l) : i = $i(l, r, 0, null), e = mn(e, r, n, null), i.return = t, e.return = t, i.sibling = e, t.child = i, t.child.memoizedState = ys(n), t.memoizedState = hs, e) : Cu(t, l));
    if (o = e.memoizedState, o !== null && (s = o.dehydrated, s !== null)) return Dh(e, t, l, r, s, o, n);
    if (i) {
        i = r.fallback, l = t.mode, o = e.child, s = o.sibling;
        var u = {
            mode: "hidden",
            children: r.children
        };
        return (l & 1) === 0 && t.child !== o ? (r = t.child, r.childLanes = 0, r.pendingProps = u, t.deletions = null) : (r = Xt(o, u), r.subtreeFlags = o.subtreeFlags & 14680064), s !== null ? i = Xt(s, i) : (i = mn(i, l, n, null), i.flags |= 2), i.return = t, r.return = t, r.sibling = i, t.child = r, r = i, i = t.child, l = e.child.memoizedState, l = l === null ? ys(n) : {
            baseLanes: l.baseLanes | n,
            cachePool: null,
            transitions: l.transitions
        }, i.memoizedState = l, i.childLanes = e.childLanes & ~n, t.memoizedState = hs, r
    }
    return i = e.child, e = i.sibling, r = Xt(i, {
        mode: "visible",
        children: r.children
    }), (t.mode & 1) === 0 && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r
}

function Cu(e, t) {
    return t = $i({
        mode: "visible",
        children: t
    }, e.mode, 0, null), t.return = e, e.child = t
}

function No(e, t, n, r) {
    return r !== null && cu(r), Jn(t, e.child, null, n), e = Cu(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e
}

function Dh(e, t, n, r, o, i, l) {
    if (n) return t.flags & 256 ? (t.flags &= -257, r = Cl(Error(S(422))), No(e, t, l, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (i = r.fallback, o = t.mode, r = $i({
        mode: "visible",
        children: r.children
    }, o, 0, null), i = mn(i, o, l, null), i.flags |= 2, r.return = t, i.return = t, r.sibling = i, t.child = r, (t.mode & 1) !== 0 && Jn(t, e.child, null, l), t.child.memoizedState = ys(l), t.memoizedState = hs, i);
    if ((t.mode & 1) === 0) return No(e, t, l, null);
    if (o.data === "$!") {
        if (r = o.nextSibling && o.nextSibling.dataset, r) var s = r.dgst;
        return r = s, i = Error(S(419)), r = Cl(i, r, void 0), No(e, t, l, r)
    }
    if (s = (l & e.childLanes) !== 0, Ae || s) {
        if (r = le, r !== null) {
            switch (l & -l) {
                case 4:
                    o = 2;
                    break;
                case 16:
                    o = 8;
                    break;
                case 64:
                case 128:
                case 256:
                case 512:
                case 1024:
                case 2048:
                case 4096:
                case 8192:
                case 16384:
                case 32768:
                case 65536:
                case 131072:
                case 262144:
                case 524288:
                case 1048576:
                case 2097152:
                case 4194304:
                case 8388608:
                case 16777216:
                case 33554432:
                case 67108864:
                    o = 32;
                    break;
                case 536870912:
                    o = 268435456;
                    break;
                default:
                    o = 0
            }
            o = (o & (r.suspendedLanes | l)) !== 0 ? 0 : o, o !== 0 && o !== i.retryLane && (i.retryLane = o, _t(e, o), ot(r, e, o, -1))
        }
        return Pu(), r = Cl(Error(S(421))), No(e, t, l, r)
    }
    return o.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Xh.bind(null, e), o._reactRetry = t, null) : (e = i.treeContext, Be = Qt(o.nextSibling), ze = t, W = !0, tt = null, e !== null && (je[Ve++] = wt, je[Ve++] = St, je[Ve++] = Sn, wt = e.id, St = e.overflow, Sn = t), t = Cu(t, r.children), t.flags |= 4096, t)
}

function Va(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    r !== null && (r.lanes |= t), us(e.return, t, n)
}

function _l(e, t, n, r, o) {
    var i = e.memoizedState;
    i === null ? e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: o
    } : (i.isBackwards = t, i.rendering = null, i.renderingStartTime = 0, i.last = r, i.tail = n, i.tailMode = o)
}

function Ad(e, t, n) {
    var r = t.pendingProps,
        o = r.revealOrder,
        i = r.tail;
    if (ve(e, t, r.children, n), r = G.current, (r & 2) !== 0) r = r & 1 | 2, t.flags |= 128;
    else {
        if (e !== null && (e.flags & 128) !== 0) e: for (e = t.child; e !== null;) {
            if (e.tag === 13) e.memoizedState !== null && Va(e, n, t);
            else if (e.tag === 19) Va(e, n, t);
            else if (e.child !== null) {
                e.child.return = e, e = e.child;
                continue
            }
            if (e === t) break e;
            for (; e.sibling === null;) {
                if (e.return === null || e.return === t) break e;
                e = e.return
            }
            e.sibling.return = e.return, e = e.sibling
        }
        r &= 1
    }
    if (j(G, r), (t.mode & 1) === 0) t.memoizedState = null;
    else switch (o) {
        case "forwards":
            for (n = t.child, o = null; n !== null;) e = n.alternate, e !== null && di(e) === null && (o = n), n = n.sibling;
            n = o, n === null ? (o = t.child, t.child = null) : (o = n.sibling, n.sibling = null), _l(t, !1, o, n, i);
            break;
        case "backwards":
            for (n = null, o = t.child, t.child = null; o !== null;) {
                if (e = o.alternate, e !== null && di(e) === null) {
                    t.child = o;
                    break
                }
                e = o.sibling, o.sibling = n, n = o, o = e
            }
            _l(t, !0, n, null, i);
            break;
        case "together":
            _l(t, !1, null, null, void 0);
            break;
        default:
            t.memoizedState = null
    }
    return t.child
}

function Wo(e, t) {
    (t.mode & 1) === 0 && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2)
}

function At(e, t, n) {
    if (e !== null && (t.dependencies = e.dependencies), kn |= t.lanes, (n & t.childLanes) === 0) return null;
    if (e !== null && t.child !== e.child) throw Error(S(153));
    if (t.child !== null) {
        for (e = t.child, n = Xt(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = Xt(e, e.pendingProps), n.return = t;
        n.sibling = null
    }
    return t.child
}

function $h(e, t, n) {
    switch (t.tag) {
        case 3:
            Cd(t), qn();
            break;
        case 5:
            Jf(t);
            break;
        case 1:
            Ie(t.type) && li(t);
            break;
        case 4:
            gu(t, t.stateNode.containerInfo);
            break;
        case 10:
            var r = t.type._context,
                o = t.memoizedProps.value;
            j(ai, r._currentValue), r._currentValue = o;
            break;
        case 13:
            if (r = t.memoizedState, r !== null) return r.dehydrated !== null ? (j(G, G.current & 1), t.flags |= 128, null) : (n & t.child.childLanes) !== 0 ? _d(e, t, n) : (j(G, G.current & 1), e = At(e, t, n), e !== null ? e.sibling : null);
            j(G, G.current & 1);
            break;
        case 19:
            if (r = (n & t.childLanes) !== 0, (e.flags & 128) !== 0) {
                if (r) return Ad(e, t, n);
                t.flags |= 128
            }
            if (o = t.memoizedState, o !== null && (o.rendering = null, o.tail = null, o.lastEffect = null), j(G, G.current), r) break;
            return null;
        case 22:
        case 23:
            return t.lanes = 0, kd(e, t, n)
    }
    return At(e, t, n)
}
var Td, gs, Id, Nd;
Td = function(e, t) {
    for (var n = t.child; n !== null;) {
        if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
        else if (n.tag !== 4 && n.child !== null) {
            n.child.return = n, n = n.child;
            continue
        }
        if (n === t) break;
        for (; n.sibling === null;) {
            if (n.return === null || n.return === t) return;
            n = n.return
        }
        n.sibling.return = n.return, n = n.sibling
    }
};
gs = function() {};
Id = function(e, t, n, r) {
    var o = e.memoizedProps;
    if (o !== r) {
        e = t.stateNode, pn(dt.current);
        var i = null;
        switch (n) {
            case "input":
                o = $l(e, o), r = $l(e, r), i = [];
                break;
            case "select":
                o = b({}, o, {
                    value: void 0
                }), r = b({}, r, {
                    value: void 0
                }), i = [];
                break;
            case "textarea":
                o = Kl(e, o), r = Kl(e, r), i = [];
                break;
            default:
                typeof o.onClick != "function" && typeof r.onClick == "function" && (e.onclick = oi)
        }
        Vl(n, r);
        var l;
        n = null;
        for (a in o)
            if (!r.hasOwnProperty(a) && o.hasOwnProperty(a) && o[a] != null)
                if (a === "style") {
                    var s = o[a];
                    for (l in s) s.hasOwnProperty(l) && (n || (n = {}), n[l] = "")
                } else a !== "dangerouslySetInnerHTML" && a !== "children" && a !== "suppressContentEditableWarning" && a !== "suppressHydrationWarning" && a !== "autoFocus" && (Mr.hasOwnProperty(a) ? i || (i = []) : (i = i || []).push(a, null));
        for (a in r) {
            var u = r[a];
            if (s = o?.[a], r.hasOwnProperty(a) && u !== s && (u != null || s != null))
                if (a === "style")
                    if (s) {
                        for (l in s) !s.hasOwnProperty(l) || u && u.hasOwnProperty(l) || (n || (n = {}), n[l] = "");
                        for (l in u) u.hasOwnProperty(l) && s[l] !== u[l] && (n || (n = {}), n[l] = u[l])
                    } else n || (i || (i = []), i.push(a, n)), n = u;
            else a === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, s = s ? s.__html : void 0, u != null && s !== u && (i = i || []).push(a, u)) : a === "children" ? typeof u != "string" && typeof u != "number" || (i = i || []).push(a, "" + u) : a !== "suppressContentEditableWarning" && a !== "suppressHydrationWarning" && (Mr.hasOwnProperty(a) ? (u != null && a === "onScroll" && V("scroll", e), i || s === u || (i = [])) : (i = i || []).push(a, u))
        }
        n && (i = i || []).push("style", n);
        var a = i;
        (t.updateQueue = a) && (t.flags |= 4)
    }
};
Nd = function(e, t, n, r) {
    n !== r && (t.flags |= 4)
};

function Sr(e, t) {
    if (!W) switch (e.tailMode) {
        case "hidden":
            t = e.tail;
            for (var n = null; t !== null;) t.alternate !== null && (n = t), t = t.sibling;
            n === null ? e.tail = null : n.sibling = null;
            break;
        case "collapsed":
            n = e.tail;
            for (var r = null; n !== null;) n.alternate !== null && (r = n), n = n.sibling;
            r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null
    }
}

function pe(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
        n = 0,
        r = 0;
    if (t)
        for (var o = e.child; o !== null;) n |= o.lanes | o.childLanes, r |= o.subtreeFlags & 14680064, r |= o.flags & 14680064, o.return = e, o = o.sibling;
    else
        for (o = e.child; o !== null;) n |= o.lanes | o.childLanes, r |= o.subtreeFlags, r |= o.flags, o.return = e, o = o.sibling;
    return e.subtreeFlags |= r, e.childLanes = n, t
}

function Mh(e, t, n) {
    var r = t.pendingProps;
    switch (au(t), t.tag) {
        case 2:
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
            return pe(t), null;
        case 1:
            return Ie(t.type) && ii(), pe(t), null;
        case 3:
            return r = t.stateNode, er(), O(Te), O(me), vu(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (To(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, tt !== null && (Cs(tt), tt = null))), gs(e, t), pe(t), null;
        case 5:
            mu(t);
            var o = pn(Zr.current);
            if (n = t.type, e !== null && t.stateNode != null) Id(e, t, n, r, o), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
            else {
                if (!r) {
                    if (t.stateNode === null) throw Error(S(166));
                    return pe(t), null
                }
                if (e = pn(dt.current), To(t)) {
                    r = t.stateNode, n = t.type;
                    var i = t.memoizedProps;
                    switch (r[ct] = t, r[br] = i, e = (t.mode & 1) !== 0, n) {
                        case "dialog":
                            V("cancel", r), V("close", r);
                            break;
                        case "iframe":
                        case "object":
                        case "embed":
                            V("load", r);
                            break;
                        case "video":
                        case "audio":
                            for (o = 0; o < Ir.length; o++) V(Ir[o], r);
                            break;
                        case "source":
                            V("error", r);
                            break;
                        case "img":
                        case "image":
                        case "link":
                            V("error", r), V("load", r);
                            break;
                        case "details":
                            V("toggle", r);
                            break;
                        case "input":
                            qu(r, i), V("invalid", r);
                            break;
                        case "select":
                            r._wrapperState = {
                                wasMultiple: !!i.multiple
                            }, V("invalid", r);
                            break;
                        case "textarea":
                            ea(r, i), V("invalid", r)
                    }
                    Vl(n, i), o = null;
                    for (var l in i)
                        if (i.hasOwnProperty(l)) {
                            var s = i[l];
                            l === "children" ? typeof s == "string" ? r.textContent !== s && (i.suppressHydrationWarning !== !0 && Ao(r.textContent, s, e), o = ["children", s]) : typeof s == "number" && r.textContent !== "" + s && (i.suppressHydrationWarning !== !0 && Ao(r.textContent, s, e), o = ["children", "" + s]) : Mr.hasOwnProperty(l) && s != null && l === "onScroll" && V("scroll", r)
                        } switch (n) {
                        case "input":
                            vo(r), Ju(r, i, !0);
                            break;
                        case "textarea":
                            vo(r), ta(r);
                            break;
                        case "select":
                        case "option":
                            break;
                        default:
                            typeof i.onClick == "function" && (r.onclick = oi)
                    }
                    r = o, t.updateQueue = r, r !== null && (t.flags |= 4)
                } else {
                    l = o.nodeType === 9 ? o : o.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = tf(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = l.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = l.createElement(n, {
                        is: r.is
                    }) : (e = l.createElement(n), n === "select" && (l = e, r.multiple ? l.multiple = !0 : r.size && (l.size = r.size))) : e = l.createElementNS(e, n), e[ct] = t, e[br] = r, Td(e, t, !1, !1), t.stateNode = e;
                    e: {
                        switch (l = Ol(n, r), n) {
                            case "dialog":
                                V("cancel", e), V("close", e), o = r;
                                break;
                            case "iframe":
                            case "object":
                            case "embed":
                                V("load", e), o = r;
                                break;
                            case "video":
                            case "audio":
                                for (o = 0; o < Ir.length; o++) V(Ir[o], e);
                                o = r;
                                break;
                            case "source":
                                V("error", e), o = r;
                                break;
                            case "img":
                            case "image":
                            case "link":
                                V("error", e), V("load", e), o = r;
                                break;
                            case "details":
                                V("toggle", e), o = r;
                                break;
                            case "input":
                                qu(e, r), o = $l(e, r), V("invalid", e);
                                break;
                            case "option":
                                o = r;
                                break;
                            case "select":
                                e._wrapperState = {
                                    wasMultiple: !!r.multiple
                                }, o = b({}, r, {
                                    value: void 0
                                }), V("invalid", e);
                                break;
                            case "textarea":
                                ea(e, r), o = Kl(e, r), V("invalid", e);
                                break;
                            default:
                                o = r
                        }
                        Vl(n, o),
                        s = o;
                        for (i in s)
                            if (s.hasOwnProperty(i)) {
                                var u = s[i];
                                i === "style" ? of(e, u) : i === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, u != null && nf(e, u)) : i === "children" ? typeof u == "string" ? (n !== "textarea" || u !== "") && Fr(e, u) : typeof u == "number" && Fr(e, "" + u) : i !== "suppressContentEditableWarning" && i !== "suppressHydrationWarning" && i !== "autoFocus" && (Mr.hasOwnProperty(i) ? u != null && i === "onScroll" && V("scroll", e) : u != null && Ys(e, i, u, l))
                            } switch (n) {
                            case "input":
                                vo(e), Ju(e, r, !1);
                                break;
                            case "textarea":
                                vo(e), ta(e);
                                break;
                            case "option":
                                r.value != null && e.setAttribute("value", "" + Jt(r.value));
                                break;
                            case "select":
                                e.multiple = !!r.multiple, i = r.value, i != null ? Vn(e, !!r.multiple, i, !1) : r.defaultValue != null && Vn(e, !!r.multiple, r.defaultValue, !0);
                                break;
                            default:
                                typeof o.onClick == "function" && (e.onclick = oi)
                        }
                        switch (n) {
                            case "button":
                            case "input":
                            case "select":
                            case "textarea":
                                r = !!r.autoFocus;
                                break e;
                            case "img":
                                r = !0;
                                break e;
                            default:
                                r = !1
                        }
                    }
                    r && (t.flags |= 4)
                }
                t.ref !== null && (t.flags |= 512, t.flags |= 2097152)
            }
            return pe(t), null;
        case 6:
            if (e && t.stateNode != null) Nd(e, t, e.memoizedProps, r);
            else {
                if (typeof r != "string" && t.stateNode === null) throw Error(S(166));
                if (n = pn(Zr.current), pn(dt.current), To(t)) {
                    if (r = t.stateNode, n = t.memoizedProps, r[ct] = t, (i = r.nodeValue !== n) && (e = ze, e !== null)) switch (e.tag) {
                        case 3:
                            Ao(r.nodeValue, n, (e.mode & 1) !== 0);
                            break;
                        case 5:
                            e.memoizedProps.suppressHydrationWarning !== !0 && Ao(r.nodeValue, n, (e.mode & 1) !== 0)
                    }
                    i && (t.flags |= 4)
                } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[ct] = t, t.stateNode = r
            }
            return pe(t), null;
        case 13:
            if (O(G), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
                if (W && Be !== null && (t.mode & 1) !== 0 && (t.flags & 128) === 0) Qf(), qn(), t.flags |= 98560, i = !1;
                else if (i = To(t), r !== null && r.dehydrated !== null) {
                    if (e === null) {
                        if (!i) throw Error(S(318));
                        if (i = t.memoizedState, i = i !== null ? i.dehydrated : null, !i) throw Error(S(317));
                        i[ct] = t
                    } else qn(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
                    pe(t), i = !1
                } else tt !== null && (Cs(tt), tt = null), i = !0;
                if (!i) return t.flags & 65536 ? t : null
            }
            return (t.flags & 128) !== 0 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, (t.mode & 1) !== 0 && (e === null || (G.current & 1) !== 0 ? ne === 0 && (ne = 3) : Pu())), t.updateQueue !== null && (t.flags |= 4), pe(t), null);
        case 4:
            return er(), gs(e, t), e === null && Gr(t.stateNode.containerInfo), pe(t), null;
        case 10:
            return pu(t.type._context), pe(t), null;
        case 17:
            return Ie(t.type) && ii(), pe(t), null;
        case 19:
            if (O(G), i = t.memoizedState, i === null) return pe(t), null;
            if (r = (t.flags & 128) !== 0, l = i.rendering, l === null)
                if (r) Sr(i, !1);
                else {
                    if (ne !== 0 || e !== null && (e.flags & 128) !== 0)
                        for (e = t.child; e !== null;) {
                            if (l = di(e), l !== null) {
                                for (t.flags |= 128, Sr(i, !1), r = l.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null;) i = n, e = r, i.flags &= 14680066, l = i.alternate, l === null ? (i.childLanes = 0, i.lanes = e, i.child = null, i.subtreeFlags = 0, i.memoizedProps = null, i.memoizedState = null, i.updateQueue = null, i.dependencies = null, i.stateNode = null) : (i.childLanes = l.childLanes, i.lanes = l.lanes, i.child = l.child, i.subtreeFlags = 0, i.deletions = null, i.memoizedProps = l.memoizedProps, i.memoizedState = l.memoizedState, i.updateQueue = l.updateQueue, i.type = l.type, e = l.dependencies, i.dependencies = e === null ? null : {
                                    lanes: e.lanes,
                                    firstContext: e.firstContext
                                }), n = n.sibling;
                                return j(G, G.current & 1 | 2), t.child
                            }
                            e = e.sibling
                        }
                    i.tail !== null && J() > nr && (t.flags |= 128, r = !0, Sr(i, !1), t.lanes = 4194304)
                }
            else {
                if (!r)
                    if (e = di(l), e !== null) {
                        if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), Sr(i, !0), i.tail === null && i.tailMode === "hidden" && !l.alternate && !W) return pe(t), null
                    } else 2 * J() - i.renderingStartTime > nr && n !== 1073741824 && (t.flags |= 128, r = !0, Sr(i, !1), t.lanes = 4194304);
                i.isBackwards ? (l.sibling = t.child, t.child = l) : (n = i.last, n !== null ? n.sibling = l : t.child = l, i.last = l)
            }
            return i.tail !== null ? (t = i.tail, i.rendering = t, i.tail = t.sibling, i.renderingStartTime = J(), t.sibling = null, n = G.current, j(G, r ? n & 1 | 2 : n & 1), t) : (pe(t), null);
        case 22:
        case 23:
            return Nu(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && (t.mode & 1) !== 0 ? (He & 1073741824) !== 0 && (pe(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : pe(t), null;
        case 24:
            return null;
        case 25:
            return null
    }
    throw Error(S(156, t.tag))
}

function Fh(e, t) {
    switch (au(t), t.tag) {
        case 1:
            return Ie(t.type) && ii(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
        case 3:
            return er(), O(Te), O(me), vu(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
        case 5:
            return mu(t), null;
        case 13:
            if (O(G), e = t.memoizedState, e !== null && e.dehydrated !== null) {
                if (t.alternate === null) throw Error(S(340));
                qn()
            }
            return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
        case 19:
            return O(G), null;
        case 4:
            return er(), null;
        case 10:
            return pu(t.type._context), null;
        case 22:
        case 23:
            return Nu(), null;
        case 24:
            return null;
        default:
            return null
    }
}
var Po = !1,
    ye = !1,
    Kh = typeof WeakSet == "function" ? WeakSet : Set,
    x = null;

function Kn(e, t) {
    var n = e.ref;
    if (n !== null)
        if (typeof n == "function") try {
            n(null)
        } catch (r) {
            X(e, t, r)
        } else n.current = null
}

function ms(e, t, n) {
    try {
        n()
    } catch (r) {
        X(e, t, r)
    }
}
var Oa = !1;

function jh(e, t) {
    if (es = ti, e = Uf(), su(e)) {
        if ("selectionStart" in e) var n = {
            start: e.selectionStart,
            end: e.selectionEnd
        };
        else e: {
            n = (n = e.ownerDocument) && n.defaultView || window;
            var r = n.getSelection && n.getSelection();
            if (r && r.rangeCount !== 0) {
                n = r.anchorNode;
                var o = r.anchorOffset,
                    i = r.focusNode;
                r = r.focusOffset;
                try {
                    n.nodeType, i.nodeType
                } catch {
                    n = null;
                    break e
                }
                var l = 0,
                    s = -1,
                    u = -1,
                    a = 0,
                    f = 0,
                    d = e,
                    p = null;
                t: for (;;) {
                    for (var g; d !== n || o !== 0 && d.nodeType !== 3 || (s = l + o), d !== i || r !== 0 && d.nodeType !== 3 || (u = l + r), d.nodeType === 3 && (l += d.nodeValue.length), (g = d.firstChild) !== null;) p = d, d = g;
                    for (;;) {
                        if (d === e) break t;
                        if (p === n && ++a === o && (s = l), p === i && ++f === r && (u = l), (g = d.nextSibling) !== null) break;
                        d = p, p = d.parentNode
                    }
                    d = g
                }
                n = s === -1 || u === -1 ? null : {
                    start: s,
                    end: u
                }
            } else n = null
        }
        n = n || {
            start: 0,
            end: 0
        }
    } else n = null;
    for (ts = {
            focusedElem: e,
            selectionRange: n
        }, ti = !1, x = t; x !== null;)
        if (t = x, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, x = e;
        else
            for (; x !== null;) {
                t = x;
                try {
                    var v = t.alternate;
                    if ((t.flags & 1024) !== 0) switch (t.tag) {
                        case 0:
                        case 11:
                        case 15:
                            break;
                        case 1:
                            if (v !== null) {
                                var w = v.memoizedProps,
                                    H = v.memoizedState,
                                    h = t.stateNode,
                                    c = h.getSnapshotBeforeUpdate(t.elementType === t.type ? w : Je(t.type, w), H);
                                h.__reactInternalSnapshotBeforeUpdate = c
                            }
                            break;
                        case 3:
                            var y = t.stateNode.containerInfo;
                            y.nodeType === 1 ? y.textContent = "" : y.nodeType === 9 && y.documentElement && y.removeChild(y.documentElement);
                            break;
                        case 5:
                        case 6:
                        case 4:
                        case 17:
                            break;
                        default:
                            throw Error(S(163))
                    }
                } catch (m) {
                    X(t, t.return, m)
                }
                if (e = t.sibling, e !== null) {
                    e.return = t.return, x = e;
                    break
                }
                x = t.return
            }
    return v = Oa, Oa = !1, v
}

function Br(e, t, n) {
    var r = t.updateQueue;
    if (r = r !== null ? r.lastEffect : null, r !== null) {
        var o = r = r.next;
        do {
            if ((o.tag & e) === e) {
                var i = o.destroy;
                o.destroy = void 0, i !== void 0 && ms(t, n, i)
            }
            o = o.next
        } while (o !== r)
    }
}

function zi(e, t) {
    if (t = t.updateQueue, t = t !== null ? t.lastEffect : null, t !== null) {
        var n = t = t.next;
        do {
            if ((n.tag & e) === e) {
                var r = n.create;
                n.destroy = r()
            }
            n = n.next
        } while (n !== t)
    }
}

function vs(e) {
    var t = e.ref;
    if (t !== null) {
        var n = e.stateNode;
        switch (e.tag) {
            case 5:
                e = n;
                break;
            default:
                e = n
        }
        typeof t == "function" ? t(e) : t.current = e
    }
}

function Pd(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Pd(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[ct], delete t[br], delete t[os], delete t[Ch], delete t[_h])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null
}

function Ld(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4
}

function Wa(e) {
    e: for (;;) {
        for (; e.sibling === null;) {
            if (e.return === null || Ld(e.return)) return null;
            e = e.return
        }
        for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
            if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
            e.child.return = e, e = e.child
        }
        if (!(e.flags & 2)) return e.stateNode
    }
}

function ws(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = oi));
    else if (r !== 4 && (e = e.child, e !== null))
        for (ws(e, t, n), e = e.sibling; e !== null;) ws(e, t, n), e = e.sibling
}

function Ss(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (r !== 4 && (e = e.child, e !== null))
        for (Ss(e, t, n), e = e.sibling; e !== null;) Ss(e, t, n), e = e.sibling
}
var se = null,
    et = !1;

function Pt(e, t, n) {
    for (n = n.child; n !== null;) Rd(e, t, n), n = n.sibling
}

function Rd(e, t, n) {
    if (ft && typeof ft.onCommitFiberUnmount == "function") try {
        ft.onCommitFiberUnmount(Ii, n)
    } catch {}
    switch (n.tag) {
        case 5:
            ye || Kn(n, t);
        case 6:
            var r = se,
                o = et;
            se = null, Pt(e, t, n), se = r, et = o, se !== null && (et ? (e = se, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : se.removeChild(n.stateNode));
            break;
        case 18:
            se !== null && (et ? (e = se, n = n.stateNode, e.nodeType === 8 ? vl(e.parentNode, n) : e.nodeType === 1 && vl(e, n), Or(e)) : vl(se, n.stateNode));
            break;
        case 4:
            r = se, o = et, se = n.stateNode.containerInfo, et = !0, Pt(e, t, n), se = r, et = o;
            break;
        case 0:
        case 11:
        case 14:
        case 15:
            if (!ye && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
                o = r = r.next;
                do {
                    var i = o,
                        l = i.destroy;
                    i = i.tag, l !== void 0 && ((i & 2) !== 0 || (i & 4) !== 0) && ms(n, t, l), o = o.next
                } while (o !== r)
            }
            Pt(e, t, n);
            break;
        case 1:
            if (!ye && (Kn(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
                r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount()
            } catch (s) {
                X(n, t, s)
            }
            Pt(e, t, n);
            break;
        case 21:
            Pt(e, t, n);
            break;
        case 22:
            n.mode & 1 ? (ye = (r = ye) || n.memoizedState !== null, Pt(e, t, n), ye = r) : Pt(e, t, n);
            break;
        default:
            Pt(e, t, n)
    }
}

function Qa(e) {
    var t = e.updateQueue;
    if (t !== null) {
        e.updateQueue = null;
        var n = e.stateNode;
        n === null && (n = e.stateNode = new Kh), t.forEach(function(r) {
            var o = Zh.bind(null, e, r);
            n.has(r) || (n.add(r), r.then(o, o))
        })
    }
}

function qe(e, t) {
    var n = t.deletions;
    if (n !== null)
        for (var r = 0; r < n.length; r++) {
            var o = n[r];
            try {
                var i = e,
                    l = t,
                    s = l;
                e: for (; s !== null;) {
                    switch (s.tag) {
                        case 5:
                            se = s.stateNode, et = !1;
                            break e;
                        case 3:
                            se = s.stateNode.containerInfo, et = !0;
                            break e;
                        case 4:
                            se = s.stateNode.containerInfo, et = !0;
                            break e
                    }
                    s = s.return
                }
                if (se === null) throw Error(S(160));
                Rd(i, l, o), se = null, et = !1;
                var u = o.alternate;
                u !== null && (u.return = null), o.return = null
            } catch (a) {
                X(o, t, a)
            }
        }
    if (t.subtreeFlags & 12854)
        for (t = t.child; t !== null;) Ud(t, e), t = t.sibling
}

function Ud(e, t) {
    var n = e.alternate,
        r = e.flags;
    switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
            if (qe(t, e), st(e), r & 4) {
                try {
                    Br(3, e, e.return), zi(3, e)
                } catch (w) {
                    X(e, e.return, w)
                }
                try {
                    Br(5, e, e.return)
                } catch (w) {
                    X(e, e.return, w)
                }
            }
            break;
        case 1:
            qe(t, e), st(e), r & 512 && n !== null && Kn(n, n.return);
            break;
        case 5:
            if (qe(t, e), st(e), r & 512 && n !== null && Kn(n, n.return), e.flags & 32) {
                var o = e.stateNode;
                try {
                    Fr(o, "")
                } catch (w) {
                    X(e, e.return, w)
                }
            }
            if (r & 4 && (o = e.stateNode, o != null)) {
                var i = e.memoizedProps,
                    l = n !== null ? n.memoizedProps : i,
                    s = e.type,
                    u = e.updateQueue;
                if (e.updateQueue = null, u !== null) try {
                    s === "input" && i.type === "radio" && i.name != null && Jc(o, i), Ol(s, l);
                    var a = Ol(s, i);
                    for (l = 0; l < u.length; l += 2) {
                        var f = u[l],
                            d = u[l + 1];
                        f === "style" ? of(o, d) : f === "dangerouslySetInnerHTML" ? nf(o, d) : f === "children" ? Fr(o, d) : Ys(o, f, d, a)
                    }
                    switch (s) {
                        case "input":
                            Ml(o, i);
                            break;
                        case "textarea":
                            ef(o, i);
                            break;
                        case "select":
                            var p = o._wrapperState.wasMultiple;
                            o._wrapperState.wasMultiple = !!i.multiple;
                            var g = i.value;
                            g != null ? Vn(o, !!i.multiple, g, !1) : p !== !!i.multiple && (i.defaultValue != null ? Vn(o, !!i.multiple, i.defaultValue, !0) : Vn(o, !!i.multiple, i.multiple ? [] : "", !1))
                    }
                    o[br] = i
                } catch (w) {
                    X(e, e.return, w)
                }
            }
            break;
        case 6:
            if (qe(t, e), st(e), r & 4) {
                if (e.stateNode === null) throw Error(S(162));
                o = e.stateNode, i = e.memoizedProps;
                try {
                    o.nodeValue = i
                } catch (w) {
                    X(e, e.return, w)
                }
            }
            break;
        case 3:
            if (qe(t, e), st(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
                Or(t.containerInfo)
            } catch (w) {
                X(e, e.return, w)
            }
            break;
        case 4:
            qe(t, e), st(e);
            break;
        case 13:
            qe(t, e), st(e), o = e.child, o.flags & 8192 && (i = o.memoizedState !== null, o.stateNode.isHidden = i, !i || o.alternate !== null && o.alternate.memoizedState !== null || (Tu = J())), r & 4 && Qa(e);
            break;
        case 22:
            if (f = n !== null && n.memoizedState !== null, e.mode & 1 ? (ye = (a = ye) || f, qe(t, e), ye = a) : qe(t, e), st(e), r & 8192) {
                if (a = e.memoizedState !== null, (e.stateNode.isHidden = a) && !f && (e.mode & 1) !== 0)
                    for (x = e, f = e.child; f !== null;) {
                        for (d = x = f; x !== null;) {
                            switch (p = x, g = p.child, p.tag) {
                                case 0:
                                case 11:
                                case 14:
                                case 15:
                                    Br(4, p, p.return);
                                    break;
                                case 1:
                                    Kn(p, p.return);
                                    var v = p.stateNode;
                                    if (typeof v.componentWillUnmount == "function") {
                                        r = p, n = p.return;
                                        try {
                                            t = r, v.props = t.memoizedProps, v.state = t.memoizedState, v.componentWillUnmount()
                                        } catch (w) {
                                            X(r, n, w)
                                        }
                                    }
                                    break;
                                case 5:
                                    Kn(p, p.return);
                                    break;
                                case 22:
                                    if (p.memoizedState !== null) {
                                        Ya(d);
                                        continue
                                    }
                            }
                            g !== null ? (g.return = p, x = g) : Ya(d)
                        }
                        f = f.sibling
                    }
                e: for (f = null, d = e;;) {
                    if (d.tag === 5) {
                        if (f === null) {
                            f = d;
                            try {
                                o = d.stateNode, a ? (i = o.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none") : (s = d.stateNode, u = d.memoizedProps.style, l = u != null && u.hasOwnProperty("display") ? u.display : null, s.style.display = rf("display", l))
                            } catch (w) {
                                X(e, e.return, w)
                            }
                        }
                    } else if (d.tag === 6) {
                        if (f === null) try {
                            d.stateNode.nodeValue = a ? "" : d.memoizedProps
                        } catch (w) {
                            X(e, e.return, w)
                        }
                    } else if ((d.tag !== 22 && d.tag !== 23 || d.memoizedState === null || d === e) && d.child !== null) {
                        d.child.return = d, d = d.child;
                        continue
                    }
                    if (d === e) break e;
                    for (; d.sibling === null;) {
                        if (d.return === null || d.return === e) break e;
                        f === d && (f = null), d = d.return
                    }
                    f === d && (f = null), d.sibling.return = d.return, d = d.sibling
                }
            }
            break;
        case 19:
            qe(t, e), st(e), r & 4 && Qa(e);
            break;
        case 21:
            break;
        default:
            qe(t, e), st(e)
    }
}

function st(e) {
    var t = e.flags;
    if (t & 2) {
        try {
            e: {
                for (var n = e.return; n !== null;) {
                    if (Ld(n)) {
                        var r = n;
                        break e
                    }
                    n = n.return
                }
                throw Error(S(160))
            }
            switch (r.tag) {
                case 5:
                    var o = r.stateNode;
                    r.flags & 32 && (Fr(o, ""), r.flags &= -33);
                    var i = Wa(e);
                    Ss(e, i, o);
                    break;
                case 3:
                case 4:
                    var l = r.stateNode.containerInfo,
                        s = Wa(e);
                    ws(e, s, l);
                    break;
                default:
                    throw Error(S(161))
            }
        }
        catch (u) {
            X(e, e.return, u)
        }
        e.flags &= -3
    }
    t & 4096 && (e.flags &= -4097)
}

function Vh(e, t, n) {
    x = e, Hd(e)
}

function Hd(e, t, n) {
    for (var r = (e.mode & 1) !== 0; x !== null;) {
        var o = x,
            i = o.child;
        if (o.tag === 22 && r) {
            var l = o.memoizedState !== null || Po;
            if (!l) {
                var s = o.alternate,
                    u = s !== null && s.memoizedState !== null || ye;
                s = Po;
                var a = ye;
                if (Po = l, (ye = u) && !a)
                    for (x = o; x !== null;) l = x, u = l.child, l.tag === 22 && l.memoizedState !== null ? ba(o) : u !== null ? (u.return = l, x = u) : ba(o);
                for (; i !== null;) x = i, Hd(i), i = i.sibling;
                x = o, Po = s, ye = a
            }
            Ga(e)
        } else(o.subtreeFlags & 8772) !== 0 && i !== null ? (i.return = o, x = i) : Ga(e)
    }
}

function Ga(e) {
    for (; x !== null;) {
        var t = x;
        if ((t.flags & 8772) !== 0) {
            var n = t.alternate;
            try {
                if ((t.flags & 8772) !== 0) switch (t.tag) {
                    case 0:
                    case 11:
                    case 15:
                        ye || zi(5, t);
                        break;
                    case 1:
                        var r = t.stateNode;
                        if (t.flags & 4 && !ye)
                            if (n === null) r.componentDidMount();
                            else {
                                var o = t.elementType === t.type ? n.memoizedProps : Je(t.type, n.memoizedProps);
                                r.componentDidUpdate(o, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate)
                            } var i = t.updateQueue;
                        i !== null && Pa(t, i, r);
                        break;
                    case 3:
                        var l = t.updateQueue;
                        if (l !== null) {
                            if (n = null, t.child !== null) switch (t.child.tag) {
                                case 5:
                                    n = t.child.stateNode;
                                    break;
                                case 1:
                                    n = t.child.stateNode
                            }
                            Pa(t, l, n)
                        }
                        break;
                    case 5:
                        var s = t.stateNode;
                        if (n === null && t.flags & 4) {
                            n = s;
                            var u = t.memoizedProps;
                            switch (t.type) {
                                case "button":
                                case "input":
                                case "select":
                                case "textarea":
                                    u.autoFocus && n.focus();
                                    break;
                                case "img":
                                    u.src && (n.src = u.src)
                            }
                        }
                        break;
                    case 6:
                        break;
                    case 4:
                        break;
                    case 12:
                        break;
                    case 13:
                        if (t.memoizedState === null) {
                            var a = t.alternate;
                            if (a !== null) {
                                var f = a.memoizedState;
                                if (f !== null) {
                                    var d = f.dehydrated;
                                    d !== null && Or(d)
                                }
                            }
                        }
                        break;
                    case 19:
                    case 17:
                    case 21:
                    case 22:
                    case 23:
                    case 25:
                        break;
                    default:
                        throw Error(S(163))
                }
                ye || t.flags & 512 && vs(t)
            } catch (p) {
                X(t, t.return, p)
            }
        }
        if (t === e) {
            x = null;
            break
        }
        if (n = t.sibling, n !== null) {
            n.return = t.return, x = n;
            break
        }
        x = t.return
    }
}

function Ya(e) {
    for (; x !== null;) {
        var t = x;
        if (t === e) {
            x = null;
            break
        }
        var n = t.sibling;
        if (n !== null) {
            n.return = t.return, x = n;
            break
        }
        x = t.return
    }
}

function ba(e) {
    for (; x !== null;) {
        var t = x;
        try {
            switch (t.tag) {
                case 0:
                case 11:
                case 15:
                    var n = t.return;
                    try {
                        zi(4, t)
                    } catch (u) {
                        X(t, n, u)
                    }
                    break;
                case 1:
                    var r = t.stateNode;
                    if (typeof r.componentDidMount == "function") {
                        var o = t.return;
                        try {
                            r.componentDidMount()
                        } catch (u) {
                            X(t, o, u)
                        }
                    }
                    var i = t.return;
                    try {
                        vs(t)
                    } catch (u) {
                        X(t, i, u)
                    }
                    break;
                case 5:
                    var l = t.return;
                    try {
                        vs(t)
                    } catch (u) {
                        X(t, l, u)
                    }
            }
        } catch (u) {
            X(t, t.return, u)
        }
        if (t === e) {
            x = null;
            break
        }
        var s = t.sibling;
        if (s !== null) {
            s.return = t.return, x = s;
            break
        }
        x = t.return
    }
}
var Oh = Math.ceil,
    yi = Tt.ReactCurrentDispatcher,
    _u = Tt.ReactCurrentOwner,
    Qe = Tt.ReactCurrentBatchConfig,
    B = 0,
    le = null,
    ee = null,
    ae = 0,
    He = 0,
    jn = nn(0),
    ne = 0,
    to = null,
    kn = 0,
    Di = 0,
    Au = 0,
    zr = null,
    _e = null,
    Tu = 0,
    nr = 1 / 0,
    mt = null,
    gi = !1,
    Es = null,
    Yt = null,
    Lo = !1,
    Mt = null,
    mi = 0,
    Dr = 0,
    ks = null,
    Qo = -1,
    Go = 0;

function Se() {
    return (B & 6) !== 0 ? J() : Qo !== -1 ? Qo : Qo = J()
}

function bt(e) {
    return (e.mode & 1) === 0 ? 1 : (B & 2) !== 0 && ae !== 0 ? ae & -ae : Th.transition !== null ? (Go === 0 && (Go = mf()), Go) : (e = M, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Cf(e.type)), e)
}

function ot(e, t, n, r) {
    if (50 < Dr) throw Dr = 0, ks = null, Error(S(185));
    lo(e, n, r), ((B & 2) === 0 || e !== le) && (e === le && ((B & 2) === 0 && (Di |= n), ne === 4 && Dt(e, ae)), Ne(e, r), n === 1 && B === 0 && (t.mode & 1) === 0 && (nr = J() + 500, Ui && rn()))
}

function Ne(e, t) {
    var n = e.callbackNode;
    T0(e, t);
    var r = ei(e, e === le ? ae : 0);
    if (r === 0) n !== null && oa(n), e.callbackNode = null, e.callbackPriority = 0;
    else if (t = r & -r, e.callbackPriority !== t) {
        if (n != null && oa(n), t === 1) e.tag === 0 ? Ah(Xa.bind(null, e)) : Vf(Xa.bind(null, e)), kh(function() {
            (B & 6) === 0 && rn()
        }), n = null;
        else {
            switch (vf(r)) {
                case 1:
                    n = Js;
                    break;
                case 4:
                    n = yf;
                    break;
                case 16:
                    n = Jo;
                    break;
                case 536870912:
                    n = gf;
                    break;
                default:
                    n = Jo
            }
            n = jd(n, Bd.bind(null, e))
        }
        e.callbackPriority = t, e.callbackNode = n
    }
}

function Bd(e, t) {
    if (Qo = -1, Go = 0, (B & 6) !== 0) throw Error(S(327));
    var n = e.callbackNode;
    if (Yn() && e.callbackNode !== n) return null;
    var r = ei(e, e === le ? ae : 0);
    if (r === 0) return null;
    if ((r & 30) !== 0 || (r & e.expiredLanes) !== 0 || t) t = vi(e, r);
    else {
        t = r;
        var o = B;
        B |= 2;
        var i = Dd();
        (le !== e || ae !== t) && (mt = null, nr = J() + 500, gn(e, t));
        do try {
            Gh();
            break
        } catch (s) {
            zd(e, s)
        }
        while (1);
        du(), yi.current = i, B = o, ee !== null ? t = 0 : (le = null, ae = 0, t = ne)
    }
    if (t !== 0) {
        if (t === 2 && (o = bl(e), o !== 0 && (r = o, t = xs(e, o))), t === 1) throw n = to, gn(e, 0), Dt(e, r), Ne(e, J()), n;
        if (t === 6) Dt(e, r);
        else {
            if (o = e.current.alternate, (r & 30) === 0 && !Wh(o) && (t = vi(e, r), t === 2 && (i = bl(e), i !== 0 && (r = i, t = xs(e, i))), t === 1)) throw n = to, gn(e, 0), Dt(e, r), Ne(e, J()), n;
            switch (e.finishedWork = o, e.finishedLanes = r, t) {
                case 0:
                case 1:
                    throw Error(S(345));
                case 2:
                    cn(e, _e, mt);
                    break;
                case 3:
                    if (Dt(e, r), (r & 130023424) === r && (t = Tu + 500 - J(), 10 < t)) {
                        if (ei(e, 0) !== 0) break;
                        if (o = e.suspendedLanes, (o & r) !== r) {
                            Se(), e.pingedLanes |= e.suspendedLanes & o;
                            break
                        }
                        e.timeoutHandle = rs(cn.bind(null, e, _e, mt), t);
                        break
                    }
                    cn(e, _e, mt);
                    break;
                case 4:
                    if (Dt(e, r), (r & 4194240) === r) break;
                    for (t = e.eventTimes, o = -1; 0 < r;) {
                        var l = 31 - rt(r);
                        i = 1 << l, l = t[l], l > o && (o = l), r &= ~i
                    }
                    if (r = o, r = J() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * Oh(r / 1960)) - r, 10 < r) {
                        e.timeoutHandle = rs(cn.bind(null, e, _e, mt), r);
                        break
                    }
                    cn(e, _e, mt);
                    break;
                case 5:
                    cn(e, _e, mt);
                    break;
                default:
                    throw Error(S(329))
            }
        }
    }
    return Ne(e, J()), e.callbackNode === n ? Bd.bind(null, e) : null
}

function xs(e, t) {
    var n = zr;
    return e.current.memoizedState.isDehydrated && (gn(e, t).flags |= 256), e = vi(e, t), e !== 2 && (t = _e, _e = n, t !== null && Cs(t)), e
}

function Cs(e) {
    _e === null ? _e = e : _e.push.apply(_e, e)
}

function Wh(e) {
    for (var t = e;;) {
        if (t.flags & 16384) {
            var n = t.updateQueue;
            if (n !== null && (n = n.stores, n !== null))
                for (var r = 0; r < n.length; r++) {
                    var o = n[r],
                        i = o.getSnapshot;
                    o = o.value;
                    try {
                        if (!it(i(), o)) return !1
                    } catch {
                        return !1
                    }
                }
        }
        if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
        else {
            if (t === e) break;
            for (; t.sibling === null;) {
                if (t.return === null || t.return === e) return !0;
                t = t.return
            }
            t.sibling.return = t.return, t = t.sibling
        }
    }
    return !0
}

function Dt(e, t) {
    for (t &= ~Au, t &= ~Di, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t;) {
        var n = 31 - rt(t),
            r = 1 << n;
        e[n] = -1, t &= ~r
    }
}

function Xa(e) {
    if ((B & 6) !== 0) throw Error(S(327));
    Yn();
    var t = ei(e, 0);
    if ((t & 1) === 0) return Ne(e, J()), null;
    var n = vi(e, t);
    if (e.tag !== 0 && n === 2) {
        var r = bl(e);
        r !== 0 && (t = r, n = xs(e, r))
    }
    if (n === 1) throw n = to, gn(e, 0), Dt(e, t), Ne(e, J()), n;
    if (n === 6) throw Error(S(345));
    return e.finishedWork = e.current.alternate, e.finishedLanes = t, cn(e, _e, mt), Ne(e, J()), null
}

function Iu(e, t) {
    var n = B;
    B |= 1;
    try {
        return e(t)
    } finally {
        B = n, B === 0 && (nr = J() + 500, Ui && rn())
    }
}

function xn(e) {
    Mt !== null && Mt.tag === 0 && (B & 6) === 0 && Yn();
    var t = B;
    B |= 1;
    var n = Qe.transition,
        r = M;
    try {
        if (Qe.transition = null, M = 1, e) return e()
    } finally {
        M = r, Qe.transition = n, B = t, (B & 6) === 0 && rn()
    }
}

function Nu() {
    He = jn.current, O(jn)
}

function gn(e, t) {
    e.finishedWork = null, e.finishedLanes = 0;
    var n = e.timeoutHandle;
    if (n !== -1 && (e.timeoutHandle = -1, Eh(n)), ee !== null)
        for (n = ee.return; n !== null;) {
            var r = n;
            switch (au(r), r.tag) {
                case 1:
                    r = r.type.childContextTypes, r != null && ii();
                    break;
                case 3:
                    er(), O(Te), O(me), vu();
                    break;
                case 5:
                    mu(r);
                    break;
                case 4:
                    er();
                    break;
                case 13:
                    O(G);
                    break;
                case 19:
                    O(G);
                    break;
                case 10:
                    pu(r.type._context);
                    break;
                case 22:
                case 23:
                    Nu()
            }
            n = n.return
        }
    if (le = e, ee = e = Xt(e.current, null), ae = He = t, ne = 0, to = null, Au = Di = kn = 0, _e = zr = null, dn !== null) {
        for (t = 0; t < dn.length; t++)
            if (n = dn[t], r = n.interleaved, r !== null) {
                n.interleaved = null;
                var o = r.next,
                    i = n.pending;
                if (i !== null) {
                    var l = i.next;
                    i.next = o, r.next = l
                }
                n.pending = r
            } dn = null
    }
    return e
}

function zd(e, t) {
    do {
        var n = ee;
        try {
            if (du(), Vo.current = hi, pi) {
                for (var r = Y.memoizedState; r !== null;) {
                    var o = r.queue;
                    o !== null && (o.pending = null), r = r.next
                }
                pi = !1
            }
            if (En = 0, ie = te = Y = null, Hr = !1, qr = 0, _u.current = null, n === null || n.return === null) {
                ne = 1, to = t, ee = null;
                break
            }
            e: {
                var i = e,
                    l = n.return,
                    s = n,
                    u = t;
                if (t = ae, s.flags |= 32768, u !== null && typeof u == "object" && typeof u.then == "function") {
                    var a = u,
                        f = s,
                        d = f.tag;
                    if ((f.mode & 1) === 0 && (d === 0 || d === 11 || d === 15)) {
                        var p = f.alternate;
                        p ? (f.updateQueue = p.updateQueue, f.memoizedState = p.memoizedState, f.lanes = p.lanes) : (f.updateQueue = null, f.memoizedState = null)
                    }
                    var g = Da(l);
                    if (g !== null) {
                        g.flags &= -257, $a(g, l, s, i, t), g.mode & 1 && za(i, a, t), t = g, u = a;
                        var v = t.updateQueue;
                        if (v === null) {
                            var w = new Set;
                            w.add(u), t.updateQueue = w
                        } else v.add(u);
                        break e
                    } else {
                        if ((t & 1) === 0) {
                            za(i, a, t), Pu();
                            break e
                        }
                        u = Error(S(426))
                    }
                } else if (W && s.mode & 1) {
                    var H = Da(l);
                    if (H !== null) {
                        (H.flags & 65536) === 0 && (H.flags |= 256), $a(H, l, s, i, t), cu(tr(u, s));
                        break e
                    }
                }
                i = u = tr(u, s),
                ne !== 4 && (ne = 2),
                zr === null ? zr = [i] : zr.push(i),
                i = l;do {
                    switch (i.tag) {
                        case 3:
                            i.flags |= 65536, t &= -t, i.lanes |= t;
                            var h = wd(i, u, t);
                            Na(i, h);
                            break e;
                        case 1:
                            s = u;
                            var c = i.type,
                                y = i.stateNode;
                            if ((i.flags & 128) === 0 && (typeof c.getDerivedStateFromError == "function" || y !== null && typeof y.componentDidCatch == "function" && (Yt === null || !Yt.has(y)))) {
                                i.flags |= 65536, t &= -t, i.lanes |= t;
                                var m = Sd(i, s, t);
                                Na(i, m);
                                break e
                            }
                    }
                    i = i.return
                } while (i !== null)
            }
            Md(n)
        } catch (E) {
            t = E, ee === n && n !== null && (ee = n = n.return);
            continue
        }
        break
    } while (1)
}

function Dd() {
    var e = yi.current;
    return yi.current = hi, e === null ? hi : e
}

function Pu() {
    (ne === 0 || ne === 3 || ne === 2) && (ne = 4), le === null || (kn & 268435455) === 0 && (Di & 268435455) === 0 || Dt(le, ae)
}

function vi(e, t) {
    var n = B;
    B |= 2;
    var r = Dd();
    (le !== e || ae !== t) && (mt = null, gn(e, t));
    do try {
        Qh();
        break
    } catch (o) {
        zd(e, o)
    }
    while (1);
    if (du(), B = n, yi.current = r, ee !== null) throw Error(S(261));
    return le = null, ae = 0, ne
}

function Qh() {
    for (; ee !== null;) $d(ee)
}

function Gh() {
    for (; ee !== null && !v0();) $d(ee)
}

function $d(e) {
    var t = Kd(e.alternate, e, He);
    e.memoizedProps = e.pendingProps, t === null ? Md(e) : ee = t, _u.current = null
}

function Md(e) {
    var t = e;
    do {
        var n = t.alternate;
        if (e = t.return, (t.flags & 32768) === 0) {
            if (n = Mh(n, t, He), n !== null) {
                ee = n;
                return
            }
        } else {
            if (n = Fh(n, t), n !== null) {
                n.flags &= 32767, ee = n;
                return
            }
            if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
            else {
                ne = 6, ee = null;
                return
            }
        }
        if (t = t.sibling, t !== null) {
            ee = t;
            return
        }
        ee = t = e
    } while (t !== null);
    ne === 0 && (ne = 5)
}

function cn(e, t, n) {
    var r = M,
        o = Qe.transition;
    try {
        Qe.transition = null, M = 1, Yh(e, t, n, r)
    } finally {
        Qe.transition = o, M = r
    }
    return null
}

function Yh(e, t, n, r) {
    do Yn(); while (Mt !== null);
    if ((B & 6) !== 0) throw Error(S(327));
    n = e.finishedWork;
    var o = e.finishedLanes;
    if (n === null) return null;
    if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(S(177));
    e.callbackNode = null, e.callbackPriority = 0;
    var i = n.lanes | n.childLanes;
    if (I0(e, i), e === le && (ee = le = null, ae = 0), (n.subtreeFlags & 2064) === 0 && (n.flags & 2064) === 0 || Lo || (Lo = !0, jd(Jo, function() {
            return Yn(), null
        })), i = (n.flags & 15990) !== 0, (n.subtreeFlags & 15990) !== 0 || i) {
        i = Qe.transition, Qe.transition = null;
        var l = M;
        M = 1;
        var s = B;
        B |= 4, _u.current = null, jh(e, n), Ud(n, e), hh(ts), ti = !!es, ts = es = null, e.current = n, Vh(n), w0(), B = s, M = l, Qe.transition = i
    } else e.current = n;
    if (Lo && (Lo = !1, Mt = e, mi = o), i = e.pendingLanes, i === 0 && (Yt = null), k0(n.stateNode), Ne(e, J()), t !== null)
        for (r = e.onRecoverableError, n = 0; n < t.length; n++) o = t[n], r(o.value, {
            componentStack: o.stack,
            digest: o.digest
        });
    if (gi) throw gi = !1, e = Es, Es = null, e;
    return (mi & 1) !== 0 && e.tag !== 0 && Yn(), i = e.pendingLanes, (i & 1) !== 0 ? e === ks ? Dr++ : (Dr = 0, ks = e) : Dr = 0, rn(), null
}

function Yn() {
    if (Mt !== null) {
        var e = vf(mi),
            t = Qe.transition,
            n = M;
        try {
            if (Qe.transition = null, M = 16 > e ? 16 : e, Mt === null) var r = !1;
            else {
                if (e = Mt, Mt = null, mi = 0, (B & 6) !== 0) throw Error(S(331));
                var o = B;
                for (B |= 4, x = e.current; x !== null;) {
                    var i = x,
                        l = i.child;
                    if ((x.flags & 16) !== 0) {
                        var s = i.deletions;
                        if (s !== null) {
                            for (var u = 0; u < s.length; u++) {
                                var a = s[u];
                                for (x = a; x !== null;) {
                                    var f = x;
                                    switch (f.tag) {
                                        case 0:
                                        case 11:
                                        case 15:
                                            Br(8, f, i)
                                    }
                                    var d = f.child;
                                    if (d !== null) d.return = f, x = d;
                                    else
                                        for (; x !== null;) {
                                            f = x;
                                            var p = f.sibling,
                                                g = f.return;
                                            if (Pd(f), f === a) {
                                                x = null;
                                                break
                                            }
                                            if (p !== null) {
                                                p.return = g, x = p;
                                                break
                                            }
                                            x = g
                                        }
                                }
                            }
                            var v = i.alternate;
                            if (v !== null) {
                                var w = v.child;
                                if (w !== null) {
                                    v.child = null;
                                    do {
                                        var H = w.sibling;
                                        w.sibling = null, w = H
                                    } while (w !== null)
                                }
                            }
                            x = i
                        }
                    }
                    if ((i.subtreeFlags & 2064) !== 0 && l !== null) l.return = i, x = l;
                    else e: for (; x !== null;) {
                        if (i = x, (i.flags & 2048) !== 0) switch (i.tag) {
                            case 0:
                            case 11:
                            case 15:
                                Br(9, i, i.return)
                        }
                        var h = i.sibling;
                        if (h !== null) {
                            h.return = i.return, x = h;
                            break e
                        }
                        x = i.return
                    }
                }
                var c = e.current;
                for (x = c; x !== null;) {
                    l = x;
                    var y = l.child;
                    if ((l.subtreeFlags & 2064) !== 0 && y !== null) y.return = l, x = y;
                    else e: for (l = c; x !== null;) {
                        if (s = x, (s.flags & 2048) !== 0) try {
                            switch (s.tag) {
                                case 0:
                                case 11:
                                case 15:
                                    zi(9, s)
                            }
                        } catch (E) {
                            X(s, s.return, E)
                        }
                        if (s === l) {
                            x = null;
                            break e
                        }
                        var m = s.sibling;
                        if (m !== null) {
                            m.return = s.return, x = m;
                            break e
                        }
                        x = s.return
                    }
                }
                if (B = o, rn(), ft && typeof ft.onPostCommitFiberRoot == "function") try {
                    ft.onPostCommitFiberRoot(Ii, e)
                } catch {}
                r = !0
            }
            return r
        } finally {
            M = n, Qe.transition = t
        }
    }
    return !1
}

function Za(e, t, n) {
    t = tr(n, t), t = wd(e, t, 1), e = Gt(e, t, 1), t = Se(), e !== null && (lo(e, 1, t), Ne(e, t))
}

function X(e, t, n) {
    if (e.tag === 3) Za(e, e, n);
    else
        for (; t !== null;) {
            if (t.tag === 3) {
                Za(t, e, n);
                break
            } else if (t.tag === 1) {
                var r = t.stateNode;
                if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (Yt === null || !Yt.has(r))) {
                    e = tr(n, e), e = Sd(t, e, 1), t = Gt(t, e, 1), e = Se(), t !== null && (lo(t, 1, e), Ne(t, e));
                    break
                }
            }
            t = t.return
        }
}

function bh(e, t, n) {
    var r = e.pingCache;
    r !== null && r.delete(t), t = Se(), e.pingedLanes |= e.suspendedLanes & n, le === e && (ae & n) === n && (ne === 4 || ne === 3 && (ae & 130023424) === ae && 500 > J() - Tu ? gn(e, 0) : Au |= n), Ne(e, t)
}

function Fd(e, t) {
    t === 0 && ((e.mode & 1) === 0 ? t = 1 : (t = Eo, Eo <<= 1, (Eo & 130023424) === 0 && (Eo = 4194304)));
    var n = Se();
    e = _t(e, t), e !== null && (lo(e, t, n), Ne(e, n))
}

function Xh(e) {
    var t = e.memoizedState,
        n = 0;
    t !== null && (n = t.retryLane), Fd(e, n)
}

function Zh(e, t) {
    var n = 0;
    switch (e.tag) {
        case 13:
            var r = e.stateNode,
                o = e.memoizedState;
            o !== null && (n = o.retryLane);
            break;
        case 19:
            r = e.stateNode;
            break;
        default:
            throw Error(S(314))
    }
    r !== null && r.delete(t), Fd(e, n)
}
var Kd;
Kd = function(e, t, n) {
    if (e !== null)
        if (e.memoizedProps !== t.pendingProps || Te.current) Ae = !0;
        else {
            if ((e.lanes & n) === 0 && (t.flags & 128) === 0) return Ae = !1, $h(e, t, n);
            Ae = (e.flags & 131072) !== 0
        }
    else Ae = !1, W && (t.flags & 1048576) !== 0 && Of(t, ui, t.index);
    switch (t.lanes = 0, t.tag) {
        case 2:
            var r = t.type;
            Wo(e, t), e = t.pendingProps;
            var o = Zn(t, me.current);
            Gn(t, n), o = Su(null, t, r, e, o, n);
            var i = Eu();
            return t.flags |= 1, typeof o == "object" && o !== null && typeof o.render == "function" && o.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Ie(r) ? (i = !0, li(t)) : i = !1, t.memoizedState = o.state !== null && o.state !== void 0 ? o.state : null, yu(t), o.updater = Hi, t.stateNode = o, o._reactInternals = t, cs(t, r, e, n), t = ps(null, t, r, !0, i, n)) : (t.tag = 0, W && i && uu(t), ve(null, t, o, n), t = t.child), t;
        case 16:
            r = t.elementType;
            e: {
                switch (Wo(e, t), e = t.pendingProps, o = r._init, r = o(r._payload), t.type = r, o = t.tag = Jh(r), e = Je(r, e), o) {
                    case 0:
                        t = ds(null, t, r, e, n);
                        break e;
                    case 1:
                        t = Ka(null, t, r, e, n);
                        break e;
                    case 11:
                        t = Ma(null, t, r, e, n);
                        break e;
                    case 14:
                        t = Fa(null, t, r, Je(r.type, e), n);
                        break e
                }
                throw Error(S(306, r, ""))
            }
            return t;
        case 0:
            return r = t.type, o = t.pendingProps, o = t.elementType === r ? o : Je(r, o), ds(e, t, r, o, n);
        case 1:
            return r = t.type, o = t.pendingProps, o = t.elementType === r ? o : Je(r, o), Ka(e, t, r, o, n);
        case 3:
            e: {
                if (Cd(t), e === null) throw Error(S(387));r = t.pendingProps,
                i = t.memoizedState,
                o = i.element,
                Yf(e, t),
                fi(t, r, null, n);
                var l = t.memoizedState;
                if (r = l.element, i.isDehydrated)
                    if (i = {
                            element: r,
                            isDehydrated: !1,
                            cache: l.cache,
                            pendingSuspenseBoundaries: l.pendingSuspenseBoundaries,
                            transitions: l.transitions
                        }, t.updateQueue.baseState = i, t.memoizedState = i, t.flags & 256) {
                        o = tr(Error(S(423)), t), t = ja(e, t, r, n, o);
                        break e
                    } else if (r !== o) {
                    o = tr(Error(S(424)), t), t = ja(e, t, r, n, o);
                    break e
                } else
                    for (Be = Qt(t.stateNode.containerInfo.firstChild), ze = t, W = !0, tt = null, n = qf(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
                else {
                    if (qn(), r === o) {
                        t = At(e, t, n);
                        break e
                    }
                    ve(e, t, r, n)
                }
                t = t.child
            }
            return t;
        case 5:
            return Jf(t), e === null && ss(t), r = t.type, o = t.pendingProps, i = e !== null ? e.memoizedProps : null, l = o.children, ns(r, o) ? l = null : i !== null && ns(r, i) && (t.flags |= 32), xd(e, t), ve(e, t, l, n), t.child;
        case 6:
            return e === null && ss(t), null;
        case 13:
            return _d(e, t, n);
        case 4:
            return gu(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Jn(t, null, r, n) : ve(e, t, r, n), t.child;
        case 11:
            return r = t.type, o = t.pendingProps, o = t.elementType === r ? o : Je(r, o), Ma(e, t, r, o, n);
        case 7:
            return ve(e, t, t.pendingProps, n), t.child;
        case 8:
            return ve(e, t, t.pendingProps.children, n), t.child;
        case 12:
            return ve(e, t, t.pendingProps.children, n), t.child;
        case 10:
            e: {
                if (r = t.type._context, o = t.pendingProps, i = t.memoizedProps, l = o.value, j(ai, r._currentValue), r._currentValue = l, i !== null)
                    if (it(i.value, l)) {
                        if (i.children === o.children && !Te.current) {
                            t = At(e, t, n);
                            break e
                        }
                    } else
                        for (i = t.child, i !== null && (i.return = t); i !== null;) {
                            var s = i.dependencies;
                            if (s !== null) {
                                l = i.child;
                                for (var u = s.firstContext; u !== null;) {
                                    if (u.context === r) {
                                        if (i.tag === 1) {
                                            u = Et(-1, n & -n), u.tag = 2;
                                            var a = i.updateQueue;
                                            if (a !== null) {
                                                a = a.shared;
                                                var f = a.pending;
                                                f === null ? u.next = u : (u.next = f.next, f.next = u), a.pending = u
                                            }
                                        }
                                        i.lanes |= n, u = i.alternate, u !== null && (u.lanes |= n), us(i.return, n, t), s.lanes |= n;
                                        break
                                    }
                                    u = u.next
                                }
                            } else if (i.tag === 10) l = i.type === t.type ? null : i.child;
                            else if (i.tag === 18) {
                                if (l = i.return, l === null) throw Error(S(341));
                                l.lanes |= n, s = l.alternate, s !== null && (s.lanes |= n), us(l, n, t), l = i.sibling
                            } else l = i.child;
                            if (l !== null) l.return = i;
                            else
                                for (l = i; l !== null;) {
                                    if (l === t) {
                                        l = null;
                                        break
                                    }
                                    if (i = l.sibling, i !== null) {
                                        i.return = l.return, l = i;
                                        break
                                    }
                                    l = l.return
                                }
                            i = l
                        }
                ve(e, t, o.children, n),
                t = t.child
            }
            return t;
        case 9:
            return o = t.type, r = t.pendingProps.children, Gn(t, n), o = Ye(o), r = r(o), t.flags |= 1, ve(e, t, r, n), t.child;
        case 14:
            return r = t.type, o = Je(r, t.pendingProps), o = Je(r.type, o), Fa(e, t, r, o, n);
        case 15:
            return Ed(e, t, t.type, t.pendingProps, n);
        case 17:
            return r = t.type, o = t.pendingProps, o = t.elementType === r ? o : Je(r, o), Wo(e, t), t.tag = 1, Ie(r) ? (e = !0, li(t)) : e = !1, Gn(t, n), Xf(t, r, o), cs(t, r, o, n), ps(null, t, r, !0, e, n);
        case 19:
            return Ad(e, t, n);
        case 22:
            return kd(e, t, n)
    }
    throw Error(S(156, t.tag))
};

function jd(e, t) {
    return hf(e, t)
}

function qh(e, t, n, r) {
    this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null
}

function Oe(e, t, n, r) {
    return new qh(e, t, n, r)
}

function Lu(e) {
    return e = e.prototype, !(!e || !e.isReactComponent)
}

function Jh(e) {
    if (typeof e == "function") return Lu(e) ? 1 : 0;
    if (e != null) {
        if (e = e.$$typeof, e === Xs) return 11;
        if (e === Zs) return 14
    }
    return 2
}

function Xt(e, t) {
    var n = e.alternate;
    return n === null ? (n = Oe(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
        lanes: t.lanes,
        firstContext: t.firstContext
    }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n
}

function Yo(e, t, n, r, o, i) {
    var l = 2;
    if (r = e, typeof e == "function") Lu(e) && (l = 1);
    else if (typeof e == "string") l = 5;
    else e: switch (e) {
        case Rn:
            return mn(n.children, o, i, t);
        case bs:
            l = 8, o |= 8;
            break;
        case Hl:
            return e = Oe(12, n, t, o | 2), e.elementType = Hl, e.lanes = i, e;
        case Bl:
            return e = Oe(13, n, t, o), e.elementType = Bl, e.lanes = i, e;
        case zl:
            return e = Oe(19, n, t, o), e.elementType = zl, e.lanes = i, e;
        case Xc:
            return $i(n, o, i, t);
        default:
            if (typeof e == "object" && e !== null) switch (e.$$typeof) {
                case Yc:
                    l = 10;
                    break e;
                case bc:
                    l = 9;
                    break e;
                case Xs:
                    l = 11;
                    break e;
                case Zs:
                    l = 14;
                    break e;
                case Ut:
                    l = 16, r = null;
                    break e
            }
            throw Error(S(130, e == null ? e : typeof e, ""))
    }
    return t = Oe(l, n, t, o), t.elementType = e, t.type = r, t.lanes = i, t
}

function mn(e, t, n, r) {
    return e = Oe(7, e, r, t), e.lanes = n, e
}

function $i(e, t, n, r) {
    return e = Oe(22, e, r, t), e.elementType = Xc, e.lanes = n, e.stateNode = {
        isHidden: !1
    }, e
}

function Al(e, t, n) {
    return e = Oe(6, e, null, t), e.lanes = n, e
}

function Tl(e, t, n) {
    return t = Oe(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation
    }, t
}

function ey(e, t, n, r, o) {
    this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = sl(0), this.expirationTimes = sl(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = sl(0), this.identifierPrefix = r, this.onRecoverableError = o, this.mutableSourceEagerHydrationData = null
}

function Ru(e, t, n, r, o, i, l, s, u) {
    return e = new ey(e, t, n, s, u), t === 1 ? (t = 1, i === !0 && (t |= 8)) : t = 0, i = Oe(3, null, null, t), e.current = i, i.stateNode = e, i.memoizedState = {
        element: r,
        isDehydrated: n,
        cache: null,
        transitions: null,
        pendingSuspenseBoundaries: null
    }, yu(i), e
}

function ty(e, t, n) {
    var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
        $$typeof: Ln,
        key: r == null ? null : "" + r,
        children: e,
        containerInfo: t,
        implementation: n
    }
}

function Vd(e) {
    if (!e) return en;
    e = e._reactInternals;
    e: {
        if (An(e) !== e || e.tag !== 1) throw Error(S(170));
        var t = e;do {
            switch (t.tag) {
                case 3:
                    t = t.stateNode.context;
                    break e;
                case 1:
                    if (Ie(t.type)) {
                        t = t.stateNode.__reactInternalMemoizedMergedChildContext;
                        break e
                    }
            }
            t = t.return
        } while (t !== null);
        throw Error(S(171))
    }
    if (e.tag === 1) {
        var n = e.type;
        if (Ie(n)) return jf(e, n, t)
    }
    return t
}

function Od(e, t, n, r, o, i, l, s, u) {
    return e = Ru(n, r, !0, e, o, i, l, s, u), e.context = Vd(null), n = e.current, r = Se(), o = bt(n), i = Et(r, o), i.callback = t ?? null, Gt(n, i, o), e.current.lanes = o, lo(e, o, r), Ne(e, r), e
}

function Mi(e, t, n, r) {
    var o = t.current,
        i = Se(),
        l = bt(o);
    return n = Vd(n), t.context === null ? t.context = n : t.pendingContext = n, t = Et(i, l), t.payload = {
        element: e
    }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = Gt(o, t, l), e !== null && (ot(e, o, l, i), jo(e, o, l)), l
}

function wi(e) {
    if (e = e.current, !e.child) return null;
    switch (e.child.tag) {
        case 5:
            return e.child.stateNode;
        default:
            return e.child.stateNode
    }
}

function qa(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
        var n = e.retryLane;
        e.retryLane = n !== 0 && n < t ? n : t
    }
}

function Uu(e, t) {
    qa(e, t), (e = e.alternate) && qa(e, t)
}

function ny() {
    return null
}
var Wd = typeof reportError == "function" ? reportError : function(e) {
    console.error(e)
};

function Hu(e) {
    this._internalRoot = e
}
Fi.prototype.render = Hu.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(S(409));
    Mi(e, t, null, null)
};
Fi.prototype.unmount = Hu.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        xn(function() {
            Mi(null, e, null, null)
        }), t[Ct] = null
    }
};

function Fi(e) {
    this._internalRoot = e
}
Fi.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
        var t = Ef();
        e = {
            blockedOn: null,
            target: e,
            priority: t
        };
        for (var n = 0; n < zt.length && t !== 0 && t < zt[n].priority; n++);
        zt.splice(n, 0, e), n === 0 && xf(e)
    }
};

function Bu(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11)
}

function Ki(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
}

function Ja() {}

function ry(e, t, n, r, o) {
    if (o) {
        if (typeof r == "function") {
            var i = r;
            r = function() {
                var a = wi(l);
                i.call(a)
            }
        }
        var l = Od(t, r, e, 0, null, !1, !1, "", Ja);
        return e._reactRootContainer = l, e[Ct] = l.current, Gr(e.nodeType === 8 ? e.parentNode : e), xn(), l
    }
    for (; o = e.lastChild;) e.removeChild(o);
    if (typeof r == "function") {
        var s = r;
        r = function() {
            var a = wi(u);
            s.call(a)
        }
    }
    var u = Ru(e, 0, !1, null, null, !1, !1, "", Ja);
    return e._reactRootContainer = u, e[Ct] = u.current, Gr(e.nodeType === 8 ? e.parentNode : e), xn(function() {
        Mi(t, u, n, r)
    }), u
}

function ji(e, t, n, r, o) {
    var i = n._reactRootContainer;
    if (i) {
        var l = i;
        if (typeof o == "function") {
            var s = o;
            o = function() {
                var u = wi(l);
                s.call(u)
            }
        }
        Mi(t, l, e, o)
    } else l = ry(n, t, e, o, r);
    return wi(l)
}
wf = function(e) {
    switch (e.tag) {
        case 3:
            var t = e.stateNode;
            if (t.current.memoizedState.isDehydrated) {
                var n = Tr(t.pendingLanes);
                n !== 0 && (eu(t, n | 1), Ne(t, J()), (B & 6) === 0 && (nr = J() + 500, rn()))
            }
            break;
        case 13:
            xn(function() {
                var r = _t(e, 1);
                if (r !== null) {
                    var o = Se();
                    ot(r, e, 1, o)
                }
            }), Uu(e, 1)
    }
};
tu = function(e) {
    if (e.tag === 13) {
        var t = _t(e, 134217728);
        if (t !== null) {
            var n = Se();
            ot(t, e, 134217728, n)
        }
        Uu(e, 134217728)
    }
};
Sf = function(e) {
    if (e.tag === 13) {
        var t = bt(e),
            n = _t(e, t);
        if (n !== null) {
            var r = Se();
            ot(n, e, t, r)
        }
        Uu(e, t)
    }
};
Ef = function() {
    return M
};
kf = function(e, t) {
    var n = M;
    try {
        return M = e, t()
    } finally {
        M = n
    }
};
Ql = function(e, t, n) {
    switch (t) {
        case "input":
            if (Ml(e, n), t = n.name, n.type === "radio" && t != null) {
                for (n = e; n.parentNode;) n = n.parentNode;
                for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
                    var r = n[t];
                    if (r !== e && r.form === e.form) {
                        var o = Ri(r);
                        if (!o) throw Error(S(90));
                        qc(r), Ml(r, o)
                    }
                }
            }
            break;
        case "textarea":
            ef(e, n);
            break;
        case "select":
            t = n.value, t != null && Vn(e, !!n.multiple, t, !1)
    }
};
uf = Iu;
af = xn;
var oy = {
        usingClientEntryPoint: !1,
        Events: [uo, zn, Ri, lf, sf, Iu]
    },
    Er = {
        findFiberByHostInstance: fn,
        bundleType: 0,
        version: "18.2.0",
        rendererPackageName: "react-dom"
    },
    iy = {
        bundleType: Er.bundleType,
        version: Er.version,
        rendererPackageName: Er.rendererPackageName,
        rendererConfig: Er.rendererConfig,
        overrideHookState: null,
        overrideHookStateDeletePath: null,
        overrideHookStateRenamePath: null,
        overrideProps: null,
        overridePropsDeletePath: null,
        overridePropsRenamePath: null,
        setErrorHandler: null,
        setSuspenseHandler: null,
        scheduleUpdate: null,
        currentDispatcherRef: Tt.ReactCurrentDispatcher,
        findHostInstanceByFiber: function(e) {
            return e = df(e), e === null ? null : e.stateNode
        },
        findFiberByHostInstance: Er.findFiberByHostInstance || ny,
        findHostInstancesForRefresh: null,
        scheduleRefresh: null,
        scheduleRoot: null,
        setRefreshHandler: null,
        getCurrentFiber: null,
        reconcilerVersion: "18.2.0-next-9e3b772b8-20220608"
    };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Ro = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Ro.isDisabled && Ro.supportsFiber) try {
        Ii = Ro.inject(iy), ft = Ro
    } catch {}
}
$e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = oy;
$e.createPortal = function(e, t) {
    var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!Bu(t)) throw Error(S(200));
    return ty(e, t, null, n)
};
$e.createRoot = function(e, t) {
    if (!Bu(e)) throw Error(S(299));
    var n = !1,
        r = "",
        o = Wd;
    return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (o = t.onRecoverableError)), t = Ru(e, 1, !1, null, null, n, !1, r, o), e[Ct] = t.current, Gr(e.nodeType === 8 ? e.parentNode : e), new Hu(t)
};
$e.findDOMNode = function(e) {
    if (e == null) return null;
    if (e.nodeType === 1) return e;
    var t = e._reactInternals;
    if (t === void 0) throw typeof e.render == "function" ? Error(S(188)) : (e = Object.keys(e).join(","), Error(S(268, e)));
    return e = df(t), e = e === null ? null : e.stateNode, e
};
$e.flushSync = function(e) {
    return xn(e)
};
$e.hydrate = function(e, t, n) {
    if (!Ki(t)) throw Error(S(200));
    return ji(null, e, t, !0, n)
};
$e.hydrateRoot = function(e, t, n) {
    if (!Bu(e)) throw Error(S(405));
    var r = n != null && n.hydratedSources || null,
        o = !1,
        i = "",
        l = Wd;
    if (n != null && (n.unstable_strictMode === !0 && (o = !0), n.identifierPrefix !== void 0 && (i = n.identifierPrefix), n.onRecoverableError !== void 0 && (l = n.onRecoverableError)), t = Od(t, null, e, 1, n ?? null, o, !1, i, l), e[Ct] = t.current, Gr(e), r)
        for (e = 0; e < r.length; e++) n = r[e], o = n._getVersion, o = o(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, o] : t.mutableSourceEagerHydrationData.push(n, o);
    return new Fi(t)
};
$e.render = function(e, t, n) {
    if (!Ki(t)) throw Error(S(200));
    return ji(null, e, t, !1, n)
};
$e.unmountComponentAtNode = function(e) {
    if (!Ki(e)) throw Error(S(40));
    return e._reactRootContainer ? (xn(function() {
        ji(null, null, e, !1, function() {
            e._reactRootContainer = null, e[Ct] = null
        })
    }), !0) : !1
};
$e.unstable_batchedUpdates = Iu;
$e.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
    if (!Ki(n)) throw Error(S(200));
    if (e == null || e._reactInternals === void 0) throw Error(S(38));
    return ji(e, t, n, !1, r)
};
$e.version = "18.2.0-next-9e3b772b8-20220608";
(function(e) {
    function t() {
        if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t)
        } catch (n) {
            console.error(n)
        }
    }
    t(), e.exports = $e
})(Vc);
var ec = Vc.exports;
Rl.createRoot = ec.createRoot, Rl.hydrateRoot = ec.hydrateRoot;
const ly = {},
    sy = Object.freeze(Object.defineProperty({
        __proto__: null,
        default: ly
    }, Symbol.toStringTag, {
        value: "Module"
    })); /*! noble-secp256k1 - MIT License (c) 2019 Paul Miller (paulmillr.com) */
const D = BigInt(0),
    Q = BigInt(1),
    Ft = BigInt(2),
    $r = BigInt(3),
    uy = BigInt(8),
    K = Object.freeze({
        a: D,
        b: BigInt(7),
        P: BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"),
        n: BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"),
        h: Q,
        Gx: BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),
        Gy: BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),
        beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee")
    });

function tc(e) {
    const {
        a: t,
        b: n
    } = K, r = C(e * e), o = C(r * e);
    return C(o + t * e + n)
}
const Uo = K.a === D;
class Qd extends Error {
    constructor(t) {
        super(t)
    }
}
class $ {
    constructor(t, n, r) {
        this.x = t, this.y = n, this.z = r
    }
    static fromAffine(t) {
        if (!(t instanceof z)) throw new TypeError("JacobianPoint#fromAffine: expected Point");
        return new $(t.x, t.y, Q)
    }
    static toAffineBatch(t) {
        const n = py(t.map(r => r.z));
        return t.map((r, o) => r.toAffine(n[o]))
    }
    static normalizeZ(t) {
        return $.toAffineBatch(t).map($.fromAffine)
    }
    equals(t) {
        if (!(t instanceof $)) throw new TypeError("JacobianPoint expected");
        const {
            x: n,
            y: r,
            z: o
        } = this, {
            x: i,
            y: l,
            z: s
        } = t, u = C(o * o), a = C(s * s), f = C(n * a), d = C(i * u), p = C(C(r * s) * a), g = C(C(l * o) * u);
        return f === d && p === g
    }
    negate() {
        return new $(this.x, C(-this.y), this.z)
    }
    double() {
        const {
            x: t,
            y: n,
            z: r
        } = this, o = C(t * t), i = C(n * n), l = C(i * i), s = t + i, u = C(Ft * (C(s * s) - o - l)), a = C($r * o), f = C(a * a), d = C(f - Ft * u), p = C(a * (u - d) - uy * l), g = C(Ft * n * r);
        return new $(d, p, g)
    }
    add(t) {
        if (!(t instanceof $)) throw new TypeError("JacobianPoint expected");
        const {
            x: n,
            y: r,
            z: o
        } = this, {
            x: i,
            y: l,
            z: s
        } = t;
        if (i === D || l === D) return this;
        if (n === D || r === D) return t;
        const u = C(o * o),
            a = C(s * s),
            f = C(n * a),
            d = C(i * u),
            p = C(C(r * s) * a),
            g = C(C(l * o) * u),
            v = C(d - f),
            w = C(g - p);
        if (v === D) return w === D ? this.double() : $.ZERO;
        const H = C(v * v),
            h = C(v * H),
            c = C(f * H),
            y = C(w * w - h - Ft * c),
            m = C(w * (c - y) - p * h),
            E = C(o * s * v);
        return new $(y, m, E)
    }
    subtract(t) {
        return this.add(t.negate())
    }
    multiplyUnsafe(t) {
        const n = $.ZERO;
        if (typeof t == "bigint" && t === D) return n;
        let r = oc(t);
        if (r === Q) return this;
        if (!Uo) {
            let d = n,
                p = this;
            for (; r > D;) r & Q && (d = d.add(p)), p = p.double(), r >>= Q;
            return d
        }
        let {
            k1neg: o,
            k1: i,
            k2neg: l,
            k2: s
        } = lc(r), u = n, a = n, f = this;
        for (; i > D || s > D;) i & Q && (u = u.add(f)), s & Q && (a = a.add(f)), f = f.double(), i >>= Q, s >>= Q;
        return o && (u = u.negate()), l && (a = a.negate()), a = new $(C(a.x * K.beta), a.y, a.z), u.add(a)
    }
    precomputeWindow(t) {
        const n = Uo ? 128 / t + 1 : 256 / t + 1,
            r = [];
        let o = this,
            i = o;
        for (let l = 0; l < n; l++) {
            i = o, r.push(i);
            for (let s = 1; s < 2 ** (t - 1); s++) i = i.add(o), r.push(i);
            o = i.double()
        }
        return r
    }
    wNAF(t, n) {
        !n && this.equals($.BASE) && (n = z.BASE);
        const r = n && n._WINDOW_SIZE || 1;
        if (256 % r) throw new Error("Point#wNAF: Invalid precomputation window, must be power of 2");
        let o = n && _s.get(n);
        o || (o = this.precomputeWindow(r), n && r !== 1 && (o = $.normalizeZ(o), _s.set(n, o)));
        let i = $.ZERO,
            l = $.ZERO;
        const s = 1 + (Uo ? 128 / r : 256 / r),
            u = 2 ** (r - 1),
            a = BigInt(2 ** r - 1),
            f = 2 ** r,
            d = BigInt(r);
        for (let p = 0; p < s; p++) {
            const g = p * u;
            let v = Number(t & a);
            if (t >>= d, v > u && (v -= f, t += Q), v === 0) {
                let w = o[g];
                p % 2 && (w = w.negate()), l = l.add(w)
            } else {
                let w = o[g + Math.abs(v) - 1];
                v < 0 && (w = w.negate()), i = i.add(w)
            }
        }
        return {
            p: i,
            f: l
        }
    }
    multiply(t, n) {
        let r = oc(t),
            o, i;
        if (Uo) {
            const {
                k1neg: l,
                k1: s,
                k2neg: u,
                k2: a
            } = lc(r);
            let {
                p: f,
                f: d
            } = this.wNAF(s, n), {
                p,
                f: g
            } = this.wNAF(a, n);
            l && (f = f.negate()), u && (p = p.negate()), p = new $(C(p.x * K.beta), p.y, p.z), o = f.add(p), i = d.add(g)
        } else {
            const {
                p: l,
                f: s
            } = this.wNAF(r, n);
            o = l, i = s
        }
        return $.normalizeZ([o, i])[0]
    }
    toAffine(t = Vi(this.z)) {
        const {
            x: n,
            y: r,
            z: o
        } = this, i = t, l = C(i * i), s = C(l * i), u = C(n * l), a = C(r * s);
        if (C(o * i) !== Q) throw new Error("invZ was invalid");
        return new z(u, a)
    }
}
$.BASE = new $(K.Gx, K.Gy, Q);
$.ZERO = new $(D, Q, D);
const _s = new WeakMap;
class z {
    constructor(t, n) {
        this.x = t, this.y = n
    }
    _setWindowSize(t) {
        this._WINDOW_SIZE = t, _s.delete(this)
    }
    hasEvenY() {
        return this.y % Ft === D
    }
    static fromCompressedHex(t) {
        const n = t.length === 32,
            r = Ge(n ? t : t.subarray(1));
        if (!bo(r)) throw new Error("Point is not on curve");
        const o = tc(r);
        let i = dy(o);
        const l = (i & Q) === Q;
        n ? l && (i = C(-i)) : (t[0] & 1) === 1 !== l && (i = C(-i));
        const s = new z(r, i);
        return s.assertValidity(), s
    }
    static fromUncompressedHex(t) {
        const n = Ge(t.subarray(1, 33)),
            r = Ge(t.subarray(33, 65)),
            o = new z(n, r);
        return o.assertValidity(), o
    }
    static fromHex(t) {
        const n = Cn(t),
            r = n.length,
            o = n[0];
        if (r === 32 || r === 33 && (o === 2 || o === 3)) return this.fromCompressedHex(n);
        if (r === 65 && o === 4) return this.fromUncompressedHex(n);
        throw new Error(`Point.fromHex: received invalid point. Expected 32-33 compressed bytes or 65 uncompressed bytes, not ${r}`)
    }
    static fromPrivateKey(t) {
        return z.BASE.multiply(or(t))
    }
    static fromSignature(t, n, r) {
        t = Cn(t);
        const o = yy(t),
            {
                r: i,
                s: l
            } = gy(n);
        if (r !== 0 && r !== 1) throw new Error("Cannot recover signature: invalid recovery bit");
        const s = r & 1 ? "03" : "02",
            u = z.fromHex(s + Zt(i)),
            {
                n: a
            } = K,
            f = Vi(i, a),
            d = C(-o * f, a),
            p = C(l * f, a),
            g = z.BASE.multiplyAndAddUnsafe(u, d, p);
        if (!g) throw new Error("Cannot recover signature: point at infinify");
        return g.assertValidity(), g
    }
    toRawBytes(t = !1) {
        return qt(this.toHex(t))
    }
    toHex(t = !1) {
        const n = Zt(this.x);
        return t ? `${this.hasEvenY()?"02":"03"}${n}` : `04${n}${Zt(this.y)}`
    }
    toHexX() {
        return this.toHex(!0).slice(2)
    }
    toRawX() {
        return this.toRawBytes(!0).slice(1)
    }
    assertValidity() {
        const t = "Point is not on elliptic curve",
            {
                x: n,
                y: r
            } = this;
        if (!bo(n) || !bo(r)) throw new Error(t);
        const o = C(r * r),
            i = tc(n);
        if (C(o - i) !== D) throw new Error(t)
    }
    equals(t) {
        return this.x === t.x && this.y === t.y
    }
    negate() {
        return new z(this.x, C(-this.y))
    }
    double() {
        return $.fromAffine(this).double().toAffine()
    }
    add(t) {
        return $.fromAffine(this).add($.fromAffine(t)).toAffine()
    }
    subtract(t) {
        return this.add(t.negate())
    }
    multiply(t) {
        return $.fromAffine(this).multiply(t, this).toAffine()
    }
    multiplyAndAddUnsafe(t, n, r) {
        const o = $.fromAffine(this),
            i = n === D || n === Q || this !== z.BASE ? o.multiplyUnsafe(n) : o.multiply(n),
            l = $.fromAffine(t).multiplyUnsafe(r),
            s = i.add(l);
        return s.equals($.ZERO) ? void 0 : s.toAffine()
    }
}
z.BASE = new z(K.Gx, K.Gy);
z.ZERO = new z(D, D);

function nc(e) {
    return Number.parseInt(e[0], 16) >= 8 ? "00" + e : e
}

function rc(e) {
    if (e.length < 2 || e[0] !== 2) throw new Error(`Invalid signature integer tag: ${rr(e)}`);
    const t = e[1],
        n = e.subarray(2, t + 2);
    if (!t || n.length !== t) throw new Error("Invalid signature integer: wrong length");
    if (n[0] === 0 && n[1] <= 127) throw new Error("Invalid signature integer: trailing length");
    return {
        data: Ge(n),
        left: e.subarray(t + 2)
    }
}

function ay(e) {
    if (e.length < 2 || e[0] != 48) throw new Error(`Invalid signature tag: ${rr(e)}`);
    if (e[1] !== e.length - 2) throw new Error("Invalid signature: incorrect length");
    const {
        data: t,
        left: n
    } = rc(e.subarray(2)), {
        data: r,
        left: o
    } = rc(n);
    if (o.length) throw new Error(`Invalid signature: left bytes after parsing: ${rr(o)}`);
    return {
        r: t,
        s: r
    }
}
class vn {
    constructor(t, n) {
        this.r = t, this.s = n, this.assertValidity()
    }
    static fromCompact(t) {
        const n = t instanceof Uint8Array,
            r = "Signature.fromCompact";
        if (typeof t != "string" && !n) throw new TypeError(`${r}: Expected string or Uint8Array`);
        const o = n ? rr(t) : t;
        if (o.length !== 128) throw new Error(`${r}: Expected 64-byte hex`);
        return new vn(Si(o.slice(0, 64)), Si(o.slice(64, 128)))
    }
    static fromDER(t) {
        const n = t instanceof Uint8Array;
        if (typeof t != "string" && !n) throw new TypeError("Signature.fromDER: Expected string or Uint8Array");
        const {
            r,
            s: o
        } = ay(n ? t : qt(t));
        return new vn(r, o)
    }
    static fromHex(t) {
        return this.fromDER(t)
    }
    assertValidity() {
        const {
            r: t,
            s: n
        } = this;
        if (!ro(t)) throw new Error("Invalid Signature: r must be 0 < r < n");
        if (!ro(n)) throw new Error("Invalid Signature: s must be 0 < s < n")
    }
    hasHighS() {
        const t = K.n >> Q;
        return this.s > t
    }
    normalizeS() {
        return this.hasHighS() ? new vn(this.r, K.n - this.s) : this
    }
    toDERRawBytes(t = !1) {
        return qt(this.toDERHex(t))
    }
    toDERHex(t = !1) {
        const n = nc(xr(this.s));
        if (t) return n;
        const r = nc(xr(this.r)),
            o = xr(r.length / 2),
            i = xr(n.length / 2);
        return `30${xr(r.length/2+n.length/2+4)}02${o}${r}02${i}${n}`
    }
    toRawBytes() {
        return this.toDERRawBytes()
    }
    toHex() {
        return this.toDERHex()
    }
    toCompactRawBytes() {
        return qt(this.toCompactHex())
    }
    toCompactHex() {
        return Zt(this.r) + Zt(this.s)
    }
}

function kr(...e) {
    if (!e.every(r => r instanceof Uint8Array)) throw new Error("Uint8Array list expected");
    if (e.length === 1) return e[0];
    const t = e.reduce((r, o) => r + o.length, 0),
        n = new Uint8Array(t);
    for (let r = 0, o = 0; r < e.length; r++) {
        const i = e[r];
        n.set(i, o), o += i.length
    }
    return n
}
const cy = Array.from({
    length: 256
}, (e, t) => t.toString(16).padStart(2, "0"));

function rr(e) {
    if (!(e instanceof Uint8Array)) throw new Error("Expected Uint8Array");
    let t = "";
    for (let n = 0; n < e.length; n++) t += cy[e[n]];
    return t
}
const fy = BigInt("0x10000000000000000000000000000000000000000000000000000000000000000");

function Zt(e) {
    if (typeof e != "bigint") throw new Error("Expected bigint");
    if (!(D <= e && e < fy)) throw new Error("Expected number < 2^256");
    return e.toString(16).padStart(64, "0")
}

function no(e) {
    const t = qt(Zt(e));
    if (t.length !== 32) throw new Error("Error: expected 32 bytes");
    return t
}

function xr(e) {
    const t = e.toString(16);
    return t.length & 1 ? `0${t}` : t
}

function Si(e) {
    if (typeof e != "string") throw new TypeError("hexToNumber: expected string, got " + typeof e);
    return BigInt(`0x${e}`)
}

function qt(e) {
    if (typeof e != "string") throw new TypeError("hexToBytes: expected string, got " + typeof e);
    if (e.length % 2) throw new Error("hexToBytes: received invalid unpadded hex" + e.length);
    const t = new Uint8Array(e.length / 2);
    for (let n = 0; n < t.length; n++) {
        const r = n * 2,
            o = e.slice(r, r + 2),
            i = Number.parseInt(o, 16);
        if (Number.isNaN(i) || i < 0) throw new Error("Invalid byte sequence");
        t[n] = i
    }
    return t
}

function Ge(e) {
    return Si(rr(e))
}

function Cn(e) {
    return e instanceof Uint8Array ? Uint8Array.from(e) : qt(e)
}

function oc(e) {
    if (typeof e == "number" && Number.isSafeInteger(e) && e > 0) return BigInt(e);
    if (typeof e == "bigint" && ro(e)) return e;
    throw new TypeError("Expected valid private scalar: 0 < scalar < curve.n")
}

function C(e, t = K.P) {
    const n = e % t;
    return n >= D ? n : t + n
}

function Ke(e, t) {
    const {
        P: n
    } = K;
    let r = e;
    for (; t-- > D;) r *= r, r %= n;
    return r
}

function dy(e) {
    const {
        P: t
    } = K, n = BigInt(6), r = BigInt(11), o = BigInt(22), i = BigInt(23), l = BigInt(44), s = BigInt(88), u = e * e * e % t, a = u * u * e % t, f = Ke(a, $r) * a % t, d = Ke(f, $r) * a % t, p = Ke(d, Ft) * u % t, g = Ke(p, r) * p % t, v = Ke(g, o) * g % t, w = Ke(v, l) * v % t, H = Ke(w, s) * w % t, h = Ke(H, l) * v % t, c = Ke(h, $r) * a % t, y = Ke(c, i) * g % t, m = Ke(y, n) * u % t;
    return Ke(m, Ft)
}

function Vi(e, t = K.P) {
    if (e === D || t <= D) throw new Error(`invert: expected positive integers, got n=${e} mod=${t}`);
    let n = C(e, t),
        r = t,
        o = D,
        i = Q;
    for (; n !== D;) {
        const s = r / n,
            u = r % n,
            a = o - i * s;
        r = n, n = u, o = i, i = a
    }
    if (r !== Q) throw new Error("invert: does not exist");
    return C(o, t)
}

function py(e, t = K.P) {
    const n = new Array(e.length),
        r = e.reduce((i, l, s) => l === D ? i : (n[s] = i, C(i * l, t)), Q),
        o = Vi(r, t);
    return e.reduceRight((i, l, s) => l === D ? i : (n[s] = C(i * n[s], t), C(i * l, t)), o), n
}
const ic = (e, t) => (e + t / Ft) / t,
    hy = {
        a1: BigInt("0x3086d221a7d46bcde86c90e49284eb15"),
        b1: -Q * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"),
        a2: BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"),
        b2: BigInt("0x3086d221a7d46bcde86c90e49284eb15"),
        POW_2_128: BigInt("0x100000000000000000000000000000000")
    };

function lc(e) {
    const {
        n: t
    } = K, {
        a1: n,
        b1: r,
        a2: o,
        b2: i,
        POW_2_128: l
    } = hy, s = ic(i * e, t), u = ic(-r * e, t);
    let a = C(e - s * n - u * o, t),
        f = C(-s * r - u * i, t);
    const d = a > l,
        p = f > l;
    if (d && (a = t - a), p && (f = t - f), a > l || f > l) throw new Error("splitScalarEndo: Endomorphism failed, k=" + e);
    return {
        k1neg: d,
        k1: a,
        k2neg: p,
        k2: f
    }
}

function yy(e) {
    const {
        n: t
    } = K, r = e.length * 8 - 256;
    let o = Ge(e);
    return r > 0 && (o = o >> BigInt(r)), o >= t && (o -= t), o
}
let bn, Il;

function ro(e) {
    return D < e && e < K.n
}

function bo(e) {
    return D < e && e < K.P
}

function or(e) {
    let t;
    if (typeof e == "bigint") t = e;
    else if (typeof e == "number" && Number.isSafeInteger(e) && e > 0) t = BigInt(e);
    else if (typeof e == "string") {
        if (e.length !== 64) throw new Error("Expected 32 bytes of private key");
        t = Si(e)
    } else if (e instanceof Uint8Array) {
        if (e.length !== 32) throw new Error("Expected 32 bytes of private key");
        t = Ge(e)
    } else throw new TypeError("Expected valid private key");
    if (!ro(t)) throw new Error("Expected private key: 0 < key < n");
    return t
}

function Gd(e) {
    return e instanceof z ? (e.assertValidity(), e) : z.fromHex(e)
}

function gy(e) {
    if (e instanceof vn) return e.assertValidity(), e;
    try {
        return vn.fromDER(e)
    } catch {
        return vn.fromCompact(e)
    }
}

function my(e, t = !1) {
    return z.fromPrivateKey(e).toRawBytes(t)
}

function sc(e) {
    const t = e instanceof Uint8Array,
        n = typeof e == "string",
        r = (t || n) && e.length;
    return t ? r === 33 || r === 65 : n ? r === 66 || r === 130 : e instanceof z
}

function Yd(e, t, n = !1) {
    if (sc(e)) throw new TypeError("getSharedSecret: first arg must be private key");
    if (!sc(t)) throw new TypeError("getSharedSecret: second arg must be public key");
    const r = Gd(t);
    return r.assertValidity(), r.multiply(or(e)).toRawBytes(n)
}

function Ei(e) {
    return C(Ge(e), K.n)
}
class ir {
    constructor(t, n) {
        this.r = t, this.s = n, this.assertValidity()
    }
    static fromHex(t) {
        const n = Cn(t);
        if (n.length !== 64) throw new TypeError(`SchnorrSignature.fromHex: expected 64 bytes, not ${n.length}`);
        const r = Ge(n.subarray(0, 32)),
            o = Ge(n.subarray(32, 64));
        return new ir(r, o)
    }
    assertValidity() {
        const {
            r: t,
            s: n
        } = this;
        if (!bo(t) || !ro(n)) throw new Error("Invalid signature")
    }
    toHex() {
        return Zt(this.r) + Zt(this.s)
    }
    toRawBytes() {
        return qt(this.toHex())
    }
}

function vy(e) {
    return z.fromPrivateKey(e).toRawX()
}
class bd {
    constructor(t, n, r = we.randomBytes()) {
        if (t == null) throw new TypeError(`sign: Expected valid message, not "${t}"`);
        this.m = Cn(t);
        const {
            x: o,
            scalar: i
        } = this.getScalar(or(n));
        if (this.px = o, this.d = i, this.rand = Cn(r), this.rand.length !== 32) throw new TypeError("sign: Expected 32 bytes of aux randomness")
    }
    getScalar(t) {
        const n = z.fromPrivateKey(t),
            r = n.hasEvenY() ? t : K.n - t;
        return {
            point: n,
            scalar: r,
            x: n.toRawX()
        }
    }
    initNonce(t, n) {
        return no(t ^ Ge(n))
    }
    finalizeNonce(t) {
        const n = C(Ge(t), K.n);
        if (n === D) throw new Error("sign: Creation of signature failed. k is zero");
        const {
            point: r,
            x: o,
            scalar: i
        } = this.getScalar(n);
        return {
            R: r,
            rx: o,
            k: i
        }
    }
    finalizeSig(t, n, r, o) {
        return new ir(t.x, C(n + r * o, K.n)).toRawBytes()
    }
    error() {
        throw new Error("sign: Invalid signature produced")
    }
    async calc() {
        const {
            m: t,
            d: n,
            px: r,
            rand: o
        } = this, i = we.taggedHash, l = this.initNonce(n, await i(Bt.aux, o)), {
            R: s,
            rx: u,
            k: a
        } = this.finalizeNonce(await i(Bt.nonce, l, r, t)), f = Ei(await i(Bt.challenge, u, r, t)), d = this.finalizeSig(s, a, f, n);
        return await qd(d, t, r) || this.error(), d
    }
    calcSync() {
        const {
            m: t,
            d: n,
            px: r,
            rand: o
        } = this, i = we.taggedHashSync, l = this.initNonce(n, i(Bt.aux, o)), {
            R: s,
            rx: u,
            k: a
        } = this.finalizeNonce(i(Bt.nonce, l, r, t)), f = Ei(i(Bt.challenge, u, r, t)), d = this.finalizeSig(s, a, f, n);
        return Jd(d, t, r) || this.error(), d
    }
}
async function wy(e, t, n) {
    return new bd(e, t, n).calc()
}

function Sy(e, t, n) {
    return new bd(e, t, n).calcSync()
}

function Xd(e, t, n) {
    const r = e instanceof ir,
        o = r ? e : ir.fromHex(e);
    return r && o.assertValidity(), {
        ...o,
        m: Cn(t),
        P: Gd(n)
    }
}

function Zd(e, t, n, r) {
    const o = z.BASE.multiplyAndAddUnsafe(t, or(n), C(-r, K.n));
    return !(!o || !o.hasEvenY() || o.x !== e)
}
async function qd(e, t, n) {
    try {
        const {
            r,
            s: o,
            m: i,
            P: l
        } = Xd(e, t, n), s = Ei(await we.taggedHash(Bt.challenge, no(r), l.toRawX(), i));
        return Zd(r, l, o, s)
    } catch {
        return !1
    }
}

function Jd(e, t, n) {
    try {
        const {
            r,
            s: o,
            m: i,
            P: l
        } = Xd(e, t, n), s = Ei(we.taggedHashSync(Bt.challenge, no(r), l.toRawX(), i));
        return Zd(r, l, o, s)
    } catch (r) {
        if (r instanceof Qd) throw r;
        return !1
    }
}
const Ey = {
    Signature: ir,
    getPublicKey: vy,
    sign: wy,
    verify: qd,
    signSync: Sy,
    verifySync: Jd
};
z.BASE._setWindowSize(8);
const Le = {
        node: sy,
        web: typeof self == "object" && "crypto" in self ? self.crypto : void 0
    },
    Bt = {
        challenge: "BIP0340/challenge",
        aux: "BIP0340/aux",
        nonce: "BIP0340/nonce"
    },
    Ho = {},
    we = {
        bytesToHex: rr,
        hexToBytes: qt,
        concatBytes: kr,
        mod: C,
        invert: Vi,
        isValidPrivateKey(e) {
            try {
                return or(e), !0
            } catch {
                return !1
            }
        },
        _bigintTo32Bytes: no,
        _normalizePrivateKey: or,
        hashToPrivateKey: e => {
            if (e = Cn(e), e.length < 40 || e.length > 1024) throw new Error("Expected 40-1024 bytes of private key as per FIPS 186");
            const t = C(Ge(e), K.n - Q) + Q;
            return no(t)
        },
        randomBytes: (e = 32) => {
            if (Le.web) return Le.web.getRandomValues(new Uint8Array(e));
            if (Le.node) {
                const {
                    randomBytes: t
                } = Le.node;
                return Uint8Array.from(t(e))
            } else throw new Error("The environment doesn't have randomBytes function")
        },
        randomPrivateKey: () => we.hashToPrivateKey(we.randomBytes(40)),
        sha256: async (...e) => {
            if (Le.web) {
                const t = await Le.web.subtle.digest("SHA-256", kr(...e));
                return new Uint8Array(t)
            } else if (Le.node) {
                const {
                    createHash: t
                } = Le.node, n = t("sha256");
                return e.forEach(r => n.update(r)), Uint8Array.from(n.digest())
            } else throw new Error("The environment doesn't have sha256 function")
        },
        hmacSha256: async (e, ...t) => {
            if (Le.web) {
                const n = await Le.web.subtle.importKey("raw", e, {
                        name: "HMAC",
                        hash: {
                            name: "SHA-256"
                        }
                    }, !1, ["sign"]),
                    r = kr(...t),
                    o = await Le.web.subtle.sign("HMAC", n, r);
                return new Uint8Array(o)
            } else if (Le.node) {
                const {
                    createHmac: n
                } = Le.node, r = n("sha256", e);
                return t.forEach(o => r.update(o)), Uint8Array.from(r.digest())
            } else throw new Error("The environment doesn't have hmac-sha256 function")
        },
        sha256Sync: void 0,
        hmacSha256Sync: void 0,
        taggedHash: async (e, ...t) => {
            let n = Ho[e];
            if (n === void 0) {
                const r = await we.sha256(Uint8Array.from(e, o => o.charCodeAt(0)));
                n = kr(r, r), Ho[e] = n
            }
            return we.sha256(n, ...t)
        },
        taggedHashSync: (e, ...t) => {
            if (typeof bn != "function") throw new Qd("sha256Sync is undefined, you need to set it");
            let n = Ho[e];
            if (n === void 0) {
                const r = bn(Uint8Array.from(e, o => o.charCodeAt(0)));
                n = kr(r, r), Ho[e] = n
            }
            return bn(n, ...t)
        },
        precompute(e = 8, t = z.BASE) {
            const n = t === z.BASE ? t : new z(t.x, t.y);
            return n._setWindowSize(e), n.multiply($r), n
        }
    };
Object.defineProperties(we, {
    sha256Sync: {
        configurable: !1,
        get() {
            return bn
        },
        set(e) {
            bn || (bn = e)
        }
    },
    hmacSha256Sync: {
        configurable: !1,
        get() {
            return Il
        },
        set(e) {
            Il || (Il = e)
        }
    }
}); /*! scure-base - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function Tn(e) {
    if (!Number.isSafeInteger(e)) throw new Error(`Wrong integer: ${e}`)
}

function yt(...e) {
    const t = (o, i) => l => o(i(l)),
        n = Array.from(e).reverse().reduce((o, i) => o ? t(o, i.encode) : i.encode, void 0),
        r = e.reduce((o, i) => o ? t(o, i.decode) : i.decode, void 0);
    return {
        encode: n,
        decode: r
    }
}

function It(e) {
    return {
        encode: t => {
            if (!Array.isArray(t) || t.length && typeof t[0] != "number") throw new Error("alphabet.encode input should be an array of numbers");
            return t.map(n => {
                if (Tn(n), n < 0 || n >= e.length) throw new Error(`Digit index outside alphabet: ${n} (alphabet: ${e.length})`);
                return e[n]
            })
        },
        decode: t => {
            if (!Array.isArray(t) || t.length && typeof t[0] != "string") throw new Error("alphabet.decode input should be array of strings");
            return t.map(n => {
                if (typeof n != "string") throw new Error(`alphabet.decode: not string element=${n}`);
                const r = e.indexOf(n);
                if (r === -1) throw new Error(`Unknown letter: "${n}". Allowed: ${e}`);
                return r
            })
        }
    }
}

function Nt(e = "") {
    if (typeof e != "string") throw new Error("join separator should be string");
    return {
        encode: t => {
            if (!Array.isArray(t) || t.length && typeof t[0] != "string") throw new Error("join.encode input should be array of strings");
            for (let n of t)
                if (typeof n != "string") throw new Error(`join.encode: non-string input=${n}`);
            return t.join(e)
        },
        decode: t => {
            if (typeof t != "string") throw new Error("join.decode input should be string");
            return t.split(e)
        }
    }
}

function Oi(e, t = "=") {
    if (Tn(e), typeof t != "string") throw new Error("padding chr should be string");
    return {
        encode(n) {
            if (!Array.isArray(n) || n.length && typeof n[0] != "string") throw new Error("padding.encode input should be array of strings");
            for (let r of n)
                if (typeof r != "string") throw new Error(`padding.encode: non-string input=${r}`);
            for (; n.length * e % 8;) n.push(t);
            return n
        },
        decode(n) {
            if (!Array.isArray(n) || n.length && typeof n[0] != "string") throw new Error("padding.encode input should be array of strings");
            for (let o of n)
                if (typeof o != "string") throw new Error(`padding.decode: non-string input=${o}`);
            let r = n.length;
            if (r * e % 8) throw new Error("Invalid padding: string should have whole number of bytes");
            for (; r > 0 && n[r - 1] === t; r--)
                if (!((r - 1) * e % 8)) throw new Error("Invalid padding: string has too much padding");
            return n.slice(0, r)
        }
    }
}

function ep(e) {
    if (typeof e != "function") throw new Error("normalize fn should be function");
    return {
        encode: t => t,
        decode: t => e(t)
    }
}

function uc(e, t, n) {
    if (t < 2) throw new Error(`convertRadix: wrong from=${t}, base cannot be less than 2`);
    if (n < 2) throw new Error(`convertRadix: wrong to=${n}, base cannot be less than 2`);
    if (!Array.isArray(e)) throw new Error("convertRadix: data should be array");
    if (!e.length) return [];
    let r = 0;
    const o = [],
        i = Array.from(e);
    for (i.forEach(l => {
            if (Tn(l), l < 0 || l >= t) throw new Error(`Wrong integer: ${l}`)
        });;) {
        let l = 0,
            s = !0;
        for (let u = r; u < i.length; u++) {
            const a = i[u],
                f = t * l + a;
            if (!Number.isSafeInteger(f) || t * l / t !== l || f - a !== t * l) throw new Error("convertRadix: carry overflow");
            if (l = f % n, i[u] = Math.floor(f / n), !Number.isSafeInteger(i[u]) || i[u] * n + l !== f) throw new Error("convertRadix: carry overflow");
            if (s) i[u] ? s = !1 : r = u;
            else continue
        }
        if (o.push(l), s) break
    }
    for (let l = 0; l < e.length - 1 && e[l] === 0; l++) o.push(0);
    return o.reverse()
}
const tp = (e, t) => t ? tp(t, e % t) : e,
    ki = (e, t) => e + (t - tp(e, t));

function As(e, t, n, r) {
    if (!Array.isArray(e)) throw new Error("convertRadix2: data should be array");
    if (t <= 0 || t > 32) throw new Error(`convertRadix2: wrong from=${t}`);
    if (n <= 0 || n > 32) throw new Error(`convertRadix2: wrong to=${n}`);
    if (ki(t, n) > 32) throw new Error(`convertRadix2: carry overflow from=${t} to=${n} carryBits=${ki(t,n)}`);
    let o = 0,
        i = 0;
    const l = 2 ** n - 1,
        s = [];
    for (const u of e) {
        if (Tn(u), u >= 2 ** t) throw new Error(`convertRadix2: invalid data word=${u} from=${t}`);
        if (o = o << t | u, i + t > 32) throw new Error(`convertRadix2: carry overflow pos=${i} from=${t}`);
        for (i += t; i >= n; i -= n) s.push((o >> i - n & l) >>> 0);
        o &= 2 ** i - 1
    }
    if (o = o << n - i & l, !r && i >= t) throw new Error("Excess padding");
    if (!r && o) throw new Error(`Non-zero padding: ${o}`);
    return r && i > 0 && s.push(o >>> 0), s
}

function ky(e) {
    return Tn(e), {
        encode: t => {
            if (!(t instanceof Uint8Array)) throw new Error("radix.encode input should be Uint8Array");
            return uc(Array.from(t), 2 ** 8, e)
        },
        decode: t => {
            if (!Array.isArray(t) || t.length && typeof t[0] != "number") throw new Error("radix.decode input should be array of strings");
            return Uint8Array.from(uc(t, e, 2 ** 8))
        }
    }
}

function on(e, t = !1) {
    if (Tn(e), e <= 0 || e > 32) throw new Error("radix2: bits should be in (0..32]");
    if (ki(8, e) > 32 || ki(e, 8) > 32) throw new Error("radix2: carry overflow");
    return {
        encode: n => {
            if (!(n instanceof Uint8Array)) throw new Error("radix2.encode input should be Uint8Array");
            return As(Array.from(n), 8, e, !t)
        },
        decode: n => {
            if (!Array.isArray(n) || n.length && typeof n[0] != "number") throw new Error("radix2.decode input should be array of strings");
            return Uint8Array.from(As(n, e, 8, t))
        }
    }
}

function ac(e) {
    if (typeof e != "function") throw new Error("unsafeWrapper fn should be function");
    return function(...t) {
        try {
            return e.apply(null, t)
        } catch {}
    }
}

function xy(e, t) {
    if (Tn(e), typeof t != "function") throw new Error("checksum fn should be function");
    return {
        encode(n) {
            if (!(n instanceof Uint8Array)) throw new Error("checksum.encode: input should be Uint8Array");
            const r = t(n).slice(0, e),
                o = new Uint8Array(n.length + e);
            return o.set(n), o.set(r, n.length), o
        },
        decode(n) {
            if (!(n instanceof Uint8Array)) throw new Error("checksum.decode: input should be Uint8Array");
            const r = n.slice(0, -e),
                o = t(r).slice(0, e),
                i = n.slice(-e);
            for (let l = 0; l < e; l++)
                if (o[l] !== i[l]) throw new Error("Invalid checksum");
            return r
        }
    }
}
const Cy = yt(on(4), It("0123456789ABCDEF"), Nt("")),
    _y = yt(on(5), It("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"), Oi(5), Nt(""));
yt(on(5), It("0123456789ABCDEFGHIJKLMNOPQRSTUV"), Oi(5), Nt(""));
yt(on(5), It("0123456789ABCDEFGHJKMNPQRSTVWXYZ"), Nt(""), ep(e => e.toUpperCase().replace(/O/g, "0").replace(/[IL]/g, "1")));
const Ay = yt(on(6), It("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"), Oi(6), Nt("")),
    Ty = yt(on(6), It("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"), Oi(6), Nt("")),
    zu = e => yt(ky(58), It(e), Nt("")),
    Kt = zu("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");
zu("123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ");
zu("rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz");
const cc = [0, 2, 3, 5, 6, 7, 9, 10, 11],
    Iy = {
        encode(e) {
            let t = "";
            for (let n = 0; n < e.length; n += 8) {
                const r = e.subarray(n, n + 8);
                t += Kt.encode(r).padStart(cc[r.length], "1")
            }
            return t
        },
        decode(e) {
            let t = [];
            for (let n = 0; n < e.length; n += 11) {
                const r = e.slice(n, n + 11),
                    o = cc.indexOf(r.length),
                    i = Kt.decode(r);
                for (let l = 0; l < i.length - o; l++)
                    if (i[l] !== 0) throw new Error("base58xmr: wrong padding");
                t = t.concat(Array.from(i.slice(i.length - o)))
            }
            return Uint8Array.from(t)
        }
    },
    Ny = e => yt(xy(4, t => e(e(t))), Kt),
    Ts = yt(It("qpzry9x8gf2tvdw0s3jn54khce6mua7l"), Nt("")),
    fc = [996825010, 642813549, 513874426, 1027748829, 705979059];

function Cr(e) {
    const t = e >> 25;
    let n = (e & 33554431) << 5;
    for (let r = 0; r < fc.length; r++)(t >> r & 1) === 1 && (n ^= fc[r]);
    return n
}

function dc(e, t, n = 1) {
    const r = e.length;
    let o = 1;
    for (let i = 0; i < r; i++) {
        const l = e.charCodeAt(i);
        if (l < 33 || l > 126) throw new Error(`Invalid prefix (${e})`);
        o = Cr(o) ^ l >> 5
    }
    o = Cr(o);
    for (let i = 0; i < r; i++) o = Cr(o) ^ e.charCodeAt(i) & 31;
    for (let i of t) o = Cr(o) ^ i;
    for (let i = 0; i < 6; i++) o = Cr(o);
    return o ^= n, Ts.encode(As([o % 2 ** 30], 30, 5, !1))
}

function np(e) {
    const t = e === "bech32" ? 1 : 734539939,
        n = on(5),
        r = n.decode,
        o = n.encode,
        i = ac(r);

    function l(f, d, p = 90) {
        if (typeof f != "string") throw new Error(`bech32.encode prefix should be string, not ${typeof f}`);
        if (!Array.isArray(d) || d.length && typeof d[0] != "number") throw new Error(`bech32.encode words should be array of numbers, not ${typeof d}`);
        const g = f.length + 7 + d.length;
        if (p !== !1 && g > p) throw new TypeError(`Length ${g} exceeds limit ${p}`);
        return f = f.toLowerCase(), `${f}1${Ts.encode(d)}${dc(f,d,t)}`
    }

    function s(f, d = 90) {
        if (typeof f != "string") throw new Error(`bech32.decode input should be string, not ${typeof f}`);
        if (f.length < 8 || d !== !1 && f.length > d) throw new TypeError(`Wrong string length: ${f.length} (${f}). Expected (8..${d})`);
        const p = f.toLowerCase();
        if (f !== p && f !== f.toUpperCase()) throw new Error("String must be lowercase or uppercase");
        f = p;
        const g = f.lastIndexOf("1");
        if (g === 0 || g === -1) throw new Error('Letter "1" must be present between prefix and data only');
        const v = f.slice(0, g),
            w = f.slice(g + 1);
        if (w.length < 6) throw new Error("Data must be at least 6 characters long");
        const H = Ts.decode(w).slice(0, -6),
            h = dc(v, H, t);
        if (!w.endsWith(h)) throw new Error(`Invalid checksum in ${f}: expected "${h}"`);
        return {
            prefix: v,
            words: H
        }
    }
    const u = ac(s);

    function a(f) {
        const {
            prefix: d,
            words: p
        } = s(f, !1);
        return {
            prefix: d,
            words: p,
            bytes: r(p)
        }
    }
    return {
        encode: l,
        decode: s,
        decodeToBytes: a,
        decodeUnsafe: u,
        fromWords: r,
        fromWordsUnsafe: i,
        toWords: o
    }
}
const Is = np("bech32"),
    rp = np("bech32m"),
    Ns = {
        encode: e => new TextDecoder().decode(e),
        decode: e => new TextEncoder().encode(e)
    },
    k = yt(on(4), It("0123456789abcdef"), Nt(""), ep(e => {
        if (typeof e != "string" || e.length % 2) throw new TypeError(`hex.decode: expected string, got ${typeof e} with length ${e.length}`);
        return e.toLowerCase()
    })),
    Py = {
        utf8: Ns,
        hex: k,
        base16: Cy,
        base32: _y,
        base64: Ay,
        base64url: Ty,
        base58: Kt,
        base58xmr: Iy
    };
`${Object.keys(Py).join(", ")}`;

function Ps(e) {
    if (!Number.isSafeInteger(e) || e < 0) throw new Error(`Wrong positive integer: ${e}`)
}

function Ly(e) {
    if (typeof e != "boolean") throw new Error(`Expected boolean, not ${e}`)
}

function op(e, ...t) {
    if (!(e instanceof Uint8Array)) throw new TypeError("Expected Uint8Array");
    if (t.length > 0 && !t.includes(e.length)) throw new TypeError(`Expected Uint8Array of length ${t}, not of length=${e.length}`)
}

function Ry(e) {
    if (typeof e != "function" || typeof e.create != "function") throw new Error("Hash should be wrapped by utils.wrapConstructor");
    Ps(e.outputLen), Ps(e.blockLen)
}

function Uy(e, t = !0) {
    if (e.destroyed) throw new Error("Hash instance has been destroyed");
    if (t && e.finished) throw new Error("Hash#digest() has already been called")
}

function Hy(e, t) {
    op(e);
    const n = t.outputLen;
    if (e.length < n) throw new Error(`digestInto() expects output buffer of length at least ${n}`)
}
const hn = {
    number: Ps,
    bool: Ly,
    bytes: op,
    hash: Ry,
    exists: Uy,
    output: Hy
}; /*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Nl = e => new DataView(e.buffer, e.byteOffset, e.byteLength),
    ut = (e, t) => e << 32 - t | e >>> t,
    By = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!By) throw new Error("Non little-endian hardware is not supported");
const zy = Array.from({
    length: 256
}, (e, t) => t.toString(16).padStart(2, "0"));

function Dy(e) {
    if (!(e instanceof Uint8Array)) throw new Error("Uint8Array expected");
    let t = "";
    for (let n = 0; n < e.length; n++) t += zy[e[n]];
    return t
}

function $y(e) {
    if (typeof e != "string") throw new TypeError("hexToBytes: expected string, got " + typeof e);
    if (e.length % 2) throw new Error("hexToBytes: received invalid unpadded hex");
    const t = new Uint8Array(e.length / 2);
    for (let n = 0; n < t.length; n++) {
        const r = n * 2,
            o = e.slice(r, r + 2),
            i = Number.parseInt(o, 16);
        if (Number.isNaN(i) || i < 0) throw new Error("Invalid byte sequence");
        t[n] = i
    }
    return t
}

function My(e) {
    if (typeof e != "string") throw new TypeError(`utf8ToBytes expected string, got ${typeof e}`);
    return new TextEncoder().encode(e)
}

function Du(e) {
    if (typeof e == "string" && (e = My(e)), !(e instanceof Uint8Array)) throw new TypeError(`Expected input type is Uint8Array (got ${typeof e})`);
    return e
}
class ip {
    clone() {
        return this._cloneInto()
    }
}

function lp(e) {
    const t = r => e().update(Du(r)).digest(),
        n = e();
    return t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = () => e(), t
}

function Fy(e, t, n, r) {
    if (typeof e.setBigUint64 == "function") return e.setBigUint64(t, n, r);
    const o = BigInt(32),
        i = BigInt(4294967295),
        l = Number(n >> o & i),
        s = Number(n & i),
        u = r ? 4 : 0,
        a = r ? 0 : 4;
    e.setUint32(t + u, l, r), e.setUint32(t + a, s, r)
}
class sp extends ip {
    constructor(t, n, r, o) {
        super(), this.blockLen = t, this.outputLen = n, this.padOffset = r, this.isLE = o, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = Nl(this.buffer)
    }
    update(t) {
        hn.exists(this);
        const {
            view: n,
            buffer: r,
            blockLen: o
        } = this;
        t = Du(t);
        const i = t.length;
        for (let l = 0; l < i;) {
            const s = Math.min(o - this.pos, i - l);
            if (s === o) {
                const u = Nl(t);
                for (; o <= i - l; l += o) this.process(u, l);
                continue
            }
            r.set(t.subarray(l, l + s), this.pos), this.pos += s, l += s, this.pos === o && (this.process(n, 0), this.pos = 0)
        }
        return this.length += t.length, this.roundClean(), this
    }
    digestInto(t) {
        hn.exists(this), hn.output(t, this), this.finished = !0;
        const {
            buffer: n,
            view: r,
            blockLen: o,
            isLE: i
        } = this;
        let {
            pos: l
        } = this;
        n[l++] = 128, this.buffer.subarray(l).fill(0), this.padOffset > o - l && (this.process(r, 0), l = 0);
        for (let u = l; u < o; u++) n[u] = 0;
        Fy(r, o - 8, BigInt(this.length * 8), i), this.process(r, 0);
        const s = Nl(t);
        this.get().forEach((u, a) => s.setUint32(4 * a, u, i))
    }
    digest() {
        const {
            buffer: t,
            outputLen: n
        } = this;
        this.digestInto(t);
        const r = t.slice(0, n);
        return this.destroy(), r
    }
    _cloneInto(t) {
        t || (t = new this.constructor), t.set(...this.get());
        const {
            blockLen: n,
            buffer: r,
            length: o,
            finished: i,
            destroyed: l,
            pos: s
        } = this;
        return t.length = o, t.pos = s, t.finished = i, t.destroyed = l, o % n && t.buffer.set(r), t
    }
}
const Ky = (e, t, n) => e & t ^ ~e & n,
    jy = (e, t, n) => e & t ^ e & n ^ t & n,
    Vy = new Uint32Array([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]),
    Lt = new Uint32Array([1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225]),
    Rt = new Uint32Array(64);
class Oy extends sp {
    constructor() {
        super(64, 32, 8, !1), this.A = Lt[0] | 0, this.B = Lt[1] | 0, this.C = Lt[2] | 0, this.D = Lt[3] | 0, this.E = Lt[4] | 0, this.F = Lt[5] | 0, this.G = Lt[6] | 0, this.H = Lt[7] | 0
    }
    get() {
        const {
            A: t,
            B: n,
            C: r,
            D: o,
            E: i,
            F: l,
            G: s,
            H: u
        } = this;
        return [t, n, r, o, i, l, s, u]
    }
    set(t, n, r, o, i, l, s, u) {
        this.A = t | 0, this.B = n | 0, this.C = r | 0, this.D = o | 0, this.E = i | 0, this.F = l | 0, this.G = s | 0, this.H = u | 0
    }
    process(t, n) {
        for (let d = 0; d < 16; d++, n += 4) Rt[d] = t.getUint32(n, !1);
        for (let d = 16; d < 64; d++) {
            const p = Rt[d - 15],
                g = Rt[d - 2],
                v = ut(p, 7) ^ ut(p, 18) ^ p >>> 3,
                w = ut(g, 17) ^ ut(g, 19) ^ g >>> 10;
            Rt[d] = w + Rt[d - 7] + v + Rt[d - 16] | 0
        }
        let {
            A: r,
            B: o,
            C: i,
            D: l,
            E: s,
            F: u,
            G: a,
            H: f
        } = this;
        for (let d = 0; d < 64; d++) {
            const p = ut(s, 6) ^ ut(s, 11) ^ ut(s, 25),
                g = f + p + Ky(s, u, a) + Vy[d] + Rt[d] | 0,
                w = (ut(r, 2) ^ ut(r, 13) ^ ut(r, 22)) + jy(r, o, i) | 0;
            f = a, a = u, u = s, s = l + g | 0, l = i, i = o, o = r, r = g + w | 0
        }
        r = r + this.A | 0, o = o + this.B | 0, i = i + this.C | 0, l = l + this.D | 0, s = s + this.E | 0, u = u + this.F | 0, a = a + this.G | 0, f = f + this.H | 0, this.set(r, o, i, l, s, u, a, f)
    }
    roundClean() {
        Rt.fill(0)
    }
    destroy() {
        this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0)
    }
}
const In = lp(() => new Oy);
class up extends ip {
    constructor(t, n) {
        super(), this.finished = !1, this.destroyed = !1, hn.hash(t);
        const r = Du(n);
        if (this.iHash = t.create(), typeof this.iHash.update != "function") throw new TypeError("Expected instance of class which extends utils.Hash");
        this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
        const o = this.blockLen,
            i = new Uint8Array(o);
        i.set(r.length > o ? t.create().update(r).digest() : r);
        for (let l = 0; l < i.length; l++) i[l] ^= 54;
        this.iHash.update(i), this.oHash = t.create();
        for (let l = 0; l < i.length; l++) i[l] ^= 106;
        this.oHash.update(i), i.fill(0)
    }
    update(t) {
        return hn.exists(this), this.iHash.update(t), this
    }
    digestInto(t) {
        hn.exists(this), hn.bytes(t, this.outputLen), this.finished = !0, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy()
    }
    digest() {
        const t = new Uint8Array(this.oHash.outputLen);
        return this.digestInto(t), t
    }
    _cloneInto(t) {
        t || (t = Object.create(Object.getPrototypeOf(this), {}));
        const {
            oHash: n,
            iHash: r,
            finished: o,
            destroyed: i,
            blockLen: l,
            outputLen: s
        } = this;
        return t = t, t.finished = o, t.destroyed = i, t.blockLen = l, t.outputLen = s, t.oHash = n._cloneInto(t.oHash), t.iHash = r._cloneInto(t.iHash), t
    }
    destroy() {
        this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy()
    }
}
const ap = (e, t, n) => new up(e, t).update(n).digest();
ap.create = (e, t) => new up(e, t);
const Wy = new Uint8Array([7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8]),
    cp = Uint8Array.from({
        length: 16
    }, (e, t) => t),
    Qy = cp.map(e => (9 * e + 5) % 16);
let $u = [cp],
    Mu = [Qy];
for (let e = 0; e < 4; e++)
    for (let t of [$u, Mu]) t.push(t[e].map(n => Wy[n]));
const fp = [
        [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8],
        [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7],
        [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9],
        [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6],
        [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]
    ].map(e => new Uint8Array(e)),
    Gy = $u.map((e, t) => e.map(n => fp[t][n])),
    Yy = Mu.map((e, t) => e.map(n => fp[t][n])),
    by = new Uint32Array([0, 1518500249, 1859775393, 2400959708, 2840853838]),
    Xy = new Uint32Array([1352829926, 1548603684, 1836072691, 2053994217, 0]),
    Bo = (e, t) => e << t | e >>> 32 - t;

function pc(e, t, n, r) {
    return e === 0 ? t ^ n ^ r : e === 1 ? t & n | ~t & r : e === 2 ? (t | ~n) ^ r : e === 3 ? t & r | n & ~r : t ^ (n | ~r)
}
const zo = new Uint32Array(16);
class Zy extends sp {
    constructor() {
        super(64, 20, 8, !0), this.h0 = 1732584193, this.h1 = -271733879, this.h2 = -1732584194, this.h3 = 271733878, this.h4 = -1009589776
    }
    get() {
        const {
            h0: t,
            h1: n,
            h2: r,
            h3: o,
            h4: i
        } = this;
        return [t, n, r, o, i]
    }
    set(t, n, r, o, i) {
        this.h0 = t | 0, this.h1 = n | 0, this.h2 = r | 0, this.h3 = o | 0, this.h4 = i | 0
    }
    process(t, n) {
        for (let g = 0; g < 16; g++, n += 4) zo[g] = t.getUint32(n, !0);
        let r = this.h0 | 0,
            o = r,
            i = this.h1 | 0,
            l = i,
            s = this.h2 | 0,
            u = s,
            a = this.h3 | 0,
            f = a,
            d = this.h4 | 0,
            p = d;
        for (let g = 0; g < 5; g++) {
            const v = 4 - g,
                w = by[g],
                H = Xy[g],
                h = $u[g],
                c = Mu[g],
                y = Gy[g],
                m = Yy[g];
            for (let E = 0; E < 16; E++) {
                const A = Bo(r + pc(g, i, s, a) + zo[h[E]] + w, y[E]) + d | 0;
                r = d, d = a, a = Bo(s, 10) | 0, s = i, i = A
            }
            for (let E = 0; E < 16; E++) {
                const A = Bo(o + pc(v, l, u, f) + zo[c[E]] + H, m[E]) + p | 0;
                o = p, p = f, f = Bo(u, 10) | 0, u = l, l = A
            }
        }
        this.set(this.h1 + s + f | 0, this.h2 + a + p | 0, this.h3 + d + o | 0, this.h4 + r + l | 0, this.h0 + i + u | 0)
    }
    roundClean() {
        zo.fill(0)
    }
    destroy() {
        this.destroyed = !0, this.buffer.fill(0), this.set(0, 0, 0, 0, 0)
    }
}
const qy = lp(() => new Zy),
    Wi = new Uint8Array,
    Fu = new Uint8Array([0]);

function ht(e, t) {
    if (e.length !== t.length) return !1;
    for (let n = 0; n < e.length; n++)
        if (e[n] !== t[n]) return !1;
    return !0
}

function Ls(...e) {
    if (e.length === 1) return e[0];
    const t = e.reduce((r, o) => r + o.length, 0),
        n = new Uint8Array(t);
    for (let r = 0, o = 0; r < e.length; r++) {
        const i = e[r];
        n.set(i, o), o += i.length
    }
    return n
}
const We = e => e instanceof Uint8Array;
class dp {
    constructor(t, n = [], r = []) {
        this.data = t, this.path = n, this.fieldPath = r, this.pos = 0, this.hasPtr = !1, this.bitBuf = 0, this.bitPos = 0
    }
    err(t) {
        return new Error(`Reader(${this.fieldPath.join("/")}): ${t}`)
    }
    absBytes(t) {
        if (t > this.data.length) throw new Error("absBytes: Unexpected end of buffer");
        return this.data.subarray(t)
    }
    bytes(t, n = !1) {
        if (this.bitPos) throw this.err("readBytes: bitPos not empty");
        if (!Number.isFinite(t)) throw this.err(`readBytes: wrong length=${t}`);
        if (this.pos + t > this.data.length) throw this.err("readBytes: Unexpected end of buffer");
        const r = this.data.subarray(this.pos, this.pos + t);
        return n || (this.pos += t), r
    }
    byte(t = !1) {
        if (this.bitPos) throw this.err("readByte: bitPos not empty");
        return this.data[t ? this.pos : this.pos++]
    }
    get leftBytes() {
        return this.data.length - this.pos
    }
    isEnd() {
        return this.pos >= this.data.length && !this.bitPos
    }
    length(t) {
        let n;
        if (ln(t) ? n = Number(t.decodeStream(this)) : typeof t == "number" ? n = t : typeof t == "string" && (n = Ci(this.path, t.split("/"))), typeof n == "bigint" && (n = Number(n)), typeof n != "number") throw this.err(`Wrong length: ${n}`);
        return n
    }
    bits(t) {
        if (t > 32) throw this.err("BitReader: cannot read more than 32 bits in single call");
        let n = 0;
        for (; t;) {
            this.bitPos || (this.bitBuf = this.data[this.pos++], this.bitPos = 8);
            const r = Math.min(t, this.bitPos);
            this.bitPos -= r, n = n << r | this.bitBuf >> this.bitPos & 2 ** r - 1, this.bitBuf &= 2 ** this.bitPos - 1, t -= r
        }
        return n >>> 0
    }
    find(t, n = this.pos) {
        if (!We(t)) throw this.err(`find: needle is not bytes! ${t}`);
        if (this.bitPos) throw this.err("findByte: bitPos not empty");
        if (!t.length) throw this.err("find: needle is empty");
        for (let r = n;
            (r = this.data.indexOf(t[0], r)) !== -1; r++) {
            if (r === -1 || this.data.length - r < t.length) return;
            if (ht(t, this.data.subarray(r, r + t.length))) return r
        }
    }
    finish() {
        if (!(this.isEnd() || this.hasPtr)) throw this.err(`${this.leftBytes} bytes ${this.bitPos} bits left after unpack: ${k.encode(this.data.slice(this.pos))}`)
    }
    fieldPathPush(t) {
        this.fieldPath.push(t)
    }
    fieldPathPop() {
        this.fieldPath.pop()
    }
}
class pp {
    constructor(t = [], n = []) {
        this.path = t, this.fieldPath = n, this.buffers = [], this.pos = 0, this.ptrs = [], this.bitBuf = 0, this.bitPos = 0
    }
    err(t) {
        return new Error(`Writer(${this.fieldPath.join("/")}): ${t}`)
    }
    bytes(t) {
        if (this.bitPos) throw this.err("writeBytes: ends with non-empty bit buffer");
        this.buffers.push(t), this.pos += t.length
    }
    byte(t) {
        if (this.bitPos) throw this.err("writeByte: ends with non-empty bit buffer");
        this.buffers.push(new Uint8Array([t])), this.pos++
    }
    get buffer() {
        if (this.bitPos) throw this.err("buffer: ends with non-empty bit buffer");
        let t = Ls(...this.buffers);
        for (let n of this.ptrs) {
            const r = t.length;
            t = Ls(t, n.buffer);
            const o = n.ptr.encode(r);
            for (let i = 0; i < o.length; i++) t[n.pos + i] = o[i]
        }
        return t
    }
    length(t, n) {
        if (t === null) return;
        if (ln(t)) return t.encodeStream(this, n);
        let r;
        if (typeof t == "number" ? r = t : typeof t == "string" && (r = Ci(this.path, t.split("/"))), typeof r == "bigint" && (r = Number(r)), r === void 0 || r !== n) throw this.err(`Wrong length: ${r} len=${t} exp=${n}`)
    }
    bits(t, n) {
        if (n > 32) throw this.err("writeBits: cannot write more than 32 bits in single call");
        if (t >= 2 ** n) throw this.err(`writeBits: value (${t}) >= 2**bits (${n})`);
        for (; n;) {
            const r = Math.min(n, 8 - this.bitPos);
            this.bitBuf = this.bitBuf << r | t >> n - r, this.bitPos += r, n -= r, t &= 2 ** n - 1, this.bitPos === 8 && (this.bitPos = 0, this.buffers.push(new Uint8Array([this.bitBuf])), this.pos++)
        }
    }
    fieldPathPush(t) {
        this.fieldPath.push(t)
    }
    fieldPathPop() {
        this.fieldPath.pop()
    }
}
const xi = e => Uint8Array.from(e).reverse();

function hc(e, t, n, r) {
    if (r) {
        const o = 2n ** (n - 1n);
        if (t < -o || t >= o) throw e.err("sInt: value out of bounds")
    } else if (0n > t || t >= 2n ** n) throw e.err("uInt: value out of bounds")
}

function fe(e) {
    return {
        ...e,
        encode: t => {
            const n = new pp;
            return e.encodeStream(n, t), n.buffer
        },
        decode: t => {
            const n = new dp(t),
                r = e.decodeStream(n);
            return n.finish(), r
        }
    }
}

function Ci(e, t) {
    e = Array.from(e);
    let n = 0;
    for (; n < t.length && t[n] === ".."; n++) e.pop();
    let r = e.pop();
    for (; n < t.length; n++) {
        if (!r || r[t[n]] === void 0) return;
        r = r[t[n]]
    }
    return r
}

function ln(e) {
    return typeof e.encode == "function" && typeof e.encodeStream == "function" && typeof e.decode == "function" && typeof e.decodeStream == "function"
}

function Jy() {
    return {
        encode: e => {
            const t = {};
            for (const [n, r] of e) {
                if (t[n] !== void 0) throw new Error(`coders.dict: same key(${n}) appears twice in struct`);
                t[n] = r
            }
            return t
        },
        decode: e => Object.entries(e)
    }
}
const e1 = {
    encode: e => {
        if (e > BigInt(Number.MAX_SAFE_INTEGER)) throw new Error(`coders.number: element bigger than MAX_SAFE_INTEGER=${e}`);
        return Number(e)
    },
    decode: e => BigInt(e)
};

function t1(e) {
    return {
        encode: t => e[t],
        decode: t => e[t]
    }
}

function n1(e) {
    const t = 10n ** BigInt(e);
    return {
        encode: n => {
            let r = (n < 0n ? -n : n).toString(10),
                o = r.length - e;
            o < 0 && (r = r.padStart(r.length - o, "0"), o = 0);
            let i = r.length - 1;
            for (; i >= o && r[i] === "0"; i--);
            let [l, s] = [r.slice(0, o), r.slice(o, i + 1)];
            return l || (l = "0"), n < 0n && (l = "-" + l), s ? `${l}.${s}` : l
        },
        decode: n => {
            let r = !1;
            n.startsWith("-") && (r = !0, n = n.slice(1));
            let o = n.indexOf(".");
            o = o === -1 ? n.length : o;
            const [i, l] = [n.slice(0, o), n.slice(o + 1)], s = BigInt(i) * t, u = Math.min(l.length, e), a = BigInt(l.slice(0, u)) * 10n ** BigInt(e - u), f = s + a;
            return r ? -f : f
        }
    }
}

function r1(e) {
    return {
        encode: t => {
            for (const n of e) {
                const r = n.encode(t);
                if (r !== void 0) return r
            }
            throw new Error(`match/encode: cannot find match in ${t}`)
        },
        decode: t => {
            for (const n of e) {
                const r = n.decode(t);
                if (r !== void 0) return r
            }
            throw new Error(`match/decode: cannot find match in ${t}`)
        }
    }
}
const cr = {
        dict: Jy,
        number: e1,
        tsEnum: t1,
        decimal: n1,
        match: r1
    },
    Fe = (e, t = !1, n = !1) => fe({
        size: e,
        encodeStream: (r, o) => {
            if (typeof o != "number" && typeof o != "bigint") throw r.err(`bigint: invalid value: ${o}`);
            let i = BigInt(o);
            const l = BigInt(e);
            hc(r, i, 8n * l, !!n);
            const s = 2n ** (8n * l - 1n);
            n && i < 0 && (i = i | s);
            let u = [];
            for (let f = 0; f < e; f++) u.push(Number(i & 255n)), i >>= 8n;
            let a = new Uint8Array(u).reverse();
            r.bytes(t ? a.reverse() : a)
        },
        decodeStream: r => {
            const o = BigInt(e);
            let i = r.bytes(e);
            t && (i = xi(i));
            const l = xi(i),
                s = 2n ** (8n * o - 1n);
            let u = 0n;
            for (let a = 0; a < l.length; a++) u |= BigInt(l[a]) << 8n * BigInt(a);
            return n && u & s && (u = (u ^ s) - s), hc(r, u, 8n * o, !!n), u
        }
    });
Fe(32, !0);
Fe(32, !1);
Fe(32, !0, !0);
Fe(32, !1, !0);
Fe(16, !0);
Fe(16, !1);
Fe(16, !0, !0);
Fe(16, !1, !0);
const o1 = Fe(8, !0);
Fe(8, !1);
const i1 = Fe(8, !0, !0);
Fe(8, !1, !0);
const gt = (e, t = !1, n = !1) => {
        if (e > 6) throw new Error("int supports size up to 6 bytes (48 bits), for other use bigint");
        return co(Fe(e, t, n), cr.number)
    },
    ge = gt(4, !0),
    l1 = gt(4, !1),
    s1 = gt(4, !0, !0);
gt(4, !1, !0);
const yc = gt(2, !0);
gt(2, !1);
gt(2, !0, !0);
gt(2, !1, !0);
const oo = gt(1, !1);
gt(1, !1, !0);
fe({
    size: 1,
    encodeStream: (e, t) => e.byte(t ? 1 : 0),
    decodeStream: e => {
        const t = e.byte();
        if (t !== 0 && t !== 1) throw e.err(`bool: invalid value ${t}`);
        return t === 1
    }
});
const N = (e, t = !1) => fe({
        size: typeof e == "number" ? e : void 0,
        encodeStream: (n, r) => {
            if (!We(r)) throw n.err(`bytes: invalid value ${r}`);
            We(e) || n.length(e, r.length), n.bytes(t ? xi(r) : r), We(e) && n.bytes(e)
        },
        decodeStream: n => {
            let r;
            if (We(e)) {
                const o = n.find(e);
                if (!o) throw n.err("bytes: cannot find terminator");
                r = n.bytes(o - n.pos), n.bytes(e.length)
            } else r = n.bytes(e === null ? n.leftBytes : n.length(e));
            return t ? xi(r) : r
        }
    }),
    Qi = (e, t = !1) => {
        const n = N(e, t);
        return fe({
            size: n.size,
            encodeStream: (r, o) => n.encodeStream(r, Ns.decode(o)),
            decodeStream: r => Ns.encode(n.decodeStream(r))
        })
    };
Qi(Fu);
const u1 = (e, t = !1, n = !1) => {
    const r = N(e, t);
    return fe({
        size: r.size,
        encodeStream: (o, i) => {
            if (n && !i.startsWith("0x")) throw new Error("hex(withZero=true).encode input should start with 0x");
            const l = k.decode(n ? i.slice(2) : i);
            return r.encodeStream(o, l)
        },
        decodeStream: o => (n ? "0x" : "") + k.encode(r.decodeStream(o))
    })
};

function co(e, t) {
    if (!ln(e)) throw new Error(`apply: invalid inner value ${e}`);
    return fe({
        size: e.size,
        encodeStream: (n, r) => {
            let o;
            try {
                o = t.decode(r)
            } catch (i) {
                throw n.err("" + i)
            }
            return e.encodeStream(n, o)
        },
        decodeStream: n => {
            const r = e.decodeStream(n);
            try {
                return t.encode(r)
            } catch (o) {
                throw n.err("" + o)
            }
        }
    })
}

function lt(e, t) {
    if (!ln(e)) throw new Error(`validate: invalid inner value ${e}`);
    return fe({
        size: e.size,
        encodeStream: (n, r) => e.encodeStream(n, t(r)),
        decodeStream: n => t(e.decodeStream(n))
    })
}
const a1 = (e, t = !1) => fe({
    size: e.length,
    encodeStream: (n, r) => {
        !!r !== t && n.bytes(e)
    },
    decodeStream: n => {
        let r = n.leftBytes >= e.length;
        return r && (r = ht(n.bytes(e.length, !0), e), r && n.bytes(e.length)), r !== t
    }
});

function c1(e, t, n) {
    if (!ln(t)) throw new Error(`flagged: invalid inner value ${t}`);
    return fe({
        encodeStream: (r, o) => {
            typeof e == "string" ? Ci(r.path, e.split("/")) ? t.encodeStream(r, o) : n && t.encodeStream(r, n) : (e.encodeStream(r, !!o), o ? t.encodeStream(r, o) : n && t.encodeStream(r, n))
        },
        decodeStream: r => {
            let o = !1;
            if (typeof e == "string" ? o = Ci(r.path, e.split("/")) : o = e.decodeStream(r), o) return t.decodeStream(r);
            n && t.decodeStream(r)
        }
    })
}

function Gi(e, t, n = !0) {
    if (!ln(e)) throw new Error(`flagged: invalid inner value ${e}`);
    return fe({
        size: e.size,
        encodeStream: (r, o) => e.encodeStream(r, t),
        decodeStream: r => {
            const o = e.decodeStream(r);
            if (n && typeof o != "object" && o !== t || We(t) && !ht(t, o)) throw r.err(`magic: invalid value: ${o} !== ${t}`)
        }
    })
}

function hp(e) {
    let t = 0;
    for (let n of e) {
        if (!n.size) return;
        t += n.size
    }
    return t
}

function ke(e) {
    if (Array.isArray(e)) throw new Error("Packed.Struct: got array instead of object");
    return fe({
        size: hp(Object.values(e)),
        encodeStream: (t, n) => {
            if (typeof n != "object" || n === null) throw t.err(`struct: invalid value ${n}`);
            t.path.push(n);
            for (let r in e) t.fieldPathPush(r), e[r].encodeStream(t, n[r]), t.fieldPathPop();
            t.path.pop()
        },
        decodeStream: t => {
            let n = {};
            t.path.push(n);
            for (let r in e) t.fieldPathPush(r), n[r] = e[r].decodeStream(t), t.fieldPathPop();
            return t.path.pop(), n
        }
    })
}

function f1(e) {
    if (!Array.isArray(e)) throw new Error(`Packed.Tuple: got ${typeof e} instead of array`);
    return fe({
        size: hp(e),
        encodeStream: (t, n) => {
            if (!Array.isArray(n)) throw t.err(`tuple: invalid value ${n}`);
            t.path.push(n);
            for (let r = 0; r < e.length; r++) t.fieldPathPush("" + r), e[r].encodeStream(t, n[r]), t.fieldPathPop();
            t.path.pop()
        },
        decodeStream: t => {
            let n = [];
            t.path.push(n);
            for (let r = 0; r < e.length; r++) t.fieldPathPush("" + r), n.push(e[r].decodeStream(t)), t.fieldPathPop();
            return t.path.pop(), n
        }
    })
}

function d1(e, t) {
    if (!ln(t)) throw new Error(`prefix: invalid inner value ${t}`);
    if (We(e)) throw new Error("prefix: len cannot be Uint8Array");
    const n = N(e);
    return fe({
        size: typeof e == "number" ? e : void 0,
        encodeStream: (r, o) => {
            const i = new pp(r.path, r.fieldPath);
            t.encodeStream(i, o), n.encodeStream(r, i.buffer)
        },
        decodeStream: r => {
            const o = n.decodeStream(r);
            return t.decodeStream(new dp(o, r.path, r.fieldPath))
        }
    })
}

function Pe(e, t) {
    if (!ln(t)) throw new Error(`array: invalid inner value ${t}`);
    return fe({
        size: typeof e == "number" && t.size ? e * t.size : void 0,
        encodeStream: (n, r) => {
            if (!Array.isArray(r)) throw n.err(`array: invalid value ${r}`);
            We(e) || n.length(e, r.length), n.path.push(r);
            for (let o = 0; o < r.length; o++) {
                n.fieldPathPush("" + o);
                const i = r[o],
                    l = n.pos;
                if (t.encodeStream(n, i), We(e)) {
                    if (e.length > n.pos - l) continue;
                    const s = n.buffer.subarray(l, n.pos);
                    if (ht(s.subarray(0, e.length), e)) throw n.err(`array: inner element encoding same as separator. elm=${i} data=${s}`)
                }
                n.fieldPathPop()
            }
            n.path.pop(), We(e) && n.bytes(e)
        },
        decodeStream: n => {
            let r = [];
            if (e === null) {
                let o = 0;
                for (n.path.push(r); !n.isEnd() && (n.fieldPathPush("" + o++), r.push(t.decodeStream(n)), n.fieldPathPop(), !(t.size && n.leftBytes < t.size)););
                n.path.pop()
            } else if (We(e)) {
                let o = 0;
                for (n.path.push(r);;) {
                    if (ht(n.bytes(e.length, !0), e)) {
                        n.bytes(e.length);
                        break
                    }
                    n.fieldPathPush("" + o++), r.push(t.decodeStream(n)), n.fieldPathPop()
                }
                n.path.pop()
            } else {
                n.fieldPathPush("arrayLen");
                const o = n.length(e);
                n.fieldPathPop(), n.path.push(r);
                for (let i = 0; i < o; i++) n.fieldPathPush("" + i), r.push(t.decodeStream(n)), n.fieldPathPop();
                n.path.pop()
            }
            return r
        }
    })
}
Gi(N(0), Wi); /*! micro-btc-signer - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Yi = e => qy(In(e)),
    bi = Ls,
    p1 = Ny(In);
we.hmacSha256Sync = (e, ...t) => ap(In, e, bi(...t));
we.sha256Sync = (...e) => In(bi(...e));
const Ku = we.taggedHashSync;
var ue;
(function(e) {
    e[e.ecdsa = 0] = "ecdsa", e[e.schnorr = 1] = "schnorr"
})(ue || (ue = {}));
const lr = (e, t) => {
    const n = e.length;
    if (t === ue.ecdsa) {
        if (n === 32) throw new Error("Expected non-Schnorr key")
    } else if (t === ue.schnorr) {
        if (n !== 32) throw new Error("Expected 32-byte Schnorr key")
    } else throw new Error("Unknown key type");
    return z.fromHex(e), e
};

function jt(e, t) {
    try {
        return !!lr(e, t)
    } catch {
        return !1
    }
}

function h1(e, t) {
    const n = Ku("TapTweak", e, t),
        r = z.fromHex(e).add(z.fromPrivateKey(n));
    return [r.toRawX(), !r.hasEvenY()]
}
const Rs = lt(N(null), e => lr(e, ue.ecdsa)),
    _i = lt(N(32), e => lr(e, ue.schnorr)),
    gc = lt(N(null), e => {
        if (e.length !== 64 && e.length !== 65) throw new Error("Schnorr signature should be 64 or 65 bytes long");
        return e
    });

function ju(e) {
    const t = {};
    for (const n of e) {
        const r = k.encode(n);
        if (t[r]) throw new Error(`Multisig: non-uniq pubkey: ${e.map(k.encode)}`);
        t[r] = !0
    }
}
const Nn = {
        bech32: "bc",
        pubKeyHash: 0,
        scriptHash: 5,
        wif: 128
    },
    y1 = 8;
cr.decimal(y1);

function Us(e, t) {
    if (e instanceof Uint8Array && t instanceof Uint8Array) {
        const n = Math.min(e.length, t.length);
        for (let r = 0; r < n; r++)
            if (e[r] != t[r]) return Math.sign(e[r] - t[r]);
        return Math.sign(e.length - t.length)
    } else if (e instanceof Uint8Array || t instanceof Uint8Array) throw new Error(`cmp: wrong values a=${e} b=${t}`);
    if ((typeof e == "bigint" && typeof t == "number" || typeof e == "number" && typeof t == "bigint") && (e = BigInt(e), t = BigInt(t)), e === void 0 || t === void 0) throw new Error(`cmp: wrong values a=${e} b=${t}`);
    return Number(e > t) - Number(e < t)
}
var he;
(function(e) {
    e[e.OP_0 = 0] = "OP_0", e[e.PUSHDATA1 = 76] = "PUSHDATA1", e[e.PUSHDATA2 = 77] = "PUSHDATA2", e[e.PUSHDATA4 = 78] = "PUSHDATA4", e[e["1NEGATE"] = 79] = "1NEGATE", e[e.RESERVED = 80] = "RESERVED", e[e.OP_1 = 81] = "OP_1", e[e.OP_2 = 82] = "OP_2", e[e.OP_3 = 83] = "OP_3", e[e.OP_4 = 84] = "OP_4", e[e.OP_5 = 85] = "OP_5", e[e.OP_6 = 86] = "OP_6", e[e.OP_7 = 87] = "OP_7", e[e.OP_8 = 88] = "OP_8", e[e.OP_9 = 89] = "OP_9", e[e.OP_10 = 90] = "OP_10", e[e.OP_11 = 91] = "OP_11", e[e.OP_12 = 92] = "OP_12", e[e.OP_13 = 93] = "OP_13", e[e.OP_14 = 94] = "OP_14", e[e.OP_15 = 95] = "OP_15", e[e.OP_16 = 96] = "OP_16", e[e.NOP = 97] = "NOP", e[e.VER = 98] = "VER", e[e.IF = 99] = "IF", e[e.NOTIF = 100] = "NOTIF", e[e.VERIF = 101] = "VERIF", e[e.VERNOTIF = 102] = "VERNOTIF", e[e.ELSE = 103] = "ELSE", e[e.ENDIF = 104] = "ENDIF", e[e.VERIFY = 105] = "VERIFY", e[e.RETURN = 106] = "RETURN", e[e.TOALTSTACK = 107] = "TOALTSTACK", e[e.FROMALTSTACK = 108] = "FROMALTSTACK", e[e["2DROP"] = 109] = "2DROP", e[e["2DUP"] = 110] = "2DUP", e[e["3DUP"] = 111] = "3DUP", e[e["2OVER"] = 112] = "2OVER", e[e["2ROT"] = 113] = "2ROT", e[e["2SWAP"] = 114] = "2SWAP", e[e.IFDUP = 115] = "IFDUP", e[e.DEPTH = 116] = "DEPTH", e[e.DROP = 117] = "DROP", e[e.DUP = 118] = "DUP", e[e.NIP = 119] = "NIP", e[e.OVER = 120] = "OVER", e[e.PICK = 121] = "PICK", e[e.ROLL = 122] = "ROLL", e[e.ROT = 123] = "ROT", e[e.SWAP = 124] = "SWAP", e[e.TUCK = 125] = "TUCK", e[e.CAT = 126] = "CAT", e[e.SUBSTR = 127] = "SUBSTR", e[e.LEFT = 128] = "LEFT", e[e.RIGHT = 129] = "RIGHT", e[e.SIZE = 130] = "SIZE", e[e.INVERT = 131] = "INVERT", e[e.AND = 132] = "AND", e[e.OR = 133] = "OR", e[e.XOR = 134] = "XOR", e[e.EQUAL = 135] = "EQUAL", e[e.EQUALVERIFY = 136] = "EQUALVERIFY", e[e.RESERVED1 = 137] = "RESERVED1", e[e.RESERVED2 = 138] = "RESERVED2", e[e["1ADD"] = 139] = "1ADD", e[e["1SUB"] = 140] = "1SUB", e[e["2MUL"] = 141] = "2MUL", e[e["2DIV"] = 142] = "2DIV", e[e.NEGATE = 143] = "NEGATE", e[e.ABS = 144] = "ABS", e[e.NOT = 145] = "NOT", e[e["0NOTEQUAL"] = 146] = "0NOTEQUAL", e[e.ADD = 147] = "ADD", e[e.SUB = 148] = "SUB", e[e.MUL = 149] = "MUL", e[e.DIV = 150] = "DIV", e[e.MOD = 151] = "MOD", e[e.LSHIFT = 152] = "LSHIFT", e[e.RSHIFT = 153] = "RSHIFT", e[e.BOOLAND = 154] = "BOOLAND", e[e.BOOLOR = 155] = "BOOLOR", e[e.NUMEQUAL = 156] = "NUMEQUAL", e[e.NUMEQUALVERIFY = 157] = "NUMEQUALVERIFY", e[e.NUMNOTEQUAL = 158] = "NUMNOTEQUAL", e[e.LESSTHAN = 159] = "LESSTHAN", e[e.GREATERTHAN = 160] = "GREATERTHAN", e[e.LESSTHANOREQUAL = 161] = "LESSTHANOREQUAL", e[e.GREATERTHANOREQUAL = 162] = "GREATERTHANOREQUAL", e[e.MIN = 163] = "MIN", e[e.MAX = 164] = "MAX", e[e.WITHIN = 165] = "WITHIN", e[e.RIPEMD160 = 166] = "RIPEMD160", e[e.SHA1 = 167] = "SHA1", e[e.SHA256 = 168] = "SHA256", e[e.HASH160 = 169] = "HASH160", e[e.HASH256 = 170] = "HASH256", e[e.CODESEPARATOR = 171] = "CODESEPARATOR", e[e.CHECKSIG = 172] = "CHECKSIG", e[e.CHECKSIGVERIFY = 173] = "CHECKSIGVERIFY", e[e.CHECKMULTISIG = 174] = "CHECKMULTISIG", e[e.CHECKMULTISIGVERIFY = 175] = "CHECKMULTISIGVERIFY", e[e.NOP1 = 176] = "NOP1", e[e.CHECKLOCKTIMEVERIFY = 177] = "CHECKLOCKTIMEVERIFY", e[e.CHECKSEQUENCEVERIFY = 178] = "CHECKSEQUENCEVERIFY", e[e.NOP4 = 179] = "NOP4", e[e.NOP5 = 180] = "NOP5", e[e.NOP6 = 181] = "NOP6", e[e.NOP7 = 182] = "NOP7", e[e.NOP8 = 183] = "NOP8", e[e.NOP9 = 184] = "NOP9", e[e.NOP10 = 185] = "NOP10", e[e.CHECKSIGADD = 186] = "CHECKSIGADD", e[e.INVALID = 255] = "INVALID"
})(he || (he = {}));
var Ai;
(function(e) {
    e[e.OP_0 = 0] = "OP_0", e[e.OP_1 = 1] = "OP_1", e[e.OP_2 = 2] = "OP_2", e[e.OP_3 = 3] = "OP_3", e[e.OP_4 = 4] = "OP_4", e[e.OP_5 = 5] = "OP_5", e[e.OP_6 = 6] = "OP_6", e[e.OP_7 = 7] = "OP_7", e[e.OP_8 = 8] = "OP_8", e[e.OP_9 = 9] = "OP_9", e[e.OP_10 = 10] = "OP_10", e[e.OP_11 = 11] = "OP_11", e[e.OP_12 = 12] = "OP_12", e[e.OP_13 = 13] = "OP_13", e[e.OP_14 = 14] = "OP_14", e[e.OP_15 = 15] = "OP_15", e[e.OP_16 = 16] = "OP_16"
})(Ai || (Ai = {}));

function Hs(e) {
    if (typeof e == "string" && he[e] !== void 0 && Ai[e] !== void 0) return Ai[e]
}
const Bs = fe({
        encodeStream: (e, t) => {
            for (const n of t) {
                if (typeof n == "string") {
                    if (he[n] === void 0) throw new Error(`Unknown opcode=${n}`);
                    e.byte(he[n]);
                    continue
                }
                const r = n.length;
                r < he.PUSHDATA1 ? e.byte(r) : r <= 255 ? (e.byte(he.PUSHDATA1), e.byte(r)) : r <= 65535 ? (e.byte(he.PUSHDATA2), e.bytes(yc.encode(r))) : (e.byte(he.PUSHDATA4), e.bytes(ge.encode(r))), e.bytes(n)
            }
        },
        decodeStream: e => {
            const t = [];
            for (; !e.isEnd();) {
                const n = e.byte();
                if (he.OP_0 < n && n <= he.PUSHDATA4) {
                    let r;
                    if (n < he.PUSHDATA1) r = n;
                    else if (n === he.PUSHDATA1) r = oo.decodeStream(e);
                    else if (n === he.PUSHDATA2) r = yc.decodeStream(e);
                    else if (n === he.PUSHDATA4) r = ge.decodeStream(e);
                    else throw new Error("Should be not possible");
                    t.push(e.bytes(r))
                } else {
                    const r = he[n];
                    if (r === void 0) throw new Error(`Unknown opcode=${n.toString(16)}`);
                    t.push(r)
                }
            }
            return t
        }
    }),
    mc = {
        253: [253, 2, 253n, 65535n],
        254: [254, 4, 65536n, 4294967295n],
        255: [255, 8, 4294967296n, 18446744073709551615n]
    },
    Xi = fe({
        encodeStream: (e, t) => {
            if (typeof t == "number" && (t = BigInt(t)), 0n <= t && t <= 252n) return e.byte(Number(t));
            for (const [n, r, o, i] of Object.values(mc))
                if (!(o > t || t > i)) {
                    e.byte(n);
                    for (let l = 0; l < r; l++) e.byte(Number(t >> 8n * BigInt(l) & 0xffn));
                    return
                } throw e.err(`VarInt too big: ${t}`)
        },
        decodeStream: e => {
            const t = e.byte();
            if (t <= 252) return BigInt(t);
            const [n, r, o] = mc[t];
            let i = 0n;
            for (let l = 0; l < r; l++) i |= BigInt(e.byte()) << 8n * BigInt(l);
            if (i < o) throw e.err(`Wrong CompactSize(${8*r})`);
            return i
        }
    }),
    kt = co(Xi, cr.number),
    vc = e => Pe(Xi, e),
    fo = N(Xi),
    g1 = ke({
        hash: N(32, !0),
        index: ge,
        finalScriptSig: fo,
        sequence: ge
    }),
    yp = ke({
        amount: o1,
        script: fo
    }),
    gp = Pe(kt, fo),
    m1 = ke({
        version: s1,
        segwitFlag: a1(new Uint8Array([0, 1])),
        inputs: vc(g1),
        outputs: vc(yp),
        witnesses: c1("segwitFlag", Pe("inputs/length", gp)),
        lockTime: ge
    });

function v1(e) {
    if (e.segwitFlag && e.witnesses && !e.witnesses.length) throw new Error("Segwit flag with empty witnesses array");
    return e
}
const mp = lt(m1, v1),
    Zi = ke({
        fingerprint: l1,
        path: Pe(null, ge)
    }),
    w1 = ke({
        version: oo,
        internalKey: N(32),
        merklePath: Pe(null, N(32))
    }),
    zs = lt(w1, e => {
        if (e.merklePath.length > 128) throw new Error("TaprootControlBlock: merklePath should be of length 0..128 (inclusive)");
        return e
    }),
    vp = ke({
        hashes: Pe(kt, N(32)),
        der: Zi
    }),
    wp = {
        unsignedTx: [0, !1, mp, [0],
            [2],
            [0]
        ],
        xpub: [1, N(78), Zi, [],
            [],
            [0, 2]
        ],
        txVersion: [2, !1, ge, [2],
            [0],
            [2]
        ],
        fallbackLocktime: [3, !1, ge, [],
            [0],
            [2]
        ],
        inputCount: [4, !1, kt, [2],
            [0],
            [2]
        ],
        outputCount: [5, !1, kt, [2],
            [0],
            [2]
        ],
        txModifiable: [6, !1, oo, [],
            [0],
            [2]
        ],
        version: [251, !1, ge, [],
            [],
            [0, 2]
        ],
        propietary: [252, N(null), N(null), [],
            [],
            [0, 2]
        ]
    },
    Sp = {
        nonWitnessUtxo: [0, !1, mp, [],
            [],
            [0, 2]
        ],
        witnessUtxo: [1, !1, yp, [],
            [],
            [0, 2]
        ],
        partialSig: [2, Rs, N(null), [],
            [],
            [0, 2]
        ],
        sighashType: [3, !1, ge, [],
            [],
            [0, 2]
        ],
        redeemScript: [4, !1, N(null), [],
            [],
            [0, 2]
        ],
        witnessScript: [5, !1, N(null), [],
            [],
            [0, 2]
        ],
        bip32Derivation: [6, Rs, Zi, [],
            [],
            [0, 2]
        ],
        finalScriptSig: [7, !1, N(null), [],
            [],
            [0, 2]
        ],
        finalScriptWitness: [8, !1, gp, [],
            [],
            [0, 2]
        ],
        porCommitment: [9, !1, N(null), [],
            [],
            [0, 2]
        ],
        ripemd160: [10, N(20), N(null), [],
            [],
            [0, 2]
        ],
        sha256: [11, N(32), N(null), [],
            [],
            [0, 2]
        ],
        hash160: [12, N(20), N(null), [],
            [],
            [0, 2]
        ],
        hash256: [13, N(32), N(null), [],
            [],
            [0, 2]
        ],
        hash: [14, !1, N(32), [2],
            [0],
            [2]
        ],
        index: [15, !1, ge, [2],
            [0],
            [2]
        ],
        sequence: [16, !1, ge, [],
            [0],
            [2]
        ],
        requiredTimeLocktime: [17, !1, ge, [],
            [0],
            [2]
        ],
        requiredHeightLocktime: [18, !1, ge, [],
            [0],
            [2]
        ],
        tapKeySig: [19, !1, gc, [],
            [],
            [0, 2]
        ],
        tapScriptSig: [20, ke({
                pubKey: _i,
                leafHash: N(32)
            }), gc, [],
            [],
            [0, 2]
        ],
        tapLeafScript: [21, zs, N(null), [],
            [],
            [0, 2]
        ],
        tapBip32Derivation: [22, N(32), vp, [],
            [],
            [0, 2]
        ],
        tapInternalKey: [23, !1, _i, [],
            [],
            [0, 2]
        ],
        tapMerkleRoot: [24, !1, N(32), [],
            [],
            [0, 2]
        ],
        propietary: [252, N(null), N(null), [],
            [],
            [0, 2]
        ]
    },
    Ep = {
        redeemScript: [0, !1, N(null), [],
            [],
            [0, 2]
        ],
        witnessScript: [1, !1, N(null), [],
            [],
            [0, 2]
        ],
        bip32Derivation: [2, Rs, Zi, [],
            [],
            [0, 2]
        ],
        amount: [3, !1, i1, [2],
            [0],
            [2]
        ],
        script: [4, !1, N(null), [2],
            [0],
            [2]
        ],
        tapInternalKey: [5, !1, _i, [],
            [],
            [0, 2]
        ],
        tapTree: [6, !1, Pe(null, ke({
                depth: oo,
                version: oo,
                script: fo
            })), [],
            [],
            [0, 2]
        ],
        tapBip32Derivation: [7, _i, vp, [],
            [],
            [0, 2]
        ],
        propietary: [252, N(null), N(null), [],
            [],
            [0, 2]
        ]
    },
    wc = Pe(Fu, ke({
        key: d1(kt, ke({
            type: kt,
            key: N(null)
        })),
        value: N(kt)
    })),
    Sc = ke({
        type: kt,
        key: N(null)
    });

function Vu(e) {
    const t = {};
    for (const n in e) {
        const [r, o, i] = e[n];
        t[r] = [n, o, i]
    }
    return fe({
        encodeStream: (n, r) => {
            let o = [];
            for (const i in e) {
                const l = r[i];
                if (l === void 0) continue;
                const [s, u, a] = e[i];
                if (!u) o.push({
                    key: {
                        type: s,
                        key: Wi
                    },
                    value: a.encode(l)
                });
                else {
                    const f = l.map(([d, p]) => [u.encode(d), a.encode(p)]);
                    f.sort((d, p) => Us(d[0], p[0]));
                    for (const [d, p] of f) o.push({
                        key: {
                            key: d,
                            type: s
                        },
                        value: p
                    })
                }
            }
            if (r.unknown) {
                r.unknown.sort((i, l) => Us(i[0], l[0]));
                for (const [i, l] of r.unknown) o.push({
                    key: Sc.decode(i),
                    value: l
                })
            }
            wc.encodeStream(n, o)
        },
        decodeStream: n => {
            const r = wc.decodeStream(n),
                o = {},
                i = {};
            for (const l of r) {
                let s = "unknown",
                    u = l.key.key,
                    a = l.value;
                if (t[l.key.type]) {
                    const [f, d, p] = t[l.key.type];
                    if (s = f, !d && u.length) throw new Error(`PSBT: Non-empty key for ${s} (key=${k.encode(u)} value=${k.encode(a)}`);
                    if (u = d ? d.decode(u) : void 0, a = p.decode(a), !d) {
                        if (o[s]) throw new Error(`PSBT: Same keys: ${s} (key=${u} value=${a})`);
                        o[s] = a, i[s] = !0;
                        continue
                    }
                } else u = Sc.encode({
                    type: l.key.type,
                    key: l.key.key
                });
                if (i[s]) throw new Error(`PSBT: Key type with empty key and no key=${s} val=${a}`);
                o[s] || (o[s] = []), o[s].push([u, a])
            }
            return o
        }
    })
}

function Ec(e, t) {
    if (!ht(e.hash, In(t))) throw new Error("checkScript: wsh wrong witnessScript hash");
    const n = Ee.decode(t);
    if (n.type === "tr" || n.type === "tr_ns" || n.type === "tr_ms") throw new Error(`checkScript: P2${n.type} cannot be wrapped in P2SH`);
    if (n.type === "wpkh" || n.type === "sh") throw new Error(`checkScript: P2${n.type} cannot be wrapped in P2WSH`)
}

function kp(e, t, n) {
    if (e) {
        const r = Ee.decode(e);
        if (r.type === "tr_ns" || r.type === "tr_ms" || r.type === "ms" || r.type == "pk") throw new Error(`checkScript: non-wrapped ${r.type}`);
        if (r.type === "sh" && t) {
            if (!ht(r.hash, Yi(t))) throw new Error("checkScript: sh wrong redeemScript hash");
            const o = Ee.decode(t);
            if (o.type === "tr" || o.type === "tr_ns" || o.type === "tr_ms") throw new Error(`checkScript: P2${o.type} cannot be wrapped in P2SH`);
            if (o.type === "sh") throw new Error("checkScript: P2SH cannot be wrapped in P2SH")
        }
        r.type === "wsh" && n && Ec(r, n)
    }
    if (t) {
        const r = Ee.decode(t);
        r.type === "wsh" && n && Ec(r, n)
    }
}
const xp = lt(Vu(Sp), e => {
        if (e.finalScriptWitness && !e.finalScriptWitness.length) throw new Error("validateInput: wmpty finalScriptWitness");
        if (e.partialSig && !e.partialSig.length) throw new Error("Empty partialSig");
        if (e.partialSig)
            for (const [t, n] of e.partialSig) lr(t, ue.ecdsa);
        if (e.bip32Derivation)
            for (const [t, n] of e.bip32Derivation) lr(t, ue.ecdsa);
        if (e.requiredTimeLocktime !== void 0 && e.requiredTimeLocktime < 5e8) throw new Error(`validateInput: wrong timeLocktime=${e.requiredTimeLocktime}`);
        if (e.requiredHeightLocktime !== void 0 && (e.requiredHeightLocktime <= 0 || e.requiredHeightLocktime >= 5e8)) throw new Error(`validateInput: wrong heighLocktime=${e.requiredHeightLocktime}`);
        if (e.nonWitnessUtxo && e.index !== void 0) {
            const t = e.nonWitnessUtxo.outputs.length - 1;
            if (e.index > t) throw new Error(`validateInput: index(${e.index}) not in nonWitnessUtxo`);
            const n = e.nonWitnessUtxo.outputs[e.index];
            if (e.witnessUtxo && (!ht(e.witnessUtxo.script, n.script) || e.witnessUtxo.amount !== n.amount)) throw new Error("validateInput: witnessUtxo different from nonWitnessUtxo")
        }
        if (e.tapLeafScript)
            for (const [t, n] of e.tapLeafScript) {
                if ((t.version & 254) !== n[n.length - 1]) throw new Error("validateInput: tapLeafScript version mimatch");
                if (n[n.length - 1] & 1) throw new Error("validateInput: tapLeafScript version has parity bit!")
            }
        return e
    }),
    Cp = lt(Vu(Ep), e => {
        if (e.bip32Derivation)
            for (const [t, n] of e.bip32Derivation) lr(t, ue.ecdsa);
        return e
    }),
    _p = lt(Vu(wp), e => {
        if ((e.version || 0) === 0) {
            if (!e.unsignedTx) throw new Error("PSBTv0: missing unsignedTx");
            if (e.unsignedTx.segwitFlag || e.unsignedTx.witnesses) throw new Error("PSBTv0: witness in unsingedTx");
            for (const n of e.unsignedTx.inputs)
                if (n.finalScriptSig && n.finalScriptSig.length) throw new Error("PSBTv0: input scriptSig found in unsignedTx")
        }
        return e
    }),
    S1 = ke({
        magic: Gi(Qi(new Uint8Array([255])), "psbt"),
        global: _p,
        inputs: Pe("global/unsignedTx/inputs/length", xp),
        outputs: Pe(null, Cp)
    }),
    E1 = ke({
        magic: Gi(Qi(new Uint8Array([255])), "psbt"),
        global: _p,
        inputs: Pe("global/inputCount", xp),
        outputs: Pe("global/outputCount", Cp)
    });
ke({
    magic: Gi(Qi(new Uint8Array([255])), "psbt"),
    items: Pe(null, co(Pe(Fu, f1([u1(kt), N(Xi)])), cr.dict()))
});

function Pl(e, t, n) {
    for (const r in n) {
        if (r === "unknown" || !t[r]) continue;
        const [o, i, l] = t[r].slice(-3);
        if (i.includes(e) || !l.includes(e)) throw new Error(`PSBTv${e}: field ${r} is not allowed`)
    }
    for (const r in t) {
        const [o, i, l] = t[r].slice(-3);
        if (o.includes(e) && n[r] === void 0) throw new Error(`PSBTv${e}: missing required field ${r}`)
    }
}

function Ap(e) {
    const t = e && e.global && e.global.version || 0;
    Pl(t, wp, e.global);
    for (const l of e.inputs) Pl(t, Sp, l);
    for (const l of e.outputs) Pl(t, Ep, l);
    const n = t ? e.global.inputCount : e.global.unsignedTx.inputs.length;
    if (e.inputs.length < n) throw new Error("Not enough inputs");
    const r = e.inputs.slice(n);
    if (r.length > 1 || r.length && Object.keys(r[0]).length) throw new Error(`Unexpected inputs left in tx=${r}`);
    const o = t ? e.global.outputCount : e.global.unsignedTx.outputs.length;
    if (e.outputs.length < o) throw new Error("Not outputs inputs");
    const i = e.outputs.slice(o);
    if (i.length > 1 || i.length && Object.keys(i[0]).length) throw new Error(`Unexpected outputs left in tx=${i}`);
    return e
}
lt(S1, Ap);
lt(E1, Ap);
ke({
    hash: N(32, !0),
    index: ge
});
const pt = e => e instanceof Uint8Array,
    k1 = {
        encode(e) {
            if (!(e.length !== 2 || !We(e[0]) || !jt(e[0], ue.ecdsa) || e[1] !== "CHECKSIG")) return {
                type: "pk",
                pubkey: e[0]
            }
        },
        decode: e => e.type === "pk" ? [e.pubkey, "CHECKSIG"] : void 0
    },
    x1 = {
        encode(e) {
            if (!(e.length !== 5 || e[0] !== "DUP" || e[1] !== "HASH160" || !pt(e[2])) && !(e[3] !== "EQUALVERIFY" || e[4] !== "CHECKSIG")) return {
                type: "pkh",
                hash: e[2]
            }
        },
        decode: e => e.type === "pkh" ? ["DUP", "HASH160", e.hash, "EQUALVERIFY", "CHECKSIG"] : void 0
    },
    C1 = (e, t = Nn) => {
        if (!jt(e, ue.ecdsa)) throw new Error("P2PKH: invalid publicKey");
        const n = Yi(e);
        return {
            type: "pkh",
            script: Ee.encode({
                type: "pkh",
                hash: n
            }),
            address: po(t).encode({
                type: "pkh",
                hash: n
            })
        }
    },
    _1 = {
        encode(e) {
            if (!(e.length !== 3 || e[0] !== "HASH160" || !pt(e[1]) || e[2] !== "EQUAL")) return {
                type: "sh",
                hash: e[1]
            }
        },
        decode: e => e.type === "sh" ? ["HASH160", e.hash, "EQUAL"] : void 0
    },
    A1 = (e, t = Nn) => {
        const n = Yi(e.script),
            r = Ee.encode({
                type: "sh",
                hash: n
            });
        kp(r, e.script, e.witnessScript);
        const o = {
            type: "sh",
            redeemScript: e.script,
            script: Ee.encode({
                type: "sh",
                hash: n
            }),
            address: po(t).encode({
                type: "sh",
                hash: n
            })
        };
        return e.witnessScript && (o.witnessScript = e.witnessScript), o
    },
    T1 = {
        encode(e) {
            if (!(e.length !== 2 || e[0] !== "OP_0" || !pt(e[1])) && e[1].length === 32) return {
                type: "wsh",
                hash: e[1]
            }
        },
        decode: e => e.type === "wsh" ? ["OP_0", e.hash] : void 0
    },
    I1 = (e, t = Nn) => {
        const n = In(e.script),
            r = Ee.encode({
                type: "wsh",
                hash: n
            });
        return kp(r, void 0, e.script), {
            type: "wsh",
            witnessScript: e.script,
            script: Ee.encode({
                type: "wsh",
                hash: n
            }),
            address: po(t).encode({
                type: "wsh",
                hash: n
            })
        }
    },
    N1 = {
        encode(e) {
            if (!(e.length !== 2 || e[0] !== "OP_0" || !pt(e[1])) && e[1].length === 20) return {
                type: "wpkh",
                hash: e[1]
            }
        },
        decode: e => e.type === "wpkh" ? ["OP_0", e.hash] : void 0
    },
    Tp = (e, t = Nn) => {
        if (!jt(e, ue.ecdsa)) throw new Error("P2WPKH: invalid publicKey");
        if (e.length === 65) throw new Error("P2WPKH: uncompressed public key");
        const n = Yi(e);
        return {
            type: "wpkh",
            script: Ee.encode({
                type: "wpkh",
                hash: n
            }),
            address: po(t).encode({
                type: "wpkh",
                hash: n
            })
        }
    },
    P1 = {
        encode(e) {
            const t = e.length - 1;
            if (e[t] !== "CHECKMULTISIG") return;
            const n = Hs(e[0]),
                r = Hs(e[t - 1]);
            if (n === void 0 || r === void 0) throw new Error("OutScript.encode/multisig wrong params");
            const o = e.slice(1, -2);
            if (r !== o.length) throw new Error("OutScript.encode/multisig: wrong length");
            return {
                type: "ms",
                m: n,
                pubkeys: o
            }
        },
        decode: e => e.type === "ms" ? [`OP_${e.m}`, ...e.pubkeys, `OP_${e.pubkeys.length}`, "CHECKMULTISIG"] : void 0
    },
    Ip = (e, t, n = !1) => (n || ju(t), {
        type: "ms",
        script: Ee.encode({
            type: "ms",
            pubkeys: t,
            m: e
        })
    }),
    L1 = {
        encode(e) {
            if (!(e.length !== 2 || e[0] !== "OP_1" || !pt(e[1]))) return {
                type: "tr",
                pubkey: e[1]
            }
        },
        decode: e => e.type === "tr" ? ["OP_1", e.pubkey] : void 0
    };

function R1(e) {
    const t = Array.from(e);
    for (; t.length >= 2;) {
        t.sort((l, s) => (s.weight || 1) - (l.weight || 1));
        const r = t.pop(),
            o = t.pop(),
            i = (o?.weight || 1) + (r?.weight || 1);
        t.push({
            weight: i,
            childs: [o.childs || o, r.childs || r]
        })
    }
    const n = t[0];
    return n.childs || n
}

function U1(e, t = !1) {
    const n = Ee.decode(e);
    if (!(n.type === "unknown" && t) && !["tr_ns", "tr_ms"].includes(n.type)) throw new Error(`P2TR: invalid leaf script=${n.type}`)
}

function Ds(e, t = !1) {
    if (!e) throw new Error("taprootHashTree: empty tree");
    if (Array.isArray(e) && e.length === 1 && (e = e[0]), !Array.isArray(e)) {
        const {
            leafVersion: l,
            script: s,
            tapInternalKey: u
        } = e;
        if (e.tapLeafScript || e.tapMerkleRoot && !ht(e.tapMerkleRoot, Wi)) throw new Error("P2TR: tapRoot leafScript cannot have tree");
        if (u && ht(u, Np)) throw new Error("P2TR: tapRoot leafScript cannot have unspendble key");
        const a = typeof s == "string" ? k.decode(s) : s;
        return U1(a, t), {
            type: "leaf",
            tapInternalKey: u,
            version: l,
            script: a,
            hash: j1(a, l)
        }
    }
    if (e.length !== 2 && (e = R1(e)), e.length !== 2) throw new Error("hashTree: non binary tree!");
    const n = Ds(e[0], t),
        r = Ds(e[1], t);
    let [o, i] = [n.hash, r.hash];
    return Us(i, o) === -1 && ([o, i] = [i, o]), {
        type: "branch",
        left: n,
        right: r,
        hash: Ku("TapBranch", o, i)
    }
}

function $s(e, t = []) {
    if (!e) throw new Error("taprootAddPath: empty tree");
    if (e.type === "leaf") return {
        ...e,
        path: t
    };
    if (e.type !== "branch") throw new Error(`taprootAddPath: wrong type=${e}`);
    return {
        ...e,
        path: t,
        left: $s(e.left, [e.right.hash, ...t]),
        right: $s(e.right, [e.left.hash, ...t])
    }
}

function Ms(e) {
    if (!e) throw new Error("taprootAddPath: empty tree");
    if (e.type === "leaf") return [e];
    if (e.type !== "branch") throw new Error(`taprootWalkTree: wrong type=${e}`);
    return [...Ms(e.left), ...Ms(e.right)]
}
const Np = In(z.BASE.toRawBytes(!1));

function fr(e, t, n = Nn, r = !1) {
    if (!e && !t) throw new Error("p2tr: should have pubKey or scriptTree (or both)");
    const o = typeof e == "string" ? k.decode(e) : e || Np;
    if (!jt(o, ue.schnorr)) throw new Error("p2tr: non-schnorr pubkey");
    let i = t ? $s(Ds(t, r)) : void 0;
    const l = i ? i.hash : void 0,
        [s, u] = h1(o, l || Wi);
    let a;
    i && (a = Ms(i).map(p => ({
        ...p,
        controlBlock: zs.encode({
            version: (p.version || Ks) + +u,
            internalKey: p.tapInternalKey || o,
            merklePath: p.path
        })
    })));
    let f;
    a && (f = a.map(p => [zs.decode(p.controlBlock), bi(p.script, new Uint8Array([p.version || Ks]))]));
    const d = {
        type: "tr",
        script: Ee.encode({
            type: "tr",
            pubkey: s
        }),
        address: po(n).encode({
            type: "tr",
            pubkey: s
        }),
        tweakedPubkey: s,
        tapInternalKey: o
    };
    return a && (d.leaves = a), f && (d.tapLeafScript = f), l && (d.tapMerkleRoot = l), d
}
const H1 = {
    encode(e) {
        const t = e.length - 1;
        if (e[t] !== "CHECKSIG") return;
        const n = [];
        for (let r = 0; r < t; r++) {
            const o = e[r];
            if (r & 1) {
                if (o !== "CHECKSIGVERIFY") throw new Error("OutScript.encode/tr_ns: wrong element");
                if (r === t - 1) throw new Error("OutScript.encode/tr_ns: wrong element");
                continue
            }
            if (!pt(o)) throw new Error("OutScript.encode/tr_ns: wrong element");
            n.push(o)
        }
        return {
            type: "tr_ns",
            pubkeys: n
        }
    },
    decode: e => {
        if (e.type !== "tr_ns") return;
        const t = [];
        for (let n = 0; n < e.pubkeys.length - 1; n++) t.push(e.pubkeys[n], "CHECKSIGVERIFY");
        return t.push(e.pubkeys[e.pubkeys.length - 1], "CHECKSIG"), t
    }
};

function B1(e, t) {
    const n = [];
    if (!Array.isArray(t)) throw new Error("combinations: lst arg should be array");
    const r = t.length;
    if (e > r) throw new Error("combinations: m > lst.length, no combinations possible");
    const o = Array.from({
            length: e
        }, (l, s) => s),
        i = o.length - 1;
    e: for (;;) {
        n.push(o.map(s => t[s])), o[i] += 1;
        let l = i;
        for (; l >= 0 && o[l] > r - e + l; l--) {
            if (o[l] = 0, l === 0) break e;
            o[l - 1] += 1
        }
        for (l += 1; l < o.length; l++) o[l] = o[l - 1] + 1
    }
    return n
}
const yn = (e, t, n = !1) => (n || ju(t), B1(e, t).map(r => ({
        type: "tr_ns",
        script: Ee.encode({
            type: "tr_ns",
            pubkeys: r
        })
    }))),
    z1 = e => yn(1, [e], void 0)[0],
    D1 = {
        encode(e) {
            const t = e.length - 1;
            if (e[t] !== "NUMEQUAL" || e[1] !== "CHECKSIG") return;
            const n = [],
                r = Hs(e[t - 1]);
            if (r !== void 0) {
                for (let o = 0; o < t - 1; o++) {
                    const i = e[o];
                    if (o & 1) {
                        if (i !== (o === 1 ? "CHECKSIG" : "CHECKSIGADD")) throw new Error("OutScript.encode/tr_ms: wrong element");
                        continue
                    }
                    if (!pt(i)) throw new Error("OutScript.encode/tr_ms: wrong key element");
                    n.push(i)
                }
                return {
                    type: "tr_ms",
                    pubkeys: n,
                    m: r
                }
            }
        },
        decode: e => {
            if (e.type !== "tr_ms") return;
            const t = [e.pubkeys[0], "CHECKSIG"];
            for (let n = 1; n < e.pubkeys.length; n++) t.push(e.pubkeys[n], "CHECKSIGADD");
            return t.push(`OP_${e.m}`, "NUMEQUAL"), t
        }
    };

function $1(e, t, n = !1) {
    return n || ju(t), {
        type: "tr_ms",
        script: Ee.encode({
            type: "tr_ms",
            pubkeys: t,
            m: e
        })
    }
}
const M1 = {
        encode(e) {
            return {
                type: "unknown",
                script: Bs.encode(e)
            }
        },
        decode: e => e.type === "unknown" ? Bs.decode(e.script) : void 0
    },
    F1 = [k1, x1, _1, T1, N1, P1, L1, H1, D1, M1],
    K1 = co(Bs, cr.match(F1)),
    Ee = lt(K1, e => {
        if (e.type === "pk" && !jt(e.pubkey, ue.ecdsa)) throw new Error("OutScript/pk: wrong key");
        if ((e.type === "pkh" || e.type === "sh" || e.type === "wpkh") && (!pt(e.hash) || e.hash.length !== 20)) throw new Error(`OutScript/${e.type}: wrong hash`);
        if (e.type === "wsh" && (!pt(e.hash) || e.hash.length !== 32)) throw new Error("OutScript/wsh: wrong hash");
        if (e.type === "tr" && (!pt(e.pubkey) || !jt(e.pubkey, ue.schnorr))) throw new Error("OutScript/tr: wrong taproot public key");
        if ((e.type === "ms" || e.type === "tr_ns" || e.type === "tr_ms") && !Array.isArray(e.pubkeys)) throw new Error("OutScript/multisig: wrong pubkeys array");
        if (e.type === "ms") {
            const t = e.pubkeys.length;
            for (const n of e.pubkeys)
                if (!jt(n, ue.ecdsa)) throw new Error("OutScript/multisig: wrong pubkey");
            if (e.m <= 0 || t > 16 || e.m > t) throw new Error("OutScript/multisig: invalid params")
        }
        if (e.type === "tr_ns" || e.type === "tr_ms") {
            for (const t of e.pubkeys)
                if (!jt(t, ue.schnorr)) throw new Error(`OutScript/${e.type}: wrong pubkey`)
        }
        if (e.type === "tr_ms") {
            const t = e.pubkeys.length;
            if (e.m <= 0 || t > 16 || e.m > t) throw new Error("OutScript/tr_ms: invalid params")
        }
        return e
    });

function Pp(e, t) {
    if (t.length < 2 || t.length > 40) throw new Error("Witness: invalid length");
    if (e > 16) throw new Error("Witness: invalid version");
    if (e === 0 && !(t.length === 20 || t.length === 32)) throw new Error("Witness: invalid length for version")
}

function Ll(e, t, n = Nn) {
    Pp(e, t);
    const r = e === 0 ? Is : rp;
    return r.encode(n.bech32, [e].concat(r.toWords(t)))
}

function kc(e, t) {
    return p1.encode(bi(Uint8Array.from(t), e))
}

function po(e = Nn) {
    return {
        encode(t) {
            const {
                type: n
            } = t;
            return n === "wpkh" || n === "wsh" ? Ll(0, t.hash, e) : n === "tr" ? Ll(1, t.pubkey, e) : n === "pkh" ? kc(t.hash, [e.pubKeyHash]) : n === "sh" ? kc(t.hash, [e.scriptHash]) : 1
        },
        decode(t) {
            if (t.length < 14 || t.length > 74) throw new Error("Invalid address length");
            if (e.bech32 && t.toLowerCase().startsWith(e.bech32)) {
                let r;
                try {
                    if (r = Is.decode(t), r.words[0] !== 0) throw new Error(`bech32: wrong version=${r.words[0]}`)
                } catch {
                    if (r = rp.decode(t), r.words[0] === 0) throw new Error(`bech32m: wrong version=${r.words[0]}`)
                }
                if (r.prefix !== e.bech32) throw new Error(`wrong bech32 prefix=${r.prefix}`);
                const [o, ...i] = r.words, l = Is.fromWords(i);
                if (Pp(o, l), o === 0 && l.length === 32) return {
                    type: "wsh",
                    hash: l
                };
                if (o === 0 && l.length === 20) return {
                    type: "wpkh",
                    hash: l
                };
                if (o === 1 && l.length === 32) return {
                    type: "tr",
                    pubkey: l
                };
                throw new Error("Unkown witness program")
            }
            const n = Kt.decode(t);
            if (n.length !== 25) throw new Error("Invalid base58 address");
            if (n[0] === e.pubKeyHash) {
                const r = Kt.decode(t);
                return {
                    type: "pkh",
                    hash: r.slice(1, r.length - 4)
                }
            } else if (n[0] === e.scriptHash) {
                const r = Kt.decode(t);
                return {
                    type: "sh",
                    hash: Kt.decode(t).slice(1, r.length - 4)
                }
            }
            throw new Error(`Invalid address prefix=${n[0]}`)
        }
    }
}
var Fs;
(function(e) {
    e[e.DEFAULT = 0] = "DEFAULT", e[e.ALL = 1] = "ALL", e[e.NONE = 2] = "NONE", e[e.SINGLE = 3] = "SINGLE", e[e.ANYONECANPAY = 128] = "ANYONECANPAY", e[e.ALL_SIGHASH_ANYONECANPAY = 129] = "ALL_SIGHASH_ANYONECANPAY", e[e.NONE_SIGHASH_ANYONECANPAY = 130] = "NONE_SIGHASH_ANYONECANPAY", e[e.SINGLE_SIGHASH_ANYONECANPAY = 131] = "SINGLE_SIGHASH_ANYONECANPAY"
})(Fs || (Fs = {}));
co(ge, cr.tsEnum(Fs));
const Ks = 192,
    j1 = (e, t = Ks) => Ku("TapLeaf", new Uint8Array([t]), fo.encode(e));
var Ou = {
        exports: {}
    },
    qi = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
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