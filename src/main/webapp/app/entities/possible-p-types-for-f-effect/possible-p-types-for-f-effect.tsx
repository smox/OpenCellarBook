import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './possible-p-types-for-f-effect.reducer';

export interface IPossiblePTypesForFEffectProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const PossiblePTypesForFEffect = (props: IPossiblePTypesForFEffectProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { possiblePTypesForFEffectList, match, loading } = props;
  return (
    <div>
      <h2 id="possible-p-types-for-f-effect-heading">
        <Translate contentKey="openCellarBookApp.possiblePTypesForFEffect.home.title">Possible P Types For F Effects</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="openCellarBookApp.possiblePTypesForFEffect.home.createLabel">
            Create new Possible P Types For F Effect
          </Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {possiblePTypesForFEffectList && possiblePTypesForFEffectList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="openCellarBookApp.possiblePTypesForFEffect.fillingEffect">Filling Effect</Translate>
                </th>
                <th>
                  <Translate contentKey="openCellarBookApp.possiblePTypesForFEffect.measurePropertyType">Measure Property Type</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {possiblePTypesForFEffectList.map((possiblePTypesForFEffect, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${possiblePTypesForFEffect.id}`} color="link" size="sm">
                      {possiblePTypesForFEffect.id}
                    </Button>
                  </td>
                  <td>
                    <Translate contentKey={`openCellarBookApp.FillingEffect.${possiblePTypesForFEffect.fillingEffect}`} />
                  </td>
                  <td>
                    {possiblePTypesForFEffect.measurePropertyType ? (
                      <Link to={`measure-property-type/${possiblePTypesForFEffect.measurePropertyType.id}`}>
                        {possiblePTypesForFEffect.measurePropertyType.id}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${possiblePTypesForFEffect.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${possiblePTypesForFEffect.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${possiblePTypesForFEffect.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="openCellarBookApp.possiblePTypesForFEffect.home.notFound">
                No Possible P Types For F Effects found
              </Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ possiblePTypesForFEffect }: IRootState) => ({
  possiblePTypesForFEffectList: possiblePTypesForFEffect.entities,
  loading: possiblePTypesForFEffect.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PossiblePTypesForFEffect);
