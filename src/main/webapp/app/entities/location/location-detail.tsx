import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './location.reducer';
import { ILocation } from 'app/shared/model/location.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILocationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const LocationDetail = (props: ILocationDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { locationEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="openCellarBookApp.location.detail.title">Location</Translate> [<b>{locationEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="openCellarBookApp.location.name">Name</Translate>
            </span>
          </dt>
          <dd>{locationEntity.name}</dd>
          <dt>
            <span id="color">
              <Translate contentKey="openCellarBookApp.location.color">Color</Translate>
            </span>
          </dt>
          <dd>{locationEntity.color}</dd>
          <dt>
            <span id="icon">
              <Translate contentKey="openCellarBookApp.location.icon">Icon</Translate>
            </span>
          </dt>
          <dd>
            {locationEntity.icon ? (
              <div>
                {locationEntity.iconContentType ? (
                  <a onClick={openFile(locationEntity.iconContentType, locationEntity.icon)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                ) : null}
                <span>
                  {locationEntity.iconContentType}, {byteSize(locationEntity.icon)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="orderNumber">
              <Translate contentKey="openCellarBookApp.location.orderNumber">Order Number</Translate>
            </span>
          </dt>
          <dd>{locationEntity.orderNumber}</dd>
          <dt>
            <span id="deletedAt">
              <Translate contentKey="openCellarBookApp.location.deletedAt">Deleted At</Translate>
            </span>
          </dt>
          <dd>
            {locationEntity.deletedAt ? <TextFormat value={locationEntity.deletedAt} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
        </dl>
        <Button tag={Link} to="/location" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/location/${locationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ location }: IRootState) => ({
  locationEntity: location.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LocationDetail);
