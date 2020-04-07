/* -------------------------------------------------------------------------- */
/*                           Product Name: ForumEngine                        */
/*                            Author: Mediasoftpro                            */
/*                       Email: support@mediasoftpro.com                      */
/*       License: Read license.txt located on root of your application.       */
/*                     Copyright 2007 - 2020 @Mediasoftpro                    */
/* -------------------------------------------------------------------------- */

import { Injectable } from "@angular/core";
import { dispatch } from "@angular-redux/store";
import { FluxStandardAction } from "flux-standard-action";
import { tassign } from "tassign";
import { CoreService } from '../../admin/core/coreService';
import { IForumTopicState } from "./model";

type Payload = any;
interface MetaData {}
export type ForumTopicsAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class ForumTopicsAPIActions {
  static readonly LOAD_STARTED = "FORUMTOPICS_LOAD_STARTED";
  static readonly LOAD_SUCCEEDED = "FORUMTOPICS_LOAD_SUCCEEDED";
  static readonly LOAD_FAILED = "FORUMTOPICS_LOAD_FAILED";

  static readonly APPLY_CHANGES = "FORUMTOPICS_APPLY_CHANGES";
  static readonly APPLY_CHANGES_SUCCEEDED =
    "FORUMTOPICS_APPLY_CHANGES_SUCCEEDED";
  static readonly APPLY_CHANGES_FAILED = "FORUMTOPICS_APPLY_CHANGES_SUCCEEDED";

  static readonly UPDATE_FILTER_OPTIONS = "FORUMTOPICS_UPDATE_FILTER_OPTIONS";
  static readonly APPLY_FILTER = "FORUMTOPICS_APPLY_FILTER";
  static readonly UPDATE_PAGINATION_CURRENTPAGE =
    "FORUMTOPICS_UPDATE_PAGINATION_CURRENTPAGE";
  static readonly UPDATE_CATEGORIES = "FORUMTOPICS_UPDATE_CATEGORIES";

  static readonly SELECT_ALL = "FORUMTOPICS_SELECT_ALL";
  static readonly IS_ITEM_SELECTED = "FORUMTOPICS_IP_IS_ITEM_SELECTED";

  static readonly ADD_RECORD = "FORUMTOPICS_ADD_RECORD";
  static readonly UPDATE_RECORD = "FORUMTOPICS_UPDATE_RECORD";
  static readonly REMOVE_RECORD = "FORUMTOPICS_REMOVE_RECORD";
  static readonly UPDATE_FORUM = "FORUMTOPICS_UPDATE_FORUM";
  // REFERESH LOAD
  static readonly LOAD_END = "FORUMTOPICS_YT_LOADEND";
  static readonly REFRESH_DATA = "FORUMTOPICS_REFRESH_DATA";
  static readonly REFRESH_PAGINATION = "FORUMTOPICS_REFRESH_PAGINATION";
  static readonly UPDATE_USER = "FORUMTOPICS_UPDATE_USER"; // update user info in filter options (to load logged in user data)
  @dispatch()
  loadStarted = (): ForumTopicsAPIAction => ({
    type: ForumTopicsAPIActions.LOAD_STARTED,
    // meta: { },
    payload: null
  });

  @dispatch()
  loadSucceeded = (payload: Payload): ForumTopicsAPIAction => ({
    type: ForumTopicsAPIActions.LOAD_SUCCEEDED,
    // meta: { },
    payload
  });

  @dispatch()
  loadFailed = (error): ForumTopicsAPIAction => ({
    type: ForumTopicsAPIActions.LOAD_FAILED,
    // meta: { },
    payload: null,
    error
  });

  @dispatch()
  applyChanges = (payload: Payload): ForumTopicsAPIAction => ({
    type: ForumTopicsAPIActions.APPLY_CHANGES,
    // meta: { },
    payload
  });

  @dispatch()
  actionSucceeded = (payload: Payload): ForumTopicsAPIAction => ({
    type: ForumTopicsAPIActions.APPLY_CHANGES_SUCCEEDED,
    // meta: { },
    payload: payload
  });

  @dispatch()
  actionFailed = (error): ForumTopicsAPIAction => ({
    type: ForumTopicsAPIActions.APPLY_CHANGES_SUCCEEDED,
    // meta: { },
    payload: null,
    error
  });

  @dispatch()
  updateFilterOptions = (payload: Payload): ForumTopicsAPIAction => ({
    type: ForumTopicsAPIActions.UPDATE_FILTER_OPTIONS,
    // meta: { },
    payload: payload
  });

  @dispatch()
  applyFilter = (payload: Payload): ForumTopicsAPIAction => ({
    type: ForumTopicsAPIActions.APPLY_FILTER,
    // meta: { },
    payload: payload
  });

  @dispatch()
  updatePaginationCurrentPage = (payload: Payload): ForumTopicsAPIAction => ({
    type: ForumTopicsAPIActions.UPDATE_PAGINATION_CURRENTPAGE,
    // meta: { },
    payload: payload
  });

  @dispatch()
  updateCategories = (payload: Payload): ForumTopicsAPIAction => ({
    type: ForumTopicsAPIActions.UPDATE_CATEGORIES,
    // meta: { },
    payload: payload
  });

  @dispatch()
  updateForums = (payload: Payload): ForumTopicsAPIAction => ({
    type: ForumTopicsAPIActions.UPDATE_FORUM,
    // meta: { },
    payload: payload
  });

  @dispatch()
  selectAll = (payload: Payload): ForumTopicsAPIAction => ({
    type: ForumTopicsAPIActions.SELECT_ALL,
    // meta: { },
    payload: payload
  });

  @dispatch()
  updateItemsSelectionStatus = (payload: Payload): ForumTopicsAPIAction => ({
    type: ForumTopicsAPIActions.IS_ITEM_SELECTED,
    // meta: { },
    payload: payload
  });

  @dispatch()
  addRecord = (payload: Payload): ForumTopicsAPIAction => ({
    type: ForumTopicsAPIActions.ADD_RECORD,
    // meta: { },
    payload: payload
  });

  @dispatch()
  updateRecord = (payload: Payload): ForumTopicsAPIAction => ({
    type: ForumTopicsAPIActions.UPDATE_RECORD,
    // meta: { },
    payload: payload
  });

  @dispatch()
  loadEnd = (): ForumTopicsAPIAction => ({
    type: ForumTopicsAPIActions.LOAD_END,
    // meta: { },
    payload: null
  });

  @dispatch()
  reloadList = (): ForumTopicsAPIAction => ({
    type: ForumTopicsAPIActions.REFRESH_DATA,
    // meta: { },
    payload: null
  });

  @dispatch()
  refresh_pagination = (payload: Payload): ForumTopicsAPIAction => ({
    type: ForumTopicsAPIActions.REFRESH_PAGINATION,
    // meta: { },
    payload: payload
  });

  @dispatch()
  updateFilter = (payload: Payload): ForumTopicsAPIAction => ({
    type: ForumTopicsAPIActions.UPDATE_USER,
    // meta: { },
    payload: payload
  });
}

export class ForumsBLL {
  service = new CoreService();
  loadSucceeded(state: IForumTopicState, action: any) {
    if (action.payload.posts.length > 0) {
      for (const item of action.payload.posts) {
        item.enc_id = this.service.encrypt(item.id);
      }
    }
    // update totalrecords object in pagination prop
    const _pagination = state.pagination;
    _pagination.totalRecords = action.payload.records;
    _pagination.pageSize = state.filteroptions.pagesize;
    _pagination.currentPage = state.filteroptions.pagenumber;
    // avoid loading categories again in next call
    const _filteroption = state.filteroptions;
    _filteroption.loadstats = false;

    return tassign(state, {
      posts: action.payload.posts,
      settings: action.payload.settings,
      records: action.payload.records,
      pagination: _pagination,
      filteroptions: _filteroption,
      loading: false,
      isloaded: true
    });
  }

  applyFilterChanges(state: IForumTopicState, action: any) {
    const filters = state.filteroptions;
    for (const prop in filters) {
      if (prop === action.payload.attr) {
        filters[prop] = action.payload.value;
      }
    }
    filters.track_filter = true; // force filter subscriber to call loadRecord function to refresh data
    return tassign(state, {
      filteroptions: Object.assign({}, state.filteroptions, filters)
    });
  }

  updatePagination(state: IForumTopicState, action: any) {
    const pagination = state.pagination;
    pagination.currentPage = action.payload.currentpage;

    return tassign(state, {
      pagination: Object.assign({}, state.pagination, pagination)
    });
  }

  selectAll(state: IForumTopicState, action: any) {
    const posts = state.posts;
    for (const item of posts) {
      item.Selected = action.payload;
    }

    return tassign(state, {
      selectall: action.payload,
      posts: posts,
      itemsselected: action.payload
    });
  }

  addRecord(state: IForumTopicState, action: any) {
    const posts = state.posts;
    posts.unshift(action.payload);
    return tassign(state, { posts: posts });
  }

  updateRecord(state: IForumTopicState, action: any) {
    const posts = state.posts;
    for (let post of posts) {
      if (post.id === action.payload.id) {
        post = Object.assign({}, post, action.payload);
      }
    }
    return tassign(state, { posts: Object.assign([], state.posts, posts) });
  }

  /*  removeRecord(state: IForumTopicState, action: any) {
      const posts = state.posts;
      console.log('remove record');
      console.log(action.payload);

      if (action.payload.index > -1) {
         posts.splice(action.payload.index, 1);
      }
      return tassign(state, { posts: Object.assign([], state.posts, posts) });
  } */

  applyChanges(state: IForumTopicState, action: any) {
    const _updated_state = state.posts;
    for (const selected of action.payload.SelectedItems) {
      for (const item of _updated_state) {
        if (item.id === selected.id) {
          if (selected.actionstatus === "delete") {
            item.isdeleted = true;
          } else {
            for (const prop in item) {
              if (prop === action.payload.isenabled.attr) {
                item[prop] = action.payload.isenabled.value;
              }
            }
          }
        }
      }
    }
    return tassign(state, { posts: _updated_state });
  }

  updateUserFilter(state: IForumTopicState, action: any) {
    const filters = state.filteroptions;
     filters.userid = action.payload.id; 
    return tassign(state, { filteroptions: filters });
  }

  refreshpagination(state: IForumTopicState, action: any) {
    const pagination = state.pagination;
    pagination.totalRecords = action.payload.totalrecords;
    pagination.pageSize = action.payload.pagesize;
    return tassign(state, { pagination: pagination });
    // return tassign(state, { pagination: Object.assign({}, state.pagination, pagination) });
  }
}
