import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import MeasurePropertyType from './measure-property-type';
import MeasurePropertyTypeDetail from './measure-property-type-detail';
import MeasurePropertyTypeUpdate from './measure-property-type-update';
import MeasurePropertyTypeDeleteDialog from './measure-property-type-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MeasurePropertyTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MeasurePropertyTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MeasurePropertyTypeDetail} />
      <ErrorBoundaryRoute path={match.url} component={MeasurePropertyType} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={MeasurePropertyTypeDeleteDialog} />
  </>
);

export default Routes;
