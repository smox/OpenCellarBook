import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IMeasurePropertyTypeGroup } from 'app/shared/model/measure-property-type-group.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './measure-property-type-group.reducer';

export interface IMeasurePropertyTypeGroupDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MeasurePropertyTypeGroupDeleteDialog = (props: IMeasurePropertyTypeGroupDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/measure-property-type-group');
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.measurePropertyTypeGroupEntity.id);
  };

  const { measurePropertyTypeGroupEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="openCellarBookApp.measurePropertyTypeGroup.delete.question">
        <Translate
          contentKey="openCellarBookApp.measurePropertyTypeGroup.delete.question"
          interpolate={{ id: measurePropertyTypeGroupEntity.id }}
        >
          Are you sure you want to delete this MeasurePropertyTypeGroup?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="jhi-confirm-delete-measurePropertyTypeGroup" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ measurePropertyTypeGroup }: IRootState) => ({
  measurePropertyTypeGroupEntity: measurePropertyTypeGroup.entity,
  updateSuccess: measurePropertyTypeGroup.updateSuccess,
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MeasurePropertyTypeGroupDeleteDialog);
