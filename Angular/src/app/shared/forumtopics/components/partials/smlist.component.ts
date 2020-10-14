/* -------------------------------------------------------------------------- */
/*                           Product Name: ForumEngine                        */
/*                      Author: Mediasoftpro (Muhammad Irfan)                 */
/*                       Email: support@mediasoftpro.com                      */
/*       License: Read license.txt located on root of your application.       */
/*                     Copyright 2007 - 2020 @Mediasoftpro                    */
/* -------------------------------------------------------------------------- */

import { Component, OnInit, Input } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { IAppState } from "../../../../reducers/store/model";

import { DataService } from "../../services/data.service";
import { SettingsService } from "../../services/settings.service";
import { Router } from "@angular/router";
import { CoreService } from "../../../../admin/core/coreService";


import { auth } from "../../../../reducers/users/selectors";
import {
  loadFailed
} from "../../../../reducers/forumtopics/actions";

@Component({
  selector: "app-smfrmtopics-list",
  templateUrl: "./smlist.html",
  providers: [DataService, SettingsService]
})
export class SMForumListComponent implements OnInit {
  constructor(
    private _store: Store<IAppState>,
    private dataService: DataService,
    private router: Router,
    private coreService: CoreService,
  ) {}

  @Input() title = "My Topics";
  @Input() type = 0; // 0: My Topics
  @Input() rout_url = '/';
  @Input() browse_url = '/';
  @Input() NoRecordText = "No Topics Posted Yet!";
  @Input() isAdmin = false;
  @Input() stats = 0; 
  @Input() pagesize = 4;
  @Input() orderby = "topic.created_at desc";

  readonly auth$ = this._store.pipe(select(auth));

  loaddata = false;
  Data: any =[];
  ngOnInit() {
    this.auth$.subscribe((auth: any) => {
       this.LoadRecords(auth.User);
    });
     
  }

  viewRecord(obj, event) {
    this.router.navigate([this.rout_url + "profile/" + obj.enc_id]);
    event.stopPropagation();
  }

  LoadRecords(user: any) {
     const query: any = {
        order: this.orderby,
        pagesize: this.pagesize,
        isSummary: true,
        forumid: 0,
        onlytopics: false,
        loadall: false,
        userid: "",
        isapproved: 2,
        isenabled: 2,
        isfeatured: 3,
        isresolved: 2,
        islocked: 2,
        type: 2,
        nofilter: false,
        loadstats: false,
        ispublic: false,
     };
         
     if (!this.isAdmin) {
        query.userid = user.id;
     }
     
     this.loaddata = true;
     this.dataService.LoadSmList(query).subscribe(
        (data: any) => {
          this.Data = data.posts;
          for (const item of this.Data) {
            item.enc_id = this.coreService.encrypt(item.id);
          }
          this.loaddata = false;
        },
        err => {
          this._store.dispatch(new loadFailed(err));
        }
      );
  }

  delete(item: any, index: number, event) {
    const r = confirm("Are you sure you want to delete selected record?");
    if (r === true) {
      this.dataService.DeleteRecord(item, index);
      this.Data.splice(index, 1);
    }
    event.stopPropagation();
  }

}
