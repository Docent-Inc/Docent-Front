import{_ as C,f as S,k as o,l as i,q as T,z as l,t as _,m as a,A as q,B as F,x as E,y as M,v as x,d as O,r as L,C as j,D as z,o as P,E as V,F as Y,G as A,H as k,I as R,J as G,K as U,L as y,M as J,N as K}from"./entry.41df9e10.js";import{u as $}from"./chat.6016322f.js";import"./axios.f72bf569.js";const W=""+new URL("loading-dot.093b62ac.gif",import.meta.url).href;const Q=t=>(E("data-v-e9587081"),t=t(),M(),t),X={key:0,class:"chat-profile"},Z=Q(()=>a("div",null,"도슨트",-1)),tt={key:1,class:"chat-date"},et={key:2,class:"chat-box loading"},nt=["src"],ot={key:3,class:"chat-box"},st={__name:"ChatBox",props:{type:{type:String,required:!1,default:"text"},text:{type:String,required:!1,default:""}},setup(t){return(n,e)=>{const s=S("v-icon");return o(),i("div",{class:F(["chat-box-wrapper",{right:t.type==="text"}])},[t.type==="docent"?(o(),i("div",X,[T(s,{class:"ic_docent"}),Z])):l("",!0),t.type==="date"?(o(),i("div",tt,_(n.$dayjs(t.text).format("YYYY년 M월 D일")),1)):l("",!0),t.type==="loading"?(o(),i("div",et,[a("img",{src:q(W)},null,8,nt)])):l("",!0),t.type==="text"?(o(),i("div",ot,_(t.text),1)):l("",!0)],2)}}},b=C(st,[["__scopeId","data-v-e9587081"]]);const at={name:"ChatResult",props:{type:{type:Number,required:!0,default:1},chat:{type:Object,required:!0,default:()=>{}}},computed:{type_name(){switch(this.type){case 1:return"🌞 아침 일기";case 2:return"🌙 저녁 일기";case 3:return"✏️ 메모";default:return"✅ 일정"}}},methods:{more(){if(![1,2].includes(this.chat.content_type)){alert("🔔 서비스 오픈 예정입니다.");return}console.log("cliclk>>",this.chat);const t=this.chat.content_type===1?this.chat.MorningDiary_id:this.chat.NightDiary_id;console.log(`type: ${this.chat.content_type} id: ${t}`),this.$router.push(`/diary/${t}?type=${this.chat.content_type}`)}}},it={class:"chat-result"},ct={key:0,class:"chat-title"},lt={key:1,class:"chat-title"},rt={key:2,class:"memo"},dt={class:"chat-diary-title"},ut=["src"],_t={key:3},pt={class:"chat-memo"},ht={key:4},mt={class:"chat-calendar"},yt={class:"chat-calendar-title"},ft={class:"date"};function gt(t,n,e,s,m,r){return o(),i("div",it,[e.type===4?(o(),i("div",ct,[a("span",null,_(r.type_name.replace(" ","  ")),1),x("이 추가 되었습니다! ")])):(o(),i("div",lt,[a("span",null,_(r.type_name.replace(" ","  ")),1),x("가 추가 되었습니다! ")])),e.type===1||e.type===2?(o(),i("div",rt,[a("div",dt,_(e.chat.content),1),a("img",{src:e.chat.image_url},null,8,ut),a("div",{class:"chat-more",onClick:n[0]||(n[0]=(...c)=>r.more&&r.more(...c))},"더 알아보기 >")])):l("",!0),e.type===3?(o(),i("div",_t,[a("div",pt,[x(_(e.chat.content)+" ",1),a("div",{class:"chat-more disabled",onClick:n[1]||(n[1]=(...c)=>r.more&&r.more(...c))}," 더 알아보기 > ")])])):l("",!0),e.type===4?(o(),i("div",ht,[a("div",mt,[a("div",yt,_(e.chat.content),1),a("div",ft,_(t.$dayjs(e.chat.event_time).format("MM.DD ddd"))+"요일 ",1)]),a("button",{class:"button disabled",onClick:n[2]||(n[2]=(...c)=>r.more&&r.more(...c))},"자세히 보기")])):l("",!0)])}const vt=C(at,[["render",gt],["__scopeId","data-v-a78ab4cf"]]);function xt(t,n){const e=t.getBoundingClientRect();if(!n)return e.top>=0&&e.bottom<=window.innerHeight;const s=n.getBoundingClientRect();return e.top>=s.top&&e.bottom<=s.bottom}async function kt(t){return await R(),t.value instanceof HTMLElement?t.value:t.value?document.querySelector(t.value):null}function B(t){let n=`0px 0px ${t.distance}px 0px`;t.top&&(n=`${t.distance}px 0px 0px 0px`);const e=new IntersectionObserver(s=>{s[0].isIntersecting&&(t.firstload&&t.emit(),t.firstload=!0)},{root:t.parentEl,rootMargin:n});return e.observe(t.infiniteLoading.value),e}const D=(t,n)=>{const e=t.__vccOpts||t;for(const[s,m]of n)e[s]=m;return e},bt={},Ct=t=>(E("data-v-d3e37633"),t=t(),M(),t),It={class:"container"},wt=Ct(()=>a("div",{class:"spinner"},null,-1)),Lt=[wt];function $t(t,n){return o(),i("div",It,Lt)}const Bt=D(bt,[["render",$t],["__scopeId","data-v-d3e37633"]]),St={class:"state-error"},Tt=O({__name:"InfiniteLoading",props:{top:{type:Boolean,default:!1},target:{},distance:{default:0},identifier:{},firstload:{type:Boolean,default:!0},slots:{}},emits:["infinite"],setup(t,{emit:n}){const e=t;let s=null,m=0;const r=L(null),c=L(""),{top:h,firstload:v,distance:g}=e,{identifier:d,target:N}=j(e),u={infiniteLoading:r,top:h,firstload:v,distance:g,parentEl:null,emit(){m=(u.parentEl||document.documentElement).scrollHeight,I.loading(),n("infinite",I)}},I={loading(){c.value="loading"},async loaded(){c.value="loaded";const p=u.parentEl||document.documentElement;await R(),h&&(p.scrollTop=p.scrollHeight-m),xt(r.value,u.parentEl)&&u.emit()},complete(){c.value="complete",s==null||s.disconnect()},error(){c.value="error"}};return z(d,()=>{s==null||s.disconnect(),s=B(u)}),P(async()=>{u.parentEl=await kt(N),s=B(u)}),V(()=>{s==null||s.disconnect()}),(p,w)=>(o(),i("div",{ref_key:"infiniteLoading",ref:r,style:{"min-height":"1px"}},[Y(a("div",null,[k(p.$slots,"spinner",{},()=>[T(Bt)],!0)],512),[[A,c.value=="loading"]]),c.value=="complete"?k(p.$slots,"complete",{key:0},()=>{var f;return[a("span",null,_(((f=p.slots)==null?void 0:f.complete)||"No more results!"),1)]},!0):l("",!0),c.value=="error"?k(p.$slots,"error",{key:1,retry:u.emit},()=>{var f;return[a("span",St,[a("span",null,_(((f=p.slots)==null?void 0:f.error)||"Oops something went wrong!"),1),a("button",{class:"retry",onClick:w[0]||(w[0]=(...H)=>u.emit&&u.emit(...H))},"retry")])]},!0):l("",!0)],512))}}),Et=D(Tt,[["__scopeId","data-v-a7077831"]]);const Mt={name:"Chat",components:{InfiniteLoading:Et,ChatBox:b,ChatResult:b},setup(){},data(){return{isInitialized:!1}},computed:{...G($,["list","chatList","totalCounts","pageNo","reload"])},watch:{list(){this.listToChatList()},reload(){if(console.log(this.reload),this.reload){console.log("스크롤 실행!");const t=this.$refs.scrollable,n=t.scrollHeight;console.log("*",t.scrollTop,", ",n),t.scrollTo({top:n,behavior:"smooth"}),t.addEventListener("scroll",()=>{const e=t.scrollTop+t.clientHeight>=n-.5;console.log(" check -> ",t.scrollTop+t.clientHeight,", ",n-.5),e&&this.setReload(!1)})}}},mounted(){if(console.log(window.localStorage.getItem("accessToken")),!window.localStorage.getItem("accessToken")){console.log(this.$eventBus),this.$eventBus.$emit("onLoginModal");return}this.getFirstPage()},methods:{...U($,["getList","listToChatList","getFirstPage","setIsFirstPage","setReload"]),async loadMore(){console.log("here"),this.$nextTick(),setTimeout(()=>{this.totalCounts>this.list.length&&this.getList()},1e3)}}},Rt={class:"contents",ref:"scrollable"};function Dt(t,n,e,s,m,r){var g;const c=S("infinite-loading"),h=b,v=vt;return o(),i("div",Rt,[(g=t.chatList)!=null&&g.length?(o(),y(c,{key:0,"first-load":!1,distance:1e3,top:!0,onInfinite:r.loadMore},null,8,["onInfinite"])):l("",!0),(o(!0),i(J,null,K(t.chatList,d=>(o(),i("div",{key:d.id},[d.content_type===5?(o(),y(h,{key:0,type:"docent"})):l("",!0),d.content_type===7?(o(),y(h,{key:1,type:"loading"})):l("",!0),d.content_type===6?(o(),y(h,{key:2,text:d.content,type:"date"},null,8,["text"])):l("",!0),d.is_chatbot&&[1,2,3,4].includes(d.content_type)?(o(),y(v,{key:3,type:d.content_type,chat:d},null,8,["type","chat"])):l("",!0),!d.is_chatbot&&[1,2,3,4,null].includes(d.content_type)?(o(),y(h,{key:4,text:d.content},null,8,["text"])):l("",!0)]))),128))],512)}const Ft=C(Mt,[["render",Dt],["__scopeId","data-v-4d28c199"]]);export{Ft as default};
