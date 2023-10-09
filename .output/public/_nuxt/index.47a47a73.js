import{u as V}from"./generate.9f8bb2b6.js";import{_ as S,k as r,l as o,m as t,P as u,v as a,t as n,x as f,y as x,f as p,q as h,F as _,C as v,D as m}from"./entry.c61ee406.js";const y=""+new URL("img_introvert.93fd09b8.svg",import.meta.url).href,g=""+new URL("img_extrovert.4be0005f.svg",import.meta.url).href;const N={name:"Statistics",props:{statistics:{type:Object,default:()=>{}}},data(){return{IMG:{IntrovertSVG:y,ExtrovertSVG:g}}},computed:{introvert(){return this.statistics?this.statistics[0].내향:0},extrovert(){return this.statistics?this.statistics[0].외향:0},style_introvert(){return`width: ${20+5*(`${parseInt(this.introvert/10)}`-1)}%;`},style_extrovert(){return`width: ${20+5*(`${parseInt(this.extrovert/10)}`-1)}%;`}}},I=i=>(f("data-v-2b107d27"),i=i(),x(),i),$={class:"report-stat"},A=["src"],C=["src"],D={id:"introvert_txt"},E=I(()=>t("br",null,null,-1)),L={id:"extrovert_txt"},M=I(()=>t("br",null,null,-1));function B(i,d,G,b,e,l){return r(),o("div",$,[t("img",{src:e.IMG.IntrovertSVG,id:"introvert",style:u(l.style_introvert)},null,12,A),t("img",{src:e.IMG.ExtrovertSVG,id:"extrovert",style:u(l.style_extrovert)},null,12,C),t("div",D,[a(" 내향 "),E,a(" "+n(l.introvert)+" % ",1)]),t("div",L,[a(" 외향 "),M,a(" "+n(l.extrovert)+"% ",1)])])}const O=S(N,[["render",B],["__scopeId","data-v-2b107d27"]]);const T={name:"Report",setup(){},components:{Statistics:O},data(){return{IMG:{IntrovertSVG:y,ExtrovertSVG:g},data:{create_date:"2023-08-29T14:36:18"},name:"",status:"LOADING"}},async mounted(){if(!window.localStorage.getItem("accessToken")){console.log(this.$eventBus),this.$eventBus.$emit("onLoginModal");return}this.name=window.localStorage.getItem("name");const{getReport:i}=V();await i().then(d=>{console.log(d),console.log(this.data),this.data=d.data,this.status="SUCCESS"}).catch(d=>{d.status_code===4019&&(this.status="NODATA")})}},c=i=>(f("data-v-a90229eb"),i=i(),x(),i),R={class:"contents"},U={class:"title"},j={class:"report-keyword"},F=c(()=>t("div",null,"Key Word",-1)),q={class:"report-content"},z=c(()=>t("div",{class:"report-title"},"Mental State",-1)),K={class:"report-desc"},P={class:"report-content"},W=c(()=>t("div",{class:"report-title"},"외향적 활동",-1)),H={class:"report-content"},J=c(()=>t("div",{class:"report-title"},"내향적 활동",-1)),Q={class:"report-content"},X=c(()=>t("div",{class:"report-title"},"긍정적인 부분 3개",-1)),Y={class:"report-content"},Z=c(()=>t("div",{class:"report-title"},"부정적인 부분 3개",-1)),tt={class:"report-content"},et=c(()=>t("div",{class:"report-title"},"추천",-1)),st={key:0,class:"blank"},rt={key:1,class:"blank"},ot=c(()=>t("br",null,null,-1));function it(i,d,G,b,e,l){const k=p("Statistics"),w=p("v-progress-circular");return r(),o(_,null,[t("div",R,[t("div",U,n(e.name)+" 님의 깊은 곳이에요",1),h(k,{statistics:e.data.statistics},null,8,["statistics"]),t("div",j,[F,t("div",null,n(e.data.statistics?e.data.statistics[1].join(", "):""),1)]),t("div",q,[z,t("div",K,n(e.data.mental_state),1)]),t("div",P,[W,(r(!0),o(_,null,v(e.data.extroverted_activities,s=>(r(),o("div",{class:"report-desc",key:s}," • "+n(s),1))),128))]),t("div",H,[J,(r(!0),o(_,null,v(e.data.introverted_activities,s=>(r(),o("div",{class:"report-desc",key:s}," • "+n(s),1))),128))]),t("div",Q,[X,(r(!0),o(_,null,v(e.data.positives,s=>(r(),o("div",{class:"report-desc",key:s}," • "+n(s),1))),128))]),t("div",Y,[Z,(r(!0),o(_,null,v(e.data.negatives,s=>(r(),o("div",{class:"report-desc",key:s}," • "+n(s),1))),128))]),t("div",tt,[et,(r(!0),o(_,null,v(e.data.recommendations,s=>(r(),o("div",{class:"report-desc",key:s}," • "+n(s),1))),128))])]),e.status==="LOADING"?(r(),o("div",st,[h(w,{indeterminate:"",color:"#2C9577"}),a("보고서 생성 중. . . ")])):m("",!0),e.status==="NODATA"?(r(),o("div",rt,[a(" 마음 보고서를 만들기 위한 "),ot,a("기록이 부족합니다 😭 ")])):m("",!0)],64)}const at=S(T,[["render",it],["__scopeId","data-v-a90229eb"]]);export{at as default};