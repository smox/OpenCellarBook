import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './measure-type.reducer';
import { IMeasureType } from 'app/shared/model/measure-type.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMeasureTypeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MeasureTypeDetail = (props: IMeasureTypeDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { measureTypeEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="openCellarBookApp.measureType.detail.title">MeasureType</Translate> [<b>{measureTypeEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="openCellarBookApp.measureType.name">Name</Translate>
            </span>
          </dt>
          <dd>{measureTypeEntity.name}</dd>
          <dt>
            <span id="fillingEffect">
              <Translate contentKey="openCellarBookApp.measureType.fillingEffect">Filling Effect</Translate>
            </span>
          </dt>
          <dd>{measureTypeEntity.fillingEffect}</dd>
          <dt>
            <span id="orderNumber">
              <Translate contentKey="openCellarBookApp.measureType.orderNumber">Order Number</Translate>
            </span>
          </dt>
          <dd>{measureTypeEntity.orderNumber}</dd>
          <dt>
            <span id="color">
              <Translate contentKey="openCellarBookApp.measureType.color">Color</Translate>
            </span>
          </dt>
          <dd>{measureTypeEntity.color}</dd>
          <dt>
            <span id="icon">
              <Translate contentKey="openCellarBookApp.measureType.icon">Icon</Translate>
            </span>
          </dt>
          <dd>
            {measureTypeEntity.icon ? (
              <div>
                {measureTypeEntity.iconContentType ? (
                  <a onClick={openFile(measureTypeEntity.iconContentType, measureTypeEntity.icon)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                ) : null}
                <span>
                  {measureTypeEntity.iconContentType}, {byteSize(measureTypeEntity.icon)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="deletedAt">
              <Translate contentKey="openCellarBookApp.measureType.deletedAt">Deleted At</Translate>
            </span>
          </dt>
          <dd>
            {measureTypeEntity.deletedAt ? (
              <TextFormat value={measureTypeEntity.deletedAt} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="openCellarBookApp.measureType.parent">Parent</Translate>
          </dt>
          <dd>{measureTypeEntity.parent ? measureTypeEntity.parent.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/measure-type" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/measure-type/${measureTypeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ measureType }: IRootState) => ({
  measureTypeEntity: measureType.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MeasureTypeDetail);
