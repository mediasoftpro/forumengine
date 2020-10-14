/* -------------------------------------------------------------------------- */
/*                           Product Name: ForumEngine                        */
/*                      Author: Mediasoftpro (Muhammad Irfan)                 */
/*                       Email: support@mediasoftpro.com                      */
/*       License: Read license.txt located on root of your application.       */
/*                     Copyright 2007 - 2020 @Mediasoftpro                    */
/* -------------------------------------------------------------------------- */

import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { IAppState } from "../../../reducers/store/model";

// services
import { SettingsService } from "../../../shared/forumtopics/services/settings.service";
import { DataService } from "../../../shared/forumtopics/services/data.service";
import { FormService } from "../../../shared/forumtopics/services/form.service";

// shared services
import { CoreService } from "../../core/coreService";

// reducer actions
import { auth } from "../../../reducers/users/selectors";
import { Notify } from "../../../reducers/core/actions";
import { fadeInAnimation } from "../../../animations/core";

import { PermissionService } from "../../../admin/users/services/permission.service";

@Component({
  templateUrl: "./process.html",
  encapsulation: ViewEncapsulation.None,
  animations: [fadeInAnimation],
  host: { "[@fadeInAnimation]": "" }
})
export class ForumTopicsProfileComponent implements OnInit {
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

  ToolbarOptions: any;
  ToolbarLogOptions: any;
  isItemsSelected = true;
  RecordID = 0;
  SearchOptions: any;
  FilterOptions: any = {};
  controls: any = [];
  showLoader = false;
  formHeading = "Blog Detail";
  submitText = "Submit";
  Info: any = {};
  uploadedFiles = [];
  SelectedItems: any = [];
  Author_FullName = "";

  readonly auth$ = this._store.pipe(select(auth));

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
    // this.SearchOptions = this.settingService.getSearchOptionsProfile();
    this.ToolbarOptions = this.settingService.getToolbarOptions(true);
    this.ToolbarOptions.showtoolbar = false;
    this.ToolbarOptions.showcheckAll = false;
    this.ToolbarOptions.showsecondarytoolbar = true;
    this.ToolbarOptions.ProfileView = true;

    // fetch param from url
    this.route.params.subscribe(params => {
      this.RecordID = this.coreService.decrypt(params["id"]);
      if (isNaN(this.RecordID)) {
        this.RecordID = 0;
      }
      if (this.RecordID > 0) {
        this.LoadInfo();
      }
    });
  }

  LoadInfo() {
    this.showLoader = true;
    this.dataService.GetInfo(this.RecordID).subscribe((data: any) => {
      if (data.status === "error") {
        this._store.dispatch(new Notify({
          title: data.message,
          text: "",
          css: "bg-success"
        }));
        // redirect to main page
        this.router.navigate(["/forumtopics"]);
      } else {
        this.Info = data.posts;
        this.SelectedItems = []; // reset
        for (const post of this.Info) {
          this.SelectedItems.push(post);
        }
      }
      this.showLoader = false;
    });
  }

  toolbaraction(selection: any) {
    switch (selection.action) {
      case "m_markas":
        this.ProcessActions(selection.value);
        break;
      case "add":
        this.router.navigate(["/forumtopics/process/0"]);
        return;
      case "edit":
        this.router.navigate(["/forumtopics/process/" + this.Info.id]);
        return;
    }
  }

  ProcessActions(selection: any) {
    if (!this.isActionGranded) {
     this._store.dispatch(new Notify({
        title: "Permission Denied",
        text: "",
        css: "bg-danger"
      }));
      return;
    }
    if (this.SelectedItems.length > 0) {
      for (const item of this.SelectedItems) {
        item.actionstatus = selection.actionstatus;
      }
      this.dataService.ProcessActions(this.SelectedItems, selection);
      if (selection.actionstatus === "delete") {
        this.router.navigate(["/forumtopics/"]);
      }
    }
  }
}
