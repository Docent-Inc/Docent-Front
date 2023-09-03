import{A as l}from"./axios.f72bf569.js";import{_ as y,f as p,l as a,m as t,q as g,t as n,v as i,S as h,z as _,M as v,k as c,x as k,y as w}from"./entry.df70887b.js";const f=()=>({async getTodayCalendar(){return(await l.get("/api/today/calender")).data},async getTodayRecord(){return(await l.get("/api/today/record")).data},async getTodayLucky(){return(await l.get("/api/generate/luck")).data}});const S={name:"Home",setup(){},data(){return{calendar:[],record:{},lucky:"",name:""}},async mounted(){const{getTodayCalendar:s,getTodayRecord:r,getTodayLucky:m}=f();if(console.log(window.localStorage.getItem("accessToken")),!window.localStorage.getItem("accessToken")){console.log(this.$eventBus),this.$eventBus.$emit("onLoginModal");return}this.name=window.localStorage.getItem("name"),await s().then(o=>{this.calendar=o.data}),await r().then(o=>{this.record=o.data}),await m().then(o=>{this.lucky=o.data.luck})}},d=s=>(k("data-v-c718caac"),s=s(),w(),s),T={class:"header"},I={class:"contents"},x={class:"title"},B={class:"main-title"},C=d(()=>t("br",null,null,-1)),b={class:"main-calendar main-description"},M={key:0},N={key:1},V=d(()=>t("div",{class:"main-title"},"오늘의 기록",-1)),Y={class:"main-description"},D={class:"main-slides"},L=d(()=>t("br",null,null,-1)),z=d(()=>t("div",{class:"main-title"},"오늘의 운세",-1)),A={class:"main-description"};function R(s,r,m,o,e,j){const u=p("v-icon");return c(),a(v,null,[t("div",T,[g(u,{class:"logo_docent"})]),t("div",I,[t("div",x,n(s.$dayjs().format("YYYY.MM.DD")),1),t("div",B,[i(" 안녕하세요 "+n(e.name)+"님 ",1),C,i("오늘의 이벤트예요 ")]),t("div",b,[g(u,{class:"ic_calendar"}),i("   "),e.calendar.length>0?(c(),a("div",M,n(e.calendar[0].title)+" ►",1)):(c(),a("div",N,"일정이 없네요!"))]),V,t("div",Y," 오늘 "+n(e.name)+"님은 이런 그림을 그리셨네요 ",1),t("div",D,[e.record.morning?(c(),a("div",{key:0,class:"main-slide",style:h(`background-image: url(${e.record.morning.image_url})`)},null,4)):_("",!0),e.record.night?(c(),a("div",{key:1,class:"main-slide",style:h(`background-image: url(${e.record.night.image_url})`)},null,4)):_("",!0),!e.record.morning&&!e.record.night?(c(),a("div",{key:2,class:"main-slide empty",onClick:r[0]||(r[0]=q=>this.$router.push("/chat"))},[i(n(e.name)+"님의 그림을 ",1),L,i("그려주세요! ")])):_("",!0)]),z,t("div",A,n(e.lucky),1)])],64)}const H=y(S,[["render",R],["__scopeId","data-v-c718caac"]]);export{H as default};
