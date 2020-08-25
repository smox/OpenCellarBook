import { IMeasurePropertyType } from 'app/shared/model/measure-property-type.model';
import { IMeasureEntry } from 'app/shared/model/measure-entry.model';

export interface IMeasurePropertyValue {
  id?: number;
  value?: string;
  measurePropertyType?: IMeasurePropertyType;
  measureEntry?: IMeasureEntry;
}

export const defaultValue: Readonly<IMeasurePropertyValue> = {};
