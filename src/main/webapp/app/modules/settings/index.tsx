import React from 'react';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import SettingsContainer from './container';
import SettingsLocation from './location';
import SettingsMeasureType from './measureType';

const Routes = ({ match }) => (
  <div>
    <ErrorBoundaryRoute path={`${match.url}/container`} component={SettingsContainer}/>
    <ErrorBoundaryRoute path={`${match.url}/location`} component={SettingsLocation}/>
    <ErrorBoundaryRoute path={`${match.url}/measure-type`} component={SettingsMeasureType}/>
  </div>
);

export default Routes;
