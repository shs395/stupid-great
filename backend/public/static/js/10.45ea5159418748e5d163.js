webpackJsonp([10],{DQmJ:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o={name:"boardwrite",components:{toolbar:a("9TXF").a},data:function(){return{id:"",title:"",body:"",date:(new Date).toISOString().substr(0,7),menu:!1,modal:!1}},methods:{savepost:function(){var t={id:this.$session.get("id"),title:this.title,body:this.body,date:this.date};this.title="",this.body="",this.axios.post("/board/post",t).then(function(t){console.log(t.data)}).catch(function(t){return console.log(t)})}}},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("toolbar"),t._v(" "),a("v-container",{attrs:{fluid:"","text-xs-center":""}},[a("v-card",[a("v-card-title",[t._v("게시글 작성")]),t._v(" "),a("v-layout",{attrs:{row:""}},[a("v-flex",{attrs:{xs4:"","px-3":""}},[a("v-text-field",{attrs:{"background-color":"white",name:"title",box:"",label:"Title"},model:{value:t.title,callback:function(e){t.title=e},expression:"title"}})],1),t._v(" "),a("v-flex",{attrs:{xs4:"","px-3":""}},[a("v-menu",{ref:"menu",attrs:{"close-on-content-click":!1,"nudge-right":40,"return-value":t.date,lazy:"",transition:"scale-transition","offset-y":"","full-width":"","max-width":"290px","min-width":"290px"},on:{"update:returnValue":function(e){t.date=e}},model:{value:t.menu,callback:function(e){t.menu=e},expression:"menu"}},[a("v-text-field",{attrs:{slot:"activator",label:"Select Year & Month","prepend-icon":"event",readonly:""},slot:"activator",model:{value:t.date,callback:function(e){t.date=e},expression:"date"}}),t._v(" "),a("v-date-picker",{attrs:{type:"month","no-title":"",scrollable:""},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}},[a("v-spacer"),t._v(" "),a("v-btn",{attrs:{flat:"",color:"primary"},on:{click:function(e){t.menu=!1}}},[t._v("Cancel")]),t._v(" "),a("v-btn",{attrs:{flat:"",color:"primary"},on:{click:function(e){t.$refs.menu.save(t.date)}}},[t._v("OK")])],1)],1)],1),t._v(" "),a("v-spacer"),t._v(" "),a("v-flex",{attrs:{"px-3":""}},[a("v-card-actions",[a("v-btn",{attrs:{flat:"",color:"orange"}},[a("v-icon",[t._v("edit")]),t._v("저장된 가계부 불러오기")],1)],1)],1)],1),t._v(" "),a("v-flex",{attrs:{"pa-3":"","d-flex":""}},[a("v-textarea",{attrs:{name:"body","background-color":"white",box:"",label:"Comment"},model:{value:t.body,callback:function(e){t.body=e},expression:"body"}})],1),t._v(" "),a("v-card-actions",[a("v-btn",{attrs:{flat:"",color:"orange"},on:{click:t.savepost}},[t._v("POST")])],1)],1)],1),t._v(" "),a("p",[t._v(t._s(t.date))])],1)},staticRenderFns:[]};var l=a("VU/8")(o,n,!1,function(t){a("hMwZ")},null,null);e.default=l.exports},hMwZ:function(t,e){}});
//# sourceMappingURL=10.45ea5159418748e5d163.js.map