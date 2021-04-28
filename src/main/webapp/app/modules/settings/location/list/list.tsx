import React, { useEffect } from 'react';
import { Translate, translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Button, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getEntities as getLocations, deleteEntity as deleteLocation } from 'app/entities/location/location.reducer';
import { Link } from 'react-router-dom';


export interface ISettingsLocationsListProp extends StateProps, DispatchProps {}



export const SettingsLocationsList = (props: ISettingsLocationsListProp) => {
  const { locations, loading } = props;

  useEffect(() => {
    props.getLocations();
  }, []);

  return (
      <>
        <h2 id="location-heading">
        <Translate contentKey="openCellarBookApp.location.home.title">Locations</Translate>
        <Button tag={Link} to={`/settings/location/add/` } color="primary" className="float-right" size="sm">
          <FontAwesomeIcon icon="plus" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="openCellarBookApp.location.home.createLabel">Create new Location</Translate>
          </span>
        </Button>
        </h2>
        <div className="table-responsive">
          {locations && locations.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="openCellarBookApp.location.orderNumber">Order Number</Translate>
                  </th>
                  <th>
                    <Translate contentKey="openCellarBookApp.location.name">Name</Translate>
                  </th>
                  <th className="text-right">
                    <Translate contentKey="openCellarBookApp.location.actions">Actions</Translate>
                  </th>
                </tr>
              </thead>
              <tbody>
                {locations.map((location, i) => (
                  <tr key={`entity-${i}`}>
                    <td>{location.orderNumber ? location.orderNumber : translate('global.messages.info.orderNumber.notFound') }</td>
                    <td>{location.name}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`/settings/location/edit/${location.id}`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`/settings/location/delete/${location.id}`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            !loading && (
              <div className="alert alert-warning">
                <Translate contentKey="openCellarBookApp.location.home.notFound">No Locations found</Translate>
              </div>
            )
          )}
        </div>
      </>
  );
};

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
  locations: storeState.location.entities,
  loading: storeState.location.loading
});

const mapDispatchToProps = {
  getLocations,
  deleteLocation
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps,mapDispatchToProps)(SettingsLocationsList);
