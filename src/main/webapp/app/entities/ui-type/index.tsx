import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import UiType from './ui-type';
import UiTypeDetail from './ui-type-detail';
import UiTypeUpdate from './ui-type-update';
import UiTypeDeleteDialog from './ui-type-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={UiTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={UiTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={UiTypeDetail} />
      <ErrorBoundaryRoute path={match.url} component={UiType} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={UiTypeDeleteDialog} />
  </>
);

export default Routes;
