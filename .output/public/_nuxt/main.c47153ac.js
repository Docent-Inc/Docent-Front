import{f as i,k as d,l as v,q as t,s as o,B as _,m as u,H as g,M as p}from"./entry.da756300.js";import{_ as f}from"./_plugin-vue_export-helper.c27b6911.js";const C=""+new URL("nav_docent.f862c49b.svg",import.meta.url).href;const k={name:"Navigation",data(){return{docentSVG:C}},methods:{navigateTo(a){this.$router.push(a)},isActive(a){return this.$route.path===a}}},x={class:"navigation"},y=["src"];function T(a,e,r,$,m,n){const l=i("v-icon"),s=i("v-btn");return d(),v("div",x,[t(s,{flat:"",onClick:e[0]||(e[0]=c=>n.navigateTo("/home"))},{default:o(()=>[t(l,{class:_(["nav_home",{active:n.isActive("/home")}])},null,8,["class"])]),_:1}),t(s,{flat:"",onClick:e[1]||(e[1]=c=>n.navigateTo("/calendar"))},{default:o(()=>[t(l,{class:_(["nav_calendar",{active:n.isActive("/calendar")}])},null,8,["class"])]),_:1}),t(s,{flat:"",onClick:e[2]||(e[2]=c=>n.navigateTo("/chat"))},{default:o(()=>[u("img",{src:m.docentSVG},null,8,y)]),_:1}),t(s,{flat:"",onClick:e[3]||(e[3]=c=>n.navigateTo("/report"))},{default:o(()=>[t(l,{class:_(["nav_report",{active:n.isActive("/report")}])},null,8,["class"])]),_:1}),t(s,{flat:"",onClick:e[4]||(e[4]=c=>n.navigateTo("/gallery"))},{default:o(()=>[t(l,{class:_(["nav_gallery",{active:n.isActive("/gallery")}])},null,8,["class"])]),_:1})])}const h=f(k,[["render",T],["__scopeId","data-v-6d6dc730"]]);const N={},A={class:"contents"};function V(a,e){const r=h;return d(),v(p,null,[u("div",A,[g(a.$slots,"default",{},void 0,!0)]),t(r)],64)}const b=f(N,[["render",V],["__scopeId","data-v-d788ed22"]]);export{b as default};
