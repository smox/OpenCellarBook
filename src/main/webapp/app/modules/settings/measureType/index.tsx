import React from 'react';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import SettingsMeasureList from './list/list';
import SettingsMeasureDetailModal from './detail/modal/modal';
import SettingsMeasureDeleteModal from './delete/modal/modal';

const Routes = ({ match }) => (
  <div>
    <ErrorBoundaryRoute path={`${match.url}/add`} component={SettingsMeasureDetailModal}/>
    <ErrorBoundaryRoute path={`${match.url}/edit/:id`} component={SettingsMeasureDetailModal}/>
    <ErrorBoundaryRoute path={`${match.url}/delete/:id`} component={SettingsMeasureDeleteModal}/>
    <ErrorBoundaryRoute path={`${match.url}/`} component={SettingsMeasureList}/>
  </div>
);


export default Routes;
