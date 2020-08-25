import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ILocation } from 'app/shared/model/location.model';
import { getEntities as getLocations } from 'app/entities/location/location.reducer';
import { IContainerType } from 'app/shared/model/container-type.model';
import { getEntities as getContainerTypes } from 'app/entities/container-type/container-type.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './container.reducer';
import { IContainer } from 'app/shared/model/container.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IContainerUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ContainerUpdate = (props: IContainerUpdateProps) => {
  const [locationId, setLocationId] = useState('0');
  const [containerTypeId, setContainerTypeId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { containerEntity, locations, containerTypes, loading, updating } = props;

  const { icon, iconContentType } = containerEntity;

  const handleClose = () => {
    props.history.push('/container');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getLocations();
    props.getContainerTypes();
  }, []);

  const onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => props.setBlob(name, data, contentType), isAnImage);
  };

  const clearBlob = name => () => {
    props.setBlob(name, undefined, undefined);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...containerEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="openCellarBookApp.container.home.createOrEditLabel">
            <Translate contentKey="openCellarBookApp.container.home.createOrEditLabel">Create or edit a Container</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : containerEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="container-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="container-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="container-name">
                  <Translate contentKey="openCellarBookApp.container.name">Name</Translate>
                </Label>
                <AvField id="container-name" type="text" name="name" />
              </AvGroup>
              <AvGroup check>
                <Label id="isAlwaysFullLabel">
                  <AvInput id="container-isAlwaysFull" type="checkbox" className="form-check-input" name="isAlwaysFull" />
                  <Translate contentKey="openCellarBookApp.container.isAlwaysFull">Is Always Full</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="currentAmountOfContentLabel" for="container-currentAmountOfContent">
                  <Translate contentKey="openCellarBookApp.container.currentAmountOfContent">Current Amount Of Content</Translate>
                </Label>
                <AvField id="container-currentAmountOfContent" type="string" className="form-control" name="currentAmountOfContent" />
              </AvGroup>
              <AvGroup>
                <Label id="capacityLabel" for="container-capacity">
                  <Translate contentKey="openCellarBookApp.container.capacity">Capacity</Translate>
                </Label>
                <AvField id="container-capacity" type="string" className="form-control" name="capacity" />
              </AvGroup>
              <AvGroup>
                <Label id="colorLabel" for="container-color">
                  <Translate contentKey="openCellarBookApp.container.color">Color</Translate>
                </Label>
                <AvField id="container-color" type="text" name="color" />
              </AvGroup>
              <AvGroup>
                <Label id="orderNumberLabel" for="container-orderNumber">
                  <Translate contentKey="openCellarBookApp.container.orderNumber">Order Number</Translate>
                </Label>
                <AvField id="container-orderNumber" type="string" className="form-control" name="orderNumber" />
              </AvGroup>
              <AvGroup>
                <AvGroup>
                  <Label id="iconLabel" for="icon">
                    <Translate contentKey="openCellarBookApp.container.icon">Icon</Translate>
                  </Label>
                  <br />
                  {icon ? (
                    <div>
                      {iconContentType ? (
                        <a onClick={openFile(iconContentType, icon)}>
                          <Translate contentKey="entity.action.open">Open</Translate>
                        </a>
                      ) : null}
                      <br />
                      <Row>
                        <Col md="11">
                          <span>
                            {iconContentType}, {byteSize(icon)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('icon')}>
                            <FontAwesomeIcon icon="times-circle" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  <input id="file_icon" type="file" onChange={onBlobChange(false, 'icon')} />
                  <AvInput type="hidden" name="icon" value={icon} />
                </AvGroup>
              </AvGroup>
              <AvGroup>
                <Label id="deletedAtLabel" for="container-deletedAt">
                  <Translate contentKey="openCellarBookApp.container.deletedAt">Deleted At</Translate>
                </Label>
                <AvField id="container-deletedAt" type="date" className="form-control" name="deletedAt" />
              </AvGroup>
              <AvGroup>
                <Label for="container-location">
                  <Translate contentKey="openCellarBookApp.container.location">Location</Translate>
                </Label>
                <AvInput id="container-location" type="select" className="form-control" name="location.id">
                  <option value="" key="0" />
                  {locations
                    ? locations.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="container-containerType">
                  <Translate contentKey="openCellarBookApp.container.containerType">Container Type</Translate>
                </Label>
                <AvInput id="container-containerType" type="select" className="form-control" name="containerType.id">
                  <option value="" key="0" />
                  {containerTypes
                    ? containerTypes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/container" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  locations: storeState.location.entities,
  containerTypes: storeState.containerType.entities,
  containerEntity: storeState.container.entity,
  loading: storeState.container.loading,
  updating: storeState.container.updating,
  updateSuccess: storeState.container.updateSuccess,
});

const mapDispatchToProps = {
  getLocations,
  getContainerTypes,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ContainerUpdate);
