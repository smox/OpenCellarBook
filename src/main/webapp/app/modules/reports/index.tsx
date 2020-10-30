import React from 'react';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ExportReports from './export/export';

const Routes = ({ match }) => (
  <div>
    <ErrorBoundaryRoute path={`${match.url}/`} component={ExportReports} />
  </div>
);

export default Routes;
