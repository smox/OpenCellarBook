import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './measure-property-value.reducer';
import { IMeasurePropertyValue } from 'app/shared/model/measure-property-value.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMeasurePropertyValueProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const MeasurePropertyValue = (props: IMeasurePropertyValueProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { measurePropertyValueList, match, loading } = props;
  return (
    <div>
      <h2 id="measure-property-value-heading">
        <Translate contentKey="openCellarBookApp.measurePropertyValue.home.title">Measure Property Values</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="openCellarBookApp.measurePropertyValue.home.createLabel">Create new Measure Property Value</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {measurePropertyValueList && measurePropertyValueList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="openCellarBookApp.measurePropertyValue.value">Value</Translate>
                </th>
                <th>
                  <Translate contentKey="openCellarBookApp.measurePropertyValue.measurePropertyType">Measure Property Type</Translate>
                </th>
                <th>
                  <Translate contentKey="openCellarBookApp.measurePropertyValue.measureEntry">Measure Entry</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {measurePropertyValueList.map((measurePropertyValue, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${measurePropertyValue.id}`} color="link" size="sm">
                      {measurePropertyValue.id}
                    </Button>
                  </td>
                  <td>{measurePropertyValue.value}</td>
                  <td>
                    {measurePropertyValue.measurePropertyType ? (
                      <Link to={`measure-property-type/${measurePropertyValue.measurePropertyType.id}`}>
                        {measurePropertyValue.measurePropertyType.id}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {measurePropertyValue.measureEntry ? (
                      <Link to={`measure-entry/${measurePropertyValue.measureEntry.id}`}>{measurePropertyValue.measureEntry.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${measurePropertyValue.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${measurePropertyValue.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${measurePropertyValue.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="openCellarBookApp.measurePropertyValue.home.notFound">No Measure Property Values found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ measurePropertyValue }: IRootState) => ({
  measurePropertyValueList: measurePropertyValue.entities,
  loading: measurePropertyValue.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MeasurePropertyValue);
