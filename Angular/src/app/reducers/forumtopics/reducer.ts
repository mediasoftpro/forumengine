/* -------------------------------------------------------------------------- */
/*                           Product Name: BlogEngine                         */
/*                      Author: Mediasoftpro (Muhammad Irfan)                 */
/*                       Email: support@mediasoftpro.com                      */
/*       License: Read license.txt located on root of your application.       */
/*                     Copyright 2007 - 2020 @Mediasoftpro                    */
/* -------------------------------------------------------------------------- */

import {
  ForumTopicsAPIAction,
  ForumTopicsAPIActions,
  ForumsBLL,
} from './actions';
import { IForumTopicState, FORUM_TOPICS_INITIAL_STATE } from './model';
import { tassign } from 'tassign';

const bll = new ForumsBLL();
export const forumTopicReducer = (
  state = FORUM_TOPICS_INITIAL_STATE,
  action: ForumTopicsAPIActions
): IForumTopicState => {
  switch (action.type) {
    case ForumTopicsAPIAction.IS_ITEM_SELECTED:
      return tassign(state, { itemsselected: action.payload });

    case ForumTopicsAPIAction.UPDATE_FORUM:
      return tassign(state, { forums: action.payload, isforumsloaded: true });

    case ForumTopicsAPIAction.SELECT_ALL:
      return bll.selectAll(state, action);

    case ForumTopicsAPIAction.LOAD_STARTED:
      return tassign(state, { loading: true, error: null });

    case ForumTopicsAPIAction.LOAD_SUCCEEDED:
      return bll.loadSucceeded(state, action);

    case ForumTopicsAPIAction.LOAD_FAILED:
      return tassign(state, { loading: false, error: action.payload });

    /* update wholefilter options */
    case ForumTopicsAPIAction.UPDATE_FILTER_OPTIONS:
      return tassign(state, {
        filteroptions: Object.assign({}, state.filteroptions, action.payload),
      });

    /* update specific filter option */
    case ForumTopicsAPIAction.APPLY_FILTER:
      return bll.applyFilterChanges(state, action);

    /* update pagination current page */
    case ForumTopicsAPIAction.UPDATE_PAGINATION_CURRENTPAGE:
      return bll.updatePagination(state, action);

    /* add record */
    case ForumTopicsAPIAction.ADD_RECORD:
      return bll.addRecord(state, action);

    /* update record state */
    case ForumTopicsAPIAction.UPDATE_RECORD:
      return bll.updateRecord(state, action);

    /* apply changes (multiple selection items e.g delete selected records or enable selected records) */
    case ForumTopicsAPIAction.APPLY_CHANGES:
      return bll.applyChanges(state, action);

    // remove loader
    case ForumTopicsAPIAction.LOAD_END:
      return tassign(state, { loading: false });

    case ForumTopicsAPIAction.REFRESH_PAGINATION:
      return bll.refreshpagination(state, action);

    case ForumTopicsAPIAction.UPDATE_USER:
      return bll.updateUserFilter(state, action);

    case ForumTopicsAPIAction.REFRESH_DATA:
      const filterOptions = state.filteroptions;
      filterOptions.track_filter = true;
      return tassign(state, {
        filteroptions: Object.assign({}, state.filteroptions, filterOptions),
      });
    default:
      return state;
  }
};
