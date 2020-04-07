/* -------------------------------------------------------------------------- */
/*                           Product Name: ForumEngine                        */
/*                            Author: Mediasoftpro                            */
/*                       Email: support@mediasoftpro.com                      */
/*       License: Read license.txt located on root of your application.       */
/*                     Copyright 2007 - 2020 @Mediasoftpro                    */
/* -------------------------------------------------------------------------- */

import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { select } from "@angular-redux/store";
import { Observable } from "rxjs/Observable";

// services
import { SettingsService } from "../services/settings.service";
import { DataService } from "../services/data.service";
import { FormService } from "../services/form.service";

// shared services
import { CoreService } from "../../core/coreService";
import { CoreAPIActions } from "../../../reducers/core/actions";

// reducer actions
import { ForumsAPIActions } from "../../../reducers/forums/actions";
import { fadeInAnimation } from "../../../animations/core";

import { PermissionService } from "../../../admin/users/services/permission.service";

@Component({
  templateUrl: "./process.html",
  encapsulation: ViewEncapsulation.None,
  animations: [fadeInAnimation]
})
export class ForumProcessComponent implements OnInit {
  constructor(
    private settingService: SettingsService,
    private dataService: DataService,
    private coreService: CoreService,
    private coreActions: CoreAPIActions,
    private actions: ForumsAPIActions,
    private route: ActivatedRoute,
    private formService: FormService,
    private permission: PermissionService,
    private router: Router
  ) {}

  RecordID = 0;
  SearchOptions: any;
  controls: any = [];
  showLoader = false;
  formHeading = "Add Forum";
  submitText = "Submit";
  Info: any;
  IsLoaded = false;
  Categories: any = [];

  @select(["forums", "categories"])
  readonly categories$: Observable<any>;

  @select(["forums", "isloaded"])
  readonly isloaded$: Observable<any>;

  @select(["users", "auth"])
  readonly auth$: Observable<any>;

  // permission logic
  isAccessGranted = false; // Granc access on resource that can be full access or read only access with no action rights
  isActionGranded = false; // Grand action on resources like add / edit /delete

  ngOnInit() {
    // user authentication & access right management
    // full resource access key and readonly key can be generated via roles management
    this.auth$.subscribe((auth: any) => {
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
    });
    this.isloaded$.subscribe((loaded: boolean) => {
      this.IsLoaded = loaded;

      if (!this.IsLoaded) {
        this.router.navigate(["/forums/"]);
      }
    });

    // fetch param from url
    this.route.params.subscribe(params => {
      this.RecordID = Number.parseInt(params["id"], 10);

      if (isNaN(this.RecordID)) {
        this.RecordID = 0;
      }

      if (this.RecordID > 0) {
        this.formHeading = "Update Topic";
        this.submitText = "Update";
        this.LoadInfo();
      } else {
        // initialize controls with default values
        this.initializeControls(this.settingService.getInitObject());
      }
    });
    this.categories$.subscribe((categories: any) => {
      this.Categories = categories;
      this.updateCategories();
    });
  }

  
  LoadInfo() {
    this.showLoader = true;
    this.dataService.GetInfo(this.RecordID).subscribe((data: any) => {
      if (data.status === "success") {
        // update post
        this.initializeControls(data.post);
      } else {
        this.coreActions.Notify({
          title: data.message,
          text: "",
          css: "bg-error"
        });
        this.initializeControls(this.settingService.getInitObject());
      }
      this.showLoader = false;
    });
  }

  updateCategories() {
    this.coreService.updateCategories(this.controls, this.Categories);
  }
  initializeControls(data: any) {
    this.controls = this.formService.getControls(data);
    this.updateCategories();
  }

  SubmitForm(payload) {
    if (!this.isActionGranded) {
      this.coreActions.Notify({
        title: "Permission Denied",
        text: "",
        css: "bg-danger"
      });
      return;
    }
    this.showLoader = true;
    let _status = "Added";
    if (this.RecordID > 0) {
      payload.id = this.RecordID;
      _status = "Updated";
    }
    payload.categories = this.coreService.returnSelectedCategoryArray(
      payload.categories
    );
    this.dataService.AddRecord(payload).subscribe(
      (data: any) => {
        if (data.status === "error") {
          this.coreActions.Notify({
            title: data.message,
            text: "",
            css: "bg-error"
          });
        } else {
          this.coreActions.Notify({
            title: "Record " + _status + " Successfully",
            text: "",
            css: "bg-success"
          });

          // enable reload action to refresh data
          this.actions.reloadList();

          // redirect
          this.router.navigate(["/forums/"]);
        }
        this.showLoader = false;
      },
      err => {
        this.showLoader = false;
        this.coreActions.Notify({
          title: "Error Occured",
          text: "",
          css: "bg-danger"
        });
      }
    );
  }
}
