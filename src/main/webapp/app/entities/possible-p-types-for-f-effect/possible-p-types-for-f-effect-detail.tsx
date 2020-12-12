import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './possible-p-types-for-f-effect.reducer';

export interface IPossiblePTypesForFEffectDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PossiblePTypesForFEffectDetail = (props: IPossiblePTypesForFEffectDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { possiblePTypesForFEffectEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="openCellarBookApp.possiblePTypesForFEffect.detail.title">PossiblePTypesForFEffect</Translate> [
          <b>{possiblePTypesForFEffectEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="fillingEffect">
              <Translate contentKey="openCellarBookApp.possiblePTypesForFEffect.fillingEffect">Filling Effect</Translate>
            </span>
          </dt>
          <dd>{possiblePTypesForFEffectEntity.fillingEffect}</dd>
          <dt>
            <Translate contentKey="openCellarBookApp.possiblePTypesForFEffect.measurePropertyType">Measure Property Type</Translate>
          </dt>
          <dd>{possiblePTypesForFEffectEntity.measurePropertyType ? possiblePTypesForFEffectEntity.measurePropertyType.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/possible-p-types-for-f-effect" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/possible-p-types-for-f-effect/${possiblePTypesForFEffectEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ possiblePTypesForFEffect }: IRootState) => ({
  possiblePTypesForFEffectEntity: possiblePTypesForFEffect.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PossiblePTypesForFEffectDetail);
