import {
    r,
    p as B,
    A as v,
    O as se,
    G as E,
    j as e,
    t as m,
    F as re,
    T as ne,
    c as oe,
    B as ae,
} from './index-9db94e76.js';
import { c as ie } from './index-179c6cbe.js';
import {
    p as le,
    u as ce,
    k as ue,
    n as L,
    m as de,
    a as fe,
    b as R,
    d as I,
    o as he,
} from './notes-0819c811.js';
import { a as xe, T as me, m as ye } from './Tree-0fce1b46.js';
function pe(n, t) {
    const [a, i] = r.useState(),
        o = r.useRef(!0);
    return (
        r.useEffect(() => {
            if (o.current) {
                o.current = !1;
                return;
            }
            if (typeof a > 'u') {
                i(n);
                return;
            }
            const c = setTimeout(() => {
                i(n);
            }, t);
            return () => {
                clearTimeout(c);
            };
        }, [n, t]),
        a
    );
}
function Ne({ data: n, onSave: t, interval: a = 2e3, saveOnUnmount: i = !1 }) {
    const o = r.useRef(n),
        c = r.useRef(t),
        [h, y] = r.useState(!1),
        p = pe(n, a);
    r.useEffect(() => {
        if (!(typeof p > 'u')) {
            if (!h) {
                y(!0);
                return;
            }
            c.current(p);
        }
    }, [p]),
        r.useEffect(() => {
            o.current = n;
        }, [n]),
        r.useEffect(() => {
            c.current = t;
        }, [t]),
        r.useEffect(
            () => () => {
                i && c.current(o.current);
            },
            [i],
        );
}
const be = ie((n) => ({
        currentNote: {},
        history: [],
        reHistory: [],
        saveNote: async (t) => {
            const a = B();
            n((i) => {
                const o = {
                    ...i.currentNote,
                    ...t,
                    noteLastModified: new Date().toISOString(),
                };
                return (
                    o.id && le(o.id, o, a[v]),
                    {
                        currentNote: o,
                        history: [o, ...i.history],
                        reHistory: [],
                    }
                );
            });
        },
        localSaveNote: (t) => {
            n((a) => ({
                currentNote: t,
                history: [t, ...a.history],
                reHistory: [],
            }));
        },
        undo: () => {
            n((t) => {
                if (t.history.length === 0) return t;
                const [a, ...i] = t.history;
                return {
                    currentNote: a,
                    history: i,
                    reHistory: [t.currentNote, ...t.reHistory],
                };
            });
        },
        redo: () => {
            n((t) => {
                if (t.reHistory.length === 0) return t;
                const [a, ...i] = t.reHistory;
                return {
                    currentNote: a,
                    history: [t.currentNote, ...t.history],
                    reHistory: i,
                };
            });
        },
        clean: () => {
            n(() => ({ currentNote: {}, history: [], reHistory: [] }));
        },
    })),
    ge = ({ save: n, undo: t, redo: a }) => {
        r.useEffect(() => {
            const i = async (o) => {
                if (o.ctrlKey)
                    switch (o.key) {
                        case 's':
                            o.preventDefault(), n && n();
                            break;
                        case 'z':
                            o.shiftKey
                                ? (o.preventDefault(), a && a())
                                : (o.preventDefault(), t && t());
                            break;
                        case 'y':
                            o.preventDefault(), a && a();
                            break;
                    }
            };
            return (
                window.addEventListener('keydown', i),
                () => window.removeEventListener('keydown', i)
            );
        }, [n, t, a]);
    };
function ve(
    { threshold: n, rootMargin: t } = { threshold: 0, rootMargin: '0px' },
) {
    const [a, i] = r.useState(!0),
        o = r.useRef(null);
    return (
        r.useEffect(() => {
            if (!('IntersectionObserver' in window)) {
                console.warn(
                    'IntersectionObserver is not available in this browser.',
                );
                return;
            }
            const c = new IntersectionObserver(
                    ([y]) => {
                        i(y.isIntersecting);
                    },
                    { threshold: n, rootMargin: t },
                ),
                h = o.current;
            return (
                h && c.observe(h),
                () => {
                    h && c.unobserve(h);
                }
            );
        }, [n, t]),
        [o, a]
    );
}
function Ee({ note: n, folder: t, onNoteChange: a, updateURL: i }) {
    const {
            currentNote: o,
            saveNote: c,
            undo: h,
            redo: y,
            localSaveNote: p,
        } = be(),
        { isOpen: M, onOpen: A, onOpenChange: C } = ce(),
        [l, x] = r.useState({}),
        [P, z] = r.useState(),
        [u, D] = r.useState(),
        j = B(),
        [N, _] = r.useState(!1),
        [k, K] = r.useState(0),
        [S, O] = r.useState(!1),
        [V, F] = r.useState('folder'),
        [b, G] = r.useState(0),
        [w, U] = r.useState([[]]),
        [q, T] = ve();
    r.useEffect(() => {
        se(j[v]).then((s) => {
            K(s.gems ?? 0);
        });
    }, []),
        r.useEffect(() => {
            x(n), D(t), _(n.public ?? !1);
        }, [n]),
        r.useEffect(() => {
            u &&
                (x({ ...l, folder: u, public: N }),
                c({ ...l, folder: u, public: N }));
        }, [u, N]),
        r.useEffect(() => {
            T || H(l);
        }, [T]),
        r.useEffect(
            () => (
                W(),
                () => {
                    H(l);
                }
            ),
            [],
        ),
        ge({
            save: async () => {
                await c(l), a && a(l);
            },
            undo: () => {
                h(), x(o);
            },
            redo: () => {
                y(), x(o);
            },
        }),
        Ne({
            data: l.noteContent ?? '',
            onSave: async (s) => {
                const f = {
                    ...l,
                    noteLastModified: new Date().toISOString(),
                    noteContent: s,
                };
                await c(f), x(f);
            },
            interval: 6e4,
        });
    const H = async (s) => {
            s.noteContent === '' && s.noteName === '' && s.id
                ? await ue(s.id, j[v])
                : await c({ ...s, noteLastModified: E(new Date()) });
        },
        W = () => {
            xe(j[v])
                .then((s) => {
                    z(s);
                })
                .catch((s) => {
                    console.log(s);
                });
        },
        $ = (s) => {
            D(s), i && s.id && i(s.id), C();
        },
        J = { hidden: { opacity: 0, y: -50 }, visible: { opacity: 1, y: 0 } },
        Q = async (s) => {
            const f = s.id,
                g = j[v];
            if (!(k < 100 || S))
                try {
                    if (f != null) {
                        O(!0), Z();
                        const d = await he(f, s, g);
                        if (d.noteAnalysis === void 0)
                            throw new Error(m('note.AnalysisError'));
                        U(X(d.noteAnalysis)),
                            p({ ...d, noteLastModified: E(new Date()) }),
                            O(!1);
                    }
                } catch (d) {
                    console.error(d);
                }
        },
        X = (s) => {
            const f = s.replace('\\n\\n', '').split('**'),
                g = [];
            for (let d = 1; d < f.length; d += 2) {
                const ee = f[d],
                    te = f[d + 1];
                g.push([ee, te]);
            }
            return console.log(g), g;
        },
        Y = () => {
            F('folder'), A();
        },
        Z = () => {
            F('analysis'), A();
        };
    return e.jsxs(L.div, {
        ref: q,
        className: 'flex h-full flex-col overflow-hidden',
        children: [
            e.jsxs('header', {
                className: 'flex items-center justify-between',
                children: [
                    e.jsxs('div', {
                        className: 'w-full',
                        children: [
                            e.jsx(L.input, {
                                initial: 'hidden',
                                animate: 'visible',
                                variants: J,
                                transition: { duration: 0.5 },
                                type: 'text',
                                name: 'title',
                                id: 'title',
                                className:
                                    'h-16 w-full bg-mainBackground-200 p-16 text-7xl placeholder-gray-500 focus:placeholder-gray-600 focus:outline-none',
                                placeholder: m('note.Title'),
                                autoFocus: !0,
                                autoComplete: 'off',
                                value: l.noteName ?? '',
                                onChange: (s) =>
                                    x({ ...l, noteName: s.target.value }),
                            }),
                            e.jsx('div', {
                                className:
                                    'pointer-events-none flex justify-between px-16',
                                children: e.jsx('p', {
                                    className: 'text-2xl text-gray-500',
                                    children: E(
                                        new Date(l.noteLastModified ?? ''),
                                    ),
                                }),
                            }),
                        ],
                    }),
                    e.jsxs('div', {
                        className: 'flex flex-col',
                        children: [
                            (u == null ? void 0 : u.id) &&
                                e.jsxs('button', {
                                    className:
                                        'hover:bg-hover:shadow  mx-16  my-2 flex h-min cursor-pointer items-center justify-between rounded-md p-3 duration-300 ease-in-out transition hover:text-primaryBlue-600 hover:shadow-lg',
                                    tabIndex: 2,
                                    onClick: Y,
                                    children: [
                                        e.jsx(re, { className: 'h-10 w-10' }),
                                        ((u == null ? void 0 : u.depth) ?? 0) >
                                            0 &&
                                            e.jsx('div', {
                                                className: 'px-3 text-lg',
                                                children: e.jsx('h4', {
                                                    className: 'font-bold',
                                                    children:
                                                        u == null
                                                            ? void 0
                                                            : u.folderName,
                                                }),
                                            }),
                                    ],
                                }),
                            e.jsxs('label', {
                                className:
                                    'flex cursor-pointer flex-col items-center justify-center',
                                children: [
                                    e.jsxs('div', {
                                        className:
                                            'relative inline-flex items-center',
                                        children: [
                                            e.jsx('input', {
                                                type: 'checkbox',
                                                checked: N,
                                                className: 'peer sr-only',
                                                onChange: () => {
                                                    _(!N);
                                                },
                                            }),
                                            e.jsx('div', {
                                                className:
                                                    "peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:content-[''] after:transition-all peer-checked:bg-primaryPink-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primaryPink-200",
                                            }),
                                        ],
                                    }),
                                    e.jsx('span', {
                                        className:
                                            'pt-2 text-sm font-medium text-gray-900 dark:text-gray-300',
                                        children: 'Public',
                                    }),
                                ],
                            }),
                            e.jsxs('button', {
                                className: ` mx-16 my-2 flex h-min flex-col items-center justify-between rounded-md p-3 duration-300 ease-in-out transition  ${
                                    k < 100 || S
                                        ? 'cursor-default  opacity-50'
                                        : 'hover:bg-hover:shadow cursor-pointer  hover:text-primaryBlue-600 hover:shadow-lg'
                                }`,
                                tabIndex: 2,
                                onClick: () => Q(l),
                                children: [
                                    e.jsx(ne, { className: 'h-10 w-10' }),
                                    e.jsx('h4', {
                                        className: 'px-3 text-lg font-bold',
                                        children: k,
                                    }),
                                ],
                            }),
                        ],
                    }),
                ],
            }),
            e.jsx('textarea', {
                name: 'text',
                id: 'text',
                value: l.noteContent ?? '',
                onChange: (s) => x({ ...l, noteContent: s.target.value }),
                tabIndex: 1,
                className:
                    'm-24 mb-12 mt-16 h-full overflow-scroll bg-mainBackground-200 text-2xl focus:placeholder-gray-500 focus:outline-none',
                placeholder:
                    'En algún lugar de la Mancha, de cuyo nombre no quiero acordarme...',
            }),
            e.jsx(de, {
                isOpen: M,
                onOpenChange: C,
                placement: 'top-center',
                className: 'bg-mainBackground-200',
                children: e.jsx(fe, {
                    children: (s) =>
                        V === 'folder'
                            ? e.jsxs(e.Fragment, {
                                  children: [
                                      e.jsx(R, {
                                          children: e.jsx('h1', {
                                              className: 'text-2xl font-bold',
                                              children: m('folders.Title'),
                                          }),
                                      }),
                                      e.jsx(I, {
                                          children: e.jsx(me, {
                                              rootFolder: P,
                                              onlyFolders: !0,
                                              changeFolder: $,
                                          }),
                                      }),
                                  ],
                              })
                            : e.jsxs(e.Fragment, {
                                  children: [
                                      e.jsx(R, {
                                          children: e.jsx('h1', {
                                              className: 'text-2xl font-bold',
                                              children: w[b][0],
                                          }),
                                      }),
                                      S
                                          ? e.jsx(I, {
                                                children: e.jsx(oe, {
                                                    text: m('loading.Longer'),
                                                }),
                                            })
                                          : e.jsxs(e.Fragment, {
                                                children: [
                                                    e.jsx(I, {
                                                        children: e.jsx('div', {
                                                            className:
                                                                'flex flex-col items-center justify-center',
                                                            children: e.jsx(
                                                                'p',
                                                                {
                                                                    className:
                                                                        'text-xl',
                                                                    children:
                                                                        w[b][1],
                                                                },
                                                            ),
                                                        }),
                                                    }),
                                                    e.jsx(ye, {
                                                        children: e.jsx(ae, {
                                                            className: `rounded-xl
                                             p-4 font-semibold hover:shadow-[0px_0px_5px_rgba(0,0,0,0.35)]
                                    `,
                                                            bgColor:
                                                                'primaryPink-500',
                                                            onClick: () => {
                                                                b < w.length - 1
                                                                    ? G(b + 1)
                                                                    : s();
                                                            },
                                                            children:
                                                                b < w.length - 1
                                                                    ? m(
                                                                          'notes.Next',
                                                                      )
                                                                    : m(
                                                                          'notes.Close',
                                                                      ),
                                                        }),
                                                    }),
                                                ],
                                            }),
                                  ],
                              }),
                }),
            }),
        ],
    });
}
export { Ee as N };
