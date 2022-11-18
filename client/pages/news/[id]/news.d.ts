import type { IUser } from '../../../types/user';
import type { INews } from '../../../types/news';

export interface NewsPageProps {
  user: IUser | null;
  news: INews;
}
