(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{JJ5z:function(t,i,s){"use strict";s.d(i,"a",(function(){return I}));var e=s("l7P3"),o=s("pdjO"),r=s("PCgb"),c=s("mTle"),n=s("LEd3"),a=s("XDFV"),d=s("3nTv"),h=s("fXoL"),u=s("dSJ/"),l=s("xnmw"),b=s("Hjmt"),p=s("tyNb"),m=s("nD3/"),f=s("ofXK"),v=s("/H0e"),g=s("4HLj"),A=s("P+Pe");function O(t,i){1&t&&(h.Qb(0,"div"),h.Qb(1,"h2",5),h.Fc(2,"Access Denied"),h.Pb(),h.Pb())}function _(t,i){if(1&t){const t=h.Rb();h.Qb(0,"div"),h.Qb(1,"div",2),h.Qb(2,"div",6),h.Qb(3,"app-navigation-v2",7),h.bc("Action",(function(i){return h.uc(t),h.dc(2).toolbaraction(i)}))("SearchSelection",(function(i){return h.uc(t),h.dc(2).FindRecords(i)})),h.Pb(),h.Pb(),h.Qb(4,"div",8),h.Qb(5,"app-toolbar-v2",9),h.bc("Action",(function(i){return h.uc(t),h.dc(2).toolbaraction(i)}))("SelectAllCard",(function(i){return h.uc(t),h.dc(2).selectAll(i)})),h.Pb(),h.Qb(6,"div",10),h.Qb(7,"app-forum-list",11),h.bc("View",(function(i){return h.uc(t),h.dc(2).toolbaraction(i)}))("SelectedItems",(function(i){return h.uc(t),h.dc(2).getSelectedItems(i)})),h.Pb(),h.Pb(),h.Pb(),h.Pb(),h.Pb()}if(2&t){const t=h.dc(2);h.xb(3),h.kc("isAdmin",t.isAdmin)("FilterOptions",t.FilterOptions)("Options",t.SearchOptions),h.xb(2),h.kc("isAdmin",t.isAdmin)("Options",t.ToolbarOptions)("isItemsSelected",t.isItemsSelected),h.xb(2),h.kc("route_path",t.route_path)("isAdmin",t.isAdmin)("isActionGranded",t.isActionGranded)}}function S(t,i){if(1&t&&(h.Qb(0,"div",2),h.Qb(1,"div",3),h.Qb(2,"div",4),h.Dc(3,O,3,0,"div",1),h.Dc(4,_,8,9,"div",1),h.Pb(),h.Pb(),h.Pb()),2&t){const t=h.dc();h.xb(3),h.kc("ngIf",!t.isAccessGranted),h.xb(1),h.kc("ngIf",t.isAccessGranted)}}function w(t,i){if(1&t){const t=h.Rb();h.Qb(0,"div"),h.Qb(1,"app-navigation-v2",7),h.bc("Action",(function(i){return h.uc(t),h.dc().toolbaraction(i)}))("SearchSelection",(function(i){return h.uc(t),h.dc().FindRecords(i)})),h.Pb(),h.Qb(2,"div",4),h.Qb(3,"div",10),h.Qb(4,"div",12),h.Qb(5,"app-toolbar-v2",9),h.bc("Action",(function(i){return h.uc(t),h.dc().toolbaraction(i)}))("SelectAllCard",(function(i){return h.uc(t),h.dc().selectAll(i)})),h.Pb(),h.Pb(),h.Qb(6,"app-forum-list",13),h.bc("View",(function(i){return h.uc(t),h.dc().toolbaraction(i)}))("SelectedItems",(function(i){return h.uc(t),h.dc().getSelectedItems(i)})),h.Pb(),h.Pb(),h.Pb(),h.Pb()}if(2&t){const t=h.dc();h.xb(1),h.kc("isAdmin",t.isAdmin)("FilterOptions",t.FilterOptions)("Options",t.SearchOptions),h.xb(4),h.kc("isAdmin",t.isAdmin)("Options",t.ToolbarOptions)("isItemsSelected",t.isItemsSelected),h.xb(1),h.kc("route_path",t.route_path)("isAdmin",t.isAdmin)}}let I=(()=>{class t{constructor(t,i,s,o,c,n,h){this._store=t,this.settingService=i,this.dataService=s,this.permission=o,this.router=c,this.route=n,this.coreService=h,this.isAdmin=!0,this.route_path="/forumtopics/",this.PublicView=!1,this.type=0,this.filteroptions$=this._store.pipe(Object(e.n)(r.b)),this.isloaded$=this._store.pipe(Object(e.n)(r.e)),this.isforumsloaded$=this._store.pipe(Object(e.n)(r.d)),this.forums$=this._store.pipe(Object(e.n)(r.c)),this.isItemSelected$=this._store.pipe(Object(e.n)(r.f)),this.records$=this._store.pipe(Object(e.n)(r.j)),this.pagination$=this._store.pipe(Object(e.n)(r.h)),this.auth$=this._store.pipe(Object(e.n)(a.a)),this.configs$=this._store.pipe(Object(e.n)(d.a)),this.isAccessGranted=!1,this.isActionGranded=!1,this.heading="Forums Topic",this.subheading="Management",this.isItemsSelected=!1,this.IsLoaded=!1,this.Records=0,this.Pagination={},this.showReportLink=!1}ngOnInit(){this.isAdmin?this.auth$.subscribe(t=>{const i="1521395897976";this.permission.GrandResourceAccess(!1,i,"1521395939384",t.Role)&&(this.isAccessGranted=!0,this.permission.GrandResourceAction(i,t.Role)&&(this.isActionGranded=!0))}):(this.isAccessGranted=!0,this.isActionGranded=!0),this.SearchOptions=this.settingService.getSearchOptions(this.isAdmin),this.ToolbarOptions=this.settingService.getToolbarOptions(this.isAdmin),this.filteroptions$.subscribe(t=>{this.FilterOptions=Object.assign({},t),t.track_filter&&(this.loadRecords(this.FilterOptions),t.track_filter=!1,this._store.dispatch(new c.l(this.FilterOptions)))}),this.records$.subscribe(t=>{this.Records=t}),this.pagination$.subscribe(t=>{this.Pagination=t}),this.isforumsloaded$.subscribe(t=>{t||this.dataService.loadForumsRecords()}),this.isItemSelected$.subscribe(t=>{this.isItemsSelected=t}),this.forums$.subscribe(t=>{this.SearchOptions.multiselectOptions.placeholder="Select Forum";for(const i of t)this.SearchOptions.categories.push({key:i.id,value:i.title})}),this.route.params.subscribe(t=>{void 0!==t.tagname&&(console.log("tag filter initiated"),this.FilterOptions.tags=t.tagname,this.FilterOptions.track_filter=!0,this._store.dispatch(new c.l(this.FilterOptions))),void 0!==t.uname&&(console.log("user filter initiated"),console.log(t.uname),this.FilterOptions.username=t.uname,this.FilterOptions.track_filter=!0,this._store.dispatch(new c.l(this.FilterOptions))),void 0!==t.id&&(this.FilterOptions.id=t.id,this.FilterOptions.track_filter=!0,this._store.dispatch(new c.l(this.FilterOptions))),void 0!==t.abuse&&("abuse"===t.abuse?(this.FilterOptions.loadabusereports=!0,this.showReportLink=!0):"normallist"===t.abuse&&(this.FilterOptions.loadabusereports=!1,this.showReportLink=!1),this.FilterOptions.track_filter=!0,this._store.dispatch(new c.l(this.FilterOptions)))}),this.isloaded$.subscribe(t=>{this.IsLoaded=t,this.IsLoaded?this.refreshStats():this.loadRecords(this.FilterOptions)})}loadRecords(t){this.coreService.renderAbuseReportBtn(this.SearchOptions.actions,t.loadabusereports),this.PublicView&&(t.ispublic=!0),this.dataService.LoadRecords(t)}selectAll(t){this._store.dispatch(new c.j(t))}toolbaraction(t){switch(t.action){case"view":return void this.router.navigate([this.route_path+"profile/0"]);case"add":return void this.router.navigate([this.route_path+"process/0"]);case"abuse":return void this.router.navigate([this.route_path+"filter/abuse"]);case"normallist":return void this.router.navigate([this.route_path+"filter/normallist"]);case"reports":return void this.router.navigate([this.route_path+"reports"]);case"m_markas":return void this.ProcessActions(t.value);case"f_type":this._store.dispatch(new c.d({attr:"type",value:t.value}));break;case"f_isapproved":this._store.dispatch(new c.d({attr:"isapproved",value:t.value}));break;case"f_status":this._store.dispatch(new c.d({attr:"isenabled",value:t.value}));break;case"f_adult":this._store.dispatch(new c.d({attr:"isadult",value:t.value}));break;case"pagesize":this._store.dispatch(new c.d({attr:"pagesize",value:t.value}));break;case"m_filter":this._store.dispatch(new c.d({attr:"datefilter",value:t.value}));break;case"sort":this._store.dispatch(new c.d({attr:"direction",value:t.value}))}}FindRecords(t){const i=t.filters;i.tags="",i.userid="",i.pagenumber=1,i.track_filter=!0,this._store.dispatch(new c.l(i))}getSelectedItems(t){this.SelectedItems=t,this.isItemsSelected=this.SelectedItems.length>0}ProcessActions(t){if(this.isActionGranded){if(this.SelectedItems.length>0){for(const i of this.SelectedItems)i.actionstatus=t.actionstatus;this.dataService.ProcessActions(this.SelectedItems,t)}}else this._store.dispatch(new n.c({title:"Permission Denied",text:"",css:"bg-danger"}))}refreshStats(){this._store.dispatch(new c.h({totalrecords:this.Records,pagesize:this.FilterOptions.pagesize})),this._store.dispatch(new n.d({totalrecords:this.Records,pagesize:this.FilterOptions.pagesize,pagenumber:this.Pagination.currentPage}))}}return t.\u0275fac=function(i){return new(i||t)(h.Kb(e.h),h.Kb(u.a),h.Kb(l.a),h.Kb(b.a),h.Kb(p.f),h.Kb(p.a),h.Kb(m.a))},t.\u0275cmp=h.Eb({type:t,selectors:[["app-mainforum-list"]],hostVars:1,hostBindings:function(t,i){2&t&&h.Cc("@fadeInAnimation",void 0)},inputs:{isAdmin:"isAdmin",route_path:"route_path",PublicView:"PublicView",type:"type"},decls:2,vars:2,consts:[["class","row",4,"ngIf"],[4,"ngIf"],[1,"row"],[1,"col-lg-12"],[1,"card"],[1,"m-b-40","m-t-40","text-center"],[1,"col-md-3"],[3,"isAdmin","FilterOptions","Options","Action","SearchSelection"],[1,"col-md-9"],[3,"isAdmin","Options","isItemsSelected","Action","SelectAllCard"],[1,"card-body"],[3,"route_path","isAdmin","isActionGranded","View","SelectedItems"],[1,"m-b-20"],[3,"route_path","isAdmin","View","SelectedItems"]],template:function(t,i){1&t&&(h.Dc(0,S,5,2,"div",0),h.Dc(1,w,7,8,"div",1)),2&t&&(h.kc("ngIf",i.isAdmin),h.xb(1),h.kc("ngIf",!i.isAdmin))},directives:[f.u,v.a,g.a,A.a],encapsulation:2,data:{animation:[o.a]}}),t})()},pdjO:function(t,i,s){"use strict";s.d(i,"a",(function(){return o}));var e=s("R0Ic");const o=Object(e.k)("fadeInAnimation",[Object(e.j)(":enter",[Object(e.i)({opacity:0,background:"#ff0000"}),Object(e.e)(".8s",Object(e.i)({opacity:1}))])])},xp6A:function(t,i,s){"use strict";s.d(i,"a",(function(){return I}));var e=s("l7P3"),o=s("PCgb"),r=s("mTle"),c=s("LEd3"),n=s("XDFV"),a=s("3nTv"),d=s("pdjO"),h=s("fXoL"),u=s("dSJ/"),l=s("xnmw"),b=s("nD3/"),p=s("tyNb"),m=s("SeUu"),f=s("Hjmt"),v=s("ofXK"),g=s("RDfn"),A=s("+kG/");function O(t,i){1&t&&(h.Qb(0,"div"),h.Qb(1,"h2",1),h.Fc(2,"Access Denied"),h.Pb(),h.Pb())}function _(t,i){1&t&&h.Lb(0,"app-loader")}function S(t,i){if(1&t){const t=h.Rb();h.Qb(0,"dynamic-modal-form",9),h.bc("OnSubmit",(function(i){return h.uc(t),h.dc(2).SubmitForm(i)})),h.Pb()}if(2&t){const t=h.dc(2);h.kc("controls",t.controls)("showLoader",t.showLoader)("showCancel",!1)("showModal",!1)("submitText",t.submitText)}}function w(t,i){if(1&t&&(h.Qb(0,"div"),h.Qb(1,"div",2),h.Qb(2,"div",3),h.Qb(3,"div",4),h.Qb(4,"div",5),h.Qb(5,"h4",6),h.Fc(6),h.Pb(),h.Pb(),h.Qb(7,"div",7),h.Dc(8,_,1,0,"app-loader",0),h.Dc(9,S,1,5,"dynamic-modal-form",8),h.Pb(),h.Pb(),h.Pb(),h.Pb(),h.Pb()),2&t){const t=h.dc();h.xb(6),h.Gc(t.formHeading),h.xb(2),h.kc("ngIf",t.showLoader),h.xb(1),h.kc("ngIf",!t.showLoader)}}let I=(()=>{class t{constructor(t,i,s,r,c,d,h,u){this._store=t,this.settingService=i,this.dataService=s,this.coreService=r,this.route=c,this.formService=d,this.permission=h,this.router=u,this.isAdmin=!0,this.route_path="/forumtopics/",this.categories$=this._store.pipe(Object(e.n)(o.a)),this.forums$=this._store.pipe(Object(e.n)(o.c)),this.settings$=this._store.pipe(Object(e.n)(o.l)),this.isloaded$=this._store.pipe(Object(e.n)(o.e)),this.auth$=this._store.pipe(Object(e.n)(n.a)),this.configs$=this._store.pipe(Object(e.n)(a.a)),this.isAccessGranted=!1,this.isActionGranded=!1,this.RecordID=0,this.controls=[],this.showLoader=!1,this.formHeading="Add Topic",this.submitText="Submit",this.IsLoaded=!1,this.Forums=[],this.Auth={}}ngOnInit(){this.auth$.subscribe(t=>{if(this.Auth=t,this.isAdmin){const i="1521395897976";this.permission.GrandResourceAccess(!1,i,"1521395939384",t.Role)&&(this.isAccessGranted=!0,this.permission.GrandResourceAction(i,t.Role)&&(this.isActionGranded=!0))}else this.isAccessGranted=!0,this.isActionGranded=!0}),this.route.params.subscribe(t=>{this.RecordID=this.coreService.decrypt(t.id),isNaN(this.RecordID)&&(this.RecordID=0),this.RecordID>0?(this.formHeading="Update Information",this.submitText="Save Changes",this.Initialize()):this.initializeControls(this.settingService.getInitObject())}),this.forums$.subscribe(t=>{this.Forums=t,this.updateForums()}),this.isloaded$.subscribe(t=>{this.IsLoaded=t,this.IsLoaded||this.Redirect()})}Initialize(){this.RecordID>0?this.isAdmin?this.LoadInfo():this.dataService.Authorize_Author({id:this.RecordID,userid:this.Auth.User.id}).subscribe(t=>{t.isaccess?this.LoadInfo():this.Redirect()},t=>{this.Redirect()}):this.Redirect()}Redirect(){this.router.navigate([this.route_path])}LoadInfo(){this.showLoader=!0,this.dataService.GetInfo(this.RecordID).subscribe(t=>{"success"===t.status?this.initializeControls(t.post):(this._store.dispatch(new c.c({title:t.message,text:"",css:"bg-danger"})),this.initializeControls(this.settingService.getInitObject())),this.showLoader=!1})}updateForums(){if(void 0!==this.controls&&this.controls.length>0)for(const t of this.controls)if("forumid"===t.key)for(const i of this.Forums)t.options.push({key:i.id,value:i.title})}initializeControls(t){this.controls=this.formService.getControls(t),this.updateForums()}SubmitForm(t){if(!this.isActionGranded)return void this._store.dispatch(new c.c({title:"Permission Denied",text:"",css:"bg-danger"}));this.showLoader=!0;let i="Added";this.RecordID>0&&(t.id=this.RecordID,i="Updated"),t.userid=this.Auth.User.id,t.isadmin=this.isAdmin,this.dataService.AddRecord(t).subscribe(t=>{"error"===t.status?this._store.dispatch(new c.c({title:t.message,text:"",css:"bg-danger"})):(this._store.dispatch(new c.c({title:"Record "+i+" Successfully",text:"",css:"bg-success"})),this._store.dispatch(new r.i({})),this.router.navigate(this.isAdmin?[this.route_path]:[this.route_path+"profile/"+this.coreService.encrypt(t.record.id)])),this.showLoader=!1},t=>{this.showLoader=!1,this._store.dispatch(new c.c({title:"Error Occured",text:"",css:"bg-danger"}))})}}return t.\u0275fac=function(i){return new(i||t)(h.Kb(e.h),h.Kb(u.a),h.Kb(l.a),h.Kb(b.a),h.Kb(p.a),h.Kb(m.a),h.Kb(f.a),h.Kb(p.f))},t.\u0275cmp=h.Eb({type:t,selectors:[["app-forumtopic-process"]],inputs:{isAdmin:"isAdmin",route_path:"route_path"},decls:2,vars:2,consts:[[4,"ngIf"],[1,"m-b-40","m-t-40","text-center"],[1,"row"],[1,"col-md-9"],[1,"card"],[1,"card-header"],[1,"m-b-0"],[1,"card-body"],[3,"controls","showLoader","showCancel","showModal","submitText","OnSubmit",4,"ngIf"],[3,"controls","showLoader","showCancel","showModal","submitText","OnSubmit"]],template:function(t,i){1&t&&(h.Dc(0,O,3,0,"div",0),h.Dc(1,w,10,3,"div",0)),2&t&&(h.kc("ngIf",!i.isAccessGranted),h.xb(1),h.kc("ngIf",i.isAccessGranted))},directives:[v.u,g.a,A.a],encapsulation:2,data:{animation:[d.a]}}),t})()}}]);