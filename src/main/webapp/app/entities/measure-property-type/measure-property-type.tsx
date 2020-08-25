import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './measure-property-type.reducer';
import { IMeasurePropertyType } from 'app/shared/model/measure-property-type.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMeasurePropertyTypeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const MeasurePropertyType = (props: IMeasurePropertyTypeProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { measurePropertyTypeList, match, loading } = props;
  return (
    <div>
      <h2 id="measure-property-type-heading">
        <Translate contentKey="openCellarBookApp.measurePropertyType.home.title">Measure Property Types</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="openCellarBookApp.measurePropertyType.home.createLabel">Create new Measure Property Type</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {measurePropertyTypeList && measurePropertyTypeList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="openCellarBookApp.measurePropertyType.type">Type</Translate>
                </th>
                <th>
                  <Translate contentKey="openCellarBookApp.measurePropertyType.orderNumber">Order Number</Translate>
                </th>
                <th>
                  <Translate contentKey="openCellarBookApp.measurePropertyType.uiType">Ui Type</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {measurePropertyTypeList.map((measurePropertyType, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${measurePropertyType.id}`} color="link" size="sm">
                      {measurePropertyType.id}
                    </Button>
                  </td>
                  <td>{measurePropertyType.type}</td>
                  <td>{measurePropertyType.orderNumber}</td>
                  <td>
                    {measurePropertyType.uiType ? (
                      <Link to={`ui-type/${measurePropertyType.uiType.id}`}>{measurePropertyType.uiType.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${measurePropertyType.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${measurePropertyType.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${measurePropertyType.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="openCellarBookApp.measurePropertyType.home.notFound">No Measure Property Types found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ measurePropertyType }: IRootState) => ({
  measurePropertyTypeList: measurePropertyType.entities,
  loading: measurePropertyType.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MeasurePropertyType);
