import React, { useEffect } from 'react';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import {
  getEntity as getContainer,
  setEntity as setContainer,
  deleteEntity as deleteContainer } from 'app/entities/container/container.reducer';
import { RouteComponentProps } from 'react-router-dom';
import {ConfirmDialog} from "app/shared/dialogs/ConfirmDialog";

export interface ISettingsContainerDeleteModalProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}


const SettingsContainerDeleteModal = (props: ISettingsContainerDeleteModalProps) => {

  const { entities, entity, loading } = props;
  const id = props.match.params.id;
  useEffect(() => {
    const entityToSet = entities?.find(e => e.id === id);
    if(entityToSet) {
      props.setContainer(entityToSet);
    } else {
      props.getContainer(id);
    }

  }, [entities, id]);

  return <ConfirmDialog
    entity={ "container" }
    loading={loading}
    headerText={ <Translate contentKey={"openCellarBookApp.container.delete.header"} /> }
    bodyText={ <Translate contentKey={"openCellarBookApp.container.delete.question"} interpolate={ { id: entity.name } } /> }
    confirmButtonLabel={ <Translate contentKey={ "openCellarBookApp.container.delete.action" } /> }
    backAction={ () => props.history.goBack() }
    confirmAction={ () => props.deleteContainer(id) }
  />;
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
  entity: storeState.container.entity,
  entities: storeState.container.entities,
  loading: storeState.container.loading
});

const mapDispatchToProps = {
  getContainer,
  setContainer,
  deleteContainer
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps,mapDispatchToProps)(SettingsContainerDeleteModal);
