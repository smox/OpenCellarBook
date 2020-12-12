import { IMeasurePropertyType } from 'app/shared/model/measure-property-type.model';
import { FillingEffect } from 'app/shared/model/enumerations/filling-effect.model';

export interface IPossiblePTypesForFEffect {
  id?: number;
  fillingEffect?: FillingEffect;
  measurePropertyType?: IMeasurePropertyType;
}

export const defaultValue: Readonly<IPossiblePTypesForFEffect> = {};
