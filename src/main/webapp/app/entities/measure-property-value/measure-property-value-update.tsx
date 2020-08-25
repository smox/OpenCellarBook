import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IMeasurePropertyType } from 'app/shared/model/measure-property-type.model';
import { getEntities as getMeasurePropertyTypes } from 'app/entities/measure-property-type/measure-property-type.reducer';
import { IMeasureEntry } from 'app/shared/model/measure-entry.model';
import { getEntities as getMeasureEntries } from 'app/entities/measure-entry/measure-entry.reducer';
import { getEntity, updateEntity, createEntity, reset } from './measure-property-value.reducer';
import { IMeasurePropertyValue } from 'app/shared/model/measure-property-value.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IMeasurePropertyValueUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MeasurePropertyValueUpdate = (props: IMeasurePropertyValueUpdateProps) => {
  const [measurePropertyTypeId, setMeasurePropertyTypeId] = useState('0');
  const [measureEntryId, setMeasureEntryId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { measurePropertyValueEntity, measurePropertyTypes, measureEntries, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/measure-property-value');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getMeasurePropertyTypes();
    props.getMeasureEntries();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...measurePropertyValueEntity,
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
          <h2 id="openCellarBookApp.measurePropertyValue.home.createOrEditLabel">
            <Translate contentKey="openCellarBookApp.measurePropertyValue.home.createOrEditLabel">
              Create or edit a MeasurePropertyValue
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : measurePropertyValueEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="measure-property-value-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="measure-property-value-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="valueLabel" for="measure-property-value-value">
                  <Translate contentKey="openCellarBookApp.measurePropertyValue.value">Value</Translate>
                </Label>
                <AvField id="measure-property-value-value" type="text" name="value" />
              </AvGroup>
              <AvGroup>
                <Label for="measure-property-value-measurePropertyType">
                  <Translate contentKey="openCellarBookApp.measurePropertyValue.measurePropertyType">Measure Property Type</Translate>
                </Label>
                <AvInput
                  id="measure-property-value-measurePropertyType"
                  type="select"
                  className="form-control"
                  name="measurePropertyType.id"
                >
                  <option value="" key="0" />
                  {measurePropertyTypes
                    ? measurePropertyTypes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="measure-property-value-measureEntry">
                  <Translate contentKey="openCellarBookApp.measurePropertyValue.measureEntry">Measure Entry</Translate>
                </Label>
                <AvInput id="measure-property-value-measureEntry" type="select" className="form-control" name="measureEntry.id">
                  <option value="" key="0" />
                  {measureEntries
                    ? measureEntries.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/measure-property-value" replace color="info">
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
  measurePropertyTypes: storeState.measurePropertyType.entities,
  measureEntries: storeState.measureEntry.entities,
  measurePropertyValueEntity: storeState.measurePropertyValue.entity,
  loading: storeState.measurePropertyValue.loading,
  updating: storeState.measurePropertyValue.updating,
  updateSuccess: storeState.measurePropertyValue.updateSuccess,
});

const mapDispatchToProps = {
  getMeasurePropertyTypes,
  getMeasureEntries,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MeasurePropertyValueUpdate);
