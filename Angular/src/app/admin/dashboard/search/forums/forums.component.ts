/* -------------------------------------------------------------------------- */
/*                           Product Name: ForumEngine                        */
/*                            Author: Mediasoftpro                            */
/*                       Email: support@mediasoftpro.com                      */
/*       License: Read license.txt located on root of your application.       */
/*                     Copyright 2007 - 2020 @Mediasoftpro                    */
/* -------------------------------------------------------------------------- */

import { Component, OnInit } from "@angular/core";
// redux
import { Store, select } from "@ngrx/store";
import { IAppState } from "../../../../reducers/store/model";
// services
import { SettingsService } from "../../../../shared/forumtopics/services/settings.service";
import { DataService } from "../../../../shared/forumtopics/services/data.service";
import { IFilterOption } from "../../../../reducers/forumtopics/model";
import { AppConfig } from "../../../../configs/app.config";
import * as selectors from "../../../../reducers/forumtopics/selectors";

@Component({
  selector: "app-forum-search",
  templateUrl: "./forums.html",
  providers: [SettingsService, DataService]
})
export class ForumSearchComponent implements OnInit {
  constructor(
    private _store: Store<IAppState>,
    private settingService: SettingsService,
    private dataService: DataService,
    public config: AppConfig
  ) {}

  PublicView = true;
  NoRecordText = "No Search Result!";
  SearchOptions: any;
  TopSearchOptions: any;
  FilterOptions: any = IFilterOption;
  ToolbarOptions: any;

  ngOnInit() {
    // Left Search
    // this.SearchOptions = this.settingService.getSearchSettings();
    // Top Search
    this.TopSearchOptions = this.settingService.getTopSearchSettings();
    // User entered search term
    this.FilterOptions.term = this.config.getGlobalVar("searchparams").term;
    this.FilterOptions.ispublic = true;
    // toolbar options
    this.ToolbarOptions = this.settingService.getToolbarOptions(false);
    this.ToolbarOptions.showtoolbar = false; // hide top navigation (mostly needed with left side navigation for additional order / filter options)
    this.ToolbarOptions.showcheckAll = false; // remove check all checkbox from search results. (needed in account listings)

    this.loadRecords(this.FilterOptions);
  }

  Search(filterOption: any) {
    this.loadRecords(filterOption);
  }

  loadRecords(options: any) {
    options.ispublic = true;
    this.dataService.LoadRecords(options);
  }

  /* toolbar actions */
  toolbaraction(selection: any) {
    switch (selection.action) {
      case "order":
        this.FilterOptions.order = selection.value;
        break;
      case "paginate":
        console.log("paginate " + selection.value);
        this.FilterOptions.pagenumber = selection.value;
        break;
    }
    this.loadRecords(this.FilterOptions);
  }
}
