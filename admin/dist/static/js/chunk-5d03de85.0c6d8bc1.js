(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5d03de85"],{4821:function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[t.id>0?r("p",{staticClass:"menu_name"},[t._v("更新")]):r("p",{staticClass:"menu_name"},[t._v("添加")]),r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:t.ruleForm,"status-icon":"",rules:t.rules,"label-width":"100px"}},[r("el-form-item",{staticStyle:{width:"600px"},attrs:{label:"账号",prop:"account"}},[r("el-input",{attrs:{type:"text"},model:{value:t.ruleForm.account,callback:function(e){t.$set(t.ruleForm,"account",e)},expression:"ruleForm.account"}})],1),t.id?t._e():r("el-form-item",{staticStyle:{width:"600px"},attrs:{label:"密码",prop:"password"}},[r("el-input",{attrs:{type:"password"},model:{value:t.ruleForm.password,callback:function(e){t.$set(t.ruleForm,"password",e)},expression:"ruleForm.password"}})],1),r("el-form-item",{staticStyle:{width:"600px"},attrs:{label:"名称",prop:"name"}},[r("el-input",{attrs:{type:"text"},model:{value:t.ruleForm.name,callback:function(e){t.$set(t.ruleForm,"name",e)},expression:"ruleForm.name"}})],1),r("el-form-item",{staticStyle:{width:"400px"},attrs:{label:"头像",prop:"headimg"}},[r("el-upload",{staticClass:"avatar-uploader",attrs:{action:"/api/admin/uploads",data:t.uploadData,headers:t.uploadHeader,"show-file-list":!1,"on-success":t.handleAvatarSuccess}},[t.ruleForm.headimg?r("img",{staticClass:"avatar",attrs:{src:t.ruleForm.headimg}}):r("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),r("el-form-item",{staticStyle:{width:"400px"},attrs:{label:"角色",prop:"role_id"}},[r("el-select",{attrs:{placeholder:"请选择"},model:{value:t.ruleForm.role_id,callback:function(e){t.$set(t.ruleForm,"role_id",e)},expression:"ruleForm.role_id"}},t._l(t.roles,(function(t){return r("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})),1)],1),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.submitForm("ruleForm")}}},[t._v("提交")])],1)],1)],1)},n=[],o=(r("d3b7"),r("ce2a")),u=r("cc5e"),i=(r("91b6"),r("5f87")),l={components:{},data:function(){return{id:this.$route.query.id,roles:[],ruleForm:{headimg:""},uploadData:{type:"admin_user_headimg"},uploadHeader:{Authorization:"Bearer "+Object(i["a"])()},rules:{name:[{required:!0,trigger:"blur",message:"请填写名称！"}],account:[{required:!0,trigger:"blur",message:"请填写账号！"}],password:[{required:!0,trigger:"blur",message:"请填写密码！"}],role_id:[{required:!0,trigger:"blur",message:"请选择角色！"}]}}},computed:{},mounted:function(){var t=this;t.id>0&&t.getData(),t.getRoles()},methods:{getRoles:function(){var t=this,e={is_all:1};return new Promise((function(r,a){Object(u["d"])(e).then((function(e){t.roles=e.data,r()})).catch((function(t){a(t)}))}))},handleAvatarSuccess:function(t,e,r){this.ruleForm.headimg=t.data.path},getData:function(){var t=this,e={};return new Promise((function(r,a){Object(o["c"])(t.id,e).then((function(e){t.ruleForm=e.data,r()})).catch((function(t){a(t)}))}))},submitForm:function(){var t=this,e={};return e=t.ruleForm,e.token=Object(i["a"])(),new Promise((function(r,a){t.id>0?Object(o["h"])(t.id,e).then((function(e){r(),t.$router.push({path:"/admin/user/lists"})})).catch((function(t){a(t)})):Object(o["a"])(e).then((function(e){r(),t.$router.push({path:"/admin/user/lists"})})).catch((function(t){a(t)}))}))}}},s=l,c=(r("fab64"),r("2877")),d=Object(c["a"])(s,a,n,!1,null,null,null);e["default"]=d.exports},"73b0":function(t,e,r){},"91b6":function(t,e,r){"use strict";r.d(e,"a",(function(){return n}));var a=r("b775");function n(t){return Object(a["a"])({url:"/admin/upload/base64",method:"post",data:t})}},cc5e:function(t,e,r){"use strict";r.d(e,"d",(function(){return n})),r.d(e,"c",(function(){return o})),r.d(e,"a",(function(){return u})),r.d(e,"e",(function(){return i})),r.d(e,"b",(function(){return l}));var a=r("b775");function n(t){return Object(a["a"])({url:"/admin/roles",method:"get",params:t})}function o(t){return Object(a["a"])({url:"/admin/roles/".concat(t),method:"get"})}function u(t){return Object(a["a"])({url:"/admin/roles",method:"post",data:t})}function i(t,e){return Object(a["a"])({url:"/admin/roles/".concat(t),method:"put",data:e})}function l(t){return Object(a["a"])({url:"/admin/roles/".concat(t),method:"delete"})}},fab64:function(t,e,r){"use strict";r("73b0")}}]);