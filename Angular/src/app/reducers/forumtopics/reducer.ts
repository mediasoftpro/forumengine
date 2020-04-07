/* -------------------------------------------------------------------------- */
/*                           Product Name: ForumEngine                        */
/*                            Author: Mediasoftpro                            */
/*                       Email: support@mediasoftpro.com                      */
/*       License: Read license.txt located on root of your application.       */
/*                     Copyright 2007 - 2020 @Mediasoftpro                    */
/* -------------------------------------------------------------------------- */

import {
  ForumTopicsAPIAction,
  ForumTopicsAPIActions,
  ForumsBLL
} from "./actions";
import { IForumTopicState, FORUM_TOPICS_INITIAL_STATE } from "./model";
import { tassign } from "tassign";
import { Action } from "redux";

export function createForumTopicsReducer() {
  return function forumTopicsReducer(
    state: IForumTopicState = FORUM_TOPICS_INITIAL_STATE,
    a: Action
  ): IForumTopicState {
    const action = a as ForumTopicsAPIAction;
    const bll = new ForumsBLL();
    /*if (!action.meta) {
      return state;
    }*/

    switch (action.type) {
      case ForumTopicsAPIActions.IS_ITEM_SELECTED:
        return tassign(state, { itemsselected: action.payload });

      case ForumTopicsAPIActions.UPDATE_FORUM:
        return tassign(state, { forums: action.payload, isforumsloaded: true });

      case ForumTopicsAPIActions.SELECT_ALL:
        return bll.selectAll(state, action);

      case ForumTopicsAPIActions.LOAD_STARTED:
        return tassign(state, { loading: true, error: null });

      case ForumTopicsAPIActions.LOAD_SUCCEEDED:
        return bll.loadSucceeded(state, action);

      case ForumTopicsAPIActions.LOAD_FAILED:
        return tassign(state, { loading: false, error: action.error });

      /* update wholefilter options */
      case ForumTopicsAPIActions.UPDATE_FILTER_OPTIONS:
        return tassign(state, {
          filteroptions: Object.assign({}, state.filteroptions, action.payload)
        });

      /* update specific filter option */
      case ForumTopicsAPIActions.APPLY_FILTER:
        return bll.applyFilterChanges(state, action);

      /* update pagination current page */
      case ForumTopicsAPIActions.UPDATE_PAGINATION_CURRENTPAGE:
        return bll.updatePagination(state, action);

      /* add record */
      case ForumTopicsAPIActions.ADD_RECORD:
        return bll.addRecord(state, action);

      /* update record state */
      case ForumTopicsAPIActions.UPDATE_RECORD:
        return bll.updateRecord(state, action);

      /* apply changes (multiple selection items e.g delete selected records or enable selected records) */
      case ForumTopicsAPIActions.APPLY_CHANGES:
        return bll.applyChanges(state, action);

      // remove loader
      case ForumTopicsAPIActions.LOAD_END:
        return tassign(state, { loading: false });

      case ForumTopicsAPIActions.REFRESH_PAGINATION:
        return bll.refreshpagination(state, action);

      case ForumTopicsAPIActions.UPDATE_USER:
        return bll.updateUserFilter(state, action);

      case ForumTopicsAPIActions.REFRESH_DATA:
        const filterOptions = state.filteroptions;
        filterOptions.track_filter = true;
        return tassign(state, {
          filteroptions: Object.assign({}, state.filteroptions, filterOptions)
        });
    }

    return state;
  };
}
