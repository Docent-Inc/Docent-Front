import{_ as v,f as i,k as d,l as u,q as t,s as l,B as _,m as f,H as g,M as p}from"./entry.a32731b5.js";/* empty css                   */const C=""+new URL("nav_docent.f862c49b.svg",import.meta.url).href;const k={name:"Navigation",data(){return{docentSVG:C}},methods:{navigateTo(a){this.$router.push(a)},isActive(a){return this.$route.path===a}}},x={class:"navigation"},y=["src"];function T(a,e,r,$,m,n){const o=i("v-icon"),s=i("v-btn");return d(),u("div",x,[t(s,{flat:"",onClick:e[0]||(e[0]=c=>n.navigateTo("/home"))},{default:l(()=>[t(o,{class:_(["nav_home",{active:n.isActive("/home")}])},null,8,["class"])]),_:1}),t(s,{flat:"",onClick:e[1]||(e[1]=c=>n.navigateTo("/calendar"))},{default:l(()=>[t(o,{class:_(["nav_calendar",{active:n.isActive("/calendar")}])},null,8,["class"])]),_:1}),t(s,{flat:"",onClick:e[2]||(e[2]=c=>n.navigateTo("/chat"))},{default:l(()=>[f("img",{src:m.docentSVG},null,8,y)]),_:1}),t(s,{flat:"",onClick:e[3]||(e[3]=c=>n.navigateTo("/report"))},{default:l(()=>[t(o,{class:_(["nav_report",{active:n.isActive("/report")}])},null,8,["class"])]),_:1}),t(s,{flat:"",onClick:e[4]||(e[4]=c=>n.navigateTo("/gallery"))},{default:l(()=>[t(o,{class:_(["nav_gallery",{active:n.isActive("/gallery")}])},null,8,["class"])]),_:1})])}const h=v(k,[["render",T],["__scopeId","data-v-6d6dc730"]]);const N={},A={class:"contents"};function V(a,e){const r=h;return d(),u(p,null,[f("div",A,[g(a.$slots,"default",{},void 0,!0)]),t(r)],64)}const b=v(N,[["render",V],["__scopeId","data-v-c2175631"]]);export{b as default};
