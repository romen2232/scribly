import {
    r as g,
    a0 as Ht,
    y as ui,
    j as K,
    a1 as go,
    a2 as di,
    a3 as fi,
    E as $e,
    a4 as yo,
    a5 as hi,
    a6 as Zn,
    a7 as vo,
    a8 as Jn,
    a9 as pi,
    aa as mi,
    $ as gi,
    ab as yi,
    ac as vi,
    ad as bi,
    b as Ue,
} from './index-9db94e76.js';
function bo(e, t, n) {
    let [r, o] = g.useState(e || t),
        i = g.useRef(e !== void 0),
        s = e !== void 0;
    g.useEffect(() => {
        let l = i.current;
        l !== s &&
            console.warn(
                `WARN: A component changed from ${
                    l ? 'controlled' : 'uncontrolled'
                } to ${s ? 'controlled' : 'uncontrolled'}.`,
            ),
            (i.current = s);
    }, [s]);
    let a = s ? e : r,
        c = g.useCallback(
            (l, ...u) => {
                let d = (f, ...h) => {
                    n && (Object.is(a, f) || n(f, ...h)), s || (a = f);
                };
                typeof l == 'function'
                    ? (console.warn(
                          'We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320',
                      ),
                      o((h, ...p) => {
                          let m = l(s ? a : h, ...p);
                          return d(m, ...u), s ? h : m;
                      }))
                    : (s || o(l), d(l, ...u));
            },
            [s, a, n],
        );
    return [a, c];
}
function Ot(e) {
    return g.forwardRef(e);
}
var xi = (e, t, n = !0) => {
        if (!t) return [e, {}];
        const r = t.reduce((o, i) => (i in e ? { ...o, [i]: e[i] } : o), {});
        return n
            ? [
                  Object.keys(e)
                      .filter((i) => !t.includes(i))
                      .reduce((i, s) => ({ ...i, [s]: e[s] }), {}),
                  r,
              ]
            : [e, r];
    },
    Qn = (e) => (typeof e == 'boolean' ? `${e}` : e === 0 ? '0' : e),
    te = (e) => !e || typeof e != 'object' || Object.keys(e).length === 0,
    wi = (e, t) => JSON.stringify(e) === JSON.stringify(t);
function xo(e, t) {
    e.forEach(function (n) {
        Array.isArray(n) ? xo(n, t) : t.push(n);
    });
}
function wo(e) {
    let t = [];
    return xo(e, t), t;
}
var Pi = (...e) => wo(e).filter(Boolean),
    Po = (e, t) => {
        let n = {};
        for (let r in e)
            t != null && t.hasOwnProperty(r)
                ? (n[r] =
                      typeof e[r] == 'object'
                          ? Po(e[r], t[r])
                          : t[r] + ' ' + e[r])
                : (n[r] = e[r]);
        for (let r in t) n.hasOwnProperty(r) || (n[r] = t[r]);
        return n;
    },
    er = (e) =>
        !e || typeof e != 'string' ? e : e.replace(/\s+/g, ' ').trim();
function Ci() {
    for (var e = 0, t, n, r = ''; e < arguments.length; )
        (t = arguments[e++]) && (n = Co(t)) && (r && (r += ' '), (r += n));
    return r;
}
function Co(e) {
    if (typeof e == 'string') return e;
    for (var t, n = '', r = 0; r < e.length; r++)
        e[r] && (t = Co(e[r])) && (n && (n += ' '), (n += t));
    return n;
}
var Mn = '-';
function Si(e) {
    var t = Ai(e),
        n = e.conflictingClassGroups,
        r = e.conflictingClassGroupModifiers,
        o = r === void 0 ? {} : r;
    function i(a) {
        var c = a.split(Mn);
        return c[0] === '' && c.length !== 1 && c.shift(), So(c, t) || Ti(a);
    }
    function s(a, c) {
        var l = n[a] || [];
        return c && o[a] ? [].concat(l, o[a]) : l;
    }
    return { getClassGroupId: i, getConflictingClassGroupIds: s };
}
function So(e, t) {
    var s;
    if (e.length === 0) return t.classGroupId;
    var n = e[0],
        r = t.nextPart.get(n),
        o = r ? So(e.slice(1), r) : void 0;
    if (o) return o;
    if (t.validators.length !== 0) {
        var i = e.join(Mn);
        return (s = t.validators.find(function (a) {
            var c = a.validator;
            return c(i);
        })) == null
            ? void 0
            : s.classGroupId;
    }
}
var tr = /^\[(.+)\]$/;
function Ti(e) {
    if (tr.test(e)) {
        var t = tr.exec(e)[1],
            n = t == null ? void 0 : t.substring(0, t.indexOf(':'));
        if (n) return 'arbitrary..' + n;
    }
}
function Ai(e) {
    var t = e.theme,
        n = e.prefix,
        r = { nextPart: new Map(), validators: [] },
        o = Mi(Object.entries(e.classGroups), n);
    return (
        o.forEach(function (i) {
            var s = i[0],
                a = i[1];
            cn(a, r, s, t);
        }),
        r
    );
}
function cn(e, t, n, r) {
    e.forEach(function (o) {
        if (typeof o == 'string') {
            var i = o === '' ? t : nr(t, o);
            i.classGroupId = n;
            return;
        }
        if (typeof o == 'function') {
            if (Vi(o)) {
                cn(o(r), t, n, r);
                return;
            }
            t.validators.push({ validator: o, classGroupId: n });
            return;
        }
        Object.entries(o).forEach(function (s) {
            var a = s[0],
                c = s[1];
            cn(c, nr(t, a), n, r);
        });
    });
}
function nr(e, t) {
    var n = e;
    return (
        t.split(Mn).forEach(function (r) {
            n.nextPart.has(r) ||
                n.nextPart.set(r, { nextPart: new Map(), validators: [] }),
                (n = n.nextPart.get(r));
        }),
        n
    );
}
function Vi(e) {
    return e.isThemeGetter;
}
function Mi(e, t) {
    return t
        ? e.map(function (n) {
              var r = n[0],
                  o = n[1],
                  i = o.map(function (s) {
                      return typeof s == 'string'
                          ? t + s
                          : typeof s == 'object'
                          ? Object.fromEntries(
                                Object.entries(s).map(function (a) {
                                    var c = a[0],
                                        l = a[1];
                                    return [t + c, l];
                                }),
                            )
                          : s;
                  });
              return [r, i];
          })
        : e;
}
function Ri(e) {
    if (e < 1) return { get: function () {}, set: function () {} };
    var t = 0,
        n = new Map(),
        r = new Map();
    function o(i, s) {
        n.set(i, s), t++, t > e && ((t = 0), (r = n), (n = new Map()));
    }
    return {
        get: function (s) {
            var a = n.get(s);
            if (a !== void 0) return a;
            if ((a = r.get(s)) !== void 0) return o(s, a), a;
        },
        set: function (s, a) {
            n.has(s) ? n.set(s, a) : o(s, a);
        },
    };
}
var To = '!';
function ki(e) {
    var t = e.separator || ':',
        n = t.length === 1,
        r = t[0],
        o = t.length;
    return function (s) {
        for (var a = [], c = 0, l = 0, u, d = 0; d < s.length; d++) {
            var f = s[d];
            if (c === 0) {
                if (f === r && (n || s.slice(d, d + o) === t)) {
                    a.push(s.slice(l, d)), (l = d + o);
                    continue;
                }
                if (f === '/') {
                    u = d;
                    continue;
                }
            }
            f === '[' ? c++ : f === ']' && c--;
        }
        var h = a.length === 0 ? s : s.substring(l),
            p = h.startsWith(To),
            m = p ? h.substring(1) : h,
            b = u && u > l ? u - l : void 0;
        return {
            modifiers: a,
            hasImportantModifier: p,
            baseClassName: m,
            maybePostfixModifierPosition: b,
        };
    };
}
function Ei(e) {
    if (e.length <= 1) return e;
    var t = [],
        n = [];
    return (
        e.forEach(function (r) {
            var o = r[0] === '[';
            o ? (t.push.apply(t, n.sort().concat([r])), (n = [])) : n.push(r);
        }),
        t.push.apply(t, n.sort()),
        t
    );
}
function Di(e) {
    return { cache: Ri(e.cacheSize), splitModifiers: ki(e), ...Si(e) };
}
var Li = /\s+/;
function Bi(e, t) {
    var n = t.splitModifiers,
        r = t.getClassGroupId,
        o = t.getConflictingClassGroupIds,
        i = new Set();
    return e
        .trim()
        .split(Li)
        .map(function (s) {
            var a = n(s),
                c = a.modifiers,
                l = a.hasImportantModifier,
                u = a.baseClassName,
                d = a.maybePostfixModifierPosition,
                f = r(d ? u.substring(0, d) : u),
                h = !!d;
            if (!f) {
                if (!d) return { isTailwindClass: !1, originalClassName: s };
                if (((f = r(u)), !f))
                    return { isTailwindClass: !1, originalClassName: s };
                h = !1;
            }
            var p = Ei(c).join(':'),
                m = l ? p + To : p;
            return {
                isTailwindClass: !0,
                modifierId: m,
                classGroupId: f,
                originalClassName: s,
                hasPostfixModifier: h,
            };
        })
        .reverse()
        .filter(function (s) {
            if (!s.isTailwindClass) return !0;
            var a = s.modifierId,
                c = s.classGroupId,
                l = s.hasPostfixModifier,
                u = a + c;
            return i.has(u)
                ? !1
                : (i.add(u),
                  o(c, l).forEach(function (d) {
                      return i.add(a + d);
                  }),
                  !0);
        })
        .reverse()
        .map(function (s) {
            return s.originalClassName;
        })
        .join(' ');
}
function un() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
        t[n] = arguments[n];
    var r,
        o,
        i,
        s = a;
    function a(l) {
        var u = t[0],
            d = t.slice(1),
            f = d.reduce(function (h, p) {
                return p(h);
            }, u());
        return (r = Di(f)), (o = r.cache.get), (i = r.cache.set), (s = c), c(l);
    }
    function c(l) {
        var u = o(l);
        if (u) return u;
        var d = Bi(l, r);
        return i(l, d), d;
    }
    return function () {
        return s(Ci.apply(null, arguments));
    };
}
function F(e) {
    var t = function (r) {
        return r[e] || [];
    };
    return (t.isThemeGetter = !0), t;
}
var Ao = /^\[(?:([a-z-]+):)?(.+)\]$/i,
    Oi = /^\d+\/\d+$/,
    Ii = new Set(['px', 'full', 'screen']),
    ji = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
    Fi =
        /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
    Ni = /^-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
function oe(e) {
    return Me(e) || Ii.has(e) || Oi.test(e) || dn(e);
}
function dn(e) {
    return ke(e, 'length', Hi);
}
function $i(e) {
    return ke(e, 'size', Vo);
}
function zi(e) {
    return ke(e, 'position', Vo);
}
function Gi(e) {
    return ke(e, 'url', _i);
}
function ct(e) {
    return ke(e, 'number', Me);
}
function Me(e) {
    return !Number.isNaN(Number(e));
}
function Ui(e) {
    return e.endsWith('%') && Me(e.slice(0, -1));
}
function He(e) {
    return rr(e) || ke(e, 'number', rr);
}
function B(e) {
    return Ao.test(e);
}
function _e() {
    return !0;
}
function me(e) {
    return ji.test(e);
}
function Wi(e) {
    return ke(e, '', Ki);
}
function ke(e, t, n) {
    var r = Ao.exec(e);
    return r ? (r[1] ? r[1] === t : n(r[2])) : !1;
}
function Hi(e) {
    return Fi.test(e);
}
function Vo() {
    return !1;
}
function _i(e) {
    return e.startsWith('url(');
}
function rr(e) {
    return Number.isInteger(Number(e));
}
function Ki(e) {
    return Ni.test(e);
}
function fn() {
    var e = F('colors'),
        t = F('spacing'),
        n = F('blur'),
        r = F('brightness'),
        o = F('borderColor'),
        i = F('borderRadius'),
        s = F('borderSpacing'),
        a = F('borderWidth'),
        c = F('contrast'),
        l = F('grayscale'),
        u = F('hueRotate'),
        d = F('invert'),
        f = F('gap'),
        h = F('gradientColorStops'),
        p = F('gradientColorStopPositions'),
        m = F('inset'),
        b = F('margin'),
        w = F('opacity'),
        y = F('padding'),
        v = F('saturate'),
        x = F('scale'),
        P = F('sepia'),
        k = F('skew'),
        R = F('space'),
        S = F('translate'),
        D = function () {
            return ['auto', 'contain', 'none'];
        },
        H = function () {
            return ['auto', 'hidden', 'clip', 'visible', 'scroll'];
        },
        X = function () {
            return ['auto', B, t];
        },
        L = function () {
            return [B, t];
        },
        Y = function () {
            return ['', oe];
        },
        I = function () {
            return ['auto', Me, B];
        },
        O = function () {
            return [
                'bottom',
                'center',
                'left',
                'left-bottom',
                'left-top',
                'right',
                'right-bottom',
                'right-top',
                'top',
            ];
        },
        _ = function () {
            return ['solid', 'dashed', 'dotted', 'double', 'none'];
        },
        J = function () {
            return [
                'normal',
                'multiply',
                'screen',
                'overlay',
                'darken',
                'lighten',
                'color-dodge',
                'color-burn',
                'hard-light',
                'soft-light',
                'difference',
                'exclusion',
                'hue',
                'saturation',
                'color',
                'luminosity',
                'plus-lighter',
            ];
        },
        le = function () {
            return [
                'start',
                'end',
                'center',
                'between',
                'around',
                'evenly',
                'stretch',
            ];
        },
        T = function () {
            return ['', '0', B];
        },
        E = function () {
            return [
                'auto',
                'avoid',
                'all',
                'avoid-page',
                'page',
                'left',
                'right',
                'column',
            ];
        },
        C = function () {
            return [Me, ct];
        },
        V = function () {
            return [Me, B];
        };
    return {
        cacheSize: 500,
        theme: {
            colors: [_e],
            spacing: [oe],
            blur: ['none', '', me, B],
            brightness: C(),
            borderColor: [e],
            borderRadius: ['none', '', 'full', me, B],
            borderSpacing: L(),
            borderWidth: Y(),
            contrast: C(),
            grayscale: T(),
            hueRotate: V(),
            invert: T(),
            gap: L(),
            gradientColorStops: [e],
            gradientColorStopPositions: [Ui, dn],
            inset: X(),
            margin: X(),
            opacity: C(),
            padding: L(),
            saturate: C(),
            scale: C(),
            sepia: T(),
            skew: V(),
            space: L(),
            translate: L(),
        },
        classGroups: {
            aspect: [{ aspect: ['auto', 'square', 'video', B] }],
            container: ['container'],
            columns: [{ columns: [me] }],
            'break-after': [{ 'break-after': E() }],
            'break-before': [{ 'break-before': E() }],
            'break-inside': [
                {
                    'break-inside': [
                        'auto',
                        'avoid',
                        'avoid-page',
                        'avoid-column',
                    ],
                },
            ],
            'box-decoration': [{ 'box-decoration': ['slice', 'clone'] }],
            box: [{ box: ['border', 'content'] }],
            display: [
                'block',
                'inline-block',
                'inline',
                'flex',
                'inline-flex',
                'table',
                'inline-table',
                'table-caption',
                'table-cell',
                'table-column',
                'table-column-group',
                'table-footer-group',
                'table-header-group',
                'table-row-group',
                'table-row',
                'flow-root',
                'grid',
                'inline-grid',
                'contents',
                'list-item',
                'hidden',
            ],
            float: [{ float: ['right', 'left', 'none'] }],
            clear: [{ clear: ['left', 'right', 'both', 'none'] }],
            isolation: ['isolate', 'isolation-auto'],
            'object-fit': [
                { object: ['contain', 'cover', 'fill', 'none', 'scale-down'] },
            ],
            'object-position': [{ object: [].concat(O(), [B]) }],
            overflow: [{ overflow: H() }],
            'overflow-x': [{ 'overflow-x': H() }],
            'overflow-y': [{ 'overflow-y': H() }],
            overscroll: [{ overscroll: D() }],
            'overscroll-x': [{ 'overscroll-x': D() }],
            'overscroll-y': [{ 'overscroll-y': D() }],
            position: ['static', 'fixed', 'absolute', 'relative', 'sticky'],
            inset: [{ inset: [m] }],
            'inset-x': [{ 'inset-x': [m] }],
            'inset-y': [{ 'inset-y': [m] }],
            start: [{ start: [m] }],
            end: [{ end: [m] }],
            top: [{ top: [m] }],
            right: [{ right: [m] }],
            bottom: [{ bottom: [m] }],
            left: [{ left: [m] }],
            visibility: ['visible', 'invisible', 'collapse'],
            z: [{ z: ['auto', He] }],
            basis: [{ basis: X() }],
            'flex-direction': [
                { flex: ['row', 'row-reverse', 'col', 'col-reverse'] },
            ],
            'flex-wrap': [{ flex: ['wrap', 'wrap-reverse', 'nowrap'] }],
            flex: [{ flex: ['1', 'auto', 'initial', 'none', B] }],
            grow: [{ grow: T() }],
            shrink: [{ shrink: T() }],
            order: [{ order: ['first', 'last', 'none', He] }],
            'grid-cols': [{ 'grid-cols': [_e] }],
            'col-start-end': [{ col: ['auto', { span: ['full', He] }, B] }],
            'col-start': [{ 'col-start': I() }],
            'col-end': [{ 'col-end': I() }],
            'grid-rows': [{ 'grid-rows': [_e] }],
            'row-start-end': [{ row: ['auto', { span: [He] }, B] }],
            'row-start': [{ 'row-start': I() }],
            'row-end': [{ 'row-end': I() }],
            'grid-flow': [
                {
                    'grid-flow': [
                        'row',
                        'col',
                        'dense',
                        'row-dense',
                        'col-dense',
                    ],
                },
            ],
            'auto-cols': [{ 'auto-cols': ['auto', 'min', 'max', 'fr', B] }],
            'auto-rows': [{ 'auto-rows': ['auto', 'min', 'max', 'fr', B] }],
            gap: [{ gap: [f] }],
            'gap-x': [{ 'gap-x': [f] }],
            'gap-y': [{ 'gap-y': [f] }],
            'justify-content': [{ justify: ['normal'].concat(le()) }],
            'justify-items': [
                { 'justify-items': ['start', 'end', 'center', 'stretch'] },
            ],
            'justify-self': [
                {
                    'justify-self': [
                        'auto',
                        'start',
                        'end',
                        'center',
                        'stretch',
                    ],
                },
            ],
            'align-content': [
                { content: ['normal'].concat(le(), ['baseline']) },
            ],
            'align-items': [
                { items: ['start', 'end', 'center', 'baseline', 'stretch'] },
            ],
            'align-self': [
                {
                    self: [
                        'auto',
                        'start',
                        'end',
                        'center',
                        'stretch',
                        'baseline',
                    ],
                },
            ],
            'place-content': [
                { 'place-content': [].concat(le(), ['baseline']) },
            ],
            'place-items': [
                {
                    'place-items': [
                        'start',
                        'end',
                        'center',
                        'baseline',
                        'stretch',
                    ],
                },
            ],
            'place-self': [
                { 'place-self': ['auto', 'start', 'end', 'center', 'stretch'] },
            ],
            p: [{ p: [y] }],
            px: [{ px: [y] }],
            py: [{ py: [y] }],
            ps: [{ ps: [y] }],
            pe: [{ pe: [y] }],
            pt: [{ pt: [y] }],
            pr: [{ pr: [y] }],
            pb: [{ pb: [y] }],
            pl: [{ pl: [y] }],
            m: [{ m: [b] }],
            mx: [{ mx: [b] }],
            my: [{ my: [b] }],
            ms: [{ ms: [b] }],
            me: [{ me: [b] }],
            mt: [{ mt: [b] }],
            mr: [{ mr: [b] }],
            mb: [{ mb: [b] }],
            ml: [{ ml: [b] }],
            'space-x': [{ 'space-x': [R] }],
            'space-x-reverse': ['space-x-reverse'],
            'space-y': [{ 'space-y': [R] }],
            'space-y-reverse': ['space-y-reverse'],
            w: [{ w: ['auto', 'min', 'max', 'fit', B, t] }],
            'min-w': [{ 'min-w': ['min', 'max', 'fit', B, oe] }],
            'max-w': [
                {
                    'max-w': [
                        '0',
                        'none',
                        'full',
                        'min',
                        'max',
                        'fit',
                        'prose',
                        { screen: [me] },
                        me,
                        B,
                    ],
                },
            ],
            h: [{ h: [B, t, 'auto', 'min', 'max', 'fit'] }],
            'min-h': [{ 'min-h': ['min', 'max', 'fit', B, oe] }],
            'max-h': [{ 'max-h': [B, t, 'min', 'max', 'fit'] }],
            'font-size': [{ text: ['base', me, dn] }],
            'font-smoothing': ['antialiased', 'subpixel-antialiased'],
            'font-style': ['italic', 'not-italic'],
            'font-weight': [
                {
                    font: [
                        'thin',
                        'extralight',
                        'light',
                        'normal',
                        'medium',
                        'semibold',
                        'bold',
                        'extrabold',
                        'black',
                        ct,
                    ],
                },
            ],
            'font-family': [{ font: [_e] }],
            'fvn-normal': ['normal-nums'],
            'fvn-ordinal': ['ordinal'],
            'fvn-slashed-zero': ['slashed-zero'],
            'fvn-figure': ['lining-nums', 'oldstyle-nums'],
            'fvn-spacing': ['proportional-nums', 'tabular-nums'],
            'fvn-fraction': ['diagonal-fractions', 'stacked-fractons'],
            tracking: [
                {
                    tracking: [
                        'tighter',
                        'tight',
                        'normal',
                        'wide',
                        'wider',
                        'widest',
                        B,
                    ],
                },
            ],
            'line-clamp': [{ 'line-clamp': ['none', Me, ct] }],
            leading: [
                {
                    leading: [
                        'none',
                        'tight',
                        'snug',
                        'normal',
                        'relaxed',
                        'loose',
                        B,
                        oe,
                    ],
                },
            ],
            'list-image': [{ 'list-image': ['none', B] }],
            'list-style-type': [{ list: ['none', 'disc', 'decimal', B] }],
            'list-style-position': [{ list: ['inside', 'outside'] }],
            'placeholder-color': [{ placeholder: [e] }],
            'placeholder-opacity': [{ 'placeholder-opacity': [w] }],
            'text-alignment': [
                {
                    text: [
                        'left',
                        'center',
                        'right',
                        'justify',
                        'start',
                        'end',
                    ],
                },
            ],
            'text-color': [{ text: [e] }],
            'text-opacity': [{ 'text-opacity': [w] }],
            'text-decoration': [
                'underline',
                'overline',
                'line-through',
                'no-underline',
            ],
            'text-decoration-style': [{ decoration: [].concat(_(), ['wavy']) }],
            'text-decoration-thickness': [
                { decoration: ['auto', 'from-font', oe] },
            ],
            'underline-offset': [{ 'underline-offset': ['auto', B, oe] }],
            'text-decoration-color': [{ decoration: [e] }],
            'text-transform': [
                'uppercase',
                'lowercase',
                'capitalize',
                'normal-case',
            ],
            'text-overflow': ['truncate', 'text-ellipsis', 'text-clip'],
            indent: [{ indent: L() }],
            'vertical-align': [
                {
                    align: [
                        'baseline',
                        'top',
                        'middle',
                        'bottom',
                        'text-top',
                        'text-bottom',
                        'sub',
                        'super',
                        B,
                    ],
                },
            ],
            whitespace: [
                {
                    whitespace: [
                        'normal',
                        'nowrap',
                        'pre',
                        'pre-line',
                        'pre-wrap',
                        'break-spaces',
                    ],
                },
            ],
            break: [{ break: ['normal', 'words', 'all', 'keep'] }],
            hyphens: [{ hyphens: ['none', 'manual', 'auto'] }],
            content: [{ content: ['none', B] }],
            'bg-attachment': [{ bg: ['fixed', 'local', 'scroll'] }],
            'bg-clip': [
                { 'bg-clip': ['border', 'padding', 'content', 'text'] },
            ],
            'bg-opacity': [{ 'bg-opacity': [w] }],
            'bg-origin': [{ 'bg-origin': ['border', 'padding', 'content'] }],
            'bg-position': [{ bg: [].concat(O(), [zi]) }],
            'bg-repeat': [
                {
                    bg: [
                        'no-repeat',
                        { repeat: ['', 'x', 'y', 'round', 'space'] },
                    ],
                },
            ],
            'bg-size': [{ bg: ['auto', 'cover', 'contain', $i] }],
            'bg-image': [
                {
                    bg: [
                        'none',
                        {
                            'gradient-to': [
                                't',
                                'tr',
                                'r',
                                'br',
                                'b',
                                'bl',
                                'l',
                                'tl',
                            ],
                        },
                        Gi,
                    ],
                },
            ],
            'bg-color': [{ bg: [e] }],
            'gradient-from-pos': [{ from: [p] }],
            'gradient-via-pos': [{ via: [p] }],
            'gradient-to-pos': [{ to: [p] }],
            'gradient-from': [{ from: [h] }],
            'gradient-via': [{ via: [h] }],
            'gradient-to': [{ to: [h] }],
            rounded: [{ rounded: [i] }],
            'rounded-s': [{ 'rounded-s': [i] }],
            'rounded-e': [{ 'rounded-e': [i] }],
            'rounded-t': [{ 'rounded-t': [i] }],
            'rounded-r': [{ 'rounded-r': [i] }],
            'rounded-b': [{ 'rounded-b': [i] }],
            'rounded-l': [{ 'rounded-l': [i] }],
            'rounded-ss': [{ 'rounded-ss': [i] }],
            'rounded-se': [{ 'rounded-se': [i] }],
            'rounded-ee': [{ 'rounded-ee': [i] }],
            'rounded-es': [{ 'rounded-es': [i] }],
            'rounded-tl': [{ 'rounded-tl': [i] }],
            'rounded-tr': [{ 'rounded-tr': [i] }],
            'rounded-br': [{ 'rounded-br': [i] }],
            'rounded-bl': [{ 'rounded-bl': [i] }],
            'border-w': [{ border: [a] }],
            'border-w-x': [{ 'border-x': [a] }],
            'border-w-y': [{ 'border-y': [a] }],
            'border-w-s': [{ 'border-s': [a] }],
            'border-w-e': [{ 'border-e': [a] }],
            'border-w-t': [{ 'border-t': [a] }],
            'border-w-r': [{ 'border-r': [a] }],
            'border-w-b': [{ 'border-b': [a] }],
            'border-w-l': [{ 'border-l': [a] }],
            'border-opacity': [{ 'border-opacity': [w] }],
            'border-style': [{ border: [].concat(_(), ['hidden']) }],
            'divide-x': [{ 'divide-x': [a] }],
            'divide-x-reverse': ['divide-x-reverse'],
            'divide-y': [{ 'divide-y': [a] }],
            'divide-y-reverse': ['divide-y-reverse'],
            'divide-opacity': [{ 'divide-opacity': [w] }],
            'divide-style': [{ divide: _() }],
            'border-color': [{ border: [o] }],
            'border-color-x': [{ 'border-x': [o] }],
            'border-color-y': [{ 'border-y': [o] }],
            'border-color-t': [{ 'border-t': [o] }],
            'border-color-r': [{ 'border-r': [o] }],
            'border-color-b': [{ 'border-b': [o] }],
            'border-color-l': [{ 'border-l': [o] }],
            'divide-color': [{ divide: [o] }],
            'outline-style': [{ outline: [''].concat(_()) }],
            'outline-offset': [{ 'outline-offset': [B, oe] }],
            'outline-w': [{ outline: [oe] }],
            'outline-color': [{ outline: [e] }],
            'ring-w': [{ ring: Y() }],
            'ring-w-inset': ['ring-inset'],
            'ring-color': [{ ring: [e] }],
            'ring-opacity': [{ 'ring-opacity': [w] }],
            'ring-offset-w': [{ 'ring-offset': [oe] }],
            'ring-offset-color': [{ 'ring-offset': [e] }],
            shadow: [{ shadow: ['', 'inner', 'none', me, Wi] }],
            'shadow-color': [{ shadow: [_e] }],
            opacity: [{ opacity: [w] }],
            'mix-blend': [{ 'mix-blend': J() }],
            'bg-blend': [{ 'bg-blend': J() }],
            filter: [{ filter: ['', 'none'] }],
            blur: [{ blur: [n] }],
            brightness: [{ brightness: [r] }],
            contrast: [{ contrast: [c] }],
            'drop-shadow': [{ 'drop-shadow': ['', 'none', me, B] }],
            grayscale: [{ grayscale: [l] }],
            'hue-rotate': [{ 'hue-rotate': [u] }],
            invert: [{ invert: [d] }],
            saturate: [{ saturate: [v] }],
            sepia: [{ sepia: [P] }],
            'backdrop-filter': [{ 'backdrop-filter': ['', 'none'] }],
            'backdrop-blur': [{ 'backdrop-blur': [n] }],
            'backdrop-brightness': [{ 'backdrop-brightness': [r] }],
            'backdrop-contrast': [{ 'backdrop-contrast': [c] }],
            'backdrop-grayscale': [{ 'backdrop-grayscale': [l] }],
            'backdrop-hue-rotate': [{ 'backdrop-hue-rotate': [u] }],
            'backdrop-invert': [{ 'backdrop-invert': [d] }],
            'backdrop-opacity': [{ 'backdrop-opacity': [w] }],
            'backdrop-saturate': [{ 'backdrop-saturate': [v] }],
            'backdrop-sepia': [{ 'backdrop-sepia': [P] }],
            'border-collapse': [{ border: ['collapse', 'separate'] }],
            'border-spacing': [{ 'border-spacing': [s] }],
            'border-spacing-x': [{ 'border-spacing-x': [s] }],
            'border-spacing-y': [{ 'border-spacing-y': [s] }],
            'table-layout': [{ table: ['auto', 'fixed'] }],
            caption: [{ caption: ['top', 'bottom'] }],
            transition: [
                {
                    transition: [
                        'none',
                        'all',
                        '',
                        'colors',
                        'opacity',
                        'shadow',
                        'transform',
                        B,
                    ],
                },
            ],
            duration: [{ duration: V() }],
            ease: [{ ease: ['linear', 'in', 'out', 'in-out', B] }],
            delay: [{ delay: V() }],
            animate: [
                { animate: ['none', 'spin', 'ping', 'pulse', 'bounce', B] },
            ],
            transform: [{ transform: ['', 'gpu', 'none'] }],
            scale: [{ scale: [x] }],
            'scale-x': [{ 'scale-x': [x] }],
            'scale-y': [{ 'scale-y': [x] }],
            rotate: [{ rotate: [He, B] }],
            'translate-x': [{ 'translate-x': [S] }],
            'translate-y': [{ 'translate-y': [S] }],
            'skew-x': [{ 'skew-x': [k] }],
            'skew-y': [{ 'skew-y': [k] }],
            'transform-origin': [
                {
                    origin: [
                        'center',
                        'top',
                        'top-right',
                        'right',
                        'bottom-right',
                        'bottom',
                        'bottom-left',
                        'left',
                        'top-left',
                        B,
                    ],
                },
            ],
            accent: [{ accent: ['auto', e] }],
            appearance: ['appearance-none'],
            cursor: [
                {
                    cursor: [
                        'auto',
                        'default',
                        'pointer',
                        'wait',
                        'text',
                        'move',
                        'help',
                        'not-allowed',
                        'none',
                        'context-menu',
                        'progress',
                        'cell',
                        'crosshair',
                        'vertical-text',
                        'alias',
                        'copy',
                        'no-drop',
                        'grab',
                        'grabbing',
                        'all-scroll',
                        'col-resize',
                        'row-resize',
                        'n-resize',
                        'e-resize',
                        's-resize',
                        'w-resize',
                        'ne-resize',
                        'nw-resize',
                        'se-resize',
                        'sw-resize',
                        'ew-resize',
                        'ns-resize',
                        'nesw-resize',
                        'nwse-resize',
                        'zoom-in',
                        'zoom-out',
                        B,
                    ],
                },
            ],
            'caret-color': [{ caret: [e] }],
            'pointer-events': [{ 'pointer-events': ['none', 'auto'] }],
            resize: [{ resize: ['none', 'y', 'x', ''] }],
            'scroll-behavior': [{ scroll: ['auto', 'smooth'] }],
            'scroll-m': [{ 'scroll-m': L() }],
            'scroll-mx': [{ 'scroll-mx': L() }],
            'scroll-my': [{ 'scroll-my': L() }],
            'scroll-ms': [{ 'scroll-ms': L() }],
            'scroll-me': [{ 'scroll-me': L() }],
            'scroll-mt': [{ 'scroll-mt': L() }],
            'scroll-mr': [{ 'scroll-mr': L() }],
            'scroll-mb': [{ 'scroll-mb': L() }],
            'scroll-ml': [{ 'scroll-ml': L() }],
            'scroll-p': [{ 'scroll-p': L() }],
            'scroll-px': [{ 'scroll-px': L() }],
            'scroll-py': [{ 'scroll-py': L() }],
            'scroll-ps': [{ 'scroll-ps': L() }],
            'scroll-pe': [{ 'scroll-pe': L() }],
            'scroll-pt': [{ 'scroll-pt': L() }],
            'scroll-pr': [{ 'scroll-pr': L() }],
            'scroll-pb': [{ 'scroll-pb': L() }],
            'scroll-pl': [{ 'scroll-pl': L() }],
            'snap-align': [{ snap: ['start', 'end', 'center', 'align-none'] }],
            'snap-stop': [{ snap: ['normal', 'always'] }],
            'snap-type': [{ snap: ['none', 'x', 'y', 'both'] }],
            'snap-strictness': [{ snap: ['mandatory', 'proximity'] }],
            touch: [
                {
                    touch: [
                        'auto',
                        'none',
                        'pinch-zoom',
                        'manipulation',
                        { pan: ['x', 'left', 'right', 'y', 'up', 'down'] },
                    ],
                },
            ],
            select: [{ select: ['none', 'text', 'all', 'auto'] }],
            'will-change': [
                {
                    'will-change': [
                        'auto',
                        'scroll',
                        'contents',
                        'transform',
                        B,
                    ],
                },
            ],
            fill: [{ fill: [e, 'none'] }],
            'stroke-w': [{ stroke: [oe, ct] }],
            stroke: [{ stroke: [e, 'none'] }],
            sr: ['sr-only', 'not-sr-only'],
        },
        conflictingClassGroups: {
            overflow: ['overflow-x', 'overflow-y'],
            overscroll: ['overscroll-x', 'overscroll-y'],
            inset: [
                'inset-x',
                'inset-y',
                'start',
                'end',
                'top',
                'right',
                'bottom',
                'left',
            ],
            'inset-x': ['right', 'left'],
            'inset-y': ['top', 'bottom'],
            flex: ['basis', 'grow', 'shrink'],
            gap: ['gap-x', 'gap-y'],
            p: ['px', 'py', 'ps', 'pe', 'pt', 'pr', 'pb', 'pl'],
            px: ['pr', 'pl'],
            py: ['pt', 'pb'],
            m: ['mx', 'my', 'ms', 'me', 'mt', 'mr', 'mb', 'ml'],
            mx: ['mr', 'ml'],
            my: ['mt', 'mb'],
            'font-size': ['leading'],
            'fvn-normal': [
                'fvn-ordinal',
                'fvn-slashed-zero',
                'fvn-figure',
                'fvn-spacing',
                'fvn-fraction',
            ],
            'fvn-ordinal': ['fvn-normal'],
            'fvn-slashed-zero': ['fvn-normal'],
            'fvn-figure': ['fvn-normal'],
            'fvn-spacing': ['fvn-normal'],
            'fvn-fraction': ['fvn-normal'],
            rounded: [
                'rounded-s',
                'rounded-e',
                'rounded-t',
                'rounded-r',
                'rounded-b',
                'rounded-l',
                'rounded-ss',
                'rounded-se',
                'rounded-ee',
                'rounded-es',
                'rounded-tl',
                'rounded-tr',
                'rounded-br',
                'rounded-bl',
            ],
            'rounded-s': ['rounded-ss', 'rounded-es'],
            'rounded-e': ['rounded-se', 'rounded-ee'],
            'rounded-t': ['rounded-tl', 'rounded-tr'],
            'rounded-r': ['rounded-tr', 'rounded-br'],
            'rounded-b': ['rounded-br', 'rounded-bl'],
            'rounded-l': ['rounded-tl', 'rounded-bl'],
            'border-spacing': ['border-spacing-x', 'border-spacing-y'],
            'border-w': [
                'border-w-s',
                'border-w-e',
                'border-w-t',
                'border-w-r',
                'border-w-b',
                'border-w-l',
            ],
            'border-w-x': ['border-w-r', 'border-w-l'],
            'border-w-y': ['border-w-t', 'border-w-b'],
            'border-color': [
                'border-color-t',
                'border-color-r',
                'border-color-b',
                'border-color-l',
            ],
            'border-color-x': ['border-color-r', 'border-color-l'],
            'border-color-y': ['border-color-t', 'border-color-b'],
            'scroll-m': [
                'scroll-mx',
                'scroll-my',
                'scroll-ms',
                'scroll-me',
                'scroll-mt',
                'scroll-mr',
                'scroll-mb',
                'scroll-ml',
            ],
            'scroll-mx': ['scroll-mr', 'scroll-ml'],
            'scroll-my': ['scroll-mt', 'scroll-mb'],
            'scroll-p': [
                'scroll-px',
                'scroll-py',
                'scroll-ps',
                'scroll-pe',
                'scroll-pt',
                'scroll-pr',
                'scroll-pb',
                'scroll-pl',
            ],
            'scroll-px': ['scroll-pr', 'scroll-pl'],
            'scroll-py': ['scroll-pt', 'scroll-pb'],
        },
        conflictingClassGroupModifiers: { 'font-size': ['leading'] },
    };
}
function Xi(e, t) {
    for (var n in t) Mo(e, n, t[n]);
    return e;
}
var Yi = Object.prototype.hasOwnProperty,
    qi = new Set(['string', 'number', 'boolean']);
function Mo(e, t, n) {
    if (!Yi.call(e, t) || qi.has(typeof n) || n === null) {
        e[t] = n;
        return;
    }
    if (Array.isArray(n) && Array.isArray(e[t])) {
        e[t] = e[t].concat(n);
        return;
    }
    if (typeof n == 'object' && typeof e[t] == 'object') {
        if (e[t] === null) {
            e[t] = n;
            return;
        }
        for (var r in n) Mo(e[t], r, n[r]);
    }
}
function Zi(e) {
    for (
        var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1;
        r < t;
        r++
    )
        n[r - 1] = arguments[r];
    return typeof e == 'function'
        ? un.apply(void 0, [fn, e].concat(n))
        : un.apply(
              void 0,
              [
                  function () {
                      return Xi(fn(), e);
                  },
              ].concat(n),
          );
}
var Ji = un(fn),
    Qi = { twMerge: !0, twMergeConfig: {}, responsiveVariants: !1 },
    Ro = (e) => e || void 0,
    Pt = (...e) => Ro(wo(e).filter(Boolean).join(' ')),
    _t = null,
    Ct = {},
    hn = !1,
    Ke =
        (...e) =>
        (t) =>
            t.twMerge
                ? ((!_t || hn) && ((hn = !1), (_t = te(Ct) ? Ji : Zi(Ct))),
                  Ro(_t(Pt(e))))
                : Pt(e),
    or = (e, t) => {
        for (let n in t)
            e.hasOwnProperty(n) ? (e[n] = Pt(e[n], t[n])) : (e[n] = t[n]);
        return e;
    },
    ea = (e, t) => {
        var n, r, o, i, s;
        let {
                slots: a = {},
                variants: c = {},
                compoundVariants: l = [],
                compoundSlots: u = [],
                defaultVariants: d = {},
            } = e,
            f = { ...Qi, ...t },
            h = Pt(
                (n = e == null ? void 0 : e.extend) == null ? void 0 : n.base,
                e == null ? void 0 : e.base,
            ),
            p = Po(
                c,
                (r = e == null ? void 0 : e.extend) == null
                    ? void 0
                    : r.variants,
            ),
            m = {
                ...((o = e == null ? void 0 : e.extend) == null
                    ? void 0
                    : o.defaultVariants),
                ...d,
            };
        !te(f.twMergeConfig) &&
            !wi(f.twMergeConfig, Ct) &&
            ((hn = !0), (Ct = f.twMergeConfig));
        let b = te(a) ? {} : { base: e == null ? void 0 : e.base, ...a },
            w = te(
                (i = e == null ? void 0 : e.extend) == null ? void 0 : i.slots,
            )
                ? b
                : or(
                      (s = e == null ? void 0 : e.extend) == null
                          ? void 0
                          : s.slots,
                      te(b) ? { base: e == null ? void 0 : e.base } : b,
                  ),
            y = (x) => {
                var P, k, R, S;
                if (
                    te(p) &&
                    te(a) &&
                    te(
                        (P = e == null ? void 0 : e.extend) == null
                            ? void 0
                            : P.slots,
                    )
                )
                    return Ke(
                        h,
                        x == null ? void 0 : x.class,
                        x == null ? void 0 : x.className,
                    )(f);
                if (l && !Array.isArray(l))
                    throw new TypeError(
                        `The "compoundVariants" prop must be an array. Received: ${typeof l}`,
                    );
                if (u && !Array.isArray(u))
                    throw new TypeError(
                        `The "compoundSlots" prop must be an array. Received: ${typeof u}`,
                    );
                let D = (T, E, C = [], V) => {
                        let M = C;
                        if (typeof E == 'string')
                            M.push(
                                er(E)
                                    .split(' ')
                                    .map((j) => `${T}:${j}`),
                            );
                        else if (Array.isArray(E))
                            M.push(E.flatMap((j) => `${T}:${j}`));
                        else if (typeof E == 'object' && typeof V == 'string') {
                            let j = E == null ? void 0 : E[V];
                            if (j && typeof j == 'string') {
                                let U = er(j);
                                M[V] = M[V]
                                    ? [
                                          ...M[V],
                                          ...U.split(' ').map(
                                              (N) => `${T}:${N}`,
                                          ),
                                      ]
                                    : U.split(' ').map((N) => `${T}:${N}`);
                            } else
                                Array.isArray(j) &&
                                    j.length > 0 &&
                                    (M[V] = j.flatMap((U) => `${T}:${U}`));
                        }
                        return M;
                    },
                    H = (T, E = p, C = null) => {
                        let V = E == null ? void 0 : E[T];
                        if (!V || te(V)) return null;
                        let M = x == null ? void 0 : x[T];
                        if (M === null) return null;
                        let j = Qn(M),
                            U =
                                (Array.isArray(f.responsiveVariants) &&
                                    f.responsiveVariants.length > 0) ||
                                f.responsiveVariants === !0,
                            N = m == null ? void 0 : m[T],
                            Q = [];
                        typeof j == 'object' &&
                            U &&
                            (Q = Object.keys(j).reduce((Se, ce) => {
                                let se = j[ce],
                                    lt = V == null ? void 0 : V[se];
                                return ce === 'initial'
                                    ? ((N = se), Se)
                                    : Array.isArray(f.responsiveVariants) &&
                                      !f.responsiveVariants.includes(ce)
                                    ? Se
                                    : D(ce, lt, Se, C);
                            }, []));
                        let We = V[j] || V[Qn(N)];
                        return typeof Q == 'object' &&
                            typeof C == 'string' &&
                            Q[C]
                            ? or(Q, We)
                            : Q.length > 0
                            ? [We, ...Q]
                            : We;
                    },
                    X = () => (p ? Object.keys(p).map((T) => H(T, p)) : null),
                    L = (T) =>
                        !p || typeof p != 'object'
                            ? null
                            : Object.keys(p).reduce((E, C) => {
                                  let V = H(C, p, T),
                                      M =
                                          T === 'base' && typeof V == 'string'
                                              ? V
                                              : V && V[T];
                                  return M && E.push(M), E;
                              }, []),
                    Y =
                        x &&
                        Object.fromEntries(
                            Object.entries(x).filter(([, T]) => T !== void 0),
                        ),
                    I = (T) => {
                        var E;
                        let C =
                            typeof (x == null ? void 0 : x[T]) == 'object'
                                ? {
                                      [T]:
                                          (E = x[T]) == null
                                              ? void 0
                                              : E.initial,
                                  }
                                : {};
                        return { ...m, ...Y, ...C };
                    },
                    O = (T = []) =>
                        T == null
                            ? void 0
                            : T.filter(({ class: E, className: C, ...V }) =>
                                  Object.entries(V).every(([M, j]) => {
                                      let U = I(M);
                                      return Array.isArray(j)
                                          ? j.includes(U[M])
                                          : U[M] === j;
                                  }),
                              ).flatMap(({ class: E, className: C }) => [E, C]),
                    _ = () => {
                        var T;
                        let E = O(l),
                            C = O(
                                (T = e == null ? void 0 : e.extend) == null
                                    ? void 0
                                    : T.compoundVariants,
                            );
                        return Pi(C, E);
                    },
                    J = () => {
                        let T = _();
                        return Array.isArray(T)
                            ? T.reduce((E, C) => {
                                  if (
                                      (typeof C == 'string' &&
                                          (E.base = Ke(E.base, C)(f)),
                                      typeof C == 'object')
                                  ) {
                                      let V = Object.keys(C);
                                      for (let M of V) E[M] = Ke(E[M], C[M])(f);
                                  }
                                  return E;
                              }, {})
                            : T;
                    },
                    le = () =>
                        u.length < 1
                            ? null
                            : u.reduce((T, E) => {
                                  let {
                                      slots: C = [],
                                      class: V,
                                      className: M,
                                      ...j
                                  } = E;
                                  if (!te(j)) {
                                      let U = Object.keys(j);
                                      for (let N of U) {
                                          let Q = I(N)[N];
                                          if (!Q || Q !== j[N]) return T;
                                      }
                                  }
                                  for (let U of C)
                                      T[U] || (T[U] = []), T[U].push([V, M]);
                                  return T;
                              }, {});
                if (
                    !te(a) ||
                    !te(
                        (k = e == null ? void 0 : e.extend) == null
                            ? void 0
                            : k.slots,
                    )
                ) {
                    let T = (R = J()) != null ? R : [],
                        E = (S = le()) != null ? S : [];
                    return {
                        ...(typeof w == 'object' && !te(w)
                            ? Object.keys(w).reduce(
                                  (C, V) => (
                                      (C[V] = (M) =>
                                          Ke(
                                              w[V],
                                              L(V),
                                              T == null ? void 0 : T[V],
                                              E == null ? void 0 : E[V],
                                              M == null ? void 0 : M.class,
                                              M == null ? void 0 : M.className,
                                          )(f)),
                                      C
                                  ),
                                  {},
                              )
                            : {}),
                    };
                }
                return Ke(
                    h,
                    X(),
                    _(),
                    x == null ? void 0 : x.class,
                    x == null ? void 0 : x.className,
                )(f);
            },
            v = () => {
                if (!(!p || typeof p != 'object')) return Object.keys(p);
            };
        return (
            (y.variantKeys = v()),
            (y.base = h),
            (y.slots = w),
            (y.variants = p),
            (y.defaultVariants = m),
            (y.compoundSlots = u),
            (y.compoundVariants = l),
            y
        );
    },
    ut = ['small', 'medium', 'large'],
    ta = (e, t) => {
        var n, r, o;
        return ea(e, {
            ...t,
            twMerge: (n = t == null ? void 0 : t.twMerge) != null ? n : !0,
            twMergeConfig: {
                ...(t == null ? void 0 : t.twMergeConfig),
                theme: {
                    ...((r = t == null ? void 0 : t.twMergeConfig) == null
                        ? void 0
                        : r.theme),
                    opacity: ['disabled'],
                    spacing: ['divider', 'unit', ...Ht],
                    borderWidth: ut,
                    borderRadius: ut,
                },
                classGroups: {
                    ...((o = t == null ? void 0 : t.twMergeConfig) == null
                        ? void 0
                        : o.classGroups),
                    shadow: [{ shadow: ut }],
                    'font-size': [{ text: ['tiny', ...ut] }],
                    'bg-image': ['bg-stripe-gradient'],
                    'min-w': [{ 'min-w': ['unit', ...Ht] }],
                    'min-h': [{ 'min-h': ['unit', ...Ht] }],
                },
            },
        });
    },
    sr = ta({
        slots: {
            wrapper: [
                'flex',
                'w-screen',
                'h-[100dvh]',
                'fixed',
                'inset-0',
                'z-50',
                'overflow-x-auto',
                'justify-center',
                '[--scale-enter:100%]',
                '[--scale-exit:100%]',
                '[--slide-enter:0px]',
                '[--slide-exit:80px]',
                'sm:[--scale-enter:100%]',
                'sm:[--scale-exit:103%]',
                'sm:[--slide-enter:0px]',
                'sm:[--slide-exit:0px]',
            ],
            base: [
                'flex',
                'flex-col',
                'relative',
                'bg-white',
                'z-50',
                'w-full',
                'box-border',
                'bg-content1',
                'outline-none',
                'mx-1',
                'my-1',
                'sm:mx-6',
                'sm:my-16',
            ],
            backdrop: 'z-50',
            header: 'flex py-4 px-6 flex-initial text-large font-semibold',
            body: 'flex flex-1 flex-col gap-3 px-6 py-2',
            footer: 'flex flex-row gap-2 px-6 py-4 justify-end',
            closeButton: [
                'absolute',
                'appearance-none',
                'outline-none',
                'select-none',
                'top-1',
                'right-1',
                'p-2',
                'text-foreground-500',
                'rounded-full',
                'hover:bg-default-100',
                'active:bg-default-200',
                'tap-highlight-transparent',
                ...ui,
            ],
        },
        variants: {
            size: {
                xs: { base: 'max-w-xs' },
                sm: { base: 'max-w-sm' },
                md: { base: 'max-w-md' },
                lg: { base: 'max-w-lg' },
                xl: { base: 'max-w-xl' },
                '2xl': { base: 'max-w-2xl' },
                '3xl': { base: 'max-w-3xl' },
                '4xl': { base: 'max-w-4xl' },
                '5xl': { base: 'max-w-5xl' },
                full: {
                    base: 'my-0 mx-0 sm:mx-0 sm:my-0 max-w-full h-[100dvh] !rounded-none',
                },
            },
            radius: {
                none: { base: 'rounded-none' },
                sm: { base: 'rounded-small' },
                md: { base: 'rounded-medium' },
                lg: { base: 'rounded-large' },
            },
            placement: {
                auto: { wrapper: 'items-end sm:items-center' },
                center: { wrapper: 'items-center sm:items-center' },
                top: { wrapper: 'items-start sm:items-start' },
                'top-center': { wrapper: 'items-start sm:items-center' },
                bottom: { wrapper: 'items-end sm:items-end' },
                'bottom-center': { wrapper: 'items-end sm:items-center' },
            },
            shadow: {
                sm: { base: 'shadow-small' },
                md: { base: 'shadow-medium' },
                lg: { base: 'shadow-large' },
            },
            backdrop: {
                transparent: { backdrop: 'hidden' },
                opaque: { backdrop: 'bg-overlay/50 backdrop-opacity-disabled' },
                blur: {
                    backdrop:
                        'backdrop-blur-md backdrop-saturate-150 bg-overlay/30',
                },
            },
            scrollBehavior: {
                normal: { base: 'overflow-y-hidden' },
                inside: {
                    base: 'max-h-[calc(100%_-_7.5rem)]',
                    body: 'overflow-y-auto',
                },
                outside: {
                    wrapper: 'items-start sm:items-start overflow-y-auto',
                    base: 'my-16',
                },
            },
        },
        defaultVariants: {
            size: 'md',
            radius: 'lg',
            shadow: 'sm',
            placement: 'auto',
            backdrop: 'opaque',
            scrollBehavior: 'normal',
        },
        compoundVariants: [
            {
                backdrop: ['opaque', 'blur'],
                class: { backdrop: 'w-screen h-screen fixed inset-0' },
            },
        ],
    });
function ko(e) {
    var t,
        n,
        r = '';
    if (typeof e == 'string' || typeof e == 'number') r += e;
    else if (typeof e == 'object')
        if (Array.isArray(e))
            for (t = 0; t < e.length; t++)
                e[t] && (n = ko(e[t])) && (r && (r += ' '), (r += n));
        else for (t in e) e[t] && (r && (r += ' '), (r += t));
    return r;
}
function St(...e) {
    for (var t = 0, n, r, o = ''; t < e.length; )
        (n = e[t++]) && (r = ko(n)) && (o && (o += ' '), (o += r));
    return o;
}
var dt = (e) => (e ? 'true' : void 0);
function na(e = {}) {
    const {
            strict: t = !0,
            errorMessage:
                n = 'useContext: `context` is undefined. Seems you forgot to wrap component within the Provider',
            name: r,
        } = e,
        o = g.createContext(void 0);
    o.displayName = r;
    function i() {
        var s;
        const a = g.useContext(o);
        if (!a && t) {
            const c = new Error(n);
            throw (
                ((c.name = 'ContextError'),
                (s = Error.captureStackTrace) == null || s.call(Error, c, i),
                c)
            );
        }
        return a;
    }
    return [o.Provider, i, o];
}
function ra(e) {
    return {
        UNSAFE_getDOMNode() {
            return e.current;
        },
    };
}
function Eo(e) {
    const t = g.useRef(null);
    return g.useImperativeHandle(e, () => t.current), t;
}
var oa = (e) =>
    K.jsx('svg', {
        'aria-hidden': 'true',
        fill: 'none',
        focusable: 'false',
        height: '1em',
        role: 'presentation',
        stroke: 'currentColor',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: 2,
        viewBox: '0 0 24 24',
        width: '1em',
        ...e,
        children: K.jsx('path', { d: 'M18 6L6 18M6 6l12 12' }),
    });
const Do = g.createContext({
        transformPagePoint: (e) => e,
        isStatic: !1,
        reducedMotion: 'never',
    }),
    It = g.createContext({}),
    jt = g.createContext(null),
    Ft = typeof document < 'u',
    Tt = Ft ? g.useLayoutEffect : g.useEffect,
    Lo = g.createContext({ strict: !1 });
function sa(e, t, n, r) {
    const { visualElement: o } = g.useContext(It),
        i = g.useContext(Lo),
        s = g.useContext(jt),
        a = g.useContext(Do).reducedMotion,
        c = g.useRef();
    (r = r || i.renderer),
        !c.current &&
            r &&
            (c.current = r(e, {
                visualState: t,
                parent: o,
                props: n,
                presenceContext: s,
                blockInitialAnimation: s ? s.initial === !1 : !1,
                reducedMotionConfig: a,
            }));
    const l = c.current;
    return (
        g.useInsertionEffect(() => {
            l && l.update(n, s);
        }),
        Tt(() => {
            l && l.render();
        }),
        g.useEffect(() => {
            l && l.updateFeatures();
        }),
        (window.HandoffAppearAnimations ? Tt : g.useEffect)(() => {
            l && l.animationState && l.animationState.animateChanges();
        }),
        l
    );
}
function Ie(e) {
    return (
        typeof e == 'object' &&
        Object.prototype.hasOwnProperty.call(e, 'current')
    );
}
function ia(e, t, n) {
    return g.useCallback(
        (r) => {
            r && e.mount && e.mount(r),
                t && (r ? t.mount(r) : t.unmount()),
                n && (typeof n == 'function' ? n(r) : Ie(n) && (n.current = r));
        },
        [t],
    );
}
function tt(e) {
    return typeof e == 'string' || Array.isArray(e);
}
function Nt(e) {
    return typeof e == 'object' && typeof e.start == 'function';
}
const Rn = [
        'animate',
        'whileInView',
        'whileFocus',
        'whileHover',
        'whileTap',
        'whileDrag',
        'exit',
    ],
    kn = ['initial', ...Rn];
function $t(e) {
    return Nt(e.animate) || kn.some((t) => tt(e[t]));
}
function Bo(e) {
    return !!($t(e) || e.variants);
}
function aa(e, t) {
    if ($t(e)) {
        const { initial: n, animate: r } = e;
        return {
            initial: n === !1 || tt(n) ? n : void 0,
            animate: tt(r) ? r : void 0,
        };
    }
    return e.inherit !== !1 ? t : {};
}
function la(e) {
    const { initial: t, animate: n } = aa(e, g.useContext(It));
    return g.useMemo(() => ({ initial: t, animate: n }), [ir(t), ir(n)]);
}
function ir(e) {
    return Array.isArray(e) ? e.join(' ') : e;
}
const ar = {
        animation: [
            'animate',
            'variants',
            'whileHover',
            'whileTap',
            'exit',
            'whileInView',
            'whileFocus',
            'whileDrag',
        ],
        exit: ['exit'],
        drag: ['drag', 'dragControls'],
        focus: ['whileFocus'],
        hover: ['whileHover', 'onHoverStart', 'onHoverEnd'],
        tap: ['whileTap', 'onTap', 'onTapStart', 'onTapCancel'],
        pan: ['onPan', 'onPanStart', 'onPanSessionStart', 'onPanEnd'],
        inView: ['whileInView', 'onViewportEnter', 'onViewportLeave'],
        layout: ['layout', 'layoutId'],
    },
    nt = {};
for (const e in ar) nt[e] = { isEnabled: (t) => ar[e].some((n) => !!t[n]) };
function ca(e) {
    for (const t in e) nt[t] = { ...nt[t], ...e[t] };
}
const En = g.createContext({}),
    Oo = g.createContext({}),
    ua = Symbol.for('motionComponentSymbol');
function da({
    preloadedFeatures: e,
    createVisualElement: t,
    useRender: n,
    useVisualState: r,
    Component: o,
}) {
    e && ca(e);
    function i(a, c) {
        let l;
        const u = { ...g.useContext(Do), ...a, layoutId: fa(a) },
            { isStatic: d } = u,
            f = la(a),
            h = r(a, d);
        if (!d && Ft) {
            f.visualElement = sa(o, h, u, t);
            const p = g.useContext(Oo),
                m = g.useContext(Lo).strict;
            f.visualElement && (l = f.visualElement.loadFeatures(u, m, e, p));
        }
        return g.createElement(
            It.Provider,
            { value: f },
            l && f.visualElement
                ? g.createElement(l, { visualElement: f.visualElement, ...u })
                : null,
            n(o, a, ia(h, f.visualElement, c), h, d, f.visualElement),
        );
    }
    const s = g.forwardRef(i);
    return (s[ua] = o), s;
}
function fa({ layoutId: e }) {
    const t = g.useContext(En).id;
    return t && e !== void 0 ? t + '-' + e : e;
}
function ha(e) {
    function t(r, o = {}) {
        return da(e(r, o));
    }
    if (typeof Proxy > 'u') return t;
    const n = new Map();
    return new Proxy(t, {
        get: (r, o) => (n.has(o) || n.set(o, t(o)), n.get(o)),
    });
}
const pa = [
    'animate',
    'circle',
    'defs',
    'desc',
    'ellipse',
    'g',
    'image',
    'line',
    'filter',
    'marker',
    'mask',
    'metadata',
    'path',
    'pattern',
    'polygon',
    'polyline',
    'rect',
    'stop',
    'switch',
    'symbol',
    'svg',
    'text',
    'tspan',
    'use',
    'view',
];
function Dn(e) {
    return typeof e != 'string' || e.includes('-')
        ? !1
        : !!(pa.indexOf(e) > -1 || /[A-Z]/.test(e));
}
const At = {};
function ma(e) {
    Object.assign(At, e);
}
const ot = [
        'transformPerspective',
        'x',
        'y',
        'z',
        'translateX',
        'translateY',
        'translateZ',
        'scale',
        'scaleX',
        'scaleY',
        'rotate',
        'rotateX',
        'rotateY',
        'rotateZ',
        'skew',
        'skewX',
        'skewY',
    ],
    Ee = new Set(ot);
function Io(e, { layout: t, layoutId: n }) {
    return (
        Ee.has(e) ||
        e.startsWith('origin') ||
        ((t || n !== void 0) && (!!At[e] || e === 'opacity'))
    );
}
const ee = (e) => !!(e && e.getVelocity),
    ga = {
        x: 'translateX',
        y: 'translateY',
        z: 'translateZ',
        transformPerspective: 'perspective',
    },
    ya = ot.length;
function va(
    e,
    { enableHardwareAcceleration: t = !0, allowTransformNone: n = !0 },
    r,
    o,
) {
    let i = '';
    for (let s = 0; s < ya; s++) {
        const a = ot[s];
        if (e[a] !== void 0) {
            const c = ga[a] || a;
            i += `${c}(${e[a]}) `;
        }
    }
    return (
        t && !e.z && (i += 'translateZ(0)'),
        (i = i.trim()),
        o ? (i = o(e, r ? '' : i)) : n && r && (i = 'none'),
        i
    );
}
const jo = (e) => (t) => typeof t == 'string' && t.startsWith(e),
    Fo = jo('--'),
    pn = jo('var(--'),
    ba =
        /var\s*\(\s*--[\w-]+(\s*,\s*(?:(?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)+)?\s*\)/g,
    xa = (e, t) => (t && typeof e == 'number' ? t.transform(e) : e),
    we = (e, t, n) => Math.min(Math.max(n, e), t),
    De = {
        test: (e) => typeof e == 'number',
        parse: parseFloat,
        transform: (e) => e,
    },
    Ze = { ...De, transform: (e) => we(0, 1, e) },
    ft = { ...De, default: 1 },
    Je = (e) => Math.round(e * 1e5) / 1e5,
    zt = /(-)?([\d]*\.?[\d])+/g,
    No =
        /(#[0-9a-f]{3,8}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))/gi,
    wa =
        /^(#[0-9a-f]{3,8}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))$/i;
function st(e) {
    return typeof e == 'string';
}
const it = (e) => ({
        test: (t) => st(t) && t.endsWith(e) && t.split(' ').length === 1,
        parse: parseFloat,
        transform: (t) => `${t}${e}`,
    }),
    ge = it('deg'),
    ae = it('%'),
    A = it('px'),
    Pa = it('vh'),
    Ca = it('vw'),
    lr = {
        ...ae,
        parse: (e) => ae.parse(e) / 100,
        transform: (e) => ae.transform(e * 100),
    },
    cr = { ...De, transform: Math.round },
    $o = {
        borderWidth: A,
        borderTopWidth: A,
        borderRightWidth: A,
        borderBottomWidth: A,
        borderLeftWidth: A,
        borderRadius: A,
        radius: A,
        borderTopLeftRadius: A,
        borderTopRightRadius: A,
        borderBottomRightRadius: A,
        borderBottomLeftRadius: A,
        width: A,
        maxWidth: A,
        height: A,
        maxHeight: A,
        size: A,
        top: A,
        right: A,
        bottom: A,
        left: A,
        padding: A,
        paddingTop: A,
        paddingRight: A,
        paddingBottom: A,
        paddingLeft: A,
        margin: A,
        marginTop: A,
        marginRight: A,
        marginBottom: A,
        marginLeft: A,
        rotate: ge,
        rotateX: ge,
        rotateY: ge,
        rotateZ: ge,
        scale: ft,
        scaleX: ft,
        scaleY: ft,
        scaleZ: ft,
        skew: ge,
        skewX: ge,
        skewY: ge,
        distance: A,
        translateX: A,
        translateY: A,
        translateZ: A,
        x: A,
        y: A,
        z: A,
        perspective: A,
        transformPerspective: A,
        opacity: Ze,
        originX: lr,
        originY: lr,
        originZ: A,
        zIndex: cr,
        fillOpacity: Ze,
        strokeOpacity: Ze,
        numOctaves: cr,
    };
function Ln(e, t, n, r) {
    const { style: o, vars: i, transform: s, transformOrigin: a } = e;
    let c = !1,
        l = !1,
        u = !0;
    for (const d in t) {
        const f = t[d];
        if (Fo(d)) {
            i[d] = f;
            continue;
        }
        const h = $o[d],
            p = xa(f, h);
        if (Ee.has(d)) {
            if (((c = !0), (s[d] = p), !u)) continue;
            f !== (h.default || 0) && (u = !1);
        } else d.startsWith('origin') ? ((l = !0), (a[d] = p)) : (o[d] = p);
    }
    if (
        (t.transform ||
            (c || r
                ? (o.transform = va(e.transform, n, u, r))
                : o.transform && (o.transform = 'none')),
        l)
    ) {
        const { originX: d = '50%', originY: f = '50%', originZ: h = 0 } = a;
        o.transformOrigin = `${d} ${f} ${h}`;
    }
}
const Bn = () => ({ style: {}, transform: {}, transformOrigin: {}, vars: {} });
function zo(e, t, n) {
    for (const r in t) !ee(t[r]) && !Io(r, n) && (e[r] = t[r]);
}
function Sa({ transformTemplate: e }, t, n) {
    return g.useMemo(() => {
        const r = Bn();
        return (
            Ln(r, t, { enableHardwareAcceleration: !n }, e),
            Object.assign({}, r.vars, r.style)
        );
    }, [t]);
}
function Ta(e, t, n) {
    const r = e.style || {},
        o = {};
    return (
        zo(o, r, e),
        Object.assign(o, Sa(e, t, n)),
        e.transformValues ? e.transformValues(o) : o
    );
}
function Aa(e, t, n) {
    const r = {},
        o = Ta(e, t, n);
    return (
        e.drag &&
            e.dragListener !== !1 &&
            ((r.draggable = !1),
            (o.userSelect = o.WebkitUserSelect = o.WebkitTouchCallout = 'none'),
            (o.touchAction =
                e.drag === !0 ? 'none' : `pan-${e.drag === 'x' ? 'y' : 'x'}`)),
        e.tabIndex === void 0 &&
            (e.onTap || e.onTapStart || e.whileTap) &&
            (r.tabIndex = 0),
        (r.style = o),
        r
    );
}
const Va = new Set([
    'animate',
    'exit',
    'variants',
    'initial',
    'style',
    'values',
    'variants',
    'transition',
    'transformTemplate',
    'transformValues',
    'custom',
    'inherit',
    'onLayoutAnimationStart',
    'onLayoutAnimationComplete',
    'onLayoutMeasure',
    'onBeforeLayoutMeasure',
    'onAnimationStart',
    'onAnimationComplete',
    'onUpdate',
    'onDragStart',
    'onDrag',
    'onDragEnd',
    'onMeasureDragConstraints',
    'onDirectionLock',
    'onDragTransitionEnd',
    '_dragX',
    '_dragY',
    'onHoverStart',
    'onHoverEnd',
    'onViewportEnter',
    'onViewportLeave',
    'ignoreStrict',
    'viewport',
]);
function Vt(e) {
    return (
        e.startsWith('while') ||
        (e.startsWith('drag') && e !== 'draggable') ||
        e.startsWith('layout') ||
        e.startsWith('onTap') ||
        e.startsWith('onPan') ||
        Va.has(e)
    );
}
let Go = (e) => !Vt(e);
function Ma(e) {
    e && (Go = (t) => (t.startsWith('on') ? !Vt(t) : e(t)));
}
try {
    Ma(require('@emotion/is-prop-valid').default);
} catch {}
function Ra(e, t, n) {
    const r = {};
    for (const o in e)
        (o === 'values' && typeof e.values == 'object') ||
            ((Go(o) ||
                (n === !0 && Vt(o)) ||
                (!t && !Vt(o)) ||
                (e.draggable && o.startsWith('onDrag'))) &&
                (r[o] = e[o]));
    return r;
}
function ur(e, t, n) {
    return typeof e == 'string' ? e : A.transform(t + n * e);
}
function ka(e, t, n) {
    const r = ur(t, e.x, e.width),
        o = ur(n, e.y, e.height);
    return `${r} ${o}`;
}
const Ea = { offset: 'stroke-dashoffset', array: 'stroke-dasharray' },
    Da = { offset: 'strokeDashoffset', array: 'strokeDasharray' };
function La(e, t, n = 1, r = 0, o = !0) {
    e.pathLength = 1;
    const i = o ? Ea : Da;
    e[i.offset] = A.transform(-r);
    const s = A.transform(t),
        a = A.transform(n);
    e[i.array] = `${s} ${a}`;
}
function On(
    e,
    {
        attrX: t,
        attrY: n,
        attrScale: r,
        originX: o,
        originY: i,
        pathLength: s,
        pathSpacing: a = 1,
        pathOffset: c = 0,
        ...l
    },
    u,
    d,
    f,
) {
    if ((Ln(e, l, u, f), d)) {
        e.style.viewBox && (e.attrs.viewBox = e.style.viewBox);
        return;
    }
    (e.attrs = e.style), (e.style = {});
    const { attrs: h, style: p, dimensions: m } = e;
    h.transform && (m && (p.transform = h.transform), delete h.transform),
        m &&
            (o !== void 0 || i !== void 0 || p.transform) &&
            (p.transformOrigin = ka(
                m,
                o !== void 0 ? o : 0.5,
                i !== void 0 ? i : 0.5,
            )),
        t !== void 0 && (h.x = t),
        n !== void 0 && (h.y = n),
        r !== void 0 && (h.scale = r),
        s !== void 0 && La(h, s, a, c, !1);
}
const Uo = () => ({ ...Bn(), attrs: {} }),
    In = (e) => typeof e == 'string' && e.toLowerCase() === 'svg';
function Ba(e, t, n, r) {
    const o = g.useMemo(() => {
        const i = Uo();
        return (
            On(
                i,
                t,
                { enableHardwareAcceleration: !1 },
                In(r),
                e.transformTemplate,
            ),
            { ...i.attrs, style: { ...i.style } }
        );
    }, [t]);
    if (e.style) {
        const i = {};
        zo(i, e.style, e), (o.style = { ...i, ...o.style });
    }
    return o;
}
function Oa(e = !1) {
    return (n, r, o, { latestValues: i }, s) => {
        const c = (Dn(n) ? Ba : Aa)(r, i, s, n),
            u = { ...Ra(r, typeof n == 'string', e), ...c, ref: o },
            { children: d } = r,
            f = g.useMemo(() => (ee(d) ? d.get() : d), [d]);
        return g.createElement(n, { ...u, children: f });
    };
}
const jn = (e) => e.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
function Wo(e, { style: t, vars: n }, r, o) {
    Object.assign(e.style, t, o && o.getProjectionStyles(r));
    for (const i in n) e.style.setProperty(i, n[i]);
}
const Ho = new Set([
    'baseFrequency',
    'diffuseConstant',
    'kernelMatrix',
    'kernelUnitLength',
    'keySplines',
    'keyTimes',
    'limitingConeAngle',
    'markerHeight',
    'markerWidth',
    'numOctaves',
    'targetX',
    'targetY',
    'surfaceScale',
    'specularConstant',
    'specularExponent',
    'stdDeviation',
    'tableValues',
    'viewBox',
    'gradientTransform',
    'pathLength',
    'startOffset',
    'textLength',
    'lengthAdjust',
]);
function _o(e, t, n, r) {
    Wo(e, t, void 0, r);
    for (const o in t.attrs) e.setAttribute(Ho.has(o) ? o : jn(o), t.attrs[o]);
}
function Fn(e, t) {
    const { style: n } = e,
        r = {};
    for (const o in n)
        (ee(n[o]) || (t.style && ee(t.style[o])) || Io(o, e)) && (r[o] = n[o]);
    return r;
}
function Ko(e, t) {
    const n = Fn(e, t);
    for (const r in e)
        if (ee(e[r]) || ee(t[r])) {
            const o =
                ot.indexOf(r) !== -1
                    ? 'attr' + r.charAt(0).toUpperCase() + r.substring(1)
                    : r;
            n[o] = e[r];
        }
    return n;
}
function Nn(e, t, n, r = {}, o = {}) {
    return (
        typeof t == 'function' && (t = t(n !== void 0 ? n : e.custom, r, o)),
        typeof t == 'string' && (t = e.variants && e.variants[t]),
        typeof t == 'function' && (t = t(n !== void 0 ? n : e.custom, r, o)),
        t
    );
}
function Xo(e) {
    const t = g.useRef(null);
    return t.current === null && (t.current = e()), t.current;
}
const Mt = (e) => Array.isArray(e),
    Ia = (e) => !!(e && typeof e == 'object' && e.mix && e.toValue),
    ja = (e) => (Mt(e) ? e[e.length - 1] || 0 : e);
function vt(e) {
    const t = ee(e) ? e.get() : e;
    return Ia(t) ? t.toValue() : t;
}
function Fa(
    { scrapeMotionValuesFromProps: e, createRenderState: t, onMount: n },
    r,
    o,
    i,
) {
    const s = { latestValues: Na(r, o, i, e), renderState: t() };
    return n && (s.mount = (a) => n(r, a, s)), s;
}
const Yo = (e) => (t, n) => {
    const r = g.useContext(It),
        o = g.useContext(jt),
        i = () => Fa(e, t, r, o);
    return n ? i() : Xo(i);
};
function Na(e, t, n, r) {
    const o = {},
        i = r(e, {});
    for (const f in i) o[f] = vt(i[f]);
    let { initial: s, animate: a } = e;
    const c = $t(e),
        l = Bo(e);
    t &&
        l &&
        !c &&
        e.inherit !== !1 &&
        (s === void 0 && (s = t.initial), a === void 0 && (a = t.animate));
    let u = n ? n.initial === !1 : !1;
    u = u || s === !1;
    const d = u ? a : s;
    return (
        d &&
            typeof d != 'boolean' &&
            !Nt(d) &&
            (Array.isArray(d) ? d : [d]).forEach((h) => {
                const p = Nn(e, h);
                if (!p) return;
                const { transitionEnd: m, transition: b, ...w } = p;
                for (const y in w) {
                    let v = w[y];
                    if (Array.isArray(v)) {
                        const x = u ? v.length - 1 : 0;
                        v = v[x];
                    }
                    v !== null && (o[y] = v);
                }
                for (const y in m) o[y] = m[y];
            }),
        o
    );
}
const $a = {
        useVisualState: Yo({
            scrapeMotionValuesFromProps: Ko,
            createRenderState: Uo,
            onMount: (e, t, { renderState: n, latestValues: r }) => {
                try {
                    n.dimensions =
                        typeof t.getBBox == 'function'
                            ? t.getBBox()
                            : t.getBoundingClientRect();
                } catch {
                    n.dimensions = { x: 0, y: 0, width: 0, height: 0 };
                }
                On(
                    n,
                    r,
                    { enableHardwareAcceleration: !1 },
                    In(t.tagName),
                    e.transformTemplate,
                ),
                    _o(t, n);
            },
        }),
    },
    za = {
        useVisualState: Yo({
            scrapeMotionValuesFromProps: Fn,
            createRenderState: Bn,
        }),
    };
function Ga(e, { forwardMotionProps: t = !1 }, n, r) {
    return {
        ...(Dn(e) ? $a : za),
        preloadedFeatures: n,
        useRender: Oa(t),
        createVisualElement: r,
        Component: e,
    };
}
function de(e, t, n, r = { passive: !0 }) {
    return e.addEventListener(t, n, r), () => e.removeEventListener(t, n);
}
const qo = (e) =>
    e.pointerType === 'mouse'
        ? typeof e.button != 'number' || e.button <= 0
        : e.isPrimary !== !1;
function Gt(e, t = 'page') {
    return { point: { x: e[t + 'X'], y: e[t + 'Y'] } };
}
const Ua = (e) => (t) => qo(t) && e(t, Gt(t));
function fe(e, t, n, r) {
    return de(e, t, Ua(n), r);
}
const Wa = (e, t) => (n) => t(e(n)),
    be = (...e) => e.reduce(Wa);
function Zo(e) {
    let t = null;
    return () => {
        const n = () => {
            t = null;
        };
        return t === null ? ((t = e), n) : !1;
    };
}
const dr = Zo('dragHorizontal'),
    fr = Zo('dragVertical');
function Jo(e) {
    let t = !1;
    if (e === 'y') t = fr();
    else if (e === 'x') t = dr();
    else {
        const n = dr(),
            r = fr();
        n && r
            ? (t = () => {
                  n(), r();
              })
            : (n && n(), r && r());
    }
    return t;
}
function Qo() {
    const e = Jo(!0);
    return e ? (e(), !1) : !0;
}
class Ce {
    constructor(t) {
        (this.isMounted = !1), (this.node = t);
    }
    update() {}
}
const G = (e) => e;
function Ha(e) {
    let t = [],
        n = [],
        r = 0,
        o = !1,
        i = !1;
    const s = new WeakSet(),
        a = {
            schedule: (c, l = !1, u = !1) => {
                const d = u && o,
                    f = d ? t : n;
                return (
                    l && s.add(c),
                    f.indexOf(c) === -1 &&
                        (f.push(c), d && o && (r = t.length)),
                    c
                );
            },
            cancel: (c) => {
                const l = n.indexOf(c);
                l !== -1 && n.splice(l, 1), s.delete(c);
            },
            process: (c) => {
                if (o) {
                    i = !0;
                    return;
                }
                if (
                    ((o = !0),
                    ([t, n] = [n, t]),
                    (n.length = 0),
                    (r = t.length),
                    r)
                )
                    for (let l = 0; l < r; l++) {
                        const u = t[l];
                        u(c), s.has(u) && (a.schedule(u), e());
                    }
                (o = !1), i && ((i = !1), a.process(c));
            },
        };
    return a;
}
const ht = ['prepare', 'read', 'update', 'preRender', 'render', 'postRender'],
    _a = 40;
function Ka(e, t) {
    let n = !1,
        r = !0;
    const o = { delta: 0, timestamp: 0, isProcessing: !1 },
        i = ht.reduce((d, f) => ((d[f] = Ha(() => (n = !0))), d), {}),
        s = (d) => i[d].process(o),
        a = () => {
            const d = performance.now();
            (n = !1),
                (o.delta = r
                    ? 1e3 / 60
                    : Math.max(Math.min(d - o.timestamp, _a), 1)),
                (o.timestamp = d),
                (o.isProcessing = !0),
                ht.forEach(s),
                (o.isProcessing = !1),
                n && t && ((r = !1), e(a));
        },
        c = () => {
            (n = !0), (r = !0), o.isProcessing || e(a);
        };
    return {
        schedule: ht.reduce((d, f) => {
            const h = i[f];
            return (
                (d[f] = (p, m = !1, b = !1) => (n || c(), h.schedule(p, m, b))),
                d
            );
        }, {}),
        cancel: (d) => ht.forEach((f) => i[f].cancel(d)),
        state: o,
        steps: i,
    };
}
const {
    schedule: $,
    cancel: pe,
    state: q,
    steps: Kt,
} = Ka(typeof requestAnimationFrame < 'u' ? requestAnimationFrame : G, !0);
function hr(e, t) {
    const n = 'pointer' + (t ? 'enter' : 'leave'),
        r = 'onHover' + (t ? 'Start' : 'End'),
        o = (i, s) => {
            if (i.type === 'touch' || Qo()) return;
            const a = e.getProps();
            e.animationState &&
                a.whileHover &&
                e.animationState.setActive('whileHover', t),
                a[r] && $.update(() => a[r](i, s));
        };
    return fe(e.current, n, o, { passive: !e.getProps()[r] });
}
class Xa extends Ce {
    mount() {
        this.unmount = be(hr(this.node, !0), hr(this.node, !1));
    }
    unmount() {}
}
class Ya extends Ce {
    constructor() {
        super(...arguments), (this.isActive = !1);
    }
    onFocus() {
        let t = !1;
        try {
            t = this.node.current.matches(':focus-visible');
        } catch {
            t = !0;
        }
        !t ||
            !this.node.animationState ||
            (this.node.animationState.setActive('whileFocus', !0),
            (this.isActive = !0));
    }
    onBlur() {
        !this.isActive ||
            !this.node.animationState ||
            (this.node.animationState.setActive('whileFocus', !1),
            (this.isActive = !1));
    }
    mount() {
        this.unmount = be(
            de(this.node.current, 'focus', () => this.onFocus()),
            de(this.node.current, 'blur', () => this.onBlur()),
        );
    }
    unmount() {}
}
const es = (e, t) => (t ? (e === t ? !0 : es(e, t.parentElement)) : !1);
function Xt(e, t) {
    if (!t) return;
    const n = new PointerEvent('pointer' + e);
    t(n, Gt(n));
}
class qa extends Ce {
    constructor() {
        super(...arguments),
            (this.removeStartListeners = G),
            (this.removeEndListeners = G),
            (this.removeAccessibleListeners = G),
            (this.startPointerPress = (t, n) => {
                if ((this.removeEndListeners(), this.isPressing)) return;
                const r = this.node.getProps(),
                    i = fe(
                        window,
                        'pointerup',
                        (a, c) => {
                            if (!this.checkPressEnd()) return;
                            const { onTap: l, onTapCancel: u } =
                                this.node.getProps();
                            $.update(() => {
                                es(this.node.current, a.target)
                                    ? l && l(a, c)
                                    : u && u(a, c);
                            });
                        },
                        { passive: !(r.onTap || r.onPointerUp) },
                    ),
                    s = fe(
                        window,
                        'pointercancel',
                        (a, c) => this.cancelPress(a, c),
                        { passive: !(r.onTapCancel || r.onPointerCancel) },
                    );
                (this.removeEndListeners = be(i, s)), this.startPress(t, n);
            }),
            (this.startAccessiblePress = () => {
                const t = (i) => {
                        if (i.key !== 'Enter' || this.isPressing) return;
                        const s = (a) => {
                            a.key !== 'Enter' ||
                                !this.checkPressEnd() ||
                                Xt('up', (c, l) => {
                                    const { onTap: u } = this.node.getProps();
                                    u && $.update(() => u(c, l));
                                });
                        };
                        this.removeEndListeners(),
                            (this.removeEndListeners = de(
                                this.node.current,
                                'keyup',
                                s,
                            )),
                            Xt('down', (a, c) => {
                                this.startPress(a, c);
                            });
                    },
                    n = de(this.node.current, 'keydown', t),
                    r = () => {
                        this.isPressing &&
                            Xt('cancel', (i, s) => this.cancelPress(i, s));
                    },
                    o = de(this.node.current, 'blur', r);
                this.removeAccessibleListeners = be(n, o);
            });
    }
    startPress(t, n) {
        this.isPressing = !0;
        const { onTapStart: r, whileTap: o } = this.node.getProps();
        o &&
            this.node.animationState &&
            this.node.animationState.setActive('whileTap', !0),
            r && $.update(() => r(t, n));
    }
    checkPressEnd() {
        return (
            this.removeEndListeners(),
            (this.isPressing = !1),
            this.node.getProps().whileTap &&
                this.node.animationState &&
                this.node.animationState.setActive('whileTap', !1),
            !Qo()
        );
    }
    cancelPress(t, n) {
        if (!this.checkPressEnd()) return;
        const { onTapCancel: r } = this.node.getProps();
        r && $.update(() => r(t, n));
    }
    mount() {
        const t = this.node.getProps(),
            n = fe(this.node.current, 'pointerdown', this.startPointerPress, {
                passive: !(t.onTapStart || t.onPointerStart),
            }),
            r = de(this.node.current, 'focus', this.startAccessiblePress);
        this.removeStartListeners = be(n, r);
    }
    unmount() {
        this.removeStartListeners(),
            this.removeEndListeners(),
            this.removeAccessibleListeners();
    }
}
const mn = new WeakMap(),
    Yt = new WeakMap(),
    Za = (e) => {
        const t = mn.get(e.target);
        t && t(e);
    },
    Ja = (e) => {
        e.forEach(Za);
    };
function Qa({ root: e, ...t }) {
    const n = e || document;
    Yt.has(n) || Yt.set(n, {});
    const r = Yt.get(n),
        o = JSON.stringify(t);
    return (
        r[o] || (r[o] = new IntersectionObserver(Ja, { root: e, ...t })), r[o]
    );
}
function el(e, t, n) {
    const r = Qa(t);
    return (
        mn.set(e, n),
        r.observe(e),
        () => {
            mn.delete(e), r.unobserve(e);
        }
    );
}
const tl = { some: 0, all: 1 };
class nl extends Ce {
    constructor() {
        super(...arguments), (this.hasEnteredView = !1), (this.isInView = !1);
    }
    startObserver() {
        this.unmount();
        const { viewport: t = {} } = this.node.getProps(),
            { root: n, margin: r, amount: o = 'some', once: i } = t,
            s = {
                root: n ? n.current : void 0,
                rootMargin: r,
                threshold: typeof o == 'number' ? o : tl[o],
            },
            a = (c) => {
                const { isIntersecting: l } = c;
                if (
                    this.isInView === l ||
                    ((this.isInView = l), i && !l && this.hasEnteredView)
                )
                    return;
                l && (this.hasEnteredView = !0),
                    this.node.animationState &&
                        this.node.animationState.setActive('whileInView', l);
                const { onViewportEnter: u, onViewportLeave: d } =
                        this.node.getProps(),
                    f = l ? u : d;
                f && f(c);
            };
        return el(this.node.current, s, a);
    }
    mount() {
        this.startObserver();
    }
    update() {
        if (typeof IntersectionObserver > 'u') return;
        const { props: t, prevProps: n } = this.node;
        ['amount', 'margin', 'root'].some(rl(t, n)) && this.startObserver();
    }
    unmount() {}
}
function rl({ viewport: e = {} }, { viewport: t = {} } = {}) {
    return (n) => e[n] !== t[n];
}
const ol = {
    inView: { Feature: nl },
    tap: { Feature: qa },
    focus: { Feature: Ya },
    hover: { Feature: Xa },
};
function ts(e, t) {
    if (!Array.isArray(t)) return !1;
    const n = t.length;
    if (n !== e.length) return !1;
    for (let r = 0; r < n; r++) if (t[r] !== e[r]) return !1;
    return !0;
}
function sl(e) {
    const t = {};
    return e.values.forEach((n, r) => (t[r] = n.get())), t;
}
function il(e) {
    const t = {};
    return e.values.forEach((n, r) => (t[r] = n.getVelocity())), t;
}
function Ut(e, t, n) {
    const r = e.getProps();
    return Nn(r, t, n !== void 0 ? n : r.custom, sl(e), il(e));
}
const al = 'framerAppearId',
    ll = 'data-' + jn(al);
let cl = G,
    $n = G;
const xe = (e) => e * 1e3,
    he = (e) => e / 1e3,
    ul = { current: !1 },
    ns = (e) => Array.isArray(e) && typeof e[0] == 'number';
function rs(e) {
    return !!(
        !e ||
        (typeof e == 'string' && os[e]) ||
        ns(e) ||
        (Array.isArray(e) && e.every(rs))
    );
}
const qe = ([e, t, n, r]) => `cubic-bezier(${e}, ${t}, ${n}, ${r})`,
    os = {
        linear: 'linear',
        ease: 'ease',
        easeIn: 'ease-in',
        easeOut: 'ease-out',
        easeInOut: 'ease-in-out',
        circIn: qe([0, 0.65, 0.55, 1]),
        circOut: qe([0.55, 0, 1, 0.45]),
        backIn: qe([0.31, 0.01, 0.66, -0.59]),
        backOut: qe([0.33, 1.53, 0.69, 0.99]),
    };
function ss(e) {
    if (e) return ns(e) ? qe(e) : Array.isArray(e) ? e.map(ss) : os[e];
}
function dl(
    e,
    t,
    n,
    {
        delay: r = 0,
        duration: o,
        repeat: i = 0,
        repeatType: s = 'loop',
        ease: a,
        times: c,
    } = {},
) {
    const l = { [t]: n };
    c && (l.offset = c);
    const u = ss(a);
    return (
        Array.isArray(u) && (l.easing = u),
        e.animate(l, {
            delay: r,
            duration: o,
            easing: Array.isArray(u) ? 'linear' : u,
            fill: 'both',
            iterations: i + 1,
            direction: s === 'reverse' ? 'alternate' : 'normal',
        })
    );
}
function fl(e, { repeat: t, repeatType: n = 'loop' }) {
    const r = t && n !== 'loop' && t % 2 === 1 ? 0 : e.length - 1;
    return e[r];
}
const is = (e, t, n) =>
        (((1 - 3 * n + 3 * t) * e + (3 * n - 6 * t)) * e + 3 * t) * e,
    hl = 1e-7,
    pl = 12;
function ml(e, t, n, r, o) {
    let i,
        s,
        a = 0;
    do (s = t + (n - t) / 2), (i = is(s, r, o) - e), i > 0 ? (n = s) : (t = s);
    while (Math.abs(i) > hl && ++a < pl);
    return s;
}
function at(e, t, n, r) {
    if (e === t && n === r) return G;
    const o = (i) => ml(i, 0, 1, e, n);
    return (i) => (i === 0 || i === 1 ? i : is(o(i), t, r));
}
const gl = at(0.42, 0, 1, 1),
    yl = at(0, 0, 0.58, 1),
    as = at(0.42, 0, 0.58, 1),
    vl = (e) => Array.isArray(e) && typeof e[0] != 'number',
    ls = (e) => (t) => (t <= 0.5 ? e(2 * t) / 2 : (2 - e(2 * (1 - t))) / 2),
    cs = (e) => (t) => 1 - e(1 - t),
    us = (e) => 1 - Math.sin(Math.acos(e)),
    zn = cs(us),
    bl = ls(zn),
    ds = at(0.33, 1.53, 0.69, 0.99),
    Gn = cs(ds),
    xl = ls(Gn),
    wl = (e) =>
        (e *= 2) < 1 ? 0.5 * Gn(e) : 0.5 * (2 - Math.pow(2, -10 * (e - 1))),
    Pl = {
        linear: G,
        easeIn: gl,
        easeInOut: as,
        easeOut: yl,
        circIn: us,
        circInOut: bl,
        circOut: zn,
        backIn: Gn,
        backInOut: xl,
        backOut: ds,
        anticipate: wl,
    },
    pr = (e) => {
        if (Array.isArray(e)) {
            $n(e.length === 4);
            const [t, n, r, o] = e;
            return at(t, n, r, o);
        } else if (typeof e == 'string') return Pl[e];
        return e;
    },
    Un = (e, t) => (n) =>
        !!(
            (st(n) && wa.test(n) && n.startsWith(e)) ||
            (t && Object.prototype.hasOwnProperty.call(n, t))
        ),
    fs = (e, t, n) => (r) => {
        if (!st(r)) return r;
        const [o, i, s, a] = r.match(zt);
        return {
            [e]: parseFloat(o),
            [t]: parseFloat(i),
            [n]: parseFloat(s),
            alpha: a !== void 0 ? parseFloat(a) : 1,
        };
    },
    Cl = (e) => we(0, 255, e),
    qt = { ...De, transform: (e) => Math.round(Cl(e)) },
    Re = {
        test: Un('rgb', 'red'),
        parse: fs('red', 'green', 'blue'),
        transform: ({ red: e, green: t, blue: n, alpha: r = 1 }) =>
            'rgba(' +
            qt.transform(e) +
            ', ' +
            qt.transform(t) +
            ', ' +
            qt.transform(n) +
            ', ' +
            Je(Ze.transform(r)) +
            ')',
    };
function Sl(e) {
    let t = '',
        n = '',
        r = '',
        o = '';
    return (
        e.length > 5
            ? ((t = e.substring(1, 3)),
              (n = e.substring(3, 5)),
              (r = e.substring(5, 7)),
              (o = e.substring(7, 9)))
            : ((t = e.substring(1, 2)),
              (n = e.substring(2, 3)),
              (r = e.substring(3, 4)),
              (o = e.substring(4, 5)),
              (t += t),
              (n += n),
              (r += r),
              (o += o)),
        {
            red: parseInt(t, 16),
            green: parseInt(n, 16),
            blue: parseInt(r, 16),
            alpha: o ? parseInt(o, 16) / 255 : 1,
        }
    );
}
const gn = { test: Un('#'), parse: Sl, transform: Re.transform },
    je = {
        test: Un('hsl', 'hue'),
        parse: fs('hue', 'saturation', 'lightness'),
        transform: ({ hue: e, saturation: t, lightness: n, alpha: r = 1 }) =>
            'hsla(' +
            Math.round(e) +
            ', ' +
            ae.transform(Je(t)) +
            ', ' +
            ae.transform(Je(n)) +
            ', ' +
            Je(Ze.transform(r)) +
            ')',
    },
    Z = {
        test: (e) => Re.test(e) || gn.test(e) || je.test(e),
        parse: (e) =>
            Re.test(e) ? Re.parse(e) : je.test(e) ? je.parse(e) : gn.parse(e),
        transform: (e) =>
            st(e)
                ? e
                : e.hasOwnProperty('red')
                ? Re.transform(e)
                : je.transform(e),
    },
    z = (e, t, n) => -n * e + n * t + e;
function Zt(e, t, n) {
    return (
        n < 0 && (n += 1),
        n > 1 && (n -= 1),
        n < 1 / 6
            ? e + (t - e) * 6 * n
            : n < 1 / 2
            ? t
            : n < 2 / 3
            ? e + (t - e) * (2 / 3 - n) * 6
            : e
    );
}
function Tl({ hue: e, saturation: t, lightness: n, alpha: r }) {
    (e /= 360), (t /= 100), (n /= 100);
    let o = 0,
        i = 0,
        s = 0;
    if (!t) o = i = s = n;
    else {
        const a = n < 0.5 ? n * (1 + t) : n + t - n * t,
            c = 2 * n - a;
        (o = Zt(c, a, e + 1 / 3)), (i = Zt(c, a, e)), (s = Zt(c, a, e - 1 / 3));
    }
    return {
        red: Math.round(o * 255),
        green: Math.round(i * 255),
        blue: Math.round(s * 255),
        alpha: r,
    };
}
const Jt = (e, t, n) => {
        const r = e * e;
        return Math.sqrt(Math.max(0, n * (t * t - r) + r));
    },
    Al = [gn, Re, je],
    Vl = (e) => Al.find((t) => t.test(e));
function mr(e) {
    const t = Vl(e);
    let n = t.parse(e);
    return t === je && (n = Tl(n)), n;
}
const hs = (e, t) => {
    const n = mr(e),
        r = mr(t),
        o = { ...n };
    return (i) => (
        (o.red = Jt(n.red, r.red, i)),
        (o.green = Jt(n.green, r.green, i)),
        (o.blue = Jt(n.blue, r.blue, i)),
        (o.alpha = z(n.alpha, r.alpha, i)),
        Re.transform(o)
    );
};
function Ml(e) {
    var t, n;
    return (
        isNaN(e) &&
        st(e) &&
        (((t = e.match(zt)) === null || t === void 0 ? void 0 : t.length) ||
            0) +
            (((n = e.match(No)) === null || n === void 0 ? void 0 : n.length) ||
                0) >
            0
    );
}
const ps = { regex: ba, countKey: 'Vars', token: '${v}', parse: G },
    ms = { regex: No, countKey: 'Colors', token: '${c}', parse: Z.parse },
    gs = { regex: zt, countKey: 'Numbers', token: '${n}', parse: De.parse };
function Qt(e, { regex: t, countKey: n, token: r, parse: o }) {
    const i = e.tokenised.match(t);
    i &&
        ((e['num' + n] = i.length),
        (e.tokenised = e.tokenised.replace(t, r)),
        e.values.push(...i.map(o)));
}
function Rt(e) {
    const t = e.toString(),
        n = {
            value: t,
            tokenised: t,
            values: [],
            numVars: 0,
            numColors: 0,
            numNumbers: 0,
        };
    return n.value.includes('var(--') && Qt(n, ps), Qt(n, ms), Qt(n, gs), n;
}
function ys(e) {
    return Rt(e).values;
}
function vs(e) {
    const { values: t, numColors: n, numVars: r, tokenised: o } = Rt(e),
        i = t.length;
    return (s) => {
        let a = o;
        for (let c = 0; c < i; c++)
            c < r
                ? (a = a.replace(ps.token, s[c]))
                : c < r + n
                ? (a = a.replace(ms.token, Z.transform(s[c])))
                : (a = a.replace(gs.token, Je(s[c])));
        return a;
    };
}
const Rl = (e) => (typeof e == 'number' ? 0 : e);
function kl(e) {
    const t = ys(e);
    return vs(e)(t.map(Rl));
}
const Pe = {
        test: Ml,
        parse: ys,
        createTransformer: vs,
        getAnimatableNone: kl,
    },
    bs = (e, t) => (n) => `${n > 0 ? t : e}`;
function xs(e, t) {
    return typeof e == 'number'
        ? (n) => z(e, t, n)
        : Z.test(e)
        ? hs(e, t)
        : e.startsWith('var(')
        ? bs(e, t)
        : Ps(e, t);
}
const ws = (e, t) => {
        const n = [...e],
            r = n.length,
            o = e.map((i, s) => xs(i, t[s]));
        return (i) => {
            for (let s = 0; s < r; s++) n[s] = o[s](i);
            return n;
        };
    },
    El = (e, t) => {
        const n = { ...e, ...t },
            r = {};
        for (const o in n)
            e[o] !== void 0 && t[o] !== void 0 && (r[o] = xs(e[o], t[o]));
        return (o) => {
            for (const i in r) n[i] = r[i](o);
            return n;
        };
    },
    Ps = (e, t) => {
        const n = Pe.createTransformer(t),
            r = Rt(e),
            o = Rt(t);
        return r.numVars === o.numVars &&
            r.numColors === o.numColors &&
            r.numNumbers >= o.numNumbers
            ? be(ws(r.values, o.values), n)
            : bs(e, t);
    },
    rt = (e, t, n) => {
        const r = t - e;
        return r === 0 ? 1 : (n - e) / r;
    },
    gr = (e, t) => (n) => z(e, t, n);
function Dl(e) {
    return typeof e == 'number'
        ? gr
        : typeof e == 'string'
        ? Z.test(e)
            ? hs
            : Ps
        : Array.isArray(e)
        ? ws
        : typeof e == 'object'
        ? El
        : gr;
}
function Ll(e, t, n) {
    const r = [],
        o = n || Dl(e[0]),
        i = e.length - 1;
    for (let s = 0; s < i; s++) {
        let a = o(e[s], e[s + 1]);
        if (t) {
            const c = Array.isArray(t) ? t[s] || G : t;
            a = be(c, a);
        }
        r.push(a);
    }
    return r;
}
function Cs(e, t, { clamp: n = !0, ease: r, mixer: o } = {}) {
    const i = e.length;
    if (($n(i === t.length), i === 1)) return () => t[0];
    e[0] > e[i - 1] && ((e = [...e].reverse()), (t = [...t].reverse()));
    const s = Ll(t, r, o),
        a = s.length,
        c = (l) => {
            let u = 0;
            if (a > 1) for (; u < e.length - 2 && !(l < e[u + 1]); u++);
            const d = rt(e[u], e[u + 1], l);
            return s[u](d);
        };
    return n ? (l) => c(we(e[0], e[i - 1], l)) : c;
}
function Bl(e, t) {
    const n = e[e.length - 1];
    for (let r = 1; r <= t; r++) {
        const o = rt(0, t, r);
        e.push(z(n, 1, o));
    }
}
function Ol(e) {
    const t = [0];
    return Bl(t, e.length - 1), t;
}
function Il(e, t) {
    return e.map((n) => n * t);
}
function jl(e, t) {
    return e.map(() => t || as).splice(0, e.length - 1);
}
function kt({
    duration: e = 300,
    keyframes: t,
    times: n,
    ease: r = 'easeInOut',
}) {
    const o = vl(r) ? r.map(pr) : pr(r),
        i = { done: !1, value: t[0] },
        s = Il(n && n.length === t.length ? n : Ol(t), e),
        a = Cs(s, t, { ease: Array.isArray(o) ? o : jl(t, o) });
    return {
        calculatedDuration: e,
        next: (c) => ((i.value = a(c)), (i.done = c >= e), i),
    };
}
function Ss(e, t) {
    return t ? e * (1e3 / t) : 0;
}
const Fl = 5;
function Ts(e, t, n) {
    const r = Math.max(t - Fl, 0);
    return Ss(n - e(r), t - r);
}
const en = 0.001,
    Nl = 0.01,
    yr = 10,
    $l = 0.05,
    zl = 1;
function Gl({
    duration: e = 800,
    bounce: t = 0.25,
    velocity: n = 0,
    mass: r = 1,
}) {
    let o, i;
    cl(e <= xe(yr));
    let s = 1 - t;
    (s = we($l, zl, s)),
        (e = we(Nl, yr, he(e))),
        s < 1
            ? ((o = (l) => {
                  const u = l * s,
                      d = u * e,
                      f = u - n,
                      h = yn(l, s),
                      p = Math.exp(-d);
                  return en - (f / h) * p;
              }),
              (i = (l) => {
                  const d = l * s * e,
                      f = d * n + n,
                      h = Math.pow(s, 2) * Math.pow(l, 2) * e,
                      p = Math.exp(-d),
                      m = yn(Math.pow(l, 2), s);
                  return ((-o(l) + en > 0 ? -1 : 1) * ((f - h) * p)) / m;
              }))
            : ((o = (l) => {
                  const u = Math.exp(-l * e),
                      d = (l - n) * e + 1;
                  return -en + u * d;
              }),
              (i = (l) => {
                  const u = Math.exp(-l * e),
                      d = (n - l) * (e * e);
                  return u * d;
              }));
    const a = 5 / e,
        c = Wl(o, i, a);
    if (((e = xe(e)), isNaN(c)))
        return { stiffness: 100, damping: 10, duration: e };
    {
        const l = Math.pow(c, 2) * r;
        return { stiffness: l, damping: s * 2 * Math.sqrt(r * l), duration: e };
    }
}
const Ul = 12;
function Wl(e, t, n) {
    let r = n;
    for (let o = 1; o < Ul; o++) r = r - e(r) / t(r);
    return r;
}
function yn(e, t) {
    return e * Math.sqrt(1 - t * t);
}
const Hl = ['duration', 'bounce'],
    _l = ['stiffness', 'damping', 'mass'];
function vr(e, t) {
    return t.some((n) => e[n] !== void 0);
}
function Kl(e) {
    let t = {
        velocity: 0,
        stiffness: 100,
        damping: 10,
        mass: 1,
        isResolvedFromDuration: !1,
        ...e,
    };
    if (!vr(e, _l) && vr(e, Hl)) {
        const n = Gl(e);
        (t = { ...t, ...n, velocity: 0, mass: 1 }),
            (t.isResolvedFromDuration = !0);
    }
    return t;
}
function As({ keyframes: e, restDelta: t, restSpeed: n, ...r }) {
    const o = e[0],
        i = e[e.length - 1],
        s = { done: !1, value: o },
        {
            stiffness: a,
            damping: c,
            mass: l,
            velocity: u,
            duration: d,
            isResolvedFromDuration: f,
        } = Kl(r),
        h = u ? -he(u) : 0,
        p = c / (2 * Math.sqrt(a * l)),
        m = i - o,
        b = he(Math.sqrt(a / l)),
        w = Math.abs(m) < 5;
    n || (n = w ? 0.01 : 2), t || (t = w ? 0.005 : 0.5);
    let y;
    if (p < 1) {
        const v = yn(b, p);
        y = (x) => {
            const P = Math.exp(-p * b * x);
            return (
                i -
                P *
                    (((h + p * b * m) / v) * Math.sin(v * x) +
                        m * Math.cos(v * x))
            );
        };
    } else if (p === 1) y = (v) => i - Math.exp(-b * v) * (m + (h + b * m) * v);
    else {
        const v = b * Math.sqrt(p * p - 1);
        y = (x) => {
            const P = Math.exp(-p * b * x),
                k = Math.min(v * x, 300);
            return (
                i -
                (P * ((h + p * b * m) * Math.sinh(k) + v * m * Math.cosh(k))) /
                    v
            );
        };
    }
    return {
        calculatedDuration: (f && d) || null,
        next: (v) => {
            const x = y(v);
            if (f) s.done = v >= d;
            else {
                let P = h;
                v !== 0 && (p < 1 ? (P = Ts(y, v, x)) : (P = 0));
                const k = Math.abs(P) <= n,
                    R = Math.abs(i - x) <= t;
                s.done = k && R;
            }
            return (s.value = s.done ? i : x), s;
        },
    };
}
function br({
    keyframes: e,
    velocity: t = 0,
    power: n = 0.8,
    timeConstant: r = 325,
    bounceDamping: o = 10,
    bounceStiffness: i = 500,
    modifyTarget: s,
    min: a,
    max: c,
    restDelta: l = 0.5,
    restSpeed: u,
}) {
    const d = e[0],
        f = { done: !1, value: d },
        h = (S) => (a !== void 0 && S < a) || (c !== void 0 && S > c),
        p = (S) =>
            a === void 0
                ? c
                : c === void 0 || Math.abs(a - S) < Math.abs(c - S)
                ? a
                : c;
    let m = n * t;
    const b = d + m,
        w = s === void 0 ? b : s(b);
    w !== b && (m = w - d);
    const y = (S) => -m * Math.exp(-S / r),
        v = (S) => w + y(S),
        x = (S) => {
            const D = y(S),
                H = v(S);
            (f.done = Math.abs(D) <= l), (f.value = f.done ? w : H);
        };
    let P, k;
    const R = (S) => {
        h(f.value) &&
            ((P = S),
            (k = As({
                keyframes: [f.value, p(f.value)],
                velocity: Ts(v, S, f.value),
                damping: o,
                stiffness: i,
                restDelta: l,
                restSpeed: u,
            })));
    };
    return (
        R(0),
        {
            calculatedDuration: null,
            next: (S) => {
                let D = !1;
                return (
                    !k && P === void 0 && ((D = !0), x(S), R(S)),
                    P !== void 0 && S > P ? k.next(S - P) : (!D && x(S), f)
                );
            },
        }
    );
}
const Xl = (e) => {
        const t = ({ timestamp: n }) => e(n);
        return {
            start: () => $.update(t, !0),
            stop: () => pe(t),
            now: () => (q.isProcessing ? q.timestamp : performance.now()),
        };
    },
    xr = 2e4;
function wr(e) {
    let t = 0;
    const n = 50;
    let r = e.next(t);
    for (; !r.done && t < xr; ) (t += n), (r = e.next(t));
    return t >= xr ? 1 / 0 : t;
}
const Yl = { decay: br, inertia: br, tween: kt, keyframes: kt, spring: As };
function Et({
    autoplay: e = !0,
    delay: t = 0,
    driver: n = Xl,
    keyframes: r,
    type: o = 'keyframes',
    repeat: i = 0,
    repeatDelay: s = 0,
    repeatType: a = 'loop',
    onPlay: c,
    onStop: l,
    onComplete: u,
    onUpdate: d,
    ...f
}) {
    let h = 1,
        p = !1,
        m,
        b;
    const w = () => {
        b = new Promise((C) => {
            m = C;
        });
    };
    w();
    let y;
    const v = Yl[o] || kt;
    let x;
    v !== kt &&
        typeof r[0] != 'number' &&
        ((x = Cs([0, 100], r, { clamp: !1 })), (r = [0, 100]));
    const P = v({ ...f, keyframes: r });
    let k;
    a === 'mirror' &&
        (k = v({
            ...f,
            keyframes: [...r].reverse(),
            velocity: -(f.velocity || 0),
        }));
    let R = 'idle',
        S = null,
        D = null,
        H = null;
    P.calculatedDuration === null && i && (P.calculatedDuration = wr(P));
    const { calculatedDuration: X } = P;
    let L = 1 / 0,
        Y = 1 / 0;
    X !== null && ((L = X + s), (Y = L * (i + 1) - s));
    let I = 0;
    const O = (C) => {
            if (D === null) return;
            h > 0 && (D = Math.min(D, C)),
                h < 0 && (D = Math.min(C - Y / h, D)),
                S !== null ? (I = S) : (I = Math.round(C - D) * h);
            const V = I - t * (h >= 0 ? 1 : -1),
                M = h >= 0 ? V < 0 : V > Y;
            (I = Math.max(V, 0)), R === 'finished' && S === null && (I = Y);
            let j = I,
                U = P;
            if (i) {
                const Se = I / L;
                let ce = Math.floor(Se),
                    se = Se % 1;
                !se && Se >= 1 && (se = 1),
                    se === 1 && ce--,
                    (ce = Math.min(ce, i + 1));
                const lt = !!(ce % 2);
                lt &&
                    (a === 'reverse'
                        ? ((se = 1 - se), s && (se -= s / L))
                        : a === 'mirror' && (U = k));
                let qn = we(0, 1, se);
                I > Y && (qn = a === 'reverse' && lt ? 1 : 0), (j = qn * L);
            }
            const N = M ? { done: !1, value: r[0] } : U.next(j);
            x && (N.value = x(N.value));
            let { done: Q } = N;
            !M && X !== null && (Q = h >= 0 ? I >= Y : I <= 0);
            const We =
                S === null && (R === 'finished' || (R === 'running' && Q));
            return d && d(N.value), We && le(), N;
        },
        _ = () => {
            y && y.stop(), (y = void 0);
        },
        J = () => {
            (R = 'idle'), _(), m(), w(), (D = H = null);
        },
        le = () => {
            (R = 'finished'), u && u(), _(), m();
        },
        T = () => {
            if (p) return;
            y || (y = n(O));
            const C = y.now();
            c && c(),
                S !== null ? (D = C - S) : (!D || R === 'finished') && (D = C),
                R === 'finished' && w(),
                (H = D),
                (S = null),
                (R = 'running'),
                y.start();
        };
    e && T();
    const E = {
        then(C, V) {
            return b.then(C, V);
        },
        get time() {
            return he(I);
        },
        set time(C) {
            (C = xe(C)),
                (I = C),
                S !== null || !y || h === 0 ? (S = C) : (D = y.now() - C / h);
        },
        get duration() {
            const C =
                P.calculatedDuration === null ? wr(P) : P.calculatedDuration;
            return he(C);
        },
        get speed() {
            return h;
        },
        set speed(C) {
            C === h || !y || ((h = C), (E.time = he(I)));
        },
        get state() {
            return R;
        },
        play: T,
        pause: () => {
            (R = 'paused'), (S = I);
        },
        stop: () => {
            (p = !0), R !== 'idle' && ((R = 'idle'), l && l(), J());
        },
        cancel: () => {
            H !== null && O(H), J();
        },
        complete: () => {
            R = 'finished';
        },
        sample: (C) => ((D = 0), O(C)),
    };
    return E;
}
function ql(e) {
    let t;
    return () => (t === void 0 && (t = e()), t);
}
const Zl = ql(() => Object.hasOwnProperty.call(Element.prototype, 'animate')),
    Jl = new Set([
        'opacity',
        'clipPath',
        'filter',
        'transform',
        'backgroundColor',
    ]),
    pt = 10,
    Ql = 2e4,
    ec = (e, t) =>
        t.type === 'spring' || e === 'backgroundColor' || !rs(t.ease);
function tc(e, t, { onUpdate: n, onComplete: r, ...o }) {
    if (
        !(
            Zl() &&
            Jl.has(t) &&
            !o.repeatDelay &&
            o.repeatType !== 'mirror' &&
            o.damping !== 0 &&
            o.type !== 'inertia'
        )
    )
        return !1;
    let s = !1,
        a,
        c;
    const l = () => {
        c = new Promise((y) => {
            a = y;
        });
    };
    l();
    let { keyframes: u, duration: d = 300, ease: f, times: h } = o;
    if (ec(t, o)) {
        const y = Et({ ...o, repeat: 0, delay: 0 });
        let v = { done: !1, value: u[0] };
        const x = [];
        let P = 0;
        for (; !v.done && P < Ql; )
            (v = y.sample(P)), x.push(v.value), (P += pt);
        (h = void 0), (u = x), (d = P - pt), (f = 'linear');
    }
    const p = dl(e.owner.current, t, u, {
            ...o,
            duration: d,
            ease: f,
            times: h,
        }),
        m = () => p.cancel(),
        b = () => {
            $.update(m), a(), l();
        };
    return (
        (p.onfinish = () => {
            e.set(fl(u, o)), r && r(), b();
        }),
        {
            then(y, v) {
                return c.then(y, v);
            },
            attachTimeline(y) {
                return (p.timeline = y), (p.onfinish = null), G;
            },
            get time() {
                return he(p.currentTime || 0);
            },
            set time(y) {
                p.currentTime = xe(y);
            },
            get speed() {
                return p.playbackRate;
            },
            set speed(y) {
                p.playbackRate = y;
            },
            get duration() {
                return he(d);
            },
            play: () => {
                s || (p.play(), pe(m));
            },
            pause: () => p.pause(),
            stop: () => {
                if (((s = !0), p.playState === 'idle')) return;
                const { currentTime: y } = p;
                if (y) {
                    const v = Et({ ...o, autoplay: !1 });
                    e.setWithVelocity(
                        v.sample(y - pt).value,
                        v.sample(y).value,
                        pt,
                    );
                }
                b();
            },
            complete: () => p.finish(),
            cancel: b,
        }
    );
}
function nc({ keyframes: e, delay: t, onUpdate: n, onComplete: r }) {
    const o = () => (
        n && n(e[e.length - 1]),
        r && r(),
        {
            time: 0,
            speed: 1,
            duration: 0,
            play: G,
            pause: G,
            stop: G,
            then: (i) => (i(), Promise.resolve()),
            cancel: G,
            complete: G,
        }
    );
    return t
        ? Et({ keyframes: [0, 1], duration: 0, delay: t, onComplete: o })
        : o();
}
const rc = { type: 'spring', stiffness: 500, damping: 25, restSpeed: 10 },
    oc = (e) => ({
        type: 'spring',
        stiffness: 550,
        damping: e === 0 ? 2 * Math.sqrt(550) : 30,
        restSpeed: 10,
    }),
    sc = { type: 'keyframes', duration: 0.8 },
    ic = { type: 'keyframes', ease: [0.25, 0.1, 0.35, 1], duration: 0.3 },
    ac = (e, { keyframes: t }) =>
        t.length > 2
            ? sc
            : Ee.has(e)
            ? e.startsWith('scale')
                ? oc(t[1])
                : rc
            : ic,
    vn = (e, t) =>
        e === 'zIndex'
            ? !1
            : !!(
                  typeof t == 'number' ||
                  Array.isArray(t) ||
                  (typeof t == 'string' &&
                      (Pe.test(t) || t === '0') &&
                      !t.startsWith('url('))
              ),
    lc = new Set(['brightness', 'contrast', 'saturate', 'opacity']);
function cc(e) {
    const [t, n] = e.slice(0, -1).split('(');
    if (t === 'drop-shadow') return e;
    const [r] = n.match(zt) || [];
    if (!r) return e;
    const o = n.replace(r, '');
    let i = lc.has(t) ? 1 : 0;
    return r !== n && (i *= 100), t + '(' + i + o + ')';
}
const uc = /([a-z-]*)\(.*?\)/g,
    bn = {
        ...Pe,
        getAnimatableNone: (e) => {
            const t = e.match(uc);
            return t ? t.map(cc).join(' ') : e;
        },
    },
    dc = {
        ...$o,
        color: Z,
        backgroundColor: Z,
        outlineColor: Z,
        fill: Z,
        stroke: Z,
        borderColor: Z,
        borderTopColor: Z,
        borderRightColor: Z,
        borderBottomColor: Z,
        borderLeftColor: Z,
        filter: bn,
        WebkitFilter: bn,
    },
    Wn = (e) => dc[e];
function Vs(e, t) {
    let n = Wn(e);
    return (
        n !== bn && (n = Pe),
        n.getAnimatableNone ? n.getAnimatableNone(t) : void 0
    );
}
const Ms = (e) => /^0[^.\s]+$/.test(e);
function fc(e) {
    if (typeof e == 'number') return e === 0;
    if (e !== null) return e === 'none' || e === '0' || Ms(e);
}
function hc(e, t, n, r) {
    const o = vn(t, n);
    let i;
    Array.isArray(n) ? (i = [...n]) : (i = [null, n]);
    const s = r.from !== void 0 ? r.from : e.get();
    let a;
    const c = [];
    for (let l = 0; l < i.length; l++)
        i[l] === null && (i[l] = l === 0 ? s : i[l - 1]),
            fc(i[l]) && c.push(l),
            typeof i[l] == 'string' &&
                i[l] !== 'none' &&
                i[l] !== '0' &&
                (a = i[l]);
    if (o && c.length && a)
        for (let l = 0; l < c.length; l++) {
            const u = c[l];
            i[u] = Vs(t, a);
        }
    return i;
}
function pc({
    when: e,
    delay: t,
    delayChildren: n,
    staggerChildren: r,
    staggerDirection: o,
    repeat: i,
    repeatType: s,
    repeatDelay: a,
    from: c,
    elapsed: l,
    ...u
}) {
    return !!Object.keys(u).length;
}
function Rs(e, t) {
    return e[t] || e.default || e;
}
const Hn =
    (e, t, n, r = {}) =>
    (o) => {
        const i = Rs(r, e) || {},
            s = i.delay || r.delay || 0;
        let { elapsed: a = 0 } = r;
        a = a - xe(s);
        const c = hc(t, e, n, i),
            l = c[0],
            u = c[c.length - 1],
            d = vn(e, l),
            f = vn(e, u);
        let h = {
            keyframes: c,
            velocity: t.getVelocity(),
            ease: 'easeOut',
            ...i,
            delay: -a,
            onUpdate: (p) => {
                t.set(p), i.onUpdate && i.onUpdate(p);
            },
            onComplete: () => {
                o(), i.onComplete && i.onComplete();
            },
        };
        if (
            (pc(i) || (h = { ...h, ...ac(e, h) }),
            h.duration && (h.duration = xe(h.duration)),
            h.repeatDelay && (h.repeatDelay = xe(h.repeatDelay)),
            !d || !f || ul.current || i.type === !1)
        )
            return nc(h);
        if (
            t.owner &&
            t.owner.current instanceof HTMLElement &&
            !t.owner.getProps().onUpdate
        ) {
            const p = tc(t, e, h);
            if (p) return p;
        }
        return Et(h);
    };
function Dt(e) {
    return !!(ee(e) && e.add);
}
const ks = (e) => /^\-?\d*\.?\d+$/.test(e);
function _n(e, t) {
    e.indexOf(t) === -1 && e.push(t);
}
function Kn(e, t) {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
}
class Xn {
    constructor() {
        this.subscriptions = [];
    }
    add(t) {
        return _n(this.subscriptions, t), () => Kn(this.subscriptions, t);
    }
    notify(t, n, r) {
        const o = this.subscriptions.length;
        if (o)
            if (o === 1) this.subscriptions[0](t, n, r);
            else
                for (let i = 0; i < o; i++) {
                    const s = this.subscriptions[i];
                    s && s(t, n, r);
                }
    }
    getSize() {
        return this.subscriptions.length;
    }
    clear() {
        this.subscriptions.length = 0;
    }
}
const mc = (e) => !isNaN(parseFloat(e));
class gc {
    constructor(t, n = {}) {
        (this.version = '10.15.2'),
            (this.timeDelta = 0),
            (this.lastUpdated = 0),
            (this.canTrackVelocity = !1),
            (this.events = {}),
            (this.updateAndNotify = (r, o = !0) => {
                (this.prev = this.current), (this.current = r);
                const { delta: i, timestamp: s } = q;
                this.lastUpdated !== s &&
                    ((this.timeDelta = i),
                    (this.lastUpdated = s),
                    $.postRender(this.scheduleVelocityCheck)),
                    this.prev !== this.current &&
                        this.events.change &&
                        this.events.change.notify(this.current),
                    this.events.velocityChange &&
                        this.events.velocityChange.notify(this.getVelocity()),
                    o &&
                        this.events.renderRequest &&
                        this.events.renderRequest.notify(this.current);
            }),
            (this.scheduleVelocityCheck = () =>
                $.postRender(this.velocityCheck)),
            (this.velocityCheck = ({ timestamp: r }) => {
                r !== this.lastUpdated &&
                    ((this.prev = this.current),
                    this.events.velocityChange &&
                        this.events.velocityChange.notify(this.getVelocity()));
            }),
            (this.hasAnimated = !1),
            (this.prev = this.current = t),
            (this.canTrackVelocity = mc(this.current)),
            (this.owner = n.owner);
    }
    onChange(t) {
        return this.on('change', t);
    }
    on(t, n) {
        this.events[t] || (this.events[t] = new Xn());
        const r = this.events[t].add(n);
        return t === 'change'
            ? () => {
                  r(),
                      $.read(() => {
                          this.events.change.getSize() || this.stop();
                      });
              }
            : r;
    }
    clearListeners() {
        for (const t in this.events) this.events[t].clear();
    }
    attach(t, n) {
        (this.passiveEffect = t), (this.stopPassiveEffect = n);
    }
    set(t, n = !0) {
        !n || !this.passiveEffect
            ? this.updateAndNotify(t, n)
            : this.passiveEffect(t, this.updateAndNotify);
    }
    setWithVelocity(t, n, r) {
        this.set(n), (this.prev = t), (this.timeDelta = r);
    }
    jump(t) {
        this.updateAndNotify(t),
            (this.prev = t),
            this.stop(),
            this.stopPassiveEffect && this.stopPassiveEffect();
    }
    get() {
        return this.current;
    }
    getPrevious() {
        return this.prev;
    }
    getVelocity() {
        return this.canTrackVelocity
            ? Ss(
                  parseFloat(this.current) - parseFloat(this.prev),
                  this.timeDelta,
              )
            : 0;
    }
    start(t) {
        return (
            this.stop(),
            new Promise((n) => {
                (this.hasAnimated = !0),
                    (this.animation = t(n)),
                    this.events.animationStart &&
                        this.events.animationStart.notify();
            }).then(() => {
                this.events.animationComplete &&
                    this.events.animationComplete.notify(),
                    this.clearAnimation();
            })
        );
    }
    stop() {
        this.animation &&
            (this.animation.stop(),
            this.events.animationCancel &&
                this.events.animationCancel.notify()),
            this.clearAnimation();
    }
    isAnimating() {
        return !!this.animation;
    }
    clearAnimation() {
        delete this.animation;
    }
    destroy() {
        this.clearListeners(),
            this.stop(),
            this.stopPassiveEffect && this.stopPassiveEffect();
    }
}
function ze(e, t) {
    return new gc(e, t);
}
const Es = (e) => (t) => t.test(e),
    yc = { test: (e) => e === 'auto', parse: (e) => e },
    Ds = [De, A, ae, ge, Ca, Pa, yc],
    Xe = (e) => Ds.find(Es(e)),
    vc = [...Ds, Z, Pe],
    bc = (e) => vc.find(Es(e));
function xc(e, t, n) {
    e.hasValue(t) ? e.getValue(t).set(n) : e.addValue(t, ze(n));
}
function wc(e, t) {
    const n = Ut(e, t);
    let {
        transitionEnd: r = {},
        transition: o = {},
        ...i
    } = n ? e.makeTargetAnimatable(n, !1) : {};
    i = { ...i, ...r };
    for (const s in i) {
        const a = ja(i[s]);
        xc(e, s, a);
    }
}
function Pc(e, t, n) {
    var r, o;
    const i = Object.keys(t).filter((a) => !e.hasValue(a)),
        s = i.length;
    if (s)
        for (let a = 0; a < s; a++) {
            const c = i[a],
                l = t[c];
            let u = null;
            Array.isArray(l) && (u = l[0]),
                u === null &&
                    (u =
                        (o =
                            (r = n[c]) !== null && r !== void 0
                                ? r
                                : e.readValue(c)) !== null && o !== void 0
                            ? o
                            : t[c]),
                u != null &&
                    (typeof u == 'string' && (ks(u) || Ms(u))
                        ? (u = parseFloat(u))
                        : !bc(u) && Pe.test(l) && (u = Vs(c, l)),
                    e.addValue(c, ze(u, { owner: e })),
                    n[c] === void 0 && (n[c] = u),
                    u !== null && e.setBaseTarget(c, u));
        }
}
function Cc(e, t) {
    return t ? (t[e] || t.default || t).from : void 0;
}
function Sc(e, t, n) {
    const r = {};
    for (const o in e) {
        const i = Cc(o, t);
        if (i !== void 0) r[o] = i;
        else {
            const s = n.getValue(o);
            s && (r[o] = s.get());
        }
    }
    return r;
}
function Tc({ protectedKeys: e, needsAnimating: t }, n) {
    const r = e.hasOwnProperty(n) && t[n] !== !0;
    return (t[n] = !1), r;
}
function Ls(e, t, { delay: n = 0, transitionOverride: r, type: o } = {}) {
    let {
        transition: i = e.getDefaultTransition(),
        transitionEnd: s,
        ...a
    } = e.makeTargetAnimatable(t);
    const c = e.getValue('willChange');
    r && (i = r);
    const l = [],
        u = o && e.animationState && e.animationState.getState()[o];
    for (const d in a) {
        const f = e.getValue(d),
            h = a[d];
        if (!f || h === void 0 || (u && Tc(u, d))) continue;
        const p = { delay: n, elapsed: 0, ...i };
        if (window.HandoffAppearAnimations && !f.hasAnimated) {
            const b = e.getProps()[ll];
            b && (p.elapsed = window.HandoffAppearAnimations(b, d, f, $));
        }
        f.start(
            Hn(d, f, h, e.shouldReduceMotion && Ee.has(d) ? { type: !1 } : p),
        );
        const m = f.animation;
        Dt(c) && (c.add(d), m.then(() => c.remove(d))), l.push(m);
    }
    return (
        s &&
            Promise.all(l).then(() => {
                s && wc(e, s);
            }),
        l
    );
}
function xn(e, t, n = {}) {
    const r = Ut(e, t, n.custom);
    let { transition: o = e.getDefaultTransition() || {} } = r || {};
    n.transitionOverride && (o = n.transitionOverride);
    const i = r ? () => Promise.all(Ls(e, r, n)) : () => Promise.resolve(),
        s =
            e.variantChildren && e.variantChildren.size
                ? (c = 0) => {
                      const {
                          delayChildren: l = 0,
                          staggerChildren: u,
                          staggerDirection: d,
                      } = o;
                      return Ac(e, t, l + c, u, d, n);
                  }
                : () => Promise.resolve(),
        { when: a } = o;
    if (a) {
        const [c, l] = a === 'beforeChildren' ? [i, s] : [s, i];
        return c().then(() => l());
    } else return Promise.all([i(), s(n.delay)]);
}
function Ac(e, t, n = 0, r = 0, o = 1, i) {
    const s = [],
        a = (e.variantChildren.size - 1) * r,
        c = o === 1 ? (l = 0) => l * r : (l = 0) => a - l * r;
    return (
        Array.from(e.variantChildren)
            .sort(Vc)
            .forEach((l, u) => {
                l.notify('AnimationStart', t),
                    s.push(
                        xn(l, t, { ...i, delay: n + c(u) }).then(() =>
                            l.notify('AnimationComplete', t),
                        ),
                    );
            }),
        Promise.all(s)
    );
}
function Vc(e, t) {
    return e.sortNodePosition(t);
}
function Mc(e, t, n = {}) {
    e.notify('AnimationStart', t);
    let r;
    if (Array.isArray(t)) {
        const o = t.map((i) => xn(e, i, n));
        r = Promise.all(o);
    } else if (typeof t == 'string') r = xn(e, t, n);
    else {
        const o = typeof t == 'function' ? Ut(e, t, n.custom) : t;
        r = Promise.all(Ls(e, o, n));
    }
    return r.then(() => e.notify('AnimationComplete', t));
}
const Rc = [...Rn].reverse(),
    kc = Rn.length;
function Ec(e) {
    return (t) =>
        Promise.all(t.map(({ animation: n, options: r }) => Mc(e, n, r)));
}
function Dc(e) {
    let t = Ec(e);
    const n = Bc();
    let r = !0;
    const o = (c, l) => {
        const u = Ut(e, l);
        if (u) {
            const { transition: d, transitionEnd: f, ...h } = u;
            c = { ...c, ...h, ...f };
        }
        return c;
    };
    function i(c) {
        t = c(e);
    }
    function s(c, l) {
        const u = e.getProps(),
            d = e.getVariantContext(!0) || {},
            f = [],
            h = new Set();
        let p = {},
            m = 1 / 0;
        for (let w = 0; w < kc; w++) {
            const y = Rc[w],
                v = n[y],
                x = u[y] !== void 0 ? u[y] : d[y],
                P = tt(x),
                k = y === l ? v.isActive : null;
            k === !1 && (m = w);
            let R = x === d[y] && x !== u[y] && P;
            if (
                (R && r && e.manuallyAnimateOnMount && (R = !1),
                (v.protectedKeys = { ...p }),
                (!v.isActive && k === null) ||
                    (!x && !v.prevProp) ||
                    Nt(x) ||
                    typeof x == 'boolean')
            )
                continue;
            const S = Lc(v.prevProp, x);
            let D = S || (y === l && v.isActive && !R && P) || (w > m && P);
            const H = Array.isArray(x) ? x : [x];
            let X = H.reduce(o, {});
            k === !1 && (X = {});
            const { prevResolvedValues: L = {} } = v,
                Y = { ...L, ...X },
                I = (O) => {
                    (D = !0), h.delete(O), (v.needsAnimating[O] = !0);
                };
            for (const O in Y) {
                const _ = X[O],
                    J = L[O];
                p.hasOwnProperty(O) ||
                    (_ !== J
                        ? Mt(_) && Mt(J)
                            ? !ts(_, J) || S
                                ? I(O)
                                : (v.protectedKeys[O] = !0)
                            : _ !== void 0
                            ? I(O)
                            : h.add(O)
                        : _ !== void 0 && h.has(O)
                        ? I(O)
                        : (v.protectedKeys[O] = !0));
            }
            (v.prevProp = x),
                (v.prevResolvedValues = X),
                v.isActive && (p = { ...p, ...X }),
                r && e.blockInitialAnimation && (D = !1),
                D &&
                    !R &&
                    f.push(
                        ...H.map((O) => ({
                            animation: O,
                            options: { type: y, ...c },
                        })),
                    );
        }
        if (h.size) {
            const w = {};
            h.forEach((y) => {
                const v = e.getBaseTarget(y);
                v !== void 0 && (w[y] = v);
            }),
                f.push({ animation: w });
        }
        let b = !!f.length;
        return (
            r && u.initial === !1 && !e.manuallyAnimateOnMount && (b = !1),
            (r = !1),
            b ? t(f) : Promise.resolve()
        );
    }
    function a(c, l, u) {
        var d;
        if (n[c].isActive === l) return Promise.resolve();
        (d = e.variantChildren) === null ||
            d === void 0 ||
            d.forEach((h) => {
                var p;
                return (p = h.animationState) === null || p === void 0
                    ? void 0
                    : p.setActive(c, l);
            }),
            (n[c].isActive = l);
        const f = s(u, c);
        for (const h in n) n[h].protectedKeys = {};
        return f;
    }
    return {
        animateChanges: s,
        setActive: a,
        setAnimateFunction: i,
        getState: () => n,
    };
}
function Lc(e, t) {
    return typeof t == 'string' ? t !== e : Array.isArray(t) ? !ts(t, e) : !1;
}
function Te(e = !1) {
    return {
        isActive: e,
        protectedKeys: {},
        needsAnimating: {},
        prevResolvedValues: {},
    };
}
function Bc() {
    return {
        animate: Te(!0),
        whileInView: Te(),
        whileHover: Te(),
        whileTap: Te(),
        whileDrag: Te(),
        whileFocus: Te(),
        exit: Te(),
    };
}
class Oc extends Ce {
    constructor(t) {
        super(t), t.animationState || (t.animationState = Dc(t));
    }
    updateAnimationControlsSubscription() {
        const { animate: t } = this.node.getProps();
        this.unmount(), Nt(t) && (this.unmount = t.subscribe(this.node));
    }
    mount() {
        this.updateAnimationControlsSubscription();
    }
    update() {
        const { animate: t } = this.node.getProps(),
            { animate: n } = this.node.prevProps || {};
        t !== n && this.updateAnimationControlsSubscription();
    }
    unmount() {}
}
let Ic = 0;
class jc extends Ce {
    constructor() {
        super(...arguments), (this.id = Ic++);
    }
    update() {
        if (!this.node.presenceContext) return;
        const {
                isPresent: t,
                onExitComplete: n,
                custom: r,
            } = this.node.presenceContext,
            { isPresent: o } = this.node.prevPresenceContext || {};
        if (!this.node.animationState || t === o) return;
        const i = this.node.animationState.setActive('exit', !t, {
            custom: r ?? this.node.getProps().custom,
        });
        n && !t && i.then(() => n(this.id));
    }
    mount() {
        const { register: t } = this.node.presenceContext || {};
        t && (this.unmount = t(this.id));
    }
    unmount() {}
}
const Fc = { animation: { Feature: Oc }, exit: { Feature: jc } },
    Pr = (e, t) => Math.abs(e - t);
function Nc(e, t) {
    const n = Pr(e.x, t.x),
        r = Pr(e.y, t.y);
    return Math.sqrt(n ** 2 + r ** 2);
}
class Bs {
    constructor(t, n, { transformPagePoint: r } = {}) {
        if (
            ((this.startEvent = null),
            (this.lastMoveEvent = null),
            (this.lastMoveEventInfo = null),
            (this.handlers = {}),
            (this.updatePoint = () => {
                if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
                const l = nn(this.lastMoveEventInfo, this.history),
                    u = this.startEvent !== null,
                    d = Nc(l.offset, { x: 0, y: 0 }) >= 3;
                if (!u && !d) return;
                const { point: f } = l,
                    { timestamp: h } = q;
                this.history.push({ ...f, timestamp: h });
                const { onStart: p, onMove: m } = this.handlers;
                u ||
                    (p && p(this.lastMoveEvent, l),
                    (this.startEvent = this.lastMoveEvent)),
                    m && m(this.lastMoveEvent, l);
            }),
            (this.handlePointerMove = (l, u) => {
                (this.lastMoveEvent = l),
                    (this.lastMoveEventInfo = tn(u, this.transformPagePoint)),
                    $.update(this.updatePoint, !0);
            }),
            (this.handlePointerUp = (l, u) => {
                if (
                    (this.end(),
                    !(this.lastMoveEvent && this.lastMoveEventInfo))
                )
                    return;
                const { onEnd: d, onSessionEnd: f } = this.handlers,
                    h = nn(
                        l.type === 'pointercancel'
                            ? this.lastMoveEventInfo
                            : tn(u, this.transformPagePoint),
                        this.history,
                    );
                this.startEvent && d && d(l, h), f && f(l, h);
            }),
            !qo(t))
        )
            return;
        (this.handlers = n), (this.transformPagePoint = r);
        const o = Gt(t),
            i = tn(o, this.transformPagePoint),
            { point: s } = i,
            { timestamp: a } = q;
        this.history = [{ ...s, timestamp: a }];
        const { onSessionStart: c } = n;
        c && c(t, nn(i, this.history)),
            (this.removeListeners = be(
                fe(window, 'pointermove', this.handlePointerMove),
                fe(window, 'pointerup', this.handlePointerUp),
                fe(window, 'pointercancel', this.handlePointerUp),
            ));
    }
    updateHandlers(t) {
        this.handlers = t;
    }
    end() {
        this.removeListeners && this.removeListeners(), pe(this.updatePoint);
    }
}
function tn(e, t) {
    return t ? { point: t(e.point) } : e;
}
function Cr(e, t) {
    return { x: e.x - t.x, y: e.y - t.y };
}
function nn({ point: e }, t) {
    return {
        point: e,
        delta: Cr(e, Os(t)),
        offset: Cr(e, $c(t)),
        velocity: zc(t, 0.1),
    };
}
function $c(e) {
    return e[0];
}
function Os(e) {
    return e[e.length - 1];
}
function zc(e, t) {
    if (e.length < 2) return { x: 0, y: 0 };
    let n = e.length - 1,
        r = null;
    const o = Os(e);
    for (; n >= 0 && ((r = e[n]), !(o.timestamp - r.timestamp > xe(t))); ) n--;
    if (!r) return { x: 0, y: 0 };
    const i = he(o.timestamp - r.timestamp);
    if (i === 0) return { x: 0, y: 0 };
    const s = { x: (o.x - r.x) / i, y: (o.y - r.y) / i };
    return s.x === 1 / 0 && (s.x = 0), s.y === 1 / 0 && (s.y = 0), s;
}
function ne(e) {
    return e.max - e.min;
}
function wn(e, t = 0, n = 0.01) {
    return Math.abs(e - t) <= n;
}
function Sr(e, t, n, r = 0.5) {
    (e.origin = r),
        (e.originPoint = z(t.min, t.max, e.origin)),
        (e.scale = ne(n) / ne(t)),
        (wn(e.scale, 1, 1e-4) || isNaN(e.scale)) && (e.scale = 1),
        (e.translate = z(n.min, n.max, e.origin) - e.originPoint),
        (wn(e.translate) || isNaN(e.translate)) && (e.translate = 0);
}
function Qe(e, t, n, r) {
    Sr(e.x, t.x, n.x, r ? r.originX : void 0),
        Sr(e.y, t.y, n.y, r ? r.originY : void 0);
}
function Tr(e, t, n) {
    (e.min = n.min + t.min), (e.max = e.min + ne(t));
}
function Gc(e, t, n) {
    Tr(e.x, t.x, n.x), Tr(e.y, t.y, n.y);
}
function Ar(e, t, n) {
    (e.min = t.min - n.min), (e.max = e.min + ne(t));
}
function et(e, t, n) {
    Ar(e.x, t.x, n.x), Ar(e.y, t.y, n.y);
}
function Uc(e, { min: t, max: n }, r) {
    return (
        t !== void 0 && e < t
            ? (e = r ? z(t, e, r.min) : Math.max(e, t))
            : n !== void 0 &&
              e > n &&
              (e = r ? z(n, e, r.max) : Math.min(e, n)),
        e
    );
}
function Vr(e, t, n) {
    return {
        min: t !== void 0 ? e.min + t : void 0,
        max: n !== void 0 ? e.max + n - (e.max - e.min) : void 0,
    };
}
function Wc(e, { top: t, left: n, bottom: r, right: o }) {
    return { x: Vr(e.x, n, o), y: Vr(e.y, t, r) };
}
function Mr(e, t) {
    let n = t.min - e.min,
        r = t.max - e.max;
    return (
        t.max - t.min < e.max - e.min && ([n, r] = [r, n]), { min: n, max: r }
    );
}
function Hc(e, t) {
    return { x: Mr(e.x, t.x), y: Mr(e.y, t.y) };
}
function _c(e, t) {
    let n = 0.5;
    const r = ne(e),
        o = ne(t);
    return (
        o > r
            ? (n = rt(t.min, t.max - r, e.min))
            : r > o && (n = rt(e.min, e.max - o, t.min)),
        we(0, 1, n)
    );
}
function Kc(e, t) {
    const n = {};
    return (
        t.min !== void 0 && (n.min = t.min - e.min),
        t.max !== void 0 && (n.max = t.max - e.min),
        n
    );
}
const Pn = 0.35;
function Xc(e = Pn) {
    return (
        e === !1 ? (e = 0) : e === !0 && (e = Pn),
        { x: Rr(e, 'left', 'right'), y: Rr(e, 'top', 'bottom') }
    );
}
function Rr(e, t, n) {
    return { min: kr(e, t), max: kr(e, n) };
}
function kr(e, t) {
    return typeof e == 'number' ? e : e[t] || 0;
}
const Er = () => ({ translate: 0, scale: 1, origin: 0, originPoint: 0 }),
    Fe = () => ({ x: Er(), y: Er() }),
    Dr = () => ({ min: 0, max: 0 }),
    W = () => ({ x: Dr(), y: Dr() });
function ie(e) {
    return [e('x'), e('y')];
}
function Is({ top: e, left: t, right: n, bottom: r }) {
    return { x: { min: t, max: n }, y: { min: e, max: r } };
}
function Yc({ x: e, y: t }) {
    return { top: t.min, right: e.max, bottom: t.max, left: e.min };
}
function qc(e, t) {
    if (!t) return e;
    const n = t({ x: e.left, y: e.top }),
        r = t({ x: e.right, y: e.bottom });
    return { top: n.y, left: n.x, bottom: r.y, right: r.x };
}
function rn(e) {
    return e === void 0 || e === 1;
}
function Cn({ scale: e, scaleX: t, scaleY: n }) {
    return !rn(e) || !rn(t) || !rn(n);
}
function Ae(e) {
    return Cn(e) || js(e) || e.z || e.rotate || e.rotateX || e.rotateY;
}
function js(e) {
    return Lr(e.x) || Lr(e.y);
}
function Lr(e) {
    return e && e !== '0%';
}
function Lt(e, t, n) {
    const r = e - n,
        o = t * r;
    return n + o;
}
function Br(e, t, n, r, o) {
    return o !== void 0 && (e = Lt(e, o, r)), Lt(e, n, r) + t;
}
function Sn(e, t = 0, n = 1, r, o) {
    (e.min = Br(e.min, t, n, r, o)), (e.max = Br(e.max, t, n, r, o));
}
function Fs(e, { x: t, y: n }) {
    Sn(e.x, t.translate, t.scale, t.originPoint),
        Sn(e.y, n.translate, n.scale, n.originPoint);
}
function Zc(e, t, n, r = !1) {
    const o = n.length;
    if (!o) return;
    t.x = t.y = 1;
    let i, s;
    for (let a = 0; a < o; a++) {
        (i = n[a]), (s = i.projectionDelta);
        const c = i.instance;
        (c && c.style && c.style.display === 'contents') ||
            (r &&
                i.options.layoutScroll &&
                i.scroll &&
                i !== i.root &&
                Ne(e, { x: -i.scroll.offset.x, y: -i.scroll.offset.y }),
            s && ((t.x *= s.x.scale), (t.y *= s.y.scale), Fs(e, s)),
            r && Ae(i.latestValues) && Ne(e, i.latestValues));
    }
    (t.x = Or(t.x)), (t.y = Or(t.y));
}
function Or(e) {
    return Number.isInteger(e) || e > 1.0000000000001 || e < 0.999999999999
        ? e
        : 1;
}
function ye(e, t) {
    (e.min = e.min + t), (e.max = e.max + t);
}
function Ir(e, t, [n, r, o]) {
    const i = t[o] !== void 0 ? t[o] : 0.5,
        s = z(e.min, e.max, i);
    Sn(e, t[n], t[r], s, t.scale);
}
const Jc = ['x', 'scaleX', 'originX'],
    Qc = ['y', 'scaleY', 'originY'];
function Ne(e, t) {
    Ir(e.x, t, Jc), Ir(e.y, t, Qc);
}
function Ns(e, t) {
    return Is(qc(e.getBoundingClientRect(), t));
}
function eu(e, t, n) {
    const r = Ns(e, n),
        { scroll: o } = t;
    return o && (ye(r.x, o.offset.x), ye(r.y, o.offset.y)), r;
}
const tu = new WeakMap();
class nu {
    constructor(t) {
        (this.openGlobalLock = null),
            (this.isDragging = !1),
            (this.currentDirection = null),
            (this.originPoint = { x: 0, y: 0 }),
            (this.constraints = !1),
            (this.hasMutatedConstraints = !1),
            (this.elastic = W()),
            (this.visualElement = t);
    }
    start(t, { snapToCursor: n = !1 } = {}) {
        const { presenceContext: r } = this.visualElement;
        if (r && r.isPresent === !1) return;
        const o = (c) => {
                this.stopAnimation(),
                    n && this.snapToCursor(Gt(c, 'page').point);
            },
            i = (c, l) => {
                const {
                    drag: u,
                    dragPropagation: d,
                    onDragStart: f,
                } = this.getProps();
                if (
                    u &&
                    !d &&
                    (this.openGlobalLock && this.openGlobalLock(),
                    (this.openGlobalLock = Jo(u)),
                    !this.openGlobalLock)
                )
                    return;
                (this.isDragging = !0),
                    (this.currentDirection = null),
                    this.resolveConstraints(),
                    this.visualElement.projection &&
                        ((this.visualElement.projection.isAnimationBlocked =
                            !0),
                        (this.visualElement.projection.target = void 0)),
                    ie((p) => {
                        let m = this.getAxisMotionValue(p).get() || 0;
                        if (ae.test(m)) {
                            const { projection: b } = this.visualElement;
                            if (b && b.layout) {
                                const w = b.layout.layoutBox[p];
                                w && (m = ne(w) * (parseFloat(m) / 100));
                            }
                        }
                        this.originPoint[p] = m;
                    }),
                    f && $.update(() => f(c, l), !1, !0);
                const { animationState: h } = this.visualElement;
                h && h.setActive('whileDrag', !0);
            },
            s = (c, l) => {
                const {
                    dragPropagation: u,
                    dragDirectionLock: d,
                    onDirectionLock: f,
                    onDrag: h,
                } = this.getProps();
                if (!u && !this.openGlobalLock) return;
                const { offset: p } = l;
                if (d && this.currentDirection === null) {
                    (this.currentDirection = ru(p)),
                        this.currentDirection !== null &&
                            f &&
                            f(this.currentDirection);
                    return;
                }
                this.updateAxis('x', l.point, p),
                    this.updateAxis('y', l.point, p),
                    this.visualElement.render(),
                    h && h(c, l);
            },
            a = (c, l) => this.stop(c, l);
        this.panSession = new Bs(
            t,
            { onSessionStart: o, onStart: i, onMove: s, onSessionEnd: a },
            { transformPagePoint: this.visualElement.getTransformPagePoint() },
        );
    }
    stop(t, n) {
        const r = this.isDragging;
        if ((this.cancel(), !r)) return;
        const { velocity: o } = n;
        this.startAnimation(o);
        const { onDragEnd: i } = this.getProps();
        i && $.update(() => i(t, n));
    }
    cancel() {
        this.isDragging = !1;
        const { projection: t, animationState: n } = this.visualElement;
        t && (t.isAnimationBlocked = !1),
            this.panSession && this.panSession.end(),
            (this.panSession = void 0);
        const { dragPropagation: r } = this.getProps();
        !r &&
            this.openGlobalLock &&
            (this.openGlobalLock(), (this.openGlobalLock = null)),
            n && n.setActive('whileDrag', !1);
    }
    updateAxis(t, n, r) {
        const { drag: o } = this.getProps();
        if (!r || !mt(t, o, this.currentDirection)) return;
        const i = this.getAxisMotionValue(t);
        let s = this.originPoint[t] + r[t];
        this.constraints &&
            this.constraints[t] &&
            (s = Uc(s, this.constraints[t], this.elastic[t])),
            i.set(s);
    }
    resolveConstraints() {
        const { dragConstraints: t, dragElastic: n } = this.getProps(),
            { layout: r } = this.visualElement.projection || {},
            o = this.constraints;
        t && Ie(t)
            ? this.constraints ||
              (this.constraints = this.resolveRefConstraints())
            : t && r
            ? (this.constraints = Wc(r.layoutBox, t))
            : (this.constraints = !1),
            (this.elastic = Xc(n)),
            o !== this.constraints &&
                r &&
                this.constraints &&
                !this.hasMutatedConstraints &&
                ie((i) => {
                    this.getAxisMotionValue(i) &&
                        (this.constraints[i] = Kc(
                            r.layoutBox[i],
                            this.constraints[i],
                        ));
                });
    }
    resolveRefConstraints() {
        const { dragConstraints: t, onMeasureDragConstraints: n } =
            this.getProps();
        if (!t || !Ie(t)) return !1;
        const r = t.current,
            { projection: o } = this.visualElement;
        if (!o || !o.layout) return !1;
        const i = eu(r, o.root, this.visualElement.getTransformPagePoint());
        let s = Hc(o.layout.layoutBox, i);
        if (n) {
            const a = n(Yc(s));
            (this.hasMutatedConstraints = !!a), a && (s = Is(a));
        }
        return s;
    }
    startAnimation(t) {
        const {
                drag: n,
                dragMomentum: r,
                dragElastic: o,
                dragTransition: i,
                dragSnapToOrigin: s,
                onDragTransitionEnd: a,
            } = this.getProps(),
            c = this.constraints || {},
            l = ie((u) => {
                if (!mt(u, n, this.currentDirection)) return;
                let d = (c && c[u]) || {};
                s && (d = { min: 0, max: 0 });
                const f = o ? 200 : 1e6,
                    h = o ? 40 : 1e7,
                    p = {
                        type: 'inertia',
                        velocity: r ? t[u] : 0,
                        bounceStiffness: f,
                        bounceDamping: h,
                        timeConstant: 750,
                        restDelta: 1,
                        restSpeed: 10,
                        ...i,
                        ...d,
                    };
                return this.startAxisValueAnimation(u, p);
            });
        return Promise.all(l).then(a);
    }
    startAxisValueAnimation(t, n) {
        const r = this.getAxisMotionValue(t);
        return r.start(Hn(t, r, 0, n));
    }
    stopAnimation() {
        ie((t) => this.getAxisMotionValue(t).stop());
    }
    getAxisMotionValue(t) {
        const n = '_drag' + t.toUpperCase(),
            r = this.visualElement.getProps(),
            o = r[n];
        return (
            o ||
            this.visualElement.getValue(
                t,
                (r.initial ? r.initial[t] : void 0) || 0,
            )
        );
    }
    snapToCursor(t) {
        ie((n) => {
            const { drag: r } = this.getProps();
            if (!mt(n, r, this.currentDirection)) return;
            const { projection: o } = this.visualElement,
                i = this.getAxisMotionValue(n);
            if (o && o.layout) {
                const { min: s, max: a } = o.layout.layoutBox[n];
                i.set(t[n] - z(s, a, 0.5));
            }
        });
    }
    scalePositionWithinConstraints() {
        if (!this.visualElement.current) return;
        const { drag: t, dragConstraints: n } = this.getProps(),
            { projection: r } = this.visualElement;
        if (!Ie(n) || !r || !this.constraints) return;
        this.stopAnimation();
        const o = { x: 0, y: 0 };
        ie((s) => {
            const a = this.getAxisMotionValue(s);
            if (a) {
                const c = a.get();
                o[s] = _c({ min: c, max: c }, this.constraints[s]);
            }
        });
        const { transformTemplate: i } = this.visualElement.getProps();
        (this.visualElement.current.style.transform = i ? i({}, '') : 'none'),
            r.root && r.root.updateScroll(),
            r.updateLayout(),
            this.resolveConstraints(),
            ie((s) => {
                if (!mt(s, t, null)) return;
                const a = this.getAxisMotionValue(s),
                    { min: c, max: l } = this.constraints[s];
                a.set(z(c, l, o[s]));
            });
    }
    addListeners() {
        if (!this.visualElement.current) return;
        tu.set(this.visualElement, this);
        const t = this.visualElement.current,
            n = fe(t, 'pointerdown', (c) => {
                const { drag: l, dragListener: u = !0 } = this.getProps();
                l && u && this.start(c);
            }),
            r = () => {
                const { dragConstraints: c } = this.getProps();
                Ie(c) && (this.constraints = this.resolveRefConstraints());
            },
            { projection: o } = this.visualElement,
            i = o.addEventListener('measure', r);
        o && !o.layout && (o.root && o.root.updateScroll(), o.updateLayout()),
            r();
        const s = de(window, 'resize', () =>
                this.scalePositionWithinConstraints(),
            ),
            a = o.addEventListener(
                'didUpdate',
                ({ delta: c, hasLayoutChanged: l }) => {
                    this.isDragging &&
                        l &&
                        (ie((u) => {
                            const d = this.getAxisMotionValue(u);
                            d &&
                                ((this.originPoint[u] += c[u].translate),
                                d.set(d.get() + c[u].translate));
                        }),
                        this.visualElement.render());
                },
            );
        return () => {
            s(), n(), i(), a && a();
        };
    }
    getProps() {
        const t = this.visualElement.getProps(),
            {
                drag: n = !1,
                dragDirectionLock: r = !1,
                dragPropagation: o = !1,
                dragConstraints: i = !1,
                dragElastic: s = Pn,
                dragMomentum: a = !0,
            } = t;
        return {
            ...t,
            drag: n,
            dragDirectionLock: r,
            dragPropagation: o,
            dragConstraints: i,
            dragElastic: s,
            dragMomentum: a,
        };
    }
}
function mt(e, t, n) {
    return (t === !0 || t === e) && (n === null || n === e);
}
function ru(e, t = 10) {
    let n = null;
    return Math.abs(e.y) > t ? (n = 'y') : Math.abs(e.x) > t && (n = 'x'), n;
}
class ou extends Ce {
    constructor(t) {
        super(t),
            (this.removeGroupControls = G),
            (this.removeListeners = G),
            (this.controls = new nu(t));
    }
    mount() {
        const { dragControls: t } = this.node.getProps();
        t && (this.removeGroupControls = t.subscribe(this.controls)),
            (this.removeListeners = this.controls.addListeners() || G);
    }
    unmount() {
        this.removeGroupControls(), this.removeListeners();
    }
}
const jr = (e) => (t, n) => {
    e && $.update(() => e(t, n));
};
class su extends Ce {
    constructor() {
        super(...arguments), (this.removePointerDownListener = G);
    }
    onPointerDown(t) {
        this.session = new Bs(t, this.createPanHandlers(), {
            transformPagePoint: this.node.getTransformPagePoint(),
        });
    }
    createPanHandlers() {
        const {
            onPanSessionStart: t,
            onPanStart: n,
            onPan: r,
            onPanEnd: o,
        } = this.node.getProps();
        return {
            onSessionStart: jr(t),
            onStart: jr(n),
            onMove: r,
            onEnd: (i, s) => {
                delete this.session, o && $.update(() => o(i, s));
            },
        };
    }
    mount() {
        this.removePointerDownListener = fe(
            this.node.current,
            'pointerdown',
            (t) => this.onPointerDown(t),
        );
    }
    update() {
        this.session && this.session.updateHandlers(this.createPanHandlers());
    }
    unmount() {
        this.removePointerDownListener(), this.session && this.session.end();
    }
}
function iu() {
    const e = g.useContext(jt);
    if (e === null) return [!0, null];
    const { isPresent: t, onExitComplete: n, register: r } = e,
        o = g.useId();
    return g.useEffect(() => r(o), []), !t && n ? [!1, () => n && n(o)] : [!0];
}
const bt = { hasAnimatedSinceResize: !0, hasEverUpdated: !1 };
function Fr(e, t) {
    return t.max === t.min ? 0 : (e / (t.max - t.min)) * 100;
}
const Ye = {
        correct: (e, t) => {
            if (!t.target) return e;
            if (typeof e == 'string')
                if (A.test(e)) e = parseFloat(e);
                else return e;
            const n = Fr(e, t.target.x),
                r = Fr(e, t.target.y);
            return `${n}% ${r}%`;
        },
    },
    au = {
        correct: (e, { treeScale: t, projectionDelta: n }) => {
            const r = e,
                o = Pe.parse(e);
            if (o.length > 5) return r;
            const i = Pe.createTransformer(e),
                s = typeof o[0] != 'number' ? 1 : 0,
                a = n.x.scale * t.x,
                c = n.y.scale * t.y;
            (o[0 + s] /= a), (o[1 + s] /= c);
            const l = z(a, c, 0.5);
            return (
                typeof o[2 + s] == 'number' && (o[2 + s] /= l),
                typeof o[3 + s] == 'number' && (o[3 + s] /= l),
                i(o)
            );
        },
    };
class lu extends go.Component {
    componentDidMount() {
        const {
                visualElement: t,
                layoutGroup: n,
                switchLayoutGroup: r,
                layoutId: o,
            } = this.props,
            { projection: i } = t;
        ma(cu),
            i &&
                (n.group && n.group.add(i),
                r && r.register && o && r.register(i),
                i.root.didUpdate(),
                i.addEventListener('animationComplete', () => {
                    this.safeToRemove();
                }),
                i.setOptions({
                    ...i.options,
                    onExitComplete: () => this.safeToRemove(),
                })),
            (bt.hasEverUpdated = !0);
    }
    getSnapshotBeforeUpdate(t) {
        const {
                layoutDependency: n,
                visualElement: r,
                drag: o,
                isPresent: i,
            } = this.props,
            s = r.projection;
        return (
            s &&
                ((s.isPresent = i),
                o || t.layoutDependency !== n || n === void 0
                    ? s.willUpdate()
                    : this.safeToRemove(),
                t.isPresent !== i &&
                    (i
                        ? s.promote()
                        : s.relegate() ||
                          $.postRender(() => {
                              const a = s.getStack();
                              (!a || !a.members.length) && this.safeToRemove();
                          }))),
            null
        );
    }
    componentDidUpdate() {
        const { projection: t } = this.props.visualElement;
        t &&
            (t.root.didUpdate(),
            queueMicrotask(() => {
                !t.currentAnimation && t.isLead() && this.safeToRemove();
            }));
    }
    componentWillUnmount() {
        const {
                visualElement: t,
                layoutGroup: n,
                switchLayoutGroup: r,
            } = this.props,
            { projection: o } = t;
        o &&
            (o.scheduleCheckAfterUnmount(),
            n && n.group && n.group.remove(o),
            r && r.deregister && r.deregister(o));
    }
    safeToRemove() {
        const { safeToRemove: t } = this.props;
        t && t();
    }
    render() {
        return null;
    }
}
function $s(e) {
    const [t, n] = iu(),
        r = g.useContext(En);
    return go.createElement(lu, {
        ...e,
        layoutGroup: r,
        switchLayoutGroup: g.useContext(Oo),
        isPresent: t,
        safeToRemove: n,
    });
}
const cu = {
        borderRadius: {
            ...Ye,
            applyTo: [
                'borderTopLeftRadius',
                'borderTopRightRadius',
                'borderBottomLeftRadius',
                'borderBottomRightRadius',
            ],
        },
        borderTopLeftRadius: Ye,
        borderTopRightRadius: Ye,
        borderBottomLeftRadius: Ye,
        borderBottomRightRadius: Ye,
        boxShadow: au,
    },
    zs = ['TopLeft', 'TopRight', 'BottomLeft', 'BottomRight'],
    uu = zs.length,
    Nr = (e) => (typeof e == 'string' ? parseFloat(e) : e),
    $r = (e) => typeof e == 'number' || A.test(e);
function du(e, t, n, r, o, i) {
    o
        ? ((e.opacity = z(0, n.opacity !== void 0 ? n.opacity : 1, fu(r))),
          (e.opacityExit = z(t.opacity !== void 0 ? t.opacity : 1, 0, hu(r))))
        : i &&
          (e.opacity = z(
              t.opacity !== void 0 ? t.opacity : 1,
              n.opacity !== void 0 ? n.opacity : 1,
              r,
          ));
    for (let s = 0; s < uu; s++) {
        const a = `border${zs[s]}Radius`;
        let c = zr(t, a),
            l = zr(n, a);
        if (c === void 0 && l === void 0) continue;
        c || (c = 0),
            l || (l = 0),
            c === 0 || l === 0 || $r(c) === $r(l)
                ? ((e[a] = Math.max(z(Nr(c), Nr(l), r), 0)),
                  (ae.test(l) || ae.test(c)) && (e[a] += '%'))
                : (e[a] = l);
    }
    (t.rotate || n.rotate) && (e.rotate = z(t.rotate || 0, n.rotate || 0, r));
}
function zr(e, t) {
    return e[t] !== void 0 ? e[t] : e.borderRadius;
}
const fu = Gs(0, 0.5, zn),
    hu = Gs(0.5, 0.95, G);
function Gs(e, t, n) {
    return (r) => (r < e ? 0 : r > t ? 1 : n(rt(e, t, r)));
}
function Gr(e, t) {
    (e.min = t.min), (e.max = t.max);
}
function re(e, t) {
    Gr(e.x, t.x), Gr(e.y, t.y);
}
function Ur(e, t, n, r, o) {
    return (
        (e -= t),
        (e = Lt(e, 1 / n, r)),
        o !== void 0 && (e = Lt(e, 1 / o, r)),
        e
    );
}
function pu(e, t = 0, n = 1, r = 0.5, o, i = e, s = e) {
    if (
        (ae.test(t) &&
            ((t = parseFloat(t)), (t = z(s.min, s.max, t / 100) - s.min)),
        typeof t != 'number')
    )
        return;
    let a = z(i.min, i.max, r);
    e === i && (a -= t),
        (e.min = Ur(e.min, t, n, a, o)),
        (e.max = Ur(e.max, t, n, a, o));
}
function Wr(e, t, [n, r, o], i, s) {
    pu(e, t[n], t[r], t[o], t.scale, i, s);
}
const mu = ['x', 'scaleX', 'originX'],
    gu = ['y', 'scaleY', 'originY'];
function Hr(e, t, n, r) {
    Wr(e.x, t, mu, n ? n.x : void 0, r ? r.x : void 0),
        Wr(e.y, t, gu, n ? n.y : void 0, r ? r.y : void 0);
}
function _r(e) {
    return e.translate === 0 && e.scale === 1;
}
function Us(e) {
    return _r(e.x) && _r(e.y);
}
function yu(e, t) {
    return (
        e.x.min === t.x.min &&
        e.x.max === t.x.max &&
        e.y.min === t.y.min &&
        e.y.max === t.y.max
    );
}
function Ws(e, t) {
    return (
        Math.round(e.x.min) === Math.round(t.x.min) &&
        Math.round(e.x.max) === Math.round(t.x.max) &&
        Math.round(e.y.min) === Math.round(t.y.min) &&
        Math.round(e.y.max) === Math.round(t.y.max)
    );
}
function Kr(e) {
    return ne(e.x) / ne(e.y);
}
class vu {
    constructor() {
        this.members = [];
    }
    add(t) {
        _n(this.members, t), t.scheduleRender();
    }
    remove(t) {
        if (
            (Kn(this.members, t),
            t === this.prevLead && (this.prevLead = void 0),
            t === this.lead)
        ) {
            const n = this.members[this.members.length - 1];
            n && this.promote(n);
        }
    }
    relegate(t) {
        const n = this.members.findIndex((o) => t === o);
        if (n === 0) return !1;
        let r;
        for (let o = n; o >= 0; o--) {
            const i = this.members[o];
            if (i.isPresent !== !1) {
                r = i;
                break;
            }
        }
        return r ? (this.promote(r), !0) : !1;
    }
    promote(t, n) {
        const r = this.lead;
        if (t !== r && ((this.prevLead = r), (this.lead = t), t.show(), r)) {
            r.instance && r.scheduleRender(),
                t.scheduleRender(),
                (t.resumeFrom = r),
                n && (t.resumeFrom.preserveOpacity = !0),
                r.snapshot &&
                    ((t.snapshot = r.snapshot),
                    (t.snapshot.latestValues =
                        r.animationValues || r.latestValues)),
                t.root && t.root.isUpdating && (t.isLayoutDirty = !0);
            const { crossfade: o } = t.options;
            o === !1 && r.hide();
        }
    }
    exitAnimationComplete() {
        this.members.forEach((t) => {
            const { options: n, resumingFrom: r } = t;
            n.onExitComplete && n.onExitComplete(),
                r && r.options.onExitComplete && r.options.onExitComplete();
        });
    }
    scheduleRender() {
        this.members.forEach((t) => {
            t.instance && t.scheduleRender(!1);
        });
    }
    removeLeadSnapshot() {
        this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
    }
}
function Xr(e, t, n) {
    let r = '';
    const o = e.x.translate / t.x,
        i = e.y.translate / t.y;
    if (
        ((o || i) && (r = `translate3d(${o}px, ${i}px, 0) `),
        (t.x !== 1 || t.y !== 1) && (r += `scale(${1 / t.x}, ${1 / t.y}) `),
        n)
    ) {
        const { rotate: c, rotateX: l, rotateY: u } = n;
        c && (r += `rotate(${c}deg) `),
            l && (r += `rotateX(${l}deg) `),
            u && (r += `rotateY(${u}deg) `);
    }
    const s = e.x.scale * t.x,
        a = e.y.scale * t.y;
    return (s !== 1 || a !== 1) && (r += `scale(${s}, ${a})`), r || 'none';
}
const bu = (e, t) => e.depth - t.depth;
class xu {
    constructor() {
        (this.children = []), (this.isDirty = !1);
    }
    add(t) {
        _n(this.children, t), (this.isDirty = !0);
    }
    remove(t) {
        Kn(this.children, t), (this.isDirty = !0);
    }
    forEach(t) {
        this.isDirty && this.children.sort(bu),
            (this.isDirty = !1),
            this.children.forEach(t);
    }
}
function wu(e, t) {
    const n = performance.now(),
        r = ({ timestamp: o }) => {
            const i = o - n;
            i >= t && (pe(r), e(i - t));
        };
    return $.read(r, !0), () => pe(r);
}
function Pu(e) {
    window.MotionDebug && window.MotionDebug.record(e);
}
function Cu(e) {
    return e instanceof SVGElement && e.tagName !== 'svg';
}
function Su(e, t, n) {
    const r = ee(e) ? e : ze(e);
    return r.start(Hn('', r, t, n)), r.animation;
}
const Yr = ['', 'X', 'Y', 'Z'],
    qr = 1e3;
let Tu = 0;
const Ve = {
    type: 'projectionFrame',
    totalNodes: 0,
    resolvedTargetDeltas: 0,
    recalculatedProjection: 0,
};
function Hs({
    attachResizeListener: e,
    defaultParent: t,
    measureScroll: n,
    checkIsScrollRoot: r,
    resetTransform: o,
}) {
    return class {
        constructor(s = {}, a = t == null ? void 0 : t()) {
            (this.id = Tu++),
                (this.animationId = 0),
                (this.children = new Set()),
                (this.options = {}),
                (this.isTreeAnimating = !1),
                (this.isAnimationBlocked = !1),
                (this.isLayoutDirty = !1),
                (this.isProjectionDirty = !1),
                (this.isSharedProjectionDirty = !1),
                (this.isTransformDirty = !1),
                (this.updateManuallyBlocked = !1),
                (this.updateBlockedByResize = !1),
                (this.isUpdating = !1),
                (this.isSVG = !1),
                (this.needsReset = !1),
                (this.shouldResetTransform = !1),
                (this.treeScale = { x: 1, y: 1 }),
                (this.eventHandlers = new Map()),
                (this.hasTreeAnimated = !1),
                (this.updateScheduled = !1),
                (this.checkUpdateFailed = () => {
                    this.isUpdating &&
                        ((this.isUpdating = !1), this.clearAllSnapshots());
                }),
                (this.updateProjection = () => {
                    (Ve.totalNodes =
                        Ve.resolvedTargetDeltas =
                        Ve.recalculatedProjection =
                            0),
                        this.nodes.forEach(Mu),
                        this.nodes.forEach(Lu),
                        this.nodes.forEach(Bu),
                        this.nodes.forEach(Ru),
                        Pu(Ve);
                }),
                (this.hasProjected = !1),
                (this.isVisible = !0),
                (this.animationProgress = 0),
                (this.sharedNodes = new Map()),
                (this.latestValues = s),
                (this.root = a ? a.root || a : this),
                (this.path = a ? [...a.path, a] : []),
                (this.parent = a),
                (this.depth = a ? a.depth + 1 : 0);
            for (let c = 0; c < this.path.length; c++)
                this.path[c].shouldResetTransform = !0;
            this.root === this && (this.nodes = new xu());
        }
        addEventListener(s, a) {
            return (
                this.eventHandlers.has(s) ||
                    this.eventHandlers.set(s, new Xn()),
                this.eventHandlers.get(s).add(a)
            );
        }
        notifyListeners(s, ...a) {
            const c = this.eventHandlers.get(s);
            c && c.notify(...a);
        }
        hasListeners(s) {
            return this.eventHandlers.has(s);
        }
        mount(s, a = this.root.hasTreeAnimated) {
            if (this.instance) return;
            (this.isSVG = Cu(s)), (this.instance = s);
            const { layoutId: c, layout: l, visualElement: u } = this.options;
            if (
                (u && !u.current && u.mount(s),
                this.root.nodes.add(this),
                this.parent && this.parent.children.add(this),
                a && (l || c) && (this.isLayoutDirty = !0),
                e)
            ) {
                let d;
                const f = () => (this.root.updateBlockedByResize = !1);
                e(s, () => {
                    (this.root.updateBlockedByResize = !0),
                        d && d(),
                        (d = wu(f, 250)),
                        bt.hasAnimatedSinceResize &&
                            ((bt.hasAnimatedSinceResize = !1),
                            this.nodes.forEach(Jr));
                });
            }
            c && this.root.registerSharedNode(c, this),
                this.options.animate !== !1 &&
                    u &&
                    (c || l) &&
                    this.addEventListener(
                        'didUpdate',
                        ({
                            delta: d,
                            hasLayoutChanged: f,
                            hasRelativeTargetChanged: h,
                            layout: p,
                        }) => {
                            if (this.isTreeAnimationBlocked()) {
                                (this.target = void 0),
                                    (this.relativeTarget = void 0);
                                return;
                            }
                            const m =
                                    this.options.transition ||
                                    u.getDefaultTransition() ||
                                    Nu,
                                {
                                    onLayoutAnimationStart: b,
                                    onLayoutAnimationComplete: w,
                                } = u.getProps(),
                                y =
                                    !this.targetLayout ||
                                    !Ws(this.targetLayout, p) ||
                                    h,
                                v = !f && h;
                            if (
                                this.options.layoutRoot ||
                                (this.resumeFrom && this.resumeFrom.instance) ||
                                v ||
                                (f && (y || !this.currentAnimation))
                            ) {
                                this.resumeFrom &&
                                    ((this.resumingFrom = this.resumeFrom),
                                    (this.resumingFrom.resumingFrom = void 0)),
                                    this.setAnimationOrigin(d, v);
                                const x = {
                                    ...Rs(m, 'layout'),
                                    onPlay: b,
                                    onComplete: w,
                                };
                                (u.shouldReduceMotion ||
                                    this.options.layoutRoot) &&
                                    ((x.delay = 0), (x.type = !1)),
                                    this.startAnimation(x);
                            } else
                                f || Jr(this),
                                    this.isLead() &&
                                        this.options.onExitComplete &&
                                        this.options.onExitComplete();
                            this.targetLayout = p;
                        },
                    );
        }
        unmount() {
            this.options.layoutId && this.willUpdate(),
                this.root.nodes.remove(this);
            const s = this.getStack();
            s && s.remove(this),
                this.parent && this.parent.children.delete(this),
                (this.instance = void 0),
                pe(this.updateProjection);
        }
        blockUpdate() {
            this.updateManuallyBlocked = !0;
        }
        unblockUpdate() {
            this.updateManuallyBlocked = !1;
        }
        isUpdateBlocked() {
            return this.updateManuallyBlocked || this.updateBlockedByResize;
        }
        isTreeAnimationBlocked() {
            return (
                this.isAnimationBlocked ||
                (this.parent && this.parent.isTreeAnimationBlocked()) ||
                !1
            );
        }
        startUpdate() {
            this.isUpdateBlocked() ||
                ((this.isUpdating = !0),
                this.nodes && this.nodes.forEach(Ou),
                this.animationId++);
        }
        getTransformTemplate() {
            const { visualElement: s } = this.options;
            return s && s.getProps().transformTemplate;
        }
        willUpdate(s = !0) {
            if (
                ((this.root.hasTreeAnimated = !0), this.root.isUpdateBlocked())
            ) {
                this.options.onExitComplete && this.options.onExitComplete();
                return;
            }
            if (
                (!this.root.isUpdating && this.root.startUpdate(),
                this.isLayoutDirty)
            )
                return;
            this.isLayoutDirty = !0;
            for (let u = 0; u < this.path.length; u++) {
                const d = this.path[u];
                (d.shouldResetTransform = !0),
                    d.updateScroll('snapshot'),
                    d.options.layoutRoot && d.willUpdate(!1);
            }
            const { layoutId: a, layout: c } = this.options;
            if (a === void 0 && !c) return;
            const l = this.getTransformTemplate();
            (this.prevTransformTemplateValue = l
                ? l(this.latestValues, '')
                : void 0),
                this.updateSnapshot(),
                s && this.notifyListeners('willUpdate');
        }
        update() {
            if (((this.updateScheduled = !1), this.isUpdateBlocked())) {
                this.unblockUpdate(),
                    this.clearAllSnapshots(),
                    this.nodes.forEach(Zr);
                return;
            }
            this.isUpdating || this.nodes.forEach(Eu),
                (this.isUpdating = !1),
                this.nodes.forEach(Du),
                this.nodes.forEach(Au),
                this.nodes.forEach(Vu),
                this.clearAllSnapshots();
            const a = performance.now();
            (q.delta = we(0, 1e3 / 60, a - q.timestamp)),
                (q.timestamp = a),
                (q.isProcessing = !0),
                Kt.update.process(q),
                Kt.preRender.process(q),
                Kt.render.process(q),
                (q.isProcessing = !1);
        }
        didUpdate() {
            this.updateScheduled ||
                ((this.updateScheduled = !0),
                queueMicrotask(() => this.update()));
        }
        clearAllSnapshots() {
            this.nodes.forEach(ku), this.sharedNodes.forEach(Iu);
        }
        scheduleUpdateProjection() {
            $.preRender(this.updateProjection, !1, !0);
        }
        scheduleCheckAfterUnmount() {
            $.postRender(() => {
                this.isLayoutDirty
                    ? this.root.didUpdate()
                    : this.root.checkUpdateFailed();
            });
        }
        updateSnapshot() {
            this.snapshot || !this.instance || (this.snapshot = this.measure());
        }
        updateLayout() {
            if (
                !this.instance ||
                (this.updateScroll(),
                !(this.options.alwaysMeasureLayout && this.isLead()) &&
                    !this.isLayoutDirty)
            )
                return;
            if (this.resumeFrom && !this.resumeFrom.instance)
                for (let c = 0; c < this.path.length; c++)
                    this.path[c].updateScroll();
            const s = this.layout;
            (this.layout = this.measure(!1)),
                (this.layoutCorrected = W()),
                (this.isLayoutDirty = !1),
                (this.projectionDelta = void 0),
                this.notifyListeners('measure', this.layout.layoutBox);
            const { visualElement: a } = this.options;
            a &&
                a.notify(
                    'LayoutMeasure',
                    this.layout.layoutBox,
                    s ? s.layoutBox : void 0,
                );
        }
        updateScroll(s = 'measure') {
            let a = !!(this.options.layoutScroll && this.instance);
            this.scroll &&
                this.scroll.animationId === this.root.animationId &&
                this.scroll.phase === s &&
                (a = !1),
                a &&
                    (this.scroll = {
                        animationId: this.root.animationId,
                        phase: s,
                        isRoot: r(this.instance),
                        offset: n(this.instance),
                    });
        }
        resetTransform() {
            if (!o) return;
            const s = this.isLayoutDirty || this.shouldResetTransform,
                a = this.projectionDelta && !Us(this.projectionDelta),
                c = this.getTransformTemplate(),
                l = c ? c(this.latestValues, '') : void 0,
                u = l !== this.prevTransformTemplateValue;
            s &&
                (a || Ae(this.latestValues) || u) &&
                (o(this.instance, l),
                (this.shouldResetTransform = !1),
                this.scheduleRender());
        }
        measure(s = !0) {
            const a = this.measurePageBox();
            let c = this.removeElementScroll(a);
            return (
                s && (c = this.removeTransform(c)),
                $u(c),
                {
                    animationId: this.root.animationId,
                    measuredBox: a,
                    layoutBox: c,
                    latestValues: {},
                    source: this.id,
                }
            );
        }
        measurePageBox() {
            const { visualElement: s } = this.options;
            if (!s) return W();
            const a = s.measureViewportBox(),
                { scroll: c } = this.root;
            return c && (ye(a.x, c.offset.x), ye(a.y, c.offset.y)), a;
        }
        removeElementScroll(s) {
            const a = W();
            re(a, s);
            for (let c = 0; c < this.path.length; c++) {
                const l = this.path[c],
                    { scroll: u, options: d } = l;
                if (l !== this.root && u && d.layoutScroll) {
                    if (u.isRoot) {
                        re(a, s);
                        const { scroll: f } = this.root;
                        f && (ye(a.x, -f.offset.x), ye(a.y, -f.offset.y));
                    }
                    ye(a.x, u.offset.x), ye(a.y, u.offset.y);
                }
            }
            return a;
        }
        applyTransform(s, a = !1) {
            const c = W();
            re(c, s);
            for (let l = 0; l < this.path.length; l++) {
                const u = this.path[l];
                !a &&
                    u.options.layoutScroll &&
                    u.scroll &&
                    u !== u.root &&
                    Ne(c, { x: -u.scroll.offset.x, y: -u.scroll.offset.y }),
                    Ae(u.latestValues) && Ne(c, u.latestValues);
            }
            return Ae(this.latestValues) && Ne(c, this.latestValues), c;
        }
        removeTransform(s) {
            const a = W();
            re(a, s);
            for (let c = 0; c < this.path.length; c++) {
                const l = this.path[c];
                if (!l.instance || !Ae(l.latestValues)) continue;
                Cn(l.latestValues) && l.updateSnapshot();
                const u = W(),
                    d = l.measurePageBox();
                re(u, d),
                    Hr(
                        a,
                        l.latestValues,
                        l.snapshot ? l.snapshot.layoutBox : void 0,
                        u,
                    );
            }
            return Ae(this.latestValues) && Hr(a, this.latestValues), a;
        }
        setTargetDelta(s) {
            (this.targetDelta = s),
                this.root.scheduleUpdateProjection(),
                (this.isProjectionDirty = !0);
        }
        setOptions(s) {
            this.options = {
                ...this.options,
                ...s,
                crossfade: s.crossfade !== void 0 ? s.crossfade : !0,
            };
        }
        clearMeasurements() {
            (this.scroll = void 0),
                (this.layout = void 0),
                (this.snapshot = void 0),
                (this.prevTransformTemplateValue = void 0),
                (this.targetDelta = void 0),
                (this.target = void 0),
                (this.isLayoutDirty = !1);
        }
        forceRelativeParentToResolveTarget() {
            this.relativeParent &&
                this.relativeParent.resolvedRelativeTargetAt !== q.timestamp &&
                this.relativeParent.resolveTargetDelta(!0);
        }
        resolveTargetDelta(s = !1) {
            var a;
            const c = this.getLead();
            this.isProjectionDirty ||
                (this.isProjectionDirty = c.isProjectionDirty),
                this.isTransformDirty ||
                    (this.isTransformDirty = c.isTransformDirty),
                this.isSharedProjectionDirty ||
                    (this.isSharedProjectionDirty = c.isSharedProjectionDirty);
            const l = !!this.resumingFrom || this !== c;
            if (
                !(
                    s ||
                    (l && this.isSharedProjectionDirty) ||
                    this.isProjectionDirty ||
                    (!((a = this.parent) === null || a === void 0) &&
                        a.isProjectionDirty) ||
                    this.attemptToResolveRelativeTarget
                )
            )
                return;
            const { layout: d, layoutId: f } = this.options;
            if (!(!this.layout || !(d || f))) {
                if (
                    ((this.resolvedRelativeTargetAt = q.timestamp),
                    !this.targetDelta && !this.relativeTarget)
                ) {
                    const h = this.getClosestProjectingParent();
                    h && h.layout && this.animationProgress !== 1
                        ? ((this.relativeParent = h),
                          this.forceRelativeParentToResolveTarget(),
                          (this.relativeTarget = W()),
                          (this.relativeTargetOrigin = W()),
                          et(
                              this.relativeTargetOrigin,
                              this.layout.layoutBox,
                              h.layout.layoutBox,
                          ),
                          re(this.relativeTarget, this.relativeTargetOrigin))
                        : (this.relativeParent = this.relativeTarget = void 0);
                }
                if (!(!this.relativeTarget && !this.targetDelta)) {
                    if (
                        (this.target ||
                            ((this.target = W()),
                            (this.targetWithTransforms = W())),
                        this.relativeTarget &&
                        this.relativeTargetOrigin &&
                        this.relativeParent &&
                        this.relativeParent.target
                            ? (this.forceRelativeParentToResolveTarget(),
                              Gc(
                                  this.target,
                                  this.relativeTarget,
                                  this.relativeParent.target,
                              ))
                            : this.targetDelta
                            ? (this.resumingFrom
                                  ? (this.target = this.applyTransform(
                                        this.layout.layoutBox,
                                    ))
                                  : re(this.target, this.layout.layoutBox),
                              Fs(this.target, this.targetDelta))
                            : re(this.target, this.layout.layoutBox),
                        this.attemptToResolveRelativeTarget)
                    ) {
                        this.attemptToResolveRelativeTarget = !1;
                        const h = this.getClosestProjectingParent();
                        h &&
                        !!h.resumingFrom == !!this.resumingFrom &&
                        !h.options.layoutScroll &&
                        h.target &&
                        this.animationProgress !== 1
                            ? ((this.relativeParent = h),
                              this.forceRelativeParentToResolveTarget(),
                              (this.relativeTarget = W()),
                              (this.relativeTargetOrigin = W()),
                              et(
                                  this.relativeTargetOrigin,
                                  this.target,
                                  h.target,
                              ),
                              re(
                                  this.relativeTarget,
                                  this.relativeTargetOrigin,
                              ))
                            : (this.relativeParent = this.relativeTarget =
                                  void 0);
                    }
                    Ve.resolvedTargetDeltas++;
                }
            }
        }
        getClosestProjectingParent() {
            if (
                !(
                    !this.parent ||
                    Cn(this.parent.latestValues) ||
                    js(this.parent.latestValues)
                )
            )
                return this.parent.isProjecting()
                    ? this.parent
                    : this.parent.getClosestProjectingParent();
        }
        isProjecting() {
            return !!(
                (this.relativeTarget ||
                    this.targetDelta ||
                    this.options.layoutRoot) &&
                this.layout
            );
        }
        calcProjection() {
            var s;
            const a = this.getLead(),
                c = !!this.resumingFrom || this !== a;
            let l = !0;
            if (
                ((this.isProjectionDirty ||
                    (!((s = this.parent) === null || s === void 0) &&
                        s.isProjectionDirty)) &&
                    (l = !1),
                c &&
                    (this.isSharedProjectionDirty || this.isTransformDirty) &&
                    (l = !1),
                this.resolvedRelativeTargetAt === q.timestamp && (l = !1),
                l)
            )
                return;
            const { layout: u, layoutId: d } = this.options;
            if (
                ((this.isTreeAnimating = !!(
                    (this.parent && this.parent.isTreeAnimating) ||
                    this.currentAnimation ||
                    this.pendingAnimation
                )),
                this.isTreeAnimating ||
                    (this.targetDelta = this.relativeTarget = void 0),
                !this.layout || !(u || d))
            )
                return;
            re(this.layoutCorrected, this.layout.layoutBox);
            const f = this.treeScale.x,
                h = this.treeScale.y;
            Zc(this.layoutCorrected, this.treeScale, this.path, c),
                a.layout &&
                    !a.target &&
                    (this.treeScale.x !== 1 || this.treeScale.y !== 1) &&
                    (a.target = a.layout.layoutBox);
            const { target: p } = a;
            if (!p) {
                this.projectionTransform &&
                    ((this.projectionDelta = Fe()),
                    (this.projectionTransform = 'none'),
                    this.scheduleRender());
                return;
            }
            this.projectionDelta ||
                ((this.projectionDelta = Fe()),
                (this.projectionDeltaWithTransform = Fe()));
            const m = this.projectionTransform;
            Qe(
                this.projectionDelta,
                this.layoutCorrected,
                p,
                this.latestValues,
            ),
                (this.projectionTransform = Xr(
                    this.projectionDelta,
                    this.treeScale,
                )),
                (this.projectionTransform !== m ||
                    this.treeScale.x !== f ||
                    this.treeScale.y !== h) &&
                    ((this.hasProjected = !0),
                    this.scheduleRender(),
                    this.notifyListeners('projectionUpdate', p)),
                Ve.recalculatedProjection++;
        }
        hide() {
            this.isVisible = !1;
        }
        show() {
            this.isVisible = !0;
        }
        scheduleRender(s = !0) {
            if (
                (this.options.scheduleRender && this.options.scheduleRender(),
                s)
            ) {
                const a = this.getStack();
                a && a.scheduleRender();
            }
            this.resumingFrom &&
                !this.resumingFrom.instance &&
                (this.resumingFrom = void 0);
        }
        setAnimationOrigin(s, a = !1) {
            const c = this.snapshot,
                l = c ? c.latestValues : {},
                u = { ...this.latestValues },
                d = Fe();
            (!this.relativeParent || !this.relativeParent.options.layoutRoot) &&
                (this.relativeTarget = this.relativeTargetOrigin = void 0),
                (this.attemptToResolveRelativeTarget = !a);
            const f = W(),
                h = c ? c.source : void 0,
                p = this.layout ? this.layout.source : void 0,
                m = h !== p,
                b = this.getStack(),
                w = !b || b.members.length <= 1,
                y = !!(
                    m &&
                    !w &&
                    this.options.crossfade === !0 &&
                    !this.path.some(Fu)
                );
            this.animationProgress = 0;
            let v;
            (this.mixTargetDelta = (x) => {
                const P = x / 1e3;
                Qr(d.x, s.x, P),
                    Qr(d.y, s.y, P),
                    this.setTargetDelta(d),
                    this.relativeTarget &&
                        this.relativeTargetOrigin &&
                        this.layout &&
                        this.relativeParent &&
                        this.relativeParent.layout &&
                        (et(
                            f,
                            this.layout.layoutBox,
                            this.relativeParent.layout.layoutBox,
                        ),
                        ju(
                            this.relativeTarget,
                            this.relativeTargetOrigin,
                            f,
                            P,
                        ),
                        v &&
                            yu(this.relativeTarget, v) &&
                            (this.isProjectionDirty = !1),
                        v || (v = W()),
                        re(v, this.relativeTarget)),
                    m &&
                        ((this.animationValues = u),
                        du(u, l, this.latestValues, P, y, w)),
                    this.root.scheduleUpdateProjection(),
                    this.scheduleRender(),
                    (this.animationProgress = P);
            }),
                this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
        }
        startAnimation(s) {
            this.notifyListeners('animationStart'),
                this.currentAnimation && this.currentAnimation.stop(),
                this.resumingFrom &&
                    this.resumingFrom.currentAnimation &&
                    this.resumingFrom.currentAnimation.stop(),
                this.pendingAnimation &&
                    (pe(this.pendingAnimation),
                    (this.pendingAnimation = void 0)),
                (this.pendingAnimation = $.update(() => {
                    (bt.hasAnimatedSinceResize = !0),
                        (this.currentAnimation = Su(0, qr, {
                            ...s,
                            onUpdate: (a) => {
                                this.mixTargetDelta(a),
                                    s.onUpdate && s.onUpdate(a);
                            },
                            onComplete: () => {
                                s.onComplete && s.onComplete(),
                                    this.completeAnimation();
                            },
                        })),
                        this.resumingFrom &&
                            (this.resumingFrom.currentAnimation =
                                this.currentAnimation),
                        (this.pendingAnimation = void 0);
                }));
        }
        completeAnimation() {
            this.resumingFrom &&
                ((this.resumingFrom.currentAnimation = void 0),
                (this.resumingFrom.preserveOpacity = void 0));
            const s = this.getStack();
            s && s.exitAnimationComplete(),
                (this.resumingFrom =
                    this.currentAnimation =
                    this.animationValues =
                        void 0),
                this.notifyListeners('animationComplete');
        }
        finishAnimation() {
            this.currentAnimation &&
                (this.mixTargetDelta && this.mixTargetDelta(qr),
                this.currentAnimation.stop()),
                this.completeAnimation();
        }
        applyTransformsToTarget() {
            const s = this.getLead();
            let {
                targetWithTransforms: a,
                target: c,
                layout: l,
                latestValues: u,
            } = s;
            if (!(!a || !c || !l)) {
                if (
                    this !== s &&
                    this.layout &&
                    l &&
                    _s(
                        this.options.animationType,
                        this.layout.layoutBox,
                        l.layoutBox,
                    )
                ) {
                    c = this.target || W();
                    const d = ne(this.layout.layoutBox.x);
                    (c.x.min = s.target.x.min), (c.x.max = c.x.min + d);
                    const f = ne(this.layout.layoutBox.y);
                    (c.y.min = s.target.y.min), (c.y.max = c.y.min + f);
                }
                re(a, c),
                    Ne(a, u),
                    Qe(
                        this.projectionDeltaWithTransform,
                        this.layoutCorrected,
                        a,
                        u,
                    );
            }
        }
        registerSharedNode(s, a) {
            this.sharedNodes.has(s) || this.sharedNodes.set(s, new vu()),
                this.sharedNodes.get(s).add(a);
            const l = a.options.initialPromotionConfig;
            a.promote({
                transition: l ? l.transition : void 0,
                preserveFollowOpacity:
                    l && l.shouldPreserveFollowOpacity
                        ? l.shouldPreserveFollowOpacity(a)
                        : void 0,
            });
        }
        isLead() {
            const s = this.getStack();
            return s ? s.lead === this : !0;
        }
        getLead() {
            var s;
            const { layoutId: a } = this.options;
            return a
                ? ((s = this.getStack()) === null || s === void 0
                      ? void 0
                      : s.lead) || this
                : this;
        }
        getPrevLead() {
            var s;
            const { layoutId: a } = this.options;
            return a
                ? (s = this.getStack()) === null || s === void 0
                    ? void 0
                    : s.prevLead
                : void 0;
        }
        getStack() {
            const { layoutId: s } = this.options;
            if (s) return this.root.sharedNodes.get(s);
        }
        promote({
            needsReset: s,
            transition: a,
            preserveFollowOpacity: c,
        } = {}) {
            const l = this.getStack();
            l && l.promote(this, c),
                s && ((this.projectionDelta = void 0), (this.needsReset = !0)),
                a && this.setOptions({ transition: a });
        }
        relegate() {
            const s = this.getStack();
            return s ? s.relegate(this) : !1;
        }
        resetRotation() {
            const { visualElement: s } = this.options;
            if (!s) return;
            let a = !1;
            const { latestValues: c } = s;
            if (
                ((c.rotate || c.rotateX || c.rotateY || c.rotateZ) && (a = !0),
                !a)
            )
                return;
            const l = {};
            for (let u = 0; u < Yr.length; u++) {
                const d = 'rotate' + Yr[u];
                c[d] && ((l[d] = c[d]), s.setStaticValue(d, 0));
            }
            s.render();
            for (const u in l) s.setStaticValue(u, l[u]);
            s.scheduleRender();
        }
        getProjectionStyles(s = {}) {
            var a, c;
            const l = {};
            if (!this.instance || this.isSVG) return l;
            if (this.isVisible) l.visibility = '';
            else return { visibility: 'hidden' };
            const u = this.getTransformTemplate();
            if (this.needsReset)
                return (
                    (this.needsReset = !1),
                    (l.opacity = ''),
                    (l.pointerEvents = vt(s.pointerEvents) || ''),
                    (l.transform = u ? u(this.latestValues, '') : 'none'),
                    l
                );
            const d = this.getLead();
            if (!this.projectionDelta || !this.layout || !d.target) {
                const m = {};
                return (
                    this.options.layoutId &&
                        ((m.opacity =
                            this.latestValues.opacity !== void 0
                                ? this.latestValues.opacity
                                : 1),
                        (m.pointerEvents = vt(s.pointerEvents) || '')),
                    this.hasProjected &&
                        !Ae(this.latestValues) &&
                        ((m.transform = u ? u({}, '') : 'none'),
                        (this.hasProjected = !1)),
                    m
                );
            }
            const f = d.animationValues || d.latestValues;
            this.applyTransformsToTarget(),
                (l.transform = Xr(
                    this.projectionDeltaWithTransform,
                    this.treeScale,
                    f,
                )),
                u && (l.transform = u(f, l.transform));
            const { x: h, y: p } = this.projectionDelta;
            (l.transformOrigin = `${h.origin * 100}% ${p.origin * 100}% 0`),
                d.animationValues
                    ? (l.opacity =
                          d === this
                              ? (c =
                                    (a = f.opacity) !== null && a !== void 0
                                        ? a
                                        : this.latestValues.opacity) !== null &&
                                c !== void 0
                                  ? c
                                  : 1
                              : this.preserveOpacity
                              ? this.latestValues.opacity
                              : f.opacityExit)
                    : (l.opacity =
                          d === this
                              ? f.opacity !== void 0
                                  ? f.opacity
                                  : ''
                              : f.opacityExit !== void 0
                              ? f.opacityExit
                              : 0);
            for (const m in At) {
                if (f[m] === void 0) continue;
                const { correct: b, applyTo: w } = At[m],
                    y = l.transform === 'none' ? f[m] : b(f[m], d);
                if (w) {
                    const v = w.length;
                    for (let x = 0; x < v; x++) l[w[x]] = y;
                } else l[m] = y;
            }
            return (
                this.options.layoutId &&
                    (l.pointerEvents =
                        d === this ? vt(s.pointerEvents) || '' : 'none'),
                l
            );
        }
        clearSnapshot() {
            this.resumeFrom = this.snapshot = void 0;
        }
        resetTree() {
            this.root.nodes.forEach((s) => {
                var a;
                return (a = s.currentAnimation) === null || a === void 0
                    ? void 0
                    : a.stop();
            }),
                this.root.nodes.forEach(Zr),
                this.root.sharedNodes.clear();
        }
    };
}
function Au(e) {
    e.updateLayout();
}
function Vu(e) {
    var t;
    const n =
        ((t = e.resumeFrom) === null || t === void 0 ? void 0 : t.snapshot) ||
        e.snapshot;
    if (e.isLead() && e.layout && n && e.hasListeners('didUpdate')) {
        const { layoutBox: r, measuredBox: o } = e.layout,
            { animationType: i } = e.options,
            s = n.source !== e.layout.source;
        i === 'size'
            ? ie((d) => {
                  const f = s ? n.measuredBox[d] : n.layoutBox[d],
                      h = ne(f);
                  (f.min = r[d].min), (f.max = f.min + h);
              })
            : _s(i, n.layoutBox, r) &&
              ie((d) => {
                  const f = s ? n.measuredBox[d] : n.layoutBox[d],
                      h = ne(r[d]);
                  (f.max = f.min + h),
                      e.relativeTarget &&
                          !e.currentAnimation &&
                          ((e.isProjectionDirty = !0),
                          (e.relativeTarget[d].max =
                              e.relativeTarget[d].min + h));
              });
        const a = Fe();
        Qe(a, r, n.layoutBox);
        const c = Fe();
        s
            ? Qe(c, e.applyTransform(o, !0), n.measuredBox)
            : Qe(c, r, n.layoutBox);
        const l = !Us(a);
        let u = !1;
        if (!e.resumeFrom) {
            const d = e.getClosestProjectingParent();
            if (d && !d.resumeFrom) {
                const { snapshot: f, layout: h } = d;
                if (f && h) {
                    const p = W();
                    et(p, n.layoutBox, f.layoutBox);
                    const m = W();
                    et(m, r, h.layoutBox),
                        Ws(p, m) || (u = !0),
                        d.options.layoutRoot &&
                            ((e.relativeTarget = m),
                            (e.relativeTargetOrigin = p),
                            (e.relativeParent = d));
                }
            }
        }
        e.notifyListeners('didUpdate', {
            layout: r,
            snapshot: n,
            delta: c,
            layoutDelta: a,
            hasLayoutChanged: l,
            hasRelativeTargetChanged: u,
        });
    } else if (e.isLead()) {
        const { onExitComplete: r } = e.options;
        r && r();
    }
    e.options.transition = void 0;
}
function Mu(e) {
    Ve.totalNodes++,
        e.parent &&
            (e.isProjecting() ||
                (e.isProjectionDirty = e.parent.isProjectionDirty),
            e.isSharedProjectionDirty ||
                (e.isSharedProjectionDirty = !!(
                    e.isProjectionDirty ||
                    e.parent.isProjectionDirty ||
                    e.parent.isSharedProjectionDirty
                )),
            e.isTransformDirty ||
                (e.isTransformDirty = e.parent.isTransformDirty));
}
function Ru(e) {
    e.isProjectionDirty = e.isSharedProjectionDirty = e.isTransformDirty = !1;
}
function ku(e) {
    e.clearSnapshot();
}
function Zr(e) {
    e.clearMeasurements();
}
function Eu(e) {
    e.isLayoutDirty = !1;
}
function Du(e) {
    const { visualElement: t } = e.options;
    t && t.getProps().onBeforeLayoutMeasure && t.notify('BeforeLayoutMeasure'),
        e.resetTransform();
}
function Jr(e) {
    e.finishAnimation(),
        (e.targetDelta = e.relativeTarget = e.target = void 0),
        (e.isProjectionDirty = !0);
}
function Lu(e) {
    e.resolveTargetDelta();
}
function Bu(e) {
    e.calcProjection();
}
function Ou(e) {
    e.resetRotation();
}
function Iu(e) {
    e.removeLeadSnapshot();
}
function Qr(e, t, n) {
    (e.translate = z(t.translate, 0, n)),
        (e.scale = z(t.scale, 1, n)),
        (e.origin = t.origin),
        (e.originPoint = t.originPoint);
}
function eo(e, t, n, r) {
    (e.min = z(t.min, n.min, r)), (e.max = z(t.max, n.max, r));
}
function ju(e, t, n, r) {
    eo(e.x, t.x, n.x, r), eo(e.y, t.y, n.y, r);
}
function Fu(e) {
    return e.animationValues && e.animationValues.opacityExit !== void 0;
}
const Nu = { duration: 0.45, ease: [0.4, 0, 0.1, 1] },
    to = (e) =>
        typeof navigator < 'u' && navigator.userAgent.toLowerCase().includes(e),
    no = to('applewebkit/') && !to('chrome/') ? Math.round : G;
function ro(e) {
    (e.min = no(e.min)), (e.max = no(e.max));
}
function $u(e) {
    ro(e.x), ro(e.y);
}
function _s(e, t, n) {
    return (
        e === 'position' || (e === 'preserve-aspect' && !wn(Kr(t), Kr(n), 0.2))
    );
}
const zu = Hs({
        attachResizeListener: (e, t) => de(e, 'resize', t),
        measureScroll: () => ({
            x: document.documentElement.scrollLeft || document.body.scrollLeft,
            y: document.documentElement.scrollTop || document.body.scrollTop,
        }),
        checkIsScrollRoot: () => !0,
    }),
    on = { current: void 0 },
    Ks = Hs({
        measureScroll: (e) => ({ x: e.scrollLeft, y: e.scrollTop }),
        defaultParent: () => {
            if (!on.current) {
                const e = new zu({});
                e.mount(window),
                    e.setOptions({ layoutScroll: !0 }),
                    (on.current = e);
            }
            return on.current;
        },
        resetTransform: (e, t) => {
            e.style.transform = t !== void 0 ? t : 'none';
        },
        checkIsScrollRoot: (e) =>
            window.getComputedStyle(e).position === 'fixed',
    }),
    Gu = {
        pan: { Feature: su },
        drag: { Feature: ou, ProjectionNode: Ks, MeasureLayout: $s },
    },
    Uu = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;
function Wu(e) {
    const t = Uu.exec(e);
    if (!t) return [,];
    const [, n, r] = t;
    return [n, r];
}
function Tn(e, t, n = 1) {
    const [r, o] = Wu(e);
    if (!r) return;
    const i = window.getComputedStyle(t).getPropertyValue(r);
    if (i) {
        const s = i.trim();
        return ks(s) ? parseFloat(s) : s;
    } else return pn(o) ? Tn(o, t, n + 1) : o;
}
function Hu(e, { ...t }, n) {
    const r = e.current;
    if (!(r instanceof Element)) return { target: t, transitionEnd: n };
    n && (n = { ...n }),
        e.values.forEach((o) => {
            const i = o.get();
            if (!pn(i)) return;
            const s = Tn(i, r);
            s && o.set(s);
        });
    for (const o in t) {
        const i = t[o];
        if (!pn(i)) continue;
        const s = Tn(i, r);
        s && ((t[o] = s), n || (n = {}), n[o] === void 0 && (n[o] = i));
    }
    return { target: t, transitionEnd: n };
}
const _u = new Set([
        'width',
        'height',
        'top',
        'left',
        'right',
        'bottom',
        'x',
        'y',
        'translateX',
        'translateY',
    ]),
    Xs = (e) => _u.has(e),
    Ku = (e) => Object.keys(e).some(Xs),
    oo = (e) => e === De || e === A,
    so = (e, t) => parseFloat(e.split(', ')[t]),
    io =
        (e, t) =>
        (n, { transform: r }) => {
            if (r === 'none' || !r) return 0;
            const o = r.match(/^matrix3d\((.+)\)$/);
            if (o) return so(o[1], t);
            {
                const i = r.match(/^matrix\((.+)\)$/);
                return i ? so(i[1], e) : 0;
            }
        },
    Xu = new Set(['x', 'y', 'z']),
    Yu = ot.filter((e) => !Xu.has(e));
function qu(e) {
    const t = [];
    return (
        Yu.forEach((n) => {
            const r = e.getValue(n);
            r !== void 0 &&
                (t.push([n, r.get()]), r.set(n.startsWith('scale') ? 1 : 0));
        }),
        t.length && e.render(),
        t
    );
}
const Ge = {
    width: ({ x: e }, { paddingLeft: t = '0', paddingRight: n = '0' }) =>
        e.max - e.min - parseFloat(t) - parseFloat(n),
    height: ({ y: e }, { paddingTop: t = '0', paddingBottom: n = '0' }) =>
        e.max - e.min - parseFloat(t) - parseFloat(n),
    top: (e, { top: t }) => parseFloat(t),
    left: (e, { left: t }) => parseFloat(t),
    bottom: ({ y: e }, { top: t }) => parseFloat(t) + (e.max - e.min),
    right: ({ x: e }, { left: t }) => parseFloat(t) + (e.max - e.min),
    x: io(4, 13),
    y: io(5, 14),
};
Ge.translateX = Ge.x;
Ge.translateY = Ge.y;
const Zu = (e, t, n) => {
        const r = t.measureViewportBox(),
            o = t.current,
            i = getComputedStyle(o),
            { display: s } = i,
            a = {};
        s === 'none' && t.setStaticValue('display', e.display || 'block'),
            n.forEach((l) => {
                a[l] = Ge[l](r, i);
            }),
            t.render();
        const c = t.measureViewportBox();
        return (
            n.forEach((l) => {
                const u = t.getValue(l);
                u && u.jump(a[l]), (e[l] = Ge[l](c, i));
            }),
            e
        );
    },
    Ju = (e, t, n = {}, r = {}) => {
        (t = { ...t }), (r = { ...r });
        const o = Object.keys(t).filter(Xs);
        let i = [],
            s = !1;
        const a = [];
        if (
            (o.forEach((c) => {
                const l = e.getValue(c);
                if (!e.hasValue(c)) return;
                let u = n[c],
                    d = Xe(u);
                const f = t[c];
                let h;
                if (Mt(f)) {
                    const p = f.length,
                        m = f[0] === null ? 1 : 0;
                    (u = f[m]), (d = Xe(u));
                    for (let b = m; b < p && f[b] !== null; b++)
                        h ? $n(Xe(f[b]) === h) : (h = Xe(f[b]));
                } else h = Xe(f);
                if (d !== h)
                    if (oo(d) && oo(h)) {
                        const p = l.get();
                        typeof p == 'string' && l.set(parseFloat(p)),
                            typeof f == 'string'
                                ? (t[c] = parseFloat(f))
                                : Array.isArray(f) &&
                                  h === A &&
                                  (t[c] = f.map(parseFloat));
                    } else
                        d != null &&
                        d.transform &&
                        h != null &&
                        h.transform &&
                        (u === 0 || f === 0)
                            ? u === 0
                                ? l.set(h.transform(u))
                                : (t[c] = d.transform(f))
                            : (s || ((i = qu(e)), (s = !0)),
                              a.push(c),
                              (r[c] = r[c] !== void 0 ? r[c] : t[c]),
                              l.jump(f));
            }),
            a.length)
        ) {
            const c = a.indexOf('height') >= 0 ? window.pageYOffset : null,
                l = Zu(t, e, a);
            return (
                i.length &&
                    i.forEach(([u, d]) => {
                        e.getValue(u).set(d);
                    }),
                e.render(),
                Ft && c !== null && window.scrollTo({ top: c }),
                { target: l, transitionEnd: r }
            );
        } else return { target: t, transitionEnd: r };
    };
function Qu(e, t, n, r) {
    return Ku(t) ? Ju(e, t, n, r) : { target: t, transitionEnd: r };
}
const ed = (e, t, n, r) => {
        const o = Hu(e, t, r);
        return (t = o.target), (r = o.transitionEnd), Qu(e, t, n, r);
    },
    An = { current: null },
    Ys = { current: !1 };
function td() {
    if (((Ys.current = !0), !!Ft))
        if (window.matchMedia) {
            const e = window.matchMedia('(prefers-reduced-motion)'),
                t = () => (An.current = e.matches);
            e.addListener(t), t();
        } else An.current = !1;
}
function nd(e, t, n) {
    const { willChange: r } = t;
    for (const o in t) {
        const i = t[o],
            s = n[o];
        if (ee(i)) e.addValue(o, i), Dt(r) && r.add(o);
        else if (ee(s))
            e.addValue(o, ze(i, { owner: e })), Dt(r) && r.remove(o);
        else if (s !== i)
            if (e.hasValue(o)) {
                const a = e.getValue(o);
                !a.hasAnimated && a.set(i);
            } else {
                const a = e.getStaticValue(o);
                e.addValue(o, ze(a !== void 0 ? a : i, { owner: e }));
            }
    }
    for (const o in n) t[o] === void 0 && e.removeValue(o);
    return t;
}
const ao = new WeakMap(),
    qs = Object.keys(nt),
    rd = qs.length,
    lo = [
        'AnimationStart',
        'AnimationComplete',
        'Update',
        'BeforeLayoutMeasure',
        'LayoutMeasure',
        'LayoutAnimationStart',
        'LayoutAnimationComplete',
    ],
    od = kn.length;
class sd {
    constructor(
        {
            parent: t,
            props: n,
            presenceContext: r,
            reducedMotionConfig: o,
            visualState: i,
        },
        s = {},
    ) {
        (this.current = null),
            (this.children = new Set()),
            (this.isVariantNode = !1),
            (this.isControllingVariants = !1),
            (this.shouldReduceMotion = null),
            (this.values = new Map()),
            (this.features = {}),
            (this.valueSubscriptions = new Map()),
            (this.prevMotionValues = {}),
            (this.events = {}),
            (this.propEventSubscriptions = {}),
            (this.notifyUpdate = () =>
                this.notify('Update', this.latestValues)),
            (this.render = () => {
                this.current &&
                    (this.triggerBuild(),
                    this.renderInstance(
                        this.current,
                        this.renderState,
                        this.props.style,
                        this.projection,
                    ));
            }),
            (this.scheduleRender = () => $.render(this.render, !1, !0));
        const { latestValues: a, renderState: c } = i;
        (this.latestValues = a),
            (this.baseTarget = { ...a }),
            (this.initialValues = n.initial ? { ...a } : {}),
            (this.renderState = c),
            (this.parent = t),
            (this.props = n),
            (this.presenceContext = r),
            (this.depth = t ? t.depth + 1 : 0),
            (this.reducedMotionConfig = o),
            (this.options = s),
            (this.isControllingVariants = $t(n)),
            (this.isVariantNode = Bo(n)),
            this.isVariantNode && (this.variantChildren = new Set()),
            (this.manuallyAnimateOnMount = !!(t && t.current));
        const { willChange: l, ...u } = this.scrapeMotionValuesFromProps(n, {});
        for (const d in u) {
            const f = u[d];
            a[d] !== void 0 && ee(f) && (f.set(a[d], !1), Dt(l) && l.add(d));
        }
    }
    scrapeMotionValuesFromProps(t, n) {
        return {};
    }
    mount(t) {
        (this.current = t),
            ao.set(t, this),
            this.projection &&
                !this.projection.instance &&
                this.projection.mount(t),
            this.parent &&
                this.isVariantNode &&
                !this.isControllingVariants &&
                (this.removeFromVariantTree =
                    this.parent.addVariantChild(this)),
            this.values.forEach((n, r) => this.bindToMotionValue(r, n)),
            Ys.current || td(),
            (this.shouldReduceMotion =
                this.reducedMotionConfig === 'never'
                    ? !1
                    : this.reducedMotionConfig === 'always'
                    ? !0
                    : An.current),
            this.parent && this.parent.children.add(this),
            this.update(this.props, this.presenceContext);
    }
    unmount() {
        ao.delete(this.current),
            this.projection && this.projection.unmount(),
            pe(this.notifyUpdate),
            pe(this.render),
            this.valueSubscriptions.forEach((t) => t()),
            this.removeFromVariantTree && this.removeFromVariantTree(),
            this.parent && this.parent.children.delete(this);
        for (const t in this.events) this.events[t].clear();
        for (const t in this.features) this.features[t].unmount();
        this.current = null;
    }
    bindToMotionValue(t, n) {
        const r = Ee.has(t),
            o = n.on('change', (s) => {
                (this.latestValues[t] = s),
                    this.props.onUpdate && $.update(this.notifyUpdate, !1, !0),
                    r &&
                        this.projection &&
                        (this.projection.isTransformDirty = !0);
            }),
            i = n.on('renderRequest', this.scheduleRender);
        this.valueSubscriptions.set(t, () => {
            o(), i();
        });
    }
    sortNodePosition(t) {
        return !this.current ||
            !this.sortInstanceNodePosition ||
            this.type !== t.type
            ? 0
            : this.sortInstanceNodePosition(this.current, t.current);
    }
    loadFeatures({ children: t, ...n }, r, o, i) {
        let s, a;
        for (let c = 0; c < rd; c++) {
            const l = qs[c],
                {
                    isEnabled: u,
                    Feature: d,
                    ProjectionNode: f,
                    MeasureLayout: h,
                } = nt[l];
            f && (s = f),
                u(n) &&
                    (!this.features[l] && d && (this.features[l] = new d(this)),
                    h && (a = h));
        }
        if (!this.projection && s) {
            this.projection = new s(
                this.latestValues,
                this.parent && this.parent.projection,
            );
            const {
                layoutId: c,
                layout: l,
                drag: u,
                dragConstraints: d,
                layoutScroll: f,
                layoutRoot: h,
            } = n;
            this.projection.setOptions({
                layoutId: c,
                layout: l,
                alwaysMeasureLayout: !!u || (d && Ie(d)),
                visualElement: this,
                scheduleRender: () => this.scheduleRender(),
                animationType: typeof l == 'string' ? l : 'both',
                initialPromotionConfig: i,
                layoutScroll: f,
                layoutRoot: h,
            });
        }
        return a;
    }
    updateFeatures() {
        for (const t in this.features) {
            const n = this.features[t];
            n.isMounted ? n.update() : (n.mount(), (n.isMounted = !0));
        }
    }
    triggerBuild() {
        this.build(
            this.renderState,
            this.latestValues,
            this.options,
            this.props,
        );
    }
    measureViewportBox() {
        return this.current
            ? this.measureInstanceViewportBox(this.current, this.props)
            : W();
    }
    getStaticValue(t) {
        return this.latestValues[t];
    }
    setStaticValue(t, n) {
        this.latestValues[t] = n;
    }
    makeTargetAnimatable(t, n = !0) {
        return this.makeTargetAnimatableFromInstance(t, this.props, n);
    }
    update(t, n) {
        (t.transformTemplate || this.props.transformTemplate) &&
            this.scheduleRender(),
            (this.prevProps = this.props),
            (this.props = t),
            (this.prevPresenceContext = this.presenceContext),
            (this.presenceContext = n);
        for (let r = 0; r < lo.length; r++) {
            const o = lo[r];
            this.propEventSubscriptions[o] &&
                (this.propEventSubscriptions[o](),
                delete this.propEventSubscriptions[o]);
            const i = t['on' + o];
            i && (this.propEventSubscriptions[o] = this.on(o, i));
        }
        (this.prevMotionValues = nd(
            this,
            this.scrapeMotionValuesFromProps(t, this.prevProps),
            this.prevMotionValues,
        )),
            this.handleChildMotionValue && this.handleChildMotionValue();
    }
    getProps() {
        return this.props;
    }
    getVariant(t) {
        return this.props.variants ? this.props.variants[t] : void 0;
    }
    getDefaultTransition() {
        return this.props.transition;
    }
    getTransformPagePoint() {
        return this.props.transformPagePoint;
    }
    getClosestVariantNode() {
        return this.isVariantNode
            ? this
            : this.parent
            ? this.parent.getClosestVariantNode()
            : void 0;
    }
    getVariantContext(t = !1) {
        if (t) return this.parent ? this.parent.getVariantContext() : void 0;
        if (!this.isControllingVariants) {
            const r = this.parent ? this.parent.getVariantContext() || {} : {};
            return (
                this.props.initial !== void 0 &&
                    (r.initial = this.props.initial),
                r
            );
        }
        const n = {};
        for (let r = 0; r < od; r++) {
            const o = kn[r],
                i = this.props[o];
            (tt(i) || i === !1) && (n[o] = i);
        }
        return n;
    }
    addVariantChild(t) {
        const n = this.getClosestVariantNode();
        if (n)
            return (
                n.variantChildren && n.variantChildren.add(t),
                () => n.variantChildren.delete(t)
            );
    }
    addValue(t, n) {
        n !== this.values.get(t) &&
            (this.removeValue(t), this.bindToMotionValue(t, n)),
            this.values.set(t, n),
            (this.latestValues[t] = n.get());
    }
    removeValue(t) {
        this.values.delete(t);
        const n = this.valueSubscriptions.get(t);
        n && (n(), this.valueSubscriptions.delete(t)),
            delete this.latestValues[t],
            this.removeValueFromRenderState(t, this.renderState);
    }
    hasValue(t) {
        return this.values.has(t);
    }
    getValue(t, n) {
        if (this.props.values && this.props.values[t])
            return this.props.values[t];
        let r = this.values.get(t);
        return (
            r === void 0 &&
                n !== void 0 &&
                ((r = ze(n, { owner: this })), this.addValue(t, r)),
            r
        );
    }
    readValue(t) {
        var n;
        return this.latestValues[t] !== void 0 || !this.current
            ? this.latestValues[t]
            : (n = this.getBaseTargetFromProps(this.props, t)) !== null &&
              n !== void 0
            ? n
            : this.readValueFromInstance(this.current, t, this.options);
    }
    setBaseTarget(t, n) {
        this.baseTarget[t] = n;
    }
    getBaseTarget(t) {
        var n;
        const { initial: r } = this.props,
            o =
                typeof r == 'string' || typeof r == 'object'
                    ? (n = Nn(this.props, r)) === null || n === void 0
                        ? void 0
                        : n[t]
                    : void 0;
        if (r && o !== void 0) return o;
        const i = this.getBaseTargetFromProps(this.props, t);
        return i !== void 0 && !ee(i)
            ? i
            : this.initialValues[t] !== void 0 && o === void 0
            ? void 0
            : this.baseTarget[t];
    }
    on(t, n) {
        return (
            this.events[t] || (this.events[t] = new Xn()), this.events[t].add(n)
        );
    }
    notify(t, ...n) {
        this.events[t] && this.events[t].notify(...n);
    }
}
class Zs extends sd {
    sortInstanceNodePosition(t, n) {
        return t.compareDocumentPosition(n) & 2 ? 1 : -1;
    }
    getBaseTargetFromProps(t, n) {
        return t.style ? t.style[n] : void 0;
    }
    removeValueFromRenderState(t, { vars: n, style: r }) {
        delete n[t], delete r[t];
    }
    makeTargetAnimatableFromInstance(
        { transition: t, transitionEnd: n, ...r },
        { transformValues: o },
        i,
    ) {
        let s = Sc(r, t || {}, this);
        if ((o && (n && (n = o(n)), r && (r = o(r)), s && (s = o(s))), i)) {
            Pc(this, r, s);
            const a = ed(this, r, s, n);
            (n = a.transitionEnd), (r = a.target);
        }
        return { transition: t, transitionEnd: n, ...r };
    }
}
function id(e) {
    return window.getComputedStyle(e);
}
class ad extends Zs {
    readValueFromInstance(t, n) {
        if (Ee.has(n)) {
            const r = Wn(n);
            return (r && r.default) || 0;
        } else {
            const r = id(t),
                o = (Fo(n) ? r.getPropertyValue(n) : r[n]) || 0;
            return typeof o == 'string' ? o.trim() : o;
        }
    }
    measureInstanceViewportBox(t, { transformPagePoint: n }) {
        return Ns(t, n);
    }
    build(t, n, r, o) {
        Ln(t, n, r, o.transformTemplate);
    }
    scrapeMotionValuesFromProps(t, n) {
        return Fn(t, n);
    }
    handleChildMotionValue() {
        this.childSubscription &&
            (this.childSubscription(), delete this.childSubscription);
        const { children: t } = this.props;
        ee(t) &&
            (this.childSubscription = t.on('change', (n) => {
                this.current && (this.current.textContent = `${n}`);
            }));
    }
    renderInstance(t, n, r, o) {
        Wo(t, n, r, o);
    }
}
class ld extends Zs {
    constructor() {
        super(...arguments), (this.isSVGTag = !1);
    }
    getBaseTargetFromProps(t, n) {
        return t[n];
    }
    readValueFromInstance(t, n) {
        if (Ee.has(n)) {
            const r = Wn(n);
            return (r && r.default) || 0;
        }
        return (n = Ho.has(n) ? n : jn(n)), t.getAttribute(n);
    }
    measureInstanceViewportBox() {
        return W();
    }
    scrapeMotionValuesFromProps(t, n) {
        return Ko(t, n);
    }
    build(t, n, r, o) {
        On(t, n, r, this.isSVGTag, o.transformTemplate);
    }
    renderInstance(t, n, r, o) {
        _o(t, n, r, o);
    }
    mount(t) {
        (this.isSVGTag = In(t.tagName)), super.mount(t);
    }
}
const cd = (e, t) =>
        Dn(e)
            ? new ld(t, { enableHardwareAcceleration: !1 })
            : new ad(t, { enableHardwareAcceleration: !0 }),
    ud = { layout: { ProjectionNode: Ks, MeasureLayout: $s } },
    dd = { ...Fc, ...ol, ...Gu, ...ud },
    co = ha((e, t) => Ga(e, t, dd, cd));
function Js() {
    const e = g.useRef(!1);
    return (
        Tt(
            () => (
                (e.current = !0),
                () => {
                    e.current = !1;
                }
            ),
            [],
        ),
        e
    );
}
function fd() {
    const e = Js(),
        [t, n] = g.useState(0),
        r = g.useCallback(() => {
            e.current && n(t + 1);
        }, [t]);
    return [g.useCallback(() => $.postRender(r), [r]), t];
}
class hd extends g.Component {
    getSnapshotBeforeUpdate(t) {
        const n = this.props.childRef.current;
        if (n && t.isPresent && !this.props.isPresent) {
            const r = this.props.sizeRef.current;
            (r.height = n.offsetHeight || 0),
                (r.width = n.offsetWidth || 0),
                (r.top = n.offsetTop),
                (r.left = n.offsetLeft);
        }
        return null;
    }
    componentDidUpdate() {}
    render() {
        return this.props.children;
    }
}
function pd({ children: e, isPresent: t }) {
    const n = g.useId(),
        r = g.useRef(null),
        o = g.useRef({ width: 0, height: 0, top: 0, left: 0 });
    return (
        g.useInsertionEffect(() => {
            const { width: i, height: s, top: a, left: c } = o.current;
            if (t || !r.current || !i || !s) return;
            r.current.dataset.motionPopId = n;
            const l = document.createElement('style');
            return (
                document.head.appendChild(l),
                l.sheet &&
                    l.sheet.insertRule(`
          [data-motion-pop-id="${n}"] {
            position: absolute !important;
            width: ${i}px !important;
            height: ${s}px !important;
            top: ${a}px !important;
            left: ${c}px !important;
          }
        `),
                () => {
                    document.head.removeChild(l);
                }
            );
        }, [t]),
        g.createElement(
            hd,
            { isPresent: t, childRef: r, sizeRef: o },
            g.cloneElement(e, { ref: r }),
        )
    );
}
const sn = ({
    children: e,
    initial: t,
    isPresent: n,
    onExitComplete: r,
    custom: o,
    presenceAffectsLayout: i,
    mode: s,
}) => {
    const a = Xo(md),
        c = g.useId(),
        l = g.useMemo(
            () => ({
                id: c,
                initial: t,
                isPresent: n,
                custom: o,
                onExitComplete: (u) => {
                    a.set(u, !0);
                    for (const d of a.values()) if (!d) return;
                    r && r();
                },
                register: (u) => (a.set(u, !1), () => a.delete(u)),
            }),
            i ? void 0 : [n],
        );
    return (
        g.useMemo(() => {
            a.forEach((u, d) => a.set(d, !1));
        }, [n]),
        g.useEffect(() => {
            !n && !a.size && r && r();
        }, [n]),
        s === 'popLayout' && (e = g.createElement(pd, { isPresent: n }, e)),
        g.createElement(jt.Provider, { value: l }, e)
    );
};
function md() {
    return new Map();
}
function gd(e) {
    return g.useEffect(() => () => e(), []);
}
const Oe = (e) => e.key || '';
function yd(e, t) {
    e.forEach((n) => {
        const r = Oe(n);
        t.set(r, n);
    });
}
function vd(e) {
    const t = [];
    return (
        g.Children.forEach(e, (n) => {
            g.isValidElement(n) && t.push(n);
        }),
        t
    );
}
const bd = ({
    children: e,
    custom: t,
    initial: n = !0,
    onExitComplete: r,
    exitBeforeEnter: o,
    presenceAffectsLayout: i = !0,
    mode: s = 'sync',
}) => {
    const a = g.useContext(En).forceRender || fd()[0],
        c = Js(),
        l = vd(e);
    let u = l;
    const d = g.useRef(new Map()).current,
        f = g.useRef(u),
        h = g.useRef(new Map()).current,
        p = g.useRef(!0);
    if (
        (Tt(() => {
            (p.current = !1), yd(l, h), (f.current = u);
        }),
        gd(() => {
            (p.current = !0), h.clear(), d.clear();
        }),
        p.current)
    )
        return g.createElement(
            g.Fragment,
            null,
            u.map((y) =>
                g.createElement(
                    sn,
                    {
                        key: Oe(y),
                        isPresent: !0,
                        initial: n ? void 0 : !1,
                        presenceAffectsLayout: i,
                        mode: s,
                    },
                    y,
                ),
            ),
        );
    u = [...u];
    const m = f.current.map(Oe),
        b = l.map(Oe),
        w = m.length;
    for (let y = 0; y < w; y++) {
        const v = m[y];
        b.indexOf(v) === -1 && !d.has(v) && d.set(v, void 0);
    }
    return (
        s === 'wait' && d.size && (u = []),
        d.forEach((y, v) => {
            if (b.indexOf(v) !== -1) return;
            const x = h.get(v);
            if (!x) return;
            const P = m.indexOf(v);
            let k = y;
            if (!k) {
                const R = () => {
                    h.delete(v), d.delete(v);
                    const S = f.current.findIndex((D) => D.key === v);
                    if ((f.current.splice(S, 1), !d.size)) {
                        if (((f.current = l), c.current === !1)) return;
                        a(), r && r();
                    }
                };
                (k = g.createElement(
                    sn,
                    {
                        key: Oe(x),
                        isPresent: !1,
                        onExitComplete: R,
                        custom: t,
                        presenceAffectsLayout: i,
                        mode: s,
                    },
                    x,
                )),
                    d.set(v, k);
            }
            u.splice(P, 0, k);
        }),
        (u = u.map((y) => {
            const v = y.key;
            return d.has(v)
                ? y
                : g.createElement(
                      sn,
                      {
                          key: Oe(y),
                          isPresent: !0,
                          presenceAffectsLayout: i,
                          mode: s,
                      },
                      y,
                  );
        })),
        g.createElement(
            g.Fragment,
            null,
            d.size ? u : u.map((y) => g.cloneElement(y)),
        )
    );
};
var ue = {
        ease: [0.36, 0.66, 0.4, 1],
        easeIn: [0.4, 0, 1, 1],
        easeOut: [0, 0, 0.2, 1],
        easeInOut: [0.4, 0, 0.2, 1],
        spring: [0.155, 1.105, 0.295, 1.12],
        springOut: [0.57, -0.15, 0.62, 0.07],
        softSpring: [0.16, 1.11, 0.3, 1.02],
    },
    xd = {
        scaleSpring: {
            enter: {
                transform: 'scale(1)',
                opacity: 1,
                transition: { type: 'spring', bounce: 0, duration: 0.3 },
            },
            exit: {
                transform: 'scale(0.6)',
                opacity: 0,
                transition: { type: 'easeOut', duration: 0.2 },
            },
        },
        scaleSpringOpacity: {
            initial: { opacity: 0, transform: 'scale(0.6)' },
            enter: {
                opacity: 1,
                transform: 'scale(1)',
                transition: { type: 'spring', bounce: 0, duration: 0.3 },
            },
            exit: {
                opacity: 0,
                transform: 'scale(0.3)',
                transition: { type: 'spring', bounce: 0, duration: 0.4 },
            },
        },
        scale: { enter: { scale: 1 }, exit: { scale: 0.95 } },
        scaleFadeIn: {
            enter: {
                transform: 'scale(1)',
                opacity: 1,
                transition: { duration: 0.25, ease: ue.easeIn },
            },
            exit: {
                transform: 'scale(0.95)',
                opacity: 0,
                transition: { duration: 0.2, ease: ue.easeOut },
            },
        },
        scaleInOut: {
            enter: {
                transform: 'scale(1)',
                opacity: 1,
                transition: { duration: 0.4, ease: ue.ease },
            },
            exit: {
                transform: 'scale(1.03)',
                opacity: 0,
                transition: { duration: 0.3, ease: ue.ease },
            },
        },
        fade: {
            enter: { opacity: 1, transition: { duration: 0.4, ease: ue.ease } },
            exit: { opacity: 0, transition: { duration: 0.3, ease: ue.ease } },
        },
        collapse: {
            enter: {
                opacity: 1,
                height: 'auto',
                transition: {
                    height: { type: 'spring', bounce: 0, duration: 0.3 },
                    opacity: { easings: 'ease', duration: 0.4 },
                },
            },
            exit: {
                opacity: 0,
                height: 0,
                transition: { easings: 'ease', duration: 0.3 },
            },
        },
    },
    wd =
        globalThis != null && globalThis.document
            ? g.useLayoutEffect
            : g.useEffect;
function Pd(e, t) {
    let {
            elementType: n = 'button',
            isDisabled: r,
            onPress: o,
            onPressStart: i,
            onPressEnd: s,
            onPressChange: a,
            preventFocusOnPress: c,
            allowFocusWhenDisabled: l,
            onClick: u,
            href: d,
            target: f,
            rel: h,
            type: p = 'button',
            allowTextSelectionOnPress: m,
        } = e,
        b;
    n === 'button'
        ? (b = { type: p, disabled: r })
        : (b = {
              role: 'button',
              tabIndex: r ? void 0 : 0,
              href: n === 'a' && r ? void 0 : d,
              target: n === 'a' ? f : void 0,
              type: n === 'input' ? p : void 0,
              disabled: n === 'input' ? r : void 0,
              'aria-disabled': !r || n === 'input' ? void 0 : r,
              rel: n === 'a' ? h : void 0,
          });
    let { pressProps: w, isPressed: y } = di({
            onPressStart: i,
            onPressEnd: s,
            onPressChange: a,
            onPress: o,
            isDisabled: r,
            preventFocusOnPress: c,
            allowTextSelectionOnPress: m,
            ref: t,
        }),
        { focusableProps: v } = fi(e, t);
    l && (v.tabIndex = r ? -1 : v.tabIndex);
    let x = $e(v, w, yo(e, { labelable: !0 }));
    return {
        isPressed: y,
        buttonProps: $e(b, x, {
            'aria-haspopup': e['aria-haspopup'],
            'aria-expanded': e['aria-expanded'],
            'aria-controls': e['aria-controls'],
            'aria-pressed': e['aria-pressed'],
            onClick: (P) => {
                u && u(P);
            },
        }),
    };
}
function Cd(e) {
    let [t, n] = bo(e.isOpen, e.defaultOpen || !1, e.onOpenChange);
    const r = g.useCallback(() => {
            n(!0);
        }, [n]),
        o = g.useCallback(() => {
            n(!1);
        }, [n]),
        i = g.useCallback(() => {
            n(!t);
        }, [n, t]);
    return { isOpen: t, setOpen: n, open: r, close: o, toggle: i };
}
function Sd(e, t) {
    let { role: n = 'dialog' } = e,
        r = hi();
    r = e['aria-label'] ? void 0 : r;
    let o = g.useRef(!1);
    return (
        g.useEffect(() => {
            if (t.current && !t.current.contains(document.activeElement)) {
                Zn(t.current);
                let i = setTimeout(() => {
                    document.activeElement === t.current &&
                        ((o.current = !0),
                        t.current.blur(),
                        Zn(t.current),
                        (o.current = !1));
                }, 500);
                return () => {
                    clearTimeout(i);
                };
            }
        }, [t]),
        vo(),
        {
            dialogProps: {
                ...yo(e, { labelable: !0 }),
                role: n,
                tabIndex: -1,
                'aria-labelledby': e['aria-labelledby'] || r,
                onBlur: (i) => {
                    o.current && i.stopPropagation();
                },
            },
            titleProps: { id: r },
        }
    );
}
var ve = function () {
    return (
        (ve =
            Object.assign ||
            function (t) {
                for (var n, r = 1, o = arguments.length; r < o; r++) {
                    n = arguments[r];
                    for (var i in n)
                        Object.prototype.hasOwnProperty.call(n, i) &&
                            (t[i] = n[i]);
                }
                return t;
            }),
        ve.apply(this, arguments)
    );
};
function Td(e, t) {
    var n = {};
    for (var r in e)
        Object.prototype.hasOwnProperty.call(e, r) &&
            t.indexOf(r) < 0 &&
            (n[r] = e[r]);
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
        for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
            t.indexOf(r[o]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, r[o]) &&
                (n[r[o]] = e[r[o]]);
    return n;
}
function Ad(e, t, n) {
    if (n || arguments.length === 2)
        for (var r = 0, o = t.length, i; r < o; r++)
            (i || !(r in t)) &&
                (i || (i = Array.prototype.slice.call(t, 0, r)), (i[r] = t[r]));
    return e.concat(i || Array.prototype.slice.call(t));
}
var xt = 'right-scroll-bar-position',
    wt = 'width-before-scroll-bar',
    Vd = 'with-scroll-bars-hidden',
    Md = '--removed-body-scroll-bar-size';
function Rd(e, t) {
    return typeof e == 'function' ? e(t) : e && (e.current = t), e;
}
function kd(e, t) {
    var n = g.useState(function () {
        return {
            value: e,
            callback: t,
            facade: {
                get current() {
                    return n.value;
                },
                set current(r) {
                    var o = n.value;
                    o !== r && ((n.value = r), n.callback(r, o));
                },
            },
        };
    })[0];
    return (n.callback = t), n.facade;
}
function Ed(e, t) {
    return kd(t || null, function (n) {
        return e.forEach(function (r) {
            return Rd(r, n);
        });
    });
}
var Bt = function () {
    return (
        (Bt =
            Object.assign ||
            function (t) {
                for (var n, r = 1, o = arguments.length; r < o; r++) {
                    n = arguments[r];
                    for (var i in n)
                        Object.prototype.hasOwnProperty.call(n, i) &&
                            (t[i] = n[i]);
                }
                return t;
            }),
        Bt.apply(this, arguments)
    );
};
function Dd(e, t) {
    var n = {};
    for (var r in e)
        Object.prototype.hasOwnProperty.call(e, r) &&
            t.indexOf(r) < 0 &&
            (n[r] = e[r]);
    if (e != null && typeof Object.getOwnPropertySymbols == 'function')
        for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
            t.indexOf(r[o]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, r[o]) &&
                (n[r[o]] = e[r[o]]);
    return n;
}
function Ld(e) {
    return e;
}
function Bd(e, t) {
    t === void 0 && (t = Ld);
    var n = [],
        r = !1,
        o = {
            read: function () {
                if (r)
                    throw new Error(
                        'Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.',
                    );
                return n.length ? n[n.length - 1] : e;
            },
            useMedium: function (i) {
                var s = t(i, r);
                return (
                    n.push(s),
                    function () {
                        n = n.filter(function (a) {
                            return a !== s;
                        });
                    }
                );
            },
            assignSyncMedium: function (i) {
                for (r = !0; n.length; ) {
                    var s = n;
                    (n = []), s.forEach(i);
                }
                n = {
                    push: function (a) {
                        return i(a);
                    },
                    filter: function () {
                        return n;
                    },
                };
            },
            assignMedium: function (i) {
                r = !0;
                var s = [];
                if (n.length) {
                    var a = n;
                    (n = []), a.forEach(i), (s = n);
                }
                var c = function () {
                        var u = s;
                        (s = []), u.forEach(i);
                    },
                    l = function () {
                        return Promise.resolve().then(c);
                    };
                l(),
                    (n = {
                        push: function (u) {
                            s.push(u), l();
                        },
                        filter: function (u) {
                            return (s = s.filter(u)), n;
                        },
                    });
            },
        };
    return o;
}
function Od(e) {
    e === void 0 && (e = {});
    var t = Bd(null);
    return (t.options = Bt({ async: !0, ssr: !1 }, e)), t;
}
var Qs = function (e) {
    var t = e.sideCar,
        n = Dd(e, ['sideCar']);
    if (!t)
        throw new Error(
            'Sidecar: please provide `sideCar` property to import the right car',
        );
    var r = t.read();
    if (!r) throw new Error('Sidecar medium not found');
    return g.createElement(r, Bt({}, n));
};
Qs.isSideCarExport = !0;
function Id(e, t) {
    return e.useMedium(t), Qs;
}
var ei = Od(),
    an = function () {},
    Wt = g.forwardRef(function (e, t) {
        var n = g.useRef(null),
            r = g.useState({
                onScrollCapture: an,
                onWheelCapture: an,
                onTouchMoveCapture: an,
            }),
            o = r[0],
            i = r[1],
            s = e.forwardProps,
            a = e.children,
            c = e.className,
            l = e.removeScrollBar,
            u = e.enabled,
            d = e.shards,
            f = e.sideCar,
            h = e.noIsolation,
            p = e.inert,
            m = e.allowPinchZoom,
            b = e.as,
            w = b === void 0 ? 'div' : b,
            y = e.gapMode,
            v = Td(e, [
                'forwardProps',
                'children',
                'className',
                'removeScrollBar',
                'enabled',
                'shards',
                'sideCar',
                'noIsolation',
                'inert',
                'allowPinchZoom',
                'as',
                'gapMode',
            ]),
            x = f,
            P = Ed([n, t]),
            k = ve(ve({}, v), o);
        return g.createElement(
            g.Fragment,
            null,
            u &&
                g.createElement(x, {
                    sideCar: ei,
                    removeScrollBar: l,
                    shards: d,
                    noIsolation: h,
                    inert: p,
                    setCallbacks: i,
                    allowPinchZoom: !!m,
                    lockRef: n,
                    gapMode: y,
                }),
            s
                ? g.cloneElement(g.Children.only(a), ve(ve({}, k), { ref: P }))
                : g.createElement(w, ve({}, k, { className: c, ref: P }), a),
        );
    });
Wt.defaultProps = { enabled: !0, removeScrollBar: !0, inert: !1 };
Wt.classNames = { fullWidth: wt, zeroRight: xt };
var uo,
    jd = function () {
        if (uo) return uo;
        if (typeof __webpack_nonce__ < 'u') return __webpack_nonce__;
    };
function Fd() {
    if (!document) return null;
    var e = document.createElement('style');
    e.type = 'text/css';
    var t = jd();
    return t && e.setAttribute('nonce', t), e;
}
function Nd(e, t) {
    e.styleSheet
        ? (e.styleSheet.cssText = t)
        : e.appendChild(document.createTextNode(t));
}
function $d(e) {
    var t = document.head || document.getElementsByTagName('head')[0];
    t.appendChild(e);
}
var zd = function () {
        var e = 0,
            t = null;
        return {
            add: function (n) {
                e == 0 && (t = Fd()) && (Nd(t, n), $d(t)), e++;
            },
            remove: function () {
                e--,
                    !e &&
                        t &&
                        (t.parentNode && t.parentNode.removeChild(t),
                        (t = null));
            },
        };
    },
    Gd = function () {
        var e = zd();
        return function (t, n) {
            g.useEffect(
                function () {
                    return (
                        e.add(t),
                        function () {
                            e.remove();
                        }
                    );
                },
                [t && n],
            );
        };
    },
    ti = function () {
        var e = Gd(),
            t = function (n) {
                var r = n.styles,
                    o = n.dynamic;
                return e(r, o), null;
            };
        return t;
    },
    Ud = { left: 0, top: 0, right: 0, gap: 0 },
    ln = function (e) {
        return parseInt(e || '', 10) || 0;
    },
    Wd = function (e) {
        var t = window.getComputedStyle(document.body),
            n = t[e === 'padding' ? 'paddingLeft' : 'marginLeft'],
            r = t[e === 'padding' ? 'paddingTop' : 'marginTop'],
            o = t[e === 'padding' ? 'paddingRight' : 'marginRight'];
        return [ln(n), ln(r), ln(o)];
    },
    Hd = function (e) {
        if ((e === void 0 && (e = 'margin'), typeof window > 'u')) return Ud;
        var t = Wd(e),
            n = document.documentElement.clientWidth,
            r = window.innerWidth;
        return {
            left: t[0],
            top: t[1],
            right: t[2],
            gap: Math.max(0, r - n + t[2] - t[0]),
        };
    },
    _d = ti(),
    Kd = function (e, t, n, r) {
        var o = e.left,
            i = e.top,
            s = e.right,
            a = e.gap;
        return (
            n === void 0 && (n = 'margin'),
            `
  .`
                .concat(
                    Vd,
                    ` {
   overflow: hidden `,
                )
                .concat(
                    r,
                    `;
   padding-right: `,
                )
                .concat(a, 'px ')
                .concat(
                    r,
                    `;
  }
  body {
    overflow: hidden `,
                )
                .concat(
                    r,
                    `;
    overscroll-behavior: contain;
    `,
                )
                .concat(
                    [
                        t && 'position: relative '.concat(r, ';'),
                        n === 'margin' &&
                            `
    padding-left: `
                                .concat(
                                    o,
                                    `px;
    padding-top: `,
                                )
                                .concat(
                                    i,
                                    `px;
    padding-right: `,
                                )
                                .concat(
                                    s,
                                    `px;
    margin-left:0;
    margin-top:0;
    margin-right: `,
                                )
                                .concat(a, 'px ')
                                .concat(
                                    r,
                                    `;
    `,
                                ),
                        n === 'padding' &&
                            'padding-right: '.concat(a, 'px ').concat(r, ';'),
                    ]
                        .filter(Boolean)
                        .join(''),
                    `
  }
  
  .`,
                )
                .concat(
                    xt,
                    ` {
    right: `,
                )
                .concat(a, 'px ')
                .concat(
                    r,
                    `;
  }
  
  .`,
                )
                .concat(
                    wt,
                    ` {
    margin-right: `,
                )
                .concat(a, 'px ')
                .concat(
                    r,
                    `;
  }
  
  .`,
                )
                .concat(xt, ' .')
                .concat(
                    xt,
                    ` {
    right: 0 `,
                )
                .concat(
                    r,
                    `;
  }
  
  .`,
                )
                .concat(wt, ' .')
                .concat(
                    wt,
                    ` {
    margin-right: 0 `,
                )
                .concat(
                    r,
                    `;
  }
  
  body {
    `,
                )
                .concat(Md, ': ')
                .concat(
                    a,
                    `px;
  }
`,
                )
        );
    },
    Xd = function (e) {
        var t = e.noRelative,
            n = e.noImportant,
            r = e.gapMode,
            o = r === void 0 ? 'margin' : r,
            i = g.useMemo(
                function () {
                    return Hd(o);
                },
                [o],
            );
        return g.createElement(_d, {
            styles: Kd(i, !t, o, n ? '' : '!important'),
        });
    },
    Vn = !1;
if (typeof window < 'u')
    try {
        var gt = Object.defineProperty({}, 'passive', {
            get: function () {
                return (Vn = !0), !0;
            },
        });
        window.addEventListener('test', gt, gt),
            window.removeEventListener('test', gt, gt);
    } catch {
        Vn = !1;
    }
var Le = Vn ? { passive: !1 } : !1,
    Yd = function (e) {
        return e.tagName === 'TEXTAREA';
    },
    ni = function (e, t) {
        var n = window.getComputedStyle(e);
        return (
            n[t] !== 'hidden' &&
            !(n.overflowY === n.overflowX && !Yd(e) && n[t] === 'visible')
        );
    },
    qd = function (e) {
        return ni(e, 'overflowY');
    },
    Zd = function (e) {
        return ni(e, 'overflowX');
    },
    fo = function (e, t) {
        var n = t.ownerDocument,
            r = t;
        do {
            typeof ShadowRoot < 'u' && r instanceof ShadowRoot && (r = r.host);
            var o = ri(e, r);
            if (o) {
                var i = oi(e, r),
                    s = i[1],
                    a = i[2];
                if (s > a) return !0;
            }
            r = r.parentNode;
        } while (r && r !== n.body);
        return !1;
    },
    Jd = function (e) {
        var t = e.scrollTop,
            n = e.scrollHeight,
            r = e.clientHeight;
        return [t, n, r];
    },
    Qd = function (e) {
        var t = e.scrollLeft,
            n = e.scrollWidth,
            r = e.clientWidth;
        return [t, n, r];
    },
    ri = function (e, t) {
        return e === 'v' ? qd(t) : Zd(t);
    },
    oi = function (e, t) {
        return e === 'v' ? Jd(t) : Qd(t);
    },
    ef = function (e, t) {
        return e === 'h' && t === 'rtl' ? -1 : 1;
    },
    tf = function (e, t, n, r, o) {
        var i = ef(e, window.getComputedStyle(t).direction),
            s = i * r,
            a = n.target,
            c = t.contains(a),
            l = !1,
            u = s > 0,
            d = 0,
            f = 0;
        do {
            var h = oi(e, a),
                p = h[0],
                m = h[1],
                b = h[2],
                w = m - b - i * p;
            (p || w) && ri(e, a) && ((d += w), (f += p)), (a = a.parentNode);
        } while (
            (!c && a !== document.body) ||
            (c && (t.contains(a) || t === a))
        );
        return (
            ((u && ((o && d === 0) || (!o && s > d))) ||
                (!u && ((o && f === 0) || (!o && -s > f)))) &&
                (l = !0),
            l
        );
    },
    yt = function (e) {
        return 'changedTouches' in e
            ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY]
            : [0, 0];
    },
    ho = function (e) {
        return [e.deltaX, e.deltaY];
    },
    po = function (e) {
        return e && 'current' in e ? e.current : e;
    },
    nf = function (e, t) {
        return e[0] === t[0] && e[1] === t[1];
    },
    rf = function (e) {
        return `
  .block-interactivity-`
            .concat(
                e,
                ` {pointer-events: none;}
  .allow-interactivity-`,
            )
            .concat(
                e,
                ` {pointer-events: all;}
`,
            );
    },
    of = 0,
    Be = [];
function sf(e) {
    var t = g.useRef([]),
        n = g.useRef([0, 0]),
        r = g.useRef(),
        o = g.useState(of++)[0],
        i = g.useState(ti)[0],
        s = g.useRef(e);
    g.useEffect(
        function () {
            s.current = e;
        },
        [e],
    ),
        g.useEffect(
            function () {
                if (e.inert) {
                    document.body.classList.add(
                        'block-interactivity-'.concat(o),
                    );
                    var m = Ad(
                        [e.lockRef.current],
                        (e.shards || []).map(po),
                        !0,
                    ).filter(Boolean);
                    return (
                        m.forEach(function (b) {
                            return b.classList.add(
                                'allow-interactivity-'.concat(o),
                            );
                        }),
                        function () {
                            document.body.classList.remove(
                                'block-interactivity-'.concat(o),
                            ),
                                m.forEach(function (b) {
                                    return b.classList.remove(
                                        'allow-interactivity-'.concat(o),
                                    );
                                });
                        }
                    );
                }
            },
            [e.inert, e.lockRef.current, e.shards],
        );
    var a = g.useCallback(function (m, b) {
            if ('touches' in m && m.touches.length === 2)
                return !s.current.allowPinchZoom;
            var w = yt(m),
                y = n.current,
                v = 'deltaX' in m ? m.deltaX : y[0] - w[0],
                x = 'deltaY' in m ? m.deltaY : y[1] - w[1],
                P,
                k = m.target,
                R = Math.abs(v) > Math.abs(x) ? 'h' : 'v';
            if ('touches' in m && R === 'h' && k.type === 'range') return !1;
            var S = fo(R, k);
            if (!S) return !0;
            if (
                (S ? (P = R) : ((P = R === 'v' ? 'h' : 'v'), (S = fo(R, k))),
                !S)
            )
                return !1;
            if (
                (!r.current &&
                    'changedTouches' in m &&
                    (v || x) &&
                    (r.current = P),
                !P)
            )
                return !0;
            var D = r.current || P;
            return tf(D, b, m, D === 'h' ? v : x, !0);
        }, []),
        c = g.useCallback(function (m) {
            var b = m;
            if (!(!Be.length || Be[Be.length - 1] !== i)) {
                var w = 'deltaY' in b ? ho(b) : yt(b),
                    y = t.current.filter(function (P) {
                        return (
                            P.name === b.type &&
                            P.target === b.target &&
                            nf(P.delta, w)
                        );
                    })[0];
                if (y && y.should) {
                    b.cancelable && b.preventDefault();
                    return;
                }
                if (!y) {
                    var v = (s.current.shards || [])
                            .map(po)
                            .filter(Boolean)
                            .filter(function (P) {
                                return P.contains(b.target);
                            }),
                        x = v.length > 0 ? a(b, v[0]) : !s.current.noIsolation;
                    x && b.cancelable && b.preventDefault();
                }
            }
        }, []),
        l = g.useCallback(function (m, b, w, y) {
            var v = { name: m, delta: b, target: w, should: y };
            t.current.push(v),
                setTimeout(function () {
                    t.current = t.current.filter(function (x) {
                        return x !== v;
                    });
                }, 1);
        }, []),
        u = g.useCallback(function (m) {
            (n.current = yt(m)), (r.current = void 0);
        }, []),
        d = g.useCallback(function (m) {
            l(m.type, ho(m), m.target, a(m, e.lockRef.current));
        }, []),
        f = g.useCallback(function (m) {
            l(m.type, yt(m), m.target, a(m, e.lockRef.current));
        }, []);
    g.useEffect(function () {
        return (
            Be.push(i),
            e.setCallbacks({
                onScrollCapture: d,
                onWheelCapture: d,
                onTouchMoveCapture: f,
            }),
            document.addEventListener('wheel', c, Le),
            document.addEventListener('touchmove', c, Le),
            document.addEventListener('touchstart', u, Le),
            function () {
                (Be = Be.filter(function (m) {
                    return m !== i;
                })),
                    document.removeEventListener('wheel', c, Le),
                    document.removeEventListener('touchmove', c, Le),
                    document.removeEventListener('touchstart', u, Le);
            }
        );
    }, []);
    var h = e.removeScrollBar,
        p = e.inert;
    return g.createElement(
        g.Fragment,
        null,
        p ? g.createElement(i, { styles: rf(o) }) : null,
        h ? g.createElement(Xd, { gapMode: e.gapMode }) : null,
    );
}
const af = Id(ei, sf);
var si = g.forwardRef(function (e, t) {
    return g.createElement(Wt, ve({}, e, { ref: t, sideCar: af }));
});
si.classNames = Wt.classNames;
const lf = si;
var [cf, Yn] = na({
        name: 'ModalContext',
        errorMessage:
            'useModalContext: `context` is undefined. Seems you forgot to wrap all popover components within `<Modal />`',
    }),
    ii = Ot((e, t) => {
        const { as: n, children: r, className: o, ...i } = e,
            { slots: s, classNames: a, bodyId: c, setBodyMounted: l } = Yn(),
            u = Eo(t),
            d = n || 'div';
        return (
            g.useEffect(() => (l(!0), () => l(!1)), [l]),
            K.jsx(d, {
                ref: u,
                className: s.body({
                    class: St(a == null ? void 0 : a.body, o),
                }),
                id: c,
                ...i,
                children: r,
            })
        );
    });
ii.displayName = 'NextUI.ModalBody';
var mf = ii,
    uf = {
        enter: {
            scale: 'var(--scale-enter)',
            y: 'var(--slide-enter))',
            opacity: 1,
            transition: {
                scale: { duration: 0.4, ease: ue.ease },
                opacity: { duration: 0.4, ease: ue.ease },
                y: { type: 'spring', bounce: 0, duration: 0.6 },
            },
        },
        exit: {
            scale: 'var(--scale-exit)',
            y: 'var(--slide-exit)',
            opacity: 0,
            transition: { duration: 0.3, ease: ue.ease },
        },
    },
    ai = Ot((e, t) => {
        const { as: n, children: r, role: o = 'dialog', ...i } = e,
            {
                Component: s,
                dialogRef: a,
                slots: c,
                isOpen: l,
                classNames: u,
                motionProps: d,
                backdrop: f,
                closeButton: h,
                hideCloseButton: p,
                disableAnimation: m,
                shouldBlockScroll: b,
                getDialogProps: w,
                getBackdropProps: y,
                getCloseButtonProps: v,
                onClose: x,
            } = Yn(),
            P = n || s || 'div',
            { dialogProps: k } = Sd({ role: o }, a),
            R = g.isValidElement(h)
                ? g.cloneElement(h, v())
                : K.jsx('button', { ...v(), children: K.jsx(oa, {}) }),
            S = K.jsxs(P, {
                ...w($e(k, i)),
                children: [
                    K.jsx(Jn, { onDismiss: x }),
                    !p && R,
                    typeof r == 'function' ? r(x) : r,
                    K.jsx(Jn, { onDismiss: x }),
                ],
            }),
            D = g.useMemo(
                () =>
                    f === 'transparent'
                        ? null
                        : m
                        ? K.jsx('div', { ...y() })
                        : K.jsx(co.div, {
                              animate: 'enter',
                              exit: 'exit',
                              initial: 'exit',
                              variants: xd.fade,
                              ...y(),
                          }),
                [f, m, y],
            );
        return K.jsxs('div', {
            tabIndex: -1,
            children: [
                D,
                K.jsx(lf, {
                    forwardProps: !0,
                    enabled: b && l,
                    removeScrollBar: !1,
                    children: m
                        ? K.jsx('div', {
                              className: c.wrapper({
                                  class: u == null ? void 0 : u.wrapper,
                              }),
                              children: S,
                          })
                        : K.jsx(co.div, {
                              animate: 'enter',
                              className: c.wrapper({
                                  class: u == null ? void 0 : u.wrapper,
                              }),
                              exit: 'exit',
                              initial: 'exit',
                              variants: uf,
                              ...d,
                              children: S,
                          }),
                }),
            ],
        });
    });
ai.displayName = 'NextUI.ModalContent';
var gf = ai,
    li = Ot((e, t) => {
        const { as: n, children: r, className: o, ...i } = e,
            {
                slots: s,
                classNames: a,
                headerId: c,
                setHeaderMounted: l,
            } = Yn(),
            u = Eo(t),
            d = n || 'header';
        return (
            g.useEffect(() => (l(!0), () => l(!1)), [l]),
            K.jsx(d, {
                ref: u,
                className: s.header({
                    class: St(a == null ? void 0 : a.header, o),
                }),
                id: c,
                ...i,
                children: r,
            })
        );
    });
li.displayName = 'NextUI.ModalHeader';
var yf = li;
function df(e = {}, t, n) {
    let { overlayProps: r, underlayProps: o } = pi(
        { ...e, isOpen: t.isOpen, onClose: t.close },
        n,
    );
    return (
        vo(),
        g.useEffect(() => {
            if (t.isOpen && n.current) return mi([n.current]);
        }, [t.isOpen, n]),
        { modalProps: $e(r), underlayProps: o }
    );
}
function ff(e) {
    var t;
    const [n, r] = xi(e, sr.variantKeys),
        {
            ref: o,
            as: i,
            className: s,
            classNames: a,
            disableAnimation: c = !1,
            isOpen: l,
            defaultOpen: u,
            onOpenChange: d,
            motionProps: f,
            closeButton: h,
            isDismissable: p = !0,
            hideCloseButton: m = !1,
            shouldBlockScroll: b = !0,
            portalContainer: w,
            isKeyboardDismissDisabled: y = !1,
            onClose: v,
            ...x
        } = n,
        P = i || 'section',
        k = g.useRef(null),
        R = g.useRef(null),
        [S, D] = g.useState(!1),
        [H, X] = g.useState(!1),
        L = g.useId(),
        Y = g.useId(),
        I = g.useId();
    g.useImperativeHandle(o, () => ra(k));
    const O = Cd({
            isOpen: l,
            defaultOpen: u,
            onOpenChange: (N) => {
                d == null || d(N), N || v == null || v();
            },
        }),
        { modalProps: _, underlayProps: J } = df(
            { isDismissable: p, isKeyboardDismissDisabled: y },
            O,
            k,
        ),
        { buttonProps: le } = Pd({ onPress: O.close }, R),
        { isFocusVisible: T, focusProps: E } = gi(),
        C = St(a == null ? void 0 : a.base, s),
        V = g.useMemo(() => sr({ ...r }), [...Object.values(r)]),
        M = (N = {}, Q = null) => ({
            ref: yi(Q, k),
            ...$e(_, x, N),
            className: V.base({ class: St(C, N.className) }),
            id: L,
            'data-open': dt(O.isOpen),
            'data-dismissable': dt(p),
            'aria-modal': dt(!0),
            'aria-labelledby': S ? Y : void 0,
            'aria-describedby': H ? I : void 0,
        }),
        j = g.useCallback(
            (N = {}) => ({
                className: V.backdrop({
                    class: a == null ? void 0 : a.backdrop,
                }),
                onClick: () => O.close(),
                ...J,
                ...N,
            }),
            [V, a, J],
        ),
        U = () => ({
            role: 'button',
            tabIndex: 0,
            'aria-label': 'Close',
            'data-focus-visible': dt(T),
            className: V.closeButton({
                class: a == null ? void 0 : a.closeButton,
            }),
            ...$e(le, E),
        });
    return {
        Component: P,
        slots: V,
        dialogRef: k,
        headerId: Y,
        bodyId: I,
        motionProps: f,
        classNames: a,
        isDismissable: p,
        closeButton: h,
        hideCloseButton: m,
        portalContainer: w,
        shouldBlockScroll: b,
        backdrop: (t = e.backdrop) != null ? t : 'opaque',
        isOpen: O.isOpen,
        onClose: O.close,
        disableAnimation: c,
        setBodyMounted: X,
        setHeaderMounted: D,
        getDialogProps: M,
        getBackdropProps: j,
        getCloseButtonProps: U,
    };
}
var ci = Ot((e, t) => {
    const { children: n, ...r } = e,
        o = ff({ ...r, ref: t }),
        i = K.jsx(vi, { portalContainer: o.portalContainer, children: n });
    return K.jsx(cf, {
        value: o,
        children:
            o.disableAnimation && o.isOpen
                ? i
                : K.jsx(bd, { children: o.isOpen ? i : null }),
    });
});
ci.displayName = 'NextUI.Modal';
var vf = ci;
function mo(e, t = []) {
    const n = g.useRef(e);
    return (
        wd(() => {
            n.current = e;
        }),
        g.useCallback((...r) => {
            var o;
            return (o = n.current) == null ? void 0 : o.call(n, ...r);
        }, t)
    );
}
function bf(e = {}) {
    const {
            id: t,
            defaultOpen: n,
            isOpen: r,
            onClose: o,
            onOpen: i,
            onChange: s = () => {},
        } = e,
        a = mo(i),
        c = mo(o),
        [l, u] = bo(r, n || !1, s),
        d = g.useId(),
        f = t || d,
        h = r !== void 0,
        p = g.useCallback(() => {
            h || u(!1), c == null || c();
        }, [h, c]),
        m = g.useCallback(() => {
            h || u(!0), a == null || a();
        }, [h, a]),
        b = g.useCallback(() => {
            (l ? p : m)();
        }, [l, m, p]);
    return {
        isOpen: !!l,
        onOpen: m,
        onClose: p,
        onOpenChange: b,
        isControlled: h,
        getButtonProps: (w = {}) => ({
            ...w,
            'aria-expanded': l,
            'aria-controls': f,
            onClick: bi(w.onClick, b),
        }),
        getDisclosureProps: (w = {}) => ({ ...w, hidden: !l, id: f }),
    };
}
const xf = async (e) => {
        try {
            return (
                await Ue.get('/api/v1/notes/', {
                    headers: { Authorization: `Bearer ${e}` },
                })
            ).data;
        } catch (t) {
            throw new Error(`Error fetching notes: ${t}`);
        }
    },
    wf = async (e, t) => {
        try {
            return (
                await Ue.post('/api/v1/notes/', e, {
                    headers: {
                        Authorization: `Bearer ${t}`,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                })
            ).data;
        } catch (n) {
            throw new Error(`Error creating note: ${n}`);
        }
    },
    Pf = async (e, t) => {
        try {
            return (
                await Ue.get(`/api/v1/note/${e}/`, {
                    headers: { Authorization: `Bearer ${t}` },
                })
            ).data;
        } catch (n) {
            throw new Error(`Error retrieving note: ${n}`);
        }
    },
    Cf = async (e, t, n) => {
        try {
            return (
                await Ue.patch(`/api/v1/note/${e}/`, t, {
                    headers: {
                        Authorization: `Bearer ${n}`,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                })
            ).data;
        } catch (r) {
            throw new Error(`Error partially updating note: ${r}`);
        }
    },
    Sf = async (e, t) => {
        console.log('destroyNote');
        try {
            await Ue.delete(`/api/v1/note/${e}/`, {
                headers: { Authorization: `Bearer ${t}` },
            });
        } catch (n) {
            throw new Error(`Error deleting note: ${n}`);
        }
    },
    Tf = async (e, t, n) => {
        try {
            return (
                await Ue.patch(`/api/v1/note/analyze/${e}/`, t, {
                    headers: {
                        Authorization: `Bearer ${n}`,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                })
            ).data;
        } catch (r) {
            throw new Error(`Error analysing note: ${r}`);
        }
    };
export {
    gf as a,
    yf as b,
    wf as c,
    mf as d,
    na as e,
    wd as f,
    Eo as g,
    St as h,
    dt as i,
    Ot as j,
    Sf as k,
    xf as l,
    vf as m,
    co as n,
    Tf as o,
    Cf as p,
    Yn as q,
    Pf as r,
    ta as t,
    bf as u,
};
