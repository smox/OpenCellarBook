import React from 'react';
import {FillingEffect} from "app/shared/model/enumerations/filling-effect.model";
import {IMeasureEntry} from "app/shared/model/measure-entry.model";
import ReportStyles from "app/shared/report/styles";
import {Document, Page, Text, View} from "@react-pdf/renderer";

export interface IReportProps {
  measureEntries: readonly IMeasureEntry[]
}

export const Report = ({ measureEntries }: IReportProps) => {

  const title = measureEntries  // TODO: extract to settings object
    .filter(me => me.measureType && me.measureType.fillingEffect === FillingEffect.BOTTLED)[0]
    .additionalInformation;

  const companyNumber = "1663157"; // TODO: extract to settings object

  let vintage: string[] = measureEntries
      .filter(me => me.measureType && me.measureType.fillingEffect === FillingEffect.REFILL)
      .map(me => me.realizedAt && me.realizedAt.substr(0, me.realizedAt.indexOf("-")));

  vintage = [ ...new Set(vintage) ].sort((a, b) => a.localeCompare(b)); // remove duplicate years

  const vintageString = vintage.join(', '); // build a String

  const bottledId = "789db84a-6f6c-43b3-9fac-dabad9fe3d83"; // TODO: Öffentlicher Abfüllcode hinzufügen

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={ReportStyles.page}>
        <View style={ReportStyles.section}>
          <View style={ReportStyles.table}>
            <Text style={ ReportStyles.title } fixed>{title}</Text>
            <View style={ReportStyles.tableRow}>
              <View style={ReportStyles.tableColDateHeader}>
                <Text style={ReportStyles.tableCellHeader}>Datum</Text>
              </View>
              <View style={ReportStyles.tableColAmountHeader}>
                <Text style={ReportStyles.tableCellHeader}>Weinmenge</Text>
              </View>
              <View style={ReportStyles.tableColContainerHeader}>
                <Text style={ReportStyles.tableCellHeader}>Behälterbezeichnung</Text>
              </View>
              <View style={ReportStyles.tableColMeasuresHeader}>
                <Text style={ReportStyles.tableCellHeader}>Maßnahmen</Text>
              </View>
            </View>
            {
              measureEntries.map((measureEntry, index) => (
                <View key={index} style={ReportStyles.tableRow}>
                  <View style={ReportStyles.tableColDate}>
                    <Text style={ReportStyles.tableCell}>{ measureEntry.realizedAt }</Text>
                  </View>
                  <View style={ReportStyles.tableColAmount}>
                    <Text style={ReportStyles.tableCell}>{ measureEntry.container.capacity } Liter</Text>
                  </View>
                  <View style={ReportStyles.tableColContainer}>
                    <Text style={ReportStyles.tableCell}>{ measureEntry.container.name }</Text>
                  </View>
                 <View style={ReportStyles.tableColMeasures}>
                    <Text style={ReportStyles.tableCell}>{ measureEntry.measureType.name } ({measureEntry.additionalInformation})</Text>
                  </View>
                </View>
              ))
            }
            <Text style={ReportStyles.pageNumber} render={({ pageNumber, totalPages }) => (
              `${pageNumber} / ${totalPages}`
            )} fixed />
            <Text style={ReportStyles.companyNumber} fixed>Betriebsnummer: { companyNumber }</Text>
            <Text style={ReportStyles.vintage} fixed>Jahrgang: { vintageString }</Text>
            <Text style={ReportStyles.bottlingNumber} fixed>Abfüllung: { bottledId }</Text>
          </View>
        </View>
      </Page>
    </Document>
  );

};

export default Report;
