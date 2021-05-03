import React, { useEffect } from 'react';
import { Translate, translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';

import {
  getEntity as getMeasureType,
  setEntity as setMeasureType,
  createEntity as createMeasureType,
  updateEntity as updateMeasureType } from 'app/entities/measure-type/measure-type.reducer';

import {
  getEntities as getPropertyTypes } from 'app/entities/measure-property-type/measure-property-type.reducer';

import { RouteComponentProps } from 'react-router-dom';
import {FillingEffect} from "app/shared/model/enumerations/filling-effect.model";
import {IRootState} from "app/shared/reducers";

export interface ISettingsMeasureTypeDetailModalProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}


const SettingsMeasureTypeDetailModal = (props: ISettingsMeasureTypeDetailModalProps) => {

    const { entities, entity, loading, propertyTypes } = props;
    const id = props.match.params?.id;
    const isNew = !id;

    useEffect(() => {
      if( !isNew ) {
        const entityToSet = entities?.find(e => e.id === id);
        if(entityToSet) {
          props.setMeasureType(entityToSet);
        } else {
          props.getMeasureType(id);
        }
      }

    }, [entities, id, isNew]);

    useEffect(() => {
      props.getPropertyTypes();
    },[]);

    const defaultValues = isNew ? { } : {
      id: entity.id,
      orderNumber: entity && entity.orderNumber ? entity.orderNumber : "",
      name: entity && entity.name ? entity.name : "",
      fillingEffect: entity && entity.fillingEffect ? entity.fillingEffect : undefined,
      possiblePTypesForMTypes: entity && entity.possiblePTypesForMTypes ?
        entity.possiblePTypesForMTypes.map(ppt4mt => ppt4mt.measurePropertyType) : []
    }

    const handleValidSubmit = (event, form) => {

      const entityToSubmit = {
        id: Number(id),
        name: form["name"],
        orderNumber: form["orderNumber"],

      };

      if(isNew) {
        props.createMeasureType(entityToSubmit)
      } else {
        props.updateMeasureType(entityToSubmit);
      }

      props.history.goBack();
    }



    return (
      <Modal isOpen={true} backdrop="static" id="settings-measure-type-detail-modal" autoFocus={true}>
        <AvForm onValidSubmit={ handleValidSubmit } model={ defaultValues }>
          <ModalHeader>
            <Translate contentKey={ props.match.params.id ? "openCellarBookApp.measureType.home.editLabel" : "openCellarBookApp.measureType.home.createLabel" } />
          </ModalHeader>
            <ModalBody>
              { !loading ? (
                  <>
                    <AvField name="orderNumber" label={translate("openCellarBookApp.measureType.orderNumber")} type="number" />
                    <AvField name="name" label={translate("openCellarBookApp.measureType.name")}
                      validate={{ required: { value: true, errorMessage: translate('global.messages.validate.forms.required') } }}/>
                    <AvField name="fillingEffect" type="select"
                             label={translate('openCellarBookApp.measureType.fillingEffect')} >
                      { Object.values(FillingEffect).map(fillingEffect =>
                          <option key={fillingEffect} value={fillingEffect}>{ translate(`openCellarBookApp.FillingEffect.${fillingEffect}`) }</option>) }
                    </AvField>
                    <AvField name="possiblePTypesForMTypes" type="select" multiple>
                      { propertyTypes && propertyTypes.length > 0 ?
                        propertyTypes.map(pt => <option key={ pt.id } value={ pt.id }>{ pt.type }</option>) : null }
                    </AvField>
                  </>
                ) : ( <p>{ translate("global.messages.info.entity.loading", { entity: translate("openCellarBookApp.measureType.designation") }) }</p> )
              }
            </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={ props.history.goBack } tabIndex="1">
              <Translate contentKey="entity.action.back">Back</Translate>
            </Button>{' '}
            <Button disabled={ loading } color="primary" type="submit">
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
          </ModalFooter>
        </AvForm>
      </Modal>
    );
}

const mapStateToProps = (storeState: IRootState) => ({
    account: storeState.authentication.account,
    isAuthenticated: storeState.authentication.isAuthenticated,
    entity: storeState.measureType.entity,
    entities: storeState.measureType.entities,
    propertyTypes: storeState.measurePropertyType.entities,
    loading: storeState.measureType.loading,
  });

  const mapDispatchToProps = {
    getMeasureType,
    setMeasureType,
    createMeasureType,
    updateMeasureType,
    getPropertyTypes
  };

  type StateProps = ReturnType<typeof mapStateToProps>;
  type DispatchProps = typeof mapDispatchToProps;

  export default connect(mapStateToProps,mapDispatchToProps)(SettingsMeasureTypeDetailModal);
