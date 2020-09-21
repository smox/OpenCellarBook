import './container.scss';

import React from "react";
import { IMeasureEntry } from 'app/shared/model/measure-entry.model';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


export interface IContainerProps {
  containerName: string,
  measures: IMeasureEntry[],
  setShowAddMeasureModal
}

export const Container = ({ containerName, measures, setShowAddMeasureModal } : IContainerProps) => {

  return (
  <>
    <div className={ measures && measures.length > 0 ? "container container-full" : "container" }>
      <div className="container-content">
        <div className="container-content-header">
          <p className="container-content-header-title">{ containerName }</p>
        </div>
        <div className="container-content-body">
          <ul className="container-content-body-measure-list">
            { measures ? measures
              .sort((a, b) => {
                if(a.realizedAt) {
                  if(a.realizedAt === b.realizedAt) {
                    return String(a.id).localeCompare(String(b.id));
                  } else {
                    return a.realizedAt.localeCompare(b.realizedAt);
                  }
                }
                return String(a.id).localeCompare(String(b.id));
              })
              .map((measure, index) => {
                let measureName:string = measure.measureType ? measure.measureType.name : String(measure.id);
                measure.additionalInformation ? measureName += " ("+measure.additionalInformation+")" : "";

                if(measures.length > 8 && index === 2) {
                  return <li>...</li>
                }

                if(measures.length > 8 && index > 3 && index < measures.length - 5) {
                  return null;
                }

                return <li key={measure.id} title={measureName}>{measureName}</li>;
              }) : null
            }
          </ul>
        </div>
        <div className="container-content-footer">
          <button className="container-content-footer-add-measure-button btn btn-primary" onClick={ setShowAddMeasureModal }>
            <FontAwesomeIcon className="container-content-footer-add-measure-button-sign" icon="plus" />
          </button>
        </div>
      </div>
    </div>
  </>
  );
};

export default Container;
