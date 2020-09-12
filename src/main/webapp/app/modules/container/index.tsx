import React from 'react';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Manage from './manage/manage';

const Routes = ({ match }) => (
  <div>
    <ErrorBoundaryRoute path={`${match.url}/`} component={Manage} />
  </div>
);

export default Routes;
