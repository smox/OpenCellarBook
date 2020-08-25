import { Moment } from 'moment';
import { IContainer } from 'app/shared/model/container.model';

export interface ILocation {
  id?: number;
  name?: string;
  color?: string;
  iconContentType?: string;
  icon?: any;
  orderNumber?: number;
  deletedAt?: string;
  containers?: IContainer[];
}

export const defaultValue: Readonly<ILocation> = {};
