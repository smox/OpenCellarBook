import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUiType } from 'app/shared/model/ui-type.model';
import { getEntities as getUiTypes } from 'app/entities/ui-type/ui-type.reducer';
import { IMeasurePropertyTypeGroup } from 'app/shared/model/measure-property-type-group.model';
import { getEntities as getMeasurePropertyTypeGroups } from 'app/entities/measure-property-type-group/measure-property-type-group.reducer';
import { getEntity, updateEntity, createEntity, reset } from './measure-property-type.reducer';
import { IMeasurePropertyType } from 'app/shared/model/measure-property-type.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IMeasurePropertyTypeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MeasurePropertyTypeUpdate = (props: IMeasurePropertyTypeUpdateProps) => {
  const [uiTypeId, setUiTypeId] = useState('0');
  const [measurePropertyTypeGroupId, setMeasurePropertyTypeGroupId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { measurePropertyTypeEntity, uiTypes, measurePropertyTypeGroups, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/measure-property-type');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getUiTypes();
    props.getMeasurePropertyTypeGroups();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...measurePropertyTypeEntity,
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
          <h2 id="openCellarBookApp.measurePropertyType.home.createOrEditLabel">
            <Translate contentKey="openCellarBookApp.measurePropertyType.home.createOrEditLabel">
              Create or edit a MeasurePropertyType
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : measurePropertyTypeEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="measure-property-type-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="measure-property-type-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="typeLabel" for="measure-property-type-type">
                  <Translate contentKey="openCellarBookApp.measurePropertyType.type">Type</Translate>
                </Label>
                <AvField id="measure-property-type-type" type="text" name="type" />
              </AvGroup>
              <AvGroup>
                <Label id="orderNumberLabel" for="measure-property-type-orderNumber">
                  <Translate contentKey="openCellarBookApp.measurePropertyType.orderNumber">Order Number</Translate>
                </Label>
                <AvField id="measure-property-type-orderNumber" type="string" className="form-control" name="orderNumber" />
              </AvGroup>
              <AvGroup>
                <Label for="measure-property-type-uiType">
                  <Translate contentKey="openCellarBookApp.measurePropertyType.uiType">Ui Type</Translate>
                </Label>
                <AvInput id="measure-property-type-uiType" type="select" className="form-control" name="uiType.id">
                  <option value="" key="0" />
                  {uiTypes
                    ? uiTypes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/measure-property-type" replace color="info">
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
  uiTypes: storeState.uiType.entities,
  measurePropertyTypeGroups: storeState.measurePropertyTypeGroup.entities,
  measurePropertyTypeEntity: storeState.measurePropertyType.entity,
  loading: storeState.measurePropertyType.loading,
  updating: storeState.measurePropertyType.updating,
  updateSuccess: storeState.measurePropertyType.updateSuccess,
});

const mapDispatchToProps = {
  getUiTypes,
  getMeasurePropertyTypeGroups,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MeasurePropertyTypeUpdate);
