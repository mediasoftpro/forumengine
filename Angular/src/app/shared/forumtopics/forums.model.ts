/* -------------------------------------------------------------------------- */
/*                           Product Name: ForumEngine                        */
/*                            Author: Mediasoftpro                            */
/*                       Email: support@mediasoftpro.com                      */
/*       License: Read license.txt located on root of your application.       */
/*                     Copyright 2007 - 2020 @Mediasoftpro                    */
/* -------------------------------------------------------------------------- */

export interface IAPIOptions {
  load: string;
  load_reports: string;
  getinfo: string;
  action: string;
  getforum: string;
  proc: string;
  authorize_author: string;
}

export interface ForumTopicEntity {
  id: number;
  forumid: number;
  userid: string;
  replyid: number;
  title: string;
  description: string;
  tags: string;
}
