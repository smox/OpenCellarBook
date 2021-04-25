import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IMeasureEntry, defaultValue } from 'app/shared/model/measure-entry.model';

export const ACTION_TYPES = {
  FETCH_MEASURE_ENTRY_LIST: 'measureEntry/FETCH_MEASURE_ENTRY_LIST',
  FETCH_MEASURE_ENTRY: 'measureEntry/FETCH_MEASURE_ENTRY',
  CREATE_MEASURE_ENTRY: 'measureEntry/CREATE_MEASURE_ENTRY',
  UPDATE_MEASURE_ENTRY: 'measureEntry/UPDATE_MEASURE_ENTRY',
  UPDATE_MEASURE_ENTRIES: 'measureEntry/UPDATE_MEASURE_ENTRIES',
  DELETE_MEASURE_ENTRY: 'measureEntry/DELETE_MEASURE_ENTRY',
  RESET: 'measureEntry/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMeasureEntry>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type MeasureEntryState = Readonly<typeof initialState>;

// Reducer

export default (state: MeasureEntryState = initialState, action): MeasureEntryState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MEASURE_ENTRY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MEASURE_ENTRY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_MEASURE_ENTRY):
    case REQUEST(ACTION_TYPES.UPDATE_MEASURE_ENTRY):
    case REQUEST(ACTION_TYPES.UPDATE_MEASURE_ENTRIES):
    case REQUEST(ACTION_TYPES.DELETE_MEASURE_ENTRY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_MEASURE_ENTRY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MEASURE_ENTRY):
    case FAILURE(ACTION_TYPES.CREATE_MEASURE_ENTRY):
    case FAILURE(ACTION_TYPES.UPDATE_MEASURE_ENTRY):
    case FAILURE(ACTION_TYPES.UPDATE_MEASURE_ENTRIES):
    case FAILURE(ACTION_TYPES.DELETE_MEASURE_ENTRY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_MEASURE_ENTRY_LIST):
    case SUCCESS(ACTION_TYPES.UPDATE_MEASURE_ENTRIES):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_MEASURE_ENTRY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_MEASURE_ENTRY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
        entities: [...state.entities, action.payload.data],
      };
    case SUCCESS(ACTION_TYPES.UPDATE_MEASURE_ENTRY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_MEASURE_ENTRY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/measure-entries';

// Actions
export const getEntities: ICrudGetAllAction<IMeasureEntry> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_MEASURE_ENTRY_LIST,
  payload: axios.get<IMeasureEntry>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

// Actions
export const getEntitiesWithCurrentContainerAssigned: ICrudGetAllAction<IMeasureEntry> = () => ({
  type: ACTION_TYPES.FETCH_MEASURE_ENTRY_LIST,
  payload: axios.get<IMeasureEntry>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IMeasureEntry> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MEASURE_ENTRY,
    payload: axios.get<IMeasureEntry>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IMeasureEntry> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MEASURE_ENTRY,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const updateEntity: ICrudPutAction<IMeasureEntry> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MEASURE_ENTRY,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const updateEntities: ICrudPutAction<IMeasureEntry[]> = entities => async dispatch => {
  entities.forEach(entity => cleanEntity(entity));
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MEASURE_ENTRIES,
    payload: axios.put(apiUrl + '/list', entities),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMeasureEntry> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MEASURE_ENTRY,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
