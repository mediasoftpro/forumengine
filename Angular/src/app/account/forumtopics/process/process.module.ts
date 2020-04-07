import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

/* custom component */
import { ForumTopicsProcessComponent } from "./process.component";

// shared modules
import { PartialModule } from "../../../partials/shared.module";
import { SharedForumModule } from "../../../shared/forumtopics/shared.module";

@NgModule({
  imports: [
    CommonModule,
    PartialModule,
    RouterModule,
    FormsModule,
    SharedForumModule
  ],
  declarations: [ForumTopicsProcessComponent],
  exports: [ForumTopicsProcessComponent]
})
export class ForumTopicsProcessModule {}
