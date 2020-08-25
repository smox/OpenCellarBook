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
import { getEntity, updateEntity, createEntity, reset } from './measure-property-type-group.reducer';
import { IMeasurePropertyTypeGroup } from 'app/shared/model/measure-property-type-group.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IMeasurePropertyTypeGroupUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MeasurePropertyTypeGroupUpdate = (props: IMeasurePropertyTypeGroupUpdateProps) => {
  const [idsmeasurePropertyType, setIdsmeasurePropertyType] = useState([]);
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { measurePropertyTypeGroupEntity, measurePropertyTypes, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/measure-property-type-group');
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
        ...measurePropertyTypeGroupEntity,
        ...values,
        measurePropertyTypes: mapIdList(values.measurePropertyTypes),
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
          <h2 id="openCellarBookApp.measurePropertyTypeGroup.home.createOrEditLabel">
            <Translate contentKey="openCellarBookApp.measurePropertyTypeGroup.home.createOrEditLabel">
              Create or edit a MeasurePropertyTypeGroup
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : measurePropertyTypeGroupEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="measure-property-type-group-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="measure-property-type-group-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="measure-property-type-group-name">
                  <Translate contentKey="openCellarBookApp.measurePropertyTypeGroup.name">Name</Translate>
                </Label>
                <AvField id="measure-property-type-group-name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label for="measure-property-type-group-measurePropertyType">
                  <Translate contentKey="openCellarBookApp.measurePropertyTypeGroup.measurePropertyType">Measure Property Type</Translate>
                </Label>
                <AvInput
                  id="measure-property-type-group-measurePropertyType"
                  type="select"
                  multiple
                  className="form-control"
                  name="measurePropertyTypes"
                  value={
                    measurePropertyTypeGroupEntity.measurePropertyTypes &&
                    measurePropertyTypeGroupEntity.measurePropertyTypes.map(e => e.id)
                  }
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
              <Button tag={Link} id="cancel-save" to="/measure-property-type-group" replace color="info">
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
  measurePropertyTypeGroupEntity: storeState.measurePropertyTypeGroup.entity,
  loading: storeState.measurePropertyTypeGroup.loading,
  updating: storeState.measurePropertyTypeGroup.updating,
  updateSuccess: storeState.measurePropertyTypeGroup.updateSuccess,
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

export default connect(mapStateToProps, mapDispatchToProps)(MeasurePropertyTypeGroupUpdate);
