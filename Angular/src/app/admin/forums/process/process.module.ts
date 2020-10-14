/* -------------------------------------------------------------------------- */
/*                           Product Name: ForumEngine                        */
/*                      Author: Mediasoftpro (Muhammad Irfan)                 */
/*                       Email: support@mediasoftpro.com                      */
/*       License: Read license.txt located on root of your application.       */
/*                     Copyright 2007 - 2020 @Mediasoftpro                    */
/* -------------------------------------------------------------------------- */

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

/* custom component */
import { ForumProcessComponent } from "./process.component";

/* services */
import { SettingsService } from "../services/settings.service";
import { DataService } from "../services/data.service";
import { FormService } from "../services/form.service";

/* actions */
import { PartialModule } from "../../../partials/shared.module";

@NgModule({
  imports: [CommonModule, PartialModule, RouterModule, FormsModule],
  declarations: [ForumProcessComponent],
  exports: [ForumProcessComponent],
  providers: [SettingsService, DataService, FormService]
})
export class ForumProcessModule {}
