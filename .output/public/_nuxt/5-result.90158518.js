import{_ as l}from"./SelectBox.8313f5b9.js";import{_ as d,C as r,l as p,m as t,t as m,q as n,K as u,V as a,F as c,k as _}from"./entry.43156d6c.js";import{d as f}from"./component.58632c29.js";import{u as b}from"./signup.1a7b8a1f.js";import{u as h}from"./auth.91bd062f.js";import"./axios.92690a64.js";const g=f({name:"4-Mbti",setup(){},data(){return{mbtiList:["INTJ","INTP","ENTJ","ENTP","INFJ","INFP","ENFJ","ENFP","ISTJ","ISFJ","ESTJ","ESFJ","ISTP","ISFP","ESTP","ESFP"]}},computed:{...r(b,["user","step"])},mounted(){console.log(this.step),this.step!==4&&this.$router.push("/signup/1-nickname")},methods:{async signup(){console.log(this.user);const{signup:s}=h(),e=await s(this.user);console.log(e),e.success&&this.$router.push("/home")}}},"$SZjRSntgD1"),S={class:"title"},v={class:"input-box"},N=t("div",{class:"title"},"Mbti",-1),F={class:"input-box"},E=t("div",{class:"title"},"성별",-1),T={class:"input-box"},k=t("div",{class:"title"},"나이",-1),I={class:"input-box"},J=t("div",{class:"title"},"닉네임",-1);function P(s,e,$,V,y,x){const i=l;return _(),p(c,null,[t("div",S,m(s.user.nickname)+" 님의 정보가 맞나요?",1),t("div",v,[N,n(i,{options:s.mbtiList,disabled:!0,default:s.user.mbti},null,8,["options","default"])]),t("div",F,[E,n(i,{options:["남","여"],disabled:!0,default:s.user.gender},null,8,["default"])]),t("div",T,[k,u(t("input",{type:"number","onUpdate:modelValue":e[0]||(e[0]=o=>s.user.age=o),disabled:""},null,512),[[a,s.user.age]])]),t("div",I,[J,u(t("input",{type:"text","onUpdate:modelValue":e[1]||(e[1]=o=>s.user.nickname=o),disabled:""},null,512),[[a,s.user.nickname]])]),t("div",{class:"button fixed-bottom",onClick:e[2]||(e[2]=(...o)=>s.signup&&s.signup(...o))},"입장하기")],64)}const R=d(g,[["render",P]]);export{R as default};
