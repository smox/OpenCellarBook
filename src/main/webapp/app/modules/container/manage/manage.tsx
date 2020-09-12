import React, {useEffect} from 'react';
import {IRootState} from "app/shared/reducers";
import {connect} from "react-redux";
import {Translate} from "react-jhipster";
import {getEntities} from "app/modules/container/manage/manage.reducer";
import './manage.scss';
import Container from "app/shared/layout/container/container";
import container from "app/entities/container/container";

export interface IManageContainersProps extends StateProps, DispatchProps {}

export const ManageContainersPage = (props: IManageContainersProps) => {

  useEffect(() => {
    props.getEntities();
  }, []);

  return (
    <>
      <h1><Translate contentKey="global.menu.manage-containers">Manage Containers</Translate></h1>
      {
        props.containers && props.containers.length > 0 ? (
          <div className="container-box-layout">
            {props.containers.map(c => <Container key={c.id} containerName={c.name} measures={c.currentMeasures}/>)}
          </div>
          ) : !props.loading && (
            <div className="alert alert-warning">
              <Translate contentKey="openCellarBookApp.container.home.notFound">No Containers found</Translate>
            </div>
          )
      }
    </>
  );
}

const mapStateToProps = ({ authentication, manageContainers }: IRootState) => ({
  containers: manageContainers.container,
  loading: manageContainers.loading,
  account: authentication.account,
  isAuthenticated: authentication.isAuthenticated,
});

const mapDispatchToProps = { getEntities };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ManageContainersPage);
