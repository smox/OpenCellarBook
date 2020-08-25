import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, setBlob, reset } from './container-type.reducer';
import { IContainerType } from 'app/shared/model/container-type.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IContainerTypeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ContainerTypeUpdate = (props: IContainerTypeUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { containerTypeEntity, loading, updating } = props;

  const { icon, iconContentType } = containerTypeEntity;

  const handleClose = () => {
    props.history.push('/container-type');
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
        ...containerTypeEntity,
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
          <h2 id="openCellarBookApp.containerType.home.createOrEditLabel">
            <Translate contentKey="openCellarBookApp.containerType.home.createOrEditLabel">Create or edit a ContainerType</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : containerTypeEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="container-type-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="container-type-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="container-type-name">
                  <Translate contentKey="openCellarBookApp.containerType.name">Name</Translate>
                </Label>
                <AvField id="container-type-name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label id="deletedAtLabel" for="container-type-deletedAt">
                  <Translate contentKey="openCellarBookApp.containerType.deletedAt">Deleted At</Translate>
                </Label>
                <AvField id="container-type-deletedAt" type="date" className="form-control" name="deletedAt" />
              </AvGroup>
              <AvGroup>
                <Label id="colorLabel" for="container-type-color">
                  <Translate contentKey="openCellarBookApp.containerType.color">Color</Translate>
                </Label>
                <AvField id="container-type-color" type="text" name="color" />
              </AvGroup>
              <AvGroup>
                <Label id="orderNumberLabel" for="container-type-orderNumber">
                  <Translate contentKey="openCellarBookApp.containerType.orderNumber">Order Number</Translate>
                </Label>
                <AvField id="container-type-orderNumber" type="string" className="form-control" name="orderNumber" />
              </AvGroup>
              <AvGroup>
                <AvGroup>
                  <Label id="iconLabel" for="icon">
                    <Translate contentKey="openCellarBookApp.containerType.icon">Icon</Translate>
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
              <Button tag={Link} id="cancel-save" to="/container-type" replace color="info">
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
  containerTypeEntity: storeState.containerType.entity,
  loading: storeState.containerType.loading,
  updating: storeState.containerType.updating,
  updateSuccess: storeState.containerType.updateSuccess,
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

export default connect(mapStateToProps, mapDispatchToProps)(ContainerTypeUpdate);
