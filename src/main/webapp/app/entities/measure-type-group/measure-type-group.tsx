import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './measure-type-group.reducer';
import { IMeasureTypeGroup } from 'app/shared/model/measure-type-group.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMeasureTypeGroupProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const MeasureTypeGroup = (props: IMeasureTypeGroupProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { measureTypeGroupList, match, loading } = props;
  return (
    <div>
      <h2 id="measure-type-group-heading">
        <Translate contentKey="openCellarBookApp.measureTypeGroup.home.title">Measure Type Groups</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="openCellarBookApp.measureTypeGroup.home.createLabel">Create new Measure Type Group</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {measureTypeGroupList && measureTypeGroupList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="openCellarBookApp.measureTypeGroup.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="openCellarBookApp.measureTypeGroup.measureType">Measure Type</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {measureTypeGroupList.map((measureTypeGroup, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${measureTypeGroup.id}`} color="link" size="sm">
                      {measureTypeGroup.id}
                    </Button>
                  </td>
                  <td>{measureTypeGroup.name}</td>
                  <td>
                    {measureTypeGroup.measureTypes
                      ? measureTypeGroup.measureTypes.map((val, j) => (
                          <span key={j}>
                            <Link to={`measure-type/${val.id}`}>{val.id}</Link>
                            {j === measureTypeGroup.measureTypes.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${measureTypeGroup.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${measureTypeGroup.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${measureTypeGroup.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="openCellarBookApp.measureTypeGroup.home.notFound">No Measure Type Groups found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ measureTypeGroup }: IRootState) => ({
  measureTypeGroupList: measureTypeGroup.entities,
  loading: measureTypeGroup.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MeasureTypeGroup);
