import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Container from './container';
import Location from './location';
import ContainerType from './container-type';
import MeasureType from './measure-type';
import MeasurePropertyType from './measure-property-type';
import MeasurePropertyValue from './measure-property-value';
import UiType from './ui-type';
import MeasureEntry from './measure-entry';
import MeasurePropertyTypeGroup from './measure-property-type-group';
import MeasureTypeGroup from './measure-type-group';
import PossiblePTypesForMTypes from './possible-p-types-for-m-types';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}container`} component={Container} />
      <ErrorBoundaryRoute path={`${match.url}location`} component={Location} />
      <ErrorBoundaryRoute path={`${match.url}container-type`} component={ContainerType} />
      <ErrorBoundaryRoute path={`${match.url}measure-type`} component={MeasureType} />
      <ErrorBoundaryRoute path={`${match.url}measure-property-type`} component={MeasurePropertyType} />
      <ErrorBoundaryRoute path={`${match.url}measure-property-value`} component={MeasurePropertyValue} />
      <ErrorBoundaryRoute path={`${match.url}ui-type`} component={UiType} />
      <ErrorBoundaryRoute path={`${match.url}measure-entry`} component={MeasureEntry} />
      <ErrorBoundaryRoute path={`${match.url}measure-property-type-group`} component={MeasurePropertyTypeGroup} />
      <ErrorBoundaryRoute path={`${match.url}measure-type-group`} component={MeasureTypeGroup} />
      <ErrorBoundaryRoute path={`${match.url}possible-p-types-for-m-types`} component={PossiblePTypesForMTypes} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
