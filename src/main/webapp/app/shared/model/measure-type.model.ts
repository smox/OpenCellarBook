import { Moment } from 'moment';
import { IMeasureEntry } from 'app/shared/model/measure-entry.model';
import { IPossiblePTypesForMTypes } from 'app/shared/model/possible-p-types-for-m-types.model';
import { IMeasureTypeGroup } from 'app/shared/model/measure-type-group.model';
import { FillingEffect } from 'app/shared/model/enumerations/filling-effect.model';

export interface IMeasureType {
  id?: number;
  name?: string;
  fillingEffect?: FillingEffect;
  orderNumber?: number;
  color?: string;
  iconContentType?: string;
  icon?: any;
  deletedAt?: string;
  measureEntries?: IMeasureEntry[];
  possiblePTypesForMTypes?: IPossiblePTypesForMTypes[];
  children?: IMeasureType[];
  parent?: IMeasureType;
  measureTypeGroups?: IMeasureTypeGroup[];
}

export const defaultValue: Readonly<IMeasureType> = {};
