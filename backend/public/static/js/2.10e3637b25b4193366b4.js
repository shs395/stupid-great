webpackJsonp([2],{"4GcI":function(e,t,a){"use strict";var s={extends:a("UlOv").a,mounted:function(){this.renderChart({labels:["수입 평균","월급","부수입","용돈","상여","금융소득","기타"],datasets:[{label:"다른 사람들",backgroundColor:"#f87979",data:[20,21,22,21,21,21,21]},{label:"나",backgroundColor:"#f879798",data:[21,21,22,21,22,22,22]}],xAxisID:"hi"},{scales:{yAxes:[{ticks:{beginAtZero:!0}}]},responsive:!0,maintainAspectRatio:!1})}};var l=a("VU/8")(s,null,!1,function(e){a("PEvh")},null,null);t.a=l.exports},BGpp:function(e,t,a){"use strict";var s={extends:a("UlOv").a,mounted:function(){this.renderChart({labels:["지출 평균","식비","교통/차량","문화생활","마트/편의점","패션/미용","생활용품","주거/통신","건강","교육","경조사/회비","가족","기타"],datasets:[{label:"다른 사람들",backgroundColor:"#f87979",data:[20,21,22,21,21,21,21,21,21,21,21,21,21]},{label:"나",backgroundColor:"#f879798",data:[21,21,22,21,22,22,22,22,22,22,22,22,22]}],xAxisID:"hi"},{scales:{yAxes:[{ticks:{beginAtZero:!0}}]},responsive:!0,maintainAspectRatio:!1})}};var l=a("VU/8")(s,null,!1,function(e){a("p3PF")},null,null);t.a=l.exports},"Hq5/":function(e,t){},LxFu:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("9TXF"),l=a("704v"),n=a("4GcI"),c=a("BGpp"),o={name:"stats",components:{toolbar:s.a,StatsChart:l.a,StatsChart2:n.a,StatsChart3:c.a},data:function(){return{age:[],job:[],sex:[],years:["2018","2017","2016","2015","2014","2013","2012","2011","2010","2009","2008","2007","2006","2005","2004","2003","2002","2001","2000"],months:["1","2","3","4","5","6","7","8","9","10","11","12"],selectedYear:"",selectedMonth:"",ageList:["10대","20대","30대","40대","50대 이상"],jobList:["백수","중학생","고등학생","대학생","직장인","전업주부"],sexList:["남자","여자"],selectedAge:[],selectedJob:[],selectedSex:[],tabList:[{name:"수입 / 지출",num:1},{name:"지출",num:2},{name:"수입",num:3}]}},methods:{changeToOne:function(){this.a=1},changeToTwo:function(){this.a=2},changeToThree:function(){this.a=3}}},r={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("toolbar"),e._v(" "),a("v-container",{attrs:{fluid:""}},[a("v-layout",{attrs:{column:""}},[a("v-flex",[a("v-card",[a("v-card-text",[a("v-tabs",[a("v-tab",[e._v("\n                수입/지출\n              ")]),e._v(" "),a("v-tab",[e._v("\n                수입\n              ")]),e._v(" "),a("v-tab",[e._v("\n                지출\n              ")]),e._v(" "),a("v-tab-item",{attrs:{lazy:"true"}},[a("StatsChart")],1),e._v(" "),a("v-tab-item",{attrs:{lazy:"true"}},[a("StatsChart2")],1),e._v(" "),a("v-tab-item",{attrs:{lazy:"true"}},[a("StatsChart3")],1)],1)],1)],1)],1),e._v(" "),a("v-flex",[a("v-card",[a("v-card-text",[e._v(" \n            나와 다른 사람의 가계부 평균 비교해보기 \n            "),a("v-layout",{attrs:{row:""}},[a("v-flex",[a("v-select",{attrs:{items:e.sexList,label:"성별",multiple:""},model:{value:e.selectedSex,callback:function(t){e.selectedSex=t},expression:"selectedSex"}})],1),e._v(" "),a("v-flex",[a("v-select",{attrs:{items:e.jobList,label:"직업",multiple:""},model:{value:e.selectedJob,callback:function(t){e.selectedJob=t},expression:"selectedJob"}})],1),e._v(" "),a("v-flex",[a("v-select",{attrs:{items:e.ageList,label:"성별",multiple:""},model:{value:e.selectedAge,callback:function(t){e.selectedAge=t},expression:"selectedAge"}})],1),e._v(" "),a("v-flex",[a("v-select",{attrs:{items:e.years,label:"년"},model:{value:e.selectedYear,callback:function(t){e.selectedYear=t},expression:"selectedYear"}})],1),e._v(" "),a("v-flex",[a("v-select",{attrs:{items:e.months,label:"월"},model:{value:e.selectedMonth,callback:function(t){e.selectedMonth=t},expression:"selectedMonth"}})],1),e._v(" "),a("v-flex",[a("v-btn",[e._v("검색")])],1)],1)],1)],1)],1)],1)],1)],1)},staticRenderFns:[]};var i=a("VU/8")(o,r,!1,function(e){a("Hq5/")},null,null);t.default=i.exports},PEvh:function(e,t){},p3PF:function(e,t){}});
//# sourceMappingURL=2.10e3637b25b4193366b4.js.map