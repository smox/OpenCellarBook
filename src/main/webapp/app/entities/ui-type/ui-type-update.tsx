import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './ui-type.reducer';
import { IUiType } from 'app/shared/model/ui-type.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IUiTypeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const UiTypeUpdate = (props: IUiTypeUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { uiTypeEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/ui-type');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...uiTypeEntity,
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
          <h2 id="openCellarBookApp.uiType.home.createOrEditLabel">
            <Translate contentKey="openCellarBookApp.uiType.home.createOrEditLabel">Create or edit a UiType</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : uiTypeEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="ui-type-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="ui-type-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="ui-type-name">
                  <Translate contentKey="openCellarBookApp.uiType.name">Name</Translate>
                </Label>
                <AvField id="ui-type-name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label id="elementLabel" for="ui-type-element">
                  <Translate contentKey="openCellarBookApp.uiType.element">Element</Translate>
                </Label>
                <AvInput
                  id="ui-type-element"
                  type="select"
                  className="form-control"
                  name="element"
                  value={(!isNew && uiTypeEntity.element) || 'TEXT_FIELD'}
                >
                  <option value="TEXT_FIELD">{translate('openCellarBookApp.UiElement.TEXT_FIELD')}</option>
                  <option value="INTEGER_SPINNER">{translate('openCellarBookApp.UiElement.INTEGER_SPINNER')}</option>
                  <option value="DECIMAL_SPINNER">{translate('openCellarBookApp.UiElement.DECIMAL_SPINNER')}</option>
                  <option value="COMBO_BOX">{translate('openCellarBookApp.UiElement.COMBO_BOX')}</option>
                  <option value="RANGE_SLIDER">{translate('openCellarBookApp.UiElement.RANGE_SLIDER')}</option>
                  <option value="SEARCHABLE_COMBOBOX">{translate('openCellarBookApp.UiElement.SEARCHABLE_COMBOBOX')}</option>
                  <option value="SINGLE_CHOICE_CHECKBOX">{translate('openCellarBookApp.UiElement.SINGLE_CHOICE_CHECKBOX')}</option>
                  <option value="MULTIBLE_CHOICE_CHECKBOX">{translate('openCellarBookApp.UiElement.MULTIBLE_CHOICE_CHECKBOX')}</option>
                  <option value="DATE_PICKER">{translate('openCellarBookApp.UiElement.DATE_PICKER')}</option>
                  <option value="DATE_TIME_PICKER">{translate('openCellarBookApp.UiElement.DATE_TIME_PICKER')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="expressionLabel" for="ui-type-expression">
                  <Translate contentKey="openCellarBookApp.uiType.expression">Expression</Translate>
                </Label>
                <AvField id="ui-type-expression" type="text" name="expression" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/ui-type" replace color="info">
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
  uiTypeEntity: storeState.uiType.entity,
  loading: storeState.uiType.loading,
  updating: storeState.uiType.updating,
  updateSuccess: storeState.uiType.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UiTypeUpdate);
