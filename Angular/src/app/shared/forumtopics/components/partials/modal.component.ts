import { Component, OnInit, Input } from "@angular/core";
import { FormService } from "../../services/form.service";
import { DataService } from "../../services/data.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { CoreAPIActions } from "../../../../reducers/core/actions";

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
    public activeModal: NgbActiveModal,
    private service: FormService,
    private dataService: DataService,
    private coreActions: CoreAPIActions
  ) {}

  ngOnInit() {
    this.title = this.Info.title;
    this.controls = this.service.getReplyControls(this.Info.data);
  }

  SubmitForm(payload) {
    // permission check
    if (this.Info.isActionGranded !== undefined) {
      if (!this.Info.isActionGranded) {
        this.coreActions.Notify({
          title: "Permission Denied",
          text: "",
          css: "bg-danger"
        });
        return;
      }
    }
    payload.replyid = this.Info.data.replyid;
    payload.title = this.Info.data.title;
    payload.userid = this.Info.data.userid;
    payload.forumid = this.Info.data.forumid;
    payload.id = this.Info.data.id;
    let _status = "Added";
    if (this.Info.data.id > 0) {
      payload.id = this.Info.data.id;
      _status = "Updated";
    }
    this.showLoader = true;
    console.log(payload);
    this.dataService.AddRecord(payload).subscribe(
      (data: any) => {
        if (data.status === "error") {
          this.coreActions.Notify({
            title: data.message,
            text: "",
            css: "bg-error"
          });
        } else {
          this.coreActions.Notify({
            title: "Record " + _status + " Successfully",
            text: "",
            css: "bg-success"
          });

          this.activeModal.close({
            data: data.record,
            isenabled: _status
          });
        }
        this.showLoader = false;
      },
      err => {
        this.showLoader = false;
        this.coreActions.Notify({
          title: "Error Occured",
          text: "",
          css: "bg-danger"
        });
      }
    );
  }
  close() {
    this.activeModal.dismiss("Cancel Clicked");
  }
}
