webpackJsonp([2],{FeBl:function(e,r){var s=e.exports={version:"2.5.7"};"number"==typeof __e&&(__e=s)},bpb8:function(e,r){},mvHQ:function(e,r,s){e.exports={default:s("qkKv"),__esModule:!0}},qkKv:function(e,r,s){var t=s("FeBl"),i=t.JSON||(t.JSON={stringify:JSON.stringify});e.exports=function(e){return i.stringify.apply(i,arguments)}},viRm:function(e,r,s){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var t=s("mvHQ"),i=s.n(t),n={name:"signin",components:{LinkFooter:s("dN2l").a},data:function(){var e=this;return{show1:!1,show2:!1,show3:!1,signupForm:!1,id:"",password:"",confirm:"",show:!0,user:{usersex:"",userage:"",userjob:"",useremail:"",userid:"",userpw:""},rules:{required:function(e){return!!e||"최소 6자리 이상으로 설정해 주세요"},min:function(e){return e.length>=6||"최소 6자리 이상으로 설정해 주세요"},confirmEqual:function(r){return e.user.userpw==e.confirm||"입력한 비밀번호와 일치하지 않습니다"}},emailRules:[function(e){return!!e||"이메일을 입력해 주세요"},function(e){return/.+@.+/.test(e)||"이메일을 정확히 입력해 주세요"}]}},methods:{submit:function(){if(this.$refs.form.validate())return alert(i()(this.user)),location.href="/signin"},reset:function(){return this.$refs.form.reset()}}},a={render:function(){var e=this,r=e.$createElement,s=e._self._c||r;return s("div",{attrs:{id:"signin-bg"}},[s("v-form",{attrs:{id:"signin"}},[s("h1",{attrs:{id:"title"}},[e._v("Stupit? Great!")]),e._v(" "),s("v-container",{attrs:{fluid:""}},[s("v-flex",{attrs:{xs12:"",sm12:""}},[s("v-text-field",{attrs:{name:"id",label:"ID",outline:""},model:{value:e.id,callback:function(r){e.id=r},expression:"id"}})],1),e._v(" "),s("v-flex",{attrs:{xs12:"",sm12:""}},[s("v-text-field",{attrs:{"append-icon":e.show1?"visibility_off":"visibility",type:e.show1?"text":"password",name:"password",label:"Password",outline:""},on:{"click:append":function(r){e.show1=!e.show1}},model:{value:e.password,callback:function(r){e.password=r},expression:"password"}})],1),e._v(" "),s("div",{attrs:{id:"signbtn"}},[s("v-btn",{attrs:{color:"primary",large:""}},[e._v("로그인")]),e._v(" "),s("v-dialog",{attrs:{persistent:"","max-width":"600px"},model:{value:e.signupForm,callback:function(r){e.signupForm=r},expression:"signupForm"}},[s("v-btn",{attrs:{slot:"activator",color:"success",large:""},slot:"activator"},[e._v("회원가입")]),e._v(" "),s("v-card",[s("v-form",{ref:"form"},[s("v-card-title",[s("span",{staticClass:"headline"},[e._v("회원 가입")])]),e._v(" "),s("v-card-text",[s("v-container",{attrs:{"grid-list-md":""}},[s("v-layout",{attrs:{wrap:""}},[s("v-flex",{attrs:{xs12:"",sm4:""}},[s("v-radio-group",{attrs:{row:"",rules:[function(e){return!!e||"성별을 선택해 주세요"}],required:""},model:{value:e.user.usersex,callback:function(r){e.$set(e.user,"usersex",r)},expression:"user.usersex"}},[s("v-radio",{attrs:{label:"남성",color:"primary",value:"male"}}),e._v(" "),s("v-radio",{attrs:{label:"여성",color:"red",value:"female"}})],1)],1),e._v(" "),s("v-flex",{attrs:{xs12:"",sm4:""}},[s("v-text-field",{attrs:{label:"나이",type:"number",min:"14",rules:[function(e){return!!e||"나이를 입력해 주세요"}],required:""},model:{value:e.user.userage,callback:function(r){e.$set(e.user,"userage",r)},expression:"user.userage"}})],1),e._v(" "),s("v-flex",{attrs:{xs12:"",sm4:""}},[s("v-autocomplete",{attrs:{items:["직장인","전업주부","대학생","고등학생","중학생","백수"],label:"직업",rules:[function(e){return!!e||"직업을 선택해 주세요"}],required:""},model:{value:e.userjob,callback:function(r){e.userjob=r},expression:"userjob"}})],1),e._v(" "),s("v-flex",{attrs:{xs12:""}},[s("v-text-field",{attrs:{label:"이메일",type:"email",rules:e.emailRules,required:""},model:{value:e.user.useremail,callback:function(r){e.$set(e.user,"useremail",r)},expression:"user.useremail"}})],1),e._v(" "),s("v-flex",{attrs:{xs12:""}},[s("v-text-field",{attrs:{label:"아이디",rules:[function(e){return!!e||"아이디를 입력해 주세요"}],required:""},model:{value:e.user.userid,callback:function(r){e.$set(e.user,"userid",r)},expression:"user.userid"}})],1),e._v(" "),s("v-flex",{attrs:{xs12:""}},[s("v-text-field",{attrs:{label:"비밀번호","append-icon":e.show2?"visibility_off":"visibility",type:e.show2?"text":"password",rules:[e.rules.required,e.rules.min],required:""},on:{"click:append":function(r){e.show2=!e.show2}},model:{value:e.user.userpw,callback:function(r){e.$set(e.user,"userpw",r)},expression:"user.userpw"}})],1),e._v(" "),s("v-flex",{attrs:{xs12:""}},[s("v-text-field",{attrs:{label:"비밀번호 확인","append-icon":e.show3?"visibility_off":"visibility",type:e.show3?"text":"password",rules:[e.rules.confirmEqual],required:""},on:{"click:append":function(r){e.show3=!e.show3}},model:{value:e.confirm,callback:function(r){e.confirm=r},expression:"confirm"}})],1)],1)],1)],1),e._v(" "),s("v-card-actions",[s("v-btn",{attrs:{color:"blue darken-1",flat:""},on:{click:function(r){e.signupForm=!1}}},[e._v("닫기")]),e._v(" "),s("v-spacer"),e._v(" "),s("v-btn",{attrs:{color:"blue darken-1",flat:""},on:{click:e.reset}},[e._v("초기화")]),e._v(" "),s("v-btn",{attrs:{color:"blue darken-1",flat:""},on:{click:e.submit}},[e._v("회원가입")])],1)],1)],1)],1)],1)],1)],1),e._v(" "),s("LinkFooter")],1)},staticRenderFns:[]};var o=s("VU/8")(n,a,!1,function(e){s("bpb8")},null,null);r.default=o.exports}});
//# sourceMappingURL=2.9f10eaa55d4446eb077c.js.map