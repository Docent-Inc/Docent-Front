import{_ as c,O as n,a as r,o as _,f as l,l as u,q as i,k as p}from"./entry.c52c467b.js";import{u as d}from"./auth.aaa9caa8.js";import"./axios.8acffacc.js";const m={class:"viewport"},g={__name:"index",setup(f){const{getKakaoCallbackTest:k,getKakaoCallback:a}=d(),s=n(),o=r();return console.log(s.query.code),_(async()=>{const e=await a(s.query.code);console.log(e),e.success?(window.localStorage.setItem("accessToken",e.data.access_token),window.localStorage.setItem("name",e.data.user_name),e.data.is_signup?o.push("/signup/1-nickname"):o.push("/home")):alert(e.message)}),(e,v)=>{const t=l("v-progress-circular");return p(),u("div",m,[i(t,{indeterminate:"",color:"#2C9577"})])}}},y=c(g,[["__scopeId","data-v-2e885ef2"]]);export{y as default};
