import React, { useEffect } from 'react';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import {
  getEntity as getLocation,
  setEntity as setLocation,
  deleteEntity as deleteLocation } from 'app/entities/location/location.reducer';
import { RouteComponentProps } from 'react-router-dom';
import {ConfirmDialog} from "app/shared/dialogs/ConfirmDialog";

export interface ISettingsLocationDeleteModalProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}


const SettingsLocationDeleteModal = (props: ISettingsLocationDeleteModalProps) => {

  const { entities, entity, loading } = props;
  const id = props.match.params.id;
  useEffect(() => {
    const entityToSet = entities?.find(e => e.id === id);
    if(entityToSet) {
      props.setLocation(entityToSet);
    } else {
      props.getLocation(id);
    }

  }, [entities, id]);

  return <ConfirmDialog
    entity={ "location" }
    loading={loading}
    headerText={ <Translate contentKey={"openCellarBookApp.location.delete.header"} /> }
    bodyText={ <Translate contentKey={"openCellarBookApp.location.delete.question"} interpolate={ { id: entity.name } } /> }
    confirmButtonLabel={ <Translate contentKey={ "openCellarBookApp.location.delete.action" } /> }
    backAction={ () => props.history.goBack() }
    confirmAction={ () => props.deleteLocation(id) }
  />;
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
  deleteLocation
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps,mapDispatchToProps)(SettingsLocationDeleteModal);
