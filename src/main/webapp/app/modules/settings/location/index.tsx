import React from 'react';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import SettingsLocationList from './list/list';
import SettingsLocationDetailModal from './detail/modal/modal';


const Routes = ({ match }) => (
  <div>
      <ErrorBoundaryRoute path={`${match.url}/location/add`} component={SettingsLocationDetailModal} />
      <ErrorBoundaryRoute path={`${match.url}/location/edit/:id`} component={SettingsLocationDetailModal} />
      <ErrorBoundaryRoute path={`${match.url}/location/`} component={SettingsLocationList} />
  </div>
);

export default Routes;
