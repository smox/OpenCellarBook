import React, {useEffect} from 'react';
import {IRootState} from "app/shared/reducers";
import {connect} from "react-redux";
import {Translate} from "react-jhipster";
import {
  getEntities,
  setHideAddMeasureModal,
  setShowAddMeasureModal,
  getMeasureEntriesWithCurrentContainer
} from "app/modules/container/manage/manage.reducer";
import {getEntities as getMeasureTypes} from 'app/entities/measure-type/measure-type.reducer';
import {
  createEntity as createMeasureEntry,
  updateEntities as updateMeasureEntries,
  getEntities as getMeasureEntries
} from 'app/entities/measure-entry/measure-entry.reducer';
import './manage.scss';
import Container from "app/shared/layout/container/container";
import AddMeasureModal from "app/modules/measure-entry/add-modal";
import {IMeasureType} from "app/shared/model/measure-type.model";
import {IContainer} from "app/shared/model/container.model";
import {FillingEffect} from "app/shared/model/enumerations/filling-effect.model";
import {toDateString} from "app/shared/util/date-utils";

export interface IManageContainersProps extends StateProps, DispatchProps {}

export const ManageContainersPage = (props: IManageContainersProps) => {

  useEffect(() => {
    props.getEntities();
    props.getMeasureTypes();
    props.getMeasureEntries();
  }, []);

  useEffect(() => {
    props.containers.forEach(c => c.currentMeasures = []);
    props.measureEntries.filter(me => me.currentContainer).forEach(me => {
      const container = props.containers.find(c => c.id === me.currentContainer.id);
      if(container) {
        container.currentMeasures.push(me)
      }
    })

  }, [props.measureEntries])


  function addMeasureEntry(realizedAt: string, measureType: IMeasureType,
                           additionalInformation: string, container: IContainer, currentContainerId: number) {

    measureType = props.measureTypes.find(mt => mt.id === Number(measureType.id));
    const currentContainer = props.containers.find(c => c.id === Number(currentContainerId));
    const currentMeasures = currentContainer.currentMeasures;
    const parent = currentMeasures && currentMeasures.length > 0 ?
      currentMeasures.find(cm => cm.measureType.fillingEffect === FillingEffect.REFILL) : null;

    if(measureType.fillingEffect === FillingEffect.REFILL) {

      props.createMeasureEntry({
        createdAt: toDateString(new Date()),
        realizedAt,
        measureType,
        additionalInformation,
        container: currentContainer,
        currentContainer,
        parent
      });

    } else if (measureType.fillingEffect === FillingEffect.TRANSFILL) {

      const newContainer = props.containers.find(c => c.id === Number(container.id));

      props.createMeasureEntry({
        createdAt: toDateString(new Date()),
        realizedAt,
        measureType,
        additionalInformation,
        container: currentContainer,
        currentContainer: newContainer,
        parent
      });

      currentMeasures.forEach(measureEntryToTransfer => {
        measureEntryToTransfer.currentContainer = newContainer;
      });

      props.updateMeasureEntries(currentMeasures);

    } else if (measureType.fillingEffect === FillingEffect.BOTTLED) {

      props.createMeasureEntry({
        createdAt: toDateString(new Date()),
        realizedAt,
        measureType,
        additionalInformation,
        container: currentContainer,
        parent
      });


      currentMeasures.forEach(measureEntryToBottle => {
        measureEntryToBottle.currentContainer = null;
      });

      props.updateMeasureEntries(currentMeasures);

    } else { // NO EFFECT

      props.createMeasureEntry({
        createdAt: toDateString(new Date()),
        realizedAt,
        measureType,
        additionalInformation,
        container: currentContainer,
        currentContainer,
        parent
      });
    }

    props.setHideAddMeasureModal();
  }

  return (
    <>
      <h1><Translate contentKey="global.menu.manage-containers">Manage Containers</Translate></h1>
      {
        props.containers && props.containers.length > 0 ? (
          <div className="container-box-layout">
            {props.containers.map(c => <Container key={c.id}
                                                  containerName={c.name}
                                                  measures={c.currentMeasures}
                                                  setShowAddMeasureModal={ () => props.setShowAddMeasureModal(c.id) } />)}
          </div>
          ) : !props.loading && (
            <div className="alert alert-warning">
              <Translate contentKey="openCellarBookApp.container.home.notFound">No Containers found</Translate>
            </div>
          )
      }
      <AddMeasureModal showModal={ props.showAddMeasureModal }
                       handleAddMeasure={ addMeasureEntry }
                       currentContainerId={ props.currentContainerId }
                       handleClose={ props.setHideAddMeasureModal }
                       measureTypes={ props.measureTypes }
                       containers={ props.containers } />
    </>
  );

}

const mapStateToProps = ({ authentication, manageContainer, measureType, measureEntry }: IRootState) => ({
  containers: manageContainer.container,
  measureTypes: measureType.entities,
  measureEntries: measureEntry.entities,
  measureEntriesWithCurrentContainer: manageContainer.measureEntriesWithCurrentContainer,
  currentContainerId: manageContainer.currentContainerId,
  showAddMeasureModal: manageContainer.showAddMeasureModal,
  loading: manageContainer.loading,
  account: authentication.account,
  isAuthenticated: authentication.isAuthenticated,
});

const mapDispatchToProps = { getEntities, updateMeasureEntries, setShowAddMeasureModal, setHideAddMeasureModal,
  getMeasureTypes, createMeasureEntry, getMeasureEntriesWithCurrentContainer, getMeasureEntries };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ManageContainersPage);
