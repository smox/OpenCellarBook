import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { openFile, byteSize, Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './measure-type.reducer';
import { IMeasureType } from 'app/shared/model/measure-type.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMeasureTypeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const MeasureType = (props: IMeasureTypeProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { measureTypeList, match, loading } = props;
  return (
    <div>
      <h2 id="measure-type-heading">
        <Translate contentKey="openCellarBookApp.measureType.home.title">Measure Types</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="openCellarBookApp.measureType.home.createLabel">Create new Measure Type</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {measureTypeList && measureTypeList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="openCellarBookApp.measureType.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="openCellarBookApp.measureType.fillingEffect">Filling Effect</Translate>
                </th>
                <th>
                  <Translate contentKey="openCellarBookApp.measureType.orderNumber">Order Number</Translate>
                </th>
                <th>
                  <Translate contentKey="openCellarBookApp.measureType.color">Color</Translate>
                </th>
                <th>
                  <Translate contentKey="openCellarBookApp.measureType.icon">Icon</Translate>
                </th>
                <th>
                  <Translate contentKey="openCellarBookApp.measureType.deletedAt">Deleted At</Translate>
                </th>
                <th>
                  <Translate contentKey="openCellarBookApp.measureType.parent">Parent</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {measureTypeList.map((measureType, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${measureType.id}`} color="link" size="sm">
                      {measureType.id}
                    </Button>
                  </td>
                  <td>{measureType.name}</td>
                  <td>
                    <Translate contentKey={`openCellarBookApp.FillingEffect.${measureType.fillingEffect}`} />
                  </td>
                  <td>{measureType.orderNumber}</td>
                  <td>{measureType.color}</td>
                  <td>
                    {measureType.icon ? (
                      <div>
                        {measureType.iconContentType ? (
                          <a onClick={openFile(measureType.iconContentType, measureType.icon)}>
                            <Translate contentKey="entity.action.open">Open</Translate>
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {measureType.iconContentType}, {byteSize(measureType.icon)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>
                    {measureType.deletedAt ? <TextFormat type="date" value={measureType.deletedAt} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>{measureType.parent ? <Link to={`measure-type/${measureType.parent.id}`}>{measureType.parent.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${measureType.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${measureType.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${measureType.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="openCellarBookApp.measureType.home.notFound">No Measure Types found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ measureType }: IRootState) => ({
  measureTypeList: measureType.entities,
  loading: measureType.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MeasureType);
