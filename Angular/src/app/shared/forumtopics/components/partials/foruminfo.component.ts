/* -------------------------------------------------------------------------- */
/*                           Product Name: ForumEngine                        */
/*                            Author: Mediasoftpro                            */
/*                       Email: support@mediasoftpro.com                      */
/*       License: Read license.txt located on root of your application.       */
/*                     Copyright 2007 - 2020 @Mediasoftpro                    */
/* -------------------------------------------------------------------------- */

import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-forum-info",
  templateUrl: "./foruminfo.html"
})
export class ForumInfoComponent implements OnInit {
  constructor(private router: Router) {}

  @Input() Forums: any = [];
  @Input() Topic: any = {};
  @Input() isAdmin = true;

  SelectedForum: any = {
    title: "",
    id: 0
  };
  ngOnInit() {
    for (const forum of this.Forums) {
      if (forum.id === this.Topic.id) {
        this.SelectedForum = forum;
      }
    }
  }
}
