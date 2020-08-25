import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './measure-entry.reducer';
import { IMeasureEntry } from 'app/shared/model/measure-entry.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMeasureEntryDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MeasureEntryDetail = (props: IMeasureEntryDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { measureEntryEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="openCellarBookApp.measureEntry.detail.title">MeasureEntry</Translate> [<b>{measureEntryEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="realizedAt">
              <Translate contentKey="openCellarBookApp.measureEntry.realizedAt">Realized At</Translate>
            </span>
          </dt>
          <dd>
            {measureEntryEntity.realizedAt ? (
              <TextFormat value={measureEntryEntity.realizedAt} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="createdAt">
              <Translate contentKey="openCellarBookApp.measureEntry.createdAt">Created At</Translate>
            </span>
          </dt>
          <dd>
            {measureEntryEntity.createdAt ? (
              <TextFormat value={measureEntryEntity.createdAt} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="additionalInformation">
              <Translate contentKey="openCellarBookApp.measureEntry.additionalInformation">Additional Information</Translate>
            </span>
          </dt>
          <dd>{measureEntryEntity.additionalInformation}</dd>
          <dt>
            <span id="deletedAt">
              <Translate contentKey="openCellarBookApp.measureEntry.deletedAt">Deleted At</Translate>
            </span>
          </dt>
          <dd>
            {measureEntryEntity.deletedAt ? (
              <TextFormat value={measureEntryEntity.deletedAt} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="openCellarBookApp.measureEntry.container">Container</Translate>
          </dt>
          <dd>{measureEntryEntity.container ? measureEntryEntity.container.id : ''}</dd>
          <dt>
            <Translate contentKey="openCellarBookApp.measureEntry.currentContainer">Current Container</Translate>
          </dt>
          <dd>{measureEntryEntity.currentContainer ? measureEntryEntity.currentContainer.id : ''}</dd>
          <dt>
            <Translate contentKey="openCellarBookApp.measureEntry.measureType">Measure Type</Translate>
          </dt>
          <dd>{measureEntryEntity.measureType ? measureEntryEntity.measureType.id : ''}</dd>
          <dt>
            <Translate contentKey="openCellarBookApp.measureEntry.parent">Parent</Translate>
          </dt>
          <dd>{measureEntryEntity.parent ? measureEntryEntity.parent.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/measure-entry" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/measure-entry/${measureEntryEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ measureEntry }: IRootState) => ({
  measureEntryEntity: measureEntry.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MeasureEntryDetail);
