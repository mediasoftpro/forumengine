/* -------------------------------------------------------------------------- */
/*                           Product Name: ForumEngine                        */
/*                      Author: Mediasoftpro (Muhammad Irfan)                 */
/*                       Email: support@mediasoftpro.com                      */
/*       License: Read license.txt located on root of your application.       */
/*                     Copyright 2007 - 2020 @Mediasoftpro                    */
/* -------------------------------------------------------------------------- */

import { Injectable } from "@angular/core";
import * as Controls from "../../../partials/components/dynamicform/model/elements";
import { FormBase } from "../../../partials/components/dynamicform/model/base";
import * as OPTIONS from "../forums.model";
import { AppConfig } from "../../../configs/app.config";
import { CoreService } from "../../../admin/core/coreService";

@Injectable()
export class FormService {

  constructor(public config: AppConfig, private coreService: CoreService) {}

  getReplyControls(entity: OPTIONS.ForumTopicEntity) {
    const controls: FormBase<any>[] = [];
    controls.push(
      new Controls.TinyMyceEditor({
        key: "description",
        label: "Description",
        value: entity.description,
        required: true,
        tinymiceOptions: this.coreService.prepareInitEditorSettings(),
        order: 1
      })
    );
    return controls.sort((a, b) => a.order - b.order);
  }

  getControls(entity: OPTIONS.ForumTopicEntity) {
    const controls: FormBase<any>[] = [];

    controls.push(
      new Controls.Textbox({
        key: "title",
        label: "Title",
        value: entity.title,
        required: true,
        order: 0,
        maxLength: 300
        // helpblock: `Enter post title`
      })
    );

    controls.push(
      new Controls.TinyMyceEditor({
        key: "description",
        label: "Description",
        value: entity.description,
        required: true,
        tinymiceOptions: this.coreService.prepareInitEditorSettings(),
        order: 1
      })
    );

    if (entity.id === 0) {
      controls.push(
        new Controls.Dropdown({
          key: "forumid",
          label: "Select Forum",
          value: entity.forumid,
          required: true,
          options: [{
            key: "",
            value: "Select Forum"
          }],
          //  maxLength: 150,
          order: 2,
          colsize: "col-md-6"
        })
      );
    }

    controls.push(
      new Controls.Textbox({
        key: "tags",
        label: "Tags",
        value: entity.tags,
        required: false,
        order: 3,
        maxLength: 1000,
        helpblock: `Enter one or more tags separated by comma`
      })
    );

    return controls.sort((a, b) => a.order - b.order);
  }
}
