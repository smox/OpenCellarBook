import './footer.scss';

import React from 'react';
import { Col, Row } from 'reactstrap';

const Footer = () => (
  <div className="footer page-content">
    <Row>
      <Col sm="12" md="6">
        <div>Icons made by&nbsp;
          <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from&nbsp;
          <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
        </div>
      </Col>
    </Row>
  </div>
);

export default Footer;
