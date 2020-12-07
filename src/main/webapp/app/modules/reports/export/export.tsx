import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {loadBottledMeasureEntries, createReport} from "app/modules/reports/export/export.reducer";
import {IRootState} from "app/shared/reducers";
import {Translate} from "react-jhipster";
import { Table, Button } from 'reactstrap';
import LoadingAnimation from "app/shared/layout/loadingAnimation/loadingAnimation";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Report from "app/shared/report/report";
import {PDFDownloadLink} from "@react-pdf/renderer";
import PlaceholderButton from "app/shared/button/placeholderButton/placeholderButton";


const ExportReports = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadBottledMeasureEntries());
  }, [])

  const loadingReports = useSelector((state:IRootState) => state.exportReports.loading);
  const allBottled = useSelector((state: IRootState) => state.exportReports.measureEntries);

  return (
    <div>
      <h1><Translate contentKey="global.menu.reports">Reports</Translate></h1>
      { allBottled && Object.keys(allBottled).length > 0 ? (
        <div className="table-responsive">
          <Table responsive>
            <thead>
            <tr>
              <th>
                <Translate contentKey="global.field.id">ID</Translate>
              </th>
              <th>
                <Translate contentKey="global.field.externalBottledId">Öffentlicher Abfüllcode</Translate>
              </th>
              <th>
                <Translate contentKey="openCellarBookApp.measureEntry.bottledType">Type of bottling</Translate>
              </th>
              <th>
                <Translate contentKey="openCellarBookApp.measureEntry.bottledAt">Bottled at</Translate>
              </th>
              <th>
                <Translate contentKey="openCellarBookApp.measureEntry.additionalInformation">
                  Additional Information</Translate>
              </th>
              <th>
                <Translate contentKey="openCellarBookApp.measureEntry.actions">Actions</Translate>
              </th>
            </tr>
            </thead>
            <tbody>
            {
              Object.keys(allBottled).map(measureEntryId => {
                const measureEntry = allBottled[measureEntryId].bottledMeasureEntry;
                return (
                  <tr key={ measureEntry.id }>
                    <td>{ measureEntry.id }</td>
                    <td>{ " " }</td>
                    <td>{ measureEntry.measureType.name }</td>
                    <td>{ measureEntry.realizedAt ? new Date(measureEntry.realizedAt).toLocaleDateString() : ''}</td>
                    <td>{ measureEntry.additionalInformation }</td>
                    <td>
                      {
                        allBottled[measureEntryId].loading ? (
                          <PlaceholderButton label={"Lade Bericht"}/>
                        ) : (
                          allBottled[measureEntryId].measureEntries && allBottled[measureEntryId].measureEntries.length > 0 ?
                            (
                              <PDFDownloadLink document={<Report measureEntries={allBottled[measureEntryId].measureEntries} />} fileName="report.pdf">
                                {({ blob, url, loading, error }) =>
                                  (loading ? <PlaceholderButton label={"Bericht wird erstellt!"}/> : <PlaceholderButton label={"Bericht herunterladen!"}/>)}
                              </PDFDownloadLink>
                            ) : (
                              <Button onClick={ () => dispatch(createReport(measureEntry.id)) } color="primary" size="sm">
                                <FontAwesomeIcon icon="pencil-alt"/>{' '}
                                <span className="d-none d-md-inline">
                                  <Translate contentKey="entity.action.createReport">Erzeuge Bericht</Translate>
                                </span>
                              </Button>
                            )
                        )
                      }
                    </td>
                  </tr>
                )
              })
            }
            </tbody>
          </Table>
        </div>
      ) : (
        !loadingReports ? (
          <div className="alert alert-warning">
            <Translate contentKey="openCellarBookApp.measureEntry.home.notFound">No Measure Entries found</Translate>
          </div>
        ) : (
          <LoadingAnimation message={"Einen kurzen Augenblick bitte! Die Abfüllungen werden gerade geladen"}/>
        )
      )
    }
    </div>
  )
}

export default ExportReports;
