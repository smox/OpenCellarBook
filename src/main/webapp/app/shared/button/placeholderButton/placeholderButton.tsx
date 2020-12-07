import React from "react";
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";




interface IPlaceholderButton {
  label: string
}

const PlaceholderButton = ({ label }: IPlaceholderButton) => (
  <Button onClick={ () => null } color="primary" size="sm">
    <FontAwesomeIcon icon="pencil-alt"/>{' '}
    <span className="d-none d-md-inline">{ label }</span>
  </Button>
);

export default PlaceholderButton;
