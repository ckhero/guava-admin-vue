(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-d1ea"],{"032E":function(t,e,a){},"41Br":function(t,e,a){"use strict";var s=a("6/0E");a.n(s).a},"6/0E":function(t,e,a){},HKPr:function(t,e,a){"use strict";var s=a("YPLS");a.n(s).a},Mz3J:function(t,e,a){"use strict";Math.easeInOutQuad=function(t,e,a,s){return(t/=s/2)<1?a/2*t*t+e:-a/2*(--t*(t-2)-1)+e};var s=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)};function n(t,e,a){var n=document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop,i=t-n,l=0;e=void 0===e?500:e;!function t(){l+=20,function(t){document.documentElement.scrollTop=t,document.body.parentNode.scrollTop=t,document.body.scrollTop=t}(Math.easeInOutQuad(l,n,i,e)),l<e?s(t):a&&"function"==typeof a&&a()}()}var i={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(t){this.$emit("update:page",t)}},pageSize:{get:function(){return this.limit},set:function(t){this.$emit("update:limit",t)}}},methods:{handleSizeChange:function(t){this.$emit("pagination",{page:this.currentPage,limit:t}),this.autoScroll&&n(0,800)},handleCurrentChange:function(t){this.$emit("pagination",{page:t,limit:this.pageSize}),this.autoScroll&&n(0,800)}}},l=(a("HKPr"),a("KHd+")),o=Object(l.a)(i,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"pagination-container",class:{hidden:t.hidden}},[a("el-pagination",t._b({attrs:{background:t.background,"current-page":t.currentPage,"page-size":t.pageSize,layout:t.layout,"page-sizes":t.pageSizes,total:t.total},on:{"update:currentPage":function(e){t.currentPage=e},"update:pageSize":function(e){t.pageSize=e},"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}},"el-pagination",t.$attrs,!1))],1)},[],!1,null,"cebf2f0c",null);o.options.__file="index.vue";e.a=o.exports},YPLS:function(t,e,a){},ZySA:function(t,e,a){"use strict";var s=a("P2sY"),n=a.n(s),i=(a("jUE0"),{bind:function(t,e){t.addEventListener("click",function(a){var s=n()({},e.value),i=n()({ele:t,type:"hit",color:"rgba(0, 0, 0, 0.15)"},s),l=i.ele;if(l){l.style.position="relative",l.style.overflow="hidden";var o=l.getBoundingClientRect(),r=l.querySelector(".waves-ripple");switch(r?r.className="waves-ripple":((r=document.createElement("span")).className="waves-ripple",r.style.height=r.style.width=Math.max(o.width,o.height)+"px",l.appendChild(r)),i.type){case"center":r.style.top=o.height/2-r.offsetHeight/2+"px",r.style.left=o.width/2-r.offsetWidth/2+"px";break;default:r.style.top=(a.pageY-o.top-r.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",r.style.left=(a.pageX-o.left-r.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return r.style.backgroundColor=i.color,r.className="waves-ripple z-active",!1}},!1)}}),l=function(t){t.directive("waves",i)};window.Vue&&(window.waves=i,Vue.use(l)),i.install=l;e.a=i},jUE0:function(t,e,a){},nNcJ:function(t,e,a){"use strict";var s=a("032E");a.n(s).a},"saV/":function(t,e,a){"use strict";a.r(e);var s=a("P2sY"),n=a.n(s),i=a("t3Un");var l=a("ZySA"),o=a("Mz3J"),r={name:"GuavaUpload",props:{image_url:{type:String,default:function(){return""}}},data:function(){return{imageUrlData:""}},watch:{image_url:function(){this.imageUrlData=this.image_url}},mounted:function(){this.imageUrlData=this.image_url},methods:{handleAvatarSuccess:function(t,e){console.log(t),this.imageUrlData=t[0],this.$emit("update:image_url",t[0])},beforeAvatarUpload:function(t){var e=t.size/1024/1024<2;return e||this.$message.error("上传头像图片大小不能超过 2MB!"),e}}},u=(a("41Br"),a("KHd+")),p=Object(u.a)(r,function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("el-upload",{staticClass:"avatar-uploader",attrs:{"show-file-list":!1,"on-success":this.handleAvatarSuccess,"before-upload":this.beforeAvatarUpload,action:"http://www.goodexam.com.cn/v1/upload/save",name:"imageFiles[]"}},[this.imageUrlData?e("img",{staticClass:"avatar",attrs:{src:this.imageUrlData}}):e("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1)},[],!1,null,null,null);p.options.__file="index.vue";var c=p.exports,d={name:"Datum",components:{GuavaUpload:c},props:{datum:{type:Object,default:function(){return[]}},type:{type:String,default:function(){return"default"}}},data:function(){return{show:!1,datumData:{},datumType:"default"}},watch:{datum:function(){console.log(222),this.datumData=this.datum,this.datumType=this.type},datumData:function(){console.log(this.datumData)}},mounted:function(){this.datumData=this.datum,this.datumType=this.type}},m=(a("nNcJ"),Object(u.a)(d,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-form-item",{attrs:{label:"资料名字"}},[a("el-input",{attrs:{placeholder:"请输入资料名字"},model:{value:t.datumData.datum_name,callback:function(e){t.$set(t.datumData,"datum_name",e)},expression:"datumData.datum_name"}})],1),t._v(" "),"img"===t.datumData.datum_detail_type&&"lesson"===t.datumType?a("el-form-item",{attrs:{label:"资料图片"}},[a("guavaUpload",{attrs:{image_url:t.datumData.datum_detail},on:{"update:image_url":function(e){t.$set(t.datumData,"datum_detail",e)}}})],1):t._e(),t._v(" "),"img"!==t.datumData.datum_detail_type||"lesson"!==t.datumType?a("el-form-item",{attrs:{label:"资料内容"}},[a("el-input",{attrs:{placeholder:"请输输入资料内容"},model:{value:t.datumData.datum_detail,callback:function(e){t.$set(t.datumData,"datum_detail",e)},expression:"datumData.datum_detail"}})],1):t._e()],1)},[],!1,null,"27172955",null));m.options.__file="index.vue";var _=m.exports,f=[{key:"english",display_name:"英语"},{key:"math",display_name:"数学"},{key:"logic",display_name:"逻辑"}],g=f.reduce(function(t,e){return t[e.key]=e.display_name,t},{}),h={name:"ComplexTable",components:{Pagination:o.a,Datum:_,GuavaUpload:c},directives:{waves:l.a},filters:{statusFilter:function(t){return{english:"success",math:"info",logic:"danger"}[t]},typeFilter:function(t){return g[t]},sortFilter:function(t){var e=["","一","二","三","四","五","六","七","八","九"],a=["","十","百","千","万"];t=parseInt(t);var s=function(t){for(var s=t.toString().split("").reverse(),n="",i=0;i<s.length;i++)n=(0===i&&0===s[i]?"":i>0&&0===s[i]&&0===s[i-1]?"":e[s[i]]+(0===s[i]?a[0]:a[i]))+n;return t>=10&&t<20&&(n=n.substring(1)),n},n=Math.floor(t/1e4),i=t%1e4;return i.toString().length<4&&(i="0"+i),n?"第"+s(n)+"万"+s(i)+"天":"第"+s(t)+"天"}},data:function(){return{list:null,total:0,listLoading:!0,listQuery:{page:1,limit:20,lesson_type:null,lesson_name:null},lessonTypeOptions:f,lessonQuestions:{},datumType:"lesson",activeNames:["1"],activeName:"lessonInfo",importanceOptions:[1,2,3],radio:"text",options:[{label:"text",value:"文字"},{label:"img",value:"图片"}],showReviewer:!1,temp:{lesson_id:null,lesson_type:null,lesson_name:null,datum:{},lesson_sort:0,questions:[],id:void 0,importance:1,remark:"",timestamp:new Date,title:"",type:"",status:"published"},dialogFormVisible:!1,dialogStatus:"",textMap:{update:"编辑课程",create:"新增课程"},dialogPvVisible:!1,pvData:[],rules:{type:[{required:!0,message:"type is required",trigger:"change"}],timestamp:[{type:"date",required:!0,message:"timestamp is required",trigger:"change"}],title:[{required:!0,message:"title is required",trigger:"blur"}]},downloadLoading:!1}},created:function(){this.getList()},methods:{getList:function(){var t=this;this.listLoading=!0,this.api.v1.lesson.list(this.listQuery).then(function(e){t.total=e.data.total,t.list=e.data.list}),this.listLoading=!1},handleFilter:function(){this.listQuery.page=1,this.getList()},resetTemp:function(){this.activeName="lessonInfo",this.temp={lesson_id:null,lesson_type:null,lesson_name:null,lesson_sort:0,datum:{datum_detail_type:"img",datum_detail:""},questions:[]}},handleCreate:function(){var t=this;this.resetTemp(),this.dialogStatus="create",this.dialogFormVisible=!0,this.$nextTick(function(){t.$refs.dataForm.clearValidate()})},createData:function(){var t=this;this.$refs.dataForm.validate(function(e){e&&(t.temp.id=parseInt(100*Math.random())+1024,t.temp.author="vue-element-admin",function(t){return Object(i.a)({url:"/article/create",method:"post",data:t})}(t.temp).then(function(){t.list.unshift(t.temp),t.dialogFormVisible=!1,t.$notify({title:"成功",message:"创建成功",type:"success",duration:2e3})}))})},handleUpdate:function(t){var e=this;this.temp=n()({},t),this.temp.timestamp=new Date(this.temp.timestamp),this.dialogStatus="update",this.dialogFormVisible=!0,console.log(this.temp.questions),this.$nextTick(function(){e.$refs.dataForm.clearValidate()})},updateData:function(){var t=this,e=n()({},this.temp);this.api.v1.lesson.create(e).then(function(e){t.$notify({title:"成功",message:"操作成功",type:"success",duration:2e3}),t.dialogFormVisible=!1,t.getList()})},handleRadioChanges:function(t){console.log(t)},addOption:function(t){var e=this.temp.questions[t].lesson_question_items.length;if(e>6)this.$notify({title:"失败",message:"最多添加7个选项",type:"error",duration:2e3});else{var a=n()({},{lesson_question_item_option:["A","B","C","D","E","F","G"][e],lesson_question_item_detail:""});this.temp.questions[t].lesson_question_items.push(a)}},addQuestion:function(){var t={lesson_question_items:[{lesson_question_item_option:"A",lesson_question_item_detail:""},{lesson_question_item_option:"B",lesson_question_item_detail:""}],lesson_question_detail:"",lesson_question_explanation:"",lesson_question_explanation_type:"text",lesson_question_sort:this.temp.questions.length+1,lesson_question_type:"text",lesson_question_right_option:"A"},e=n()({},t);this.temp.questions.push(e)}}},v=Object(u.a)(h,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"filter-container"},[a("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"课程名字"},nativeOn:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.handleFilter(e):null}},model:{value:t.listQuery.lesson_name,callback:function(e){t.$set(t.listQuery,"lesson_name",e)},expression:"listQuery.lesson_name"}}),t._v(" "),a("el-select",{staticClass:"filter-item",staticStyle:{width:"130px"},attrs:{placeholder:"课程类型",clearable:""},model:{value:t.listQuery.lesson_type,callback:function(e){t.$set(t.listQuery,"lesson_type",e)},expression:"listQuery.lesson_type"}},t._l(t.lessonTypeOptions,function(t){return a("el-option",{key:t.key,attrs:{label:t.display_name,value:t.key}})})),t._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handleFilter}},[t._v(t._s(t.$t("table.search")))]),t._v(" "),a("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-edit"},on:{click:t.handleCreate}},[t._v(t._s(t.$t("table.add")))])],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.list,border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{label:t.$t("table.id"),prop:"id",align:"center",width:"65"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.lesson_id))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"课程名字"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{staticClass:"link-type"},[t._v(t._s(e.row.lesson_name))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"课程类型",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[a("el-tag",{attrs:{type:t._f("statusFilter")(e.row.lesson_type)}},[t._v(t._s(t._f("typeFilter")(e.row.lesson_type)))])],1)]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"课程排序",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[a("el-tag",[t._v(t._s(t._f("sortFilter")(e.row.lesson_sort)))])],1)]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作",align:"center",width:"230","class-name":"small-padding fixed-width"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){t.handleUpdate(e.row)}}},[t._v("编辑")])]}}])})],1),t._v(" "),a("pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total>0"}],attrs:{total:t.total,page:t.listQuery.page,limit:t.listQuery.limit},on:{"update:page":function(e){t.$set(t.listQuery,"page",e)},"update:limit":function(e){t.$set(t.listQuery,"limit",e)},pagination:t.getList}}),t._v(" "),a("el-dialog",{attrs:{title:t.textMap[t.dialogStatus],visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[a("el-tabs",{staticStyle:{"margin-left":"50px"},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"课程信息",name:"lessonInfo"}},[a("el-form",{ref:"dataForm",attrs:{rules:t.rules,model:t.temp,"label-position":"left","label-width":"70px"}},[a("el-form-item",{staticStyle:{width:"400px"},attrs:{label:"课程名字",prop:"lesson_name"}},[a("el-input",{attrs:{placeholder:"请输入课程名字"},model:{value:t.temp.lesson_name,callback:function(e){t.$set(t.temp,"lesson_name",e)},expression:"temp.lesson_name"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"课程类型",prop:"lesson_type"}},[a("el-select",{staticClass:"filter-item",attrs:{placeholder:"请选择课程类型"},model:{value:t.temp.lesson_type,callback:function(e){t.$set(t.temp,"lesson_type",e)},expression:"temp.lesson_type"}},t._l(t.lessonTypeOptions,function(t){return a("el-option",{key:t.key,attrs:{label:t.display_name,value:t.key}})}))],1),t._v(" "),a("el-form-item",{attrs:{label:"课程排序",prop:"lesson_sort"}},[a("el-input-number",{attrs:{min:0,max:100,disabled:"create"!==t.dialogStatus,label:"第几天的课程"},model:{value:t.temp.lesson_sort,callback:function(e){t.$set(t.temp,"lesson_sort",e)},expression:"temp.lesson_sort"}})],1),t._v(" "),a("datum",{staticStyle:{width:"400px"},attrs:{datum:t.temp.datum,type:t.datumType}})],1)],1),t._v(" "),a("el-tab-pane",{attrs:{label:"课程题目",name:"questionList"}},[t._l(t.temp.questions,function(e,s){return a("el-row",{key:e.lesson_question_id,staticStyle:{"line-height":"40px","border-bottom":"1px solid #C0C4CC",padding:"10px 0px"},attrs:{gutter:20}},[a("el-col",{attrs:{span:4,offset:1}},[a("label",[t._v(t._s(e.lesson_question_sort)+" . 题目类型选择")])]),t._v(" "),a("el-col",{attrs:{span:16}},[a("div",{staticClass:"grid-content bg-purple"},[a("el-radio-group",{on:{change:t.handleRadioChanges},model:{value:e.lesson_question_type,callback:function(a){t.$set(e,"lesson_question_type",a)},expression:"item.lesson_question_type"}},t._l(t.options,function(e){return a("el-radio",{key:e.label,attrs:{label:String(e.label)}},[t._v("\n                  "+t._s(e.value)+"\n                ")])}))],1)]),t._v(" "),"img"!==e.lesson_question_type?a("el-col",{attrs:{offset:5}},[a("el-col",{attrs:{span:16}},[a("el-input",{attrs:{type:"textarea"},model:{value:e.lesson_question_detail,callback:function(a){t.$set(e,"lesson_question_detail",a)},expression:"item.lesson_question_detail"}})],1)],1):t._e(),t._v(" "),"img"===e.lesson_question_type?a("el-col",{attrs:{offset:5}},[a("el-col",{attrs:{span:16}},[a("guavaUpload",{attrs:{image_url:e.lesson_question_detail},on:{"update:image_url":function(a){t.$set(e,"lesson_question_detail",a)}}})],1)],1):t._e(),t._v(" "),a("el-col",{staticStyle:{"padding-top":"10px"},attrs:{span:4,offset:1}},[a("label",[t._v("题目解析")])]),t._v(" "),a("el-col",{attrs:{span:16}},[a("div",{staticClass:"grid-content bg-purple"},[a("el-radio-group",{on:{change:t.handleRadioChanges},model:{value:e.lesson_question_explanation_type,callback:function(a){t.$set(e,"lesson_question_explanation_type",a)},expression:"item.lesson_question_explanation_type"}},t._l(t.options,function(e){return a("el-radio",{key:e.label,attrs:{label:String(e.label)}},[t._v("\n                  "+t._s(e.value)+"\n                ")])}))],1)]),t._v(" "),"img"!==e.lesson_question_explanation_type?a("el-col",{attrs:{offset:5}},[a("el-col",{attrs:{span:16}},[a("el-input",{attrs:{type:"textarea"},model:{value:e.lesson_question_explanation,callback:function(a){t.$set(e,"lesson_question_explanation",a)},expression:"item.lesson_question_explanation"}})],1)],1):t._e(),t._v(" "),"img"===e.lesson_question_explanation_type?a("el-col",{attrs:{offset:5}},[a("el-col",{attrs:{span:16}},[a("guavaUpload",{attrs:{image_url:e.lesson_question_explanation},on:{"update:image_url":function(a){t.$set(e,"lesson_question_explanation",a)}}})],1)],1):t._e(),t._v(" "),a("el-col",{staticStyle:{"padding-top":"10px"},attrs:{span:4,offset:1}},[a("label",[t._v("选项")])]),t._v(" "),a("el-col",{staticStyle:{"padding-left":"0px"},attrs:{span:16}},[a("el-radio-group",{on:{change:t.handleRadioChanges},model:{value:e.lesson_question_right_option,callback:function(a){t.$set(e,"lesson_question_right_option",a)},expression:"item.lesson_question_right_option"}},t._l(e.lesson_question_items,function(e){return a("el-col",{key:e.lesson_question_item_id,staticStyle:{"padding-left":"0px","margin-top":"20px"}},[a("el-col",{staticStyle:{"line-height":"30px"},attrs:{span:3}},[a("el-radio",{attrs:{label:e.lesson_question_item_option}},[t._v(t._s(e.lesson_question_item_option))])],1),t._v(" "),a("el-col",{attrs:{span:12}},[a("el-input",{attrs:{type:"textarea"},model:{value:e.lesson_question_item_detail,callback:function(a){t.$set(e,"lesson_question_item_detail",a)},expression:"option.lesson_question_item_detail"}})],1)],1)}))],1),t._v(" "),a("el-col",{staticStyle:{padding:"2px 0px"},attrs:{span:24,offset:8}},[a("i",{staticClass:"el-icon-plus",staticStyle:{cursor:"pointer"},on:{click:function(e){t.addOption(s)}}},[t._v("添加题目选项")])])],1)}),t._v(" "),a("el-col",{attrs:{offset:8}},[a("el-button",{staticStyle:{"margin-top":"10px"},attrs:{icon:"el-icon-plus",type:"primary"},on:{click:t.addQuestion}},[t._v("添加题目")])],1)],2)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.updateData()}}},[t._v("确认提交")])],1)],1),t._v(" "),a("el-dialog",{attrs:{visible:t.dialogPvVisible,title:"Reading statistics"},on:{"update:visible":function(e){t.dialogPvVisible=e}}},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.pvData,border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{prop:"key",label:"Channel"}}),t._v(" "),a("el-table-column",{attrs:{prop:"pv",label:"Pv"}})],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.dialogPvVisible=!1}}},[t._v(t._s(t.$t("table.confirm")))])],1)],1)],1)},[],!1,null,null,null);v.options.__file="index.vue";e.default=v.exports}}]);