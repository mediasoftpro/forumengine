/* -------------------------------------------------------------------------- */
/*                           Product Name: ForumEngine                        */
/*                            Author: Mediasoftpro                            */
/*                       Email: support@mediasoftpro.com                      */
/*       License: Read license.txt located on root of your application.       */
/*                     Copyright 2007 - 2020 @Mediasoftpro                    */
/* -------------------------------------------------------------------------- */

export class NormalRegex {
  static readonly USERNAME_REGEX = "^[a-z0-9_-]{5,15}$";
  static readonly PASSWORD_REGEX =
    "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$";
  static readonly WEBSITE_REGEX =
    "https?://(www.)?[-a-zA-Z0-9@:%._+~#=]{2,256}.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)";
}

export class AppNavigation {
  
  // myaccount sub menus
  static readonly MYACCOUNT_SETTINGS = [
    { title: "Overview", value: "/", index: 0 },
    { title: "Profile Setup", value: "/profile-setup", index: 1 },
    { title: "Email Options", value: "/email-options", index: 2 },
    { title: "Manage Account", value: "/manage-account", index: 4 }
  ];

  // videos sub menus
 
  // forums
  static readonly MYACCOUNT_FORUMS = [
    { title: "My Topics", value: "/my-topics", index: 0 }
  ];

}

export class NavigationMenuIndex {
  // Index to highlight and load appropriate sub menus for different contents
  // top menu index
  static readonly TOPMENU_SETTINGS_INDEX = 0;
  static readonly TOPMENU_FORUMS_INDEX = 5;

  // settings sub menu indexes
  static readonly SETTINGS_OVERVIEW_INDEX = 0;
  static readonly SETTINGS_PROFILE_SETUP_INDEX = 1;
  static readonly SETTINGS_EMAIL_OPTIONS_INDEX = 2;
  static readonly SETTINGS_MANAGE_ACCOUNT_INDEX = 4;

  // mytopics indexes
  static readonly FORUM_TOPICS_INDEX = 0;

}

export class ContentTypes {
  
  
  static readonly ROLE_TYPES = [
    {
      title: "Roles",
      value: "1",
      add_title: "Add Role",
      add_tooltip: "Add new role"
    },
    {
      title: "Role Objects",
      value: "2",
      add_title: "Add Role Object",
      add_tooltip: "Add new role"
    }
  ];

  static readonly USER_TYPES = [
    { title: "User", value: "Member" },
    { title: "Administrator", value: "Admin" },
    { title: "Certified User", value: "Manager" }
  ];
}
