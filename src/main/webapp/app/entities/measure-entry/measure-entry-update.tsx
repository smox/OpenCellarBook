import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntities as getMeasureEntries } from 'app/entities/measure-entry/measure-entry.reducer';
import { IContainer } from 'app/shared/model/container.model';
import { getEntities as getContainers } from 'app/entities/container/container.reducer';
import { IMeasureType } from 'app/shared/model/measure-type.model';
import { getEntities as getMeasureTypes } from 'app/entities/measure-type/measure-type.reducer';
import { getEntity, updateEntity, createEntity, reset } from './measure-entry.reducer';
import { IMeasureEntry } from 'app/shared/model/measure-entry.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IMeasureEntryUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MeasureEntryUpdate = (props: IMeasureEntryUpdateProps) => {
  const [childrenId, setChildrenId] = useState('0');
  const [parentId, setParentId] = useState('0');
  const [containerId, setContainerId] = useState('0');
  const [currentContainerId, setCurrentContainerId] = useState('0');
  const [measureTypeId, setMeasureTypeId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { measureEntryEntity, measureEntries, containers, measureTypes, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/measure-entry');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getMeasureEntries();
    props.getContainers();
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
        ...measureEntryEntity,
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
          <h2 id="openCellarBookApp.measureEntry.home.createOrEditLabel">
            <Translate contentKey="openCellarBookApp.measureEntry.home.createOrEditLabel">Create or edit a MeasureEntry</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : measureEntryEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="measure-entry-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="measure-entry-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="realizedAtLabel" for="measure-entry-realizedAt">
                  <Translate contentKey="openCellarBookApp.measureEntry.realizedAt">Realized At</Translate>
                </Label>
                <AvField id="measure-entry-realizedAt" type="date" className="form-control" name="realizedAt" />
              </AvGroup>
              <AvGroup>
                <Label id="createdAtLabel" for="measure-entry-createdAt">
                  <Translate contentKey="openCellarBookApp.measureEntry.createdAt">Created At</Translate>
                </Label>
                <AvField id="measure-entry-createdAt" type="date" className="form-control" name="createdAt" />
              </AvGroup>
              <AvGroup>
                <Label id="additionalInformationLabel" for="measure-entry-additionalInformation">
                  <Translate contentKey="openCellarBookApp.measureEntry.additionalInformation">Additional Information</Translate>
                </Label>
                <AvField id="measure-entry-additionalInformation" type="text" name="additionalInformation" />
              </AvGroup>
              <AvGroup>
                <Label id="deletedAtLabel" for="measure-entry-deletedAt">
                  <Translate contentKey="openCellarBookApp.measureEntry.deletedAt">Deleted At</Translate>
                </Label>
                <AvField id="measure-entry-deletedAt" type="date" className="form-control" name="deletedAt" />
              </AvGroup>
              <AvGroup>
                <Label for="measure-entry-container">
                  <Translate contentKey="openCellarBookApp.measureEntry.container">Container</Translate>
                </Label>
                <AvInput id="measure-entry-container" type="select" className="form-control" name="container.id">
                  <option value="" key="0" />
                  {containers
                    ? containers.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="measure-entry-currentContainer">
                  <Translate contentKey="openCellarBookApp.measureEntry.currentContainer">Current Container</Translate>
                </Label>
                <AvInput id="measure-entry-currentContainer" type="select" className="form-control" name="currentContainer.id">
                  <option value="" key="0" />
                  {containers
                    ? containers.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="measure-entry-measureType">
                  <Translate contentKey="openCellarBookApp.measureEntry.measureType">Measure Type</Translate>
                </Label>
                <AvInput id="measure-entry-measureType" type="select" className="form-control" name="measureType.id">
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
                <Label for="measure-entry-parent">
                  <Translate contentKey="openCellarBookApp.measureEntry.parent">Parent</Translate>
                </Label>
                <AvInput id="measure-entry-parent" type="select" className="form-control" name="parent.id">
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
              <Button tag={Link} id="cancel-save" to="/measure-entry" replace color="info">
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
  measureEntries: storeState.measureEntry.entities,
  containers: storeState.container.entities,
  measureTypes: storeState.measureType.entities,
  measureEntryEntity: storeState.measureEntry.entity,
  loading: storeState.measureEntry.loading,
  updating: storeState.measureEntry.updating,
  updateSuccess: storeState.measureEntry.updateSuccess,
});

const mapDispatchToProps = {
  getMeasureEntries,
  getContainers,
  getMeasureTypes,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MeasureEntryUpdate);
