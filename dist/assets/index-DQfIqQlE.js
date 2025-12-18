(function () {
  const u = document.createElement("link").relList;
  if (u && u.supports && u.supports("modulepreload")) return;
  for (const c of document.querySelectorAll('link[rel="modulepreload"]')) o(c);
  new MutationObserver((c) => {
    for (const d of c)
      if (d.type === "childList")
        for (const m of d.addedNodes)
          m.tagName === "LINK" && m.rel === "modulepreload" && o(m);
  }).observe(document, { childList: !0, subtree: !0 });
  function s(c) {
    const d = {};
    return (
      c.integrity && (d.integrity = c.integrity),
      c.referrerPolicy && (d.referrerPolicy = c.referrerPolicy),
      c.crossOrigin === "use-credentials"
        ? (d.credentials = "include")
        : c.crossOrigin === "anonymous"
        ? (d.credentials = "omit")
        : (d.credentials = "same-origin"),
      d
    );
  }
  function o(c) {
    if (c.ep) return;
    c.ep = !0;
    const d = s(c);
    fetch(c.href, d);
  }
})();
function Wg(l) {
  return l && l.__esModule && Object.prototype.hasOwnProperty.call(l, "default")
    ? l.default
    : l;
}
var Xo = { exports: {} },
  xi = {};
var Uh;
function Ig() {
  if (Uh) return xi;
  Uh = 1;
  var l = Symbol.for("react.transitional.element"),
    u = Symbol.for("react.fragment");
  function s(o, c, d) {
    var m = null;
    if (
      (d !== void 0 && (m = "" + d),
      c.key !== void 0 && (m = "" + c.key),
      "key" in c)
    ) {
      d = {};
      for (var g in c) g !== "key" && (d[g] = c[g]);
    } else d = c;
    return (
      (c = d.ref),
      { $$typeof: l, type: o, key: m, ref: c !== void 0 ? c : null, props: d }
    );
  }
  return (xi.Fragment = u), (xi.jsx = s), (xi.jsxs = s), xi;
}
var Bh;
function Pg() {
  return Bh || ((Bh = 1), (Xo.exports = Ig())), Xo.exports;
}
var h = Pg(),
  Qo = { exports: {} },
  ft = {};
var Lh;
function tv() {
  if (Lh) return ft;
  Lh = 1;
  var l = Symbol.for("react.transitional.element"),
    u = Symbol.for("react.portal"),
    s = Symbol.for("react.fragment"),
    o = Symbol.for("react.strict_mode"),
    c = Symbol.for("react.profiler"),
    d = Symbol.for("react.consumer"),
    m = Symbol.for("react.context"),
    g = Symbol.for("react.forward_ref"),
    v = Symbol.for("react.suspense"),
    y = Symbol.for("react.memo"),
    b = Symbol.for("react.lazy"),
    S = Symbol.for("react.activity"),
    C = Symbol.iterator;
  function U(_) {
    return _ === null || typeof _ != "object"
      ? null
      : ((_ = (C && _[C]) || _["@@iterator"]),
        typeof _ == "function" ? _ : null);
  }
  var T = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    D = Object.assign,
    O = {};
  function B(_, Y, F) {
    (this.props = _),
      (this.context = Y),
      (this.refs = O),
      (this.updater = F || T);
  }
  (B.prototype.isReactComponent = {}),
    (B.prototype.setState = function (_, Y) {
      if (typeof _ != "object" && typeof _ != "function" && _ != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables."
        );
      this.updater.enqueueSetState(this, _, Y, "setState");
    }),
    (B.prototype.forceUpdate = function (_) {
      this.updater.enqueueForceUpdate(this, _, "forceUpdate");
    });
  function N() {}
  N.prototype = B.prototype;
  function k(_, Y, F) {
    (this.props = _),
      (this.context = Y),
      (this.refs = O),
      (this.updater = F || T);
  }
  var G = (k.prototype = new N());
  (G.constructor = k), D(G, B.prototype), (G.isPureReactComponent = !0);
  var K = Array.isArray;
  function nt() {}
  var q = { H: null, A: null, T: null, S: null },
    P = Object.prototype.hasOwnProperty;
  function W(_, Y, F) {
    var I = F.ref;
    return {
      $$typeof: l,
      type: _,
      key: Y,
      ref: I !== void 0 ? I : null,
      props: F,
    };
  }
  function yt(_, Y) {
    return W(_.type, Y, _.props);
  }
  function ot(_) {
    return typeof _ == "object" && _ !== null && _.$$typeof === l;
  }
  function gt(_) {
    var Y = { "=": "=0", ":": "=2" };
    return (
      "$" +
      _.replace(/[=:]/g, function (F) {
        return Y[F];
      })
    );
  }
  var J = /\/+/g;
  function lt(_, Y) {
    return typeof _ == "object" && _ !== null && _.key != null
      ? gt("" + _.key)
      : Y.toString(36);
  }
  function tt(_) {
    switch (_.status) {
      case "fulfilled":
        return _.value;
      case "rejected":
        throw _.reason;
      default:
        switch (
          (typeof _.status == "string"
            ? _.then(nt, nt)
            : ((_.status = "pending"),
              _.then(
                function (Y) {
                  _.status === "pending" &&
                    ((_.status = "fulfilled"), (_.value = Y));
                },
                function (Y) {
                  _.status === "pending" &&
                    ((_.status = "rejected"), (_.reason = Y));
                }
              )),
          _.status)
        ) {
          case "fulfilled":
            return _.value;
          case "rejected":
            throw _.reason;
        }
    }
    throw _;
  }
  function R(_, Y, F, I, st) {
    var ct = typeof _;
    (ct === "undefined" || ct === "boolean") && (_ = null);
    var vt = !1;
    if (_ === null) vt = !0;
    else
      switch (ct) {
        case "bigint":
        case "string":
        case "number":
          vt = !0;
          break;
        case "object":
          switch (_.$$typeof) {
            case l:
            case u:
              vt = !0;
              break;
            case b:
              return (vt = _._init), R(vt(_._payload), Y, F, I, st);
          }
      }
    if (vt)
      return (
        (st = st(_)),
        (vt = I === "" ? "." + lt(_, 0) : I),
        K(st)
          ? ((F = ""),
            vt != null && (F = vt.replace(J, "$&/") + "/"),
            R(st, Y, F, "", function (Ln) {
              return Ln;
            }))
          : st != null &&
            (ot(st) &&
              (st = yt(
                st,
                F +
                  (st.key == null || (_ && _.key === st.key)
                    ? ""
                    : ("" + st.key).replace(J, "$&/") + "/") +
                  vt
              )),
            Y.push(st)),
        1
      );
    vt = 0;
    var re = I === "" ? "." : I + ":";
    if (K(_))
      for (var qt = 0; qt < _.length; qt++)
        (I = _[qt]), (ct = re + lt(I, qt)), (vt += R(I, Y, F, ct, st));
    else if (((qt = U(_)), typeof qt == "function"))
      for (_ = qt.call(_), qt = 0; !(I = _.next()).done; )
        (I = I.value), (ct = re + lt(I, qt++)), (vt += R(I, Y, F, ct, st));
    else if (ct === "object") {
      if (typeof _.then == "function") return R(tt(_), Y, F, I, st);
      throw (
        ((Y = String(_)),
        Error(
          "Objects are not valid as a React child (found: " +
            (Y === "[object Object]"
              ? "object with keys {" + Object.keys(_).join(", ") + "}"
              : Y) +
            "). If you meant to render a collection of children, use an array instead."
        ))
      );
    }
    return vt;
  }
  function Z(_, Y, F) {
    if (_ == null) return _;
    var I = [],
      st = 0;
    return (
      R(_, I, "", "", function (ct) {
        return Y.call(F, ct, st++);
      }),
      I
    );
  }
  function $(_) {
    if (_._status === -1) {
      var Y = _._result;
      (Y = Y()),
        Y.then(
          function (F) {
            (_._status === 0 || _._status === -1) &&
              ((_._status = 1), (_._result = F));
          },
          function (F) {
            (_._status === 0 || _._status === -1) &&
              ((_._status = 2), (_._result = F));
          }
        ),
        _._status === -1 && ((_._status = 0), (_._result = Y));
    }
    if (_._status === 1) return _._result.default;
    throw _._result;
  }
  var ut =
      typeof reportError == "function"
        ? reportError
        : function (_) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var Y = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof _ == "object" &&
                  _ !== null &&
                  typeof _.message == "string"
                    ? String(_.message)
                    : String(_),
                error: _,
              });
              if (!window.dispatchEvent(Y)) return;
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", _);
              return;
            }
            console.error(_);
          },
    dt = {
      map: Z,
      forEach: function (_, Y, F) {
        Z(
          _,
          function () {
            Y.apply(this, arguments);
          },
          F
        );
      },
      count: function (_) {
        var Y = 0;
        return (
          Z(_, function () {
            Y++;
          }),
          Y
        );
      },
      toArray: function (_) {
        return (
          Z(_, function (Y) {
            return Y;
          }) || []
        );
      },
      only: function (_) {
        if (!ot(_))
          throw Error(
            "React.Children.only expected to receive a single React element child."
          );
        return _;
      },
    };
  return (
    (ft.Activity = S),
    (ft.Children = dt),
    (ft.Component = B),
    (ft.Fragment = s),
    (ft.Profiler = c),
    (ft.PureComponent = k),
    (ft.StrictMode = o),
    (ft.Suspense = v),
    (ft.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = q),
    (ft.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (_) {
        return q.H.useMemoCache(_);
      },
    }),
    (ft.cache = function (_) {
      return function () {
        return _.apply(null, arguments);
      };
    }),
    (ft.cacheSignal = function () {
      return null;
    }),
    (ft.cloneElement = function (_, Y, F) {
      if (_ == null)
        throw Error(
          "The argument must be a React element, but you passed " + _ + "."
        );
      var I = D({}, _.props),
        st = _.key;
      if (Y != null)
        for (ct in (Y.key !== void 0 && (st = "" + Y.key), Y))
          !P.call(Y, ct) ||
            ct === "key" ||
            ct === "__self" ||
            ct === "__source" ||
            (ct === "ref" && Y.ref === void 0) ||
            (I[ct] = Y[ct]);
      var ct = arguments.length - 2;
      if (ct === 1) I.children = F;
      else if (1 < ct) {
        for (var vt = Array(ct), re = 0; re < ct; re++)
          vt[re] = arguments[re + 2];
        I.children = vt;
      }
      return W(_.type, st, I);
    }),
    (ft.createContext = function (_) {
      return (
        (_ = {
          $$typeof: m,
          _currentValue: _,
          _currentValue2: _,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (_.Provider = _),
        (_.Consumer = { $$typeof: d, _context: _ }),
        _
      );
    }),
    (ft.createElement = function (_, Y, F) {
      var I,
        st = {},
        ct = null;
      if (Y != null)
        for (I in (Y.key !== void 0 && (ct = "" + Y.key), Y))
          P.call(Y, I) &&
            I !== "key" &&
            I !== "__self" &&
            I !== "__source" &&
            (st[I] = Y[I]);
      var vt = arguments.length - 2;
      if (vt === 1) st.children = F;
      else if (1 < vt) {
        for (var re = Array(vt), qt = 0; qt < vt; qt++)
          re[qt] = arguments[qt + 2];
        st.children = re;
      }
      if (_ && _.defaultProps)
        for (I in ((vt = _.defaultProps), vt))
          st[I] === void 0 && (st[I] = vt[I]);
      return W(_, ct, st);
    }),
    (ft.createRef = function () {
      return { current: null };
    }),
    (ft.forwardRef = function (_) {
      return { $$typeof: g, render: _ };
    }),
    (ft.isValidElement = ot),
    (ft.lazy = function (_) {
      return { $$typeof: b, _payload: { _status: -1, _result: _ }, _init: $ };
    }),
    (ft.memo = function (_, Y) {
      return { $$typeof: y, type: _, compare: Y === void 0 ? null : Y };
    }),
    (ft.startTransition = function (_) {
      var Y = q.T,
        F = {};
      q.T = F;
      try {
        var I = _(),
          st = q.S;
        st !== null && st(F, I),
          typeof I == "object" &&
            I !== null &&
            typeof I.then == "function" &&
            I.then(nt, ut);
      } catch (ct) {
        ut(ct);
      } finally {
        Y !== null && F.types !== null && (Y.types = F.types), (q.T = Y);
      }
    }),
    (ft.unstable_useCacheRefresh = function () {
      return q.H.useCacheRefresh();
    }),
    (ft.use = function (_) {
      return q.H.use(_);
    }),
    (ft.useActionState = function (_, Y, F) {
      return q.H.useActionState(_, Y, F);
    }),
    (ft.useCallback = function (_, Y) {
      return q.H.useCallback(_, Y);
    }),
    (ft.useContext = function (_) {
      return q.H.useContext(_);
    }),
    (ft.useDebugValue = function () {}),
    (ft.useDeferredValue = function (_, Y) {
      return q.H.useDeferredValue(_, Y);
    }),
    (ft.useEffect = function (_, Y) {
      return q.H.useEffect(_, Y);
    }),
    (ft.useEffectEvent = function (_) {
      return q.H.useEffectEvent(_);
    }),
    (ft.useId = function () {
      return q.H.useId();
    }),
    (ft.useImperativeHandle = function (_, Y, F) {
      return q.H.useImperativeHandle(_, Y, F);
    }),
    (ft.useInsertionEffect = function (_, Y) {
      return q.H.useInsertionEffect(_, Y);
    }),
    (ft.useLayoutEffect = function (_, Y) {
      return q.H.useLayoutEffect(_, Y);
    }),
    (ft.useMemo = function (_, Y) {
      return q.H.useMemo(_, Y);
    }),
    (ft.useOptimistic = function (_, Y) {
      return q.H.useOptimistic(_, Y);
    }),
    (ft.useReducer = function (_, Y, F) {
      return q.H.useReducer(_, Y, F);
    }),
    (ft.useRef = function (_) {
      return q.H.useRef(_);
    }),
    (ft.useState = function (_) {
      return q.H.useState(_);
    }),
    (ft.useSyncExternalStore = function (_, Y, F) {
      return q.H.useSyncExternalStore(_, Y, F);
    }),
    (ft.useTransition = function () {
      return q.H.useTransition();
    }),
    (ft.version = "19.2.0"),
    ft
  );
}
var Hh;
function vr() {
  return Hh || ((Hh = 1), (Qo.exports = tv())), Qo.exports;
}
var E = vr();
const wi = Wg(E);
var Zo = { exports: {} },
  Ei = {},
  ko = { exports: {} },
  Ko = {};
var qh;
function ev() {
  return (
    qh ||
      ((qh = 1),
      (function (l) {
        function u(R, Z) {
          var $ = R.length;
          R.push(Z);
          t: for (; 0 < $; ) {
            var ut = ($ - 1) >>> 1,
              dt = R[ut];
            if (0 < c(dt, Z)) (R[ut] = Z), (R[$] = dt), ($ = ut);
            else break t;
          }
        }
        function s(R) {
          return R.length === 0 ? null : R[0];
        }
        function o(R) {
          if (R.length === 0) return null;
          var Z = R[0],
            $ = R.pop();
          if ($ !== Z) {
            R[0] = $;
            t: for (var ut = 0, dt = R.length, _ = dt >>> 1; ut < _; ) {
              var Y = 2 * (ut + 1) - 1,
                F = R[Y],
                I = Y + 1,
                st = R[I];
              if (0 > c(F, $))
                I < dt && 0 > c(st, F)
                  ? ((R[ut] = st), (R[I] = $), (ut = I))
                  : ((R[ut] = F), (R[Y] = $), (ut = Y));
              else if (I < dt && 0 > c(st, $))
                (R[ut] = st), (R[I] = $), (ut = I);
              else break t;
            }
          }
          return Z;
        }
        function c(R, Z) {
          var $ = R.sortIndex - Z.sortIndex;
          return $ !== 0 ? $ : R.id - Z.id;
        }
        if (
          ((l.unstable_now = void 0),
          typeof performance == "object" &&
            typeof performance.now == "function")
        ) {
          var d = performance;
          l.unstable_now = function () {
            return d.now();
          };
        } else {
          var m = Date,
            g = m.now();
          l.unstable_now = function () {
            return m.now() - g;
          };
        }
        var v = [],
          y = [],
          b = 1,
          S = null,
          C = 3,
          U = !1,
          T = !1,
          D = !1,
          O = !1,
          B = typeof setTimeout == "function" ? setTimeout : null,
          N = typeof clearTimeout == "function" ? clearTimeout : null,
          k = typeof setImmediate < "u" ? setImmediate : null;
        function G(R) {
          for (var Z = s(y); Z !== null; ) {
            if (Z.callback === null) o(y);
            else if (Z.startTime <= R)
              o(y), (Z.sortIndex = Z.expirationTime), u(v, Z);
            else break;
            Z = s(y);
          }
        }
        function K(R) {
          if (((D = !1), G(R), !T))
            if (s(v) !== null) (T = !0), nt || ((nt = !0), gt());
            else {
              var Z = s(y);
              Z !== null && tt(K, Z.startTime - R);
            }
        }
        var nt = !1,
          q = -1,
          P = 5,
          W = -1;
        function yt() {
          return O ? !0 : !(l.unstable_now() - W < P);
        }
        function ot() {
          if (((O = !1), nt)) {
            var R = l.unstable_now();
            W = R;
            var Z = !0;
            try {
              t: {
                (T = !1), D && ((D = !1), N(q), (q = -1)), (U = !0);
                var $ = C;
                try {
                  e: {
                    for (
                      G(R), S = s(v);
                      S !== null && !(S.expirationTime > R && yt());

                    ) {
                      var ut = S.callback;
                      if (typeof ut == "function") {
                        (S.callback = null), (C = S.priorityLevel);
                        var dt = ut(S.expirationTime <= R);
                        if (((R = l.unstable_now()), typeof dt == "function")) {
                          (S.callback = dt), G(R), (Z = !0);
                          break e;
                        }
                        S === s(v) && o(v), G(R);
                      } else o(v);
                      S = s(v);
                    }
                    if (S !== null) Z = !0;
                    else {
                      var _ = s(y);
                      _ !== null && tt(K, _.startTime - R), (Z = !1);
                    }
                  }
                  break t;
                } finally {
                  (S = null), (C = $), (U = !1);
                }
                Z = void 0;
              }
            } finally {
              Z ? gt() : (nt = !1);
            }
          }
        }
        var gt;
        if (typeof k == "function")
          gt = function () {
            k(ot);
          };
        else if (typeof MessageChannel < "u") {
          var J = new MessageChannel(),
            lt = J.port2;
          (J.port1.onmessage = ot),
            (gt = function () {
              lt.postMessage(null);
            });
        } else
          gt = function () {
            B(ot, 0);
          };
        function tt(R, Z) {
          q = B(function () {
            R(l.unstable_now());
          }, Z);
        }
        (l.unstable_IdlePriority = 5),
          (l.unstable_ImmediatePriority = 1),
          (l.unstable_LowPriority = 4),
          (l.unstable_NormalPriority = 3),
          (l.unstable_Profiling = null),
          (l.unstable_UserBlockingPriority = 2),
          (l.unstable_cancelCallback = function (R) {
            R.callback = null;
          }),
          (l.unstable_forceFrameRate = function (R) {
            0 > R || 125 < R
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
                )
              : (P = 0 < R ? Math.floor(1e3 / R) : 5);
          }),
          (l.unstable_getCurrentPriorityLevel = function () {
            return C;
          }),
          (l.unstable_next = function (R) {
            switch (C) {
              case 1:
              case 2:
              case 3:
                var Z = 3;
                break;
              default:
                Z = C;
            }
            var $ = C;
            C = Z;
            try {
              return R();
            } finally {
              C = $;
            }
          }),
          (l.unstable_requestPaint = function () {
            O = !0;
          }),
          (l.unstable_runWithPriority = function (R, Z) {
            switch (R) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                R = 3;
            }
            var $ = C;
            C = R;
            try {
              return Z();
            } finally {
              C = $;
            }
          }),
          (l.unstable_scheduleCallback = function (R, Z, $) {
            var ut = l.unstable_now();
            switch (
              (typeof $ == "object" && $ !== null
                ? (($ = $.delay),
                  ($ = typeof $ == "number" && 0 < $ ? ut + $ : ut))
                : ($ = ut),
              R)
            ) {
              case 1:
                var dt = -1;
                break;
              case 2:
                dt = 250;
                break;
              case 5:
                dt = 1073741823;
                break;
              case 4:
                dt = 1e4;
                break;
              default:
                dt = 5e3;
            }
            return (
              (dt = $ + dt),
              (R = {
                id: b++,
                callback: Z,
                priorityLevel: R,
                startTime: $,
                expirationTime: dt,
                sortIndex: -1,
              }),
              $ > ut
                ? ((R.sortIndex = $),
                  u(y, R),
                  s(v) === null &&
                    R === s(y) &&
                    (D ? (N(q), (q = -1)) : (D = !0), tt(K, $ - ut)))
                : ((R.sortIndex = dt),
                  u(v, R),
                  T || U || ((T = !0), nt || ((nt = !0), gt()))),
              R
            );
          }),
          (l.unstable_shouldYield = yt),
          (l.unstable_wrapCallback = function (R) {
            var Z = C;
            return function () {
              var $ = C;
              C = Z;
              try {
                return R.apply(this, arguments);
              } finally {
                C = $;
              }
            };
          });
      })(Ko)),
    Ko
  );
}
var Yh;
function nv() {
  return Yh || ((Yh = 1), (ko.exports = ev())), ko.exports;
}
var Jo = { exports: {} },
  pe = {};
var Gh;
function av() {
  if (Gh) return pe;
  Gh = 1;
  var l = vr();
  function u(v) {
    var y = "https://react.dev/errors/" + v;
    if (1 < arguments.length) {
      y += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var b = 2; b < arguments.length; b++)
        y += "&args[]=" + encodeURIComponent(arguments[b]);
    }
    return (
      "Minified React error #" +
      v +
      "; visit " +
      y +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function s() {}
  var o = {
      d: {
        f: s,
        r: function () {
          throw Error(u(522));
        },
        D: s,
        C: s,
        L: s,
        m: s,
        X: s,
        S: s,
        M: s,
      },
      p: 0,
      findDOMNode: null,
    },
    c = Symbol.for("react.portal");
  function d(v, y, b) {
    var S =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: c,
      key: S == null ? null : "" + S,
      children: v,
      containerInfo: y,
      implementation: b,
    };
  }
  var m = l.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function g(v, y) {
    if (v === "font") return "";
    if (typeof y == "string") return y === "use-credentials" ? y : "";
  }
  return (
    (pe.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o),
    (pe.createPortal = function (v, y) {
      var b =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!y || (y.nodeType !== 1 && y.nodeType !== 9 && y.nodeType !== 11))
        throw Error(u(299));
      return d(v, y, null, b);
    }),
    (pe.flushSync = function (v) {
      var y = m.T,
        b = o.p;
      try {
        if (((m.T = null), (o.p = 2), v)) return v();
      } finally {
        (m.T = y), (o.p = b), o.d.f();
      }
    }),
    (pe.preconnect = function (v, y) {
      typeof v == "string" &&
        (y
          ? ((y = y.crossOrigin),
            (y =
              typeof y == "string"
                ? y === "use-credentials"
                  ? y
                  : ""
                : void 0))
          : (y = null),
        o.d.C(v, y));
    }),
    (pe.prefetchDNS = function (v) {
      typeof v == "string" && o.d.D(v);
    }),
    (pe.preinit = function (v, y) {
      if (typeof v == "string" && y && typeof y.as == "string") {
        var b = y.as,
          S = g(b, y.crossOrigin),
          C = typeof y.integrity == "string" ? y.integrity : void 0,
          U = typeof y.fetchPriority == "string" ? y.fetchPriority : void 0;
        b === "style"
          ? o.d.S(v, typeof y.precedence == "string" ? y.precedence : void 0, {
              crossOrigin: S,
              integrity: C,
              fetchPriority: U,
            })
          : b === "script" &&
            o.d.X(v, {
              crossOrigin: S,
              integrity: C,
              fetchPriority: U,
              nonce: typeof y.nonce == "string" ? y.nonce : void 0,
            });
      }
    }),
    (pe.preinitModule = function (v, y) {
      if (typeof v == "string")
        if (typeof y == "object" && y !== null) {
          if (y.as == null || y.as === "script") {
            var b = g(y.as, y.crossOrigin);
            o.d.M(v, {
              crossOrigin: b,
              integrity: typeof y.integrity == "string" ? y.integrity : void 0,
              nonce: typeof y.nonce == "string" ? y.nonce : void 0,
            });
          }
        } else y == null && o.d.M(v);
    }),
    (pe.preload = function (v, y) {
      if (
        typeof v == "string" &&
        typeof y == "object" &&
        y !== null &&
        typeof y.as == "string"
      ) {
        var b = y.as,
          S = g(b, y.crossOrigin);
        o.d.L(v, b, {
          crossOrigin: S,
          integrity: typeof y.integrity == "string" ? y.integrity : void 0,
          nonce: typeof y.nonce == "string" ? y.nonce : void 0,
          type: typeof y.type == "string" ? y.type : void 0,
          fetchPriority:
            typeof y.fetchPriority == "string" ? y.fetchPriority : void 0,
          referrerPolicy:
            typeof y.referrerPolicy == "string" ? y.referrerPolicy : void 0,
          imageSrcSet:
            typeof y.imageSrcSet == "string" ? y.imageSrcSet : void 0,
          imageSizes: typeof y.imageSizes == "string" ? y.imageSizes : void 0,
          media: typeof y.media == "string" ? y.media : void 0,
        });
      }
    }),
    (pe.preloadModule = function (v, y) {
      if (typeof v == "string")
        if (y) {
          var b = g(y.as, y.crossOrigin);
          o.d.m(v, {
            as: typeof y.as == "string" && y.as !== "script" ? y.as : void 0,
            crossOrigin: b,
            integrity: typeof y.integrity == "string" ? y.integrity : void 0,
          });
        } else o.d.m(v);
    }),
    (pe.requestFormReset = function (v) {
      o.d.r(v);
    }),
    (pe.unstable_batchedUpdates = function (v, y) {
      return v(y);
    }),
    (pe.useFormState = function (v, y, b) {
      return m.H.useFormState(v, y, b);
    }),
    (pe.useFormStatus = function () {
      return m.H.useHostTransitionStatus();
    }),
    (pe.version = "19.2.0"),
    pe
  );
}
var Vh;
function lv() {
  if (Vh) return Jo.exports;
  Vh = 1;
  function l() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(l);
      } catch (u) {
        console.error(u);
      }
  }
  return l(), (Jo.exports = av()), Jo.exports;
}
var Xh;
function iv() {
  if (Xh) return Ei;
  Xh = 1;
  var l = nv(),
    u = vr(),
    s = lv();
  function o(t) {
    var e = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      e += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var n = 2; n < arguments.length; n++)
        e += "&args[]=" + encodeURIComponent(arguments[n]);
    }
    return (
      "Minified React error #" +
      t +
      "; visit " +
      e +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function c(t) {
    return !(!t || (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11));
  }
  function d(t) {
    var e = t,
      n = t;
    if (t.alternate) for (; e.return; ) e = e.return;
    else {
      t = e;
      do (e = t), (e.flags & 4098) !== 0 && (n = e.return), (t = e.return);
      while (t);
    }
    return e.tag === 3 ? n : null;
  }
  function m(t) {
    if (t.tag === 13) {
      var e = t.memoizedState;
      if (
        (e === null && ((t = t.alternate), t !== null && (e = t.memoizedState)),
        e !== null)
      )
        return e.dehydrated;
    }
    return null;
  }
  function g(t) {
    if (t.tag === 31) {
      var e = t.memoizedState;
      if (
        (e === null && ((t = t.alternate), t !== null && (e = t.memoizedState)),
        e !== null)
      )
        return e.dehydrated;
    }
    return null;
  }
  function v(t) {
    if (d(t) !== t) throw Error(o(188));
  }
  function y(t) {
    var e = t.alternate;
    if (!e) {
      if (((e = d(t)), e === null)) throw Error(o(188));
      return e !== t ? null : t;
    }
    for (var n = t, a = e; ; ) {
      var i = n.return;
      if (i === null) break;
      var r = i.alternate;
      if (r === null) {
        if (((a = i.return), a !== null)) {
          n = a;
          continue;
        }
        break;
      }
      if (i.child === r.child) {
        for (r = i.child; r; ) {
          if (r === n) return v(i), t;
          if (r === a) return v(i), e;
          r = r.sibling;
        }
        throw Error(o(188));
      }
      if (n.return !== a.return) (n = i), (a = r);
      else {
        for (var f = !1, p = i.child; p; ) {
          if (p === n) {
            (f = !0), (n = i), (a = r);
            break;
          }
          if (p === a) {
            (f = !0), (a = i), (n = r);
            break;
          }
          p = p.sibling;
        }
        if (!f) {
          for (p = r.child; p; ) {
            if (p === n) {
              (f = !0), (n = r), (a = i);
              break;
            }
            if (p === a) {
              (f = !0), (a = r), (n = i);
              break;
            }
            p = p.sibling;
          }
          if (!f) throw Error(o(189));
        }
      }
      if (n.alternate !== a) throw Error(o(190));
    }
    if (n.tag !== 3) throw Error(o(188));
    return n.stateNode.current === n ? t : e;
  }
  function b(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t;
    for (t = t.child; t !== null; ) {
      if (((e = b(t)), e !== null)) return e;
      t = t.sibling;
    }
    return null;
  }
  var S = Object.assign,
    C = Symbol.for("react.element"),
    U = Symbol.for("react.transitional.element"),
    T = Symbol.for("react.portal"),
    D = Symbol.for("react.fragment"),
    O = Symbol.for("react.strict_mode"),
    B = Symbol.for("react.profiler"),
    N = Symbol.for("react.consumer"),
    k = Symbol.for("react.context"),
    G = Symbol.for("react.forward_ref"),
    K = Symbol.for("react.suspense"),
    nt = Symbol.for("react.suspense_list"),
    q = Symbol.for("react.memo"),
    P = Symbol.for("react.lazy"),
    W = Symbol.for("react.activity"),
    yt = Symbol.for("react.memo_cache_sentinel"),
    ot = Symbol.iterator;
  function gt(t) {
    return t === null || typeof t != "object"
      ? null
      : ((t = (ot && t[ot]) || t["@@iterator"]),
        typeof t == "function" ? t : null);
  }
  var J = Symbol.for("react.client.reference");
  function lt(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === J ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case D:
        return "Fragment";
      case B:
        return "Profiler";
      case O:
        return "StrictMode";
      case K:
        return "Suspense";
      case nt:
        return "SuspenseList";
      case W:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case T:
          return "Portal";
        case k:
          return t.displayName || "Context";
        case N:
          return (t._context.displayName || "Context") + ".Consumer";
        case G:
          var e = t.render;
          return (
            (t = t.displayName),
            t ||
              ((t = e.displayName || e.name || ""),
              (t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef")),
            t
          );
        case q:
          return (
            (e = t.displayName || null), e !== null ? e : lt(t.type) || "Memo"
          );
        case P:
          (e = t._payload), (t = t._init);
          try {
            return lt(t(e));
          } catch {}
      }
    return null;
  }
  var tt = Array.isArray,
    R = u.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    Z = s.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    $ = { pending: !1, data: null, method: null, action: null },
    ut = [],
    dt = -1;
  function _(t) {
    return { current: t };
  }
  function Y(t) {
    0 > dt || ((t.current = ut[dt]), (ut[dt] = null), dt--);
  }
  function F(t, e) {
    dt++, (ut[dt] = t.current), (t.current = e);
  }
  var I = _(null),
    st = _(null),
    ct = _(null),
    vt = _(null);
  function re(t, e) {
    switch ((F(ct, e), F(st, t), F(I, null), e.nodeType)) {
      case 9:
      case 11:
        t = (t = e.documentElement) && (t = t.namespaceURI) ? lh(t) : 0;
        break;
      default:
        if (((t = e.tagName), (e = e.namespaceURI)))
          (e = lh(e)), (t = ih(e, t));
        else
          switch (t) {
            case "svg":
              t = 1;
              break;
            case "math":
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    Y(I), F(I, t);
  }
  function qt() {
    Y(I), Y(st), Y(ct);
  }
  function Ln(t) {
    t.memoizedState !== null && F(vt, t);
    var e = I.current,
      n = ih(e, t.type);
    e !== n && (F(st, t), F(I, n));
  }
  function za(t) {
    st.current === t && (Y(I), Y(st)),
      vt.current === t && (Y(vt), (gi._currentValue = $));
  }
  var Al, Hn;
  function nn(t) {
    if (Al === void 0)
      try {
        throw Error();
      } catch (n) {
        var e = n.stack.trim().match(/\n( *(at )?)/);
        (Al = (e && e[1]) || ""),
          (Hn =
            -1 <
            n.stack.indexOf(`
    at`)
              ? " (<anonymous>)"
              : -1 < n.stack.indexOf("@")
              ? "@unknown:0:0"
              : "");
      }
    return (
      `
` +
      Al +
      t +
      Hn
    );
  }
  var Yi = !1;
  function jt(t, e) {
    if (!t || Yi) return "";
    Yi = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function () {
          try {
            if (e) {
              var Q = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(Q.prototype, "props", {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == "object" && Reflect.construct)
              ) {
                try {
                  Reflect.construct(Q, []);
                } catch (H) {
                  var M = H;
                }
                Reflect.construct(t, [], Q);
              } else {
                try {
                  Q.call();
                } catch (H) {
                  M = H;
                }
                t.call(Q.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (H) {
                M = H;
              }
              (Q = t()) &&
                typeof Q.catch == "function" &&
                Q.catch(function () {});
            }
          } catch (H) {
            if (H && M && typeof H.stack == "string") return [H.stack, M.stack];
          }
          return [null, null];
        },
      };
      a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var i = Object.getOwnPropertyDescriptor(
        a.DetermineComponentFrameRoot,
        "name"
      );
      i &&
        i.configurable &&
        Object.defineProperty(a.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot",
        });
      var r = a.DetermineComponentFrameRoot(),
        f = r[0],
        p = r[1];
      if (f && p) {
        var x = f.split(`
`),
          z = p.split(`
`);
        for (
          i = a = 0;
          a < x.length && !x[a].includes("DetermineComponentFrameRoot");

        )
          a++;
        for (; i < z.length && !z[i].includes("DetermineComponentFrameRoot"); )
          i++;
        if (a === x.length || i === z.length)
          for (
            a = x.length - 1, i = z.length - 1;
            1 <= a && 0 <= i && x[a] !== z[i];

          )
            i--;
        for (; 1 <= a && 0 <= i; a--, i--)
          if (x[a] !== z[i]) {
            if (a !== 1 || i !== 1)
              do
                if ((a--, i--, 0 > i || x[a] !== z[i])) {
                  var V =
                    `
` + x[a].replace(" at new ", " at ");
                  return (
                    t.displayName &&
                      V.includes("<anonymous>") &&
                      (V = V.replace("<anonymous>", t.displayName)),
                    V
                  );
                }
              while (1 <= a && 0 <= i);
            break;
          }
      }
    } finally {
      (Yi = !1), (Error.prepareStackTrace = n);
    }
    return (n = t ? t.displayName || t.name : "") ? nn(n) : "";
  }
  function Yt(t, e) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return nn(t.type);
      case 16:
        return nn("Lazy");
      case 13:
        return t.child !== e && e !== null
          ? nn("Suspense Fallback")
          : nn("Suspense");
      case 19:
        return nn("SuspenseList");
      case 0:
      case 15:
        return jt(t.type, !1);
      case 11:
        return jt(t.type.render, !1);
      case 1:
        return jt(t.type, !0);
      case 31:
        return nn("Activity");
      default:
        return "";
    }
  }
  function Xt(t) {
    try {
      var e = "",
        n = null;
      do (e += Yt(t, n)), (n = t), (t = t.return);
      while (t);
      return e;
    } catch (a) {
      return (
        `
Error generating stack: ` +
        a.message +
        `
` +
        a.stack
      );
    }
  }
  var Bt = Object.prototype.hasOwnProperty,
    ve = l.unstable_scheduleCallback,
    an = l.unstable_cancelCallback,
    ae = l.unstable_shouldYield,
    se = l.unstable_requestPaint,
    Qt = l.unstable_now,
    Gi = l.unstable_getCurrentPriorityLevel,
    Rl = l.unstable_ImmediatePriority,
    Ol = l.unstable_UserBlockingPriority,
    oe = l.unstable_NormalPriority,
    Je = l.unstable_LowPriority,
    Na = l.unstable_IdlePriority,
    Cr = l.log,
    jl = l.unstable_setDisableYieldValue,
    Cl = null,
    Ce = null;
  function qn(t) {
    if (
      (typeof Cr == "function" && jl(t),
      Ce && typeof Ce.setStrictMode == "function")
    )
      try {
        Ce.setStrictMode(Cl, t);
      } catch {}
  }
  var we = Math.clz32 ? Math.clz32 : Lp,
    Up = Math.log,
    Bp = Math.LN2;
  function Lp(t) {
    return (t >>>= 0), t === 0 ? 32 : (31 - ((Up(t) / Bp) | 0)) | 0;
  }
  var Vi = 256,
    Xi = 262144,
    Qi = 4194304;
  function fa(t) {
    var e = t & 42;
    if (e !== 0) return e;
    switch (t & -t) {
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
        return 64;
      case 128:
        return 128;
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
        return t & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return t;
    }
  }
  function Zi(t, e, n) {
    var a = t.pendingLanes;
    if (a === 0) return 0;
    var i = 0,
      r = t.suspendedLanes,
      f = t.pingedLanes;
    t = t.warmLanes;
    var p = a & 134217727;
    return (
      p !== 0
        ? ((a = p & ~r),
          a !== 0
            ? (i = fa(a))
            : ((f &= p),
              f !== 0
                ? (i = fa(f))
                : n || ((n = p & ~t), n !== 0 && (i = fa(n)))))
        : ((p = a & ~r),
          p !== 0
            ? (i = fa(p))
            : f !== 0
            ? (i = fa(f))
            : n || ((n = a & ~t), n !== 0 && (i = fa(n)))),
      i === 0
        ? 0
        : e !== 0 &&
          e !== i &&
          (e & r) === 0 &&
          ((r = i & -i),
          (n = e & -e),
          r >= n || (r === 32 && (n & 4194048) !== 0))
        ? e
        : i
    );
  }
  function wl(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
  }
  function Hp(t, e) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return e + 250;
      case 16:
      case 32:
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
        return e + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Hc() {
    var t = Qi;
    return (Qi <<= 1), (Qi & 62914560) === 0 && (Qi = 4194304), t;
  }
  function wr(t) {
    for (var e = [], n = 0; 31 > n; n++) e.push(t);
    return e;
  }
  function Dl(t, e) {
    (t.pendingLanes |= e),
      e !== 268435456 &&
        ((t.suspendedLanes = 0), (t.pingedLanes = 0), (t.warmLanes = 0));
  }
  function qp(t, e, n, a, i, r) {
    var f = t.pendingLanes;
    (t.pendingLanes = n),
      (t.suspendedLanes = 0),
      (t.pingedLanes = 0),
      (t.warmLanes = 0),
      (t.expiredLanes &= n),
      (t.entangledLanes &= n),
      (t.errorRecoveryDisabledLanes &= n),
      (t.shellSuspendCounter = 0);
    var p = t.entanglements,
      x = t.expirationTimes,
      z = t.hiddenUpdates;
    for (n = f & ~n; 0 < n; ) {
      var V = 31 - we(n),
        Q = 1 << V;
      (p[V] = 0), (x[V] = -1);
      var M = z[V];
      if (M !== null)
        for (z[V] = null, V = 0; V < M.length; V++) {
          var H = M[V];
          H !== null && (H.lane &= -536870913);
        }
      n &= ~Q;
    }
    a !== 0 && qc(t, a, 0),
      r !== 0 && i === 0 && t.tag !== 0 && (t.suspendedLanes |= r & ~(f & ~e));
  }
  function qc(t, e, n) {
    (t.pendingLanes |= e), (t.suspendedLanes &= ~e);
    var a = 31 - we(e);
    (t.entangledLanes |= e),
      (t.entanglements[a] = t.entanglements[a] | 1073741824 | (n & 261930));
  }
  function Yc(t, e) {
    var n = (t.entangledLanes |= e);
    for (t = t.entanglements; n; ) {
      var a = 31 - we(n),
        i = 1 << a;
      (i & e) | (t[a] & e) && (t[a] |= e), (n &= ~i);
    }
  }
  function Gc(t, e) {
    var n = e & -e;
    return (
      (n = (n & 42) !== 0 ? 1 : Dr(n)),
      (n & (t.suspendedLanes | e)) !== 0 ? 0 : n
    );
  }
  function Dr(t) {
    switch (t) {
      case 2:
        t = 1;
        break;
      case 8:
        t = 4;
        break;
      case 32:
        t = 16;
        break;
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
        t = 128;
        break;
      case 268435456:
        t = 134217728;
        break;
      default:
        t = 0;
    }
    return t;
  }
  function zr(t) {
    return (
      (t &= -t),
      2 < t ? (8 < t ? ((t & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
    );
  }
  function Vc() {
    var t = Z.p;
    return t !== 0 ? t : ((t = window.event), t === void 0 ? 32 : jh(t.type));
  }
  function Xc(t, e) {
    var n = Z.p;
    try {
      return (Z.p = t), e();
    } finally {
      Z.p = n;
    }
  }
  var Yn = Math.random().toString(36).slice(2),
    ce = "__reactFiber$" + Yn,
    Se = "__reactProps$" + Yn,
    Ma = "__reactContainer$" + Yn,
    Nr = "__reactEvents$" + Yn,
    Yp = "__reactListeners$" + Yn,
    Gp = "__reactHandles$" + Yn,
    Qc = "__reactResources$" + Yn,
    zl = "__reactMarker$" + Yn;
  function Mr(t) {
    delete t[ce], delete t[Se], delete t[Nr], delete t[Yp], delete t[Gp];
  }
  function Ua(t) {
    var e = t[ce];
    if (e) return e;
    for (var n = t.parentNode; n; ) {
      if ((e = n[Ma] || n[ce])) {
        if (
          ((n = e.alternate),
          e.child !== null || (n !== null && n.child !== null))
        )
          for (t = dh(t); t !== null; ) {
            if ((n = t[ce])) return n;
            t = dh(t);
          }
        return e;
      }
      (t = n), (n = t.parentNode);
    }
    return null;
  }
  function Ba(t) {
    if ((t = t[ce] || t[Ma])) {
      var e = t.tag;
      if (
        e === 5 ||
        e === 6 ||
        e === 13 ||
        e === 31 ||
        e === 26 ||
        e === 27 ||
        e === 3
      )
        return t;
    }
    return null;
  }
  function Nl(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
    throw Error(o(33));
  }
  function La(t) {
    var e = t[Qc];
    return (
      e ||
        (e = t[Qc] =
          { hoistableStyles: new Map(), hoistableScripts: new Map() }),
      e
    );
  }
  function ie(t) {
    t[zl] = !0;
  }
  var Zc = new Set(),
    kc = {};
  function da(t, e) {
    Ha(t, e), Ha(t + "Capture", e);
  }
  function Ha(t, e) {
    for (kc[t] = e, t = 0; t < e.length; t++) Zc.add(e[t]);
  }
  var Vp = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ),
    Kc = {},
    Jc = {};
  function Xp(t) {
    return Bt.call(Jc, t)
      ? !0
      : Bt.call(Kc, t)
      ? !1
      : Vp.test(t)
      ? (Jc[t] = !0)
      : ((Kc[t] = !0), !1);
  }
  function ki(t, e, n) {
    if (Xp(e))
      if (n === null) t.removeAttribute(e);
      else {
        switch (typeof n) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(e);
            return;
          case "boolean":
            var a = e.toLowerCase().slice(0, 5);
            if (a !== "data-" && a !== "aria-") {
              t.removeAttribute(e);
              return;
            }
        }
        t.setAttribute(e, "" + n);
      }
  }
  function Ki(t, e, n) {
    if (n === null) t.removeAttribute(e);
    else {
      switch (typeof n) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(e);
          return;
      }
      t.setAttribute(e, "" + n);
    }
  }
  function hn(t, e, n, a) {
    if (a === null) t.removeAttribute(n);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(n);
          return;
      }
      t.setAttributeNS(e, n, "" + a);
    }
  }
  function He(t) {
    switch (typeof t) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return t;
      case "object":
        return t;
      default:
        return "";
    }
  }
  function $c(t) {
    var e = t.type;
    return (
      (t = t.nodeName) &&
      t.toLowerCase() === "input" &&
      (e === "checkbox" || e === "radio")
    );
  }
  function Qp(t, e, n) {
    var a = Object.getOwnPropertyDescriptor(t.constructor.prototype, e);
    if (
      !t.hasOwnProperty(e) &&
      typeof a < "u" &&
      typeof a.get == "function" &&
      typeof a.set == "function"
    ) {
      var i = a.get,
        r = a.set;
      return (
        Object.defineProperty(t, e, {
          configurable: !0,
          get: function () {
            return i.call(this);
          },
          set: function (f) {
            (n = "" + f), r.call(this, f);
          },
        }),
        Object.defineProperty(t, e, { enumerable: a.enumerable }),
        {
          getValue: function () {
            return n;
          },
          setValue: function (f) {
            n = "" + f;
          },
          stopTracking: function () {
            (t._valueTracker = null), delete t[e];
          },
        }
      );
    }
  }
  function Ur(t) {
    if (!t._valueTracker) {
      var e = $c(t) ? "checked" : "value";
      t._valueTracker = Qp(t, e, "" + t[e]);
    }
  }
  function Fc(t) {
    if (!t) return !1;
    var e = t._valueTracker;
    if (!e) return !0;
    var n = e.getValue(),
      a = "";
    return (
      t && (a = $c(t) ? (t.checked ? "true" : "false") : t.value),
      (t = a),
      t !== n ? (e.setValue(t), !0) : !1
    );
  }
  function Ji(t) {
    if (
      ((t = t || (typeof document < "u" ? document : void 0)), typeof t > "u")
    )
      return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var Zp = /[\n"\\]/g;
  function qe(t) {
    return t.replace(Zp, function (e) {
      return "\\" + e.charCodeAt(0).toString(16) + " ";
    });
  }
  function Br(t, e, n, a, i, r, f, p) {
    (t.name = ""),
      f != null &&
      typeof f != "function" &&
      typeof f != "symbol" &&
      typeof f != "boolean"
        ? (t.type = f)
        : t.removeAttribute("type"),
      e != null
        ? f === "number"
          ? ((e === 0 && t.value === "") || t.value != e) &&
            (t.value = "" + He(e))
          : t.value !== "" + He(e) && (t.value = "" + He(e))
        : (f !== "submit" && f !== "reset") || t.removeAttribute("value"),
      e != null
        ? Lr(t, f, He(e))
        : n != null
        ? Lr(t, f, He(n))
        : a != null && t.removeAttribute("value"),
      i == null && r != null && (t.defaultChecked = !!r),
      i != null &&
        (t.checked = i && typeof i != "function" && typeof i != "symbol"),
      p != null &&
      typeof p != "function" &&
      typeof p != "symbol" &&
      typeof p != "boolean"
        ? (t.name = "" + He(p))
        : t.removeAttribute("name");
  }
  function Wc(t, e, n, a, i, r, f, p) {
    if (
      (r != null &&
        typeof r != "function" &&
        typeof r != "symbol" &&
        typeof r != "boolean" &&
        (t.type = r),
      e != null || n != null)
    ) {
      if (!((r !== "submit" && r !== "reset") || e != null)) {
        Ur(t);
        return;
      }
      (n = n != null ? "" + He(n) : ""),
        (e = e != null ? "" + He(e) : n),
        p || e === t.value || (t.value = e),
        (t.defaultValue = e);
    }
    (a = a ?? i),
      (a = typeof a != "function" && typeof a != "symbol" && !!a),
      (t.checked = p ? t.checked : !!a),
      (t.defaultChecked = !!a),
      f != null &&
        typeof f != "function" &&
        typeof f != "symbol" &&
        typeof f != "boolean" &&
        (t.name = f),
      Ur(t);
  }
  function Lr(t, e, n) {
    (e === "number" && Ji(t.ownerDocument) === t) ||
      t.defaultValue === "" + n ||
      (t.defaultValue = "" + n);
  }
  function qa(t, e, n, a) {
    if (((t = t.options), e)) {
      e = {};
      for (var i = 0; i < n.length; i++) e["$" + n[i]] = !0;
      for (n = 0; n < t.length; n++)
        (i = e.hasOwnProperty("$" + t[n].value)),
          t[n].selected !== i && (t[n].selected = i),
          i && a && (t[n].defaultSelected = !0);
    } else {
      for (n = "" + He(n), e = null, i = 0; i < t.length; i++) {
        if (t[i].value === n) {
          (t[i].selected = !0), a && (t[i].defaultSelected = !0);
          return;
        }
        e !== null || t[i].disabled || (e = t[i]);
      }
      e !== null && (e.selected = !0);
    }
  }
  function Ic(t, e, n) {
    if (
      e != null &&
      ((e = "" + He(e)), e !== t.value && (t.value = e), n == null)
    ) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = n != null ? "" + He(n) : "";
  }
  function Pc(t, e, n, a) {
    if (e == null) {
      if (a != null) {
        if (n != null) throw Error(o(92));
        if (tt(a)) {
          if (1 < a.length) throw Error(o(93));
          a = a[0];
        }
        n = a;
      }
      n == null && (n = ""), (e = n);
    }
    (n = He(e)),
      (t.defaultValue = n),
      (a = t.textContent),
      a === n && a !== "" && a !== null && (t.value = a),
      Ur(t);
  }
  function Ya(t, e) {
    if (e) {
      var n = t.firstChild;
      if (n && n === t.lastChild && n.nodeType === 3) {
        n.nodeValue = e;
        return;
      }
    }
    t.textContent = e;
  }
  var kp = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function tf(t, e, n) {
    var a = e.indexOf("--") === 0;
    n == null || typeof n == "boolean" || n === ""
      ? a
        ? t.setProperty(e, "")
        : e === "float"
        ? (t.cssFloat = "")
        : (t[e] = "")
      : a
      ? t.setProperty(e, n)
      : typeof n != "number" || n === 0 || kp.has(e)
      ? e === "float"
        ? (t.cssFloat = n)
        : (t[e] = ("" + n).trim())
      : (t[e] = n + "px");
  }
  function ef(t, e, n) {
    if (e != null && typeof e != "object") throw Error(o(62));
    if (((t = t.style), n != null)) {
      for (var a in n)
        !n.hasOwnProperty(a) ||
          (e != null && e.hasOwnProperty(a)) ||
          (a.indexOf("--") === 0
            ? t.setProperty(a, "")
            : a === "float"
            ? (t.cssFloat = "")
            : (t[a] = ""));
      for (var i in e)
        (a = e[i]), e.hasOwnProperty(i) && n[i] !== a && tf(t, i, a);
    } else for (var r in e) e.hasOwnProperty(r) && tf(t, r, e[r]);
  }
  function Hr(t) {
    if (t.indexOf("-") === -1) return !1;
    switch (t) {
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
        return !0;
    }
  }
  var Kp = new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"],
    ]),
    Jp =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function $i(t) {
    return Jp.test("" + t)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : t;
  }
  function yn() {}
  var qr = null;
  function Yr(t) {
    return (
      (t = t.target || t.srcElement || window),
      t.correspondingUseElement && (t = t.correspondingUseElement),
      t.nodeType === 3 ? t.parentNode : t
    );
  }
  var Ga = null,
    Va = null;
  function nf(t) {
    var e = Ba(t);
    if (e && (t = e.stateNode)) {
      var n = t[Se] || null;
      t: switch (((t = e.stateNode), e.type)) {
        case "input":
          if (
            (Br(
              t,
              n.value,
              n.defaultValue,
              n.defaultValue,
              n.checked,
              n.defaultChecked,
              n.type,
              n.name
            ),
            (e = n.name),
            n.type === "radio" && e != null)
          ) {
            for (n = t; n.parentNode; ) n = n.parentNode;
            for (
              n = n.querySelectorAll(
                'input[name="' + qe("" + e) + '"][type="radio"]'
              ),
                e = 0;
              e < n.length;
              e++
            ) {
              var a = n[e];
              if (a !== t && a.form === t.form) {
                var i = a[Se] || null;
                if (!i) throw Error(o(90));
                Br(
                  a,
                  i.value,
                  i.defaultValue,
                  i.defaultValue,
                  i.checked,
                  i.defaultChecked,
                  i.type,
                  i.name
                );
              }
            }
            for (e = 0; e < n.length; e++)
              (a = n[e]), a.form === t.form && Fc(a);
          }
          break t;
        case "textarea":
          Ic(t, n.value, n.defaultValue);
          break t;
        case "select":
          (e = n.value), e != null && qa(t, !!n.multiple, e, !1);
      }
    }
  }
  var Gr = !1;
  function af(t, e, n) {
    if (Gr) return t(e, n);
    Gr = !0;
    try {
      var a = t(e);
      return a;
    } finally {
      if (
        ((Gr = !1),
        (Ga !== null || Va !== null) &&
          (Bu(), Ga && ((e = Ga), (t = Va), (Va = Ga = null), nf(e), t)))
      )
        for (e = 0; e < t.length; e++) nf(t[e]);
    }
  }
  function Ml(t, e) {
    var n = t.stateNode;
    if (n === null) return null;
    var a = n[Se] || null;
    if (a === null) return null;
    n = a[e];
    t: switch (e) {
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
        (a = !a.disabled) ||
          ((t = t.type),
          (a = !(
            t === "button" ||
            t === "input" ||
            t === "select" ||
            t === "textarea"
          ))),
          (t = !a);
        break t;
      default:
        t = !1;
    }
    if (t) return null;
    if (n && typeof n != "function") throw Error(o(231, e, typeof n));
    return n;
  }
  var pn = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    Vr = !1;
  if (pn)
    try {
      var Ul = {};
      Object.defineProperty(Ul, "passive", {
        get: function () {
          Vr = !0;
        },
      }),
        window.addEventListener("test", Ul, Ul),
        window.removeEventListener("test", Ul, Ul);
    } catch {
      Vr = !1;
    }
  var Gn = null,
    Xr = null,
    Fi = null;
  function lf() {
    if (Fi) return Fi;
    var t,
      e = Xr,
      n = e.length,
      a,
      i = "value" in Gn ? Gn.value : Gn.textContent,
      r = i.length;
    for (t = 0; t < n && e[t] === i[t]; t++);
    var f = n - t;
    for (a = 1; a <= f && e[n - a] === i[r - a]; a++);
    return (Fi = i.slice(t, 1 < a ? 1 - a : void 0));
  }
  function Wi(t) {
    var e = t.keyCode;
    return (
      "charCode" in t
        ? ((t = t.charCode), t === 0 && e === 13 && (t = 13))
        : (t = e),
      t === 10 && (t = 13),
      32 <= t || t === 13 ? t : 0
    );
  }
  function Ii() {
    return !0;
  }
  function uf() {
    return !1;
  }
  function xe(t) {
    function e(n, a, i, r, f) {
      (this._reactName = n),
        (this._targetInst = i),
        (this.type = a),
        (this.nativeEvent = r),
        (this.target = f),
        (this.currentTarget = null);
      for (var p in t)
        t.hasOwnProperty(p) && ((n = t[p]), (this[p] = n ? n(r) : r[p]));
      return (
        (this.isDefaultPrevented = (
          r.defaultPrevented != null ? r.defaultPrevented : r.returnValue === !1
        )
          ? Ii
          : uf),
        (this.isPropagationStopped = uf),
        this
      );
    }
    return (
      S(e.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var n = this.nativeEvent;
          n &&
            (n.preventDefault
              ? n.preventDefault()
              : typeof n.returnValue != "unknown" && (n.returnValue = !1),
            (this.isDefaultPrevented = Ii));
        },
        stopPropagation: function () {
          var n = this.nativeEvent;
          n &&
            (n.stopPropagation
              ? n.stopPropagation()
              : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
            (this.isPropagationStopped = Ii));
        },
        persist: function () {},
        isPersistent: Ii,
      }),
      e
    );
  }
  var ma = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (t) {
        return t.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Pi = xe(ma),
    Bl = S({}, ma, { view: 0, detail: 0 }),
    $p = xe(Bl),
    Qr,
    Zr,
    Ll,
    tu = S({}, Bl, {
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
      getModifierState: Kr,
      button: 0,
      buttons: 0,
      relatedTarget: function (t) {
        return t.relatedTarget === void 0
          ? t.fromElement === t.srcElement
            ? t.toElement
            : t.fromElement
          : t.relatedTarget;
      },
      movementX: function (t) {
        return "movementX" in t
          ? t.movementX
          : (t !== Ll &&
              (Ll && t.type === "mousemove"
                ? ((Qr = t.screenX - Ll.screenX), (Zr = t.screenY - Ll.screenY))
                : (Zr = Qr = 0),
              (Ll = t)),
            Qr);
      },
      movementY: function (t) {
        return "movementY" in t ? t.movementY : Zr;
      },
    }),
    rf = xe(tu),
    Fp = S({}, tu, { dataTransfer: 0 }),
    Wp = xe(Fp),
    Ip = S({}, Bl, { relatedTarget: 0 }),
    kr = xe(Ip),
    Pp = S({}, ma, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    t0 = xe(Pp),
    e0 = S({}, ma, {
      clipboardData: function (t) {
        return "clipboardData" in t ? t.clipboardData : window.clipboardData;
      },
    }),
    n0 = xe(e0),
    a0 = S({}, ma, { data: 0 }),
    sf = xe(a0),
    l0 = {
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
      MozPrintableKey: "Unidentified",
    },
    i0 = {
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
      224: "Meta",
    },
    u0 = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function r0(t) {
    var e = this.nativeEvent;
    return e.getModifierState
      ? e.getModifierState(t)
      : (t = u0[t])
      ? !!e[t]
      : !1;
  }
  function Kr() {
    return r0;
  }
  var s0 = S({}, Bl, {
      key: function (t) {
        if (t.key) {
          var e = l0[t.key] || t.key;
          if (e !== "Unidentified") return e;
        }
        return t.type === "keypress"
          ? ((t = Wi(t)), t === 13 ? "Enter" : String.fromCharCode(t))
          : t.type === "keydown" || t.type === "keyup"
          ? i0[t.keyCode] || "Unidentified"
          : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Kr,
      charCode: function (t) {
        return t.type === "keypress" ? Wi(t) : 0;
      },
      keyCode: function (t) {
        return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
      },
      which: function (t) {
        return t.type === "keypress"
          ? Wi(t)
          : t.type === "keydown" || t.type === "keyup"
          ? t.keyCode
          : 0;
      },
    }),
    o0 = xe(s0),
    c0 = S({}, tu, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    of = xe(c0),
    f0 = S({}, Bl, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Kr,
    }),
    d0 = xe(f0),
    m0 = S({}, ma, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    h0 = xe(m0),
    y0 = S({}, tu, {
      deltaX: function (t) {
        return "deltaX" in t
          ? t.deltaX
          : "wheelDeltaX" in t
          ? -t.wheelDeltaX
          : 0;
      },
      deltaY: function (t) {
        return "deltaY" in t
          ? t.deltaY
          : "wheelDeltaY" in t
          ? -t.wheelDeltaY
          : "wheelDelta" in t
          ? -t.wheelDelta
          : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    p0 = xe(y0),
    g0 = S({}, ma, { newState: 0, oldState: 0 }),
    v0 = xe(g0),
    b0 = [9, 13, 27, 32],
    Jr = pn && "CompositionEvent" in window,
    Hl = null;
  pn && "documentMode" in document && (Hl = document.documentMode);
  var S0 = pn && "TextEvent" in window && !Hl,
    cf = pn && (!Jr || (Hl && 8 < Hl && 11 >= Hl)),
    ff = " ",
    df = !1;
  function mf(t, e) {
    switch (t) {
      case "keyup":
        return b0.indexOf(e.keyCode) !== -1;
      case "keydown":
        return e.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function hf(t) {
    return (t = t.detail), typeof t == "object" && "data" in t ? t.data : null;
  }
  var Xa = !1;
  function x0(t, e) {
    switch (t) {
      case "compositionend":
        return hf(e);
      case "keypress":
        return e.which !== 32 ? null : ((df = !0), ff);
      case "textInput":
        return (t = e.data), t === ff && df ? null : t;
      default:
        return null;
    }
  }
  function E0(t, e) {
    if (Xa)
      return t === "compositionend" || (!Jr && mf(t, e))
        ? ((t = lf()), (Fi = Xr = Gn = null), (Xa = !1), t)
        : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(e.ctrlKey || e.altKey || e.metaKey) || (e.ctrlKey && e.altKey)) {
          if (e.char && 1 < e.char.length) return e.char;
          if (e.which) return String.fromCharCode(e.which);
        }
        return null;
      case "compositionend":
        return cf && e.locale !== "ko" ? null : e.data;
      default:
        return null;
    }
  }
  var _0 = {
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
    week: !0,
  };
  function yf(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e === "input" ? !!_0[t.type] : e === "textarea";
  }
  function pf(t, e, n, a) {
    Ga ? (Va ? Va.push(a) : (Va = [a])) : (Ga = a),
      (e = Xu(e, "onChange")),
      0 < e.length &&
        ((n = new Pi("onChange", "change", null, n, a)),
        t.push({ event: n, listeners: e }));
  }
  var ql = null,
    Yl = null;
  function T0(t) {
    Im(t, 0);
  }
  function eu(t) {
    var e = Nl(t);
    if (Fc(e)) return t;
  }
  function gf(t, e) {
    if (t === "change") return e;
  }
  var vf = !1;
  if (pn) {
    var $r;
    if (pn) {
      var Fr = "oninput" in document;
      if (!Fr) {
        var bf = document.createElement("div");
        bf.setAttribute("oninput", "return;"),
          (Fr = typeof bf.oninput == "function");
      }
      $r = Fr;
    } else $r = !1;
    vf = $r && (!document.documentMode || 9 < document.documentMode);
  }
  function Sf() {
    ql && (ql.detachEvent("onpropertychange", xf), (Yl = ql = null));
  }
  function xf(t) {
    if (t.propertyName === "value" && eu(Yl)) {
      var e = [];
      pf(e, Yl, t, Yr(t)), af(T0, e);
    }
  }
  function A0(t, e, n) {
    t === "focusin"
      ? (Sf(), (ql = e), (Yl = n), ql.attachEvent("onpropertychange", xf))
      : t === "focusout" && Sf();
  }
  function R0(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return eu(Yl);
  }
  function O0(t, e) {
    if (t === "click") return eu(e);
  }
  function j0(t, e) {
    if (t === "input" || t === "change") return eu(e);
  }
  function C0(t, e) {
    return (t === e && (t !== 0 || 1 / t === 1 / e)) || (t !== t && e !== e);
  }
  var De = typeof Object.is == "function" ? Object.is : C0;
  function Gl(t, e) {
    if (De(t, e)) return !0;
    if (
      typeof t != "object" ||
      t === null ||
      typeof e != "object" ||
      e === null
    )
      return !1;
    var n = Object.keys(t),
      a = Object.keys(e);
    if (n.length !== a.length) return !1;
    for (a = 0; a < n.length; a++) {
      var i = n[a];
      if (!Bt.call(e, i) || !De(t[i], e[i])) return !1;
    }
    return !0;
  }
  function Ef(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function _f(t, e) {
    var n = Ef(t);
    t = 0;
    for (var a; n; ) {
      if (n.nodeType === 3) {
        if (((a = t + n.textContent.length), t <= e && a >= e))
          return { node: n, offset: e - t };
        t = a;
      }
      t: {
        for (; n; ) {
          if (n.nextSibling) {
            n = n.nextSibling;
            break t;
          }
          n = n.parentNode;
        }
        n = void 0;
      }
      n = Ef(n);
    }
  }
  function Tf(t, e) {
    return t && e
      ? t === e
        ? !0
        : t && t.nodeType === 3
        ? !1
        : e && e.nodeType === 3
        ? Tf(t, e.parentNode)
        : "contains" in t
        ? t.contains(e)
        : t.compareDocumentPosition
        ? !!(t.compareDocumentPosition(e) & 16)
        : !1
      : !1;
  }
  function Af(t) {
    t =
      t != null &&
      t.ownerDocument != null &&
      t.ownerDocument.defaultView != null
        ? t.ownerDocument.defaultView
        : window;
    for (var e = Ji(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var n = typeof e.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) t = e.contentWindow;
      else break;
      e = Ji(t.document);
    }
    return e;
  }
  function Wr(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return (
      e &&
      ((e === "input" &&
        (t.type === "text" ||
          t.type === "search" ||
          t.type === "tel" ||
          t.type === "url" ||
          t.type === "password")) ||
        e === "textarea" ||
        t.contentEditable === "true")
    );
  }
  var w0 = pn && "documentMode" in document && 11 >= document.documentMode,
    Qa = null,
    Ir = null,
    Vl = null,
    Pr = !1;
  function Rf(t, e, n) {
    var a =
      n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Pr ||
      Qa == null ||
      Qa !== Ji(a) ||
      ((a = Qa),
      "selectionStart" in a && Wr(a)
        ? (a = { start: a.selectionStart, end: a.selectionEnd })
        : ((a = (
            (a.ownerDocument && a.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (a = {
            anchorNode: a.anchorNode,
            anchorOffset: a.anchorOffset,
            focusNode: a.focusNode,
            focusOffset: a.focusOffset,
          })),
      (Vl && Gl(Vl, a)) ||
        ((Vl = a),
        (a = Xu(Ir, "onSelect")),
        0 < a.length &&
          ((e = new Pi("onSelect", "select", null, e, n)),
          t.push({ event: e, listeners: a }),
          (e.target = Qa))));
  }
  function ha(t, e) {
    var n = {};
    return (
      (n[t.toLowerCase()] = e.toLowerCase()),
      (n["Webkit" + t] = "webkit" + e),
      (n["Moz" + t] = "moz" + e),
      n
    );
  }
  var Za = {
      animationend: ha("Animation", "AnimationEnd"),
      animationiteration: ha("Animation", "AnimationIteration"),
      animationstart: ha("Animation", "AnimationStart"),
      transitionrun: ha("Transition", "TransitionRun"),
      transitionstart: ha("Transition", "TransitionStart"),
      transitioncancel: ha("Transition", "TransitionCancel"),
      transitionend: ha("Transition", "TransitionEnd"),
    },
    ts = {},
    Of = {};
  pn &&
    ((Of = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete Za.animationend.animation,
      delete Za.animationiteration.animation,
      delete Za.animationstart.animation),
    "TransitionEvent" in window || delete Za.transitionend.transition);
  function ya(t) {
    if (ts[t]) return ts[t];
    if (!Za[t]) return t;
    var e = Za[t],
      n;
    for (n in e) if (e.hasOwnProperty(n) && n in Of) return (ts[t] = e[n]);
    return t;
  }
  var jf = ya("animationend"),
    Cf = ya("animationiteration"),
    wf = ya("animationstart"),
    D0 = ya("transitionrun"),
    z0 = ya("transitionstart"),
    N0 = ya("transitioncancel"),
    Df = ya("transitionend"),
    zf = new Map(),
    es =
      "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " "
      );
  es.push("scrollEnd");
  function $e(t, e) {
    zf.set(t, e), da(e, [t]);
  }
  var nu =
      typeof reportError == "function"
        ? reportError
        : function (t) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var e = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof t == "object" &&
                  t !== null &&
                  typeof t.message == "string"
                    ? String(t.message)
                    : String(t),
                error: t,
              });
              if (!window.dispatchEvent(e)) return;
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", t);
              return;
            }
            console.error(t);
          },
    Ye = [],
    ka = 0,
    ns = 0;
  function au() {
    for (var t = ka, e = (ns = ka = 0); e < t; ) {
      var n = Ye[e];
      Ye[e++] = null;
      var a = Ye[e];
      Ye[e++] = null;
      var i = Ye[e];
      Ye[e++] = null;
      var r = Ye[e];
      if (((Ye[e++] = null), a !== null && i !== null)) {
        var f = a.pending;
        f === null ? (i.next = i) : ((i.next = f.next), (f.next = i)),
          (a.pending = i);
      }
      r !== 0 && Nf(n, i, r);
    }
  }
  function lu(t, e, n, a) {
    (Ye[ka++] = t),
      (Ye[ka++] = e),
      (Ye[ka++] = n),
      (Ye[ka++] = a),
      (ns |= a),
      (t.lanes |= a),
      (t = t.alternate),
      t !== null && (t.lanes |= a);
  }
  function as(t, e, n, a) {
    return lu(t, e, n, a), iu(t);
  }
  function pa(t, e) {
    return lu(t, null, null, e), iu(t);
  }
  function Nf(t, e, n) {
    t.lanes |= n;
    var a = t.alternate;
    a !== null && (a.lanes |= n);
    for (var i = !1, r = t.return; r !== null; )
      (r.childLanes |= n),
        (a = r.alternate),
        a !== null && (a.childLanes |= n),
        r.tag === 22 &&
          ((t = r.stateNode), t === null || t._visibility & 1 || (i = !0)),
        (t = r),
        (r = r.return);
    return t.tag === 3
      ? ((r = t.stateNode),
        i &&
          e !== null &&
          ((i = 31 - we(n)),
          (t = r.hiddenUpdates),
          (a = t[i]),
          a === null ? (t[i] = [e]) : a.push(e),
          (e.lane = n | 536870912)),
        r)
      : null;
  }
  function iu(t) {
    if (50 < ci) throw ((ci = 0), (mo = null), Error(o(185)));
    for (var e = t.return; e !== null; ) (t = e), (e = t.return);
    return t.tag === 3 ? t.stateNode : null;
  }
  var Ka = {};
  function M0(t, e, n, a) {
    (this.tag = t),
      (this.key = n),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = e),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = a),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null);
  }
  function ze(t, e, n, a) {
    return new M0(t, e, n, a);
  }
  function ls(t) {
    return (t = t.prototype), !(!t || !t.isReactComponent);
  }
  function gn(t, e) {
    var n = t.alternate;
    return (
      n === null
        ? ((n = ze(t.tag, e, t.key, t.mode)),
          (n.elementType = t.elementType),
          (n.type = t.type),
          (n.stateNode = t.stateNode),
          (n.alternate = t),
          (t.alternate = n))
        : ((n.pendingProps = e),
          (n.type = t.type),
          (n.flags = 0),
          (n.subtreeFlags = 0),
          (n.deletions = null)),
      (n.flags = t.flags & 65011712),
      (n.childLanes = t.childLanes),
      (n.lanes = t.lanes),
      (n.child = t.child),
      (n.memoizedProps = t.memoizedProps),
      (n.memoizedState = t.memoizedState),
      (n.updateQueue = t.updateQueue),
      (e = t.dependencies),
      (n.dependencies =
        e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }),
      (n.sibling = t.sibling),
      (n.index = t.index),
      (n.ref = t.ref),
      (n.refCleanup = t.refCleanup),
      n
    );
  }
  function Mf(t, e) {
    t.flags &= 65011714;
    var n = t.alternate;
    return (
      n === null
        ? ((t.childLanes = 0),
          (t.lanes = e),
          (t.child = null),
          (t.subtreeFlags = 0),
          (t.memoizedProps = null),
          (t.memoizedState = null),
          (t.updateQueue = null),
          (t.dependencies = null),
          (t.stateNode = null))
        : ((t.childLanes = n.childLanes),
          (t.lanes = n.lanes),
          (t.child = n.child),
          (t.subtreeFlags = 0),
          (t.deletions = null),
          (t.memoizedProps = n.memoizedProps),
          (t.memoizedState = n.memoizedState),
          (t.updateQueue = n.updateQueue),
          (t.type = n.type),
          (e = n.dependencies),
          (t.dependencies =
            e === null
              ? null
              : { lanes: e.lanes, firstContext: e.firstContext })),
      t
    );
  }
  function uu(t, e, n, a, i, r) {
    var f = 0;
    if (((a = t), typeof t == "function")) ls(t) && (f = 1);
    else if (typeof t == "string")
      f = qg(t, n, I.current)
        ? 26
        : t === "html" || t === "head" || t === "body"
        ? 27
        : 5;
    else
      t: switch (t) {
        case W:
          return (t = ze(31, n, e, i)), (t.elementType = W), (t.lanes = r), t;
        case D:
          return ga(n.children, i, r, e);
        case O:
          (f = 8), (i |= 24);
          break;
        case B:
          return (
            (t = ze(12, n, e, i | 2)), (t.elementType = B), (t.lanes = r), t
          );
        case K:
          return (t = ze(13, n, e, i)), (t.elementType = K), (t.lanes = r), t;
        case nt:
          return (t = ze(19, n, e, i)), (t.elementType = nt), (t.lanes = r), t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case k:
                f = 10;
                break t;
              case N:
                f = 9;
                break t;
              case G:
                f = 11;
                break t;
              case q:
                f = 14;
                break t;
              case P:
                (f = 16), (a = null);
                break t;
            }
          (f = 29),
            (n = Error(o(130, t === null ? "null" : typeof t, ""))),
            (a = null);
      }
    return (
      (e = ze(f, n, e, i)), (e.elementType = t), (e.type = a), (e.lanes = r), e
    );
  }
  function ga(t, e, n, a) {
    return (t = ze(7, t, a, e)), (t.lanes = n), t;
  }
  function is(t, e, n) {
    return (t = ze(6, t, null, e)), (t.lanes = n), t;
  }
  function Uf(t) {
    var e = ze(18, null, null, 0);
    return (e.stateNode = t), e;
  }
  function us(t, e, n) {
    return (
      (e = ze(4, t.children !== null ? t.children : [], t.key, e)),
      (e.lanes = n),
      (e.stateNode = {
        containerInfo: t.containerInfo,
        pendingChildren: null,
        implementation: t.implementation,
      }),
      e
    );
  }
  var Bf = new WeakMap();
  function Ge(t, e) {
    if (typeof t == "object" && t !== null) {
      var n = Bf.get(t);
      return n !== void 0
        ? n
        : ((e = { value: t, source: e, stack: Xt(e) }), Bf.set(t, e), e);
    }
    return { value: t, source: e, stack: Xt(e) };
  }
  var Ja = [],
    $a = 0,
    ru = null,
    Xl = 0,
    Ve = [],
    Xe = 0,
    Vn = null,
    ln = 1,
    un = "";
  function vn(t, e) {
    (Ja[$a++] = Xl), (Ja[$a++] = ru), (ru = t), (Xl = e);
  }
  function Lf(t, e, n) {
    (Ve[Xe++] = ln), (Ve[Xe++] = un), (Ve[Xe++] = Vn), (Vn = t);
    var a = ln;
    t = un;
    var i = 32 - we(a) - 1;
    (a &= ~(1 << i)), (n += 1);
    var r = 32 - we(e) + i;
    if (30 < r) {
      var f = i - (i % 5);
      (r = (a & ((1 << f) - 1)).toString(32)),
        (a >>= f),
        (i -= f),
        (ln = (1 << (32 - we(e) + i)) | (n << i) | a),
        (un = r + t);
    } else (ln = (1 << r) | (n << i) | a), (un = t);
  }
  function rs(t) {
    t.return !== null && (vn(t, 1), Lf(t, 1, 0));
  }
  function ss(t) {
    for (; t === ru; )
      (ru = Ja[--$a]), (Ja[$a] = null), (Xl = Ja[--$a]), (Ja[$a] = null);
    for (; t === Vn; )
      (Vn = Ve[--Xe]),
        (Ve[Xe] = null),
        (un = Ve[--Xe]),
        (Ve[Xe] = null),
        (ln = Ve[--Xe]),
        (Ve[Xe] = null);
  }
  function Hf(t, e) {
    (Ve[Xe++] = ln),
      (Ve[Xe++] = un),
      (Ve[Xe++] = Vn),
      (ln = e.id),
      (un = e.overflow),
      (Vn = t);
  }
  var fe = null,
    Lt = null,
    _t = !1,
    Xn = null,
    Qe = !1,
    os = Error(o(519));
  function Qn(t) {
    var e = Error(
      o(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1]
          ? "text"
          : "HTML",
        ""
      )
    );
    throw (Ql(Ge(e, t)), os);
  }
  function qf(t) {
    var e = t.stateNode,
      n = t.type,
      a = t.memoizedProps;
    switch (((e[ce] = t), (e[Se] = a), n)) {
      case "dialog":
        St("cancel", e), St("close", e);
        break;
      case "iframe":
      case "object":
      case "embed":
        St("load", e);
        break;
      case "video":
      case "audio":
        for (n = 0; n < di.length; n++) St(di[n], e);
        break;
      case "source":
        St("error", e);
        break;
      case "img":
      case "image":
      case "link":
        St("error", e), St("load", e);
        break;
      case "details":
        St("toggle", e);
        break;
      case "input":
        St("invalid", e),
          Wc(
            e,
            a.value,
            a.defaultValue,
            a.checked,
            a.defaultChecked,
            a.type,
            a.name,
            !0
          );
        break;
      case "select":
        St("invalid", e);
        break;
      case "textarea":
        St("invalid", e), Pc(e, a.value, a.defaultValue, a.children);
    }
    (n = a.children),
      (typeof n != "string" && typeof n != "number" && typeof n != "bigint") ||
      e.textContent === "" + n ||
      a.suppressHydrationWarning === !0 ||
      nh(e.textContent, n)
        ? (a.popover != null && (St("beforetoggle", e), St("toggle", e)),
          a.onScroll != null && St("scroll", e),
          a.onScrollEnd != null && St("scrollend", e),
          a.onClick != null && (e.onclick = yn),
          (e = !0))
        : (e = !1),
      e || Qn(t, !0);
  }
  function Yf(t) {
    for (fe = t.return; fe; )
      switch (fe.tag) {
        case 5:
        case 31:
        case 13:
          Qe = !1;
          return;
        case 27:
        case 3:
          Qe = !0;
          return;
        default:
          fe = fe.return;
      }
  }
  function Fa(t) {
    if (t !== fe) return !1;
    if (!_t) return Yf(t), (_t = !0), !1;
    var e = t.tag,
      n;
    if (
      ((n = e !== 3 && e !== 27) &&
        ((n = e === 5) &&
          ((n = t.type),
          (n =
            !(n !== "form" && n !== "button") || jo(t.type, t.memoizedProps))),
        (n = !n)),
      n && Lt && Qn(t),
      Yf(t),
      e === 13)
    ) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t))
        throw Error(o(317));
      Lt = fh(t);
    } else if (e === 31) {
      if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t))
        throw Error(o(317));
      Lt = fh(t);
    } else
      e === 27
        ? ((e = Lt), la(t.type) ? ((t = No), (No = null), (Lt = t)) : (Lt = e))
        : (Lt = fe ? ke(t.stateNode.nextSibling) : null);
    return !0;
  }
  function va() {
    (Lt = fe = null), (_t = !1);
  }
  function cs() {
    var t = Xn;
    return (
      t !== null &&
        (Ae === null ? (Ae = t) : Ae.push.apply(Ae, t), (Xn = null)),
      t
    );
  }
  function Ql(t) {
    Xn === null ? (Xn = [t]) : Xn.push(t);
  }
  var fs = _(null),
    ba = null,
    bn = null;
  function Zn(t, e, n) {
    F(fs, e._currentValue), (e._currentValue = n);
  }
  function Sn(t) {
    (t._currentValue = fs.current), Y(fs);
  }
  function ds(t, e, n) {
    for (; t !== null; ) {
      var a = t.alternate;
      if (
        ((t.childLanes & e) !== e
          ? ((t.childLanes |= e), a !== null && (a.childLanes |= e))
          : a !== null && (a.childLanes & e) !== e && (a.childLanes |= e),
        t === n)
      )
        break;
      t = t.return;
    }
  }
  function ms(t, e, n, a) {
    var i = t.child;
    for (i !== null && (i.return = t); i !== null; ) {
      var r = i.dependencies;
      if (r !== null) {
        var f = i.child;
        r = r.firstContext;
        t: for (; r !== null; ) {
          var p = r;
          r = i;
          for (var x = 0; x < e.length; x++)
            if (p.context === e[x]) {
              (r.lanes |= n),
                (p = r.alternate),
                p !== null && (p.lanes |= n),
                ds(r.return, n, t),
                a || (f = null);
              break t;
            }
          r = p.next;
        }
      } else if (i.tag === 18) {
        if (((f = i.return), f === null)) throw Error(o(341));
        (f.lanes |= n),
          (r = f.alternate),
          r !== null && (r.lanes |= n),
          ds(f, n, t),
          (f = null);
      } else f = i.child;
      if (f !== null) f.return = i;
      else
        for (f = i; f !== null; ) {
          if (f === t) {
            f = null;
            break;
          }
          if (((i = f.sibling), i !== null)) {
            (i.return = f.return), (f = i);
            break;
          }
          f = f.return;
        }
      i = f;
    }
  }
  function Wa(t, e, n, a) {
    t = null;
    for (var i = e, r = !1; i !== null; ) {
      if (!r) {
        if ((i.flags & 524288) !== 0) r = !0;
        else if ((i.flags & 262144) !== 0) break;
      }
      if (i.tag === 10) {
        var f = i.alternate;
        if (f === null) throw Error(o(387));
        if (((f = f.memoizedProps), f !== null)) {
          var p = i.type;
          De(i.pendingProps.value, f.value) ||
            (t !== null ? t.push(p) : (t = [p]));
        }
      } else if (i === vt.current) {
        if (((f = i.alternate), f === null)) throw Error(o(387));
        f.memoizedState.memoizedState !== i.memoizedState.memoizedState &&
          (t !== null ? t.push(gi) : (t = [gi]));
      }
      i = i.return;
    }
    t !== null && ms(e, t, n, a), (e.flags |= 262144);
  }
  function su(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!De(t.context._currentValue, t.memoizedValue)) return !0;
      t = t.next;
    }
    return !1;
  }
  function Sa(t) {
    (ba = t),
      (bn = null),
      (t = t.dependencies),
      t !== null && (t.firstContext = null);
  }
  function de(t) {
    return Gf(ba, t);
  }
  function ou(t, e) {
    return ba === null && Sa(t), Gf(t, e);
  }
  function Gf(t, e) {
    var n = e._currentValue;
    if (((e = { context: e, memoizedValue: n, next: null }), bn === null)) {
      if (t === null) throw Error(o(308));
      (bn = e),
        (t.dependencies = { lanes: 0, firstContext: e }),
        (t.flags |= 524288);
    } else bn = bn.next = e;
    return n;
  }
  var U0 =
      typeof AbortController < "u"
        ? AbortController
        : function () {
            var t = [],
              e = (this.signal = {
                aborted: !1,
                addEventListener: function (n, a) {
                  t.push(a);
                },
              });
            this.abort = function () {
              (e.aborted = !0),
                t.forEach(function (n) {
                  return n();
                });
            };
          },
    B0 = l.unstable_scheduleCallback,
    L0 = l.unstable_NormalPriority,
    Wt = {
      $$typeof: k,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function hs() {
    return { controller: new U0(), data: new Map(), refCount: 0 };
  }
  function Zl(t) {
    t.refCount--,
      t.refCount === 0 &&
        B0(L0, function () {
          t.controller.abort();
        });
  }
  var kl = null,
    ys = 0,
    Ia = 0,
    Pa = null;
  function H0(t, e) {
    if (kl === null) {
      var n = (kl = []);
      (ys = 0),
        (Ia = bo()),
        (Pa = {
          status: "pending",
          value: void 0,
          then: function (a) {
            n.push(a);
          },
        });
    }
    return ys++, e.then(Vf, Vf), e;
  }
  function Vf() {
    if (--ys === 0 && kl !== null) {
      Pa !== null && (Pa.status = "fulfilled");
      var t = kl;
      (kl = null), (Ia = 0), (Pa = null);
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
  }
  function q0(t, e) {
    var n = [],
      a = {
        status: "pending",
        value: null,
        reason: null,
        then: function (i) {
          n.push(i);
        },
      };
    return (
      t.then(
        function () {
          (a.status = "fulfilled"), (a.value = e);
          for (var i = 0; i < n.length; i++) (0, n[i])(e);
        },
        function (i) {
          for (a.status = "rejected", a.reason = i, i = 0; i < n.length; i++)
            (0, n[i])(void 0);
        }
      ),
      a
    );
  }
  var Xf = R.S;
  R.S = function (t, e) {
    (Rm = Qt()),
      typeof e == "object" &&
        e !== null &&
        typeof e.then == "function" &&
        H0(t, e),
      Xf !== null && Xf(t, e);
  };
  var xa = _(null);
  function ps() {
    var t = xa.current;
    return t !== null ? t : Mt.pooledCache;
  }
  function cu(t, e) {
    e === null ? F(xa, xa.current) : F(xa, e.pool);
  }
  function Qf() {
    var t = ps();
    return t === null ? null : { parent: Wt._currentValue, pool: t };
  }
  var tl = Error(o(460)),
    gs = Error(o(474)),
    fu = Error(o(542)),
    du = { then: function () {} };
  function Zf(t) {
    return (t = t.status), t === "fulfilled" || t === "rejected";
  }
  function kf(t, e, n) {
    switch (
      ((n = t[n]),
      n === void 0 ? t.push(e) : n !== e && (e.then(yn, yn), (e = n)),
      e.status)
    ) {
      case "fulfilled":
        return e.value;
      case "rejected":
        throw ((t = e.reason), Jf(t), t);
      default:
        if (typeof e.status == "string") e.then(yn, yn);
        else {
          if (((t = Mt), t !== null && 100 < t.shellSuspendCounter))
            throw Error(o(482));
          (t = e),
            (t.status = "pending"),
            t.then(
              function (a) {
                if (e.status === "pending") {
                  var i = e;
                  (i.status = "fulfilled"), (i.value = a);
                }
              },
              function (a) {
                if (e.status === "pending") {
                  var i = e;
                  (i.status = "rejected"), (i.reason = a);
                }
              }
            );
        }
        switch (e.status) {
          case "fulfilled":
            return e.value;
          case "rejected":
            throw ((t = e.reason), Jf(t), t);
        }
        throw ((_a = e), tl);
    }
  }
  function Ea(t) {
    try {
      var e = t._init;
      return e(t._payload);
    } catch (n) {
      throw n !== null && typeof n == "object" && typeof n.then == "function"
        ? ((_a = n), tl)
        : n;
    }
  }
  var _a = null;
  function Kf() {
    if (_a === null) throw Error(o(459));
    var t = _a;
    return (_a = null), t;
  }
  function Jf(t) {
    if (t === tl || t === fu) throw Error(o(483));
  }
  var el = null,
    Kl = 0;
  function mu(t) {
    var e = Kl;
    return (Kl += 1), el === null && (el = []), kf(el, t, e);
  }
  function Jl(t, e) {
    (e = e.props.ref), (t.ref = e !== void 0 ? e : null);
  }
  function hu(t, e) {
    throw e.$$typeof === C
      ? Error(o(525))
      : ((t = Object.prototype.toString.call(e)),
        Error(
          o(
            31,
            t === "[object Object]"
              ? "object with keys {" + Object.keys(e).join(", ") + "}"
              : t
          )
        ));
  }
  function $f(t) {
    function e(j, A) {
      if (t) {
        var w = j.deletions;
        w === null ? ((j.deletions = [A]), (j.flags |= 16)) : w.push(A);
      }
    }
    function n(j, A) {
      if (!t) return null;
      for (; A !== null; ) e(j, A), (A = A.sibling);
      return null;
    }
    function a(j) {
      for (var A = new Map(); j !== null; )
        j.key !== null ? A.set(j.key, j) : A.set(j.index, j), (j = j.sibling);
      return A;
    }
    function i(j, A) {
      return (j = gn(j, A)), (j.index = 0), (j.sibling = null), j;
    }
    function r(j, A, w) {
      return (
        (j.index = w),
        t
          ? ((w = j.alternate),
            w !== null
              ? ((w = w.index), w < A ? ((j.flags |= 67108866), A) : w)
              : ((j.flags |= 67108866), A))
          : ((j.flags |= 1048576), A)
      );
    }
    function f(j) {
      return t && j.alternate === null && (j.flags |= 67108866), j;
    }
    function p(j, A, w, X) {
      return A === null || A.tag !== 6
        ? ((A = is(w, j.mode, X)), (A.return = j), A)
        : ((A = i(A, w)), (A.return = j), A);
    }
    function x(j, A, w, X) {
      var it = w.type;
      return it === D
        ? V(j, A, w.props.children, X, w.key)
        : A !== null &&
          (A.elementType === it ||
            (typeof it == "object" &&
              it !== null &&
              it.$$typeof === P &&
              Ea(it) === A.type))
        ? ((A = i(A, w.props)), Jl(A, w), (A.return = j), A)
        : ((A = uu(w.type, w.key, w.props, null, j.mode, X)),
          Jl(A, w),
          (A.return = j),
          A);
    }
    function z(j, A, w, X) {
      return A === null ||
        A.tag !== 4 ||
        A.stateNode.containerInfo !== w.containerInfo ||
        A.stateNode.implementation !== w.implementation
        ? ((A = us(w, j.mode, X)), (A.return = j), A)
        : ((A = i(A, w.children || [])), (A.return = j), A);
    }
    function V(j, A, w, X, it) {
      return A === null || A.tag !== 7
        ? ((A = ga(w, j.mode, X, it)), (A.return = j), A)
        : ((A = i(A, w)), (A.return = j), A);
    }
    function Q(j, A, w) {
      if (
        (typeof A == "string" && A !== "") ||
        typeof A == "number" ||
        typeof A == "bigint"
      )
        return (A = is("" + A, j.mode, w)), (A.return = j), A;
      if (typeof A == "object" && A !== null) {
        switch (A.$$typeof) {
          case U:
            return (
              (w = uu(A.type, A.key, A.props, null, j.mode, w)),
              Jl(w, A),
              (w.return = j),
              w
            );
          case T:
            return (A = us(A, j.mode, w)), (A.return = j), A;
          case P:
            return (A = Ea(A)), Q(j, A, w);
        }
        if (tt(A) || gt(A))
          return (A = ga(A, j.mode, w, null)), (A.return = j), A;
        if (typeof A.then == "function") return Q(j, mu(A), w);
        if (A.$$typeof === k) return Q(j, ou(j, A), w);
        hu(j, A);
      }
      return null;
    }
    function M(j, A, w, X) {
      var it = A !== null ? A.key : null;
      if (
        (typeof w == "string" && w !== "") ||
        typeof w == "number" ||
        typeof w == "bigint"
      )
        return it !== null ? null : p(j, A, "" + w, X);
      if (typeof w == "object" && w !== null) {
        switch (w.$$typeof) {
          case U:
            return w.key === it ? x(j, A, w, X) : null;
          case T:
            return w.key === it ? z(j, A, w, X) : null;
          case P:
            return (w = Ea(w)), M(j, A, w, X);
        }
        if (tt(w) || gt(w)) return it !== null ? null : V(j, A, w, X, null);
        if (typeof w.then == "function") return M(j, A, mu(w), X);
        if (w.$$typeof === k) return M(j, A, ou(j, w), X);
        hu(j, w);
      }
      return null;
    }
    function H(j, A, w, X, it) {
      if (
        (typeof X == "string" && X !== "") ||
        typeof X == "number" ||
        typeof X == "bigint"
      )
        return (j = j.get(w) || null), p(A, j, "" + X, it);
      if (typeof X == "object" && X !== null) {
        switch (X.$$typeof) {
          case U:
            return (
              (j = j.get(X.key === null ? w : X.key) || null), x(A, j, X, it)
            );
          case T:
            return (
              (j = j.get(X.key === null ? w : X.key) || null), z(A, j, X, it)
            );
          case P:
            return (X = Ea(X)), H(j, A, w, X, it);
        }
        if (tt(X) || gt(X)) return (j = j.get(w) || null), V(A, j, X, it, null);
        if (typeof X.then == "function") return H(j, A, w, mu(X), it);
        if (X.$$typeof === k) return H(j, A, w, ou(A, X), it);
        hu(A, X);
      }
      return null;
    }
    function et(j, A, w, X) {
      for (
        var it = null, At = null, at = A, pt = (A = 0), Et = null;
        at !== null && pt < w.length;
        pt++
      ) {
        at.index > pt ? ((Et = at), (at = null)) : (Et = at.sibling);
        var Rt = M(j, at, w[pt], X);
        if (Rt === null) {
          at === null && (at = Et);
          break;
        }
        t && at && Rt.alternate === null && e(j, at),
          (A = r(Rt, A, pt)),
          At === null ? (it = Rt) : (At.sibling = Rt),
          (At = Rt),
          (at = Et);
      }
      if (pt === w.length) return n(j, at), _t && vn(j, pt), it;
      if (at === null) {
        for (; pt < w.length; pt++)
          (at = Q(j, w[pt], X)),
            at !== null &&
              ((A = r(at, A, pt)),
              At === null ? (it = at) : (At.sibling = at),
              (At = at));
        return _t && vn(j, pt), it;
      }
      for (at = a(at); pt < w.length; pt++)
        (Et = H(at, j, pt, w[pt], X)),
          Et !== null &&
            (t &&
              Et.alternate !== null &&
              at.delete(Et.key === null ? pt : Et.key),
            (A = r(Et, A, pt)),
            At === null ? (it = Et) : (At.sibling = Et),
            (At = Et));
      return (
        t &&
          at.forEach(function (oa) {
            return e(j, oa);
          }),
        _t && vn(j, pt),
        it
      );
    }
    function rt(j, A, w, X) {
      if (w == null) throw Error(o(151));
      for (
        var it = null,
          At = null,
          at = A,
          pt = (A = 0),
          Et = null,
          Rt = w.next();
        at !== null && !Rt.done;
        pt++, Rt = w.next()
      ) {
        at.index > pt ? ((Et = at), (at = null)) : (Et = at.sibling);
        var oa = M(j, at, Rt.value, X);
        if (oa === null) {
          at === null && (at = Et);
          break;
        }
        t && at && oa.alternate === null && e(j, at),
          (A = r(oa, A, pt)),
          At === null ? (it = oa) : (At.sibling = oa),
          (At = oa),
          (at = Et);
      }
      if (Rt.done) return n(j, at), _t && vn(j, pt), it;
      if (at === null) {
        for (; !Rt.done; pt++, Rt = w.next())
          (Rt = Q(j, Rt.value, X)),
            Rt !== null &&
              ((A = r(Rt, A, pt)),
              At === null ? (it = Rt) : (At.sibling = Rt),
              (At = Rt));
        return _t && vn(j, pt), it;
      }
      for (at = a(at); !Rt.done; pt++, Rt = w.next())
        (Rt = H(at, j, pt, Rt.value, X)),
          Rt !== null &&
            (t &&
              Rt.alternate !== null &&
              at.delete(Rt.key === null ? pt : Rt.key),
            (A = r(Rt, A, pt)),
            At === null ? (it = Rt) : (At.sibling = Rt),
            (At = Rt));
      return (
        t &&
          at.forEach(function (Fg) {
            return e(j, Fg);
          }),
        _t && vn(j, pt),
        it
      );
    }
    function Nt(j, A, w, X) {
      if (
        (typeof w == "object" &&
          w !== null &&
          w.type === D &&
          w.key === null &&
          (w = w.props.children),
        typeof w == "object" && w !== null)
      ) {
        switch (w.$$typeof) {
          case U:
            t: {
              for (var it = w.key; A !== null; ) {
                if (A.key === it) {
                  if (((it = w.type), it === D)) {
                    if (A.tag === 7) {
                      n(j, A.sibling),
                        (X = i(A, w.props.children)),
                        (X.return = j),
                        (j = X);
                      break t;
                    }
                  } else if (
                    A.elementType === it ||
                    (typeof it == "object" &&
                      it !== null &&
                      it.$$typeof === P &&
                      Ea(it) === A.type)
                  ) {
                    n(j, A.sibling),
                      (X = i(A, w.props)),
                      Jl(X, w),
                      (X.return = j),
                      (j = X);
                    break t;
                  }
                  n(j, A);
                  break;
                } else e(j, A);
                A = A.sibling;
              }
              w.type === D
                ? ((X = ga(w.props.children, j.mode, X, w.key)),
                  (X.return = j),
                  (j = X))
                : ((X = uu(w.type, w.key, w.props, null, j.mode, X)),
                  Jl(X, w),
                  (X.return = j),
                  (j = X));
            }
            return f(j);
          case T:
            t: {
              for (it = w.key; A !== null; ) {
                if (A.key === it)
                  if (
                    A.tag === 4 &&
                    A.stateNode.containerInfo === w.containerInfo &&
                    A.stateNode.implementation === w.implementation
                  ) {
                    n(j, A.sibling),
                      (X = i(A, w.children || [])),
                      (X.return = j),
                      (j = X);
                    break t;
                  } else {
                    n(j, A);
                    break;
                  }
                else e(j, A);
                A = A.sibling;
              }
              (X = us(w, j.mode, X)), (X.return = j), (j = X);
            }
            return f(j);
          case P:
            return (w = Ea(w)), Nt(j, A, w, X);
        }
        if (tt(w)) return et(j, A, w, X);
        if (gt(w)) {
          if (((it = gt(w)), typeof it != "function")) throw Error(o(150));
          return (w = it.call(w)), rt(j, A, w, X);
        }
        if (typeof w.then == "function") return Nt(j, A, mu(w), X);
        if (w.$$typeof === k) return Nt(j, A, ou(j, w), X);
        hu(j, w);
      }
      return (typeof w == "string" && w !== "") ||
        typeof w == "number" ||
        typeof w == "bigint"
        ? ((w = "" + w),
          A !== null && A.tag === 6
            ? (n(j, A.sibling), (X = i(A, w)), (X.return = j), (j = X))
            : (n(j, A), (X = is(w, j.mode, X)), (X.return = j), (j = X)),
          f(j))
        : n(j, A);
    }
    return function (j, A, w, X) {
      try {
        Kl = 0;
        var it = Nt(j, A, w, X);
        return (el = null), it;
      } catch (at) {
        if (at === tl || at === fu) throw at;
        var At = ze(29, at, null, j.mode);
        return (At.lanes = X), (At.return = j), At;
      } finally {
      }
    };
  }
  var Ta = $f(!0),
    Ff = $f(!1),
    kn = !1;
  function vs(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function bs(t, e) {
    (t = t.updateQueue),
      e.updateQueue === t &&
        (e.updateQueue = {
          baseState: t.baseState,
          firstBaseUpdate: t.firstBaseUpdate,
          lastBaseUpdate: t.lastBaseUpdate,
          shared: t.shared,
          callbacks: null,
        });
  }
  function Kn(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function Jn(t, e, n) {
    var a = t.updateQueue;
    if (a === null) return null;
    if (((a = a.shared), (Ot & 2) !== 0)) {
      var i = a.pending;
      return (
        i === null ? (e.next = e) : ((e.next = i.next), (i.next = e)),
        (a.pending = e),
        (e = iu(t)),
        Nf(t, null, n),
        e
      );
    }
    return lu(t, a, e, n), iu(t);
  }
  function $l(t, e, n) {
    if (
      ((e = e.updateQueue), e !== null && ((e = e.shared), (n & 4194048) !== 0))
    ) {
      var a = e.lanes;
      (a &= t.pendingLanes), (n |= a), (e.lanes = n), Yc(t, n);
    }
  }
  function Ss(t, e) {
    var n = t.updateQueue,
      a = t.alternate;
    if (a !== null && ((a = a.updateQueue), n === a)) {
      var i = null,
        r = null;
      if (((n = n.firstBaseUpdate), n !== null)) {
        do {
          var f = {
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: null,
            next: null,
          };
          r === null ? (i = r = f) : (r = r.next = f), (n = n.next);
        } while (n !== null);
        r === null ? (i = r = e) : (r = r.next = e);
      } else i = r = e;
      (n = {
        baseState: a.baseState,
        firstBaseUpdate: i,
        lastBaseUpdate: r,
        shared: a.shared,
        callbacks: a.callbacks,
      }),
        (t.updateQueue = n);
      return;
    }
    (t = n.lastBaseUpdate),
      t === null ? (n.firstBaseUpdate = e) : (t.next = e),
      (n.lastBaseUpdate = e);
  }
  var xs = !1;
  function Fl() {
    if (xs) {
      var t = Pa;
      if (t !== null) throw t;
    }
  }
  function Wl(t, e, n, a) {
    xs = !1;
    var i = t.updateQueue;
    kn = !1;
    var r = i.firstBaseUpdate,
      f = i.lastBaseUpdate,
      p = i.shared.pending;
    if (p !== null) {
      i.shared.pending = null;
      var x = p,
        z = x.next;
      (x.next = null), f === null ? (r = z) : (f.next = z), (f = x);
      var V = t.alternate;
      V !== null &&
        ((V = V.updateQueue),
        (p = V.lastBaseUpdate),
        p !== f &&
          (p === null ? (V.firstBaseUpdate = z) : (p.next = z),
          (V.lastBaseUpdate = x)));
    }
    if (r !== null) {
      var Q = i.baseState;
      (f = 0), (V = z = x = null), (p = r);
      do {
        var M = p.lane & -536870913,
          H = M !== p.lane;
        if (H ? (xt & M) === M : (a & M) === M) {
          M !== 0 && M === Ia && (xs = !0),
            V !== null &&
              (V = V.next =
                {
                  lane: 0,
                  tag: p.tag,
                  payload: p.payload,
                  callback: null,
                  next: null,
                });
          t: {
            var et = t,
              rt = p;
            M = e;
            var Nt = n;
            switch (rt.tag) {
              case 1:
                if (((et = rt.payload), typeof et == "function")) {
                  Q = et.call(Nt, Q, M);
                  break t;
                }
                Q = et;
                break t;
              case 3:
                et.flags = (et.flags & -65537) | 128;
              case 0:
                if (
                  ((et = rt.payload),
                  (M = typeof et == "function" ? et.call(Nt, Q, M) : et),
                  M == null)
                )
                  break t;
                Q = S({}, Q, M);
                break t;
              case 2:
                kn = !0;
            }
          }
          (M = p.callback),
            M !== null &&
              ((t.flags |= 64),
              H && (t.flags |= 8192),
              (H = i.callbacks),
              H === null ? (i.callbacks = [M]) : H.push(M));
        } else
          (H = {
            lane: M,
            tag: p.tag,
            payload: p.payload,
            callback: p.callback,
            next: null,
          }),
            V === null ? ((z = V = H), (x = Q)) : (V = V.next = H),
            (f |= M);
        if (((p = p.next), p === null)) {
          if (((p = i.shared.pending), p === null)) break;
          (H = p),
            (p = H.next),
            (H.next = null),
            (i.lastBaseUpdate = H),
            (i.shared.pending = null);
        }
      } while (!0);
      V === null && (x = Q),
        (i.baseState = x),
        (i.firstBaseUpdate = z),
        (i.lastBaseUpdate = V),
        r === null && (i.shared.lanes = 0),
        (Pn |= f),
        (t.lanes = f),
        (t.memoizedState = Q);
    }
  }
  function Wf(t, e) {
    if (typeof t != "function") throw Error(o(191, t));
    t.call(e);
  }
  function If(t, e) {
    var n = t.callbacks;
    if (n !== null)
      for (t.callbacks = null, t = 0; t < n.length; t++) Wf(n[t], e);
  }
  var nl = _(null),
    yu = _(0);
  function Pf(t, e) {
    (t = Cn), F(yu, t), F(nl, e), (Cn = t | e.baseLanes);
  }
  function Es() {
    F(yu, Cn), F(nl, nl.current);
  }
  function _s() {
    (Cn = yu.current), Y(nl), Y(yu);
  }
  var Ne = _(null),
    Ze = null;
  function $n(t) {
    var e = t.alternate;
    F(Jt, Jt.current & 1),
      F(Ne, t),
      Ze === null &&
        (e === null || nl.current !== null || e.memoizedState !== null) &&
        (Ze = t);
  }
  function Ts(t) {
    F(Jt, Jt.current), F(Ne, t), Ze === null && (Ze = t);
  }
  function td(t) {
    t.tag === 22
      ? (F(Jt, Jt.current), F(Ne, t), Ze === null && (Ze = t))
      : Fn();
  }
  function Fn() {
    F(Jt, Jt.current), F(Ne, Ne.current);
  }
  function Me(t) {
    Y(Ne), Ze === t && (Ze = null), Y(Jt);
  }
  var Jt = _(0);
  function pu(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var n = e.memoizedState;
        if (n !== null && ((n = n.dehydrated), n === null || Do(n) || zo(n)))
          return e;
      } else if (
        e.tag === 19 &&
        (e.memoizedProps.revealOrder === "forwards" ||
          e.memoizedProps.revealOrder === "backwards" ||
          e.memoizedProps.revealOrder === "unstable_legacy-backwards" ||
          e.memoizedProps.revealOrder === "together")
      ) {
        if ((e.flags & 128) !== 0) return e;
      } else if (e.child !== null) {
        (e.child.return = e), (e = e.child);
        continue;
      }
      if (e === t) break;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) return null;
        e = e.return;
      }
      (e.sibling.return = e.return), (e = e.sibling);
    }
    return null;
  }
  var xn = 0,
    mt = null,
    Dt = null,
    It = null,
    gu = !1,
    al = !1,
    Aa = !1,
    vu = 0,
    Il = 0,
    ll = null,
    Y0 = 0;
  function kt() {
    throw Error(o(321));
  }
  function As(t, e) {
    if (e === null) return !1;
    for (var n = 0; n < e.length && n < t.length; n++)
      if (!De(t[n], e[n])) return !1;
    return !0;
  }
  function Rs(t, e, n, a, i, r) {
    return (
      (xn = r),
      (mt = e),
      (e.memoizedState = null),
      (e.updateQueue = null),
      (e.lanes = 0),
      (R.H = t === null || t.memoizedState === null ? Ld : Gs),
      (Aa = !1),
      (r = n(a, i)),
      (Aa = !1),
      al && (r = nd(e, n, a, i)),
      ed(t),
      r
    );
  }
  function ed(t) {
    R.H = ei;
    var e = Dt !== null && Dt.next !== null;
    if (((xn = 0), (It = Dt = mt = null), (gu = !1), (Il = 0), (ll = null), e))
      throw Error(o(300));
    t === null ||
      Pt ||
      ((t = t.dependencies), t !== null && su(t) && (Pt = !0));
  }
  function nd(t, e, n, a) {
    mt = t;
    var i = 0;
    do {
      if ((al && (ll = null), (Il = 0), (al = !1), 25 <= i))
        throw Error(o(301));
      if (((i += 1), (It = Dt = null), t.updateQueue != null)) {
        var r = t.updateQueue;
        (r.lastEffect = null),
          (r.events = null),
          (r.stores = null),
          r.memoCache != null && (r.memoCache.index = 0);
      }
      (R.H = Hd), (r = e(n, a));
    } while (al);
    return r;
  }
  function G0() {
    var t = R.H,
      e = t.useState()[0];
    return (
      (e = typeof e.then == "function" ? Pl(e) : e),
      (t = t.useState()[0]),
      (Dt !== null ? Dt.memoizedState : null) !== t && (mt.flags |= 1024),
      e
    );
  }
  function Os() {
    var t = vu !== 0;
    return (vu = 0), t;
  }
  function js(t, e, n) {
    (e.updateQueue = t.updateQueue), (e.flags &= -2053), (t.lanes &= ~n);
  }
  function Cs(t) {
    if (gu) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        e !== null && (e.pending = null), (t = t.next);
      }
      gu = !1;
    }
    (xn = 0), (It = Dt = mt = null), (al = !1), (Il = vu = 0), (ll = null);
  }
  function be() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return It === null ? (mt.memoizedState = It = t) : (It = It.next = t), It;
  }
  function $t() {
    if (Dt === null) {
      var t = mt.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Dt.next;
    var e = It === null ? mt.memoizedState : It.next;
    if (e !== null) (It = e), (Dt = t);
    else {
      if (t === null)
        throw mt.alternate === null ? Error(o(467)) : Error(o(310));
      (Dt = t),
        (t = {
          memoizedState: Dt.memoizedState,
          baseState: Dt.baseState,
          baseQueue: Dt.baseQueue,
          queue: Dt.queue,
          next: null,
        }),
        It === null ? (mt.memoizedState = It = t) : (It = It.next = t);
    }
    return It;
  }
  function bu() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Pl(t) {
    var e = Il;
    return (
      (Il += 1),
      ll === null && (ll = []),
      (t = kf(ll, t, e)),
      (e = mt),
      (It === null ? e.memoizedState : It.next) === null &&
        ((e = e.alternate),
        (R.H = e === null || e.memoizedState === null ? Ld : Gs)),
      t
    );
  }
  function Su(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return Pl(t);
      if (t.$$typeof === k) return de(t);
    }
    throw Error(o(438, String(t)));
  }
  function ws(t) {
    var e = null,
      n = mt.updateQueue;
    if ((n !== null && (e = n.memoCache), e == null)) {
      var a = mt.alternate;
      a !== null &&
        ((a = a.updateQueue),
        a !== null &&
          ((a = a.memoCache),
          a != null &&
            (e = {
              data: a.data.map(function (i) {
                return i.slice();
              }),
              index: 0,
            })));
    }
    if (
      (e == null && (e = { data: [], index: 0 }),
      n === null && ((n = bu()), (mt.updateQueue = n)),
      (n.memoCache = e),
      (n = e.data[e.index]),
      n === void 0)
    )
      for (n = e.data[e.index] = Array(t), a = 0; a < t; a++) n[a] = yt;
    return e.index++, n;
  }
  function En(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function xu(t) {
    var e = $t();
    return Ds(e, Dt, t);
  }
  function Ds(t, e, n) {
    var a = t.queue;
    if (a === null) throw Error(o(311));
    a.lastRenderedReducer = n;
    var i = t.baseQueue,
      r = a.pending;
    if (r !== null) {
      if (i !== null) {
        var f = i.next;
        (i.next = r.next), (r.next = f);
      }
      (e.baseQueue = i = r), (a.pending = null);
    }
    if (((r = t.baseState), i === null)) t.memoizedState = r;
    else {
      e = i.next;
      var p = (f = null),
        x = null,
        z = e,
        V = !1;
      do {
        var Q = z.lane & -536870913;
        if (Q !== z.lane ? (xt & Q) === Q : (xn & Q) === Q) {
          var M = z.revertLane;
          if (M === 0)
            x !== null &&
              (x = x.next =
                {
                  lane: 0,
                  revertLane: 0,
                  gesture: null,
                  action: z.action,
                  hasEagerState: z.hasEagerState,
                  eagerState: z.eagerState,
                  next: null,
                }),
              Q === Ia && (V = !0);
          else if ((xn & M) === M) {
            (z = z.next), M === Ia && (V = !0);
            continue;
          } else
            (Q = {
              lane: 0,
              revertLane: z.revertLane,
              gesture: null,
              action: z.action,
              hasEagerState: z.hasEagerState,
              eagerState: z.eagerState,
              next: null,
            }),
              x === null ? ((p = x = Q), (f = r)) : (x = x.next = Q),
              (mt.lanes |= M),
              (Pn |= M);
          (Q = z.action),
            Aa && n(r, Q),
            (r = z.hasEagerState ? z.eagerState : n(r, Q));
        } else
          (M = {
            lane: Q,
            revertLane: z.revertLane,
            gesture: z.gesture,
            action: z.action,
            hasEagerState: z.hasEagerState,
            eagerState: z.eagerState,
            next: null,
          }),
            x === null ? ((p = x = M), (f = r)) : (x = x.next = M),
            (mt.lanes |= Q),
            (Pn |= Q);
        z = z.next;
      } while (z !== null && z !== e);
      if (
        (x === null ? (f = r) : (x.next = p),
        !De(r, t.memoizedState) && ((Pt = !0), V && ((n = Pa), n !== null)))
      )
        throw n;
      (t.memoizedState = r),
        (t.baseState = f),
        (t.baseQueue = x),
        (a.lastRenderedState = r);
    }
    return i === null && (a.lanes = 0), [t.memoizedState, a.dispatch];
  }
  function zs(t) {
    var e = $t(),
      n = e.queue;
    if (n === null) throw Error(o(311));
    n.lastRenderedReducer = t;
    var a = n.dispatch,
      i = n.pending,
      r = e.memoizedState;
    if (i !== null) {
      n.pending = null;
      var f = (i = i.next);
      do (r = t(r, f.action)), (f = f.next);
      while (f !== i);
      De(r, e.memoizedState) || (Pt = !0),
        (e.memoizedState = r),
        e.baseQueue === null && (e.baseState = r),
        (n.lastRenderedState = r);
    }
    return [r, a];
  }
  function ad(t, e, n) {
    var a = mt,
      i = $t(),
      r = _t;
    if (r) {
      if (n === void 0) throw Error(o(407));
      n = n();
    } else n = e();
    var f = !De((Dt || i).memoizedState, n);
    if (
      (f && ((i.memoizedState = n), (Pt = !0)),
      (i = i.queue),
      Us(ud.bind(null, a, i, t), [t]),
      i.getSnapshot !== e || f || (It !== null && It.memoizedState.tag & 1))
    ) {
      if (
        ((a.flags |= 2048),
        il(9, { destroy: void 0 }, id.bind(null, a, i, n, e), null),
        Mt === null)
      )
        throw Error(o(349));
      r || (xn & 127) !== 0 || ld(a, e, n);
    }
    return n;
  }
  function ld(t, e, n) {
    (t.flags |= 16384),
      (t = { getSnapshot: e, value: n }),
      (e = mt.updateQueue),
      e === null
        ? ((e = bu()), (mt.updateQueue = e), (e.stores = [t]))
        : ((n = e.stores), n === null ? (e.stores = [t]) : n.push(t));
  }
  function id(t, e, n, a) {
    (e.value = n), (e.getSnapshot = a), rd(e) && sd(t);
  }
  function ud(t, e, n) {
    return n(function () {
      rd(e) && sd(t);
    });
  }
  function rd(t) {
    var e = t.getSnapshot;
    t = t.value;
    try {
      var n = e();
      return !De(t, n);
    } catch {
      return !0;
    }
  }
  function sd(t) {
    var e = pa(t, 2);
    e !== null && Re(e, t, 2);
  }
  function Ns(t) {
    var e = be();
    if (typeof t == "function") {
      var n = t;
      if (((t = n()), Aa)) {
        qn(!0);
        try {
          n();
        } finally {
          qn(!1);
        }
      }
    }
    return (
      (e.memoizedState = e.baseState = t),
      (e.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: En,
        lastRenderedState: t,
      }),
      e
    );
  }
  function od(t, e, n, a) {
    return (t.baseState = n), Ds(t, Dt, typeof a == "function" ? a : En);
  }
  function V0(t, e, n, a, i) {
    if (Tu(t)) throw Error(o(485));
    if (((t = e.action), t !== null)) {
      var r = {
        payload: i,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function (f) {
          r.listeners.push(f);
        },
      };
      R.T !== null ? n(!0) : (r.isTransition = !1),
        a(r),
        (n = e.pending),
        n === null
          ? ((r.next = e.pending = r), cd(e, r))
          : ((r.next = n.next), (e.pending = n.next = r));
    }
  }
  function cd(t, e) {
    var n = e.action,
      a = e.payload,
      i = t.state;
    if (e.isTransition) {
      var r = R.T,
        f = {};
      R.T = f;
      try {
        var p = n(i, a),
          x = R.S;
        x !== null && x(f, p), fd(t, e, p);
      } catch (z) {
        Ms(t, e, z);
      } finally {
        r !== null && f.types !== null && (r.types = f.types), (R.T = r);
      }
    } else
      try {
        (r = n(i, a)), fd(t, e, r);
      } catch (z) {
        Ms(t, e, z);
      }
  }
  function fd(t, e, n) {
    n !== null && typeof n == "object" && typeof n.then == "function"
      ? n.then(
          function (a) {
            dd(t, e, a);
          },
          function (a) {
            return Ms(t, e, a);
          }
        )
      : dd(t, e, n);
  }
  function dd(t, e, n) {
    (e.status = "fulfilled"),
      (e.value = n),
      md(e),
      (t.state = n),
      (e = t.pending),
      e !== null &&
        ((n = e.next),
        n === e ? (t.pending = null) : ((n = n.next), (e.next = n), cd(t, n)));
  }
  function Ms(t, e, n) {
    var a = t.pending;
    if (((t.pending = null), a !== null)) {
      a = a.next;
      do (e.status = "rejected"), (e.reason = n), md(e), (e = e.next);
      while (e !== a);
    }
    t.action = null;
  }
  function md(t) {
    t = t.listeners;
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
  function hd(t, e) {
    return e;
  }
  function yd(t, e) {
    if (_t) {
      var n = Mt.formState;
      if (n !== null) {
        t: {
          var a = mt;
          if (_t) {
            if (Lt) {
              e: {
                for (var i = Lt, r = Qe; i.nodeType !== 8; ) {
                  if (!r) {
                    i = null;
                    break e;
                  }
                  if (((i = ke(i.nextSibling)), i === null)) {
                    i = null;
                    break e;
                  }
                }
                (r = i.data), (i = r === "F!" || r === "F" ? i : null);
              }
              if (i) {
                (Lt = ke(i.nextSibling)), (a = i.data === "F!");
                break t;
              }
            }
            Qn(a);
          }
          a = !1;
        }
        a && (e = n[0]);
      }
    }
    return (
      (n = be()),
      (n.memoizedState = n.baseState = e),
      (a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: hd,
        lastRenderedState: e,
      }),
      (n.queue = a),
      (n = Md.bind(null, mt, a)),
      (a.dispatch = n),
      (a = Ns(!1)),
      (r = Ys.bind(null, mt, !1, a.queue)),
      (a = be()),
      (i = { state: e, dispatch: null, action: t, pending: null }),
      (a.queue = i),
      (n = V0.bind(null, mt, i, r, n)),
      (i.dispatch = n),
      (a.memoizedState = t),
      [e, n, !1]
    );
  }
  function pd(t) {
    var e = $t();
    return gd(e, Dt, t);
  }
  function gd(t, e, n) {
    if (
      ((e = Ds(t, e, hd)[0]),
      (t = xu(En)[0]),
      typeof e == "object" && e !== null && typeof e.then == "function")
    )
      try {
        var a = Pl(e);
      } catch (f) {
        throw f === tl ? fu : f;
      }
    else a = e;
    e = $t();
    var i = e.queue,
      r = i.dispatch;
    return (
      n !== e.memoizedState &&
        ((mt.flags |= 2048),
        il(9, { destroy: void 0 }, X0.bind(null, i, n), null)),
      [a, r, t]
    );
  }
  function X0(t, e) {
    t.action = e;
  }
  function vd(t) {
    var e = $t(),
      n = Dt;
    if (n !== null) return gd(e, n, t);
    $t(), (e = e.memoizedState), (n = $t());
    var a = n.queue.dispatch;
    return (n.memoizedState = t), [e, a, !1];
  }
  function il(t, e, n, a) {
    return (
      (t = { tag: t, create: n, deps: a, inst: e, next: null }),
      (e = mt.updateQueue),
      e === null && ((e = bu()), (mt.updateQueue = e)),
      (n = e.lastEffect),
      n === null
        ? (e.lastEffect = t.next = t)
        : ((a = n.next), (n.next = t), (t.next = a), (e.lastEffect = t)),
      t
    );
  }
  function bd() {
    return $t().memoizedState;
  }
  function Eu(t, e, n, a) {
    var i = be();
    (mt.flags |= t),
      (i.memoizedState = il(
        1 | e,
        { destroy: void 0 },
        n,
        a === void 0 ? null : a
      ));
  }
  function _u(t, e, n, a) {
    var i = $t();
    a = a === void 0 ? null : a;
    var r = i.memoizedState.inst;
    Dt !== null && a !== null && As(a, Dt.memoizedState.deps)
      ? (i.memoizedState = il(e, r, n, a))
      : ((mt.flags |= t), (i.memoizedState = il(1 | e, r, n, a)));
  }
  function Sd(t, e) {
    Eu(8390656, 8, t, e);
  }
  function Us(t, e) {
    _u(2048, 8, t, e);
  }
  function Q0(t) {
    mt.flags |= 4;
    var e = mt.updateQueue;
    if (e === null) (e = bu()), (mt.updateQueue = e), (e.events = [t]);
    else {
      var n = e.events;
      n === null ? (e.events = [t]) : n.push(t);
    }
  }
  function xd(t) {
    var e = $t().memoizedState;
    return (
      Q0({ ref: e, nextImpl: t }),
      function () {
        if ((Ot & 2) !== 0) throw Error(o(440));
        return e.impl.apply(void 0, arguments);
      }
    );
  }
  function Ed(t, e) {
    return _u(4, 2, t, e);
  }
  function _d(t, e) {
    return _u(4, 4, t, e);
  }
  function Td(t, e) {
    if (typeof e == "function") {
      t = t();
      var n = e(t);
      return function () {
        typeof n == "function" ? n() : e(null);
      };
    }
    if (e != null)
      return (
        (t = t()),
        (e.current = t),
        function () {
          e.current = null;
        }
      );
  }
  function Ad(t, e, n) {
    (n = n != null ? n.concat([t]) : null), _u(4, 4, Td.bind(null, e, t), n);
  }
  function Bs() {}
  function Rd(t, e) {
    var n = $t();
    e = e === void 0 ? null : e;
    var a = n.memoizedState;
    return e !== null && As(e, a[1]) ? a[0] : ((n.memoizedState = [t, e]), t);
  }
  function Od(t, e) {
    var n = $t();
    e = e === void 0 ? null : e;
    var a = n.memoizedState;
    if (e !== null && As(e, a[1])) return a[0];
    if (((a = t()), Aa)) {
      qn(!0);
      try {
        t();
      } finally {
        qn(!1);
      }
    }
    return (n.memoizedState = [a, e]), a;
  }
  function Ls(t, e, n) {
    return n === void 0 || ((xn & 1073741824) !== 0 && (xt & 261930) === 0)
      ? (t.memoizedState = e)
      : ((t.memoizedState = n), (t = jm()), (mt.lanes |= t), (Pn |= t), n);
  }
  function jd(t, e, n, a) {
    return De(n, e)
      ? n
      : nl.current !== null
      ? ((t = Ls(t, n, a)), De(t, e) || (Pt = !0), t)
      : (xn & 42) === 0 || ((xn & 1073741824) !== 0 && (xt & 261930) === 0)
      ? ((Pt = !0), (t.memoizedState = n))
      : ((t = jm()), (mt.lanes |= t), (Pn |= t), e);
  }
  function Cd(t, e, n, a, i) {
    var r = Z.p;
    Z.p = r !== 0 && 8 > r ? r : 8;
    var f = R.T,
      p = {};
    (R.T = p), Ys(t, !1, e, n);
    try {
      var x = i(),
        z = R.S;
      if (
        (z !== null && z(p, x),
        x !== null && typeof x == "object" && typeof x.then == "function")
      ) {
        var V = q0(x, a);
        ti(t, e, V, Le(t));
      } else ti(t, e, a, Le(t));
    } catch (Q) {
      ti(t, e, { then: function () {}, status: "rejected", reason: Q }, Le());
    } finally {
      (Z.p = r),
        f !== null && p.types !== null && (f.types = p.types),
        (R.T = f);
    }
  }
  function Z0() {}
  function Hs(t, e, n, a) {
    if (t.tag !== 5) throw Error(o(476));
    var i = wd(t).queue;
    Cd(
      t,
      i,
      e,
      $,
      n === null
        ? Z0
        : function () {
            return Dd(t), n(a);
          }
    );
  }
  function wd(t) {
    var e = t.memoizedState;
    if (e !== null) return e;
    e = {
      memoizedState: $,
      baseState: $,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: En,
        lastRenderedState: $,
      },
      next: null,
    };
    var n = {};
    return (
      (e.next = {
        memoizedState: n,
        baseState: n,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: En,
          lastRenderedState: n,
        },
        next: null,
      }),
      (t.memoizedState = e),
      (t = t.alternate),
      t !== null && (t.memoizedState = e),
      e
    );
  }
  function Dd(t) {
    var e = wd(t);
    e.next === null && (e = t.alternate.memoizedState),
      ti(t, e.next.queue, {}, Le());
  }
  function qs() {
    return de(gi);
  }
  function zd() {
    return $t().memoizedState;
  }
  function Nd() {
    return $t().memoizedState;
  }
  function k0(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var n = Le();
          t = Kn(n);
          var a = Jn(e, t, n);
          a !== null && (Re(a, e, n), $l(a, e, n)),
            (e = { cache: hs() }),
            (t.payload = e);
          return;
      }
      e = e.return;
    }
  }
  function K0(t, e, n) {
    var a = Le();
    (n = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      Tu(t)
        ? Ud(e, n)
        : ((n = as(t, e, n, a)), n !== null && (Re(n, t, a), Bd(n, e, a)));
  }
  function Md(t, e, n) {
    var a = Le();
    ti(t, e, n, a);
  }
  function ti(t, e, n, a) {
    var i = {
      lane: a,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (Tu(t)) Ud(e, i);
    else {
      var r = t.alternate;
      if (
        t.lanes === 0 &&
        (r === null || r.lanes === 0) &&
        ((r = e.lastRenderedReducer), r !== null)
      )
        try {
          var f = e.lastRenderedState,
            p = r(f, n);
          if (((i.hasEagerState = !0), (i.eagerState = p), De(p, f)))
            return lu(t, e, i, 0), Mt === null && au(), !1;
        } catch {
        } finally {
        }
      if (((n = as(t, e, i, a)), n !== null))
        return Re(n, t, a), Bd(n, e, a), !0;
    }
    return !1;
  }
  function Ys(t, e, n, a) {
    if (
      ((a = {
        lane: 2,
        revertLane: bo(),
        gesture: null,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      Tu(t))
    ) {
      if (e) throw Error(o(479));
    } else (e = as(t, n, a, 2)), e !== null && Re(e, t, 2);
  }
  function Tu(t) {
    var e = t.alternate;
    return t === mt || (e !== null && e === mt);
  }
  function Ud(t, e) {
    al = gu = !0;
    var n = t.pending;
    n === null ? (e.next = e) : ((e.next = n.next), (n.next = e)),
      (t.pending = e);
  }
  function Bd(t, e, n) {
    if ((n & 4194048) !== 0) {
      var a = e.lanes;
      (a &= t.pendingLanes), (n |= a), (e.lanes = n), Yc(t, n);
    }
  }
  var ei = {
    readContext: de,
    use: Su,
    useCallback: kt,
    useContext: kt,
    useEffect: kt,
    useImperativeHandle: kt,
    useLayoutEffect: kt,
    useInsertionEffect: kt,
    useMemo: kt,
    useReducer: kt,
    useRef: kt,
    useState: kt,
    useDebugValue: kt,
    useDeferredValue: kt,
    useTransition: kt,
    useSyncExternalStore: kt,
    useId: kt,
    useHostTransitionStatus: kt,
    useFormState: kt,
    useActionState: kt,
    useOptimistic: kt,
    useMemoCache: kt,
    useCacheRefresh: kt,
  };
  ei.useEffectEvent = kt;
  var Ld = {
      readContext: de,
      use: Su,
      useCallback: function (t, e) {
        return (be().memoizedState = [t, e === void 0 ? null : e]), t;
      },
      useContext: de,
      useEffect: Sd,
      useImperativeHandle: function (t, e, n) {
        (n = n != null ? n.concat([t]) : null),
          Eu(4194308, 4, Td.bind(null, e, t), n);
      },
      useLayoutEffect: function (t, e) {
        return Eu(4194308, 4, t, e);
      },
      useInsertionEffect: function (t, e) {
        Eu(4, 2, t, e);
      },
      useMemo: function (t, e) {
        var n = be();
        e = e === void 0 ? null : e;
        var a = t();
        if (Aa) {
          qn(!0);
          try {
            t();
          } finally {
            qn(!1);
          }
        }
        return (n.memoizedState = [a, e]), a;
      },
      useReducer: function (t, e, n) {
        var a = be();
        if (n !== void 0) {
          var i = n(e);
          if (Aa) {
            qn(!0);
            try {
              n(e);
            } finally {
              qn(!1);
            }
          }
        } else i = e;
        return (
          (a.memoizedState = a.baseState = i),
          (t = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: t,
            lastRenderedState: i,
          }),
          (a.queue = t),
          (t = t.dispatch = K0.bind(null, mt, t)),
          [a.memoizedState, t]
        );
      },
      useRef: function (t) {
        var e = be();
        return (t = { current: t }), (e.memoizedState = t);
      },
      useState: function (t) {
        t = Ns(t);
        var e = t.queue,
          n = Md.bind(null, mt, e);
        return (e.dispatch = n), [t.memoizedState, n];
      },
      useDebugValue: Bs,
      useDeferredValue: function (t, e) {
        var n = be();
        return Ls(n, t, e);
      },
      useTransition: function () {
        var t = Ns(!1);
        return (
          (t = Cd.bind(null, mt, t.queue, !0, !1)),
          (be().memoizedState = t),
          [!1, t]
        );
      },
      useSyncExternalStore: function (t, e, n) {
        var a = mt,
          i = be();
        if (_t) {
          if (n === void 0) throw Error(o(407));
          n = n();
        } else {
          if (((n = e()), Mt === null)) throw Error(o(349));
          (xt & 127) !== 0 || ld(a, e, n);
        }
        i.memoizedState = n;
        var r = { value: n, getSnapshot: e };
        return (
          (i.queue = r),
          Sd(ud.bind(null, a, r, t), [t]),
          (a.flags |= 2048),
          il(9, { destroy: void 0 }, id.bind(null, a, r, n, e), null),
          n
        );
      },
      useId: function () {
        var t = be(),
          e = Mt.identifierPrefix;
        if (_t) {
          var n = un,
            a = ln;
          (n = (a & ~(1 << (32 - we(a) - 1))).toString(32) + n),
            (e = "_" + e + "R_" + n),
            (n = vu++),
            0 < n && (e += "H" + n.toString(32)),
            (e += "_");
        } else (n = Y0++), (e = "_" + e + "r_" + n.toString(32) + "_");
        return (t.memoizedState = e);
      },
      useHostTransitionStatus: qs,
      useFormState: yd,
      useActionState: yd,
      useOptimistic: function (t) {
        var e = be();
        e.memoizedState = e.baseState = t;
        var n = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return (
          (e.queue = n),
          (e = Ys.bind(null, mt, !0, n)),
          (n.dispatch = e),
          [t, e]
        );
      },
      useMemoCache: ws,
      useCacheRefresh: function () {
        return (be().memoizedState = k0.bind(null, mt));
      },
      useEffectEvent: function (t) {
        var e = be(),
          n = { impl: t };
        return (
          (e.memoizedState = n),
          function () {
            if ((Ot & 2) !== 0) throw Error(o(440));
            return n.impl.apply(void 0, arguments);
          }
        );
      },
    },
    Gs = {
      readContext: de,
      use: Su,
      useCallback: Rd,
      useContext: de,
      useEffect: Us,
      useImperativeHandle: Ad,
      useInsertionEffect: Ed,
      useLayoutEffect: _d,
      useMemo: Od,
      useReducer: xu,
      useRef: bd,
      useState: function () {
        return xu(En);
      },
      useDebugValue: Bs,
      useDeferredValue: function (t, e) {
        var n = $t();
        return jd(n, Dt.memoizedState, t, e);
      },
      useTransition: function () {
        var t = xu(En)[0],
          e = $t().memoizedState;
        return [typeof t == "boolean" ? t : Pl(t), e];
      },
      useSyncExternalStore: ad,
      useId: zd,
      useHostTransitionStatus: qs,
      useFormState: pd,
      useActionState: pd,
      useOptimistic: function (t, e) {
        var n = $t();
        return od(n, Dt, t, e);
      },
      useMemoCache: ws,
      useCacheRefresh: Nd,
    };
  Gs.useEffectEvent = xd;
  var Hd = {
    readContext: de,
    use: Su,
    useCallback: Rd,
    useContext: de,
    useEffect: Us,
    useImperativeHandle: Ad,
    useInsertionEffect: Ed,
    useLayoutEffect: _d,
    useMemo: Od,
    useReducer: zs,
    useRef: bd,
    useState: function () {
      return zs(En);
    },
    useDebugValue: Bs,
    useDeferredValue: function (t, e) {
      var n = $t();
      return Dt === null ? Ls(n, t, e) : jd(n, Dt.memoizedState, t, e);
    },
    useTransition: function () {
      var t = zs(En)[0],
        e = $t().memoizedState;
      return [typeof t == "boolean" ? t : Pl(t), e];
    },
    useSyncExternalStore: ad,
    useId: zd,
    useHostTransitionStatus: qs,
    useFormState: vd,
    useActionState: vd,
    useOptimistic: function (t, e) {
      var n = $t();
      return Dt !== null
        ? od(n, Dt, t, e)
        : ((n.baseState = t), [t, n.queue.dispatch]);
    },
    useMemoCache: ws,
    useCacheRefresh: Nd,
  };
  Hd.useEffectEvent = xd;
  function Vs(t, e, n, a) {
    (e = t.memoizedState),
      (n = n(a, e)),
      (n = n == null ? e : S({}, e, n)),
      (t.memoizedState = n),
      t.lanes === 0 && (t.updateQueue.baseState = n);
  }
  var Xs = {
    enqueueSetState: function (t, e, n) {
      t = t._reactInternals;
      var a = Le(),
        i = Kn(a);
      (i.payload = e),
        n != null && (i.callback = n),
        (e = Jn(t, i, a)),
        e !== null && (Re(e, t, a), $l(e, t, a));
    },
    enqueueReplaceState: function (t, e, n) {
      t = t._reactInternals;
      var a = Le(),
        i = Kn(a);
      (i.tag = 1),
        (i.payload = e),
        n != null && (i.callback = n),
        (e = Jn(t, i, a)),
        e !== null && (Re(e, t, a), $l(e, t, a));
    },
    enqueueForceUpdate: function (t, e) {
      t = t._reactInternals;
      var n = Le(),
        a = Kn(n);
      (a.tag = 2),
        e != null && (a.callback = e),
        (e = Jn(t, a, n)),
        e !== null && (Re(e, t, n), $l(e, t, n));
    },
  };
  function qd(t, e, n, a, i, r, f) {
    return (
      (t = t.stateNode),
      typeof t.shouldComponentUpdate == "function"
        ? t.shouldComponentUpdate(a, r, f)
        : e.prototype && e.prototype.isPureReactComponent
        ? !Gl(n, a) || !Gl(i, r)
        : !0
    );
  }
  function Yd(t, e, n, a) {
    (t = e.state),
      typeof e.componentWillReceiveProps == "function" &&
        e.componentWillReceiveProps(n, a),
      typeof e.UNSAFE_componentWillReceiveProps == "function" &&
        e.UNSAFE_componentWillReceiveProps(n, a),
      e.state !== t && Xs.enqueueReplaceState(e, e.state, null);
  }
  function Ra(t, e) {
    var n = e;
    if ("ref" in e) {
      n = {};
      for (var a in e) a !== "ref" && (n[a] = e[a]);
    }
    if ((t = t.defaultProps)) {
      n === e && (n = S({}, n));
      for (var i in t) n[i] === void 0 && (n[i] = t[i]);
    }
    return n;
  }
  function Gd(t) {
    nu(t);
  }
  function Vd(t) {
    console.error(t);
  }
  function Xd(t) {
    nu(t);
  }
  function Au(t, e) {
    try {
      var n = t.onUncaughtError;
      n(e.value, { componentStack: e.stack });
    } catch (a) {
      setTimeout(function () {
        throw a;
      });
    }
  }
  function Qd(t, e, n) {
    try {
      var a = t.onCaughtError;
      a(n.value, {
        componentStack: n.stack,
        errorBoundary: e.tag === 1 ? e.stateNode : null,
      });
    } catch (i) {
      setTimeout(function () {
        throw i;
      });
    }
  }
  function Qs(t, e, n) {
    return (
      (n = Kn(n)),
      (n.tag = 3),
      (n.payload = { element: null }),
      (n.callback = function () {
        Au(t, e);
      }),
      n
    );
  }
  function Zd(t) {
    return (t = Kn(t)), (t.tag = 3), t;
  }
  function kd(t, e, n, a) {
    var i = n.type.getDerivedStateFromError;
    if (typeof i == "function") {
      var r = a.value;
      (t.payload = function () {
        return i(r);
      }),
        (t.callback = function () {
          Qd(e, n, a);
        });
    }
    var f = n.stateNode;
    f !== null &&
      typeof f.componentDidCatch == "function" &&
      (t.callback = function () {
        Qd(e, n, a),
          typeof i != "function" &&
            (ta === null ? (ta = new Set([this])) : ta.add(this));
        var p = a.stack;
        this.componentDidCatch(a.value, {
          componentStack: p !== null ? p : "",
        });
      });
  }
  function J0(t, e, n, a, i) {
    if (
      ((n.flags |= 32768),
      a !== null && typeof a == "object" && typeof a.then == "function")
    ) {
      if (
        ((e = n.alternate),
        e !== null && Wa(e, n, i, !0),
        (n = Ne.current),
        n !== null)
      ) {
        switch (n.tag) {
          case 31:
          case 13:
            return (
              Ze === null ? Lu() : n.alternate === null && Kt === 0 && (Kt = 3),
              (n.flags &= -257),
              (n.flags |= 65536),
              (n.lanes = i),
              a === du
                ? (n.flags |= 16384)
                : ((e = n.updateQueue),
                  e === null ? (n.updateQueue = new Set([a])) : e.add(a),
                  po(t, a, i)),
              !1
            );
          case 22:
            return (
              (n.flags |= 65536),
              a === du
                ? (n.flags |= 16384)
                : ((e = n.updateQueue),
                  e === null
                    ? ((e = {
                        transitions: null,
                        markerInstances: null,
                        retryQueue: new Set([a]),
                      }),
                      (n.updateQueue = e))
                    : ((n = e.retryQueue),
                      n === null ? (e.retryQueue = new Set([a])) : n.add(a)),
                  po(t, a, i)),
              !1
            );
        }
        throw Error(o(435, n.tag));
      }
      return po(t, a, i), Lu(), !1;
    }
    if (_t)
      return (
        (e = Ne.current),
        e !== null
          ? ((e.flags & 65536) === 0 && (e.flags |= 256),
            (e.flags |= 65536),
            (e.lanes = i),
            a !== os && ((t = Error(o(422), { cause: a })), Ql(Ge(t, n))))
          : (a !== os && ((e = Error(o(423), { cause: a })), Ql(Ge(e, n))),
            (t = t.current.alternate),
            (t.flags |= 65536),
            (i &= -i),
            (t.lanes |= i),
            (a = Ge(a, n)),
            (i = Qs(t.stateNode, a, i)),
            Ss(t, i),
            Kt !== 4 && (Kt = 2)),
        !1
      );
    var r = Error(o(520), { cause: a });
    if (
      ((r = Ge(r, n)),
      oi === null ? (oi = [r]) : oi.push(r),
      Kt !== 4 && (Kt = 2),
      e === null)
    )
      return !0;
    (a = Ge(a, n)), (n = e);
    do {
      switch (n.tag) {
        case 3:
          return (
            (n.flags |= 65536),
            (t = i & -i),
            (n.lanes |= t),
            (t = Qs(n.stateNode, a, t)),
            Ss(n, t),
            !1
          );
        case 1:
          if (
            ((e = n.type),
            (r = n.stateNode),
            (n.flags & 128) === 0 &&
              (typeof e.getDerivedStateFromError == "function" ||
                (r !== null &&
                  typeof r.componentDidCatch == "function" &&
                  (ta === null || !ta.has(r)))))
          )
            return (
              (n.flags |= 65536),
              (i &= -i),
              (n.lanes |= i),
              (i = Zd(i)),
              kd(i, t, n, a),
              Ss(n, i),
              !1
            );
      }
      n = n.return;
    } while (n !== null);
    return !1;
  }
  var Zs = Error(o(461)),
    Pt = !1;
  function me(t, e, n, a) {
    e.child = t === null ? Ff(e, null, n, a) : Ta(e, t.child, n, a);
  }
  function Kd(t, e, n, a, i) {
    n = n.render;
    var r = e.ref;
    if ("ref" in a) {
      var f = {};
      for (var p in a) p !== "ref" && (f[p] = a[p]);
    } else f = a;
    return (
      Sa(e),
      (a = Rs(t, e, n, f, r, i)),
      (p = Os()),
      t !== null && !Pt
        ? (js(t, e, i), _n(t, e, i))
        : (_t && p && rs(e), (e.flags |= 1), me(t, e, a, i), e.child)
    );
  }
  function Jd(t, e, n, a, i) {
    if (t === null) {
      var r = n.type;
      return typeof r == "function" &&
        !ls(r) &&
        r.defaultProps === void 0 &&
        n.compare === null
        ? ((e.tag = 15), (e.type = r), $d(t, e, r, a, i))
        : ((t = uu(n.type, null, a, e, e.mode, i)),
          (t.ref = e.ref),
          (t.return = e),
          (e.child = t));
    }
    if (((r = t.child), !Ps(t, i))) {
      var f = r.memoizedProps;
      if (
        ((n = n.compare), (n = n !== null ? n : Gl), n(f, a) && t.ref === e.ref)
      )
        return _n(t, e, i);
    }
    return (
      (e.flags |= 1),
      (t = gn(r, a)),
      (t.ref = e.ref),
      (t.return = e),
      (e.child = t)
    );
  }
  function $d(t, e, n, a, i) {
    if (t !== null) {
      var r = t.memoizedProps;
      if (Gl(r, a) && t.ref === e.ref)
        if (((Pt = !1), (e.pendingProps = a = r), Ps(t, i)))
          (t.flags & 131072) !== 0 && (Pt = !0);
        else return (e.lanes = t.lanes), _n(t, e, i);
    }
    return ks(t, e, n, a, i);
  }
  function Fd(t, e, n, a) {
    var i = a.children,
      r = t !== null ? t.memoizedState : null;
    if (
      (t === null &&
        e.stateNode === null &&
        (e.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      a.mode === "hidden")
    ) {
      if ((e.flags & 128) !== 0) {
        if (((r = r !== null ? r.baseLanes | n : n), t !== null)) {
          for (a = e.child = t.child, i = 0; a !== null; )
            (i = i | a.lanes | a.childLanes), (a = a.sibling);
          a = i & ~r;
        } else (a = 0), (e.child = null);
        return Wd(t, e, r, n, a);
      }
      if ((n & 536870912) !== 0)
        (e.memoizedState = { baseLanes: 0, cachePool: null }),
          t !== null && cu(e, r !== null ? r.cachePool : null),
          r !== null ? Pf(e, r) : Es(),
          td(e);
      else
        return (
          (a = e.lanes = 536870912),
          Wd(t, e, r !== null ? r.baseLanes | n : n, n, a)
        );
    } else
      r !== null
        ? (cu(e, r.cachePool), Pf(e, r), Fn(), (e.memoizedState = null))
        : (t !== null && cu(e, null), Es(), Fn());
    return me(t, e, i, n), e.child;
  }
  function ni(t, e) {
    return (
      (t !== null && t.tag === 22) ||
        e.stateNode !== null ||
        (e.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null,
        }),
      e.sibling
    );
  }
  function Wd(t, e, n, a, i) {
    var r = ps();
    return (
      (r = r === null ? null : { parent: Wt._currentValue, pool: r }),
      (e.memoizedState = { baseLanes: n, cachePool: r }),
      t !== null && cu(e, null),
      Es(),
      td(e),
      t !== null && Wa(t, e, a, !0),
      (e.childLanes = i),
      null
    );
  }
  function Ru(t, e) {
    return (
      (e = ju({ mode: e.mode, children: e.children }, t.mode)),
      (e.ref = t.ref),
      (t.child = e),
      (e.return = t),
      e
    );
  }
  function Id(t, e, n) {
    return (
      Ta(e, t.child, null, n),
      (t = Ru(e, e.pendingProps)),
      (t.flags |= 2),
      Me(e),
      (e.memoizedState = null),
      t
    );
  }
  function $0(t, e, n) {
    var a = e.pendingProps,
      i = (e.flags & 128) !== 0;
    if (((e.flags &= -129), t === null)) {
      if (_t) {
        if (a.mode === "hidden")
          return (t = Ru(e, a)), (e.lanes = 536870912), ni(null, t);
        if (
          (Ts(e),
          (t = Lt)
            ? ((t = ch(t, Qe)),
              (t = t !== null && t.data === "&" ? t : null),
              t !== null &&
                ((e.memoizedState = {
                  dehydrated: t,
                  treeContext: Vn !== null ? { id: ln, overflow: un } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (n = Uf(t)),
                (n.return = e),
                (e.child = n),
                (fe = e),
                (Lt = null)))
            : (t = null),
          t === null)
        )
          throw Qn(e);
        return (e.lanes = 536870912), null;
      }
      return Ru(e, a);
    }
    var r = t.memoizedState;
    if (r !== null) {
      var f = r.dehydrated;
      if ((Ts(e), i))
        if (e.flags & 256) (e.flags &= -257), (e = Id(t, e, n));
        else if (e.memoizedState !== null)
          (e.child = t.child), (e.flags |= 128), (e = null);
        else throw Error(o(558));
      else if (
        (Pt || Wa(t, e, n, !1), (i = (n & t.childLanes) !== 0), Pt || i)
      ) {
        if (
          ((a = Mt),
          a !== null && ((f = Gc(a, n)), f !== 0 && f !== r.retryLane))
        )
          throw ((r.retryLane = f), pa(t, f), Re(a, t, f), Zs);
        Lu(), (e = Id(t, e, n));
      } else
        (t = r.treeContext),
          (Lt = ke(f.nextSibling)),
          (fe = e),
          (_t = !0),
          (Xn = null),
          (Qe = !1),
          t !== null && Hf(e, t),
          (e = Ru(e, a)),
          (e.flags |= 4096);
      return e;
    }
    return (
      (t = gn(t.child, { mode: a.mode, children: a.children })),
      (t.ref = e.ref),
      (e.child = t),
      (t.return = e),
      t
    );
  }
  function Ou(t, e) {
    var n = e.ref;
    if (n === null) t !== null && t.ref !== null && (e.flags |= 4194816);
    else {
      if (typeof n != "function" && typeof n != "object") throw Error(o(284));
      (t === null || t.ref !== n) && (e.flags |= 4194816);
    }
  }
  function ks(t, e, n, a, i) {
    return (
      Sa(e),
      (n = Rs(t, e, n, a, void 0, i)),
      (a = Os()),
      t !== null && !Pt
        ? (js(t, e, i), _n(t, e, i))
        : (_t && a && rs(e), (e.flags |= 1), me(t, e, n, i), e.child)
    );
  }
  function Pd(t, e, n, a, i, r) {
    return (
      Sa(e),
      (e.updateQueue = null),
      (n = nd(e, a, n, i)),
      ed(t),
      (a = Os()),
      t !== null && !Pt
        ? (js(t, e, r), _n(t, e, r))
        : (_t && a && rs(e), (e.flags |= 1), me(t, e, n, r), e.child)
    );
  }
  function tm(t, e, n, a, i) {
    if ((Sa(e), e.stateNode === null)) {
      var r = Ka,
        f = n.contextType;
      typeof f == "object" && f !== null && (r = de(f)),
        (r = new n(a, r)),
        (e.memoizedState =
          r.state !== null && r.state !== void 0 ? r.state : null),
        (r.updater = Xs),
        (e.stateNode = r),
        (r._reactInternals = e),
        (r = e.stateNode),
        (r.props = a),
        (r.state = e.memoizedState),
        (r.refs = {}),
        vs(e),
        (f = n.contextType),
        (r.context = typeof f == "object" && f !== null ? de(f) : Ka),
        (r.state = e.memoizedState),
        (f = n.getDerivedStateFromProps),
        typeof f == "function" && (Vs(e, n, f, a), (r.state = e.memoizedState)),
        typeof n.getDerivedStateFromProps == "function" ||
          typeof r.getSnapshotBeforeUpdate == "function" ||
          (typeof r.UNSAFE_componentWillMount != "function" &&
            typeof r.componentWillMount != "function") ||
          ((f = r.state),
          typeof r.componentWillMount == "function" && r.componentWillMount(),
          typeof r.UNSAFE_componentWillMount == "function" &&
            r.UNSAFE_componentWillMount(),
          f !== r.state && Xs.enqueueReplaceState(r, r.state, null),
          Wl(e, a, r, i),
          Fl(),
          (r.state = e.memoizedState)),
        typeof r.componentDidMount == "function" && (e.flags |= 4194308),
        (a = !0);
    } else if (t === null) {
      r = e.stateNode;
      var p = e.memoizedProps,
        x = Ra(n, p);
      r.props = x;
      var z = r.context,
        V = n.contextType;
      (f = Ka), typeof V == "object" && V !== null && (f = de(V));
      var Q = n.getDerivedStateFromProps;
      (V =
        typeof Q == "function" ||
        typeof r.getSnapshotBeforeUpdate == "function"),
        (p = e.pendingProps !== p),
        V ||
          (typeof r.UNSAFE_componentWillReceiveProps != "function" &&
            typeof r.componentWillReceiveProps != "function") ||
          ((p || z !== f) && Yd(e, r, a, f)),
        (kn = !1);
      var M = e.memoizedState;
      (r.state = M),
        Wl(e, a, r, i),
        Fl(),
        (z = e.memoizedState),
        p || M !== z || kn
          ? (typeof Q == "function" && (Vs(e, n, Q, a), (z = e.memoizedState)),
            (x = kn || qd(e, n, x, a, M, z, f))
              ? (V ||
                  (typeof r.UNSAFE_componentWillMount != "function" &&
                    typeof r.componentWillMount != "function") ||
                  (typeof r.componentWillMount == "function" &&
                    r.componentWillMount(),
                  typeof r.UNSAFE_componentWillMount == "function" &&
                    r.UNSAFE_componentWillMount()),
                typeof r.componentDidMount == "function" &&
                  (e.flags |= 4194308))
              : (typeof r.componentDidMount == "function" &&
                  (e.flags |= 4194308),
                (e.memoizedProps = a),
                (e.memoizedState = z)),
            (r.props = a),
            (r.state = z),
            (r.context = f),
            (a = x))
          : (typeof r.componentDidMount == "function" && (e.flags |= 4194308),
            (a = !1));
    } else {
      (r = e.stateNode),
        bs(t, e),
        (f = e.memoizedProps),
        (V = Ra(n, f)),
        (r.props = V),
        (Q = e.pendingProps),
        (M = r.context),
        (z = n.contextType),
        (x = Ka),
        typeof z == "object" && z !== null && (x = de(z)),
        (p = n.getDerivedStateFromProps),
        (z =
          typeof p == "function" ||
          typeof r.getSnapshotBeforeUpdate == "function") ||
          (typeof r.UNSAFE_componentWillReceiveProps != "function" &&
            typeof r.componentWillReceiveProps != "function") ||
          ((f !== Q || M !== x) && Yd(e, r, a, x)),
        (kn = !1),
        (M = e.memoizedState),
        (r.state = M),
        Wl(e, a, r, i),
        Fl();
      var H = e.memoizedState;
      f !== Q ||
      M !== H ||
      kn ||
      (t !== null && t.dependencies !== null && su(t.dependencies))
        ? (typeof p == "function" && (Vs(e, n, p, a), (H = e.memoizedState)),
          (V =
            kn ||
            qd(e, n, V, a, M, H, x) ||
            (t !== null && t.dependencies !== null && su(t.dependencies)))
            ? (z ||
                (typeof r.UNSAFE_componentWillUpdate != "function" &&
                  typeof r.componentWillUpdate != "function") ||
                (typeof r.componentWillUpdate == "function" &&
                  r.componentWillUpdate(a, H, x),
                typeof r.UNSAFE_componentWillUpdate == "function" &&
                  r.UNSAFE_componentWillUpdate(a, H, x)),
              typeof r.componentDidUpdate == "function" && (e.flags |= 4),
              typeof r.getSnapshotBeforeUpdate == "function" &&
                (e.flags |= 1024))
            : (typeof r.componentDidUpdate != "function" ||
                (f === t.memoizedProps && M === t.memoizedState) ||
                (e.flags |= 4),
              typeof r.getSnapshotBeforeUpdate != "function" ||
                (f === t.memoizedProps && M === t.memoizedState) ||
                (e.flags |= 1024),
              (e.memoizedProps = a),
              (e.memoizedState = H)),
          (r.props = a),
          (r.state = H),
          (r.context = x),
          (a = V))
        : (typeof r.componentDidUpdate != "function" ||
            (f === t.memoizedProps && M === t.memoizedState) ||
            (e.flags |= 4),
          typeof r.getSnapshotBeforeUpdate != "function" ||
            (f === t.memoizedProps && M === t.memoizedState) ||
            (e.flags |= 1024),
          (a = !1));
    }
    return (
      (r = a),
      Ou(t, e),
      (a = (e.flags & 128) !== 0),
      r || a
        ? ((r = e.stateNode),
          (n =
            a && typeof n.getDerivedStateFromError != "function"
              ? null
              : r.render()),
          (e.flags |= 1),
          t !== null && a
            ? ((e.child = Ta(e, t.child, null, i)),
              (e.child = Ta(e, null, n, i)))
            : me(t, e, n, i),
          (e.memoizedState = r.state),
          (t = e.child))
        : (t = _n(t, e, i)),
      t
    );
  }
  function em(t, e, n, a) {
    return va(), (e.flags |= 256), me(t, e, n, a), e.child;
  }
  var Ks = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null,
  };
  function Js(t) {
    return { baseLanes: t, cachePool: Qf() };
  }
  function $s(t, e, n) {
    return (t = t !== null ? t.childLanes & ~n : 0), e && (t |= Be), t;
  }
  function nm(t, e, n) {
    var a = e.pendingProps,
      i = !1,
      r = (e.flags & 128) !== 0,
      f;
    if (
      ((f = r) ||
        (f =
          t !== null && t.memoizedState === null ? !1 : (Jt.current & 2) !== 0),
      f && ((i = !0), (e.flags &= -129)),
      (f = (e.flags & 32) !== 0),
      (e.flags &= -33),
      t === null)
    ) {
      if (_t) {
        if (
          (i ? $n(e) : Fn(),
          (t = Lt)
            ? ((t = ch(t, Qe)),
              (t = t !== null && t.data !== "&" ? t : null),
              t !== null &&
                ((e.memoizedState = {
                  dehydrated: t,
                  treeContext: Vn !== null ? { id: ln, overflow: un } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (n = Uf(t)),
                (n.return = e),
                (e.child = n),
                (fe = e),
                (Lt = null)))
            : (t = null),
          t === null)
        )
          throw Qn(e);
        return zo(t) ? (e.lanes = 32) : (e.lanes = 536870912), null;
      }
      var p = a.children;
      return (
        (a = a.fallback),
        i
          ? (Fn(),
            (i = e.mode),
            (p = ju({ mode: "hidden", children: p }, i)),
            (a = ga(a, i, n, null)),
            (p.return = e),
            (a.return = e),
            (p.sibling = a),
            (e.child = p),
            (a = e.child),
            (a.memoizedState = Js(n)),
            (a.childLanes = $s(t, f, n)),
            (e.memoizedState = Ks),
            ni(null, a))
          : ($n(e), Fs(e, p))
      );
    }
    var x = t.memoizedState;
    if (x !== null && ((p = x.dehydrated), p !== null)) {
      if (r)
        e.flags & 256
          ? ($n(e), (e.flags &= -257), (e = Ws(t, e, n)))
          : e.memoizedState !== null
          ? (Fn(), (e.child = t.child), (e.flags |= 128), (e = null))
          : (Fn(),
            (p = a.fallback),
            (i = e.mode),
            (a = ju({ mode: "visible", children: a.children }, i)),
            (p = ga(p, i, n, null)),
            (p.flags |= 2),
            (a.return = e),
            (p.return = e),
            (a.sibling = p),
            (e.child = a),
            Ta(e, t.child, null, n),
            (a = e.child),
            (a.memoizedState = Js(n)),
            (a.childLanes = $s(t, f, n)),
            (e.memoizedState = Ks),
            (e = ni(null, a)));
      else if (($n(e), zo(p))) {
        if (((f = p.nextSibling && p.nextSibling.dataset), f)) var z = f.dgst;
        (f = z),
          (a = Error(o(419))),
          (a.stack = ""),
          (a.digest = f),
          Ql({ value: a, source: null, stack: null }),
          (e = Ws(t, e, n));
      } else if (
        (Pt || Wa(t, e, n, !1), (f = (n & t.childLanes) !== 0), Pt || f)
      ) {
        if (
          ((f = Mt),
          f !== null && ((a = Gc(f, n)), a !== 0 && a !== x.retryLane))
        )
          throw ((x.retryLane = a), pa(t, a), Re(f, t, a), Zs);
        Do(p) || Lu(), (e = Ws(t, e, n));
      } else
        Do(p)
          ? ((e.flags |= 192), (e.child = t.child), (e = null))
          : ((t = x.treeContext),
            (Lt = ke(p.nextSibling)),
            (fe = e),
            (_t = !0),
            (Xn = null),
            (Qe = !1),
            t !== null && Hf(e, t),
            (e = Fs(e, a.children)),
            (e.flags |= 4096));
      return e;
    }
    return i
      ? (Fn(),
        (p = a.fallback),
        (i = e.mode),
        (x = t.child),
        (z = x.sibling),
        (a = gn(x, { mode: "hidden", children: a.children })),
        (a.subtreeFlags = x.subtreeFlags & 65011712),
        z !== null ? (p = gn(z, p)) : ((p = ga(p, i, n, null)), (p.flags |= 2)),
        (p.return = e),
        (a.return = e),
        (a.sibling = p),
        (e.child = a),
        ni(null, a),
        (a = e.child),
        (p = t.child.memoizedState),
        p === null
          ? (p = Js(n))
          : ((i = p.cachePool),
            i !== null
              ? ((x = Wt._currentValue),
                (i = i.parent !== x ? { parent: x, pool: x } : i))
              : (i = Qf()),
            (p = { baseLanes: p.baseLanes | n, cachePool: i })),
        (a.memoizedState = p),
        (a.childLanes = $s(t, f, n)),
        (e.memoizedState = Ks),
        ni(t.child, a))
      : ($n(e),
        (n = t.child),
        (t = n.sibling),
        (n = gn(n, { mode: "visible", children: a.children })),
        (n.return = e),
        (n.sibling = null),
        t !== null &&
          ((f = e.deletions),
          f === null ? ((e.deletions = [t]), (e.flags |= 16)) : f.push(t)),
        (e.child = n),
        (e.memoizedState = null),
        n);
  }
  function Fs(t, e) {
    return (
      (e = ju({ mode: "visible", children: e }, t.mode)),
      (e.return = t),
      (t.child = e)
    );
  }
  function ju(t, e) {
    return (t = ze(22, t, null, e)), (t.lanes = 0), t;
  }
  function Ws(t, e, n) {
    return (
      Ta(e, t.child, null, n),
      (t = Fs(e, e.pendingProps.children)),
      (t.flags |= 2),
      (e.memoizedState = null),
      t
    );
  }
  function am(t, e, n) {
    t.lanes |= e;
    var a = t.alternate;
    a !== null && (a.lanes |= e), ds(t.return, e, n);
  }
  function Is(t, e, n, a, i, r) {
    var f = t.memoizedState;
    f === null
      ? (t.memoizedState = {
          isBackwards: e,
          rendering: null,
          renderingStartTime: 0,
          last: a,
          tail: n,
          tailMode: i,
          treeForkCount: r,
        })
      : ((f.isBackwards = e),
        (f.rendering = null),
        (f.renderingStartTime = 0),
        (f.last = a),
        (f.tail = n),
        (f.tailMode = i),
        (f.treeForkCount = r));
  }
  function lm(t, e, n) {
    var a = e.pendingProps,
      i = a.revealOrder,
      r = a.tail;
    a = a.children;
    var f = Jt.current,
      p = (f & 2) !== 0;
    if (
      (p ? ((f = (f & 1) | 2), (e.flags |= 128)) : (f &= 1),
      F(Jt, f),
      me(t, e, a, n),
      (a = _t ? Xl : 0),
      !p && t !== null && (t.flags & 128) !== 0)
    )
      t: for (t = e.child; t !== null; ) {
        if (t.tag === 13) t.memoizedState !== null && am(t, n, e);
        else if (t.tag === 19) am(t, n, e);
        else if (t.child !== null) {
          (t.child.return = t), (t = t.child);
          continue;
        }
        if (t === e) break t;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) break t;
          t = t.return;
        }
        (t.sibling.return = t.return), (t = t.sibling);
      }
    switch (i) {
      case "forwards":
        for (n = e.child, i = null; n !== null; )
          (t = n.alternate),
            t !== null && pu(t) === null && (i = n),
            (n = n.sibling);
        (n = i),
          n === null
            ? ((i = e.child), (e.child = null))
            : ((i = n.sibling), (n.sibling = null)),
          Is(e, !1, i, n, r, a);
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (n = null, i = e.child, e.child = null; i !== null; ) {
          if (((t = i.alternate), t !== null && pu(t) === null)) {
            e.child = i;
            break;
          }
          (t = i.sibling), (i.sibling = n), (n = i), (i = t);
        }
        Is(e, !0, n, null, r, a);
        break;
      case "together":
        Is(e, !1, null, null, void 0, a);
        break;
      default:
        e.memoizedState = null;
    }
    return e.child;
  }
  function _n(t, e, n) {
    if (
      (t !== null && (e.dependencies = t.dependencies),
      (Pn |= e.lanes),
      (n & e.childLanes) === 0)
    )
      if (t !== null) {
        if ((Wa(t, e, n, !1), (n & e.childLanes) === 0)) return null;
      } else return null;
    if (t !== null && e.child !== t.child) throw Error(o(153));
    if (e.child !== null) {
      for (
        t = e.child, n = gn(t, t.pendingProps), e.child = n, n.return = e;
        t.sibling !== null;

      )
        (t = t.sibling),
          (n = n.sibling = gn(t, t.pendingProps)),
          (n.return = e);
      n.sibling = null;
    }
    return e.child;
  }
  function Ps(t, e) {
    return (t.lanes & e) !== 0
      ? !0
      : ((t = t.dependencies), !!(t !== null && su(t)));
  }
  function F0(t, e, n) {
    switch (e.tag) {
      case 3:
        re(e, e.stateNode.containerInfo),
          Zn(e, Wt, t.memoizedState.cache),
          va();
        break;
      case 27:
      case 5:
        Ln(e);
        break;
      case 4:
        re(e, e.stateNode.containerInfo);
        break;
      case 10:
        Zn(e, e.type, e.memoizedProps.value);
        break;
      case 31:
        if (e.memoizedState !== null) return (e.flags |= 128), Ts(e), null;
        break;
      case 13:
        var a = e.memoizedState;
        if (a !== null)
          return a.dehydrated !== null
            ? ($n(e), (e.flags |= 128), null)
            : (n & e.child.childLanes) !== 0
            ? nm(t, e, n)
            : ($n(e), (t = _n(t, e, n)), t !== null ? t.sibling : null);
        $n(e);
        break;
      case 19:
        var i = (t.flags & 128) !== 0;
        if (
          ((a = (n & e.childLanes) !== 0),
          a || (Wa(t, e, n, !1), (a = (n & e.childLanes) !== 0)),
          i)
        ) {
          if (a) return lm(t, e, n);
          e.flags |= 128;
        }
        if (
          ((i = e.memoizedState),
          i !== null &&
            ((i.rendering = null), (i.tail = null), (i.lastEffect = null)),
          F(Jt, Jt.current),
          a)
        )
          break;
        return null;
      case 22:
        return (e.lanes = 0), Fd(t, e, n, e.pendingProps);
      case 24:
        Zn(e, Wt, t.memoizedState.cache);
    }
    return _n(t, e, n);
  }
  function im(t, e, n) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps) Pt = !0;
      else {
        if (!Ps(t, n) && (e.flags & 128) === 0) return (Pt = !1), F0(t, e, n);
        Pt = (t.flags & 131072) !== 0;
      }
    else (Pt = !1), _t && (e.flags & 1048576) !== 0 && Lf(e, Xl, e.index);
    switch (((e.lanes = 0), e.tag)) {
      case 16:
        t: {
          var a = e.pendingProps;
          if (((t = Ea(e.elementType)), (e.type = t), typeof t == "function"))
            ls(t)
              ? ((a = Ra(t, a)), (e.tag = 1), (e = tm(null, e, t, a, n)))
              : ((e.tag = 0), (e = ks(null, e, t, a, n)));
          else {
            if (t != null) {
              var i = t.$$typeof;
              if (i === G) {
                (e.tag = 11), (e = Kd(null, e, t, a, n));
                break t;
              } else if (i === q) {
                (e.tag = 14), (e = Jd(null, e, t, a, n));
                break t;
              }
            }
            throw ((e = lt(t) || t), Error(o(306, e, "")));
          }
        }
        return e;
      case 0:
        return ks(t, e, e.type, e.pendingProps, n);
      case 1:
        return (a = e.type), (i = Ra(a, e.pendingProps)), tm(t, e, a, i, n);
      case 3:
        t: {
          if ((re(e, e.stateNode.containerInfo), t === null))
            throw Error(o(387));
          a = e.pendingProps;
          var r = e.memoizedState;
          (i = r.element), bs(t, e), Wl(e, a, null, n);
          var f = e.memoizedState;
          if (
            ((a = f.cache),
            Zn(e, Wt, a),
            a !== r.cache && ms(e, [Wt], n, !0),
            Fl(),
            (a = f.element),
            r.isDehydrated)
          )
            if (
              ((r = { element: a, isDehydrated: !1, cache: f.cache }),
              (e.updateQueue.baseState = r),
              (e.memoizedState = r),
              e.flags & 256)
            ) {
              e = em(t, e, a, n);
              break t;
            } else if (a !== i) {
              (i = Ge(Error(o(424)), e)), Ql(i), (e = em(t, e, a, n));
              break t;
            } else {
              switch (((t = e.stateNode.containerInfo), t.nodeType)) {
                case 9:
                  t = t.body;
                  break;
                default:
                  t = t.nodeName === "HTML" ? t.ownerDocument.body : t;
              }
              for (
                Lt = ke(t.firstChild),
                  fe = e,
                  _t = !0,
                  Xn = null,
                  Qe = !0,
                  n = Ff(e, null, a, n),
                  e.child = n;
                n;

              )
                (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
            }
          else {
            if ((va(), a === i)) {
              e = _n(t, e, n);
              break t;
            }
            me(t, e, a, n);
          }
          e = e.child;
        }
        return e;
      case 26:
        return (
          Ou(t, e),
          t === null
            ? (n = ph(e.type, null, e.pendingProps, null))
              ? (e.memoizedState = n)
              : _t ||
                ((n = e.type),
                (t = e.pendingProps),
                (a = Qu(ct.current).createElement(n)),
                (a[ce] = e),
                (a[Se] = t),
                he(a, n, t),
                ie(a),
                (e.stateNode = a))
            : (e.memoizedState = ph(
                e.type,
                t.memoizedProps,
                e.pendingProps,
                t.memoizedState
              )),
          null
        );
      case 27:
        return (
          Ln(e),
          t === null &&
            _t &&
            ((a = e.stateNode = mh(e.type, e.pendingProps, ct.current)),
            (fe = e),
            (Qe = !0),
            (i = Lt),
            la(e.type) ? ((No = i), (Lt = ke(a.firstChild))) : (Lt = i)),
          me(t, e, e.pendingProps.children, n),
          Ou(t, e),
          t === null && (e.flags |= 4194304),
          e.child
        );
      case 5:
        return (
          t === null &&
            _t &&
            ((i = a = Lt) &&
              ((a = Rg(a, e.type, e.pendingProps, Qe)),
              a !== null
                ? ((e.stateNode = a),
                  (fe = e),
                  (Lt = ke(a.firstChild)),
                  (Qe = !1),
                  (i = !0))
                : (i = !1)),
            i || Qn(e)),
          Ln(e),
          (i = e.type),
          (r = e.pendingProps),
          (f = t !== null ? t.memoizedProps : null),
          (a = r.children),
          jo(i, r) ? (a = null) : f !== null && jo(i, f) && (e.flags |= 32),
          e.memoizedState !== null &&
            ((i = Rs(t, e, G0, null, null, n)), (gi._currentValue = i)),
          Ou(t, e),
          me(t, e, a, n),
          e.child
        );
      case 6:
        return (
          t === null &&
            _t &&
            ((t = n = Lt) &&
              ((n = Og(n, e.pendingProps, Qe)),
              n !== null
                ? ((e.stateNode = n), (fe = e), (Lt = null), (t = !0))
                : (t = !1)),
            t || Qn(e)),
          null
        );
      case 13:
        return nm(t, e, n);
      case 4:
        return (
          re(e, e.stateNode.containerInfo),
          (a = e.pendingProps),
          t === null ? (e.child = Ta(e, null, a, n)) : me(t, e, a, n),
          e.child
        );
      case 11:
        return Kd(t, e, e.type, e.pendingProps, n);
      case 7:
        return me(t, e, e.pendingProps, n), e.child;
      case 8:
        return me(t, e, e.pendingProps.children, n), e.child;
      case 12:
        return me(t, e, e.pendingProps.children, n), e.child;
      case 10:
        return (
          (a = e.pendingProps),
          Zn(e, e.type, a.value),
          me(t, e, a.children, n),
          e.child
        );
      case 9:
        return (
          (i = e.type._context),
          (a = e.pendingProps.children),
          Sa(e),
          (i = de(i)),
          (a = a(i)),
          (e.flags |= 1),
          me(t, e, a, n),
          e.child
        );
      case 14:
        return Jd(t, e, e.type, e.pendingProps, n);
      case 15:
        return $d(t, e, e.type, e.pendingProps, n);
      case 19:
        return lm(t, e, n);
      case 31:
        return $0(t, e, n);
      case 22:
        return Fd(t, e, n, e.pendingProps);
      case 24:
        return (
          Sa(e),
          (a = de(Wt)),
          t === null
            ? ((i = ps()),
              i === null &&
                ((i = Mt),
                (r = hs()),
                (i.pooledCache = r),
                r.refCount++,
                r !== null && (i.pooledCacheLanes |= n),
                (i = r)),
              (e.memoizedState = { parent: a, cache: i }),
              vs(e),
              Zn(e, Wt, i))
            : ((t.lanes & n) !== 0 && (bs(t, e), Wl(e, null, null, n), Fl()),
              (i = t.memoizedState),
              (r = e.memoizedState),
              i.parent !== a
                ? ((i = { parent: a, cache: a }),
                  (e.memoizedState = i),
                  e.lanes === 0 &&
                    (e.memoizedState = e.updateQueue.baseState = i),
                  Zn(e, Wt, a))
                : ((a = r.cache),
                  Zn(e, Wt, a),
                  a !== i.cache && ms(e, [Wt], n, !0))),
          me(t, e, e.pendingProps.children, n),
          e.child
        );
      case 29:
        throw e.pendingProps;
    }
    throw Error(o(156, e.tag));
  }
  function Tn(t) {
    t.flags |= 4;
  }
  function to(t, e, n, a, i) {
    if (((e = (t.mode & 32) !== 0) && (e = !1), e)) {
      if (((t.flags |= 16777216), (i & 335544128) === i))
        if (t.stateNode.complete) t.flags |= 8192;
        else if (zm()) t.flags |= 8192;
        else throw ((_a = du), gs);
    } else t.flags &= -16777217;
  }
  function um(t, e) {
    if (e.type !== "stylesheet" || (e.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (((t.flags |= 16777216), !xh(e)))
      if (zm()) t.flags |= 8192;
      else throw ((_a = du), gs);
  }
  function Cu(t, e) {
    e !== null && (t.flags |= 4),
      t.flags & 16384 &&
        ((e = t.tag !== 22 ? Hc() : 536870912), (t.lanes |= e), (ol |= e));
  }
  function ai(t, e) {
    if (!_t)
      switch (t.tailMode) {
        case "hidden":
          e = t.tail;
          for (var n = null; e !== null; )
            e.alternate !== null && (n = e), (e = e.sibling);
          n === null ? (t.tail = null) : (n.sibling = null);
          break;
        case "collapsed":
          n = t.tail;
          for (var a = null; n !== null; )
            n.alternate !== null && (a = n), (n = n.sibling);
          a === null
            ? e || t.tail === null
              ? (t.tail = null)
              : (t.tail.sibling = null)
            : (a.sibling = null);
      }
  }
  function Ht(t) {
    var e = t.alternate !== null && t.alternate.child === t.child,
      n = 0,
      a = 0;
    if (e)
      for (var i = t.child; i !== null; )
        (n |= i.lanes | i.childLanes),
          (a |= i.subtreeFlags & 65011712),
          (a |= i.flags & 65011712),
          (i.return = t),
          (i = i.sibling);
    else
      for (i = t.child; i !== null; )
        (n |= i.lanes | i.childLanes),
          (a |= i.subtreeFlags),
          (a |= i.flags),
          (i.return = t),
          (i = i.sibling);
    return (t.subtreeFlags |= a), (t.childLanes = n), e;
  }
  function W0(t, e, n) {
    var a = e.pendingProps;
    switch ((ss(e), e.tag)) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Ht(e), null;
      case 1:
        return Ht(e), null;
      case 3:
        return (
          (n = e.stateNode),
          (a = null),
          t !== null && (a = t.memoizedState.cache),
          e.memoizedState.cache !== a && (e.flags |= 2048),
          Sn(Wt),
          qt(),
          n.pendingContext &&
            ((n.context = n.pendingContext), (n.pendingContext = null)),
          (t === null || t.child === null) &&
            (Fa(e)
              ? Tn(e)
              : t === null ||
                (t.memoizedState.isDehydrated && (e.flags & 256) === 0) ||
                ((e.flags |= 1024), cs())),
          Ht(e),
          null
        );
      case 26:
        var i = e.type,
          r = e.memoizedState;
        return (
          t === null
            ? (Tn(e),
              r !== null ? (Ht(e), um(e, r)) : (Ht(e), to(e, i, null, a, n)))
            : r
            ? r !== t.memoizedState
              ? (Tn(e), Ht(e), um(e, r))
              : (Ht(e), (e.flags &= -16777217))
            : ((t = t.memoizedProps),
              t !== a && Tn(e),
              Ht(e),
              to(e, i, t, a, n)),
          null
        );
      case 27:
        if (
          (za(e),
          (n = ct.current),
          (i = e.type),
          t !== null && e.stateNode != null)
        )
          t.memoizedProps !== a && Tn(e);
        else {
          if (!a) {
            if (e.stateNode === null) throw Error(o(166));
            return Ht(e), null;
          }
          (t = I.current),
            Fa(e) ? qf(e) : ((t = mh(i, a, n)), (e.stateNode = t), Tn(e));
        }
        return Ht(e), null;
      case 5:
        if ((za(e), (i = e.type), t !== null && e.stateNode != null))
          t.memoizedProps !== a && Tn(e);
        else {
          if (!a) {
            if (e.stateNode === null) throw Error(o(166));
            return Ht(e), null;
          }
          if (((r = I.current), Fa(e))) qf(e);
          else {
            var f = Qu(ct.current);
            switch (r) {
              case 1:
                r = f.createElementNS("http://www.w3.org/2000/svg", i);
                break;
              case 2:
                r = f.createElementNS("http://www.w3.org/1998/Math/MathML", i);
                break;
              default:
                switch (i) {
                  case "svg":
                    r = f.createElementNS("http://www.w3.org/2000/svg", i);
                    break;
                  case "math":
                    r = f.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      i
                    );
                    break;
                  case "script":
                    (r = f.createElement("div")),
                      (r.innerHTML = "<script></script>"),
                      (r = r.removeChild(r.firstChild));
                    break;
                  case "select":
                    (r =
                      typeof a.is == "string"
                        ? f.createElement("select", { is: a.is })
                        : f.createElement("select")),
                      a.multiple
                        ? (r.multiple = !0)
                        : a.size && (r.size = a.size);
                    break;
                  default:
                    r =
                      typeof a.is == "string"
                        ? f.createElement(i, { is: a.is })
                        : f.createElement(i);
                }
            }
            (r[ce] = e), (r[Se] = a);
            t: for (f = e.child; f !== null; ) {
              if (f.tag === 5 || f.tag === 6) r.appendChild(f.stateNode);
              else if (f.tag !== 4 && f.tag !== 27 && f.child !== null) {
                (f.child.return = f), (f = f.child);
                continue;
              }
              if (f === e) break t;
              for (; f.sibling === null; ) {
                if (f.return === null || f.return === e) break t;
                f = f.return;
              }
              (f.sibling.return = f.return), (f = f.sibling);
            }
            e.stateNode = r;
            t: switch ((he(r, i, a), i)) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                a = !!a.autoFocus;
                break t;
              case "img":
                a = !0;
                break t;
              default:
                a = !1;
            }
            a && Tn(e);
          }
        }
        return (
          Ht(e),
          to(e, e.type, t === null ? null : t.memoizedProps, e.pendingProps, n),
          null
        );
      case 6:
        if (t && e.stateNode != null) t.memoizedProps !== a && Tn(e);
        else {
          if (typeof a != "string" && e.stateNode === null) throw Error(o(166));
          if (((t = ct.current), Fa(e))) {
            if (
              ((t = e.stateNode),
              (n = e.memoizedProps),
              (a = null),
              (i = fe),
              i !== null)
            )
              switch (i.tag) {
                case 27:
                case 5:
                  a = i.memoizedProps;
              }
            (t[ce] = e),
              (t = !!(
                t.nodeValue === n ||
                (a !== null && a.suppressHydrationWarning === !0) ||
                nh(t.nodeValue, n)
              )),
              t || Qn(e, !0);
          } else (t = Qu(t).createTextNode(a)), (t[ce] = e), (e.stateNode = t);
        }
        return Ht(e), null;
      case 31:
        if (((n = e.memoizedState), t === null || t.memoizedState !== null)) {
          if (((a = Fa(e)), n !== null)) {
            if (t === null) {
              if (!a) throw Error(o(318));
              if (
                ((t = e.memoizedState),
                (t = t !== null ? t.dehydrated : null),
                !t)
              )
                throw Error(o(557));
              t[ce] = e;
            } else
              va(),
                (e.flags & 128) === 0 && (e.memoizedState = null),
                (e.flags |= 4);
            Ht(e), (t = !1);
          } else
            (n = cs()),
              t !== null &&
                t.memoizedState !== null &&
                (t.memoizedState.hydrationErrors = n),
              (t = !0);
          if (!t) return e.flags & 256 ? (Me(e), e) : (Me(e), null);
          if ((e.flags & 128) !== 0) throw Error(o(558));
        }
        return Ht(e), null;
      case 13:
        if (
          ((a = e.memoizedState),
          t === null ||
            (t.memoizedState !== null && t.memoizedState.dehydrated !== null))
        ) {
          if (((i = Fa(e)), a !== null && a.dehydrated !== null)) {
            if (t === null) {
              if (!i) throw Error(o(318));
              if (
                ((i = e.memoizedState),
                (i = i !== null ? i.dehydrated : null),
                !i)
              )
                throw Error(o(317));
              i[ce] = e;
            } else
              va(),
                (e.flags & 128) === 0 && (e.memoizedState = null),
                (e.flags |= 4);
            Ht(e), (i = !1);
          } else
            (i = cs()),
              t !== null &&
                t.memoizedState !== null &&
                (t.memoizedState.hydrationErrors = i),
              (i = !0);
          if (!i) return e.flags & 256 ? (Me(e), e) : (Me(e), null);
        }
        return (
          Me(e),
          (e.flags & 128) !== 0
            ? ((e.lanes = n), e)
            : ((n = a !== null),
              (t = t !== null && t.memoizedState !== null),
              n &&
                ((a = e.child),
                (i = null),
                a.alternate !== null &&
                  a.alternate.memoizedState !== null &&
                  a.alternate.memoizedState.cachePool !== null &&
                  (i = a.alternate.memoizedState.cachePool.pool),
                (r = null),
                a.memoizedState !== null &&
                  a.memoizedState.cachePool !== null &&
                  (r = a.memoizedState.cachePool.pool),
                r !== i && (a.flags |= 2048)),
              n !== t && n && (e.child.flags |= 8192),
              Cu(e, e.updateQueue),
              Ht(e),
              null)
        );
      case 4:
        return qt(), t === null && _o(e.stateNode.containerInfo), Ht(e), null;
      case 10:
        return Sn(e.type), Ht(e), null;
      case 19:
        if ((Y(Jt), (a = e.memoizedState), a === null)) return Ht(e), null;
        if (((i = (e.flags & 128) !== 0), (r = a.rendering), r === null))
          if (i) ai(a, !1);
          else {
            if (Kt !== 0 || (t !== null && (t.flags & 128) !== 0))
              for (t = e.child; t !== null; ) {
                if (((r = pu(t)), r !== null)) {
                  for (
                    e.flags |= 128,
                      ai(a, !1),
                      t = r.updateQueue,
                      e.updateQueue = t,
                      Cu(e, t),
                      e.subtreeFlags = 0,
                      t = n,
                      n = e.child;
                    n !== null;

                  )
                    Mf(n, t), (n = n.sibling);
                  return (
                    F(Jt, (Jt.current & 1) | 2),
                    _t && vn(e, a.treeForkCount),
                    e.child
                  );
                }
                t = t.sibling;
              }
            a.tail !== null &&
              Qt() > Mu &&
              ((e.flags |= 128), (i = !0), ai(a, !1), (e.lanes = 4194304));
          }
        else {
          if (!i)
            if (((t = pu(r)), t !== null)) {
              if (
                ((e.flags |= 128),
                (i = !0),
                (t = t.updateQueue),
                (e.updateQueue = t),
                Cu(e, t),
                ai(a, !0),
                a.tail === null &&
                  a.tailMode === "hidden" &&
                  !r.alternate &&
                  !_t)
              )
                return Ht(e), null;
            } else
              2 * Qt() - a.renderingStartTime > Mu &&
                n !== 536870912 &&
                ((e.flags |= 128), (i = !0), ai(a, !1), (e.lanes = 4194304));
          a.isBackwards
            ? ((r.sibling = e.child), (e.child = r))
            : ((t = a.last),
              t !== null ? (t.sibling = r) : (e.child = r),
              (a.last = r));
        }
        return a.tail !== null
          ? ((t = a.tail),
            (a.rendering = t),
            (a.tail = t.sibling),
            (a.renderingStartTime = Qt()),
            (t.sibling = null),
            (n = Jt.current),
            F(Jt, i ? (n & 1) | 2 : n & 1),
            _t && vn(e, a.treeForkCount),
            t)
          : (Ht(e), null);
      case 22:
      case 23:
        return (
          Me(e),
          _s(),
          (a = e.memoizedState !== null),
          t !== null
            ? (t.memoizedState !== null) !== a && (e.flags |= 8192)
            : a && (e.flags |= 8192),
          a
            ? (n & 536870912) !== 0 &&
              (e.flags & 128) === 0 &&
              (Ht(e), e.subtreeFlags & 6 && (e.flags |= 8192))
            : Ht(e),
          (n = e.updateQueue),
          n !== null && Cu(e, n.retryQueue),
          (n = null),
          t !== null &&
            t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (n = t.memoizedState.cachePool.pool),
          (a = null),
          e.memoizedState !== null &&
            e.memoizedState.cachePool !== null &&
            (a = e.memoizedState.cachePool.pool),
          a !== n && (e.flags |= 2048),
          t !== null && Y(xa),
          null
        );
      case 24:
        return (
          (n = null),
          t !== null && (n = t.memoizedState.cache),
          e.memoizedState.cache !== n && (e.flags |= 2048),
          Sn(Wt),
          Ht(e),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(o(156, e.tag));
  }
  function I0(t, e) {
    switch ((ss(e), e.tag)) {
      case 1:
        return (
          (t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
        );
      case 3:
        return (
          Sn(Wt),
          qt(),
          (t = e.flags),
          (t & 65536) !== 0 && (t & 128) === 0
            ? ((e.flags = (t & -65537) | 128), e)
            : null
        );
      case 26:
      case 27:
      case 5:
        return za(e), null;
      case 31:
        if (e.memoizedState !== null) {
          if ((Me(e), e.alternate === null)) throw Error(o(340));
          va();
        }
        return (
          (t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
        );
      case 13:
        if (
          (Me(e), (t = e.memoizedState), t !== null && t.dehydrated !== null)
        ) {
          if (e.alternate === null) throw Error(o(340));
          va();
        }
        return (
          (t = e.flags), t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
        );
      case 19:
        return Y(Jt), null;
      case 4:
        return qt(), null;
      case 10:
        return Sn(e.type), null;
      case 22:
      case 23:
        return (
          Me(e),
          _s(),
          t !== null && Y(xa),
          (t = e.flags),
          t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
        );
      case 24:
        return Sn(Wt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function rm(t, e) {
    switch ((ss(e), e.tag)) {
      case 3:
        Sn(Wt), qt();
        break;
      case 26:
      case 27:
      case 5:
        za(e);
        break;
      case 4:
        qt();
        break;
      case 31:
        e.memoizedState !== null && Me(e);
        break;
      case 13:
        Me(e);
        break;
      case 19:
        Y(Jt);
        break;
      case 10:
        Sn(e.type);
        break;
      case 22:
      case 23:
        Me(e), _s(), t !== null && Y(xa);
        break;
      case 24:
        Sn(Wt);
    }
  }
  function li(t, e) {
    try {
      var n = e.updateQueue,
        a = n !== null ? n.lastEffect : null;
      if (a !== null) {
        var i = a.next;
        n = i;
        do {
          if ((n.tag & t) === t) {
            a = void 0;
            var r = n.create,
              f = n.inst;
            (a = r()), (f.destroy = a);
          }
          n = n.next;
        } while (n !== i);
      }
    } catch (p) {
      wt(e, e.return, p);
    }
  }
  function Wn(t, e, n) {
    try {
      var a = e.updateQueue,
        i = a !== null ? a.lastEffect : null;
      if (i !== null) {
        var r = i.next;
        a = r;
        do {
          if ((a.tag & t) === t) {
            var f = a.inst,
              p = f.destroy;
            if (p !== void 0) {
              (f.destroy = void 0), (i = e);
              var x = n,
                z = p;
              try {
                z();
              } catch (V) {
                wt(i, x, V);
              }
            }
          }
          a = a.next;
        } while (a !== r);
      }
    } catch (V) {
      wt(e, e.return, V);
    }
  }
  function sm(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var n = t.stateNode;
      try {
        If(e, n);
      } catch (a) {
        wt(t, t.return, a);
      }
    }
  }
  function om(t, e, n) {
    (n.props = Ra(t.type, t.memoizedProps)), (n.state = t.memoizedState);
    try {
      n.componentWillUnmount();
    } catch (a) {
      wt(t, e, a);
    }
  }
  function ii(t, e) {
    try {
      var n = t.ref;
      if (n !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var a = t.stateNode;
            break;
          case 30:
            a = t.stateNode;
            break;
          default:
            a = t.stateNode;
        }
        typeof n == "function" ? (t.refCleanup = n(a)) : (n.current = a);
      }
    } catch (i) {
      wt(t, e, i);
    }
  }
  function rn(t, e) {
    var n = t.ref,
      a = t.refCleanup;
    if (n !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (i) {
          wt(t, e, i);
        } finally {
          (t.refCleanup = null),
            (t = t.alternate),
            t != null && (t.refCleanup = null);
        }
      else if (typeof n == "function")
        try {
          n(null);
        } catch (i) {
          wt(t, e, i);
        }
      else n.current = null;
  }
  function cm(t) {
    var e = t.type,
      n = t.memoizedProps,
      a = t.stateNode;
    try {
      t: switch (e) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          n.autoFocus && a.focus();
          break t;
        case "img":
          n.src ? (a.src = n.src) : n.srcSet && (a.srcset = n.srcSet);
      }
    } catch (i) {
      wt(t, t.return, i);
    }
  }
  function eo(t, e, n) {
    try {
      var a = t.stateNode;
      Sg(a, t.type, n, e), (a[Se] = e);
    } catch (i) {
      wt(t, t.return, i);
    }
  }
  function fm(t) {
    return (
      t.tag === 5 ||
      t.tag === 3 ||
      t.tag === 26 ||
      (t.tag === 27 && la(t.type)) ||
      t.tag === 4
    );
  }
  function no(t) {
    t: for (;;) {
      for (; t.sibling === null; ) {
        if (t.return === null || fm(t.return)) return null;
        t = t.return;
      }
      for (
        t.sibling.return = t.return, t = t.sibling;
        t.tag !== 5 && t.tag !== 6 && t.tag !== 18;

      ) {
        if (
          (t.tag === 27 && la(t.type)) ||
          t.flags & 2 ||
          t.child === null ||
          t.tag === 4
        )
          continue t;
        (t.child.return = t), (t = t.child);
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function ao(t, e, n) {
    var a = t.tag;
    if (a === 5 || a === 6)
      (t = t.stateNode),
        e
          ? (n.nodeType === 9
              ? n.body
              : n.nodeName === "HTML"
              ? n.ownerDocument.body
              : n
            ).insertBefore(t, e)
          : ((e =
              n.nodeType === 9
                ? n.body
                : n.nodeName === "HTML"
                ? n.ownerDocument.body
                : n),
            e.appendChild(t),
            (n = n._reactRootContainer),
            n != null || e.onclick !== null || (e.onclick = yn));
    else if (
      a !== 4 &&
      (a === 27 && la(t.type) && ((n = t.stateNode), (e = null)),
      (t = t.child),
      t !== null)
    )
      for (ao(t, e, n), t = t.sibling; t !== null; )
        ao(t, e, n), (t = t.sibling);
  }
  function wu(t, e, n) {
    var a = t.tag;
    if (a === 5 || a === 6)
      (t = t.stateNode), e ? n.insertBefore(t, e) : n.appendChild(t);
    else if (
      a !== 4 &&
      (a === 27 && la(t.type) && (n = t.stateNode), (t = t.child), t !== null)
    )
      for (wu(t, e, n), t = t.sibling; t !== null; )
        wu(t, e, n), (t = t.sibling);
  }
  function dm(t) {
    var e = t.stateNode,
      n = t.memoizedProps;
    try {
      for (var a = t.type, i = e.attributes; i.length; )
        e.removeAttributeNode(i[0]);
      he(e, a, n), (e[ce] = t), (e[Se] = n);
    } catch (r) {
      wt(t, t.return, r);
    }
  }
  var An = !1,
    te = !1,
    lo = !1,
    mm = typeof WeakSet == "function" ? WeakSet : Set,
    ue = null;
  function P0(t, e) {
    if (((t = t.containerInfo), (Ro = Wu), (t = Af(t)), Wr(t))) {
      if ("selectionStart" in t)
        var n = { start: t.selectionStart, end: t.selectionEnd };
      else
        t: {
          n = ((n = t.ownerDocument) && n.defaultView) || window;
          var a = n.getSelection && n.getSelection();
          if (a && a.rangeCount !== 0) {
            n = a.anchorNode;
            var i = a.anchorOffset,
              r = a.focusNode;
            a = a.focusOffset;
            try {
              n.nodeType, r.nodeType;
            } catch {
              n = null;
              break t;
            }
            var f = 0,
              p = -1,
              x = -1,
              z = 0,
              V = 0,
              Q = t,
              M = null;
            e: for (;;) {
              for (
                var H;
                Q !== n || (i !== 0 && Q.nodeType !== 3) || (p = f + i),
                  Q !== r || (a !== 0 && Q.nodeType !== 3) || (x = f + a),
                  Q.nodeType === 3 && (f += Q.nodeValue.length),
                  (H = Q.firstChild) !== null;

              )
                (M = Q), (Q = H);
              for (;;) {
                if (Q === t) break e;
                if (
                  (M === n && ++z === i && (p = f),
                  M === r && ++V === a && (x = f),
                  (H = Q.nextSibling) !== null)
                )
                  break;
                (Q = M), (M = Q.parentNode);
              }
              Q = H;
            }
            n = p === -1 || x === -1 ? null : { start: p, end: x };
          } else n = null;
        }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (
      Oo = { focusedElem: t, selectionRange: n }, Wu = !1, ue = e;
      ue !== null;

    )
      if (
        ((e = ue), (t = e.child), (e.subtreeFlags & 1028) !== 0 && t !== null)
      )
        (t.return = e), (ue = t);
      else
        for (; ue !== null; ) {
          switch (((e = ue), (r = e.alternate), (t = e.flags), e.tag)) {
            case 0:
              if (
                (t & 4) !== 0 &&
                ((t = e.updateQueue),
                (t = t !== null ? t.events : null),
                t !== null)
              )
                for (n = 0; n < t.length; n++)
                  (i = t[n]), (i.ref.impl = i.nextImpl);
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && r !== null) {
                (t = void 0),
                  (n = e),
                  (i = r.memoizedProps),
                  (r = r.memoizedState),
                  (a = n.stateNode);
                try {
                  var et = Ra(n.type, i);
                  (t = a.getSnapshotBeforeUpdate(et, r)),
                    (a.__reactInternalSnapshotBeforeUpdate = t);
                } catch (rt) {
                  wt(n, n.return, rt);
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (
                  ((t = e.stateNode.containerInfo), (n = t.nodeType), n === 9)
                )
                  wo(t);
                else if (n === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      wo(t);
                      break;
                    default:
                      t.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((t & 1024) !== 0) throw Error(o(163));
          }
          if (((t = e.sibling), t !== null)) {
            (t.return = e.return), (ue = t);
            break;
          }
          ue = e.return;
        }
  }
  function hm(t, e, n) {
    var a = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        On(t, n), a & 4 && li(5, n);
        break;
      case 1:
        if ((On(t, n), a & 4))
          if (((t = n.stateNode), e === null))
            try {
              t.componentDidMount();
            } catch (f) {
              wt(n, n.return, f);
            }
          else {
            var i = Ra(n.type, e.memoizedProps);
            e = e.memoizedState;
            try {
              t.componentDidUpdate(i, e, t.__reactInternalSnapshotBeforeUpdate);
            } catch (f) {
              wt(n, n.return, f);
            }
          }
        a & 64 && sm(n), a & 512 && ii(n, n.return);
        break;
      case 3:
        if ((On(t, n), a & 64 && ((t = n.updateQueue), t !== null))) {
          if (((e = null), n.child !== null))
            switch (n.child.tag) {
              case 27:
              case 5:
                e = n.child.stateNode;
                break;
              case 1:
                e = n.child.stateNode;
            }
          try {
            If(t, e);
          } catch (f) {
            wt(n, n.return, f);
          }
        }
        break;
      case 27:
        e === null && a & 4 && dm(n);
      case 26:
      case 5:
        On(t, n), e === null && a & 4 && cm(n), a & 512 && ii(n, n.return);
        break;
      case 12:
        On(t, n);
        break;
      case 31:
        On(t, n), a & 4 && gm(t, n);
        break;
      case 13:
        On(t, n),
          a & 4 && vm(t, n),
          a & 64 &&
            ((t = n.memoizedState),
            t !== null &&
              ((t = t.dehydrated),
              t !== null && ((n = sg.bind(null, n)), jg(t, n))));
        break;
      case 22:
        if (((a = n.memoizedState !== null || An), !a)) {
          (e = (e !== null && e.memoizedState !== null) || te), (i = An);
          var r = te;
          (An = a),
            (te = e) && !r ? jn(t, n, (n.subtreeFlags & 8772) !== 0) : On(t, n),
            (An = i),
            (te = r);
        }
        break;
      case 30:
        break;
      default:
        On(t, n);
    }
  }
  function ym(t) {
    var e = t.alternate;
    e !== null && ((t.alternate = null), ym(e)),
      (t.child = null),
      (t.deletions = null),
      (t.sibling = null),
      t.tag === 5 && ((e = t.stateNode), e !== null && Mr(e)),
      (t.stateNode = null),
      (t.return = null),
      (t.dependencies = null),
      (t.memoizedProps = null),
      (t.memoizedState = null),
      (t.pendingProps = null),
      (t.stateNode = null),
      (t.updateQueue = null);
  }
  var Gt = null,
    Ee = !1;
  function Rn(t, e, n) {
    for (n = n.child; n !== null; ) pm(t, e, n), (n = n.sibling);
  }
  function pm(t, e, n) {
    if (Ce && typeof Ce.onCommitFiberUnmount == "function")
      try {
        Ce.onCommitFiberUnmount(Cl, n);
      } catch {}
    switch (n.tag) {
      case 26:
        te || rn(n, e),
          Rn(t, e, n),
          n.memoizedState
            ? n.memoizedState.count--
            : n.stateNode && ((n = n.stateNode), n.parentNode.removeChild(n));
        break;
      case 27:
        te || rn(n, e);
        var a = Gt,
          i = Ee;
        la(n.type) && ((Gt = n.stateNode), (Ee = !1)),
          Rn(t, e, n),
          hi(n.stateNode),
          (Gt = a),
          (Ee = i);
        break;
      case 5:
        te || rn(n, e);
      case 6:
        if (
          ((a = Gt),
          (i = Ee),
          (Gt = null),
          Rn(t, e, n),
          (Gt = a),
          (Ee = i),
          Gt !== null)
        )
          if (Ee)
            try {
              (Gt.nodeType === 9
                ? Gt.body
                : Gt.nodeName === "HTML"
                ? Gt.ownerDocument.body
                : Gt
              ).removeChild(n.stateNode);
            } catch (r) {
              wt(n, e, r);
            }
          else
            try {
              Gt.removeChild(n.stateNode);
            } catch (r) {
              wt(n, e, r);
            }
        break;
      case 18:
        Gt !== null &&
          (Ee
            ? ((t = Gt),
              sh(
                t.nodeType === 9
                  ? t.body
                  : t.nodeName === "HTML"
                  ? t.ownerDocument.body
                  : t,
                n.stateNode
              ),
              gl(t))
            : sh(Gt, n.stateNode));
        break;
      case 4:
        (a = Gt),
          (i = Ee),
          (Gt = n.stateNode.containerInfo),
          (Ee = !0),
          Rn(t, e, n),
          (Gt = a),
          (Ee = i);
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Wn(2, n, e), te || Wn(4, n, e), Rn(t, e, n);
        break;
      case 1:
        te ||
          (rn(n, e),
          (a = n.stateNode),
          typeof a.componentWillUnmount == "function" && om(n, e, a)),
          Rn(t, e, n);
        break;
      case 21:
        Rn(t, e, n);
        break;
      case 22:
        (te = (a = te) || n.memoizedState !== null), Rn(t, e, n), (te = a);
        break;
      default:
        Rn(t, e, n);
    }
  }
  function gm(t, e) {
    if (
      e.memoizedState === null &&
      ((t = e.alternate), t !== null && ((t = t.memoizedState), t !== null))
    ) {
      t = t.dehydrated;
      try {
        gl(t);
      } catch (n) {
        wt(e, e.return, n);
      }
    }
  }
  function vm(t, e) {
    if (
      e.memoizedState === null &&
      ((t = e.alternate),
      t !== null &&
        ((t = t.memoizedState), t !== null && ((t = t.dehydrated), t !== null)))
    )
      try {
        gl(t);
      } catch (n) {
        wt(e, e.return, n);
      }
  }
  function tg(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var e = t.stateNode;
        return e === null && (e = t.stateNode = new mm()), e;
      case 22:
        return (
          (t = t.stateNode),
          (e = t._retryCache),
          e === null && (e = t._retryCache = new mm()),
          e
        );
      default:
        throw Error(o(435, t.tag));
    }
  }
  function Du(t, e) {
    var n = tg(t);
    e.forEach(function (a) {
      if (!n.has(a)) {
        n.add(a);
        var i = og.bind(null, t, a);
        a.then(i, i);
      }
    });
  }
  function _e(t, e) {
    var n = e.deletions;
    if (n !== null)
      for (var a = 0; a < n.length; a++) {
        var i = n[a],
          r = t,
          f = e,
          p = f;
        t: for (; p !== null; ) {
          switch (p.tag) {
            case 27:
              if (la(p.type)) {
                (Gt = p.stateNode), (Ee = !1);
                break t;
              }
              break;
            case 5:
              (Gt = p.stateNode), (Ee = !1);
              break t;
            case 3:
            case 4:
              (Gt = p.stateNode.containerInfo), (Ee = !0);
              break t;
          }
          p = p.return;
        }
        if (Gt === null) throw Error(o(160));
        pm(r, f, i),
          (Gt = null),
          (Ee = !1),
          (r = i.alternate),
          r !== null && (r.return = null),
          (i.return = null);
      }
    if (e.subtreeFlags & 13886)
      for (e = e.child; e !== null; ) bm(e, t), (e = e.sibling);
  }
  var Fe = null;
  function bm(t, e) {
    var n = t.alternate,
      a = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        _e(e, t),
          Te(t),
          a & 4 && (Wn(3, t, t.return), li(3, t), Wn(5, t, t.return));
        break;
      case 1:
        _e(e, t),
          Te(t),
          a & 512 && (te || n === null || rn(n, n.return)),
          a & 64 &&
            An &&
            ((t = t.updateQueue),
            t !== null &&
              ((a = t.callbacks),
              a !== null &&
                ((n = t.shared.hiddenCallbacks),
                (t.shared.hiddenCallbacks = n === null ? a : n.concat(a)))));
        break;
      case 26:
        var i = Fe;
        if (
          (_e(e, t),
          Te(t),
          a & 512 && (te || n === null || rn(n, n.return)),
          a & 4)
        ) {
          var r = n !== null ? n.memoizedState : null;
          if (((a = t.memoizedState), n === null))
            if (a === null)
              if (t.stateNode === null) {
                t: {
                  (a = t.type),
                    (n = t.memoizedProps),
                    (i = i.ownerDocument || i);
                  e: switch (a) {
                    case "title":
                      (r = i.getElementsByTagName("title")[0]),
                        (!r ||
                          r[zl] ||
                          r[ce] ||
                          r.namespaceURI === "http://www.w3.org/2000/svg" ||
                          r.hasAttribute("itemprop")) &&
                          ((r = i.createElement(a)),
                          i.head.insertBefore(
                            r,
                            i.querySelector("head > title")
                          )),
                        he(r, a, n),
                        (r[ce] = t),
                        ie(r),
                        (a = r);
                      break t;
                    case "link":
                      var f = bh("link", "href", i).get(a + (n.href || ""));
                      if (f) {
                        for (var p = 0; p < f.length; p++)
                          if (
                            ((r = f[p]),
                            r.getAttribute("href") ===
                              (n.href == null || n.href === ""
                                ? null
                                : n.href) &&
                              r.getAttribute("rel") ===
                                (n.rel == null ? null : n.rel) &&
                              r.getAttribute("title") ===
                                (n.title == null ? null : n.title) &&
                              r.getAttribute("crossorigin") ===
                                (n.crossOrigin == null ? null : n.crossOrigin))
                          ) {
                            f.splice(p, 1);
                            break e;
                          }
                      }
                      (r = i.createElement(a)),
                        he(r, a, n),
                        i.head.appendChild(r);
                      break;
                    case "meta":
                      if (
                        (f = bh("meta", "content", i).get(
                          a + (n.content || "")
                        ))
                      ) {
                        for (p = 0; p < f.length; p++)
                          if (
                            ((r = f[p]),
                            r.getAttribute("content") ===
                              (n.content == null ? null : "" + n.content) &&
                              r.getAttribute("name") ===
                                (n.name == null ? null : n.name) &&
                              r.getAttribute("property") ===
                                (n.property == null ? null : n.property) &&
                              r.getAttribute("http-equiv") ===
                                (n.httpEquiv == null ? null : n.httpEquiv) &&
                              r.getAttribute("charset") ===
                                (n.charSet == null ? null : n.charSet))
                          ) {
                            f.splice(p, 1);
                            break e;
                          }
                      }
                      (r = i.createElement(a)),
                        he(r, a, n),
                        i.head.appendChild(r);
                      break;
                    default:
                      throw Error(o(468, a));
                  }
                  (r[ce] = t), ie(r), (a = r);
                }
                t.stateNode = a;
              } else Sh(i, t.type, t.stateNode);
            else t.stateNode = vh(i, a, t.memoizedProps);
          else
            r !== a
              ? (r === null
                  ? n.stateNode !== null &&
                    ((n = n.stateNode), n.parentNode.removeChild(n))
                  : r.count--,
                a === null
                  ? Sh(i, t.type, t.stateNode)
                  : vh(i, a, t.memoizedProps))
              : a === null &&
                t.stateNode !== null &&
                eo(t, t.memoizedProps, n.memoizedProps);
        }
        break;
      case 27:
        _e(e, t),
          Te(t),
          a & 512 && (te || n === null || rn(n, n.return)),
          n !== null && a & 4 && eo(t, t.memoizedProps, n.memoizedProps);
        break;
      case 5:
        if (
          (_e(e, t),
          Te(t),
          a & 512 && (te || n === null || rn(n, n.return)),
          t.flags & 32)
        ) {
          i = t.stateNode;
          try {
            Ya(i, "");
          } catch (et) {
            wt(t, t.return, et);
          }
        }
        a & 4 &&
          t.stateNode != null &&
          ((i = t.memoizedProps), eo(t, i, n !== null ? n.memoizedProps : i)),
          a & 1024 && (lo = !0);
        break;
      case 6:
        if ((_e(e, t), Te(t), a & 4)) {
          if (t.stateNode === null) throw Error(o(162));
          (a = t.memoizedProps), (n = t.stateNode);
          try {
            n.nodeValue = a;
          } catch (et) {
            wt(t, t.return, et);
          }
        }
        break;
      case 3:
        if (
          ((Ku = null),
          (i = Fe),
          (Fe = Zu(e.containerInfo)),
          _e(e, t),
          (Fe = i),
          Te(t),
          a & 4 && n !== null && n.memoizedState.isDehydrated)
        )
          try {
            gl(e.containerInfo);
          } catch (et) {
            wt(t, t.return, et);
          }
        lo && ((lo = !1), Sm(t));
        break;
      case 4:
        (a = Fe),
          (Fe = Zu(t.stateNode.containerInfo)),
          _e(e, t),
          Te(t),
          (Fe = a);
        break;
      case 12:
        _e(e, t), Te(t);
        break;
      case 31:
        _e(e, t),
          Te(t),
          a & 4 &&
            ((a = t.updateQueue),
            a !== null && ((t.updateQueue = null), Du(t, a)));
        break;
      case 13:
        _e(e, t),
          Te(t),
          t.child.flags & 8192 &&
            (t.memoizedState !== null) !=
              (n !== null && n.memoizedState !== null) &&
            (Nu = Qt()),
          a & 4 &&
            ((a = t.updateQueue),
            a !== null && ((t.updateQueue = null), Du(t, a)));
        break;
      case 22:
        i = t.memoizedState !== null;
        var x = n !== null && n.memoizedState !== null,
          z = An,
          V = te;
        if (
          ((An = z || i),
          (te = V || x),
          _e(e, t),
          (te = V),
          (An = z),
          Te(t),
          a & 8192)
        )
          t: for (
            e = t.stateNode,
              e._visibility = i ? e._visibility & -2 : e._visibility | 1,
              i && (n === null || x || An || te || Oa(t)),
              n = null,
              e = t;
            ;

          ) {
            if (e.tag === 5 || e.tag === 26) {
              if (n === null) {
                x = n = e;
                try {
                  if (((r = x.stateNode), i))
                    (f = r.style),
                      typeof f.setProperty == "function"
                        ? f.setProperty("display", "none", "important")
                        : (f.display = "none");
                  else {
                    p = x.stateNode;
                    var Q = x.memoizedProps.style,
                      M =
                        Q != null && Q.hasOwnProperty("display")
                          ? Q.display
                          : null;
                    p.style.display =
                      M == null || typeof M == "boolean" ? "" : ("" + M).trim();
                  }
                } catch (et) {
                  wt(x, x.return, et);
                }
              }
            } else if (e.tag === 6) {
              if (n === null) {
                x = e;
                try {
                  x.stateNode.nodeValue = i ? "" : x.memoizedProps;
                } catch (et) {
                  wt(x, x.return, et);
                }
              }
            } else if (e.tag === 18) {
              if (n === null) {
                x = e;
                try {
                  var H = x.stateNode;
                  i ? oh(H, !0) : oh(x.stateNode, !1);
                } catch (et) {
                  wt(x, x.return, et);
                }
              }
            } else if (
              ((e.tag !== 22 && e.tag !== 23) ||
                e.memoizedState === null ||
                e === t) &&
              e.child !== null
            ) {
              (e.child.return = e), (e = e.child);
              continue;
            }
            if (e === t) break t;
            for (; e.sibling === null; ) {
              if (e.return === null || e.return === t) break t;
              n === e && (n = null), (e = e.return);
            }
            n === e && (n = null),
              (e.sibling.return = e.return),
              (e = e.sibling);
          }
        a & 4 &&
          ((a = t.updateQueue),
          a !== null &&
            ((n = a.retryQueue),
            n !== null && ((a.retryQueue = null), Du(t, n))));
        break;
      case 19:
        _e(e, t),
          Te(t),
          a & 4 &&
            ((a = t.updateQueue),
            a !== null && ((t.updateQueue = null), Du(t, a)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        _e(e, t), Te(t);
    }
  }
  function Te(t) {
    var e = t.flags;
    if (e & 2) {
      try {
        for (var n, a = t.return; a !== null; ) {
          if (fm(a)) {
            n = a;
            break;
          }
          a = a.return;
        }
        if (n == null) throw Error(o(160));
        switch (n.tag) {
          case 27:
            var i = n.stateNode,
              r = no(t);
            wu(t, r, i);
            break;
          case 5:
            var f = n.stateNode;
            n.flags & 32 && (Ya(f, ""), (n.flags &= -33));
            var p = no(t);
            wu(t, p, f);
            break;
          case 3:
          case 4:
            var x = n.stateNode.containerInfo,
              z = no(t);
            ao(t, z, x);
            break;
          default:
            throw Error(o(161));
        }
      } catch (V) {
        wt(t, t.return, V);
      }
      t.flags &= -3;
    }
    e & 4096 && (t.flags &= -4097);
  }
  function Sm(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var e = t;
        Sm(e),
          e.tag === 5 && e.flags & 1024 && e.stateNode.reset(),
          (t = t.sibling);
      }
  }
  function On(t, e) {
    if (e.subtreeFlags & 8772)
      for (e = e.child; e !== null; ) hm(t, e.alternate, e), (e = e.sibling);
  }
  function Oa(t) {
    for (t = t.child; t !== null; ) {
      var e = t;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Wn(4, e, e.return), Oa(e);
          break;
        case 1:
          rn(e, e.return);
          var n = e.stateNode;
          typeof n.componentWillUnmount == "function" && om(e, e.return, n),
            Oa(e);
          break;
        case 27:
          hi(e.stateNode);
        case 26:
        case 5:
          rn(e, e.return), Oa(e);
          break;
        case 22:
          e.memoizedState === null && Oa(e);
          break;
        case 30:
          Oa(e);
          break;
        default:
          Oa(e);
      }
      t = t.sibling;
    }
  }
  function jn(t, e, n) {
    for (n = n && (e.subtreeFlags & 8772) !== 0, e = e.child; e !== null; ) {
      var a = e.alternate,
        i = t,
        r = e,
        f = r.flags;
      switch (r.tag) {
        case 0:
        case 11:
        case 15:
          jn(i, r, n), li(4, r);
          break;
        case 1:
          if (
            (jn(i, r, n),
            (a = r),
            (i = a.stateNode),
            typeof i.componentDidMount == "function")
          )
            try {
              i.componentDidMount();
            } catch (z) {
              wt(a, a.return, z);
            }
          if (((a = r), (i = a.updateQueue), i !== null)) {
            var p = a.stateNode;
            try {
              var x = i.shared.hiddenCallbacks;
              if (x !== null)
                for (i.shared.hiddenCallbacks = null, i = 0; i < x.length; i++)
                  Wf(x[i], p);
            } catch (z) {
              wt(a, a.return, z);
            }
          }
          n && f & 64 && sm(r), ii(r, r.return);
          break;
        case 27:
          dm(r);
        case 26:
        case 5:
          jn(i, r, n), n && a === null && f & 4 && cm(r), ii(r, r.return);
          break;
        case 12:
          jn(i, r, n);
          break;
        case 31:
          jn(i, r, n), n && f & 4 && gm(i, r);
          break;
        case 13:
          jn(i, r, n), n && f & 4 && vm(i, r);
          break;
        case 22:
          r.memoizedState === null && jn(i, r, n), ii(r, r.return);
          break;
        case 30:
          break;
        default:
          jn(i, r, n);
      }
      e = e.sibling;
    }
  }
  function io(t, e) {
    var n = null;
    t !== null &&
      t.memoizedState !== null &&
      t.memoizedState.cachePool !== null &&
      (n = t.memoizedState.cachePool.pool),
      (t = null),
      e.memoizedState !== null &&
        e.memoizedState.cachePool !== null &&
        (t = e.memoizedState.cachePool.pool),
      t !== n && (t != null && t.refCount++, n != null && Zl(n));
  }
  function uo(t, e) {
    (t = null),
      e.alternate !== null && (t = e.alternate.memoizedState.cache),
      (e = e.memoizedState.cache),
      e !== t && (e.refCount++, t != null && Zl(t));
  }
  function We(t, e, n, a) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) xm(t, e, n, a), (e = e.sibling);
  }
  function xm(t, e, n, a) {
    var i = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        We(t, e, n, a), i & 2048 && li(9, e);
        break;
      case 1:
        We(t, e, n, a);
        break;
      case 3:
        We(t, e, n, a),
          i & 2048 &&
            ((t = null),
            e.alternate !== null && (t = e.alternate.memoizedState.cache),
            (e = e.memoizedState.cache),
            e !== t && (e.refCount++, t != null && Zl(t)));
        break;
      case 12:
        if (i & 2048) {
          We(t, e, n, a), (t = e.stateNode);
          try {
            var r = e.memoizedProps,
              f = r.id,
              p = r.onPostCommit;
            typeof p == "function" &&
              p(
                f,
                e.alternate === null ? "mount" : "update",
                t.passiveEffectDuration,
                -0
              );
          } catch (x) {
            wt(e, e.return, x);
          }
        } else We(t, e, n, a);
        break;
      case 31:
        We(t, e, n, a);
        break;
      case 13:
        We(t, e, n, a);
        break;
      case 23:
        break;
      case 22:
        (r = e.stateNode),
          (f = e.alternate),
          e.memoizedState !== null
            ? r._visibility & 2
              ? We(t, e, n, a)
              : ui(t, e)
            : r._visibility & 2
            ? We(t, e, n, a)
            : ((r._visibility |= 2),
              ul(t, e, n, a, (e.subtreeFlags & 10256) !== 0 || !1)),
          i & 2048 && io(f, e);
        break;
      case 24:
        We(t, e, n, a), i & 2048 && uo(e.alternate, e);
        break;
      default:
        We(t, e, n, a);
    }
  }
  function ul(t, e, n, a, i) {
    for (
      i = i && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child;
      e !== null;

    ) {
      var r = t,
        f = e,
        p = n,
        x = a,
        z = f.flags;
      switch (f.tag) {
        case 0:
        case 11:
        case 15:
          ul(r, f, p, x, i), li(8, f);
          break;
        case 23:
          break;
        case 22:
          var V = f.stateNode;
          f.memoizedState !== null
            ? V._visibility & 2
              ? ul(r, f, p, x, i)
              : ui(r, f)
            : ((V._visibility |= 2), ul(r, f, p, x, i)),
            i && z & 2048 && io(f.alternate, f);
          break;
        case 24:
          ul(r, f, p, x, i), i && z & 2048 && uo(f.alternate, f);
          break;
        default:
          ul(r, f, p, x, i);
      }
      e = e.sibling;
    }
  }
  function ui(t, e) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) {
        var n = t,
          a = e,
          i = a.flags;
        switch (a.tag) {
          case 22:
            ui(n, a), i & 2048 && io(a.alternate, a);
            break;
          case 24:
            ui(n, a), i & 2048 && uo(a.alternate, a);
            break;
          default:
            ui(n, a);
        }
        e = e.sibling;
      }
  }
  var ri = 8192;
  function rl(t, e, n) {
    if (t.subtreeFlags & ri)
      for (t = t.child; t !== null; ) Em(t, e, n), (t = t.sibling);
  }
  function Em(t, e, n) {
    switch (t.tag) {
      case 26:
        rl(t, e, n),
          t.flags & ri &&
            t.memoizedState !== null &&
            Yg(n, Fe, t.memoizedState, t.memoizedProps);
        break;
      case 5:
        rl(t, e, n);
        break;
      case 3:
      case 4:
        var a = Fe;
        (Fe = Zu(t.stateNode.containerInfo)), rl(t, e, n), (Fe = a);
        break;
      case 22:
        t.memoizedState === null &&
          ((a = t.alternate),
          a !== null && a.memoizedState !== null
            ? ((a = ri), (ri = 16777216), rl(t, e, n), (ri = a))
            : rl(t, e, n));
        break;
      default:
        rl(t, e, n);
    }
  }
  function _m(t) {
    var e = t.alternate;
    if (e !== null && ((t = e.child), t !== null)) {
      e.child = null;
      do (e = t.sibling), (t.sibling = null), (t = e);
      while (t !== null);
    }
  }
  function si(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var n = 0; n < e.length; n++) {
          var a = e[n];
          (ue = a), Am(a, t);
        }
      _m(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) Tm(t), (t = t.sibling);
  }
  function Tm(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        si(t), t.flags & 2048 && Wn(9, t, t.return);
        break;
      case 3:
        si(t);
        break;
      case 12:
        si(t);
        break;
      case 22:
        var e = t.stateNode;
        t.memoizedState !== null &&
        e._visibility & 2 &&
        (t.return === null || t.return.tag !== 13)
          ? ((e._visibility &= -3), zu(t))
          : si(t);
        break;
      default:
        si(t);
    }
  }
  function zu(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var n = 0; n < e.length; n++) {
          var a = e[n];
          (ue = a), Am(a, t);
        }
      _m(t);
    }
    for (t = t.child; t !== null; ) {
      switch (((e = t), e.tag)) {
        case 0:
        case 11:
        case 15:
          Wn(8, e, e.return), zu(e);
          break;
        case 22:
          (n = e.stateNode),
            n._visibility & 2 && ((n._visibility &= -3), zu(e));
          break;
        default:
          zu(e);
      }
      t = t.sibling;
    }
  }
  function Am(t, e) {
    for (; ue !== null; ) {
      var n = ue;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          Wn(8, n, e);
          break;
        case 23:
        case 22:
          if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
            var a = n.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          Zl(n.memoizedState.cache);
      }
      if (((a = n.child), a !== null)) (a.return = n), (ue = a);
      else
        t: for (n = t; ue !== null; ) {
          a = ue;
          var i = a.sibling,
            r = a.return;
          if ((ym(a), a === n)) {
            ue = null;
            break t;
          }
          if (i !== null) {
            (i.return = r), (ue = i);
            break t;
          }
          ue = r;
        }
    }
  }
  var eg = {
      getCacheForType: function (t) {
        var e = de(Wt),
          n = e.data.get(t);
        return n === void 0 && ((n = t()), e.data.set(t, n)), n;
      },
      cacheSignal: function () {
        return de(Wt).controller.signal;
      },
    },
    ng = typeof WeakMap == "function" ? WeakMap : Map,
    Ot = 0,
    Mt = null,
    bt = null,
    xt = 0,
    Ct = 0,
    Ue = null,
    In = !1,
    sl = !1,
    ro = !1,
    Cn = 0,
    Kt = 0,
    Pn = 0,
    ja = 0,
    so = 0,
    Be = 0,
    ol = 0,
    oi = null,
    Ae = null,
    oo = !1,
    Nu = 0,
    Rm = 0,
    Mu = 1 / 0,
    Uu = null,
    ta = null,
    le = 0,
    ea = null,
    cl = null,
    wn = 0,
    co = 0,
    fo = null,
    Om = null,
    ci = 0,
    mo = null;
  function Le() {
    return (Ot & 2) !== 0 && xt !== 0 ? xt & -xt : R.T !== null ? bo() : Vc();
  }
  function jm() {
    if (Be === 0)
      if ((xt & 536870912) === 0 || _t) {
        var t = Xi;
        (Xi <<= 1), (Xi & 3932160) === 0 && (Xi = 262144), (Be = t);
      } else Be = 536870912;
    return (t = Ne.current), t !== null && (t.flags |= 32), Be;
  }
  function Re(t, e, n) {
    ((t === Mt && (Ct === 2 || Ct === 9)) || t.cancelPendingCommit !== null) &&
      (fl(t, 0), na(t, xt, Be, !1)),
      Dl(t, n),
      ((Ot & 2) === 0 || t !== Mt) &&
        (t === Mt &&
          ((Ot & 2) === 0 && (ja |= n), Kt === 4 && na(t, xt, Be, !1)),
        sn(t));
  }
  function Cm(t, e, n) {
    if ((Ot & 6) !== 0) throw Error(o(327));
    var a = (!n && (e & 127) === 0 && (e & t.expiredLanes) === 0) || wl(t, e),
      i = a ? ig(t, e) : yo(t, e, !0),
      r = a;
    do {
      if (i === 0) {
        sl && !a && na(t, e, 0, !1);
        break;
      } else {
        if (((n = t.current.alternate), r && !ag(n))) {
          (i = yo(t, e, !1)), (r = !1);
          continue;
        }
        if (i === 2) {
          if (((r = e), t.errorRecoveryDisabledLanes & r)) var f = 0;
          else
            (f = t.pendingLanes & -536870913),
              (f = f !== 0 ? f : f & 536870912 ? 536870912 : 0);
          if (f !== 0) {
            e = f;
            t: {
              var p = t;
              i = oi;
              var x = p.current.memoizedState.isDehydrated;
              if ((x && (fl(p, f).flags |= 256), (f = yo(p, f, !1)), f !== 2)) {
                if (ro && !x) {
                  (p.errorRecoveryDisabledLanes |= r), (ja |= r), (i = 4);
                  break t;
                }
                (r = Ae),
                  (Ae = i),
                  r !== null && (Ae === null ? (Ae = r) : Ae.push.apply(Ae, r));
              }
              i = f;
            }
            if (((r = !1), i !== 2)) continue;
          }
        }
        if (i === 1) {
          fl(t, 0), na(t, e, 0, !0);
          break;
        }
        t: {
          switch (((a = t), (r = i), r)) {
            case 0:
            case 1:
              throw Error(o(345));
            case 4:
              if ((e & 4194048) !== e) break;
            case 6:
              na(a, e, Be, !In);
              break t;
            case 2:
              Ae = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(o(329));
          }
          if ((e & 62914560) === e && ((i = Nu + 300 - Qt()), 10 < i)) {
            if ((na(a, e, Be, !In), Zi(a, 0, !0) !== 0)) break t;
            (wn = e),
              (a.timeoutHandle = uh(
                wm.bind(
                  null,
                  a,
                  n,
                  Ae,
                  Uu,
                  oo,
                  e,
                  Be,
                  ja,
                  ol,
                  In,
                  r,
                  "Throttled",
                  -0,
                  0
                ),
                i
              ));
            break t;
          }
          wm(a, n, Ae, Uu, oo, e, Be, ja, ol, In, r, null, -0, 0);
        }
      }
      break;
    } while (!0);
    sn(t);
  }
  function wm(t, e, n, a, i, r, f, p, x, z, V, Q, M, H) {
    if (
      ((t.timeoutHandle = -1),
      (Q = e.subtreeFlags),
      Q & 8192 || (Q & 16785408) === 16785408)
    ) {
      (Q = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: yn,
      }),
        Em(e, r, Q);
      var et =
        (r & 62914560) === r ? Nu - Qt() : (r & 4194048) === r ? Rm - Qt() : 0;
      if (((et = Gg(Q, et)), et !== null)) {
        (wn = r),
          (t.cancelPendingCommit = et(
            Hm.bind(null, t, e, r, n, a, i, f, p, x, V, Q, null, M, H)
          )),
          na(t, r, f, !z);
        return;
      }
    }
    Hm(t, e, r, n, a, i, f, p, x);
  }
  function ag(t) {
    for (var e = t; ; ) {
      var n = e.tag;
      if (
        (n === 0 || n === 11 || n === 15) &&
        e.flags & 16384 &&
        ((n = e.updateQueue), n !== null && ((n = n.stores), n !== null))
      )
        for (var a = 0; a < n.length; a++) {
          var i = n[a],
            r = i.getSnapshot;
          i = i.value;
          try {
            if (!De(r(), i)) return !1;
          } catch {
            return !1;
          }
        }
      if (((n = e.child), e.subtreeFlags & 16384 && n !== null))
        (n.return = e), (e = n);
      else {
        if (e === t) break;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) return !0;
          e = e.return;
        }
        (e.sibling.return = e.return), (e = e.sibling);
      }
    }
    return !0;
  }
  function na(t, e, n, a) {
    (e &= ~so),
      (e &= ~ja),
      (t.suspendedLanes |= e),
      (t.pingedLanes &= ~e),
      a && (t.warmLanes |= e),
      (a = t.expirationTimes);
    for (var i = e; 0 < i; ) {
      var r = 31 - we(i),
        f = 1 << r;
      (a[r] = -1), (i &= ~f);
    }
    n !== 0 && qc(t, n, e);
  }
  function Bu() {
    return (Ot & 6) === 0 ? (fi(0), !1) : !0;
  }
  function ho() {
    if (bt !== null) {
      if (Ct === 0) var t = bt.return;
      else (t = bt), (bn = ba = null), Cs(t), (el = null), (Kl = 0), (t = bt);
      for (; t !== null; ) rm(t.alternate, t), (t = t.return);
      bt = null;
    }
  }
  function fl(t, e) {
    var n = t.timeoutHandle;
    n !== -1 && ((t.timeoutHandle = -1), _g(n)),
      (n = t.cancelPendingCommit),
      n !== null && ((t.cancelPendingCommit = null), n()),
      (wn = 0),
      ho(),
      (Mt = t),
      (bt = n = gn(t.current, null)),
      (xt = e),
      (Ct = 0),
      (Ue = null),
      (In = !1),
      (sl = wl(t, e)),
      (ro = !1),
      (ol = Be = so = ja = Pn = Kt = 0),
      (Ae = oi = null),
      (oo = !1),
      (e & 8) !== 0 && (e |= e & 32);
    var a = t.entangledLanes;
    if (a !== 0)
      for (t = t.entanglements, a &= e; 0 < a; ) {
        var i = 31 - we(a),
          r = 1 << i;
        (e |= t[i]), (a &= ~r);
      }
    return (Cn = e), au(), n;
  }
  function Dm(t, e) {
    (mt = null),
      (R.H = ei),
      e === tl || e === fu
        ? ((e = Kf()), (Ct = 3))
        : e === gs
        ? ((e = Kf()), (Ct = 4))
        : (Ct =
            e === Zs
              ? 8
              : e !== null &&
                typeof e == "object" &&
                typeof e.then == "function"
              ? 6
              : 1),
      (Ue = e),
      bt === null && ((Kt = 1), Au(t, Ge(e, t.current)));
  }
  function zm() {
    var t = Ne.current;
    return t === null
      ? !0
      : (xt & 4194048) === xt
      ? Ze === null
      : (xt & 62914560) === xt || (xt & 536870912) !== 0
      ? t === Ze
      : !1;
  }
  function Nm() {
    var t = R.H;
    return (R.H = ei), t === null ? ei : t;
  }
  function Mm() {
    var t = R.A;
    return (R.A = eg), t;
  }
  function Lu() {
    (Kt = 4),
      In || ((xt & 4194048) !== xt && Ne.current !== null) || (sl = !0),
      ((Pn & 134217727) === 0 && (ja & 134217727) === 0) ||
        Mt === null ||
        na(Mt, xt, Be, !1);
  }
  function yo(t, e, n) {
    var a = Ot;
    Ot |= 2;
    var i = Nm(),
      r = Mm();
    (Mt !== t || xt !== e) && ((Uu = null), fl(t, e)), (e = !1);
    var f = Kt;
    t: do
      try {
        if (Ct !== 0 && bt !== null) {
          var p = bt,
            x = Ue;
          switch (Ct) {
            case 8:
              ho(), (f = 6);
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              Ne.current === null && (e = !0);
              var z = Ct;
              if (((Ct = 0), (Ue = null), dl(t, p, x, z), n && sl)) {
                f = 0;
                break t;
              }
              break;
            default:
              (z = Ct), (Ct = 0), (Ue = null), dl(t, p, x, z);
          }
        }
        lg(), (f = Kt);
        break;
      } catch (V) {
        Dm(t, V);
      }
    while (!0);
    return (
      e && t.shellSuspendCounter++,
      (bn = ba = null),
      (Ot = a),
      (R.H = i),
      (R.A = r),
      bt === null && ((Mt = null), (xt = 0), au()),
      f
    );
  }
  function lg() {
    for (; bt !== null; ) Um(bt);
  }
  function ig(t, e) {
    var n = Ot;
    Ot |= 2;
    var a = Nm(),
      i = Mm();
    Mt !== t || xt !== e
      ? ((Uu = null), (Mu = Qt() + 500), fl(t, e))
      : (sl = wl(t, e));
    t: do
      try {
        if (Ct !== 0 && bt !== null) {
          e = bt;
          var r = Ue;
          e: switch (Ct) {
            case 1:
              (Ct = 0), (Ue = null), dl(t, e, r, 1);
              break;
            case 2:
            case 9:
              if (Zf(r)) {
                (Ct = 0), (Ue = null), Bm(e);
                break;
              }
              (e = function () {
                (Ct !== 2 && Ct !== 9) || Mt !== t || (Ct = 7), sn(t);
              }),
                r.then(e, e);
              break t;
            case 3:
              Ct = 7;
              break t;
            case 4:
              Ct = 5;
              break t;
            case 7:
              Zf(r)
                ? ((Ct = 0), (Ue = null), Bm(e))
                : ((Ct = 0), (Ue = null), dl(t, e, r, 7));
              break;
            case 5:
              var f = null;
              switch (bt.tag) {
                case 26:
                  f = bt.memoizedState;
                case 5:
                case 27:
                  var p = bt;
                  if (f ? xh(f) : p.stateNode.complete) {
                    (Ct = 0), (Ue = null);
                    var x = p.sibling;
                    if (x !== null) bt = x;
                    else {
                      var z = p.return;
                      z !== null ? ((bt = z), Hu(z)) : (bt = null);
                    }
                    break e;
                  }
              }
              (Ct = 0), (Ue = null), dl(t, e, r, 5);
              break;
            case 6:
              (Ct = 0), (Ue = null), dl(t, e, r, 6);
              break;
            case 8:
              ho(), (Kt = 6);
              break t;
            default:
              throw Error(o(462));
          }
        }
        ug();
        break;
      } catch (V) {
        Dm(t, V);
      }
    while (!0);
    return (
      (bn = ba = null),
      (R.H = a),
      (R.A = i),
      (Ot = n),
      bt !== null ? 0 : ((Mt = null), (xt = 0), au(), Kt)
    );
  }
  function ug() {
    for (; bt !== null && !ae(); ) Um(bt);
  }
  function Um(t) {
    var e = im(t.alternate, t, Cn);
    (t.memoizedProps = t.pendingProps), e === null ? Hu(t) : (bt = e);
  }
  function Bm(t) {
    var e = t,
      n = e.alternate;
    switch (e.tag) {
      case 15:
      case 0:
        e = Pd(n, e, e.pendingProps, e.type, void 0, xt);
        break;
      case 11:
        e = Pd(n, e, e.pendingProps, e.type.render, e.ref, xt);
        break;
      case 5:
        Cs(e);
      default:
        rm(n, e), (e = bt = Mf(e, Cn)), (e = im(n, e, Cn));
    }
    (t.memoizedProps = t.pendingProps), e === null ? Hu(t) : (bt = e);
  }
  function dl(t, e, n, a) {
    (bn = ba = null), Cs(e), (el = null), (Kl = 0);
    var i = e.return;
    try {
      if (J0(t, i, e, n, xt)) {
        (Kt = 1), Au(t, Ge(n, t.current)), (bt = null);
        return;
      }
    } catch (r) {
      if (i !== null) throw ((bt = i), r);
      (Kt = 1), Au(t, Ge(n, t.current)), (bt = null);
      return;
    }
    e.flags & 32768
      ? (_t || a === 1
          ? (t = !0)
          : sl || (xt & 536870912) !== 0
          ? (t = !1)
          : ((In = t = !0),
            (a === 2 || a === 9 || a === 3 || a === 6) &&
              ((a = Ne.current),
              a !== null && a.tag === 13 && (a.flags |= 16384))),
        Lm(e, t))
      : Hu(e);
  }
  function Hu(t) {
    var e = t;
    do {
      if ((e.flags & 32768) !== 0) {
        Lm(e, In);
        return;
      }
      t = e.return;
      var n = W0(e.alternate, e, Cn);
      if (n !== null) {
        bt = n;
        return;
      }
      if (((e = e.sibling), e !== null)) {
        bt = e;
        return;
      }
      bt = e = t;
    } while (e !== null);
    Kt === 0 && (Kt = 5);
  }
  function Lm(t, e) {
    do {
      var n = I0(t.alternate, t);
      if (n !== null) {
        (n.flags &= 32767), (bt = n);
        return;
      }
      if (
        ((n = t.return),
        n !== null &&
          ((n.flags |= 32768), (n.subtreeFlags = 0), (n.deletions = null)),
        !e && ((t = t.sibling), t !== null))
      ) {
        bt = t;
        return;
      }
      bt = t = n;
    } while (t !== null);
    (Kt = 6), (bt = null);
  }
  function Hm(t, e, n, a, i, r, f, p, x) {
    t.cancelPendingCommit = null;
    do qu();
    while (le !== 0);
    if ((Ot & 6) !== 0) throw Error(o(327));
    if (e !== null) {
      if (e === t.current) throw Error(o(177));
      if (
        ((r = e.lanes | e.childLanes),
        (r |= ns),
        qp(t, n, r, f, p, x),
        t === Mt && ((bt = Mt = null), (xt = 0)),
        (cl = e),
        (ea = t),
        (wn = n),
        (co = r),
        (fo = i),
        (Om = a),
        (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0
          ? ((t.callbackNode = null),
            (t.callbackPriority = 0),
            cg(oe, function () {
              return Xm(), null;
            }))
          : ((t.callbackNode = null), (t.callbackPriority = 0)),
        (a = (e.flags & 13878) !== 0),
        (e.subtreeFlags & 13878) !== 0 || a)
      ) {
        (a = R.T), (R.T = null), (i = Z.p), (Z.p = 2), (f = Ot), (Ot |= 4);
        try {
          P0(t, e, n);
        } finally {
          (Ot = f), (Z.p = i), (R.T = a);
        }
      }
      (le = 1), qm(), Ym(), Gm();
    }
  }
  function qm() {
    if (le === 1) {
      le = 0;
      var t = ea,
        e = cl,
        n = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || n) {
        (n = R.T), (R.T = null);
        var a = Z.p;
        Z.p = 2;
        var i = Ot;
        Ot |= 4;
        try {
          bm(e, t);
          var r = Oo,
            f = Af(t.containerInfo),
            p = r.focusedElem,
            x = r.selectionRange;
          if (
            f !== p &&
            p &&
            p.ownerDocument &&
            Tf(p.ownerDocument.documentElement, p)
          ) {
            if (x !== null && Wr(p)) {
              var z = x.start,
                V = x.end;
              if ((V === void 0 && (V = z), "selectionStart" in p))
                (p.selectionStart = z),
                  (p.selectionEnd = Math.min(V, p.value.length));
              else {
                var Q = p.ownerDocument || document,
                  M = (Q && Q.defaultView) || window;
                if (M.getSelection) {
                  var H = M.getSelection(),
                    et = p.textContent.length,
                    rt = Math.min(x.start, et),
                    Nt = x.end === void 0 ? rt : Math.min(x.end, et);
                  !H.extend && rt > Nt && ((f = Nt), (Nt = rt), (rt = f));
                  var j = _f(p, rt),
                    A = _f(p, Nt);
                  if (
                    j &&
                    A &&
                    (H.rangeCount !== 1 ||
                      H.anchorNode !== j.node ||
                      H.anchorOffset !== j.offset ||
                      H.focusNode !== A.node ||
                      H.focusOffset !== A.offset)
                  ) {
                    var w = Q.createRange();
                    w.setStart(j.node, j.offset),
                      H.removeAllRanges(),
                      rt > Nt
                        ? (H.addRange(w), H.extend(A.node, A.offset))
                        : (w.setEnd(A.node, A.offset), H.addRange(w));
                  }
                }
              }
            }
            for (Q = [], H = p; (H = H.parentNode); )
              H.nodeType === 1 &&
                Q.push({ element: H, left: H.scrollLeft, top: H.scrollTop });
            for (
              typeof p.focus == "function" && p.focus(), p = 0;
              p < Q.length;
              p++
            ) {
              var X = Q[p];
              (X.element.scrollLeft = X.left), (X.element.scrollTop = X.top);
            }
          }
          (Wu = !!Ro), (Oo = Ro = null);
        } finally {
          (Ot = i), (Z.p = a), (R.T = n);
        }
      }
      (t.current = e), (le = 2);
    }
  }
  function Ym() {
    if (le === 2) {
      le = 0;
      var t = ea,
        e = cl,
        n = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || n) {
        (n = R.T), (R.T = null);
        var a = Z.p;
        Z.p = 2;
        var i = Ot;
        Ot |= 4;
        try {
          hm(t, e.alternate, e);
        } finally {
          (Ot = i), (Z.p = a), (R.T = n);
        }
      }
      le = 3;
    }
  }
  function Gm() {
    if (le === 4 || le === 3) {
      (le = 0), se();
      var t = ea,
        e = cl,
        n = wn,
        a = Om;
      (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0
        ? (le = 5)
        : ((le = 0), (cl = ea = null), Vm(t, t.pendingLanes));
      var i = t.pendingLanes;
      if (
        (i === 0 && (ta = null),
        zr(n),
        (e = e.stateNode),
        Ce && typeof Ce.onCommitFiberRoot == "function")
      )
        try {
          Ce.onCommitFiberRoot(Cl, e, void 0, (e.current.flags & 128) === 128);
        } catch {}
      if (a !== null) {
        (e = R.T), (i = Z.p), (Z.p = 2), (R.T = null);
        try {
          for (var r = t.onRecoverableError, f = 0; f < a.length; f++) {
            var p = a[f];
            r(p.value, { componentStack: p.stack });
          }
        } finally {
          (R.T = e), (Z.p = i);
        }
      }
      (wn & 3) !== 0 && qu(),
        sn(t),
        (i = t.pendingLanes),
        (n & 261930) !== 0 && (i & 42) !== 0
          ? t === mo
            ? ci++
            : ((ci = 0), (mo = t))
          : (ci = 0),
        fi(0);
    }
  }
  function Vm(t, e) {
    (t.pooledCacheLanes &= e) === 0 &&
      ((e = t.pooledCache), e != null && ((t.pooledCache = null), Zl(e)));
  }
  function qu() {
    return qm(), Ym(), Gm(), Xm();
  }
  function Xm() {
    if (le !== 5) return !1;
    var t = ea,
      e = co;
    co = 0;
    var n = zr(wn),
      a = R.T,
      i = Z.p;
    try {
      (Z.p = 32 > n ? 32 : n), (R.T = null), (n = fo), (fo = null);
      var r = ea,
        f = wn;
      if (((le = 0), (cl = ea = null), (wn = 0), (Ot & 6) !== 0))
        throw Error(o(331));
      var p = Ot;
      if (
        ((Ot |= 4),
        Tm(r.current),
        xm(r, r.current, f, n),
        (Ot = p),
        fi(0, !1),
        Ce && typeof Ce.onPostCommitFiberRoot == "function")
      )
        try {
          Ce.onPostCommitFiberRoot(Cl, r);
        } catch {}
      return !0;
    } finally {
      (Z.p = i), (R.T = a), Vm(t, e);
    }
  }
  function Qm(t, e, n) {
    (e = Ge(n, e)),
      (e = Qs(t.stateNode, e, 2)),
      (t = Jn(t, e, 2)),
      t !== null && (Dl(t, 2), sn(t));
  }
  function wt(t, e, n) {
    if (t.tag === 3) Qm(t, t, n);
    else
      for (; e !== null; ) {
        if (e.tag === 3) {
          Qm(e, t, n);
          break;
        } else if (e.tag === 1) {
          var a = e.stateNode;
          if (
            typeof e.type.getDerivedStateFromError == "function" ||
            (typeof a.componentDidCatch == "function" &&
              (ta === null || !ta.has(a)))
          ) {
            (t = Ge(n, t)),
              (n = Zd(2)),
              (a = Jn(e, n, 2)),
              a !== null && (kd(n, a, e, t), Dl(a, 2), sn(a));
            break;
          }
        }
        e = e.return;
      }
  }
  function po(t, e, n) {
    var a = t.pingCache;
    if (a === null) {
      a = t.pingCache = new ng();
      var i = new Set();
      a.set(e, i);
    } else (i = a.get(e)), i === void 0 && ((i = new Set()), a.set(e, i));
    i.has(n) ||
      ((ro = !0), i.add(n), (t = rg.bind(null, t, e, n)), e.then(t, t));
  }
  function rg(t, e, n) {
    var a = t.pingCache;
    a !== null && a.delete(e),
      (t.pingedLanes |= t.suspendedLanes & n),
      (t.warmLanes &= ~n),
      Mt === t &&
        (xt & n) === n &&
        (Kt === 4 || (Kt === 3 && (xt & 62914560) === xt && 300 > Qt() - Nu)
          ? (Ot & 2) === 0 && fl(t, 0)
          : (so |= n),
        ol === xt && (ol = 0)),
      sn(t);
  }
  function Zm(t, e) {
    e === 0 && (e = Hc()), (t = pa(t, e)), t !== null && (Dl(t, e), sn(t));
  }
  function sg(t) {
    var e = t.memoizedState,
      n = 0;
    e !== null && (n = e.retryLane), Zm(t, n);
  }
  function og(t, e) {
    var n = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var a = t.stateNode,
          i = t.memoizedState;
        i !== null && (n = i.retryLane);
        break;
      case 19:
        a = t.stateNode;
        break;
      case 22:
        a = t.stateNode._retryCache;
        break;
      default:
        throw Error(o(314));
    }
    a !== null && a.delete(e), Zm(t, n);
  }
  function cg(t, e) {
    return ve(t, e);
  }
  var Yu = null,
    ml = null,
    go = !1,
    Gu = !1,
    vo = !1,
    aa = 0;
  function sn(t) {
    t !== ml &&
      t.next === null &&
      (ml === null ? (Yu = ml = t) : (ml = ml.next = t)),
      (Gu = !0),
      go || ((go = !0), dg());
  }
  function fi(t, e) {
    if (!vo && Gu) {
      vo = !0;
      do
        for (var n = !1, a = Yu; a !== null; ) {
          if (t !== 0) {
            var i = a.pendingLanes;
            if (i === 0) var r = 0;
            else {
              var f = a.suspendedLanes,
                p = a.pingedLanes;
              (r = (1 << (31 - we(42 | t) + 1)) - 1),
                (r &= i & ~(f & ~p)),
                (r = r & 201326741 ? (r & 201326741) | 1 : r ? r | 2 : 0);
            }
            r !== 0 && ((n = !0), $m(a, r));
          } else
            (r = xt),
              (r = Zi(
                a,
                a === Mt ? r : 0,
                a.cancelPendingCommit !== null || a.timeoutHandle !== -1
              )),
              (r & 3) === 0 || wl(a, r) || ((n = !0), $m(a, r));
          a = a.next;
        }
      while (n);
      vo = !1;
    }
  }
  function fg() {
    km();
  }
  function km() {
    Gu = go = !1;
    var t = 0;
    aa !== 0 && Eg() && (t = aa);
    for (var e = Qt(), n = null, a = Yu; a !== null; ) {
      var i = a.next,
        r = Km(a, e);
      r === 0
        ? ((a.next = null),
          n === null ? (Yu = i) : (n.next = i),
          i === null && (ml = n))
        : ((n = a), (t !== 0 || (r & 3) !== 0) && (Gu = !0)),
        (a = i);
    }
    (le !== 0 && le !== 5) || fi(t), aa !== 0 && (aa = 0);
  }
  function Km(t, e) {
    for (
      var n = t.suspendedLanes,
        a = t.pingedLanes,
        i = t.expirationTimes,
        r = t.pendingLanes & -62914561;
      0 < r;

    ) {
      var f = 31 - we(r),
        p = 1 << f,
        x = i[f];
      x === -1
        ? ((p & n) === 0 || (p & a) !== 0) && (i[f] = Hp(p, e))
        : x <= e && (t.expiredLanes |= p),
        (r &= ~p);
    }
    if (
      ((e = Mt),
      (n = xt),
      (n = Zi(
        t,
        t === e ? n : 0,
        t.cancelPendingCommit !== null || t.timeoutHandle !== -1
      )),
      (a = t.callbackNode),
      n === 0 ||
        (t === e && (Ct === 2 || Ct === 9)) ||
        t.cancelPendingCommit !== null)
    )
      return (
        a !== null && a !== null && an(a),
        (t.callbackNode = null),
        (t.callbackPriority = 0)
      );
    if ((n & 3) === 0 || wl(t, n)) {
      if (((e = n & -n), e === t.callbackPriority)) return e;
      switch ((a !== null && an(a), zr(n))) {
        case 2:
        case 8:
          n = Ol;
          break;
        case 32:
          n = oe;
          break;
        case 268435456:
          n = Na;
          break;
        default:
          n = oe;
      }
      return (
        (a = Jm.bind(null, t)),
        (n = ve(n, a)),
        (t.callbackPriority = e),
        (t.callbackNode = n),
        e
      );
    }
    return (
      a !== null && a !== null && an(a),
      (t.callbackPriority = 2),
      (t.callbackNode = null),
      2
    );
  }
  function Jm(t, e) {
    if (le !== 0 && le !== 5)
      return (t.callbackNode = null), (t.callbackPriority = 0), null;
    var n = t.callbackNode;
    if (qu() && t.callbackNode !== n) return null;
    var a = xt;
    return (
      (a = Zi(
        t,
        t === Mt ? a : 0,
        t.cancelPendingCommit !== null || t.timeoutHandle !== -1
      )),
      a === 0
        ? null
        : (Cm(t, a, e),
          Km(t, Qt()),
          t.callbackNode != null && t.callbackNode === n
            ? Jm.bind(null, t)
            : null)
    );
  }
  function $m(t, e) {
    if (qu()) return null;
    Cm(t, e, !0);
  }
  function dg() {
    Tg(function () {
      (Ot & 6) !== 0 ? ve(Rl, fg) : km();
    });
  }
  function bo() {
    if (aa === 0) {
      var t = Ia;
      t === 0 && ((t = Vi), (Vi <<= 1), (Vi & 261888) === 0 && (Vi = 256)),
        (aa = t);
    }
    return aa;
  }
  function Fm(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean"
      ? null
      : typeof t == "function"
      ? t
      : $i("" + t);
  }
  function Wm(t, e) {
    var n = e.ownerDocument.createElement("input");
    return (
      (n.name = e.name),
      (n.value = e.value),
      t.id && n.setAttribute("form", t.id),
      e.parentNode.insertBefore(n, e),
      (t = new FormData(t)),
      n.parentNode.removeChild(n),
      t
    );
  }
  function mg(t, e, n, a, i) {
    if (e === "submit" && n && n.stateNode === i) {
      var r = Fm((i[Se] || null).action),
        f = a.submitter;
      f &&
        ((e = (e = f[Se] || null)
          ? Fm(e.formAction)
          : f.getAttribute("formAction")),
        e !== null && ((r = e), (f = null)));
      var p = new Pi("action", "action", null, a, i);
      t.push({
        event: p,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (a.defaultPrevented) {
                if (aa !== 0) {
                  var x = f ? Wm(i, f) : new FormData(i);
                  Hs(
                    n,
                    { pending: !0, data: x, method: i.method, action: r },
                    null,
                    x
                  );
                }
              } else
                typeof r == "function" &&
                  (p.preventDefault(),
                  (x = f ? Wm(i, f) : new FormData(i)),
                  Hs(
                    n,
                    { pending: !0, data: x, method: i.method, action: r },
                    r,
                    x
                  ));
            },
            currentTarget: i,
          },
        ],
      });
    }
  }
  for (var So = 0; So < es.length; So++) {
    var xo = es[So],
      hg = xo.toLowerCase(),
      yg = xo[0].toUpperCase() + xo.slice(1);
    $e(hg, "on" + yg);
  }
  $e(jf, "onAnimationEnd"),
    $e(Cf, "onAnimationIteration"),
    $e(wf, "onAnimationStart"),
    $e("dblclick", "onDoubleClick"),
    $e("focusin", "onFocus"),
    $e("focusout", "onBlur"),
    $e(D0, "onTransitionRun"),
    $e(z0, "onTransitionStart"),
    $e(N0, "onTransitionCancel"),
    $e(Df, "onTransitionEnd"),
    Ha("onMouseEnter", ["mouseout", "mouseover"]),
    Ha("onMouseLeave", ["mouseout", "mouseover"]),
    Ha("onPointerEnter", ["pointerout", "pointerover"]),
    Ha("onPointerLeave", ["pointerout", "pointerover"]),
    da(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " "
      )
    ),
    da(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " "
      )
    ),
    da("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    da(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" ")
    ),
    da(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" ")
    ),
    da(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
    );
  var di =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " "
      ),
    pg = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle"
        .split(" ")
        .concat(di)
    );
  function Im(t, e) {
    e = (e & 4) !== 0;
    for (var n = 0; n < t.length; n++) {
      var a = t[n],
        i = a.event;
      a = a.listeners;
      t: {
        var r = void 0;
        if (e)
          for (var f = a.length - 1; 0 <= f; f--) {
            var p = a[f],
              x = p.instance,
              z = p.currentTarget;
            if (((p = p.listener), x !== r && i.isPropagationStopped()))
              break t;
            (r = p), (i.currentTarget = z);
            try {
              r(i);
            } catch (V) {
              nu(V);
            }
            (i.currentTarget = null), (r = x);
          }
        else
          for (f = 0; f < a.length; f++) {
            if (
              ((p = a[f]),
              (x = p.instance),
              (z = p.currentTarget),
              (p = p.listener),
              x !== r && i.isPropagationStopped())
            )
              break t;
            (r = p), (i.currentTarget = z);
            try {
              r(i);
            } catch (V) {
              nu(V);
            }
            (i.currentTarget = null), (r = x);
          }
      }
    }
  }
  function St(t, e) {
    var n = e[Nr];
    n === void 0 && (n = e[Nr] = new Set());
    var a = t + "__bubble";
    n.has(a) || (Pm(e, t, 2, !1), n.add(a));
  }
  function Eo(t, e, n) {
    var a = 0;
    e && (a |= 4), Pm(n, t, a, e);
  }
  var Vu = "_reactListening" + Math.random().toString(36).slice(2);
  function _o(t) {
    if (!t[Vu]) {
      (t[Vu] = !0),
        Zc.forEach(function (n) {
          n !== "selectionchange" && (pg.has(n) || Eo(n, !1, t), Eo(n, !0, t));
        });
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[Vu] || ((e[Vu] = !0), Eo("selectionchange", !1, e));
    }
  }
  function Pm(t, e, n, a) {
    switch (jh(e)) {
      case 2:
        var i = Qg;
        break;
      case 8:
        i = Zg;
        break;
      default:
        i = Ho;
    }
    (n = i.bind(null, e, n, t)),
      (i = void 0),
      !Vr ||
        (e !== "touchstart" && e !== "touchmove" && e !== "wheel") ||
        (i = !0),
      a
        ? i !== void 0
          ? t.addEventListener(e, n, { capture: !0, passive: i })
          : t.addEventListener(e, n, !0)
        : i !== void 0
        ? t.addEventListener(e, n, { passive: i })
        : t.addEventListener(e, n, !1);
  }
  function To(t, e, n, a, i) {
    var r = a;
    if ((e & 1) === 0 && (e & 2) === 0 && a !== null)
      t: for (;;) {
        if (a === null) return;
        var f = a.tag;
        if (f === 3 || f === 4) {
          var p = a.stateNode.containerInfo;
          if (p === i) break;
          if (f === 4)
            for (f = a.return; f !== null; ) {
              var x = f.tag;
              if ((x === 3 || x === 4) && f.stateNode.containerInfo === i)
                return;
              f = f.return;
            }
          for (; p !== null; ) {
            if (((f = Ua(p)), f === null)) return;
            if (((x = f.tag), x === 5 || x === 6 || x === 26 || x === 27)) {
              a = r = f;
              continue t;
            }
            p = p.parentNode;
          }
        }
        a = a.return;
      }
    af(function () {
      var z = r,
        V = Yr(n),
        Q = [];
      t: {
        var M = zf.get(t);
        if (M !== void 0) {
          var H = Pi,
            et = t;
          switch (t) {
            case "keypress":
              if (Wi(n) === 0) break t;
            case "keydown":
            case "keyup":
              H = o0;
              break;
            case "focusin":
              (et = "focus"), (H = kr);
              break;
            case "focusout":
              (et = "blur"), (H = kr);
              break;
            case "beforeblur":
            case "afterblur":
              H = kr;
              break;
            case "click":
              if (n.button === 2) break t;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              H = rf;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              H = Wp;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              H = d0;
              break;
            case jf:
            case Cf:
            case wf:
              H = t0;
              break;
            case Df:
              H = h0;
              break;
            case "scroll":
            case "scrollend":
              H = $p;
              break;
            case "wheel":
              H = p0;
              break;
            case "copy":
            case "cut":
            case "paste":
              H = n0;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              H = of;
              break;
            case "toggle":
            case "beforetoggle":
              H = v0;
          }
          var rt = (e & 4) !== 0,
            Nt = !rt && (t === "scroll" || t === "scrollend"),
            j = rt ? (M !== null ? M + "Capture" : null) : M;
          rt = [];
          for (var A = z, w; A !== null; ) {
            var X = A;
            if (
              ((w = X.stateNode),
              (X = X.tag),
              (X !== 5 && X !== 26 && X !== 27) ||
                w === null ||
                j === null ||
                ((X = Ml(A, j)), X != null && rt.push(mi(A, X, w))),
              Nt)
            )
              break;
            A = A.return;
          }
          0 < rt.length &&
            ((M = new H(M, et, null, n, V)),
            Q.push({ event: M, listeners: rt }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (
            ((M = t === "mouseover" || t === "pointerover"),
            (H = t === "mouseout" || t === "pointerout"),
            M &&
              n !== qr &&
              (et = n.relatedTarget || n.fromElement) &&
              (Ua(et) || et[Ma]))
          )
            break t;
          if (
            (H || M) &&
            ((M =
              V.window === V
                ? V
                : (M = V.ownerDocument)
                ? M.defaultView || M.parentWindow
                : window),
            H
              ? ((et = n.relatedTarget || n.toElement),
                (H = z),
                (et = et ? Ua(et) : null),
                et !== null &&
                  ((Nt = d(et)),
                  (rt = et.tag),
                  et !== Nt || (rt !== 5 && rt !== 27 && rt !== 6)) &&
                  (et = null))
              : ((H = null), (et = z)),
            H !== et)
          ) {
            if (
              ((rt = rf),
              (X = "onMouseLeave"),
              (j = "onMouseEnter"),
              (A = "mouse"),
              (t === "pointerout" || t === "pointerover") &&
                ((rt = of),
                (X = "onPointerLeave"),
                (j = "onPointerEnter"),
                (A = "pointer")),
              (Nt = H == null ? M : Nl(H)),
              (w = et == null ? M : Nl(et)),
              (M = new rt(X, A + "leave", H, n, V)),
              (M.target = Nt),
              (M.relatedTarget = w),
              (X = null),
              Ua(V) === z &&
                ((rt = new rt(j, A + "enter", et, n, V)),
                (rt.target = w),
                (rt.relatedTarget = Nt),
                (X = rt)),
              (Nt = X),
              H && et)
            )
              e: {
                for (rt = gg, j = H, A = et, w = 0, X = j; X; X = rt(X)) w++;
                X = 0;
                for (var it = A; it; it = rt(it)) X++;
                for (; 0 < w - X; ) (j = rt(j)), w--;
                for (; 0 < X - w; ) (A = rt(A)), X--;
                for (; w--; ) {
                  if (j === A || (A !== null && j === A.alternate)) {
                    rt = j;
                    break e;
                  }
                  (j = rt(j)), (A = rt(A));
                }
                rt = null;
              }
            else rt = null;
            H !== null && th(Q, M, H, rt, !1),
              et !== null && Nt !== null && th(Q, Nt, et, rt, !0);
          }
        }
        t: {
          if (
            ((M = z ? Nl(z) : window),
            (H = M.nodeName && M.nodeName.toLowerCase()),
            H === "select" || (H === "input" && M.type === "file"))
          )
            var At = gf;
          else if (yf(M))
            if (vf) At = j0;
            else {
              At = R0;
              var at = A0;
            }
          else
            (H = M.nodeName),
              !H ||
              H.toLowerCase() !== "input" ||
              (M.type !== "checkbox" && M.type !== "radio")
                ? z && Hr(z.elementType) && (At = gf)
                : (At = O0);
          if (At && (At = At(t, z))) {
            pf(Q, At, n, V);
            break t;
          }
          at && at(t, M, z),
            t === "focusout" &&
              z &&
              M.type === "number" &&
              z.memoizedProps.value != null &&
              Lr(M, "number", M.value);
        }
        switch (((at = z ? Nl(z) : window), t)) {
          case "focusin":
            (yf(at) || at.contentEditable === "true") &&
              ((Qa = at), (Ir = z), (Vl = null));
            break;
          case "focusout":
            Vl = Ir = Qa = null;
            break;
          case "mousedown":
            Pr = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            (Pr = !1), Rf(Q, n, V);
            break;
          case "selectionchange":
            if (w0) break;
          case "keydown":
          case "keyup":
            Rf(Q, n, V);
        }
        var pt;
        if (Jr)
          t: {
            switch (t) {
              case "compositionstart":
                var Et = "onCompositionStart";
                break t;
              case "compositionend":
                Et = "onCompositionEnd";
                break t;
              case "compositionupdate":
                Et = "onCompositionUpdate";
                break t;
            }
            Et = void 0;
          }
        else
          Xa
            ? mf(t, n) && (Et = "onCompositionEnd")
            : t === "keydown" &&
              n.keyCode === 229 &&
              (Et = "onCompositionStart");
        Et &&
          (cf &&
            n.locale !== "ko" &&
            (Xa || Et !== "onCompositionStart"
              ? Et === "onCompositionEnd" && Xa && (pt = lf())
              : ((Gn = V),
                (Xr = "value" in Gn ? Gn.value : Gn.textContent),
                (Xa = !0))),
          (at = Xu(z, Et)),
          0 < at.length &&
            ((Et = new sf(Et, t, null, n, V)),
            Q.push({ event: Et, listeners: at }),
            pt
              ? (Et.data = pt)
              : ((pt = hf(n)), pt !== null && (Et.data = pt)))),
          (pt = S0 ? x0(t, n) : E0(t, n)) &&
            ((Et = Xu(z, "onBeforeInput")),
            0 < Et.length &&
              ((at = new sf("onBeforeInput", "beforeinput", null, n, V)),
              Q.push({ event: at, listeners: Et }),
              (at.data = pt))),
          mg(Q, t, z, n, V);
      }
      Im(Q, e);
    });
  }
  function mi(t, e, n) {
    return { instance: t, listener: e, currentTarget: n };
  }
  function Xu(t, e) {
    for (var n = e + "Capture", a = []; t !== null; ) {
      var i = t,
        r = i.stateNode;
      if (
        ((i = i.tag),
        (i !== 5 && i !== 26 && i !== 27) ||
          r === null ||
          ((i = Ml(t, n)),
          i != null && a.unshift(mi(t, i, r)),
          (i = Ml(t, e)),
          i != null && a.push(mi(t, i, r))),
        t.tag === 3)
      )
        return a;
      t = t.return;
    }
    return [];
  }
  function gg(t) {
    if (t === null) return null;
    do t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function th(t, e, n, a, i) {
    for (var r = e._reactName, f = []; n !== null && n !== a; ) {
      var p = n,
        x = p.alternate,
        z = p.stateNode;
      if (((p = p.tag), x !== null && x === a)) break;
      (p !== 5 && p !== 26 && p !== 27) ||
        z === null ||
        ((x = z),
        i
          ? ((z = Ml(n, r)), z != null && f.unshift(mi(n, z, x)))
          : i || ((z = Ml(n, r)), z != null && f.push(mi(n, z, x)))),
        (n = n.return);
    }
    f.length !== 0 && t.push({ event: e, listeners: f });
  }
  var vg = /\r\n?/g,
    bg = /\u0000|\uFFFD/g;
  function eh(t) {
    return (typeof t == "string" ? t : "" + t)
      .replace(
        vg,
        `
`
      )
      .replace(bg, "");
  }
  function nh(t, e) {
    return (e = eh(e)), eh(t) === e;
  }
  function zt(t, e, n, a, i, r) {
    switch (n) {
      case "children":
        typeof a == "string"
          ? e === "body" || (e === "textarea" && a === "") || Ya(t, a)
          : (typeof a == "number" || typeof a == "bigint") &&
            e !== "body" &&
            Ya(t, "" + a);
        break;
      case "className":
        Ki(t, "class", a);
        break;
      case "tabIndex":
        Ki(t, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Ki(t, n, a);
        break;
      case "style":
        ef(t, a, r);
        break;
      case "data":
        if (e !== "object") {
          Ki(t, "data", a);
          break;
        }
      case "src":
      case "href":
        if (a === "" && (e !== "a" || n !== "href")) {
          t.removeAttribute(n);
          break;
        }
        if (
          a == null ||
          typeof a == "function" ||
          typeof a == "symbol" ||
          typeof a == "boolean"
        ) {
          t.removeAttribute(n);
          break;
        }
        (a = $i("" + a)), t.setAttribute(n, a);
        break;
      case "action":
      case "formAction":
        if (typeof a == "function") {
          t.setAttribute(
            n,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof r == "function" &&
            (n === "formAction"
              ? (e !== "input" && zt(t, e, "name", i.name, i, null),
                zt(t, e, "formEncType", i.formEncType, i, null),
                zt(t, e, "formMethod", i.formMethod, i, null),
                zt(t, e, "formTarget", i.formTarget, i, null))
              : (zt(t, e, "encType", i.encType, i, null),
                zt(t, e, "method", i.method, i, null),
                zt(t, e, "target", i.target, i, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          t.removeAttribute(n);
          break;
        }
        (a = $i("" + a)), t.setAttribute(n, a);
        break;
      case "onClick":
        a != null && (t.onclick = yn);
        break;
      case "onScroll":
        a != null && St("scroll", t);
        break;
      case "onScrollEnd":
        a != null && St("scrollend", t);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a)) throw Error(o(61));
          if (((n = a.__html), n != null)) {
            if (i.children != null) throw Error(o(60));
            t.innerHTML = n;
          }
        }
        break;
      case "multiple":
        t.multiple = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "muted":
        t.muted = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (
          a == null ||
          typeof a == "function" ||
          typeof a == "boolean" ||
          typeof a == "symbol"
        ) {
          t.removeAttribute("xlink:href");
          break;
        }
        (n = $i("" + a)),
          t.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        a != null && typeof a != "function" && typeof a != "symbol"
          ? t.setAttribute(n, "" + a)
          : t.removeAttribute(n);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        a && typeof a != "function" && typeof a != "symbol"
          ? t.setAttribute(n, "")
          : t.removeAttribute(n);
        break;
      case "capture":
      case "download":
        a === !0
          ? t.setAttribute(n, "")
          : a !== !1 &&
            a != null &&
            typeof a != "function" &&
            typeof a != "symbol"
          ? t.setAttribute(n, a)
          : t.removeAttribute(n);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        a != null &&
        typeof a != "function" &&
        typeof a != "symbol" &&
        !isNaN(a) &&
        1 <= a
          ? t.setAttribute(n, a)
          : t.removeAttribute(n);
        break;
      case "rowSpan":
      case "start":
        a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a)
          ? t.removeAttribute(n)
          : t.setAttribute(n, a);
        break;
      case "popover":
        St("beforetoggle", t), St("toggle", t), ki(t, "popover", a);
        break;
      case "xlinkActuate":
        hn(t, "http://www.w3.org/1999/xlink", "xlink:actuate", a);
        break;
      case "xlinkArcrole":
        hn(t, "http://www.w3.org/1999/xlink", "xlink:arcrole", a);
        break;
      case "xlinkRole":
        hn(t, "http://www.w3.org/1999/xlink", "xlink:role", a);
        break;
      case "xlinkShow":
        hn(t, "http://www.w3.org/1999/xlink", "xlink:show", a);
        break;
      case "xlinkTitle":
        hn(t, "http://www.w3.org/1999/xlink", "xlink:title", a);
        break;
      case "xlinkType":
        hn(t, "http://www.w3.org/1999/xlink", "xlink:type", a);
        break;
      case "xmlBase":
        hn(t, "http://www.w3.org/XML/1998/namespace", "xml:base", a);
        break;
      case "xmlLang":
        hn(t, "http://www.w3.org/XML/1998/namespace", "xml:lang", a);
        break;
      case "xmlSpace":
        hn(t, "http://www.w3.org/XML/1998/namespace", "xml:space", a);
        break;
      case "is":
        ki(t, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < n.length) ||
          (n[0] !== "o" && n[0] !== "O") ||
          (n[1] !== "n" && n[1] !== "N")) &&
          ((n = Kp.get(n) || n), ki(t, n, a));
    }
  }
  function Ao(t, e, n, a, i, r) {
    switch (n) {
      case "style":
        ef(t, a, r);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a)) throw Error(o(61));
          if (((n = a.__html), n != null)) {
            if (i.children != null) throw Error(o(60));
            t.innerHTML = n;
          }
        }
        break;
      case "children":
        typeof a == "string"
          ? Ya(t, a)
          : (typeof a == "number" || typeof a == "bigint") && Ya(t, "" + a);
        break;
      case "onScroll":
        a != null && St("scroll", t);
        break;
      case "onScrollEnd":
        a != null && St("scrollend", t);
        break;
      case "onClick":
        a != null && (t.onclick = yn);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!kc.hasOwnProperty(n))
          t: {
            if (
              n[0] === "o" &&
              n[1] === "n" &&
              ((i = n.endsWith("Capture")),
              (e = n.slice(2, i ? n.length - 7 : void 0)),
              (r = t[Se] || null),
              (r = r != null ? r[n] : null),
              typeof r == "function" && t.removeEventListener(e, r, i),
              typeof a == "function")
            ) {
              typeof r != "function" &&
                r !== null &&
                (n in t
                  ? (t[n] = null)
                  : t.hasAttribute(n) && t.removeAttribute(n)),
                t.addEventListener(e, a, i);
              break t;
            }
            n in t
              ? (t[n] = a)
              : a === !0
              ? t.setAttribute(n, "")
              : ki(t, n, a);
          }
    }
  }
  function he(t, e, n) {
    switch (e) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        St("error", t), St("load", t);
        var a = !1,
          i = !1,
          r;
        for (r in n)
          if (n.hasOwnProperty(r)) {
            var f = n[r];
            if (f != null)
              switch (r) {
                case "src":
                  a = !0;
                  break;
                case "srcSet":
                  i = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(o(137, e));
                default:
                  zt(t, e, r, f, n, null);
              }
          }
        i && zt(t, e, "srcSet", n.srcSet, n, null),
          a && zt(t, e, "src", n.src, n, null);
        return;
      case "input":
        St("invalid", t);
        var p = (r = f = i = null),
          x = null,
          z = null;
        for (a in n)
          if (n.hasOwnProperty(a)) {
            var V = n[a];
            if (V != null)
              switch (a) {
                case "name":
                  i = V;
                  break;
                case "type":
                  f = V;
                  break;
                case "checked":
                  x = V;
                  break;
                case "defaultChecked":
                  z = V;
                  break;
                case "value":
                  r = V;
                  break;
                case "defaultValue":
                  p = V;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (V != null) throw Error(o(137, e));
                  break;
                default:
                  zt(t, e, a, V, n, null);
              }
          }
        Wc(t, r, p, x, z, f, i, !1);
        return;
      case "select":
        St("invalid", t), (a = f = r = null);
        for (i in n)
          if (n.hasOwnProperty(i) && ((p = n[i]), p != null))
            switch (i) {
              case "value":
                r = p;
                break;
              case "defaultValue":
                f = p;
                break;
              case "multiple":
                a = p;
              default:
                zt(t, e, i, p, n, null);
            }
        (e = r),
          (n = f),
          (t.multiple = !!a),
          e != null ? qa(t, !!a, e, !1) : n != null && qa(t, !!a, n, !0);
        return;
      case "textarea":
        St("invalid", t), (r = i = a = null);
        for (f in n)
          if (n.hasOwnProperty(f) && ((p = n[f]), p != null))
            switch (f) {
              case "value":
                a = p;
                break;
              case "defaultValue":
                i = p;
                break;
              case "children":
                r = p;
                break;
              case "dangerouslySetInnerHTML":
                if (p != null) throw Error(o(91));
                break;
              default:
                zt(t, e, f, p, n, null);
            }
        Pc(t, a, i, r);
        return;
      case "option":
        for (x in n)
          if (n.hasOwnProperty(x) && ((a = n[x]), a != null))
            switch (x) {
              case "selected":
                t.selected =
                  a && typeof a != "function" && typeof a != "symbol";
                break;
              default:
                zt(t, e, x, a, n, null);
            }
        return;
      case "dialog":
        St("beforetoggle", t), St("toggle", t), St("cancel", t), St("close", t);
        break;
      case "iframe":
      case "object":
        St("load", t);
        break;
      case "video":
      case "audio":
        for (a = 0; a < di.length; a++) St(di[a], t);
        break;
      case "image":
        St("error", t), St("load", t);
        break;
      case "details":
        St("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        St("error", t), St("load", t);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (z in n)
          if (n.hasOwnProperty(z) && ((a = n[z]), a != null))
            switch (z) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(o(137, e));
              default:
                zt(t, e, z, a, n, null);
            }
        return;
      default:
        if (Hr(e)) {
          for (V in n)
            n.hasOwnProperty(V) &&
              ((a = n[V]), a !== void 0 && Ao(t, e, V, a, n, void 0));
          return;
        }
    }
    for (p in n)
      n.hasOwnProperty(p) && ((a = n[p]), a != null && zt(t, e, p, a, n, null));
  }
  function Sg(t, e, n, a) {
    switch (e) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var i = null,
          r = null,
          f = null,
          p = null,
          x = null,
          z = null,
          V = null;
        for (H in n) {
          var Q = n[H];
          if (n.hasOwnProperty(H) && Q != null)
            switch (H) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                x = Q;
              default:
                a.hasOwnProperty(H) || zt(t, e, H, null, a, Q);
            }
        }
        for (var M in a) {
          var H = a[M];
          if (((Q = n[M]), a.hasOwnProperty(M) && (H != null || Q != null)))
            switch (M) {
              case "type":
                r = H;
                break;
              case "name":
                i = H;
                break;
              case "checked":
                z = H;
                break;
              case "defaultChecked":
                V = H;
                break;
              case "value":
                f = H;
                break;
              case "defaultValue":
                p = H;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (H != null) throw Error(o(137, e));
                break;
              default:
                H !== Q && zt(t, e, M, H, a, Q);
            }
        }
        Br(t, f, p, x, z, V, r, i);
        return;
      case "select":
        H = f = p = M = null;
        for (r in n)
          if (((x = n[r]), n.hasOwnProperty(r) && x != null))
            switch (r) {
              case "value":
                break;
              case "multiple":
                H = x;
              default:
                a.hasOwnProperty(r) || zt(t, e, r, null, a, x);
            }
        for (i in a)
          if (
            ((r = a[i]),
            (x = n[i]),
            a.hasOwnProperty(i) && (r != null || x != null))
          )
            switch (i) {
              case "value":
                M = r;
                break;
              case "defaultValue":
                p = r;
                break;
              case "multiple":
                f = r;
              default:
                r !== x && zt(t, e, i, r, a, x);
            }
        (e = p),
          (n = f),
          (a = H),
          M != null
            ? qa(t, !!n, M, !1)
            : !!a != !!n &&
              (e != null ? qa(t, !!n, e, !0) : qa(t, !!n, n ? [] : "", !1));
        return;
      case "textarea":
        H = M = null;
        for (p in n)
          if (
            ((i = n[p]),
            n.hasOwnProperty(p) && i != null && !a.hasOwnProperty(p))
          )
            switch (p) {
              case "value":
                break;
              case "children":
                break;
              default:
                zt(t, e, p, null, a, i);
            }
        for (f in a)
          if (
            ((i = a[f]),
            (r = n[f]),
            a.hasOwnProperty(f) && (i != null || r != null))
          )
            switch (f) {
              case "value":
                M = i;
                break;
              case "defaultValue":
                H = i;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (i != null) throw Error(o(91));
                break;
              default:
                i !== r && zt(t, e, f, i, a, r);
            }
        Ic(t, M, H);
        return;
      case "option":
        for (var et in n)
          if (
            ((M = n[et]),
            n.hasOwnProperty(et) && M != null && !a.hasOwnProperty(et))
          )
            switch (et) {
              case "selected":
                t.selected = !1;
                break;
              default:
                zt(t, e, et, null, a, M);
            }
        for (x in a)
          if (
            ((M = a[x]),
            (H = n[x]),
            a.hasOwnProperty(x) && M !== H && (M != null || H != null))
          )
            switch (x) {
              case "selected":
                t.selected =
                  M && typeof M != "function" && typeof M != "symbol";
                break;
              default:
                zt(t, e, x, M, a, H);
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var rt in n)
          (M = n[rt]),
            n.hasOwnProperty(rt) &&
              M != null &&
              !a.hasOwnProperty(rt) &&
              zt(t, e, rt, null, a, M);
        for (z in a)
          if (
            ((M = a[z]),
            (H = n[z]),
            a.hasOwnProperty(z) && M !== H && (M != null || H != null))
          )
            switch (z) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (M != null) throw Error(o(137, e));
                break;
              default:
                zt(t, e, z, M, a, H);
            }
        return;
      default:
        if (Hr(e)) {
          for (var Nt in n)
            (M = n[Nt]),
              n.hasOwnProperty(Nt) &&
                M !== void 0 &&
                !a.hasOwnProperty(Nt) &&
                Ao(t, e, Nt, void 0, a, M);
          for (V in a)
            (M = a[V]),
              (H = n[V]),
              !a.hasOwnProperty(V) ||
                M === H ||
                (M === void 0 && H === void 0) ||
                Ao(t, e, V, M, a, H);
          return;
        }
    }
    for (var j in n)
      (M = n[j]),
        n.hasOwnProperty(j) &&
          M != null &&
          !a.hasOwnProperty(j) &&
          zt(t, e, j, null, a, M);
    for (Q in a)
      (M = a[Q]),
        (H = n[Q]),
        !a.hasOwnProperty(Q) ||
          M === H ||
          (M == null && H == null) ||
          zt(t, e, Q, M, a, H);
  }
  function ah(t) {
    switch (t) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function xg() {
    if (typeof performance.getEntriesByType == "function") {
      for (
        var t = 0, e = 0, n = performance.getEntriesByType("resource"), a = 0;
        a < n.length;
        a++
      ) {
        var i = n[a],
          r = i.transferSize,
          f = i.initiatorType,
          p = i.duration;
        if (r && p && ah(f)) {
          for (f = 0, p = i.responseEnd, a += 1; a < n.length; a++) {
            var x = n[a],
              z = x.startTime;
            if (z > p) break;
            var V = x.transferSize,
              Q = x.initiatorType;
            V &&
              ah(Q) &&
              ((x = x.responseEnd), (f += V * (x < p ? 1 : (p - z) / (x - z))));
          }
          if ((--a, (e += (8 * (r + f)) / (i.duration / 1e3)), t++, 10 < t))
            break;
        }
      }
      if (0 < t) return e / t / 1e6;
    }
    return navigator.connection &&
      ((t = navigator.connection.downlink), typeof t == "number")
      ? t
      : 5;
  }
  var Ro = null,
    Oo = null;
  function Qu(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function lh(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function ih(t, e) {
    if (t === 0)
      switch (e) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return t === 1 && e === "foreignObject" ? 0 : t;
  }
  function jo(t, e) {
    return (
      t === "textarea" ||
      t === "noscript" ||
      typeof e.children == "string" ||
      typeof e.children == "number" ||
      typeof e.children == "bigint" ||
      (typeof e.dangerouslySetInnerHTML == "object" &&
        e.dangerouslySetInnerHTML !== null &&
        e.dangerouslySetInnerHTML.__html != null)
    );
  }
  var Co = null;
  function Eg() {
    var t = window.event;
    return t && t.type === "popstate"
      ? t === Co
        ? !1
        : ((Co = t), !0)
      : ((Co = null), !1);
  }
  var uh = typeof setTimeout == "function" ? setTimeout : void 0,
    _g = typeof clearTimeout == "function" ? clearTimeout : void 0,
    rh = typeof Promise == "function" ? Promise : void 0,
    Tg =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof rh < "u"
        ? function (t) {
            return rh.resolve(null).then(t).catch(Ag);
          }
        : uh;
  function Ag(t) {
    setTimeout(function () {
      throw t;
    });
  }
  function la(t) {
    return t === "head";
  }
  function sh(t, e) {
    var n = e,
      a = 0;
    do {
      var i = n.nextSibling;
      if ((t.removeChild(n), i && i.nodeType === 8))
        if (((n = i.data), n === "/$" || n === "/&")) {
          if (a === 0) {
            t.removeChild(i), gl(e);
            return;
          }
          a--;
        } else if (
          n === "$" ||
          n === "$?" ||
          n === "$~" ||
          n === "$!" ||
          n === "&"
        )
          a++;
        else if (n === "html") hi(t.ownerDocument.documentElement);
        else if (n === "head") {
          (n = t.ownerDocument.head), hi(n);
          for (var r = n.firstChild; r; ) {
            var f = r.nextSibling,
              p = r.nodeName;
            r[zl] ||
              p === "SCRIPT" ||
              p === "STYLE" ||
              (p === "LINK" && r.rel.toLowerCase() === "stylesheet") ||
              n.removeChild(r),
              (r = f);
          }
        } else n === "body" && hi(t.ownerDocument.body);
      n = i;
    } while (n);
    gl(e);
  }
  function oh(t, e) {
    var n = t;
    t = 0;
    do {
      var a = n.nextSibling;
      if (
        (n.nodeType === 1
          ? e
            ? ((n._stashedDisplay = n.style.display),
              (n.style.display = "none"))
            : ((n.style.display = n._stashedDisplay || ""),
              n.getAttribute("style") === "" && n.removeAttribute("style"))
          : n.nodeType === 3 &&
            (e
              ? ((n._stashedText = n.nodeValue), (n.nodeValue = ""))
              : (n.nodeValue = n._stashedText || "")),
        a && a.nodeType === 8)
      )
        if (((n = a.data), n === "/$")) {
          if (t === 0) break;
          t--;
        } else (n !== "$" && n !== "$?" && n !== "$~" && n !== "$!") || t++;
      n = a;
    } while (n);
  }
  function wo(t) {
    var e = t.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var n = e;
      switch (((e = e.nextSibling), n.nodeName)) {
        case "HTML":
        case "HEAD":
        case "BODY":
          wo(n), Mr(n);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (n.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(n);
    }
  }
  function Rg(t, e, n, a) {
    for (; t.nodeType === 1; ) {
      var i = n;
      if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
        if (!a && (t.nodeName !== "INPUT" || t.type !== "hidden")) break;
      } else if (a) {
        if (!t[zl])
          switch (e) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (
                ((r = t.getAttribute("rel")),
                r === "stylesheet" && t.hasAttribute("data-precedence"))
              )
                break;
              if (
                r !== i.rel ||
                t.getAttribute("href") !==
                  (i.href == null || i.href === "" ? null : i.href) ||
                t.getAttribute("crossorigin") !==
                  (i.crossOrigin == null ? null : i.crossOrigin) ||
                t.getAttribute("title") !== (i.title == null ? null : i.title)
              )
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (
                ((r = t.getAttribute("src")),
                (r !== (i.src == null ? null : i.src) ||
                  t.getAttribute("type") !== (i.type == null ? null : i.type) ||
                  t.getAttribute("crossorigin") !==
                    (i.crossOrigin == null ? null : i.crossOrigin)) &&
                  r &&
                  t.hasAttribute("async") &&
                  !t.hasAttribute("itemprop"))
              )
                break;
              return t;
            default:
              return t;
          }
      } else if (e === "input" && t.type === "hidden") {
        var r = i.name == null ? null : "" + i.name;
        if (i.type === "hidden" && t.getAttribute("name") === r) return t;
      } else return t;
      if (((t = ke(t.nextSibling)), t === null)) break;
    }
    return null;
  }
  function Og(t, e, n) {
    if (e === "") return null;
    for (; t.nodeType !== 3; )
      if (
        ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") &&
          !n) ||
        ((t = ke(t.nextSibling)), t === null)
      )
        return null;
    return t;
  }
  function ch(t, e) {
    for (; t.nodeType !== 8; )
      if (
        ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") &&
          !e) ||
        ((t = ke(t.nextSibling)), t === null)
      )
        return null;
    return t;
  }
  function Do(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function zo(t) {
    return (
      t.data === "$!" ||
      (t.data === "$?" && t.ownerDocument.readyState !== "loading")
    );
  }
  function jg(t, e) {
    var n = t.ownerDocument;
    if (t.data === "$~") t._reactRetry = e;
    else if (t.data !== "$?" || n.readyState !== "loading") e();
    else {
      var a = function () {
        e(), n.removeEventListener("DOMContentLoaded", a);
      };
      n.addEventListener("DOMContentLoaded", a), (t._reactRetry = a);
    }
  }
  function ke(t) {
    for (; t != null; t = t.nextSibling) {
      var e = t.nodeType;
      if (e === 1 || e === 3) break;
      if (e === 8) {
        if (
          ((e = t.data),
          e === "$" ||
            e === "$!" ||
            e === "$?" ||
            e === "$~" ||
            e === "&" ||
            e === "F!" ||
            e === "F")
        )
          break;
        if (e === "/$" || e === "/&") return null;
      }
    }
    return t;
  }
  var No = null;
  function fh(t) {
    t = t.nextSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var n = t.data;
        if (n === "/$" || n === "/&") {
          if (e === 0) return ke(t.nextSibling);
          e--;
        } else
          (n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&") ||
            e++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function dh(t) {
    t = t.previousSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var n = t.data;
        if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
          if (e === 0) return t;
          e--;
        } else (n !== "/$" && n !== "/&") || e++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function mh(t, e, n) {
    switch (((e = Qu(n)), t)) {
      case "html":
        if (((t = e.documentElement), !t)) throw Error(o(452));
        return t;
      case "head":
        if (((t = e.head), !t)) throw Error(o(453));
        return t;
      case "body":
        if (((t = e.body), !t)) throw Error(o(454));
        return t;
      default:
        throw Error(o(451));
    }
  }
  function hi(t) {
    for (var e = t.attributes; e.length; ) t.removeAttributeNode(e[0]);
    Mr(t);
  }
  var Ke = new Map(),
    hh = new Set();
  function Zu(t) {
    return typeof t.getRootNode == "function"
      ? t.getRootNode()
      : t.nodeType === 9
      ? t
      : t.ownerDocument;
  }
  var Dn = Z.d;
  Z.d = { f: Cg, r: wg, D: Dg, C: zg, L: Ng, m: Mg, X: Bg, S: Ug, M: Lg };
  function Cg() {
    var t = Dn.f(),
      e = Bu();
    return t || e;
  }
  function wg(t) {
    var e = Ba(t);
    e !== null && e.tag === 5 && e.type === "form" ? Dd(e) : Dn.r(t);
  }
  var hl = typeof document > "u" ? null : document;
  function yh(t, e, n) {
    var a = hl;
    if (a && typeof e == "string" && e) {
      var i = qe(e);
      (i = 'link[rel="' + t + '"][href="' + i + '"]'),
        typeof n == "string" && (i += '[crossorigin="' + n + '"]'),
        hh.has(i) ||
          (hh.add(i),
          (t = { rel: t, crossOrigin: n, href: e }),
          a.querySelector(i) === null &&
            ((e = a.createElement("link")),
            he(e, "link", t),
            ie(e),
            a.head.appendChild(e)));
    }
  }
  function Dg(t) {
    Dn.D(t), yh("dns-prefetch", t, null);
  }
  function zg(t, e) {
    Dn.C(t, e), yh("preconnect", t, e);
  }
  function Ng(t, e, n) {
    Dn.L(t, e, n);
    var a = hl;
    if (a && t && e) {
      var i = 'link[rel="preload"][as="' + qe(e) + '"]';
      e === "image" && n && n.imageSrcSet
        ? ((i += '[imagesrcset="' + qe(n.imageSrcSet) + '"]'),
          typeof n.imageSizes == "string" &&
            (i += '[imagesizes="' + qe(n.imageSizes) + '"]'))
        : (i += '[href="' + qe(t) + '"]');
      var r = i;
      switch (e) {
        case "style":
          r = yl(t);
          break;
        case "script":
          r = pl(t);
      }
      Ke.has(r) ||
        ((t = S(
          {
            rel: "preload",
            href: e === "image" && n && n.imageSrcSet ? void 0 : t,
            as: e,
          },
          n
        )),
        Ke.set(r, t),
        a.querySelector(i) !== null ||
          (e === "style" && a.querySelector(yi(r))) ||
          (e === "script" && a.querySelector(pi(r))) ||
          ((e = a.createElement("link")),
          he(e, "link", t),
          ie(e),
          a.head.appendChild(e)));
    }
  }
  function Mg(t, e) {
    Dn.m(t, e);
    var n = hl;
    if (n && t) {
      var a = e && typeof e.as == "string" ? e.as : "script",
        i =
          'link[rel="modulepreload"][as="' + qe(a) + '"][href="' + qe(t) + '"]',
        r = i;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          r = pl(t);
      }
      if (
        !Ke.has(r) &&
        ((t = S({ rel: "modulepreload", href: t }, e)),
        Ke.set(r, t),
        n.querySelector(i) === null)
      ) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (n.querySelector(pi(r))) return;
        }
        (a = n.createElement("link")),
          he(a, "link", t),
          ie(a),
          n.head.appendChild(a);
      }
    }
  }
  function Ug(t, e, n) {
    Dn.S(t, e, n);
    var a = hl;
    if (a && t) {
      var i = La(a).hoistableStyles,
        r = yl(t);
      e = e || "default";
      var f = i.get(r);
      if (!f) {
        var p = { loading: 0, preload: null };
        if ((f = a.querySelector(yi(r)))) p.loading = 5;
        else {
          (t = S({ rel: "stylesheet", href: t, "data-precedence": e }, n)),
            (n = Ke.get(r)) && Mo(t, n);
          var x = (f = a.createElement("link"));
          ie(x),
            he(x, "link", t),
            (x._p = new Promise(function (z, V) {
              (x.onload = z), (x.onerror = V);
            })),
            x.addEventListener("load", function () {
              p.loading |= 1;
            }),
            x.addEventListener("error", function () {
              p.loading |= 2;
            }),
            (p.loading |= 4),
            ku(f, e, a);
        }
        (f = { type: "stylesheet", instance: f, count: 1, state: p }),
          i.set(r, f);
      }
    }
  }
  function Bg(t, e) {
    Dn.X(t, e);
    var n = hl;
    if (n && t) {
      var a = La(n).hoistableScripts,
        i = pl(t),
        r = a.get(i);
      r ||
        ((r = n.querySelector(pi(i))),
        r ||
          ((t = S({ src: t, async: !0 }, e)),
          (e = Ke.get(i)) && Uo(t, e),
          (r = n.createElement("script")),
          ie(r),
          he(r, "link", t),
          n.head.appendChild(r)),
        (r = { type: "script", instance: r, count: 1, state: null }),
        a.set(i, r));
    }
  }
  function Lg(t, e) {
    Dn.M(t, e);
    var n = hl;
    if (n && t) {
      var a = La(n).hoistableScripts,
        i = pl(t),
        r = a.get(i);
      r ||
        ((r = n.querySelector(pi(i))),
        r ||
          ((t = S({ src: t, async: !0, type: "module" }, e)),
          (e = Ke.get(i)) && Uo(t, e),
          (r = n.createElement("script")),
          ie(r),
          he(r, "link", t),
          n.head.appendChild(r)),
        (r = { type: "script", instance: r, count: 1, state: null }),
        a.set(i, r));
    }
  }
  function ph(t, e, n, a) {
    var i = (i = ct.current) ? Zu(i) : null;
    if (!i) throw Error(o(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof n.precedence == "string" && typeof n.href == "string"
          ? ((e = yl(n.href)),
            (n = La(i).hoistableStyles),
            (a = n.get(e)),
            a ||
              ((a = { type: "style", instance: null, count: 0, state: null }),
              n.set(e, a)),
            a)
          : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (
          n.rel === "stylesheet" &&
          typeof n.href == "string" &&
          typeof n.precedence == "string"
        ) {
          t = yl(n.href);
          var r = La(i).hoistableStyles,
            f = r.get(t);
          if (
            (f ||
              ((i = i.ownerDocument || i),
              (f = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              r.set(t, f),
              (r = i.querySelector(yi(t))) &&
                !r._p &&
                ((f.instance = r), (f.state.loading = 5)),
              Ke.has(t) ||
                ((n = {
                  rel: "preload",
                  as: "style",
                  href: n.href,
                  crossOrigin: n.crossOrigin,
                  integrity: n.integrity,
                  media: n.media,
                  hrefLang: n.hrefLang,
                  referrerPolicy: n.referrerPolicy,
                }),
                Ke.set(t, n),
                r || Hg(i, t, n, f.state))),
            e && a === null)
          )
            throw Error(o(528, ""));
          return f;
        }
        if (e && a !== null) throw Error(o(529, ""));
        return null;
      case "script":
        return (
          (e = n.async),
          (n = n.src),
          typeof n == "string" &&
          e &&
          typeof e != "function" &&
          typeof e != "symbol"
            ? ((e = pl(n)),
              (n = La(i).hoistableScripts),
              (a = n.get(e)),
              a ||
                ((a = {
                  type: "script",
                  instance: null,
                  count: 0,
                  state: null,
                }),
                n.set(e, a)),
              a)
            : { type: "void", instance: null, count: 0, state: null }
        );
      default:
        throw Error(o(444, t));
    }
  }
  function yl(t) {
    return 'href="' + qe(t) + '"';
  }
  function yi(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function gh(t) {
    return S({}, t, { "data-precedence": t.precedence, precedence: null });
  }
  function Hg(t, e, n, a) {
    t.querySelector('link[rel="preload"][as="style"][' + e + "]")
      ? (a.loading = 1)
      : ((e = t.createElement("link")),
        (a.preload = e),
        e.addEventListener("load", function () {
          return (a.loading |= 1);
        }),
        e.addEventListener("error", function () {
          return (a.loading |= 2);
        }),
        he(e, "link", n),
        ie(e),
        t.head.appendChild(e));
  }
  function pl(t) {
    return '[src="' + qe(t) + '"]';
  }
  function pi(t) {
    return "script[async]" + t;
  }
  function vh(t, e, n) {
    if ((e.count++, e.instance === null))
      switch (e.type) {
        case "style":
          var a = t.querySelector('style[data-href~="' + qe(n.href) + '"]');
          if (a) return (e.instance = a), ie(a), a;
          var i = S({}, n, {
            "data-href": n.href,
            "data-precedence": n.precedence,
            href: null,
            precedence: null,
          });
          return (
            (a = (t.ownerDocument || t).createElement("style")),
            ie(a),
            he(a, "style", i),
            ku(a, n.precedence, t),
            (e.instance = a)
          );
        case "stylesheet":
          i = yl(n.href);
          var r = t.querySelector(yi(i));
          if (r) return (e.state.loading |= 4), (e.instance = r), ie(r), r;
          (a = gh(n)),
            (i = Ke.get(i)) && Mo(a, i),
            (r = (t.ownerDocument || t).createElement("link")),
            ie(r);
          var f = r;
          return (
            (f._p = new Promise(function (p, x) {
              (f.onload = p), (f.onerror = x);
            })),
            he(r, "link", a),
            (e.state.loading |= 4),
            ku(r, n.precedence, t),
            (e.instance = r)
          );
        case "script":
          return (
            (r = pl(n.src)),
            (i = t.querySelector(pi(r)))
              ? ((e.instance = i), ie(i), i)
              : ((a = n),
                (i = Ke.get(r)) && ((a = S({}, n)), Uo(a, i)),
                (t = t.ownerDocument || t),
                (i = t.createElement("script")),
                ie(i),
                he(i, "link", a),
                t.head.appendChild(i),
                (e.instance = i))
          );
        case "void":
          return null;
        default:
          throw Error(o(443, e.type));
      }
    else
      e.type === "stylesheet" &&
        (e.state.loading & 4) === 0 &&
        ((a = e.instance), (e.state.loading |= 4), ku(a, n.precedence, t));
    return e.instance;
  }
  function ku(t, e, n) {
    for (
      var a = n.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]'
        ),
        i = a.length ? a[a.length - 1] : null,
        r = i,
        f = 0;
      f < a.length;
      f++
    ) {
      var p = a[f];
      if (p.dataset.precedence === e) r = p;
      else if (r !== i) break;
    }
    r
      ? r.parentNode.insertBefore(t, r.nextSibling)
      : ((e = n.nodeType === 9 ? n.head : n), e.insertBefore(t, e.firstChild));
  }
  function Mo(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
      t.title == null && (t.title = e.title);
  }
  function Uo(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin),
      t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy),
      t.integrity == null && (t.integrity = e.integrity);
  }
  var Ku = null;
  function bh(t, e, n) {
    if (Ku === null) {
      var a = new Map(),
        i = (Ku = new Map());
      i.set(n, a);
    } else (i = Ku), (a = i.get(n)), a || ((a = new Map()), i.set(n, a));
    if (a.has(t)) return a;
    for (
      a.set(t, null), n = n.getElementsByTagName(t), i = 0;
      i < n.length;
      i++
    ) {
      var r = n[i];
      if (
        !(
          r[zl] ||
          r[ce] ||
          (t === "link" && r.getAttribute("rel") === "stylesheet")
        ) &&
        r.namespaceURI !== "http://www.w3.org/2000/svg"
      ) {
        var f = r.getAttribute(e) || "";
        f = t + f;
        var p = a.get(f);
        p ? p.push(r) : a.set(f, [r]);
      }
    }
    return a;
  }
  function Sh(t, e, n) {
    (t = t.ownerDocument || t),
      t.head.insertBefore(
        n,
        e === "title" ? t.querySelector("head > title") : null
      );
  }
  function qg(t, e, n) {
    if (n === 1 || e.itemProp != null) return !1;
    switch (t) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (
          typeof e.precedence != "string" ||
          typeof e.href != "string" ||
          e.href === ""
        )
          break;
        return !0;
      case "link":
        if (
          typeof e.rel != "string" ||
          typeof e.href != "string" ||
          e.href === "" ||
          e.onLoad ||
          e.onError
        )
          break;
        switch (e.rel) {
          case "stylesheet":
            return (
              (t = e.disabled), typeof e.precedence == "string" && t == null
            );
          default:
            return !0;
        }
      case "script":
        if (
          e.async &&
          typeof e.async != "function" &&
          typeof e.async != "symbol" &&
          !e.onLoad &&
          !e.onError &&
          e.src &&
          typeof e.src == "string"
        )
          return !0;
    }
    return !1;
  }
  function xh(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function Yg(t, e, n, a) {
    if (
      n.type === "stylesheet" &&
      (typeof a.media != "string" || matchMedia(a.media).matches !== !1) &&
      (n.state.loading & 4) === 0
    ) {
      if (n.instance === null) {
        var i = yl(a.href),
          r = e.querySelector(yi(i));
        if (r) {
          (e = r._p),
            e !== null &&
              typeof e == "object" &&
              typeof e.then == "function" &&
              (t.count++, (t = Ju.bind(t)), e.then(t, t)),
            (n.state.loading |= 4),
            (n.instance = r),
            ie(r);
          return;
        }
        (r = e.ownerDocument || e),
          (a = gh(a)),
          (i = Ke.get(i)) && Mo(a, i),
          (r = r.createElement("link")),
          ie(r);
        var f = r;
        (f._p = new Promise(function (p, x) {
          (f.onload = p), (f.onerror = x);
        })),
          he(r, "link", a),
          (n.instance = r);
      }
      t.stylesheets === null && (t.stylesheets = new Map()),
        t.stylesheets.set(n, e),
        (e = n.state.preload) &&
          (n.state.loading & 3) === 0 &&
          (t.count++,
          (n = Ju.bind(t)),
          e.addEventListener("load", n),
          e.addEventListener("error", n));
    }
  }
  var Bo = 0;
  function Gg(t, e) {
    return (
      t.stylesheets && t.count === 0 && Fu(t, t.stylesheets),
      0 < t.count || 0 < t.imgCount
        ? function (n) {
            var a = setTimeout(function () {
              if ((t.stylesheets && Fu(t, t.stylesheets), t.unsuspend)) {
                var r = t.unsuspend;
                (t.unsuspend = null), r();
              }
            }, 6e4 + e);
            0 < t.imgBytes && Bo === 0 && (Bo = 62500 * xg());
            var i = setTimeout(function () {
              if (
                ((t.waitingForImages = !1),
                t.count === 0 &&
                  (t.stylesheets && Fu(t, t.stylesheets), t.unsuspend))
              ) {
                var r = t.unsuspend;
                (t.unsuspend = null), r();
              }
            }, (t.imgBytes > Bo ? 50 : 800) + e);
            return (
              (t.unsuspend = n),
              function () {
                (t.unsuspend = null), clearTimeout(a), clearTimeout(i);
              }
            );
          }
        : null
    );
  }
  function Ju() {
    if (
      (this.count--,
      this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))
    ) {
      if (this.stylesheets) Fu(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        (this.unsuspend = null), t();
      }
    }
  }
  var $u = null;
  function Fu(t, e) {
    (t.stylesheets = null),
      t.unsuspend !== null &&
        (t.count++,
        ($u = new Map()),
        e.forEach(Vg, t),
        ($u = null),
        Ju.call(t));
  }
  function Vg(t, e) {
    if (!(e.state.loading & 4)) {
      var n = $u.get(t);
      if (n) var a = n.get(null);
      else {
        (n = new Map()), $u.set(t, n);
        for (
          var i = t.querySelectorAll(
              "link[data-precedence],style[data-precedence]"
            ),
            r = 0;
          r < i.length;
          r++
        ) {
          var f = i[r];
          (f.nodeName === "LINK" || f.getAttribute("media") !== "not all") &&
            (n.set(f.dataset.precedence, f), (a = f));
        }
        a && n.set(null, a);
      }
      (i = e.instance),
        (f = i.getAttribute("data-precedence")),
        (r = n.get(f) || a),
        r === a && n.set(null, i),
        n.set(f, i),
        this.count++,
        (a = Ju.bind(this)),
        i.addEventListener("load", a),
        i.addEventListener("error", a),
        r
          ? r.parentNode.insertBefore(i, r.nextSibling)
          : ((t = t.nodeType === 9 ? t.head : t),
            t.insertBefore(i, t.firstChild)),
        (e.state.loading |= 4);
    }
  }
  var gi = {
    $$typeof: k,
    Provider: null,
    Consumer: null,
    _currentValue: $,
    _currentValue2: $,
    _threadCount: 0,
  };
  function Xg(t, e, n, a, i, r, f, p, x) {
    (this.tag = 1),
      (this.containerInfo = t),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = wr(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = wr(0)),
      (this.hiddenUpdates = wr(null)),
      (this.identifierPrefix = a),
      (this.onUncaughtError = i),
      (this.onCaughtError = r),
      (this.onRecoverableError = f),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = x),
      (this.incompleteTransitions = new Map());
  }
  function Eh(t, e, n, a, i, r, f, p, x, z, V, Q) {
    return (
      (t = new Xg(t, e, n, f, x, z, V, Q, p)),
      (e = 1),
      r === !0 && (e |= 24),
      (r = ze(3, null, null, e)),
      (t.current = r),
      (r.stateNode = t),
      (e = hs()),
      e.refCount++,
      (t.pooledCache = e),
      e.refCount++,
      (r.memoizedState = { element: a, isDehydrated: n, cache: e }),
      vs(r),
      t
    );
  }
  function _h(t) {
    return t ? ((t = Ka), t) : Ka;
  }
  function Th(t, e, n, a, i, r) {
    (i = _h(i)),
      a.context === null ? (a.context = i) : (a.pendingContext = i),
      (a = Kn(e)),
      (a.payload = { element: n }),
      (r = r === void 0 ? null : r),
      r !== null && (a.callback = r),
      (n = Jn(t, a, e)),
      n !== null && (Re(n, t, e), $l(n, t, e));
  }
  function Ah(t, e) {
    if (((t = t.memoizedState), t !== null && t.dehydrated !== null)) {
      var n = t.retryLane;
      t.retryLane = n !== 0 && n < e ? n : e;
    }
  }
  function Lo(t, e) {
    Ah(t, e), (t = t.alternate) && Ah(t, e);
  }
  function Rh(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = pa(t, 67108864);
      e !== null && Re(e, t, 67108864), Lo(t, 67108864);
    }
  }
  function Oh(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Le();
      e = Dr(e);
      var n = pa(t, e);
      n !== null && Re(n, t, e), Lo(t, e);
    }
  }
  var Wu = !0;
  function Qg(t, e, n, a) {
    var i = R.T;
    R.T = null;
    var r = Z.p;
    try {
      (Z.p = 2), Ho(t, e, n, a);
    } finally {
      (Z.p = r), (R.T = i);
    }
  }
  function Zg(t, e, n, a) {
    var i = R.T;
    R.T = null;
    var r = Z.p;
    try {
      (Z.p = 8), Ho(t, e, n, a);
    } finally {
      (Z.p = r), (R.T = i);
    }
  }
  function Ho(t, e, n, a) {
    if (Wu) {
      var i = qo(a);
      if (i === null) To(t, e, a, Iu, n), Ch(t, a);
      else if (Kg(i, t, e, n, a)) a.stopPropagation();
      else if ((Ch(t, a), e & 4 && -1 < kg.indexOf(t))) {
        for (; i !== null; ) {
          var r = Ba(i);
          if (r !== null)
            switch (r.tag) {
              case 3:
                if (((r = r.stateNode), r.current.memoizedState.isDehydrated)) {
                  var f = fa(r.pendingLanes);
                  if (f !== 0) {
                    var p = r;
                    for (p.pendingLanes |= 2, p.entangledLanes |= 2; f; ) {
                      var x = 1 << (31 - we(f));
                      (p.entanglements[1] |= x), (f &= ~x);
                    }
                    sn(r), (Ot & 6) === 0 && ((Mu = Qt() + 500), fi(0));
                  }
                }
                break;
              case 31:
              case 13:
                (p = pa(r, 2)), p !== null && Re(p, r, 2), Bu(), Lo(r, 2);
            }
          if (((r = qo(a)), r === null && To(t, e, a, Iu, n), r === i)) break;
          i = r;
        }
        i !== null && a.stopPropagation();
      } else To(t, e, a, null, n);
    }
  }
  function qo(t) {
    return (t = Yr(t)), Yo(t);
  }
  var Iu = null;
  function Yo(t) {
    if (((Iu = null), (t = Ua(t)), t !== null)) {
      var e = d(t);
      if (e === null) t = null;
      else {
        var n = e.tag;
        if (n === 13) {
          if (((t = m(e)), t !== null)) return t;
          t = null;
        } else if (n === 31) {
          if (((t = g(e)), t !== null)) return t;
          t = null;
        } else if (n === 3) {
          if (e.stateNode.current.memoizedState.isDehydrated)
            return e.tag === 3 ? e.stateNode.containerInfo : null;
          t = null;
        } else e !== t && (t = null);
      }
    }
    return (Iu = t), null;
  }
  function jh(t) {
    switch (t) {
      case "beforetoggle":
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
      case "toggle":
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
        return 2;
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
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (Gi()) {
          case Rl:
            return 2;
          case Ol:
            return 8;
          case oe:
          case Je:
            return 32;
          case Na:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Go = !1,
    ia = null,
    ua = null,
    ra = null,
    vi = new Map(),
    bi = new Map(),
    sa = [],
    kg =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " "
      );
  function Ch(t, e) {
    switch (t) {
      case "focusin":
      case "focusout":
        ia = null;
        break;
      case "dragenter":
      case "dragleave":
        ua = null;
        break;
      case "mouseover":
      case "mouseout":
        ra = null;
        break;
      case "pointerover":
      case "pointerout":
        vi.delete(e.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        bi.delete(e.pointerId);
    }
  }
  function Si(t, e, n, a, i, r) {
    return t === null || t.nativeEvent !== r
      ? ((t = {
          blockedOn: e,
          domEventName: n,
          eventSystemFlags: a,
          nativeEvent: r,
          targetContainers: [i],
        }),
        e !== null && ((e = Ba(e)), e !== null && Rh(e)),
        t)
      : ((t.eventSystemFlags |= a),
        (e = t.targetContainers),
        i !== null && e.indexOf(i) === -1 && e.push(i),
        t);
  }
  function Kg(t, e, n, a, i) {
    switch (e) {
      case "focusin":
        return (ia = Si(ia, t, e, n, a, i)), !0;
      case "dragenter":
        return (ua = Si(ua, t, e, n, a, i)), !0;
      case "mouseover":
        return (ra = Si(ra, t, e, n, a, i)), !0;
      case "pointerover":
        var r = i.pointerId;
        return vi.set(r, Si(vi.get(r) || null, t, e, n, a, i)), !0;
      case "gotpointercapture":
        return (
          (r = i.pointerId), bi.set(r, Si(bi.get(r) || null, t, e, n, a, i)), !0
        );
    }
    return !1;
  }
  function wh(t) {
    var e = Ua(t.target);
    if (e !== null) {
      var n = d(e);
      if (n !== null) {
        if (((e = n.tag), e === 13)) {
          if (((e = m(n)), e !== null)) {
            (t.blockedOn = e),
              Xc(t.priority, function () {
                Oh(n);
              });
            return;
          }
        } else if (e === 31) {
          if (((e = g(n)), e !== null)) {
            (t.blockedOn = e),
              Xc(t.priority, function () {
                Oh(n);
              });
            return;
          }
        } else if (e === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function Pu(t) {
    if (t.blockedOn !== null) return !1;
    for (var e = t.targetContainers; 0 < e.length; ) {
      var n = qo(t.nativeEvent);
      if (n === null) {
        n = t.nativeEvent;
        var a = new n.constructor(n.type, n);
        (qr = a), n.target.dispatchEvent(a), (qr = null);
      } else return (e = Ba(n)), e !== null && Rh(e), (t.blockedOn = n), !1;
      e.shift();
    }
    return !0;
  }
  function Dh(t, e, n) {
    Pu(t) && n.delete(e);
  }
  function Jg() {
    (Go = !1),
      ia !== null && Pu(ia) && (ia = null),
      ua !== null && Pu(ua) && (ua = null),
      ra !== null && Pu(ra) && (ra = null),
      vi.forEach(Dh),
      bi.forEach(Dh);
  }
  function tr(t, e) {
    t.blockedOn === e &&
      ((t.blockedOn = null),
      Go ||
        ((Go = !0),
        l.unstable_scheduleCallback(l.unstable_NormalPriority, Jg)));
  }
  var er = null;
  function zh(t) {
    er !== t &&
      ((er = t),
      l.unstable_scheduleCallback(l.unstable_NormalPriority, function () {
        er === t && (er = null);
        for (var e = 0; e < t.length; e += 3) {
          var n = t[e],
            a = t[e + 1],
            i = t[e + 2];
          if (typeof a != "function") {
            if (Yo(a || n) === null) continue;
            break;
          }
          var r = Ba(n);
          r !== null &&
            (t.splice(e, 3),
            (e -= 3),
            Hs(r, { pending: !0, data: i, method: n.method, action: a }, a, i));
        }
      }));
  }
  function gl(t) {
    function e(x) {
      return tr(x, t);
    }
    ia !== null && tr(ia, t),
      ua !== null && tr(ua, t),
      ra !== null && tr(ra, t),
      vi.forEach(e),
      bi.forEach(e);
    for (var n = 0; n < sa.length; n++) {
      var a = sa[n];
      a.blockedOn === t && (a.blockedOn = null);
    }
    for (; 0 < sa.length && ((n = sa[0]), n.blockedOn === null); )
      wh(n), n.blockedOn === null && sa.shift();
    if (((n = (t.ownerDocument || t).$$reactFormReplay), n != null))
      for (a = 0; a < n.length; a += 3) {
        var i = n[a],
          r = n[a + 1],
          f = i[Se] || null;
        if (typeof r == "function") f || zh(n);
        else if (f) {
          var p = null;
          if (r && r.hasAttribute("formAction")) {
            if (((i = r), (f = r[Se] || null))) p = f.formAction;
            else if (Yo(i) !== null) continue;
          } else p = f.action;
          typeof p == "function" ? (n[a + 1] = p) : (n.splice(a, 3), (a -= 3)),
            zh(n);
        }
      }
  }
  function Nh() {
    function t(r) {
      r.canIntercept &&
        r.info === "react-transition" &&
        r.intercept({
          handler: function () {
            return new Promise(function (f) {
              return (i = f);
            });
          },
          focusReset: "manual",
          scroll: "manual",
        });
    }
    function e() {
      i !== null && (i(), (i = null)), a || setTimeout(n, 20);
    }
    function n() {
      if (!a && !navigation.transition) {
        var r = navigation.currentEntry;
        r &&
          r.url != null &&
          navigation.navigate(r.url, {
            state: r.getState(),
            info: "react-transition",
            history: "replace",
          });
      }
    }
    if (typeof navigation == "object") {
      var a = !1,
        i = null;
      return (
        navigation.addEventListener("navigate", t),
        navigation.addEventListener("navigatesuccess", e),
        navigation.addEventListener("navigateerror", e),
        setTimeout(n, 100),
        function () {
          (a = !0),
            navigation.removeEventListener("navigate", t),
            navigation.removeEventListener("navigatesuccess", e),
            navigation.removeEventListener("navigateerror", e),
            i !== null && (i(), (i = null));
        }
      );
    }
  }
  function Vo(t) {
    this._internalRoot = t;
  }
  (nr.prototype.render = Vo.prototype.render =
    function (t) {
      var e = this._internalRoot;
      if (e === null) throw Error(o(409));
      var n = e.current,
        a = Le();
      Th(n, a, t, e, null, null);
    }),
    (nr.prototype.unmount = Vo.prototype.unmount =
      function () {
        var t = this._internalRoot;
        if (t !== null) {
          this._internalRoot = null;
          var e = t.containerInfo;
          Th(t.current, 2, null, t, null, null), Bu(), (e[Ma] = null);
        }
      });
  function nr(t) {
    this._internalRoot = t;
  }
  nr.prototype.unstable_scheduleHydration = function (t) {
    if (t) {
      var e = Vc();
      t = { blockedOn: null, target: t, priority: e };
      for (var n = 0; n < sa.length && e !== 0 && e < sa[n].priority; n++);
      sa.splice(n, 0, t), n === 0 && wh(t);
    }
  };
  var Mh = u.version;
  if (Mh !== "19.2.0") throw Error(o(527, Mh, "19.2.0"));
  Z.findDOMNode = function (t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == "function"
        ? Error(o(188))
        : ((t = Object.keys(t).join(",")), Error(o(268, t)));
    return (
      (t = y(e)),
      (t = t !== null ? b(t) : null),
      (t = t === null ? null : t.stateNode),
      t
    );
  };
  var $g = {
    bundleType: 0,
    version: "19.2.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: R,
    reconcilerVersion: "19.2.0",
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var ar = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!ar.isDisabled && ar.supportsFiber)
      try {
        (Cl = ar.inject($g)), (Ce = ar);
      } catch {}
  }
  return (
    (Ei.createRoot = function (t, e) {
      if (!c(t)) throw Error(o(299));
      var n = !1,
        a = "",
        i = Gd,
        r = Vd,
        f = Xd;
      return (
        e != null &&
          (e.unstable_strictMode === !0 && (n = !0),
          e.identifierPrefix !== void 0 && (a = e.identifierPrefix),
          e.onUncaughtError !== void 0 && (i = e.onUncaughtError),
          e.onCaughtError !== void 0 && (r = e.onCaughtError),
          e.onRecoverableError !== void 0 && (f = e.onRecoverableError)),
        (e = Eh(t, 1, !1, null, null, n, a, null, i, r, f, Nh)),
        (t[Ma] = e.current),
        _o(t),
        new Vo(e)
      );
    }),
    (Ei.hydrateRoot = function (t, e, n) {
      if (!c(t)) throw Error(o(299));
      var a = !1,
        i = "",
        r = Gd,
        f = Vd,
        p = Xd,
        x = null;
      return (
        n != null &&
          (n.unstable_strictMode === !0 && (a = !0),
          n.identifierPrefix !== void 0 && (i = n.identifierPrefix),
          n.onUncaughtError !== void 0 && (r = n.onUncaughtError),
          n.onCaughtError !== void 0 && (f = n.onCaughtError),
          n.onRecoverableError !== void 0 && (p = n.onRecoverableError),
          n.formState !== void 0 && (x = n.formState)),
        (e = Eh(t, 1, !0, e, n ?? null, a, i, x, r, f, p, Nh)),
        (e.context = _h(null)),
        (n = e.current),
        (a = Le()),
        (a = Dr(a)),
        (i = Kn(a)),
        (i.callback = null),
        Jn(n, i, a),
        (n = a),
        (e.current.lanes = n),
        Dl(e, n),
        sn(e),
        (t[Ma] = e.current),
        _o(t),
        new nr(e)
      );
    }),
    (Ei.version = "19.2.0"),
    Ei
  );
}
var Qh;
function uv() {
  if (Qh) return Zo.exports;
  Qh = 1;
  function l() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(l);
      } catch (u) {
        console.error(u);
      }
  }
  return l(), (Zo.exports = iv()), Zo.exports;
}
var rv = uv();
var Zh = "popstate";
function sv(l = {}) {
  function u(o, c) {
    let { pathname: d, search: m, hash: g } = o.location;
    return sc(
      "",
      { pathname: d, search: m, hash: g },
      (c.state && c.state.usr) || null,
      (c.state && c.state.key) || "default"
    );
  }
  function s(o, c) {
    return typeof c == "string" ? c : Oi(c);
  }
  return cv(u, s, null, l);
}
function Zt(l, u) {
  if (l === !1 || l === null || typeof l > "u") throw new Error(u);
}
function Pe(l, u) {
  if (!l) {
    typeof console < "u" && console.warn(u);
    try {
      throw new Error(u);
    } catch {}
  }
}
function ov() {
  return Math.random().toString(36).substring(2, 10);
}
function kh(l, u) {
  return { usr: l.state, key: l.key, idx: u };
}
function sc(l, u, s = null, o) {
  return {
    pathname: typeof l == "string" ? l : l.pathname,
    search: "",
    hash: "",
    ...(typeof u == "string" ? xl(u) : u),
    state: s,
    key: (u && u.key) || o || ov(),
  };
}
function Oi({ pathname: l = "/", search: u = "", hash: s = "" }) {
  return (
    u && u !== "?" && (l += u.charAt(0) === "?" ? u : "?" + u),
    s && s !== "#" && (l += s.charAt(0) === "#" ? s : "#" + s),
    l
  );
}
function xl(l) {
  let u = {};
  if (l) {
    let s = l.indexOf("#");
    s >= 0 && ((u.hash = l.substring(s)), (l = l.substring(0, s)));
    let o = l.indexOf("?");
    o >= 0 && ((u.search = l.substring(o)), (l = l.substring(0, o))),
      l && (u.pathname = l);
  }
  return u;
}
function cv(l, u, s, o = {}) {
  let { window: c = document.defaultView, v5Compat: d = !1 } = o,
    m = c.history,
    g = "POP",
    v = null,
    y = b();
  y == null && ((y = 0), m.replaceState({ ...m.state, idx: y }, ""));
  function b() {
    return (m.state || { idx: null }).idx;
  }
  function S() {
    g = "POP";
    let O = b(),
      B = O == null ? null : O - y;
    (y = O), v && v({ action: g, location: D.location, delta: B });
  }
  function C(O, B) {
    g = "PUSH";
    let N = sc(D.location, O, B);
    y = b() + 1;
    let k = kh(N, y),
      G = D.createHref(N);
    try {
      m.pushState(k, "", G);
    } catch (K) {
      if (K instanceof DOMException && K.name === "DataCloneError") throw K;
      c.location.assign(G);
    }
    d && v && v({ action: g, location: D.location, delta: 1 });
  }
  function U(O, B) {
    g = "REPLACE";
    let N = sc(D.location, O, B);
    y = b();
    let k = kh(N, y),
      G = D.createHref(N);
    m.replaceState(k, "", G),
      d && v && v({ action: g, location: D.location, delta: 0 });
  }
  function T(O) {
    return fv(O);
  }
  let D = {
    get action() {
      return g;
    },
    get location() {
      return l(c, m);
    },
    listen(O) {
      if (v) throw new Error("A history only accepts one active listener");
      return (
        c.addEventListener(Zh, S),
        (v = O),
        () => {
          c.removeEventListener(Zh, S), (v = null);
        }
      );
    },
    createHref(O) {
      return u(c, O);
    },
    createURL: T,
    encodeLocation(O) {
      let B = T(O);
      return { pathname: B.pathname, search: B.search, hash: B.hash };
    },
    push: C,
    replace: U,
    go(O) {
      return m.go(O);
    },
  };
  return D;
}
function fv(l, u = !1) {
  let s = "http://localhost";
  typeof window < "u" &&
    (s =
      window.location.origin !== "null"
        ? window.location.origin
        : window.location.href),
    Zt(s, "No window.location.(origin|href) available to create URL");
  let o = typeof l == "string" ? l : Oi(l);
  return (
    (o = o.replace(/ $/, "%20")),
    !u && o.startsWith("//") && (o = s + o),
    new URL(o, s)
  );
}
function Dy(l, u, s = "/") {
  return dv(l, u, s, !1);
}
function dv(l, u, s, o) {
  let c = typeof u == "string" ? xl(u) : u,
    d = Bn(c.pathname || "/", s);
  if (d == null) return null;
  let m = zy(l);
  mv(m);
  let g = null;
  for (let v = 0; g == null && v < m.length; ++v) {
    let y = Tv(d);
    g = Ev(m[v], y, o);
  }
  return g;
}
function zy(l, u = [], s = [], o = "", c = !1) {
  let d = (m, g, v = c, y) => {
    let b = {
      relativePath: y === void 0 ? m.path || "" : y,
      caseSensitive: m.caseSensitive === !0,
      childrenIndex: g,
      route: m,
    };
    if (b.relativePath.startsWith("/")) {
      if (!b.relativePath.startsWith(o) && v) return;
      Zt(
        b.relativePath.startsWith(o),
        `Absolute route path "${b.relativePath}" nested under path "${o}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ),
        (b.relativePath = b.relativePath.slice(o.length));
    }
    let S = Un([o, b.relativePath]),
      C = s.concat(b);
    m.children &&
      m.children.length > 0 &&
      (Zt(
        m.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${S}".`
      ),
      zy(m.children, u, C, S, v)),
      !(m.path == null && !m.index) &&
        u.push({ path: S, score: Sv(S, m.index), routesMeta: C });
  };
  return (
    l.forEach((m, g) => {
      if (m.path === "" || !m.path?.includes("?")) d(m, g);
      else for (let v of Ny(m.path)) d(m, g, !0, v);
    }),
    u
  );
}
function Ny(l) {
  let u = l.split("/");
  if (u.length === 0) return [];
  let [s, ...o] = u,
    c = s.endsWith("?"),
    d = s.replace(/\?$/, "");
  if (o.length === 0) return c ? [d, ""] : [d];
  let m = Ny(o.join("/")),
    g = [];
  return (
    g.push(...m.map((v) => (v === "" ? d : [d, v].join("/")))),
    c && g.push(...m),
    g.map((v) => (l.startsWith("/") && v === "" ? "/" : v))
  );
}
function mv(l) {
  l.sort((u, s) =>
    u.score !== s.score
      ? s.score - u.score
      : xv(
          u.routesMeta.map((o) => o.childrenIndex),
          s.routesMeta.map((o) => o.childrenIndex)
        )
  );
}
var hv = /^:[\w-]+$/,
  yv = 3,
  pv = 2,
  gv = 1,
  vv = 10,
  bv = -2,
  Kh = (l) => l === "*";
function Sv(l, u) {
  let s = l.split("/"),
    o = s.length;
  return (
    s.some(Kh) && (o += bv),
    u && (o += pv),
    s
      .filter((c) => !Kh(c))
      .reduce((c, d) => c + (hv.test(d) ? yv : d === "" ? gv : vv), o)
  );
}
function xv(l, u) {
  return l.length === u.length && l.slice(0, -1).every((o, c) => o === u[c])
    ? l[l.length - 1] - u[u.length - 1]
    : 0;
}
function Ev(l, u, s = !1) {
  let { routesMeta: o } = l,
    c = {},
    d = "/",
    m = [];
  for (let g = 0; g < o.length; ++g) {
    let v = o[g],
      y = g === o.length - 1,
      b = d === "/" ? u : u.slice(d.length) || "/",
      S = pr(
        { path: v.relativePath, caseSensitive: v.caseSensitive, end: y },
        b
      ),
      C = v.route;
    if (
      (!S &&
        y &&
        s &&
        !o[o.length - 1].route.index &&
        (S = pr(
          { path: v.relativePath, caseSensitive: v.caseSensitive, end: !1 },
          b
        )),
      !S)
    )
      return null;
    Object.assign(c, S.params),
      m.push({
        params: c,
        pathname: Un([d, S.pathname]),
        pathnameBase: Cv(Un([d, S.pathnameBase])),
        route: C,
      }),
      S.pathnameBase !== "/" && (d = Un([d, S.pathnameBase]));
  }
  return m;
}
function pr(l, u) {
  typeof l == "string" && (l = { path: l, caseSensitive: !1, end: !0 });
  let [s, o] = _v(l.path, l.caseSensitive, l.end),
    c = u.match(s);
  if (!c) return null;
  let d = c[0],
    m = d.replace(/(.)\/+$/, "$1"),
    g = c.slice(1);
  return {
    params: o.reduce((y, { paramName: b, isOptional: S }, C) => {
      if (b === "*") {
        let T = g[C] || "";
        m = d.slice(0, d.length - T.length).replace(/(.)\/+$/, "$1");
      }
      const U = g[C];
      return (
        S && !U ? (y[b] = void 0) : (y[b] = (U || "").replace(/%2F/g, "/")), y
      );
    }, {}),
    pathname: d,
    pathnameBase: m,
    pattern: l,
  };
}
function _v(l, u = !1, s = !0) {
  Pe(
    l === "*" || !l.endsWith("*") || l.endsWith("/*"),
    `Route path "${l}" will be treated as if it were "${l.replace(
      /\*$/,
      "/*"
    )}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${l.replace(
      /\*$/,
      "/*"
    )}".`
  );
  let o = [],
    c =
      "^" +
      l
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (m, g, v) => (
            o.push({ paramName: g, isOptional: v != null }),
            v ? "/?([^\\/]+)?" : "/([^\\/]+)"
          )
        )
        .replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return (
    l.endsWith("*")
      ? (o.push({ paramName: "*" }),
        (c += l === "*" || l === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : s
      ? (c += "\\/*$")
      : l !== "" && l !== "/" && (c += "(?:(?=\\/|$))"),
    [new RegExp(c, u ? void 0 : "i"), o]
  );
}
function Tv(l) {
  try {
    return l
      .split("/")
      .map((u) => decodeURIComponent(u).replace(/\//g, "%2F"))
      .join("/");
  } catch (u) {
    return (
      Pe(
        !1,
        `The URL path "${l}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${u}).`
      ),
      l
    );
  }
}
function Bn(l, u) {
  if (u === "/") return l;
  if (!l.toLowerCase().startsWith(u.toLowerCase())) return null;
  let s = u.endsWith("/") ? u.length - 1 : u.length,
    o = l.charAt(s);
  return o && o !== "/" ? null : l.slice(s) || "/";
}
var Av = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Rv = (l) => Av.test(l);
function Ov(l, u = "/") {
  let {
      pathname: s,
      search: o = "",
      hash: c = "",
    } = typeof l == "string" ? xl(l) : l,
    d;
  if (s)
    if (Rv(s)) d = s;
    else {
      if (s.includes("//")) {
        let m = s;
        (s = s.replace(/\/\/+/g, "/")),
          Pe(
            !1,
            `Pathnames cannot have embedded double slashes - normalizing ${m} -> ${s}`
          );
      }
      s.startsWith("/") ? (d = Jh(s.substring(1), "/")) : (d = Jh(s, u));
    }
  else d = u;
  return { pathname: d, search: wv(o), hash: Dv(c) };
}
function Jh(l, u) {
  let s = u.replace(/\/+$/, "").split("/");
  return (
    l.split("/").forEach((c) => {
      c === ".." ? s.length > 1 && s.pop() : c !== "." && s.push(c);
    }),
    s.length > 1 ? s.join("/") : "/"
  );
}
function $o(l, u, s, o) {
  return `Cannot include a '${l}' character in a manually specified \`to.${u}\` field [${JSON.stringify(
    o
  )}].  Please separate it out to the \`to.${s}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function jv(l) {
  return l.filter(
    (u, s) => s === 0 || (u.route.path && u.route.path.length > 0)
  );
}
function My(l) {
  let u = jv(l);
  return u.map((s, o) => (o === u.length - 1 ? s.pathname : s.pathnameBase));
}
function Uy(l, u, s, o = !1) {
  let c;
  typeof l == "string"
    ? (c = xl(l))
    : ((c = { ...l }),
      Zt(
        !c.pathname || !c.pathname.includes("?"),
        $o("?", "pathname", "search", c)
      ),
      Zt(
        !c.pathname || !c.pathname.includes("#"),
        $o("#", "pathname", "hash", c)
      ),
      Zt(!c.search || !c.search.includes("#"), $o("#", "search", "hash", c)));
  let d = l === "" || c.pathname === "",
    m = d ? "/" : c.pathname,
    g;
  if (m == null) g = s;
  else {
    let S = u.length - 1;
    if (!o && m.startsWith("..")) {
      let C = m.split("/");
      for (; C[0] === ".."; ) C.shift(), (S -= 1);
      c.pathname = C.join("/");
    }
    g = S >= 0 ? u[S] : "/";
  }
  let v = Ov(c, g),
    y = m && m !== "/" && m.endsWith("/"),
    b = (d || m === ".") && s.endsWith("/");
  return !v.pathname.endsWith("/") && (y || b) && (v.pathname += "/"), v;
}
var Un = (l) => l.join("/").replace(/\/\/+/g, "/"),
  Cv = (l) => l.replace(/\/+$/, "").replace(/^\/*/, "/"),
  wv = (l) => (!l || l === "?" ? "" : l.startsWith("?") ? l : "?" + l),
  Dv = (l) => (!l || l === "#" ? "" : l.startsWith("#") ? l : "#" + l);
function zv(l) {
  return (
    l != null &&
    typeof l.status == "number" &&
    typeof l.statusText == "string" &&
    typeof l.internal == "boolean" &&
    "data" in l
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
var By = ["POST", "PUT", "PATCH", "DELETE"];
new Set(By);
var Nv = ["GET", ...By];
new Set(Nv);
var El = E.createContext(null);
El.displayName = "DataRouter";
var br = E.createContext(null);
br.displayName = "DataRouterState";
E.createContext(!1);
var Ly = E.createContext({ isTransitioning: !1 });
Ly.displayName = "ViewTransition";
var Mv = E.createContext(new Map());
Mv.displayName = "Fetchers";
var Uv = E.createContext(null);
Uv.displayName = "Await";
var mn = E.createContext(null);
mn.displayName = "Navigation";
var Di = E.createContext(null);
Di.displayName = "Location";
var tn = E.createContext({ outlet: null, matches: [], isDataRoute: !1 });
tn.displayName = "Route";
var _c = E.createContext(null);
_c.displayName = "RouteError";
function Bv(l, { relative: u } = {}) {
  Zt(
    zi(),
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: s, navigator: o } = E.useContext(mn),
    { hash: c, pathname: d, search: m } = Ni(l, { relative: u }),
    g = d;
  return (
    s !== "/" && (g = d === "/" ? s : Un([s, d])),
    o.createHref({ pathname: g, search: m, hash: c })
  );
}
function zi() {
  return E.useContext(Di) != null;
}
function ca() {
  return (
    Zt(
      zi(),
      "useLocation() may be used only in the context of a <Router> component."
    ),
    E.useContext(Di).location
  );
}
var Hy =
  "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function qy(l) {
  E.useContext(mn).static || E.useLayoutEffect(l);
}
function Lv() {
  let { isDataRoute: l } = E.useContext(tn);
  return l ? Pv() : Hv();
}
function Hv() {
  Zt(
    zi(),
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let l = E.useContext(El),
    { basename: u, navigator: s } = E.useContext(mn),
    { matches: o } = E.useContext(tn),
    { pathname: c } = ca(),
    d = JSON.stringify(My(o)),
    m = E.useRef(!1);
  return (
    qy(() => {
      m.current = !0;
    }),
    E.useCallback(
      (v, y = {}) => {
        if ((Pe(m.current, Hy), !m.current)) return;
        if (typeof v == "number") {
          s.go(v);
          return;
        }
        let b = Uy(v, JSON.parse(d), c, y.relative === "path");
        l == null &&
          u !== "/" &&
          (b.pathname = b.pathname === "/" ? u : Un([u, b.pathname])),
          (y.replace ? s.replace : s.push)(b, y.state, y);
      },
      [u, s, d, c, l]
    )
  );
}
var qv = E.createContext(null);
function Yv(l) {
  let u = E.useContext(tn).outlet;
  return E.useMemo(
    () => u && E.createElement(qv.Provider, { value: l }, u),
    [u, l]
  );
}
function Gv() {
  let { matches: l } = E.useContext(tn),
    u = l[l.length - 1];
  return u ? u.params : {};
}
function Ni(l, { relative: u } = {}) {
  let { matches: s } = E.useContext(tn),
    { pathname: o } = ca(),
    c = JSON.stringify(My(s));
  return E.useMemo(() => Uy(l, JSON.parse(c), o, u === "path"), [l, c, o, u]);
}
function Vv(l, u) {
  return Yy(l, u);
}
function Yy(l, u, s, o, c) {
  Zt(
    zi(),
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: d } = E.useContext(mn),
    { matches: m } = E.useContext(tn),
    g = m[m.length - 1],
    v = g ? g.params : {},
    y = g ? g.pathname : "/",
    b = g ? g.pathnameBase : "/",
    S = g && g.route;
  {
    let N = (S && S.path) || "";
    Gy(
      y,
      !S || N.endsWith("*") || N.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${y}" (under <Route path="${N}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${N}"> to <Route path="${
        N === "/" ? "*" : `${N}/*`
      }">.`
    );
  }
  let C = ca(),
    U;
  if (u) {
    let N = typeof u == "string" ? xl(u) : u;
    Zt(
      b === "/" || N.pathname?.startsWith(b),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${b}" but pathname "${N.pathname}" was given in the \`location\` prop.`
    ),
      (U = N);
  } else U = C;
  let T = U.pathname || "/",
    D = T;
  if (b !== "/") {
    let N = b.replace(/^\//, "").split("/");
    D = "/" + T.replace(/^\//, "").split("/").slice(N.length).join("/");
  }
  let O = Dy(l, { pathname: D });
  Pe(
    S || O != null,
    `No routes matched location "${U.pathname}${U.search}${U.hash}" `
  ),
    Pe(
      O == null ||
        O[O.length - 1].route.element !== void 0 ||
        O[O.length - 1].route.Component !== void 0 ||
        O[O.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${U.pathname}${U.search}${U.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    );
  let B = Kv(
    O &&
      O.map((N) =>
        Object.assign({}, N, {
          params: Object.assign({}, v, N.params),
          pathname: Un([
            b,
            d.encodeLocation
              ? d.encodeLocation(
                  N.pathname.replace(/\?/g, "%3F").replace(/#/g, "%23")
                ).pathname
              : N.pathname,
          ]),
          pathnameBase:
            N.pathnameBase === "/"
              ? b
              : Un([
                  b,
                  d.encodeLocation
                    ? d.encodeLocation(
                        N.pathnameBase
                          .replace(/\?/g, "%3F")
                          .replace(/#/g, "%23")
                      ).pathname
                    : N.pathnameBase,
                ]),
        })
      ),
    m,
    s,
    o,
    c
  );
  return u && B
    ? E.createElement(
        Di.Provider,
        {
          value: {
            location: {
              pathname: "/",
              search: "",
              hash: "",
              state: null,
              key: "default",
              ...U,
            },
            navigationType: "POP",
          },
        },
        B
      )
    : B;
}
function Xv() {
  let l = Iv(),
    u = zv(l)
      ? `${l.status} ${l.statusText}`
      : l instanceof Error
      ? l.message
      : JSON.stringify(l),
    s = l instanceof Error ? l.stack : null,
    o = "rgba(200,200,200, 0.5)",
    c = { padding: "0.5rem", backgroundColor: o },
    d = { padding: "2px 4px", backgroundColor: o },
    m = null;
  return (
    console.error("Error handled by React Router default ErrorBoundary:", l),
    (m = E.createElement(
      E.Fragment,
      null,
      E.createElement("p", null, "💿 Hey developer 👋"),
      E.createElement(
        "p",
        null,
        "You can provide a way better UX than this when your app throws errors by providing your own ",
        E.createElement("code", { style: d }, "ErrorBoundary"),
        " or",
        " ",
        E.createElement("code", { style: d }, "errorElement"),
        " prop on your route."
      )
    )),
    E.createElement(
      E.Fragment,
      null,
      E.createElement("h2", null, "Unexpected Application Error!"),
      E.createElement("h3", { style: { fontStyle: "italic" } }, u),
      s ? E.createElement("pre", { style: c }, s) : null,
      m
    )
  );
}
var Qv = E.createElement(Xv, null),
  Zv = class extends E.Component {
    constructor(l) {
      super(l),
        (this.state = {
          location: l.location,
          revalidation: l.revalidation,
          error: l.error,
        });
    }
    static getDerivedStateFromError(l) {
      return { error: l };
    }
    static getDerivedStateFromProps(l, u) {
      return u.location !== l.location ||
        (u.revalidation !== "idle" && l.revalidation === "idle")
        ? { error: l.error, location: l.location, revalidation: l.revalidation }
        : {
            error: l.error !== void 0 ? l.error : u.error,
            location: u.location,
            revalidation: l.revalidation || u.revalidation,
          };
    }
    componentDidCatch(l, u) {
      this.props.onError
        ? this.props.onError(l, u)
        : console.error(
            "React Router caught the following error during render",
            l
          );
    }
    render() {
      return this.state.error !== void 0
        ? E.createElement(
            tn.Provider,
            { value: this.props.routeContext },
            E.createElement(_c.Provider, {
              value: this.state.error,
              children: this.props.component,
            })
          )
        : this.props.children;
    }
  };
function kv({ routeContext: l, match: u, children: s }) {
  let o = E.useContext(El);
  return (
    o &&
      o.static &&
      o.staticContext &&
      (u.route.errorElement || u.route.ErrorBoundary) &&
      (o.staticContext._deepestRenderedBoundaryId = u.route.id),
    E.createElement(tn.Provider, { value: l }, s)
  );
}
function Kv(l, u = [], s = null, o = null, c = null) {
  if (l == null) {
    if (!s) return null;
    if (s.errors) l = s.matches;
    else if (u.length === 0 && !s.initialized && s.matches.length > 0)
      l = s.matches;
    else return null;
  }
  let d = l,
    m = s?.errors;
  if (m != null) {
    let b = d.findIndex((S) => S.route.id && m?.[S.route.id] !== void 0);
    Zt(
      b >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        m
      ).join(",")}`
    ),
      (d = d.slice(0, Math.min(d.length, b + 1)));
  }
  let g = !1,
    v = -1;
  if (s)
    for (let b = 0; b < d.length; b++) {
      let S = d[b];
      if (
        ((S.route.HydrateFallback || S.route.hydrateFallbackElement) && (v = b),
        S.route.id)
      ) {
        let { loaderData: C, errors: U } = s,
          T =
            S.route.loader &&
            !C.hasOwnProperty(S.route.id) &&
            (!U || U[S.route.id] === void 0);
        if (S.route.lazy || T) {
          (g = !0), v >= 0 ? (d = d.slice(0, v + 1)) : (d = [d[0]]);
          break;
        }
      }
    }
  let y =
    s && o
      ? (b, S) => {
          o(b, {
            location: s.location,
            params: s.matches?.[0]?.params ?? {},
            errorInfo: S,
          });
        }
      : void 0;
  return d.reduceRight((b, S, C) => {
    let U,
      T = !1,
      D = null,
      O = null;
    s &&
      ((U = m && S.route.id ? m[S.route.id] : void 0),
      (D = S.route.errorElement || Qv),
      g &&
        (v < 0 && C === 0
          ? (Gy(
              "route-fallback",
              !1,
              "No `HydrateFallback` element provided to render during initial hydration"
            ),
            (T = !0),
            (O = null))
          : v === C &&
            ((T = !0), (O = S.route.hydrateFallbackElement || null))));
    let B = u.concat(d.slice(0, C + 1)),
      N = () => {
        let k;
        return (
          U
            ? (k = D)
            : T
            ? (k = O)
            : S.route.Component
            ? (k = E.createElement(S.route.Component, null))
            : S.route.element
            ? (k = S.route.element)
            : (k = b),
          E.createElement(kv, {
            match: S,
            routeContext: { outlet: b, matches: B, isDataRoute: s != null },
            children: k,
          })
        );
      };
    return s && (S.route.ErrorBoundary || S.route.errorElement || C === 0)
      ? E.createElement(Zv, {
          location: s.location,
          revalidation: s.revalidation,
          component: D,
          error: U,
          children: N(),
          routeContext: { outlet: null, matches: B, isDataRoute: !0 },
          onError: y,
        })
      : N();
  }, null);
}
function Tc(l) {
  return `${l} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Jv(l) {
  let u = E.useContext(El);
  return Zt(u, Tc(l)), u;
}
function $v(l) {
  let u = E.useContext(br);
  return Zt(u, Tc(l)), u;
}
function Fv(l) {
  let u = E.useContext(tn);
  return Zt(u, Tc(l)), u;
}
function Ac(l) {
  let u = Fv(l),
    s = u.matches[u.matches.length - 1];
  return (
    Zt(
      s.route.id,
      `${l} can only be used on routes that contain a unique "id"`
    ),
    s.route.id
  );
}
function Wv() {
  return Ac("useRouteId");
}
function Iv() {
  let l = E.useContext(_c),
    u = $v("useRouteError"),
    s = Ac("useRouteError");
  return l !== void 0 ? l : u.errors?.[s];
}
function Pv() {
  let { router: l } = Jv("useNavigate"),
    u = Ac("useNavigate"),
    s = E.useRef(!1);
  return (
    qy(() => {
      s.current = !0;
    }),
    E.useCallback(
      async (c, d = {}) => {
        Pe(s.current, Hy),
          s.current &&
            (typeof c == "number"
              ? l.navigate(c)
              : await l.navigate(c, { fromRouteId: u, ...d }));
      },
      [l, u]
    )
  );
}
var $h = {};
function Gy(l, u, s) {
  !u && !$h[l] && (($h[l] = !0), Pe(!1, s));
}
E.memo(t1);
function t1({ routes: l, future: u, state: s, unstable_onError: o }) {
  return Yy(l, void 0, s, o, u);
}
function e1(l) {
  return Yv(l.context);
}
function cn(l) {
  Zt(
    !1,
    "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>."
  );
}
function n1({
  basename: l = "/",
  children: u = null,
  location: s,
  navigationType: o = "POP",
  navigator: c,
  static: d = !1,
}) {
  Zt(
    !zi(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let m = l.replace(/^\/*/, "/"),
    g = E.useMemo(
      () => ({ basename: m, navigator: c, static: d, future: {} }),
      [m, c, d]
    );
  typeof s == "string" && (s = xl(s));
  let {
      pathname: v = "/",
      search: y = "",
      hash: b = "",
      state: S = null,
      key: C = "default",
    } = s,
    U = E.useMemo(() => {
      let T = Bn(v, m);
      return T == null
        ? null
        : {
            location: { pathname: T, search: y, hash: b, state: S, key: C },
            navigationType: o,
          };
    }, [m, v, y, b, S, C, o]);
  return (
    Pe(
      U != null,
      `<Router basename="${m}"> is not able to match the URL "${v}${y}${b}" because it does not start with the basename, so the <Router> won't render anything.`
    ),
    U == null
      ? null
      : E.createElement(
          mn.Provider,
          { value: g },
          E.createElement(Di.Provider, { children: u, value: U })
        )
  );
}
function a1({ children: l, location: u }) {
  return Vv(oc(l), u);
}
function oc(l, u = []) {
  let s = [];
  return (
    E.Children.forEach(l, (o, c) => {
      if (!E.isValidElement(o)) return;
      let d = [...u, c];
      if (o.type === E.Fragment) {
        s.push.apply(s, oc(o.props.children, d));
        return;
      }
      Zt(
        o.type === cn,
        `[${
          typeof o.type == "string" ? o.type : o.type.name
        }] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`
      ),
        Zt(
          !o.props.index || !o.props.children,
          "An index route cannot have child routes."
        );
      let m = {
        id: o.props.id || d.join("-"),
        caseSensitive: o.props.caseSensitive,
        element: o.props.element,
        Component: o.props.Component,
        index: o.props.index,
        path: o.props.path,
        middleware: o.props.middleware,
        loader: o.props.loader,
        action: o.props.action,
        hydrateFallbackElement: o.props.hydrateFallbackElement,
        HydrateFallback: o.props.HydrateFallback,
        errorElement: o.props.errorElement,
        ErrorBoundary: o.props.ErrorBoundary,
        hasErrorBoundary:
          o.props.hasErrorBoundary === !0 ||
          o.props.ErrorBoundary != null ||
          o.props.errorElement != null,
        shouldRevalidate: o.props.shouldRevalidate,
        handle: o.props.handle,
        lazy: o.props.lazy,
      };
      o.props.children && (m.children = oc(o.props.children, d)), s.push(m);
    }),
    s
  );
}
var fr = "get",
  dr = "application/x-www-form-urlencoded";
function Sr(l) {
  return l != null && typeof l.tagName == "string";
}
function l1(l) {
  return Sr(l) && l.tagName.toLowerCase() === "button";
}
function i1(l) {
  return Sr(l) && l.tagName.toLowerCase() === "form";
}
function u1(l) {
  return Sr(l) && l.tagName.toLowerCase() === "input";
}
function r1(l) {
  return !!(l.metaKey || l.altKey || l.ctrlKey || l.shiftKey);
}
function s1(l, u) {
  return l.button === 0 && (!u || u === "_self") && !r1(l);
}
var lr = null;
function o1() {
  if (lr === null)
    try {
      new FormData(document.createElement("form"), 0), (lr = !1);
    } catch {
      lr = !0;
    }
  return lr;
}
var c1 = new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain",
]);
function Fo(l) {
  return l != null && !c1.has(l)
    ? (Pe(
        !1,
        `"${l}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${dr}"`
      ),
      null)
    : l;
}
function f1(l, u) {
  let s, o, c, d, m;
  if (i1(l)) {
    let g = l.getAttribute("action");
    (o = g ? Bn(g, u) : null),
      (s = l.getAttribute("method") || fr),
      (c = Fo(l.getAttribute("enctype")) || dr),
      (d = new FormData(l));
  } else if (l1(l) || (u1(l) && (l.type === "submit" || l.type === "image"))) {
    let g = l.form;
    if (g == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let v = l.getAttribute("formaction") || g.getAttribute("action");
    if (
      ((o = v ? Bn(v, u) : null),
      (s = l.getAttribute("formmethod") || g.getAttribute("method") || fr),
      (c =
        Fo(l.getAttribute("formenctype")) ||
        Fo(g.getAttribute("enctype")) ||
        dr),
      (d = new FormData(g, l)),
      !o1())
    ) {
      let { name: y, type: b, value: S } = l;
      if (b === "image") {
        let C = y ? `${y}.` : "";
        d.append(`${C}x`, "0"), d.append(`${C}y`, "0");
      } else y && d.append(y, S);
    }
  } else {
    if (Sr(l))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    (s = fr), (o = null), (c = dr), (m = l);
  }
  return (
    d && c === "text/plain" && ((m = d), (d = void 0)),
    { action: o, method: s.toLowerCase(), encType: c, formData: d, body: m }
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function Rc(l, u) {
  if (l === !1 || l === null || typeof l > "u") throw new Error(u);
}
function d1(l, u, s) {
  let o =
    typeof l == "string"
      ? new URL(
          l,
          typeof window > "u" ? "server://singlefetch/" : window.location.origin
        )
      : l;
  return (
    o.pathname === "/"
      ? (o.pathname = `_root.${s}`)
      : u && Bn(o.pathname, u) === "/"
      ? (o.pathname = `${u.replace(/\/$/, "")}/_root.${s}`)
      : (o.pathname = `${o.pathname.replace(/\/$/, "")}.${s}`),
    o
  );
}
async function m1(l, u) {
  if (l.id in u) return u[l.id];
  try {
    let s = await import(l.module);
    return (u[l.id] = s), s;
  } catch (s) {
    return (
      console.error(
        `Error loading route module \`${l.module}\`, reloading page...`
      ),
      console.error(s),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
function h1(l) {
  return l == null
    ? !1
    : l.href == null
    ? l.rel === "preload" &&
      typeof l.imageSrcSet == "string" &&
      typeof l.imageSizes == "string"
    : typeof l.rel == "string" && typeof l.href == "string";
}
async function y1(l, u, s) {
  let o = await Promise.all(
    l.map(async (c) => {
      let d = u.routes[c.route.id];
      if (d) {
        let m = await m1(d, s);
        return m.links ? m.links() : [];
      }
      return [];
    })
  );
  return b1(
    o
      .flat(1)
      .filter(h1)
      .filter((c) => c.rel === "stylesheet" || c.rel === "preload")
      .map((c) =>
        c.rel === "stylesheet"
          ? { ...c, rel: "prefetch", as: "style" }
          : { ...c, rel: "prefetch" }
      )
  );
}
function Fh(l, u, s, o, c, d) {
  let m = (v, y) => (s[y] ? v.route.id !== s[y].route.id : !0),
    g = (v, y) =>
      s[y].pathname !== v.pathname ||
      (s[y].route.path?.endsWith("*") && s[y].params["*"] !== v.params["*"]);
  return d === "assets"
    ? u.filter((v, y) => m(v, y) || g(v, y))
    : d === "data"
    ? u.filter((v, y) => {
        let b = o.routes[v.route.id];
        if (!b || !b.hasLoader) return !1;
        if (m(v, y) || g(v, y)) return !0;
        if (v.route.shouldRevalidate) {
          let S = v.route.shouldRevalidate({
            currentUrl: new URL(c.pathname + c.search + c.hash, window.origin),
            currentParams: s[0]?.params || {},
            nextUrl: new URL(l, window.origin),
            nextParams: v.params,
            defaultShouldRevalidate: !0,
          });
          if (typeof S == "boolean") return S;
        }
        return !0;
      })
    : [];
}
function p1(l, u, { includeHydrateFallback: s } = {}) {
  return g1(
    l
      .map((o) => {
        let c = u.routes[o.route.id];
        if (!c) return [];
        let d = [c.module];
        return (
          c.clientActionModule && (d = d.concat(c.clientActionModule)),
          c.clientLoaderModule && (d = d.concat(c.clientLoaderModule)),
          s &&
            c.hydrateFallbackModule &&
            (d = d.concat(c.hydrateFallbackModule)),
          c.imports && (d = d.concat(c.imports)),
          d
        );
      })
      .flat(1)
  );
}
function g1(l) {
  return [...new Set(l)];
}
function v1(l) {
  let u = {},
    s = Object.keys(l).sort();
  for (let o of s) u[o] = l[o];
  return u;
}
function b1(l, u) {
  let s = new Set();
  return (
    new Set(u),
    l.reduce((o, c) => {
      let d = JSON.stringify(v1(c));
      return s.has(d) || (s.add(d), o.push({ key: d, link: c })), o;
    }, [])
  );
}
function Vy() {
  let l = E.useContext(El);
  return (
    Rc(
      l,
      "You must render this element inside a <DataRouterContext.Provider> element"
    ),
    l
  );
}
function S1() {
  let l = E.useContext(br);
  return (
    Rc(
      l,
      "You must render this element inside a <DataRouterStateContext.Provider> element"
    ),
    l
  );
}
var Oc = E.createContext(void 0);
Oc.displayName = "FrameworkContext";
function Xy() {
  let l = E.useContext(Oc);
  return (
    Rc(l, "You must render this element inside a <HydratedRouter> element"), l
  );
}
function x1(l, u) {
  let s = E.useContext(Oc),
    [o, c] = E.useState(!1),
    [d, m] = E.useState(!1),
    {
      onFocus: g,
      onBlur: v,
      onMouseEnter: y,
      onMouseLeave: b,
      onTouchStart: S,
    } = u,
    C = E.useRef(null);
  E.useEffect(() => {
    if ((l === "render" && m(!0), l === "viewport")) {
      let D = (B) => {
          B.forEach((N) => {
            m(N.isIntersecting);
          });
        },
        O = new IntersectionObserver(D, { threshold: 0.5 });
      return (
        C.current && O.observe(C.current),
        () => {
          O.disconnect();
        }
      );
    }
  }, [l]),
    E.useEffect(() => {
      if (o) {
        let D = setTimeout(() => {
          m(!0);
        }, 100);
        return () => {
          clearTimeout(D);
        };
      }
    }, [o]);
  let U = () => {
      c(!0);
    },
    T = () => {
      c(!1), m(!1);
    };
  return s
    ? l !== "intent"
      ? [d, C, {}]
      : [
          d,
          C,
          {
            onFocus: _i(g, U),
            onBlur: _i(v, T),
            onMouseEnter: _i(y, U),
            onMouseLeave: _i(b, T),
            onTouchStart: _i(S, U),
          },
        ]
    : [!1, C, {}];
}
function _i(l, u) {
  return (s) => {
    l && l(s), s.defaultPrevented || u(s);
  };
}
function E1({ page: l, ...u }) {
  let { router: s } = Vy(),
    o = E.useMemo(() => Dy(s.routes, l, s.basename), [s.routes, l, s.basename]);
  return o ? E.createElement(T1, { page: l, matches: o, ...u }) : null;
}
function _1(l) {
  let { manifest: u, routeModules: s } = Xy(),
    [o, c] = E.useState([]);
  return (
    E.useEffect(() => {
      let d = !1;
      return (
        y1(l, u, s).then((m) => {
          d || c(m);
        }),
        () => {
          d = !0;
        }
      );
    }, [l, u, s]),
    o
  );
}
function T1({ page: l, matches: u, ...s }) {
  let o = ca(),
    { manifest: c, routeModules: d } = Xy(),
    { basename: m } = Vy(),
    { loaderData: g, matches: v } = S1(),
    y = E.useMemo(() => Fh(l, u, v, c, o, "data"), [l, u, v, c, o]),
    b = E.useMemo(() => Fh(l, u, v, c, o, "assets"), [l, u, v, c, o]),
    S = E.useMemo(() => {
      if (l === o.pathname + o.search + o.hash) return [];
      let T = new Set(),
        D = !1;
      if (
        (u.forEach((B) => {
          let N = c.routes[B.route.id];
          !N ||
            !N.hasLoader ||
            ((!y.some((k) => k.route.id === B.route.id) &&
              B.route.id in g &&
              d[B.route.id]?.shouldRevalidate) ||
            N.hasClientLoader
              ? (D = !0)
              : T.add(B.route.id));
        }),
        T.size === 0)
      )
        return [];
      let O = d1(l, m, "data");
      return (
        D &&
          T.size > 0 &&
          O.searchParams.set(
            "_routes",
            u
              .filter((B) => T.has(B.route.id))
              .map((B) => B.route.id)
              .join(",")
          ),
        [O.pathname + O.search]
      );
    }, [m, g, o, c, y, u, l, d]),
    C = E.useMemo(() => p1(b, c), [b, c]),
    U = _1(b);
  return E.createElement(
    E.Fragment,
    null,
    S.map((T) =>
      E.createElement("link", {
        key: T,
        rel: "prefetch",
        as: "fetch",
        href: T,
        ...s,
      })
    ),
    C.map((T) =>
      E.createElement("link", { key: T, rel: "modulepreload", href: T, ...s })
    ),
    U.map(({ key: T, link: D }) =>
      E.createElement("link", { key: T, nonce: s.nonce, ...D })
    )
  );
}
function A1(...l) {
  return (u) => {
    l.forEach((s) => {
      typeof s == "function" ? s(u) : s != null && (s.current = u);
    });
  };
}
var Qy =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u";
try {
  Qy && (window.__reactRouterVersion = "7.9.6");
} catch {}
function R1({ basename: l, children: u, window: s }) {
  let o = E.useRef();
  o.current == null && (o.current = sv({ window: s, v5Compat: !0 }));
  let c = o.current,
    [d, m] = E.useState({ action: c.action, location: c.location }),
    g = E.useCallback(
      (v) => {
        E.startTransition(() => m(v));
      },
      [m]
    );
  return (
    E.useLayoutEffect(() => c.listen(g), [c, g]),
    E.createElement(n1, {
      basename: l,
      children: u,
      location: d.location,
      navigationType: d.action,
      navigator: c,
    })
  );
}
var Zy = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  vl = E.forwardRef(function (
    {
      onClick: u,
      discover: s = "render",
      prefetch: o = "none",
      relative: c,
      reloadDocument: d,
      replace: m,
      state: g,
      target: v,
      to: y,
      preventScrollReset: b,
      viewTransition: S,
      ...C
    },
    U
  ) {
    let { basename: T } = E.useContext(mn),
      D = typeof y == "string" && Zy.test(y),
      O,
      B = !1;
    if (typeof y == "string" && D && ((O = y), Qy))
      try {
        let W = new URL(window.location.href),
          yt = y.startsWith("//") ? new URL(W.protocol + y) : new URL(y),
          ot = Bn(yt.pathname, T);
        yt.origin === W.origin && ot != null
          ? (y = ot + yt.search + yt.hash)
          : (B = !0);
      } catch {
        Pe(
          !1,
          `<Link to="${y}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
        );
      }
    let N = Bv(y, { relative: c }),
      [k, G, K] = x1(o, C),
      nt = w1(y, {
        replace: m,
        state: g,
        target: v,
        preventScrollReset: b,
        relative: c,
        viewTransition: S,
      });
    function q(W) {
      u && u(W), W.defaultPrevented || nt(W);
    }
    let P = E.createElement("a", {
      ...C,
      ...K,
      href: O || N,
      onClick: B || d ? u : q,
      ref: A1(U, G),
      target: v,
      "data-discover": !D && s === "render" ? "true" : void 0,
    });
    return k && !D
      ? E.createElement(E.Fragment, null, P, E.createElement(E1, { page: N }))
      : P;
  });
vl.displayName = "Link";
var O1 = E.forwardRef(function (
  {
    "aria-current": u = "page",
    caseSensitive: s = !1,
    className: o = "",
    end: c = !1,
    style: d,
    to: m,
    viewTransition: g,
    children: v,
    ...y
  },
  b
) {
  let S = Ni(m, { relative: y.relative }),
    C = ca(),
    U = E.useContext(br),
    { navigator: T, basename: D } = E.useContext(mn),
    O = U != null && U1(S) && g === !0,
    B = T.encodeLocation ? T.encodeLocation(S).pathname : S.pathname,
    N = C.pathname,
    k =
      U && U.navigation && U.navigation.location
        ? U.navigation.location.pathname
        : null;
  s ||
    ((N = N.toLowerCase()),
    (k = k ? k.toLowerCase() : null),
    (B = B.toLowerCase())),
    k && D && (k = Bn(k, D) || k);
  const G = B !== "/" && B.endsWith("/") ? B.length - 1 : B.length;
  let K = N === B || (!c && N.startsWith(B) && N.charAt(G) === "/"),
    nt =
      k != null &&
      (k === B || (!c && k.startsWith(B) && k.charAt(B.length) === "/")),
    q = { isActive: K, isPending: nt, isTransitioning: O },
    P = K ? u : void 0,
    W;
  typeof o == "function"
    ? (W = o(q))
    : (W = [
        o,
        K ? "active" : null,
        nt ? "pending" : null,
        O ? "transitioning" : null,
      ]
        .filter(Boolean)
        .join(" "));
  let yt = typeof d == "function" ? d(q) : d;
  return E.createElement(
    vl,
    {
      ...y,
      "aria-current": P,
      className: W,
      ref: b,
      style: yt,
      to: m,
      viewTransition: g,
    },
    typeof v == "function" ? v(q) : v
  );
});
O1.displayName = "NavLink";
var j1 = E.forwardRef(
  (
    {
      discover: l = "render",
      fetcherKey: u,
      navigate: s,
      reloadDocument: o,
      replace: c,
      state: d,
      method: m = fr,
      action: g,
      onSubmit: v,
      relative: y,
      preventScrollReset: b,
      viewTransition: S,
      ...C
    },
    U
  ) => {
    let T = N1(),
      D = M1(g, { relative: y }),
      O = m.toLowerCase() === "get" ? "get" : "post",
      B = typeof g == "string" && Zy.test(g),
      N = (k) => {
        if ((v && v(k), k.defaultPrevented)) return;
        k.preventDefault();
        let G = k.nativeEvent.submitter,
          K = G?.getAttribute("formmethod") || m;
        T(G || k.currentTarget, {
          fetcherKey: u,
          method: K,
          navigate: s,
          replace: c,
          state: d,
          relative: y,
          preventScrollReset: b,
          viewTransition: S,
        });
      };
    return E.createElement("form", {
      ref: U,
      method: O,
      action: D,
      onSubmit: o ? v : N,
      ...C,
      "data-discover": !B && l === "render" ? "true" : void 0,
    });
  }
);
j1.displayName = "Form";
function C1(l) {
  return `${l} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function ky(l) {
  let u = E.useContext(El);
  return Zt(u, C1(l)), u;
}
function w1(
  l,
  {
    target: u,
    replace: s,
    state: o,
    preventScrollReset: c,
    relative: d,
    viewTransition: m,
  } = {}
) {
  let g = Lv(),
    v = ca(),
    y = Ni(l, { relative: d });
  return E.useCallback(
    (b) => {
      if (s1(b, u)) {
        b.preventDefault();
        let S = s !== void 0 ? s : Oi(v) === Oi(y);
        g(l, {
          replace: S,
          state: o,
          preventScrollReset: c,
          relative: d,
          viewTransition: m,
        });
      }
    },
    [v, g, y, s, o, u, l, c, d, m]
  );
}
var D1 = 0,
  z1 = () => `__${String(++D1)}__`;
function N1() {
  let { router: l } = ky("useSubmit"),
    { basename: u } = E.useContext(mn),
    s = Wv();
  return E.useCallback(
    async (o, c = {}) => {
      let { action: d, method: m, encType: g, formData: v, body: y } = f1(o, u);
      if (c.navigate === !1) {
        let b = c.fetcherKey || z1();
        await l.fetch(b, s, c.action || d, {
          preventScrollReset: c.preventScrollReset,
          formData: v,
          body: y,
          formMethod: c.method || m,
          formEncType: c.encType || g,
          flushSync: c.flushSync,
        });
      } else
        await l.navigate(c.action || d, {
          preventScrollReset: c.preventScrollReset,
          formData: v,
          body: y,
          formMethod: c.method || m,
          formEncType: c.encType || g,
          replace: c.replace,
          state: c.state,
          fromRouteId: s,
          flushSync: c.flushSync,
          viewTransition: c.viewTransition,
        });
    },
    [l, u, s]
  );
}
function M1(l, { relative: u } = {}) {
  let { basename: s } = E.useContext(mn),
    o = E.useContext(tn);
  Zt(o, "useFormAction must be used inside a RouteContext");
  let [c] = o.matches.slice(-1),
    d = { ...Ni(l || ".", { relative: u }) },
    m = ca();
  if (l == null) {
    d.search = m.search;
    let g = new URLSearchParams(d.search),
      v = g.getAll("index");
    if (v.some((b) => b === "")) {
      g.delete("index"),
        v.filter((S) => S).forEach((S) => g.append("index", S));
      let b = g.toString();
      d.search = b ? `?${b}` : "";
    }
  }
  return (
    (!l || l === ".") &&
      c.route.index &&
      (d.search = d.search ? d.search.replace(/^\?/, "?index&") : "?index"),
    s !== "/" && (d.pathname = d.pathname === "/" ? s : Un([s, d.pathname])),
    Oi(d)
  );
}
function U1(l, { relative: u } = {}) {
  let s = E.useContext(Ly);
  Zt(
    s != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: o } = ky("useViewTransitionState"),
    c = Ni(l, { relative: u });
  if (!s.isTransitioning) return !1;
  let d = Bn(s.currentLocation.pathname, o) || s.currentLocation.pathname,
    m = Bn(s.nextLocation.pathname, o) || s.nextLocation.pathname;
  return pr(c.pathname, m) != null || pr(c.pathname, d) != null;
}
const B1 = () => h.jsx("h1", { children: "Home page" }),
  Ky = E.createContext(void 0),
  jc = () => {
    const l = E.useContext(Ky);
    if (!l) throw new Error("useSidebar must be used within a SidebarProvider");
    return l;
  },
  L1 = ({ children: l }) => {
    const [u, s] = E.useState(!0),
      [o, c] = E.useState(!1),
      [d, m] = E.useState(!1),
      [g, v] = E.useState(!1),
      [y, b] = E.useState(null),
      [S, C] = E.useState(null);
    E.useEffect(() => {
      const O = () => {
        const B = window.innerWidth < 768;
        m(B), B || c(!1);
      };
      return (
        O(),
        window.addEventListener("resize", O),
        () => {
          window.removeEventListener("resize", O);
        }
      );
    }, []);
    const U = () => {
        s((O) => !O);
      },
      T = () => {
        c((O) => !O);
      },
      D = (O) => {
        C((B) => (B === O ? null : O));
      };
    return h.jsx(Ky.Provider, {
      value: {
        isExpanded: d ? !1 : u,
        isMobileOpen: o,
        isHovered: g,
        activeItem: y,
        openSubmenu: S,
        toggleSidebar: U,
        toggleMobileSidebar: T,
        setIsHovered: v,
        setActiveItem: b,
        toggleSubmenu: D,
      },
      children: l,
    });
  },
  H1 = () => {
    const [l, u] = E.useState(!1),
      { isMobileOpen: s, toggleSidebar: o, toggleMobileSidebar: c } = jc(),
      d = () => {
        window.innerWidth >= 1024 ? o() : c();
      },
      m = () => {
        u(!l);
      },
      g = E.useRef(null);
    return (
      E.useEffect(() => {
        const v = (y) => {
          (y.metaKey || y.ctrlKey) &&
            y.key === "k" &&
            (y.preventDefault(), g.current?.focus());
        };
        return (
          document.addEventListener("keydown", v),
          () => {
            document.removeEventListener("keydown", v);
          }
        );
      }, []),
      h.jsx("header", {
        className:
          "sticky top-0 flex w-full bg-white border-gray-200 z-99999 dark:border-gray-800 dark:bg-gray-900 lg:border-b",
        children: h.jsxs("div", {
          className:
            "flex flex-col items-center justify-between grow lg:flex-row lg:px-6",
          children: [
            h.jsxs("div", {
              className:
                "flex items-center justify-between w-full gap-2 px-3 py-3 border-b border-gray-200 dark:border-gray-800 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4",
              children: [
                h.jsx("button", {
                  className:
                    "items-center justify-center w-10 h-10 text-gray-500 border-gray-200 rounded-lg z-99999 dark:border-gray-800 lg:flex dark:text-gray-400 lg:h-11 lg:w-11 lg:border",
                  onClick: d,
                  "aria-label": "Toggle Sidebar",
                  children: s
                    ? h.jsx("svg", {
                        width: "24",
                        height: "24",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                        children: h.jsx("path", {
                          fillRule: "evenodd",
                          clipRule: "evenodd",
                          d: "M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z",
                          fill: "currentColor",
                        }),
                      })
                    : h.jsx("svg", {
                        width: "16",
                        height: "12",
                        viewBox: "0 0 16 12",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                        children: h.jsx("path", {
                          fillRule: "evenodd",
                          clipRule: "evenodd",
                          d: "M0.583252 1C0.583252 0.585788 0.919038 0.25 1.33325 0.25H14.6666C15.0808 0.25 15.4166 0.585786 15.4166 1C15.4166 1.41421 15.0808 1.75 14.6666 1.75L1.33325 1.75C0.919038 1.75 0.583252 1.41422 0.583252 1ZM0.583252 11C0.583252 10.5858 0.919038 10.25 1.33325 10.25L14.6666 10.25C15.0808 10.25 15.4166 10.5858 15.4166 11C15.4166 11.4142 15.0808 11.75 14.6666 11.75L1.33325 11.75C0.919038 11.75 0.583252 11.4142 0.583252 11ZM1.33325 5.25C0.919038 5.25 0.583252 5.58579 0.583252 6C0.583252 6.41421 0.919038 6.75 1.33325 6.75L7.99992 6.75C8.41413 6.75 8.74992 6.41421 8.74992 6C8.74992 5.58579 8.41413 5.25 7.99992 5.25L1.33325 5.25Z",
                          fill: "currentColor",
                        }),
                      }),
                }),
                h.jsxs(vl, {
                  to: "/",
                  className: "lg:hidden",
                  children: [
                    h.jsx("img", {
                      className: "dark:hidden",
                      src: "./images/logo/logo.svg",
                      alt: "Logo",
                    }),
                    h.jsx("img", {
                      className: "hidden dark:block",
                      src: "./images/logo/logo-dark.svg",
                      alt: "Logo",
                    }),
                  ],
                }),
                h.jsx("button", {
                  onClick: m,
                  className:
                    "flex items-center justify-center w-10 h-10 text-gray-700 rounded-lg z-99999 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 lg:hidden",
                  children: h.jsx("svg", {
                    width: "24",
                    height: "24",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                    children: h.jsx("path", {
                      fillRule: "evenodd",
                      clipRule: "evenodd",
                      d: "M5.99902 10.4951C6.82745 10.4951 7.49902 11.1667 7.49902 11.9951V12.0051C7.49902 12.8335 6.82745 13.5051 5.99902 13.5051C5.1706 13.5051 4.49902 12.8335 4.49902 12.0051V11.9951C4.49902 11.1667 5.1706 10.4951 5.99902 10.4951ZM17.999 10.4951C18.8275 10.4951 19.499 11.1667 19.499 11.9951V12.0051C19.499 12.8335 18.8275 13.5051 17.999 13.5051C17.1706 13.5051 16.499 12.8335 16.499 12.0051V11.9951C16.499 11.1667 17.1706 10.4951 17.999 10.4951ZM13.499 11.9951C13.499 11.1667 12.8275 10.4951 11.999 10.4951C11.1706 10.4951 10.499 11.1667 10.499 11.9951V12.0051C10.499 12.8335 11.1706 13.5051 11.999 13.5051C12.8275 13.5051 13.499 12.8335 13.499 12.0051V11.9951Z",
                      fill: "currentColor",
                    }),
                  }),
                }),
                h.jsx("div", {
                  className: "hidden lg:block",
                  children: h.jsx("form", {
                    children: h.jsxs("div", {
                      className: "relative",
                      children: [
                        h.jsx("span", {
                          className:
                            "absolute -translate-y-1/2 pointer-events-none left-4 top-1/2",
                          children: h.jsx("svg", {
                            className: "fill-gray-500 dark:fill-gray-400",
                            width: "20",
                            height: "20",
                            viewBox: "0 0 20 20",
                            fill: "none",
                            xmlns: "http://www.w3.org/2000/svg",
                            children: h.jsx("path", {
                              fillRule: "evenodd",
                              clipRule: "evenodd",
                              d: "M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z",
                              fill: "",
                            }),
                          }),
                        }),
                        h.jsx("input", {
                          ref: g,
                          type: "text",
                          placeholder: "Search or type command...",
                          className:
                            "dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[430px]",
                        }),
                        h.jsx("button", {
                          className:
                            "absolute right-2.5 top-1/2 inline-flex -translate-y-1/2 items-center gap-0.5 rounded-lg border border-gray-200 bg-gray-50 px-[7px] py-[4.5px] text-xs -tracking-[0.2px] text-gray-500 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400",
                          children: h.jsx("span", { children: " ⌘ " }),
                        }),
                      ],
                    }),
                  }),
                }),
              ],
            }),
            h.jsx("div", {
              className: `${
                l ? "flex" : "hidden"
              } items-center justify-between w-full gap-4 px-5 py-4 lg:flex shadow-theme-md lg:justify-end lg:px-0 lg:shadow-none`,
              children: h.jsx("div", {
                className: "flex items-center gap-2 2xsm:gap-3",
              }),
            }),
          ],
        }),
      })
    );
  },
  Wh = [
    { name: "Garments", path: "/admin-garment" },
    { name: "Serivces", path: "/admin-service" },
    { name: "Customers", path: "/admin-customer" },
    { name: "OrderItems", path: "/admin-order-items" },
    { name: "Orders", path: "/admin-order" },
    { name: "SignIn", path: "/signin" },
    { name: "SignUp", path: "/signup" },
  ],
  q1 = [
    {
      name: "UI Elements",
      subItems: [
        { name: "Alerts", path: "/alerts", pro: !1 },
        { name: "Avatar", path: "/avatars", pro: !1 },
        { name: "Badge", path: "/badge", pro: !1 },
        { name: "Buttons", path: "/buttons", pro: !1 },
        { name: "Images", path: "/images", pro: !1 },
        { name: "Videos", path: "/videos", pro: !1 },
      ],
    },
    {
      name: "Authentication",
      subItems: [
        { name: "Sign In", path: "/signin", pro: !1 },
        { name: "Sign Up", path: "/signup", pro: !1 },
      ],
    },
  ],
  Y1 = () => {
    const {
        isExpanded: l,
        isMobileOpen: u,
        isHovered: s,
        setIsHovered: o,
      } = jc(),
      c = ca(),
      [d, m] = E.useState(null),
      [g, v] = E.useState({}),
      y = E.useRef({}),
      b = E.useCallback((U) => c.pathname === U, [c.pathname]);
    E.useEffect(() => {
      let U = !1;
      ["main", "others"].forEach((T) => {
        (T === "main" ? Wh : q1).forEach((O, B) => {
          O.subItems &&
            O.subItems.forEach((N) => {
              b(N.path) && (m({ type: T, index: B }), (U = !0));
            });
        });
      }),
        U || m(null);
    }, [c, b]),
      E.useEffect(() => {
        if (d !== null) {
          const U = `${d.type}-${d.index}`;
          y.current[U] &&
            v((T) => ({ ...T, [U]: y.current[U]?.scrollHeight || 0 }));
        }
      }, [d]);
    const S = (U, T) => {
        m((D) =>
          D && D.type === T && D.index === U ? null : { type: T, index: U }
        );
      },
      C = (U, T) =>
        h.jsx("ul", {
          className: "flex flex-col gap-4",
          children: U.map((D, O) =>
            h.jsxs(
              "li",
              {
                children: [
                  D.subItems
                    ? h.jsxs("button", {
                        onClick: () => S(O, T),
                        className: `menu-item group ${
                          d?.type === T && d?.index === O
                            ? "menu-item-active"
                            : "menu-item-inactive"
                        } cursor-pointer ${
                          !l && !s ? "lg:justify-center" : "lg:justify-start"
                        }`,
                        children: [
                          h.jsx("span", {
                            className: `menu-item-icon-size  ${
                              d?.type === T && d?.index === O
                                ? "menu-item-icon-active"
                                : "menu-item-icon-inactive"
                            }`,
                          }),
                          (l || s || u) &&
                            h.jsx("span", {
                              className: "menu-item-text",
                              children: D.name,
                            }),
                        ],
                      })
                    : D.path &&
                      h.jsxs(vl, {
                        to: D.path,
                        className: `menu-item group ${
                          b(D.path) ? "menu-item-active" : "menu-item-inactive"
                        }`,
                        children: [
                          h.jsx("span", {
                            className: `menu-item-icon-size ${
                              b(D.path)
                                ? "menu-item-icon-active"
                                : "menu-item-icon-inactive"
                            }`,
                          }),
                          (l || s || u) &&
                            h.jsx("span", {
                              className: "menu-item-text",
                              children: D.name,
                            }),
                        ],
                      }),
                  D.subItems &&
                    (l || s || u) &&
                    h.jsx("div", {
                      ref: (B) => {
                        y.current[`${T}-${O}`] = B;
                      },
                      className: "overflow-hidden transition-all duration-300",
                      style: {
                        height:
                          d?.type === T && d?.index === O
                            ? `${g[`${T}-${O}`]}px`
                            : "0px",
                      },
                      children: h.jsx("ul", {
                        className: "mt-2 space-y-1 ml-9",
                        children: D.subItems.map((B) =>
                          h.jsx(
                            "li",
                            {
                              children: h.jsxs(vl, {
                                to: B.path,
                                className: `menu-dropdown-item ${
                                  b(B.path)
                                    ? "menu-dropdown-item-active"
                                    : "menu-dropdown-item-inactive"
                                }`,
                                children: [
                                  B.name,
                                  h.jsxs("span", {
                                    className:
                                      "flex items-center gap-1 ml-auto",
                                    children: [
                                      B.new &&
                                        h.jsx("span", {
                                          className: `ml-auto ${
                                            b(B.path)
                                              ? "menu-dropdown-badge-active"
                                              : "menu-dropdown-badge-inactive"
                                          } menu-dropdown-badge`,
                                          children: "new",
                                        }),
                                      B.pro &&
                                        h.jsx("span", {
                                          className: `ml-auto ${
                                            b(B.path)
                                              ? "menu-dropdown-badge-active"
                                              : "menu-dropdown-badge-inactive"
                                          } menu-dropdown-badge`,
                                          children: "pro",
                                        }),
                                    ],
                                  }),
                                ],
                              }),
                            },
                            B.name
                          )
                        ),
                      }),
                    }),
                ],
              },
              D.name
            )
          ),
        });
    return h.jsxs("aside", {
      className: `fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${l || u || s ? "w-[290px]" : "w-[90px]"}
        ${u ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`,
      onMouseEnter: () => !l && o(!0),
      onMouseLeave: () => o(!1),
      children: [
        h.jsx("div", {
          className: `py-8 flex ${
            !l && !s ? "lg:justify-center" : "justify-start"
          }`,
          children: h.jsx(vl, {
            to: "/",
            children:
              l || s || u
                ? h.jsxs(h.Fragment, {
                    children: [
                      h.jsx("img", {
                        className: "dark:hidden",
                        src: "/images/logo/logo.svg",
                        alt: "Logo",
                        width: 150,
                        height: 40,
                      }),
                      h.jsx("img", {
                        className: "hidden dark:block",
                        src: "/images/logo/logo-dark.svg",
                        alt: "Logo",
                        width: 150,
                        height: 40,
                      }),
                    ],
                  })
                : h.jsx("img", {
                    src: "/images/logo/logo-icon.svg",
                    alt: "Logo",
                    width: 32,
                    height: 32,
                  }),
          }),
        }),
        h.jsxs("div", {
          className:
            "flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar",
          children: [
            h.jsx("nav", {
              className: "mb-6",
              children: h.jsxs("div", {
                className: "flex flex-col gap-4",
                children: [
                  h.jsxs("div", {
                    children: [
                      h.jsx("h2", {
                        className: `mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                          !l && !s ? "lg:justify-center" : "justify-start"
                        }`,
                        children: l || s || u ? "Menu" : h.jsx(h.Fragment, {}),
                      }),
                      C(Wh, "main"),
                    ],
                  }),
                  h.jsx("div", { className: "" }),
                ],
              }),
            }),
            l || s || u,
          ],
        }),
      ],
    });
  },
  G1 = () => {
    const { isExpanded: l, isHovered: u, isMobileOpen: s } = jc();
    return h.jsxs("div", {
      className: "min-h-screen xl:flex",
      children: [
        h.jsx("div", { children: h.jsx(Y1, {}) }),
        h.jsxs("div", {
          className: `flex-1 transition-all duration-300 ease-in-out ${
            l || u ? "lg:ml-[290px]" : "lg:ml-[90px]"
          } ${s ? "ml-0" : ""}`,
          children: [
            h.jsx(H1, {}),
            h.jsx("div", {
              className: "p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6",
              children: h.jsx(e1, {}),
            }),
          ],
        }),
      ],
    });
  },
  V1 = () => h.jsx(L1, { children: h.jsx(G1, {}) }),
  X1 = "https://api.shivaliwashingcompany.in/garment/garment",
  ir = "https://api.shivaliwashingcompany.in/service/service";
function Ih(l) {
  return l
    ? Array.isArray(l)
      ? l
      : l && Array.isArray(l.data)
      ? l.data
      : l && Array.isArray(l.items)
      ? l.items
      : []
    : [];
}
function Ph(l) {
  return l
    ? l && l.data && typeof l.data == "object" && !Array.isArray(l.data)
      ? l.data
      : Array.isArray(l) && l.length > 0
      ? l[0]
      : l && typeof l == "object" && ("service_id" in l || "id" in l)
      ? l
      : null
    : null;
}
const Q1 = ({ visible: l, title: u, onClose: s, children: o }) =>
  l
    ? h.jsx("div", {
        style: ee.modalBackdrop,
        children: h.jsxs("div", {
          style: ee.modal,
          children: [
            h.jsxs("div", {
              style: ee.modalHeader,
              children: [
                h.jsx("strong", { children: u ?? "Modal" }),
                h.jsx("button", {
                  onClick: s,
                  style: ee.closeBtn,
                  "aria-label": "Close",
                  children: "×",
                }),
              ],
            }),
            h.jsx("div", { style: ee.modalBody, children: o }),
          ],
        }),
      })
    : null;
function Z1() {
  const [l, u] = E.useState([]),
    [s, o] = E.useState([]),
    [c, d] = E.useState(!1),
    [m, g] = E.useState(!1),
    [v, y] = E.useState(null),
    [b, S] = E.useState(!1),
    [C, U] = E.useState(null),
    [T, D] = E.useState(""),
    [O, B] = E.useState(""),
    [N, k] = E.useState(!0),
    [G, K] = E.useState(!1),
    [nt, q] = E.useState(null);
  E.useEffect(() => {
    P(), W();
  }, []);
  async function P() {
    g(!0);
    try {
      const Z = await (await fetch(X1, { method: "GET" }))
        .json()
        .catch(() => null);
      console.debug("GET garments raw:", Z);
      const $ = Ih(Z);
      o($);
    } catch (R) {
      console.error(R), o([]);
    } finally {
      g(!1);
    }
  }
  async function W() {
    d(!0), y(null);
    try {
      const Z = await (await fetch(ir, { method: "GET" }))
        .json()
        .catch(() => null);
      console.debug("GET services raw:", Z);
      const $ = Ih(Z);
      u($);
    } catch (R) {
      console.error(R), y("Failed to load services"), u([]);
    } finally {
      d(!1);
    }
  }
  function yt() {
    U(null), D(""), B(""), k(!0), q(null), S(!0);
  }
  function ot(R) {
    U(R), D(R.service_name), B(R.garment_id), k(!!R.is_active), q(null), S(!0);
  }
  function gt() {
    G || S(!1);
  }
  function J() {
    return T.trim()
      ? O
        ? T.trim().length > 255
          ? "Name is too long."
          : null
        : "Please select a garment."
      : "Service name is required.";
  }
  async function lt(R) {
    R && R.preventDefault(), q(null);
    const Z = J();
    if (Z) {
      q(Z);
      return;
    }
    K(!0);
    try {
      if (C) {
        const $ = await fetch(`${ir}/${encodeURIComponent(C.service_id)}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              service_name: T.trim(),
              is_active: N,
              garment_id: O,
            }),
          }),
          ut = await $.json().catch(() => null);
        if ((console.debug("PUT service raw:", ut), !$.ok)) {
          const _ = ut?.message || `Update failed: ${$.status}`;
          throw new Error(_);
        }
        const dt = Ph(ut) || {
          ...C,
          service_name: T.trim(),
          is_active: N,
          garment_id: O,
        };
        u((_) => _.map((Y) => (Y.service_id === dt.service_id ? dt : Y)));
      } else {
        console.log(O, "here is garmentId");
        const $ = await fetch(ir, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ service_name: T.trim(), garment_id: O }),
          }),
          ut = await $.json().catch(() => null);
        if ((console.debug("POST service raw:", ut), !$.ok)) {
          const _ = ut?.message || `Create failed: ${$.status}`;
          throw new Error(_);
        }
        const dt = Ph(ut);
        dt ? u((_) => [dt, ..._]) : await W();
      }
      S(!1);
    } catch ($) {
      q($?.message || "Submission failed");
    } finally {
      K(!1);
    }
  }
  async function tt(R) {
    if (confirm(`Delete service "${R.service_name}"?`))
      try {
        const Z = await fetch(`${ir}/${encodeURIComponent(R.service_id)}`, {
            method: "DELETE",
          }),
          $ = await Z.json().catch(() => null);
        if ((console.debug("DELETE service raw:", $), !Z.ok)) {
          const ut = $?.message || `Delete failed: ${Z.status}`;
          throw new Error(ut);
        }
        u((ut) => ut.filter((dt) => dt.service_id !== R.service_id));
      } catch (Z) {
        alert(Z?.message || "Failed to delete");
      }
  }
  return h.jsxs("div", {
    style: ee.container,
    children: [
      h.jsxs("header", {
        style: ee.header,
        children: [
          h.jsx("div", { children: h.jsx("h2", { children: "Services" }) }),
          h.jsx("div", {
            children: h.jsx("button", {
              onClick: yt,
              style: ee.primaryBtn,
              children: "Add Service",
            }),
          }),
        ],
      }),
      v && h.jsx("div", { style: ee.error, children: v }),
      c
        ? h.jsx("div", { children: "Loading services..." })
        : l.length === 0
        ? h.jsx("div", { style: ee.empty, children: "No services found." })
        : h.jsxs("table", {
            style: ee.table,
            children: [
              h.jsx("thead", {
                children: h.jsxs("tr", {
                  children: [
                    h.jsx("th", {
                      style: { textAlign: "left" },
                      children: "Name",
                    }),
                    h.jsx("th", {
                      style: { textAlign: "left" },
                      children: "Garment",
                    }),
                    h.jsx("th", { style: { width: 160 }, children: "Actions" }),
                  ],
                }),
              }),
              h.jsx("tbody", {
                children: l.map((R) =>
                  h.jsxs(
                    "tr",
                    {
                      children: [
                        h.jsx("td", { children: R.service_name }),
                        h.jsx("td", {
                          children:
                            R.garment?.garment_name ??
                            s.find((Z) => Z.garment_id === R.garment_id)
                              ?.garment_name ??
                            "-",
                        }),
                        h.jsx("td", {
                          children: h.jsxs("div", {
                            style: { display: "flex", gap: 8 },
                            children: [
                              h.jsx("button", {
                                onClick: () => ot(R),
                                style: ee.secondaryBtn,
                                children: "Edit",
                              }),
                              h.jsx("button", {
                                onClick: () => tt(R),
                                style: ee.dangerBtn,
                                children: "Delete",
                              }),
                            ],
                          }),
                        }),
                      ],
                    },
                    R.service_id
                  )
                ),
              }),
            ],
          }),
      h.jsx(Q1, {
        visible: b,
        title: C ? "Edit Service" : "Add Service",
        onClose: gt,
        children: h.jsxs("form", {
          onSubmit: lt,
          style: { display: "grid", gap: 8 },
          children: [
            h.jsxs("label", {
              style: ee.label,
              children: [
                "Name ",
                h.jsx("span", { style: { color: "red" }, children: "*" }),
                h.jsx("input", {
                  value: T,
                  onChange: (R) => D(R.target.value),
                  style: ee.input,
                  disabled: G,
                }),
              ],
            }),
            h.jsxs("label", {
              style: ee.label,
              children: [
                "Garment ",
                h.jsx("span", { style: { color: "red" }, children: "*" }),
                h.jsx("div", {
                  children: m
                    ? h.jsx("div", { children: "Loading garments..." })
                    : h.jsxs("select", {
                        value: O,
                        onChange: (R) => B(R.target.value),
                        style: ee.select,
                        disabled: G,
                        children: [
                          h.jsx("option", {
                            value: "",
                            children: "select garment",
                          }),
                          s.map((R) =>
                            h.jsx(
                              "option",
                              { value: R.garment_id, children: R.garment_name },
                              R.garment_id
                            )
                          ),
                        ],
                      }),
                }),
              ],
            }),
            nt && h.jsx("div", { style: ee.validationError, children: nt }),
            h.jsxs("div", {
              style: {
                display: "flex",
                gap: 8,
                justifyContent: "flex-end",
                marginTop: 8,
              },
              children: [
                h.jsx("button", {
                  type: "button",
                  onClick: gt,
                  style: ee.cancelBtn,
                  disabled: G,
                  children: "Cancel",
                }),
                h.jsx("button", {
                  type: "submit",
                  style: ee.primaryBtn,
                  disabled: G,
                  children: G ? "Saving..." : C ? "Update" : "Create",
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
const ee = {
  container: {
    maxWidth: 980,
    margin: "24px auto",
    padding: 16,
    fontFamily: "Inter, Roboto, Arial, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    boxShadow: "0 1px 0 rgba(0,0,0,0.06)",
  },
  empty: { color: "#666", padding: 24 },
  primaryBtn: {
    background: "#0b74de",
    color: "#fff",
    border: 0,
    padding: "8px 12px",
    borderRadius: 6,
    cursor: "pointer",
  },
  secondaryBtn: {
    background: "#f3f4f6",
    color: "#111",
    border: "1px solid #e5e7eb",
    padding: "6px 10px",
    borderRadius: 6,
    cursor: "pointer",
  },
  dangerBtn: {
    background: "#ffecec",
    color: "#b91c1c",
    border: "1px solid #f1a1a1",
    padding: "6px 10px",
    borderRadius: 6,
    cursor: "pointer",
  },
  cancelBtn: {
    background: "#fff",
    color: "#111",
    border: "1px solid #e5e7eb",
    padding: "8px 12px",
    borderRadius: 6,
    cursor: "pointer",
  },
  input: {
    width: "100%",
    padding: "8px 10px",
    borderRadius: 6,
    border: "1px solid #d1d5db",
    marginTop: 6,
    boxSizing: "border-box",
  },
  select: {
    width: "100%",
    padding: "8px 10px",
    borderRadius: 6,
    border: "1px solid #d1d5db",
    marginTop: 6,
    boxSizing: "border-box",
  },
  label: { display: "block", fontSize: 14 },
  validationError: { color: "#b91c1c", marginTop: 6 },
  error: { color: "#b91c1c", marginBottom: 8 },
  modalBackdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.35)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    padding: 16,
  },
  modal: {
    width: 600,
    maxWidth: "100%",
    background: "#fff",
    borderRadius: 8,
    boxShadow: "0 12px 60px rgba(0,0,0,0.12)",
    overflow: "hidden",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 16px",
    borderBottom: "1px solid #eef2f6",
  },
  closeBtn: {
    background: "transparent",
    border: 0,
    fontSize: 20,
    cursor: "pointer",
    lineHeight: 1,
  },
  modalBody: { padding: 16 },
};
var Wo = { exports: {} },
  Io = {};
var ty;
function k1() {
  if (ty) return Io;
  ty = 1;
  var l = vr();
  function u(S, C) {
    return (S === C && (S !== 0 || 1 / S === 1 / C)) || (S !== S && C !== C);
  }
  var s = typeof Object.is == "function" ? Object.is : u,
    o = l.useState,
    c = l.useEffect,
    d = l.useLayoutEffect,
    m = l.useDebugValue;
  function g(S, C) {
    var U = C(),
      T = o({ inst: { value: U, getSnapshot: C } }),
      D = T[0].inst,
      O = T[1];
    return (
      d(
        function () {
          (D.value = U), (D.getSnapshot = C), v(D) && O({ inst: D });
        },
        [S, U, C]
      ),
      c(
        function () {
          return (
            v(D) && O({ inst: D }),
            S(function () {
              v(D) && O({ inst: D });
            })
          );
        },
        [S]
      ),
      m(U),
      U
    );
  }
  function v(S) {
    var C = S.getSnapshot;
    S = S.value;
    try {
      var U = C();
      return !s(S, U);
    } catch {
      return !0;
    }
  }
  function y(S, C) {
    return C();
  }
  var b =
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
      ? y
      : g;
  return (
    (Io.useSyncExternalStore =
      l.useSyncExternalStore !== void 0 ? l.useSyncExternalStore : b),
    Io
  );
}
var ey;
function K1() {
  return ey || ((ey = 1), (Wo.exports = k1())), Wo.exports;
}
var ny = K1();
const Jy = 0,
  $y = 1,
  Fy = 2,
  ay = 3;
var ly = Object.prototype.hasOwnProperty;
function cc(l, u) {
  var s, o;
  if (l === u) return !0;
  if (l && u && (s = l.constructor) === u.constructor) {
    if (s === Date) return l.getTime() === u.getTime();
    if (s === RegExp) return l.toString() === u.toString();
    if (s === Array) {
      if ((o = l.length) === u.length) for (; o-- && cc(l[o], u[o]); );
      return o === -1;
    }
    if (!s || typeof l == "object") {
      o = 0;
      for (s in l)
        if (
          (ly.call(l, s) && ++o && !ly.call(u, s)) ||
          !(s in u) ||
          !cc(l[s], u[s])
        )
          return !1;
      return Object.keys(u).length === o;
    }
  }
  return l !== l && u !== u;
}
const Nn = new WeakMap(),
  Mn = () => {},
  ne = Mn(),
  fc = Object,
  Tt = (l) => l === ne,
  fn = (l) => typeof l == "function",
  Ie = (l, u) => ({ ...l, ...u }),
  Wy = (l) => fn(l.then),
  Po = {},
  ur = {},
  Cc = "undefined",
  Mi = typeof window != Cc,
  dc = typeof document != Cc,
  J1 = Mi && "Deno" in window,
  $1 = () => Mi && typeof window.requestAnimationFrame != Cc,
  Iy = (l, u) => {
    const s = Nn.get(l);
    return [
      () => (!Tt(u) && l.get(u)) || Po,
      (o) => {
        if (!Tt(u)) {
          const c = l.get(u);
          u in ur || (ur[u] = c), s[5](u, Ie(c, o), c || Po);
        }
      },
      s[6],
      () => (!Tt(u) && u in ur ? ur[u] : (!Tt(u) && l.get(u)) || Po),
    ];
  };
let mc = !0;
const F1 = () => mc,
  [hc, yc] =
    Mi && window.addEventListener
      ? [
          window.addEventListener.bind(window),
          window.removeEventListener.bind(window),
        ]
      : [Mn, Mn],
  W1 = () => {
    const l = dc && document.visibilityState;
    return Tt(l) || l !== "hidden";
  },
  I1 = (l) => (
    dc && document.addEventListener("visibilitychange", l),
    hc("focus", l),
    () => {
      dc && document.removeEventListener("visibilitychange", l), yc("focus", l);
    }
  ),
  P1 = (l) => {
    const u = () => {
        (mc = !0), l();
      },
      s = () => {
        mc = !1;
      };
    return (
      hc("online", u),
      hc("offline", s),
      () => {
        yc("online", u), yc("offline", s);
      }
    );
  },
  tb = { isOnline: F1, isVisible: W1 },
  eb = { initFocus: I1, initReconnect: P1 },
  pc = !wi.useId,
  bl = !Mi || J1,
  nb = (l) => ($1() ? window.requestAnimationFrame(l) : setTimeout(l, 1)),
  Ri = bl ? E.useEffect : E.useLayoutEffect,
  tc = typeof navigator < "u" && navigator.connection,
  iy =
    !bl && tc && (["slow-2g", "2g"].includes(tc.effectiveType) || tc.saveData),
  rr = new WeakMap(),
  ab = (l) => fc.prototype.toString.call(l),
  ec = (l, u) => l === `[object ${u}]`;
let lb = 0;
const gc = (l) => {
    const u = typeof l,
      s = ab(l),
      o = ec(s, "Date"),
      c = ec(s, "RegExp"),
      d = ec(s, "Object");
    let m, g;
    if (fc(l) === l && !o && !c) {
      if (((m = rr.get(l)), m)) return m;
      if (((m = ++lb + "~"), rr.set(l, m), Array.isArray(l))) {
        for (m = "@", g = 0; g < l.length; g++) m += gc(l[g]) + ",";
        rr.set(l, m);
      }
      if (d) {
        m = "#";
        const v = fc.keys(l).sort();
        for (; !Tt((g = v.pop())); )
          Tt(l[g]) || (m += g + ":" + gc(l[g]) + ",");
        rr.set(l, m);
      }
    } else
      m = o
        ? l.toJSON()
        : u == "symbol"
        ? l.toString()
        : u == "string"
        ? JSON.stringify(l)
        : "" + l;
    return m;
  },
  xr = (l) => {
    if (fn(l))
      try {
        l = l();
      } catch {
        l = "";
      }
    const u = l;
    return (
      (l =
        typeof l == "string"
          ? l
          : (Array.isArray(l) ? l.length : l)
          ? gc(l)
          : ""),
      [l, u]
    );
  };
let ib = 0;
const ji = () => ++ib;
async function Py(...l) {
  const [u, s, o, c] = l,
    d = Ie(
      { populateCache: !0, throwOnError: !0 },
      typeof c == "boolean" ? { revalidate: c } : c || {}
    );
  let m = d.populateCache;
  const g = d.rollbackOnError;
  let v = d.optimisticData;
  const y = (C) => (typeof g == "function" ? g(C) : g !== !1),
    b = d.throwOnError;
  if (fn(s)) {
    const C = s,
      U = [],
      T = u.keys();
    for (const D of T) !/^\$(inf|sub)\$/.test(D) && C(u.get(D)._k) && U.push(D);
    return Promise.all(U.map(S));
  }
  return S(s);
  async function S(C) {
    const [U] = xr(C);
    if (!U) return;
    const [T, D] = Iy(u, U),
      [O, B, N, k] = Nn.get(u),
      G = () => {
        const lt = O[U];
        return (fn(d.revalidate)
          ? d.revalidate(T().data, C)
          : d.revalidate !== !1) && (delete N[U], delete k[U], lt && lt[0])
          ? lt[0](Fy).then(() => T().data)
          : T().data;
      };
    if (l.length < 3) return G();
    let K = o,
      nt,
      q = !1;
    const P = ji();
    B[U] = [P, 0];
    const W = !Tt(v),
      yt = T(),
      ot = yt.data,
      gt = yt._c,
      J = Tt(gt) ? ot : gt;
    if ((W && ((v = fn(v) ? v(J, ot) : v), D({ data: v, _c: J })), fn(K)))
      try {
        K = K(J);
      } catch (lt) {
        (nt = lt), (q = !0);
      }
    if (K && Wy(K))
      if (
        ((K = await K.catch((lt) => {
          (nt = lt), (q = !0);
        })),
        P !== B[U][0])
      ) {
        if (q) throw nt;
        return K;
      } else q && W && y(nt) && ((m = !0), D({ data: J, _c: ne }));
    if (m && !q)
      if (fn(m)) {
        const lt = m(K, J);
        D({ data: lt, error: ne, _c: ne });
      } else D({ data: K, error: ne, _c: ne });
    if (
      ((B[U][1] = ji()),
      Promise.resolve(G()).then(() => {
        D({ _c: ne });
      }),
      q)
    ) {
      if (b) throw nt;
      return;
    }
    return K;
  }
}
const uy = (l, u) => {
    for (const s in l) l[s][0] && l[s][0](u);
  },
  ub = (l, u) => {
    if (!Nn.has(l)) {
      const s = Ie(eb, u),
        o = Object.create(null),
        c = Py.bind(ne, l);
      let d = Mn;
      const m = Object.create(null),
        g = (b, S) => {
          const C = m[b] || [];
          return (m[b] = C), C.push(S), () => C.splice(C.indexOf(S), 1);
        },
        v = (b, S, C) => {
          l.set(b, S);
          const U = m[b];
          if (U) for (const T of U) T(S, C);
        },
        y = () => {
          if (
            !Nn.has(l) &&
            (Nn.set(l, [
              o,
              Object.create(null),
              Object.create(null),
              Object.create(null),
              c,
              v,
              g,
            ]),
            !bl)
          ) {
            const b = s.initFocus(setTimeout.bind(ne, uy.bind(ne, o, Jy))),
              S = s.initReconnect(setTimeout.bind(ne, uy.bind(ne, o, $y)));
            d = () => {
              b && b(), S && S(), Nn.delete(l);
            };
          }
        };
      return y(), [l, c, y, d];
    }
    return [l, Nn.get(l)[4]];
  },
  rb = (l, u, s, o, c) => {
    const d = s.errorRetryCount,
      m = c.retryCount,
      g =
        ~~((Math.random() + 0.5) * (1 << (m < 8 ? m : 8))) *
        s.errorRetryInterval;
    (!Tt(d) && m > d) || setTimeout(o, g, c);
  },
  sb = cc,
  [tp, ob] = ub(new Map()),
  cb = Ie(
    {
      onLoadingSlow: Mn,
      onSuccess: Mn,
      onError: Mn,
      onErrorRetry: rb,
      onDiscarded: Mn,
      revalidateOnFocus: !0,
      revalidateOnReconnect: !0,
      revalidateIfStale: !0,
      shouldRetryOnError: !0,
      errorRetryInterval: iy ? 1e4 : 5e3,
      focusThrottleInterval: 5 * 1e3,
      dedupingInterval: 2 * 1e3,
      loadingTimeout: iy ? 5e3 : 3e3,
      compare: sb,
      isPaused: () => !1,
      cache: tp,
      mutate: ob,
      fallback: {},
    },
    tb
  ),
  fb = (l, u) => {
    const s = Ie(l, u);
    if (u) {
      const { use: o, fallback: c } = l,
        { use: d, fallback: m } = u;
      o && d && (s.use = o.concat(d)), c && m && (s.fallback = Ie(c, m));
    }
    return s;
  },
  db = E.createContext({}),
  mb = "$inf$",
  ep = Mi && window.__SWR_DEVTOOLS_USE__,
  hb = ep ? window.__SWR_DEVTOOLS_USE__ : [],
  yb = () => {
    ep && (window.__SWR_DEVTOOLS_REACT__ = wi);
  },
  np = (l) =>
    fn(l[1])
      ? [l[0], l[1], l[2] || {}]
      : [l[0], null, (l[1] === null ? l[2] : l[1]) || {}],
  wc = () => {
    const l = E.useContext(db);
    return E.useMemo(() => Ie(cb, l), [l]);
  },
  pb = (l) => (u, s, o) =>
    l(
      u,
      s &&
        ((...d) => {
          const [m] = xr(u),
            [, , , g] = Nn.get(tp);
          if (m.startsWith(mb)) return s(...d);
          const v = g[m];
          return Tt(v) ? s(...d) : (delete g[m], v);
        }),
      o
    ),
  gb = hb.concat(pb),
  vb = (l) =>
    function (...s) {
      const o = wc(),
        [c, d, m] = np(s),
        g = fb(o, m);
      let v = l;
      const { use: y } = g,
        b = (y || []).concat(gb);
      for (let S = b.length; S--; ) v = b[S](v);
      return v(c, d || g.fetcher || null, g);
    },
  bb = (l, u, s) => {
    const o = u[l] || (u[l] = []);
    return (
      o.push(s),
      () => {
        const c = o.indexOf(s);
        c >= 0 && ((o[c] = o[o.length - 1]), o.pop());
      }
    );
  },
  Sb =
    (l, u) =>
    (...s) => {
      const [o, c, d] = np(s),
        m = (d.use || []).concat(u);
      return l(o, c, { ...d, use: m });
    };
yb();
const nc =
    wi.use ||
    ((l) => {
      switch (l.status) {
        case "pending":
          throw l;
        case "fulfilled":
          return l.value;
        case "rejected":
          throw l.reason;
        default:
          throw (
            ((l.status = "pending"),
            l.then(
              (u) => {
                (l.status = "fulfilled"), (l.value = u);
              },
              (u) => {
                (l.status = "rejected"), (l.reason = u);
              }
            ),
            l)
          );
      }
    }),
  ac = { dedupe: !0 },
  ry = Promise.resolve(ne),
  xb = (l, u, s) => {
    const {
        cache: o,
        compare: c,
        suspense: d,
        fallbackData: m,
        revalidateOnMount: g,
        revalidateIfStale: v,
        refreshInterval: y,
        refreshWhenHidden: b,
        refreshWhenOffline: S,
        keepPreviousData: C,
        strictServerPrefetchWarning: U,
      } = s,
      [T, D, O, B] = Nn.get(o),
      [N, k] = xr(l),
      G = E.useRef(!1),
      K = E.useRef(!1),
      nt = E.useRef(N),
      q = E.useRef(u),
      P = E.useRef(s),
      W = () => P.current,
      yt = () => W().isVisible() && W().isOnline(),
      [ot, gt, J, lt] = Iy(o, N),
      tt = E.useRef({}).current,
      R = Tt(m) ? (Tt(s.fallback) ? ne : s.fallback[N]) : m,
      Z = (jt, Yt) => {
        for (const Xt in tt) {
          const Bt = Xt;
          if (Bt === "data") {
            if (!c(jt[Bt], Yt[Bt]) && (!Tt(jt[Bt]) || !c(ct, Yt[Bt])))
              return !1;
          } else if (Yt[Bt] !== jt[Bt]) return !1;
        }
        return !0;
      },
      $ = E.useMemo(() => {
        const jt =
            !N || !u ? !1 : Tt(g) ? (W().isPaused() || d ? !1 : v !== !1) : g,
          Yt = (se) => {
            const Qt = Ie(se);
            return (
              delete Qt._k, jt ? { isValidating: !0, isLoading: !0, ...Qt } : Qt
            );
          },
          Xt = ot(),
          Bt = lt(),
          ve = Yt(Xt),
          an = Xt === Bt ? ve : Yt(Bt);
        let ae = ve;
        return [
          () => {
            const se = Yt(ot());
            return Z(se, ae)
              ? ((ae.data = se.data),
                (ae.isLoading = se.isLoading),
                (ae.isValidating = se.isValidating),
                (ae.error = se.error),
                ae)
              : ((ae = se), se);
          },
          () => an,
        ];
      }, [o, N]),
      ut = ny.useSyncExternalStore(
        E.useCallback(
          (jt) =>
            J(N, (Yt, Xt) => {
              Z(Xt, Yt) || jt();
            }),
          [o, N]
        ),
        $[0],
        $[1]
      ),
      dt = !G.current,
      _ = T[N] && T[N].length > 0,
      Y = ut.data,
      F = Tt(Y) ? (R && Wy(R) ? nc(R) : R) : Y,
      I = ut.error,
      st = E.useRef(F),
      ct = C ? (Tt(Y) ? (Tt(st.current) ? F : st.current) : Y) : F,
      vt = N && Tt(F),
      re =
        !bl &&
        ny.useSyncExternalStore(
          () => Mn,
          () => !1,
          () => !0
        );
    U &&
      re &&
      !d &&
      vt &&
      console.warn(
        `Missing pre-initiated data for serialized key "${N}" during server-side rendering. Data fethcing should be initiated on the server and provided to SWR via fallback data. You can set "strictServerPrefetchWarning: false" to disable this warning.`
      );
    const qt =
        _ && !Tt(I)
          ? !1
          : dt && !Tt(g)
          ? g
          : W().isPaused()
          ? !1
          : d
          ? Tt(F)
            ? !1
            : v
          : Tt(F) || v,
      Ln = !!(N && u && dt && qt),
      za = Tt(ut.isValidating) ? Ln : ut.isValidating,
      Al = Tt(ut.isLoading) ? Ln : ut.isLoading,
      Hn = E.useCallback(
        async (jt) => {
          const Yt = q.current;
          if (!N || !Yt || K.current || W().isPaused()) return !1;
          let Xt,
            Bt,
            ve = !0;
          const an = jt || {},
            ae = !O[N] || !an.dedupe,
            se = () =>
              pc
                ? !K.current && N === nt.current && G.current
                : N === nt.current,
            Qt = { isValidating: !1, isLoading: !1 },
            Gi = () => {
              gt(Qt);
            },
            Rl = () => {
              const oe = O[N];
              oe && oe[1] === Bt && delete O[N];
            },
            Ol = { isValidating: !0 };
          Tt(ot().data) && (Ol.isLoading = !0);
          try {
            if (
              (ae &&
                (gt(Ol),
                s.loadingTimeout &&
                  Tt(ot().data) &&
                  setTimeout(() => {
                    ve && se() && W().onLoadingSlow(N, s);
                  }, s.loadingTimeout),
                (O[N] = [Yt(k), ji()])),
              ([Xt, Bt] = O[N]),
              (Xt = await Xt),
              ae && setTimeout(Rl, s.dedupingInterval),
              !O[N] || O[N][1] !== Bt)
            )
              return ae && se() && W().onDiscarded(N), !1;
            Qt.error = ne;
            const oe = D[N];
            if (!Tt(oe) && (Bt <= oe[0] || Bt <= oe[1] || oe[1] === 0))
              return Gi(), ae && se() && W().onDiscarded(N), !1;
            const Je = ot().data;
            (Qt.data = c(Je, Xt) ? Je : Xt),
              ae && se() && W().onSuccess(Xt, N, s);
          } catch (oe) {
            Rl();
            const Je = W(),
              { shouldRetryOnError: Na } = Je;
            Je.isPaused() ||
              ((Qt.error = oe),
              ae &&
                se() &&
                (Je.onError(oe, N, Je),
                (Na === !0 || (fn(Na) && Na(oe))) &&
                  (!W().revalidateOnFocus ||
                    !W().revalidateOnReconnect ||
                    yt()) &&
                  Je.onErrorRetry(
                    oe,
                    N,
                    Je,
                    (Cr) => {
                      const jl = T[N];
                      jl && jl[0] && jl[0](ay, Cr);
                    },
                    { retryCount: (an.retryCount || 0) + 1, dedupe: !0 }
                  )));
          }
          return (ve = !1), Gi(), !0;
        },
        [N, o]
      ),
      nn = E.useCallback((...jt) => Py(o, nt.current, ...jt), []);
    if (
      (Ri(() => {
        (q.current = u), (P.current = s), Tt(Y) || (st.current = Y);
      }),
      Ri(() => {
        if (!N) return;
        const jt = Hn.bind(ne, ac);
        let Yt = 0;
        W().revalidateOnFocus && (Yt = Date.now() + W().focusThrottleInterval);
        const Bt = bb(N, T, (ve, an = {}) => {
          if (ve == Jy) {
            const ae = Date.now();
            W().revalidateOnFocus &&
              ae > Yt &&
              yt() &&
              ((Yt = ae + W().focusThrottleInterval), jt());
          } else if (ve == $y) W().revalidateOnReconnect && yt() && jt();
          else {
            if (ve == Fy) return Hn();
            if (ve == ay) return Hn(an);
          }
        });
        return (
          (K.current = !1),
          (nt.current = N),
          (G.current = !0),
          gt({ _k: k }),
          qt && (O[N] || (Tt(F) || bl ? jt() : nb(jt))),
          () => {
            (K.current = !0), Bt();
          }
        );
      }, [N]),
      Ri(() => {
        let jt;
        function Yt() {
          const Bt = fn(y) ? y(ot().data) : y;
          Bt && jt !== -1 && (jt = setTimeout(Xt, Bt));
        }
        function Xt() {
          !ot().error && (b || W().isVisible()) && (S || W().isOnline())
            ? Hn(ac).then(Yt)
            : Yt();
        }
        return (
          Yt(),
          () => {
            jt && (clearTimeout(jt), (jt = -1));
          }
        );
      }, [y, b, S, N]),
      E.useDebugValue(ct),
      d)
    ) {
      if (!pc && bl && vt)
        throw new Error(
          "Fallback data is required when using Suspense in SSR."
        );
      vt && ((q.current = u), (P.current = s), (K.current = !1));
      const jt = B[N],
        Yt = !Tt(jt) && vt ? nn(jt) : ry;
      if ((nc(Yt), !Tt(I) && vt)) throw I;
      const Xt = vt ? Hn(ac) : ry;
      !Tt(ct) && vt && ((Xt.status = "fulfilled"), (Xt.value = !0)), nc(Xt);
    }
    return {
      mutate: nn,
      get data() {
        return (tt.data = !0), ct;
      },
      get error() {
        return (tt.error = !0), I;
      },
      get isValidating() {
        return (tt.isValidating = !0), za;
      },
      get isLoading() {
        return (tt.isLoading = !0), Al;
      },
    };
  },
  ap = vb(xb),
  Eb = "https://api.shivaliwashingcompany.in/";
function lp(l, u) {
  return function () {
    return l.apply(u, arguments);
  };
}
const { toString: _b } = Object.prototype,
  { getPrototypeOf: Dc } = Object,
  { iterator: Er, toStringTag: ip } = Symbol,
  _r = ((l) => (u) => {
    const s = _b.call(u);
    return l[s] || (l[s] = s.slice(8, -1).toLowerCase());
  })(Object.create(null)),
  en = (l) => ((l = l.toLowerCase()), (u) => _r(u) === l),
  Tr = (l) => (u) => typeof u === l,
  { isArray: _l } = Array,
  Sl = Tr("undefined");
function Ui(l) {
  return (
    l !== null &&
    !Sl(l) &&
    l.constructor !== null &&
    !Sl(l.constructor) &&
    Oe(l.constructor.isBuffer) &&
    l.constructor.isBuffer(l)
  );
}
const up = en("ArrayBuffer");
function Tb(l) {
  let u;
  return (
    typeof ArrayBuffer < "u" && ArrayBuffer.isView
      ? (u = ArrayBuffer.isView(l))
      : (u = l && l.buffer && up(l.buffer)),
    u
  );
}
const Ab = Tr("string"),
  Oe = Tr("function"),
  rp = Tr("number"),
  Bi = (l) => l !== null && typeof l == "object",
  Rb = (l) => l === !0 || l === !1,
  mr = (l) => {
    if (_r(l) !== "object") return !1;
    const u = Dc(l);
    return (
      (u === null ||
        u === Object.prototype ||
        Object.getPrototypeOf(u) === null) &&
      !(ip in l) &&
      !(Er in l)
    );
  },
  Ob = (l) => {
    if (!Bi(l) || Ui(l)) return !1;
    try {
      return (
        Object.keys(l).length === 0 &&
        Object.getPrototypeOf(l) === Object.prototype
      );
    } catch {
      return !1;
    }
  },
  jb = en("Date"),
  Cb = en("File"),
  wb = en("Blob"),
  Db = en("FileList"),
  zb = (l) => Bi(l) && Oe(l.pipe),
  Nb = (l) => {
    let u;
    return (
      l &&
      ((typeof FormData == "function" && l instanceof FormData) ||
        (Oe(l.append) &&
          ((u = _r(l)) === "formdata" ||
            (u === "object" &&
              Oe(l.toString) &&
              l.toString() === "[object FormData]"))))
    );
  },
  Mb = en("URLSearchParams"),
  [Ub, Bb, Lb, Hb] = ["ReadableStream", "Request", "Response", "Headers"].map(
    en
  ),
  qb = (l) =>
    l.trim ? l.trim() : l.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Li(l, u, { allOwnKeys: s = !1 } = {}) {
  if (l === null || typeof l > "u") return;
  let o, c;
  if ((typeof l != "object" && (l = [l]), _l(l)))
    for (o = 0, c = l.length; o < c; o++) u.call(null, l[o], o, l);
  else {
    if (Ui(l)) return;
    const d = s ? Object.getOwnPropertyNames(l) : Object.keys(l),
      m = d.length;
    let g;
    for (o = 0; o < m; o++) (g = d[o]), u.call(null, l[g], g, l);
  }
}
function sp(l, u) {
  if (Ui(l)) return null;
  u = u.toLowerCase();
  const s = Object.keys(l);
  let o = s.length,
    c;
  for (; o-- > 0; ) if (((c = s[o]), u === c.toLowerCase())) return c;
  return null;
}
const Ca =
    typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : window,
  op = (l) => !Sl(l) && l !== Ca;
function vc() {
  const { caseless: l, skipUndefined: u } = (op(this) && this) || {},
    s = {},
    o = (c, d) => {
      const m = (l && sp(s, d)) || d;
      mr(s[m]) && mr(c)
        ? (s[m] = vc(s[m], c))
        : mr(c)
        ? (s[m] = vc({}, c))
        : _l(c)
        ? (s[m] = c.slice())
        : (!u || !Sl(c)) && (s[m] = c);
    };
  for (let c = 0, d = arguments.length; c < d; c++)
    arguments[c] && Li(arguments[c], o);
  return s;
}
const Yb = (l, u, s, { allOwnKeys: o } = {}) => (
    Li(
      u,
      (c, d) => {
        s && Oe(c) ? (l[d] = lp(c, s)) : (l[d] = c);
      },
      { allOwnKeys: o }
    ),
    l
  ),
  Gb = (l) => (l.charCodeAt(0) === 65279 && (l = l.slice(1)), l),
  Vb = (l, u, s, o) => {
    (l.prototype = Object.create(u.prototype, o)),
      (l.prototype.constructor = l),
      Object.defineProperty(l, "super", { value: u.prototype }),
      s && Object.assign(l.prototype, s);
  },
  Xb = (l, u, s, o) => {
    let c, d, m;
    const g = {};
    if (((u = u || {}), l == null)) return u;
    do {
      for (c = Object.getOwnPropertyNames(l), d = c.length; d-- > 0; )
        (m = c[d]), (!o || o(m, l, u)) && !g[m] && ((u[m] = l[m]), (g[m] = !0));
      l = s !== !1 && Dc(l);
    } while (l && (!s || s(l, u)) && l !== Object.prototype);
    return u;
  },
  Qb = (l, u, s) => {
    (l = String(l)),
      (s === void 0 || s > l.length) && (s = l.length),
      (s -= u.length);
    const o = l.indexOf(u, s);
    return o !== -1 && o === s;
  },
  Zb = (l) => {
    if (!l) return null;
    if (_l(l)) return l;
    let u = l.length;
    if (!rp(u)) return null;
    const s = new Array(u);
    for (; u-- > 0; ) s[u] = l[u];
    return s;
  },
  kb = (
    (l) => (u) =>
      l && u instanceof l
  )(typeof Uint8Array < "u" && Dc(Uint8Array)),
  Kb = (l, u) => {
    const o = (l && l[Er]).call(l);
    let c;
    for (; (c = o.next()) && !c.done; ) {
      const d = c.value;
      u.call(l, d[0], d[1]);
    }
  },
  Jb = (l, u) => {
    let s;
    const o = [];
    for (; (s = l.exec(u)) !== null; ) o.push(s);
    return o;
  },
  $b = en("HTMLFormElement"),
  Fb = (l) =>
    l.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (s, o, c) {
      return o.toUpperCase() + c;
    }),
  sy = (
    ({ hasOwnProperty: l }) =>
    (u, s) =>
      l.call(u, s)
  )(Object.prototype),
  Wb = en("RegExp"),
  cp = (l, u) => {
    const s = Object.getOwnPropertyDescriptors(l),
      o = {};
    Li(s, (c, d) => {
      let m;
      (m = u(c, d, l)) !== !1 && (o[d] = m || c);
    }),
      Object.defineProperties(l, o);
  },
  Ib = (l) => {
    cp(l, (u, s) => {
      if (Oe(l) && ["arguments", "caller", "callee"].indexOf(s) !== -1)
        return !1;
      const o = l[s];
      if (Oe(o)) {
        if (((u.enumerable = !1), "writable" in u)) {
          u.writable = !1;
          return;
        }
        u.set ||
          (u.set = () => {
            throw Error("Can not rewrite read-only method '" + s + "'");
          });
      }
    });
  },
  Pb = (l, u) => {
    const s = {},
      o = (c) => {
        c.forEach((d) => {
          s[d] = !0;
        });
      };
    return _l(l) ? o(l) : o(String(l).split(u)), s;
  },
  tS = () => {},
  eS = (l, u) => (l != null && Number.isFinite((l = +l)) ? l : u);
function nS(l) {
  return !!(l && Oe(l.append) && l[ip] === "FormData" && l[Er]);
}
const aS = (l) => {
    const u = new Array(10),
      s = (o, c) => {
        if (Bi(o)) {
          if (u.indexOf(o) >= 0) return;
          if (Ui(o)) return o;
          if (!("toJSON" in o)) {
            u[c] = o;
            const d = _l(o) ? [] : {};
            return (
              Li(o, (m, g) => {
                const v = s(m, c + 1);
                !Sl(v) && (d[g] = v);
              }),
              (u[c] = void 0),
              d
            );
          }
        }
        return o;
      };
    return s(l, 0);
  },
  lS = en("AsyncFunction"),
  iS = (l) => l && (Bi(l) || Oe(l)) && Oe(l.then) && Oe(l.catch),
  fp = ((l, u) =>
    l
      ? setImmediate
      : u
      ? ((s, o) => (
          Ca.addEventListener(
            "message",
            ({ source: c, data: d }) => {
              c === Ca && d === s && o.length && o.shift()();
            },
            !1
          ),
          (c) => {
            o.push(c), Ca.postMessage(s, "*");
          }
        ))(`axios@${Math.random()}`, [])
      : (s) => setTimeout(s))(
    typeof setImmediate == "function",
    Oe(Ca.postMessage)
  ),
  uS =
    typeof queueMicrotask < "u"
      ? queueMicrotask.bind(Ca)
      : (typeof process < "u" && process.nextTick) || fp,
  rS = (l) => l != null && Oe(l[Er]),
  L = {
    isArray: _l,
    isArrayBuffer: up,
    isBuffer: Ui,
    isFormData: Nb,
    isArrayBufferView: Tb,
    isString: Ab,
    isNumber: rp,
    isBoolean: Rb,
    isObject: Bi,
    isPlainObject: mr,
    isEmptyObject: Ob,
    isReadableStream: Ub,
    isRequest: Bb,
    isResponse: Lb,
    isHeaders: Hb,
    isUndefined: Sl,
    isDate: jb,
    isFile: Cb,
    isBlob: wb,
    isRegExp: Wb,
    isFunction: Oe,
    isStream: zb,
    isURLSearchParams: Mb,
    isTypedArray: kb,
    isFileList: Db,
    forEach: Li,
    merge: vc,
    extend: Yb,
    trim: qb,
    stripBOM: Gb,
    inherits: Vb,
    toFlatObject: Xb,
    kindOf: _r,
    kindOfTest: en,
    endsWith: Qb,
    toArray: Zb,
    forEachEntry: Kb,
    matchAll: Jb,
    isHTMLForm: $b,
    hasOwnProperty: sy,
    hasOwnProp: sy,
    reduceDescriptors: cp,
    freezeMethods: Ib,
    toObjectSet: Pb,
    toCamelCase: Fb,
    noop: tS,
    toFiniteNumber: eS,
    findKey: sp,
    global: Ca,
    isContextDefined: op,
    isSpecCompliantForm: nS,
    toJSONObject: aS,
    isAsyncFn: lS,
    isThenable: iS,
    setImmediate: fp,
    asap: uS,
    isIterable: rS,
  };
function ht(l, u, s, o, c) {
  Error.call(this),
    Error.captureStackTrace
      ? Error.captureStackTrace(this, this.constructor)
      : (this.stack = new Error().stack),
    (this.message = l),
    (this.name = "AxiosError"),
    u && (this.code = u),
    s && (this.config = s),
    o && (this.request = o),
    c && ((this.response = c), (this.status = c.status ? c.status : null));
}
L.inherits(ht, Error, {
  toJSON: function () {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: L.toJSONObject(this.config),
      code: this.code,
      status: this.status,
    };
  },
});
const dp = ht.prototype,
  mp = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL",
].forEach((l) => {
  mp[l] = { value: l };
});
Object.defineProperties(ht, mp);
Object.defineProperty(dp, "isAxiosError", { value: !0 });
ht.from = (l, u, s, o, c, d) => {
  const m = Object.create(dp);
  L.toFlatObject(
    l,
    m,
    function (b) {
      return b !== Error.prototype;
    },
    (y) => y !== "isAxiosError"
  );
  const g = l && l.message ? l.message : "Error",
    v = u == null && l ? l.code : u;
  return (
    ht.call(m, g, v, s, o, c),
    l &&
      m.cause == null &&
      Object.defineProperty(m, "cause", { value: l, configurable: !0 }),
    (m.name = (l && l.name) || "Error"),
    d && Object.assign(m, d),
    m
  );
};
const sS = null;
function bc(l) {
  return L.isPlainObject(l) || L.isArray(l);
}
function hp(l) {
  return L.endsWith(l, "[]") ? l.slice(0, -2) : l;
}
function oy(l, u, s) {
  return l
    ? l
        .concat(u)
        .map(function (c, d) {
          return (c = hp(c)), !s && d ? "[" + c + "]" : c;
        })
        .join(s ? "." : "")
    : u;
}
function oS(l) {
  return L.isArray(l) && !l.some(bc);
}
const cS = L.toFlatObject(L, {}, null, function (u) {
  return /^is[A-Z]/.test(u);
});
function Ar(l, u, s) {
  if (!L.isObject(l)) throw new TypeError("target must be an object");
  (u = u || new FormData()),
    (s = L.toFlatObject(
      s,
      { metaTokens: !0, dots: !1, indexes: !1 },
      !1,
      function (D, O) {
        return !L.isUndefined(O[D]);
      }
    ));
  const o = s.metaTokens,
    c = s.visitor || b,
    d = s.dots,
    m = s.indexes,
    v = (s.Blob || (typeof Blob < "u" && Blob)) && L.isSpecCompliantForm(u);
  if (!L.isFunction(c)) throw new TypeError("visitor must be a function");
  function y(T) {
    if (T === null) return "";
    if (L.isDate(T)) return T.toISOString();
    if (L.isBoolean(T)) return T.toString();
    if (!v && L.isBlob(T))
      throw new ht("Blob is not supported. Use a Buffer instead.");
    return L.isArrayBuffer(T) || L.isTypedArray(T)
      ? v && typeof Blob == "function"
        ? new Blob([T])
        : Buffer.from(T)
      : T;
  }
  function b(T, D, O) {
    let B = T;
    if (T && !O && typeof T == "object") {
      if (L.endsWith(D, "{}"))
        (D = o ? D : D.slice(0, -2)), (T = JSON.stringify(T));
      else if (
        (L.isArray(T) && oS(T)) ||
        ((L.isFileList(T) || L.endsWith(D, "[]")) && (B = L.toArray(T)))
      )
        return (
          (D = hp(D)),
          B.forEach(function (k, G) {
            !(L.isUndefined(k) || k === null) &&
              u.append(
                m === !0 ? oy([D], G, d) : m === null ? D : D + "[]",
                y(k)
              );
          }),
          !1
        );
    }
    return bc(T) ? !0 : (u.append(oy(O, D, d), y(T)), !1);
  }
  const S = [],
    C = Object.assign(cS, {
      defaultVisitor: b,
      convertValue: y,
      isVisitable: bc,
    });
  function U(T, D) {
    if (!L.isUndefined(T)) {
      if (S.indexOf(T) !== -1)
        throw Error("Circular reference detected in " + D.join("."));
      S.push(T),
        L.forEach(T, function (B, N) {
          (!(L.isUndefined(B) || B === null) &&
            c.call(u, B, L.isString(N) ? N.trim() : N, D, C)) === !0 &&
            U(B, D ? D.concat(N) : [N]);
        }),
        S.pop();
    }
  }
  if (!L.isObject(l)) throw new TypeError("data must be an object");
  return U(l), u;
}
function cy(l) {
  const u = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0",
  };
  return encodeURIComponent(l).replace(/[!'()~]|%20|%00/g, function (o) {
    return u[o];
  });
}
function zc(l, u) {
  (this._pairs = []), l && Ar(l, this, u);
}
const yp = zc.prototype;
yp.append = function (u, s) {
  this._pairs.push([u, s]);
};
yp.toString = function (u) {
  const s = u
    ? function (o) {
        return u.call(this, o, cy);
      }
    : cy;
  return this._pairs
    .map(function (c) {
      return s(c[0]) + "=" + s(c[1]);
    }, "")
    .join("&");
};
function fS(l) {
  return encodeURIComponent(l)
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+");
}
function pp(l, u, s) {
  if (!u) return l;
  const o = (s && s.encode) || fS;
  L.isFunction(s) && (s = { serialize: s });
  const c = s && s.serialize;
  let d;
  if (
    (c
      ? (d = c(u, s))
      : (d = L.isURLSearchParams(u) ? u.toString() : new zc(u, s).toString(o)),
    d)
  ) {
    const m = l.indexOf("#");
    m !== -1 && (l = l.slice(0, m)),
      (l += (l.indexOf("?") === -1 ? "?" : "&") + d);
  }
  return l;
}
class fy {
  constructor() {
    this.handlers = [];
  }
  use(u, s, o) {
    return (
      this.handlers.push({
        fulfilled: u,
        rejected: s,
        synchronous: o ? o.synchronous : !1,
        runWhen: o ? o.runWhen : null,
      }),
      this.handlers.length - 1
    );
  }
  eject(u) {
    this.handlers[u] && (this.handlers[u] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(u) {
    L.forEach(this.handlers, function (o) {
      o !== null && u(o);
    });
  }
}
const gp = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1,
  },
  dS = typeof URLSearchParams < "u" ? URLSearchParams : zc,
  mS = typeof FormData < "u" ? FormData : null,
  hS = typeof Blob < "u" ? Blob : null,
  yS = {
    isBrowser: !0,
    classes: { URLSearchParams: dS, FormData: mS, Blob: hS },
    protocols: ["http", "https", "file", "blob", "url", "data"],
  },
  Nc = typeof window < "u" && typeof document < "u",
  Sc = (typeof navigator == "object" && navigator) || void 0,
  pS =
    Nc &&
    (!Sc || ["ReactNative", "NativeScript", "NS"].indexOf(Sc.product) < 0),
  gS =
    typeof WorkerGlobalScope < "u" &&
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts == "function",
  vS = (Nc && window.location.href) || "http://localhost",
  bS = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        hasBrowserEnv: Nc,
        hasStandardBrowserEnv: pS,
        hasStandardBrowserWebWorkerEnv: gS,
        navigator: Sc,
        origin: vS,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  ge = { ...bS, ...yS };
function SS(l, u) {
  return Ar(l, new ge.classes.URLSearchParams(), {
    visitor: function (s, o, c, d) {
      return ge.isNode && L.isBuffer(s)
        ? (this.append(o, s.toString("base64")), !1)
        : d.defaultVisitor.apply(this, arguments);
    },
    ...u,
  });
}
function xS(l) {
  return L.matchAll(/\w+|\[(\w*)]/g, l).map((u) =>
    u[0] === "[]" ? "" : u[1] || u[0]
  );
}
function ES(l) {
  const u = {},
    s = Object.keys(l);
  let o;
  const c = s.length;
  let d;
  for (o = 0; o < c; o++) (d = s[o]), (u[d] = l[d]);
  return u;
}
function vp(l) {
  function u(s, o, c, d) {
    let m = s[d++];
    if (m === "__proto__") return !0;
    const g = Number.isFinite(+m),
      v = d >= s.length;
    return (
      (m = !m && L.isArray(c) ? c.length : m),
      v
        ? (L.hasOwnProp(c, m) ? (c[m] = [c[m], o]) : (c[m] = o), !g)
        : ((!c[m] || !L.isObject(c[m])) && (c[m] = []),
          u(s, o, c[m], d) && L.isArray(c[m]) && (c[m] = ES(c[m])),
          !g)
    );
  }
  if (L.isFormData(l) && L.isFunction(l.entries)) {
    const s = {};
    return (
      L.forEachEntry(l, (o, c) => {
        u(xS(o), c, s, 0);
      }),
      s
    );
  }
  return null;
}
function _S(l, u, s) {
  if (L.isString(l))
    try {
      return (u || JSON.parse)(l), L.trim(l);
    } catch (o) {
      if (o.name !== "SyntaxError") throw o;
    }
  return (s || JSON.stringify)(l);
}
const Hi = {
  transitional: gp,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [
    function (u, s) {
      const o = s.getContentType() || "",
        c = o.indexOf("application/json") > -1,
        d = L.isObject(u);
      if ((d && L.isHTMLForm(u) && (u = new FormData(u)), L.isFormData(u)))
        return c ? JSON.stringify(vp(u)) : u;
      if (
        L.isArrayBuffer(u) ||
        L.isBuffer(u) ||
        L.isStream(u) ||
        L.isFile(u) ||
        L.isBlob(u) ||
        L.isReadableStream(u)
      )
        return u;
      if (L.isArrayBufferView(u)) return u.buffer;
      if (L.isURLSearchParams(u))
        return (
          s.setContentType(
            "application/x-www-form-urlencoded;charset=utf-8",
            !1
          ),
          u.toString()
        );
      let g;
      if (d) {
        if (o.indexOf("application/x-www-form-urlencoded") > -1)
          return SS(u, this.formSerializer).toString();
        if ((g = L.isFileList(u)) || o.indexOf("multipart/form-data") > -1) {
          const v = this.env && this.env.FormData;
          return Ar(
            g ? { "files[]": u } : u,
            v && new v(),
            this.formSerializer
          );
        }
      }
      return d || c ? (s.setContentType("application/json", !1), _S(u)) : u;
    },
  ],
  transformResponse: [
    function (u) {
      const s = this.transitional || Hi.transitional,
        o = s && s.forcedJSONParsing,
        c = this.responseType === "json";
      if (L.isResponse(u) || L.isReadableStream(u)) return u;
      if (u && L.isString(u) && ((o && !this.responseType) || c)) {
        const m = !(s && s.silentJSONParsing) && c;
        try {
          return JSON.parse(u, this.parseReviver);
        } catch (g) {
          if (m)
            throw g.name === "SyntaxError"
              ? ht.from(g, ht.ERR_BAD_RESPONSE, this, null, this.response)
              : g;
        }
      }
      return u;
    },
  ],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: { FormData: ge.classes.FormData, Blob: ge.classes.Blob },
  validateStatus: function (u) {
    return u >= 200 && u < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0,
    },
  },
};
L.forEach(["delete", "get", "head", "post", "put", "patch"], (l) => {
  Hi.headers[l] = {};
});
const TS = L.toObjectSet([
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent",
  ]),
  AS = (l) => {
    const u = {};
    let s, o, c;
    return (
      l &&
        l
          .split(
            `
`
          )
          .forEach(function (m) {
            (c = m.indexOf(":")),
              (s = m.substring(0, c).trim().toLowerCase()),
              (o = m.substring(c + 1).trim()),
              !(!s || (u[s] && TS[s])) &&
                (s === "set-cookie"
                  ? u[s]
                    ? u[s].push(o)
                    : (u[s] = [o])
                  : (u[s] = u[s] ? u[s] + ", " + o : o));
          }),
      u
    );
  },
  dy = Symbol("internals");
function Ti(l) {
  return l && String(l).trim().toLowerCase();
}
function hr(l) {
  return l === !1 || l == null ? l : L.isArray(l) ? l.map(hr) : String(l);
}
function RS(l) {
  const u = Object.create(null),
    s = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let o;
  for (; (o = s.exec(l)); ) u[o[1]] = o[2];
  return u;
}
const OS = (l) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(l.trim());
function lc(l, u, s, o, c) {
  if (L.isFunction(o)) return o.call(this, u, s);
  if ((c && (u = s), !!L.isString(u))) {
    if (L.isString(o)) return u.indexOf(o) !== -1;
    if (L.isRegExp(o)) return o.test(u);
  }
}
function jS(l) {
  return l
    .trim()
    .toLowerCase()
    .replace(/([a-z\d])(\w*)/g, (u, s, o) => s.toUpperCase() + o);
}
function CS(l, u) {
  const s = L.toCamelCase(" " + u);
  ["get", "set", "has"].forEach((o) => {
    Object.defineProperty(l, o + s, {
      value: function (c, d, m) {
        return this[o].call(this, u, c, d, m);
      },
      configurable: !0,
    });
  });
}
let je = class {
  constructor(u) {
    u && this.set(u);
  }
  set(u, s, o) {
    const c = this;
    function d(g, v, y) {
      const b = Ti(v);
      if (!b) throw new Error("header name must be a non-empty string");
      const S = L.findKey(c, b);
      (!S || c[S] === void 0 || y === !0 || (y === void 0 && c[S] !== !1)) &&
        (c[S || v] = hr(g));
    }
    const m = (g, v) => L.forEach(g, (y, b) => d(y, b, v));
    if (L.isPlainObject(u) || u instanceof this.constructor) m(u, s);
    else if (L.isString(u) && (u = u.trim()) && !OS(u)) m(AS(u), s);
    else if (L.isObject(u) && L.isIterable(u)) {
      let g = {},
        v,
        y;
      for (const b of u) {
        if (!L.isArray(b))
          throw TypeError("Object iterator must return a key-value pair");
        g[(y = b[0])] = (v = g[y])
          ? L.isArray(v)
            ? [...v, b[1]]
            : [v, b[1]]
          : b[1];
      }
      m(g, s);
    } else u != null && d(s, u, o);
    return this;
  }
  get(u, s) {
    if (((u = Ti(u)), u)) {
      const o = L.findKey(this, u);
      if (o) {
        const c = this[o];
        if (!s) return c;
        if (s === !0) return RS(c);
        if (L.isFunction(s)) return s.call(this, c, o);
        if (L.isRegExp(s)) return s.exec(c);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(u, s) {
    if (((u = Ti(u)), u)) {
      const o = L.findKey(this, u);
      return !!(o && this[o] !== void 0 && (!s || lc(this, this[o], o, s)));
    }
    return !1;
  }
  delete(u, s) {
    const o = this;
    let c = !1;
    function d(m) {
      if (((m = Ti(m)), m)) {
        const g = L.findKey(o, m);
        g && (!s || lc(o, o[g], g, s)) && (delete o[g], (c = !0));
      }
    }
    return L.isArray(u) ? u.forEach(d) : d(u), c;
  }
  clear(u) {
    const s = Object.keys(this);
    let o = s.length,
      c = !1;
    for (; o--; ) {
      const d = s[o];
      (!u || lc(this, this[d], d, u, !0)) && (delete this[d], (c = !0));
    }
    return c;
  }
  normalize(u) {
    const s = this,
      o = {};
    return (
      L.forEach(this, (c, d) => {
        const m = L.findKey(o, d);
        if (m) {
          (s[m] = hr(c)), delete s[d];
          return;
        }
        const g = u ? jS(d) : String(d).trim();
        g !== d && delete s[d], (s[g] = hr(c)), (o[g] = !0);
      }),
      this
    );
  }
  concat(...u) {
    return this.constructor.concat(this, ...u);
  }
  toJSON(u) {
    const s = Object.create(null);
    return (
      L.forEach(this, (o, c) => {
        o != null && o !== !1 && (s[c] = u && L.isArray(o) ? o.join(", ") : o);
      }),
      s
    );
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([u, s]) => u + ": " + s).join(`
`);
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(u) {
    return u instanceof this ? u : new this(u);
  }
  static concat(u, ...s) {
    const o = new this(u);
    return s.forEach((c) => o.set(c)), o;
  }
  static accessor(u) {
    const o = (this[dy] = this[dy] = { accessors: {} }).accessors,
      c = this.prototype;
    function d(m) {
      const g = Ti(m);
      o[g] || (CS(c, m), (o[g] = !0));
    }
    return L.isArray(u) ? u.forEach(d) : d(u), this;
  }
};
je.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
  "Authorization",
]);
L.reduceDescriptors(je.prototype, ({ value: l }, u) => {
  let s = u[0].toUpperCase() + u.slice(1);
  return {
    get: () => l,
    set(o) {
      this[s] = o;
    },
  };
});
L.freezeMethods(je);
function ic(l, u) {
  const s = this || Hi,
    o = u || s,
    c = je.from(o.headers);
  let d = o.data;
  return (
    L.forEach(l, function (g) {
      d = g.call(s, d, c.normalize(), u ? u.status : void 0);
    }),
    c.normalize(),
    d
  );
}
function bp(l) {
  return !!(l && l.__CANCEL__);
}
function Tl(l, u, s) {
  ht.call(this, l ?? "canceled", ht.ERR_CANCELED, u, s),
    (this.name = "CanceledError");
}
L.inherits(Tl, ht, { __CANCEL__: !0 });
function Sp(l, u, s) {
  const o = s.config.validateStatus;
  !s.status || !o || o(s.status)
    ? l(s)
    : u(
        new ht(
          "Request failed with status code " + s.status,
          [ht.ERR_BAD_REQUEST, ht.ERR_BAD_RESPONSE][
            Math.floor(s.status / 100) - 4
          ],
          s.config,
          s.request,
          s
        )
      );
}
function wS(l) {
  const u = /^([-+\w]{1,25})(:?\/\/|:)/.exec(l);
  return (u && u[1]) || "";
}
function DS(l, u) {
  l = l || 10;
  const s = new Array(l),
    o = new Array(l);
  let c = 0,
    d = 0,
    m;
  return (
    (u = u !== void 0 ? u : 1e3),
    function (v) {
      const y = Date.now(),
        b = o[d];
      m || (m = y), (s[c] = v), (o[c] = y);
      let S = d,
        C = 0;
      for (; S !== c; ) (C += s[S++]), (S = S % l);
      if (((c = (c + 1) % l), c === d && (d = (d + 1) % l), y - m < u)) return;
      const U = b && y - b;
      return U ? Math.round((C * 1e3) / U) : void 0;
    }
  );
}
function zS(l, u) {
  let s = 0,
    o = 1e3 / u,
    c,
    d;
  const m = (y, b = Date.now()) => {
    (s = b), (c = null), d && (clearTimeout(d), (d = null)), l(...y);
  };
  return [
    (...y) => {
      const b = Date.now(),
        S = b - s;
      S >= o
        ? m(y, b)
        : ((c = y),
          d ||
            (d = setTimeout(() => {
              (d = null), m(c);
            }, o - S)));
    },
    () => c && m(c),
  ];
}
const gr = (l, u, s = 3) => {
    let o = 0;
    const c = DS(50, 250);
    return zS((d) => {
      const m = d.loaded,
        g = d.lengthComputable ? d.total : void 0,
        v = m - o,
        y = c(v),
        b = m <= g;
      o = m;
      const S = {
        loaded: m,
        total: g,
        progress: g ? m / g : void 0,
        bytes: v,
        rate: y || void 0,
        estimated: y && g && b ? (g - m) / y : void 0,
        event: d,
        lengthComputable: g != null,
        [u ? "download" : "upload"]: !0,
      };
      l(S);
    }, s);
  },
  my = (l, u) => {
    const s = l != null;
    return [(o) => u[0]({ lengthComputable: s, total: l, loaded: o }), u[1]];
  },
  hy =
    (l) =>
    (...u) =>
      L.asap(() => l(...u)),
  NS = ge.hasStandardBrowserEnv
    ? ((l, u) => (s) => (
        (s = new URL(s, ge.origin)),
        l.protocol === s.protocol &&
          l.host === s.host &&
          (u || l.port === s.port)
      ))(
        new URL(ge.origin),
        ge.navigator && /(msie|trident)/i.test(ge.navigator.userAgent)
      )
    : () => !0,
  MS = ge.hasStandardBrowserEnv
    ? {
        write(l, u, s, o, c, d, m) {
          if (typeof document > "u") return;
          const g = [`${l}=${encodeURIComponent(u)}`];
          L.isNumber(s) && g.push(`expires=${new Date(s).toUTCString()}`),
            L.isString(o) && g.push(`path=${o}`),
            L.isString(c) && g.push(`domain=${c}`),
            d === !0 && g.push("secure"),
            L.isString(m) && g.push(`SameSite=${m}`),
            (document.cookie = g.join("; "));
        },
        read(l) {
          if (typeof document > "u") return null;
          const u = document.cookie.match(
            new RegExp("(?:^|; )" + l + "=([^;]*)")
          );
          return u ? decodeURIComponent(u[1]) : null;
        },
        remove(l) {
          this.write(l, "", Date.now() - 864e5, "/");
        },
      }
    : {
        write() {},
        read() {
          return null;
        },
        remove() {},
      };
function US(l) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(l);
}
function BS(l, u) {
  return u ? l.replace(/\/?\/$/, "") + "/" + u.replace(/^\/+/, "") : l;
}
function xp(l, u, s) {
  let o = !US(u);
  return l && (o || s == !1) ? BS(l, u) : u;
}
const yy = (l) => (l instanceof je ? { ...l } : l);
function Da(l, u) {
  u = u || {};
  const s = {};
  function o(y, b, S, C) {
    return L.isPlainObject(y) && L.isPlainObject(b)
      ? L.merge.call({ caseless: C }, y, b)
      : L.isPlainObject(b)
      ? L.merge({}, b)
      : L.isArray(b)
      ? b.slice()
      : b;
  }
  function c(y, b, S, C) {
    if (L.isUndefined(b)) {
      if (!L.isUndefined(y)) return o(void 0, y, S, C);
    } else return o(y, b, S, C);
  }
  function d(y, b) {
    if (!L.isUndefined(b)) return o(void 0, b);
  }
  function m(y, b) {
    if (L.isUndefined(b)) {
      if (!L.isUndefined(y)) return o(void 0, y);
    } else return o(void 0, b);
  }
  function g(y, b, S) {
    if (S in u) return o(y, b);
    if (S in l) return o(void 0, y);
  }
  const v = {
    url: d,
    method: d,
    data: d,
    baseURL: m,
    transformRequest: m,
    transformResponse: m,
    paramsSerializer: m,
    timeout: m,
    timeoutMessage: m,
    withCredentials: m,
    withXSRFToken: m,
    adapter: m,
    responseType: m,
    xsrfCookieName: m,
    xsrfHeaderName: m,
    onUploadProgress: m,
    onDownloadProgress: m,
    decompress: m,
    maxContentLength: m,
    maxBodyLength: m,
    beforeRedirect: m,
    transport: m,
    httpAgent: m,
    httpsAgent: m,
    cancelToken: m,
    socketPath: m,
    responseEncoding: m,
    validateStatus: g,
    headers: (y, b, S) => c(yy(y), yy(b), S, !0),
  };
  return (
    L.forEach(Object.keys({ ...l, ...u }), function (b) {
      const S = v[b] || c,
        C = S(l[b], u[b], b);
      (L.isUndefined(C) && S !== g) || (s[b] = C);
    }),
    s
  );
}
const Ep = (l) => {
    const u = Da({}, l);
    let {
      data: s,
      withXSRFToken: o,
      xsrfHeaderName: c,
      xsrfCookieName: d,
      headers: m,
      auth: g,
    } = u;
    if (
      ((u.headers = m = je.from(m)),
      (u.url = pp(
        xp(u.baseURL, u.url, u.allowAbsoluteUrls),
        l.params,
        l.paramsSerializer
      )),
      g &&
        m.set(
          "Authorization",
          "Basic " +
            btoa(
              (g.username || "") +
                ":" +
                (g.password ? unescape(encodeURIComponent(g.password)) : "")
            )
        ),
      L.isFormData(s))
    ) {
      if (ge.hasStandardBrowserEnv || ge.hasStandardBrowserWebWorkerEnv)
        m.setContentType(void 0);
      else if (L.isFunction(s.getHeaders)) {
        const v = s.getHeaders(),
          y = ["content-type", "content-length"];
        Object.entries(v).forEach(([b, S]) => {
          y.includes(b.toLowerCase()) && m.set(b, S);
        });
      }
    }
    if (
      ge.hasStandardBrowserEnv &&
      (o && L.isFunction(o) && (o = o(u)), o || (o !== !1 && NS(u.url)))
    ) {
      const v = c && d && MS.read(d);
      v && m.set(c, v);
    }
    return u;
  },
  LS = typeof XMLHttpRequest < "u",
  HS =
    LS &&
    function (l) {
      return new Promise(function (s, o) {
        const c = Ep(l);
        let d = c.data;
        const m = je.from(c.headers).normalize();
        let { responseType: g, onUploadProgress: v, onDownloadProgress: y } = c,
          b,
          S,
          C,
          U,
          T;
        function D() {
          U && U(),
            T && T(),
            c.cancelToken && c.cancelToken.unsubscribe(b),
            c.signal && c.signal.removeEventListener("abort", b);
        }
        let O = new XMLHttpRequest();
        O.open(c.method.toUpperCase(), c.url, !0), (O.timeout = c.timeout);
        function B() {
          if (!O) return;
          const k = je.from(
              "getAllResponseHeaders" in O && O.getAllResponseHeaders()
            ),
            K = {
              data:
                !g || g === "text" || g === "json"
                  ? O.responseText
                  : O.response,
              status: O.status,
              statusText: O.statusText,
              headers: k,
              config: l,
              request: O,
            };
          Sp(
            function (q) {
              s(q), D();
            },
            function (q) {
              o(q), D();
            },
            K
          ),
            (O = null);
        }
        "onloadend" in O
          ? (O.onloadend = B)
          : (O.onreadystatechange = function () {
              !O ||
                O.readyState !== 4 ||
                (O.status === 0 &&
                  !(O.responseURL && O.responseURL.indexOf("file:") === 0)) ||
                setTimeout(B);
            }),
          (O.onabort = function () {
            O &&
              (o(new ht("Request aborted", ht.ECONNABORTED, l, O)), (O = null));
          }),
          (O.onerror = function (G) {
            const K = G && G.message ? G.message : "Network Error",
              nt = new ht(K, ht.ERR_NETWORK, l, O);
            (nt.event = G || null), o(nt), (O = null);
          }),
          (O.ontimeout = function () {
            let G = c.timeout
              ? "timeout of " + c.timeout + "ms exceeded"
              : "timeout exceeded";
            const K = c.transitional || gp;
            c.timeoutErrorMessage && (G = c.timeoutErrorMessage),
              o(
                new ht(
                  G,
                  K.clarifyTimeoutError ? ht.ETIMEDOUT : ht.ECONNABORTED,
                  l,
                  O
                )
              ),
              (O = null);
          }),
          d === void 0 && m.setContentType(null),
          "setRequestHeader" in O &&
            L.forEach(m.toJSON(), function (G, K) {
              O.setRequestHeader(K, G);
            }),
          L.isUndefined(c.withCredentials) ||
            (O.withCredentials = !!c.withCredentials),
          g && g !== "json" && (O.responseType = c.responseType),
          y && (([C, T] = gr(y, !0)), O.addEventListener("progress", C)),
          v &&
            O.upload &&
            (([S, U] = gr(v)),
            O.upload.addEventListener("progress", S),
            O.upload.addEventListener("loadend", U)),
          (c.cancelToken || c.signal) &&
            ((b = (k) => {
              O &&
                (o(!k || k.type ? new Tl(null, l, O) : k),
                O.abort(),
                (O = null));
            }),
            c.cancelToken && c.cancelToken.subscribe(b),
            c.signal &&
              (c.signal.aborted ? b() : c.signal.addEventListener("abort", b)));
        const N = wS(c.url);
        if (N && ge.protocols.indexOf(N) === -1) {
          o(new ht("Unsupported protocol " + N + ":", ht.ERR_BAD_REQUEST, l));
          return;
        }
        O.send(d || null);
      });
    },
  qS = (l, u) => {
    const { length: s } = (l = l ? l.filter(Boolean) : []);
    if (u || s) {
      let o = new AbortController(),
        c;
      const d = function (y) {
        if (!c) {
          (c = !0), g();
          const b = y instanceof Error ? y : this.reason;
          o.abort(
            b instanceof ht ? b : new Tl(b instanceof Error ? b.message : b)
          );
        }
      };
      let m =
        u &&
        setTimeout(() => {
          (m = null), d(new ht(`timeout ${u} of ms exceeded`, ht.ETIMEDOUT));
        }, u);
      const g = () => {
        l &&
          (m && clearTimeout(m),
          (m = null),
          l.forEach((y) => {
            y.unsubscribe
              ? y.unsubscribe(d)
              : y.removeEventListener("abort", d);
          }),
          (l = null));
      };
      l.forEach((y) => y.addEventListener("abort", d));
      const { signal: v } = o;
      return (v.unsubscribe = () => L.asap(g)), v;
    }
  },
  YS = function* (l, u) {
    let s = l.byteLength;
    if (s < u) {
      yield l;
      return;
    }
    let o = 0,
      c;
    for (; o < s; ) (c = o + u), yield l.slice(o, c), (o = c);
  },
  GS = async function* (l, u) {
    for await (const s of VS(l)) yield* YS(s, u);
  },
  VS = async function* (l) {
    if (l[Symbol.asyncIterator]) {
      yield* l;
      return;
    }
    const u = l.getReader();
    try {
      for (;;) {
        const { done: s, value: o } = await u.read();
        if (s) break;
        yield o;
      }
    } finally {
      await u.cancel();
    }
  },
  py = (l, u, s, o) => {
    const c = GS(l, u);
    let d = 0,
      m,
      g = (v) => {
        m || ((m = !0), o && o(v));
      };
    return new ReadableStream(
      {
        async pull(v) {
          try {
            const { done: y, value: b } = await c.next();
            if (y) {
              g(), v.close();
              return;
            }
            let S = b.byteLength;
            if (s) {
              let C = (d += S);
              s(C);
            }
            v.enqueue(new Uint8Array(b));
          } catch (y) {
            throw (g(y), y);
          }
        },
        cancel(v) {
          return g(v), c.return();
        },
      },
      { highWaterMark: 2 }
    );
  },
  gy = 64 * 1024,
  { isFunction: sr } = L,
  XS = (({ Request: l, Response: u }) => ({ Request: l, Response: u }))(
    L.global
  ),
  { ReadableStream: vy, TextEncoder: by } = L.global,
  Sy = (l, ...u) => {
    try {
      return !!l(...u);
    } catch {
      return !1;
    }
  },
  QS = (l) => {
    l = L.merge.call({ skipUndefined: !0 }, XS, l);
    const { fetch: u, Request: s, Response: o } = l,
      c = u ? sr(u) : typeof fetch == "function",
      d = sr(s),
      m = sr(o);
    if (!c) return !1;
    const g = c && sr(vy),
      v =
        c &&
        (typeof by == "function"
          ? (
              (T) => (D) =>
                T.encode(D)
            )(new by())
          : async (T) => new Uint8Array(await new s(T).arrayBuffer())),
      y =
        d &&
        g &&
        Sy(() => {
          let T = !1;
          const D = new s(ge.origin, {
            body: new vy(),
            method: "POST",
            get duplex() {
              return (T = !0), "half";
            },
          }).headers.has("Content-Type");
          return T && !D;
        }),
      b = m && g && Sy(() => L.isReadableStream(new o("").body)),
      S = { stream: b && ((T) => T.body) };
    c &&
      ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((T) => {
        !S[T] &&
          (S[T] = (D, O) => {
            let B = D && D[T];
            if (B) return B.call(D);
            throw new ht(
              `Response type '${T}' is not supported`,
              ht.ERR_NOT_SUPPORT,
              O
            );
          });
      });
    const C = async (T) => {
        if (T == null) return 0;
        if (L.isBlob(T)) return T.size;
        if (L.isSpecCompliantForm(T))
          return (
            await new s(ge.origin, { method: "POST", body: T }).arrayBuffer()
          ).byteLength;
        if (L.isArrayBufferView(T) || L.isArrayBuffer(T)) return T.byteLength;
        if ((L.isURLSearchParams(T) && (T = T + ""), L.isString(T)))
          return (await v(T)).byteLength;
      },
      U = async (T, D) => {
        const O = L.toFiniteNumber(T.getContentLength());
        return O ?? C(D);
      };
    return async (T) => {
      let {
          url: D,
          method: O,
          data: B,
          signal: N,
          cancelToken: k,
          timeout: G,
          onDownloadProgress: K,
          onUploadProgress: nt,
          responseType: q,
          headers: P,
          withCredentials: W = "same-origin",
          fetchOptions: yt,
        } = Ep(T),
        ot = u || fetch;
      q = q ? (q + "").toLowerCase() : "text";
      let gt = qS([N, k && k.toAbortSignal()], G),
        J = null;
      const lt =
        gt &&
        gt.unsubscribe &&
        (() => {
          gt.unsubscribe();
        });
      let tt;
      try {
        if (
          nt &&
          y &&
          O !== "get" &&
          O !== "head" &&
          (tt = await U(P, B)) !== 0
        ) {
          let _ = new s(D, { method: "POST", body: B, duplex: "half" }),
            Y;
          if (
            (L.isFormData(B) &&
              (Y = _.headers.get("content-type")) &&
              P.setContentType(Y),
            _.body)
          ) {
            const [F, I] = my(tt, gr(hy(nt)));
            B = py(_.body, gy, F, I);
          }
        }
        L.isString(W) || (W = W ? "include" : "omit");
        const R = d && "credentials" in s.prototype,
          Z = {
            ...yt,
            signal: gt,
            method: O.toUpperCase(),
            headers: P.normalize().toJSON(),
            body: B,
            duplex: "half",
            credentials: R ? W : void 0,
          };
        J = d && new s(D, Z);
        let $ = await (d ? ot(J, yt) : ot(D, Z));
        const ut = b && (q === "stream" || q === "response");
        if (b && (K || (ut && lt))) {
          const _ = {};
          ["status", "statusText", "headers"].forEach((st) => {
            _[st] = $[st];
          });
          const Y = L.toFiniteNumber($.headers.get("content-length")),
            [F, I] = (K && my(Y, gr(hy(K), !0))) || [];
          $ = new o(
            py($.body, gy, F, () => {
              I && I(), lt && lt();
            }),
            _
          );
        }
        q = q || "text";
        let dt = await S[L.findKey(S, q) || "text"]($, T);
        return (
          !ut && lt && lt(),
          await new Promise((_, Y) => {
            Sp(_, Y, {
              data: dt,
              headers: je.from($.headers),
              status: $.status,
              statusText: $.statusText,
              config: T,
              request: J,
            });
          })
        );
      } catch (R) {
        throw (
          (lt && lt(),
          R && R.name === "TypeError" && /Load failed|fetch/i.test(R.message)
            ? Object.assign(new ht("Network Error", ht.ERR_NETWORK, T, J), {
                cause: R.cause || R,
              })
            : ht.from(R, R && R.code, T, J))
        );
      }
    };
  },
  ZS = new Map(),
  _p = (l) => {
    let u = (l && l.env) || {};
    const { fetch: s, Request: o, Response: c } = u,
      d = [o, c, s];
    let m = d.length,
      g = m,
      v,
      y,
      b = ZS;
    for (; g--; )
      (v = d[g]),
        (y = b.get(v)),
        y === void 0 && b.set(v, (y = g ? new Map() : QS(u))),
        (b = y);
    return y;
  };
_p();
const Mc = { http: sS, xhr: HS, fetch: { get: _p } };
L.forEach(Mc, (l, u) => {
  if (l) {
    try {
      Object.defineProperty(l, "name", { value: u });
    } catch {}
    Object.defineProperty(l, "adapterName", { value: u });
  }
});
const xy = (l) => `- ${l}`,
  kS = (l) => L.isFunction(l) || l === null || l === !1;
function KS(l, u) {
  l = L.isArray(l) ? l : [l];
  const { length: s } = l;
  let o, c;
  const d = {};
  for (let m = 0; m < s; m++) {
    o = l[m];
    let g;
    if (
      ((c = o),
      !kS(o) && ((c = Mc[(g = String(o)).toLowerCase()]), c === void 0))
    )
      throw new ht(`Unknown adapter '${g}'`);
    if (c && (L.isFunction(c) || (c = c.get(u)))) break;
    d[g || "#" + m] = c;
  }
  if (!c) {
    const m = Object.entries(d).map(
      ([v, y]) =>
        `adapter ${v} ` +
        (y === !1
          ? "is not supported by the environment"
          : "is not available in the build")
    );
    let g = s
      ? m.length > 1
        ? `since :
` +
          m.map(xy).join(`
`)
        : " " + xy(m[0])
      : "as no adapter specified";
    throw new ht(
      "There is no suitable adapter to dispatch the request " + g,
      "ERR_NOT_SUPPORT"
    );
  }
  return c;
}
const Tp = { getAdapter: KS, adapters: Mc };
function uc(l) {
  if (
    (l.cancelToken && l.cancelToken.throwIfRequested(),
    l.signal && l.signal.aborted)
  )
    throw new Tl(null, l);
}
function Ey(l) {
  return (
    uc(l),
    (l.headers = je.from(l.headers)),
    (l.data = ic.call(l, l.transformRequest)),
    ["post", "put", "patch"].indexOf(l.method) !== -1 &&
      l.headers.setContentType("application/x-www-form-urlencoded", !1),
    Tp.getAdapter(
      l.adapter || Hi.adapter,
      l
    )(l).then(
      function (o) {
        return (
          uc(l),
          (o.data = ic.call(l, l.transformResponse, o)),
          (o.headers = je.from(o.headers)),
          o
        );
      },
      function (o) {
        return (
          bp(o) ||
            (uc(l),
            o &&
              o.response &&
              ((o.response.data = ic.call(l, l.transformResponse, o.response)),
              (o.response.headers = je.from(o.response.headers)))),
          Promise.reject(o)
        );
      }
    )
  );
}
const Ap = "1.13.2",
  Rr = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(
  (l, u) => {
    Rr[l] = function (o) {
      return typeof o === l || "a" + (u < 1 ? "n " : " ") + l;
    };
  }
);
const _y = {};
Rr.transitional = function (u, s, o) {
  function c(d, m) {
    return (
      "[Axios v" +
      Ap +
      "] Transitional option '" +
      d +
      "'" +
      m +
      (o ? ". " + o : "")
    );
  }
  return (d, m, g) => {
    if (u === !1)
      throw new ht(
        c(m, " has been removed" + (s ? " in " + s : "")),
        ht.ERR_DEPRECATED
      );
    return (
      s &&
        !_y[m] &&
        ((_y[m] = !0),
        console.warn(
          c(
            m,
            " has been deprecated since v" +
              s +
              " and will be removed in the near future"
          )
        )),
      u ? u(d, m, g) : !0
    );
  };
};
Rr.spelling = function (u) {
  return (s, o) => (console.warn(`${o} is likely a misspelling of ${u}`), !0);
};
function JS(l, u, s) {
  if (typeof l != "object")
    throw new ht("options must be an object", ht.ERR_BAD_OPTION_VALUE);
  const o = Object.keys(l);
  let c = o.length;
  for (; c-- > 0; ) {
    const d = o[c],
      m = u[d];
    if (m) {
      const g = l[d],
        v = g === void 0 || m(g, d, l);
      if (v !== !0)
        throw new ht("option " + d + " must be " + v, ht.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (s !== !0) throw new ht("Unknown option " + d, ht.ERR_BAD_OPTION);
  }
}
const yr = { assertOptions: JS, validators: Rr },
  on = yr.validators;
let wa = class {
  constructor(u) {
    (this.defaults = u || {}),
      (this.interceptors = { request: new fy(), response: new fy() });
  }
  async request(u, s) {
    try {
      return await this._request(u, s);
    } catch (o) {
      if (o instanceof Error) {
        let c = {};
        Error.captureStackTrace
          ? Error.captureStackTrace(c)
          : (c = new Error());
        const d = c.stack ? c.stack.replace(/^.+\n/, "") : "";
        try {
          o.stack
            ? d &&
              !String(o.stack).endsWith(d.replace(/^.+\n.+\n/, "")) &&
              (o.stack +=
                `
` + d)
            : (o.stack = d);
        } catch {}
      }
      throw o;
    }
  }
  _request(u, s) {
    typeof u == "string" ? ((s = s || {}), (s.url = u)) : (s = u || {}),
      (s = Da(this.defaults, s));
    const { transitional: o, paramsSerializer: c, headers: d } = s;
    o !== void 0 &&
      yr.assertOptions(
        o,
        {
          silentJSONParsing: on.transitional(on.boolean),
          forcedJSONParsing: on.transitional(on.boolean),
          clarifyTimeoutError: on.transitional(on.boolean),
        },
        !1
      ),
      c != null &&
        (L.isFunction(c)
          ? (s.paramsSerializer = { serialize: c })
          : yr.assertOptions(
              c,
              { encode: on.function, serialize: on.function },
              !0
            )),
      s.allowAbsoluteUrls !== void 0 ||
        (this.defaults.allowAbsoluteUrls !== void 0
          ? (s.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls)
          : (s.allowAbsoluteUrls = !0)),
      yr.assertOptions(
        s,
        {
          baseUrl: on.spelling("baseURL"),
          withXsrfToken: on.spelling("withXSRFToken"),
        },
        !0
      ),
      (s.method = (s.method || this.defaults.method || "get").toLowerCase());
    let m = d && L.merge(d.common, d[s.method]);
    d &&
      L.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        (T) => {
          delete d[T];
        }
      ),
      (s.headers = je.concat(m, d));
    const g = [];
    let v = !0;
    this.interceptors.request.forEach(function (D) {
      (typeof D.runWhen == "function" && D.runWhen(s) === !1) ||
        ((v = v && D.synchronous), g.unshift(D.fulfilled, D.rejected));
    });
    const y = [];
    this.interceptors.response.forEach(function (D) {
      y.push(D.fulfilled, D.rejected);
    });
    let b,
      S = 0,
      C;
    if (!v) {
      const T = [Ey.bind(this), void 0];
      for (
        T.unshift(...g), T.push(...y), C = T.length, b = Promise.resolve(s);
        S < C;

      )
        b = b.then(T[S++], T[S++]);
      return b;
    }
    C = g.length;
    let U = s;
    for (; S < C; ) {
      const T = g[S++],
        D = g[S++];
      try {
        U = T(U);
      } catch (O) {
        D.call(this, O);
        break;
      }
    }
    try {
      b = Ey.call(this, U);
    } catch (T) {
      return Promise.reject(T);
    }
    for (S = 0, C = y.length; S < C; ) b = b.then(y[S++], y[S++]);
    return b;
  }
  getUri(u) {
    u = Da(this.defaults, u);
    const s = xp(u.baseURL, u.url, u.allowAbsoluteUrls);
    return pp(s, u.params, u.paramsSerializer);
  }
};
L.forEach(["delete", "get", "head", "options"], function (u) {
  wa.prototype[u] = function (s, o) {
    return this.request(
      Da(o || {}, { method: u, url: s, data: (o || {}).data })
    );
  };
});
L.forEach(["post", "put", "patch"], function (u) {
  function s(o) {
    return function (d, m, g) {
      return this.request(
        Da(g || {}, {
          method: u,
          headers: o ? { "Content-Type": "multipart/form-data" } : {},
          url: d,
          data: m,
        })
      );
    };
  }
  (wa.prototype[u] = s()), (wa.prototype[u + "Form"] = s(!0));
});
let $S = class Rp {
  constructor(u) {
    if (typeof u != "function")
      throw new TypeError("executor must be a function.");
    let s;
    this.promise = new Promise(function (d) {
      s = d;
    });
    const o = this;
    this.promise.then((c) => {
      if (!o._listeners) return;
      let d = o._listeners.length;
      for (; d-- > 0; ) o._listeners[d](c);
      o._listeners = null;
    }),
      (this.promise.then = (c) => {
        let d;
        const m = new Promise((g) => {
          o.subscribe(g), (d = g);
        }).then(c);
        return (
          (m.cancel = function () {
            o.unsubscribe(d);
          }),
          m
        );
      }),
      u(function (d, m, g) {
        o.reason || ((o.reason = new Tl(d, m, g)), s(o.reason));
      });
  }
  throwIfRequested() {
    if (this.reason) throw this.reason;
  }
  subscribe(u) {
    if (this.reason) {
      u(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(u) : (this._listeners = [u]);
  }
  unsubscribe(u) {
    if (!this._listeners) return;
    const s = this._listeners.indexOf(u);
    s !== -1 && this._listeners.splice(s, 1);
  }
  toAbortSignal() {
    const u = new AbortController(),
      s = (o) => {
        u.abort(o);
      };
    return (
      this.subscribe(s),
      (u.signal.unsubscribe = () => this.unsubscribe(s)),
      u.signal
    );
  }
  static source() {
    let u;
    return {
      token: new Rp(function (c) {
        u = c;
      }),
      cancel: u,
    };
  }
};
function FS(l) {
  return function (s) {
    return l.apply(null, s);
  };
}
function WS(l) {
  return L.isObject(l) && l.isAxiosError === !0;
}
const xc = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
  WebServerIsDown: 521,
  ConnectionTimedOut: 522,
  OriginIsUnreachable: 523,
  TimeoutOccurred: 524,
  SslHandshakeFailed: 525,
  InvalidSslCertificate: 526,
};
Object.entries(xc).forEach(([l, u]) => {
  xc[u] = l;
});
function Op(l) {
  const u = new wa(l),
    s = lp(wa.prototype.request, u);
  return (
    L.extend(s, wa.prototype, u, { allOwnKeys: !0 }),
    L.extend(s, u, null, { allOwnKeys: !0 }),
    (s.create = function (c) {
      return Op(Da(l, c));
    }),
    s
  );
}
const Ft = Op(Hi);
Ft.Axios = wa;
Ft.CanceledError = Tl;
Ft.CancelToken = $S;
Ft.isCancel = bp;
Ft.VERSION = Ap;
Ft.toFormData = Ar;
Ft.AxiosError = ht;
Ft.Cancel = Ft.CanceledError;
Ft.all = function (u) {
  return Promise.all(u);
};
Ft.spread = FS;
Ft.isAxiosError = WS;
Ft.mergeConfig = Da;
Ft.AxiosHeaders = je;
Ft.formToJSON = (l) => vp(L.isHTMLForm(l) ? new FormData(l) : l);
Ft.getAdapter = Tp.getAdapter;
Ft.HttpStatusCode = xc;
Ft.default = Ft;
const {
    Axios: Yx,
    AxiosError: Gx,
    CanceledError: Vx,
    isCancel: Xx,
    CancelToken: Qx,
    VERSION: Zx,
    all: kx,
    Cancel: Kx,
    isAxiosError: Jx,
    spread: $x,
    toFormData: Fx,
    AxiosHeaders: Wx,
    HttpStatusCode: Ix,
    formToJSON: Px,
    getAdapter: tE,
    mergeConfig: eE,
  } = Ft,
  Uc = Ft.create({
    baseURL: Eb,
    headers: { "Content-Type": "application/json" },
  }),
  IS = async (l, u) => (await Uc.get(l, { params: u })).data,
  PS = async (l, u) => (await Uc.put(l, u)).data,
  tx = async (l) => (await Uc.delete(l)).data;
function ex(l) {
  if (typeof document > "u") return;
  let u = document.head || document.getElementsByTagName("head")[0],
    s = document.createElement("style");
  (s.type = "text/css"),
    u.firstChild ? u.insertBefore(s, u.firstChild) : u.appendChild(s),
    s.styleSheet
      ? (s.styleSheet.cssText = l)
      : s.appendChild(document.createTextNode(l));
}
ex(`:root{--toastify-color-light: #fff;--toastify-color-dark: #121212;--toastify-color-info: #3498db;--toastify-color-success: #07bc0c;--toastify-color-warning: #f1c40f;--toastify-color-error: hsl(6, 78%, 57%);--toastify-color-transparent: rgba(255, 255, 255, .7);--toastify-icon-color-info: var(--toastify-color-info);--toastify-icon-color-success: var(--toastify-color-success);--toastify-icon-color-warning: var(--toastify-color-warning);--toastify-icon-color-error: var(--toastify-color-error);--toastify-container-width: fit-content;--toastify-toast-width: 320px;--toastify-toast-offset: 16px;--toastify-toast-top: max(var(--toastify-toast-offset), env(safe-area-inset-top));--toastify-toast-right: max(var(--toastify-toast-offset), env(safe-area-inset-right));--toastify-toast-left: max(var(--toastify-toast-offset), env(safe-area-inset-left));--toastify-toast-bottom: max(var(--toastify-toast-offset), env(safe-area-inset-bottom));--toastify-toast-background: #fff;--toastify-toast-padding: 14px;--toastify-toast-min-height: 64px;--toastify-toast-max-height: 800px;--toastify-toast-bd-radius: 6px;--toastify-toast-shadow: 0px 4px 12px rgba(0, 0, 0, .1);--toastify-font-family: sans-serif;--toastify-z-index: 9999;--toastify-text-color-light: #757575;--toastify-text-color-dark: #fff;--toastify-text-color-info: #fff;--toastify-text-color-success: #fff;--toastify-text-color-warning: #fff;--toastify-text-color-error: #fff;--toastify-spinner-color: #616161;--toastify-spinner-color-empty-area: #e0e0e0;--toastify-color-progress-light: linear-gradient(to right, #4cd964, #5ac8fa, #007aff, #34aadc, #5856d6, #ff2d55);--toastify-color-progress-dark: #bb86fc;--toastify-color-progress-info: var(--toastify-color-info);--toastify-color-progress-success: var(--toastify-color-success);--toastify-color-progress-warning: var(--toastify-color-warning);--toastify-color-progress-error: var(--toastify-color-error);--toastify-color-progress-bgo: .2}.Toastify__toast-container{z-index:var(--toastify-z-index);-webkit-transform:translate3d(0,0,var(--toastify-z-index));position:fixed;width:var(--toastify-container-width);box-sizing:border-box;color:#fff;display:flex;flex-direction:column}.Toastify__toast-container--top-left{top:var(--toastify-toast-top);left:var(--toastify-toast-left)}.Toastify__toast-container--top-center{top:var(--toastify-toast-top);left:50%;transform:translate(-50%);align-items:center}.Toastify__toast-container--top-right{top:var(--toastify-toast-top);right:var(--toastify-toast-right);align-items:end}.Toastify__toast-container--bottom-left{bottom:var(--toastify-toast-bottom);left:var(--toastify-toast-left)}.Toastify__toast-container--bottom-center{bottom:var(--toastify-toast-bottom);left:50%;transform:translate(-50%);align-items:center}.Toastify__toast-container--bottom-right{bottom:var(--toastify-toast-bottom);right:var(--toastify-toast-right);align-items:end}.Toastify__toast{--y: 0;position:relative;touch-action:none;width:var(--toastify-toast-width);min-height:var(--toastify-toast-min-height);box-sizing:border-box;margin-bottom:1rem;padding:var(--toastify-toast-padding);border-radius:var(--toastify-toast-bd-radius);box-shadow:var(--toastify-toast-shadow);max-height:var(--toastify-toast-max-height);font-family:var(--toastify-font-family);z-index:0;display:flex;flex:1 auto;align-items:center;word-break:break-word}@media only screen and (max-width: 480px){.Toastify__toast-container{width:100vw;left:env(safe-area-inset-left);margin:0}.Toastify__toast-container--top-left,.Toastify__toast-container--top-center,.Toastify__toast-container--top-right{top:env(safe-area-inset-top);transform:translate(0)}.Toastify__toast-container--bottom-left,.Toastify__toast-container--bottom-center,.Toastify__toast-container--bottom-right{bottom:env(safe-area-inset-bottom);transform:translate(0)}.Toastify__toast-container--rtl{right:env(safe-area-inset-right);left:initial}.Toastify__toast{--toastify-toast-width: 100%;margin-bottom:0;border-radius:0}}.Toastify__toast-container[data-stacked=true]{width:var(--toastify-toast-width)}.Toastify__toast--stacked{position:absolute;width:100%;transform:translate3d(0,var(--y),0) scale(var(--s));transition:transform .3s}.Toastify__toast--stacked[data-collapsed] .Toastify__toast-body,.Toastify__toast--stacked[data-collapsed] .Toastify__close-button{transition:opacity .1s}.Toastify__toast--stacked[data-collapsed=false]{overflow:visible}.Toastify__toast--stacked[data-collapsed=true]:not(:last-child)>*{opacity:0}.Toastify__toast--stacked:after{content:"";position:absolute;left:0;right:0;height:calc(var(--g) * 1px);bottom:100%}.Toastify__toast--stacked[data-pos=top]{top:0}.Toastify__toast--stacked[data-pos=bot]{bottom:0}.Toastify__toast--stacked[data-pos=bot].Toastify__toast--stacked:before{transform-origin:top}.Toastify__toast--stacked[data-pos=top].Toastify__toast--stacked:before{transform-origin:bottom}.Toastify__toast--stacked:before{content:"";position:absolute;left:0;right:0;bottom:0;height:100%;transform:scaleY(3);z-index:-1}.Toastify__toast--rtl{direction:rtl}.Toastify__toast--close-on-click{cursor:pointer}.Toastify__toast-icon{margin-inline-end:10px;width:22px;flex-shrink:0;display:flex}.Toastify--animate{animation-fill-mode:both;animation-duration:.5s}.Toastify--animate-icon{animation-fill-mode:both;animation-duration:.3s}.Toastify__toast-theme--dark{background:var(--toastify-color-dark);color:var(--toastify-text-color-dark)}.Toastify__toast-theme--light,.Toastify__toast-theme--colored.Toastify__toast--default{background:var(--toastify-color-light);color:var(--toastify-text-color-light)}.Toastify__toast-theme--colored.Toastify__toast--info{color:var(--toastify-text-color-info);background:var(--toastify-color-info)}.Toastify__toast-theme--colored.Toastify__toast--success{color:var(--toastify-text-color-success);background:var(--toastify-color-success)}.Toastify__toast-theme--colored.Toastify__toast--warning{color:var(--toastify-text-color-warning);background:var(--toastify-color-warning)}.Toastify__toast-theme--colored.Toastify__toast--error{color:var(--toastify-text-color-error);background:var(--toastify-color-error)}.Toastify__progress-bar-theme--light{background:var(--toastify-color-progress-light)}.Toastify__progress-bar-theme--dark{background:var(--toastify-color-progress-dark)}.Toastify__progress-bar--info{background:var(--toastify-color-progress-info)}.Toastify__progress-bar--success{background:var(--toastify-color-progress-success)}.Toastify__progress-bar--warning{background:var(--toastify-color-progress-warning)}.Toastify__progress-bar--error{background:var(--toastify-color-progress-error)}.Toastify__progress-bar-theme--colored.Toastify__progress-bar--info,.Toastify__progress-bar-theme--colored.Toastify__progress-bar--success,.Toastify__progress-bar-theme--colored.Toastify__progress-bar--warning,.Toastify__progress-bar-theme--colored.Toastify__progress-bar--error{background:var(--toastify-color-transparent)}.Toastify__close-button{color:#fff;position:absolute;top:6px;right:6px;background:transparent;outline:none;border:none;padding:0;cursor:pointer;opacity:.7;transition:.3s ease;z-index:1}.Toastify__toast--rtl .Toastify__close-button{left:6px;right:unset}.Toastify__close-button--light{color:#000;opacity:.3}.Toastify__close-button>svg{fill:currentColor;height:16px;width:14px}.Toastify__close-button:hover,.Toastify__close-button:focus{opacity:1}@keyframes Toastify__trackProgress{0%{transform:scaleX(1)}to{transform:scaleX(0)}}.Toastify__progress-bar{position:absolute;bottom:0;left:0;width:100%;height:100%;z-index:1;opacity:.7;transform-origin:left}.Toastify__progress-bar--animated{animation:Toastify__trackProgress linear 1 forwards}.Toastify__progress-bar--controlled{transition:transform .2s}.Toastify__progress-bar--rtl{right:0;left:initial;transform-origin:right;border-bottom-left-radius:initial}.Toastify__progress-bar--wrp{position:absolute;overflow:hidden;bottom:0;left:0;width:100%;height:5px;border-bottom-left-radius:var(--toastify-toast-bd-radius);border-bottom-right-radius:var(--toastify-toast-bd-radius)}.Toastify__progress-bar--wrp[data-hidden=true]{opacity:0}.Toastify__progress-bar--bg{opacity:var(--toastify-color-progress-bgo);width:100%;height:100%}.Toastify__spinner{width:20px;height:20px;box-sizing:border-box;border:2px solid;border-radius:100%;border-color:var(--toastify-spinner-color-empty-area);border-right-color:var(--toastify-spinner-color);animation:Toastify__spin .65s linear infinite}@keyframes Toastify__bounceInRight{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(3000px,0,0)}60%{opacity:1;transform:translate3d(-25px,0,0)}75%{transform:translate3d(10px,0,0)}90%{transform:translate3d(-5px,0,0)}to{transform:none}}@keyframes Toastify__bounceOutRight{20%{opacity:1;transform:translate3d(-20px,var(--y),0)}to{opacity:0;transform:translate3d(2000px,var(--y),0)}}@keyframes Toastify__bounceInLeft{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(-3000px,0,0)}60%{opacity:1;transform:translate3d(25px,0,0)}75%{transform:translate3d(-10px,0,0)}90%{transform:translate3d(5px,0,0)}to{transform:none}}@keyframes Toastify__bounceOutLeft{20%{opacity:1;transform:translate3d(20px,var(--y),0)}to{opacity:0;transform:translate3d(-2000px,var(--y),0)}}@keyframes Toastify__bounceInUp{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(0,3000px,0)}60%{opacity:1;transform:translate3d(0,-20px,0)}75%{transform:translate3d(0,10px,0)}90%{transform:translate3d(0,-5px,0)}to{transform:translateZ(0)}}@keyframes Toastify__bounceOutUp{20%{transform:translate3d(0,calc(var(--y) - 10px),0)}40%,45%{opacity:1;transform:translate3d(0,calc(var(--y) + 20px),0)}to{opacity:0;transform:translate3d(0,-2000px,0)}}@keyframes Toastify__bounceInDown{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(0,-3000px,0)}60%{opacity:1;transform:translate3d(0,25px,0)}75%{transform:translate3d(0,-10px,0)}90%{transform:translate3d(0,5px,0)}to{transform:none}}@keyframes Toastify__bounceOutDown{20%{transform:translate3d(0,calc(var(--y) - 10px),0)}40%,45%{opacity:1;transform:translate3d(0,calc(var(--y) + 20px),0)}to{opacity:0;transform:translate3d(0,2000px,0)}}.Toastify__bounce-enter--top-left,.Toastify__bounce-enter--bottom-left{animation-name:Toastify__bounceInLeft}.Toastify__bounce-enter--top-right,.Toastify__bounce-enter--bottom-right{animation-name:Toastify__bounceInRight}.Toastify__bounce-enter--top-center{animation-name:Toastify__bounceInDown}.Toastify__bounce-enter--bottom-center{animation-name:Toastify__bounceInUp}.Toastify__bounce-exit--top-left,.Toastify__bounce-exit--bottom-left{animation-name:Toastify__bounceOutLeft}.Toastify__bounce-exit--top-right,.Toastify__bounce-exit--bottom-right{animation-name:Toastify__bounceOutRight}.Toastify__bounce-exit--top-center{animation-name:Toastify__bounceOutUp}.Toastify__bounce-exit--bottom-center{animation-name:Toastify__bounceOutDown}@keyframes Toastify__zoomIn{0%{opacity:0;transform:scale3d(.3,.3,.3)}50%{opacity:1}}@keyframes Toastify__zoomOut{0%{opacity:1}50%{opacity:0;transform:translate3d(0,var(--y),0) scale3d(.3,.3,.3)}to{opacity:0}}.Toastify__zoom-enter{animation-name:Toastify__zoomIn}.Toastify__zoom-exit{animation-name:Toastify__zoomOut}@keyframes Toastify__flipIn{0%{transform:perspective(400px) rotateX(90deg);animation-timing-function:ease-in;opacity:0}40%{transform:perspective(400px) rotateX(-20deg);animation-timing-function:ease-in}60%{transform:perspective(400px) rotateX(10deg);opacity:1}80%{transform:perspective(400px) rotateX(-5deg)}to{transform:perspective(400px)}}@keyframes Toastify__flipOut{0%{transform:translate3d(0,var(--y),0) perspective(400px)}30%{transform:translate3d(0,var(--y),0) perspective(400px) rotateX(-20deg);opacity:1}to{transform:translate3d(0,var(--y),0) perspective(400px) rotateX(90deg);opacity:0}}.Toastify__flip-enter{animation-name:Toastify__flipIn}.Toastify__flip-exit{animation-name:Toastify__flipOut}@keyframes Toastify__slideInRight{0%{transform:translate3d(110%,0,0);visibility:visible}to{transform:translate3d(0,var(--y),0)}}@keyframes Toastify__slideInLeft{0%{transform:translate3d(-110%,0,0);visibility:visible}to{transform:translate3d(0,var(--y),0)}}@keyframes Toastify__slideInUp{0%{transform:translate3d(0,110%,0);visibility:visible}to{transform:translate3d(0,var(--y),0)}}@keyframes Toastify__slideInDown{0%{transform:translate3d(0,-110%,0);visibility:visible}to{transform:translate3d(0,var(--y),0)}}@keyframes Toastify__slideOutRight{0%{transform:translate3d(0,var(--y),0)}to{visibility:hidden;transform:translate3d(110%,var(--y),0)}}@keyframes Toastify__slideOutLeft{0%{transform:translate3d(0,var(--y),0)}to{visibility:hidden;transform:translate3d(-110%,var(--y),0)}}@keyframes Toastify__slideOutDown{0%{transform:translate3d(0,var(--y),0)}to{visibility:hidden;transform:translate3d(0,500px,0)}}@keyframes Toastify__slideOutUp{0%{transform:translate3d(0,var(--y),0)}to{visibility:hidden;transform:translate3d(0,-500px,0)}}.Toastify__slide-enter--top-left,.Toastify__slide-enter--bottom-left{animation-name:Toastify__slideInLeft}.Toastify__slide-enter--top-right,.Toastify__slide-enter--bottom-right{animation-name:Toastify__slideInRight}.Toastify__slide-enter--top-center{animation-name:Toastify__slideInDown}.Toastify__slide-enter--bottom-center{animation-name:Toastify__slideInUp}.Toastify__slide-exit--top-left,.Toastify__slide-exit--bottom-left{animation-name:Toastify__slideOutLeft;animation-timing-function:ease-in;animation-duration:.3s}.Toastify__slide-exit--top-right,.Toastify__slide-exit--bottom-right{animation-name:Toastify__slideOutRight;animation-timing-function:ease-in;animation-duration:.3s}.Toastify__slide-exit--top-center{animation-name:Toastify__slideOutUp;animation-timing-function:ease-in;animation-duration:.3s}.Toastify__slide-exit--bottom-center{animation-name:Toastify__slideOutDown;animation-timing-function:ease-in;animation-duration:.3s}@keyframes Toastify__spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}
`);
var Bc = (l) => typeof l == "number" && !isNaN(l),
  Ci = (l) => typeof l == "string",
  jp = (l) => typeof l == "function",
  nx = (l) => Ci(l) || Bc(l),
  ax = (l) => E.isValidElement(l) || Ci(l) || jp(l) || Bc(l),
  lx = 1,
  Cp = () => `${lx++}`,
  dn = new Map(),
  Ec = [],
  Ty = new Set(),
  wp = () => dn.size > 0,
  ix = (l, { containerId: u }) => {
    var s;
    return (s = dn.get(u || 1)) == null ? void 0 : s.toasts.get(l);
  };
function ux(l, u) {
  var s;
  if (u) return !!((s = dn.get(u)) != null && s.isToastActive(l));
  let o = !1;
  return (
    dn.forEach((c) => {
      c.isToastActive(l) && (o = !0);
    }),
    o
  );
}
function rx(l) {
  if (!wp()) {
    Ec = Ec.filter((u) => l != null && u.options.toastId !== l);
    return;
  }
  if (l == null || nx(l))
    dn.forEach((u) => {
      u.removeToast(l);
    });
  else if (l && ("containerId" in l || "id" in l)) {
    let u = dn.get(l.containerId);
    u
      ? u.removeToast(l.id)
      : dn.forEach((s) => {
          s.removeToast(l.id);
        });
  }
}
var sx = (l = {}) => {
  dn.forEach((u) => {
    u.props.limit &&
      (!l.containerId || u.id === l.containerId) &&
      u.clearQueue();
  });
};
function ox(l, u) {
  ax(l) &&
    (wp() || Ec.push({ content: l, options: u }),
    dn.forEach((s) => {
      s.buildToast(l, u);
    }));
}
function Dp(l, u) {
  dn.forEach((s) => {
    (u == null || !(u != null && u.containerId) || u?.containerId === s.id) &&
      s.toggle(l, u?.id);
  });
}
function cx(l) {
  return (
    Ty.add(l),
    () => {
      Ty.delete(l);
    }
  );
}
function fx(l) {
  return l && (Ci(l.toastId) || Bc(l.toastId)) ? l.toastId : Cp();
}
function qi(l, u) {
  return ox(l, u), u.toastId;
}
function Or(l, u) {
  return { ...u, type: (u && u.type) || l, toastId: fx(u) };
}
function jr(l) {
  return (u, s) => qi(u, Or(l, s));
}
function Ut(l, u) {
  return qi(l, Or("default", u));
}
Ut.loading = (l, u) =>
  qi(
    l,
    Or("default", {
      isLoading: !0,
      autoClose: !1,
      closeOnClick: !1,
      closeButton: !1,
      draggable: !1,
      ...u,
    })
  );
function dx(l, { pending: u, error: s, success: o }, c) {
  let d;
  u && (d = Ci(u) ? Ut.loading(u, c) : Ut.loading(u.render, { ...c, ...u }));
  let m = {
      isLoading: null,
      autoClose: null,
      closeOnClick: null,
      closeButton: null,
      draggable: null,
    },
    g = (y, b, S) => {
      if (b == null) {
        Ut.dismiss(d);
        return;
      }
      let C = { type: y, ...m, ...c, data: S },
        U = Ci(b) ? { render: b } : b;
      return d ? Ut.update(d, { ...C, ...U }) : Ut(U.render, { ...C, ...U }), S;
    },
    v = jp(l) ? l() : l;
  return v.then((y) => g("success", o, y)).catch((y) => g("error", s, y)), v;
}
Ut.promise = dx;
Ut.success = jr("success");
Ut.info = jr("info");
Ut.error = jr("error");
Ut.warning = jr("warning");
Ut.warn = Ut.warning;
Ut.dark = (l, u) => qi(l, Or("default", { theme: "dark", ...u }));
function mx(l) {
  rx(l);
}
Ut.dismiss = mx;
Ut.clearWaitingQueue = sx;
Ut.isActive = ux;
Ut.update = (l, u = {}) => {
  let s = ix(l, u);
  if (s) {
    let { props: o, content: c } = s,
      d = { delay: 100, ...o, ...u, toastId: u.toastId || l, updateId: Cp() };
    d.toastId !== l && (d.staleId = l);
    let m = d.render || c;
    delete d.render, qi(m, d);
  }
};
Ut.done = (l) => {
  Ut.update(l, { progress: 1 });
};
Ut.onChange = cx;
Ut.play = (l) => Dp(!0, l);
Ut.pause = (l) => Dp(!1, l);
const Ay = pc
    ? (l) => {
        l();
      }
    : wi.startTransition,
  hx = (l) => {
    const [, u] = E.useState({}),
      s = E.useRef(!1),
      o = E.useRef(l),
      c = E.useRef({ data: !1, error: !1, isValidating: !1 }),
      d = E.useCallback((m) => {
        let g = !1;
        const v = o.current;
        for (const y in m)
          if (Object.prototype.hasOwnProperty.call(m, y)) {
            const b = y;
            v[b] !== m[b] && ((v[b] = m[b]), c.current[b] && (g = !0));
          }
        g && !s.current && u({});
      }, []);
    return (
      Ri(
        () => (
          (s.current = !1),
          () => {
            s.current = !0;
          }
        )
      ),
      [o, c.current, d]
    );
  },
  yx =
    () =>
    (l, u, s = {}) => {
      const { mutate: o } = wc(),
        c = E.useRef(l),
        d = E.useRef(u),
        m = E.useRef(s),
        g = E.useRef(0),
        [v, y, b] = hx({ data: ne, error: ne, isMutating: !1 }),
        S = v.current,
        C = E.useCallback(async (T, D) => {
          const [O, B] = xr(c.current);
          if (!d.current)
            throw new Error("Can’t trigger the mutation: missing fetcher.");
          if (!O) throw new Error("Can’t trigger the mutation: missing key.");
          const N = Ie(
              Ie({ populateCache: !1, throwOnError: !0 }, m.current),
              D
            ),
            k = ji();
          (g.current = k), b({ isMutating: !0 });
          try {
            const G = await o(
              O,
              d.current(B, { arg: T }),
              Ie(N, { throwOnError: !0 })
            );
            return (
              g.current <= k &&
                (Ay(() => b({ data: G, isMutating: !1, error: void 0 })),
                N.onSuccess == null || N.onSuccess.call(N, G, O, N)),
              G
            );
          } catch (G) {
            if (
              g.current <= k &&
              (Ay(() => b({ error: G, isMutating: !1 })),
              N.onError == null || N.onError.call(N, G, O, N),
              N.throwOnError)
            )
              throw G;
          }
        }, []),
        U = E.useCallback(() => {
          (g.current = ji()), b({ data: ne, error: ne, isMutating: !1 });
        }, []);
      return (
        Ri(() => {
          (c.current = l), (d.current = u), (m.current = s);
        }),
        {
          trigger: C,
          reset: U,
          get data() {
            return (y.data = !0), S.data;
          },
          get error() {
            return (y.error = !0), S.error;
          },
          get isMutating() {
            return (y.isMutating = !0), S.isMutating;
          },
        }
      );
    },
  zp = Sb(ap, yx),
  Lc = "/garment/garment",
  Np = (l) => {
    l?.response?.data?.message
      ? Ut.error(l.response.data.message)
      : Ut.error(l?.message ?? "Something went wrong");
  },
  Mp = (l) => {
    l?.message && Ut.success(l.message);
  },
  px = () =>
    ap([Lc], async ([l]) => {
      try {
        return await IS(l, null);
      } catch {
        return { data: [], link: void 0, count: 0 };
      }
    }),
  gx = () =>
    zp(Lc + "/", (l, { arg: u }) => PS(l + u.id, u.body), {
      onSuccess: Mp,
      onError: Np,
    }),
  vx = () =>
    zp(Lc + "/", (l, { arg: u }) => tx(l + u), { onSuccess: Mp, onError: Np }),
  zn = "/garment/garment";
function bx(l, u) {
  switch (u.type) {
    case "Fetch":
      return { ...l, items: u.payload, loading: !1, error: null };
    case "Add":
      return { ...l, items: [u.payload, ...l.items], loading: !1, error: null };
    case "Remove":
      return {
        ...l,
        items: l.items.filter((s) => s.garment_id !== u.payload.id),
        loading: !1,
        error: null,
      };
    case "Update":
      return {
        ...l,
        items: l.items.map((s) =>
          s.garment_id === u.payload.garment_id ? u.payload : s
        ),
        loading: !1,
        error: null,
      };
    case "SetError":
      return { ...l, error: u.payload ?? null, loading: !1 };
    case "SetLoading":
      return { ...l, loading: u.payload };
    default:
      return l;
  }
}
const Sx = () => {
    const { mutate: l } = wc(),
      u = px(),
      s = gx(),
      o = vx(),
      [c, d] = E.useReducer(bx, { items: [], loading: !0, error: null }),
      [m, g] = E.useState(""),
      [v, y] = E.useState(null),
      [b, S] = E.useState(!1);
    E.useEffect(() => {
      if (u.data && u.data.data) {
        const B = u.data.data;
        d({ type: "Fetch", payload: B });
      } else !u.isValidating && !u.data && d({ type: "Fetch", payload: [] });
    }, [u.data, u.isValidating]);
    const C = c.items;
    async function U(B) {
      B?.preventDefault();
      const N = m?.trim();
      if (!N) {
        d({ type: "SetError", payload: "Name is required." });
        return;
      }
      S(!0), d({ type: "SetLoading", payload: !0 });
      const G = { garment_id: `temp_${Date.now()}`, garment_name: N };
      d({ type: "Add", payload: G }),
        l(
          zn,
          (K) => {
            const nt = K?.data ?? [];
            return { ...K, data: [G, ...nt] };
          },
          !1
        );
      try {
        await l(zn), g(""), y(null);
      } catch (K) {
        await l(zn),
          d({
            type: "SetError",
            payload: K?.message ?? "Failed to create garment",
          });
      } finally {
        S(!1), d({ type: "SetLoading", payload: !1 });
      }
    }
    function T(B) {
      y(B.garment_id),
        g(B.garment_name),
        d({ type: "SetError", payload: null });
    }
    async function D(B) {
      if ((B && B.preventDefault(), !v)) return;
      const N = m?.trim();
      if (!N) {
        d({ type: "SetError", payload: "Name is required." });
        return;
      }
      S(!0), d({ type: "SetLoading", payload: !0 });
      const k = { garment_id: v, garment_name: N };
      d({ type: "Update", payload: k }),
        l(
          zn,
          (G) => {
            const K = G?.data ?? [];
            return {
              ...G,
              data: K.map((nt) => (nt.garment_id === k.garment_id ? k : nt)),
            };
          },
          !1
        );
      try {
        await s.trigger({ id: v, body: { garment_name: N } }),
          await l(zn),
          g(""),
          y(null);
      } catch (G) {
        await l(zn),
          d({
            type: "SetError",
            payload: G?.message ?? "Failed to update garment",
          });
      } finally {
        S(!1), d({ type: "SetLoading", payload: !1 });
      }
    }
    async function O(B) {
      if (!confirm("Delete garment?")) return;
      const N = u.data;
      d({ type: "Remove", payload: { id: B } }),
        l(
          zn,
          (k) => {
            const G = k?.data ?? [];
            return { ...k, data: G.filter((K) => K.garment_id !== B) };
          },
          !1
        );
      try {
        await o.trigger(B), await l(zn);
      } catch (k) {
        await l(zn, N, !1),
          d({ type: "SetError", payload: k?.message ?? "Failed to delete" });
      }
    }
    return h.jsxs("div", {
      style: { maxWidth: 880, margin: "24px auto", padding: 16 },
      children: [
        h.jsx("div", {
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          },
          children: h.jsxs("div", {
            children: [
              h.jsx("h2", { children: "Garments" }),
              h.jsx("div", {
                style: { color: "#555", fontSize: 13 },
                children: "Manage garment types",
              }),
            ],
          }),
        }),
        h.jsxs("form", {
          onSubmit: v ? D : U,
          style: {
            marginBottom: 16,
            display: "flex",
            gap: 8,
            alignItems: "center",
          },
          children: [
            h.jsx("input", {
              value: m,
              onChange: (B) => g(B.target.value),
              placeholder: "Enter garment name",
              style: {
                padding: "8px 10px",
                borderRadius: 6,
                border: "1px solid #d1d5db",
                minWidth: 300,
              },
              disabled: b,
            }),
            h.jsx("button", {
              type: "submit",
              style: { padding: "8px 12px", borderRadius: 6 },
              disabled: b,
              children: v
                ? b
                  ? "Updating..."
                  : "Update"
                : b
                ? "Saving..."
                : "Add",
            }),
            v &&
              h.jsx("button", {
                type: "button",
                onClick: () => {
                  y(null), g(""), d({ type: "SetError", payload: null });
                },
                style: { padding: "8px 12px", borderRadius: 6 },
                disabled: b,
                children: "Cancel",
              }),
          ],
        }),
        c.error &&
          h.jsx("div", {
            style: { color: "#b91c1c", marginBottom: 8 },
            children: c.error,
          }),
        h.jsx("div", {
          children:
            u.isValidating && C.length === 0
              ? h.jsx("div", { children: "Loading..." })
              : C.length === 0
              ? h.jsx("div", {
                  style: { color: "#666" },
                  children: "No garments found.",
                })
              : h.jsxs("table", {
                  style: { width: "100%", borderCollapse: "collapse" },
                  children: [
                    h.jsx("thead", {
                      children: h.jsxs("tr", {
                        children: [
                          h.jsx("th", {
                            style: { textAlign: "left" },
                            children: "Garment",
                          }),
                          h.jsx("th", {
                            style: { width: 160 },
                            children: "Actions",
                          }),
                        ],
                      }),
                    }),
                    h.jsx("tbody", {
                      children: C.map((B) =>
                        h.jsxs(
                          "tr",
                          {
                            children: [
                              h.jsx("td", {
                                style: { padding: "8px 6px" },
                                children: B.garment_name,
                              }),
                              h.jsx("td", {
                                style: { padding: "8px 6px" },
                                children: h.jsxs("div", {
                                  style: { display: "flex", gap: 8 },
                                  children: [
                                    h.jsx("button", {
                                      onClick: () => T(B),
                                      style: {
                                        padding: "6px 10px",
                                        borderRadius: 6,
                                      },
                                      disabled: b,
                                      children: "Edit",
                                    }),
                                    h.jsx("button", {
                                      onClick: () => O(B.garment_id),
                                      style: {
                                        padding: "6px 10px",
                                        borderRadius: 6,
                                      },
                                      disabled: b,
                                      children: "Delete",
                                    }),
                                  ],
                                }),
                              }),
                            ],
                          },
                          B.garment_id
                        )
                      ),
                    }),
                  ],
                }),
        }),
      ],
    });
  },
  or = "https://api.shivaliwashingcompany.in/customer/customer";
function xx(l) {
  return l
    ? Array.isArray(l)
      ? l
      : l && Array.isArray(l.data)
      ? l.data
      : l && Array.isArray(l.customers)
      ? l.customers
      : l && l.data && typeof l.data == "object" && !Array.isArray(l.data)
      ? [l.data]
      : []
    : [];
}
function Ry(l) {
  return l
    ? l && l.data && typeof l.data == "object" && !Array.isArray(l.data)
      ? l.data
      : Array.isArray(l) && l.length > 0
      ? l[0]
      : l && typeof l == "object" && ("customer_id" in l || "id" in l)
      ? l
      : null
    : null;
}
const Ex = ({ title: l, visible: u, onClose: s, children: o }) =>
  u
    ? h.jsx("div", {
        style: Vt.modalBackdrop,
        children: h.jsxs("div", {
          style: Vt.modal,
          children: [
            h.jsxs("div", {
              style: Vt.modalHeader,
              children: [
                h.jsx("strong", { children: l || "Modal" }),
                h.jsx("button", {
                  onClick: s,
                  style: Vt.closeBtn,
                  "aria-label": "Close",
                  children: "×",
                }),
              ],
            }),
            h.jsx("div", { style: Vt.modalBody, children: o }),
          ],
        }),
      })
    : null;
function _x() {
  const [l, u] = E.useState([]),
    [s, o] = E.useState(!1),
    [c, d] = E.useState(null),
    [m, g] = E.useState(!1),
    [v, y] = E.useState(!1),
    [b, S] = E.useState(null),
    [C, U] = E.useState(""),
    [T, D] = E.useState(""),
    [O, B] = E.useState(""),
    [N, k] = E.useState(""),
    [G, K] = E.useState(null);
  E.useEffect(() => {
    nt();
  }, []);
  async function nt() {
    o(!0), d(null);
    try {
      const lt = await (await fetch(or, { method: "GET" }))
        .json()
        .catch(() => null);
      console.debug("GET raw:", lt);
      const tt = xx(lt);
      u(tt);
    } catch (J) {
      d(J.message || "Failed to fetch customers"), u([]);
    } finally {
      o(!1);
    }
  }
  function q() {
    S(null), U(""), D(""), B(""), k(""), K(null), g(!0);
  }
  function P(J) {
    S(J),
      U(J.customer_name ?? ""),
      D(J.customer_email ?? ""),
      B(J.customer_phone ?? ""),
      k(J.customer_address ?? ""),
      K(null),
      g(!0);
  }
  function W() {
    v || g(!1);
  }
  function yt() {
    return C.trim()
      ? T.trim()
        ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(T.trim())
          ? O.trim()
            ? O.length > 50
              ? "Phone is too long."
              : N && N.length > 300
              ? "Address is too long."
              : null
            : "Phone is required."
          : "Invalid email address."
        : "Email is required."
      : "Name is required.";
  }
  async function ot(J) {
    J && J.preventDefault(), K(null);
    const lt = yt();
    if (lt) {
      K(lt);
      return;
    }
    y(!0);
    try {
      if (b) {
        const tt = await fetch(`${or}/${encodeURIComponent(b.customer_id)}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              customer_name: C.trim(),
              customer_email: T.trim(),
              customer_phone: O.trim(),
              customer_addr: N.trim() || null,
            }),
          }),
          R = await tt.json().catch(() => null);
        if ((console.debug("PUT raw:", R), !tt.ok)) {
          const $ =
            R?.message || R?.data?.message || `Update failed: ${tt.status}`;
          throw new Error($);
        }
        const Z = Ry(R) || {
          customer_id: b.customer_id,
          customer_name: C.trim(),
          customer_email: T.trim(),
          customer_phone: O.trim(),
          customer_addr: N.trim() || null,
        };
        u(($) => $.map((ut) => (ut.customer_id === Z.customer_id ? Z : ut)));
      } else {
        const tt = await fetch(or, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              customer_name: C.trim(),
              customer_email: T.trim(),
              customer_phone: O.trim(),
              customer_addr: N.trim() || null,
            }),
          }),
          R = await tt.json().catch(() => null);
        if ((console.debug("POST raw:", R), !tt.ok)) {
          const $ =
            R?.message || R?.data?.message || `Create failed: ${tt.status}`;
          throw new Error($);
        }
        const Z = Ry(R);
        Z ? u(($) => [Z, ...$]) : await nt();
      }
      g(!1);
    } catch (tt) {
      K(tt.message || "Failed to submit");
    } finally {
      y(!1);
    }
  }
  async function gt(J) {
    if (window.confirm(`Delete customer "${J.customer_name}"?`))
      try {
        const tt = await fetch(`${or}/${encodeURIComponent(J.customer_id)}`, {
            method: "DELETE",
          }),
          R = await tt.json().catch(() => null);
        if ((console.debug("DELETE raw:", R), !tt.ok)) {
          const Z =
            R?.message || R?.data?.message || `Delete failed: ${tt.status}`;
          throw new Error(Z);
        }
        u((Z) => Z.filter(($) => $.customer_id !== J.customer_id));
      } catch (tt) {
        alert(tt.message || "Failed to delete");
      }
  }
  return h.jsxs("div", {
    style: Vt.container,
    children: [
      h.jsxs("header", {
        style: Vt.header,
        children: [
          h.jsx("div", { children: h.jsx("h2", { children: "Customers" }) }),
          h.jsx("div", {
            children: h.jsx("button", {
              onClick: q,
              style: Vt.primaryBtn,
              children: "Add Customer",
            }),
          }),
        ],
      }),
      c && h.jsx("div", { style: Vt.error, children: c }),
      s
        ? h.jsx("div", { children: "Loading..." })
        : l.length === 0
        ? h.jsx("div", { style: Vt.empty, children: "No customers found." })
        : h.jsxs("table", {
            style: Vt.table,
            children: [
              h.jsx("thead", {
                children: h.jsxs("tr", {
                  children: [
                    h.jsx("th", {
                      style: { textAlign: "left" },
                      children: "Name",
                    }),
                    h.jsx("th", {
                      style: { textAlign: "left" },
                      children: "Email",
                    }),
                    h.jsx("th", {
                      style: { textAlign: "left" },
                      children: "Phone",
                    }),
                    h.jsx("th", {
                      style: { textAlign: "left" },
                      children: "Address",
                    }),
                    h.jsx("th", { style: { width: 180 }, children: "Actions" }),
                  ],
                }),
              }),
              h.jsx("tbody", {
                children: l.map((J) =>
                  h.jsxs(
                    "tr",
                    {
                      children: [
                        h.jsx("td", { children: J.customer_name }),
                        h.jsx("td", { children: J.customer_email }),
                        h.jsx("td", { children: J.customer_phone }),
                        h.jsx("td", { children: J.customer_address ?? "-" }),
                        h.jsx("td", {
                          children: h.jsxs("div", {
                            style: { display: "flex", gap: 8 },
                            children: [
                              h.jsx("button", {
                                onClick: () => P(J),
                                style: Vt.secondaryBtn,
                                children: "Edit",
                              }),
                              h.jsx("button", {
                                onClick: () => gt(J),
                                style: Vt.dangerBtn,
                                children: "Delete",
                              }),
                            ],
                          }),
                        }),
                      ],
                    },
                    J.customer_id
                  )
                ),
              }),
            ],
          }),
      h.jsx(Ex, {
        title: b ? "Edit Customer" : "Add Customer",
        visible: m,
        onClose: W,
        children: h.jsxs("form", {
          onSubmit: ot,
          style: { display: "grid", gap: 8 },
          children: [
            h.jsxs("label", {
              style: Vt.label,
              children: [
                "Name ",
                h.jsx("span", { style: { color: "red" }, children: "*" }),
                h.jsx("input", {
                  value: C,
                  onChange: (J) => U(J.target.value),
                  style: Vt.input,
                  disabled: v,
                }),
              ],
            }),
            h.jsxs("label", {
              style: Vt.label,
              children: [
                "Email ",
                h.jsx("span", { style: { color: "red" }, children: "*" }),
                h.jsx("input", {
                  value: T,
                  onChange: (J) => D(J.target.value),
                  style: Vt.input,
                  disabled: v,
                }),
              ],
            }),
            h.jsxs("label", {
              style: Vt.label,
              children: [
                "Phone ",
                h.jsx("span", { style: { color: "red" }, children: "*" }),
                h.jsx("input", {
                  value: O,
                  onChange: (J) => B(J.target.value),
                  style: Vt.input,
                  disabled: v,
                }),
              ],
            }),
            h.jsxs("label", {
              style: Vt.label,
              children: [
                "Address",
                h.jsx("input", {
                  value: N,
                  onChange: (J) => k(J.target.value),
                  style: Vt.input,
                  disabled: v,
                }),
              ],
            }),
            G && h.jsx("div", { style: Vt.validationError, children: G }),
            h.jsxs("div", {
              style: {
                display: "flex",
                gap: 8,
                justifyContent: "flex-end",
                marginTop: 8,
              },
              children: [
                h.jsx("button", {
                  type: "button",
                  onClick: W,
                  style: Vt.cancelBtn,
                  disabled: v,
                  children: "Cancel",
                }),
                h.jsx("button", {
                  type: "submit",
                  style: Vt.primaryBtn,
                  disabled: v,
                  children: v ? "Saving..." : b ? "Update" : "Create",
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
const Vt = {
    container: {
      maxWidth: 960,
      margin: "24px auto",
      padding: 16,
      fontFamily: "Inter, Roboto, Arial, sans-serif",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      boxShadow: "0 1px 0 rgba(0,0,0,0.06)",
    },
    empty: { color: "#666", padding: 24 },
    primaryBtn: {
      background: "#0b74de",
      color: "#fff",
      border: 0,
      padding: "8px 12px",
      borderRadius: 6,
      cursor: "pointer",
    },
    secondaryBtn: {
      background: "#f3f4f6",
      color: "#111",
      border: "1px solid #e5e7eb",
      padding: "6px 10px",
      borderRadius: 6,
      cursor: "pointer",
    },
    dangerBtn: {
      background: "#ffecec",
      color: "#b91c1c",
      border: "1px solid #f1a1a1",
      padding: "6px 10px",
      borderRadius: 6,
      cursor: "pointer",
    },
    cancelBtn: {
      background: "#fff",
      color: "#111",
      border: "1px solid #e5e7eb",
      padding: "8px 12px",
      borderRadius: 6,
      cursor: "pointer",
    },
    input: {
      width: "100%",
      padding: "8px 10px",
      borderRadius: 6,
      border: "1px solid #d1d5db",
      marginTop: 6,
      boxSizing: "border-box",
    },
    label: { display: "block", fontSize: 14 },
    validationError: { color: "#b91c1c", marginTop: 6 },
    error: { color: "#b91c1c", marginBottom: 8 },
    modalBackdrop: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.35)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
      padding: 16,
    },
    modal: {
      width: 560,
      maxWidth: "100%",
      background: "#fff",
      borderRadius: 8,
      boxShadow: "0 12px 60px rgba(0,0,0,0.12)",
      overflow: "hidden",
    },
    modalHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 16px",
      borderBottom: "1px solid #eef2f6",
    },
    closeBtn: {
      background: "transparent",
      border: 0,
      fontSize: 20,
      cursor: "pointer",
      lineHeight: 1,
    },
    modalBody: { padding: 16 },
  },
  Oy = "https://api.shivaliwashingcompany.in/order/order";
function Tx(l) {
  return l
    ? Array.isArray(l)
      ? l
      : l && Array.isArray(l.data)
      ? l.data
      : l && Array.isArray(l.items)
      ? l.items
      : []
    : [];
}
const Ax = ({ visible: l, title: u, onClose: s, children: o }) =>
  l
    ? h.jsx("div", {
        style: ye.modalBackdrop,
        role: "dialog",
        "aria-modal": "true",
        children: h.jsxs("div", {
          style: ye.modal,
          children: [
            h.jsxs("div", {
              style: ye.modalHeader,
              children: [
                h.jsx("strong", { children: u }),
                h.jsx("button", {
                  onClick: s,
                  style: ye.closeBtn,
                  "aria-label": "Close",
                  children: "×",
                }),
              ],
            }),
            h.jsx("div", { style: ye.modalBody, children: o }),
          ],
        }),
      })
    : null;
function jy() {
  const [l, u] = E.useState([]),
    [s, o] = E.useState(!1),
    [c, d] = E.useState(null),
    [m, g] = E.useState(null),
    [v] = E.useState(!1),
    [y, b] = E.useState(""),
    [S, C] = E.useState(""),
    U = E.useRef(null);
  E.useEffect(() => {
    T();
  }, []),
    E.useEffect(
      () => (
        U.current && window.clearTimeout(U.current),
        (U.current = window.setTimeout(() => C(y.trim()), 400)),
        () => {
          U.current && window.clearTimeout(U.current);
        }
      ),
      [y]
    ),
    E.useEffect(() => {
      T(S);
    }, [S]);
  async function T(G = "") {
    o(!0), d(null);
    try {
      const K = G
          ? `https://api.shivaliwashingcompany.in/customer/customer-search?search=${encodeURIComponent(
              G
            )}`
          : Oy,
        q = await (await fetch(K, { method: "GET" })).json().catch(() => null);
      console.debug("GET orders raw:", q);
      const P = Tx(q);
      if (P && P.length >= 0) {
        u(P);
        return;
      }
      q && Array.isArray(q)
        ? u(q)
        : q && q.data && Array.isArray(q.data)
        ? u(q.data)
        : u([]);
    } catch (K) {
      d(K?.message || "Failed to fetch orders"), u([]);
    } finally {
      o(!1);
    }
  }
  function D() {
    g(null);
  }
  async function O(G) {
    if (confirm("Delete this order?"))
      try {
        const K = await fetch(`${Oy}/${encodeURIComponent(G)}`, {
          method: "DELETE",
        });
        if (!K.ok) {
          const nt = await K.json().catch(() => null);
          throw new Error(nt?.message || `Delete failed: ${K.status}`);
        }
        u((nt) => nt.filter((q) => q.order_id !== G)),
          m?.order_id === G && g(null);
      } catch (K) {
        alert(K?.message || "Failed to delete");
      }
  }
  const B = wi.useMemo(() => {
    const G = S.toLowerCase();
    return G
      ? l.filter((K) => {
          const nt = (K.customer?.customer_name ?? "").toLowerCase(),
            q = (K.customer?.customer_phone ?? "").toLowerCase(),
            P = (K.customer?.customer_email ?? "").toLowerCase(),
            W = (K.customer_id ?? "").toLowerCase();
          return (
            nt.includes(G) || q.includes(G) || P.includes(G) || W.includes(G)
          );
        })
      : l;
  }, [l, S]);
  function N(G, K) {
    if (K) return K;
    if (!G || G.length === 0) return null;
    const nt = G.map((P) => P.return_expected_by)
      .filter(Boolean)
      .map((P) => new Date(P))
      .filter((P) => !Number.isNaN(P.getTime()));
    return nt.length === 0
      ? null
      : nt.reduce((P, W) => (P.getTime() <= W.getTime() ? P : W)).toISOString();
  }
  function k(G) {
    if (!G) return "-";
    const K = new Date(G);
    return Number.isNaN(K.getTime()) ? "-" : K.toLocaleString();
  }
  return h.jsxs("div", {
    style: ye.container,
    children: [
      h.jsxs("header", {
        style: ye.header,
        children: [
          h.jsxs("div", {
            children: [
              h.jsx("h2", { children: "Orders" }),
              h.jsx("div", {
                style: ye.subtitle,
                children: "List of created orders",
              }),
            ],
          }),
          h.jsxs("div", {
            style: { display: "flex", gap: 8, alignItems: "center" },
            children: [
              h.jsx("input", {
                placeholder: "Search by customer ...",
                value: y,
                onChange: (G) => b(G.target.value),
                style: ye.searchInput,
              }),
              h.jsx("button", {
                onClick: () => T(S),
                style: ye.primaryBtn,
                children: "Search",
              }),
              h.jsx("button", {
                onClick: () => {
                  b(""), C(""), T();
                },
                style: ye.secondaryBtn,
                children: "Clear",
              }),
            ],
          }),
        ],
      }),
      c && h.jsx("div", { style: ye.error, children: c }),
      s
        ? h.jsx("div", { children: "Loading orders..." })
        : B.length === 0
        ? h.jsx("div", { style: ye.empty, children: "No orders found." })
        : h.jsxs("table", {
            style: ye.table,
            children: [
              h.jsx("thead", {
                children: h.jsxs("tr", {
                  children: [
                    h.jsx("th", {
                      style: { textAlign: "left" },
                      children: "Name",
                    }),
                    h.jsx("th", {
                      style: { textAlign: "left" },
                      children: "Phone",
                    }),
                    h.jsx("th", {
                      style: { textAlign: "left" },
                      children: "Quantity",
                    }),
                    h.jsx("th", {
                      style: { textAlign: "left" },
                      children: "Return expected",
                    }),
                    h.jsx("th", {
                      style: { textAlign: "left" },
                      children: "Priority",
                    }),
                    h.jsx("th", {
                      style: { textAlign: "left" },
                      children: "Status",
                    }),
                    h.jsx("th", { style: { width: 180 }, children: "Actions" }),
                  ],
                }),
              }),
              h.jsx("tbody", {
                children: B.map((G) => {
                  const K = N(G.items ?? null, G.return_expected_by);
                  return h.jsxs(
                    "tr",
                    {
                      children: [
                        h.jsx("td", {
                          children: G.customer_name ?? G.customer_id,
                        }),
                        h.jsx("td", { children: G.customer_phone ?? "-" }),
                        h.jsx("td", { children: G.quantity }),
                        h.jsx("td", { children: k(K) }),
                        h.jsx("td", {
                          children: G.availability_status ?? G.customer_id,
                        }),
                        h.jsx("td", { children: G.status ?? G.customer_id }),
                        h.jsx("td", {
                          children: h.jsxs("div", {
                            style: { display: "flex", gap: 8 },
                            children: [
                              h.jsx("button", {
                                onClick: () => {
                                  window.location.href = `/customer-orders/${G.customer_id}`;
                                },
                                style: ye.secondaryBtn,
                                children: "View",
                              }),
                              h.jsx("button", {
                                onClick: () => O(G.order_id),
                                style: ye.dangerBtn,
                                children: "Delete",
                              }),
                            ],
                          }),
                        }),
                      ],
                    },
                    G.order_id
                  );
                }),
              }),
            ],
          }),
      h.jsx(Ax, {
        visible: !!m,
        title: "Order details",
        onClose: D,
        children: v
          ? h.jsx("div", { children: "Loading details..." })
          : m
          ? h.jsxs("div", {
              children: [
                h.jsxs("div", {
                  style: { marginBottom: 8 },
                  children: [
                    h.jsx("strong", { children: "Order:" }),
                    " ",
                    h.jsx("span", {
                      style: { fontFamily: "monospace" },
                      children: m.order_id,
                    }),
                  ],
                }),
                h.jsxs("div", {
                  style: { marginBottom: 6 },
                  children: [
                    h.jsx("strong", { children: "Customer:" }),
                    " ",
                    m.customer?.customer_name ?? m.customer_id,
                  ],
                }),
                h.jsxs("div", {
                  style: { marginBottom: 6 },
                  children: [
                    h.jsx("strong", { children: "Phone:" }),
                    " ",
                    m.customer?.customer_phone ?? "-",
                  ],
                }),
                h.jsxs("div", {
                  style: { marginBottom: 6 },
                  children: [
                    h.jsx("strong", { children: "Email:" }),
                    " ",
                    m.customer?.customer_email ?? "-",
                  ],
                }),
                h.jsxs("div", {
                  style: { marginBottom: 8 },
                  children: [
                    h.jsx("strong", { children: "Order return expected:" }),
                    " ",
                    k(m.return_expected_by ?? N(m.items ?? null)),
                  ],
                }),
                h.jsxs("div", {
                  style: { marginBottom: 8 },
                  children: [
                    h.jsx("strong", { children: "Created:" }),
                    " ",
                    m.createdAt ? new Date(m.createdAt).toLocaleString() : "-",
                  ],
                }),
                h.jsx("hr", {}),
                h.jsx("h4", {
                  style: { marginTop: 12 },
                  children: "Items / Services",
                }),
                !m.items || m.items.length === 0
                  ? h.jsx("div", {
                      style: { color: "#666", padding: 8 },
                      children: "No items found for this order.",
                    })
                  : h.jsxs("table", {
                      style: ye.innerTable,
                      children: [
                        h.jsx("thead", {
                          children: h.jsxs("tr", {
                            children: [
                              h.jsx("th", {
                                style: { textAlign: "left" },
                                children: "Garment",
                              }),
                              h.jsx("th", {
                                style: { textAlign: "left" },
                                children: "Service",
                              }),
                              h.jsx("th", {
                                style: { textAlign: "left" },
                                children: "Quantity",
                              }),
                              h.jsx("th", {
                                style: { textAlign: "left" },
                                children: "Availability",
                              }),
                              h.jsx("th", {
                                style: { textAlign: "left" },
                                children: "Return expected",
                              }),
                              h.jsx("th", {
                                style: { textAlign: "left" },
                                children: "Created",
                              }),
                            ],
                          }),
                        }),
                        h.jsx("tbody", {
                          children: m.items.map((G) =>
                            h.jsxs(
                              "tr",
                              {
                                children: [
                                  h.jsx("td", {
                                    children:
                                      G.garment?.garment_name ??
                                      G.garment_id ??
                                      "-",
                                  }),
                                  h.jsx("td", {
                                    children:
                                      G.service?.service_name ??
                                      G.service_id ??
                                      "-",
                                  }),
                                  h.jsx("td", {
                                    children:
                                      typeof G.quantity == "number"
                                        ? G.quantity
                                        : "-",
                                  }),
                                  h.jsx("td", {
                                    children: G.availability_status ?? "-",
                                  }),
                                  h.jsx("td", {
                                    children: G.return_expected_by
                                      ? k(G.return_expected_by)
                                      : "-",
                                  }),
                                  h.jsx("td", {
                                    children: G.createdAt
                                      ? new Date(G.createdAt).toLocaleString()
                                      : "-",
                                  }),
                                ],
                              },
                              G.id
                            )
                          ),
                        }),
                      ],
                    }),
              ],
            })
          : h.jsx("div", {
              style: { color: "#666" },
              children: "No details available.",
            }),
      }),
    ],
  });
}
const ye = {
  container: {
    maxWidth: 1e3,
    margin: "18px auto",
    padding: 16,
    fontFamily: "Inter, Roboto, Arial, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    gap: 12,
  },
  subtitle: { color: "#555", fontSize: 13 },
  searchInput: {
    padding: "8px 10px",
    borderRadius: 6,
    border: "1px solid #d1d5db",
    minWidth: 280,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    boxShadow: "0 1px 0 rgba(0,0,0,0.06)",
  },
  innerTable: { width: "100%", borderCollapse: "collapse", marginTop: 8 },
  empty: { color: "#666", padding: 24 },
  primaryBtn: {
    background: "#0b74de",
    color: "#fff",
    border: 0,
    padding: "8px 12px",
    borderRadius: 6,
    cursor: "pointer",
  },
  secondaryBtn: {
    background: "#f3f4f6",
    color: "#111",
    border: "1px solid #e5e7eb",
    padding: "6px 10px",
    borderRadius: 6,
    cursor: "pointer",
  },
  dangerBtn: {
    background: "#ffecec",
    color: "#b91c1c",
    border: "1px solid #f1a1a1",
    padding: "6px 10px",
    borderRadius: 6,
    cursor: "pointer",
  },
  error: { color: "#b91c1c", marginBottom: 8 },
  modalBackdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.35)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    padding: 16,
  },
  modal: {
    width: 820,
    maxWidth: "100%",
    background: "#fff",
    borderRadius: 8,
    boxShadow: "0 12px 60px rgba(0,0,0,0.12)",
    overflow: "hidden",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 16px",
    borderBottom: "1px solid #eef2f6",
  },
  closeBtn: {
    background: "transparent",
    border: 0,
    fontSize: 20,
    cursor: "pointer",
    lineHeight: 1,
  },
  modalBody: { padding: 16 },
};
function Ai(l) {
  return new Date(l.getFullYear(), l.getMonth(), 1);
}
function Rx(l) {
  return new Date(l.getFullYear(), l.getMonth() + 1, 0);
}
function Cy(l, u) {
  return new Date(l.getFullYear(), l.getMonth() + u, 1);
}
function Ox(l, u) {
  return !l || !u
    ? !1
    : l.getFullYear() === u.getFullYear() &&
        l.getMonth() === u.getMonth() &&
        l.getDate() === u.getDate();
}
function wy(l, u, s) {
  return l && (u && l < u ? u : s && l > s ? s : l);
}
function jx({
  value: l = null,
  onChange: u,
  minDate: s = null,
  maxDate: o = null,
  placeholder: c = "Select date",
  inputId: d = "datepicker-input",
  locale: m,
  formatDate: g = (v) => v.toLocaleDateString(m),
}) {
  const [v, y] = E.useState(!1),
    [b, S] = E.useState(l),
    [C, U] = E.useState(Ai(l || new Date())),
    T = E.useRef(null),
    D = E.useRef(null);
  E.useEffect(() => {
    S(l), l && U(Ai(l));
  }, [l]),
    E.useEffect(() => {
      function q(P) {
        T.current && (T.current.contains(P.target) || y(!1));
      }
      return (
        document.addEventListener("mousedown", q),
        document.addEventListener("touchstart", q),
        () => {
          document.removeEventListener("mousedown", q),
            document.removeEventListener("touchstart", q);
        }
      );
    }, []),
    E.useEffect(() => {
      v && T.current?.querySelector("[data-day]")?.focus();
    }, [v]);
  function O(q) {
    const P = new Date(C.getFullYear(), C.getMonth(), q),
      W = wy(P, s ?? null, o ?? null);
    S(W), u(W), y(!1);
  }
  function B(q) {
    const P = Ai(q),
      W = Rx(q),
      yt = P.getDay(),
      ot = [];
    for (let gt = 0; gt < yt; gt++) ot.push(null);
    for (let gt = 1; gt <= W.getDate(); gt++) ot.push(gt);
    return ot;
  }
  const N = B(C),
    k = C.toLocaleString(m || void 0, { month: "long", year: "numeric" });
  function G() {
    U((q) => Cy(q, -1));
  }
  function K() {
    U((q) => Cy(q, 1));
  }
  function nt(q) {
    const P = document.activeElement;
    if (!P) return;
    const W = P.getAttribute("data-day");
    if (!W) return;
    const yt = parseInt(W, 10);
    isNaN(yt) ||
      (q.key === "ArrowRight"
        ? (q.preventDefault(),
          T.current?.querySelector(`[data-day='${yt + 1}']`)?.focus())
        : q.key === "ArrowLeft"
        ? (q.preventDefault(),
          T.current?.querySelector(`[data-day='${yt - 1}']`)?.focus())
        : q.key === "ArrowDown"
        ? (q.preventDefault(),
          T.current?.querySelector(`[data-day='${yt + 7}']`)?.focus())
        : q.key === "ArrowUp"
        ? (q.preventDefault(),
          T.current?.querySelector(`[data-day='${yt - 7}']`)?.focus())
        : q.key === "Enter"
        ? (q.preventDefault(), O(yt))
        : q.key === "Escape" &&
          (q.preventDefault(), y(!1), D.current?.focus()));
  }
  return h.jsxs("div", {
    className: "relative inline-block",
    ref: T,
    children: [
      h.jsxs("div", {
        className: "flex items-center space-x-2",
        children: [
          h.jsx("input", {
            id: d,
            ref: D,
            type: "text",
            readOnly: !0,
            "aria-haspopup": "dialog",
            "aria-expanded": v,
            "aria-controls": "datepicker-popover",
            className:
              "px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500 w-44 cursor-pointer bg-white",
            placeholder: c,
            value: b ? g(b) : "",
            onClick: () => y((q) => !q),
            onKeyDown: (q) => {
              (q.key === "ArrowDown" || q.key === "Enter") && y(!0);
            },
          }),
          h.jsx("button", {
            type: "button",
            "aria-label": "clear date",
            className: "px-2 py-2 rounded-md border hover:bg-gray-50",
            onClick: () => {
              S(null), u(null);
            },
            children: "Clear",
          }),
        ],
      }),
      v &&
        h.jsxs("div", {
          id: "datepicker-popover",
          role: "dialog",
          "aria-modal": "false",
          className:
            "mt-2 w-72 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-3 z-50",
          children: [
            h.jsxs("div", {
              className: "flex items-center justify-between mb-2",
              children: [
                h.jsx("div", { className: "text-sm font-medium", children: k }),
                h.jsxs("div", {
                  className: "flex items-center space-x-1",
                  children: [
                    h.jsx("button", {
                      type: "button",
                      onClick: G,
                      className: "p-1 rounded hover:bg-gray-100",
                      "aria-label": "Previous month",
                      children: "‹",
                    }),
                    h.jsx("button", {
                      type: "button",
                      onClick: K,
                      className: "p-1 rounded hover:bg-gray-100",
                      "aria-label": "Next month",
                      children: "›",
                    }),
                  ],
                }),
              ],
            }),
            h.jsx("div", {
              className: "grid grid-cols-7 gap-1 text-xs text-center mb-2",
              children: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                (q) =>
                  h.jsx(
                    "div",
                    { className: "font-medium text-gray-500", children: q },
                    q
                  )
              ),
            }),
            h.jsx("div", {
              className: "grid grid-cols-7 gap-1",
              onKeyDown: nt,
              children: N.map((q, P) => {
                if (q === null) return h.jsx("div", {}, `blank-${P}`);
                const W = new Date(C.getFullYear(), C.getMonth(), q),
                  yt = (s && W < s) || (o && W > o),
                  ot = b && Ox(b, W);
                return h.jsxs(
                  "button",
                  {
                    "data-day": q,
                    type: "button",
                    onClick: () => O(q),
                    disabled: yt ?? void 0,
                    className: `p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                      yt
                        ? "cursor-not-allowed text-gray-300"
                        : "hover:bg-gray-100"
                    } ${ot ? "bg-indigo-600 text-white" : ""}`,
                    "aria-pressed": ot ?? !1,
                    children: [
                      h.jsx("span", {
                        className: "sr-only",
                        children: W.toDateString(),
                      }),
                      h.jsx("span", { "aria-hidden": !0, children: q }),
                    ],
                  },
                  q
                );
              }),
            }),
            h.jsxs("div", {
              className: "mt-3 flex items-center justify-between text-sm",
              children: [
                h.jsx("div", {
                  children: h.jsx("button", {
                    type: "button",
                    onClick: () => {
                      const q = new Date(),
                        P = wy(q, s ?? null, o ?? null);
                      S(P), u(P), U(Ai(P || q)), y(!1);
                    },
                    className: "px-2 py-1 rounded hover:bg-gray-100",
                    children: "Today",
                  }),
                }),
                h.jsx("div", {
                  className: "flex items-center space-x-2",
                  children: h.jsx("button", {
                    type: "button",
                    onClick: () => y(!1),
                    className: "px-2 py-1 rounded hover:bg-gray-100",
                    children: "Cancel",
                  }),
                }),
              ],
            }),
          ],
        }),
    ],
  });
}
const Cx = "https://api.shivaliwashingcompany.in/customer/customer",
  wx = "https://api.shivaliwashingcompany.in/garment/garment",
  Dx = "https://api.shivaliwashingcompany.in/service/service",
  zx = "https://api.shivaliwashingcompany.in/order/order",
  Nx = "https://api.shivaliwashingcompany.in/order-item/order-item";
function cr(l = "") {
  return l + Math.random().toString(36).slice(2, 9);
}
function rc(l) {
  return l
    ? Array.isArray(l)
      ? l
      : l && Array.isArray(l.data)
      ? l.data
      : l && Array.isArray(l.items)
      ? l.items
      : []
    : [];
}
function Mx(l) {
  return l
    ? l && l.data && typeof l.data == "object" && !Array.isArray(l.data)
      ? l.data
      : Array.isArray(l) && l.length > 0
      ? l[0]
      : l && typeof l == "object" && ("order_id" in l || "id" in l)
      ? l
      : null
    : null;
}
function Ux() {
  const [l, u] = E.useState([]),
    [s, o] = E.useState([]),
    [c, d] = E.useState([]),
    [m, g] = E.useState(!0),
    [v, y] = E.useState(null),
    [b, S] = E.useState(""),
    [C, U] = E.useState([{ id: cr("r_"), quantity: 1 }]),
    [T, D] = E.useState("MODERATE"),
    [O, B] = E.useState(void 0),
    [N, k] = E.useState(!1),
    [G, K] = E.useState(null);
  E.useEffect(() => {
    nt();
  }, []);
  async function nt() {
    g(!0), y(null);
    try {
      const [J, lt, tt] = await Promise.all([
        fetch(Cx, { method: "GET" }).then((R) => R.json().catch(() => null)),
        fetch(wx, { method: "GET" }).then((R) => R.json().catch(() => null)),
        fetch(Dx, { method: "GET" }).then((R) => R.json().catch(() => null)),
      ]);
      u(rc(J)), o(rc(lt)), d(rc(tt));
    } catch {
      y("Failed to load initial data");
    } finally {
      g(!1);
    }
  }
  function q() {
    U((J) => [...J, { id: cr("r_"), quantity: 1 }]);
  }
  function P(J) {
    U((lt) => lt.filter((tt) => tt.id !== J));
  }
  function W(J, lt) {
    U((tt) => tt.map((R) => (R.id === J ? { ...R, ...lt } : R)));
  }
  function yt(J) {
    return J ? c.filter((lt) => lt.garment_id === J) : [];
  }
  function ot() {
    if (!b) return "Please select a customer.";
    if (!C || C.length === 0) return "Add at least one order item.";
    for (let J = 0; J < C.length; J++) {
      const lt = C[J];
      if (!lt.garment_id) return `Select garment for item ${J + 1}.`;
      if (!lt.service_id) return `Select service for item ${J + 1}.`;
      if (!lt.quantity || lt.quantity < 1)
        return `Quantity for item ${J + 1} must be at least 1.`;
    }
    return O
      ? T
        ? null
        : "Please select availability for the order."
      : "Please select the expected return date for the order.";
  }
  async function gt(J) {
    y(null), K(null);
    const lt = ot();
    if (lt) {
      y(lt);
      return;
    }
    k(!0);
    try {
      const tt = C.reduce((Y, F) => Y + (F.quantity ?? 0), 0),
        Z = await fetch(zx, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customer_id: b,
            availability_status: T,
            return_expected_by: O,
            quantity: tt,
          }),
        });
      if (!Z.ok) {
        const F =
          (await Z.json().catch(() => null))?.message ||
          `Failed to create order: ${Z.status}`;
        throw new Error(F);
      }
      const $ = await Z.json().catch(() => null),
        dt = (Mx($) || $?.data || $)?.order_id;
      if (!dt)
        throw new Error("Order created but server did not return order_id.");
      const _ = C.map(async (Y) => {
        const F = {
            order_id: dt,
            garment_id: Y.garment_id,
            service_id: Y.service_id,
            quantity: Y.quantity,
          },
          I = await fetch(Nx, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(F),
          });
        if (!I.ok) {
          const ct =
            (await I.json().catch(() => null))?.message ||
            `Failed to create order item: ${I.status}`;
          throw new Error(ct);
        }
        return I;
      });
      await Promise.all(_),
        K("Order and items created successfully."),
        U([{ id: cr("r_"), quantity: 1 }]),
        S(""),
        D("MODERATE"),
        B(void 0),
        await nt();
    } catch (tt) {
      y(tt?.message || "Failed to create order");
    } finally {
      k(!1);
    }
  }
  return h.jsxs("div", {
    className: "max-w-4xl mx-auto p-6",
    children: [
      h.jsxs("header", {
        className: "mb-6",
        children: [
          h.jsx("h1", {
            className: "text-2xl font-semibold",
            children: "Create New Order",
          }),
          h.jsx("p", {
            className: "text-sm text-gray-500 mt-1",
            children: "Create an order and one or more items.",
          }),
        ],
      }),
      h.jsxs("main", {
        className: "space-y-6",
        children: [
          h.jsxs("section", {
            className: "bg-white border rounded-lg p-4 shadow-sm",
            children: [
              h.jsx("h2", {
                className: "text-lg font-medium mb-3",
                children: "Customer",
              }),
              m
                ? h.jsx("div", {
                    className: "text-sm text-gray-500",
                    children: "Loading customers…",
                  })
                : h.jsxs("select", {
                    className: "w-full border rounded-md p-2",
                    value: b,
                    onChange: (J) => S(J.target.value),
                    disabled: N,
                    "aria-label": "Select customer",
                    children: [
                      h.jsx("option", {
                        value: "",
                        children: "-- select customer --",
                      }),
                      l.map((J) =>
                        h.jsx(
                          "option",
                          { value: J.customer_id, children: J.customer_name },
                          J.customer_id
                        )
                      ),
                    ],
                  }),
            ],
          }),
          h.jsxs("section", {
            className: "bg-white border rounded-lg p-4 shadow-sm",
            children: [
              h.jsx("h2", {
                className: "text-lg font-medium mb-3",
                children: "Order details",
              }),
              h.jsxs("div", {
                className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                children: [
                  h.jsxs("div", {
                    children: [
                      h.jsx("label", {
                        className:
                          "block text-sm font-medium text-gray-700 mb-1",
                        children: "Availability (applies to whole order)",
                      }),
                      h.jsxs("select", {
                        className: "w-full border rounded-md p-2",
                        value: T ?? "MODERATE",
                        onChange: (J) => D(J.target.value),
                        disabled: N,
                        "aria-label": "Order availability",
                        children: [
                          h.jsx("option", { value: "LOW", children: "LOW" }),
                          h.jsx("option", {
                            value: "MODERATE",
                            children: "MODERATE",
                          }),
                          h.jsx("option", { value: "HIGH", children: "HIGH" }),
                        ],
                      }),
                    ],
                  }),
                  h.jsxs("div", {
                    children: [
                      h.jsx("label", {
                        className:
                          "block text-sm font-medium text-gray-700 mb-1",
                        children: "Return expected (applies to whole order)",
                      }),
                      h.jsx(jx, {
                        value: O ? new Date(O) : null,
                        onChange: (J) => B(J ? J.toISOString() : void 0),
                        minDate: new Date(2020, 0, 1),
                        maxDate: new Date(2030, 11, 31),
                        placeholder: "Choose return date",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          h.jsxs("section", {
            className: "bg-white border rounded-lg p-4 shadow-sm",
            children: [
              h.jsxs("div", {
                className: "flex items-center justify-between mb-3",
                children: [
                  h.jsx("h2", {
                    className: "text-lg font-medium",
                    children: "Order Items",
                  }),
                  h.jsx("button", {
                    type: "button",
                    onClick: q,
                    className:
                      "inline-flex items-center gap-2 px-3 py-1.5 border rounded-md bg-blue-600 text-white hover:bg-blue-700",
                    disabled: N,
                    children: "+ Add item",
                  }),
                ],
              }),
              h.jsx("div", {
                className: "overflow-x-auto",
                children: h.jsxs("table", {
                  className: "min-w-full divide-y divide-gray-200",
                  children: [
                    h.jsx("thead", {
                      children: h.jsxs("tr", {
                        children: [
                          h.jsx("th", {
                            className:
                              "px-3 py-2 text-left text-sm text-gray-600",
                            children: "Garment",
                          }),
                          h.jsx("th", {
                            className:
                              "px-3 py-2 text-left text-sm text-gray-600",
                            children: "Service",
                          }),
                          h.jsx("th", {
                            className:
                              "px-3 py-2 text-left text-sm text-gray-600",
                            children: "Quantity",
                          }),
                          h.jsx("th", {
                            className:
                              "px-3 py-2 text-right text-sm text-gray-600",
                            children: "Action",
                          }),
                        ],
                      }),
                    }),
                    h.jsx("tbody", {
                      className: "bg-white divide-y divide-gray-100",
                      children: C.map((J, lt) =>
                        h.jsxs(
                          "tr",
                          {
                            className: "align-top",
                            children: [
                              h.jsx("td", {
                                className: "px-3 py-2 w-1/5",
                                children: h.jsxs("select", {
                                  className: "w-full border rounded-md p-2",
                                  value: J.garment_id ?? "",
                                  onChange: (tt) =>
                                    W(J.id, {
                                      garment_id: tt.target.value || void 0,
                                      service_id: void 0,
                                    }),
                                  disabled: N,
                                  "aria-label": `Garment for item ${lt + 1}`,
                                  children: [
                                    h.jsx("option", {
                                      value: "",
                                      children: "select garment",
                                    }),
                                    s.map((tt) =>
                                      h.jsx(
                                        "option",
                                        {
                                          value: tt.garment_id,
                                          children: tt.garment_name,
                                        },
                                        tt.garment_id
                                      )
                                    ),
                                  ],
                                }),
                              }),
                              h.jsx("td", {
                                className: "px-3 py-2 w-1/5",
                                children: h.jsxs("select", {
                                  className: "w-full border rounded-md p-2",
                                  value: J.service_id ?? "",
                                  onChange: (tt) =>
                                    W(J.id, {
                                      service_id: tt.target.value || void 0,
                                    }),
                                  disabled: N || !J.garment_id,
                                  "aria-label": `Service for item ${lt + 1}`,
                                  children: [
                                    h.jsx("option", {
                                      value: "",
                                      children: "select service",
                                    }),
                                    yt(J.garment_id).map((tt) =>
                                      h.jsx(
                                        "option",
                                        {
                                          value: tt.service_id,
                                          children: tt.service_name,
                                        },
                                        tt.service_id
                                      )
                                    ),
                                  ],
                                }),
                              }),
                              h.jsx("td", {
                                className: "px-3 py-2 w-1/12",
                                children: h.jsx("input", {
                                  type: "number",
                                  min: 1,
                                  className: "w-full border rounded-md p-2",
                                  value: J.quantity ?? 1,
                                  onChange: (tt) =>
                                    W(J.id, {
                                      quantity: Number(tt.target.value) || 1,
                                    }),
                                  disabled: N,
                                  "aria-label": `Quantity for item ${lt + 1}`,
                                }),
                              }),
                              h.jsx("td", {
                                className: "px-3 py-2 text-right",
                                children: h.jsx("button", {
                                  type: "button",
                                  onClick: () => P(J.id),
                                  className:
                                    "px-3 py-1 text-sm text-red-600 border rounded-md bg-white hover:bg-gray-50",
                                  disabled: N,
                                  "aria-label": `Remove item ${lt + 1}`,
                                  children: "Remove",
                                }),
                              }),
                            ],
                          },
                          J.id
                        )
                      ),
                    }),
                  ],
                }),
              }),
            ],
          }),
          (v || G) &&
            h.jsxs("div", {
              className: "p-3 rounded-md",
              children: [
                v &&
                  h.jsx("div", {
                    className: "text-sm text-red-700",
                    children: v,
                  }),
                G &&
                  h.jsx("div", {
                    className: "text-sm text-green-700",
                    children: G,
                  }),
              ],
            }),
          h.jsxs("footer", {
            className: "flex justify-end gap-3",
            children: [
              h.jsx("button", {
                type: "button",
                onClick: () => {
                  U([{ id: cr("r_"), quantity: 1 }]),
                    S(""),
                    D("MODERATE"),
                    B(void 0),
                    y(null),
                    K(null);
                },
                className:
                  "px-4 py-2 border rounded-md bg-white hover:bg-gray-50",
                disabled: N,
                children: "Reset",
              }),
              h.jsx("button", {
                type: "button",
                onClick: () => gt(),
                className:
                  "px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60",
                disabled: N,
                children: N ? "Submitting..." : "Create Order",
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function Bx() {
  const { customer_id: l } = Gv(),
    [u, s] = E.useState([]),
    [o, c] = E.useState(!1),
    [d, m] = E.useState(null);
  E.useEffect(() => {
    g();
  }, [l]);
  async function g() {
    if (l) {
      c(!0), m(null);
      try {
        const b = await (
          await fetch(
            `https://api.shivaliwashingcompany.in/order/order/customer/${l}`
          )
        ).json();
        s(Array.isArray(b) ? b : b.data || []);
      } catch (y) {
        m(y.message || "Failed to fetch customer orders");
      } finally {
        c(!1);
      }
    }
  }
  function v(y) {
    return y ? new Date(y).toLocaleString() : "-";
  }
  return h.jsxs("div", {
    style: { padding: 20 },
    children: [
      h.jsx("h2", { children: "Customer Orders" }),
      h.jsxs("p", {
        children: ["Showing all orders for ", h.jsx("strong", { children: l })],
      }),
      h.jsx("button", {
        onClick: () => (window.location.href = "/orders"),
        style: {
          padding: "6px 10px",
          borderRadius: 6,
          border: "1px solid #999",
          marginBottom: 20,
        },
        children: "Back to Orders",
      }),
      o && h.jsx("div", { children: "Loading..." }),
      d && h.jsx("div", { style: { color: "red" }, children: d }),
      !o &&
        u.length === 0 &&
        h.jsx("div", { children: "No orders found for this customer." }),
      u.length > 0 &&
        h.jsxs("table", {
          style: { width: "100%", borderCollapse: "collapse", marginTop: 10 },
          children: [
            h.jsx("thead", {
              children: h.jsxs("tr", {
                children: [
                  h.jsx("th", { children: "Name" }),
                  h.jsx("th", { children: "Return Expected" }),
                  h.jsx("th", { children: "Availability" }),
                  h.jsx("th", { children: "Status" }),
                  h.jsx("th", { children: "Created" }),
                ],
              }),
            }),
            h.jsx("tbody", {
              children: u.map((y) =>
                h.jsxs(
                  "tr",
                  {
                    children: [
                      h.jsx("td", { children: y.customer_name }),
                      h.jsx("td", { children: v(y.return_expected_by) }),
                      h.jsx("td", { children: y.availability_status }),
                      h.jsx("td", { children: y.status }),
                      h.jsx("td", { children: v(y.order_created) }),
                    ],
                  },
                  y.order_id
                )
              ),
            }),
          ],
        }),
    ],
  });
}
const Lx = () =>
  h.jsx(h.Fragment, {
    children: h.jsx(R1, {
      children: h.jsx(a1, {
        children: h.jsxs(cn, {
          element: h.jsx(V1, {}),
          children: [
            h.jsx(cn, { index: !0, path: "/", element: h.jsx(B1, {}) }),
            h.jsx(cn, { path: "/orders", element: h.jsx(jy, {}) }),
            h.jsx(cn, {
              path: "/customer-orders/:customer_id",
              element: h.jsx(Bx, {}),
            }),
            h.jsx(cn, {
              index: !0,
              path: "/admin-order",
              element: h.jsx(jy, {}),
            }),
            h.jsx(cn, {
              index: !0,
              path: "/admin-order-items",
              element: h.jsx(Ux, {}),
            }),
            h.jsx(cn, {
              index: !0,
              path: "/admin-service",
              element: h.jsx(Z1, {}),
            }),
            h.jsx(cn, {
              index: !0,
              path: "/admin-garment",
              element: h.jsx(Sx, {}),
            }),
            h.jsx(cn, {
              index: !0,
              path: "/admin-customer",
              element: h.jsx(_x, {}),
            }),
          ],
        }),
      }),
    }),
  });
rv.createRoot(document.getElementById("root")).render(
  h.jsx(E.StrictMode, { children: h.jsx(Lx, {}) })
);
