/* -------------------------------------------------------------------------- */
/*                           Product Name: ForumEngine                        */
/*                            Author: Mediasoftpro                            */
/*                       Email: support@mediasoftpro.com                      */
/*       License: Read license.txt located on root of your application.       */
/*                     Copyright 2007 - 2020 @Mediasoftpro                    */
/* -------------------------------------------------------------------------- */

import { Component, OnInit, Input } from "@angular/core";
import { select } from "@angular-redux/store";
import { Observable } from "rxjs/Observable";

// services
import { SettingsService } from "../../services/settings.service";
import { DataService } from "../../services/data.service";

// shared services
import { CoreService } from "../../../../admin/core/coreService";
import { CoreAPIActions } from "../../../../reducers/core/actions";
import { fadeInAnimation } from "../../../../animations/core";
// reducer actions
import { ForumTopicsAPIActions } from "../../../../reducers/forumtopics/actions";
import { Router, ActivatedRoute } from "@angular/router";
import { PermissionService } from "../../../../admin/users/services/permission.service";

@Component({
  templateUrl: "./main.html",
  selector: "app-mainforum-list",
  animations: [fadeInAnimation],
  host: { "[@fadeInAnimation]": "" }
})
export class MainForumTopicsComponent implements OnInit {
  constructor(
    private settingService: SettingsService,
    private dataService: DataService,
    private coreActions: CoreAPIActions,
    public permission: PermissionService,
    private actions: ForumTopicsAPIActions,
    private router: Router,
    private route: ActivatedRoute,
    private coreService: CoreService
  ) {}

  @Input() isAdmin = true;
  @Input() route_path = "/forumtopics/";
  @Input() PublicView = false;
  @Input() type = 0;

  @select(["forumtopics", "filteroptions"])
  readonly filteroptions$: Observable<any>;

  @select(["forumtopics", "forums"])
  readonly forums$: Observable<any>;

  @select(["forumtopics", "itemsselected"])
  readonly isItemSelected$: Observable<any>;

  @select(["forumtopics", "isloaded"])
  readonly isloaded$: Observable<any>;

  @select(["forumtopics", "isforumsloaded"])
  readonly isforumsloaded$: Observable<any>;

  @select(["forumtopics", "records"])
  readonly records$: Observable<any>;

  @select(["forumtopics", "pagination"])
  readonly pagination$: Observable<any>;

  @select(["users", "auth"])
  readonly auth$: Observable<any>;

  // permission logic
  isAccessGranted = false; // Granc access on resource that can be full access or read only access with no action rights
  isActionGranded = false; // Grand action on resources like add / edit /delete

  heading = "Forums Topic";
  subheading = "Management";
  SearchOptions: any;
  ToolbarOptions: any;

  SelectedItems: any; // selected items in list by check / uncheck options
  isItemsSelected = false; // check the isenabled of items there or not
  FilterOptions: any; // local copy of observable query filters
  IsLoaded = false;
  Records = 0;
  Pagination: any = {};

  showReportLink = false;
  ngOnInit() {
    // user authentication & access right management
    // full resource access key and readonly key can be generated via roles management
    if (this.isAdmin) {
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
    } else {
      this.isAccessGranted = true;
      this.isActionGranded = true;
    }

    this.SearchOptions = this.settingService.getSearchOptions(this.isAdmin);
    this.ToolbarOptions = this.settingService.getToolbarOptions(this.isAdmin);

    this.filteroptions$.subscribe(options => {
      this.FilterOptions = options;
      if (options.track_filter) {
        this.loadRecords(this.FilterOptions);
        // reset track filter to false again
        options.track_filter = false;
        this.actions.updateFilterOptions(options);
      }
    });

    this.records$.subscribe(records => {
      this.Records = records;
    });

    this.pagination$.subscribe(pagination => {
      this.Pagination = pagination;
    });

    this.isforumsloaded$.subscribe((isforumsloaded: boolean) => {
      if (!isforumsloaded) {
        this.dataService.loadForumsRecords();
      }
    });

    this.isItemSelected$.subscribe((selectedItems: boolean) => {
      this.isItemsSelected = selectedItems;
    });

    this.forums$.subscribe(forums => {
      this.SearchOptions.multiselectOptions.placeholder = "Select Forum";
      for (const category of forums) {
        this.SearchOptions.categories.push({
          key: category.id,
          value: category.title
        });
      }
    });

    this.route.params.subscribe(params => {
      // this.Params = params;
      if (params["tagname"] !== undefined) {
        console.log("tag filter initiated");
        this.FilterOptions.tags = params["tagname"];
        this.FilterOptions.track_filter = true; // to force triggering load event via obvervable subscription
        this.actions.updateFilterOptions(this.FilterOptions);
      }

      if (params["uname"] !== undefined) {
        console.log("user filter initiated");
        console.log(params["uname"]);
        this.FilterOptions.username = params["uname"];
        this.FilterOptions.track_filter = true; // to force triggering load event via obvervable subscription
        this.actions.updateFilterOptions(this.FilterOptions);
      }

      if (params["id"] !== undefined) {
        this.FilterOptions.id = params["id"];
        this.FilterOptions.track_filter = true; // to force triggering load event via obvervable subscription
        this.actions.updateFilterOptions(this.FilterOptions);
      }

      if (params["abuse"] !== undefined) {
        if (params["abuse"] === "abuse") {
          this.FilterOptions.loadabusereports = true;
          this.showReportLink = true;
        } else if (params["abuse"] === "normallist") {
          this.FilterOptions.loadabusereports = false;
          this.showReportLink = false;
        }
        this.FilterOptions.track_filter = true; // to force triggering load event via obvervable subscription
        this.actions.updateFilterOptions(this.FilterOptions);
      }
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
  }

  loadRecords(options: any) {
    // render abuse report button with action
    this.coreService.renderAbuseReportBtn(
      this.SearchOptions.actions,
      options.loadabusereports
    );

    if (this.PublicView) {
      options.ispublic = true;
    }
    this.dataService.LoadRecords(options);
  }

  selectAll(selectall: boolean) {
    this.actions.selectAll(selectall);
  }

  /* toolbar actions */
  toolbaraction(selection: any) {
    switch (selection.action) {
      case "view":
        this.router.navigate([this.route_path + "profile/0"]);
        return;
      case "add":
        this.router.navigate([this.route_path + "process/0"]);
        return;
      case "abuse":
        this.router.navigate([this.route_path + "filter/abuse"]);
        return;
      case "normallist":
        this.router.navigate([this.route_path + "filter/normallist"]);
        return;
      case "reports":
        this.router.navigate([this.route_path + "reports"]);
        return;
      case "m_markas":
        this.ProcessActions(selection.value);
        return;
      case "f_type":
        this.actions.applyFilter({ attr: "type", value: selection.value });
        break;
      case "f_isapproved":
        this.actions.applyFilter({
          attr: "isapproved",
          value: selection.value
        });
        break;
      case "f_status":
        this.actions.applyFilter({ attr: "isenabled", value: selection.value });
        break;
      case "f_adult":
        this.actions.applyFilter({ attr: "isadult", value: selection.value });
        break;
      case "pagesize":
        this.actions.applyFilter({ attr: "pagesize", value: selection.value });
        break;
      case "m_filter":
        this.actions.applyFilter({
          attr: "datefilter",
          value: selection.value
        });
        break;
      case "sort":
        this.actions.applyFilter({ attr: "direction", value: selection.value });
        break;
    }
  }

  /* find records event trigger */
  FindRecords(filters: any) {
    const _filterOptions = filters.filters;
    // reset some attributes if search / find record is used to avoid any confusion in search listing
    _filterOptions.tags = "";
    _filterOptions.userid = "";
    _filterOptions.pagenumber = 1;
    _filterOptions.track_filter = true; // to force triggering load event via obvervable subscription
    this.actions.updateFilterOptions(_filterOptions);
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
