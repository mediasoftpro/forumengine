/* -------------------------------------------------------------------------- */
/*                           Product Name: ForumEngine                        */
/*                            Author: Mediasoftpro                            */
/*                       Email: support@mediasoftpro.com                      */
/*       License: Read license.txt located on root of your application.       */
/*                     Copyright 2007 - 2020 @Mediasoftpro                    */
/* -------------------------------------------------------------------------- */

import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { select } from "@angular-redux/store";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";

// services
import { SettingsService } from "./services/settings.service";
import { DataService } from "./services/data.service";

// shared services
import { CoreAPIActions } from "../../reducers/core/actions";
import { fadeInAnimation } from "../../animations/core";
// reducer actions
import { ForumsAPIActions } from "../../reducers/forums/actions";
import { PermissionService } from "../../admin/users/services/permission.service";

@Component({
  templateUrl: "./forums.html",
  encapsulation: ViewEncapsulation.None,
  animations: [fadeInAnimation],
  host: { "[@fadeInAnimation]": "" }
})
export class ForumsComponent implements OnInit {
  constructor(
    private settingService: SettingsService,
    private dataService: DataService,
    private coreActions: CoreAPIActions,
    private actions: ForumsAPIActions,
    public permission: PermissionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  @select(["forums", "filteroptions"])
  readonly filteroptions$: Observable<any>;

  @select(["forums", "categories"])
  readonly categories$: Observable<any>;

  @select(["forums", "itemsselected"])
  readonly isItemSelected$: Observable<any>;

  @select(["forums", "isloaded"])
  readonly isloaded$: Observable<any>;

  @select(["forums", "records"])
  readonly records$: Observable<any>;

  @select(["forums", "pagination"])
  readonly pagination$: Observable<any>;

  @select(["users", "auth"])
  readonly auth$: Observable<any>;

  // permission logic
  isAccessGranted = false; // Granc access on resource that can be full access or read only access with no action rights
  isActionGranded = false; // Grand action on resources like add / edit /delete

  heading = "Forums";
  subheading = "Management";
  SearchOptions: any;
  ToolbarOptions: any;
  IsLoaded = false;
  SelectedItems: any; // selected items in list by check / uncheck options
  isItemsSelected = false; // check the isenabled of items there or not
  FilterOptions: any; // local copy of observable query filters
  Records = 0;
  Pagination: any = {};
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

    this.SearchOptions = this.settingService.getSearchOptions();
    this.ToolbarOptions = this.settingService.getToolbarOptions();

    this.filteroptions$.subscribe(options => {
      this.FilterOptions = options;
      if (options.track_filter) {
        this.loadRecords(this.FilterOptions);
        // reset track filter to false again
        options.track_filter = false;
        this.actions.updateFilterOptions(options);
      }
    });
    this.isItemSelected$.subscribe((selectedItems: boolean) => {
      this.isItemsSelected = selectedItems;
    });

    this.records$.subscribe(records => {
      this.Records = records;
    });

    this.pagination$.subscribe(pagination => {
      this.Pagination = pagination;
    });

    this.isloaded$.subscribe((loaded: boolean) => {
      this.IsLoaded = loaded;
      if (!this.IsLoaded) {
        this.loadRecords(this.FilterOptions);
      } else {
        // loaded data from reducer store (cache)
        // update pagination (records & pagesize on load)
        this.refreshStats();
      }
    });
    this.categories$.subscribe(categories => {
      for (const category of categories) {
        this.SearchOptions.categories.push({
          key: category.id,
          value: category.title
        });
      }
    });

    this.route.params.subscribe(params => {
      if (params["catname"] !== undefined) {
        this.FilterOptions.forumid = params["catname"];
        this.FilterOptions.track_filter = true; // to force triggering load event via obvervable subscription
        this.actions.updateFilterOptions(this.FilterOptions);
      }
    });
  }
  selectAll(selectall: boolean) {
    this.actions.selectAll(selectall);
  }

  loadRecords(options: any) {
    this.dataService.LoadRecords(options);
  }

  /* toolbar actions */
  toolbaraction(selection: any) {
    switch (selection.action) {
      case "add":
        this.AddRecord();
        return;
      case "m_markas":
        this.ProcessActions(selection.value);
        return;
      case "f_status":
        this.actions.applyFilter({ attr: "isenabled", value: selection.value });
        break;
      case "pagesize":
        this.actions.applyFilter({ attr: "pagesize", value: selection.value });
        break;
    }
  }

  /* find records event trigger */
  FindRecords(filters: any) {
    const _filterOptions = filters.filters;
    // reset some attributes if search / find record is used to avoid any confusion in search listing
    _filterOptions.pagenumber = 1;
    _filterOptions.track_filter = true; // to force triggering load event via obvervable subscription
    if (
      _filterOptions.categoryname !== null &&
      _filterOptions.categoryname !== ""
    )
      _filterOptions.forumid = _filterOptions.categoryname;
    this.actions.updateFilterOptions(_filterOptions);
  }

  AddRecord() {
    this.router.navigate(["/forums/process/0"]);
  }

  getSelectedItems(arr: any) {
    this.SelectedItems = arr;
    if (this.SelectedItems.length > 0) {
      this.isItemsSelected = true;
    } else {
      this.isItemsSelected = false;
    }
  }

  ProcessActions(selection: any) {
    if (!this.isActionGranded) {
      this.coreActions.Notify({
        title: "Permission Denied",
        text: "",
        css: "bg-danger"
      });
      return;
    }
    if (this.SelectedItems.length > 0) {
      for (const item of this.SelectedItems) {
        item.actionstatus = selection.actionstatus;
      }
      this.dataService.ProcessActions(this.SelectedItems, selection);
    }
  }

  refreshStats() {
    this.actions.refresh_pagination({
      type: 0,
      totalrecords: this.Records,
      pagesize: this.FilterOptions.pagesize
    });
    // refresh list states
    this.coreActions.refreshListStats({
      totalrecords: this.Records,
      pagesize: this.FilterOptions.pagesize,
      pagenumber: this.Pagination.currentPage
    });
  }
}
