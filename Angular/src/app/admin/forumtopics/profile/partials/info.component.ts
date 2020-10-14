/* -------------------------------------------------------------------------- */
/*                           Product Name: ForumEngine                        */
/*                      Author: Mediasoftpro (Muhammad Irfan)                 */
/*                       Email: support@mediasoftpro.com                      */
/*       License: Read license.txt located on root of your application.       */
/*                     Copyright 2007 - 2020 @Mediasoftpro                    */
/* -------------------------------------------------------------------------- */

import { Component, Input, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { IAppState } from "../../../../reducers/store/model";

/* modal popup */
import { NgbModal, NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";
// modal popup
import { ViewComponent } from "../../../../shared/forumtopics/components/partials/modal.component";
import { SettingsService } from "../../../../shared/forumtopics/services/settings.service";
import { DataService } from "../../../../shared/forumtopics/services/data.service";
import { auth } from "../../../../reducers/users/selectors";
@Component({
  selector: "app-forumtopics-info",
  templateUrl: "./info.html"
})
export class ForumTopicsProfileInfoComponent implements OnInit {
 

  constructor(
    private _store: Store<IAppState>,
    private modalService: NgbModal,
    private settingService: SettingsService,
    private dataService: DataService
  ) {}


  readonly auth$ = this._store.pipe(select(auth));

  @Input() Info: any = {};
  @Input() Author_FullName = "";
  
  Auth: any = {};

  ngOnInit() {
    this.auth$.subscribe((auth: any) => {
      this.Auth = auth;
    });
  }
  PostReply() {
    if (this.Info.length > 0) {
      const post = this.settingService.getInitObject();
      post.userid = this.Auth.User.id;
      post.forumid = this.Info[0].forumid;
      post.replyid = this.Info[0].id;
      post.title = "Re - " + this.Info[0].title;
      this.TriggleModal(post);
    }
  }

  edit(post: any, event: any) {
    this.TriggleModal(post);
    event.stopPropagation();
  }

  TriggleModal(obj: any) {
    const _options: NgbModalOptions = {
      backdrop: false
    };
    let title = "Post Reply";
    if (obj.id > 0) {
      title = "Update Post";
    }
    const modalRef = this.modalService.open(ViewComponent, _options);
    modalRef.componentInstance.Info = {
      title: title,
      data: obj,
      viewType: 0
    };
    modalRef.result.then(
      result => {
        if (result.isenabled === "Added") {
          this.Info.push(result.data);
        } else {
          for (const post of this.Info) {
            if (post.id === result.data.id) {
              post.description = result.data.description;
            }
          }
        }
      },
      dismissed => {
        console.log("dismissed");
      }
    );
  }

  delete(item: any, index: number, event: any) {
    const r = confirm("Are you sure you want to delete selected post?");
    if (r === true) {
      if (index > -1) {
        this.Info.splice(index, 1);
      }
      this.dataService.DeleteRecord(item, index);
    }
    event.stopPropagation();
  }
}
