import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IMeasureType } from 'app/shared/model/measure-type.model';
import { getEntities as getMeasureTypes } from 'app/entities/measure-type/measure-type.reducer';
import { IMeasurePropertyType } from 'app/shared/model/measure-property-type.model';
import { getEntities as getMeasurePropertyTypes } from 'app/entities/measure-property-type/measure-property-type.reducer';
import { getEntity, updateEntity, createEntity, reset } from './possible-p-types-for-m-types.reducer';
import { IPossiblePTypesForMTypes } from 'app/shared/model/possible-p-types-for-m-types.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPossiblePTypesForMTypesUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PossiblePTypesForMTypesUpdate = (props: IPossiblePTypesForMTypesUpdateProps) => {
  const [measureTypeId, setMeasureTypeId] = useState('0');
  const [measurePropertyTypeId, setMeasurePropertyTypeId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { possiblePTypesForMTypesEntity, measureTypes, measurePropertyTypes, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/possible-p-types-for-m-types');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getMeasureTypes();
    props.getMeasurePropertyTypes();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...possiblePTypesForMTypesEntity,
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
          <h2 id="openCellarBookApp.possiblePTypesForMTypes.home.createOrEditLabel">
            <Translate contentKey="openCellarBookApp.possiblePTypesForMTypes.home.createOrEditLabel">
              Create or edit a PossiblePTypesForMTypes
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : possiblePTypesForMTypesEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="possible-p-types-for-m-types-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="possible-p-types-for-m-types-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label for="possible-p-types-for-m-types-measureType">
                  <Translate contentKey="openCellarBookApp.possiblePTypesForMTypes.measureType">Measure Type</Translate>
                </Label>
                <AvInput id="possible-p-types-for-m-types-measureType" type="select" className="form-control" name="measureType.id">
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
              <AvGroup>
                <Label for="possible-p-types-for-m-types-measurePropertyType">
                  <Translate contentKey="openCellarBookApp.possiblePTypesForMTypes.measurePropertyType">Measure Property Type</Translate>
                </Label>
                <AvInput
                  id="possible-p-types-for-m-types-measurePropertyType"
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
              <Button tag={Link} id="cancel-save" to="/possible-p-types-for-m-types" replace color="info">
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
  measurePropertyTypes: storeState.measurePropertyType.entities,
  possiblePTypesForMTypesEntity: storeState.possiblePTypesForMTypes.entity,
  loading: storeState.possiblePTypesForMTypes.loading,
  updating: storeState.possiblePTypesForMTypes.updating,
  updateSuccess: storeState.possiblePTypesForMTypes.updateSuccess,
});

const mapDispatchToProps = {
  getMeasureTypes,
  getMeasurePropertyTypes,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PossiblePTypesForMTypesUpdate);
