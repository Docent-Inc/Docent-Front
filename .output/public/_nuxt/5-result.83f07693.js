import{_ as l}from"./SelectBox.f806f134.js";import{_ as d,A as r,W as p,l as m,m as t,t as c,q as n,L as u,Z as a,F as _,k as b}from"./entry.c61ee406.js";import{d as f}from"./component.00619dcb.js";import{u as h}from"./signup.38c7dfee.js";const g=f({name:"4-Mbti",setup(){},data(){return{mbtiList:["INTJ","INTP","ENTJ","ENTP","INFJ","INFP","ENFJ","ENFP","ISTJ","ISFJ","ESTJ","ESFJ","ISTP","ISFP","ESTP","ESFP"]}},computed:{...r(h,["user","step"])},mounted(){console.log(this.step),this.step!==4&&this.$router.push("/signup/1-nickname")},methods:{async signup(){console.log(this.user);const{signup:s}=p(),e=await s(this.user);console.log(e),e.success&&this.$router.push("/home")}}},"$SZjRSntgD1"),S={class:"title"},v={class:"input-box"},N=t("div",{class:"title"},"Mbti",-1),F={class:"input-box"},E=t("div",{class:"title"},"성별",-1),T={class:"input-box"},k=t("div",{class:"title"},"나이",-1),I={class:"input-box"},J=t("div",{class:"title"},"닉네임",-1);function P(s,e,$,y,V,x){const i=l;return b(),m(_,null,[t("div",S,c(s.user.nickname)+" 님의 정보가 맞나요?",1),t("div",v,[N,n(i,{options:s.mbtiList,disabled:!0,default:s.user.mbti},null,8,["options","default"])]),t("div",F,[E,n(i,{options:["남","여"],disabled:!0,default:s.user.gender},null,8,["default"])]),t("div",T,[k,u(t("input",{type:"number","onUpdate:modelValue":e[0]||(e[0]=o=>s.user.age=o),disabled:""},null,512),[[a,s.user.age]])]),t("div",I,[J,u(t("input",{type:"text","onUpdate:modelValue":e[1]||(e[1]=o=>s.user.nickname=o),disabled:""},null,512),[[a,s.user.nickname]])]),t("div",{class:"button fixed-bottom",onClick:e[2]||(e[2]=(...o)=>s.signup&&s.signup(...o))},"입장하기")],64)}const w=d(g,[["render",P]]);export{w as default};