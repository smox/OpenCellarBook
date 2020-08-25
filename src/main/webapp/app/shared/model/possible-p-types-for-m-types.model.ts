import { IMeasureType } from 'app/shared/model/measure-type.model';
import { IMeasurePropertyType } from 'app/shared/model/measure-property-type.model';

export interface IPossiblePTypesForMTypes {
  id?: number;
  measureType?: IMeasureType;
  measurePropertyType?: IMeasurePropertyType;
}

export const defaultValue: Readonly<IPossiblePTypesForMTypes> = {};
