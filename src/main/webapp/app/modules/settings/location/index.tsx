import React from 'react';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import SettingsLocationList from './list/list';
import SettingsLocationDetailModal from './detail/modal/modal';
import SettingsLocationDeleteModal from './delete/modal/modal';

const Routes = ({ match }) => (
  <div>
    <ErrorBoundaryRoute path={`${match.url}/add`} component={SettingsLocationDetailModal}/>
    <ErrorBoundaryRoute path={`${match.url}/edit/:id`} component={SettingsLocationDetailModal}/>
    <ErrorBoundaryRoute path={`${match.url}/delete/:id`} component={SettingsLocationDeleteModal}/>
    <ErrorBoundaryRoute path={`${match.url}/`} component={SettingsLocationList}/>
  </div>
);


export default Routes;
