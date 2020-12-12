import React from 'react';
import {translate, Translate} from 'react-jhipster';

import { NavItem, NavLink, NavbarBrand } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import appConfig from 'app/config/constants';
import {NavDropdown} from "app/shared/layout/menus/menu-components";
import MenuItem from "app/shared/layout/menus/menu-item";
import {faGlassWhiskey} from "@fortawesome/free-solid-svg-icons/faGlassWhiskey";
import {faClipboardCheck} from "@fortawesome/free-solid-svg-icons/faClipboardCheck";

export const BrandIcon = props => (
  <div {...props} className="brand-icon">
    <img src="content/images/logo-jhipster.png" alt="Logo" />
  </div>
);

export const Brand = props => (
  <NavbarBrand tag={Link} to="/" className="brand-logo">
    <BrandIcon />
    <span className="brand-title">
      <Translate contentKey="global.title">OpenCellarBook</Translate>
    </span>
    <span className="navbar-version">{appConfig.VERSION}</span>
  </NavbarBrand>
);

export const Home = props => (
  <NavItem>
    <NavLink tag={Link} to="/" className="d-flex align-items-center">
      <FontAwesomeIcon icon="home" />&nbsp;
      <span>
        <Translate contentKey="global.menu.home">Home</Translate>
      </span>
    </NavLink>
  </NavItem>
);

export const ManageContainers = props => (
  <NavItem>
    <NavLink tag={Link} to="/manage-containers" className="d-flex align-items-center">
      <FontAwesomeIcon icon="wine-glass-alt" />&nbsp;
      <span>
        <Translate contentKey="global.menu.manage-containers">Manage Containers</Translate>
      </span>
    </NavLink>
  </NavItem>
);

export const Reports = props => (
  <NavItem>
    <NavLink tag={Link} to="/reports" className="d-flex align-items-center">
      <FontAwesomeIcon icon="clipboard-check" />&nbsp;
      <span>
        <Translate contentKey="global.menu.bottled">Abfüllungen</Translate>
      </span>
    </NavLink>
  </NavItem>
);


export const Settings = props => (
  <NavDropdown
    icon="wrench"
    name={translate('global.menu.settings')}
    id="entity-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="glass-whiskey" to="/settings/containers">
      <Translate contentKey="global.menu.entities.container" />
    </MenuItem>
    <MenuItem icon="globe-europe" to="/settings/location">
      <Translate contentKey="global.menu.entities.location" />
    </MenuItem>
    <MenuItem icon="flask" to="/settings/measure-type">
      <Translate contentKey="global.menu.entities.measureType" />
    </MenuItem>
  </NavDropdown>
);
