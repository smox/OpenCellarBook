import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IMeasureEntry, defaultValue } from 'app/shared/model/measure-entry.model';

export const ACTION_TYPES = {
  FETCH_MEASUREENTRY_LIST: 'measureEntry/FETCH_MEASUREENTRY_LIST',
  FETCH_MEASUREENTRY: 'measureEntry/FETCH_MEASUREENTRY',
  CREATE_MEASUREENTRY: 'measureEntry/CREATE_MEASUREENTRY',
  UPDATE_MEASUREENTRY: 'measureEntry/UPDATE_MEASUREENTRY',
  DELETE_MEASUREENTRY: 'measureEntry/DELETE_MEASUREENTRY',
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
    case REQUEST(ACTION_TYPES.FETCH_MEASUREENTRY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MEASUREENTRY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_MEASUREENTRY):
    case REQUEST(ACTION_TYPES.UPDATE_MEASUREENTRY):
    case REQUEST(ACTION_TYPES.DELETE_MEASUREENTRY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_MEASUREENTRY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MEASUREENTRY):
    case FAILURE(ACTION_TYPES.CREATE_MEASUREENTRY):
    case FAILURE(ACTION_TYPES.UPDATE_MEASUREENTRY):
    case FAILURE(ACTION_TYPES.DELETE_MEASUREENTRY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_MEASUREENTRY_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_MEASUREENTRY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_MEASUREENTRY):
    case SUCCESS(ACTION_TYPES.UPDATE_MEASUREENTRY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_MEASUREENTRY):
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
  type: ACTION_TYPES.FETCH_MEASUREENTRY_LIST,
  payload: axios.get<IMeasureEntry>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IMeasureEntry> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MEASUREENTRY,
    payload: axios.get<IMeasureEntry>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IMeasureEntry> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MEASUREENTRY,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IMeasureEntry> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MEASUREENTRY,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMeasureEntry> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MEASUREENTRY,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
