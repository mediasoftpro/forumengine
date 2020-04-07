/* -------------------------------------------------------------------------- */
/*                           Product Name: ForumEngine                        */
/*                            Author: Mediasoftpro                            */
/*                       Email: support@mediasoftpro.com                      */
/*       License: Read license.txt located on root of your application.       */
/*                     Copyright 2007 - 2020 @Mediasoftpro                    */
/* -------------------------------------------------------------------------- */

import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { ForumsComponent } from "./forums.component";
import { ListComponent } from "./partials/list.component";

import { ForumProcessComponent } from "./process/process.component";
import { ForumProcessModule } from "./process/process.module";

/* services */
import { SettingsService } from "./services/settings.service";
import { DataService } from "./services/data.service";

/* actions */
import { ForumsAPIActions } from "../../reducers/forums/actions";

import { PartialModule } from "../../partials/shared.module";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Forums Management",
      urls: [
        { title: "Dashboard", url: "/" },
        { title: "Forums", url: "/forums" },
        { title: "Management" }
      ]
    },
    component: ForumsComponent
  },
  {
    path: "category/:catname",
    data: {
      title: "Forums Management",
      urls: [
        { title: "Dashboard", url: "/" },
        { title: "Forums", url: "/forums" },
        { title: "Management" }
      ]
    },
    component: ForumsComponent
  },
  {
    path: "process/:id",
    data: {
      title: "Add / Update Forums",
      urls: [
        { title: "Dashboard", url: "/" },
        { title: "Forums", url: "/forums" },
        { title: "Add / Update Forums" }
      ]
    },
    component: ForumProcessComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PartialModule,
    ForumProcessModule,
    NgbModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ForumsComponent, ListComponent],
  entryComponents: [],
  exports: [ForumsComponent],
  providers: [SettingsService, DataService, ForumsAPIActions]
})
export class ForumsModule {}
