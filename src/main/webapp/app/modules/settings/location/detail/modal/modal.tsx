import React, { useEffect } from 'react';
import { Translate, translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Button, Table, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  getEntity as getLocation, 
  setEntity as setLocation,
  updateEntity as updateLocation } from 'app/entities/location/location.reducer';
import { RouteComponentProps } from 'react-router-dom';

export interface ISettingsLocationDetailModalProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}


const SettingsLocationDetailModal = (props: ISettingsLocationDetailModalProps) => {

    const { entities, entity, loading } = props;
    const id = props.match.params.id;
    const isNew = props.location.pathname.split("/").indexOf("add") > 0;

    useEffect(() => {
      const entityToSet = entities?.find(e => e.id === id);
      if(entityToSet) {
        props.setLocation(entityToSet);
      } else {
        props.getLocation(id);
      }
      
    }, [entities, id]);

    const defaultValues = {
      id: entity.id,
      orderNumber: entity && entity.orderNumber ? entity.orderNumber : "",
      name: entity && entity.name ? entity.name : ""
    }

    const handleValidSubmit = (event, form) => {
      // if(isNew)      
      props.updateLocation({
        id: Number(id),
        name: form["name"],
        orderNumber: form["ordnerNumber"]
      });

      props.history.goBack();
    }



    return (
      <Modal isOpen={true} backdrop="static" id="settings-location-detail-modal" autoFocus={true}>
        <AvForm onValidSubmit={ handleValidSubmit } model={defaultValues}>
          <ModalHeader>
            <Translate contentKey={ props.match.params.id ? "openCellarBookApp.location.home.editLabel" : "openCellarBookApp.location.home.createLabel" } />
          </ModalHeader>
          <ModalBody>
            { !loading ? (
                <>
                  <AvField name="orderNumber" label={translate("openCellarBookApp.location.orderNumber")} type="number" />
                  <AvField name="name" label={translate("openCellarBookApp.location.name")} required />
                </>
              ) : ( <p>{ translate("global.messages.info.entity.loading", { entity: translate("openCellarBookApp.location.designation") }) }</p> )
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
    entity: storeState.location.entity,
    entities: storeState.location.entities,
    loading: storeState.location.loading
  });
  
  const mapDispatchToProps = {
    getLocation,
    setLocation,
    updateLocation
  };
  
  type StateProps = ReturnType<typeof mapStateToProps>;
  type DispatchProps = typeof mapDispatchToProps;
  
  export default connect(mapStateToProps,mapDispatchToProps)(SettingsLocationDetailModal);