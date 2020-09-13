import React, {useEffect} from 'react';
import {Translate, translate} from 'react-jhipster';
import {Button, Col, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row} from 'reactstrap';
import {AvField, AvForm, AvGroup, AvInput} from 'availity-reactstrap-validation';
import {IMeasureType} from "app/shared/model/measure-type.model";
import {IRootState} from "app/shared/reducers";
import {connect} from "react-redux";
import {setSelectedMeasureTypeId} from "app/modules/measure-entry/add-modal.reducer";
import { FillingEffect } from "app/shared/model/enumerations/filling-effect.model";
import { IContainer } from "app/shared/model/container.model";
import container from "app/entities/container/container";

export interface IAddMeasureEntryModalProps extends StateProps, DispatchProps {
  showModal: boolean;
  handleAddMeasure: Function;
  handleClose: Function;
  measureTypes: readonly IMeasureType[];
  containers: readonly IContainer[];
  currentContainerId: number;
}

class AddMeasureModal extends React.Component<IAddMeasureEntryModalProps> {

  handleSubmit = (event, errors,
                  {
                    realizedAt,
                    measureType,
                    additionalInformation,
                    container
                  }) => {
    const { handleAddMeasure } = this.props;
    handleAddMeasure(realizedAt, measureType, additionalInformation, container);
  };

  render() {
    const { handleClose, measureTypes } = this.props;

    const defaultValues = {
      realizedAt: new Date()
    }

    const currentContainer =
      this.props.containers.find(c1 => c1.id === Number(this.props.currentContainerId));

    const selectedMeasureType = measureTypes.find(mt => mt.id === Number(this.props.selectedMeasureTypeId));

    return (
      <Modal isOpen={this.props.showModal} toggle={handleClose} backdrop="static" id="measures-add-page" autoFocus={false}>
        <AvForm onSubmit={this.handleSubmit} model={defaultValues}>
          <ModalHeader id="measures-add-title" toggle={handleClose}>
            <Translate contentKey="openCellarBookApp.measureEntry.add.title" interpolate={{ param: currentContainer ? currentContainer.name : "" }}>Add Measure</Translate>
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col md="12">
                <AvGroup>
                  <Label id="realizedAtLabel" for="measure-entry-realizedAt">
                    <Translate contentKey="openCellarBookApp.measureEntry.realizedAt">Realized At</Translate>
                  </Label>
                  <AvField id="measure-entry-realizedAt" type="date" className="form-control"
                           name="realizedAt"
                           errorMessage={translate('openCellarBookApp.measureEntry.add.createdAt.errorMessage')}
                           required />
                </AvGroup>
                <AvGroup>
                  <Label for="measure-entry-measureType">
                    <Translate contentKey="openCellarBookApp.measureEntry.measureType">Measure Type</Translate>
                  </Label>
                  <AvInput onChange={ this.props.setSelectedMeasureTypeId }
                            id="measure-entry-measureType"
                            type="select"
                            className="form-control"
                            name="measureType.id"
                            required>
                    <option value="" key="0" />
                    {measureTypes ? measureTypes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.name}
                        </option>
                      ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvField
                  name="additionalInformation"
                  label={translate('openCellarBookApp.measureEntry.additionalInformation')}
                  placeholder={translate('openCellarBookApp.measureEntry.add.additionalInformation.placeholder')}
                />
                {
                  selectedMeasureType && selectedMeasureType.fillingEffect
                    && selectedMeasureType.fillingEffect === FillingEffect.TRANSFILL ? (
                    <AvGroup>
                      <Label for="measure-entry-container">
                        <Translate contentKey="openCellarBookApp.measureEntry.container">Container</Translate>
                      </Label>
                      <AvInput id="measure-entry-container"
                               type="select"
                               className="form-control"
                               name="container.id"
                               required>
                        <option value="" key="0" />
                        { this.props.containers
                          ? this.props.containers.map(otherEntity => (
                            <option value={otherEntity.id} key={otherEntity.id}>
                              {otherEntity.name}
                            </option>
                          ))
                          : null}
                      </AvInput>
                    </AvGroup>
                  ) : null
                }
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={handleClose} tabIndex="1">
              <Translate contentKey="entity.action.cancel">Cancel</Translate>
            </Button>{' '}
            <Button color="primary" type="submit">
              <Translate contentKey="entity.action.add">Add</Translate>
            </Button>
          </ModalFooter>
        </AvForm>
      </Modal>
    );
  }
}

const mapStateToProps = ({ addMeasureEntryModal }: IRootState) => ({
  selectedMeasureTypeId: addMeasureEntryModal.selectedMeasureTypeId
});

const mapDispatchToProps = { setSelectedMeasureTypeId };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AddMeasureModal);
