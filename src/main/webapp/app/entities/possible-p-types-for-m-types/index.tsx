import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PossiblePTypesForMTypes from './possible-p-types-for-m-types';
import PossiblePTypesForMTypesDetail from './possible-p-types-for-m-types-detail';
import PossiblePTypesForMTypesUpdate from './possible-p-types-for-m-types-update';
import PossiblePTypesForMTypesDeleteDialog from './possible-p-types-for-m-types-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PossiblePTypesForMTypesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PossiblePTypesForMTypesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PossiblePTypesForMTypesDetail} />
      <ErrorBoundaryRoute path={match.url} component={PossiblePTypesForMTypes} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PossiblePTypesForMTypesDeleteDialog} />
  </>
);

export default Routes;
