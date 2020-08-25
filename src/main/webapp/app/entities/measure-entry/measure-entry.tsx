import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './measure-entry.reducer';
import { IMeasureEntry } from 'app/shared/model/measure-entry.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMeasureEntryProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const MeasureEntry = (props: IMeasureEntryProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { measureEntryList, match, loading } = props;
  return (
    <div>
      <h2 id="measure-entry-heading">
        <Translate contentKey="openCellarBookApp.measureEntry.home.title">Measure Entries</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="openCellarBookApp.measureEntry.home.createLabel">Create new Measure Entry</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {measureEntryList && measureEntryList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="openCellarBookApp.measureEntry.realizedAt">Realized At</Translate>
                </th>
                <th>
                  <Translate contentKey="openCellarBookApp.measureEntry.createdAt">Created At</Translate>
                </th>
                <th>
                  <Translate contentKey="openCellarBookApp.measureEntry.additionalInformation">Additional Information</Translate>
                </th>
                <th>
                  <Translate contentKey="openCellarBookApp.measureEntry.deletedAt">Deleted At</Translate>
                </th>
                <th>
                  <Translate contentKey="openCellarBookApp.measureEntry.container">Container</Translate>
                </th>
                <th>
                  <Translate contentKey="openCellarBookApp.measureEntry.currentContainer">Current Container</Translate>
                </th>
                <th>
                  <Translate contentKey="openCellarBookApp.measureEntry.measureType">Measure Type</Translate>
                </th>
                <th>
                  <Translate contentKey="openCellarBookApp.measureEntry.parent">Parent</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {measureEntryList.map((measureEntry, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${measureEntry.id}`} color="link" size="sm">
                      {measureEntry.id}
                    </Button>
                  </td>
                  <td>
                    {measureEntry.realizedAt ? (
                      <TextFormat type="date" value={measureEntry.realizedAt} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {measureEntry.createdAt ? (
                      <TextFormat type="date" value={measureEntry.createdAt} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{measureEntry.additionalInformation}</td>
                  <td>
                    {measureEntry.deletedAt ? (
                      <TextFormat type="date" value={measureEntry.deletedAt} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {measureEntry.container ? <Link to={`container/${measureEntry.container.id}`}>{measureEntry.container.id}</Link> : ''}
                  </td>
                  <td>
                    {measureEntry.currentContainer ? (
                      <Link to={`container/${measureEntry.currentContainer.id}`}>{measureEntry.currentContainer.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {measureEntry.measureType ? (
                      <Link to={`measure-type/${measureEntry.measureType.id}`}>{measureEntry.measureType.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{measureEntry.parent ? <Link to={`measure-entry/${measureEntry.parent.id}`}>{measureEntry.parent.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${measureEntry.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${measureEntry.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${measureEntry.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="openCellarBookApp.measureEntry.home.notFound">No Measure Entries found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ measureEntry }: IRootState) => ({
  measureEntryList: measureEntry.entities,
  loading: measureEntry.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MeasureEntry);
