import{U as t}from"./entry.c61ee406.js";const n=()=>({async getMorningdiary(a){return(await t.get(`/diary/morning/read?diary_id=${a}`)).data},async getNightdiary(a){return(await t.get(`/diary/night/read?diary_id=${a}`)).data},async getMemo(a){return(await t.get(`/diary/memo/read?memo_id=${a}`)).data},async getGalleryList(a,r){return(await t.post("/diary/list",{diary_type:a,page:r})).data},async getCalendarList(a,r){return(await t.post("/diary/list/calender",{year:a,month:r})).data},async getCalendar(a,r,e){return(await t.post("/diary/list/calender",{year:a,month:r,day:e})).data}});export{n as u};
