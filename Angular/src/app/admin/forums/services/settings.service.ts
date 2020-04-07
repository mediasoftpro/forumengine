/* -------------------------------------------------------------------------- */
/*                           Product Name: ForumEngine                        */
/*                            Author: Mediasoftpro                            */
/*                       Email: support@mediasoftpro.com                      */
/*       License: Read license.txt located on root of your application.       */
/*                     Copyright 2007 - 2020 @Mediasoftpro                    */
/* -------------------------------------------------------------------------- */

import { Injectable } from "@angular/core";
import * as OPTIONS from "../forums.model";
import { iUploadOptions } from "../../core/core.model";
import { AppConfig } from "../../../configs/app.config";
import { CoreService } from "../../core/coreService";
import { ButtonCSS, ICONCSS, ThemeCSS } from "../../../configs/themeSettings";

@Injectable()
export class SettingsService {
  // configurations
  private apiOptions: OPTIONS.IAPIOptions;
  private uploadOptions: iUploadOptions;
  private toolbarOptions: any;
  private searchOptions: any;

  constructor(private coreService: CoreService, public config: AppConfig) {
    const APIURL = config.getConfig("host");
    this.apiOptions = {
      load: APIURL + "api/forum/load",
      getinfo: APIURL + "api/forum/getinfo",
      action: APIURL + "api/forum/action",
      proc: APIURL + "api/forum/proc"
    };

    this.init_toolbar_options();
    this.init_search_options();
  }

  init_search_options() {
    this.searchOptions = {
      showpanel: true, // show, hide whole panel
      showSearchPanel: true,
      showAdvanceSearchLink: true,
      term: "",
      topselectioncheck: true,
      navList: [],
      filters: [],
      dropdownFilters: [],
      checkFilters: [
        {
          id: 1,
          value: 2,
          group: "isenabled",
          caption: "Enable Status",
          attr: "isenabled",
          options: [
            {
              id: 4,
              title: "Active",
              value: 1
            },
            {
              id: 5,
              title: "Inactive",
              value: 0
            },
            {
              id: 6,
              title: "Any",
              value: 2
            }
          ]
        }
      ],
      categories: [],
      multiselectOptions: this.coreService.getMultiCategorySettings(),
      selectedcategory: "",
      singleaction: false,
      actions: [
        {
          id: 1,
          title: "Create Forum",
          tooltip: "Create new album",
          row: 1,
          icon: "icon-file-plus",
          options: {},
          css: "btn m-b-5 btn-block btn-success",
          event: "add"
        }
      ]
    };
  }

  init_toolbar_options() {
    this.toolbarOptions = {
      showtoolbar: true,
      showsecondarytoolbar: true,
      showcheckAll: false,
      navbarcss: ThemeCSS.NAVBAR_CSS,
      left_options: [],
      left_caption: "Filter:",
      right_caption: "",
      right_options: [],
      actions: []
    };
    this.toolbarOptions.left_options.push({
      title: "Status",
      ismultiple: true,
      icon: "", // icon-sort-amount-desc position-left
      Options: [
        {
          id: "1",
          title: "Show All",
          value: 0,
          isclick: true,
          clickevent: "f_reset",
          tooltip: "Show all items"
        },
        { id: "2", separator: true },
        {
          id: "5",
          title: "Enabled",
          value: 1,
          isclick: true,
          clickevent: "f_status",
          tooltip: "Load enabled media files"
        },
        {
          id: "6",
          title: "Disabled",
          value: 0,
          isclick: true,
          clickevent: "f_status",
          tooltip: "Load disabled media files"
        }
      ]
    });

    this.toolbarOptions.right_options.push({
      title: "Order",
      ismultiple: true,
      position: "right",
      icon: "icon-sort-by-order-alt position-left",
      Options: [
        {
          id: "0",
          title: "Date",
          value: "id",
          isclick: true,
          clickevent: "orderby",
          tooltip: "Recently added"
        },
        {
          id: "1",
          title: "Title",
          value: "title",
          isclick: true,
          clickevent: "orderby",
          tooltip: "Order by Title"
        },
        {
          id: "8",
          title: "Status",
          value: "isenabled",
          isclick: true,
          clickevent: "orderby",
          tooltip: "Order by Status"
        }
      ]
    });

    this.toolbarOptions.actions.push({
      title: "Mark As",
      ismultiple: true,
      icon: "",
      Options: [
        {
          id: "0",
          title: "Approve",
          value: 1,
          actionstatus: "approve",
          attr: "isapproved",
          isclick: true,
          clickevent: "m_markas",
          icon: "",
          css: ButtonCSS.SUCCESS_BUTTON,
          tooltip: "Approve selected records"
        },
        {
          id: "1",
          title: "Enable",
          value: 1,
          actionstatus: "enable",
          attr: "isenabled",
          isclick: true,
          clickevent: "m_markas",
          icon: "",
          css: ButtonCSS.SUCCESS_BUTTON,
          tooltip: "Enable selected records"
        },
        {
          id: "2",
          title: "Disable",
          value: 0,
          actionstatus: "disable",
          attr: "isenabled",
          isclick: true,
          clickevent: "m_markas",
          icon: "",
          css: ButtonCSS.SUCCESS_BUTTON,
          tooltip: "Disable selected records"
        },
        {
          id: "2",
          title: "Delete",
          value: 0,
          actionstatus: "delete",
          css: ButtonCSS.DANGER_BUTTON,
          attr: "",
          isclick: true,
          clickevent: "m_markas",
          icon: ICONCSS.DELETE_ICON,
          tooltip: "Delete selected records"
        }
      ]
    });
  }

  getApiOptions() {
    return this.apiOptions;
  }

  getUploadOptions() {
    return this.uploadOptions;
  }

  getToolbarOptions() {
    return this.toolbarOptions;
  }

  getSearchOptions() {
    return this.searchOptions;
  }
  getInitObject(): OPTIONS.ForumEntity {
    return {
      id: 0,
      categoryid: 0,
      title: "",
      description: "",
      isenabled: 1,
      priority: 0,
      categories: [],
      category_list: []
    };
  }
}
