import{_ as p}from"./SelectBox.8313f5b9.js";import{_ as r,C as c,l as m,m as s,q as d,K as a,V as l,B as _,F as b,k as v,x as f,y as h}from"./entry.43156d6c.js";import{d as S}from"./component.58632c29.js";import{u}from"./signup.1a7b8a1f.js";const I=S({name:"4-Mbti",setup(){},data(){return{mbti:"",mbtiList:["INTJ","INTP","ENTJ","ENTP","INFJ","INFP","ENFJ","ENFP","ISTJ","ISFJ","ESTJ","ESFJ","ISTP","ISFP","ESTP","ESFP"]}},computed:{...c(u,["user","step"]),isValidate(){return this.mbti!==""}},mounted(){this.step!==3&&this.$router.push("/signup/1-nickname")},methods:{saveMbti(){if(!this.isValidate){alert("나이는 1글자 이상이어야 합니다.");return}const{setMbti:t,setStep:e}=u();t(this.mbti),e(4),this.$router.push("/signup/5-result")}}},"$QWkx19ugfQ"),o=t=>(f("data-v-d4cc85dd"),t=t(),h(),t),N=o(()=>s("div",{class:"title"},"Mbti를 알려주세요",-1)),F=o(()=>s("div",{class:"description"},"더 정확한 분석이 가능해요!",-1)),M={class:"input-box"},g=o(()=>s("div",{class:"title"},"Mbti",-1)),E={class:"input-box"},T=o(()=>s("div",{class:"title"},"성별",-1)),k={class:"input-box"},J=o(()=>s("div",{class:"title"},"나이",-1)),P={class:"input-box"},V=o(()=>s("div",{class:"title"},"닉네임",-1));function $(t,e,x,y,B,C){const n=p;return v(),m(b,null,[N,F,s("div",M,[g,d(n,{options:t.mbtiList,onInput:e[0]||(e[0]=i=>t.mbti=i)},null,8,["options"])]),s("div",E,[T,d(n,{options:["남","여"],disabled:!0,default:t.user.gender},null,8,["default"])]),s("div",k,[J,a(s("input",{type:"number","onUpdate:modelValue":e[1]||(e[1]=i=>t.user.age=i),disabled:""},null,512),[[l,t.user.age]])]),s("div",P,[V,a(s("input",{type:"text","onUpdate:modelValue":e[2]||(e[2]=i=>t.user.nickname=i),disabled:""},null,512),[[l,t.user.nickname]])]),s("div",{class:_(["button fixed-bottom",{disabled:!t.isValidate}]),onClick:e[3]||(e[3]=(...i)=>t.saveMbti&&t.saveMbti(...i))}," 다음 ",2)],64)}const q=r(I,[["render",$],["__scopeId","data-v-d4cc85dd"]]);export{q as default};
