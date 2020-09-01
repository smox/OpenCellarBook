import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './possible-p-types-for-m-types.reducer';
import { IPossiblePTypesForMTypes } from 'app/shared/model/possible-p-types-for-m-types.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPossiblePTypesForMTypesProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const PossiblePTypesForMTypes = (props: IPossiblePTypesForMTypesProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { possiblePTypesForMTypesList, match, loading } = props;
  return (
    <div>
      <h2 id="possible-p-types-for-m-types-heading">
        <Translate contentKey="openCellarBookApp.possiblePTypesForMTypes.home.title">Possible P Types For M Types</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="openCellarBookApp.possiblePTypesForMTypes.home.createLabel">
            Create new Possible P Types For M Types
          </Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {possiblePTypesForMTypesList && possiblePTypesForMTypesList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="openCellarBookApp.possiblePTypesForMTypes.measureType">Measure Type</Translate>
                </th>
                <th>
                  <Translate contentKey="openCellarBookApp.possiblePTypesForMTypes.measurePropertyType">Measure Property Type</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {possiblePTypesForMTypesList.map((possiblePTypesForMTypes, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${possiblePTypesForMTypes.id}`} color="link" size="sm">
                      {possiblePTypesForMTypes.id}
                    </Button>
                  </td>
                  <td>
                    {possiblePTypesForMTypes.measureType ? (
                      <Link to={`measure-type/${possiblePTypesForMTypes.measureType.id}`}>{possiblePTypesForMTypes.measureType.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {possiblePTypesForMTypes.measurePropertyType ? (
                      <Link to={`measure-property-type/${possiblePTypesForMTypes.measurePropertyType.id}`}>
                        {possiblePTypesForMTypes.measurePropertyType.id}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${possiblePTypesForMTypes.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${possiblePTypesForMTypes.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${possiblePTypesForMTypes.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="openCellarBookApp.possiblePTypesForMTypes.home.notFound">
                No Possible P Types For M Types found
              </Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ possiblePTypesForMTypes }: IRootState) => ({
  possiblePTypesForMTypesList: possiblePTypesForMTypes.entities,
  loading: possiblePTypesForMTypes.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PossiblePTypesForMTypes);
