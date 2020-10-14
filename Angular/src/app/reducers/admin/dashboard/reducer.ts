/* -------------------------------------------------------------------------- */
/*                          Product Name: ForumEngine                         */
/*                      Author: Mediasoftpro (Muhammad Irfan)                 */
/*                       Email: support@mediasoftpro.com                      */
/*       License: Read license.txt located on root of your application.       */
/*                     Copyright 2007 - 2020 @Mediasoftpro                    */
/* -------------------------------------------------------------------------- */

import {
  IDashboardAPIAction,
  IDashboardAPIActions,
  DashboardBLL,
} from "./actions";
import { IDashboard, ADMIN_DASHBOARD_INITIAL_STATE } from "./model";
import { tassign } from "tassign";

const bll = new DashboardBLL();
export const dashboardReducer = (
  state = ADMIN_DASHBOARD_INITIAL_STATE,
  action: IDashboardAPIActions
): IDashboard => {
  switch (action.type) {
    case IDashboardAPIAction.LOAD_STATS_STARTED:
      return tassign(state, { stats_loading: true, stats_error: null });

    case IDashboardAPIAction.LOAD_TOPICS_STARTED:
      return tassign(state, { topic_loading: true, topic_error: null });

    case IDashboardAPIAction.LOAD_BLOG_STARTED:
      return tassign(state, { blog_loading: true, blog_error: null });

    case IDashboardAPIAction.LOAD_USER_STARTED:
      return tassign(state, { user_loading: true, user_error: null });

    case IDashboardAPIAction.LOAD_TOPICS_REPORT_STARTED:
      return tassign(state, {
        topic_report_loading: true,
        topic_report_error: null,
      });

    case IDashboardAPIAction.LOAD_BLOG_REPORT_STARTED:
      return tassign(state, {
        blog_report_loading: true,
        blog_report_error: null,
      });

    case IDashboardAPIAction.LOAD_USER_REPORT_STARTED:
      return tassign(state, {
        user_report_loading: true,
        user_report_error: null,
      });

    case IDashboardAPIAction.LOAD_STATS_SUCCEEDED:
      return bll.loadStatsSucceeded(state, action);

    case IDashboardAPIAction.LOAD_TOPICS_SUCCEEDED:
      return bll.loadTopicsSucceeded(state, action);

    case IDashboardAPIAction.LOAD_TOPICS_SUCCEEDED:
      return bll.loadTopicsSucceeded(state, action);

    case IDashboardAPIAction.LOAD_USER_SUCCEEDED:
      return bll.loadUsersSucceeded(state, action);

    case IDashboardAPIAction.LOAD_BLOG_SUCCEEDED:
      return bll.loadBlogsSucceeded(state, action);

    case IDashboardAPIAction.LOAD_TOPICS_REPORT_SUCCEEDED:
      return bll.loadTopicReportsSucceeded(state, action);

    case IDashboardAPIAction.LOAD_BLOG_REPORT_SUCCEEDED:
      return bll.loadBlogReportsSucceeded(state, action);

    case IDashboardAPIAction.LOAD_USER_REPORT_SUCCEEDED:
      return bll.loadUserReportsSucceeded(state, action);

    case IDashboardAPIAction.LOAD_STATS_FAILED:
      return tassign(state, {
        stats_loading: false,
        stats_error: action.payload,
      });

    case IDashboardAPIAction.LOAD_TOPICS_FAILED:
      return tassign(state, {
        topic_loading: false,
        topic_error: action.payload,
      });

    case IDashboardAPIAction.LOAD_BLOG_FAILED:
      return tassign(state, {
        blog_loading: false,
        blog_error: action.payload,
      });

    case IDashboardAPIAction.LOAD_USER_FAILED:
      return tassign(state, {
        user_loading: false,
        user_error: action.payload,
      });

    case IDashboardAPIAction.LOAD_TOPICS_REPORT_FAILED:
      return tassign(state, {
        topic_report_loading: false,
        topic_report_error: action.payload,
      });

    case IDashboardAPIAction.LOAD_BLOG_REPORT_FAILED:
      return tassign(state, {
        blog_report_loading: false,
        blog_report_error: action.payload,
      });

    case IDashboardAPIAction.LOAD_USER_REPORT_FAILED:
      return tassign(state, {
        user_report_loading: false,
        user_report_error: action.payload,
      });
    default:
      return state;
  }
};

