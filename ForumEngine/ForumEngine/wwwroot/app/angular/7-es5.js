function _classCallCheck(e,o){if(!(e instanceof o))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,o){for(var t=0;t<o.length;t++){var a=o[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function _createClass(e,o,t){return o&&_defineProperties(e.prototype,o),t&&_defineProperties(e,t),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{Pfcf:function(e,o,t){"use strict";t.d(o,"a",(function(){return n}));var a=t("dNLF"),l=t("/4iV"),r=t("fXoL"),n=function(){var e=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"getControls",value:function(e,o,t){var a=arguments.length>3&&void 0!==arguments[3]&&arguments[3];switch(o){case"general":switch(t){case"dbsetup":return this.prepareDatabaseSettingControls(e);case"dbusersetup":return this.prepareDatabaseUserSettingControls(e);case"general":return this.prepareGeneralSettingControls(e,a);case"media":return this.prepareMediaSettingControls(e,a);case"features":return this.prepareFeatureSettingControls(e,a);case"listings":return this.prepareListingSettingControls(e,a);case"authentication":return this.prepareAuthenticationSettingControls(e,a);case"registration":return this.prepareRegistrationSettingControls(e,a);case"aws":return this.prepareAWSSettingControls(e,a);case"social":return this.prepareSocialSettingControls(e,a);case"contact":return this.prepareContactSettingControls(e,a);case"smtp":return this.prepareSmtpSettingControls(e,a);case"rechapcha":return this.prepareRechapchaSettingControls(e,a);default:return[]}break;case"forums":switch(t){case"general":return this.prepareForumsGeneralControls(e);default:return[]}break;default:return[]}}},{key:"prepareDatabaseSettingControls",value:function(e){var o=[];return o.push(new a.h({key:"host",label:"Host Name",value:e.host,colsize:"col-md-12",required:!0,helpblock:"Database host url with port e.g example.com,1433",order:0})),o.push(new a.h({key:"database",label:"Database Name",value:e.database,colsize:"col-md-12",required:!0,helpblock:"",order:2})),o.push(new a.h({key:"userid",label:"User Name",value:e.userid,colsize:"col-md-12",required:!0,helpblock:"",order:3})),o.push(new a.h({key:"password",label:"Password",type:"password",minLength:5,maxLength:20,required:!0,pattern:l.d.PASSWORD_REGEX,colsize:"col-md-12",value:e.password,helpblock:"",order:4})),o.sort((function(e,o){return e.order-o.order}))}},{key:"prepareDatabaseUserSettingControls",value:function(e){var o=[];return o.push(new a.h({key:"username",label:"User Name",value:e.username,colsize:"col-md-12",required:!0,helpblock:"",order:0})),o.push(new a.h({key:"email",label:"Email Address",value:e.email,colsize:"col-md-12",required:!0,email:!0,order:1})),o.push(new a.h({key:"firstname",label:"First Name",value:e.firstname,colsize:"col-md-12",helpblock:"",order:2})),o.push(new a.h({key:"lastname",label:"Last Name",value:e.lastname,colsize:"col-md-12",helpblock:"",order:3})),o.push(new a.h({key:"password",label:"Password",type:"password",value:e.password,minLength:5,maxLength:20,required:!0,pattern:l.d.PASSWORD_REGEX,colsize:"col-md-12",helpblock:"",order:4})),o.sort((function(e,o){return e.order-o.order}))}},{key:"prepareGeneralSettingControls",value:function(e,o){var t=[];return t.push(new a.b({key:"site_theme",label:"Site Theme",required:!0,value:e.site_theme,options:[{key:"cerulean",value:"Cerulean"},{key:"cosmo",value:"Cosmo"},{key:"cyborg",value:"Cyborg"},{key:"darkly",value:"Darkly"},{key:"flatly",value:"Flatly"},{key:"journal",value:"Journal"},{key:"litera",value:"Litera"},{key:"lumen",value:"Lumen"},{key:"materia",value:"Materia"},{key:"minty",value:"Minty"},{key:"pulse",value:"Pulse"},{key:"sandstone",value:"Sandstone"},{key:"simplex",value:"Simplex"},{key:"sketchy",value:"Sketchy"},{key:"slate",value:"Slate"},{key:"solar",value:"Solar"},{key:"spacelab",value:"Space Lab"},{key:"superhero",value:"Super Hero"},{key:"united",value:"United"},{key:"yeti",value:"Yeti"}],helpblock:"Choose theme name from list of available themes (bootswatch) unless you used your own custom theme / template",order:0})),t.push(new a.h({key:"jwt_private_key",label:"JWT Private Key",value:e.jwt_private_key,colsize:"col-md-12",helpblock:"Setup / Configure JWT Private Key, check https://mkjwk.org/",order:1})),t.push(new a.h({key:"website_title",label:"Website Title",value:e.website_title,colsize:"col-md-12",helpblock:"Website title used within whole web application",order:1})),o||t.push(new a.h({key:"website_description",label:"Website Description",value:e.website_description,colsize:"col-md-12",helpblock:"General website description or slogan to be used in some part of application",order:2})),t.push(new a.h({key:"page_caption",label:"Page Caption",value:e.page_caption,colsize:"col-md-12",helpblock:"Append title with each page title on dynamic pages e.g [Page Title] | [Page Caption]",order:3})),o||t.push(new a.h({key:"website_phone",label:"Website Phone",value:e.website_phone,colsize:"col-md-12",helpblock:"Phone number used within website for support purpose unless you customize it manually.",order:5})),t.push(new a.h({key:"admin_mail",label:"Admin Email Address",value:e.admin_mail,colsize:"col-md-12",helpblock:"Admin support email used for sending mails and other support purposes within website.",order:6})),t.push(new a.h({key:"admin_mail_name",label:"Admin Email Name",value:e.admin_mail_name,colsize:"col-md-12",helpblock:"Email name used as sender name when sending email to users from website.",order:7})),o||t.push(new a.h({key:"pagination_links",label:"Pagination Links",value:e.pagination_links.toString(),colsize:"col-md-6",helpblock:"Maxiumum pagination links to be used, 0 for unlimited",order:8})),t.push(new a.b({key:"pagination_type",label:"Pagination Type",required:!0,value:e.pagination_type.toString(),options:[{key:0,value:"Normal"},{key:1,value:"Advance"},{key:2,value:"Simple"}],order:9})),o||t.push(new a.b({key:"screen_content",label:"Screen Content",required:!0,value:e.screen_content.toString(),options:[{key:0,value:"Screen"},{key:1,value:"Screen & Replace"},{key:2,value:"None"}],helpblock:"Use type of content screening approach to scan and screen words matched with black listed dictionary words (0: screen, 1: screen & replace 2: None)",order:10})),t.push(new a.b({key:"content_approval",label:"Content Approval",required:!0,value:e.content_approval.toString(),options:[{key:1,value:"Automatic Approval"},{key:0,value:"Need Moderator Review"}],helpblock:"Set option to review user posted contents 1: Automatical approval, 0: Need moderator review before approval",order:11})),o||t.push(new a.h({key:"spam_count",label:"Maximum Report Count",value:e.spam_count.toString(),colsize:"col-md-12",helpblock:"Maximum number of reports count before forcing content to block until review.",order:11})),t.push(new a.h({key:"cache_duration",label:"Cache Duration",value:e.cache_duration.toString(),colsize:"col-md-12",pattern:"[0-9]+",required:!0,helpblock:"Set duration in seconds to cache content if enabled cache for. 0 for disabled cache.",order:12})),t.push(new a.b({key:"default_culture",label:"Default Culture",required:!0,value:e.default_culture.toString(),options:[{key:"en-US",value:"en-US"},{key:"ar-SA",value:"ar-SA"},{key:"de-DE",value:"de-DE"},{key:"es-ES",value:"es-ES"},{key:"fr-FR",value:"fr-FR"},{key:"it-IT",value:"it-IT"},{key:"pt-BR",value:"pt-BR"},{key:"ru-RU",value:"ru-RU"},{key:"tr-TR",value:"tr-TR"},{key:"ja-JP",value:"ja-JP"},{key:"zh-CHS",value:"zh-CHS"}],helpblock:"Set default culture for your website if language functionality enabled or available",order:17})),t.push(new a.a({key:"store_searches",label:"Store Searches",value:e.store_searches,checked:e.store_searches,helpblock:"Store user types searches for creating auto search labels, auto suggestions and other internal purposes",order:14})),o||(t.push(new a.h({key:"max_cache_pages",label:"Maximum Pages to Cache",value:e.max_cache_pages.toString(),colsize:"col-md-12",pattern:"[0-9]+",required:!0,helpblock:"Maximum no of pages to be cached for each type of listing within pagination. 0 for unlimited",order:13})),t.push(new a.a({key:"store_ipaddress",label:"Store Ip Address",value:e.store_ipaddress,checked:e.store_ipaddress,helpblock:"Store ip addresses for security and internal use only",order:15})),t.push(new a.h({key:"maximum_dynamic_link_length",label:"Maximum Characters in Dynamic Url",value:e.maximum_dynamic_link_length.toString(),colsize:"col-md-12",pattern:"[0-9]+",required:!0,helpblock:"Maximum characters to generate dynamic urls from content titles. 0 for unlimited",order:16})),t.push(new a.h({key:"pagesize",label:"Page Size",value:e.pagesize.toString(),colsize:"col-md-12",pattern:"[0-9]+",required:!0,helpblock:"Set no of items display in each page size",order:18})),t.push(new a.b({key:"rating_option",label:"Rating Options",required:!0,value:e.rating_option.toString(),options:[{key:0,value:"Like / Dislike"},{key:1,value:"Five Star"},{key:2,value:"Disabled"}],helpblock:"Setup rating option for contents 0: five star, 1: like / dislike, 2: disable rating",order:19}))),t.sort((function(e,o){return e.order-o.order}))}},{key:"prepareMediaSettingControls",value:function(e,o){var t=[];return t.push(new a.h({key:"user_thumbnail_width",label:"User Thumbnail Width",value:e.user_thumbnail_width.toString(),colsize:"col-md-12",pattern:"[0-9]+",required:!0,helpblock:"Set thumbnail width for user avators.",order:0})),t.push(new a.h({key:"user_thumbnail_height",label:"User Thumbnail Height",value:e.user_thumbnail_height.toString(),colsize:"col-md-12",pattern:"[0-9]+",required:!0,helpblock:"Set thumbnail height for user avators",order:1})),t.push(new a.h({key:"category_thumbnail_width",label:"Category Thumbnail Width",value:e.category_thumbnail_width.toString(),colsize:"col-md-12",pattern:"[0-9]+",required:!0,helpblock:"Set category image thumbnail width",order:2})),t.push(new a.h({key:"category_thumbnail_height",label:"Category Thumbnail Height",value:e.category_thumbnail_height.toString(),colsize:"col-md-12",pattern:"[0-9]+",required:!0,helpblock:"Setup category image thumbnail height",order:3})),t.push(new a.h({key:"quality",label:"Quality",value:e.quality.toString(),colsize:"col-md-12",required:!0,pattern:"[0-9]+",helpblock:"Setup quality for generated thumbnails in percentage e.g 70",order:6})),t.push(new a.h({key:"photo_extensions",label:"Allowed Photo Extensions",value:e.photo_extensions,required:!0,colsize:"col-md-12",helpblock:"Allowed photo extension to be uploaded to website",order:7})),t.push(new a.h({key:"photo_max_size",label:"Max Photo Size (mb)",value:e.photo_max_size.toString(),required:!0,colsize:"col-md-6",helpblock:"Maximum allowed image size (in mb e.g 11mb)",order:8})),t.push(new a.h({key:"logo_path",label:"Logo Path",value:e.logo_path,colsize:"col-md-12",required:!0,helpblock:"Setup default logo path either direct url or relative path within project.",order:9})),t.push(new a.h({key:"user_default_path",label:"User Default Path",value:e.user_default_path,colsize:"col-md-12",required:!0,helpblock:"Setup default user avator path (to be used if user not updated its avator).",order:10})),t.push(new a.h({key:"category_default_path",label:"Category Default Path",value:e.category_default_path,colsize:"col-md-12",required:!0,helpblock:"Setup default category image path (to be used if category have no photo)",order:11})),t.sort((function(e,o){return e.order-o.order}))}},{key:"prepareFeatureSettingControls",value:function(e,o){var t=[];return t.push(new a.a({key:"enable_forums",label:"Enable Forums",value:e.enable_forums,checked:e.enable_forums,helpblock:"Enable Forums functionality in application if module available.",order:4})),t.push(new a.f({key:"config_section_01",label:"Inner Modules",order:10})),t.push(new a.a({key:"enable_categories",label:"Enable Categories",value:e.enable_categories,checked:e.enable_categories,helpblock:"Toggle on | off categorizing contents and listing",order:11})),t.push(new a.a({key:"enable_tags",label:"Enable Tags or Labels",value:e.enable_tags,checked:e.enable_tags,helpblock:"Toggle on | off labeling or tagging contents and listing",order:12})),o||(t.push(new a.a({key:"showLabelCounter",label:"Display Counter",value:e.showLabelCounter,checked:e.showLabelCounter,helpblock:"Display (total number of public records) counter with category or tag links",order:13})),t.push(new a.a({key:"enable_archives",label:"Enable Archives",value:e.enable_archives,checked:e.enable_archives,helpblock:" Toggle on | off archiving contents and listing",order:13})),t.push(new a.a({key:"enable_date_filter",label:"Enable Date Filter",value:e.enable_date_filter,checked:e.enable_date_filter,helpblock:"Toggle on | off group by contents based on today / this week / this month / all time date filters",order:16})),t.push(new a.a({key:"enable_advertisement",label:"Enable Advertisement",value:e.enable_advertisement,checked:e.enable_advertisement,helpblock:"Toggle on | off advertisement within application",order:17})),t.push(new a.a({key:"enable_adult_veritifcation",label:"Enable Adult Verification",value:e.enable_adult_veritifcation,checked:e.enable_adult_veritifcation,helpblock:"Toggle on | off adult content verification warning",order:18})),t.push(new a.a({key:"enable_adult_veritifcation",label:"Enable Adult Verification",value:e.enable_languages,checked:e.enable_languages,helpblock:"Toggle on | off enabling multiple language support within application",order:19}))),t.sort((function(e,o){return e.order-o.order}))}},{key:"prepareListingSettingControls",value:function(e,o){var t=[];return t.push(new a.a({key:"enable_views",label:"Enable Views",value:e.enable_views,checked:e.enable_views,helpblock:"Toggle on | off views option in listing items unless you add customization manually.",order:0})),t.push(new a.a({key:"enable_date",label:"Enable Date",value:e.enable_date,checked:e.enable_date,helpblock:"Toggle on | off date option in listing items unless you add customization manually.",order:1})),t.push(new a.a({key:"enable_username",label:"Enable UserName",value:e.enable_username,checked:e.enable_username,helpblock:"Toggle on | off username option in listing items unless you add customization manually.",order:2})),t.push(new a.a({key:"enable_rating",label:"Enable Rating",value:e.enable_rating,checked:e.enable_rating,helpblock:"Toggle on | off like / dislike option in listing items unless you add customization manually.",order:3})),t.push(new a.a({key:"enable_likedislike",label:"Enable Like / Dislike",value:e.enable_likedislike,checked:e.enable_likedislike,helpblock:"Toggle on | off like / dislike option in listing items unless you add customization manually.",order:4})),t.sort((function(e,o){return e.order-o.order}))}},{key:"prepareAuthenticationSettingControls",value:function(e,o){var t=[];return t.push(new a.a({key:"enable_facebook",label:"Enable Facebook",value:e.enable_facebook,checked:e.enable_facebook,helpblock:"Toggle on | of facebook as additional authentication provider",order:0})),t.push(new a.h({key:"fb_appId",label:"Facebook App Id",value:e.fb_appId,colsize:"col-md-12",helpblock:"If facebook enable, enter required Facebook App ID",order:1})),t.push(new a.h({key:"fb_appSecrete",label:"Facebook App Secrete",value:e.fb_appSecrete,colsize:"col-md-12",helpblock:"If facebook enable, enter required Facebook App Secrete",order:2})),t.push(new a.a({key:"enable_twitter",label:"Enable Twitter",value:e.enable_twitter,checked:e.enable_twitter,helpblock:"Toggle on | of twitter as additional authentication provider",order:3})),t.push(new a.h({key:"tw_consumer_key",label:"Twitter Consumer Key",value:e.tw_consumer_key,colsize:"col-md-12",helpblock:"If twitter enable, enter required twitter consumer key here",order:4})),t.push(new a.h({key:"tw_consumer_secrete",label:"Facebook App Secrete",value:e.tw_consumer_secrete,colsize:"col-md-12",helpblock:"If twitter enable, enter required twitter consumer secrete here",order:5})),t.push(new a.a({key:"enable_google",label:"Enable Google",value:e.enable_google,checked:e.enable_google,helpblock:"Toggle on | of google as additional authentication provider",order:6})),t.push(new a.h({key:"google_clientid",label:"Google Client Id",value:e.google_clientid,colsize:"col-md-12",helpblock:"If google enable, enter required google client id",order:7})),t.push(new a.h({key:"google_clientsecrete",label:"Google Client Secrete",value:e.google_clientsecrete,colsize:"col-md-12",helpblock:"If google enable, enter required  google client secrete here",order:8})),t.sort((function(e,o){return e.order-o.order}))}},{key:"prepareRegistrationSettingControls",value:function(e,o){var t=[];return t.push(new a.a({key:"enable",label:"Enable Registration",value:e.enable,checked:e.enable,helpblock:"Toggle on | off registeration process within application",order:0})),t.push(new a.b({key:"uniqueFieldOption",label:"Login Option",required:!0,value:e.uniqueFieldOption.toString(),options:[{key:0,value:"Both UserName, Email"},{key:1,value:"Email Address"}],helpblock:"Choose your verification option for authentication, 0: Both UserName, Email, 1: Email Address",order:4})),t.push(new a.a({key:"enableNameField",label:"Enable Name Fields",value:e.enableNameField,checked:e.enableNameField,helpblock:"Enable first name, last name fields on registeration form.",order:5})),t.push(new a.a({key:"enablePrivacyCheck",label:"Enable Privacy Check",value:e.enablePrivacyCheck,checked:e.enablePrivacyCheck,helpblock:" Toggle on | off showing enable privacy check option unless you customize registeration process manually",order:6})),t.sort((function(e,o){return e.order-o.order}))}},{key:"prepareRechapchaSettingControls",value:function(e,o){var t=[];return t.push(new a.h({key:"SiteKey",label:"Site Key",value:e.siteKey,colsize:"col-md-12",helpblock:"Rechapcha Authorization Site Key",order:0})),t.push(new a.h({key:"SecretKey",label:"Site Secrete",value:e.secretKey,colsize:"col-md-12",helpblock:"Rechapcha Authorization Site Secrete",order:0})),t.push(new a.b({key:"Version",label:"Version",required:!0,value:e.version.toString(),options:[{key:"v2",value:"V2"},{key:"v3",value:"V3"}],order:3})),t.sort((function(e,o){return e.order-o.order}))}},{key:"prepareAWSSettingControls",value:function(e,o){var t=[];return t.push(new a.a({key:"enable",label:"Enable AWS",value:e.enable,checked:e.enable,helpblock:" Toggle on | off aws cloud for storage, hosting and other purposes",order:0})),t.push(new a.h({key:"accessKey",label:"Access Key",value:e.accessKey,colsize:"col-md-12",helpblock:"AWS Access Key required for verification purpose",order:1})),t.push(new a.h({key:"secretKey",label:"Secrete Key",value:e.secretKey,colsize:"col-md-12",helpblock:"AWS Secrete Key required for verification purpose",order:2})),t.push(new a.h({key:"region",label:"Region",value:e.region,colsize:"col-md-12",helpblock:"AWS Region (Preferred geolocial location for your content to be stored and stream)",order:3})),t.push(new a.h({key:"bucket",label:"Bucket Name",value:e.bucket,colsize:"col-md-12",helpblock:"Setup bucketname for saving general media files e.g users or categories etc media",order:4})),t.push(new a.h({key:"user_photos_directory",label:"User Photos Directory",value:e.user_photos_directory,colsize:"col-md-12",helpblock:'Setup directory  (within bucket)  for saving users avator photos e.g "photos/"',order:5})),t.push(new a.h({key:"category_photos_directory",label:"Category Photos Directory",value:e.category_photos_directory,colsize:"col-md-12",helpblock:'Setup directory  (within bucket)  for saving category photos e.g "category/"',order:6})),t.push(new a.h({key:"cdn_URL",label:"CDN URL (Cloud-Front)",value:e.cdn_URL,colsize:"col-md-12",helpblock:"Setup public accessible cloudfront distribution url for streaming photos (categories, users, gamify etc)",order:8})),t.sort((function(e,o){return e.order-o.order}))}},{key:"prepareSocialSettingControls",value:function(e,o){var t=[];return t.push(new a.h({key:"facebook_url",label:"Facebook Url",value:e.facebook_url,colsize:"col-md-12",helpblock:"Setup facebook url to be appear in website",order:0})),t.push(new a.h({key:"twitter_url",label:"Twitter Url",value:e.twitter_url,colsize:"col-md-12",helpblock:"Setup twitter url to be appear in website",order:1})),t.push(new a.h({key:"flickr_url",label:"Flickr Url",value:e.flickr_url,colsize:"col-md-12",helpblock:"Setup flickr url to be appear in website",order:2})),t.push(new a.h({key:"linkedin_url",label:"Linkedin Url",value:e.linkedin_url,colsize:"col-md-12",helpblock:"Setup linkedin url to be appear in website",order:3})),t.push(new a.h({key:"thumblr_url",label:"Thumblr Url",value:e.thumblr_url,colsize:"col-md-12",helpblock:"Setup thumblr url to be appear in website",order:4})),t.push(new a.h({key:"google_url",label:"Google Url",value:e.google_url,colsize:"col-md-12",helpblock:"Setup google url to be appear in website",order:5})),t.push(new a.h({key:"youtube_url",label:"Youtube Url",value:e.youtube_url,colsize:"col-md-12",helpblock:"Setup youtube url to be appear in website",order:6})),t.push(new a.h({key:"vimeo_url",label:"Vimeo Url",value:e.vimeo_url,colsize:"col-md-12",helpblock:"Setup vimeo url to be appear in website",order:7})),t.push(new a.h({key:"pinterest_url",label:"Pinterest Url",value:e.pinterest_url,colsize:"col-md-12",helpblock:"Setup pinterest url to be appear in website",order:8})),t.push(new a.h({key:"instagram_url",label:"Instagram Url",value:e.instagram_url,colsize:"col-md-12",helpblock:"Setup instagram url to be appear in website",order:9})),t.push(new a.h({key:"github_url",label:"GitHub Url",value:e.github_url,colsize:"col-md-12",helpblock:"Setup github url to be appear in website",order:10})),t.push(new a.h({key:"rss_url",label:"RSS Url",value:e.rss_url,colsize:"col-md-12",helpblock:"Setup rss url to be appear in website",order:11})),t.push(new a.f({key:"config_section_01",label:"Content Sharing Third Party Plugin Settings",order:12})),t.push(new a.h({key:"addthis_pubid",label:"Addthis PubId",value:e.addthis_pubid,colsize:"col-md-12",helpblock:"Enable addthis plugin for sharing content option for more information visit: https://www.addthis.com/",order:13})),t.push(new a.h({key:"sharethis_propertyId",label:"ShareThis PropertyId",value:e.sharethis_propertyId,colsize:"col-md-12",helpblock:"Enable sharethis property id for sharing content option for more information visit: https://sharethis.com/",order:14})),t.push(new a.h({key:"fb_appId",label:"Facebook AppId",value:e.sharethis_propertyId,colsize:"col-md-12",helpblock:"This will include Facebook Javascript SDK, that can be used with variety of facebook apps including facebook comments, like box and others",order:15})),t.sort((function(e,o){return e.order-o.order}))}},{key:"prepareContactSettingControls",value:function(e,o){var t=[];return t.push(new a.h({key:"address",label:"Address",value:e.address,colsize:"col-md-12",helpblock:"Setup address information to be used in contact information",order:0})),t.push(new a.h({key:"tel1",label:"Telephone 1",value:e.tel1,colsize:"col-md-12",helpblock:"Setup telephone information to be used in contact information",order:1})),t.push(new a.h({key:"tel2",label:"Telephone 2",value:e.tel2,colsize:"col-md-12",helpblock:"Setup telephone information (alternative) to be used in contact information",order:2})),t.push(new a.h({key:"fax",label:"Fax",value:e.fax,colsize:"col-md-12",helpblock:"Setup email information to be used in contact information",order:3})),t.push(new a.h({key:"email",label:"Email",value:e.email,colsize:"col-md-12",helpblock:"Setup email information to be used in contact information",order:4})),t.push(new a.g({key:"detail_info",label:"Detail Information",value:e.detail_info,colsize:"col-md-12",helpblock:"Setup detail information for contact section unless you customize this part manually",order:5})),t.push(new a.a({key:"enable_contact_form",label:"Enable Contact Form",value:e.enable_contact_form,checked:e.enable_contact_form,helpblock:"Toggle on | off contact form",order:6})),t.sort((function(e,o){return e.order-o.order}))}},{key:"prepareSmtpSettingControls",value:function(e,o){var t=[];return t.push(new a.a({key:"enable_email",label:"Enable Email",value:e.enable_email,checked:e.enable_email,helpblock:"Toggle on | off email functionality within website",order:0})),t.push(new a.a({key:"enable_mandril",label:"Enable Mandril",value:e.enable_mandril,checked:e.enable_mandril,helpblock:"Enable mandril as email sending option",order:1})),t.push(new a.h({key:"mandril_key",label:"Mandril Key",value:e.mandril_key,colsize:"col-md-12",helpblock:"If mandril option enable, mandril key will be required to continue",order:2})),t.push(new a.a({key:"enable_SES",label:"Enable SES",value:e.enable_SES,checked:e.enable_SES,helpblock:"Enable AWS SES as core smtp option",order:3})),t.push(new a.h({key:"ses_host",label:"SES Host",value:e.ses_host,colsize:"col-md-12",helpblock:"If SES enable, host will be needed.",order:4})),t.push(new a.h({key:"ses_username",label:"SES User Name",value:e.ses_username,colsize:"col-md-12",helpblock:"AWS SES - UserName",order:5})),t.push(new a.h({key:"ses_password",label:"SES Password",value:e.ses_password,colsize:"col-md-12",helpblock:"AWS SES - Password",order:6})),t.push(new a.f({key:"config_section_01",label:"Basic SMTP Settings",order:7})),t.push(new a.h({key:"server",label:"Server",value:e.server,colsize:"col-md-12",helpblock:"General SMTP Option- Server",order:8})),t.push(new a.h({key:"port",label:"Port",value:e.port,colsize:"col-md-12",helpblock:"General SMTP Option- Port",order:9})),t.push(new a.h({key:"fromAddress",label:"From Address",value:e.fromAddress,colsize:"col-md-12",helpblock:" General SMTP Option- From Email Address",order:10})),t.sort((function(e,o){return e.order-o.order}))}},{key:"prepareForumsGeneralControls",value:function(e){var o=[];return o.push(new a.a({key:"enable_public_topics",label:"Enable Public Topics",value:e.enable_public_topics,checked:e.enable_public_topics,helpblock:"Enable normal users to create topics from his / her own account or restrict this functionality to admin only",order:7})),o.sort((function(e,o){return e.order-o.order}))}}]),e}();return e.\u0275fac=function(o){return new(o||e)},e.\u0275prov=r.Ib({token:e,factory:e.\u0275fac}),e}()},aRip:function(e,o,t){"use strict";t.d(o,"a",(function(){return i}));var a=t("fXoL"),l=t("noRM"),r=t("tk/3"),n=t("nT4z"),i=function(){var e=function(){function e(o,t,a){_classCallCheck(this,e),this.settings=o,this.http=t,this.actions=a}return _createClass(e,[{key:"LoadRecords",value:function(){var e=this,o=this.settings.getApiOptions().load;this.actions.loadStarted(),this.http.post(o,{}).subscribe((function(o){e.actions.loadSucceeded(o)}),(function(o){e.actions.loadFailed(o)}))}},{key:"UpdateConfigurations",value:function(e,o,t){var a="";switch(o){case"general":switch(t){case"dbsetup":a=this.settings.getApiOptions().general.dbsetup;break;case"dbusersetup":a=this.settings.getApiOptions().general.dbusersetup;break;case"general":a=this.settings.getApiOptions().general.general;break;case"media":a=this.settings.getApiOptions().general.media;break;case"features":a=this.settings.getApiOptions().general.features;break;case"listings":a=this.settings.getApiOptions().general.listings;break;case"authentication":a=this.settings.getApiOptions().general.authentication;break;case"registration":a=this.settings.getApiOptions().general.registration;break;case"aws":a=this.settings.getApiOptions().general.aws;break;case"social":a=this.settings.getApiOptions().general.social;break;case"contact":a=this.settings.getApiOptions().general.contact;break;case"smtp":a=this.settings.getApiOptions().general.smtp;break;case"rechapcha":a=this.settings.getApiOptions().general.rechapcha}break;case"forums":switch(t){case"general":a=this.settings.getApiOptions().forums.general}}return this.http.post(a,e)}},{key:"SetupCompleted",value:function(){var e=this.settings.getApiOptions().general.dbsetupcompleted;return this.http.post(e,{})}}]),e}();return e.\u0275fac=function(o){return new(o||e)(a.ac(l.a),a.ac(r.b),a.ac(n.a))},e.\u0275prov=a.Ib({token:e,factory:e.\u0275fac}),e}()},noRM:function(e,o,t){"use strict";t.d(o,"a",(function(){return i}));var a=t("II9H"),l=t("fXoL"),r=t("nD3/"),n=t("1pjZ"),i=function(){var e=function(){function e(o,t){_classCallCheck(this,e),this.coreService=o,this.config=t;var a=t.getConfig("host");this.apiOptions={load:a+"api/configuration/load",specific:{},general:{dbsetup:a+"api/configuration/dbsetup",dbsetupcompleted:a+"api/configuration/dbsetupcompleted",dbusersetup:a+"api/user/dbusersetup",general:a+"api/configuration/general",media:a+"api/configuration/media",features:a+"api/configuration/features",listings:a+"api/configuration/listings",authentication:a+"api/configuration/authentication",registration:a+"api/configuration/registration",aws:a+"api/configuration/aws",social:a+"api/configuration/social",contact:a+"api/configuration/contact",smtp:a+"api/configuration/smtp",rechapcha:a+"api/configuration/rechapcha"},forums:{general:a+"api/forum/configs_general"}},this.init_toolbar_options(),this.init_search_options([])}return _createClass(e,[{key:"init_search_options",value:function(e){this.searchOptions={showpanel:!0,showSearchPanel:!1,showAdvanceSearchLink:!1,term:"",topselectioncheck:!0,navList:e,filters:[],dropdownFilters:[],checkFilters:[],categories:[],selectedcategory:"",singleaction:!1,actions:[]}}},{key:"init_toolbar_options",value:function(){this.toolbarOptions={showtoolbar:!1,showsecondarytoolbar:!1,showcheckAll:!0,navbarcss:a.d.NAVBAR_CSS,left_options:[],left_caption:"Filter:",right_caption:"",right_options:[],actions:[]}}},{key:"getApiOptions",value:function(){return this.apiOptions}},{key:"getUploadOptions",value:function(){return this.uploadOptions}},{key:"getToolbarOptions",value:function(){return this.toolbarOptions}},{key:"getSearchOptions",value:function(e){return this.init_search_options(e),this.searchOptions}}]),e}();return e.\u0275fac=function(o){return new(o||e)(l.ac(r.a),l.ac(n.a))},e.\u0275prov=l.Ib({token:e,factory:e.\u0275fac}),e}()}}]);