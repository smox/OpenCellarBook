import React from 'react';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import SettingsContainer from './container';
import SettingsLocation from './location';

const Routes = ({ match }) => (
  <div>
    <ErrorBoundaryRoute path={`${match.url}/container`} component={SettingsContainer}/>
    <ErrorBoundaryRoute path={`${match.url}/location`} component={SettingsLocation}/>
  </div>
);

export default Routes;
