import React from 'react';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import SettingsContainerList from './list/list';
import SettingsContainerDetailModal from './detail/modal/modal';
import SettingsContainerDeleteModal from './delete/modal/modal';

const Routes = ({ match }) => (
  <div>
    <ErrorBoundaryRoute path={`${match.url}/add`} component={SettingsContainerDetailModal}/>
    <ErrorBoundaryRoute path={`${match.url}/edit/:id`} component={SettingsContainerDetailModal}/>
    <ErrorBoundaryRoute path={`${match.url}/delete/:id`} component={SettingsContainerDeleteModal}/>
    <ErrorBoundaryRoute path={`${match.url}/`} component={SettingsContainerList}/>
  </div>
);

export default Routes;
