import{U as l,_ as k,A as f,f as S,l as n,m as s,q as g,t as o,v as i,P as v,D as _,F as T,V as w,k as c,x as C,y as I}from"./entry.c61ee406.js";const V=()=>({async getTodayCalendar(){return(await l.get("/today/calender")).data},async getTodayRecord(){return(await l.get("/today/record")).data},async getTodayLucky(){return(await l.get("/generate/luck")).data}});const b={name:"Home",setup(){},computed:{...f(w,["user"])},data(){return{calendar:[],record:{},lucky:""}},async mounted(){const{getTodayCalendar:e,getTodayRecord:r,getTodayLucky:u}=V();await e().then(a=>{this.calendar=a.data}).catch(()=>{}),await r().then(a=>{this.record=a.data}).catch(()=>{}),await u().then(a=>{this.lucky=a.data.luck}).catch(()=>{})}},d=e=>(C("data-v-33720083"),e=e(),I(),e),x={class:"header"},D={class:"contents"},N={class:"title"},Y={class:"main-title"},B=d(()=>s("br",null,null,-1)),A={class:"main-calendar main-description"},F={key:0},L={key:1},M=d(()=>s("div",{class:"main-title"},"오늘의 기록",-1)),P={class:"main-description"},R={class:"main-slides"},U=d(()=>s("br",null,null,-1)),j=d(()=>s("div",{class:"main-title"},"오늘의 운세",-1)),q={class:"main-description"};function z(e,r,u,a,t,E){var h,y,p;const m=S("v-icon");return c(),n(T,null,[s("div",x,[g(m,{class:"logo_docent"})]),s("div",D,[s("div",N,o(e.$dayjs().format("YYYY.MM.DD")),1),s("div",Y,[i(" 안녕하세요 "+o((h=e.user)==null?void 0:h.nickname)+"님 ",1),B,i("오늘의 이벤트예요 ")]),s("div",A,[g(m,{class:"ic_calendar"}),i("   "),t.calendar.length>0?(c(),n("div",F,o(t.calendar[0].title)+" ►",1)):(c(),n("div",L,"일정이 없네요!"))]),M,s("div",P," 오늘 "+o((y=e.user)==null?void 0:y.nickname)+"님은 이런 그림을 그리셨네요 ",1),s("div",R,[t.record.morning?(c(),n("div",{key:0,class:"main-slide",style:v(`background-image: url(${t.record.morning.image_url})`)},null,4)):_("",!0),t.record.night?(c(),n("div",{key:1,class:"main-slide",style:v(`background-image: url(${t.record.night.image_url})`)},null,4)):_("",!0),!t.record.morning&&!t.record.night?(c(),n("div",{key:2,class:"main-slide empty",onClick:r[0]||(r[0]=H=>this.$router.push("/chat"))},[i(o((p=e.user)==null?void 0:p.nickname)+"님의 그림을 ",1),U,i("그려주세요! ")])):_("",!0)]),j,s("div",q,o(t.lucky),1)])],64)}const J=k(b,[["render",z],["__scopeId","data-v-33720083"]]);export{J as default};
