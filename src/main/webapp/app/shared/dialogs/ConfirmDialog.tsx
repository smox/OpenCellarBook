import {translate, Translate} from "react-jhipster";
import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';


interface IConfirmDialog {
  loading: boolean,
  entity: string,
  headerText: Translate,
  bodyText: Translate,
  confirmButtonLabel: Translate,
  backAction: Function
  confirmAction: Function
}

export const ConfirmDialog = ({ loading, entity, headerText, bodyText, confirmButtonLabel, backAction, confirmAction }) => {

  const submitAction = () => {
    confirmAction();
    backAction();
  }

  return (
    <Modal isOpen={true} backdrop="static" id="settings-location-detail-modal" autoFocus={true}>
      <ModalHeader>
        { headerText }
      </ModalHeader>
      <ModalBody>
        {loading ?
          (
            <p>{translate("global.messages.info.entity.loading",
              { entity: translate(`openCellarBookApp.${entity}.designation`) })}</p>)
          : <p>{ bodyText }</p>
        }
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={ backAction } tabIndex="1">
          <Translate contentKey="entity.action.back">Back</Translate>
        </Button>{' '}
        <Button disabled={ loading } color="primary" onClick={ submitAction }>
          { confirmButtonLabel }
        </Button>
      </ModalFooter>
    </Modal>
  );
}
