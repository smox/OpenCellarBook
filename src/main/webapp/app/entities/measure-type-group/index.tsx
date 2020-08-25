import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import MeasureTypeGroup from './measure-type-group';
import MeasureTypeGroupDetail from './measure-type-group-detail';
import MeasureTypeGroupUpdate from './measure-type-group-update';
import MeasureTypeGroupDeleteDialog from './measure-type-group-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MeasureTypeGroupUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MeasureTypeGroupUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MeasureTypeGroupDetail} />
      <ErrorBoundaryRoute path={match.url} component={MeasureTypeGroup} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={MeasureTypeGroupDeleteDialog} />
  </>
);

export default Routes;
