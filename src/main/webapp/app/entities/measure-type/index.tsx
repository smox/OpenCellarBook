import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import MeasureType from './measure-type';
import MeasureTypeDetail from './measure-type-detail';
import MeasureTypeUpdate from './measure-type-update';
import MeasureTypeDeleteDialog from './measure-type-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MeasureTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MeasureTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MeasureTypeDetail} />
      <ErrorBoundaryRoute path={match.url} component={MeasureType} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={MeasureTypeDeleteDialog} />
  </>
);

export default Routes;
