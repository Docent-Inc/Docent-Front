import{r as m,W as C,X as b,E as D,D as w,u as h,A as O,Y as x,Z as g,j as k,R as j,C as A,$ as B}from"./entry.41df9e10.js";const R=()=>null;function E(...o){const f=typeof o[o.length-1]=="string"?o.pop():void 0;typeof o[0]!="string"&&o.unshift(f);let[e,i,n={}]=o;if(typeof e!="string")throw new TypeError("[nuxt] [asyncData] key must be a string.");if(typeof i!="function")throw new TypeError("[nuxt] [asyncData] handler must be a function.");n.server=n.server??!0,n.default=n.default??R,n.lazy=n.lazy??!1,n.immediate=n.immediate??!0;const t=h(),l=()=>t.isHydrating?t.payload.data[e]:t.static.data[e],d=()=>l()!==void 0;t._asyncData[e]||(t._asyncData[e]={data:m(l()??n.default()),pending:m(!d()),error:C(t.payload._errors,e),status:m("idle")});const a={...t._asyncData[e]};a.refresh=a.execute=(r={})=>{if(t._asyncDataPromises[e]){if(r.dedupe===!1)return t._asyncDataPromises[e];t._asyncDataPromises[e].cancelled=!0}if((r._initial||t.isHydrating&&r._initial!==!1)&&d())return l();a.pending.value=!0,a.status.value="pending";const p=new Promise((s,u)=>{try{s(i(t))}catch(P){u(P)}}).then(s=>{if(p.cancelled)return t._asyncDataPromises[e];let u=s;n.transform&&(u=n.transform(s)),n.pick&&(u=H(u,n.pick)),a.data.value=u,a.error.value=null,a.status.value="success"}).catch(s=>{if(p.cancelled)return t._asyncDataPromises[e];a.error.value=s,a.data.value=O(n.default()),a.status.value="error"}).finally(()=>{p.cancelled||(a.pending.value=!1,t.payload.data[e]=a.data.value,a.error.value&&(t.payload._errors[e]=x(a.error.value)),delete t._asyncDataPromises[e])});return t._asyncDataPromises[e]=p,t._asyncDataPromises[e]};const c=()=>a.refresh({_initial:!0}),y=n.server!==!1&&t.payload.serverRendered;{const r=g();if(r&&!r._nuxtOnBeforeMountCbs){r._nuxtOnBeforeMountCbs=[];const s=r._nuxtOnBeforeMountCbs;r&&(b(()=>{s.forEach(u=>{u()}),s.splice(0,s.length)}),D(()=>s.splice(0,s.length)))}y&&t.isHydrating&&d()?(a.pending.value=!1,a.status.value=a.error.value?"error":"success"):r&&(t.payload.serverRendered&&t.isHydrating||n.lazy)&&n.immediate?r._nuxtOnBeforeMountCbs.push(c):n.immediate&&c(),n.watch&&w(n.watch,()=>a.refresh());const p=t.hook("app:data:refresh",s=>{if(!s||s.includes(e))return a.refresh()});r&&D(p)}const v=Promise.resolve(t._asyncDataPromises[e]).then(()=>a);return Object.assign(v,a),v}function H(o,f){const e={};for(const i of f)e[i]=o[i];return e}const _="__nuxt_component";async function M(o,f){const e=h(),i=j(),n=g(),{fetchKey:t,_fetchKeyBase:l}=n.proxy.$options,d=(typeof t=="function"?t(()=>""):t)||[l,i.fullPath,i.matched.findIndex(y=>Object.values(y.components||{}).includes(n.type))].join(":"),{data:a,error:c}=await E(`options:asyncdata:${d}`,()=>e.runWithContext(()=>f(e)));if(c.value)throw x(c.value);a.value&&typeof a.value=="object"&&Object.assign(await o,A(B(a.value)))}const N=function(...f){const[e,i]=f,{setup:n}=e;return!n&&!e.asyncData&&!e.head?{[_]:!0,...e}:{[_]:!0,_fetchKeyBase:i,...e,setup(t,l){const d=h(),a=n?Promise.resolve(d.runWithContext(()=>n(t,l))).then(y=>y||{}):{},c=[];if(e.asyncData&&c.push(M(a,e.asyncData)),e.head){const y=h();k(typeof e.head=="function"?()=>e.head(y):e.head)}return Promise.resolve(a).then(()=>Promise.all(c)).then(()=>a).finally(()=>{c.length=0})}}};export{N as d};