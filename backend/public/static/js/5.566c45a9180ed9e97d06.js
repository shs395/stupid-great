webpackJsonp([5],{"5J0k":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("9TXF"),i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",[a("v-card-title",[t._v("Search\r\n            "),a("v-spacer"),t._v(" "),a("v-text-field",{attrs:{label:"제목 & 작성자","single-line":"","hide-details":""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1),t._v(" "),a("v-card-text",[a("v-data-table",{attrs:{"hide-actions":"",headers:t.headers,items:t.body,search:t.search},scopedSlots:t._u([{key:"items",fn:function(e){return[a("td",{staticClass:"text-xs-left"},[t._v(t._s(e.item.title))]),t._v(" "),a("td",{staticClass:"text-xs-left"},[t._v(t._s(e.item.writer))]),t._v(" "),a("td",{staticClass:"text-xs-left"},[t._v(t._s(e.item.date))])]}}])},[a("v-alert",{attrs:{slot:"no-results",value:!0,color:"error",icon:"warning"},slot:"no-results"},[t._v('\r\n                             "'+t._s(t.search)+'" no result.\r\n                        ')])],1),t._v(" "),a("v-card-text",{staticClass:"text-xs-center"},[a("v-pagination",{attrs:{length:t.pagination.total,"total-visible":t.pagination.visible},model:{value:t.pagination.page,callback:function(e){t.$set(t.pagination,"page",e)},expression:"pagination.page"}})],1)],1)],1)},staticRenderFns:[]};var n=a("VU/8")({name:"EvaluationBoard",data:function(){return{search:"",pagination:{page:1,total:5,visible:7},headers:[{text:"제목",align:"left",sortable:!1,value:"title"},{text:"작성자",value:"writer"},{text:"작성일",value:"date"}],body:[{value:!1,title:"서강준의 가계부",writer:"서강준",date:"2018/11/11"},{value:!1,title:"강동원의 가계부",writer:"강동원",date:"2018/11/10"},{value:!1,title:"아이린의 가계부",writer:"아이린",date:"2018/11/19"},{value:!1,title:"맥도날드의 가계부",writer:"맥도날드",date:"2018/11/07"},{value:!1,title:"아이유의 가계부",writer:"아이유",date:"2018/10/31"},{value:!1,title:"박재범의 가계부",writer:"박재범",date:"2018/11/01"}]}}},i,!1,function(t){a("uKtF")},null,null).exports,s={name:"Evaluation",components:{toolbar:r.a,EvaluationBoard:n},data:function(){}},l={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("toolbar"),this._v(" "),e("v-container",{attrs:{fluid:""}},[e("v-card",[e("v-card-title",[this._v("가계부 게시판\n                    "),e("v-spacer"),this._v(" "),e("v-btn",{attrs:{fab:"",right:""}},[this._v("post")])],1),this._v(" "),e("v-card-text",[e("evaluation-board")],1)],1)],1)],1)},staticRenderFns:[]};var o=a("VU/8")(s,l,!1,function(t){a("srbf")},null,null);e.default=o.exports},srbf:function(t,e){},uKtF:function(t,e){}});
//# sourceMappingURL=5.566c45a9180ed9e97d06.js.map