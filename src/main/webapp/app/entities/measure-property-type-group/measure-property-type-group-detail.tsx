import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './measure-property-type-group.reducer';
import { IMeasurePropertyTypeGroup } from 'app/shared/model/measure-property-type-group.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMeasurePropertyTypeGroupDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MeasurePropertyTypeGroupDetail = (props: IMeasurePropertyTypeGroupDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { measurePropertyTypeGroupEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="openCellarBookApp.measurePropertyTypeGroup.detail.title">MeasurePropertyTypeGroup</Translate> [
          <b>{measurePropertyTypeGroupEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="openCellarBookApp.measurePropertyTypeGroup.name">Name</Translate>
            </span>
          </dt>
          <dd>{measurePropertyTypeGroupEntity.name}</dd>
          <dt>
            <Translate contentKey="openCellarBookApp.measurePropertyTypeGroup.measurePropertyType">Measure Property Type</Translate>
          </dt>
          <dd>
            {measurePropertyTypeGroupEntity.measurePropertyTypes
              ? measurePropertyTypeGroupEntity.measurePropertyTypes.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {measurePropertyTypeGroupEntity.measurePropertyTypes &&
                    i === measurePropertyTypeGroupEntity.measurePropertyTypes.length - 1
                      ? ''
                      : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/measure-property-type-group" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/measure-property-type-group/${measurePropertyTypeGroupEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ measurePropertyTypeGroup }: IRootState) => ({
  measurePropertyTypeGroupEntity: measurePropertyTypeGroup.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MeasurePropertyTypeGroupDetail);
