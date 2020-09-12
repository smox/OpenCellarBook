import './container.scss';

import React from "react";
import { IMeasureEntry } from 'app/shared/model/measure-entry.model';


export interface IContainerProps {
  containerName: string,
  measures: IMeasureEntry[]
}

export const Container = ({ containerName, measures }: IContainerProps) => {

  return (
    <div className="container">
      <div className="container-content">
        <div className="container-content-header">
          <p className="container-content-header-title">{ containerName }</p>
        </div>
        <div className="container-content-body">
          <ul className="container-content-body-measure-list">
            { measures.map((measure, index) => {
                let measureName:string = measure.measureType ? measure.measureType.name : String(measure.id);
                measure.additionalInformation ? measureName += " ("+measure.additionalInformation+")" : "";

                if(measures.length > 10 && index === 5) {
                  return <li>...</li>
                }

                return <li key={measure.id} title={measureName}>{measureName}</li>;
              })
            }
          </ul>
        </div>
        <div className="container-content-footer">
          <button className="container-content-footer-add-measure-button">+</button>
        </div>
      </div>
    </div>
  );

};

export default Container;
