import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/container">
      <Translate contentKey="global.menu.entities.container" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/location">
      <Translate contentKey="global.menu.entities.location" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/container-type">
      <Translate contentKey="global.menu.entities.containerType" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/measure-type">
      <Translate contentKey="global.menu.entities.measureType" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/measure-property-type">
      <Translate contentKey="global.menu.entities.measurePropertyType" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/measure-property-value">
      <Translate contentKey="global.menu.entities.measurePropertyValue" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/ui-type">
      <Translate contentKey="global.menu.entities.uiType" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/measure-entry">
      <Translate contentKey="global.menu.entities.measureEntry" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/measure-property-type-group">
      <Translate contentKey="global.menu.entities.measurePropertyTypeGroup" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/measure-type-group">
      <Translate contentKey="global.menu.entities.measureTypeGroup" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/possible-p-types-for-m-types">
      <Translate contentKey="global.menu.entities.possiblePTypesForMTypes" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
