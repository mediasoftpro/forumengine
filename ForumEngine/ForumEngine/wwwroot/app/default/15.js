(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{K88d:function(e,s,t){"use strict";t.r(s),t.d(s,"MessagesModule",(function(){return A}));var i=t("1kSV"),c=t("ofXK"),n=t("3Pt+"),o=t("tyNb"),a=t("l7P3"),r=t("pdjO"),d=t("LEd3"),g=t("XDFV"),b=t("fXoL"),l=t("nD3/"),u=t("1pjZ");let h=(()=>{class e{constructor(e,s){this.coreService=e,this.config=s;const t=s.getConfig("host");this.apiOptions={load:t+"api/messages/load",load_recipents:t+"api/messages/load_recipents",marked_as_read:t+"api/messages/marked_as_read",getinfo:t+"api/messages/getinfo",action:t+"api/messages/action",proc:t+"api/messages/send_message"}}getApiOptions(){return this.apiOptions}}return e.\u0275fac=function(s){return new(s||e)(b.Yb(l.a),b.Yb(u.a))},e.\u0275prov=b.Gb({token:e,factory:e.\u0275fac}),e})();var p=t("tk/3");let f=(()=>{class e{constructor(e,s){this.settings=e,this.http=s}LoadMessages(e){const s=this.settings.getApiOptions().load;return this.http.post(s,JSON.stringify(e))}LoadRecipents(e){const s=this.settings.getApiOptions().load_recipents;return this.http.post(s,JSON.stringify(e))}Marked_As_Read(e){const s=this.settings.getApiOptions().marked_as_read;return this.http.post(s,JSON.stringify(e))}SendMessage(e){return this.http.post(this.settings.getApiOptions().proc,JSON.stringify(e))}}return e.\u0275fac=function(s){return new(s||e)(b.Yb(h),b.Yb(p.b))},e.\u0275prov=b.Gb({token:e,factory:e.\u0275fac}),e})();var m=t("RDfn");function k(e,s){1&e&&b.Lb(0,"app-loader")}function v(e,s){if(1&e){const e=b.Rb();b.Qb(0,"li",11),b.Qb(1,"a",12),b.bc("click",(function(t){b.uc(e);const i=s.$implicit;return b.dc(2).getMessageList(i,t),!1})),b.Qb(2,"div",13),b.Lb(3,"img",14),b.Pb(),b.Qb(4,"div",15),b.Qb(5,"div",16),b.Fc(6),b.Pb(),b.Qb(7,"p"),b.Fc(8),b.Pb(),b.Pb(),b.Lb(9,"div",17),b.Pb(),b.Pb()}if(2&e){const e=s.$implicit,t=b.dc(2);b.kc("ngClass",t.SelectedRecipent.user.id===e.user.id?"select-friend":""),b.xb(3),b.kc("src",e.user.img_url,b.wc),b.xb(3),b.Ic(" ",e.user.firstname," ",e.user.lastname," "),b.xb(2),b.Hc(" ",e.message.subject," ")}}function M(e,s){1&e&&b.Lb(0,"app-loader")}function w(e,s){1&e&&(b.Qb(0,"div",5),b.Fc(1," No Messages "),b.Pb())}function P(e,s){if(1&e&&(b.Qb(0,"div",21),b.Lb(1,"img",31),b.Pb()),2&e){const e=b.dc().$implicit;b.xb(1),b.lc("src",e.message.user.img_url,b.wc)}}function L(e,s){if(1&e&&(b.Qb(0,"div",23),b.Lb(1,"img",31),b.Pb()),2&e){const e=b.dc().$implicit;b.xb(1),b.lc("src",e.message.user.img_url,b.wc)}}function x(e,s){if(1&e&&(b.Qb(0,"li",11),b.Qb(1,"div",24),b.Dc(2,P,2,1,"div",25),b.Qb(3,"div",26),b.Lb(4,"div",11),b.Qb(5,"span",27),b.Fc(6),b.Pb(),b.Qb(7,"span",28),b.Fc(8),b.ec(9,"date"),b.Pb(),b.Lb(10,"div",29),b.Pb(),b.Dc(11,L,2,1,"div",30),b.Pb(),b.Pb()),2&e){const e=s.$implicit,t=b.dc(5);b.kc("ngClass",t.SelectedRecipent.user.id===e.message.user.id?"outgoing":"incoming"),b.xb(2),b.kc("ngIf",e.message.user.id===t.SelectedRecipent.user.id),b.xb(2),b.kc("ngClass",t.SelectedRecipent.user.id===e.message.user.id?"arrow-left":"arrow-right"),b.xb(2),b.Ic("",e.message.user.firstname," ",e.message.user.lastname,""),b.xb(2),b.Gc(b.gc(9,8,e.msg_sent,"MMM d, h:mm a")),b.xb(2),b.kc("innerHTML",e.message.body,b.vc),b.xb(1),b.kc("ngIf",e.message.user.id!==t.SelectedRecipent.user.id)}}function _(e,s){if(1&e&&(b.Qb(0,"ul"),b.Dc(1,x,12,11,"li",9),b.Pb()),2&e){const e=b.dc(4);b.xb(1),b.kc("ngForOf",e.MessageList)}}function Q(e,s){if(1&e&&(b.Qb(0,"div",21),b.Lb(1,"img",31),b.Pb()),2&e){const e=b.dc().$implicit;b.xb(1),b.lc("src",e.message.user.img_url,b.wc)}}function S(e,s){if(1&e&&(b.Qb(0,"div",23),b.Lb(1,"img",31),b.Pb()),2&e){const e=b.dc().$implicit;b.xb(1),b.lc("src",e.message.user.img_url,b.wc)}}function y(e,s){if(1&e&&(b.Qb(0,"li",11),b.Qb(1,"div",24),b.Dc(2,Q,2,1,"div",25),b.Qb(3,"div",26),b.Lb(4,"div",11),b.Qb(5,"span",27),b.Fc(6),b.Pb(),b.Qb(7,"span",28),b.Fc(8),b.ec(9,"date"),b.Pb(),b.Lb(10,"div",29),b.Pb(),b.Dc(11,S,2,1,"div",30),b.Pb(),b.Pb()),2&e){const e=s.$implicit,t=b.dc(5);b.kc("ngClass",t.SelectedRecipent.user.id===e.user.id?"outgoing":"incoming"),b.xb(2),b.kc("ngIf",e.user.id===t.SelectedRecipent.user.id),b.xb(2),b.kc("ngClass",t.SelectedRecipent.user.id===e.user.id?"arrow-left":"arrow-right"),b.xb(2),b.Ic("",e.message.user.firstname," ",e.message.user.lastname,""),b.xb(2),b.Gc(b.gc(9,8,e.msg_sent,"MMM d, h:mm a")),b.xb(2),b.kc("innerHTML",e.message.body,b.vc),b.xb(1),b.kc("ngIf",e.user.id!==t.SelectedRecipent.user.id)}}function I(e,s){if(1&e&&(b.Qb(0,"ul"),b.Dc(1,y,12,11,"li",9),b.Pb()),2&e){const e=b.dc(4);b.xb(1),b.kc("ngForOf",e.MessageList)}}function R(e,s){1&e&&(b.Qb(0,"div"),b.Fc(1," sending... "),b.Pb())}function O(e,s){if(1&e){const e=b.Rb();b.Qb(0,"div"),b.Qb(1,"div",32),b.Lb(2,"input",33),b.Qb(3,"textarea",34),b.bc("ngModelChange",(function(s){return b.uc(e),b.dc(4).message=s})),b.Pb(),b.Pb(),b.Qb(4,"div",35),b.Qb(5,"button",36),b.bc("click",(function(){return b.uc(e),b.dc(4).sendMessage()})),b.Fc(6," Send "),b.Pb(),b.Pb(),b.Pb()}if(2&e){const e=b.dc(4);b.xb(3),b.kc("ngModel",e.message)}}function D(e,s){if(1&e&&(b.Qb(0,"div",20),b.Qb(1,"ul"),b.Qb(2,"li"),b.Dc(3,_,2,1,"ul",1),b.Dc(4,I,2,1,"ul",1),b.Pb(),b.Qb(5,"li"),b.Lb(6,"div",21),b.Qb(7,"div",22),b.Dc(8,R,2,0,"div",1),b.Dc(9,O,7,1,"div",1),b.Pb(),b.Lb(10,"div",23),b.Pb(),b.Pb(),b.Pb()),2&e){const e=b.dc(3);b.xb(3),b.kc("ngIf","account"!==e.config.getGlobalVar("apptype")),b.xb(1),b.kc("ngIf","account"===e.config.getGlobalVar("apptype")),b.xb(4),b.kc("ngIf",e.showMessagePanel),b.xb(1),b.kc("ngIf",!e.showMessagePanel)}}function F(e,s){if(1&e&&(b.Qb(0,"div"),b.Dc(1,w,2,0,"div",18),b.Dc(2,D,11,4,"div",19),b.Pb()),2&e){const e=b.dc(2);b.xb(1),b.kc("ngIf",0===e.MessageList.length),b.xb(1),b.kc("ngIf",e.MessageList.length>0)}}function j(e,s){if(1&e){const e=b.Rb();b.Qb(0,"div",3),b.Qb(1,"div",4),b.Qb(2,"div",5),b.Fc(3," Inbox "),b.Pb(),b.Qb(4,"input",6),b.bc("ngModelChange",(function(s){return b.uc(e),b.dc().query.term=s}))("keyup.enter",(function(){return b.uc(e),b.dc().LoadRecipents()})),b.Pb(),b.Qb(5,"div",7),b.Qb(6,"ul",8),b.Dc(7,v,10,5,"li",9),b.Pb(),b.Pb(),b.Pb(),b.Qb(8,"div",10),b.Dc(9,M,1,0,"app-loader",1),b.Dc(10,F,3,2,"div",1),b.Pb(),b.Pb()}if(2&e){const e=b.dc();b.xb(4),b.kc("ngModel",e.query.term),b.xb(3),b.kc("ngForOf",e.Recipents),b.xb(2),b.kc("ngIf",e.showMessageLoader),b.xb(1),b.kc("ngIf",!e.showMessageLoader)}}let q=(()=>{class e{constructor(e,s,t,i,c,n,o){this._store=e,this.settingService=s,this.dataService=t,this.coreService=i,this.router=c,this.route=n,this.config=o,this.auth$=this._store.pipe(Object(a.n)(g.a)),this.showLoader=!1,this.showMessageLoader=!1,this.showMessagePanel=!1,this.User={},this.Recipents=[],this.SelectedRecipent={},this.MessageList=[],this.message="",this.query={From:"",term:""},this.message_query={},this.UnreadMessages=[]}ngOnInit(){this.auth$.subscribe(e=>{this.User=e.User,this.LoadRecipents()})}LoadRecipents(){this.query.From=this.User.id,"account"===this.config.getGlobalVar("apptype")?this.query.loadReceiverUserList=!0:this.query.loadUserList=!0,this.showLoader=!0,this.dataService.LoadRecipents(this.query).subscribe(e=>{this.Recipents=e.posts,e.posts.length>0&&(this.SelectedRecipent=e.posts[0],this.LoadMessages(e.posts[0].message.id)),this.showLoader=!1},e=>{console.log("error occured")})}LoadMessages(e){this.message_query.id=e,this.message_query.pagesize=10,this.message_query.order="recipent.msg_sent",this.showMessageLoader=!0,this.dataService.LoadMessages(this.message_query).subscribe(e=>{this.MessageList=e.posts;for(let s of this.MessageList)null===s.msg_read&&s.to_uid===this.User.id&&this.UnreadMessages.push({messageid:s.message.id});this.marked_as_read(),this.showMessageLoader=!1},e=>{console.log("error occured")})}getMessageList(e,s){this.SelectedRecipent=e,this.LoadMessages(e.message.id),s.stopPropagation()}sendMessage(){""!==this.message?(this.showMessagePanel=!0,this.dataService.SendMessage({message:{subject:this.SelectedRecipent.message.subject,reply_id:this.SelectedRecipent.message.id,body:this.message,from_uid:this.User.id},to_uid:this.SelectedRecipent.user.id}).subscribe(e=>{this._store.dispatch(new d.c({title:"Message Sent",text:"",css:"bg-danger"})),this.message="",this.showMessagePanel=!1,this.LoadMessages(this.SelectedRecipent.message.id)},e=>{console.log("error occured")})):this._store.dispatch(new d.c({title:"Please enter message to continue.",text:"",css:"bg-danger"}))}marked_as_read(){this.UnreadMessages.length>0&&this.dataService.Marked_As_Read(this.UnreadMessages).subscribe(e=>{},e=>{console.log("error occured")})}}return e.\u0275fac=function(s){return new(s||e)(b.Kb(a.h),b.Kb(h),b.Kb(f),b.Kb(l.a),b.Kb(o.f),b.Kb(o.a),b.Kb(u.a))},e.\u0275cmp=b.Eb({type:e,selectors:[["ng-component"]],hostVars:1,hostBindings:function(e,s){2&e&&b.Cc("@fadeInAnimation",void 0)},decls:3,vars:2,consts:[[1,"container","workscene-custom-holder","workscene-messages-style"],[4,"ngIf"],["class","row",4,"ngIf"],[1,"row"],[1,"col-sm-4"],[1,"workscene-form-group-title"],["type","text","placeholder","Search for...",1,"form-control",2,"width","100%",3,"ngModel","ngModelChange","keyup.enter"],[1,"workscene-inbox"],[1,"border-top-gray"],[3,"ngClass",4,"ngFor","ngForOf"],[1,"col-sm-8"],[3,"ngClass"],["href","#",3,"click"],[1,"float-left"],["width","60","height","60",3,"src"],[1,"float-left","inbox-content"],[1,"workscene-small-title"],[1,"clear"],["class","workscene-form-group-title",4,"ngIf"],["class","workscene-chat",4,"ngIf"],[1,"workscene-chat"],[1,"workscene-message-box-left"],[1,"workscene-message-box-middle","message-box"],[1,"workscene-message-box-right"],[1,"workscene-message-box"],["class","workscene-message-box-left",4,"ngIf"],[1,"workscene-message-box-middle"],[1,"workscene-title-font"],[1,"date"],[3,"innerHTML"],["class","workscene-message-box-right",4,"ngIf"],["width","40","height","40",3,"src"],[1,"form-fields-light","float-left"],["type","hidden","id","friend_id","value",""],["rows","3","cols","80","placeholder","Type your Message",3,"ngModel","ngModelChange"],[1,"align-right","float-right"],["type","button",1,"workscene-btn-success","btn-long","send-btn",3,"click"]],template:function(e,s){1&e&&(b.Qb(0,"div",0),b.Dc(1,k,1,0,"app-loader",1),b.Dc(2,j,11,4,"div",2),b.Pb()),2&e&&(b.xb(1),b.kc("ngIf",s.showLoader),b.xb(1),b.kc("ngIf",!s.showLoader))},directives:[c.u,m.a,n.c,n.q,n.t,c.t,c.r],pipes:[c.f],encapsulation:2,data:{animation:[r.a]}}),e})();var C=t("o+qO"),U=t("/4iV");const N=[{path:"",data:{title:"Messages",topmenuIndex:U.c.TOPMENU_SETTINGS_INDEX,leftmenuIndex:U.c.SETTINGS_MESSAGES_INDEX,urls:[{title:"Dashboard",url:"/"},{title:"Messages",url:"/messages"},{title:"Management"}]},component:q}];let A=(()=>{class e{}return e.\u0275mod=b.Ib({type:e}),e.\u0275inj=b.Hb({factory:function(s){return new(s||e)},providers:[h,f],imports:[[c.c,n.l,C.a,i.c,o.j.forChild(N)]]}),e})()},pdjO:function(e,s,t){"use strict";t.d(s,"a",(function(){return c}));var i=t("R0Ic");const c=Object(i.k)("fadeInAnimation",[Object(i.j)(":enter",[Object(i.i)({opacity:0,background:"#ff0000"}),Object(i.e)(".8s",Object(i.i)({opacity:1}))])])}}]);