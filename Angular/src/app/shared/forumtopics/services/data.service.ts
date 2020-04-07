
/* -------------------------------------------------------------------------- */
/*                           Product Name: ForumEngine                        */
/*                            Author: Mediasoftpro                            */
/*                       Email: support@mediasoftpro.com                      */
/*       License: Read license.txt located on root of your application.       */
/*                     Copyright 2007 - 2020 @Mediasoftpro                    */
/* -------------------------------------------------------------------------- */

import { Injectable } from "@angular/core";
import { ForumTopicsAPIActions } from "../../../reducers/forumtopics/actions";
import { HttpClient } from "@angular/common/http";
import { SettingsService } from "./settings.service";
import { CoreAPIActions } from "../../../reducers/core/actions";

@Injectable()
export class DataService {
  constructor(
    private settings: SettingsService,
    private http: HttpClient,
    private actions: ForumTopicsAPIActions,
    private coreActions: CoreAPIActions
  ) {}

  /* -------------------------------------------------------------------------- */
  /*                           Core load data api call                          */
  /* -------------------------------------------------------------------------- */
  LoadRecords(FilterOptions) {
   
    const URL = this.settings.getApiOptions().load;
    this.actions.loadStarted();
    this.http.post(URL, JSON.stringify(FilterOptions)).subscribe(
      (data: any) => {
        // update core data
        this.actions.loadSucceeded(data);

        // update list stats
        this.coreActions.refreshListStats({
          totalrecords: data.records,
          pagesize: FilterOptions.pagesize,
          pagenumber: FilterOptions.pagenumber
        });
      },
      err => {
        this.actions.loadFailed(err);
      }
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                       load few qa (no pagination)                      */
  /* -------------------------------------------------------------------------- */
  LoadSmList(queryOptions: any) {
  
    return this.http.post(this.settings.getApiOptions().load, JSON.stringify(queryOptions));

  }

  /* -------------------------------------------------------------------------- */
  /*                       load reports (no pagination)                      */
  /* -------------------------------------------------------------------------- */
  LoadReports(queryOptions: any) {
  
    return this.http.post(this.settings.getApiOptions().load_reports, JSON.stringify(queryOptions));

  }

  
  loadForumsRecords() {

    const URL = this.settings.getApiOptions().getforum;
    this.http.post(URL, {}).subscribe(
      (data: any) => {
        // update core data
        this.actions.updateForums(data.posts);
      },
      err => {
        this.actions.loadFailed(err);
      }
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                              Get Single Record                             */
  /* -------------------------------------------------------------------------- */
  GetInfo(id: number) {
    const URL = this.settings.getApiOptions().getinfo;
    return this.http.post(URL, JSON.stringify({ id }));
  }

  AddRecord(obj) {
    return this.http.post(
      this.settings.getApiOptions().proc,
      JSON.stringify(obj)
    );
  }

  DeleteRecord(item, index) {
    item.actionstatus = "delete";
    const arr = [];
    arr.push(item);
    this.ProcessActions(arr, "delete");
  }
  
  Authorize_Author(obj) {
    return this.http.post(
      this.settings.getApiOptions().authorize_author,
      JSON.stringify(obj)
    );
  }
  
  /* -------------------------------------------------------------------------- */
  /*               Perform actions (enable, disable, approve) etc               */
  /* -------------------------------------------------------------------------- */
  ProcessActions(SelectedItems, isenabled) {
    // apply changes directory instate
    this.actions.applyChanges({
      SelectedItems,
      isenabled
    });
       
    this.http
      .post(this.settings.getApiOptions().action, JSON.stringify(SelectedItems))
      .subscribe(
        (data: any) => {
          // this.coreActions.Notify(data.message);
          let message = "Operation Performed";
          if (isenabled === "delete") {
            message = "Record Removed";
          }
          this.coreActions.Notify({
            title: message,
            text: "",
            css: "bg-success"
          });
        },
        err => {
          this.coreActions.Notify({
            title: "Error Occured",
            text: "",
            css: "bg-danger"
          });
        }
      );
  }
}
