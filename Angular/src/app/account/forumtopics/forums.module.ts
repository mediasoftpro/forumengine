import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { ForumTopicsComponent } from "./forums.component";

import { ForumTopicsProcessModule } from "./process/process.module";
import { ForumTopicsProcessComponent } from "./process/process.component";

// shared modules
import { PartialModule } from "../../partials/shared.module";
import { SharedForumModule } from "../../shared/forumtopics/shared.module";

import { NavigationMenuIndex } from "../../configs/settings";

const routes: Routes = [
  {
    path: "",
    data: {
      topmenuIndex: NavigationMenuIndex.TOPMENU_FORUMS_INDEX,
      leftmenuIndex: NavigationMenuIndex.TOPMENU_FORUMS_INDEX,
      title: "My Account",
      urls: [{ title: "My Account", url: "/" }, { title: "Manage Topics" }]
    },
    component: ForumTopicsComponent
  },
  {
    path: "process/:id",
    data: {
      topmenuIndex: NavigationMenuIndex.TOPMENU_FORUMS_INDEX,
      leftmenuIndex: NavigationMenuIndex.TOPMENU_FORUMS_INDEX,
      title: "My Account",
      urls: [
        { title: "My Account", url: "/" },
        { title: "Forum Topics", url: "/my-topics" },
        { title: "Post Topic" }
      ]
    },
    component: ForumTopicsProcessComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PartialModule,
    ForumTopicsProcessModule,
    NgbModule,
    SharedForumModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ForumTopicsComponent,
  ],
  exports: [ForumTopicsComponent]
})
export class ForumTopicsModule {}
