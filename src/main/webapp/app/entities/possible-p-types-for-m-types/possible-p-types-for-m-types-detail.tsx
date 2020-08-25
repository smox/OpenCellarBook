import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './possible-p-types-for-m-types.reducer';
import { IPossiblePTypesForMTypes } from 'app/shared/model/possible-p-types-for-m-types.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPossiblePTypesForMTypesDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PossiblePTypesForMTypesDetail = (props: IPossiblePTypesForMTypesDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { possiblePTypesForMTypesEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="openCellarBookApp.possiblePTypesForMTypes.detail.title">PossiblePTypesForMTypes</Translate> [
          <b>{possiblePTypesForMTypesEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <Translate contentKey="openCellarBookApp.possiblePTypesForMTypes.measureType">Measure Type</Translate>
          </dt>
          <dd>{possiblePTypesForMTypesEntity.measureType ? possiblePTypesForMTypesEntity.measureType.id : ''}</dd>
          <dt>
            <Translate contentKey="openCellarBookApp.possiblePTypesForMTypes.measurePropertyType">Measure Property Type</Translate>
          </dt>
          <dd>{possiblePTypesForMTypesEntity.measurePropertyType ? possiblePTypesForMTypesEntity.measurePropertyType.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/possible-p-types-for-m-types" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/possible-p-types-for-m-types/${possiblePTypesForMTypesEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ possiblePTypesForMTypes }: IRootState) => ({
  possiblePTypesForMTypesEntity: possiblePTypesForMTypes.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PossiblePTypesForMTypesDetail);
