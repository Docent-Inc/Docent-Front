import{Q as l,a2 as o}from"./entry.c52c467b.js";import{u as i}from"./generate.cca30fad.js";const r=l("chat",{state:()=>({list:[],chatList:[],pageNo:1,totalCounts:0,isFirstPage:!1,reload:!1}),actions:{async getList(){const{getChatList:t}=i();console.log(`✨addChatList(${this.pageNo})`),console.log(">>"+this.list.length+"/"+this.totalCounts);const s=await t(this.pageNo);if(console.log(">> res",s),!s.success){const a=`${s.status_code}  - ${s.message}`;console.log("Error! > ",a,s),alert(a);return}this.list=[...s.data.list.reverse(),...this.list],this.totalCounts=s.data.total_counts,this.pageNo=s.data.page_num+1,console.log(">>> ",this.list)},async getFirstPage(){this.pageNo=1,this.totalCounts=0;const{getChatList:t}=i();console.log(`✨addChatList(${this.pageNo})`),console.log(">>"+this.list.length+"/"+this.totalCounts);const s=await t(this.pageNo);this.list=[...s.data.list.reverse()],this.totalCounts=s.data.total_counts,this.pageNo=s.data.page_num+1,console.log(">>> ",this.list),this.reload=!0},listToChatList(){const t=[];if(!this.list.length)return t;t.push({content_type:6,content:this.list[0].create_date});let s=!0,a=null;for(const e of this.list)e.is_chatbot&&s?(t.push({content_type:5,is_chatbot:!0}),s=!1):e.is_chatbot||(s=!0),a&&e.create_date&&o(e.create_date).format("YYYY/MM/DD")!==o(a).format("YYYY/MM/DD")&&t.push({content_type:6,content:e.create_date}),t.push(e),a=e.create_date;this.chatList=t},setChatList(t){console.log("dd",t),this.chatList=t},setIsFirstPage(t){this.isFirstPage=t},setReload(t){console.log("setReload - ",t),this.reload=t}}});export{r as u};
