import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, setBlob, reset } from './location.reducer';
import { ILocation } from 'app/shared/model/location.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ILocationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const LocationUpdate = (props: ILocationUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { locationEntity, loading, updating } = props;

  const { icon, iconContentType } = locationEntity;

  const handleClose = () => {
    props.history.push('/location');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
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
        ...locationEntity,
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
          <h2 id="openCellarBookApp.location.home.createOrEditLabel">
            <Translate contentKey="openCellarBookApp.location.home.createOrEditLabel">Create or edit a Location</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : locationEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="location-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="location-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="location-name">
                  <Translate contentKey="openCellarBookApp.location.name">Name</Translate>
                </Label>
                <AvField id="location-name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label id="colorLabel" for="location-color">
                  <Translate contentKey="openCellarBookApp.location.color">Color</Translate>
                </Label>
                <AvField id="location-color" type="text" name="color" />
              </AvGroup>
              <AvGroup>
                <AvGroup>
                  <Label id="iconLabel" for="icon">
                    <Translate contentKey="openCellarBookApp.location.icon">Icon</Translate>
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
                <Label id="orderNumberLabel" for="location-orderNumber">
                  <Translate contentKey="openCellarBookApp.location.orderNumber">Order Number</Translate>
                </Label>
                <AvField id="location-orderNumber" type="string" className="form-control" name="orderNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="deletedAtLabel" for="location-deletedAt">
                  <Translate contentKey="openCellarBookApp.location.deletedAt">Deleted At</Translate>
                </Label>
                <AvField id="location-deletedAt" type="date" className="form-control" name="deletedAt" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/location" replace color="info">
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
  locationEntity: storeState.location.entity,
  loading: storeState.location.loading,
  updating: storeState.location.updating,
  updateSuccess: storeState.location.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LocationUpdate);
