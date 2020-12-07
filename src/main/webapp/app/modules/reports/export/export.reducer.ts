import {FAILURE, REQUEST, SUCCESS} from "app/shared/reducers/action-type.util";
import {ICrudGetAllAction} from "react-jhipster";
import {IMeasureEntry} from "app/shared/model/measure-entry.model";
import axios from "axios";
import {IContainer} from "app/shared/model/container.model";

export const ACTION_TYPES = {
  FETCH_BOTTLED_MEASURE_ENTRIES: 'REPORTS/EXPORT/FETCH_BOTTLED_MEASURE_ENTRIES',
  FETCH_MEASURE_ENTRIES: 'REPORTS/EXPORT/FETCH_MEASURE_ENTRIES'
};

const initialState = {
  measureEntries: {},
  loading: false,
  errorMessage: null,
  loadSuccess: false,
  loadFailure: false
};

interface IReportEntry {
  [id: string]: {
    bottledMeasureEntry: IMeasureEntry,
    measureEntries: readonly IMeasureEntry[],
    loading: boolean,
    errorMessage: string,
    loadSuccess: boolean,
    loadFailure: boolean
  }
}

export type ExportReportsState = {
  measureEntries: IReportEntry,
  loading: boolean,
  errorMessage: string,
  loadSuccess: boolean,
  loadFailure: boolean
}

function mapMeasureEntriesArrayToIndexSignature(data: IMeasureEntry[]) {
  const measureEntries: IReportEntry = {};
  data.forEach((bottledMeasureEntry:IMeasureEntry) => {
    measureEntries[bottledMeasureEntry.id] = {
      bottledMeasureEntry,
      measureEntries: [],
      loading: false,
      loadSuccess: false,
      loadFailure: false,
      errorMessage: null
    };
  });
  return measureEntries;
}

// Reducer
export default (state: ExportReportsState = initialState, action): ExportReportsState => {

  switch (action.type) {

    case REQUEST(ACTION_TYPES.FETCH_BOTTLED_MEASURE_ENTRIES):

      return {
        ...state,
        measureEntries: {},
        errorMessage: null,
        loading: true,
        loadSuccess: false,
        loadFailure: false,
      };

    case SUCCESS(ACTION_TYPES.FETCH_BOTTLED_MEASURE_ENTRIES):

      return {
        ...state,
        measureEntries: mapMeasureEntriesArrayToIndexSignature(action.payload.data),
        loading: false,
        loadSuccess: true,
        loadFailure: false,
      };

    case FAILURE(ACTION_TYPES.FETCH_BOTTLED_MEASURE_ENTRIES):

      return {
        ...state,
        loading: false,
        loadSuccess: false,
        loadFailure: true,
        errorMessage: action.payload,
      };

    case REQUEST(ACTION_TYPES.FETCH_MEASURE_ENTRIES):

      return {
        ...state,
        measureEntries: {
          ...state.measureEntries,
          [action.meta.id]: {
            ...state.measureEntries[action.meta.id],
            loading: true,
            loadSuccess: false,
            loadFailure: false,
            errorMessage: undefined
          }
        }
      }

    case SUCCESS(ACTION_TYPES.FETCH_MEASURE_ENTRIES):

      return {
        ...state,
        measureEntries: {
          ...state.measureEntries,
          [action.meta.id]: {
            ...state.measureEntries[action.meta.id],
            measureEntries: action.payload.data,
            loading: false,
            loadSuccess: true,
            loadFailure: false
          }
        }
      }

    case FAILURE(ACTION_TYPES.FETCH_MEASURE_ENTRIES):

      return {
        ...state,
        measureEntries: {
          ...state.measureEntries,
          [action.meta.id]: {
            ...state.measureEntries[action.meta.id],
            loading: false,
            loadSuccess: false,
            loadFailure: true,
            errorMessage: action.payload.data
          }
        }
      }

    default:
      return state;
  }
};

const apiMeasureEntries = 'api/measure-entries';

export const loadBottledMeasureEntries: ICrudGetAllAction<IMeasureEntry> = () => ({
  type: ACTION_TYPES.FETCH_BOTTLED_MEASURE_ENTRIES,
  payload: axios.get<IContainer>(`${apiMeasureEntries}/bottled?cacheBuster=${new Date().getTime()}`),
});

export const createReport: ICrudGetAllAction<IMeasureEntry> = (id: number) => ({
  type: ACTION_TYPES.FETCH_MEASURE_ENTRIES,
  payload: axios.get<IContainer>(`${apiMeasureEntries}/bottled/${id}?cacheBuster=${new Date().getTime()}`),
  meta: {
    id
  }
});

