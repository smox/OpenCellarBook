import { IMeasurePropertyType } from 'app/shared/model/measure-property-type.model';
import { UiElement } from 'app/shared/model/enumerations/ui-element.model';

export interface IUiType {
  id?: number;
  name?: string;
  element?: UiElement;
  expression?: string;
  measurePropertyTypes?: IMeasurePropertyType[];
}

export const defaultValue: Readonly<IUiType> = {};
