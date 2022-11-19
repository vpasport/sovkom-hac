import type { IUser } from '../../../types/user';

export interface CreateUserProps {
  isLoading?: boolean;
  onSubmit?: (data: IUser) => void;
}
