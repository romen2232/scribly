import {
    y as fe,
    z as R,
    j as e,
    r as d,
    $ as xe,
    D as he,
    E as T,
    b as w,
    t as P,
    R as me,
    L as E,
    u as j,
    p as N,
    U as F,
    A as p,
    G as be,
    J as pe,
    M as we,
    _ as ve,
    q as ye,
    Q as J,
    c as je,
    H as Ne,
} from './index-9db94e76.js';
import {
    t as q,
    e as Ce,
    f as Ee,
    g as H,
    h as Y,
    i as k,
    j as $e,
    u as ke,
    m as Pe,
    a as Fe,
    b as Ae,
    d as Be,
    l as Se,
} from './notes-0819c811.js';
var Re = {
        default: 'bg-default text-default-foreground',
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        success: 'bg-success text-success-foreground',
        warning: 'bg-warning text-warning-foreground',
        danger: 'bg-danger text-danger-foreground',
        foreground: 'bg-foreground text-background',
    },
    _e = {
        default:
            'shadow-lg shadow-default/50 bg-default text-default-foreground',
        primary:
            'shadow-lg shadow-primary/40 bg-primary text-primary-foreground',
        secondary:
            'shadow-lg shadow-secondary/40 bg-secondary text-secondary-foreground',
        success:
            'shadow-lg shadow-success/40 bg-success text-success-foreground',
        warning:
            'shadow-lg shadow-warning/40 bg-warning text-warning-foreground',
        danger: 'shadow-lg shadow-danger/40 bg-danger text-danger-foreground',
        foreground:
            'shadow-lg shadow-foreground/40 bg-foreground text-background',
    },
    Ue = {
        default: 'bg-transparent border-default text-foreground',
        primary: 'bg-transparent border-primary text-primary',
        secondary: 'bg-transparent border-secondary text-secondary',
        success: 'bg-transparent border-success text-success',
        warning: 'bg-transparent border-warning text-warning',
        danger: 'bg-transparent border-danger text-danger',
        foreground: 'bg-transparent border-foreground text-foreground',
    },
    Ie = {
        default: 'bg-default/40 text-default-foreground',
        primary: 'bg-primary/20 text-primary',
        secondary: 'bg-secondary/20 text-secondary',
        success: 'bg-success/20 text-success-600 dark:text-success',
        warning: 'bg-warning/20 text-warning-600 dark:text-warning',
        danger: 'bg-danger/20 text-danger dark:text-danger-500',
        foreground: 'bg-foreground/10 text-foreground',
    },
    ze = {
        default: 'border-default bg-default-100 text-default-foreground',
        primary: 'border-default bg-default-100 text-primary',
        secondary: 'border-default bg-default-100 text-secondary',
        success: 'border-default bg-default-100 text-success',
        warning: 'border-default bg-default-100 text-warning',
        danger: 'border-default bg-default-100 text-danger',
        foreground: 'border-default bg-default-100 text-foreground',
    },
    Le = {
        default: 'bg-transparent text-default-foreground',
        primary: 'bg-transparent text-primary',
        secondary: 'bg-transparent text-secondary',
        success: 'bg-transparent text-success',
        warning: 'bg-transparent text-warning',
        danger: 'bg-transparent text-danger',
        foreground: 'bg-transparent text-foreground',
    },
    Me = {
        default: 'border-default text-default-foreground hover:!bg-default',
        primary:
            'border-primary text-primary hover:!text-primary-foreground hover:!bg-primary',
        secondary:
            'border-secondary text-secondary hover:text-secondary-foreground hover:!bg-secondary',
        success:
            'border-success text-success hover:!text-success-foreground hover:!bg-success',
        warning:
            'border-warning text-warning hover:!text-warning-foreground hover:!bg-warning',
        danger: 'border-danger text-danger hover:!text-danger-foreground hover:!bg-danger',
        foreground: 'border-foreground text-foreground hover:!bg-foreground',
    },
    y = {
        solid: Re,
        shadow: _e,
        bordered: Ue,
        flat: Ie,
        faded: ze,
        light: Le,
        ghost: Me,
    },
    Ge = q({
        slots: {
            base: [
                'flex',
                'relative',
                'justify-center',
                'items-center',
                'box-border',
                'overflow-hidden',
                'align-middle',
                'text-white',
                'z-10',
                ...fe,
            ],
            img: [
                'flex',
                'object-cover',
                'w-full',
                'h-full',
                'transition-opacity',
                '!duration-500',
                'opacity-0',
                'data-[loaded=true]:opacity-100',
            ],
            fallback: [...R, 'flex', 'items-center', 'justify-center'],
            name: [...R, 'font-normal', 'text-center', 'text-inherit'],
            icon: [
                ...R,
                'flex',
                'items-center',
                'justify-center',
                'text-inherit',
                'w-full',
                'h-full',
            ],
        },
        variants: {
            size: {
                sm: { base: 'w-8 h-8 text-tiny' },
                md: { base: 'w-10 h-10 text-tiny' },
                lg: { base: 'w-14 h-14 text-small' },
            },
            color: {
                default: { base: y.solid.default },
                primary: { base: y.solid.primary },
                secondary: { base: y.solid.secondary },
                success: { base: y.solid.success },
                warning: { base: y.solid.warning },
                danger: { base: y.solid.danger },
            },
            radius: {
                none: { base: 'rounded-none' },
                sm: { base: 'rounded-small' },
                md: { base: 'rounded-medium' },
                lg: { base: 'rounded-large' },
                full: { base: 'rounded-full' },
            },
            isBordered: {
                true: {
                    base: 'ring-2 ring-offset-2 ring-offset-background dark:ring-offset-background-dark',
                },
            },
            isDisabled: { true: { base: 'opacity-disabled' } },
            isInGroup: {
                true: {
                    base: [
                        '-ml-2 data-[hover=true]:-translate-x-3 transition-transform',
                        'data-[focus-visible=true]:-translate-x-3',
                    ],
                },
            },
            isInGridGroup: {
                true: { base: 'm-0 data-[hover=true]:translate-x-0' },
            },
        },
        defaultVariants: { size: 'md', color: 'default', radius: 'full' },
        compoundVariants: [
            {
                color: 'default',
                isBordered: !0,
                class: { base: 'ring-default' },
            },
            { color: 'primary', isBordered: !0, class: { base: 'ring-focus' } },
            {
                color: 'secondary',
                isBordered: !0,
                class: { base: 'ring-secondary' },
            },
            {
                color: 'success',
                isBordered: !0,
                class: { base: 'ring-success' },
            },
            {
                color: 'warning',
                isBordered: !0,
                class: { base: 'ring-warning' },
            },
            { color: 'danger', isBordered: !0, class: { base: 'ring-danger' } },
        ],
    });
q({
    base: 'flex items-center justify-center h-auto w-max-content',
    variants: { isGrid: { true: 'inline-grid grid-cols-4 gap-3' } },
});
var Oe = (r) =>
        (r == null ? void 0 : r.length) <= 4
            ? r
            : r == null
            ? void 0
            : r.slice(0, 3),
    De = () =>
        e.jsxs('svg', {
            'aria-hidden': 'true',
            fill: 'none',
            height: '80%',
            role: 'presentation',
            viewBox: '0 0 24 24',
            width: '80%',
            children: [
                e.jsx('path', {
                    d: 'M12 2C9.38 2 7.25 4.13 7.25 6.75C7.25 9.32 9.26 11.4 11.88 11.49C11.96 11.48 12.04 11.48 12.1 11.49C12.12 11.49 12.13 11.49 12.15 11.49C12.16 11.49 12.16 11.49 12.17 11.49C14.73 11.4 16.74 9.32 16.75 6.75C16.75 4.13 14.62 2 12 2Z',
                    fill: 'currentColor',
                }),
                e.jsx('path', {
                    d: 'M17.0809 14.1489C14.2909 12.2889 9.74094 12.2889 6.93094 14.1489C5.66094 14.9989 4.96094 16.1489 4.96094 17.3789C4.96094 18.6089 5.66094 19.7489 6.92094 20.5889C8.32094 21.5289 10.1609 21.9989 12.0009 21.9989C13.8409 21.9989 15.6809 21.5289 17.0809 20.5889C18.3409 19.7389 19.0409 18.5989 19.0409 17.3589C19.0309 16.1289 18.3409 14.9889 17.0809 14.1489Z',
                    fill: 'currentColor',
                }),
            ],
        }),
    [br, Ve] = Ce({ name: 'AvatarGroupContext', strict: !1 });
function Te(r = {}) {
    const {
            loading: t,
            src: s,
            srcSet: n,
            onLoad: l,
            onError: c,
            crossOrigin: o,
            sizes: a,
            ignoreFallback: i,
        } = r,
        [h, u] = d.useState('pending');
    d.useEffect(() => {
        u(s ? 'loading' : 'pending');
    }, [s]);
    const f = d.useRef(),
        m = d.useCallback(() => {
            if (!s) return;
            x();
            const g = new Image();
            (g.src = s),
                o && (g.crossOrigin = o),
                n && (g.srcset = n),
                a && (g.sizes = a),
                t && (g.loading = t),
                (g.onload = (b) => {
                    x(), u('loaded'), l == null || l(b);
                }),
                (g.onerror = (b) => {
                    x(), u('failed'), c == null || c(b);
                }),
                (f.current = g);
        }, [s, o, n, a, l, c, t]),
        x = () => {
            f.current &&
                ((f.current.onload = null),
                (f.current.onerror = null),
                (f.current = null));
        };
    return (
        Ee(() => {
            if (!i)
                return (
                    h === 'loading' && m(),
                    () => {
                        x();
                    }
                );
        }, [h, m, i]),
        i ? 'loaded' : h
    );
}
function Je(r = {}) {
    var t, s, n, l, c;
    const o = Ve(),
        a = !!o,
        {
            as: i,
            ref: h,
            src: u,
            name: f,
            icon: m,
            classNames: x,
            fallback: g,
            alt: b = f || 'avatar',
            imgRef: X,
            color: _ = (t = o == null ? void 0 : o.color) != null
                ? t
                : 'default',
            radius: U = (s = o == null ? void 0 : o.radius) != null
                ? s
                : 'full',
            size: I = (n = o == null ? void 0 : o.size) != null ? n : 'md',
            isBordered: z = (l = o == null ? void 0 : o.isBordered) != null
                ? l
                : !1,
            isDisabled: A = (c = o == null ? void 0 : o.isDisabled) != null
                ? c
                : !1,
            isFocusable: L = !1,
            getInitials: W = Oe,
            ignoreFallback: M = !1,
            showFallback: ee = !1,
            ImgComponent: re = 'img',
            imgProps: G,
            className: se,
            onError: te,
            ...O
        } = r,
        ae = i || 'span',
        oe = H(h),
        B = H(X),
        { isFocusVisible: ne, isFocused: le, focusProps: D } = xe(),
        { isHovered: ie, hoverProps: de } = he({ isDisabled: A }),
        $ = Te({ src: u, onError: te, ignoreFallback: M }) === 'loaded',
        ce = (!u || !$) && ee,
        C = d.useMemo(() => {
            var v;
            return Ge({
                color: _,
                radius: U,
                size: I,
                isBordered: z,
                isDisabled: A,
                isInGroup: a,
                isInGridGroup:
                    (v = o == null ? void 0 : o.isGrid) != null ? v : !1,
            });
        }, [_, U, I, z, A, a, o == null ? void 0 : o.isGrid]),
        V = Y(x == null ? void 0 : x.base, se),
        S = d.useMemo(() => L || i === 'button', [L, i]),
        ue = d.useCallback(
            (v = {}) => ({
                ref: oe,
                tabIndex: S ? 0 : -1,
                'data-hover': k(ie),
                'data-focus': k(le),
                'data-focus-visible': k(ne),
                className: C.base({
                    class: Y(V, v == null ? void 0 : v.className),
                }),
                ...T(O, de, S ? D : {}),
            }),
            [S, C, V, D, O],
        ),
        ge = d.useCallback(
            (v = {}) => ({
                ref: B,
                src: u,
                'data-loaded': k($),
                className: C.img({ class: x == null ? void 0 : x.img }),
                ...T(G, v),
            }),
            [C, $, G, u, B],
        );
    return {
        Component: ae,
        ImgComponent: re,
        src: u,
        alt: b,
        icon: m,
        name: f,
        imgRef: B,
        slots: C,
        classNames: x,
        fallback: g,
        isImgLoaded: $,
        showFallback: ce,
        ignoreFallback: M,
        getInitials: W,
        getAvatarProps: ue,
        getImageProps: ge,
    };
}
var Q = $e((r, t) => {
    const {
            Component: s,
            ImgComponent: n,
            src: l,
            icon: c = e.jsx(De, {}),
            alt: o,
            classNames: a,
            slots: i,
            name: h,
            showFallback: u,
            fallback: f,
            getInitials: m,
            getAvatarProps: x,
            getImageProps: g,
        } = Je({ ...r, ref: t }),
        b = d.useMemo(
            () =>
                !u && l
                    ? null
                    : f
                    ? e.jsx('div', {
                          'aria-label': o,
                          className: i.fallback({
                              class: a == null ? void 0 : a.fallback,
                          }),
                          role: 'img',
                          children: f,
                      })
                    : h
                    ? e.jsx('span', {
                          'aria-label': o,
                          className: i.name({
                              class: a == null ? void 0 : a.name,
                          }),
                          role: 'img',
                          children: m(h),
                      })
                    : e.jsx('span', {
                          'aria-label': o,
                          className: i.icon({
                              class: a == null ? void 0 : a.icon,
                          }),
                          role: 'img',
                          children: c,
                      }),
            [u, l, f, h, a],
        );
    return e.jsxs(s, {
        ...x(),
        children: [l && e.jsx(n, { ...g(), alt: o }), b],
    });
});
Q.displayName = 'NextUI.Avatar';
var He = Q;
const Ye = async (r, t) => {
        try {
            return (
                await w.get(`/api/v1/follows/${r}/followers/`, {
                    headers: { Authorization: `Bearer ${t}` },
                })
            ).data;
        } catch (s) {
            throw new Error(`Error listing user followers: ${s}`);
        }
    },
    Ke = async (r, t) => {
        try {
            return (
                await w.get(`/api/v1/follows/${r}/following/`, {
                    headers: { Authorization: `Bearer ${t}` },
                })
            ).data;
        } catch (s) {
            throw new Error(`Error listing user followings: ${s}`);
        }
    },
    Ze = async (r, t, s) => {
        try {
            await w.delete(`/api/v1/follows/${r}/unfollow/${t}/`, {
                headers: { Authorization: `Bearer ${s}` },
            });
        } catch (n) {
            throw new Error(`Error deleting follow relation: ${n}`);
        }
    },
    qe = async (r, t, s) => {
        try {
            return (
                await w.post(
                    '/api/v1/follows/',
                    { follower: r, followed: t },
                    { headers: { Authorization: `Bearer ${s}` } },
                )
            ).data;
        } catch (n) {
            throw new Error(`Error creating follow relation: ${n}`);
        }
    },
    Qe = ({ user: r, children: t }) => {
        const { username: s, profilePhoto: n, experience: l } = r;
        return e.jsxs('div', {
            className: 'flex items-center justify-between border-b-2 p-4',
            children: [
                e.jsxs('div', {
                    className: 'flex items-center gap-6',
                    children: [
                        e.jsx(He, {
                            src: n,
                            name: s ?? '',
                            showFallback: !0,
                            size: 'md',
                        }),
                        e.jsxs('div', {
                            children: [
                                e.jsx('p', {
                                    className: 'text-lg font-bold',
                                    children: s,
                                }),
                                e.jsx('p', {
                                    className: 'text-sm text-gray-500',
                                    children: l + ' ' + P('TotalXp'),
                                }),
                            ],
                        }),
                    ],
                }),
                t ?? e.jsx(me, { className: 'text-gray-500' }),
            ],
        });
    },
    Xe = ({ users: r, children: t }) =>
        e.jsx('div', {
            children:
                r == null
                    ? void 0
                    : r.map((s) =>
                          e.jsx(
                              E,
                              {
                                  to: P('/profile') + '/' + s.username,
                                  children: e.jsx(
                                      Qe,
                                      { user: s, children: t },
                                      s.id,
                                  ),
                              },
                              s.id,
                          ),
                      ),
        }),
    K = ({ type: r, follows: t }) => {
        const { isOpen: s, onOpen: n, onOpenChange: l } = ke();
        let c = null,
            o = null;
        r === 'followers' &&
            ((c = t.map((i) => i.follower)),
            (o = e.jsx('button', {
                className: 'text-sm text-gray-500 hover:text-gray-700',
                children: P('profile.follow'),
            }))),
            r === 'following' && (c = t.map((i) => i.followed));
        const a = r.charAt(0).toUpperCase() + r.slice(1);
        return e.jsxs('div', {
            className: 'flex flex-col gap-2',
            children: [
                e.jsxs('button', {
                    onClick: n,
                    className: 'text-sm text-gray-500 hover:text-gray-700',
                    ...(t.length === 0 && { disabled: !0 }),
                    children: [t.length, ' ', P('profile.' + a)],
                }),
                e.jsx(Pe, {
                    isOpen: s,
                    onOpenChange: l,
                    scrollBehavior: 'inside',
                    children: e.jsx(Fe, {
                        children: e.jsxs(e.Fragment, {
                            children: [
                                e.jsx(Ae, {
                                    className: 'flex flex-col gap-1',
                                    children: a,
                                }),
                                e.jsx(Be, {
                                    children: e.jsx(Xe, {
                                        users: c,
                                        children: o,
                                    }),
                                }),
                            ],
                        }),
                    }),
                }),
            ],
        });
    },
    We = ({ user: r }) => {
        var x;
        const t = r.profilePhoto,
            { t: s } = j(),
            [n, l] = d.useState([]),
            [c, o] = d.useState([]),
            [a, i] = d.useState(!1),
            [h, u] = d.useState(!1),
            f = N(),
            m = JSON.parse(f[F]);
        return (
            d.useEffect(() => {
                Ye(r.id, f[p])
                    .then((g) => {
                        l(g),
                            g.some((b) => b.follower.username === m.username) &&
                                i(!0);
                    })
                    .catch((g) => {
                        console.log(g);
                    });
            }, []),
            d.useEffect(() => {
                Ke(r.id, f[p])
                    .then((g) => {
                        o(g),
                            g.some((b) => b.followed.username === m.username) &&
                                u(!0);
                    })
                    .catch((g) => {
                        console.log(g);
                    });
            }, []),
            e.jsxs(e.Fragment, {
                children: [
                    e.jsxs('div', {
                        className: 'flex',
                        children: [
                            e.jsxs('div', {
                                className: 'w-full overflow-hidden',
                                children: [
                                    e.jsx('h1', {
                                        className:
                                            'text-center text-2xl font-bold',
                                        children:
                                            (x = r.username) == null
                                                ? void 0
                                                : x.toUpperCase(),
                                    }),
                                    e.jsx('h2', {
                                        children:
                                            (r.firstName ?? '') +
                                            ' ' +
                                            (r.lastName ?? ''),
                                    }),
                                    e.jsxs('div', {
                                        children: [
                                            e.jsx('h3', {
                                                className:
                                                    'px-1.5 text-center text-sm text-gray-700',
                                                children:
                                                    s('profile.Since') +
                                                    ' ' +
                                                    be(r.dateJoined ?? ''),
                                            }),
                                            e.jsx('h4', {
                                                children:
                                                    m.username !== r.username
                                                        ? s(
                                                              h
                                                                  ? 'profile.FollowsYou'
                                                                  : 'profile.DoesNotFollowYou',
                                                          )
                                                        : null,
                                            }),
                                        ],
                                    }),
                                    e.jsxs('div', {
                                        className: 'flex justify-around p-5',
                                        children: [
                                            e.jsx(K, {
                                                type: 'followers',
                                                follows: n,
                                            }),
                                            e.jsx(K, {
                                                type: 'following',
                                                follows: c,
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                            e.jsx('div', {
                                className: 'mx-20 flex w-40 items-center',
                                children: e.jsx('img', {
                                    src: t ?? '/user.png',
                                    alt: 'avatar',
                                    className:
                                        'rounded-full border border-gray-500 shadow-sm',
                                }),
                            }),
                        ],
                    }),
                    e.jsxs('div', {
                        className: 'flex justify-around py-8',
                        children: [
                            m.username == r.username
                                ? e.jsx('button', {
                                      className: `
                        focus:shadow-outline
                        rounded
                        bg-tiviElectricPurple-100
                        px-4
                        py-2
                        font-bold
                        hover:bg-tiviElectricViolet
                        focus:outline-none
                    `,
                                      children: s('profile.AddFriends'),
                                  })
                                : a
                                ? e.jsx('button', {
                                      className: `
                        focus:shadow-outline
                        rounded
                        bg-tiviElectricPurple-100
                        px-4
                        py-2
                        font-bold
                        hover:bg-tiviElectricViolet
                        focus:outline-none
                    `,
                                      onClick: () => Ze(m.id, r.id, f[p]),
                                      children: s('profile.Unfollow'),
                                  })
                                : e.jsx('button', {
                                      className: `
                        focus:shadow-outline
                        rounded
                        bg-tiviElectricPurple-100
                        px-4
                        py-2
                        font-bold
                        hover:bg-tiviElectricViolet
                        focus:outline-none
                    `,
                                      onClick: () => qe(m.id, r.id, f[p]),
                                      children: s('profile.Follow'),
                                  }),
                            e.jsx('button', {
                                className: '',
                                children: 'Share button',
                            }),
                        ],
                    }),
                ],
            })
        );
    },
    er = async (r, t) => {
        try {
            return (
                await w.get(`/api/v1/user/${t}/`, {
                    headers: { Authorization: `Bearer ${r}` },
                })
            ).data;
        } catch (s) {
            throw new Error(`Error retrieving user: ${s}`);
        }
    },
    rr = pe,
    sr = we;
function tr(r) {
    return e.jsxs('div', {
        className: 'flex items-center',
        children: [
            e.jsx('div', {
                className: 'w-full ',
                children: e.jsx('div', {
                    className:
                        'flex h-4  overflow-hidden rounded-xl bg-gray-200 text-xs',
                    children: e.jsx('div', {
                        style: {
                            width: `${
                                (r.progressValue / r.progressMax) * 100
                            }%`,
                        },
                        className: `text-white bg-${r.progressColor}-100 whitespace-nowrap rounded-xl shadow-none`,
                        children: e.jsx('div', {
                            className:
                                ' flex h-2 justify-center overflow-hidden rounded-xl pt-1 text-xs',
                            children: e.jsx('div', {
                                className: ` flex w-9/12 flex-col justify-center whitespace-nowrap rounded-xl bg-${r.progressColor}-50 text-center text-white shadow-none`,
                            }),
                        }),
                    }),
                }),
            }),
            e.jsx('div', {
                className: 'flex flex-row justify-between pl-4',
                children: e.jsxs('p', {
                    className: 'text-xs font-bold text-gray-400',
                    children: [r.progressValue, '/', r.progressMax],
                }),
            }),
        ],
    });
}
function Z(r) {
    const { t } = j();
    return (
        (r.badge.badgeColor = 'tiviElectricPurple'),
        e.jsxs('div', {
            className: 'flex items-center border-b-2 p-6',
            children: [
                e.jsx('div', {
                    style: {
                        filter: `drop-shadow(2px 4px 2px #9c9696) grayscale(${
                            r.grayscale ? '100%' : '0%'
                        }`,
                    },
                    children: e.jsxs('div', {
                        className: `items-center justify-center bg-${r.badge.badgeColor}-100 group m-2 h-24 w-24 overflow-hidden rounded-lg p-2`,
                        style: {
                            clipPath:
                                'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                        },
                        children: [
                            e.jsx('div', {
                                className:
                                    'relative left-5 h-10 w-10 pt-2 group-hover:h-12 group-hover:w-12 group-hover:-translate-x-1 group-hover:-translate-y-1',
                                children: e.jsx('img', {
                                    src: r.badge.badgeImage,
                                    alt: r.badge.badgeName,
                                }),
                            }),
                            e.jsx('p', {
                                className:
                                    'pt-3 text-center text-xs font-extrabold text-gray-700 group-hover:-translate-y-2',
                                children:
                                    t('badge.Level') + ' ' + r.badge.badgeLevel,
                            }),
                        ],
                    }),
                }),
                e.jsxs('div', {
                    className: 'flex w-full flex-col justify-center gap-3 px-5',
                    children: [
                        e.jsx('p', {
                            className: 'text-lg font-bold text-gray-700',
                            children: r.badge.badgeName.toUpperCase(),
                        }),
                        e.jsx('p', {
                            className: 'text-sm text-gray-500',
                            children: r.badge.badgeDescription,
                        }),
                        e.jsx(tr, {
                            progressValue: r.progress,
                            progressMax: r.badge.badgeGoal,
                            progressColor: 'tiviElectricPurple',
                        }),
                    ],
                }),
            ],
        })
    );
}
const ar = async (r) => {
        try {
            return (
                await w.get('/api/v1/badges/', {
                    headers: { Authorization: `Bearer ${r}` },
                })
            ).data;
        } catch (t) {
            throw new Error(`Error fetching badges: ${t}`);
        }
    },
    or = async (r, t) => {
        try {
            return (
                await w.get(`/api/v1/user/${r}/badges/`, {
                    headers: { Authorization: `Bearer ${t}` },
                })
            ).data;
        } catch (s) {
            throw new Error(`Error listing user badges: ${s}`);
        }
    };
function nr(r) {
    const t = N(),
        [s, n] = d.useState([]),
        [l, c] = d.useState([]),
        { t: o } = j();
    return (
        d.useEffect(() => {
            or(r.user.id, t[p])
                .then((a) => {
                    n(a);
                })
                .catch((a) => {
                    console.log(a);
                }),
                s.length < 3 &&
                    ar(t[p])
                        .then((a) => {
                            c(a);
                        })
                        .catch((a) => {
                            console.log(a);
                        });
        }, []),
        e.jsxs('section', {
            children: [
                e.jsx('div', {
                    className: 'flex flex-row justify-between px-5',
                    children: e.jsx('p', {
                        className: 'text-lg font-bold text-gray-700',
                        children: o('badge.Title'),
                    }),
                }),
                e.jsxs('div', {
                    className:
                        'm-4 flex flex-col flex-wrap justify-center rounded-lg border-2',
                    children: [
                        s
                            .sort(
                                (a, i) =>
                                    i.badgeProgress / i.badge.badgeGoal -
                                        a.badgeProgress / a.badge.badgeGoal ||
                                    i.badge.badgeLevel - a.badge.badgeLevel,
                            )
                            .slice(0, 3)
                            .map((a) =>
                                e.jsx(
                                    Z,
                                    {
                                        badge: a.badge,
                                        progress: a.badgeProgress,
                                    },
                                    a.badge.id,
                                ),
                            ),
                        s.length < 3 &&
                            l
                                .filter(
                                    (a) => !s.some((i) => i.badge.id === a.id),
                                )
                                .sort((a, i) => i.badgeLevel - a.badgeLevel)
                                .slice(0, 3 - s.length)
                                .map((a) =>
                                    e.jsx(
                                        Z,
                                        {
                                            badge: a,
                                            progress: 0,
                                            grayscale: !0,
                                        },
                                        a.id,
                                    ),
                                ),
                        ' ',
                        e.jsx(E, {
                            to: '',
                            className:
                                'rounded-b-lg p-4 text-center font-semibold text-gray-600 hover:bg-tiviElectricPurple-100 hover:text-black',
                            children: o('profile.SeeMore'),
                        }),
                    ],
                }),
            ],
        })
    );
}
function lr(r) {
    const [t, s] = d.useState(r.rating),
        [n, l] = d.useState(0),
        { t: c } = j(),
        o = (a) => {
            s(a), r.handleRating(a);
        };
    return e.jsx(e.Fragment, {
        children: e.jsx('div', {
            className: 'flex flex-col items-center gap-2',
            children: e.jsx('span', {
                className:
                    'flex items-center gap-4 rounded text-xs text-slate-500',
                children: e.jsx('span', {
                    className: 'flex gap-1 text-amber-400',
                    role: 'img',
                    'aria-label': c('rating.AverageRating'),
                    children: Array(5)
                        .fill('')
                        .map((a, i) =>
                            e.jsx(
                                'button',
                                {
                                    type: 'button',
                                    role: 'button',
                                    name: 'puntuación media',
                                    className: 'focus:outline-none',
                                    onClick: () => o(i + 1),
                                    onMouseEnter: () => l(i + 1),
                                    onMouseLeave: () => l(0),
                                    children: e.jsx('svg', {
                                        xmlns: 'http://www.w3.org/2000/svg',
                                        viewBox: '0 0 24 24',
                                        fill:
                                            i + 1 <= (n || t)
                                                ? 'currentColor'
                                                : 'none',
                                        stroke: 'currentColor',
                                        className: 'h-3.5 w-3.5',
                                        children: e.jsx('path', {
                                            fillRule: 'evenodd',
                                            d: 'M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z',
                                            clipRule: 'evenodd',
                                        }),
                                    }),
                                },
                                i,
                            ),
                        ),
                }),
            }),
        }),
    });
}
const ir = async (r, t, s) => {
        let n = s;
        if (!n) {
            const l = N();
            n = JSON.parse(l[F]).id;
        }
        try {
            return (
                await w.get(`/api/v1/ratings/user/${n}/note/${r}/`, {
                    headers: { Authorization: `Bearer ${t}` },
                })
            ).data;
        } catch (l) {
            throw new Error(`Error retrieving user note rating: ${l}`);
        }
    },
    dr = async (r, t) => {
        try {
            return (
                await w.post('/api/v1/ratings/note/', r, {
                    headers: {
                        Authorization: `Bearer ${t}`,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                })
            ).data;
        } catch (s) {
            throw new Error(`Error creating user note rating: ${s}`);
        }
    },
    cr = async (r, t, s, n) => {
        let l = n;
        if (!l) {
            const c = N();
            l = JSON.parse(c[F]).id;
        }
        try {
            return (
                await w.patch(`/api/v1/ratings/user/${l}/note/${r}/`, t, {
                    headers: {
                        Authorization: `Bearer ${s}`,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                })
            ).data;
        } catch (c) {
            throw new Error(`Error updating user note rating: ${c}`);
        }
    };
function ur(r) {
    var i, h, u, f, m;
    const { t } = j(),
        s = Math.round(r.post.noteAverageRating ?? 0),
        [n, l] = d.useState(),
        [c, o] = d.useState(!1),
        a = N();
    return (
        d.useEffect(() => {
            ir(r.post.id ?? -1, a[p])
                .then((x) => {
                    l(x.rating);
                })
                .catch(() => {
                    dr({ note: r.post.id ?? -1, rating: n ?? 0 }, a[p]);
                });
        }, []),
        d.useEffect(() => {
            c &&
                (cr(
                    r.post.id ?? -1,
                    { note: r.post.id ?? -1, rating: n ?? 0 },
                    a[p],
                ),
                o(!1));
        }, [n]),
        e.jsxs('div', {
            className:
                'my-4 flex w-full max-w-3xl flex-col rounded-md border bg-white shadow-md',
            children: [
                e.jsxs('div', {
                    className: 'flex flex-row justify-between px-5 py-2',
                    children: [
                        e.jsxs('div', {
                            className: 'flex w-full flex-col items-start gap-1',
                            children: [
                                e.jsxs('div', {
                                    className:
                                        'flex w-full justify-between pr-8',
                                    children: [
                                        e.jsx('p', {
                                            className:
                                                'text-lg font-bold text-gray-700',
                                            children: r.post.noteName,
                                        }),
                                        e.jsx('p', {
                                            className: 'text-xs text-gray-400',
                                            children: new Date(
                                                r.post.noteLastModified ??
                                                    '2021-01-01',
                                            ).toLocaleDateString(),
                                        }),
                                    ],
                                }),
                                e.jsx(lr, {
                                    rating: n ?? s,
                                    handleRating: (x) => {
                                        o(!0), l(x);
                                    },
                                }),
                            ],
                        }),
                        e.jsx(E, {
                            to:
                                t('/profile') +
                                '/' +
                                ((i = r.post.user) == null
                                    ? void 0
                                    : i.username),
                            className: ' flex w-16 items-center',
                            children: e.jsx('img', {
                                src:
                                    ((h = r.post.user) == null
                                        ? void 0
                                        : h.profilePhoto) ?? '/user.png',
                                alt:
                                    ((u = r.post.user) == null
                                        ? void 0
                                        : u.username) ?? 'user',
                                className:
                                    'rounded-full border border-gray-500 shadow-sm',
                            }),
                        }),
                    ],
                }),
                e.jsx('div', {
                    className: 'flex flex-col px-5 py-2',
                    children:
                        ((f = r.post.noteContent) == null
                            ? void 0
                            : f.length) ?? 0 > 500
                            ? e.jsxs('p', {
                                  className: 'text-sm text-gray-500',
                                  children: [
                                      ((m = r.post.noteContent) == null
                                          ? void 0
                                          : m.substring(0, 500)) + '...',
                                      e.jsx(E, {
                                          to: '',
                                          className:
                                              'rounded-b-lg p-4 text-center font-semibold text-gray-600 hover:text-tiviElectricPurple-100',
                                          children: t('profile.SeeMore'),
                                      }),
                                  ],
                              })
                            : e.jsx('p', {
                                  className: 'text-sm text-gray-500',
                                  children: r.post.noteContent,
                              }),
                }),
            ],
        })
    );
}
function gr(r) {
    return e.jsxs('div', {
        className: 'flex flex-col items-center',
        children: [
            e.jsx('div', {
                className: 'flex flex-row justify-between px-5',
                children: e.jsx('p', {
                    className: 'text-lg font-bold text-gray-700',
                    children: 'Posts',
                }),
            }),
            e.jsx('div', {
                className: 'flex w-full flex-col items-center px-8',
                children: r.posts.map((t) => e.jsx(ur, { post: t }, t.id)),
            }),
        ],
    });
}
const fr = d.lazy(() =>
        ve(
            () => import('./index-9db94e76.js').then((r) => r.ae),
            ['assets/index-9db94e76.js', 'assets/index-d3846be8.css'],
        ),
    ),
    pr = () => {
        const { t: r } = j(),
            { username: t } = ye(),
            [s, n] = d.useState(null),
            [l, c] = d.useState(!1),
            o = N(),
            a = JSON.parse(o[F]).username,
            [i, h] = d.useState([]);
        return (
            console.log(t),
            d.useEffect(() => {
                Se(o[p])
                    .then((u) => {
                        h(u);
                    })
                    .catch((u) => {
                        J.error(r(u.message));
                    });
            }, []),
            d.useEffect(() => {
                c(!0),
                    er(o[p], t ?? a)
                        .then((u) => {
                            n(u), c(!1);
                        })
                        .catch((u) => {
                            J.error(r(u.message)), c(!1);
                        });
            }, [t]),
            l
                ? e.jsx(je, {})
                : s
                ? e.jsxs('div', {
                      children: [
                          e.jsx(Ne, {
                              children: e.jsx('div', {
                                  className: 'h-fill flex items-center',
                                  children:
                                      a !== s.username
                                          ? e.jsx(rr, {
                                                className: 'h-10 w-10',
                                            })
                                          : e.jsx(E, {
                                                to: r('/settings'),
                                                children: e.jsx(sr, {
                                                    className: 'h-7 w-7',
                                                }),
                                            }),
                              }),
                          }),
                          e.jsx(We, { user: s }),
                          e.jsx(nr, { user: s }),
                          e.jsx(gr, { posts: i }),
                      ],
                  })
                : e.jsx(fr, {})
        );
    };
export { pr as default };
