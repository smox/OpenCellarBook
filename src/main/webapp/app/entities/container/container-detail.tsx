import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './container.reducer';
import { IContainer } from 'app/shared/model/container.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IContainerDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ContainerDetail = (props: IContainerDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { containerEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="openCellarBookApp.container.detail.title">Container</Translate> [<b>{containerEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="openCellarBookApp.container.name">Name</Translate>
            </span>
          </dt>
          <dd>{containerEntity.name}</dd>
          <dt>
            <span id="isAlwaysFull">
              <Translate contentKey="openCellarBookApp.container.isAlwaysFull">Is Always Full</Translate>
            </span>
          </dt>
          <dd>{containerEntity.isAlwaysFull ? 'true' : 'false'}</dd>
          <dt>
            <span id="currentAmountOfContent">
              <Translate contentKey="openCellarBookApp.container.currentAmountOfContent">Current Amount Of Content</Translate>
            </span>
          </dt>
          <dd>{containerEntity.currentAmountOfContent}</dd>
          <dt>
            <span id="capacity">
              <Translate contentKey="openCellarBookApp.container.capacity">Capacity</Translate>
            </span>
          </dt>
          <dd>{containerEntity.capacity}</dd>
          <dt>
            <span id="color">
              <Translate contentKey="openCellarBookApp.container.color">Color</Translate>
            </span>
          </dt>
          <dd>{containerEntity.color}</dd>
          <dt>
            <span id="orderNumber">
              <Translate contentKey="openCellarBookApp.container.orderNumber">Order Number</Translate>
            </span>
          </dt>
          <dd>{containerEntity.orderNumber}</dd>
          <dt>
            <span id="icon">
              <Translate contentKey="openCellarBookApp.container.icon">Icon</Translate>
            </span>
          </dt>
          <dd>
            {containerEntity.icon ? (
              <div>
                {containerEntity.iconContentType ? (
                  <a onClick={openFile(containerEntity.iconContentType, containerEntity.icon)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                ) : null}
                <span>
                  {containerEntity.iconContentType}, {byteSize(containerEntity.icon)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="deletedAt">
              <Translate contentKey="openCellarBookApp.container.deletedAt">Deleted At</Translate>
            </span>
          </dt>
          <dd>
            {containerEntity.deletedAt ? <TextFormat value={containerEntity.deletedAt} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <Translate contentKey="openCellarBookApp.container.location">Location</Translate>
          </dt>
          <dd>{containerEntity.location ? containerEntity.location.id : ''}</dd>
          <dt>
            <Translate contentKey="openCellarBookApp.container.containerType">Container Type</Translate>
          </dt>
          <dd>{containerEntity.containerType ? containerEntity.containerType.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/container" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/container/${containerEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ container }: IRootState) => ({
  containerEntity: container.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ContainerDetail);
