import{_ as a,k as t,l,B as d,t as o,m as u,M as _,N as f}from"./entry.41df9e10.js";const p={props:{options:{type:Array,required:!0},default:{type:String,required:!1,default:null},tabindex:{type:Number,required:!1,default:0},disabled:{type:Boolean,required:!1,default:!1}},data(){return{selected:this.default?this.default:this.options.length>0?this.options[0]:null,open:!1}},mounted(){this.$emit("input",this.selected)}},m=["tabindex"],v={key:1,class:"disabled"},y=["onClick"];function b(r,n,i,k,e,x){return t(),l("div",{class:"custom-select",tabindex:i.tabindex,onBlur:n[1]||(n[1]=s=>e.open=!1)},[i.disabled?(t(),l("div",v,o(e.selected),1)):(t(),l("div",{key:0,class:d(["selected",{open:e.open,disabled:i.disabled}]),onClick:n[0]||(n[0]=s=>e.open=!e.open)},o(e.selected),3)),u("div",{class:d(["items",{selectHide:!e.open}])},[(t(!0),l(_,null,f(i.options,(s,c)=>(t(),l("div",{key:c,onClick:h=>{e.selected=s,e.open=!1,r.$emit("input",s)},class:d(["item",{selected:e.selected===s}])},o(s),11,y))),128))],2)],40,m)}const g=a(p,[["render",b],["__scopeId","data-v-8fdf319c"]]);export{g as _};