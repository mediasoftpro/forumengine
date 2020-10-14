
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

// Admin specific component
import { ForumTopicsProcessComponent } from "./process.component";

// share modules
import { PartialModule } from "../../../partials/shared.module";
import { SharedForumModule } from "../../../shared/forumtopics/shared.module";

@NgModule({
  imports: [CommonModule, PartialModule, RouterModule, FormsModule, SharedForumModule],
  declarations: [ForumTopicsProcessComponent],
  exports: [ForumTopicsProcessComponent]
})
export class ForumTopicsProcessModule {}
