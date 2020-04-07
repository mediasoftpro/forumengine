/* -------------------------------------------------------------------------- */
/*                           Product Name: ForumEngine                        */
/*                            Author: Mediasoftpro                            */
/*                       Email: support@mediasoftpro.com                      */
/*       License: Read license.txt located on root of your application.       */
/*                     Copyright 2007 - 2020 @Mediasoftpro                    */
/* -------------------------------------------------------------------------- */

import { ForumAPIAction, ForumsAPIActions, ForumsBLL } from "./actions";
import { IForumState, FORUM_INITIAL_STATE } from "./model";
import { tassign } from "tassign";
import { Action } from "redux";

export function createForumsReducer() {
  return function forumsReducer(
    state: IForumState = FORUM_INITIAL_STATE,
    a: Action
  ): IForumState {
    const action = a as ForumAPIAction;
    const bll = new ForumsBLL();
    /*if (!action.meta) {
      return state;
    }*/

    switch (action.type) {
      case ForumsAPIActions.IS_ITEM_SELECTED:
        return tassign(state, { itemsselected: action.payload });

      case ForumsAPIActions.SELECT_ALL:
        return bll.selectAll(state, action);

      case ForumsAPIActions.LOAD_STARTED:
        return tassign(state, { loading: true, error: null });

      case ForumsAPIActions.LOAD_SUCCEEDED:
        return bll.loadSucceeded(state, action);

      case ForumsAPIActions.LOAD_FAILED:
        return tassign(state, { loading: false, error: action.error });

      /* update wholefilter options */
      case ForumsAPIActions.UPDATE_FILTER_OPTIONS:
        return tassign(state, {
          filteroptions: Object.assign({}, state.filteroptions, action.payload)
        });

      /* update specific filter option */
      case ForumsAPIActions.APPLY_FILTER:
        return bll.applyFilterChanges(state, action);

      /* update pagination current page */
      case ForumsAPIActions.UPDATE_PAGINATION_CURRENTPAGE:
        return bll.updatePagination(state, action);

      /* add record */
      case ForumsAPIActions.ADD_RECORD:
        return bll.addRecord(state, action);

      /* update record state */
      case ForumsAPIActions.UPDATE_RECORD:
        return bll.updateRecord(state, action);

      case ForumsAPIActions.UPDATE_CATEGORIES:
        return tassign(state, { categories: action.payload });

      /* apply changes (multiple selection items e.g delete selected records or enable selected records) */
      case ForumsAPIActions.APPLY_CHANGES:
        return bll.applyChanges(state, action);
      // remove loader
      case ForumsAPIActions.LOAD_END:
        return tassign(state, { loading: false });

      case ForumsAPIActions.REFRESH_PAGINATION:
        return bll.refreshpagination(state, action);

      case ForumsAPIActions.REFRESH_DATA:
        const filterOptions = state.filteroptions;
        filterOptions.track_filter = true;
        return tassign(state, {
          filteroptions: Object.assign({}, state.filteroptions, filterOptions)
        });
    }

    return state;
  };
}
