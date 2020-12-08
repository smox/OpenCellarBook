import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import manageContainer, { ManageContainerState } from 'app/modules/container/manage/manage.reducer';
import exportReports, { ExportReportsState } from 'app/modules/reports/export/export.reducer';
import addMeasureEntryModal, { AddMeasureEntryModalState } from 'app/modules/measure-entry/add-modal.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';

// prettier-ignore
import container, {
  ContainerState
} from 'app/entities/container/container.reducer';
// prettier-ignore
import location, {
  LocationState
} from 'app/entities/location/location.reducer';
// prettier-ignore
import containerType, {
  ContainerTypeState
} from 'app/entities/container-type/container-type.reducer';
// prettier-ignore
import measureType, {
  MeasureTypeState
} from 'app/entities/measure-type/measure-type.reducer';
// prettier-ignore
import measurePropertyType, {
  MeasurePropertyTypeState
} from 'app/entities/measure-property-type/measure-property-type.reducer';
// prettier-ignore
import measurePropertyValue, {
  MeasurePropertyValueState
} from 'app/entities/measure-property-value/measure-property-value.reducer';
// prettier-ignore
import uiType, {
  UiTypeState
} from 'app/entities/ui-type/ui-type.reducer';
// prettier-ignore
import measureEntry, {
  MeasureEntryState
} from 'app/entities/measure-entry/measure-entry.reducer';
// prettier-ignore
import measurePropertyTypeGroup, {
  MeasurePropertyTypeGroupState
} from 'app/entities/measure-property-type-group/measure-property-type-group.reducer';
// prettier-ignore
import measureTypeGroup, {
  MeasureTypeGroupState
} from 'app/entities/measure-type-group/measure-type-group.reducer';
// prettier-ignore
import possiblePTypesForMTypes, { PossiblePTypesForMTypesState }
  from 'app/entities/possible-p-types-for-m-types/possible-p-types-for-m-types.reducer';

/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly manageContainer: ManageContainerState;
  readonly addMeasureEntryModal: AddMeasureEntryModalState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly container: ContainerState;
  readonly location: LocationState;
  readonly containerType: ContainerTypeState;
  readonly measureType: MeasureTypeState;
  readonly measurePropertyType: MeasurePropertyTypeState;
  readonly measurePropertyValue: MeasurePropertyValueState;
  readonly uiType: UiTypeState;
  readonly measureEntry: MeasureEntryState;
  readonly measurePropertyTypeGroup: MeasurePropertyTypeGroupState;
  readonly measureTypeGroup: MeasureTypeGroupState;
  readonly possiblePTypesForMTypes: PossiblePTypesForMTypesState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
  readonly exportReports: ExportReportsState;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  manageContainer,
  addMeasureEntryModal,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  container,
  location,
  containerType,
  measureType,
  measurePropertyType,
  measurePropertyValue,
  uiType,
  measureEntry,
  measurePropertyTypeGroup,
  measureTypeGroup,
  possiblePTypesForMTypes,
  loadingBar,
  exportReports,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
});

export default rootReducer;
