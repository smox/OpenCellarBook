import { IMeasurePropertyType } from 'app/shared/model/measure-property-type.model';

export interface IMeasurePropertyTypeGroup {
  id?: number;
  name?: string;
  measurePropertyTypes?: IMeasurePropertyType[];
}

export const defaultValue: Readonly<IMeasurePropertyTypeGroup> = {};
