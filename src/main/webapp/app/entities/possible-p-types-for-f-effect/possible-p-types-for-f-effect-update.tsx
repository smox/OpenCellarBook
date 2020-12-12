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
import { getEntity, updateEntity, createEntity, reset } from './possible-p-types-for-f-effect.reducer';
import { IPossiblePTypesForFEffect } from 'app/shared/model/possible-p-types-for-f-effect.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPossiblePTypesForFEffectUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PossiblePTypesForFEffectUpdate = (props: IPossiblePTypesForFEffectUpdateProps) => {
  const [measurePropertyTypeId, setMeasurePropertyTypeId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { possiblePTypesForFEffectEntity, measurePropertyTypes, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/possible-p-types-for-f-effect');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

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
        ...possiblePTypesForFEffectEntity,
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
          <h2 id="openCellarBookApp.possiblePTypesForFEffect.home.createOrEditLabel">
            <Translate contentKey="openCellarBookApp.possiblePTypesForFEffect.home.createOrEditLabel">
              Create or edit a PossiblePTypesForFEffect
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : possiblePTypesForFEffectEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="possible-p-types-for-f-effect-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="possible-p-types-for-f-effect-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="fillingEffectLabel" for="possible-p-types-for-f-effect-fillingEffect">
                  <Translate contentKey="openCellarBookApp.possiblePTypesForFEffect.fillingEffect">Filling Effect</Translate>
                </Label>
                <AvInput
                  id="possible-p-types-for-f-effect-fillingEffect"
                  type="select"
                  className="form-control"
                  name="fillingEffect"
                  value={(!isNew && possiblePTypesForFEffectEntity.fillingEffect) || 'NO_EFFECT'}
                >
                  <option value="NO_EFFECT">{translate('openCellarBookApp.FillingEffect.NO_EFFECT')}</option>
                  <option value="REFILL">{translate('openCellarBookApp.FillingEffect.REFILL')}</option>
                  <option value="TRANSFILL">{translate('openCellarBookApp.FillingEffect.TRANSFILL')}</option>
                  <option value="BOTTLED">{translate('openCellarBookApp.FillingEffect.BOTTLED')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="possible-p-types-for-f-effect-measurePropertyType">
                  <Translate contentKey="openCellarBookApp.possiblePTypesForFEffect.measurePropertyType">Measure Property Type</Translate>
                </Label>
                <AvInput
                  id="possible-p-types-for-f-effect-measurePropertyType"
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
              <Button tag={Link} id="cancel-save" to="/possible-p-types-for-f-effect" replace color="info">
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
  possiblePTypesForFEffectEntity: storeState.possiblePTypesForFEffect.entity,
  loading: storeState.possiblePTypesForFEffect.loading,
  updating: storeState.possiblePTypesForFEffect.updating,
  updateSuccess: storeState.possiblePTypesForFEffect.updateSuccess,
});

const mapDispatchToProps = {
  getMeasurePropertyTypes,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PossiblePTypesForFEffectUpdate);
