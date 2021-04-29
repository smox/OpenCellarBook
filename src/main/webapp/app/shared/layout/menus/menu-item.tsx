import React from 'react';
import { DropdownItem } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface IMenuItem {
  icon?: IconProp;
  to: string;
  id?: string;
  smashIcon?: {
    name: string;
  }
}

export default class MenuItem extends React.Component<IMenuItem> {
  render() {
    const { to, icon, id, children, smashIcon } = this.props;

    return (
      <DropdownItem tag={Link} to={to} id={id}>
        { smashIcon ? <img style={ { height: "20px", width:"20px", filter: "invert(1)", marginRight: "2px" } } src={ `/content/images/${smashIcon.name}` } /> : null }
        { icon ? <FontAwesomeIcon icon={icon} fixedWidth /> : null }
        { children }
        &nbsp; &nbsp;
      </DropdownItem>
    );
  }
}
