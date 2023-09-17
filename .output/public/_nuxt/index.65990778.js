import{u as b}from"./generate.d64cc311.js";import{_ as S,k as r,l as o,m as t,P as u,v as a,t as n,x as f,y as x,f as p,q as h,F as d,G as v,z as m}from"./entry.a5d9f065.js";import"./axios.f7e5a9d0.js";const y=""+new URL("img_introvert.93fd09b8.svg",import.meta.url).href,g=""+new URL("img_extrovert.4be0005f.svg",import.meta.url).href;const N={name:"Statistics",props:{statistics:{type:Object,default:()=>{}}},data(){return{IMG:{IntrovertSVG:y,ExtrovertSVG:g}}},computed:{introvert(){return this.statistics?this.statistics[0].내향:0},extrovert(){return this.statistics?this.statistics[0].외향:0},style_introvert(){return`width: ${20+5*(`${parseInt(this.introvert/10)}`-1)}%;`},style_extrovert(){return`width: ${20+5*(`${parseInt(this.extrovert/10)}`-1)}%;`}}},I=i=>(f("data-v-584146a2"),i=i(),x(),i),$={class:"report-stat"},A=["src"],E=["src"],L={id:"introvert_txt"},M=I(()=>t("br",null,null,-1)),B={id:"extrovert_txt"},C=I(()=>t("br",null,null,-1));function D(i,_,G,k,e,l){return r(),o("div",$,[t("img",{src:e.IMG.IntrovertSVG,id:"introvert",style:u(l.style_introvert)},null,12,A),t("img",{src:e.IMG.ExtrovertSVG,id:"extrovert",style:u(l.style_extrovert)},null,12,E),t("div",L,[a(" 내향 "),M,a(" "+n(l.introvert)+" % ",1)]),t("div",B,[a(" 외향 "),C,a(" "+n(l.extrovert)+"% ",1)])])}const O=S(N,[["render",D],["__scopeId","data-v-584146a2"]]);const T={name:"Report",setup(){},components:{Statistics:O},data(){return{IMG:{IntrovertSVG:y,ExtrovertSVG:g},data:{create_date:"2023-08-29T14:36:18"},name:"",status:"LOADING"}},async mounted(){if(!window.localStorage.getItem("accessToken")){console.log(this.$eventBus),this.$eventBus.$emit("onLoginModal");return}this.name=window.localStorage.getItem("name");const{getReport:i}=b();await i().then(_=>{console.log(_),console.log(this.data),this.data=_.data,this.status="SUCCESS"}).catch(_=>{_.status_code===4019&&(this.status="NODATA")})}},c=i=>(f("data-v-84989730"),i=i(),x(),i),R={class:"contents"},U={class:"title"},j={class:"report-keyword"},z=c(()=>t("div",null,"Key Word",-1)),F={class:"report-content"},q=c(()=>t("div",{class:"report-title"},"Mental State",-1)),K={class:"report-content"},P=c(()=>t("div",{class:"report-title"},"외향적 활동",-1)),W={class:"report-content"},H=c(()=>t("div",{class:"report-title"},"내향적 활동",-1)),J={class:"report-content"},Q=c(()=>t("div",{class:"report-title"},"긍정적인 부분 3개",-1)),X={class:"report-content"},Y=c(()=>t("div",{class:"report-title"},"부정적인 부분 3개",-1)),Z={class:"report-content"},tt=c(()=>t("div",{class:"report-title"},"추천",-1)),et={key:0,class:"blank"},st={key:1,class:"blank"},rt=c(()=>t("br",null,null,-1));function ot(i,_,G,k,e,l){const w=p("Statistics"),V=p("v-progress-circular");return r(),o(d,null,[t("div",R,[t("div",U,n(e.name)+" 님의 깊은 곳이에요",1),h(w,{statistics:e.data.statistics},null,8,["statistics"]),t("div",j,[z,t("div",null,n(e.data.statistics?e.data.statistics[1].join(", "):""),1)]),t("div",F,[q,t("div",null,n(e.data.mental_state),1)]),t("div",K,[P,(r(!0),o(d,null,v(e.data.extroverted_activities,s=>(r(),o("div",{class:"report-desc",key:s}," • "+n(s),1))),128))]),t("div",W,[H,(r(!0),o(d,null,v(e.data.introverted_activities,s=>(r(),o("div",{key:s}," • "+n(s),1))),128))]),t("div",J,[Q,(r(!0),o(d,null,v(e.data.positives,s=>(r(),o("div",{class:"report-desc",key:s}," • "+n(s),1))),128))]),t("div",X,[Y,(r(!0),o(d,null,v(e.data.negatives,s=>(r(),o("div",{class:"report-desc",key:s}," • "+n(s),1))),128))]),t("div",Z,[tt,(r(!0),o(d,null,v(e.data.recommendations,s=>(r(),o("div",{class:"report-desc",key:s}," • "+n(s),1))),128))])]),e.status==="LOADING"?(r(),o("div",et,[h(V,{indeterminate:"",color:"#2C9577"}),a("보고서 생성 중. . . ")])):m("",!0),e.status==="NODATA"?(r(),o("div",st,[a(" 마음 보고서를 만들기 위한 "),rt,a("기록이 부족합니다 😭 ")])):m("",!0)],64)}const at=S(T,[["render",ot],["__scopeId","data-v-84989730"]]);export{at as default};
