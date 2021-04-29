import React, { useEffect } from 'react';
import { IRootState } from "app/shared/reducers";
import { connect } from "react-redux";
import { Translate } from "react-jhipster";
import {
  getEntities,
  hideAddMeasureModal,
  showAddMeasureModal,
  createMeasureEntry,
  createMeasureEntryOnly,
  updateMeasureEntries
} from "app/modules/container/manage/manage.reducer";
import { getEntities as getMeasureTypes } from 'app/entities/measure-type/measure-type.reducer';
import { getEntities  as getPropertyTypesForFillEffect } from 'app/entities/possible-p-types-for-f-effect/possible-p-types-for-f-effect.reducer';
import { getEntities  as getPropertyTypesForMeasureTypes } from 'app/entities/possible-p-types-for-m-types/possible-p-types-for-m-types.reducer';
import { getEntities  as getMeasurePropertyTypes } from 'app/entities/measure-property-type/measure-property-type.reducer';
import { createEntity as createMeasurePropertyValue } from 'app/entities/measure-property-value/measure-property-value.reducer';
import './manage.scss';
import Container from "app/shared/layout/container/container";
import AddMeasureModal from "app/modules/measure-entry/add-modal";
import { FillingEffect } from "app/shared/model/enumerations/filling-effect.model";
import { toDateString } from "app/shared/util/date-utils";
import { IMeasurePropertyValue } from "app/shared/model/measure-property-value.model";
import { IMeasurePropertyType } from "app/shared/model/measure-property-type.model";
import { WellKnownPropertyTypes } from "app/shared/constants/WellKnownPropertyTypes";
import { v4 as uuidv4 } from 'uuid';

export interface IManageContainersProps extends StateProps, DispatchProps {}

function extractPropertyValuesByForm(form: any, measurePropertyTypes: IMeasurePropertyType[]): IMeasurePropertyValue[] {
  const propertyTypeValue: IMeasurePropertyValue[] = [];
  for(const key in form) {
    if(key.startsWith("formPropertyType")) {
      const id = key.substr(key.indexOf("-")+1);
      propertyTypeValue.push({
        measurePropertyType: measurePropertyTypes.find(mpt => mpt.id === Number(id)),
        value: form[key]
      })
    }
  }
  return propertyTypeValue;
}

export const ManageContainersPage = (props: IManageContainersProps) => {

  useEffect(() => {
    props.getEntities();
    props.getMeasureTypes();
    props.getPropertyTypesForFillEffect();
    props.getPropertyTypesForMeasureTypes();
    props.getMeasurePropertyTypes();
  }, []);

  function addMeasureEntry(form: any, measurePropertyTypes: IMeasurePropertyType[]) {

    const measureTypeId  = form["formMeasureType"];
    const realizedAt = form["formRealizedAt"];
    const additionalInformation = form["formAdditionalInformation"];
    const container = form["formContainer"];
    const currentContainerId = form["formCurrentContainerId"];


    const measureType = props.measureTypes.find(mt => mt.id === Number(measureTypeId.id));
    const currentContainer = props.containers.find(c => c.id === Number(currentContainerId));
    const currentMeasures = currentContainer.currentMeasures;
    const parent = currentMeasures && currentMeasures.length > 0 ?
      currentMeasures.find(cm => cm.measureType.fillingEffect === FillingEffect.REFILL) : null;

    const measurePropertyValuesToAdd = extractPropertyValuesByForm(form, measurePropertyTypes);

    if(measureType.fillingEffect === FillingEffect.REFILL) {
      const newMeasureEntry = {
        createdAt: toDateString(new Date()),
        realizedAt,
        measureType,
        additionalInformation,
        container: currentContainer,
        currentContainer,
        measurePropertyValues: measurePropertyValuesToAdd,
        parent
      }
      props.createMeasureEntry(newMeasureEntry);

    } else if (measureType.fillingEffect === FillingEffect.TRANSFILL) {

      const newContainer = props.containers.find(c => c.id === Number(container.id));

      measurePropertyValuesToAdd
        .find( value => value.measurePropertyType.id === WellKnownPropertyTypes.TRANSFILL_FROM.typeId)
        .value = currentContainer.name;

      measurePropertyValuesToAdd
        .find( value => value.measurePropertyType.id === WellKnownPropertyTypes.TRANSFILL_TO.typeId)
        .value = newContainer.name;

      props.createMeasureEntryOnly({
        createdAt: toDateString(new Date()),
        realizedAt,
        measureType,
        additionalInformation,
        container: currentContainer,
        currentContainer: newContainer,
        measurePropertyValues: measurePropertyValuesToAdd,
        parent
      });

      currentMeasures.forEach(measureEntryToTransfer => {
        measureEntryToTransfer.currentContainer = newContainer;
      });

      props.updateMeasureEntries(currentMeasures);

    } else if (measureType.fillingEffect === FillingEffect.BOTTLED) {

      measurePropertyValuesToAdd
        .find( value => value.measurePropertyType.id === WellKnownPropertyTypes.EXTERNAL_BOTTLED_CODE.typeId)
        .value = uuidv4();

      props.createMeasureEntryOnly({
        createdAt: toDateString(new Date()),
        realizedAt,
        measureType,
        additionalInformation,
        container: currentContainer,
        measurePropertyValues: measurePropertyValuesToAdd,
        parent
      });

      currentMeasures.forEach(measureEntryToBottle => {
        measureEntryToBottle.currentContainer = null;
      });

      props.updateMeasureEntries(currentMeasures);

    } else { // NO EFFECT

      props.createMeasureEntry({
        createdAt: toDateString(new Date()),
        realizedAt,
        measureType,
        additionalInformation,
        container: currentContainer,
        currentContainer,
        measurePropertyValues: measurePropertyValuesToAdd,
        parent
      });
    }
  }

  return (
    <>
      <h1><Translate contentKey="global.menu.manage-containers">Manage Containers</Translate></h1>
      {
        props.containers && props.containers.length > 0 ? (
          <div className="container-box-layout"> {
            props.containers.map(c => <Container key={c.id}
                                          containerName={c.name}
                                          measures={c.currentMeasures}
                                          setShowAddMeasureModal={ () => props.setShowAddMeasureModal(c.id) } />)
          }
          </div>
          ) : !props.loading && (
            <div className="alert alert-warning">
              <Translate contentKey="openCellarBookApp.container.home.notFoundChangeIt">No Containers found</Translate>
            </div>
          )
      }
      <AddMeasureModal showModal={ props.showAddMeasureModal }
                       handleAddMeasure={ addMeasureEntry }
                       currentContainerId={ props.currentContainerId }
                       handleClose={ props.setHideAddMeasureModal }
                       measureTypes={ props.measureTypes }
                       propertyTypesForFillEffect={ props.propertyTypesForFillEffect }
                       propertyTypesForMeasureType={ props.propertyTypesForMeasureType }
                       measurePropertyTypes={ props.measurePropertyTypes }
                       containers={ props.containers } />
    </>
  );

}

const mapStateToProps = ({ authentication, manageContainer, measureType, measureEntry, possiblePTypesForFEffect,
                           possiblePTypesForMTypes, measurePropertyType }: IRootState) => ({
  containers: manageContainer.container,
  measureTypes: measureType.entities,
  propertyTypesForFillEffect: possiblePTypesForFEffect.entities,
  propertyTypesForMeasureType: possiblePTypesForMTypes.entities,
  measurePropertyTypes: measurePropertyType.entities,
  measureEntries: measureEntry.entities,
  measureEntriesWithCurrentContainer: manageContainer.measureEntriesWithCurrentContainer,
  currentContainerId: manageContainer.currentContainerId,
  showAddMeasureModal: manageContainer.showAddMeasureModal,
  loading: manageContainer.loading,
  account: authentication.account,
  isAuthenticated: authentication.isAuthenticated,
});

const mapDispatchToProps = { getEntities, createMeasureEntry, updateMeasureEntries, createMeasureEntryOnly,
  setShowAddMeasureModal: showAddMeasureModal, setHideAddMeasureModal: hideAddMeasureModal, getPropertyTypesForMeasureTypes,
  getMeasureTypes, getPropertyTypesForFillEffect, getMeasurePropertyTypes, createMeasurePropertyValue };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ManageContainersPage);
