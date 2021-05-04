import React, { useEffect } from 'react';
import { Translate, translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Button, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  getEntities as getMeasureTypes,
  deleteEntity as deleteMeasureType } from 'app/entities/measure-type/measure-type.reducer';

import {
  getEntities as getPossiblePTypesForMTypes
} from 'app/entities/possible-p-types-for-m-types/possible-p-types-for-m-types.reducer';

import { Link } from 'react-router-dom';
import {IPossiblePTypesForMTypes} from "app/shared/model/possible-p-types-for-m-types.model";

export interface ISettingsMeasureTypesListProp extends StateProps, DispatchProps {}


export const SettingsMeasureTypesList = (props: ISettingsMeasureTypesListProp) => {
  const { measureTypes, loading, possiblePTypesForMTypes } = props;

  useEffect(() => {
    props.getMeasureTypes();
    props.getPossiblePTypesForMTypes();
  }, []);

  return (
      <>
        <h2 id="measureType-heading">
        <Translate contentKey="openCellarBookApp.measureType.home.title">MeasureTypes</Translate>
        <Button tag={Link} to={`/settings/measure-type/add/` } color="primary" className="float-right" size="sm">
          <FontAwesomeIcon icon="plus" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="openCellarBookApp.measureType.home.createLabel">Create new MeasureType</Translate>
          </span>
        </Button>
        </h2>
        <div className="table-responsive">
          { measureTypes && measureTypes.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="openCellarBookApp.measureType.orderNumber">Order Number</Translate>
                  </th>
                  <th>
                    <Translate contentKey="openCellarBookApp.measureType.name">Name</Translate>
                  </th>
                  <th>
                    <Translate contentKey="openCellarBookApp.measureType.fillingEffect">FillingEffect</Translate>
                  </th>
                  <th>
                    <Translate contentKey="openCellarBookApp.measureType.possiblePTypesForMTypes">PossiblePTypesForMTypes</Translate>
                  </th>
                  <th className="text-right">
                    <Translate contentKey="openCellarBookApp.measureType.actions">Actions</Translate>
                  </th>
                </tr>
              </thead>
              <tbody>
              { measureTypes.map((measureType, i) => (
                <tr key={`entity-${i}`}>
                  <td>{ measureType.orderNumber ? measureType.orderNumber : translate('global.messages.info.orderNumber.notFound') }</td>
                  <td>{ measureType.name }</td>
                  <td>{ translate(`openCellarBookApp.FillingEffect.${measureType.fillingEffect}`) }</td>
                  <td>{ possiblePTypesForMTypes
                    .filter((pptfmt: IPossiblePTypesForMTypes) => pptfmt.measureType?.id === measureType.id)
                    .map((pptfmt: IPossiblePTypesForMTypes) => pptfmt.measurePropertyType.type )
                    .join(', ')
                  }</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/settings/measure-type/edit/${measureType.id}`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/settings/measure-type/delete/${measureType.id}`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              )) }
              </tbody>
            </Table>
          ) : (
            !loading && (
              <div className="alert alert-warning">
                <Translate contentKey="openCellarBookApp.measureType.home.notFound">No MeasureTypes found</Translate>
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
  measureTypes: storeState.measureType.entities,
  possiblePTypesForMTypes: storeState.possiblePTypesForMTypes.entities,
  loading: storeState.measureType.loading
});

const mapDispatchToProps = {
  getMeasureTypes,
  getPossiblePTypesForMTypes,
  deleteMeasureType
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps,mapDispatchToProps)(SettingsMeasureTypesList);
