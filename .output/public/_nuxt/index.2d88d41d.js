import{_ as n,l as i,m as o,A as l,k as _,x as r,y as d,v as s}from"./entry.cf959fc5.js";import{u as p}from"./auth.47e5533c.js";import"./axios.f72bf569.js";const u=""+new URL("button_kakao_login.7379bc26.svg",import.meta.url).href;const f=t=>(r("data-v-049d84f0"),t=t(),d(),t),m={class:"viewport"},v=f(()=>o("div",{class:"title-box"},[o("div",{class:"title"},[s("당신의 공간으로 "),o("br"),s("초대합니다!")]),o("div",{class:"subtitle"},"나를 위한 기록을 시작해보세요.")],-1)),g=["src"],x={__name:"index",setup(t){const{getKakaoLoginTest:k,getKakaoLogin:a}=p(),c=async()=>{const e=await a();console.log(e),e.success?(window.location.href=e.data.url,console.log("result:",e.data.url)):alert("로그인에 실패했습니다.")};return(e,h)=>(_(),i("div",m,[v,o("img",{src:l(u),onClick:c,class:"button fixed-bottom"},null,8,g)]))}},I=n(x,[["__scopeId","data-v-049d84f0"]]);export{I as default};
