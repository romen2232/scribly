import{g as T,d as k,j as e,B as P,t as b,L as C,a as L,K as O,r as S,b as H,p as _,A,c as B,u as U,e as F,S as Y,F as z,f as $,C as D,P as I,h as J,i as M,k as K,l as q}from"./index-c83994d1.js";import{c as G}from"./index-1d4fe5dc.js";function E(s,r){let n;try{n=s()}catch{return}return{getItem:a=>{var t;const c=f=>f===null?null:JSON.parse(f,r==null?void 0:r.reviver),m=(t=n.getItem(a))!=null?t:null;return m instanceof Promise?m.then(c):c(m)},setItem:(a,t)=>n.setItem(a,JSON.stringify(t,r==null?void 0:r.replacer)),removeItem:a=>n.removeItem(a)}}const N=s=>r=>{try{const n=s(r);return n instanceof Promise?n:{then(o){return N(o)(n)},catch(o){return this}}}catch(n){return{then(o){return this},catch(o){return N(o)(n)}}}},Q=(s,r)=>(n,o,a)=>{let t={getStorage:()=>localStorage,serialize:JSON.stringify,deserialize:JSON.parse,partialize:i=>i,version:0,merge:(i,h)=>({...h,...i}),...r},c=!1;const m=new Set,f=new Set;let d;try{d=t.getStorage()}catch{}if(!d)return s((...i)=>{console.warn(`[zustand persist middleware] Unable to update item '${t.name}', the given storage is currently unavailable.`),n(...i)},o,a);const g=N(t.serialize),w=()=>{const i=t.partialize({...o()});let h;const l=g({state:i,version:t.version}).then(x=>d.setItem(t.name,x)).catch(x=>{h=x});if(h)throw h;return l},p=a.setState;a.setState=(i,h)=>{p(i,h),w()};const y=s((...i)=>{n(...i),w()},o,a);let j;const u=()=>{var i;if(!d)return;c=!1,m.forEach(l=>l(o()));const h=((i=t.onRehydrateStorage)==null?void 0:i.call(t,o()))||void 0;return N(d.getItem.bind(d))(t.name).then(l=>{if(l)return t.deserialize(l)}).then(l=>{if(l)if(typeof l.version=="number"&&l.version!==t.version){if(t.migrate)return t.migrate(l.state,l.version);console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}else return l.state}).then(l=>{var x;return j=t.merge(l,(x=o())!=null?x:y),n(j,!0),w()}).then(()=>{h==null||h(j,void 0),c=!0,f.forEach(l=>l(j))}).catch(l=>{h==null||h(void 0,l)})};return a.persist={setOptions:i=>{t={...t,...i},i.getStorage&&(d=i.getStorage())},clearStorage:()=>{d==null||d.removeItem(t.name)},getOptions:()=>t,rehydrate:()=>u(),hasHydrated:()=>c,onHydrate:i=>(m.add(i),()=>{m.delete(i)}),onFinishHydration:i=>(f.add(i),()=>{f.delete(i)})},u(),j||y},W=(s,r)=>(n,o,a)=>{let t={storage:E(()=>localStorage),partialize:u=>u,version:0,merge:(u,i)=>({...i,...u}),...r},c=!1;const m=new Set,f=new Set;let d=t.storage;if(!d)return s((...u)=>{console.warn(`[zustand persist middleware] Unable to update item '${t.name}', the given storage is currently unavailable.`),n(...u)},o,a);const g=()=>{const u=t.partialize({...o()});return d.setItem(t.name,{state:u,version:t.version})},w=a.setState;a.setState=(u,i)=>{w(u,i),g()};const p=s((...u)=>{n(...u),g()},o,a);let y;const j=()=>{var u,i;if(!d)return;c=!1,m.forEach(l=>{var x;return l((x=o())!=null?x:p)});const h=((i=t.onRehydrateStorage)==null?void 0:i.call(t,(u=o())!=null?u:p))||void 0;return N(d.getItem.bind(d))(t.name).then(l=>{if(l)if(typeof l.version=="number"&&l.version!==t.version){if(t.migrate)return t.migrate(l.state,l.version);console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}else return l.state}).then(l=>{var x;return y=t.merge(l,(x=o())!=null?x:p),n(y,!0),g()}).then(()=>{h==null||h(y,void 0),y=o(),c=!0,f.forEach(l=>l(y))}).catch(l=>{h==null||h(void 0,l)})};return a.persist={setOptions:u=>{t={...t,...u},u.storage&&(d=u.storage)},clearStorage:()=>{d==null||d.removeItem(t.name)},getOptions:()=>t,rehydrate:()=>j(),hasHydrated:()=>c,onHydrate:u=>(m.add(u),()=>{m.delete(u)}),onFinishHydration:u=>(f.add(u),()=>{f.delete(u)})},t.skipHydration||j(),y||p},X=(s,r)=>"getStorage"in r||"serialize"in r||"deserialize"in r?Q(s,r):W(s,r),Z=X,V=Z(s=>({category:"POETRY",setCategory:r=>s(()=>({category:r}))}),{name:"category-storage",storage:E(()=>sessionStorage)}),R=G()(V);function ee({unitNumber:s,description:r,backgroundColor:n}){const o=T(n),a=k(o),t=Math.floor(Math.random()*75)+1;return e.jsx(P,{className:`w-full max-w-2xl rounded-xl px-3 py-1.5 ${a?"text-black":"text-white"}`,bgColor:n,children:e.jsxs("header",{className:"flex w-96 items-center justify-between p-4",children:[e.jsxs("div",{className:"flex flex-col gap-1",children:[e.jsx("h2",{className:"text-2xl font-bold",children:b("lessons.Unit")+" "+s}),e.jsx("p",{className:"text-lg",children:r})]}),e.jsx(C,{to:b("/lesson/"+t),className:"flex h-12 w-12 items-center justify-center rounded-full bg-white text-black",children:e.jsx(L,{size:32})})]})})}function te({bgColor:s,lesson:r,extraClasses:n,disabled:o}){const a=["flex flex-col items-center justify-center",n];return o&&a.push("opacity-50 cursor-not-allowed"),e.jsxs("div",{className:a.join(" "),children:[e.jsx(P,{linkTo:b("/lesson")+"/"+r.id,className:"m-6 mt-10 flex h-32 w-32 items-center justify-center rounded-full",bgColor:s,...o&&{disabled:!0},children:e.jsx(O,{className:"w-28 h-28 text-gray-600 hover:text-black"})}),e.jsx(C,{to:b("/lesson")+"/"+r.id,className:"max-w-xs mb-3 text-center font-bold",children:r.lessonName})]})}function se({unit:s,first:r}){const{lessons:n,unitColor:o,unitName:a,unitNumber:t}=s,[c,m]=S.useState(r),f=(d,g)=>{switch(d%4){case 0:case 2:return"self-center";case 1:return g?"self-start":"self-end";case 3:return g?"self-end":"self-start"}};return e.jsxs("div",{className:"py-6 w-1/2",children:[e.jsx("div",{onClick:()=>m(!c),children:e.jsx(ee,{unitNumber:t,description:a,backgroundColor:o})}),e.jsx("div",{className:"flex flex-col items-center justify-center",children:c&&n.map((d,g)=>e.jsx(te,{bgColor:"secondaryYellow-500",lesson:d,extraClasses:f(g,t%2===0)},d.id))})]})}const re=async(s,r)=>{try{return(await H.get(`/api/v1/units/${s}/`,{headers:{Authorization:`Bearer ${r}`}})).data}catch(n){throw new Error(`Error retrieving units by category: ${n}`)}};function ne(){const{category:s}=R(),r=_(),[n,o]=S.useState([]),[a,t]=S.useState(!1);return S.useEffect(()=>{t(!0),re(s,r[A]).then(c=>{o(c),t(!1)}).catch(c=>{console.log(c),t(!1)})},[s]),a?e.jsx("main",{className:"h-full",children:e.jsx(B,{})}):e.jsx("main",{className:"flex h-full w-full flex-col items-center overflow-scroll py-12",children:n.map((c,m)=>e.jsx(se,{unit:c,first:m===0},c.id))})}const ae=({children:s,className:r})=>{const n=["flex h-full min-w-min flex-col items-center border-r-4 p-8",r];return e.jsx("aside",{className:n.join(" "),children:s})},v=({icon:s,title:r,linkTo:n,onClick:o,disabled:a,className:t,bgColor:c})=>{const m=["mt-3.5 flex h-12 w-full items-center justify-start rounded-lg p-6  duration-150 ease-in-out transition",t,a?"cursor-default":"hover:font-bold hover:shadow-inner-dark hover:active:translate-y-1.5 hover:active:shadow-none",c??"hover:bg-secondaryYellow-400"].join(" ");return n?e.jsxs(C,{to:n,className:m,children:[s,e.jsx("span",{className:"ml-4 text-xl",children:r})]}):e.jsx("li",{className:"w-full",children:e.jsxs("button",{className:m,onClick:o,children:[s,e.jsx("span",{className:"ml-4 text-xl",children:r})]})})};function oe(){return e.jsx("div",{className:"flex h-screen items-center justify-center",children:e.jsx("div",{className:"text-5xl font-bold text-blue-500",children:"About Page"})})}const ce=()=>{const{t:s}=U(),[r,n]=S.useState(!1),{setCategory:o,category:a}=R(),t=F(),c=m=>{switch(m){case"POETRY":return e.jsx(v,{icon:e.jsx(q,{className:"h-6 w-6"}),title:s("category.Poetry"),onClick:()=>{o("POETRY"),n(!r)},className:"ml-10 w-48 ",...a==="POETRY"&&!r&&{disabled:!0},bgColor:"hover:bg-primaryBlue-400"});case"PROSE":return e.jsx(v,{icon:e.jsx(K,{className:"h-6 w-6"}),title:s("category.Prose"),onClick:()=>{o("PROSE"),n(!r)},className:"ml-10 w-48 ",...a==="PROSE"&&!r&&{disabled:!0},bgColor:"hover:bg-primaryPink-400"});case"SCRIPT":return e.jsx(v,{icon:e.jsx(M,{className:"h-6 w-6"}),title:s("category.Script"),onClick:()=>{o("SCRIPT"),n(!r)},className:"ml-10 w-48 ",...a==="SCRIPT"&&!r&&{disabled:!0}});default:return null}};return e.jsxs("div",{className:"flex h-full w-full items-center justify-between",children:[e.jsxs(ae,{children:[e.jsx(C,{to:s("/"),children:e.jsx(Y,{})}),e.jsxs("nav",{className:"flex h-full w-64 flex-col items-start justify-between ",children:[e.jsxs("ul",{className:"w-full",children:[e.jsx(v,{icon:e.jsx(z,{className:"h-6 w-6"}),title:s("folders.Title"),linkTo:s("/folders")}),e.jsx(v,{icon:e.jsx($,{className:"h-6 w-6"}),title:s("note.NewNote"),linkTo:s("/note")}),e.jsx(v,{icon:e.jsx(D,{className:"h-6 w-6"}),title:s("category.Title"),onClick:()=>n(!r)}),e.jsxs("div",{className:" flex flex-col",children:[c(a),r&&e.jsxs(e.Fragment,{children:[a!=="POETRY"&&c("POETRY"),a!=="PROSE"&&c("PROSE"),a!=="SCRIPT"&&c("SCRIPT")]})]})]}),e.jsxs("ul",{className:"w-full",children:[e.jsx(v,{icon:e.jsx(I,{className:"h-6 w-6"}),title:s("profile.Title"),linkTo:s("/profile")}),e.jsx(v,{icon:e.jsx(J,{className:"h-6 w-6"}),title:s("community.Title"),linkTo:s("/community")}),t.pathname===s("/about")&&e.jsx(v,{icon:e.jsx(I,{className:"h-6 w-6"}),title:s("lessons.Title"),linkTo:s("/")}),t.pathname===s("/")&&e.jsx(v,{icon:e.jsx(I,{className:"h-6 w-6"}),title:s("about.Title"),linkTo:s("/about")})]})]})]}),t.pathname===s("/about")&&e.jsx(oe,{}),t.pathname===s("/")&&e.jsx(ne,{})]})};export{ce as default};