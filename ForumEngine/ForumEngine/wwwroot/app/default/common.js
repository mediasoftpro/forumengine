(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{"2uHY":function(t,e,s){"use strict";s.d(e,"a",(function(){return r}));var i=s("fXoL"),o=s("nD3/"),n=s("1pjZ");let r=(()=>{class t{constructor(t,e){this.coreService=t,this.config=e;const s=e.getConfig("host");this.apiOptions={load_roles:s+"api/role/load",load_objects:s+"api/roleobject/load",getinfo:s+"api/role/getinfo",add_role:s+"api/role/proc",add_object:s+"api/roleobject/proc",delete_role:s+"api/role/action",delete_object:s+"api/roleobject/action",update_permission:s+"api/rolepermission/proc"},this.init_search_options()}init_search_options(){this.searchOptions={showpanel:!0,showSearchPanel:!0,showAdvanceSearchLink:!1,term:"",topselectioncheck:!0,navList:this.coreService.getSettingsNavList(),filters:[],dropdownFilters:[],checkFilters:[],categories:[],selectedcategory:"",singleaction:!0,actions:[]}}getApiOptions(){return this.apiOptions}getUploadOptions(){return this.uploadOptions}getToolbarOptions(){return this.toolbarOptions}getSearchOptions(){return this.searchOptions}getInitRoleObject(){return{id:0,rolename:""}}getInitRoleObjectObject(){return{id:0,objectname:"",description:"",uniqueid:""}}}return t.\u0275fac=function(e){return new(e||t)(i.Yb(o.a),i.Yb(n.a))},t.\u0275prov=i.Gb({token:t,factory:t.\u0275fac}),t})()},KJAg:function(t,e,s){"use strict";s.d(e,"a",(function(){return p}));var i=s("JgvU"),o=s("LEd3"),n=s("fXoL"),r=s("l7P3"),c=s("2uHY"),a=s("tk/3");let p=(()=>{class t{constructor(t,e,s){this._store=t,this.settings=e,this.http=s}LoadRoles(){const t=this.settings.getApiOptions().load_roles;this._store.dispatch(new i.k({})),this.http.post(t,{}).subscribe(t=>{this._store.dispatch(new i.l(t))},t=>{this._store.dispatch(new i.g(t))})}LoadObjects(){const t=this.settings.getApiOptions().load_objects;this._store.dispatch(new i.i({})),this.http.post(t,{}).subscribe(t=>{this._store.dispatch(new i.j(t))},t=>{this._store.dispatch(new i.h(t))})}AddRole(t){console.log(this.settings.getApiOptions().add_role),this.http.post(this.settings.getApiOptions().add_role,JSON.stringify(t)).subscribe(t=>{this._store.dispatch(new i.d(t.record))},t=>{this._store.dispatch(new i.h(t))})}AddObject(t){this.http.post(this.settings.getApiOptions().add_object,JSON.stringify(t)).subscribe(e=>{this._store.dispatch(t.id>0?new i.m(e.record):new i.c(e.record))},t=>{this._store.dispatch(new i.h(t))})}GetInfo(t){const e=this.settings.getApiOptions().getinfo;return this.http.post(e,JSON.stringify({id:t}))}UpdatePermission(t){const e=this.settings.getApiOptions().update_permission;return this.http.post(e,JSON.stringify(t))}DeleteRecord(t,e,s,i){t.actionstatus="delete";const o=[];o.push(t),this.ProcessActions(o,"delete",s,i)}ProcessActions(t,e,s,n){this._store.dispatch(1===n?new i.f({SelectedItems:t,isenabled:e}):new i.e({SelectedItems:t,isenabled:e})),this.http.post(s,JSON.stringify(t)).subscribe(t=>{let s="Operation Performed";"delete"===e&&(s="Record Removed"),this._store.dispatch(new o.c({title:s,text:"",css:"bg-success"}))},t=>{this._store.dispatch(new o.c({title:"Error Occured",text:"",css:"bg-danger"}))})}}return t.\u0275fac=function(e){return new(e||t)(n.Yb(r.h),n.Yb(c.a),n.Yb(a.b))},t.\u0275prov=n.Gb({token:t,factory:t.\u0275fac}),t})()},OgBg:function(t,e,s){"use strict";s.d(e,"g",(function(){return i})),s.d(e,"a",(function(){return o})),s.d(e,"h",(function(){return n})),s.d(e,"e",(function(){return r})),s.d(e,"c",(function(){return c})),s.d(e,"f",(function(){return a})),s.d(e,"b",(function(){return p})),s.d(e,"i",(function(){return l})),s.d(e,"d",(function(){return d}));const i=t=>t.categories.posts,o=t=>t.categories.dropdown_categories,n=t=>t.categories.records,r=t=>t.categories.loading,c=t=>t.categories.isloaded,a=t=>t.categories.pagination,p=t=>t.categories.filteroptions,l=t=>t.categories.selectall,d=t=>t.categories.itemsselected},XLPV:function(t,e,s){"use strict";s.d(e,"d",(function(){return i})),s.d(e,"c",(function(){return o})),s.d(e,"b",(function(){return n})),s.d(e,"a",(function(){return r}));const i=t=>t.roles.roles,o=t=>t.roles.objects,n=t=>t.roles.isroleloaded,r=t=>t.roles.isobjectloaded},YaUu:function(t,e,s){"use strict";s.d(e,"a",(function(){return p}));var i=s("II9H"),o=s("l7P3"),n=s("3nTv"),r=s("fXoL"),c=s("nD3/"),a=s("1pjZ");let p=(()=>{class t{constructor(t,e,s){this._store=t,this.coreService=e,this.config=s,this.configs$=this._store.pipe(Object(o.n)(n.a)),this.Configs={};const i=s.getConfig("host");this.apiOptions={load:i+"api/categories/load",load_dropdown:i+"api/categories/load_dropdown",getinfo:i+"api/categories/getinfo",action:i+"api/categories/action",proc:i+"api/categories/proc"},this.configs$.subscribe(t=>{void 0!==t.general&&(this.Configs=t.general.category,this.init_toolbar_options(),this.init_search_options())})}init_search_options(){this.searchOptions={showpanel:!0,showSearchPanel:!0,showAdvanceSearchLink:!1,term:"",topselectioncheck:!0,navList:this.coreService.getSettingsNavList(),filters:[],dropdownFilters:[],checkFilters:[],categories:[],selectedcategory:"",singleaction:!0,actions:this.initialize_actions()}}initialize_actions(){return[{id:1,title:"Add Category",tooltip:"Add new category",row:1,icon:"icon-file-plus",options:{},css:"btn m-b-5 btn-block btn-success",event:"add"}]}init_toolbar_options(){this.toolbarOptions={showtoolbar:!0,showsecondarytoolbar:!0,showcheckAll:!1,navbarcss:i.d.NAVBAR_CSS,left_options:[],left_caption:"Filter:",right_caption:"",right_options:[],actions:[]},this.toolbarOptions.left_options.push({title:"Type",ismultiple:!0,icon:"",Options:[{id:"1",title:"Show All",value:-1,isclick:!0,clickevent:"f_reset",tooltip:"Show all items"},{id:"2",separator:!0}]});const t=[];for(const e in this.Configs)t.push({id:this.Configs[e],title:e});for(const e of t)this.toolbarOptions.left_options[0].Options.push({id:"0",title:e.title,value:e.id,isclick:!0,clickevent:"f_type",tooltip:"Load "+e.title+" templates"});this.toolbarOptions.right_options.push(this.coreService.getPaginationSettings()),this.toolbarOptions.actions.push({title:"Mark As",ismultiple:!0,icon:"",Options:[{id:"1",title:"Enable",value:1,actionstatus:"enable",attr:"isenabled",isclick:!0,clickevent:"m_markas",icon:"",css:i.b.SUCCESS_BUTTON,tooltip:"Enable selected records"},{id:"2",title:"Disable",value:0,actionstatus:"disable",attr:"isenabled",isclick:!0,clickevent:"m_markas",icon:"",css:i.b.SUCCESS_BUTTON,tooltip:"Disable selected records"},{id:"2",title:"Delete",value:0,actionstatus:"delete",css:i.b.DANGER_BUTTON,attr:"",isclick:!0,clickevent:"m_markas",icon:i.c.DELETE_ICON,tooltip:"Delete selected records"}]})}getApiOptions(){return this.apiOptions}getUploadOptions(){return this.uploadOptions}getToolbarOptions(){return this.toolbarOptions}getSearchOptions(){return this.searchOptions}getInitObject(){return{id:0,title:"",term:"",description:"",parentid:0,priority:0,mode:0,isenabled:1,type:0,picturename:"",icon:"",files:[],img_url:""}}}return t.\u0275fac=function(e){return new(e||t)(r.Yb(o.h),r.Yb(c.a),r.Yb(a.a))},t.\u0275prov=r.Gb({token:t,factory:t.\u0275fac}),t})()},zIGt:function(t,e,s){"use strict";s.d(e,"a",(function(){return p}));var i=s("t+rW"),o=s("LEd3"),n=s("fXoL"),r=s("l7P3"),c=s("YaUu"),a=s("tk/3");let p=(()=>{class t{constructor(t,e,s){this._store=t,this.settings=e,this.http=s}LoadRecords(t){const e=this.settings.getApiOptions().load;this._store.dispatch(new i.f({})),this.http.post(e,JSON.stringify(t)).subscribe(e=>{this._store.dispatch(new i.g(e)),this._store.dispatch(new o.d({totalrecords:e.records,pagesize:t.pagesize,pagenumber:t.pagenumber}))},t=>{this._store.dispatch(new i.e(t))})}LoadDropdownCategories(t){const e=this.settings.getApiOptions().load_dropdown;this.http.post(e,{type:t}).subscribe(t=>{this._store.dispatch(new i.h(t))},t=>{this._store.dispatch(new i.e(t))})}AddRecord(t){return this.http.post(this.settings.getApiOptions().proc,JSON.stringify(t))}GetInfo(t){const e=this.settings.getApiOptions().getinfo;return this.http.post(e,JSON.stringify([{id:t}]))}DeleteRecord(t,e){t.actionstatus="delete";const s=[];s.push(t),this.ProcessActions(s,"delete")}ProcessActions(t,e){this._store.dispatch(new i.c({SelectedItems:t,isenabled:e})),this.http.post(this.settings.getApiOptions().action,JSON.stringify(t)).subscribe(t=>{let s="Operation Performed";"delete"===e&&(s="Record Removed"),this._store.dispatch(new o.c({title:s,text:"",css:"bg-success"}))},t=>{this._store.dispatch(new o.c({title:"Error Occured",text:"",css:"bg-danger"}))})}}return t.\u0275fac=function(e){return new(e||t)(n.Yb(r.h),n.Yb(c.a),n.Yb(a.b))},t.\u0275prov=n.Gb({token:t,factory:t.\u0275fac}),t})()}}]);