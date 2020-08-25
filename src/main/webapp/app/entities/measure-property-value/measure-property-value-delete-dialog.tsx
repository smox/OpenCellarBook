import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IMeasurePropertyValue } from 'app/shared/model/measure-property-value.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './measure-property-value.reducer';

export interface IMeasurePropertyValueDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MeasurePropertyValueDeleteDialog = (props: IMeasurePropertyValueDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/measure-property-value');
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.measurePropertyValueEntity.id);
  };

  const { measurePropertyValueEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="openCellarBookApp.measurePropertyValue.delete.question">
        <Translate contentKey="openCellarBookApp.measurePropertyValue.delete.question" interpolate={{ id: measurePropertyValueEntity.id }}>
          Are you sure you want to delete this MeasurePropertyValue?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="jhi-confirm-delete-measurePropertyValue" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ measurePropertyValue }: IRootState) => ({
  measurePropertyValueEntity: measurePropertyValue.entity,
  updateSuccess: measurePropertyValue.updateSuccess,
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MeasurePropertyValueDeleteDialog);
