/* -------------------------------------------------------------------------- */
/*                           Product Name: ForumEngine                        */
/*                      Author: Mediasoftpro (Muhammad Irfan)                 */
/*                       Email: support@mediasoftpro.com                      */
/*       License: Read license.txt located on root of your application.       */
/*                     Copyright 2007 - 2020 @Mediasoftpro                    */
/* -------------------------------------------------------------------------- */

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

// shared modules
import { PartialModule } from "../../partials/shared.module";

// components
import { MainForumTopicsComponent } from "./components/main/main.components";
import { ForumTopicsProcComponent } from "./components/process/process.component";
import { ForumInfoComponent } from "./components/partials/foruminfo.component";
import { ViewComponent } from "./components/partials/modal.component";
import { SMForumListComponent } from "./components/partials/smlist.component";
import { ListComponent } from "./components/partials/list.component";
import { SMTopicsAdminListComponent } from "./components/partials/smlist_admin.component";
import { SMTopicsReportComponent } from "./components/partials/sm_report.component";
// services
import { SettingsService } from "./services/settings.service";
import { DataService } from "./services/data.service";
import { FormService } from "./services/form.service";

/* actions */
import { Ng2GoogleChartsModule } from "ng2-google-charts";

@NgModule({
  imports: [
    CommonModule,
    PartialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2GoogleChartsModule
  ],
  declarations: [
    MainForumTopicsComponent,
    ForumTopicsProcComponent,
    ForumInfoComponent,
    ViewComponent,
    SMForumListComponent,
    ListComponent,
    SMTopicsAdminListComponent,
    SMTopicsReportComponent
  ],
  exports: [
    MainForumTopicsComponent,
    ForumTopicsProcComponent,
    ForumInfoComponent,
    ViewComponent,
    SMForumListComponent,
    ListComponent,
    SMTopicsAdminListComponent,
    SMTopicsReportComponent
  ],
  entryComponents: [ViewComponent],
  providers: [SettingsService, DataService, FormService]
})
export class SharedForumModule {}
