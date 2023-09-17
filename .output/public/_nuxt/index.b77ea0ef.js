import{_ as p,f as v,k as e,l as n,q as C,z as c,t as d,m as a,A as b,B as I,x as L,y as T,v as y,C as $,D as B,E as _,F as S,G as w}from"./entry.43156d6c.js";import{W as D}from"./v3-infinite-loading.es.7a0235a7.js";import{u as f}from"./chat.d9267334.js";import"./generate.cff712fa.js";import"./axios.92690a64.js";const M=""+new URL("loading-dot.093b62ac.gif",import.meta.url).href;const N=t=>(L("data-v-e9587081"),t=t(),T(),t),R={key:0,class:"chat-profile"},F=N(()=>a("div",null,"도슨트",-1)),q={key:1,class:"chat-date"},V={key:2,class:"chat-box loading"},Y=["src"],j={key:3,class:"chat-box"},z={__name:"ChatBox",props:{type:{type:String,required:!1,default:"text"},text:{type:String,required:!1,default:""}},setup(t){return(s,o)=>{const u=v("v-icon");return e(),n("div",{class:I(["chat-box-wrapper",{right:t.type==="text"}])},[t.type==="docent"?(e(),n("div",R,[C(u,{class:"ic_docent"}),F])):c("",!0),t.type==="date"?(e(),n("div",q,d(s.$dayjs(t.text).format("YYYY년 M월 D일")),1)):c("",!0),t.type==="loading"?(e(),n("div",V,[a("img",{src:b(M)},null,8,Y)])):c("",!0),t.type==="text"?(e(),n("div",j,d(t.text),1)):c("",!0)],2)}}},m=p(z,[["__scopeId","data-v-e9587081"]]);const E={name:"ChatResult",props:{type:{type:Number,required:!0,default:1},chat:{type:Object,required:!0,default:()=>{}}},computed:{type_name(){switch(this.type){case 1:return"🌞 아침 일기";case 2:return"🌙 저녁 일기";case 3:return"✏️ 메모";default:return"✅ 일정"}}},methods:{more(){if(![1,2].includes(this.chat.content_type)){alert("🔔 서비스 오픈 예정입니다.");return}console.log("cliclk>>",this.chat);const t=this.chat.content_type===1?this.chat.MorningDiary_id:this.chat.NightDiary_id;console.log(`type: ${this.chat.content_type} id: ${t}`),this.$router.push(`/diary/${t}?type=${this.chat.content_type}`)}}},H={class:"chat-result"},P={key:0,class:"chat-title"},A={key:1,class:"chat-title"},G={key:2,class:"memo"},O={class:"chat-diary-title"},U=["src"],W={key:3},J={class:"chat-memo"},K={key:4},Q={class:"chat-calendar"},X={class:"chat-calendar-title"},Z={class:"date"};function tt(t,s,o,u,k,l){return e(),n("div",H,[o.type===4?(e(),n("div",P,[a("span",null,d(l.type_name.replace(" ","  ")),1),y("이 추가 되었습니다! ")])):(e(),n("div",A,[a("span",null,d(l.type_name.replace(" ","  ")),1),y("가 추가 되었습니다! ")])),o.type===1||o.type===2?(e(),n("div",G,[a("div",O,d(o.chat.content),1),a("img",{src:o.chat.image_url},null,8,U),a("div",{class:"chat-more",onClick:s[0]||(s[0]=(...r)=>l.more&&l.more(...r))},"더 알아보기 >")])):c("",!0),o.type===3?(e(),n("div",W,[a("div",J,[y(d(o.chat.content)+" ",1),a("div",{class:"chat-more disabled",onClick:s[1]||(s[1]=(...r)=>l.more&&l.more(...r))}," 더 알아보기 > ")])])):c("",!0),o.type===4?(e(),n("div",K,[a("div",Q,[a("div",X,d(o.chat.content),1),a("div",Z,d(t.$dayjs(o.chat.event_time).format("MM.DD ddd"))+"요일 ",1)]),a("button",{class:"button disabled",onClick:s[2]||(s[2]=(...r)=>l.more&&l.more(...r))},"자세히 보기")])):c("",!0)])}const et=p(E,[["render",tt],["__scopeId","data-v-a78ab4cf"]]);const st={name:"Chat",components:{InfiniteLoading:D,ChatBox:m,ChatResult:m},setup(){},data(){return{isInitialized:!1}},computed:{...$(f,["list","chatList","totalCounts","pageNo","reload"])},watch:{list(){this.listToChatList()},reload(){if(console.log(this.reload),this.reload){console.log("스크롤 실행!");const t=this.$refs.scrollable,s=t.scrollHeight;console.log("*",t.scrollTop,", ",s),t.scrollTo({top:s,behavior:"smooth"}),t.addEventListener("scroll",()=>{const o=t.scrollTop+t.clientHeight>=s-.5;console.log(" check -> ",t.scrollTop+t.clientHeight,", ",s-.5),o&&this.setReload(!1)})}}},mounted(){if(console.log(window.localStorage.getItem("accessToken")),!window.localStorage.getItem("accessToken")){console.log(this.$eventBus),this.$eventBus.$emit("onLoginModal");return}this.getFirstPage()},methods:{...B(f,["getList","listToChatList","getFirstPage","setIsFirstPage","setReload"]),async loadMore(){console.log("here"),this.$nextTick(),setTimeout(()=>{this.totalCounts>this.list.length&&this.getList()},1e3)}}},ot={class:"contents",ref:"scrollable"};function nt(t,s,o,u,k,l){var g;const r=v("infinite-loading"),h=m,x=et;return e(),n("div",ot,[(g=t.chatList)!=null&&g.length?(e(),_(r,{key:0,"first-load":!1,distance:1e3,top:!0,onInfinite:l.loadMore},null,8,["onInfinite"])):c("",!0),(e(!0),n(S,null,w(t.chatList,i=>(e(),n("div",{key:i.id},[i.content_type===5?(e(),_(h,{key:0,type:"docent"})):c("",!0),i.content_type===7?(e(),_(h,{key:1,type:"loading"})):c("",!0),i.content_type===6?(e(),_(h,{key:2,text:i.content,type:"date"},null,8,["text"])):c("",!0),i.is_chatbot&&[1,2,3,4].includes(i.content_type)?(e(),_(x,{key:3,type:i.content_type,chat:i},null,8,["type","chat"])):c("",!0),!i.is_chatbot&&[1,2,3,4,null].includes(i.content_type)?(e(),_(h,{key:4,text:i.content},null,8,["text"])):c("",!0)]))),128))],512)}const rt=p(st,[["render",nt],["__scopeId","data-v-4d28c199"]]);export{rt as default};
