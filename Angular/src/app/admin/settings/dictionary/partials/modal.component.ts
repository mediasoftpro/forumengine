/* -------------------------------------------------------------------------- */
/*                          Product Name: ForumEngine                         */
/*                      Author: Mediasoftpro (Muhammad Irfan)                 */
/*                       Email: support@mediasoftpro.com                      */
/*       License: Read license.txt located on root of your application.       */
/*                     Copyright 2007 - 2020 @Mediasoftpro                    */
/* -------------------------------------------------------------------------- */

import { Component, OnInit, Input } from "@angular/core";
import { FormService } from "../services/form.service";
import { DataService } from "../services/data.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
//import { CoreAPIActions } from "../../../../reducers/core/actions";
import { Store } from "@ngrx/store";
import { IAppState } from "../../../../reducers/store/model";
import { Notify } from "../../../../reducers/core/actions";

@Component({
  selector: "viewmodal",
  templateUrl: "./modal.html",
  providers: [FormService, DataService]
})
export class ViewComponent implements OnInit {
  @Input() Info: any;
  title: string;
  data: any;

  showLoader = false;
  heading: string;
  controls: any[];

  list: any[] = [];
  constructor(
    private _store: Store<IAppState>,
    public activeModal: NgbActiveModal,
    private service: FormService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.title = this.Info.title;
    this.controls = this.service.getControls(this.Info.data);
    console.log(this.controls);
  }

  SubmitForm(payload) {
    // permission check
    if (this.Info.isActionGranded !== undefined) {
      if (!this.Info.isActionGranded) {
        this._store.dispatch(new Notify({
            title:  "Permission Denied",
            text: "",
            css: "bg-danger"
          }));
        return;
      }
    }
    this.showLoader = true;
    this.dataService.AddRecord(payload).subscribe(
      (data: any) => {
        this.showLoader = false;
        if (data.status === "success") {
          this._store.dispatch(new Notify({
            title:  "Record added successfully",
            text: "",
            css: "bg-success"
          }));
          this.activeModal.close({
            data: data.record
          });
        } else {
           this._store.dispatch(new Notify({
            title: data.message,
            text: "",
            css: "bg-danger"
          }));
        }
      },
      err => {
        this.showLoader = false;
        this._store.dispatch(new Notify({
          title: "Error Occured",
          text: "",
          css: "bg-danger"
        }));
      }
    );
  }
  close() {
    this.activeModal.dismiss("Cancel Clicked");
  }
}
