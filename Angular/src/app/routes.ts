/* -------------------------------------------------------------------------- */
/*                           Product Name: ForumEngine                        */
/*                            Author: Mediasoftpro                            */
/*                       Email: support@mediasoftpro.com                      */
/*       License: Read license.txt located on root of your application.       */
/*                     Copyright 2007 - 2020 @Mediasoftpro                    */
/* -------------------------------------------------------------------------- */

import { Routes } from "@angular/router";
import { JMediaLazyGuard } from "./j-media-guard.guard";

export const appRoutes: Routes = [
 
  {
    path: "login",
    loadChildren: "./admin/login/login.module#LoginModule"
  },
  {
    path: "forums",
    //canActivate: [JMediaLazyGuard],
    loadChildren: "./admin/forums/forums.module#ForumsModule"
  },
  {
    path: "forumtopics",
    //canActivate: [JMediaLazyGuard],
    loadChildren: "./admin/forumtopics/forums.module#ForumTopicsModule"
  },
  {
    path: "settings",
    //canActivate: [JMediaLazyGuard],
    loadChildren: "./admin/settings/settings.module#SettingsModule"
  },
  
  // my account routes
  {
    path: "email-options",
    //canActivate: [JMediaLazyGuard],
    loadChildren:
      "./account/email-options/emailoptions.module#EmailOptionModule"
  },
  {
    path: "manage-account",
    //canActivate: [JMediaLazyGuard],
    loadChildren:
      "./account/manage-account/manageaccount.module#ManageAccountModule"
  },
  {
    path: "profile-setup",
    //canActivate: [JMediaLazyGuard],
    loadChildren:
      "./account/profile-setup/profile.setup.module#ProfileSetupModule"
  },
  {
    path: "my-topics",
    //canActivate: [JMediaLazyGuard],
    loadChildren: "./account/forumtopics/forums.module#ForumTopicsModule"
  },
  {
    path: "setup",
    loadChildren: "./setup/index/index.module#SetupModule"
  },
  {
    path: "",
    loadChildren: "./admin/dashboard/dashboard.module#DashboardModule"
  },
  {
    path: "**",
    loadChildren: "./pages/notfound/notfound.module#NotFoundModule"
  }
];
