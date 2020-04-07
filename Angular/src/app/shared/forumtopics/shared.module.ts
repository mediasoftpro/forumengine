/* -------------------------------------------------------------------------- */
/*                           Product Name: ForumEngine                        */
/*                            Author: Mediasoftpro                            */
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

// services
import { SettingsService } from "./services/settings.service";
import { DataService } from "./services/data.service";
import { FormService } from "./services/form.service";

/* actions */
import { ForumTopicsAPIActions } from "../../reducers/forumtopics/actions";

@NgModule({
  imports: [
    CommonModule,
    PartialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    MainForumTopicsComponent,
    ForumTopicsProcComponent,
    ForumInfoComponent,
    ViewComponent,
    SMForumListComponent,
    ListComponent
  ],
  exports: [
    MainForumTopicsComponent,
    ForumTopicsProcComponent,
    ForumInfoComponent,
    ViewComponent,
    SMForumListComponent,
    ListComponent
  ],
  entryComponents: [ViewComponent],
  providers: [SettingsService, DataService, FormService, ForumTopicsAPIActions]
})
export class SharedForumModule {}
