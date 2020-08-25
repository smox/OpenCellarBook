import { IMeasureType } from 'app/shared/model/measure-type.model';

export interface IMeasureTypeGroup {
  id?: number;
  name?: string;
  measureTypes?: IMeasureType[];
}

export const defaultValue: Readonly<IMeasureTypeGroup> = {};
