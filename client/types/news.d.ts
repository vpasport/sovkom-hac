import type { IUser } from './user';

export interface INews {
  id?: number;
  title: string;
  description: string;
  image?: string | Buffer | File;
  author?: number | IUser;
  author_id?: number;
  author_login?: string;
  create_date?: string;
  update_date?: string;
}
