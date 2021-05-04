import React, { useEffect } from 'react';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import {
  getEntity as getMeasureType,
  setEntity as setMeasureType,
  deleteEntity as deleteMeasureType } from 'app/entities/measure-type/measure-type.reducer';
import { RouteComponentProps } from 'react-router-dom';

import { ConfirmDialog } from "app/shared/dialogs/ConfirmDialog";

export interface ISettingsMeasureTypeDeleteModalProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}


const SettingsMeasureTypeDeleteModal = (props: ISettingsMeasureTypeDeleteModalProps) => {

  const { entities, entity, loading } = props;
  const id = props.match.params.id;

  useEffect(() => {
    const entityToSet = entities?.find(e => e.id === id);
    if(entityToSet) {
      props.setMeasureType(entityToSet);
    } else {
      props.getMeasureType(id);
    }
  }, [entities, id]);

  return <ConfirmDialog
    entity={ "measureType" }
    loading={ loading }
    headerText={ <Translate contentKey={"openCellarBookApp.measureType.delete.header"} /> }
    bodyText={ <Translate contentKey={"openCellarBookApp.measureType.delete.question"} interpolate={ { id: entity.name } } /> }
    confirmButtonLabel={ <Translate contentKey={ "openCellarBookApp.measureType.delete.action" } /> }
    backAction={ () => props.history.goBack() }
    confirmAction={ () => props.deleteMeasureType(id) }
  />;
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
  entity: storeState.measureType.entity,
  entities: storeState.measureType.entities,
  loading: storeState.measureType.loading
});

const mapDispatchToProps = {
  getMeasureType,
  setMeasureType,
  deleteMeasureType
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps,mapDispatchToProps)(SettingsMeasureTypeDeleteModal);
