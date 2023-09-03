import{_ as u,r as C,o as k,f as p,k as _,l as h,m as r,t as x,A as y,q as d,J as I,K as $,L as v,z as f,F as w,U as S,M as V,H as F}from"./entry.cf959fc5.js";import{u as g,a as b}from"./chat.4d527f48.js";import"./axios.f72bf569.js";const N={class:"chat-voice"},G={__name:"ChatVoice",emits:["finish"],setup(o,{emit:e}){const i=C(""),l=window.SpeechRecognition||window.webkitSpeechRecognition,t=new l;t.lang="ko",t.continuous=!0,t.onresult=s=>{for(let n=s.resultIndex,a=s.results.length;n<a;n++){let m=s.results[n][0].transcript;s.results[n].isFinal&&(i.value+=m,console.log("🎤 ",m))}},k(()=>{t.start()});function c(){t&&t.stop(),e("finish",i.value)}return(s,n)=>{const a=p("v-icon");return _(),h("div",N,[r("div",null,x(y(i)),1),d(a,{class:"ic_voice big",onClick:c})])}}},L=u(G,[["__scopeId","data-v-e5e9f806"]]);const P={name:"ChatInput",data(){return{mode:"INPUT",data:"",isGenerating:!1}},setup(){},computed:{...I(g,["chatList"])},methods:{...$(g,["setChatList","getFirstPage","setReload"]),async send(){if(this.isGenerating)return;const{generateChat:o}=b(),e=this.chatList;e.push({content_type:7}),this.setChatList(e),this.isGenerating=!0,this.setReload(!0);const i=await o(this.data);console.log("✨generateChat >>> ",this.data),i.success&&(this.data="",this.getFirstPage(),this.isGenerating=!1)},setData(o){this.data=o,this.mode="INPUT"}}},R={class:"chat-input"},U={class:"input"},B=["disabled"];function D(o,e,i,l,t,c){const s=p("v-icon"),n=L;return _(),h(V,null,[r("div",R,[t.mode==="INPUT"?(_(),v(s,{key:0,class:"ic_voice",onClick:e[0]||(e[0]=a=>t.mode="VOICE")})):f("",!0),r("div",U,[w(r("input",{type:"text","onUpdate:modelValue":e[1]||(e[1]=a=>t.data=a),placeholder:"도슨트에게 당신의 이야기를 들려주세요",disabled:t.isGenerating},null,8,B),[[S,t.data]]),d(s,{class:"ic_send",onClick:c.send},null,8,["onClick"])])]),t.mode==="VOICE"?(_(),v(n,{key:0,onFinish:c.setData},null,8,["onFinish"])):f("",!0)],64)}const T=u(P,[["render",D],["__scopeId","data-v-d8236b94"]]);const E={mounted(){}},M={class:"viewport"},A={class:"header"};function O(o,e,i,l,t,c){const s=p("v-icon"),n=T;return _(),h("div",M,[r("div",A,[d(s,{class:"ic_home",onClick:e[0]||(e[0]=a=>this.$router.push("/home"))}),d(s,{class:"logo_docent"})]),F(o.$slots,"default",{},void 0,!0),d(n)])}const J=u(E,[["render",O],["__scopeId","data-v-0a65ea3d"]]);export{J as default};
