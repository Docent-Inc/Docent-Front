import{J as l,f as t,l as _,m as a,q as n,H as i,k as u}from"./entry.70b3ca9c.js";import{u as r}from"./signup.b13bf06f.js";import{_ as m}from"./_plugin-vue_export-helper.c27b6911.js";const f={name:"SignupLayout",data(){return{}},computed:{...l(r,["step"]),progress(){return console.log(this.step/4*100),this.step/4*100}},methods:{goBack(){const{setStep:e}=r();e(this.step-1),this.$router.back()}}},g={class:"viewport"},v={class:"header"},h={class:"contents"};function k(e,o,S,B,V,s){const c=t("v-icon"),p=t("v-progress-linear");return u(),_("div",g,[a("div",v,[n(c,{class:"ic_back",onClick:s.goBack},null,8,["onClick"])]),n(p,{modelValue:s.progress,"onUpdate:modelValue":o[0]||(o[0]=d=>s.progress=d),"animation-speed":"1300",height:"2"},null,8,["modelValue"]),a("div",h,[i(e.$slots,"default",{},void 0,!0)])])}const $=m(f,[["render",k],["__scopeId","data-v-fa6dcfae"]]);export{$ as default};
