/* -------------------------------------------------------------------------- */
/*                           Product Name: BlogEngine                         */
/*                      Author: Mediasoftpro (Muhammad Irfan)                 */
/*                       Email: support@mediasoftpro.com                      */
/*       License: Read license.txt located on root of your application.       */
/*                     Copyright 2007 - 2020 @Mediasoftpro                    */
/* -------------------------------------------------------------------------- */

import { ForumAPIAction, ForumAPIActions, ForumsBLL } from './actions';
import { IForumState, FORUM_INITIAL_STATE } from './model';
import { tassign } from 'tassign';

const bll = new ForumsBLL();
export const forumReducer = (
  state = FORUM_INITIAL_STATE,
  action: ForumAPIActions
): IForumState => {
  switch (action.type) {
    case ForumAPIAction.IS_ITEM_SELECTED:
      return tassign(state, { itemsselected: action.payload });

    case ForumAPIAction.SELECT_ALL:
      return bll.selectAll(state, action);

    case ForumAPIAction.LOAD_STARTED:
      return tassign(state, { loading: true, error: null });

    case ForumAPIAction.LOAD_SUCCEEDED:
      return bll.loadSucceeded(state, action);

    case ForumAPIAction.LOAD_FAILED:
      return tassign(state, { loading: false, error: action.payload });

    /* update wholefilter options */
    case ForumAPIAction.UPDATE_FILTER_OPTIONS:
      return tassign(state, {
        filteroptions: Object.assign({}, state.filteroptions, action.payload),
      });

    /* update specific filter option */
    case ForumAPIAction.APPLY_FILTER:
      return bll.applyFilterChanges(state, action);

    /* update pagination current page */
    case ForumAPIAction.UPDATE_PAGINATION_CURRENTPAGE:
      return bll.updatePagination(state, action);

    /* add record */
    case ForumAPIAction.ADD_RECORD:
      return bll.addRecord(state, action);

    /* update record state */
    case ForumAPIAction.UPDATE_RECORD:
      return bll.updateRecord(state, action);

    case ForumAPIAction.UPDATE_CATEGORIES:
      return tassign(state, { categories: action.payload });

    /* apply changes (multiple selection items e.g delete selected records or enable selected records) */
    case ForumAPIAction.APPLY_CHANGES:
      return bll.applyChanges(state, action);
    // remove loader
    case ForumAPIAction.LOAD_END:
      return tassign(state, { loading: false });

    case ForumAPIAction.REFRESH_PAGINATION:
      return bll.refreshpagination(state, action);

    case ForumAPIAction.REFRESH_DATA:
      const filterOptions = state.filteroptions;
      filterOptions.track_filter = true;
      return tassign(state, {
        filteroptions: Object.assign({}, state.filteroptions, filterOptions),
      });
    default:
      return state;
  }
};
