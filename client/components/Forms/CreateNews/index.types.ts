import type { INews } from '../../../types/news';

export interface CreateNewsProps {
  isLoading?: boolean;
  onSubmit?: (data: INews) => void;
}

type CustomFile = {
  objectURL: string;
};

export interface INewsForm {
  title: string;
  description: string;
  image: null | CustomFile;
}
