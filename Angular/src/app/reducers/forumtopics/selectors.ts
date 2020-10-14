import { IAppState } from "../store/model";
export const posts = (state: IAppState) => state.forumtopics.posts;
export const settings = (state: IAppState) => state.forumtopics.settings;
export const forums = (state: IAppState) => state.forumtopics.forums;
export const records = (state: IAppState) => state.forumtopics.records;
export const loading = (state: IAppState) => state.forumtopics.loading;
export const error = (state: IAppState) => state.forumtopics.error;
export const isloaded = (state: IAppState) => state.forumtopics.isloaded;
export const isforumsloaded = (state: IAppState) => state.forumtopics.isforumsloaded;
export const pagination = (state: IAppState) => state.forumtopics.pagination;
export const filteroptions = (state: IAppState) => state.forumtopics.filteroptions;
export const categories = (state: IAppState) => state.forumtopics.categories;
export const selectall = (state: IAppState) => state.forumtopics.selectall;
export const itemsselected = (state: IAppState) => state.forumtopics.itemsselected;
