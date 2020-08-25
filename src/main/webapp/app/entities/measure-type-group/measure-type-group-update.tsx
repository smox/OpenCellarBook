import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IMeasureType } from 'app/shared/model/measure-type.model';
import { getEntities as getMeasureTypes } from 'app/entities/measure-type/measure-type.reducer';
import { getEntity, updateEntity, createEntity, reset } from './measure-type-group.reducer';
import { IMeasureTypeGroup } from 'app/shared/model/measure-type-group.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IMeasureTypeGroupUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MeasureTypeGroupUpdate = (props: IMeasureTypeGroupUpdateProps) => {
  const [idsmeasureType, setIdsmeasureType] = useState([]);
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { measureTypeGroupEntity, measureTypes, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/measure-type-group');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getMeasureTypes();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...measureTypeGroupEntity,
        ...values,
        measureTypes: mapIdList(values.measureTypes),
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
          <h2 id="openCellarBookApp.measureTypeGroup.home.createOrEditLabel">
            <Translate contentKey="openCellarBookApp.measureTypeGroup.home.createOrEditLabel">Create or edit a MeasureTypeGroup</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : measureTypeGroupEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="measure-type-group-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="measure-type-group-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="measure-type-group-name">
                  <Translate contentKey="openCellarBookApp.measureTypeGroup.name">Name</Translate>
                </Label>
                <AvField id="measure-type-group-name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label for="measure-type-group-measureType">
                  <Translate contentKey="openCellarBookApp.measureTypeGroup.measureType">Measure Type</Translate>
                </Label>
                <AvInput
                  id="measure-type-group-measureType"
                  type="select"
                  multiple
                  className="form-control"
                  name="measureTypes"
                  value={measureTypeGroupEntity.measureTypes && measureTypeGroupEntity.measureTypes.map(e => e.id)}
                >
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
              <Button tag={Link} id="cancel-save" to="/measure-type-group" replace color="info">
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
  measureTypeGroupEntity: storeState.measureTypeGroup.entity,
  loading: storeState.measureTypeGroup.loading,
  updating: storeState.measureTypeGroup.updating,
  updateSuccess: storeState.measureTypeGroup.updateSuccess,
});

const mapDispatchToProps = {
  getMeasureTypes,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MeasureTypeGroupUpdate);
