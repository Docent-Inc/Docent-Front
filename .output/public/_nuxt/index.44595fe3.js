import{a as T,r as _,o as I,f as b,l as n,m as t,q as h,v as i,t as d,A as e,S as k,z as m,M as C,k as c,x as N,y as V}from"./entry.15ad9915.js";import{A as g}from"./axios.f72bf569.js";import{_ as A}from"./_plugin-vue_export-helper.c27b6911.js";const B=()=>({async getTodayCalendar(){return(await g.get("/api/today/calender")).data},async getTodayRecord(){return(await g.get("/api/today/record")).data},async getTodayLucky(){return(await g.get("/api/generate/luck")).data}});const r=a=>(N("data-v-c1c3ed68"),a=a(),V(),a),R={class:"header"},$={class:"body"},z=r(()=>t("div",{class:"title"},"2023.09.03",-1)),L={class:"main-title"},M=r(()=>t("br",null,null,-1)),q={class:"main-calendar main-description"},D={key:0},E={key:1},F=r(()=>t("div",{class:"main-title"},"오늘의 기록",-1)),P={class:"main-description"},j={class:"main-slides"},G=r(()=>t("br",null,null,-1)),H=r(()=>t("div",{class:"main-title"},"오늘의 운세",-1)),J={class:"main-description"},K={__name:"index",setup(a){const w=T(),u=_([]),s=_({}),y=_(""),l=_(""),{getTodayCalendar:f,getTodayRecord:x,getTodayLucky:S}=B();return I(async()=>{l.value=window.localStorage.getItem("name")?window.localStorage.getItem("name"):"",await f().then(o=>{u.value=o.data}),await x().then(o=>{s.value=o.data}),await S().then(o=>{y.value=o.data.luck})}),(o,p)=>{const v=b("v-icon");return c(),n(C,null,[t("div",R,[h(v,{class:"logo_docent"})]),t("div",$,[z,t("div",L,[i(" 안녕하세요 "+d(e(l))+"님 ",1),M,i("오늘의 이벤트예요 ")]),t("div",q,[h(v,{class:"ic_calendar"}),i("   "),e(u).length>0?(c(),n("div",D,d(e(u)[0].title)+" ►",1)):(c(),n("div",E,"일정이 없네요!"))]),F,t("div",P," 오늘 "+d(e(l))+"님은 이런 그림을 그리셨네요 ",1),t("div",j,[e(s).morning?(c(),n("div",{key:0,class:"main-slide",style:k(`background-image: url(${e(s).morning.image_url})`)},null,4)):m("",!0),e(s).night?(c(),n("div",{key:1,class:"main-slide",style:k(`background-image: url(${e(s).night.image_url})`)},null,4)):m("",!0),!e(s).morning||!e(s).night?(c(),n("div",{key:2,class:"main-slide empty",onClick:p[0]||(p[0]=O=>e(w).push("/chat"))},[i(d(e(l))+"님의 그림을 ",1),G,i("그려주세요! ")])):m("",!0)]),H,t("div",J,d(e(y)),1)])],64)}}},X=A(K,[["__scopeId","data-v-c1c3ed68"]]);export{X as default};
