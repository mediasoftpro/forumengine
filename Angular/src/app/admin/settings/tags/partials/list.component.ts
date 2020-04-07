/* -------------------------------------------------------------------------- */
/*                           Product Name: ForumEngine                        */
/*                            Author: Mediasoftpro                            */
/*                       Email: support@mediasoftpro.com                      */
/*       License: Read license.txt located on root of your application.       */
/*                     Copyright 2007 - 2020 @Mediasoftpro                    */
/* -------------------------------------------------------------------------- */

import { Component, OnInit, EventEmitter, Input, Output } from "@angular/core";
import {
  trigger,
  style,
  transition,
  animate,
  keyframes
} from "@angular/animations";
import { Observable } from "rxjs/Observable";
import { select } from "@angular-redux/store";
import { TagsAPIActions } from "../../../../reducers/settings/tags/actions";
import { DataService } from "../services/data.service";
import { CoreAPIActions } from "../../../../reducers/core/actions";

@Component({
  selector: "app-list",
  templateUrl: "./list.html",
  animations: [
    trigger("fadeIn", [
      transition(":enter", [
        style({ opacity: "0", background: "#f5fb98" }),
        animate(
          "300ms ease-out",
          keyframes([
            style({ opacity: 0, transform: "translateY(-75%)", offset: 0 }),
            style({ opacity: 0.5, transform: "translateY(35px)", offset: 0.5 }),
            style({ opacity: 1, transform: "translateY(0)", offset: 1.0 })
          ])
        )
      ])
    ])
  ]
})
export class ListComponent implements OnInit {
  constructor(
    private actions: TagsAPIActions,
    private coreActions: CoreAPIActions,
    private dataService: DataService
  ) {}

  @Input() isActionGranded = false;
  @Input() TagTypes: any = [];
  @select(["tags", "posts"])
  readonly Data$: Observable<any>;

  @select(["tags", "loading"])
  readonly loading$: Observable<boolean>;

  @select(["tags", "pagination"])
  readonly pagination$: Observable<any>;

  @select(["tags", "selectall"])
  readonly selectAll$: Observable<any>;

  @Output() View = new EventEmitter<any>();
  @Output() SelectedItems = new EventEmitter<any>();

  selectall = false;
  fieldstates = {
    tagname: false,
    tag_level: false,
    type: false,
    tag_type: false,
    isenabled: false
  };

  ngOnInit() {
    this.selectAll$.subscribe((selectall: boolean) => {
      this.selectall = selectall;
      this.checkChange();
    });
  }

  /* action trigger */
  viewRecord(obj, event) {
    this.View.emit({ action: "view", value: obj });
    event.stopPropagation();
  }

  /* action trigger */
  triggleAction(obj, action) {
    this.Data$.subscribe(items => {
      const _items = [];
      // reset item selection
      for (const item of items) {
        if (obj.id === item.id) {
          item.Selected = true;
        } else {
          item.Selected = false;
        }
      }
      for (const item of items) {
        if (item.Selected) {
          _items.push(item);
        }
      }
      this.SelectedItems.emit(_items);
    });
    this.View.emit({ action: action, actionstatus: action, value: obj });
  }
  // Since we're observing an array of items, we need to set up a 'trackBy'
  // parameter so Angular doesn't tear down and rebuild the list's DOM every
  // time there's an update.
  getKey(_, item: any) {
    return item.id;
  }
  toggleEditView(item: any, event) {
    if (!item.editview) {
      item.editview = true;
    } else {
      item.editview = false;
    }
    event.stopPropagation();
  }

  _UpdateRecord(item: any) {
    if (!this.isActionGranded) {
      this.coreActions.Notify({
        title: "Permission Denied",
        text: "",
        css: "bg-danger"
      });
      return;
    }
    item.editview = false;
    /* this.coreActions.Notify({
        title: 'Record added successfully',
        text: '',
        css: 'bg-danger' }); */
    this.dataService.UpdateRecord(item);
  }

  /* pagination click event */
  PaginationChange(value: number) {
    // update filter option to query database
    this.actions.applyFilter({ attr: "pagenumber", value: value });
    // update pagination current page (to hightlight selected page)
    this.actions.updatePaginationCurrentPage({ currentpage: value });
  }
  delete(item: any, index: number, event) {
    if (!this.isActionGranded) {
      this.coreActions.Notify({
        title: "Permission Denied",
        text: "",
        css: "bg-danger"
      });
      return;
    }
    const r = confirm("Are you sure you want to delete selected record?");
    if (r === true) {
      this.dataService.DeleteRecord(item, index);
    }
  }
  processChange() {
    this.actions.selectAll(this.selectall);
  }

  checkChange() {
    this.ProcessSelection();
  }
  ProcessSelection() {
    this.Data$.subscribe(items => {
      const _items = [];
      for (const item of items) {
        if (item.Selected) {
          _items.push(item);
        }
      }
      this.SelectedItems.emit(_items);
    });
  }
}
