/* -------------------------------------------------------------------------- */
/*                          Product Name: ForumEngine                         */
/*                      Author: Mediasoftpro (Muhammad Irfan)                 */
/*                       Email: support@mediasoftpro.com                      */
/*       License: Read license.txt located on root of your application.       */
/*                     Copyright 2007 - 2020 @Mediasoftpro                    */
/* -------------------------------------------------------------------------- */
import { Store } from "@ngrx/store";
import { IAppState } from "../../../reducers/store/model";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SettingsService } from "./settings.service";
//import { CoreAPIActions } from "../../../reducers/core/actions";
import { Notify } from "../../../reducers/core/actions";
/* -------------------------------------------------------------------------- */
/*             Core Data Access (API) Library for Ad Listings                 */
/* -------------------------------------------------------------------------- */
@Injectable()
export class DataService {
  constructor(
    private _store: Store<IAppState>,
    private settings: SettingsService,
    private http: HttpClient
  ) {}

  /* -------------------------------------------------------------------------- */
  /*                           Load Templates                                   */
  /* -------------------------------------------------------------------------- */
  LoadTemplates(obj) {
    return this.http.post(
      this.settings.getApiOptions().load,
      JSON.stringify(obj)
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                           load dynamic attributes                          */
  /* -------------------------------------------------------------------------- */
  LoadAttributes(obj: any) {
    const URL = this.settings.getApiOptions().load_attr;
    return this.http.post(URL, JSON.stringify(obj));
  }

  /* -------------------------------------------------------------------------- */
  /*                           Add Template / Section                           */
  /* -------------------------------------------------------------------------- */
  AddTemplate(obj, url) {
    return this.http.post(url, JSON.stringify(obj));
  }

  /* -------------------------------------------------------------------------- */
  /*                           Add Attribute                                    */
  /* -------------------------------------------------------------------------- */
  AddAttribute(obj) {
    let URL = this.settings.getApiOptions().add_attr;
    return this.http.post(URL, JSON.stringify(obj));
  }

  /* -------------------------------------------------------------------------- */
  /*                           Delete Attribute                                 */
  /* -------------------------------------------------------------------------- */
  DeleteAttribute(obj) {
    let URL = this.settings.getApiOptions().delete_attr;
    this.http.post(URL, JSON.stringify(obj)).subscribe(
      (data: any) => {
        this._store.dispatch(new Notify({
          title: "Record Removed",
          text: "",
          css: "bg-success"
        }));
      },
      err => {
        this._store.dispatch(new Notify({
          title: "Record not Saved",
          text: "",
          css: "bg-danger"
        }));
      }
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                           Del Template / Section                           */
  /* -------------------------------------------------------------------------- */
  DeleteTemplate(obj, url) {
    this.http.post(url, JSON.stringify(obj)).subscribe(
      (data: any) => {
        this._store.dispatch(new Notify({
          title: "Record Removed",
          text: "",
          css: "bg-success"
        }));
      },
      err => {
        this._store.dispatch(new Notify({
          title: "Record not Saved",
          text: "",
          css: "bg-danger"
        }));
      }
    );
  }
}
