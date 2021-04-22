import React from 'react';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import SettingsLocation from './location';

const Routes = ({ match }) => (
  <div>
      <ErrorBoundaryRoute path={`${match.url}/`} component={SettingsLocation} />
  </div>
);

export default Routes;
