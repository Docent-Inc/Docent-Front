import{_ as d}from"./SelectBox.22562dc4.js";import{_ as u,J as l,l as p,m as s,q as m,F as o,U as i,B as c,M as _,k as f}from"./entry.a32731b5.js";import{d as v}from"./component.856767e0.js";import{u as a}from"./signup.cfefbcef.js";/* empty css                   */const b=v({name:"1-Nickname",setup(){},data(){return{gender:""}},computed:{...l(a,["user","step"]),isValidate(){return this.gender!==""}},mounted(){this.step!==2&&this.$router.push("/signup/1-nickname")},methods:{saveGender(){if(this.gender===""){alert("나이는 1글자 이상이어야 합니다.");return}const{setGender:e,setStep:t}=a();e(this.gender),t(3),this.$router.push("/signup/4-mbti")}}},"$LwA2De9OZU"),g=s("div",{class:"title"},"성별을 알려주세요",-1),h={class:"input-box"},k=s("div",{class:"title"},"나이",-1),$={class:"input-box"},V=s("div",{class:"title"},"나이",-1),G={class:"input-box"},x=s("div",{class:"title"},"닉네임",-1);function B(e,t,N,S,U,C){const r=d;return f(),p(_,null,[g,s("div",h,[k,m(r,{options:["남","여"],onInput:t[0]||(t[0]=n=>e.gender=n)})]),s("div",$,[V,o(s("input",{type:"number","onUpdate:modelValue":t[1]||(t[1]=n=>e.user.age=n),disabled:""},null,512),[[i,e.user.age]])]),s("div",G,[x,o(s("input",{type:"text","onUpdate:modelValue":t[2]||(t[2]=n=>e.user.nickname=n),disabled:""},null,512),[[i,e.user.nickname]])]),s("div",{class:c(["button fixed-bottom",{disabled:!e.isValidate}]),onClick:t[3]||(t[3]=(...n)=>e.saveGender&&e.saveGender(...n))}," 다음 ",2)],64)}const q=u(b,[["render",B]]);export{q as default};
