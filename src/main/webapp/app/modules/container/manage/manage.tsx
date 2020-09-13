import React, {useEffect} from 'react';
import {IRootState} from "app/shared/reducers";
import {connect} from "react-redux";
import {Translate} from "react-jhipster";
import {getEntities, setHideAddMeasureModal, setShowAddMeasureModal} from "app/modules/container/manage/manage.reducer";
import { getEntities as getMeasureTypes } from 'app/entities/measure-type/measure-type.reducer';
import { getEntities as getContainers } from 'app/entities/container/container.reducer';
import './manage.scss';
import Container from "app/shared/layout/container/container";
import AddMeasureModal from "app/modules/measure-entry/add-modal";
import {IMeasureType} from "app/shared/model/measure-type.model";
import {IContainer} from "app/shared/model/container.model";

export interface IManageContainersProps extends StateProps, DispatchProps {}

export const ManageContainersPage = (props: IManageContainersProps) => {

  useEffect(() => {
    props.getEntities();
    props.getMeasureTypes();
    props.getContainers();
  }, []);


  function printProperties(realizedAt: Date, measureType: IMeasureType, additionalInformation: string, container: IContainer) {
    console.log("realizedAt: "+realizedAt);
    console.log("IMeasureType: "+measureType.id);
    console.log("AdditionalInformation: "+additionalInformation);
    console.log(container ? "IContainer: "+container.id : "Kein Tank ausgewählt");
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
                       handleAddMeasure={ printProperties }
                       currentContainerId={ props.currentContainerId }
                       handleClose={ props.setHideAddMeasureModal }
                       measureTypes={ props.measureTypes }
                       containers={ props.containers } />
    </>
  );

}

const mapStateToProps = ({ authentication, manageContainer, measureType }: IRootState) => ({
  containers: manageContainer.container,
  measureTypes: measureType.entities,
  currentContainerId: manageContainer.currentContainerId,
  showAddMeasureModal: manageContainer.showAddMeasureModal,
  loading: manageContainer.loading,
  account: authentication.account,
  isAuthenticated: authentication.isAuthenticated,
});

const mapDispatchToProps = { getEntities, setShowAddMeasureModal, setHideAddMeasureModal, getMeasureTypes, getContainers };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ManageContainersPage);
