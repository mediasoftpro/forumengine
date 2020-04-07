(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{"7NWl":function(e,t,s){"use strict";s.d(t,"a",(function(){return l}));var r=s("fXoL"),o=s("zwrK"),i=s("tk/3"),n=s("5zJ1"),a=s("LEd3");let l=(()=>{class e{constructor(e,t,s,r){this.settings=e,this.http=t,this.actions=s,this.coreActions=r}LoadRecords(e){const t=this.settings.getApiOptions().load;this.actions.loadStarted(),this.http.post(t,JSON.stringify(e)).subscribe(t=>{this.actions.loadSucceeded(t),t.categories.length>0&&this.actions.updateCategories(t.categories),this.coreActions.refreshListStats({totalrecords:t.records,pagesize:e.pagesize,pagenumber:e.pagenumber})},e=>{this.actions.loadFailed(e)})}AddRecord(e){let t="";switch(e.viewType){case 1:case 2:t=this.settings.getApiOptions().proc;break;case 3:t=this.settings.getApiOptions().cemail;break;case 4:t=this.settings.getApiOptions().chpass;break;case 5:t=this.settings.getApiOptions().ctype}return 2===e.viewType?(e.settings.userid=e.id,e.account.userid=e.id,this.http.post(t,JSON.stringify({id:e.id,firstname:e.firstname,lastname:e.lastname,attr_values:e.attr_values,settings:e.settings,account:e.account}))):this.http.post(t,JSON.stringify(e))}UpdateThumb(e,t){const s=this.settings.getApiOptions().updatethumb,r={};r.Id=e.id;for(const o of t)r.picturename=o.fname;this.http.post(s,JSON.stringify(r)).subscribe(e=>{"error"===e.status?this.coreActions.Notify({title:e.message,text:"",css:"bg-danger"}):(this.actions.UpdateThumb(e.record),this.coreActions.Notify({title:"Profile Photo Updated",text:"",css:"bg-success"}))},e=>{this.coreActions.Notify({title:e,text:"",css:"bg-danger"})})}UpdateAvator(e){const t=this.settings.getApiOptions().updateavator;this.http.post(t,JSON.stringify(e)).subscribe(e=>{"error"===e.status?this.coreActions.Notify({title:e.message,text:"",css:"bg-danger"}):(this.actions.UpdateThumb(e.record),this.coreActions.Notify({title:"Avator Updated Successfully",text:"",css:"bg-success"}))},e=>{this.coreActions.Notify({title:e,text:"",css:"bg-danger"})})}GetInfo(e){const t=this.settings.getApiOptions().getinfo;return this.http.post(t,JSON.stringify({id:e}))}LoadReports(e){return this.http.post(this.settings.getApiOptions().load_reports,JSON.stringify(e))}Authenticate(e){const t=this.settings.getApiOptions().authenticate;return this.http.post(t,JSON.stringify(e))}UpdateRole(e){const t=this.settings.getApiOptions().updaterole;return this.http.post(t,JSON.stringify(e))}GetUserLog(e){const t=this.settings.getApiOptions().userlog;return this.http.post(t,JSON.stringify({userid:e}))}DeleteAccount(e){const t=this.settings.getApiOptions().archive;return this.http.post(t,JSON.stringify(e))}DeleteRecord(e,t){e.actionstatus="delete";const s=[];s.push(e),this.ProcessActions(s,"delete")}ProcessActions(e,t){this.actions.applyChanges({SelectedItems:e,isenabled:t});const s=[];for(const r of e)s.push({id:r.id,actionstatus:r.actionstatus});this.http.post(this.settings.getApiOptions().action,JSON.stringify(s)).subscribe(e=>{let s="Operation Performed";"delete"===t&&(s="Record Removed"),this.coreActions.Notify({title:s,text:"",css:"bg-success"})},e=>{this.coreActions.Notify({title:"Error Occured",text:"",css:"bg-danger"})})}ProcessLogActions(e,t){this.coreActions.Notify({title:"Feature not yet implemented",text:"",css:"bg-success"})}}return e.\u0275fac=function(t){return new(t||e)(r.ac(o.a),r.ac(i.b),r.ac(n.a),r.ac(a.a))},e.\u0275prov=r.Ib({token:e,factory:e.\u0275fac}),e})()},pz8m:function(e,t,s){"use strict";s.d(t,"a",(function(){return a}));var r=s("dNLF"),o=s("/4iV"),i=s("fXoL"),n=s("nD3/");let a=(()=>{class e{constructor(e){this.coreService=e}getControls(e,t,s=!0){switch(t){case 1:return this.CreateAccountControls(e);case 2:return this.EditProfileControls(e,s);case 3:return this.ChangeEmailControls(e,s);case 4:return this.ChangePasswordControls(e,s);case 5:return this.ChangeUserTypeControls(e)}return this.CreateAccountControls(e)}CreateAccountControls(e){const t=[],s=[];for(const r of o.b.USER_TYPES)s.push({key:r.value,value:r.title});return t.push(new r.b({key:"role_name",label:"Select Role",value:e.role_name.toString(),options:s,order:0})),t.push(new r.h({key:"firstname",label:"",value:e.firstname,placeholder:"First Name",minLength:3,maxLength:50,order:1})),t.push(new r.h({key:"lastname",label:"",value:e.lastname,placeholder:"Last Name",minLength:3,maxLength:50,order:2})),t.push(new r.h({key:"username",label:"",value:e.username,placeholder:"User Name",minLength:5,maxLength:15,required:!0,pattern:o.d.USERNAME_REGEX,order:3})),t.push(new r.h({key:"password",type:"password",label:"",value:e.password,placeholder:"Password",minLength:5,maxLength:20,required:!0,pattern:o.d.PASSWORD_REGEX,order:4})),t.push(new r.h({key:"cpassword",type:"password",label:"",placeholder:"Confirm Password",value:e.cpassword,minLength:5,maxLength:20,required:!0,order:5})),t.push(new r.h({key:"email",label:"",placeholder:"Email",value:e.email,required:!0,email:!0,order:6})),t.sort((e,t)=>e.order-t.order)}getLoginControls(e){const t=[];return t.push(new r.h({key:"username",label:"",value:e.username,placeholder:"User Name",required:!0,minLength:5,maxLength:20,order:1})),t.push(new r.h({key:"password",type:"password",label:"",value:e.password,placeholder:"Password",required:!0,minLength:5,maxLength:20,order:2})),t.push(new r.a({key:"rememberme",label:"Remember Me",value:e.rememberme,checked:e.rememberme,required:!0,order:3})),t.sort((e,t)=>e.order-t.order)}EditProfileControls(e,t=!0){const s=[];s.push(new r.h({key:"firstname",label:"First Name",value:e.firstname,placeholder:"First Name",minLength:3,maxLength:50,order:0})),s.push(new r.h({key:"lastname",label:"Last Name",value:e.lastname,placeholder:"Last Name",minLength:3,maxLength:50,order:1}));let o=!1;if(""!==e.id&&(o=!0),this.coreService.renderDynamicControls(s,e.options,o),t){s.push(new r.f({key:"config_section_01",label:"Settings",order:1001}));let t=!1;1===e.settings.isemail&&(t=!0),s.push(new r.a({key:"isemail",label:"Receiving Emails",value:e.settings.isemail,checked:t,helpblock:"Toggle on | off receiving emails",order:1002}));let o=!1;1===e.settings.issendmessages&&(o=!0),s.push(new r.a({key:"issendmessages",label:"Receiving Messages",value:e.settings.issendmessages,checked:o,helpblock:"Toggle on | off receiving internal messages within website",order:1003})),s.push(new r.f({key:"config_section_01",label:"Account",order:1004})),s.push(new r.h({key:"credits",label:"Credits",value:e.account.credits.toString(),colsize:"col-md-12",pattern:"[0-9]+",required:!0,helpblock:"Update user account credits manually",order:1005}));let i=!1;1===e.account.islifetimerenewal&&(i=!0),s.push(new r.a({key:"islifetimerenewal",label:"Lifetime Renewal",value:e.account.islifetimerenewal,checked:i,helpblock:"Toggle on | off enforcing lifetime renewal (paid) account",order:1006}))}return s.sort((e,t)=>e.order-t.order)}ChangeEmailControls(e,t=!0){const s=[];return s.push(new r.h({key:"email",label:"Email Address",placeholder:"Email",value:e.email,required:!0,email:!0,order:0})),t||s.push(new r.h({key:"password",type:"password",pattern:o.d.PASSWORD_REGEX,label:"",placeholder:"Password",value:e.password,minLength:5,maxLength:20,required:!0,order:1})),s.sort((e,t)=>e.order-t.order)}ChangePasswordControls(e,t=!0){const s=[];return t||s.push(new r.h({key:"opassword",type:"password",label:"Current Password",value:e.opassword,placeholder:"Old Password",minLength:5,maxLength:20,required:!0,order:0})),s.push(new r.h({key:"password",type:"password",label:"New Password",value:e.password,placeholder:"Password",minLength:5,maxLength:20,required:!0,pattern:o.d.PASSWORD_REGEX,order:4})),s.push(new r.h({key:"cpassword",type:"password",label:"Confirm Password",placeholder:"Confirm Password",value:e.cpassword,minLength:5,maxLength:20,required:!0,order:5})),s.sort((e,t)=>e.order-t.order)}ChangeUserTypeControls(e){const t=[],s=[];for(const r of o.b.USER_TYPES)s.push({key:r.value,value:r.title});return t.push(new r.b({key:"role_name",label:"Select Role",value:e.role_name,options:s,order:0})),t.sort((e,t)=>e.order-t.order)}}return e.\u0275fac=function(t){return new(t||e)(i.ac(n.a))},e.\u0275prov=i.Ib({token:e,factory:e.\u0275fac}),e})()}}]);