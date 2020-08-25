import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ContainerType from './container-type';
import ContainerTypeDetail from './container-type-detail';
import ContainerTypeUpdate from './container-type-update';
import ContainerTypeDeleteDialog from './container-type-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ContainerTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ContainerTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ContainerTypeDetail} />
      <ErrorBoundaryRoute path={match.url} component={ContainerType} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ContainerTypeDeleteDialog} />
  </>
);

export default Routes;
