import{_ as n,W as l,l as _,m as s,E as i,k as d,x as r,y as u,v as o}from"./entry.c61ee406.js";const p=""+new URL("button_kakao_login.7379bc26.svg",import.meta.url).href;const f=t=>(r("data-v-7e2fe58d"),t=t(),u(),t),v={class:"viewport"},x=f(()=>s("div",{class:"title-box"},[s("div",{class:"title"},[o("당신의 공간으로 "),s("br"),o("초대합니다!")]),s("div",{class:"subtitle"},"나를 위한 기록을 시작해보세요.")],-1)),m=["src"],g={__name:"index",setup(t){const{getKakaoLogin:a}=l(),c=async()=>{const e=await a();console.log(e),e.success?(window.location.href=e.data.url,console.log("result:",e.data.url)):alert("로그인에 실패했습니다.")};return(e,h)=>(d(),_("div",v,[x,s("img",{src:i(p),onClick:c,class:"button fixed-bottom"},null,8,m)]))}},b=n(g,[["__scopeId","data-v-7e2fe58d"]]);export{b as default};
