/* -------------------------------------------------------------------------- */
/*                           Product Name: ForumEngine                        */
/*                      Author: Mediasoftpro (Muhammad Irfan)                 */
/*                       Email: support@mediasoftpro.com                      */
/*       License: Read license.txt located on root of your application.       */
/*                     Copyright 2007 - 2020 @Mediasoftpro                    */
/* -------------------------------------------------------------------------- */

import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

// admin specific component
import { ForumTopicsComponent } from "./forums.component";

import { ForumTopicsProcessModule } from "./process/process.module";
import { ForumTopicsProcessComponent } from "./process/process.component";

import { ForumTopicsProfileModule } from "./profile/process.module";
import { ForumTopicsProfileComponent } from "./profile/process.component";

// report modules
import { ForumTopicReportModule } from "./reports/reports.module";
import { ForumTopicsReportsComponent } from "./reports/reports.components";

// shared modules
import { PartialModule } from "../../partials/shared.module";
import { SharedForumModule } from "../../shared/forumtopics/shared.module";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Forums Topics Management",
      urls: [
        { title: "Dashboard", url: "/" },
        { title: "Forums", url: "/forums" },
        { title: "Management" }
      ]
    },
    component: ForumTopicsComponent
  },
  {
    path: "forum/:id",
    data: {
      title: "Forums Topics Management",
      urls: [
        { title: "Dashboard", url: "/" },
        { title: "Forums", url: "/forums" },
        { title: "Management" }
      ]
    },
    component: ForumTopicsComponent
  },
  {
    path: "tag/:tagname",
    data: {
      title: "Forums Topics Management",
      urls: [
        { title: "Dashboard", url: "/" },
        { title: "Forums", url: "/forums" },
        { title: "Management" }
      ]
    },
    component: ForumTopicsComponent
  },
  {
    path: "user/:uname",
    data: {
      title: "Forums Topics Management",
      urls: [
        { title: "Dashboard", url: "/" },
        { title: "Forums", url: "/forums" },
        { title: "Management" }
      ]
    },
    component: ForumTopicsComponent
  },
  {
    path: "filter/:abuse",
    data: {
      title: "Forums Topics Management (Reported)",
      urls: [
        { title: "Dashboard", url: "/" },
        { title: "Forums", url: "/forums" },
        { title: "Reported Topics" }
      ]
    },
    component: ForumTopicsComponent
  },
  
  {
    path: "profile/:id",
    data: {
      title: "Forum Topic Information",
      urls: [
        { title: "Dashboard", url: "/" },
        { title: "Forum Topics", url: "/forumtopics" },
        { title: "Forum Topics Information" }
      ]
    },
    component: ForumTopicsProfileComponent
  },

  {
    path: "reports",
    data: {
      title: "Reports Overview",
      urls: [
        { title: "Dashboard", url: "/" },
        { title: "Forum Topics", url: "/forumtopics" },
        { title: "Reports Overview" }
      ]
    },
    component: ForumTopicsReportsComponent
  },

  
  {
    path: "process/:id",
    data: {
      title: "Process Post",
      urls: [
        { title: "Dashboard", url: "/" },
        { title: "Forum Topics", url: "/forumtopics" },
        { title: "Process Post" }
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
    ForumTopicsProfileModule,
    ForumTopicsProcessModule,
    NgbModule,
    SharedForumModule,
    ForumTopicReportModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ForumTopicsComponent
  ],
  exports: [ForumTopicsComponent]
})
export class ForumTopicsModule {}
