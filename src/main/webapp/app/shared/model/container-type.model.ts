import { Moment } from 'moment';
import { IContainer } from 'app/shared/model/container.model';

export interface IContainerType {
  id?: number;
  name?: string;
  deletedAt?: string;
  color?: string;
  orderNumber?: number;
  iconContentType?: string;
  icon?: any;
  containers?: IContainer[];
}

export const defaultValue: Readonly<IContainerType> = {};
