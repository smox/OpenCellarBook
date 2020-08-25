import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntities as getMeasureTypes } from 'app/entities/measure-type/measure-type.reducer';
import { IMeasureTypeGroup } from 'app/shared/model/measure-type-group.model';
import { getEntities as getMeasureTypeGroups } from 'app/entities/measure-type-group/measure-type-group.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './measure-type.reducer';
import { IMeasureType } from 'app/shared/model/measure-type.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IMeasureTypeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MeasureTypeUpdate = (props: IMeasureTypeUpdateProps) => {
  const [childrenId, setChildrenId] = useState('0');
  const [parentId, setParentId] = useState('0');
  const [measureTypeGroupId, setMeasureTypeGroupId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { measureTypeEntity, measureTypes, measureTypeGroups, loading, updating } = props;

  const { icon, iconContentType } = measureTypeEntity;

  const handleClose = () => {
    props.history.push('/measure-type');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getMeasureTypes();
    props.getMeasureTypeGroups();
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
        ...measureTypeEntity,
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
          <h2 id="openCellarBookApp.measureType.home.createOrEditLabel">
            <Translate contentKey="openCellarBookApp.measureType.home.createOrEditLabel">Create or edit a MeasureType</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : measureTypeEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="measure-type-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="measure-type-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="measure-type-name">
                  <Translate contentKey="openCellarBookApp.measureType.name">Name</Translate>
                </Label>
                <AvField id="measure-type-name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label id="fillingEffectLabel" for="measure-type-fillingEffect">
                  <Translate contentKey="openCellarBookApp.measureType.fillingEffect">Filling Effect</Translate>
                </Label>
                <AvInput
                  id="measure-type-fillingEffect"
                  type="select"
                  className="form-control"
                  name="fillingEffect"
                  value={(!isNew && measureTypeEntity.fillingEffect) || 'NO_EFFECT'}
                >
                  <option value="NO_EFFECT">{translate('openCellarBookApp.FillingEffect.NO_EFFECT')}</option>
                  <option value="REFILL">{translate('openCellarBookApp.FillingEffect.REFILL')}</option>
                  <option value="TRANSFILL">{translate('openCellarBookApp.FillingEffect.TRANSFILL')}</option>
                  <option value="BOTTLED">{translate('openCellarBookApp.FillingEffect.BOTTLED')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="orderNumberLabel" for="measure-type-orderNumber">
                  <Translate contentKey="openCellarBookApp.measureType.orderNumber">Order Number</Translate>
                </Label>
                <AvField id="measure-type-orderNumber" type="string" className="form-control" name="orderNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="colorLabel" for="measure-type-color">
                  <Translate contentKey="openCellarBookApp.measureType.color">Color</Translate>
                </Label>
                <AvField id="measure-type-color" type="text" name="color" />
              </AvGroup>
              <AvGroup>
                <AvGroup>
                  <Label id="iconLabel" for="icon">
                    <Translate contentKey="openCellarBookApp.measureType.icon">Icon</Translate>
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
                <Label id="deletedAtLabel" for="measure-type-deletedAt">
                  <Translate contentKey="openCellarBookApp.measureType.deletedAt">Deleted At</Translate>
                </Label>
                <AvField id="measure-type-deletedAt" type="date" className="form-control" name="deletedAt" />
              </AvGroup>
              <AvGroup>
                <Label for="measure-type-parent">
                  <Translate contentKey="openCellarBookApp.measureType.parent">Parent</Translate>
                </Label>
                <AvInput id="measure-type-parent" type="select" className="form-control" name="parent.id">
                  <option value="" key="0" />
                  {measureTypes
                    ? measureTypes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/measure-type" replace color="info">
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
  measureTypes: storeState.measureType.entities,
  measureTypeGroups: storeState.measureTypeGroup.entities,
  measureTypeEntity: storeState.measureType.entity,
  loading: storeState.measureType.loading,
  updating: storeState.measureType.updating,
  updateSuccess: storeState.measureType.updateSuccess,
});

const mapDispatchToProps = {
  getMeasureTypes,
  getMeasureTypeGroups,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MeasureTypeUpdate);
