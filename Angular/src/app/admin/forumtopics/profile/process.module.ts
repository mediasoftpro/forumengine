/* -------------------------------------------------------------------------- */
/*                           Product Name: ForumEngine                        */
/*                            Author: Mediasoftpro                            */
/*                       Email: support@mediasoftpro.com                      */
/*       License: Read license.txt located on root of your application.       */
/*                     Copyright 2007 - 2020 @Mediasoftpro                    */
/* -------------------------------------------------------------------------- */

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
/* custom component */
import { ForumTopicsProfileComponent } from "./process.component";
import { ForumTopicsProfileInfoComponent } from "./partials/info.component";
/* services */
import { SettingsService } from "../../../shared/forumtopics/services/settings.service";
import { DataService } from "../../../shared/forumtopics/services/data.service";
import { FormService } from "../../../shared/forumtopics/services/form.service";

/* actions */
import { ForumTopicsAPIActions } from "../../../reducers/forumtopics/actions";
import { PartialModule } from "../../../partials/shared.module";

@NgModule({
  imports: [CommonModule, PartialModule, RouterModule, FormsModule],
  declarations: [ForumTopicsProfileComponent, ForumTopicsProfileInfoComponent],
  exports: [ForumTopicsProfileComponent],
  providers: [SettingsService, DataService, FormService, ForumTopicsAPIActions]
})
export class ForumTopicsProfileModule {}
