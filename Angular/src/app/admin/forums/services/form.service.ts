/* -------------------------------------------------------------------------- */
/*                           Product Name: ForumEngine                        */
/*                            Author: Mediasoftpro                            */
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
  getControls(entity: OPTIONS.ForumEntity) {
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

    controls.push(
      new Controls.Textbox({
        key: "priority",
        label: "Priority",
        value: entity.priority,
        required: true,
        order: 2,
        maxLength: 4,
        helpblock: `Prioritize forum topics based on numbers`
      })
    );

    controls.push(
      new Controls.MultiDropdown({
        key: "categories",
        label: "Select Categories",
        value: this.coreService.prepareSelectedItems(entity.category_list),
        multiselectOptions: this.coreService.getMultiCategorySettings(),
        required: true,
        helpblock: `Select one or more categories to associate blog post`,
        order: 3
      })
    );

    return controls.sort((a, b) => a.order - b.order);
  }
}
