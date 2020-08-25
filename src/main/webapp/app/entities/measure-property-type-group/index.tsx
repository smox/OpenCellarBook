import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import MeasurePropertyTypeGroup from './measure-property-type-group';
import MeasurePropertyTypeGroupDetail from './measure-property-type-group-detail';
import MeasurePropertyTypeGroupUpdate from './measure-property-type-group-update';
import MeasurePropertyTypeGroupDeleteDialog from './measure-property-type-group-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MeasurePropertyTypeGroupUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MeasurePropertyTypeGroupUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MeasurePropertyTypeGroupDetail} />
      <ErrorBoundaryRoute path={match.url} component={MeasurePropertyTypeGroup} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={MeasurePropertyTypeGroupDeleteDialog} />
  </>
);

export default Routes;
