import { IAppState } from "../store/model";
export const posts = (state: IAppState) => state.forums.posts;
export const settings = (state: IAppState) => state.forums.settings;
export const records = (state: IAppState) => state.forums.records;
export const loading = (state: IAppState) => state.forums.loading;
export const error = (state: IAppState) => state.forums.error;
export const isloaded = (state: IAppState) => state.forums.isloaded;
export const pagination = (state: IAppState) => state.forums.pagination;
export const filteroptions = (state: IAppState) => state.forums.filteroptions;
export const categories = (state: IAppState) => state.forums.categories;
export const selectall = (state: IAppState) => state.forums.selectall;
export const itemsselected = (state: IAppState) => state.forums.itemsselected;
