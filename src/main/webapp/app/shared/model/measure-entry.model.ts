import { Moment } from 'moment';
import { IMeasurePropertyValue } from 'app/shared/model/measure-property-value.model';
import { IContainer } from 'app/shared/model/container.model';
import { IMeasureType } from 'app/shared/model/measure-type.model';

export interface IMeasureEntry {
  id?: number;
  realizedAt?: string;
  createdAt?: string;
  additionalInformation?: string;
  deletedAt?: string;
  measurePropertyValues?: IMeasurePropertyValue[];
  children?: IMeasureEntry[];
  container?: IContainer;
  currentContainer?: IContainer;
  measureType?: IMeasureType;
  parent?: IMeasureEntry;
}

export const defaultValue: Readonly<IMeasureEntry> = {};
