import{J as i,f as t,l as _,m as n,q as r,H as d,k as u}from"./entry.4d24a7b9.js";import{u as a}from"./signup.8d1b2fba.js";import{_ as m}from"./_plugin-vue_export-helper.c27b6911.js";/* empty css                   */const g={name:"SignupLayout",data(){return{}},computed:{...i(a,["step"]),progress(){return console.log(this.step/4*100),this.step/4*100}},methods:{goBack(){const{setStep:e}=a();e(this.step-1),this.$router.back()}}},v={class:"viewport"},f={class:"header"},h={class:"contents"};function k(e,o,S,B,V,s){const c=t("v-icon"),l=t("v-progress-linear");return u(),_("div",v,[n("div",f,[r(c,{class:"ic_back",onClick:s.goBack},null,8,["onClick"])]),r(l,{modelValue:s.progress,"onUpdate:modelValue":o[0]||(o[0]=p=>s.progress=p),"animation-speed":"1300",height:"2"},null,8,["modelValue"]),n("div",h,[d(e.$slots,"default")])])}const b=m(g,[["render",k]]);export{b as default};
