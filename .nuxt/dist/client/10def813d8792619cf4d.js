(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{257:function(t,e,r){"use strict";r.r(e);r(29);var o=r(5),n=(r(63),r(64),r(59)),l={middleware:"authenticated",name:"Editor",data:function(){return{title:"",description:"",body:"",tagList:[],tag:""}},methods:{addTag:function(){this.tagList.includes(this.tag)||this.tagList.push(this.tag),console.log(this.tagList)},addArticle:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o={article:{title:t.title,description:t.description,body:t.body,tagList:t.tagList}},Object(n.b)({method:"POST",data:o,url:"/api/articles"});case 2:r=e.sent,r.data&&(alert("添加成功!"),t.title="",t.description="",t.body="",t.tagList.splice(),t.tag="");case 5:case"end":return e.stop()}var o}),e)})))()}}},c=r(20),component=Object(c.a)(l,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"editor-page"},[r("div",{staticClass:"container page"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-10 offset-md-1 col-xs-12"},[r("form",{on:{submit:function(e){return e.preventDefault(),t.addArticle(e)}}},[r("fieldset",[r("fieldset",{staticClass:"form-group"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.title,expression:"title"}],staticClass:"form-control form-control-lg",attrs:{type:"text",placeholder:"Article Title"},domProps:{value:t.title},on:{input:function(e){e.target.composing||(t.title=e.target.value)}}})]),t._v(" "),r("fieldset",{staticClass:"form-group"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.description,expression:"description"}],staticClass:"form-control",attrs:{type:"text",placeholder:"What's this article about?"},domProps:{value:t.description},on:{input:function(e){e.target.composing||(t.description=e.target.value)}}})]),t._v(" "),r("fieldset",{staticClass:"form-group"},[r("textarea",{directives:[{name:"model",rawName:"v-model",value:t.body,expression:"body"}],staticClass:"form-control",attrs:{rows:"8",placeholder:"Write your article (in markdown)"},domProps:{value:t.body},on:{input:function(e){e.target.composing||(t.body=e.target.value)}}})]),t._v(" "),r("fieldset",{staticClass:"form-group"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.tag,expression:"tag"}],staticClass:"form-control",attrs:{type:"text",placeholder:"Enter tags"},domProps:{value:t.tag},on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:(e.preventDefault(),t.addTag(e))},input:function(e){e.target.composing||(t.tag=e.target.value)}}}),t._v(" "),r("div",{staticClass:"tag-list"})]),t._v(" "),r("button",{staticClass:"btn btn-lg pull-xs-right btn-primary",attrs:{disabled:!t.title}},[t._v("\n                            Publish Article\n                        ")])])])])])])])}),[],!1,null,null,null);e.default=component.exports}}]);