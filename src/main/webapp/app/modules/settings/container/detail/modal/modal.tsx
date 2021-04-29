import React, { useEffect } from 'react';
import { Translate, translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';

import {
  getEntity as getContainer,
  setEntity as setContainer,
  createEntity as createContainer,
  updateEntity as updateContainer } from 'app/entities/container/container.reducer';

import { getEntities as getLocations } from 'app/entities/location/location.reducer';
import { getEntities as getContainerTypes } from 'app/entities/container-type/container-type.reducer';

import { RouteComponentProps } from 'react-router-dom';

export interface ISettingsContainerDetailModalProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}


const SettingsContainerDetailModal = (props: ISettingsContainerDetailModalProps) => {

    const { entities, locations, containerTypes, entity, loading } = props;
    const id = props.match.params?.id;
    const isNew = !id;

    useEffect(() => {
      if( !isNew ) {
        const entityToSet = entities?.find(e => e.id === id);
        if(entityToSet) {
          props.setContainer(entityToSet);
        } else {
          props.getContainer(id);
        }
      }
    }, [entities, id, isNew]);

    useEffect(() => {
      props.getLocations();
      props.getContainerTypes();
    },[]);

    const defaultValues = isNew ? { } : {
      id: entity.id,
      orderNumber: entity && entity.orderNumber ? entity.orderNumber : "",
      name: entity && entity.name ? entity.name : "",
      isAlwaysFull: entity.isAlwaysFull,
      capacity: entity && entity.capacity ? entity.capacity : 0,
      location: entity?.location?.id ? { id: entity.location.id } : undefined,
      containerType: entity?.containerType?.id ? { id: entity.containerType.id } : undefined
    }

    const handleValidSubmit = (event, form) => {

      const entityToSubmit = {
        id: Number(id),
          name: form["name"],
        orderNumber: form["orderNumber"],
        isAlwaysFull: form["isAlwaysFull"],
        capacity: form["capacity"],
        location: form["location"]?.id !== 0 ? locations.filter(l => l.id == form["location"].id)[0] : undefined,
        containerType:
          form["containerType"]?.id !== 0 ? containerTypes.filter(c => c.id == form["containerType"].id)[0] : undefined,
      };

      if(isNew) {
        props.createContainer(entityToSubmit)
      } else {
        props.updateContainer(entityToSubmit);
      }

      props.history.goBack();
    }



    return (
      <Modal isOpen={true} backdrop="static" id="settings-container-detail-modal" autoFocus={true}>
        <AvForm onValidSubmit={ handleValidSubmit } model={defaultValues}>
          <ModalHeader>
            <Translate contentKey={ props.match.params.id ? "openCellarBookApp.container.home.editLabel" : "openCellarBookApp.container.home.createLabel" } />
          </ModalHeader>
            <ModalBody>
              { !loading ? (
                  <>
                    <AvField name="orderNumber" label={translate("openCellarBookApp.container.orderNumber")} type="number" />
                    <AvField name="name" label={translate("openCellarBookApp.container.name")} required
                             errorMessage = { translate('global.messages.validate.forms.required') } />
                    <AvField name="isAlwaysFull" label={translate("openCellarBookApp.container.isAlwaysFull")} type="checkbox" />
                    {
                      // validation fehlt min, req
                    }
                    <AvField name="capacity" label={translate("openCellarBookApp.container.capacity")}
                             type="number" min={ 1 }
                      validate={{
                        min: { value: 1 , errorMessage: translate('global.messages.validate.forms.min', { value: 1 })},
                        required: { value: true, errorMessage: translate('global.messages.validate.forms.required') }
                      }}/>
                    <AvField name="location.id" label={translate("openCellarBookApp.container.location")} type="select">
                      <option value="" key="0" />
                      {
                        locations.map(loc => (
                          <option key={ loc.id } value={ loc.id }>{ loc.name}</option>
                        ))
                      }
                    </AvField>
                    <AvField name="containerType.id" label={translate("openCellarBookApp.container.containerType")} type="select">
                      <option value="" key="0" />
                      {
                        containerTypes.map(cTypes => (
                          <option key={ cTypes.id } value={ cTypes.id }>{ cTypes.name }</option>
                        ))
                      }
                    </AvField>
                  </>
                ) : ( <p>{ translate("global.messages.info.entity.loading", { entity: translate("openCellarBookApp.container.designation") }) }</p> )
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

const mapStateToProps = storeState => ({
    account: storeState.authentication.account,
    isAuthenticated: storeState.authentication.isAuthenticated,
    entity: storeState.container.entity,
    entities: storeState.container.entities,
    locations: storeState.location.entities,
    containerTypes: storeState.containerType.entities,
    loading: storeState.container.loading
  });

  const mapDispatchToProps = {
    getContainer,
    getLocations,
    getContainerTypes,
    setContainer,
    createContainer,
    updateContainer
  };

  type StateProps = ReturnType<typeof mapStateToProps>;
  type DispatchProps = typeof mapDispatchToProps;

  export default connect(mapStateToProps,mapDispatchToProps)(SettingsContainerDetailModal);
