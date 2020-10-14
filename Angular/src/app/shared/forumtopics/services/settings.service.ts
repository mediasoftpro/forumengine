/* -------------------------------------------------------------------------- */
/*                           Product Name: ForumEngine                        */
/*                      Author: Mediasoftpro (Muhammad Irfan)                 */
/*                       Email: support@mediasoftpro.com                      */
/*       License: Read license.txt located on root of your application.       */
/*                     Copyright 2007 - 2020 @Mediasoftpro                    */
/* -------------------------------------------------------------------------- */

import { Injectable } from "@angular/core";
import * as OPTIONS from "../forums.model";
import { AppConfig } from "../../../configs/app.config";
import { CoreService } from "../../../admin/core/coreService";
import { ButtonCSS, ICONCSS, ThemeCSS } from "../../../configs/themeSettings";

@Injectable()
export class SettingsService {
  // configurations
  private apiOptions: OPTIONS.IAPIOptions;

  constructor(private coreService: CoreService, public config: AppConfig) {
    const APIURL = config.getConfig("host");

    this.apiOptions = {
      load: APIURL + "api/forumtopics/load",
      load_reports: APIURL + "api/forumtopics/load_reports",
      generate_report: APIURL + "api/forumtopics/generate_report",
      getinfo: APIURL + "api/forumtopics/getinfo",
      action: APIURL + "api/forumtopics/action",
      getforum: APIURL + "api/forum/quickload",
      proc: APIURL + "api/forumtopics/proc",
      authorize_author: APIURL + "api/forumtopics/authorize_author",
     
    };
  }

  init_admin_search_options() {
    return {
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
        },
        {
          id: 2,
          value: 2,
          group: "isapproved",
          caption: "Enable Approved",
          attr: "isapproved",
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
          title: "Create Topic",
          tooltip: "Create new topic",
          row: 1,
          icon: "icon-file-plus",
          options: {},
          css: "btn m-b-5 btn-block btn-success",
          event: "add"
        },
        {
          id: 101,
          title: "Reports",
          tooltip: "Load Reports",
          css: "btn btn-block m-b-5 btn-info",
          event: "reports"
        }
      ]
    };
  }

  init_account_search_options() {
    return {
      showpanel: true, // show, hide whole panel
      showSearchPanel: true,
      showAdvanceSearchLink: true,
      term: "",
      topselectioncheck: true,
      navList: [],
      filters: [],
      dropdownFilters: [],
      checkFilters: [],
      categories: [],
      selectedcategory: "",
      singleaction: false,
      actions: [
        {
          id: 1,
          title: "Create Topic",
          tooltip: "Create new topic",
          row: 1,
          icon: "icon-file-plus",
          options: {},
          css: "btn btn-block m-b-5 btn-success",
          event: "add"
        },
        {
          id: 100,
          title: "Abuse Reports",
          tooltip: "Load Reported Records",
          css: "btn btn-block m-b-5 btn-danger",
          event: "abuse"
        }
      ]
    };
  }

  init_admin_toolbar_options() {
    let options = {
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

    options.left_options.push({
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
          tooltip: "Load enabled topics"
        },
        {
          id: "6",
          title: "Disabled",
          value: 0,
          isclick: true,
          clickevent: "f_status",
          tooltip: "Load disabled topics"
        },
        {
          id: "5",
          title: "Approved",
          value: 1,
          isclick: true,
          clickevent: "f_isapproved",
          tooltip: "Load approved topics"
        },
        {
          id: "6",
          title: "Unapproved",
          value: 0,
          isclick: true,
          clickevent: "f_isapproved",
          tooltip: "Load unapproved topics"
        },
        {
          id: "5",
          title: "Featured",
          value: 1,
          isclick: true,
          clickevent: "f_isfeatured",
          tooltip: "Load featured topics"
        },
        {
          id: "6",
          title: "Normal",
          value: 0,
          isclick: true,
          clickevent: "f_isfeatured",
          tooltip: "Load normal topics"
        }
      ]
    });

    options.right_options.push({
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

    options.actions.push({
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
          id: "0",
          title: "Featured",
          value: 1,
          actionstatus: "featured",
          attr: "isfeatured",
          isclick: true,
          clickevent: "m_markas",
          icon: "",
          css: ButtonCSS.SUCCESS_BUTTON,
          tooltip: "Mark as featured"
        },
        {
          id: "1",
          title: "Normal",
          value: 0,
          actionstatus: "featured",
          attr: "isfeatured",
          isclick: true,
          clickevent: "m_markas",
          icon: "",
          css: ButtonCSS.SUCCESS_BUTTON,
          tooltip: "Mark as normal"
        },
        {
          id: "3",
          title: "Locked",
          value: 1,
          actionstatus: "locked",
          isclick: true,
          attr: "islocked",
          clickevent: "m_markas",
          icon: "",
          css: ButtonCSS.SUCCESS_BUTTON,
          tooltip: "Mark as locked"
        },
        {
          id: "3",
          title: "Unlocked",
          value: 0,
          actionstatus: "unlocked",
          isclick: true,
          attr: "islocked",
          clickevent: "m_markas",
          icon: "",
          css: ButtonCSS.SUCCESS_BUTTON,
          tooltip: "Mark as unlocked"
        },
        {
          id: "3",
          title: "Resolved",
          value: 1,
          actionstatus: "resolved",
          isclick: true,
          attr: "islocked",
          clickevent: "m_markas",
          icon: "",
          css: ButtonCSS.SUCCESS_BUTTON,
          tooltip: "Mark as Resolved"
        },
        {
          id: "3",
          title: "Unresolved",
          value: 0,
          actionstatus: "nonresolved",
          isclick: true,
          attr: "islocked",
          clickevent: "m_markas",
          icon: "",
          css: ButtonCSS.SUCCESS_BUTTON,
          tooltip: "Mark as Unresolved"
        },
        {
          id: "3",
          title: "Adult",
          value: 1,
          actionstatus: "adult",
          isclick: true,
          attr: "isadult",
          clickevent: "m_markas",
          icon: "",
          css: ButtonCSS.SUCCESS_BUTTON,
          tooltip: "Mark as adult"
        },
        {
          id: "4",
          title: "Non Adult",
          value: 0,
          actionstatus: "nonadult",
          attr: "isadult",
          isclick: true,
          clickevent: "m_markas",
          icon: "",
          css: ButtonCSS.SUCCESS_BUTTON,
          tooltip: "Mark as non adult"
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
    return options;
  }

  /* -------------------------------------------------------------------------- */
  /*                       Options for top search options                       */
  /* -------------------------------------------------------------------------- */
  init_top_search_options() {
    return {
      NavList: [
        {
          id: 1,
          title: "Posted",
          value: 0,
          attr: "datefilter",
          options: [
            { id: 1, title: "Today", value: 1 },
            { id: 2, title: "This Week", value: 2 },
            { id: 3, title: "This Month", value: 3},
            { id: 4, title: "This Year", value: 4},
            { id: 5, title: "All Time", value: 0}
          ]
        },
        {
          id: 2,
          title: "Sort By",
          value: 'topic.created_at desc',
          attr: "order",
          options: [
            { id: 1, title: 'Recent', value: 'topic.created_at desc' },
            { id: 2, title: 'View Count', value: 'topic.views desc, topic.created_at desc' },
            { id: 3, title: "Rating", value: 'topic.avg_rating desc, topic.created_at desc'}
          ]
        }
      ]
    };
  }

  init_account_toolbar_options() {
    let options = {
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

    options.actions.push({
      title: "Mark As",
      ismultiple: true,
      icon: "",
      Options: [
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

    return options;
  }

  getApiOptions() {
    return this.apiOptions;
  }

  getToolbarOptions(isadmin: boolean) {
    if (isadmin) {
      return this.init_admin_toolbar_options();
    } else {
      return this.init_account_toolbar_options();
    }
  }

  getTopSearchSettings() {
    return this.init_top_search_options();
  }

  getSearchOptions(isadmin: boolean) {
    if (isadmin) {
      return this.init_admin_search_options();
    } else {
      return this.init_account_search_options();
    }
  }

  getInitObject(): OPTIONS.ForumTopicEntity {
    return {
      id: 0,
      userid: "",
      replyid: 0,
      title: "",
      description: "",
      forumid: 0,
      tags: ""
    };
  }
}
