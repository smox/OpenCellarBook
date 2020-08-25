import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './container-type.reducer';
import { IContainerType } from 'app/shared/model/container-type.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IContainerTypeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ContainerTypeDetail = (props: IContainerTypeDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { containerTypeEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="openCellarBookApp.containerType.detail.title">ContainerType</Translate> [<b>{containerTypeEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="openCellarBookApp.containerType.name">Name</Translate>
            </span>
          </dt>
          <dd>{containerTypeEntity.name}</dd>
          <dt>
            <span id="deletedAt">
              <Translate contentKey="openCellarBookApp.containerType.deletedAt">Deleted At</Translate>
            </span>
          </dt>
          <dd>
            {containerTypeEntity.deletedAt ? (
              <TextFormat value={containerTypeEntity.deletedAt} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="color">
              <Translate contentKey="openCellarBookApp.containerType.color">Color</Translate>
            </span>
          </dt>
          <dd>{containerTypeEntity.color}</dd>
          <dt>
            <span id="orderNumber">
              <Translate contentKey="openCellarBookApp.containerType.orderNumber">Order Number</Translate>
            </span>
          </dt>
          <dd>{containerTypeEntity.orderNumber}</dd>
          <dt>
            <span id="icon">
              <Translate contentKey="openCellarBookApp.containerType.icon">Icon</Translate>
            </span>
          </dt>
          <dd>
            {containerTypeEntity.icon ? (
              <div>
                {containerTypeEntity.iconContentType ? (
                  <a onClick={openFile(containerTypeEntity.iconContentType, containerTypeEntity.icon)}>
                    <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                  </a>
                ) : null}
                <span>
                  {containerTypeEntity.iconContentType}, {byteSize(containerTypeEntity.icon)}
                </span>
              </div>
            ) : null}
          </dd>
        </dl>
        <Button tag={Link} to="/container-type" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/container-type/${containerTypeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ containerType }: IRootState) => ({
  containerTypeEntity: containerType.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ContainerTypeDetail);
