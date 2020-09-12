import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { openFile, byteSize, Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './container.reducer';
import { APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IContainerProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Container = (props: IContainerProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { containerList, match, loading } = props;
  return (
    <div>
      <h2 id="container-heading">
        <Translate contentKey="openCellarBookApp.container.home.title">Containers</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="openCellarBookApp.container.home.createLabel">Create new Container</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {containerList && containerList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="openCellarBookApp.container.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="openCellarBookApp.container.isAlwaysFull">Is Always Full</Translate>
                </th>
                <th>
                  <Translate contentKey="openCellarBookApp.container.currentAmountOfContent">Current Amount Of Content</Translate>
                </th>
                <th>
                  <Translate contentKey="openCellarBookApp.container.capacity">Capacity</Translate>
                </th>
                <th>
                  <Translate contentKey="openCellarBookApp.container.color">Color</Translate>
                </th>
                <th>
                  <Translate contentKey="openCellarBookApp.container.orderNumber">Order Number</Translate>
                </th>
                <th>
                  <Translate contentKey="openCellarBookApp.container.icon">Icon</Translate>
                </th>
                <th>
                  <Translate contentKey="openCellarBookApp.container.deletedAt">Deleted At</Translate>
                </th>
                <th>
                  <Translate contentKey="openCellarBookApp.container.location">Location</Translate>
                </th>
                <th>
                  <Translate contentKey="openCellarBookApp.container.containerType">Container Type</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {containerList.map((container, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${container.id}`} color="link" size="sm">
                      {container.id}
                    </Button>
                  </td>
                  <td>{container.name}</td>
                  <td>{container.isAlwaysFull ? 'true' : 'false'}</td>
                  <td>{container.currentAmountOfContent}</td>
                  <td>{container.capacity}</td>
                  <td>{container.color}</td>
                  <td>{container.orderNumber}</td>
                  <td>
                    {container.icon ? (
                      <div>
                        {container.iconContentType ? (
                          <a onClick={openFile(container.iconContentType, container.icon)}>
                            <Translate contentKey="entity.action.open">Open</Translate>
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {container.iconContentType}, {byteSize(container.icon)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>
                    {container.deletedAt ? <TextFormat type="date" value={container.deletedAt} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>{container.location ? <Link to={`location/${container.location.id}`}>{container.location.id}</Link> : ''}</td>
                  <td>
                    {container.containerType ? (
                      <Link to={`container-type/${container.containerType.id}`}>{container.containerType.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${container.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${container.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${container.id}/delete`} color="danger" size="sm">
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
    </div>
  );
};

const mapStateToProps = ({ container }: IRootState) => ({
  containerList: container.entities,
  loading: container.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Container);
