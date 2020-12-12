import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PossiblePTypesForFEffect from './possible-p-types-for-f-effect';
import PossiblePTypesForFEffectDetail from './possible-p-types-for-f-effect-detail';
import PossiblePTypesForFEffectUpdate from './possible-p-types-for-f-effect-update';
import PossiblePTypesForFEffectDeleteDialog from './possible-p-types-for-f-effect-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PossiblePTypesForFEffectUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PossiblePTypesForFEffectUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PossiblePTypesForFEffectDetail} />
      <ErrorBoundaryRoute path={match.url} component={PossiblePTypesForFEffect} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PossiblePTypesForFEffectDeleteDialog} />
  </>
);

export default Routes;
