import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './ui-type.reducer';
import { IUiType } from 'app/shared/model/ui-type.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUiTypeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const UiType = (props: IUiTypeProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { uiTypeList, match, loading } = props;
  return (
    <div>
      <h2 id="ui-type-heading">
        <Translate contentKey="openCellarBookApp.uiType.home.title">Ui Types</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="openCellarBookApp.uiType.home.createLabel">Create new Ui Type</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {uiTypeList && uiTypeList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="openCellarBookApp.uiType.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="openCellarBookApp.uiType.element">Element</Translate>
                </th>
                <th>
                  <Translate contentKey="openCellarBookApp.uiType.expression">Expression</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {uiTypeList.map((uiType, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${uiType.id}`} color="link" size="sm">
                      {uiType.id}
                    </Button>
                  </td>
                  <td>{uiType.name}</td>
                  <td>
                    <Translate contentKey={`openCellarBookApp.UiElement.${uiType.element}`} />
                  </td>
                  <td>{uiType.expression}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${uiType.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${uiType.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${uiType.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="openCellarBookApp.uiType.home.notFound">No Ui Types found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ uiType }: IRootState) => ({
  uiTypeList: uiType.entities,
  loading: uiType.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UiType);
