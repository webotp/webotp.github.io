"use strict";
this.default_InstantbuyFrontendBuyflowServiceworker = this.default_InstantbuyFrontendBuyflowServiceworker || {};
(function (_) {
    var window = this;
    try {
        /*
        
         Copyright The Closure Library Authors.
         SPDX-License-Identifier: Apache-2.0
        */
        var n = function (b) {
                b = ["object" == typeof globalThis && globalThis, b, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
                for (var c = 0; c < b.length; ++c) {
                    var d = b[c];
                    if (d && d.Math == Math) return d
                }
                throw Error("a");
            },
            q = n(this),
            r = function (b) {
                var c = 0;
                return function () {
                    return c < b.length ? {
                        done: !1,
                        value: b[c++]
                    } : {
                        done: !0
                    }
                }
            },
            u = "function" == typeof Object.defineProperties ? Object.defineProperty : function (b, c, d) {
                if (b == Array.prototype || b == Object.prototype) return b;
                b[c] = d.value;
                return b
            },
            v = function (b, c) {
                if (c) a: {
                    var d = q;b = b.split(".");
                    for (var g = 0; g < b.length - 1; g++) {
                        var e = b[g];
                        if (!(e in d)) break a;
                        d = d[e]
                    }
                    b = b[b.length - 1];g = d[b];c = c(g);c != g && null != c && u(d, b, {
                        configurable: !0,
                        writable: !0,
                        value: c
                    })
                }
            };
        v("Symbol", function (b) {
            if (b) return b;
            var c = function (l, a) {
                this.g = l;
                u(this, "description", {
                    configurable: !0,
                    writable: !0,
                    value: a
                })
            };
            c.prototype.toString = function () {
                return this.g
            };
            var d = "jscomp_symbol_" + (1E9 * Math.random() >>> 0) + "_",
                g = 0,
                e = function (l) {
                    if (this instanceof e) throw new TypeError("b");
                    return new c(d + (l || "") + "_" + g++, l)
                };
            return e
        });
        v("Symbol.iterator", function (b) {
            if (b) return b;
            b = Symbol("c");
            for (var c = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), d = 0; d < c.length; d++) {
                var g = q[c[d]];
                "function" === typeof g && "function" != typeof g.prototype[b] && u(g.prototype, b, {
                    configurable: !0,
                    writable: !0,
                    value: function () {
                        return w(r(this))
                    }
                })
            }
            return b
        });
        var w = function (b) {
                b = {
                    next: b
                };
                b[Symbol.iterator] = function () {
                    return this
                };
                return b
            },
            x = function (b) {
                var c = "undefined" != typeof Symbol && Symbol.iterator && b[Symbol.iterator];
                return c ? c.call(b) : {
                    next: r(b)
                }
            };
        v("Object.is", function (b) {
            return b ? b : function (c, d) {
                return c === d ? 0 !== c || 1 / c === 1 / d : c !== c && d !== d
            }
        });
        v("Array.prototype.includes", function (b) {
            return b ? b : function (c, d) {
                var g = this;
                g instanceof String && (g = String(g));
                var e = g.length;
                d = d || 0;
                for (0 > d && (d = Math.max(d + e, 0)); d < e; d++) {
                    var l = g[d];
                    if (l === c || Object.is(l, c)) return !0
                }
                return !1
            }
        });
        v("String.prototype.includes", function (b) {
            return b ? b : function (c, d) {
                if (null == this) throw new TypeError("d`includes");
                if (c instanceof RegExp) throw new TypeError("e`includes");
                return -1 !== this.indexOf(c, d || 0)
            }
        });
        v("Promise", function (b) {
            function c() {
                this.g = null
            }

            function d(a) {
                return a instanceof e ? a : new e(function (f) {
                    f(a)
                })
            }
            if (b) return b;
            c.prototype.h = function (a) {
                if (null == this.g) {
                    this.g = [];
                    var f = this;
                    this.j(function () {
                        f.m()
                    })
                }
                this.g.push(a)
            };
            var g = q.setTimeout;
            c.prototype.j = function (a) {
                g(a, 0)
            };
            c.prototype.m = function () {
                for (; this.g && this.g.length;) {
                    var a = this.g;
                    this.g = [];
                    for (var f = 0; f < a.length; ++f) {
                        var h = a[f];
                        a[f] = null;
                        try {
                            h()
                        } catch (k) {
                            this.l(k)
                        }
                    }
                }
                this.g = null
            };
            c.prototype.l = function (a) {
                this.j(function () {
                    throw a;
                })
            };
            var e = function (a) {
                this.h = 0;
                this.j = void 0;
                this.g = [];
                this.u = !1;
                var f = this.m();
                try {
                    a(f.resolve, f.reject)
                } catch (h) {
                    f.reject(h)
                }
            };
            e.prototype.m = function () {
                function a(k) {
                    return function (m) {
                        h || (h = !0, k.call(f, m))
                    }
                }
                var f = this,
                    h = !1;
                return {
                    resolve: a(this.D),
                    reject: a(this.l)
                }
            };
            e.prototype.D = function (a) {
                if (a === this) this.l(new TypeError("f"));
                else if (a instanceof e) this.G(a);
                else {
                    a: switch (typeof a) {
                        case "object":
                            var f = null != a;
                            break a;
                        case "function":
                            f = !0;
                            break a;
                        default:
                            f = !1
                    }
                    f ? this.C(a) : this.o(a)
                }
            };
            e.prototype.C =
                function (a) {
                    var f = void 0;
                    try {
                        f = a.then
                    } catch (h) {
                        this.l(h);
                        return
                    }
                    "function" == typeof f ? this.H(f, a) : this.o(a)
                };
            e.prototype.l = function (a) {
                this.v(2, a)
            };
            e.prototype.o = function (a) {
                this.v(1, a)
            };
            e.prototype.v = function (a, f) {
                if (0 != this.h) throw Error("g`" + a + "`" + f + "`" + this.h);
                this.h = a;
                this.j = f;
                2 === this.h && this.F();
                this.B()
            };
            e.prototype.F = function () {
                var a = this;
                g(function () {
                    if (a.A()) {
                        var f = q.console;
                        "undefined" !== typeof f && f.error(a.j)
                    }
                }, 1)
            };
            e.prototype.A = function () {
                if (this.u) return !1;
                var a = q.CustomEvent,
                    f = q.Event,
                    h = q.dispatchEvent;
                if ("undefined" === typeof h) return !0;
                "function" === typeof a ? a = new a("unhandledrejection", {
                    cancelable: !0
                }) : "function" === typeof f ? a = new f("unhandledrejection", {
                    cancelable: !0
                }) : (a = q.document.createEvent("CustomEvent"), a.initCustomEvent("unhandledrejection", !1, !0, a));
                a.promise = this;
                a.reason = this.j;
                return h(a)
            };
            e.prototype.B = function () {
                if (null != this.g) {
                    for (var a = 0; a < this.g.length; ++a) l.h(this.g[a]);
                    this.g = null
                }
            };
            var l = new c;
            e.prototype.G = function (a) {
                var f = this.m();
                a.s(f.resolve, f.reject)
            };
            e.prototype.H = function (a, f) {
                var h = this.m();
                try {
                    a.call(f, h.resolve, h.reject)
                } catch (k) {
                    h.reject(k)
                }
            };
            e.prototype.then = function (a, f) {
                function h(p, t) {
                    return "function" == typeof p ? function (z) {
                        try {
                            k(p(z))
                        } catch (A) {
                            m(A)
                        }
                    } : t
                }
                var k, m, B = new e(function (p, t) {
                    k = p;
                    m = t
                });
                this.s(h(a, k), h(f, m));
                return B
            };
            e.prototype.catch = function (a) {
                return this.then(void 0, a)
            };
            e.prototype.s = function (a, f) {
                function h() {
                    switch (k.h) {
                        case 1:
                            a(k.j);
                            break;
                        case 2:
                            f(k.j);
                            break;
                        default:
                            throw Error("h`" + k.h);
                    }
                }
                var k = this;
                null == this.g ? l.h(h) :
                    this.g.push(h);
                this.u = !0
            };
            e.resolve = d;
            e.reject = function (a) {
                return new e(function (f, h) {
                    h(a)
                })
            };
            e.race = function (a) {
                return new e(function (f, h) {
                    for (var k = x(a), m = k.next(); !m.done; m = k.next()) d(m.value).s(f, h)
                })
            };
            e.all = function (a) {
                var f = x(a),
                    h = f.next();
                return h.done ? d([]) : new e(function (k, m) {
                    function B(z) {
                        return function (A) {
                            p[z] = A;
                            t--;
                            0 == t && k(p)
                        }
                    }
                    var p = [],
                        t = 0;
                    do p.push(void 0), t++, d(h.value).s(B(p.length - 1), m), h = f.next(); while (!h.done)
                })
            };
            return e
        });
        v("String.prototype.matchAll", function (b) {
            return b ? b : function (c) {
                if (c instanceof RegExp && !c.global) throw new TypeError("i");
                var d = new RegExp(c, c instanceof RegExp ? void 0 : "g"),
                    g = this,
                    e = !1,
                    l = {
                        next: function () {
                            if (e) return {
                                value: void 0,
                                done: !0
                            };
                            var a = d.exec(g);
                            if (!a) return e = !0, {
                                value: void 0,
                                done: !0
                            };
                            "" === a[0] && (d.lastIndex += 1);
                            return {
                                value: a,
                                done: !1
                            }
                        }
                    };
                l[Symbol.iterator] = function () {
                    return l
                };
                return l
            }
        });
        var y = this || self;
        var C = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;
        /*
        
        Math.uuid.js (v1.4)
        http://www.broofa.com
        mailto:robert@broofa.com
        Copyright (c) 2010 Robert Kieffer
        Dual licensed under the MIT and GPL licenses.
        */
        var D = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
        var E = function () {
                this.l = null;
                this.h = function () {};
                this.g = null;
                this.j = "https://google.com/pay";
                this.m = !0;
                this.o = self;
                self.addEventListener("abortpayment", this.u.bind(this));
                self.addEventListener("canmakepayment", this.v.bind(this));
                self.addEventListener("paymentrequest", this.A.bind(this));
                self.addEventListener("message", this.B.bind(this))
            },
            I, K, L;
        E.prototype.u = function (b) {
            b.respondWith(!1);
            this.g = null
        };
        E.prototype.v = function (b) {
            this.g ? b.respondWith(!1) : b.respondWith(this.m)
        };
        E.prototype.B = function (b) {
            F(this, b);
            ServiceWorkerExperiments.log_on_message && console.log("onMessage_ called!", b)
        };
        var G = function (b) {
                b = b.filter(function (c) {
                    return c.url.includes("/gp/p/ui/pay?ph=true")
                });
                return 0 < b.length ? b[0] : null
            },
            F = function (b, c) {
                if ((c = c.data) && c.type) {
                    var d = c.type;
                    if ("GET_MERCHANT_ORIGIN" == d) b.o.clients.matchAll({
                        type: "window"
                    }).then(function (e) {
                        if (e = G(e)) {
                            var l = e.postMessage,
                                a = b.g.paymentRequestOrigin.match(C),
                                f = a[1],
                                h = a[3];
                            a = a[4];
                            var k = "";
                            f && (k += f + ":");
                            h && (k = k + "//" + h, a && (k += ":" + a));
                            l.call(e, {
                                type: "GET_MERCHANT_ORIGIN",
                                origin: k
                            })
                        }
                    });
                    else if ("partialPaymentDataCallback" == d) H(b, c, "paymentDataCallbackResponse");
                    else if ("fullPaymentDataCallback" == d) H(b, c, "paymentAuthorizationResponse");
                    else {
                        var g = {
                            methodName: b.j,
                            details: c.data
                        };
                        "SUCCESS" == d ? b.l(g) : ServiceWorkerExperiments.propagate_error_to_developers && "ERROR" == d && c.data.statusCode ? b.l(g) : b.h(g);
                        b.g = null;
                        Promise.resolve()
                    }
                } else Promise.resolve()
            },
            H = function (b, c, d) {
                var g = b.o.clients.matchAll({
                    type: "window"
                });
                b = b.g.changePaymentMethod(b.j, c.data);
                Promise.all([g, b]).then(function (e) {
                    var l = G(e[0]);
                    l && l.postMessage({
                        type: d,
                        data: e[1].modifiers[0].data
                    })
                })
            };
        E.prototype.A = function (b) {
            var c = this;
            this.g = null;
            var d = new Promise(function (g, e) {
                c.l = g;
                c.h = e
            });
            this.g = b;
            this.g.respondWith(d);
            this.g.openWindow(I(this.g)).catch(this.h)
        };
        I = function (b) {
            var c = b.methodData[0].data;
            c.environment = c.environment || "PRODUCTION";
            if (!c.i) {
                for (var d = Date.now(), g = Array(36), e = 0, l, a = 0; 36 > a; a++) 8 == a || 13 == a || 18 == a || 23 == a ? g[a] = "-" : 14 == a ? g[a] = "4" : (2 >= e && (e = 33554432 + 16777216 * Math.random() | 0), l = e & 15, e >>= 4, g[a] = D[19 == a ? l & 3 | 8 : l]);
                c.i = {
                    startTimeMs: d,
                    googleTransactionId: g.join("") + "." + c.environment
                }
            }
            c.transactionInfo || (b = b.total, c.transactionInfo = {
                totalPriceStatus: "ESTIMATED",
                currencyCode: b.currency,
                totalPrice: b.value
            });
            c = {
                requestId: "id",
                returnUrl: "https://www.google.com",
                args: c
            };
            return "/gp/p/ui/pay?ph=true#" + encodeURIComponent("__WA__") + "=" + encodeURIComponent(JSON.stringify(c))
        };
        _.J = new E;
        K = ["ServiceWorker"];
        L = y;
        K[0] in L || "undefined" == typeof L.execScript || L.execScript("var " + K[0]);
        for (var M; K.length && (M = K.shift());) K.length || void 0 === _.J ? L[M] && L[M] !== Object.prototype[M] ? L = L[M] : L = L[M] = {} : L[M] = _.J;

    } catch (e) {
        _._DumpException(e)
    }
}).call(this, this.default_InstantbuyFrontendBuyflowServiceworker);
// Google Inc.