import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IPossiblePTypesForMTypes } from 'app/shared/model/possible-p-types-for-m-types.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './possible-p-types-for-m-types.reducer';

export interface IPossiblePTypesForMTypesDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PossiblePTypesForMTypesDeleteDialog = (props: IPossiblePTypesForMTypesDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/possible-p-types-for-m-types');
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.possiblePTypesForMTypesEntity.id);
  };

  const { possiblePTypesForMTypesEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="openCellarBookApp.possiblePTypesForMTypes.delete.question">
        <Translate
          contentKey="openCellarBookApp.possiblePTypesForMTypes.delete.question"
          interpolate={{ id: possiblePTypesForMTypesEntity.id }}
        >
          Are you sure you want to delete this PossiblePTypesForMTypes?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="jhi-confirm-delete-possiblePTypesForMTypes" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ possiblePTypesForMTypes }: IRootState) => ({
  possiblePTypesForMTypesEntity: possiblePTypesForMTypes.entity,
  updateSuccess: possiblePTypesForMTypes.updateSuccess,
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PossiblePTypesForMTypesDeleteDialog);
