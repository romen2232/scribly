import{r as h,W as j}from"./index-b43e24a8.js";const m=e=>{let t;const n=new Set,o=(s,v)=>{const c=typeof s=="function"?s(t):s;if(!Object.is(c,t)){const f=t;t=v??typeof c!="object"?c:Object.assign({},t,c),n.forEach(p=>p(t,f))}},r=()=>t,l={setState:o,getState:r,subscribe:s=>(n.add(s),()=>n.delete(s)),destroy:()=>{n.clear()}};return t=e(o,r,l),l},R=e=>e?m(e):m;var w={exports:{}},D={},b={exports:{}},O={};/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var S=h;function V(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var $=typeof Object.is=="function"?Object.is:V,_=S.useState,P=S.useEffect,A=S.useLayoutEffect,I=S.useDebugValue;function B(e,t){var n=t(),o=_({inst:{value:n,getSnapshot:t}}),r=o[0].inst,u=o[1];return A(function(){r.value=n,r.getSnapshot=t,y(r)&&u({inst:r})},[e,n,t]),P(function(){return y(r)&&u({inst:r}),e(function(){y(r)&&u({inst:r})})},[e]),I(n),n}function y(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!$(e,n)}catch{return!0}}function C(e,t){return t()}var L=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?C:B;O.useSyncExternalStore=S.useSyncExternalStore!==void 0?S.useSyncExternalStore:L;b.exports=O;var M=b.exports;/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var E=h,T=M;function W(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var k=typeof Object.is=="function"?Object.is:W,q=T.useSyncExternalStore,U=E.useRef,z=E.useEffect,F=E.useMemo,G=E.useDebugValue;D.useSyncExternalStoreWithSelector=function(e,t,n,o,r){var u=U(null);if(u.current===null){var a={hasValue:!1,value:null};u.current=a}else a=u.current;u=F(function(){function s(i){if(!v){if(v=!0,c=i,i=o(i),r!==void 0&&a.hasValue){var d=a.value;if(r(d,i))return f=d}return f=i}if(d=f,k(c,i))return d;var x=o(i);return r!==void 0&&r(d,x)?d:(c=i,f=x)}var v=!1,c,f,p=n===void 0?null:n;return[function(){return s(t())},p===null?void 0:function(){return s(p())}]},[t,n,o,r]);var l=q(e,u[0],u[1]);return z(function(){a.hasValue=!0,a.value=l},[l]),G(l),l};w.exports=D;var H=w.exports;const J=j(H),{useSyncExternalStoreWithSelector:K}=J;function N(e,t=e.getState,n){const o=K(e.subscribe,e.getState,e.getServerState||e.getState,t,n);return h.useDebugValue(o),o}const g=e=>{const t=typeof e=="function"?R(e):e,n=(o,r)=>N(t,o,r);return Object.assign(n,t),n},X=e=>e?g(e):g;export{X as c};
