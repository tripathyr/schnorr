
        var t,
            e,
            r,
            i,
            o,
            s,
            a,
            c = {},
            l = [],
            f = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
        function u(t, e) {
            for (var n in e) t[n] = e[n];
            return t;
        }
        function d(t) {
            var e = t.parentNode;
            e && e.removeChild(t);
        }
        function h(e, n, r) {
            var i,
                o,
                s,
                a = {};
            for (s in n) "key" == s ? (i = n[s]) : "ref" == s ? (o = n[s]) : (a[s] = n[s]);
            if ((arguments.length > 2 && (a.children = arguments.length > 3 ? t.call(arguments, 2) : r), "function" == typeof e && null != e.defaultProps)) for (s in e.defaultProps) void 0 === a[s] && (a[s] = e.defaultProps[s]);
            return p(e, a, i, o, null);
        }
        function p(t, n, i, o, s) {
            var a = { type: t, props: n, key: i, ref: o, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: null == s ? ++r : s };
            return null == s && null != e.vnode && e.vnode(a), a;
        }
        function y(t) {
            return t.children;
        }
        function _(t, e) {
            (this.props = t), (this.context = e);
        }
        function m(t, e) {
            if (null == e) return t.__ ? m(t.__, t.__.__k.indexOf(t) + 1) : null;
            for (var n; e < t.__k.length; e++) if (null != (n = t.__k[e]) && null != n.__e) return n.__e;
            return "function" == typeof t.type ? m(t) : null;
        }
        function b(t) {
            var e, n;
            if (null != (t = t.__) && null != t.__c) {
                for (t.__e = t.__c.base = null, e = 0; e < t.__k.length; e++)
                    if (null != (n = t.__k[e]) && null != n.__e) {
                        t.__e = t.__c.base = n.__e;
                        break;
                    }
                return b(t);
            }
        }
        function w(t) {
            ((!t.__d && (t.__d = !0) && i.push(t) && !g.__r++) || s !== e.debounceRendering) && ((s = e.debounceRendering) || o)(g);
        }
        function g() {
            for (var t; (g.__r = i.length); )
                (t = i.sort(function (t, e) {
                    return t.__v.__b - e.__v.__b;
                })),
                    (i = []),
                    t.some(function (t) {
                        var e, n, r, i, o, s;
                        t.__d &&
                            ((o = (i = (e = t).__v).__e),
                            (s = e.__P) && ((n = []), ((r = u({}, i)).__v = i.__v + 1), O(s, i, r, e.__n, void 0 !== s.ownerSVGElement, null != i.__h ? [o] : null, n, null == o ? m(i) : o, i.__h), I(n, i), i.__e != o && b(i)));
                    });
        }
        function v(t, e, n, r, i, o, s, a, f, u) {
            var d,
                h,
                _,
                b,
                w,
                g,
                v,
                E = (r && r.__k) || l,
                S = E.length;
            for (n.__k = [], d = 0; d < e.length; d++)
                if (
                    null !=
                    (b = n.__k[d] =
                        null == (b = e[d]) || "boolean" == typeof b
                            ? null
                            : "string" == typeof b || "number" == typeof b || "bigint" == typeof b
                            ? p(null, b, null, null, b)
                            : Array.isArray(b)
                            ? p(y, { children: b }, null, null, null)
                            : b.__b > 0
                            ? p(b.type, b.props, b.key, null, b.__v)
                            : b)
                ) {
                    if (((b.__ = n), (b.__b = n.__b + 1), null === (_ = E[d]) || (_ && b.key == _.key && b.type === _.type))) E[d] = void 0;
                    else
                        for (h = 0; h < S; h++) {
                            if ((_ = E[h]) && b.key == _.key && b.type === _.type) {
                                E[h] = void 0;
                                break;
                            }
                            _ = null;
                        }
                    O(t, b, (_ = _ || c), i, o, s, a, f, u),
                        (w = b.__e),
                        (h = b.ref) && _.ref != h && (v || (v = []), _.ref && v.push(_.ref, null, b), v.push(h, b.__c || w, b)),
                        null != w
                            ? (null == g && (g = w), "function" == typeof b.type && b.__k === _.__k ? (b.__d = f = x(b, f, t)) : (f = B(t, b, _, E, w, f)), "function" == typeof n.type && (n.__d = f))
                            : f && _.__e == f && f.parentNode != t && (f = m(_));
                }
            for (n.__e = g, d = S; d--; ) null != E[d] && ("function" == typeof n.type && null != E[d].__e && E[d].__e == n.__d && (n.__d = m(r, d + 1)), U(E[d], E[d]));
            if (v) for (d = 0; d < v.length; d++) N(v[d], v[++d], v[++d]);
        }
        function x(t, e, n) {
            for (var r, i = t.__k, o = 0; i && o < i.length; o++) (r = i[o]) && ((r.__ = t), (e = "function" == typeof r.type ? x(r, e, n) : B(n, r, r, i, r.__e, e)));
            return e;
        }
        function E(t, e) {
            return (
                (e = e || []),
                null == t ||
                    "boolean" == typeof t ||
                    (Array.isArray(t)
                        ? t.some(function (t) {
                              E(t, e);
                          })
                        : e.push(t)),
                e
            );
        }
        function B(t, e, n, r, i, o) {
            var s, a, c;
            if (void 0 !== e.__d) (s = e.__d), (e.__d = void 0);
            else if (null == n || i != o || null == i.parentNode)
                t: if (null == o || o.parentNode !== t) t.appendChild(i), (s = null);
                else {
                    for (a = o, c = 0; (a = a.nextSibling) && c < r.length; c += 2) if (a == i) break t;
                    t.insertBefore(i, o), (s = o);
                }
            return void 0 !== s ? s : i.nextSibling;
        }
        function S(t, e, n) {
            "-" === e[0] ? t.setProperty(e, n) : (t[e] = null == n ? "" : "number" != typeof n || f.test(e) ? n : n + "px");
        }
        function A(t, e, n, r, i) {
            var o;
            t: if ("style" === e)
                if ("string" == typeof n) t.style.cssText = n;
                else {
                    if (("string" == typeof r && (t.style.cssText = r = ""), r)) for (e in r) (n && e in n) || S(t.style, e, "");
                    if (n) for (e in n) (r && n[e] === r[e]) || S(t.style, e, n[e]);
                }
            else if ("o" === e[0] && "n" === e[1])
                (o = e !== (e = e.replace(/Capture$/, ""))),
                    (e = e.toLowerCase() in t ? e.toLowerCase().slice(2) : e.slice(2)),
                    t.l || (t.l = {}),
                    (t.l[e + o] = n),
                    n ? r || t.addEventListener(e, o ? R : P, o) : t.removeEventListener(e, o ? R : P, o);
            else if ("dangerouslySetInnerHTML" !== e) {
                if (i) e = e.replace(/xlink[H:h]/, "h").replace(/sName$/, "s");
                else if ("href" !== e && "list" !== e && "form" !== e && "tabIndex" !== e && "download" !== e && e in t)
                    try {
                        t[e] = null == n ? "" : n;
                        break t;
                    } catch (t) {}
                "function" == typeof n || (null != n && (!1 !== n || ("a" === e[0] && "r" === e[1])) ? t.setAttribute(e, n) : t.removeAttribute(e));
            }
        }
        function P(t) {
            this.l[t.type + !1](e.event ? e.event(t) : t);
        }
        function R(t) {
            this.l[t.type + !0](e.event ? e.event(t) : t);
        }
        function O(t, n, r, i, o, s, a, c, l) {
            var f,
                d,
                h,
                p,
                m,
                b,
                w,
                g,
                x,
                E,
                B,
                S = n.type;
            if (void 0 !== n.constructor) return null;
            null != r.__h && ((l = r.__h), (c = n.__e = r.__e), (n.__h = null), (s = [c])), (f = e.__b) && f(n);
            try {
                t: if ("function" == typeof S) {
                    if (
                        ((g = n.props),
                        (x = (f = S.contextType) && i[f.__c]),
                        (E = f ? (x ? x.props.value : f.__) : i),
                        r.__c
                            ? (w = (d = n.__c = r.__c).__ = d.__E)
                            : ("prototype" in S && S.prototype.render ? (n.__c = d = new S(g, E)) : ((n.__c = d = new _(g, E)), (d.constructor = S), (d.render = C)),
                              x && x.sub(d),
                              (d.props = g),
                              d.state || (d.state = {}),
                              (d.context = E),
                              (d.__n = i),
                              (h = d.__d = !0),
                              (d.__h = [])),
                        null == d.__s && (d.__s = d.state),
                        null != S.getDerivedStateFromProps && (d.__s == d.state && (d.__s = u({}, d.__s)), u(d.__s, S.getDerivedStateFromProps(g, d.__s))),
                        (p = d.props),
                        (m = d.state),
                        h)
                    )
                        null == S.getDerivedStateFromProps && null != d.componentWillMount && d.componentWillMount(), null != d.componentDidMount && d.__h.push(d.componentDidMount);
                    else {
                        if (
                            (null == S.getDerivedStateFromProps && g !== p && null != d.componentWillReceiveProps && d.componentWillReceiveProps(g, E),
                            (!d.__e && null != d.shouldComponentUpdate && !1 === d.shouldComponentUpdate(g, d.__s, E)) || n.__v === r.__v)
                        ) {
                            (d.props = g),
                                (d.state = d.__s),
                                n.__v !== r.__v && (d.__d = !1),
                                (d.__v = n),
                                (n.__e = r.__e),
                                (n.__k = r.__k),
                                n.__k.forEach(function (t) {
                                    t && (t.__ = n);
                                }),
                                d.__h.length && a.push(d);
                            break t;
                        }
                        null != d.componentWillUpdate && d.componentWillUpdate(g, d.__s, E),
                            null != d.componentDidUpdate &&
                                d.__h.push(function () {
                                    d.componentDidUpdate(p, m, b);
                                });
                    }
                    (d.context = E),
                        (d.props = g),
                        (d.state = d.__s),
                        (f = e.__r) && f(n),
                        (d.__d = !1),
                        (d.__v = n),
                        (d.__P = t),
                        (f = d.render(d.props, d.state, d.context)),
                        (d.state = d.__s),
                        null != d.getChildContext && (i = u(u({}, i), d.getChildContext())),
                        h || null == d.getSnapshotBeforeUpdate || (b = d.getSnapshotBeforeUpdate(p, m)),
                        (B = null != f && f.type === y && null == f.key ? f.props.children : f),
                        v(t, Array.isArray(B) ? B : [B], n, r, i, o, s, a, c, l),
                        (d.base = n.__e),
                        (n.__h = null),
                        d.__h.length && a.push(d),
                        w && (d.__E = d.__ = null),
                        (d.__e = !1);
                } else null == s && n.__v === r.__v ? ((n.__k = r.__k), (n.__e = r.__e)) : (n.__e = k(r.__e, n, r, i, o, s, a, l));
                (f = e.diffed) && f(n);
            } catch (t) {
                (n.__v = null), (l || null != s) && ((n.__e = c), (n.__h = !!l), (s[s.indexOf(c)] = null)), e.__e(t, n, r);
            }
        }
        function I(t, n) {
            e.__c && e.__c(n, t),
                t.some(function (n) {
                    try {
                        (t = n.__h),
                            (n.__h = []),
                            t.some(function (t) {
                                t.call(n);
                            });
                    } catch (t) {
                        e.__e(t, n.__v);
                    }
                });
        }
        function k(e, n, r, i, o, s, a, l) {
            var f,
                u,
                h,
                p = r.props,
                y = n.props,
                _ = n.type,
                b = 0;
            if (("svg" === _ && (o = !0), null != s))
                for (; b < s.length; b++)
                    if ((f = s[b]) && "setAttribute" in f == !!_ && (_ ? f.localName === _ : 3 === f.nodeType)) {
                        (e = f), (s[b] = null);
                        break;
                    }
            if (null == e) {
                if (null === _) return document.createTextNode(y);
                (e = o ? document.createElementNS("http://www.w3.org/2000/svg", _) : document.createElement(_, y.is && y)), (s = null), (l = !1);
            }
            if (null === _) p === y || (l && e.data === y) || (e.data = y);
            else {
                if (((s = s && t.call(e.childNodes)), (u = (p = r.props || c).dangerouslySetInnerHTML), (h = y.dangerouslySetInnerHTML), !l)) {
                    if (null != s) for (p = {}, b = 0; b < e.attributes.length; b++) p[e.attributes[b].name] = e.attributes[b].value;
                    (h || u) && ((h && ((u && h.__html == u.__html) || h.__html === e.innerHTML)) || (e.innerHTML = (h && h.__html) || ""));
                }
                if (
                    ((function (t, e, n, r, i) {
                        var o;
                        for (o in n) "children" === o || "key" === o || o in e || A(t, o, null, n[o], r);
                        for (o in e) (i && "function" != typeof e[o]) || "children" === o || "key" === o || "value" === o || "checked" === o || n[o] === e[o] || A(t, o, e[o], n[o], r);
                    })(e, y, p, o, l),
                    h)
                )
                    n.__k = [];
                else if (((b = n.props.children), v(e, Array.isArray(b) ? b : [b], n, r, i, o && "foreignObject" !== _, s, a, s ? s[0] : r.__k && m(r, 0), l), null != s)) for (b = s.length; b--; ) null != s[b] && d(s[b]);
                l ||
                    ("value" in y && void 0 !== (b = y.value) && (b !== p.value || b !== e.value || ("progress" === _ && !b)) && A(e, "value", b, p.value, !1),
                    "checked" in y && void 0 !== (b = y.checked) && b !== e.checked && A(e, "checked", b, p.checked, !1));
            }
            return e;
        }
        function N(t, n, r) {
            try {
                "function" == typeof t ? t(n) : (t.current = n);
            } catch (t) {
                e.__e(t, r);
            }
        }
        function U(t, n, r) {
            var i, o;
            if ((e.unmount && e.unmount(t), (i = t.ref) && ((i.current && i.current !== t.__e) || N(i, null, n)), null != (i = t.__c))) {
                if (i.componentWillUnmount)
                    try {
                        i.componentWillUnmount();
                    } catch (t) {
                        e.__e(t, n);
                    }
                i.base = i.__P = null;
            }
            if ((i = t.__k)) for (o = 0; o < i.length; o++) i[o] && U(i[o], n, "function" != typeof t.type);
            r || null == t.__e || d(t.__e), (t.__e = t.__d = void 0);
        }
        function C(t, e, n) {
            return this.constructor(t, n);
        }
        function H(n, r, i) {
            var o, s, a;
            e.__ && e.__(n, r),
                (s = (o = "function" == typeof i) ? null : (i && i.__k) || r.__k),
                (a = []),
                O(r, (n = ((!o && i) || r).__k = h(y, null, [n])), s || c, c, void 0 !== r.ownerSVGElement, !o && i ? [i] : s ? null : r.firstChild ? t.call(r.childNodes) : null, a, !o && i ? i : s ? s.__e : r.firstChild, o),
                I(a, n);
        }
        function T(t, e) {
            H(t, e, T);
        }
        function Z(e, n, r) {
            var i,
                o,
                s,
                a = u({}, e.props);
            for (s in n) "key" == s ? (i = n[s]) : "ref" == s ? (o = n[s]) : (a[s] = n[s]);
            return arguments.length > 2 && (a.children = arguments.length > 3 ? t.call(arguments, 2) : r), p(e.type, a, i || e.key, o || e.ref, null);
        }
        (t = l.slice),
            (e = {
                __e: function (t, e) {
                    for (var n, r, i; (e = e.__); )
                        if ((n = e.__c) && !n.__)
                            try {
                                if (((r = n.constructor) && null != r.getDerivedStateFromError && (n.setState(r.getDerivedStateFromError(t)), (i = n.__d)), null != n.componentDidCatch && (n.componentDidCatch(t), (i = n.__d)), i))
                                    return (n.__E = n);
                            } catch (e) {
                                t = e;
                            }
                    throw t;
                },
            }),
            (r = 0),
            (_.prototype.setState = function (t, e) {
                var n;
                (n = null != this.__s && this.__s !== this.state ? this.__s : (this.__s = u({}, this.state))), "function" == typeof t && (t = t(u({}, n), this.props)), t && u(n, t), null != t && this.__v && (e && this.__h.push(e), w(this));
            }),
            (_.prototype.forceUpdate = function (t) {
                this.__v && ((this.__e = !0), t && this.__h.push(t), w(this));
            }),
            (_.prototype.render = y),
            (i = []),
            (o = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout),
            (g.__r = 0),
            (a = 0);
        var q,
            M,
            z,
            D = 0,
            F = [],
            $ = e.__b,
            K = e.__r,
            G = e.diffed,
            V = e.__c,
            W = e.unmount;
        function L(t, n) {
            e.__h && e.__h(M, t, D || n), (D = 0);
            var r = M.__H || (M.__H = { __: [], __h: [] });
            return t >= r.__.length && r.__.push({}), r.__[t];
        }
        function j(t) {
            return (D = 1), X(it, t);
        }
        function X(t, e, n) {
            var r = L(q++, 2);
            return (
                (r.t = t),
                r.__c ||
                    ((r.__ = [
                        n ? n(e) : it(void 0, e),
                        function (t) {
                            var e = r.t(r.__[0], t);
                            r.__[0] !== e && ((r.__ = [e, r.__[1]]), r.__c.setState({}));
                        },
                    ]),
                    (r.__c = M)),
                r.__
            );
        }
        function Y(t, n) {
            var r = L(q++, 4);
            !e.__s && rt(r.__H, n) && ((r.__ = t), (r.__H = n), M.__h.push(r));
        }
        function J(t, e) {
            var n = L(q++, 7);
            return rt(n.__H, e) && ((n.__ = t()), (n.__H = e), (n.__h = t)), n.__;
        }
        function Q() {
            var t;
            for (
                F.sort(function (t, e) {
                    return t.__v.__b - e.__v.__b;
                });
                (t = F.pop());

            )
                if (t.__P)
                    try {
                        t.__H.__h.forEach(et), t.__H.__h.forEach(nt), (t.__H.__h = []);
                    } catch (r) {
                        (t.__H.__h = []), e.__e(r, t.__v);
                    }
        }
        (e.__b = function (t) {
            (M = null), $ && $(t);
        }),
            (e.__r = function (t) {
                K && K(t), (q = 0);
                var e = (M = t.__c).__H;
                e && (e.__h.forEach(et), e.__h.forEach(nt), (e.__h = []));
            }),
            (e.diffed = function (t) {
                G && G(t);
                var n = t.__c;
                n &&
                    n.__H &&
                    n.__H.__h.length &&
                    ((1 !== F.push(n) && z === e.requestAnimationFrame) ||
                        (
                            (z = e.requestAnimationFrame) ||
                            function (t) {
                                var e,
                                    n = function () {
                                        clearTimeout(r), tt && cancelAnimationFrame(e), setTimeout(t);
                                    },
                                    r = setTimeout(n, 100);
                                tt && (e = requestAnimationFrame(n));
                            }
                        )(Q)),
                    (M = null);
            }),
            (e.__c = function (t, n) {
                n.some(function (t) {
                    try {
                        t.__h.forEach(et),
                            (t.__h = t.__h.filter(function (t) {
                                return !t.__ || nt(t);
                            }));
                    } catch (o) {
                        n.some(function (t) {
                            t.__h && (t.__h = []);
                        }),
                            (n = []),
                            e.__e(o, t.__v);
                    }
                }),
                    V && V(t, n);
            }),
            (e.unmount = function (t) {
                W && W(t);
                var n,
                    r = t.__c;
                r &&
                    r.__H &&
                    (r.__H.__.forEach(function (t) {
                        try {
                            et(t);
                        } catch (t) {
                            n = t;
                        }
                    }),
                    n && e.__e(n, r.__v));
            });
        var tt = "function" == typeof requestAnimationFrame;
        function et(t) {
            var e = M,
                n = t.__c;
            "function" == typeof n && ((t.__c = void 0), n()), (M = e);
        }
        function nt(t) {
            var e = M;
            (t.__c = t.__()), (M = e);
        }
        function rt(t, e) {
            return (
                !t ||
                t.length !== e.length ||
                e.some(function (e, n) {
                    return e !== t[n];
                })
            );
        }
        function it(t, e) {
            return "function" == typeof e ? e(t) : e;
        }
        function ot(t, e) {
            for (var n in e) t[n] = e[n];
            return t;
        }
        function st(t, e) {
            for (var n in t) if ("__source" !== n && !(n in e)) return !0;
            for (var r in e) if ("__source" !== r && t[r] !== e[r]) return !0;
            return !1;
        }
        function at(t) {
            this.props = t;
        }
        ((at.prototype = new _()).isPureReactComponent = !0),
            (at.prototype.shouldComponentUpdate = function (t, e) {
                return st(this.props, t) || st(this.state, e);
            });
        var ct = e.__b;
        e.__b = function (t) {
            t.type && t.type.__f && t.ref && ((t.props.ref = t.ref), (t.ref = null)), ct && ct(t);
        };
        var lt = ("undefined" != typeof Symbol && Symbol.for && Symbol.for("react.forward_ref")) || 3911;
        var ft = function (t, e) {
                return null == t ? null : E(E(t).map(e));
            },
            ut = {
                map: ft,
                forEach: ft,
                count: function (t) {
                    return t ? E(t).length : 0;
                },
                only: function (t) {
                    var e = E(t);
                    if (1 !== e.length) throw "Children.only";
                    return e[0];
                },
                toArray: E,
            },
            dt = e.__e;
        e.__e = function (t, e, n) {
            if (t.then) for (var r, i = e; (i = i.__); ) if ((r = i.__c) && r.__c) return null == e.__e && ((e.__e = n.__e), (e.__k = n.__k)), r.__c(t, e);
            dt(t, e, n);
        };
        var ht = e.unmount;
        function pt() {
            (this.__u = 0), (this.t = null), (this.__b = null);
        }
        function yt(t) {
            var e = t.__.__c;
            return e && e.__e && e.__e(t);
        }
        function _t() {
            (this.u = null), (this.o = null);
        }
        (e.unmount = function (t) {
            var e = t.__c;
            e && e.__R && e.__R(), e && !0 === t.__h && (t.type = null), ht && ht(t);
        }),
            ((pt.prototype = new _()).__c = function (t, e) {
                var n = e.__c,
                    r = this;
                null == r.t && (r.t = []), r.t.push(n);
                var i = yt(r.__v),
                    o = !1,
                    s = function () {
                        o || ((o = !0), (n.__R = null), i ? i(a) : a());
                    };
                n.__R = s;
                var a = function () {
                        if (!--r.__u) {
                            if (r.state.__e) {
                                var t = r.state.__e;
                                r.__v.__k[0] = (function t(e, n, r) {
                                    return (
                                        e &&
                                            ((e.__v = null),
                                            (e.__k =
                                                e.__k &&
                                                e.__k.map(function (e) {
                                                    return t(e, n, r);
                                                })),
                                            e.__c && e.__c.__P === n && (e.__e && r.insertBefore(e.__e, e.__d), (e.__c.__e = !0), (e.__c.__P = r))),
                                        e
                                    );
                                })(t, t.__c.__P, t.__c.__O);
                            }
                            var e;
                            for (r.setState({ __e: (r.__b = null) }); (e = r.t.pop()); ) e.forceUpdate();
                        }
                    },
                    c = !0 === e.__h;
                r.__u++ || c || r.setState({ __e: (r.__b = r.__v.__k[0]) }), t.then(s, s);
            }),
            (pt.prototype.componentWillUnmount = function () {
                this.t = [];
            }),
            (pt.prototype.render = function (t, e) {
                if (this.__b) {
                    if (this.__v.__k) {
                        var n = document.createElement("div"),
                            r = this.__v.__k[0].__c;
                        this.__v.__k[0] = (function t(e, n, r) {
                            return (
                                e &&
                                    (e.__c &&
                                        e.__c.__H &&
                                        (e.__c.__H.__.forEach(function (t) {
                                            "function" == typeof t.__c && t.__c();
                                        }),
                                        (e.__c.__H = null)),
                                    null != (e = ot({}, e)).__c && (e.__c.__P === r && (e.__c.__P = n), (e.__c = null)),
                                    (e.__k =
                                        e.__k &&
                                        e.__k.map(function (e) {
                                            return t(e, n, r);
                                        }))),
                                e
                            );
                        })(this.__b, n, (r.__O = r.__P));
                    }
                    this.__b = null;
                }
                var i = e.__e && h(y, null, t.fallback);
                return i && (i.__h = null), [h(y, null, e.__e ? null : t.children), i];
            });
        var mt = function (t, e, n) {
            if ((++n[1] === n[0] && t.o.delete(e), t.props.revealOrder && ("t" !== t.props.revealOrder[0] || !t.o.size)))
                for (n = t.u; n; ) {
                    for (; n.length > 3; ) n.pop()();
                    if (n[1] < n[0]) break;
                    t.u = n = n[2];
                }
        };
        function bt(t) {
            return (
                (this.getChildContext = function () {
                    return t.context;
                }),
                t.children
            );
        }
        function wt(t) {
            var e = this,
                n = t.i;
            (e.componentWillUnmount = function () {
                H(null, e.l), (e.l = null), (e.i = null);
            }),
                e.i && e.i !== n && e.componentWillUnmount(),
                t.__v
                    ? (e.l ||
                          ((e.i = n),
                          (e.l = {
                              nodeType: 1,
                              parentNode: n,
                              childNodes: [],
                              appendChild: function (t) {
                                  this.childNodes.push(t), e.i.appendChild(t);
                              },
                              insertBefore: function (t, n) {
                                  this.childNodes.push(t), e.i.appendChild(t);
                              },
                              removeChild: function (t) {
                                  this.childNodes.splice(this.childNodes.indexOf(t) >>> 1, 1), e.i.removeChild(t);
                              },
                          })),
                      H(h(bt, { context: e.context }, t.__v), e.l))
                    : e.l && e.componentWillUnmount();
        }
        ((_t.prototype = new _()).__e = function (t) {
            var e = this,
                n = yt(e.__v),
                r = e.o.get(t);
            return (
                r[0]++,
                function (i) {
                    var o = function () {
                        e.props.revealOrder ? (r.push(i), mt(e, t, r)) : i();
                    };
                    n ? n(o) : o();
                }
            );
        }),
            (_t.prototype.render = function (t) {
                (this.u = null), (this.o = new Map());
                var e = E(t.children);
                t.revealOrder && "b" === t.revealOrder[0] && e.reverse();
                for (var n = e.length; n--; ) this.o.set(e[n], (this.u = [1, 0, this.u]));
                return t.children;
            }),
            (_t.prototype.componentDidUpdate = _t.prototype.componentDidMount = function () {
                var t = this;
                this.o.forEach(function (e, n) {
                    mt(t, n, e);
                });
            });
        var gt = ("undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element")) || 60103,
            vt = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,
            xt = "undefined" != typeof document,
            Et = function (t) {
                return ("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/i : /fil|che|ra/i).test(t);
            };
        (_.prototype.isReactComponent = {}),
            ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function (t) {
                Object.defineProperty(_.prototype, t, {
                    configurable: !0,
                    get: function () {
                        return this["UNSAFE_" + t];
                    },
                    set: function (e) {
                        Object.defineProperty(this, t, { configurable: !0, writable: !0, value: e });
                    },
                });
            });
        var Bt = e.event;
        function St() {}
        function At() {
            return this.cancelBubble;
        }
        function Pt() {
            return this.defaultPrevented;
        }
        e.event = function (t) {
            return Bt && (t = Bt(t)), (t.persist = St), (t.isPropagationStopped = At), (t.isDefaultPrevented = Pt), (t.nativeEvent = t);
        };
        var Rt,
            Ot = {
                configurable: !0,
                get: function () {
                    return this.class;
                },
            },
            It = e.vnode;
        e.vnode = function (t) {
            var e = t.type,
                n = t.props,
                r = n;
            if ("string" == typeof e) {
                var i = -1 === e.indexOf("-");
                for (var o in ((r = {}), n)) {
                    var s = n[o];
                    (xt && "children" === o && "noscript" === e) ||
                        ("value" === o && "defaultValue" in n && null == s) ||
                        ("defaultValue" === o && "value" in n && null == n.value
                            ? (o = "value")
                            : "download" === o && !0 === s
                            ? (s = "")
                            : /ondoubleclick/i.test(o)
                            ? (o = "ondblclick")
                            : /^onchange(textarea|input)/i.test(o + e) && !Et(n.type)
                            ? (o = "oninput")
                            : /^onfocus$/i.test(o)
                            ? (o = "onfocusin")
                            : /^onblur$/i.test(o)
                            ? (o = "onfocusout")
                            : /^on(Ani|Tra|Tou|BeforeInp)/.test(o)
                            ? (o = o.toLowerCase())
                            : i && vt.test(o)
                            ? (o = o.replace(/[A-Z0-9]/, "-$&").toLowerCase())
                            : null === s && (s = void 0),
                        (r[o] = s));
                }
                "select" == e &&
                    r.multiple &&
                    Array.isArray(r.value) &&
                    (r.value = E(n.children).forEach(function (t) {
                        t.props.selected = -1 != r.value.indexOf(t.props.value);
                    })),
                    "select" == e &&
                        null != r.defaultValue &&
                        (r.value = E(n.children).forEach(function (t) {
                            t.props.selected = r.multiple ? -1 != r.defaultValue.indexOf(t.props.value) : r.defaultValue == t.props.value;
                        })),
                    (t.props = r),
                    n.class != n.className && ((Ot.enumerable = "className" in n), null != n.className && (r.class = n.className), Object.defineProperty(r, "className", Ot));
            }
            (t.$$typeof = gt), It && It(t);
        };
        var kt = e.__r;
        e.__r = function (t) {
            kt && kt(t), (Rt = t.__c);
        };
        var Nt = {
            ReactCurrentDispatcher: {
                current: {
                    readContext: function (t) {
                        return Rt.__n[t.__c].props.value;
                    },
                },
            },
        };
        function Ut(t) {
            return !!t && t.$$typeof === gt;
        }
        const Ct = {
            useState: j,
            useReducer: X,
            useEffect: function (t, n) {
                var r = L(q++, 3);
                !e.__s && rt(r.__H, n) && ((r.__ = t), (r.__H = n), M.__H.__h.push(r));
            },
            useLayoutEffect: Y,
            useRef: function (t) {
                return (
                    (D = 5),
                    J(function () {
                        return { current: t };
                    }, [])
                );
            },
            useImperativeHandle: function (t, e, n) {
                (D = 6),
                    Y(
                        function () {
                            "function" == typeof t ? t(e()) : t && (t.current = e());
                        },
                        null == n ? n : n.concat(t)
                    );
            },
            useMemo: J,
            useCallback: function (t, e) {
                return (
                    (D = 8),
                    J(function () {
                        return t;
                    }, e)
                );
            },
            useContext: function (t) {
                var e = M.context[t.__c],
                    n = L(q++, 9);
                return (n.c = t), e ? (null == n.__ && ((n.__ = !0), e.sub(M)), e.props.value) : t.__;
            },
            useDebugValue: function (t, n) {
                e.useDebugValue && e.useDebugValue(n ? n(t) : t);
            },
            version: "17.0.2",
            Children: ut,
            render: function (t, e, n) {
                return null == e.__k && (e.textContent = ""), H(t, e), "function" == typeof n && n(), t ? t.__c : null;
            },
            hydrate: function (t, e, n) {
                return T(t, e), "function" == typeof n && n(), t ? t.__c : null;
            },
            unmountComponentAtNode: function (t) {
                return !!t.__k && (H(null, t), !0);
            },
            createPortal: function (t, e) {
                return h(wt, { __v: t, i: e });
            },
            createElement: h,
            createContext: function (t, e) {
                var n = {
                    __c: (e = "__cC" + a++),
                    __: t,
                    Consumer: function (t, e) {
                        return t.children(e);
                    },
                    Provider: function (t) {
                        var n, r;
                        return (
                            this.getChildContext ||
                                ((n = []),
                                ((r = {})[e] = this),
                                (this.getChildContext = function () {
                                    return r;
                                }),
                                (this.shouldComponentUpdate = function (t) {
                                    this.props.value !== t.value && n.some(w);
                                }),
                                (this.sub = function (t) {
                                    n.push(t);
                                    var e = t.componentWillUnmount;
                                    t.componentWillUnmount = function () {
                                        n.splice(n.indexOf(t), 1), e && e.call(t);
                                    };
                                })),
                            t.children
                        );
                    },
                };
                return (n.Provider.__ = n.Consumer.contextType = n);
            },
            createFactory: function (t) {
                return h.bind(null, t);
            },
            cloneElement: function (t) {
                return Ut(t) ? Z.apply(null, arguments) : t;
            },
            createRef: function () {
                return { current: null };
            },
            Fragment: y,
            isValidElement: Ut,
            findDOMNode: function (t) {
                return (t && (t.base || (1 === t.nodeType && t))) || null;
            },
            Component: _,
            PureComponent: at,
            memo: function (t, e) {
                function n(t) {
                    var n = this.props.ref,
                        r = n == t.ref;
                    return !r && n && (n.call ? n(null) : (n.current = null)), e ? !e(this.props, t) || !r : st(this.props, t);
                }
                function r(e) {
                    return (this.shouldComponentUpdate = n), h(t, e);
                }
                return (r.displayName = "Memo(" + (t.displayName || t.name) + ")"), (r.prototype.isReactComponent = !0), (r.__f = !0), r;
            },
            forwardRef: function (t) {
                function e(e, n) {
                    var r = ot({}, e);
                    return delete r.ref, t(r, (n = e.ref || n) && ("object" != typeof n || "current" in n) ? n : null);
                }
                return (e.$$typeof = lt), (e.render = e), (e.prototype.isReactComponent = e.__f = !0), (e.displayName = "ForwardRef(" + (t.displayName || t.name) + ")"), e;
            },
            flushSync: function (t, e) {
                return t(e);
            },
            unstable_batchedUpdates: function (t, e) {
                return t(e);
            },
            StrictMode: y,
            Suspense: pt,
            SuspenseList: _t,
            lazy: function (t) {
                var e, n, r;
                function i(i) {
                    if (
                        (e ||
                            (e = t()).then(
                                function (t) {
                                    n = t.default || t;
                                },
                                function (t) {
                                    r = t;
                                }
                            ),
                        r)
                    )
                        throw r;
                    if (!n) throw e;
                    return h(n, i);
                }
                return (i.displayName = "Lazy"), (i.__f = !0), i;
            },
            __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: Nt,
        };
        var Ht = n(856);
        const Tt = BigInt(0),
            Zt = BigInt(1),
            qt = BigInt(2),
            Mt = BigInt(3),
            zt = BigInt(8),
            Dt = qt ** BigInt(256),
            Ft = {
                a: Tt,
                b: BigInt(7),
                P: Dt - qt ** BigInt(32) - BigInt(977),
                n: Dt - BigInt("432420386565659656852420866394968145599"),
                h: Zt,
                Gx: BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),
                Gy: BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),
                beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
            };
        function $t(t) {
            const { a: e, b: n } = Ft,
                r = le(t * t),
                i = le(r * t);
            return le(i + e * t + n);
        }
        const Kt = Ft.a === Tt;
        class Gt {
            constructor(t, e, n) {
                (this.x = t), (this.y = e), (this.z = n);
            }
            static fromAffine(t) {
                if (!(t instanceof Wt)) throw new TypeError("JacobianPoint#fromAffine: expected Point");
                return new Gt(t.x, t.y, Zt);
            }
            static toAffineBatch(t) {
                const e = (function (t) {
                    let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : Ft.P;
                    const n = new Array(t.length),
                        r = t.reduce((t, r, i) => (r === Tt ? t : ((n[i] = t), le(t * r, e))), Zt),
                        i = ue(r, e);
                    return t.reduceRight((t, r, i) => (r === Tt ? t : ((n[i] = le(t * n[i], e)), le(t * r, e))), i), n;
                })(t.map((t) => t.z));
                return t.map((t, n) => t.toAffine(e[n]));
            }
            static normalizeZ(t) {
                return Gt.toAffineBatch(t).map(Gt.fromAffine);
            }
            equals(t) {
                if (!(t instanceof Gt)) throw new TypeError("JacobianPoint expected");
                const { x: e, y: n, z: r } = this,
                    { x: i, y: o, z: s } = t,
                    a = le(r ** qt),
                    c = le(s ** qt),
                    l = le(e * c),
                    f = le(i * a),
                    u = le(le(n * s) * c),
                    d = le(le(o * r) * a);
                return l === f && u === d;
            }
            negate() {
                return new Gt(this.x, le(-this.y), this.z);
            }
            double() {
                const { x: t, y: e, z: n } = this,
                    r = le(t ** qt),
                    i = le(e ** qt),
                    o = le(i ** qt),
                    s = le(qt * (le((t + i) ** qt) - r - o)),
                    a = le(Mt * r),
                    c = le(a ** qt),
                    l = le(c - qt * s),
                    f = le(a * (s - l) - zt * o),
                    u = le(qt * e * n);
                return new Gt(l, f, u);
            }
            add(t) {
                if (!(t instanceof Gt)) throw new TypeError("JacobianPoint expected");
                const { x: e, y: n, z: r } = this,
                    { x: i, y: o, z: s } = t;
                if (i === Tt || o === Tt) return this;
                if (e === Tt || n === Tt) return t;
                const a = le(r ** qt),
                    c = le(s ** qt),
                    l = le(e * c),
                    f = le(i * a),
                    u = le(le(n * s) * c),
                    d = le(le(o * r) * a),
                    h = le(f - l),
                    p = le(d - u);
                if (h === Tt) return p === Tt ? this.double() : Gt.ZERO;
                const y = le(h ** qt),
                    _ = le(h * y),
                    m = le(l * y),
                    b = le(p ** qt - _ - qt * m),
                    w = le(p * (m - b) - u * _),
                    g = le(r * s * h);
                return new Gt(b, w, g);
            }
            subtract(t) {
                return this.add(t.negate());
            }
            multiplyUnsafe(t) {
                let e = ce(t);
                const n = Gt.BASE,
                    r = Gt.ZERO;
                if (e === Tt) return r;
                if (this.equals(r) || e === Zt) return this;
                if (this.equals(n)) return this.wNAF(e).p;
                if (!Kt) {
                    let t = r,
                        n = this;
                    for (; e > Tt; ) e & Zt && (t = t.add(n)), (n = n.double()), (e >>= Zt);
                    return t;
                }
                let { k1neg: i, k1: o, k2neg: s, k2: a } = pe(e),
                    c = r,
                    l = r,
                    f = this;
                for (; o > Tt || a > Tt; ) o & Zt && (c = c.add(f)), a & Zt && (l = l.add(f)), (f = f.double()), (o >>= Zt), (a >>= Zt);
                return i && (c = c.negate()), s && (l = l.negate()), (l = new Gt(le(l.x * Ft.beta), l.y, l.z)), c.add(l);
            }
            precomputeWindow(t) {
                const e = Kt ? 128 / t + 1 : 256 / t + 1,
                    n = [];
                let r = this,
                    i = r;
                for (let o = 0; o < e; o++) {
                    (i = r), n.push(i);
                    for (let e = 1; e < 2 ** (t - 1); e++) (i = i.add(r)), n.push(i);
                    r = i.double();
                }
                return n;
            }
            wNAF(t, e) {
                !e && this.equals(Gt.BASE) && (e = Wt.BASE);
                const n = (e && e._WINDOW_SIZE) || 1;
                if (256 % n) throw new Error("Point#wNAF: Invalid precomputation window, must be power of 2");
                let r = e && Vt.get(e);
                r || ((r = this.precomputeWindow(n)), e && 1 !== n && ((r = Gt.normalizeZ(r)), Vt.set(e, r)));
                let i = Gt.ZERO,
                    o = Gt.ZERO;
                const s = 1 + (Kt ? 128 / n : 256 / n),
                    a = 2 ** (n - 1),
                    c = BigInt(2 ** n - 1),
                    l = 2 ** n,
                    f = BigInt(n);
                for (let u = 0; u < s; u++) {
                    const e = u * a;
                    let n = Number(t & c);
                    if (((t >>= f), n > a && ((n -= l), (t += Zt)), 0 === n)) {
                        let t = r[e];
                        u % 2 && (t = t.negate()), (o = o.add(t));
                    } else {
                        let t = r[e + Math.abs(n) - 1];
                        n < 0 && (t = t.negate()), (i = i.add(t));
                    }
                }
                return { p: i, f: o };
            }
            multiply(t, e) {
                let n,
                    r,
                    i = ce(t);
                if (Kt) {
                    const { k1neg: t, k1: o, k2neg: s, k2: a } = pe(i);
                    let { p: c, f: l } = this.wNAF(o, e),
                        { p: f, f: u } = this.wNAF(a, e);
                    t && (c = c.negate()), s && (f = f.negate()), (f = new Gt(le(f.x * Ft.beta), f.y, f.z)), (n = c.add(f)), (r = l.add(u));
                } else {
                    const { p: t, f: o } = this.wNAF(i, e);
                    (n = t), (r = o);
                }
                return Gt.normalizeZ([n, r])[0];
            }
            toAffine() {
                let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ue(this.z);
                const { x: e, y: n, z: r } = this,
                    i = t,
                    o = le(i * i),
                    s = le(o * i),
                    a = le(e * o),
                    c = le(n * s);
                if (le(r * i) !== Zt) throw new Error("invZ was invalid");
                return new Wt(a, c);
            }
        }
        (Gt.BASE = new Gt(Ft.Gx, Ft.Gy, Zt)), (Gt.ZERO = new Gt(Tt, Zt, Tt));
        const Vt = new WeakMap();
        class Wt {
            constructor(t, e) {
                (this.x = t), (this.y = e);
            }
            _setWindowSize(t) {
                (this._WINDOW_SIZE = t), Vt.delete(this);
            }
            static fromCompressedHex(t) {
                const e = 32 === t.length,
                    n = se(e ? t : t.slice(1));
                if (!be(n)) throw new Error("Point is not on curve");
                let r = (function (t) {
                    const { P: e } = Ft,
                        n = BigInt(6),
                        r = BigInt(11),
                        i = BigInt(22),
                        o = BigInt(23),
                        s = BigInt(44),
                        a = BigInt(88),
                        c = (t * t * t) % e,
                        l = (c * c * t) % e,
                        f = (fe(l, Mt) * l) % e,
                        u = (fe(f, Mt) * l) % e,
                        d = (fe(u, qt) * c) % e,
                        h = (fe(d, r) * d) % e,
                        p = (fe(h, i) * h) % e,
                        y = (fe(p, s) * p) % e,
                        _ = (fe(y, a) * y) % e,
                        m = (fe(_, s) * p) % e,
                        b = (fe(m, Mt) * l) % e,
                        w = (fe(b, o) * h) % e,
                        g = (fe(w, n) * c) % e;
                    return fe(g, qt);
                })($t(n));
                const i = (r & Zt) === Zt;
                if (e) i && (r = le(-r));
                else {
                    (1 === (1 & t[0])) !== i && (r = le(-r));
                }
                const o = new Wt(n, r);
                return o.assertValidity(), o;
            }
            static fromUncompressedHex(t) {
                const e = se(t.slice(1, 33)),
                    n = se(t.slice(33)),
                    r = new Wt(e, n);
                return r.assertValidity(), r;
            }
            static fromHex(t) {
                const e = ae(t),
                    n = e[0];
                if (32 === e.length || (33 === e.length && (2 === n || 3 === n))) return this.fromCompressedHex(e);
                if (65 === e.length && 4 === n) return this.fromUncompressedHex(e);
                throw new Error(`Point.fromHex: received invalid point. Expected 32-33 compressed bytes or 65 uncompressed bytes, not ${e.length}`);
            }
            static fromPrivateKey(t) {
                return Wt.BASE.multiply(ge(t));
            }
            static fromSignature(t, e, n) {
                const r = ye((t = ae(t))),
                    { r: i, s: o } = xe(e);
                if (0 !== n && 1 !== n) throw new Error("Cannot recover signature: invalid recovery bit");
                if (r === Tt) throw new Error("Cannot recover signature: msgHash cannot be 0");
                const s = 2 + (1 & n),
                    a = Wt.fromHex(`0${s}${ee(i)}`),
                    c = Gt.fromAffine(a).multiplyUnsafe(o),
                    l = Gt.BASE.multiply(r),
                    f = ue(i, Ft.n),
                    u = c.subtract(l).multiplyUnsafe(f).toAffine();
                return u.assertValidity(), u;
            }
            toRawBytes() {
                let t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                return oe(this.toHex(t));
            }
            toHex() {
                let t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                const e = ee(this.x);
                return t ? `${this.y & Zt ? "03" : "02"}${e}` : `04${e}${ee(this.y)}`;
            }
            toHexX() {
                return this.toHex(!0).slice(2);
            }
            toRawX() {
                return this.toRawBytes(!0).slice(1);
            }
            assertValidity() {
                const t = "Point is not on elliptic curve",
                    { x: e, y: n } = this;
                if (!be(e) || !be(n)) throw new Error(t);
                const r = le(n * n);
                if (le(r - $t(e)) !== Tt) throw new Error(t);
            }
            equals(t) {
                return this.x === t.x && this.y === t.y;
            }
            negate() {
                return new Wt(this.x, le(-this.y));
            }
            double() {
                return Gt.fromAffine(this).double().toAffine();
            }
            add(t) {
                return Gt.fromAffine(this).add(Gt.fromAffine(t)).toAffine();
            }
            subtract(t) {
                return this.add(t.negate());
            }
            multiply(t) {
                return Gt.fromAffine(this).multiply(t, this).toAffine();
            }
        }
        function Lt(t) {
            return Number.parseInt(t[0], 16) >= 8 ? "00" + t : t;
        }
        function jt(t) {
            if (t.length < 2 || 2 !== t[0]) throw new Error(`Invalid signature integer tag: ${te(t)}`);
            const e = t[1],
                n = t.subarray(2, e + 2);
            if (!e || n.length !== e) throw new Error("Invalid signature integer: wrong length");
            if (0 === n[0] && n[1] <= 127) throw new Error("Invalid signature integer: trailing length");
            return { data: se(n), left: t.subarray(e + 2) };
        }
        (Wt.BASE = new Wt(Ft.Gx, Ft.Gy)), (Wt.ZERO = new Wt(Tt, Tt));
        class Xt {
            constructor(t, e) {
                (this.r = t), (this.s = e), this.assertValidity();
            }
            static fromCompact(t) {
                const e = Jt(t),
                    n = "Signature.fromCompact";
                if ("string" !== typeof t && !e) throw new TypeError(`${n}: Expected string or Uint8Array`);
                const r = e ? te(t) : t;
                if (128 !== r.length) throw new Error(`${n}: Expected 64-byte hex`);
                return new Xt(ie(r.slice(0, 64)), ie(r.slice(64, 128)));
            }
            static fromDER(t) {
                const e = Jt(t);
                if ("string" !== typeof t && !e) throw new TypeError("Signature.fromDER: Expected string or Uint8Array");
                const { r: n, s: r } = (function (t) {
                    if (t.length < 2 || 48 != t[0]) throw new Error(`Invalid signature tag: ${te(t)}`);
                    if (t[1] !== t.length - 2) throw new Error("Invalid signature: incorrect length");
                    const { data: e, left: n } = jt(t.subarray(2)),
                        { data: r, left: i } = jt(n);
                    if (i.length) throw new Error(`Invalid signature: left bytes after parsing: ${te(i)}`);
                    return { r: e, s: r };
                })(e ? t : oe(t));
                return new Xt(n, r);
            }
            static fromHex(t) {
                return this.fromDER(t);
            }
            assertValidity() {
                const { r: t, s: e } = this;
                if (!me(t)) throw new Error("Invalid Signature: r must be 0 < r < n");
                if (!me(e)) throw new Error("Invalid Signature: s must be 0 < s < n");
            }
            hasHighS() {
                const t = Ft.n >> Zt;
                return this.s > t;
            }
            normalizeS() {
                return this.hasHighS() ? new Xt(this.r, Ft.n - this.s) : this;
            }
            toDERRawBytes() {
                let t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                return oe(this.toDERHex(t));
            }
            toDERHex() {
                let t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                const e = Lt(re(this.s));
                if (t) return e;
                const n = Lt(re(this.r)),
                    r = re(n.length / 2),
                    i = re(e.length / 2);
                return `30${re(n.length / 2 + e.length / 2 + 4)}02${r}${n}02${i}${e}`;
            }
            toRawBytes() {
                return this.toDERRawBytes();
            }
            toHex() {
                return this.toDERHex();
            }
            toCompactRawBytes() {
                return oe(this.toCompactHex());
            }
            toCompactHex() {
                return ee(this.r) + ee(this.s);
            }
        }
        function Yt() {
            for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
            if (!e.every(Jt)) throw new Error("Uint8Array list expected");
            if (1 === e.length) return e[0];
            const r = e.reduce((t, e) => t + e.length, 0),
                i = new Uint8Array(r);
            for (let o = 0, s = 0; o < e.length; o++) {
                const t = e[o];
                i.set(t, s), (s += t.length);
            }
            return i;
        }
        function Jt(t) {
            return t instanceof Uint8Array;
        }
        const Qt = Array.from({ length: 256 }, (t, e) => e.toString(16).padStart(2, "0"));
        function te(t) {
            if (!(t instanceof Uint8Array)) throw new Error("Expected Uint8Array");
            let e = "";
            for (let n = 0; n < t.length; n++) e += Qt[t[n]];
            return e;
        }
        function ee(t) {
            if (t > Dt) throw new Error("Expected number < 2^256");
            return t.toString(16).padStart(64, "0");
        }
        function ne(t) {
            return oe(ee(t));
        }
        function re(t) {
            const e = t.toString(16);
            return 1 & e.length ? `0${e}` : e;
        }
        function ie(t) {
            if ("string" !== typeof t) throw new TypeError("hexToNumber: expected string, got " + typeof t);
            return BigInt(`0x${t}`);
        }
        function oe(t) {
            if ("string" !== typeof t) throw new TypeError("hexToBytes: expected string, got " + typeof t);
            if (t.length % 2) throw new Error("hexToBytes: received invalid unpadded hex" + t.length);
            const e = new Uint8Array(t.length / 2);
            for (let n = 0; n < e.length; n++) {
                const r = 2 * n,
                    i = t.slice(r, r + 2),
                    o = Number.parseInt(i, 16);
                if (Number.isNaN(o) || o < 0) throw new Error("Invalid byte sequence");
                e[n] = o;
            }
            return e;
        }
        function se(t) {
            return ie(te(t));
        }
        function ae(t) {
            return t instanceof Uint8Array ? Uint8Array.from(t) : oe(t);
        }
        function ce(t) {
            if ("number" === typeof t && Number.isSafeInteger(t) && t > 0) return BigInt(t);
            if ("bigint" === typeof t && me(t)) return t;
            throw new TypeError("Expected valid private scalar: 0 < scalar < curve.n");
        }
        function le(t) {
            let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : Ft.P;
            const n = t % e;
            return n >= Tt ? n : e + n;
        }
        function fe(t, e) {
            const { P: n } = Ft;
            let r = t;
            for (; e-- > Tt; ) (r *= r), (r %= n);
            return r;
        }
        function ue(t) {
            let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : Ft.P;
            if (t === Tt || e <= Tt) throw new Error(`invert: expected positive integers, got n=${t} mod=${e}`);
            let n = le(t, e),
                r = e,
                i = Tt,
                o = Zt,
                s = Zt,
                a = Tt;
            for (; n !== Tt; ) {
                const t = r / n,
                    e = r % n,
                    c = i - s * t,
                    l = o - a * t;
                (r = n), (n = e), (i = s), (o = a), (s = c), (a = l);
            }
            const c = r;
            if (c !== Zt) throw new Error("invert: does not exist");
            return le(i, e);
        }
        const de = (t, e) => (t + e / qt) / e,
            he = qt ** BigInt(128);
        function pe(t) {
            const { n: e } = Ft,
                n = BigInt("0x3086d221a7d46bcde86c90e49284eb15"),
                r = -Zt * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"),
                i = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"),
                o = n,
                s = de(o * t, e),
                a = de(-r * t, e);
            let c = le(t - s * n - a * i, e),
                l = le(-s * r - a * o, e);
            const f = c > he,
                u = l > he;
            if ((f && (c = e - c), u && (l = e - l), c > he || l > he)) throw new Error("splitScalarEndo: Endomorphism failed, k=" + t);
            return { k1neg: f, k1: c, k2neg: u, k2: l };
        }
        function ye(t) {
            const { n: e } = Ft,
                n = 8 * t.length - 256;
            let r = se(t);
            return n > 0 && (r >>= BigInt(n)), r >= e && (r -= e), r;
        }
        class _e {
            constructor() {
                (this.v = new Uint8Array(32).fill(1)), (this.k = new Uint8Array(32).fill(0)), (this.counter = 0);
            }
            hmac() {
                for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
                return He.hmacSha256(this.k, ...e);
            }
            hmacSync() {
                if ("function" !== typeof He.hmacSha256Sync) throw new Error("utils.hmacSha256Sync is undefined, you need to set it");
                for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
                const r = He.hmacSha256Sync(this.k, ...e);
                if (r instanceof Promise) throw new Error("To use sync sign(), ensure utils.hmacSha256 is sync");
                return r;
            }
            incr() {
                if (this.counter >= 1e3) throw new Error("Tried 1,000 k values for sign(), all were invalid");
                this.counter += 1;
            }
            async reseed() {
                let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : new Uint8Array();
                (this.k = await this.hmac(this.v, Uint8Array.from([0]), t)), (this.v = await this.hmac(this.v)), 0 !== t.length && ((this.k = await this.hmac(this.v, Uint8Array.from([1]), t)), (this.v = await this.hmac(this.v)));
            }
            reseedSync() {
                let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : new Uint8Array();
                (this.k = this.hmacSync(this.v, Uint8Array.from([0]), t)), (this.v = this.hmacSync(this.v)), 0 !== t.length && ((this.k = this.hmacSync(this.v, Uint8Array.from([1]), t)), (this.v = this.hmacSync(this.v)));
            }
            async generate() {
                return this.incr(), (this.v = await this.hmac(this.v)), this.v;
            }
            generateSync() {
                return this.incr(), (this.v = this.hmacSync(this.v)), this.v;
            }
        }
        function me(t) {
            return Tt < t && t < Ft.n;
        }
        function be(t) {
            return Tt < t && t < Ft.P;
        }
        function we(t, e, n) {
            const r = se(t);
            if (!me(r)) return;
            const { n: i } = Ft,
                o = Wt.BASE.multiply(r),
                s = le(o.x, i);
            if (s === Tt) return;
            const a = le(ue(r, i) * le(e + n * s, i), i);
            if (a === Tt) return;
            const c = new Xt(s, a);
            return { sig: c, recovery: (o.x === c.r ? 0 : 2) | Number(o.y & Zt) };
        }
        function ge(t) {
            let e;
            if ("bigint" === typeof t) e = t;
            else if ("number" === typeof t && Number.isSafeInteger(t) && t > 0) e = BigInt(t);
            else if ("string" === typeof t) {
                if (64 !== t.length) throw new Error("Expected 32 bytes of private key");
                e = ie(t);
            } else {
                if (!Jt(t)) throw new TypeError("Expected valid private key");
                if (32 !== t.length) throw new Error("Expected 32 bytes of private key");
                e = se(t);
            }
            if (!me(e)) throw new Error("Expected private key: 0 < key < n");
            return e;
        }
        function ve(t) {
            return t instanceof Wt ? (t.assertValidity(), t) : Wt.fromHex(t);
        }
        function xe(t) {
            if (t instanceof Xt) return t.assertValidity(), t;
            try {
                return Xt.fromDER(t);
            } catch (e) {
                return Xt.fromCompact(t);
            }
        }
        function Ee(t) {
            return se(t.length > 32 ? t.slice(0, 32) : t);
        }
        function Be(t) {
            const e = Ee(t),
                n = le(e, Ft.n);
            return Se(n < Tt ? e : n);
        }
        function Se(t) {
            if ("bigint" !== typeof t) throw new Error("Expected bigint");
            return oe(ee(t));
        }
        function Ae(t, e, n) {
            if (null == t) throw new Error(`sign: expected valid message hash, not "${t}"`);
            const r = ae(t),
                i = ge(e),
                o = [Se(i), Be(r)];
            if (null != n) {
                !0 === n && (n = He.randomBytes(32));
                const t = ae(n);
                if (32 !== t.length) throw new Error("sign: Expected 32 bytes of extra data");
                o.push(t);
            }
            return { seed: Yt(...o), m: Ee(r), d: i };
        }
        function Pe(t, e) {
            let { sig: n, recovery: r } = t;
            const { canonical: i, der: o, recovered: s } = Object.assign({ canonical: !0, der: !0 }, e);
            i && n.hasHighS() && ((n = n.normalizeS()), (r ^= 1));
            const a = o ? n.toDERRawBytes() : n.toCompactRawBytes();
            return s ? [a, r] : a;
        }
        async function Re(t) {
            const e = new Uint8Array(t.split("").map((t) => t.charCodeAt(0))),
                n = await He.sha256(e);
            for (var r = arguments.length, i = new Array(r > 1 ? r - 1 : 0), o = 1; o < r; o++) i[o - 1] = arguments[o];
            const s = await He.sha256(Yt(n, n, ...i));
            return se(s);
        }
        async function Oe(t, e, n) {
            const r = ne(t);
            return le(await Re("BIP0340/challenge", r, e.toRawX(), n), Ft.n);
        }
        function Ie(t) {
            return le(t.y, qt) === Tt;
        }
        class ke {
            constructor(t, e) {
                if (((this.r = t), (this.s = e), !be(t) || !me(e))) throw new Error("Invalid signature");
            }
            static fromHex(t) {
                const e = ae(t);
                if (64 !== e.length) throw new TypeError(`SchnorrSignature.fromHex: expected 64 bytes, not ${e.length}`);
                const n = se(e.slice(0, 32)),
                    r = se(e.slice(32, 64));
                return new ke(n, r);
            }
            toHex() {
                return ee(this.r) + ee(this.s);
            }
            toRawBytes() {
                return oe(this.toHex());
            }
        }
        async function Ne(t, e, n) {
            const r = t instanceof ke ? t : ke.fromHex(t),
                i = ae(e),
                o = ve(n),
                s = await Oe(r.r, o, i),
                a = Wt.fromPrivateKey(r.s),
                c = o.multiply(s),
                l = a.subtract(c);
            return !(l.equals(Wt.BASE) || !Ie(l) || l.x !== r.r);
        }
        const Ue = {
            Signature: ke,
            getPublicKey: function (t) {
                return Wt.fromPrivateKey(t).toRawX();
            },
            sign: async function (t, e) {
                let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : He.randomBytes();
                if (null == t) throw new TypeError(`sign: Expected valid message, not "${t}"`);
                const { n: r } = Ft,
                    i = ae(t),
                    o = ge(e),
                    s = ae(n);
                if (32 !== s.length) throw new TypeError("sign: Expected 32 bytes of aux randomness");
                const a = Wt.fromPrivateKey(o),
                    c = Ie(a) ? o : r - o,
                    l = await Re("BIP0340/aux", s),
                    f = c ^ l,
                    u = await Re("BIP0340/nonce", ne(f), a.toRawX(), i),
                    d = le(u, r);
                if (d === Tt) throw new Error("sign: Creation of signature failed. k is zero");
                const h = Wt.fromPrivateKey(d),
                    p = Ie(h) ? d : r - d,
                    y = await Oe(h.x, a, i),
                    _ = new ke(h.x, le(p + y * c, r)),
                    m = await Ne(_.toRawBytes(), i, a.toRawX());
                if (!m) throw new Error("sign: Invalid signature produced");
                return _.toRawBytes();
            },
            verify: Ne,
        };
        Wt.BASE._setWindowSize(8);
        const Ce = { node: Ht, web: "object" === typeof self && "crypto" in self ? self.crypto : void 0 },
            He = {
                isValidPrivateKey(t) {
                    try {
                        return ge(t), !0;
                    } catch (e) {
                        return !1;
                    }
                },
                hashToPrivateKey: (t) => {
                    if ((t = ae(t)).length < 40 || t.length > 1024) throw new Error("Expected 40-1024 bytes of private key as per FIPS 186");
                    const e = le(se(t), Ft.n);
                    if (e === Tt || e === Zt) throw new Error("Invalid private key");
                    return ne(e);
                },
                randomBytes: function () {
                    let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 32;
                    if (Ce.web) return Ce.web.getRandomValues(new Uint8Array(t));
                    if (Ce.node) {
                        const { randomBytes: e } = Ce.node;
                        return Uint8Array.from(e(t));
                    }
                    throw new Error("The environment doesn't have randomBytes function");
                },
                randomPrivateKey: () => He.hashToPrivateKey(He.randomBytes(40)),
                bytesToHex: te,
                mod: le,
                sha256: async (t) => {
                    if (Ce.web) {
                        const e = await Ce.web.subtle.digest("SHA-256", t.buffer);
                        return new Uint8Array(e);
                    }
                    if (Ce.node) {
                        const { createHash: e } = Ce.node;
                        return Uint8Array.from(e("sha256").update(t).digest());
                    }
                    throw new Error("The environment doesn't have sha256 function");
                },
                hmacSha256: async function (t) {
                    for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++) n[r - 1] = arguments[r];
                    if (Ce.web) {
                        const e = await Ce.web.subtle.importKey("raw", t, { name: "HMAC", hash: { name: "SHA-256" } }, !1, ["sign"]),
                            r = Yt(...n),
                            i = await Ce.web.subtle.sign("HMAC", e, r);
                        return new Uint8Array(i);
                    }
                    if (Ce.node) {
                        const { createHmac: e } = Ce.node,
                            r = e("sha256", t);
                        return n.forEach((t) => r.update(t)), Uint8Array.from(r.digest());
                    }
                    throw new Error("The environment doesn't have hmac-sha256 function");
                },
                sha256Sync: void 0,
                hmacSha256Sync: void 0,
                precompute() {
                    let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 8,
                        e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : Wt.BASE;
                    const n = e === Wt.BASE ? e : new Wt(e.x, e.y);
                    return n._setWindowSize(t), n.multiply(Mt), n;
                },
            };
        var Te = n(420);
        const Ze = BigInt(0),
            qe = BigInt(1),
            Me = BigInt(2),
            ze = BigInt(255),
            De = Me ** BigInt(252) + BigInt("27742317777372353535851937790883648493"),
            Fe = {
                a: BigInt(-1),
                d: BigInt("37095705934669439343138083508754565189542113879843219016388785533085940283555"),
                P: Me ** ze - BigInt(19),
                l: De,
                n: De,
                h: BigInt(8),
                Gx: BigInt("15112221349535400772501151409588531511454012693041857206046113283949847762202"),
                Gy: BigInt("46316835694926478169428394003475163141307993866256225615783033603165251855960"),
            },
            $e = Me ** BigInt(256),
            Ke = BigInt("19681161376707505956807079304988542015446066515923890162744021073123829784752"),
            Ge = (BigInt("6853475219497561581579357271197624642482790079785650197046958215289687604742"), BigInt("25063068953384623474111414158702152701244531502492656460079210482610430750235")),
            Ve = BigInt("54469307008909316920995813868745141605393597292927456921205312896311721017578"),
            We = BigInt("1159843021668779879193775521855586647937357759715417654439879720876111806838"),
            Le = BigInt("40440834346308536858101042469323190826248399146238708352240133220865137265952");
        class je {
            constructor(t, e, n, r) {
                (this.x = t), (this.y = e), (this.z = n), (this.t = r);
            }
            static fromAffine(t) {
                if (!(t instanceof en)) throw new TypeError("ExtendedPoint#fromAffine: expected Point");
                return t.equals(en.ZERO) ? je.ZERO : new je(t.x, t.y, qe, hn(t.x * t.y));
            }
            static toAffineBatch(t) {
                const e = (function (t) {
                    let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : Fe.P;
                    const n = new Array(t.length),
                        r = t.reduce((t, r, i) => (r === Ze ? t : ((n[i] = t), hn(t * r, e))), qe),
                        i = pn(r, e);
                    return t.reduceRight((t, r, i) => (r === Ze ? t : ((n[i] = hn(t * n[i], e)), hn(t * r, e))), i), n;
                })(t.map((t) => t.z));
                return t.map((t, n) => t.toAffine(e[n]));
            }
            static normalizeZ(t) {
                return this.toAffineBatch(t).map(this.fromAffine);
            }
            equals(t) {
                Xe(t);
                const { x: e, y: n, z: r } = this,
                    { x: i, y: o, z: s } = t,
                    a = hn(e * s),
                    c = hn(i * r),
                    l = hn(n * s),
                    f = hn(o * r);
                return a === c && l === f;
            }
            negate() {
                return new je(hn(-this.x), this.y, this.z, hn(-this.t));
            }
            double() {
                const { x: t, y: e, z: n } = this,
                    { a: r } = Fe,
                    i = hn(t ** Me),
                    o = hn(e ** Me),
                    s = hn(Me * hn(n ** Me)),
                    a = hn(r * i),
                    c = hn(hn((t + e) ** Me) - i - o),
                    l = a + o,
                    f = l - s,
                    u = a - o,
                    d = hn(c * f),
                    h = hn(l * u),
                    p = hn(c * u),
                    y = hn(f * l);
                return new je(d, h, y, p);
            }
            add(t) {
                Xe(t);
                const { x: e, y: n, z: r, t: i } = this,
                    { x: o, y: s, z: a, t: c } = t,
                    l = hn((n - e) * (s + o)),
                    f = hn((n + e) * (s - o)),
                    u = hn(f - l);
                if (u === Ze) return this.double();
                const d = hn(r * Me * c),
                    h = hn(i * Me * a),
                    p = h + d,
                    y = f + l,
                    _ = h - d,
                    m = hn(p * u),
                    b = hn(y * _),
                    w = hn(p * _),
                    g = hn(u * y);
                return new je(m, b, g, w);
            }
            subtract(t) {
                return this.add(t.negate());
            }
            precomputeWindow(t) {
                const e = 1 + 256 / t,
                    n = [];
                let r = this,
                    i = r;
                for (let o = 0; o < e; o++) {
                    (i = r), n.push(i);
                    for (let e = 1; e < 2 ** (t - 1); e++) (i = i.add(r)), n.push(i);
                    r = i.double();
                }
                return n;
            }
            wNAF(t, e) {
                !e && this.equals(je.BASE) && (e = en.BASE);
                const n = (e && e._WINDOW_SIZE) || 1;
                if (256 % n) throw new Error("Point#wNAF: Invalid precomputation window, must be power of 2");
                let r = e && tn.get(e);
                r || ((r = this.precomputeWindow(n)), e && 1 !== n && ((r = je.normalizeZ(r)), tn.set(e, r)));
                let i = je.ZERO,
                    o = je.ZERO;
                const s = 1 + 256 / n,
                    a = 2 ** (n - 1),
                    c = BigInt(2 ** n - 1),
                    l = 2 ** n,
                    f = BigInt(n);
                for (let u = 0; u < s; u++) {
                    const e = u * a;
                    let n = Number(t & c);
                    if (((t >>= f), n > a && ((n -= l), (t += qe)), 0 === n)) {
                        let t = r[e];
                        u % 2 && (t = t.negate()), (o = o.add(t));
                    } else {
                        let t = r[e + Math.abs(n) - 1];
                        n < 0 && (t = t.negate()), (i = i.add(t));
                    }
                }
                return je.normalizeZ([i, o])[0];
            }
            multiply(t, e) {
                return this.wNAF(vn(t, Fe.l), e);
            }
            multiplyUnsafe(t) {
                let e = vn(t, Fe.l, !1);
                const n = je.BASE,
                    r = je.ZERO;
                if (e === Ze) return r;
                if (this.equals(r) || e === qe) return this;
                if (this.equals(n)) return this.wNAF(e);
                let i = r,
                    o = this;
                for (; e > Ze; ) e & qe && (i = i.add(o)), (o = o.double()), (e >>= qe);
                return i;
            }
            isSmallOrder() {
                return this.multiplyUnsafe(Fe.h).equals(je.ZERO);
            }
            isTorsionFree() {
                return this.multiplyUnsafe(Fe.l).equals(je.ZERO);
            }
            toAffine() {
                let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : pn(this.z);
                const { x: e, y: n, z: r } = this,
                    i = hn(e * t),
                    o = hn(n * t);
                if (hn(r * t) !== qe) throw new Error("invZ was invalid");
                return new en(i, o);
            }
            fromRistrettoBytes() {
                Je();
            }
            toRistrettoBytes() {
                Je();
            }
            fromRistrettoHash() {
                Je();
            }
        }
        function Xe(t) {
            if (!(t instanceof je)) throw new TypeError("ExtendedPoint expected");
        }
        function Ye(t) {
            if (!(t instanceof Qe)) throw new TypeError("RistrettoPoint expected");
        }
        function Je() {
            throw new Error("Legacy method: switch to RistrettoPoint");
        }
        (je.BASE = new je(Fe.Gx, Fe.Gy, qe, hn(Fe.Gx * Fe.Gy))), (je.ZERO = new je(Ze, qe, qe, Ze));
        class Qe {
            constructor(t) {
                this.ep = t;
            }
            static calcElligatorRistrettoMap(t) {
                const { d: e } = Fe,
                    n = hn(Ke * t * t),
                    r = hn((n + qe) * We);
                let i = BigInt(-1);
                const o = hn((i - e * n) * hn(n + e));
                let { isValid: s, value: a } = mn(r, o),
                    c = hn(a * t);
                fn(c) || (c = hn(-c)), s || (a = c), s || (i = n);
                const l = hn(i * (n - qe) * Le - o),
                    f = a * a,
                    u = hn((a + a) * o),
                    d = hn(l * Ge),
                    h = hn(qe - f),
                    p = hn(qe + f);
                return new je(hn(u * p), hn(h * d), hn(d * p), hn(u * h));
            }
            static hashToCurve(t) {
                const e = dn((t = gn(t, 64)).slice(0, 32)),
                    n = this.calcElligatorRistrettoMap(e),
                    r = dn(t.slice(32, 64)),
                    i = this.calcElligatorRistrettoMap(r);
                return new Qe(n.add(i));
            }
            static fromHex(t) {
                t = gn(t, 32);
                const { a: e, d: n } = Fe,
                    r = "RistrettoPoint.fromHex: the hex is not valid encoding of RistrettoPoint",
                    i = dn(t);
                if (
                    !(function (t, e) {
                        if (t.length !== e.length) return !1;
                        for (let n = 0; n < t.length; n++) if (t[n] !== e[n]) return !1;
                        return !0;
                    })(ln(i), t) ||
                    fn(i)
                )
                    throw new Error(r);
                const o = hn(i * i),
                    s = hn(qe + e * o),
                    a = hn(qe - e * o),
                    c = hn(s * s),
                    l = hn(a * a),
                    f = hn(e * n * c - l),
                    { isValid: u, value: d } = bn(hn(f * l)),
                    h = hn(d * a),
                    p = hn(d * h * f);
                let y = hn((i + i) * h);
                fn(y) && (y = hn(-y));
                const _ = hn(s * p),
                    m = hn(y * _);
                if (!u || fn(m) || _ === Ze) throw new Error(r);
                return new Qe(new je(y, _, qe, m));
            }
            toRawBytes() {
                let { x: t, y: e, z: n, t: r } = this.ep;
                const i = hn(hn(n + e) * hn(n - e)),
                    o = hn(t * e),
                    { value: s } = bn(hn(i * o ** Me)),
                    a = hn(s * i),
                    c = hn(s * o),
                    l = hn(a * c * r);
                let f;
                if (fn(r * l)) {
                    let n = hn(e * Ke),
                        r = hn(t * Ke);
                    (t = n), (e = r), (f = hn(a * Ve));
                } else f = c;
                fn(t * l) && (e = hn(-e));
                let u = hn((n - e) * f);
                return fn(u) && (u = hn(-u)), ln(u);
            }
            toHex() {
                return sn(this.toRawBytes());
            }
            toString() {
                return this.toHex();
            }
            equals(t) {
                Ye(t);
                const e = this.ep,
                    n = t.ep,
                    r = hn(e.x * n.y) === hn(e.y * n.x),
                    i = hn(e.y * n.y) === hn(e.x * n.x);
                return r || i;
            }
            add(t) {
                return Ye(t), new Qe(this.ep.add(t.ep));
            }
            subtract(t) {
                return Ye(t), new Qe(this.ep.subtract(t.ep));
            }
            multiply(t) {
                return new Qe(this.ep.multiply(t));
            }
            multiplyUnsafe(t) {
                return new Qe(this.ep.multiplyUnsafe(t));
            }
        }
        (Qe.BASE = new Qe(je.BASE)), (Qe.ZERO = new Qe(je.ZERO));
        const tn = new WeakMap();
        class en {
            constructor(t, e) {
                (this.x = t), (this.y = e);
            }
            _setWindowSize(t) {
                (this._WINDOW_SIZE = t), tn.delete(this);
            }
            static fromHex(t) {
                let e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                const { d: n, P: r } = Fe,
                    i = (t = gn(t, 32)).slice();
                i[31] = -129 & t[31];
                const o = un(i);
                if (e && o >= r) throw new Error("Expected 0 < hex < P");
                if (!e && o >= $e) throw new Error("Expected 0 < hex < 2**256");
                const s = hn(o * o),
                    a = hn(s - qe),
                    c = hn(n * s + qe);
                let { isValid: l, value: f } = mn(a, c);
                if (!l) throw new Error("Point.fromHex: invalid y coordinate");
                const u = (f & qe) === qe;
                return (0 !== (128 & t[31])) !== u && (f = hn(-f)), new en(f, o);
            }
            static async fromPrivateKey(t) {
                return (await En(t)).point;
            }
            toRawBytes() {
                const t = ln(this.y);
                return (t[31] |= this.x & qe ? 128 : 0), t;
            }
            toHex() {
                return sn(this.toRawBytes());
            }
            toX25519() {
                const { y: t } = this;
                return ln(hn((qe + t) * pn(qe - t)));
            }
            isTorsionFree() {
                return je.fromAffine(this).isTorsionFree();
            }
            equals(t) {
                return this.x === t.x && this.y === t.y;
            }
            negate() {
                return new en(hn(-this.x), this.y);
            }
            add(t) {
                return je.fromAffine(this).add(je.fromAffine(t)).toAffine();
            }
            subtract(t) {
                return this.add(t.negate());
            }
            multiply(t) {
                return je.fromAffine(this).multiply(t, this).toAffine();
            }
        }
        (en.BASE = new en(Fe.Gx, Fe.Gy)), (en.ZERO = new en(Ze, qe));
        class nn {
            constructor(t, e) {
                (this.r = t), (this.s = e), this.assertValidity();
            }
            static fromHex(t) {
                const e = gn(t, 64),
                    n = en.fromHex(e.slice(0, 32), !1),
                    r = un(e.slice(32, 64));
                return new nn(n, r);
            }
            assertValidity() {
                const { r: t, s: e } = this;
                if (!(t instanceof en)) throw new Error("Expected Point instance");
                return vn(e, Fe.l, !1), this;
            }
            toRawBytes() {
                const t = new Uint8Array(64);
                return t.set(this.r.toRawBytes()), t.set(ln(this.s), 32), t;
            }
            toHex() {
                return sn(this.toRawBytes());
            }
        }
        function rn() {
            for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
            if (!e.every((t) => t instanceof Uint8Array)) throw new Error("Expected Uint8Array list");
            if (1 === e.length) return e[0];
            const r = e.reduce((t, e) => t + e.length, 0),
                i = new Uint8Array(r);
            for (let o = 0, s = 0; o < e.length; o++) {
                const t = e[o];
                i.set(t, s), (s += t.length);
            }
            return i;
        }
        const on = Array.from({ length: 256 }, (t, e) => e.toString(16).padStart(2, "0"));
        function sn(t) {
            if (!(t instanceof Uint8Array)) throw new Error("Uint8Array expected");
            let e = "";
            for (let n = 0; n < t.length; n++) e += on[t[n]];
            return e;
        }
        function an(t) {
            if ("string" !== typeof t) throw new TypeError("hexToBytes: expected string, got " + typeof t);
            if (t.length % 2) throw new Error("hexToBytes: received invalid unpadded hex");
            const e = new Uint8Array(t.length / 2);
            for (let n = 0; n < e.length; n++) {
                const r = 2 * n,
                    i = t.slice(r, r + 2),
                    o = Number.parseInt(i, 16);
                if (Number.isNaN(o) || o < 0) throw new Error("Invalid byte sequence");
                e[n] = o;
            }
            return e;
        }
        function cn(t) {
            return an(t.toString(16).padStart(64, "0"));
        }
        function ln(t) {
            return cn(t).reverse();
        }
        function fn(t) {
            return (hn(t) & qe) === qe;
        }
        function un(t) {
            if (!(t instanceof Uint8Array)) throw new Error("Expected Uint8Array");
            return BigInt("0x" + sn(Uint8Array.from(t).reverse()));
        }
        function dn(t) {
            return hn(un(t) & (Me ** ze - qe));
        }
        function hn(t) {
            let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : Fe.P;
            const n = t % e;
            return n >= Ze ? n : e + n;
        }
        function pn(t) {
            let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : Fe.P;
            if (t === Ze || e <= Ze) throw new Error(`invert: expected positive integers, got n=${t} mod=${e}`);
            let n = hn(t, e),
                r = e,
                i = Ze,
                o = qe,
                s = qe,
                a = Ze;
            for (; n !== Ze; ) {
                const t = r / n,
                    e = r % n,
                    c = i - s * t,
                    l = o - a * t;
                (r = n), (n = e), (i = s), (o = a), (s = c), (a = l);
            }
            const c = r;
            if (c !== qe) throw new Error("invert: does not exist");
            return hn(i, e);
        }
        function yn(t, e) {
            const { P: n } = Fe;
            let r = t;
            for (; e-- > Ze; ) (r *= r), (r %= n);
            return r;
        }
        function _n(t) {
            const { P: e } = Fe,
                n = BigInt(5),
                r = BigInt(10),
                i = BigInt(20),
                o = BigInt(40),
                s = BigInt(80),
                a = (((t * t) % e) * t) % e,
                c = (yn(a, Me) * a) % e,
                l = (yn(c, qe) * t) % e,
                f = (yn(l, n) * l) % e,
                u = (yn(f, r) * f) % e,
                d = (yn(u, i) * u) % e,
                h = (yn(d, o) * d) % e,
                p = (yn(h, s) * h) % e,
                y = (yn(p, s) * h) % e,
                _ = (yn(y, r) * f) % e;
            return { pow_p_5_8: (yn(_, Me) * t) % e, b2: a };
        }
        function mn(t, e) {
            const n = hn(e * e * e),
                r = hn(n * n * e);
            let i = hn(t * n * _n(t * r).pow_p_5_8);
            const o = hn(e * i * i),
                s = i,
                a = hn(i * Ke),
                c = o === t,
                l = o === hn(-t),
                f = o === hn(-t * Ke);
            return c && (i = s), (l || f) && (i = a), fn(i) && (i = hn(-i)), { isValid: c || l, value: i };
        }
        function bn(t) {
            return mn(qe, t);
        }
        async function wn() {
            const t = await Sn.sha512(rn(...arguments)),
                e = un(t);
            return hn(e, Fe.l);
        }
        function gn(t, e) {
            const n = t instanceof Uint8Array ? Uint8Array.from(t) : an(t);
            if ("number" === typeof e && n.length !== e) throw new Error(`Expected ${e} bytes`);
            return n;
        }
        function vn(t, e) {
            let n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
            if (!e) throw new TypeError("Specify max value");
            if (("number" === typeof t && Number.isSafeInteger(t) && (t = BigInt(t)), "bigint" === typeof t && t < e))
                if (n) {
                    if (Ze < t) return t;
                } else if (Ze <= t) return t;
            throw new TypeError("Expected valid scalar: 0 < scalar < max");
        }
        function xn(t) {
            return (t[0] &= 248), (t[31] &= 127), (t[31] |= 64), t;
        }
        async function En(t) {
            if (32 !== (t = "bigint" === typeof t || "number" === typeof t ? cn(vn(t, $e)) : gn(t)).length) throw new Error("Expected 32 bytes");
            const e = await Sn.sha512(t),
                n = xn(e.slice(0, 32)),
                r = e.slice(32, 64),
                i = hn(un(n), Fe.l),
                o = en.BASE.multiply(i),
                s = o.toRawBytes();
            return { head: n, prefix: r, scalar: i, point: o, pointBytes: s };
        }
        en.BASE._setWindowSize(8);
        const Bn = { node: Te, web: "object" === typeof self && "crypto" in self ? self.crypto : void 0 },
            Sn = {
                TORSION_SUBGROUP: [
                    "0100000000000000000000000000000000000000000000000000000000000000",
                    "c7176a703d4dd84fba3c0b760d10670f2a2053fa2c39ccc64ec7fd7792ac037a",
                    "0000000000000000000000000000000000000000000000000000000000000080",
                    "26e8958fc2b227b045c3f489f2ef98f0d5dfac05d3c63339b13802886d53fc05",
                    "ecffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff7f",
                    "26e8958fc2b227b045c3f489f2ef98f0d5dfac05d3c63339b13802886d53fc85",
                    "0000000000000000000000000000000000000000000000000000000000000000",
                    "c7176a703d4dd84fba3c0b760d10670f2a2053fa2c39ccc64ec7fd7792ac03fa",
                ],
                bytesToHex: sn,
                getExtendedPublicKey: En,
                mod: hn,
                invert: pn,
                hashToPrivateScalar: (t) => {
                    if ((t = gn(t)).length < 40 || t.length > 1024) throw new Error("Expected 40-1024 bytes of private key as per FIPS 186");
                    const e = hn(un(t), Fe.l);
                    if (e === Ze || e === qe) throw new Error("Invalid private key");
                    return e;
                },
                randomBytes: function () {
                    let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 32;
                    if (Bn.web) return Bn.web.getRandomValues(new Uint8Array(t));
                    if (Bn.node) {
                        const { randomBytes: e } = Bn.node;
                        return new Uint8Array(e(t).buffer);
                    }
                    throw new Error("The environment doesn't have randomBytes function");
                },
                randomPrivateKey: () => Sn.randomBytes(32),
                sha512: async (t) => {
                    if (Bn.web) {
                        const e = await Bn.web.subtle.digest("SHA-512", t.buffer);
                        return new Uint8Array(e);
                    }
                    if (Bn.node) return Uint8Array.from(Bn.node.createHash("sha512").update(t).digest());
                    throw new Error("The environment doesn't have sha512 function");
                },
                precompute() {
                    let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 8,
                        e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : en.BASE;
                    const n = e.equals(en.BASE) ? e : new en(e.x, e.y);
                    return n._setWindowSize(t), n.multiply(Me), n;
                },
            };
        var An = n(407);
        const Pn = {
                P: 0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaabn,
                r: 0x73eda753299d7d483339d80809a1d80553bda402fffe5bfeffffffff00000001n,
                h: 0x396c8c005555e1568c00aaab0000aaabn,
                Gx: 0x17f1d3a73197d7942695638c4fa9ac0fc3688c4f9774b905a14e3a3f171bac586c55e83ff97a1aeffb3af00adb22c6bbn,
                Gy: 0x08b3f481e3aaa0f1a09e30ed741d8ae4fcf5e095d5d00af600db18cb2c04b3edd03cc744a2888ae40caa232946c5e7e1n,
                b: 4n,
                P2: 0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaabn ** 2n - 1n,
                h2: 0x5d543a95414e7f1091d50792876a202cd91de4547085abaa68a205b2e5a7ddfa628f1cb4d9e82ef21537e293a6691ae1616ec6e786f0c70cf1c38e31c7238e5n,
                G2x: [0x024aa2b2f08f0a91260805272dc51051c6e47ad4fa403b02b4510b647ae3d1770bac0326a805bbefd48056c8c121bdb8n, 0x13e02b6052719f607dacd3a088274f65596bd0d09920b61ab5da61bbdc7f5049334cf11213945d57e5ac7d055d042b7en],
                G2y: [0x0ce5d527727d6e118cc9cdc6da2e351aadfd9baa8cbdd3a76d429a695160d12c923ac9cc3baca289e193548608b82801n, 0x0606c4a02ea734cc32acd2b02bc28b99cb3e287e85a763af267492ab572e99ab3f370d275cec1da1aaa9075ff05f79ben],
                b2: [4n, 4n],
                x: 0xd201000000010000n,
                h2Eff: 0xbc69f08f2ee75b3584c6a0ea91b352888e2a8e9145ad7689986ff031508ffe1329c2f178731db956d82bf015d1212b02ec0ec69d7477c1ae954cbc06689f6a359894c0adebbf6b4e8020005aaa95551n,
            },
            Rn = kn(Pn.x);
        function On(t, e) {
            const n = t % e;
            return n >= 0n ? n : e + n;
        }
        function In(t, e, n) {
            let r = 1n;
            for (; e > 0n; ) 1n & e && (r = (r * t) % n), (t = (t * t) % n), (e >>= 1n);
            return r;
        }
        function kn(t) {
            let e;
            for (e = 0; t > 0n; t >>= 1n, e += 1);
            return e;
        }
        function Nn(t, e) {
            return (t >> BigInt(e)) & 1n;
        }
        function Un(t) {
            let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : Pn.P;
            if (0n === t || e <= 0n) throw new Error(`invert: expected positive integers, got n=${t} mod=${e}`);
            let n = On(t, e),
                r = e,
                [i, o, s, a] = [0n, 1n, 1n, 0n];
            for (; 0n !== n; ) {
                const t = r / n,
                    e = r % n,
                    c = i - s * t,
                    l = o - a * t;
                ([r, n] = [n, e]), ([i, o] = [s, a]), ([s, a] = [c, l]);
            }
            const c = r;
            if (1n !== c) throw new Error("invert: does not exist");
            return On(i, e);
        }
        class Cn {
            constructor(t) {
                this.value = On(t, Cn.ORDER);
            }
            isZero() {
                return 0n === this.value;
            }
            equals(t) {
                return this.value === t.value;
            }
            negate() {
                return new Cn(-this.value);
            }
            invert() {
                return new Cn(Un(this.value, Cn.ORDER));
            }
            add(t) {
                return new Cn(this.value + t.value);
            }
            square() {
                return new Cn(this.value * this.value);
            }
            pow(t) {
                return new Cn(In(this.value, t, Cn.ORDER));
            }
            sqrt() {
                const t = this.pow((Cn.ORDER + 1n) / 4n);
                if (t.square().equals(this)) return t;
            }
            subtract(t) {
                return new Cn(this.value - t.value);
            }
            multiply(t) {
                return t instanceof Cn && (t = t.value), new Cn(this.value * t);
            }
            div(t) {
                return "bigint" === typeof t && (t = new Cn(t)), this.multiply(t.invert());
            }
            toString() {
                const t = this.value.toString(16).padStart(96, "0");
                return t.slice(0, 2) + "." + t.slice(-2);
            }
        }
        (Cn.ORDER = Pn.P), (Cn.MAX_BITS = kn(Pn.P)), (Cn.ZERO = new Cn(0n)), (Cn.ONE = new Cn(1n));
        class Hn {
            constructor(t) {
                this.value = On(t, Hn.ORDER);
            }
            static isValid(t) {
                return t <= Hn.ORDER;
            }
            isZero() {
                return 0n === this.value;
            }
            equals(t) {
                return this.value === t.value;
            }
            negate() {
                return new Hn(-this.value);
            }
            invert() {
                return new Hn(Un(this.value, Hn.ORDER));
            }
            add(t) {
                return new Hn(this.value + t.value);
            }
            square() {
                return new Hn(this.value * this.value);
            }
            pow(t) {
                return new Hn(In(this.value, t, Hn.ORDER));
            }
            subtract(t) {
                return new Hn(this.value - t.value);
            }
            multiply(t) {
                return t instanceof Hn && (t = t.value), new Hn(this.value * t);
            }
            div(t) {
                return "bigint" === typeof t && (t = new Hn(t)), this.multiply(t.invert());
            }
            legendre() {
                return this.pow((Hn.ORDER - 1n) / 2n);
            }
            sqrt() {
                if (!this.legendre().equals(Hn.ONE)) return;
                const t = Hn.ORDER;
                let e, n, r;
                for (e = t - 1n, n = 0; e % 2n === 0n; e /= 2n, n++);
                if (1 === n) return this.pow((t + 1n) / 4n);
                for (r = 2n; r < t && new Hn(r).legendre().value !== t - 1n; r++);
                let i = In(r, e, t),
                    o = In(this.value, (e + 1n) / 2n, t),
                    s = In(this.value, e, t),
                    a = 0n;
                for (; 0n !== On(s - 1n, t); ) {
                    let e;
                    for (a = On(s * s, t), e = 1; e < n && 0n !== On(a - 1n, t); e++) a = On(a * a, t);
                    let r = In(i, BigInt(1 << (n - e - 1)), t);
                    (o = On(o * r, t)), (i = On(r * r, t)), (s = On(s * i, t)), (n = e);
                }
                return new Hn(o);
            }
            toString() {
                return "0x" + this.value.toString(16).padStart(64, "0");
            }
        }
        (Hn.ORDER = Pn.r), (Hn.ZERO = new Hn(0n)), (Hn.ONE = new Hn(1n));
        class Tn {
            zip(t, e) {
                const n = this.c,
                    r = t.c,
                    i = [];
                for (let o = 0; o < n.length; o++) i.push(e(n[o], r[o]));
                return i;
            }
            map(t) {
                return this.c.map(t);
            }
            isZero() {
                return this.c.every((t) => t.isZero());
            }
            equals(t) {
                return this.zip(t, (t, e) => t.equals(e)).every((t) => t);
            }
            negate() {
                return this.init(this.map((t) => t.negate()));
            }
            add(t) {
                return this.init(this.zip(t, (t, e) => t.add(e)));
            }
            subtract(t) {
                return this.init(this.zip(t, (t, e) => t.subtract(e)));
            }
            conjugate() {
                return this.init([this.c[0], this.c[1].negate()]);
            }
            one() {
                const t = this;
                let e;
                return t instanceof Zn && (e = Zn.ONE), t instanceof qn && (e = qn.ONE), t instanceof Mn && (e = Mn.ONE), e;
            }
            pow(t) {
                const e = this.one();
                if (0n === t) return e;
                if (1n === t) return this;
                let n = e,
                    r = this;
                for (; t > 0n; ) 1n & t && (n = n.multiply(r)), (t >>= 1n), (r = r.square());
                return n;
            }
            div(t) {
                const e = "bigint" === typeof t ? new Cn(t).invert().value : t.invert();
                return this.multiply(e);
            }
        }
        class Zn extends Tn {
            constructor(t) {
                if ((super(), 2 !== t.length)) throw new Error("Expected array with 2 elements");
                t.forEach((e, n) => {
                    "bigint" === typeof e && (t[n] = new Cn(e));
                }),
                    (this.c = t);
            }
            init(t) {
                return new Zn(t);
            }
            toString() {
                return `Fp2(${this.c[0]} + ${this.c[1]}\xd7i)`;
            }
            get values() {
                return this.c.map((t) => t.value);
            }
            multiply(t) {
                if ("bigint" === typeof t) return new Zn(this.map((e) => e.multiply(t)));
                const [e, n] = this.c,
                    [r, i] = t.c;
                let o = e.multiply(r),
                    s = n.multiply(i);
                return new Zn([o.subtract(s), e.add(n).multiply(r.add(i)).subtract(o.add(s))]);
            }
            mulByNonresidue() {
                const t = this.c[0],
                    e = this.c[1];
                return new Zn([t.subtract(e), t.add(e)]);
            }
            square() {
                const t = this.c[0],
                    e = this.c[1],
                    n = t.add(e),
                    r = t.subtract(e),
                    i = t.add(t);
                return new Zn([n.multiply(r), i.multiply(e)]);
            }
            sqrt() {
                const t = this.pow((Zn.ORDER + 8n) / 16n),
                    e = t.square().div(this),
                    n = rr,
                    r = [n[0], n[2], n[4], n[6]].find((t) => t.equals(e));
                if (!r) return;
                const i = n.indexOf(r),
                    o = n[i / 2];
                if (!o) throw new Error("Invalid root");
                const s = t.div(o),
                    a = s.negate(),
                    [c, l] = s.values,
                    [f, u] = a.values;
                return l > u || (l === u && c > f) ? s : a;
            }
            invert() {
                const [t, e] = this.values,
                    n = new Cn(t * t + e * e).invert();
                return new Zn([n.multiply(new Cn(t)), n.multiply(new Cn(-e))]);
            }
            frobeniusMap(t) {
                return new Zn([this.c[0], this.c[1].multiply(nr[t % 2])]);
            }
            multiplyByB() {
                let [t, e] = this.c,
                    n = t.multiply(4n),
                    r = e.multiply(4n);
                return new Zn([n.subtract(r), n.add(r)]);
            }
        }
        (Zn.ORDER = Pn.P2), (Zn.MAX_BITS = kn(Pn.P2)), (Zn.ZERO = new Zn([0n, 0n])), (Zn.ONE = new Zn([1n, 0n]));
        class qn extends Tn {
            constructor(t) {
                if ((super(), (this.c = t), 3 !== t.length)) throw new Error("Expected array with 3 elements");
            }
            static fromTuple(t) {
                if (!Array.isArray(t) || 6 !== t.length) throw new Error("Invalid Fp6 usage");
                return new qn([new Zn(t.slice(0, 2)), new Zn(t.slice(2, 4)), new Zn(t.slice(4, 6))]);
            }
            init(t) {
                return new qn(t);
            }
            toString() {
                return `Fp6(${this.c[0]} + ${this.c[1]} * v, ${this.c[2]} * v^2)`;
            }
            conjugate() {
                throw new TypeError("No conjugate on Fp6");
            }
            multiply(t) {
                if ("bigint" === typeof t) return new qn([this.c[0].multiply(t), this.c[1].multiply(t), this.c[2].multiply(t)]);
                let [e, n, r] = this.c;
                const [i, o, s] = t.c;
                let a = e.multiply(i),
                    c = n.multiply(o),
                    l = r.multiply(s);
                return new qn([a.add(n.add(r).multiply(o.add(s)).subtract(c.add(l)).mulByNonresidue()), e.add(n).multiply(i.add(o)).subtract(a.add(c)).add(l.mulByNonresidue()), c.add(e.add(r).multiply(i.add(s)).subtract(a.add(l)))]);
            }
            mulByNonresidue() {
                return new qn([this.c[2].mulByNonresidue(), this.c[0], this.c[1]]);
            }
            multiplyBy1(t) {
                return new qn([this.c[2].multiply(t).mulByNonresidue(), this.c[0].multiply(t), this.c[1].multiply(t)]);
            }
            multiplyBy01(t, e) {
                let [n, r, i] = this.c,
                    o = n.multiply(t),
                    s = r.multiply(e);
                return new qn([r.add(i).multiply(e).subtract(s).mulByNonresidue().add(o), t.add(e).multiply(n.add(r)).subtract(o).subtract(s), n.add(i).multiply(t).subtract(o).add(s)]);
            }
            multiplyByFp2(t) {
                return new qn(this.map((e) => e.multiply(t)));
            }
            square() {
                let [t, e, n] = this.c,
                    r = t.square(),
                    i = t.multiply(e).multiply(2n),
                    o = e.multiply(n).multiply(2n),
                    s = n.square();
                return new qn([o.mulByNonresidue().add(r), s.mulByNonresidue().add(i), i.add(t.subtract(e).add(n).square()).add(o).subtract(r).subtract(s)]);
            }
            invert() {
                let [t, e, n] = this.c,
                    r = t.square().subtract(n.multiply(e).mulByNonresidue()),
                    i = n.square().mulByNonresidue().subtract(t.multiply(e)),
                    o = e.square().subtract(t.multiply(n)),
                    s = n.multiply(i).add(e.multiply(o)).mulByNonresidue().add(t.multiply(r)).invert();
                return new qn([s.multiply(r), s.multiply(i), s.multiply(o)]);
            }
            frobeniusMap(t) {
                return new qn([this.c[0].frobeniusMap(t), this.c[1].frobeniusMap(t).multiply(or[t % 6]), this.c[2].frobeniusMap(t).multiply(sr[t % 6])]);
            }
        }
        (qn.ZERO = new qn([Zn.ZERO, Zn.ZERO, Zn.ZERO])), (qn.ONE = new qn([Zn.ONE, Zn.ZERO, Zn.ZERO]));
        class Mn extends Tn {
            constructor(t) {
                if ((super(), (this.c = t), 2 !== t.length)) throw new Error("Expected array with 2 elements");
            }
            static fromTuple(t) {
                return new Mn([qn.fromTuple(t.slice(0, 6)), qn.fromTuple(t.slice(6, 12))]);
            }
            init(t) {
                return new Mn(t);
            }
            toString() {
                return `Fp12(${this.c[0]} + ${this.c[1]} * w)`;
            }
            multiply(t) {
                if ("bigint" === typeof t) return new Mn([this.c[0].multiply(t), this.c[1].multiply(t)]);
                let [e, n] = this.c;
                const [r, i] = t.c;
                let o = e.multiply(r),
                    s = n.multiply(i);
                return new Mn([o.add(s.mulByNonresidue()), e.add(n).multiply(r.add(i)).subtract(o.add(s))]);
            }
            multiplyBy014(t, e, n) {
                let [r, i] = this.c,
                    [o, s] = [r.multiplyBy01(t, e), i.multiplyBy1(n)];
                return new Mn([s.mulByNonresidue().add(o), i.add(r).multiplyBy01(t, e.add(n)).subtract(o).subtract(s)]);
            }
            multiplyByFp2(t) {
                return this.init(this.map((e) => e.multiplyByFp2(t)));
            }
            square() {
                let [t, e] = this.c,
                    n = t.multiply(e);
                return new Mn([e.mulByNonresidue().add(t).multiply(t.add(e)).subtract(n).subtract(n.mulByNonresidue()), n.add(n)]);
            }
            invert() {
                let [t, e] = this.c,
                    n = t.square().subtract(e.square().mulByNonresidue()).invert();
                return new Mn([t.multiply(n), e.multiply(n).negate()]);
            }
            frobeniusMap(t) {
                const [e, n] = this.c;
                let r = e.frobeniusMap(t),
                    [i, o, s] = n.frobeniusMap(t).c;
                const a = ar[t % 12];
                return new Mn([r, new qn([i.multiply(a), o.multiply(a), s.multiply(a)])]);
            }
            Fp4Square(t, e) {
                const n = t.square(),
                    r = e.square();
                return [r.mulByNonresidue().add(n), t.add(e).square().subtract(n).subtract(r)];
            }
            cyclotomicSquare() {
                const [t, e] = this.c,
                    [n, r, i] = t.c,
                    [o, s, a] = e.c;
                let [c, l] = this.Fp4Square(n, s),
                    [f, u] = this.Fp4Square(o, i),
                    [d, h] = this.Fp4Square(r, a),
                    p = h.mulByNonresidue();
                return new Mn([
                    new qn([c.subtract(n).multiply(2n).add(c), f.subtract(r).multiply(2n).add(f), d.subtract(i).multiply(2n).add(d)]),
                    new qn([p.add(o).multiply(2n).add(p), l.add(s).multiply(2n).add(l), u.add(a).multiply(2n).add(u)]),
                ]);
            }
            cyclotomicExp(t) {
                let e = Mn.ONE;
                for (let n = Rn - 1; n >= 0; n--) (e = e.cyclotomicSquare()), Nn(t, n) && (e = e.multiply(this));
                return e;
            }
            finalExponentiate() {
                const { x: t } = Pn,
                    e = this.frobeniusMap(6).div(this),
                    n = e.frobeniusMap(2).multiply(e),
                    r = n.cyclotomicExp(t).conjugate(),
                    i = n.cyclotomicSquare().conjugate().multiply(r),
                    o = i.cyclotomicExp(t).conjugate(),
                    s = o.cyclotomicExp(t).conjugate(),
                    a = s.cyclotomicExp(t).conjugate().multiply(r.cyclotomicSquare()),
                    c = a.cyclotomicExp(t).conjugate(),
                    l = r.multiply(s).frobeniusMap(2),
                    f = o.multiply(n).frobeniusMap(3),
                    u = a.multiply(n.conjugate()).frobeniusMap(1),
                    d = c.multiply(i.conjugate()).multiply(n);
                return l.multiply(f).multiply(u).multiply(d);
            }
        }
        (Mn.ZERO = new Mn([qn.ZERO, qn.ZERO])), (Mn.ONE = new Mn([qn.ONE, qn.ZERO]));
        class zn {
            constructor(t, e, n, r) {
                (this.x = t), (this.y = e), (this.z = n), (this.C = r);
            }
            isZero() {
                return this.z.isZero();
            }
            createPoint(t, e, n) {
                return new this.constructor(t, e, n);
            }
            getZero() {
                return this.createPoint(this.C.ONE, this.C.ONE, this.C.ZERO);
            }
            equals(t) {
                if (this.constructor !== t.constructor) throw new Error(`ProjectivePoint#equals: this is ${this.constructor}, but rhs is ${t.constructor}`);
                const e = this,
                    n = t,
                    r = e.x.multiply(n.z).equals(n.x.multiply(e.z)),
                    i = e.y.multiply(n.z).equals(n.y.multiply(e.z));
                return r && i;
            }
            negate() {
                return this.createPoint(this.x, this.y.negate(), this.z);
            }
            toString() {
                if (!(!(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0])) return `Point<x=${this.x}, y=${this.y}, z=${this.z}>`;
                const [t, e] = this.toAffine();
                return `Point<x=${t}, y=${e}>`;
            }
            fromAffineTuple(t) {
                return this.createPoint(t[0], t[1], this.C.ONE);
            }
            toAffine() {
                let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.z.invert();
                return [this.x.multiply(t), this.y.multiply(t)];
            }
            toAffineBatch(t) {
                const e = (function (t, e) {
                    const n = e.length,
                        r = new Array(n);
                    let i = t.ONE;
                    for (let o = 0; o < n; o++) e[o].isZero() || ((r[o] = i), (i = i.multiply(e[o])));
                    i = i.invert();
                    for (let o = n - 1; o >= 0; o--) {
                        if (e[o].isZero()) continue;
                        let t = i.multiply(e[o]);
                        (e[o] = i.multiply(r[o])), (i = t);
                    }
                    return e;
                })(
                    this.C,
                    t.map((t) => t.z)
                );
                return t.map((t, n) => t.toAffine(e[n]));
            }
            normalizeZ(t) {
                return this.toAffineBatch(t).map((t) => this.fromAffineTuple(t));
            }
            double() {
                const { x: t, y: e, z: n } = this,
                    r = t.multiply(t).multiply(3n),
                    i = e.multiply(n),
                    o = i.multiply(i),
                    s = o.multiply(i),
                    a = t.multiply(e).multiply(i),
                    c = r.multiply(r).subtract(a.multiply(8n)),
                    l = c.multiply(i).multiply(2n),
                    f = r.multiply(a.multiply(4n).subtract(c)).subtract(e.multiply(e).multiply(8n).multiply(o)),
                    u = s.multiply(8n);
                return this.createPoint(l, f, u);
            }
            add(t) {
                if (this.constructor !== t.constructor) throw new Error(`ProjectivePoint#add: this is ${this.constructor}, but rhs is ${t.constructor}`);
                const e = this,
                    n = t;
                if (e.isZero()) return n;
                if (n.isZero()) return e;
                const r = e.x,
                    i = e.y,
                    o = e.z,
                    s = n.x,
                    a = n.y,
                    c = n.z,
                    l = a.multiply(o),
                    f = i.multiply(c),
                    u = s.multiply(o),
                    d = r.multiply(c);
                if (u.equals(d) && l.equals(f)) return this.double();
                if (u.equals(d)) return this.getZero();
                const h = l.subtract(f),
                    p = u.subtract(d),
                    y = p.multiply(p),
                    _ = y.multiply(p),
                    m = d.multiply(y),
                    b = o.multiply(c),
                    w = h.multiply(h).multiply(b).subtract(_).subtract(m.multiply(2n)),
                    g = p.multiply(w),
                    v = h.multiply(m.subtract(w)).subtract(_.multiply(f)),
                    x = _.multiply(b);
                return this.createPoint(g, v, x);
            }
            subtract(t) {
                if (this.constructor !== t.constructor) throw new Error(`ProjectivePoint#subtract: this is ${this.constructor}, but rhs is ${t.constructor}`);
                return this.add(t.negate());
            }
            validateScalar(t) {
                if (("number" === typeof t && (t = BigInt(t)), "bigint" !== typeof t || t <= 0 || t > Pn.r)) throw new Error(`Point#multiply: invalid scalar, expected positive integer < CURVE.r. Got: ${t}`);
                return t;
            }
            multiplyUnsafe(t) {
                let e = this.validateScalar(t),
                    n = this.getZero(),
                    r = this;
                for (; e > 0n; ) 1n & e && (n = n.add(r)), (r = r.double()), (e >>= 1n);
                return n;
            }
            multiply(t) {
                let e = this.validateScalar(t),
                    n = this.getZero(),
                    r = this.getZero(),
                    i = this,
                    o = Cn.ORDER;
                for (; o > 0n; ) 1n & e ? (n = n.add(i)) : (r = r.add(i)), (i = i.double()), (e >>= 1n), (o >>= 1n);
                return n;
            }
            maxBits() {
                return this.C.MAX_BITS;
            }
            precomputeWindow(t) {
                const e = Math.ceil(this.maxBits() / t),
                    n = 2 ** (t - 1);
                let r = [],
                    i = this,
                    o = i;
                for (let s = 0; s < e; s++) {
                    (o = i), r.push(o);
                    for (let t = 1; t < n; t++) (o = o.add(i)), r.push(o);
                    i = o.double();
                }
                return r;
            }
            calcMultiplyPrecomputes(t) {
                if (this._MPRECOMPUTES) throw new Error("This point already has precomputes");
                this._MPRECOMPUTES = [t, this.normalizeZ(this.precomputeWindow(t))];
            }
            clearMultiplyPrecomputes() {
                this._MPRECOMPUTES = void 0;
            }
            wNAF(t) {
                let e, n;
                this._MPRECOMPUTES ? ([e, n] = this._MPRECOMPUTES) : ((e = 1), (n = this.precomputeWindow(e)));
                let [r, i] = [this.getZero(), this.getZero()];
                const o = Math.ceil(this.maxBits() / e),
                    s = 2 ** (e - 1),
                    a = BigInt(2 ** e - 1),
                    c = 2 ** e,
                    l = BigInt(e);
                for (let f = 0; f < o; f++) {
                    const e = f * s;
                    let o = Number(t & a);
                    if (((t >>= l), o > s && ((o -= c), (t += 1n)), 0 === o)) i = i.add(f % 2 ? n[e].negate() : n[e]);
                    else {
                        const t = n[e + Math.abs(o) - 1];
                        r = r.add(o < 0 ? t.negate() : t);
                    }
                }
                return [r, i];
            }
            multiplyPrecomputed(t) {
                return this.wNAF(this.validateScalar(t))[0];
            }
        }
        function Dn(t) {
            const [e, n] = t.values;
            return BigInt(e % 2n || (0n === e && n % 2n));
        }
        const Fn = (Pn.P ** 2n - 9n) / 16n;
        function $n(t) {
            const e = new Zn([0n, 240n]),
                n = new Zn([1012n, 1012n]),
                r = new Zn([-2n, -1n]);
            Array.isArray(t) && (t = new Zn(t));
            const i = t.pow(2n),
                o = r.multiply(i),
                s = o.add(o.pow(2n));
            let a = e.multiply(s).negate(),
                c = n.multiply(s.add(Zn.ONE));
            a.isZero() && (a = r.multiply(e));
            let l = a.pow(3n),
                f = c
                    .pow(3n)
                    .add(e.multiply(c).multiply(a.pow(2n)))
                    .add(n.multiply(l));
            const [u, d] = (function (t, e) {
                const n = e.pow(7n),
                    r = t.multiply(n),
                    i = r.multiply(n.multiply(e)).pow(Fn).multiply(r);
                let o = !1,
                    s = i;
                const a = rr.slice(0, 4);
                for (const c of a) {
                    const n = c.multiply(i);
                    n.pow(2n).multiply(e).subtract(t).isZero() && !o && ((o = !0), (s = n));
                }
                return [o, s];
            })(f, l);
            let h;
            u && (h = d);
            const p = d.multiply(t.pow(3n));
            f = o.pow(3n).multiply(f);
            let y = !1;
            for (const _ of ir) {
                const t = _.multiply(p);
                !t.pow(2n).multiply(l).subtract(f).isZero() || u || y || ((h = t), (y = !0));
            }
            if (!u && !y) throw new Error("Hash to Curve - Optimized SWU failure");
            return y && (c = c.multiply(o)), (h = h), Dn(t) !== Dn(h) && (h = h.negate()), (h = h.multiply(a)), [c, h, a];
        }
        function Kn(t) {
            const [e, n, r] = t,
                i = r.multiply(r),
                o = i.multiply(r),
                s = [r, i, o],
                a = [Zn.ZERO, Zn.ZERO, Zn.ZERO, Zn.ZERO];
            for (let l = 0; l < cr.length; l++) {
                const t = cr[l];
                a[l] = t.slice(-1)[0];
                const n = t.slice(0, -1).reverse();
                for (let r = 0; r < n.length; r++) {
                    const t = n[r];
                    a[l] = a[l].multiply(e).add(s[r].multiply(t));
                }
            }
            (a[2] = a[2].multiply(n)), (a[3] = a[3].multiply(r));
            const c = a[1].multiply(a[3]);
            return [a[0].multiply(a[3]), a[1].multiply(a[2]), c];
        }
        const Gn = new qn([Zn.ZERO, Zn.ONE, Zn.ZERO]),
            Vn = new Mn([Gn, qn.ZERO]),
            Wn = Vn.invert(),
            Ln = new Mn([qn.ZERO, Gn]),
            jn = Ln.invert();
        const Xn = 0x1a0111ea397fe699ec02408663d4de85aa0d857d89759ad4897d29650fb85f9b409427eb4f49fffd8bfd00000000aaacn,
            Yn = 0x6af0e0437ff400b6831e36d6bd17ffe48395dabc2d3435e77f76e17009241c5ee67992f72ec05f4c81084fbede3cc09n,
            Jn = 0x699be3b8c6870965e5bf892ad5d2cc7b0e85a117402dfd83b7f4a947e02d978498255a2aaec0ac627b5afbdf1bf1c90n,
            Qn = 0x8157cd83046453f5dd0972b6e3949e4288020b5b8a9cc99ca07e27089a2ce2436d965026adad3ef7baba37f2183e9b5n,
            tr = 0xab1c2ffdd6c253ca155231eb3e71ba044fd562f6f72bc5bad5ec46a0b7a3b0247cf08ce6c6317f40edbc653a72dee17n,
            er = 0xaa404866706722864480885d68ad0ccac1967c7544b447873cc37e0181271e006df72162a3d3e0287bf597fbf7f8fc1n,
            nr = [0x1n, 0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaaan].map((t) => new Cn(t)),
            rr = [
                [1n, 0n],
                [Yn, -Yn],
                [0n, 1n],
                [Yn, Yn],
                [-1n, 0n],
                [-Yn, Yn],
                [0n, -1n],
                [-Yn, -Yn],
            ].map((t) => new Zn(t)),
            ir = [
                [Jn, Qn],
                [-Qn, Jn],
                [tr, er],
                [-er, tr],
            ].map((t) => new Zn(t)),
            or = [
                [0x1n, 0x0n],
                [0x0n, 0x1a0111ea397fe699ec02408663d4de85aa0d857d89759ad4897d29650fb85f9b409427eb4f49fffd8bfd00000000aaacn],
                [0x00000000000000005f19672fdf76ce51ba69c6076a0f77eaddb3a93be6f89688de17d813620a00022e01fffffffefffen, 0x0n],
                [0x0n, 0x1n],
                [0x1a0111ea397fe699ec02408663d4de85aa0d857d89759ad4897d29650fb85f9b409427eb4f49fffd8bfd00000000aaacn, 0x0n],
                [0x0n, 0x00000000000000005f19672fdf76ce51ba69c6076a0f77eaddb3a93be6f89688de17d813620a00022e01fffffffefffen],
            ].map((t) => new Zn(t)),
            sr = [
                [0x1n, 0x0n],
                [0x1a0111ea397fe699ec02408663d4de85aa0d857d89759ad4897d29650fb85f9b409427eb4f49fffd8bfd00000000aaadn, 0x0n],
                [0x1a0111ea397fe699ec02408663d4de85aa0d857d89759ad4897d29650fb85f9b409427eb4f49fffd8bfd00000000aaacn, 0x0n],
                [0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaaan, 0x0n],
                [0x00000000000000005f19672fdf76ce51ba69c6076a0f77eaddb3a93be6f89688de17d813620a00022e01fffffffefffen, 0x0n],
                [0x00000000000000005f19672fdf76ce51ba69c6076a0f77eaddb3a93be6f89688de17d813620a00022e01fffffffeffffn, 0x0n],
            ].map((t) => new Zn(t)),
            ar = [
                [0x1n, 0x0n],
                [0x1904d3bf02bb0667c231beb4202c0d1f0fd603fd3cbd5f4f7b2443d784bab9c4f67ea53d63e7813d8d0775ed92235fb8n, 0x00fc3e2b36c4e03288e9e902231f9fb854a14787b6c7b36fec0c8ec971f63c5f282d5ac14d6c7ec22cf78a126ddc4af3n],
                [0x00000000000000005f19672fdf76ce51ba69c6076a0f77eaddb3a93be6f89688de17d813620a00022e01fffffffeffffn, 0x0n],
                [0x135203e60180a68ee2e9c448d77a2cd91c3dedd930b1cf60ef396489f61eb45e304466cf3e67fa0af1ee7b04121bdea2n, 0x06af0e0437ff400b6831e36d6bd17ffe48395dabc2d3435e77f76e17009241c5ee67992f72ec05f4c81084fbede3cc09n],
                [0x00000000000000005f19672fdf76ce51ba69c6076a0f77eaddb3a93be6f89688de17d813620a00022e01fffffffefffen, 0x0n],
                [0x144e4211384586c16bd3ad4afa99cc9170df3560e77982d0db45f3536814f0bd5871c1908bd478cd1ee605167ff82995n, 0x05b2cfd9013a5fd8df47fa6b48b1e045f39816240c0b8fee8beadf4d8e9c0566c63a3e6e257f87329b18fae980078116n],
                [0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaaan, 0x0n],
                [0x00fc3e2b36c4e03288e9e902231f9fb854a14787b6c7b36fec0c8ec971f63c5f282d5ac14d6c7ec22cf78a126ddc4af3n, 0x1904d3bf02bb0667c231beb4202c0d1f0fd603fd3cbd5f4f7b2443d784bab9c4f67ea53d63e7813d8d0775ed92235fb8n],
                [0x1a0111ea397fe699ec02408663d4de85aa0d857d89759ad4897d29650fb85f9b409427eb4f49fffd8bfd00000000aaacn, 0x0n],
                [0x06af0e0437ff400b6831e36d6bd17ffe48395dabc2d3435e77f76e17009241c5ee67992f72ec05f4c81084fbede3cc09n, 0x135203e60180a68ee2e9c448d77a2cd91c3dedd930b1cf60ef396489f61eb45e304466cf3e67fa0af1ee7b04121bdea2n],
                [0x1a0111ea397fe699ec02408663d4de85aa0d857d89759ad4897d29650fb85f9b409427eb4f49fffd8bfd00000000aaadn, 0x0n],
                [0x05b2cfd9013a5fd8df47fa6b48b1e045f39816240c0b8fee8beadf4d8e9c0566c63a3e6e257f87329b18fae980078116n, 0x144e4211384586c16bd3ad4afa99cc9170df3560e77982d0db45f3536814f0bd5871c1908bd478cd1ee605167ff82995n],
            ].map((t) => new Zn(t)),
            cr = [
                [
                    [0x5c759507e8e333ebb5b7a9a47d7ed8532c52d39fd3a042a88b58423c50ae15d5c2638e343d9c71c6238aaaaaaaa97d6n, 0x5c759507e8e333ebb5b7a9a47d7ed8532c52d39fd3a042a88b58423c50ae15d5c2638e343d9c71c6238aaaaaaaa97d6n],
                    [0x0n, 0x11560bf17baa99bc32126fced787c88f984f87adf7ae0c7f9a208c6b4f20a4181472aaa9cb8d555526a9ffffffffc71an],
                    [0x11560bf17baa99bc32126fced787c88f984f87adf7ae0c7f9a208c6b4f20a4181472aaa9cb8d555526a9ffffffffc71en, 0x8ab05f8bdd54cde190937e76bc3e447cc27c3d6fbd7063fcd104635a790520c0a395554e5c6aaaa9354ffffffffe38dn],
                    [0x171d6541fa38ccfaed6dea691f5fb614cb14b4e7f4e810aa22d6108f142b85757098e38d0f671c7188e2aaaaaaaa5ed1n, 0x0n],
                ].map((t) => new Zn(t)),
                [
                    [0x0n, 0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa63n],
                    [0xcn, 0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa9fn],
                    [0x1n, 0x0n],
                    [0x0n, 0x0n],
                ].map((t) => new Zn(t)),
                [
                    [0x1530477c7ab4113b59a4c18b076d11930f7da5d4a07f649bf54439d87d27e500fc8c25ebf8c92f6812cfc71c71c6d706n, 0x1530477c7ab4113b59a4c18b076d11930f7da5d4a07f649bf54439d87d27e500fc8c25ebf8c92f6812cfc71c71c6d706n],
                    [0x0n, 0x5c759507e8e333ebb5b7a9a47d7ed8532c52d39fd3a042a88b58423c50ae15d5c2638e343d9c71c6238aaaaaaaa97ben],
                    [0x11560bf17baa99bc32126fced787c88f984f87adf7ae0c7f9a208c6b4f20a4181472aaa9cb8d555526a9ffffffffc71cn, 0x8ab05f8bdd54cde190937e76bc3e447cc27c3d6fbd7063fcd104635a790520c0a395554e5c6aaaa9354ffffffffe38fn],
                    [0x124c9ad43b6cf79bfbf7043de3811ad0761b0f37a1e26286b0e977c69aa274524e79097a56dc4bd9e1b371c71c718b10n, 0x0n],
                ].map((t) => new Zn(t)),
                [
                    [0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffa8fbn, 0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffa8fbn],
                    [0x0n, 0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffa9d3n],
                    [0x12n, 0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa99n],
                    [0x1n, 0x0n],
                ].map((t) => new Zn(t)),
            ],
            lr = 2n ** 381n,
            fr = 2n * lr,
            ur = 2n * fr,
            dr = 48,
            hr = { DST: "BLS_SIG_BLS12381G2_XMD:SHA-256_SSWU_RO_NUL_", p: Pn.P, m: 2, k: 128, expand: !0 };
        function pr(t) {
            return 0 < t && t < Pn.r;
        }
        const yr = { node: An, web: "object" === typeof self && "crypto" in self ? self.crypto : void 0 },
            _r = {
                hashToField: Rr,
                bytesToHex: function (t) {
                    let e = "";
                    for (let n = 0; n < t.length; n++) e += br[t[n]];
                    return e;
                },
                randomBytes: function () {
                    let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 32;
                    if (yr.web) return yr.web.getRandomValues(new Uint8Array(t));
                    if (yr.node) {
                        const { randomBytes: e } = yr.node;
                        return new Uint8Array(e(t).buffer);
                    }
                    throw new Error("The environment doesn't have randomBytes function");
                },
                randomPrivateKey: () => {
                    let t = 8;
                    for (; t--; ) {
                        const t = _r.randomBytes(32),
                            e = mr(t);
                        if (pr(e) && 1n !== e) return t;
                    }
                    throw new Error("Valid private key was not found in 8 iterations. PRNG is broken");
                },
                sha256: async (t) => {
                    if (yr.web) {
                        const e = await yr.web.subtle.digest("SHA-256", t.buffer);
                        return new Uint8Array(e);
                    }
                    if (yr.node) return Uint8Array.from(yr.node.createHash("sha256").update(t).digest());
                    throw new Error("The environment doesn't have sha256 function");
                },
                mod: On,
                getDSTLabel: () => hr.DST,
                setDSTLabel(t) {
                    if ("string" !== typeof t || t.length > 2048 || 0 === t.length) throw new TypeError("Invalid DST");
                    hr.DST = t;
                },
            };
        function mr(t) {
            let e = 0n;
            for (let n = t.length - 1, r = 0; n >= 0; n--, r++) e += (255n & BigInt(t[n])) << (8n * BigInt(r));
            return e;
        }
        const br = Array.from({ length: 256 }, (t, e) => e.toString(16).padStart(2, "0"));
        function wr(t) {
            if ("string" !== typeof t) throw new TypeError("hexToBytes: expected string, got " + typeof t);
            if (t.length % 2) throw new Error("hexToBytes: received invalid unpadded hex");
            const e = new Uint8Array(t.length / 2);
            for (let n = 0; n < e.length; n++) {
                const r = 2 * n,
                    i = t.slice(r, r + 2);
                if (2 !== i.length) throw new Error("Invalid byte sequence");
                const o = Number.parseInt(i, 16);
                if (Number.isNaN(o)) throw new Error("Invalid byte sequence");
                e[n] = o;
            }
            return e;
        }
        function gr(t, e) {
            if (t < 0n) throw new Error("Expected valid number");
            if ("number" !== typeof e) throw new TypeError("Expected valid padding");
            return t.toString(16).padStart(2 * e, "0");
        }
        function vr(t) {
            if (t instanceof Uint8Array) return t;
            if ("string" === typeof t) return wr(t);
            throw new TypeError("Expected hex string or Uint8Array");
        }
        function xr() {
            for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
            if (1 === e.length) return e[0];
            const r = e.reduce((t, e) => t + e.length, 0),
                i = new Uint8Array(r);
            for (let o = 0, s = 0; o < e.length; o++) {
                const t = e[o];
                i.set(t, s), (s += t.length);
            }
            return i;
        }
        function Er(t) {
            const e = new Uint8Array(t.length);
            for (let n = 0; n < t.length; n++) e[n] = t.charCodeAt(n);
            return e;
        }
        function Br(t) {
            let e = 0n;
            for (let n = 0; n < t.length; n++) (e <<= 8n), (e += BigInt(t[n]));
            return e;
        }
        function Sr(t, e) {
            if (t < 0 || t >= 1 << (8 * e)) throw new Error(`bad I2OSP call: value=${t} length=${e}`);
            const n = Array.from({ length: e }).fill(0);
            for (let r = e - 1; r >= 0; r--) (n[r] = 255 & t), (t >>>= 8);
            return new Uint8Array(n);
        }
        function Ar(t, e) {
            const n = new Uint8Array(t.length);
            for (let r = 0; r < t.length; r++) n[r] = t[r] ^ e[r];
            return n;
        }
        async function Pr(t, e, n) {
            const r = _r.sha256,
                i = Math.ceil(n / 32);
            if (i > 255) throw new Error("Invalid xmd length");
            const o = xr(e, Sr(e.length, 1)),
                s = Sr(0, 64),
                a = Sr(n, 2),
                c = new Array(i),
                l = await r(xr(s, t, a, Sr(0, 1), o));
            c[0] = await r(xr(l, Sr(1, 1), o));
            for (let f = 1; f <= i; f++) {
                const t = [Ar(l, c[f - 1]), Sr(f + 1, 1), o];
                c[f] = await r(xr(...t));
            }
            return xr(...c).slice(0, n);
        }
        async function Rr(t, e) {
            let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            const r = { ...hr, ...n },
                i = r.p.toString(2).length,
                o = Math.ceil((i + r.k) / 8),
                s = e * r.m * o,
                a = Er(r.DST);
            let c = t;
            r.expand && (c = await Pr(t, a, s));
            const l = new Array(e);
            for (let f = 0; f < e; f++) {
                const t = new Array(r.m);
                for (let e = 0; e < r.m; e++) {
                    const n = o * (e + f * r.m),
                        i = c.slice(n, n + o);
                    t[e] = On(Br(i), r.p);
                }
                l[f] = t;
            }
            return l;
        }
        function Or(t) {
            let e;
            if (t instanceof Uint8Array && 32 === t.length) e = mr(t);
            else if ("string" === typeof t && 64 === t.length) e = BigInt(`0x${t}`);
            else if ("number" === typeof t && t > 0 && Number.isSafeInteger(t)) e = BigInt(t);
            else {
                if (!("bigint" === typeof t && t > 0n)) throw new TypeError("Expected valid private key");
                e = t;
            }
            if (((e = On(e, Pn.r)), !pr(e))) throw new Error("Private key must be 0 < key < CURVE.r");
            return e;
        }
        function Ir(t, e) {
            if (!(t instanceof e)) throw new Error("Expected Fp* argument, not number/bigint");
        }
        class kr extends zn {
            constructor(t, e) {
                let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : Cn.ONE;
                super(t, e, n, Cn), Ir(t, Cn), Ir(e, Cn), Ir(n, Cn);
            }
            static fromHex(t) {
                t = vr(t);
                const { P: e } = Pn;
                let n;
                if (48 === t.length) {
                    const r = mr(t);
                    if (1n === On(r, ur) / fr) return this.ZERO;
                    const i = new Cn(On(r, lr));
                    let o = i.pow(3n).add(new Cn(Pn.b)).sqrt();
                    if (!o) throw new Error("Invalid compressed G1 point");
                    const s = On(r, fr) / lr;
                    (2n * o.value) / e !== s && (o = o.negate()), (n = new kr(i, o));
                } else {
                    if (96 !== t.length) throw new Error("Invalid point G1, expected 48/96 bytes");
                    {
                        if (0 !== (64 & t[0])) return kr.ZERO;
                        const e = mr(t.slice(0, dr)),
                            r = mr(t.slice(dr));
                        n = new kr(new Cn(e), new Cn(r));
                    }
                }
                return n.assertValidity(), n;
            }
            static fromPrivateKey(t) {
                return this.BASE.multiplyPrecomputed(Or(t));
            }
            toRawBytes() {
                let t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                return wr(this.toHex(t));
            }
            toHex() {
                let t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                this.assertValidity();
                const { P: e } = Pn;
                if (t) {
                    let t;
                    if (this.isZero()) t = ur + fr;
                    else {
                        const [n, r] = this.toAffine(),
                            i = (2n * r.value) / e;
                        t = n.value + i * lr + ur;
                    }
                    return gr(t, dr);
                }
                if (this.isZero()) return "4".padEnd(192, "0");
                {
                    const [t, e] = this.toAffine();
                    return gr(t.value, dr) + gr(e.value, dr);
                }
            }
            assertValidity() {
                if (this.isZero()) return this;
                if (!this.isOnCurve()) throw new Error("Invalid G1 point: not on curve Fp");
                if (!this.isTorsionFree()) throw new Error("Invalid G1 point: must be of prime-order subgroup");
                return this;
            }
            [Symbol.for("nodejs.util.inspect.custom")]() {
                return this.toString();
            }
            millerLoop(t) {
                return (function (t, e) {
                    let n = Mn.ONE;
                    const [r, i] = e,
                        [o, s] = [r, i];
                    for (let a = 0, c = Rn - 2; c >= 0; c--, a++)
                        (n = n.multiplyBy014(t[a][0], t[a][1].multiply(o.value), t[a][2].multiply(s.value))),
                            Nn(Pn.x, c) && ((a += 1), (n = n.multiplyBy014(t[a][0], t[a][1].multiply(o.value), t[a][2].multiply(s.value)))),
                            0 !== c && (n = n.square());
                    return n.conjugate();
                })(t.pairingPrecomputes(), this.toAffine());
            }
            clearCofactor() {
                return this.mulCurveMinusX().add(this);
            }
            isOnCurve() {
                const t = new Cn(Pn.b),
                    { x: e, y: n, z: r } = this,
                    i = n.pow(2n).multiply(r).subtract(e.pow(3n)),
                    o = t.multiply(r.pow(3n));
                return i.subtract(o).isZero();
            }
            sigma() {
                const [t, e] = this.toAffine();
                return new kr(t.multiply(0x1a0111ea397fe699ec02408663d4de85aa0d857d89759ad4897d29650fb85f9b409427eb4f49fffd8bfd00000000aaacn), e);
            }
            phi() {
                return new kr(this.x.multiply(0x5f19672fdf76ce51ba69c6076a0f77eaddb3a93be6f89688de17d813620a00022e01fffffffefffen), this.y, this.z);
            }
            mulCurveX() {
                return this.multiplyUnsafe(Pn.x).negate();
            }
            mulCurveMinusX() {
                return this.multiplyUnsafe(Pn.x);
            }
            isTorsionFree() {
                return this.mulCurveX().mulCurveMinusX().equals(this.phi());
            }
        }
        (kr.BASE = new kr(new Cn(Pn.Gx), new Cn(Pn.Gy), Cn.ONE)), (kr.ZERO = new kr(Cn.ONE, Cn.ONE, Cn.ZERO));
        class Nr extends zn {
            constructor(t, e) {
                let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : Zn.ONE;
                super(t, e, n, Zn), Ir(t, Zn), Ir(e, Zn), Ir(n, Zn);
            }
            static async hashToCurve(t) {
                t = vr(t);
                const e = await Rr(t, 2),
                    n = new Nr(...Kn($n(e[0]))),
                    r = new Nr(...Kn($n(e[1])));
                return n.add(r).clearCofactor();
            }
            static fromSignature(t) {
                t = vr(t);
                const { P: e } = Pn,
                    n = t.length / 2;
                if (48 !== n && 96 !== n) throw new Error("Invalid compressed signature length, must be 96 or 192");
                const r = mr(t.slice(0, n)),
                    i = mr(t.slice(n));
                if (1n === On(r, ur) / fr) return this.ZERO;
                const o = new Zn([i, r % lr]);
                let s = o.pow(3n).add(new Zn(Pn.b2)).sqrt();
                if (!s) throw new Error("Failed to find a square root");
                const [a, c] = s.values,
                    l = (r % fr) / lr;
                ((c > 0n && (2n * c) / e !== l) || (0n === c && (2n * a) / e !== l)) && (s = s.multiply(-1n));
                const f = new Nr(o, s, Zn.ONE);
                return f.assertValidity(), f;
            }
            static fromHex(t) {
                let e;
                if (96 === (t = vr(t)).length) throw new Error("Compressed format not supported yet.");
                if (192 !== t.length) throw new Error("Invalid uncompressed point G2, expected 192 bytes");
                {
                    if (0 !== (64 & t[0])) return Nr.ZERO;
                    const n = mr(t.slice(0, dr)),
                        r = mr(t.slice(dr, 96)),
                        i = mr(t.slice(96, 144)),
                        o = mr(t.slice(144));
                    e = new Nr(new Zn([r, n]), new Zn([o, i]));
                }
                return e.assertValidity(), e;
            }
            static fromPrivateKey(t) {
                return this.BASE.multiplyPrecomputed(Or(t));
            }
            toSignature() {
                if (this.equals(Nr.ZERO)) {
                    return wr(gr(ur + fr, dr) + gr(0n, dr));
                }
                const [[t, e], [n, r]] = this.toAffine().map((t) => t.values),
                    i = t;
                return wr(gr(e + ((r > 0n ? 2n * r : 2n * n) / Pn.P) * lr + ur, dr) + gr(i, dr));
            }
            toRawBytes() {
                let t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                return wr(this.toHex(t));
            }
            toHex() {
                let t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                if ((this.assertValidity(), t)) throw new Error("Point compression has not yet been implemented");
                {
                    if (this.equals(Nr.ZERO)) return "4".padEnd(384, "0");
                    const [[t, e], [n, r]] = this.toAffine().map((t) => t.values);
                    return gr(e, dr) + gr(t, dr) + gr(r, dr) + gr(n, dr);
                }
            }
            assertValidity() {
                if (this.isZero()) return this;
                if (!this.isOnCurve()) throw new Error("Invalid G2 point: not on curve Fp2");
                if (!this.isTorsionFree()) throw new Error("Invalid G2 point: must be of prime-order subgroup");
                return this;
            }
            psi() {
                return this.fromAffineTuple(
                    (function (t, e) {
                        return [Wn.multiplyByFp2(t).frobeniusMap(1).multiply(Vn).c[0].c[0], jn.multiplyByFp2(e).frobeniusMap(1).multiply(Ln).c[0].c[0]];
                    })(...this.toAffine())
                );
            }
            psi2() {
                return this.fromAffineTuple(
                    (function (t, e) {
                        return [t.multiply(Xn), e.negate()];
                    })(...this.toAffine())
                );
            }
            mulCurveX() {
                return this.multiplyUnsafe(Pn.x).negate();
            }
            clearCofactor() {
                const t = this;
                let e = t.mulCurveX(),
                    n = t.psi(),
                    r = t.double();
                (r = r.psi2()), (r = r.subtract(n)), (n = e.add(n)), (n = n.mulCurveX()), (r = r.add(n)), (r = r.subtract(e));
                return r.subtract(t);
            }
            isOnCurve() {
                const t = new Zn(Pn.b2),
                    { x: e, y: n, z: r } = this,
                    i = n.pow(2n).multiply(r).subtract(e.pow(3n)),
                    o = t.multiply(r.pow(3n));
                return i.subtract(o).isZero();
            }
            isTorsionFree() {
                return this.mulCurveX().equals(this.psi());
            }
            [Symbol.for("nodejs.util.inspect.custom")]() {
                return this.toString();
            }
            clearPairingPrecomputes() {
                this._PPRECOMPUTES = void 0;
            }
            pairingPrecomputes() {
                return (
                    this._PPRECOMPUTES ||
                        (this._PPRECOMPUTES = (function (t, e) {
                            const [n, r, i] = [t, e, Zn.ONE];
                            let [o, s, a] = [n, r, i],
                                c = [];
                            for (let l = Rn - 2; l >= 0; l--) {
                                let t = s.square(),
                                    e = a.square(),
                                    i = e.multiply(3n).multiplyByB(),
                                    f = i.multiply(3n),
                                    u = s.add(a).square().subtract(e).subtract(t);
                                if (
                                    (c.push([i.subtract(t), o.square().multiply(3n), u.negate()]),
                                    (o = t.subtract(f).multiply(o).multiply(s).div(2n)),
                                    (s = t.add(f).div(2n).square().subtract(i.square().multiply(3n))),
                                    (a = t.multiply(u)),
                                    Nn(Pn.x, l))
                                ) {
                                    let t = s.subtract(r.multiply(a)),
                                        e = o.subtract(n.multiply(a));
                                    c.push([t.multiply(n).subtract(e.multiply(r)), t.negate(), e]);
                                    let i = e.square(),
                                        l = i.multiply(e),
                                        f = i.multiply(o),
                                        u = l.subtract(f.multiply(2n)).add(t.square().multiply(a));
                                    (o = e.multiply(u)), (s = f.subtract(u).multiply(t).subtract(l.multiply(s))), (a = a.multiply(l));
                                }
                            }
                            return c;
                        })(...this.toAffine())),
                    this._PPRECOMPUTES
                );
            }
        }
        async function Ur(t) {
            return t instanceof Nr ? t : Nr.hashToCurve(t);
        }
        (Nr.BASE = new Nr(new Zn(Pn.G2x), new Zn(Pn.G2y), Zn.ONE)), (Nr.ZERO = new Nr(Zn.ONE, Zn.ONE, Zn.ZERO)), kr.BASE.calcMultiplyPrecomputes(4);
        "object" === typeof self && "crypto" in self && self.crypto;
        const Cr = (t) => new DataView(t.buffer, t.byteOffset, t.byteLength),
            Hr = (t, e) => (t << (32 - e)) | (t >>> e);
        if (!(68 === new Uint8Array(new Uint32Array([287454020]).buffer)[0])) throw new Error("Non little-endian hardware is not supported");
        const Tr = Array.from({ length: 256 }, (t, e) => e.toString(16).padStart(2, "0"));
        function Zr(t) {
            let e = "";
            for (let n = 0; n < t.length; n++) e += Tr[t[n]];
            return e;
        }
        (() => {
            const t = "undefined" !== typeof module && "function" === typeof module.require && module.require.bind(module);
            try {
                if (t) {
                    const { setImmediate: e } = t("timers");
                    return () => new Promise((t) => e(t));
                }
            } catch (c) {}
        })();
        function qr(t) {
            if ("string" !== typeof t) throw new TypeError("utf8ToBytes expected string, got " + typeof t);
            return new TextEncoder().encode(t);
        }
        function Mr(t) {
            if (("string" === typeof t && (t = qr(t)), !(t instanceof Uint8Array))) throw new TypeError(`Expected input type is Uint8Array (got ${typeof t})`);
            return t;
        }
        const zr = (t, e, n) => (t & e) ^ (~t & n),
            Dr = (t, e, n) => (t & e) ^ (t & n) ^ (e & n),
            Fr = new Uint32Array([
                1116352408,
                1899447441,
                3049323471,
                3921009573,
                961987163,
                1508970993,
                2453635748,
                2870763221,
                3624381080,
                310598401,
                607225278,
                1426881987,
                1925078388,
                2162078206,
                2614888103,
                3248222580,
                3835390401,
                4022224774,
                264347078,
                604807628,
                770255983,
                1249150122,
                1555081692,
                1996064986,
                2554220882,
                2821834349,
                2952996808,
                3210313671,
                3336571891,
                3584528711,
                113926993,
                338241895,
                666307205,
                773529912,
                1294757372,
                1396182291,
                1695183700,
                1986661051,
                2177026350,
                2456956037,
                2730485921,
                2820302411,
                3259730800,
                3345764771,
                3516065817,
                3600352804,
                4094571909,
                275423344,
                430227734,
                506948616,
                659060556,
                883997877,
                958139571,
                1322822218,
                1537002063,
                1747873779,
                1955562222,
                2024104815,
                2227730452,
                2361852424,
                2428436474,
                2756734187,
                3204031479,
                3329325298,
            ]),
            $r = new Uint32Array([1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225]),
            Kr = new Uint32Array(64);
        class Gr extends class extends class {
            clone() {
                return this._cloneInto();
            }
        } {
            constructor(t, e, n, r) {
                super(),
                    (this.blockLen = t),
                    (this.outputLen = e),
                    (this.padOffset = n),
                    (this.isLE = r),
                    (this.finished = !1),
                    (this.length = 0),
                    (this.pos = 0),
                    (this.destroyed = !1),
                    (this.buffer = new Uint8Array(t)),
                    (this.view = Cr(this.buffer));
            }
            update(t) {
                if (this.destroyed) throw new Error("instance is destroyed");
                const { view: e, buffer: n, blockLen: r, finished: i } = this;
                if (i) throw new Error("digest() was already called");
                const o = (t = Mr(t)).length;
                for (let s = 0; s < o; ) {
                    const i = Math.min(r - this.pos, o - s);
                    if (i !== r) n.set(t.subarray(s, s + i), this.pos), (this.pos += i), (s += i), this.pos === r && (this.process(e, 0), (this.pos = 0));
                    else {
                        const e = Cr(t);
                        for (; r <= o - s; s += r) this.process(e, s);
                    }
                }
                return (this.length += t.length), this.roundClean(), this;
            }
            digestInto(t) {
                if (this.destroyed) throw new Error("instance is destroyed");
                if (!(t instanceof Uint8Array) || t.length < this.outputLen) throw new Error("_Sha2: Invalid output buffer");
                if (this.finished) throw new Error("digest() was already called");
                this.finished = !0;
                const { buffer: e, view: n, blockLen: r, isLE: i } = this;
                let { pos: o } = this;
                (e[o++] = 128), this.buffer.subarray(o).fill(0), this.padOffset > r - o && (this.process(n, 0), (o = 0));
                for (let a = o; a < r; a++) e[a] = 0;
                !(function (t, e, n, r) {
                    if ("function" === typeof t.setBigUint64) return t.setBigUint64(e, n, r);
                    const i = BigInt(32),
                        o = BigInt(4294967295),
                        s = Number((n >> i) & o),
                        a = Number(n & o),
                        c = r ? 4 : 0,
                        l = r ? 0 : 4;
                    t.setUint32(e + c, s, r), t.setUint32(e + l, a, r);
                })(n, r - 8, BigInt(8 * this.length), i),
                    this.process(n, 0);
                const s = Cr(t);
                this.get().forEach((t, e) => s.setUint32(4 * e, t, i));
            }
            digest() {
                const { buffer: t, outputLen: e } = this;
                this.digestInto(t);
                const n = t.slice(0, e);
                return this.destroy(), n;
            }
            _cloneInto(t) {
                t || (t = new this.constructor()), t.set(...this.get());
                const { blockLen: e, buffer: n, length: r, finished: i, destroyed: o, pos: s } = this;
                return (t.length = r), (t.pos = s), (t.finished = i), (t.destroyed = o), r % e && t.buffer.set(n), t;
            }
        } {
            constructor() {
                super(64, 32, 8, !1), (this.A = 0 | $r[0]), (this.B = 0 | $r[1]), (this.C = 0 | $r[2]), (this.D = 0 | $r[3]), (this.E = 0 | $r[4]), (this.F = 0 | $r[5]), (this.G = 0 | $r[6]), (this.H = 0 | $r[7]);
            }
            get() {
                const { A: t, B: e, C: n, D: r, E: i, F: o, G: s, H: a } = this;
                return [t, e, n, r, i, o, s, a];
            }
            set(t, e, n, r, i, o, s, a) {
                (this.A = 0 | t), (this.B = 0 | e), (this.C = 0 | n), (this.D = 0 | r), (this.E = 0 | i), (this.F = 0 | o), (this.G = 0 | s), (this.H = 0 | a);
            }
            process(t, e) {
                for (let f = 0; f < 16; f++, e += 4) Kr[f] = t.getUint32(e, !1);
                for (let f = 16; f < 64; f++) {
                    const t = Kr[f - 15],
                        e = Kr[f - 2],
                        n = Hr(t, 7) ^ Hr(t, 18) ^ (t >>> 3),
                        r = Hr(e, 17) ^ Hr(e, 19) ^ (e >>> 10);
                    Kr[f] = (r + Kr[f - 7] + n + Kr[f - 16]) | 0;
                }
                let { A: n, B: r, C: i, D: o, E: s, F: a, G: c, H: l } = this;
                for (let f = 0; f < 64; f++) {
                    const t = (l + (Hr(s, 6) ^ Hr(s, 11) ^ Hr(s, 25)) + zr(s, a, c) + Fr[f] + Kr[f]) | 0,
                        e = ((Hr(n, 2) ^ Hr(n, 13) ^ Hr(n, 22)) + Dr(n, r, i)) | 0;
                    (l = c), (c = a), (a = s), (s = (o + t) | 0), (o = i), (i = r), (r = n), (n = (t + e) | 0);
                }
                (n = (n + this.A) | 0),
                    (r = (r + this.B) | 0),
                    (i = (i + this.C) | 0),
                    (o = (o + this.D) | 0),
                    (s = (s + this.E) | 0),
                    (a = (a + this.F) | 0),
                    (c = (c + this.G) | 0),
                    (l = (l + this.H) | 0),
                    this.set(n, r, i, o, s, a, c, l);
            }
            roundClean() {
                Kr.fill(0);
            }
            destroy() {
                this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
            }
        }
        const Vr = (function (t) {
            const e = (e) => t().update(Mr(e)).digest(),
                n = t();
            return (e.outputLen = n.outputLen), (e.blockLen = n.blockLen), (e.create = () => t()), e;
        })(() => new Gr());
        var Wr = 0;
        function Lr(t, n, r, i, o) {
            var s,
                a,
                c = {};
            for (a in n) "ref" == a ? (s = n[a]) : (c[a] = n[a]);
            var l = { type: t, props: c, key: r, ref: s, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: --Wr, __source: i, __self: o };
            if ("function" == typeof t && (s = t.defaultProps)) for (a in s) void 0 === c[a] && (c[a] = s[a]);
            return e.vnode && e.vnode(l), l;
        }
        function jr(t) {
            return t.toString();
        }
        class Xr extends Ct.Component {
            constructor() {
                super(), (this.state = { hex: "", x: "", y: "", z: "", signature: "" });
            }
            componentDidMount() {
                this.getPublicKey().then((t) => this.setState(t)), this.sign().then((t) => this.setState(t));
            }
            componentDidUpdate(t) {
                this.props.privKey !== t.privKey && this.getPublicKey().then((t) => this.setState(t)), (this.props.privKey === t.privKey && this.props.message === t.message) || this.sign().then((t) => this.setState(t));
            }
            async getPublicKey() {}
            async sign(t) {}
            render() {
                return this.renderPoint();
            }
        }
        const Yr = [
            {
                name: "secp256k1 ecdsa",
                hash: "sha256",
                cls: class extends Xr {
                    async getPublicKey() {
                        const t = (function (t) {
                                let e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                                return Wt.fromPrivateKey(t).toRawBytes(e);
                            })(this.props.privKey, !0),
                            e = Wt.fromHex(t),
                            [n, r] = [e.x, e.y].map((t) => jr(t));
                        return { hex33: e.toHex(!0), hex64: e.toHex(!1), x: n, y: r };
                    }
                    async sign() {
                        const t = Vr(this.props.message),
                            e = await (async function (t, e) {
                                let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                                const { seed: r, m: i, d: o } = Ae(t, e, n.extraEntropy);
                                let s;
                                const a = new _e();
                                for (await a.reseed(r); !(s = we(await a.generate(), i, o)); ) await a.reseed();
                                return Pe(s, n);
                            })(t, this.props.privKey, { canonical: !0 }),
                            n = Xt.fromDER(e),
                            [r, i] = [n.r, n.s].map((t) => jr(t));
                        return { compactSig: n.toCompactHex(), derSig: n.toDERHex(), msgHash: Zr(t), r: r, s: i };
                    }
                    renderPoint() {
                        return Lr("div", {
                            className: "curve-data",
                            children: [
                                Lr("h3", { children: "Public key" }),
                                Lr("table", {
                                    children: Lr("tbody", {
                                        children: [
                                            Lr("tr", { children: [Lr("td", { children: "x" }), Lr("td", { children: Lr("code", { children: this.state.x }) })] }),
                                            Lr("tr", { children: [Lr("td", { children: "y" }), Lr("td", { children: Lr("code", { children: this.state.y }) })] }),
                                            Lr("tr", { children: [Lr("td", { children: "33b hex" }), Lr("td", { children: Lr("code", { children: this.state.hex33 }) })] }),
                                            Lr("tr", { children: [Lr("td", { children: "64b hex" }), Lr("td", { children: Lr("code", { children: this.state.hex64 }) })] }),
                                        ],
                                    }),
                                }),
                                Lr("h3", { children: "Signature" }),
                                Lr("table", {
                                    children: Lr("tbody", {
                                        children: [
                                            Lr("tr", { children: [Lr("td", { children: "msgHash" }), Lr("td", { children: Lr("code", { children: this.state.msgHash }) })] }),
                                            Lr("tr", { children: [Lr("td", { children: "r" }), Lr("td", { children: Lr("code", { children: this.state.r }) })] }),
                                            Lr("tr", { children: [Lr("td", { children: "s" }), Lr("td", { children: Lr("code", { children: this.state.s }) })] }),
                                            Lr("tr", { children: [Lr("td", { children: "compact" }), Lr("td", { children: Lr("code", { children: this.state.compactSig }) })] }),
                                            Lr("tr", { children: [Lr("td", { children: "der" }), Lr("td", { children: Lr("code", { children: this.state.derSig }) })] }),
                                        ],
                                    }),
                                }),
                            ],
                        });
                    }
                },
            },
            {
                name: "secp256k1 schnorr",
                hash: "sha256",
                cls: class extends Xr {
                    async getPublicKey() {
                        const t = Wt.fromHex(Ue.getPublicKey(this.props.privKey)),
                            [e, n] = [t.x, t.y].map((t) => jr(t));
                        return { hex: t.toHex(), x: e, y: n };
                    }
                    async sign() {
                        const t = qr(this.props.message),
                            e = He.randomBytes(),
                            n = await Ue.sign(t, this.props.privKey, e),
                            r = Ue.Signature.fromHex(n),
                            [i, o] = [r.r, r.s].map((t) => jr(t));
                        return { msg: Zr(t), auxRand: Zr(e), r: i, s: o, sigHex: r.toHex() };
                    }
                    renderPoint() {
                        return Lr("div", {
                            className: "curve-data",
                            children: [
                                Lr("h3", { children: "Public key" }),
                                Lr("table", {
                                    children: Lr("tbody", {
                                        children: [
                                            Lr("tr", { children: [Lr("td", { children: "x" }), Lr("td", { children: Lr("code", { children: this.state.x }) })] }),
                                            Lr("tr", { children: [Lr("td", { children: "y" }), Lr("td", { children: Lr("code", { children: this.state.y }) })] }),
                                            Lr("tr", { children: [Lr("td", { children: "hex" }), Lr("td", { children: Lr("code", { children: this.state.hex }) })] }),
                                        ],
                                    }),
                                }),
                                Lr("h3", { children: "Signature" }),
                                Lr("table", {
                                    children: Lr("tbody", {
                                        children: [
                                            Lr("tr", { children: [Lr("td", { children: "msg" }), Lr("td", { children: Lr("code", { children: this.state.msg }) })] }),
                                            Lr("tr", { children: [Lr("td", { children: "auxRand" }), Lr("td", { children: Lr("code", { children: this.state.auxRand }) })] }),
                                            Lr("tr", { children: [Lr("td", { children: "r" }), Lr("td", { children: Lr("code", { children: this.state.r }) })] }),
                                            Lr("tr", { children: [Lr("td", { children: "s" }), Lr("td", { children: Lr("code", { children: this.state.s }) })] }),
                                            Lr("tr", { children: [Lr("td", { children: "sigHex" }), Lr("td", { children: Lr("code", { children: this.state.sigHex }) })] }),
                                        ],
                                    }),
                                }),
                            ],
                        });
                    }
                },
            },
            {
                name: "ed25519",
                hash: "sha256",
                cls: class extends Xr {
                    async getPublicKey() {
                        const t = en.fromHex(
                                await (async function (t) {
                                    return (await En(t)).pointBytes;
                                })(this.props.privKey)
                            ),
                            [e, n] = [t.x, t.y].map((t) => jr(t));
                        return { hex: t.toHex(), x: e, y: n };
                    }
                    async sign() {
                        const t = qr(this.props.message),
                            e = nn.fromHex(
                                await (async function (t, e) {
                                    t = gn(t);
                                    const { prefix: n, scalar: r, pointBytes: i } = await En(e),
                                        o = await wn(n, t),
                                        s = en.BASE.multiply(o),
                                        a = hn(o + (await wn(s.toRawBytes(), i, t)) * r, Fe.l);
                                    return new nn(s, a).toRawBytes();
                                })(t, this.props.privKey)
                            ),
                            [n, r, i] = [e.r.x, e.r.y, e.s].map((t) => jr(t));
                        return { msg: Zr(t), rx: n, ry: r, s: i, sigHex: e.toHex() };
                    }
                    renderPoint() {
                        return Lr("div", {
                            className: "curve-data",
                            children: [
                                Lr("h3", { children: "Public key" }),
                                Lr("table", {
                                    children: Lr("tbody", {
                                        children: [
                                            Lr("tr", { children: [Lr("td", { children: "x" }), Lr("td", { children: Lr("code", { children: this.state.x }) })] }),
                                            Lr("tr", { children: [Lr("td", { children: "y" }), Lr("td", { children: Lr("code", { children: this.state.y }) })] }),
                                            Lr("tr", { children: [Lr("td", { children: "hex" }), Lr("td", { children: Lr("code", { children: this.state.hex }) })] }),
                                        ],
                                    }),
                                }),
                                Lr("h3", { children: "Signature" }),
                                Lr("table", {
                                    children: Lr("tbody", {
                                        children: [
                                            Lr("tr", { children: [Lr("td", { children: "msg" }), Lr("td", { children: Lr("code", { children: this.state.msg }) })] }),
                                            Lr("tr", { children: [Lr("td", { children: "r.x" }), Lr("td", { children: Lr("code", { children: this.state.rx }) })] }),
                                            Lr("tr", { children: [Lr("td", { children: "r.y" }), Lr("td", { children: Lr("code", { children: this.state.ry }) })] }),
                                            Lr("tr", { children: [Lr("td", { children: "s" }), Lr("td", { children: Lr("code", { children: this.state.s }) })] }),
                                            Lr("tr", { children: [Lr("td", { children: "sigHex" }), Lr("td", { children: Lr("code", { children: this.state.sigHex }) })] }),
                                        ],
                                    }),
                                }),
                            ],
                        });
                    }
                },
            },
            {
                name: "bls12-381",
                hash: "sha256",
                cls: class extends Xr {
                    async getPublicKey() {
                        const t = ((e = this.props.privKey), kr.fromPrivateKey(e).toRawBytes(!0));
                        var e;
                        const n = kr.fromHex(t),
                            [r, i, o] = [n.x, n.y, n.z].map((t) => jr(t.value));
                        return { hex: Zr(t), x: r, y: i, z: o };
                    }
                    async sign() {
                        const t = Vr(this.props.message),
                            e = await (async function (t, e) {
                                const n = await Ur(t);
                                n.assertValidity();
                                const r = n.multiply(Or(e));
                                return t instanceof Nr ? r : r.toSignature();
                            })(t, this.props.privKey),
                            n = Nr.fromSignature(e),
                            [r, i, o, s] = [n.x.c[0], n.x.c[1], n.y.c[0], n.y.c[0]].map((t) => jr(t.value, 96));
                        return { msgHash: Zr(t), sigX: r, sigXi: i, sigY: o, sigYi: s, sigHex: Zr(e) };
                    }
                    renderPoint() {
                        return Lr("div", {
                            className: "curve-data",
                            children: [
                                Lr("h3", { children: "Public key G1" }),
                                Lr("table", {
                                    children: Lr("tbody", {
                                        children: [
                                            Lr("tr", { children: [Lr("td", { children: "x" }), Lr("td", { children: Lr("code", { children: this.state.x }) })] }),
                                            Lr("tr", { children: [Lr("td", { children: "y" }), Lr("td", { children: Lr("code", { children: this.state.y }) })] }),
                                            Lr("tr", { children: [Lr("td", { children: "hex" }), Lr("td", { children: Lr("code", { children: this.state.hex }) })] }),
                                        ],
                                    }),
                                }),
                                Lr("h3", { children: "Signature G2" }),
                                Lr("p", {
                                    children: Lr("small", {
                                        children: [
                                            "bls consists of two curves: G1 (ordinary) and G2 (complex numbers). Most implementations use G1 for pubkeys and G2 for signatures. So, signatures will coordinates in form of ",
                                            Lr("code", { children: "(x\u2080, x\u2081\xd7i), (y\u2080, y\u2081\xd7i)" }),
                                        ],
                                    }),
                                }),
                                Lr("table", {
                                    children: Lr("tbody", {
                                        children: [
                                            Lr("tr", { children: [Lr("td", { children: "msgHash" }), Lr("td", { children: Lr("code", { children: this.state.msgHash }) })] }),
                                            Lr("tr", {
                                                children: [Lr("td", { children: "x" }), Lr("td", { children: [Lr("code", { children: this.state.sigX }), " +", Lr("br", {}), Lr("code", { children: [this.state.sigXi, "\xd7i"] })] })],
                                            }),
                                            Lr("tr", {
                                                children: [Lr("td", { children: "y" }), Lr("td", { children: [Lr("code", { children: this.state.sigY }), " +", Lr("br", {}), Lr("code", { children: [this.state.sigYi, "\xd7i"] })] })],
                                            }),
                                            Lr("tr", { children: [Lr("td", { children: "sigHex" }), Lr("td", { children: Lr("code", { children: this.state.sigHex }) })] }),
                                        ],
                                    }),
                                }),
                            ],
                        });
                    }
                },
            },
        ];
        class Jr extends Ct.Component {
            constructor() {
                super(), (this.state = { privKey: "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef", message: "greetings from noble", curve: Yr[0] });
            }
            setPrivateKey(t) {
                this.setState({ privKey: t });
            }
            generateRandomPrivateKey() {
                const t = window.crypto.getRandomValues(new Uint8Array(32));
                this.setPrivateKey(Zr(t));
            }
            onKeyChange(t) {
                const e = t.target.value.padStart(64, "0");
                /[\daAbBcCdDeEfFxX]{0,66}/.test(e) && this.setPrivateKey(e);
            }
            onMsgChange(t) {
                const e = t.target.value;
                e.length > 0 && this.setState({ message: e });
            }
            selectCurve(t) {
                this.setState({ curve: t });
            }
            render() {
                const t = Yr.map((t, e) => {
                    const n = `curve-${e}`;
                    return Lr(
                        "span",
                        {
                            className: "curve-selector",
                            children: [Lr("input", { type: "radio", name: "curve", value: t.name, id: n, onChange: this.selectCurve.bind(this, t), checked: t.name === this.state.curve.name }), Lr("label", { htmlFor: n, children: t.name })],
                        },
                        n
                    );
                });
                return Lr("div", {
                    children: [
                        Lr("div", {
                            children: [
                                Lr("div", {
                                    children: [
                                        Lr("label", { htmlFor: "private-key", children: Lr("strong", { children: "Private key in hex format" }) }),
                                        " ",
                                        Lr("button", { type: "button", onClick: this.generateRandomPrivateKey.bind(this), children: "Random" }),
                                    ],
                                }),
                                Lr("div", {
                                    children: Lr("input", { id: "private-key", type: "text", size: "66", maxLength: "66", defaultValue: this.state.privKey, pattern: "[\\daAbBcCdDeEfFxX]{0,66}", onBlur: this.onKeyChange.bind(this) }),
                                }),
                            ],
                        }),
                        Lr("div", {
                            children: Lr("label", {
                                htmlFor: "message-to-sign",
                                children: [Lr("strong", { children: "Message to sign" }), Lr("small", { style: { color: "gray" }, children: [" (will be hashed with ", this.state.curve.hash, " for ecdsa/bls12)"] })],
                            }),
                        }),
                        Lr("div", { children: Lr("input", { id: "message-to-sign", type: "text", size: "66", maxLength: "512", value: this.state.message, onChange: this.onMsgChange.bind(this), onKeyUp: this.onMsgChange.bind(this) }) }),
                        Lr("div", { children: [Lr("div", { children: Lr("strong", { children: "Elliptic curve" }) }), t] }),
                        Lr("div", { className: "selected-curve", children: Lr(this.state.curve.cls, { privKey: this.state.privKey, message: this.state.message }) }),
                    ],
                });
            }
        }
        document.addEventListener("DOMContentLoaded", function () {
            Ct.render(Lr(Jr, {}), document.querySelector(".ecc-calculator-container"));
        });
    