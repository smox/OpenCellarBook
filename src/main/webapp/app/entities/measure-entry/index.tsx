import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import MeasureEntry from './measure-entry';
import MeasureEntryDetail from './measure-entry-detail';
import MeasureEntryUpdate from './measure-entry-update';
import MeasureEntryDeleteDialog from './measure-entry-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MeasureEntryUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MeasureEntryUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MeasureEntryDetail} />
      <ErrorBoundaryRoute path={match.url} component={MeasureEntry} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={MeasureEntryDeleteDialog} />
  </>
);

export default Routes;
