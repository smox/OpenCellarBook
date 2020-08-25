import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { openFile, byteSize, Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './container-type.reducer';
import { IContainerType } from 'app/shared/model/container-type.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IContainerTypeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const ContainerType = (props: IContainerTypeProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { containerTypeList, match, loading } = props;
  return (
    <div>
      <h2 id="container-type-heading">
        <Translate contentKey="openCellarBookApp.containerType.home.title">Container Types</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="openCellarBookApp.containerType.home.createLabel">Create new Container Type</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {containerTypeList && containerTypeList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="openCellarBookApp.containerType.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="openCellarBookApp.containerType.deletedAt">Deleted At</Translate>
                </th>
                <th>
                  <Translate contentKey="openCellarBookApp.containerType.color">Color</Translate>
                </th>
                <th>
                  <Translate contentKey="openCellarBookApp.containerType.orderNumber">Order Number</Translate>
                </th>
                <th>
                  <Translate contentKey="openCellarBookApp.containerType.icon">Icon</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {containerTypeList.map((containerType, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${containerType.id}`} color="link" size="sm">
                      {containerType.id}
                    </Button>
                  </td>
                  <td>{containerType.name}</td>
                  <td>
                    {containerType.deletedAt ? (
                      <TextFormat type="date" value={containerType.deletedAt} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{containerType.color}</td>
                  <td>{containerType.orderNumber}</td>
                  <td>
                    {containerType.icon ? (
                      <div>
                        {containerType.iconContentType ? (
                          <a onClick={openFile(containerType.iconContentType, containerType.icon)}>
                            <Translate contentKey="entity.action.open">Open</Translate>
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {containerType.iconContentType}, {byteSize(containerType.icon)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${containerType.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${containerType.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${containerType.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="openCellarBookApp.containerType.home.notFound">No Container Types found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ containerType }: IRootState) => ({
  containerTypeList: containerType.entities,
  loading: containerType.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ContainerType);
