function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var s=t[r];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{"7NWl":function(e,t,r){"use strict";r.d(t,"a",(function(){return l}));var s=r("fXoL"),n=r("zwrK"),a=r("tk/3"),i=r("5zJ1"),o=r("LEd3"),l=function(){var e=function(){function e(t,r,s,n){_classCallCheck(this,e),this.settings=t,this.http=r,this.actions=s,this.coreActions=n}return _createClass(e,[{key:"LoadRecords",value:function(e){var t=this,r=this.settings.getApiOptions().load;this.actions.loadStarted(),this.http.post(r,JSON.stringify(e)).subscribe((function(r){t.actions.loadSucceeded(r),r.categories.length>0&&t.actions.updateCategories(r.categories),t.coreActions.refreshListStats({totalrecords:r.records,pagesize:e.pagesize,pagenumber:e.pagenumber})}),(function(e){t.actions.loadFailed(e)}))}},{key:"AddRecord",value:function(e){var t="";switch(e.viewType){case 1:case 2:t=this.settings.getApiOptions().proc;break;case 3:t=this.settings.getApiOptions().cemail;break;case 4:t=this.settings.getApiOptions().chpass;break;case 5:t=this.settings.getApiOptions().ctype}return 2===e.viewType?(e.settings.userid=e.id,e.account.userid=e.id,this.http.post(t,JSON.stringify({id:e.id,firstname:e.firstname,lastname:e.lastname,attr_values:e.attr_values,settings:e.settings,account:e.account}))):this.http.post(t,JSON.stringify(e))}},{key:"UpdateThumb",value:function(e,t){var r=this,s=this.settings.getApiOptions().updatethumb,n={};n.Id=e.id;var a=!0,i=!1,o=void 0;try{for(var l,c=t[Symbol.iterator]();!(a=(l=c.next()).done);a=!0){var u=l.value;n.picturename=u.fname}}catch(d){i=!0,o=d}finally{try{a||null==c.return||c.return()}finally{if(i)throw o}}this.http.post(s,JSON.stringify(n)).subscribe((function(e){"error"===e.status?r.coreActions.Notify({title:e.message,text:"",css:"bg-danger"}):(r.actions.UpdateThumb(e.record),r.coreActions.Notify({title:"Profile Photo Updated",text:"",css:"bg-success"}))}),(function(e){r.coreActions.Notify({title:e,text:"",css:"bg-danger"})}))}},{key:"UpdateAvator",value:function(e){var t=this,r=this.settings.getApiOptions().updateavator;this.http.post(r,JSON.stringify(e)).subscribe((function(e){"error"===e.status?t.coreActions.Notify({title:e.message,text:"",css:"bg-danger"}):(t.actions.UpdateThumb(e.record),t.coreActions.Notify({title:"Avator Updated Successfully",text:"",css:"bg-success"}))}),(function(e){t.coreActions.Notify({title:e,text:"",css:"bg-danger"})}))}},{key:"GetInfo",value:function(e){var t=this.settings.getApiOptions().getinfo;return this.http.post(t,JSON.stringify({id:e}))}},{key:"LoadReports",value:function(e){return this.http.post(this.settings.getApiOptions().load_reports,JSON.stringify(e))}},{key:"Authenticate",value:function(e){var t=this.settings.getApiOptions().authenticate;return this.http.post(t,JSON.stringify(e))}},{key:"UpdateRole",value:function(e){var t=this.settings.getApiOptions().updaterole;return this.http.post(t,JSON.stringify(e))}},{key:"GetUserLog",value:function(e){var t=this.settings.getApiOptions().userlog;return this.http.post(t,JSON.stringify({userid:e}))}},{key:"DeleteAccount",value:function(e){var t=this.settings.getApiOptions().archive;return this.http.post(t,JSON.stringify(e))}},{key:"DeleteRecord",value:function(e,t){e.actionstatus="delete";var r=[];r.push(e),this.ProcessActions(r,"delete")}},{key:"ProcessActions",value:function(e,t){var r=this;this.actions.applyChanges({SelectedItems:e,isenabled:t});var s=[],n=!0,a=!1,i=void 0;try{for(var o,l=e[Symbol.iterator]();!(n=(o=l.next()).done);n=!0){var c=o.value;s.push({id:c.id,actionstatus:c.actionstatus})}}catch(u){a=!0,i=u}finally{try{n||null==l.return||l.return()}finally{if(a)throw i}}this.http.post(this.settings.getApiOptions().action,JSON.stringify(s)).subscribe((function(e){var s="Operation Performed";"delete"===t&&(s="Record Removed"),r.coreActions.Notify({title:s,text:"",css:"bg-success"})}),(function(e){r.coreActions.Notify({title:"Error Occured",text:"",css:"bg-danger"})}))}},{key:"ProcessLogActions",value:function(e,t){this.coreActions.Notify({title:"Feature not yet implemented",text:"",css:"bg-success"})}}]),e}();return e.\u0275fac=function(t){return new(t||e)(s.ac(n.a),s.ac(a.b),s.ac(i.a),s.ac(o.a))},e.\u0275prov=s.Ib({token:e,factory:e.\u0275fac}),e}()},pz8m:function(e,t,r){"use strict";r.d(t,"a",(function(){return o}));var s=r("dNLF"),n=r("/4iV"),a=r("fXoL"),i=r("nD3/"),o=function(){var e=function(){function e(t){_classCallCheck(this,e),this.coreService=t}return _createClass(e,[{key:"getControls",value:function(e,t){var r=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];switch(t){case 1:return this.CreateAccountControls(e);case 2:return this.EditProfileControls(e,r);case 3:return this.ChangeEmailControls(e,r);case 4:return this.ChangePasswordControls(e,r);case 5:return this.ChangeUserTypeControls(e)}return this.CreateAccountControls(e)}},{key:"CreateAccountControls",value:function(e){var t=[],r=[],a=!0,i=!1,o=void 0;try{for(var l,c=n.b.USER_TYPES[Symbol.iterator]();!(a=(l=c.next()).done);a=!0){var u=l.value;r.push({key:u.value,value:u.title})}}catch(d){i=!0,o=d}finally{try{a||null==c.return||c.return()}finally{if(i)throw o}}return t.push(new s.b({key:"role_name",label:"Select Role",value:e.role_name.toString(),options:r,order:0})),t.push(new s.h({key:"firstname",label:"",value:e.firstname,placeholder:"First Name",minLength:3,maxLength:50,order:1})),t.push(new s.h({key:"lastname",label:"",value:e.lastname,placeholder:"Last Name",minLength:3,maxLength:50,order:2})),t.push(new s.h({key:"username",label:"",value:e.username,placeholder:"User Name",minLength:5,maxLength:15,required:!0,pattern:n.d.USERNAME_REGEX,order:3})),t.push(new s.h({key:"password",type:"password",label:"",value:e.password,placeholder:"Password",minLength:5,maxLength:20,required:!0,pattern:n.d.PASSWORD_REGEX,order:4})),t.push(new s.h({key:"cpassword",type:"password",label:"",placeholder:"Confirm Password",value:e.cpassword,minLength:5,maxLength:20,required:!0,order:5})),t.push(new s.h({key:"email",label:"",placeholder:"Email",value:e.email,required:!0,email:!0,order:6})),t.sort((function(e,t){return e.order-t.order}))}},{key:"getLoginControls",value:function(e){var t=[];return t.push(new s.h({key:"username",label:"",value:e.username,placeholder:"User Name",required:!0,minLength:5,maxLength:20,order:1})),t.push(new s.h({key:"password",type:"password",label:"",value:e.password,placeholder:"Password",required:!0,minLength:5,maxLength:20,order:2})),t.push(new s.a({key:"rememberme",label:"Remember Me",value:e.rememberme,checked:e.rememberme,required:!0,order:3})),t.sort((function(e,t){return e.order-t.order}))}},{key:"EditProfileControls",value:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],r=[];r.push(new s.h({key:"firstname",label:"First Name",value:e.firstname,placeholder:"First Name",minLength:3,maxLength:50,order:0})),r.push(new s.h({key:"lastname",label:"Last Name",value:e.lastname,placeholder:"Last Name",minLength:3,maxLength:50,order:1}));var n=!1;if(""!==e.id&&(n=!0),this.coreService.renderDynamicControls(r,e.options,n),t){r.push(new s.f({key:"config_section_01",label:"Settings",order:1001}));var a=!1;1===e.settings.isemail&&(a=!0),r.push(new s.a({key:"isemail",label:"Receiving Emails",value:e.settings.isemail,checked:a,helpblock:"Toggle on | off receiving emails",order:1002}));var i=!1;1===e.settings.issendmessages&&(i=!0),r.push(new s.a({key:"issendmessages",label:"Receiving Messages",value:e.settings.issendmessages,checked:i,helpblock:"Toggle on | off receiving internal messages within website",order:1003})),r.push(new s.f({key:"config_section_01",label:"Account",order:1004})),r.push(new s.h({key:"credits",label:"Credits",value:e.account.credits.toString(),colsize:"col-md-12",pattern:"[0-9]+",required:!0,helpblock:"Update user account credits manually",order:1005}));var o=!1;1===e.account.islifetimerenewal&&(o=!0),r.push(new s.a({key:"islifetimerenewal",label:"Lifetime Renewal",value:e.account.islifetimerenewal,checked:o,helpblock:"Toggle on | off enforcing lifetime renewal (paid) account",order:1006}))}return r.sort((function(e,t){return e.order-t.order}))}},{key:"ChangeEmailControls",value:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],r=[];return r.push(new s.h({key:"email",label:"Email Address",placeholder:"Email",value:e.email,required:!0,email:!0,order:0})),t||r.push(new s.h({key:"password",type:"password",pattern:n.d.PASSWORD_REGEX,label:"",placeholder:"Password",value:e.password,minLength:5,maxLength:20,required:!0,order:1})),r.sort((function(e,t){return e.order-t.order}))}},{key:"ChangePasswordControls",value:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],r=[];return t||r.push(new s.h({key:"opassword",type:"password",label:"Current Password",value:e.opassword,placeholder:"Old Password",minLength:5,maxLength:20,required:!0,order:0})),r.push(new s.h({key:"password",type:"password",label:"New Password",value:e.password,placeholder:"Password",minLength:5,maxLength:20,required:!0,pattern:n.d.PASSWORD_REGEX,order:4})),r.push(new s.h({key:"cpassword",type:"password",label:"Confirm Password",placeholder:"Confirm Password",value:e.cpassword,minLength:5,maxLength:20,required:!0,order:5})),r.sort((function(e,t){return e.order-t.order}))}},{key:"ChangeUserTypeControls",value:function(e){var t=[],r=[],a=!0,i=!1,o=void 0;try{for(var l,c=n.b.USER_TYPES[Symbol.iterator]();!(a=(l=c.next()).done);a=!0){var u=l.value;r.push({key:u.value,value:u.title})}}catch(d){i=!0,o=d}finally{try{a||null==c.return||c.return()}finally{if(i)throw o}}return t.push(new s.b({key:"role_name",label:"Select Role",value:e.role_name,options:r,order:0})),t.sort((function(e,t){return e.order-t.order}))}}]),e}();return e.\u0275fac=function(t){return new(t||e)(a.ac(i.a))},e.\u0275prov=a.Ib({token:e,factory:e.\u0275fac}),e}()}}]);