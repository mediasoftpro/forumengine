/* -------------------------------------------------------------------------- */
/*                           Product Name: ForumEngine                        */
/*                            Author: Mediasoftpro                            */
/*                       Email: support@mediasoftpro.com                      */
/*       License: Read license.txt located on root of your application.       */
/*                     Copyright 2007 - 2020 @Mediasoftpro                    */
/* -------------------------------------------------------------------------- */

export interface IAPIOptions {
  load: string;
  getinfo: string;
  action: string;
  proc: string;
}

export interface ForumEntity {
  id: number;
  categoryid: number;
  title: string;
  description: string;
  isenabled: number;
  priority: number;
  categories: any;
  category_list: []
}
