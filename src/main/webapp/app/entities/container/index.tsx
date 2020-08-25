import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Container from './container';
import ContainerDetail from './container-detail';
import ContainerUpdate from './container-update';
import ContainerDeleteDialog from './container-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ContainerUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ContainerUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ContainerDetail} />
      <ErrorBoundaryRoute path={match.url} component={Container} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ContainerDeleteDialog} />
  </>
);

export default Routes;
