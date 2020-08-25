import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './measure-property-type.reducer';
import { IMeasurePropertyType } from 'app/shared/model/measure-property-type.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMeasurePropertyTypeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MeasurePropertyTypeDetail = (props: IMeasurePropertyTypeDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { measurePropertyTypeEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="openCellarBookApp.measurePropertyType.detail.title">MeasurePropertyType</Translate> [
          <b>{measurePropertyTypeEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="type">
              <Translate contentKey="openCellarBookApp.measurePropertyType.type">Type</Translate>
            </span>
          </dt>
          <dd>{measurePropertyTypeEntity.type}</dd>
          <dt>
            <span id="orderNumber">
              <Translate contentKey="openCellarBookApp.measurePropertyType.orderNumber">Order Number</Translate>
            </span>
          </dt>
          <dd>{measurePropertyTypeEntity.orderNumber}</dd>
          <dt>
            <Translate contentKey="openCellarBookApp.measurePropertyType.uiType">Ui Type</Translate>
          </dt>
          <dd>{measurePropertyTypeEntity.uiType ? measurePropertyTypeEntity.uiType.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/measure-property-type" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/measure-property-type/${measurePropertyTypeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ measurePropertyType }: IRootState) => ({
  measurePropertyTypeEntity: measurePropertyType.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MeasurePropertyTypeDetail);
