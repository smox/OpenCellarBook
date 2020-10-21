import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';
import {MailTo} from "app/shared/util/mail-utils";

export type IHomeProp = StateProps;

export const Home = (props: IHomeProp) => {
  const { account } = props;

  return (
    <Row>
      <Col md="9">
        <h2>
          <Translate contentKey="home.title">Welcome!</Translate>
        </h2>
        {account && account.login ? (
          <div>
            <Alert color="success">
              <Translate contentKey="home.logged.message" interpolate={{ username: account.login }}>
                You are logged in as user {account.login}.<br/>
              </Translate><br/>
              <Translate contentKey={"home.logged.add.measure"}/>
              <Link to={"/manage-containers"}><Translate contentKey={"global.menu.manage-containers"}>Manage Containers</Translate></Link>
            </Alert>
          </div>
        ) : (
          <div>
            <Alert color="warning">
              <Translate contentKey="global.messages.info.authenticated.prefix">To start your work please</Translate>
              <Link to="/login" className="alert-link">
                <Translate contentKey="global.messages.info.authenticated.link"> sign in</Translate>
              </Link>
              <br/>
              <Translate contentKey="global.messages.info.authenticated.suffix">You have received your account details by mail or by phone.</Translate>
            </Alert>
          </div>
        )}
        <div>
          <Alert color="info">
            <Translate contentKey="home.question">If you have any question, feel free to write an </Translate>
            <MailTo/>
          </Alert>
        </div>
      </Col>
    </Row>
  );
};

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Home);
