import { IMeasurePropertyValue } from 'app/shared/model/measure-property-value.model';
import { IPossiblePTypesForMTypes } from 'app/shared/model/possible-p-types-for-m-types.model';
import { IUiType } from 'app/shared/model/ui-type.model';
import { IMeasurePropertyTypeGroup } from 'app/shared/model/measure-property-type-group.model';

export interface IMeasurePropertyType {
  id?: number;
  type?: string;
  orderNumber?: number;
  measurePropertyValues?: IMeasurePropertyValue[];
  possiblePTypesForMTypes?: IPossiblePTypesForMTypes[];
  uiType?: IUiType;
  measurePropertyTypeGroups?: IMeasurePropertyTypeGroup[];
}

export const defaultValue: Readonly<IMeasurePropertyType> = {};
