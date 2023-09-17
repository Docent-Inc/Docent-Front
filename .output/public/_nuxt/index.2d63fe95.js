import{_ as l,k as o,l as a,m as i,t as p,f as y,G as g,E as u,F as f,x as C,y as N,Q as B,B as M,C as w,R as G,D as x,q as D,z as T}from"./entry.c52c467b.js";import{u as Y}from"./diary.16baab4b.js";import{W as S}from"./v3-infinite-loading.es.7c3feb69.js";import"./axios.8acffacc.js";const j={name:"ListDiary",props:{diary:{type:Object,required:!0,default:()=>{}}},methods:{showDetail(){console.log("cliclk>>",this.diary),console.log(`type: ${this.diary.content_type} id: ${this.diary.id}`),this.$router.push(`/diary/${this.diary.id}?type=${this.diary.content_type}`)}}},q=["src"],O={class:"diary_text"},J={class:"diary_title"},A={class:"diary_date"},z={key:0,class:"dot"},E={key:1,class:"dot green"};function R(t,s,e,c,m,n){return o(),a("div",{class:"item_diary",onClick:s[0]||(s[0]=(...d)=>n.showDetail&&n.showDetail(...d))},[i("img",{src:e.diary.image_url},null,8,q),i("div",O,[i("div",J,p(e.diary.diary_name),1),i("div",A,p(t.$dayjs(e.diary.create_date).format("YYYY.MM.DD")),1)]),e.diary.content_type===1?(o(),a("div",z)):(o(),a("div",E))])}const L=l(j,[["render",R],["__scopeId","data-v-26e04367"]]);const V={name:"ListDiary",props:{memo:{type:Object,required:!0,default:()=>{}}}},H={class:"item_memo"},W={class:"memo_text"},F={class:"memo_title"},U={class:"memo_date"};function Z(t,s,e,c,m,n){return o(),a("div",H,[i("div",W,[i("div",F,p(e.memo.title),1),i("div",U,p(t.$dayjs(e.memo.create_date).format("YYYY.MM.DD")),1)])])}const k=l(V,[["render",Z],["__scopeId","data-v-0fbbe779"]]),K={name:"ListItems",components:{ListDiary:L,ListMemo:k},props:{list:{type:Array,required:!0,default:[]}}},Q=i("hr",null,null,-1);function X(t,s,e,c,m,n){const d=y("ListMemo"),_=y("ListDiary");return o(!0),a(f,null,g(e.list,(r,h)=>(o(),a("div",{key:h},[r.content_type===3?(o(),u(d,{key:0,memo:r},null,8,["memo"])):(o(),u(_,{key:1,diary:r},null,8,["diary"])),Q]))),128)}const P=l(K,[["render",X]]);const tt={name:"BoardMemo",props:{memo:{type:Object,required:!0,default:()=>{}}}},et=t=>(C("data-v-bf9d473b"),t=t(),N(),t),st={class:"item_board_memo"},ot={class:"memo_text"},it={class:"memo_date"},at={class:"memo_title"},nt=et(()=>i("div",{class:"memo_more"},"더 알아보기 >",-1));function dt(t,s,e,c,m,n){return o(),a("div",st,[i("div",ot,[i("div",it,p(t.$dayjs(e.memo.create_date).format("YYYY.MM.DD")),1),i("div",at,p(e.memo.title),1),nt])])}const rt=l(tt,[["render",dt],["__scopeId","data-v-bf9d473b"]]);const ct={name:"BoardDiary",props:{diary:{type:Object,required:!0,default:()=>{}}},methods:{showDetail(){console.log("cliclk>>",this.diary),console.log(`type: ${this.diary.content_type} id: ${this.diary.id}`),this.$router.push(`/diary/${this.diary.id}?type=${this.diary.content_type}`)}}},_t=["src"];function lt(t,s,e,c,m,n){return o(),a("div",{class:"item_board_diary",onClick:s[0]||(s[0]=(...d)=>n.showDetail&&n.showDetail(...d))},[i("img",{src:e.diary.image_url},null,8,_t)])}const mt=l(ct,[["render",lt],["__scopeId","data-v-687f6b6b"]]);const yt={name:"BoardItems",components:{BoardMemo:rt,BoardDiary:mt},props:{list:{type:Array,required:!0,default:[]}}},ut={class:"board-items"};function pt(t,s,e,c,m,n){const d=y("BoardMemo"),_=y("BoardDiary");return o(),a("div",ut,[(o(!0),a(f,null,g(e.list,(r,h)=>(o(),a("div",{key:h,class:"item"},[r.content_type===3?(o(),u(d,{key:0,memo:r},null,8,["memo"])):(o(),u(_,{key:1,diary:r},null,8,["diary"]))]))),128))])}const ht=l(yt,[["render",pt],["__scopeId","data-v-5cf9610b"]]),b=B("gallery",{state:()=>({pageNo:1,type:0,totalCounts:0,mode:0,list:[],data:{}}),actions:{async getGalleryList(){const{getGalleryList:t}=Y();console.log(`getGalleryList(${this.pageNo}/${this.type})`);const s=await t(this.type,this.pageNo);if(console.log(s),!s.success){const e=`${s.status_code}  - ${s.message}`;console.log("Error! > ",e,s),alert(e);return}this.data=s.data,this.pageNo+=1,this.computeTotalCounts(),this.dataToList()},dataToList(){let t=[];this.type===0?t=[...this.data.MorningDiary.map(e=>({...e,content_type:1})),...this.data.NightDiary.map(e=>({...e,content_type:2})),...this.data.Memo.map(e=>({...e,content_type:3}))]:this.type===1?t=[...this.data.MorningDiary.map(e=>({...e,content_type:1}))]:this.type===2?t=[...this.data.NightDiary.map(e=>({...e,content_type:2}))]:t=[...this.data.Memo.map(e=>({...e,content_type:3}))],t=[...t,...this.list];const s=t.sort((e,c)=>c.create_date.localeCompare(e.create_date));console.log(">> ",s),this.list=s},computeTotalCounts(){this.type===0?this.totalCounts=Number(this.data.Memo_count)+Number(this.data.MorningDiary_count)+Number(this.data.NightDiary_count):this.type===1?this.totalCounts=Number(this.data.MorningDiary_count):this.type===2?this.totalCounts=Number(this.data.NightDiary_count):this.totalCounts=Number(this.data.Memo_count)},setType(t){this.type=t},changeMode(){this.mode=(this.mode+1)%2},reset(){this.pageNo=1,this.totalCounts=0,this.list=[],this.data={}}}});const ft={props:{tags:{type:Array,required:!0},selected:{type:Number,required:!1,default:0}},data(){return{}},methods:{onClick(t){this.$emit("select",t)}}},gt={class:"tags"},$t=["onClick"];function vt(t,s,e,c,m,n){return o(),a("div",gt,[(o(!0),a(f,null,g(e.tags,(d,_)=>(o(),a("div",{class:M(["tag",{selected:_===e.selected}]),key:_,onClick:r=>n.onClick(_)},p(d),11,$t))),128))])}const Dt=l(ft,[["render",vt],["__scopeId","data-v-dafd0930"]]);const bt={name:"Gallery",setup(){},components:{ListDiary:L,ListMemo:k,InfiniteLoading:S,Tags:Dt},data(){return{}},watch:{type(){console.log("New type -> ",this.type),this.reset(),this.getGalleryList()}},computed:{...w(b,["type","mode","list","totalCounts","data"])},async mounted(){const{SERVER_MODE:t}=G().public;console.log(t),window.localStorage.setItem("accessToken","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdHJpbmciLCJleHAiOjIwNTM1NDcxNzZ9.Dqf6UOvR-OlKY6cVMjoN0AJ25stW8ojdSy2GZ5dyHlc"),await this.getGalleryList()},methods:{...x(b,["setType","changeMode","getGalleryList","reset"]),loadMore(){this.list.length<this.totalCounts&&(this.getGalleryList(),console.log("loadMore"))}}},Mt={class:"header"},Lt={class:"contents"};function kt(t,s,e,c,m,n){var $;const d=y("Tags"),_=y("v-icon"),r=P,h=ht,I=y("infinite-loading");return o(),a(f,null,[i("div",Mt,[D(d,{tags:["ALL","Dream","Diary","Memo"],onSelect:s[0]||(s[0]=v=>t.setType(v)),selected:t.type},null,8,["selected"]),D(_,{class:M(t.mode===0?"ic_list":"ic_board"),onClick:s[1]||(s[1]=v=>t.changeMode())},null,8,["class"])]),i("div",Lt,[t.mode===0?(o(),u(r,{key:0,list:t.list},null,8,["list"])):(o(),u(h,{key:1,list:t.list},null,8,["list"])),($=t.list)!=null&&$.length?(o(),u(I,{key:2,"first-load":!1,distance:1e3,top:!0,onInfinite:n.loadMore},null,8,["onInfinite"])):T("",!0)])],64)}const wt=l(bt,[["render",kt],["__scopeId","data-v-d846b45f"]]);export{wt as default};
