import{_ as l}from"./SelectBox.08c7c17f.js";import{_ as d,J as r,l as p,m as t,t as m,q as n,F as u,U as a,M as c,k as _}from"./entry.df70887b.js";import{d as f}from"./component.a5a8165c.js";import{u as b}from"./signup.15e2183e.js";import{u as h}from"./auth.47e5533c.js";import"./axios.f72bf569.js";const g=f({name:"4-Mbti",setup(){},data(){return{mbtiList:["INTJ","INTP","ENTJ","ENTP","INFJ","INFP","ENFJ","ENFP","ISTJ","ISFJ","ESTJ","ESFJ","ISTP","ISFP","ESTP","ESFP"]}},computed:{...r(b,["user","step"])},mounted(){console.log(this.step),this.step!==4&&this.$router.push("/signup/1-nickname")},methods:{async signup(){console.log(this.user);const{signup:s}=h(),e=await s(this.user);console.log(e),e.success&&this.$router.push("/home")}}},"$SZjRSntgD1"),S={class:"title"},v={class:"input-box"},N=t("div",{class:"title"},"Mbti",-1),F={class:"input-box"},E=t("div",{class:"title"},"성별",-1),J={class:"input-box"},T=t("div",{class:"title"},"나이",-1),k={class:"input-box"},I=t("div",{class:"title"},"닉네임",-1);function P(s,e,$,y,M,V){const i=l;return _(),p(c,null,[t("div",S,m(s.user.nickname)+" 님의 정보가 맞나요?",1),t("div",v,[N,n(i,{options:s.mbtiList,disabled:!0,default:s.user.mbti},null,8,["options","default"])]),t("div",F,[E,n(i,{options:["남","여"],disabled:!0,default:s.user.gender},null,8,["default"])]),t("div",J,[T,u(t("input",{type:"number","onUpdate:modelValue":e[0]||(e[0]=o=>s.user.age=o),disabled:""},null,512),[[a,s.user.age]])]),t("div",k,[I,u(t("input",{type:"text","onUpdate:modelValue":e[1]||(e[1]=o=>s.user.nickname=o),disabled:""},null,512),[[a,s.user.nickname]])]),t("div",{class:"button fixed-bottom",onClick:e[2]||(e[2]=(...o)=>s.signup&&s.signup(...o))},"입장하기")],64)}const L=d(g,[["render",P]]);export{L as default};