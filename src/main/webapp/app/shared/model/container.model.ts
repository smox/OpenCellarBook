import { Moment } from 'moment';
import { IMeasureEntry } from 'app/shared/model/measure-entry.model';
import { ILocation } from 'app/shared/model/location.model';
import { IContainerType } from 'app/shared/model/container-type.model';

export interface IContainer {
  id?: number;
  name?: string;
  isAlwaysFull?: boolean;
  currentAmountOfContent?: number;
  capacity?: number;
  color?: string;
  orderNumber?: number;
  iconContentType?: string;
  icon?: any;
  deletedAt?: string;
  measureEntries?: IMeasureEntry[];
  currentMeasures?: IMeasureEntry[];
  location?: ILocation;
  containerType?: IContainerType;
}

export const defaultValue: Readonly<IContainer> = {
  isAlwaysFull: false,
};
