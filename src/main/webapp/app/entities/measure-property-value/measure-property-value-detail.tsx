import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './measure-property-value.reducer';
import { IMeasurePropertyValue } from 'app/shared/model/measure-property-value.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMeasurePropertyValueDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MeasurePropertyValueDetail = (props: IMeasurePropertyValueDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { measurePropertyValueEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="openCellarBookApp.measurePropertyValue.detail.title">MeasurePropertyValue</Translate> [
          <b>{measurePropertyValueEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="value">
              <Translate contentKey="openCellarBookApp.measurePropertyValue.value">Value</Translate>
            </span>
          </dt>
          <dd>{measurePropertyValueEntity.value}</dd>
          <dt>
            <Translate contentKey="openCellarBookApp.measurePropertyValue.measurePropertyType">Measure Property Type</Translate>
          </dt>
          <dd>{measurePropertyValueEntity.measurePropertyType ? measurePropertyValueEntity.measurePropertyType.id : ''}</dd>
          <dt>
            <Translate contentKey="openCellarBookApp.measurePropertyValue.measureEntry">Measure Entry</Translate>
          </dt>
          <dd>{measurePropertyValueEntity.measureEntry ? measurePropertyValueEntity.measureEntry.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/measure-property-value" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/measure-property-value/${measurePropertyValueEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ measurePropertyValue }: IRootState) => ({
  measurePropertyValueEntity: measurePropertyValue.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MeasurePropertyValueDetail);
