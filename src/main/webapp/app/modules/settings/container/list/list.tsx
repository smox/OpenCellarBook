import React, { useEffect } from 'react';
import { Translate, translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Button, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  getEntities as getContainers,
  deleteEntity as deleteContainer } from 'app/entities/container/container.reducer';

import { Link } from 'react-router-dom';

export interface ISettingsContainerListProp extends StateProps, DispatchProps {}


export const SettingsContainerList = (props: ISettingsContainerListProp) => {
  const { containers, loading } = props;

  useEffect(() => {
    props.getContainers();
  }, []);

  return (
      <>
        <h2 id="container-heading">
        <Translate contentKey="openCellarBookApp.container.home.title">Containers</Translate>
        <Button tag={Link} to={`/settings/container/add/` } color="primary" className="float-right" size="sm">
          <FontAwesomeIcon icon="plus" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="openCellarBookApp.container.home.createLabel">Create new container</Translate>
          </span>
        </Button>
        </h2>
        <div className="table-responsive">
          {containers && containers.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="openCellarBookApp.container.orderNumber">Order Number</Translate>
                  </th>
                  <th>
                    <Translate contentKey="openCellarBookApp.container.name">Name</Translate>
                  </th>
                  <th>
                    <Translate contentKey="openCellarBookApp.container.isAlwaysFull" >isAlwaysFull</Translate>
                  </th>
                  <th>
                    <Translate contentKey="openCellarBookApp.container.capacity" >capacity</Translate>
                  </th>
                  <th>
                    <Translate contentKey="openCellarBookApp.container.location" >location</Translate>
                  </th>
                  <th>
                    <Translate contentKey="openCellarBookApp.container.containerType" >containerType</Translate>
                  </th>
                  <th className="text-right">
                    <Translate contentKey="openCellarBookApp.container.actions">Actions</Translate>
                  </th>
                </tr>
              </thead>
              <tbody>
                {containers.map((container, i) => (
                  <tr key={`entity-${i}`}>
                    <td>{container.orderNumber ? container.orderNumber : translate('global.messages.info.orderNumber.notFound') }</td>
                    <td>{container.name}</td>
                    <td>{container.isAlwaysFull ? translate("global.messages.answers.yes") : translate("global.messages.answers.no") }</td>
                    <td>{container.capacity}</td>
                    <td>{container.location?.name}</td>
                    <td>{container.containerType?.name}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`/settings/container/edit/${container.id}`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`/settings/container/delete/${container.id}`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            !loading && (
              <div className="alert alert-warning">
                <Translate contentKey="openCellarBookApp.container.home.notFound">No Containers found</Translate>
              </div>
            )
          )}
        </div>
      </>
  );
};

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
  containers: storeState.container.entities,
  loading: storeState.container.loading
});

const mapDispatchToProps = {
  getContainers,
  deleteContainer
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps,mapDispatchToProps)(SettingsContainerList);
