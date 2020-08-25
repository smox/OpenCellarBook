import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import MeasurePropertyValue from './measure-property-value';
import MeasurePropertyValueDetail from './measure-property-value-detail';
import MeasurePropertyValueUpdate from './measure-property-value-update';
import MeasurePropertyValueDeleteDialog from './measure-property-value-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MeasurePropertyValueUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MeasurePropertyValueUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MeasurePropertyValueDetail} />
      <ErrorBoundaryRoute path={match.url} component={MeasurePropertyValue} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={MeasurePropertyValueDeleteDialog} />
  </>
);

export default Routes;
