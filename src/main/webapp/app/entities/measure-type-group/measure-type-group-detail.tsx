import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './measure-type-group.reducer';
import { IMeasureTypeGroup } from 'app/shared/model/measure-type-group.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMeasureTypeGroupDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MeasureTypeGroupDetail = (props: IMeasureTypeGroupDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { measureTypeGroupEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="openCellarBookApp.measureTypeGroup.detail.title">MeasureTypeGroup</Translate> [
          <b>{measureTypeGroupEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="openCellarBookApp.measureTypeGroup.name">Name</Translate>
            </span>
          </dt>
          <dd>{measureTypeGroupEntity.name}</dd>
          <dt>
            <Translate contentKey="openCellarBookApp.measureTypeGroup.measureType">Measure Type</Translate>
          </dt>
          <dd>
            {measureTypeGroupEntity.measureTypes
              ? measureTypeGroupEntity.measureTypes.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {measureTypeGroupEntity.measureTypes && i === measureTypeGroupEntity.measureTypes.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/measure-type-group" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/measure-type-group/${measureTypeGroupEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ measureTypeGroup }: IRootState) => ({
  measureTypeGroupEntity: measureTypeGroup.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MeasureTypeGroupDetail);
