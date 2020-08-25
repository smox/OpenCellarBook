import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './ui-type.reducer';
import { IUiType } from 'app/shared/model/ui-type.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUiTypeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const UiTypeDetail = (props: IUiTypeDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { uiTypeEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="openCellarBookApp.uiType.detail.title">UiType</Translate> [<b>{uiTypeEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="openCellarBookApp.uiType.name">Name</Translate>
            </span>
          </dt>
          <dd>{uiTypeEntity.name}</dd>
          <dt>
            <span id="element">
              <Translate contentKey="openCellarBookApp.uiType.element">Element</Translate>
            </span>
          </dt>
          <dd>{uiTypeEntity.element}</dd>
          <dt>
            <span id="expression">
              <Translate contentKey="openCellarBookApp.uiType.expression">Expression</Translate>
            </span>
          </dt>
          <dd>{uiTypeEntity.expression}</dd>
        </dl>
        <Button tag={Link} to="/ui-type" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/ui-type/${uiTypeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ uiType }: IRootState) => ({
  uiTypeEntity: uiType.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UiTypeDetail);
