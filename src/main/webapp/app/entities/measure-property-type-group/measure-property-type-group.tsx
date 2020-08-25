import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './measure-property-type-group.reducer';
import { IMeasurePropertyTypeGroup } from 'app/shared/model/measure-property-type-group.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMeasurePropertyTypeGroupProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const MeasurePropertyTypeGroup = (props: IMeasurePropertyTypeGroupProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { measurePropertyTypeGroupList, match, loading } = props;
  return (
    <div>
      <h2 id="measure-property-type-group-heading">
        <Translate contentKey="openCellarBookApp.measurePropertyTypeGroup.home.title">Measure Property Type Groups</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="openCellarBookApp.measurePropertyTypeGroup.home.createLabel">
            Create new Measure Property Type Group
          </Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {measurePropertyTypeGroupList && measurePropertyTypeGroupList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="openCellarBookApp.measurePropertyTypeGroup.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="openCellarBookApp.measurePropertyTypeGroup.measurePropertyType">Measure Property Type</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {measurePropertyTypeGroupList.map((measurePropertyTypeGroup, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${measurePropertyTypeGroup.id}`} color="link" size="sm">
                      {measurePropertyTypeGroup.id}
                    </Button>
                  </td>
                  <td>{measurePropertyTypeGroup.name}</td>
                  <td>
                    {measurePropertyTypeGroup.measurePropertyTypes
                      ? measurePropertyTypeGroup.measurePropertyTypes.map((val, j) => (
                          <span key={j}>
                            <Link to={`measure-property-type/${val.id}`}>{val.id}</Link>
                            {j === measurePropertyTypeGroup.measurePropertyTypes.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${measurePropertyTypeGroup.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${measurePropertyTypeGroup.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${measurePropertyTypeGroup.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="openCellarBookApp.measurePropertyTypeGroup.home.notFound">
                No Measure Property Type Groups found
              </Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ measurePropertyTypeGroup }: IRootState) => ({
  measurePropertyTypeGroupList: measurePropertyTypeGroup.entities,
  loading: measurePropertyTypeGroup.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MeasurePropertyTypeGroup);
