/* -------------------------------------------------------------------------- */
/*                           Product Name: ForumEngine                        */
/*                      Author: Mediasoftpro (Muhammad Irfan)                 */
/*                       Email: support@mediasoftpro.com                      */
/*       License: Read license.txt located on root of your application.       */
/*                     Copyright 2007 - 2020 @Mediasoftpro                    */
/* -------------------------------------------------------------------------- */

import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { IAppState } from "../../../../reducers/store/model";

// services
import { SettingsService } from "../../services/settings.service";
import { DataService } from "../../services/data.service";
import { FormService } from "../../services/form.service";

// shared services
import { CoreService } from "../../../../admin/core/coreService";

// reducer actions
import * as selectors from "../../../../reducers/forumtopics/selectors";
import {
  reloadList
} from "../../../../reducers/forumtopics/actions";

import { Notify } from "../../../../reducers/core/actions";
import { auth } from "../../../../reducers/users/selectors";
import * as configSelectors from "../../../../reducers/configs/selectors";

import { fadeInAnimation } from "../../../../animations/core";
import { PermissionService } from "../../../../admin/users/services/permission.service";

@Component({
  templateUrl: "./process.html",
  selector: "app-forumtopic-process",
  animations: [fadeInAnimation]
})
export class ForumTopicsProcComponent implements OnInit {
  constructor(
    private _store: Store<IAppState>,
    private settingService: SettingsService,
    private dataService: DataService,
    private coreService: CoreService,
    private route: ActivatedRoute,
    private formService: FormService,
    private permission: PermissionService,
    private router: Router
  ) {}

  @Input() isAdmin = true;
  @Input() route_path = '/forumtopics/';

  
  readonly categories$ = this._store.pipe(select(selectors.categories));
  readonly forums$ = this._store.pipe(select(selectors.forums));
  readonly settings$ = this._store.pipe(select(selectors.settings));
  readonly isloaded$ = this._store.pipe(select(selectors.isloaded));
  readonly auth$ = this._store.pipe(select(auth));
  readonly configs$ = this._store.pipe(select(configSelectors.configs));

  // permission logic
  isAccessGranted = false; // Granc access on resource that can be full access or read only access with no action rights
  isActionGranded = false; // Grand action on resources like add / edit /delete

  RecordID = 0;
  SearchOptions: any;
  controls: any = [];
  showLoader = false;
  formHeading = "Add Topic";
  submitText = "Submit";
  Info: any;
  IsLoaded = false;
  Forums: any = [];
  Auth: any = {};
 

  ngOnInit() {
    // user authentication & access right management
    // full resource access key and readonly key can be generated via roles management
    this.auth$.subscribe((auth: any) => {
      this.Auth = auth;
      if (this.isAdmin) {
        const FullAccessID = "1521395897976";
        const ReadOnlyAccessID = "1521395939384";
        if (
          this.permission.GrandResourceAccess(
            false,
            FullAccessID,
            ReadOnlyAccessID,
            auth.Role
          )
        ) {
          this.isAccessGranted = true;
          if (this.permission.GrandResourceAction(FullAccessID, auth.Role)) {
            this.isActionGranded = true;
          }
        }
      } else {
        this.isAccessGranted = true;
        this.isActionGranded = true;
      }
     
    });
    // fetch param from url
    this.route.params.subscribe(params => {
      this.RecordID = this.coreService.decrypt(params["id"]);

      if (isNaN(this.RecordID)) {
        this.RecordID = 0;
      }
      if (this.RecordID > 0) {
        this.formHeading = "Update Information";
        this.submitText = "Save Changes";
        this.Initialize();
      } else {
        // initialize controls with default values
        this.initializeControls(this.settingService.getInitObject());
      }
    });

    this.forums$.subscribe((forums: any) => {
      this.Forums = forums;
      this.updateForums();
    });

    this.isloaded$.subscribe((loaded: boolean) => {
      this.IsLoaded = loaded;
      if (!this.IsLoaded) {
        this.Redirect();
      }
    });
  }

  Initialize() {
    if (this.RecordID > 0) {
      if (!this.isAdmin) {
        // check whether current user is author of existing video before allowing edit
        this.dataService
          .Authorize_Author({
            id: this.RecordID,
            userid: this.Auth.User.id
          })
          .subscribe(
            (authorize: any) => {
              if (authorize.isaccess) {
                // load info
                this.LoadInfo();
              } else {
                this.Redirect();
              }
            },
            err => {
              this.Redirect();
            }
          );
      } else {
        // admin access
        // skip authorization
        this.LoadInfo();
      }
    } else {
      this.Redirect();
    }
  }

  Redirect() {
    this.router.navigate([this.route_path]);
  }

  LoadInfo() {
    this.showLoader = true;
    this.dataService.GetInfo(this.RecordID).subscribe((data: any) => {
      if (data.status === "success") {
        // update post
        this.initializeControls(data.post);
      } else {
         this._store.dispatch(new Notify({
          title: data.message,
          text: "",
          css: "bg-danger"
        }));
        this.initializeControls(this.settingService.getInitObject());
      }
      this.showLoader = false;
    });
  }

  updateForums() {
    if (this.controls !== undefined) {
      if (this.controls.length > 0) {
        
        for (const control of this.controls) {
          if (control.key === "forumid") {
            for (const forum of this.Forums) {
              control.options.push({
                key: forum.id,
                value: forum.title
              });
            }
          }
        }
      }
    }
  }

  initializeControls(data: any) {
    this.controls = this.formService.getControls(data);
    this.updateForums();
  }

  SubmitForm(payload) {
    if (!this.isActionGranded) {
     this._store.dispatch(new Notify({
        title: "Permission Denied",
        text: "",
        css: "bg-danger"
      }));
      return;
    }
    this.showLoader = true;
    let _status = "Added";
    if (this.RecordID > 0) {
      payload.id = this.RecordID;
      _status = "Updated";
    }
   
    payload.userid = this.Auth.User.id;
    payload.isadmin = this.isAdmin;

    //console.log(payload);

    this.dataService.AddRecord(payload).subscribe(
      (data: any) => {
        if (data.status === "error") {
           this._store.dispatch(new Notify({
          title: data.message,
          text: "",
          css: "bg-danger"
        }));
        } else {
         this._store.dispatch(new Notify({
            title: "Record " + _status + " Successfully",
            text: "",
            css: "bg-success"
          }));

          // enable reload action to refresh data
            this._store.dispatch(new reloadList({}));

          if (this.isAdmin) {
            this.router.navigate([this.route_path]);
          } else {
            this.router.navigate([this.route_path + "profile/" + this.coreService.encrypt(data.record.id)]);
          }
         
        }
        this.showLoader = false;
      },
      err => {
        this.showLoader = false;
         this._store.dispatch(new Notify({
          title: "Error Occured",
          text: "",
          css: "bg-danger"
        }));
      }
    );
  }
}
