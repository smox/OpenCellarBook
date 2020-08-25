import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IMeasurePropertyValue, defaultValue } from 'app/shared/model/measure-property-value.model';

export const ACTION_TYPES = {
  FETCH_MEASUREPROPERTYVALUE_LIST: 'measurePropertyValue/FETCH_MEASUREPROPERTYVALUE_LIST',
  FETCH_MEASUREPROPERTYVALUE: 'measurePropertyValue/FETCH_MEASUREPROPERTYVALUE',
  CREATE_MEASUREPROPERTYVALUE: 'measurePropertyValue/CREATE_MEASUREPROPERTYVALUE',
  UPDATE_MEASUREPROPERTYVALUE: 'measurePropertyValue/UPDATE_MEASUREPROPERTYVALUE',
  DELETE_MEASUREPROPERTYVALUE: 'measurePropertyValue/DELETE_MEASUREPROPERTYVALUE',
  RESET: 'measurePropertyValue/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMeasurePropertyValue>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type MeasurePropertyValueState = Readonly<typeof initialState>;

// Reducer

export default (state: MeasurePropertyValueState = initialState, action): MeasurePropertyValueState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MEASUREPROPERTYVALUE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MEASUREPROPERTYVALUE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_MEASUREPROPERTYVALUE):
    case REQUEST(ACTION_TYPES.UPDATE_MEASUREPROPERTYVALUE):
    case REQUEST(ACTION_TYPES.DELETE_MEASUREPROPERTYVALUE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_MEASUREPROPERTYVALUE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MEASUREPROPERTYVALUE):
    case FAILURE(ACTION_TYPES.CREATE_MEASUREPROPERTYVALUE):
    case FAILURE(ACTION_TYPES.UPDATE_MEASUREPROPERTYVALUE):
    case FAILURE(ACTION_TYPES.DELETE_MEASUREPROPERTYVALUE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_MEASUREPROPERTYVALUE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_MEASUREPROPERTYVALUE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_MEASUREPROPERTYVALUE):
    case SUCCESS(ACTION_TYPES.UPDATE_MEASUREPROPERTYVALUE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_MEASUREPROPERTYVALUE):
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

const apiUrl = 'api/measure-property-values';

// Actions

export const getEntities: ICrudGetAllAction<IMeasurePropertyValue> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_MEASUREPROPERTYVALUE_LIST,
  payload: axios.get<IMeasurePropertyValue>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IMeasurePropertyValue> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MEASUREPROPERTYVALUE,
    payload: axios.get<IMeasurePropertyValue>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IMeasurePropertyValue> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MEASUREPROPERTYVALUE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IMeasurePropertyValue> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MEASUREPROPERTYVALUE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMeasurePropertyValue> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MEASUREPROPERTYVALUE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
