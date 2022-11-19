export type IIconTypes =
  | 'check'
  | 'confirm'
  | 'cross'
  | 'empty'
  | 'union'
  | 'error404'
  | 'mainpage'
  | 'loginicon'
  | 'avatar';

export interface IIcon {
  className?: string;
}

export interface IIconWithType extends IIcon {
  icon: IIconTypes;
}
