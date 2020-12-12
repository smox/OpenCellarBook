import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './possible-p-types-for-f-effect.reducer';

export interface IPossiblePTypesForFEffectDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PossiblePTypesForFEffectDeleteDialog = (props: IPossiblePTypesForFEffectDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/possible-p-types-for-f-effect');
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.possiblePTypesForFEffectEntity.id);
  };

  const { possiblePTypesForFEffectEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="openCellarBookApp.possiblePTypesForFEffect.delete.question">
        <Translate
          contentKey="openCellarBookApp.possiblePTypesForFEffect.delete.question"
          interpolate={{ id: possiblePTypesForFEffectEntity.id }}
        >
          Are you sure you want to delete this PossiblePTypesForFEffect?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="jhi-confirm-delete-possiblePTypesForFEffect" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ possiblePTypesForFEffect }: IRootState) => ({
  possiblePTypesForFEffectEntity: possiblePTypesForFEffect.entity,
  updateSuccess: possiblePTypesForFEffect.updateSuccess,
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PossiblePTypesForFEffectDeleteDialog);
