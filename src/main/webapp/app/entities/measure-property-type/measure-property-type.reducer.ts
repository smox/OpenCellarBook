import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction, ICrudSearchAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IMeasurePropertyType, defaultValue } from 'app/shared/model/measure-property-type.model';

export const ACTION_TYPES = {
  FETCH_MEASURE_PROPERTY_TYPE_LIST: 'measurePropertyType/FETCH_MEASURE_PROPERTY_TYPE_LIST',
  FETCH_MEASURE_PROPERTY_TYPE_LIST_BY_MEASURE_TYPE: 'measurePropertyType/FETCH_MEASURE_PROPERTY_TYPE_LIST_BY_MEASURE_TYPE',
  FETCH_MEASURE_PROPERTY_TYPE: 'measurePropertyType/FETCH_MEASURE_PROPERTY_TYPE',
  CREATE_MEASURE_PROPERTY_TYPE: 'measurePropertyType/CREATE_MEASURE_PROPERTY_TYPE',
  UPDATE_MEASURE_PROPERTY_TYPE: 'measurePropertyType/UPDATE_MEASURE_PROPERTY_TYPE',
  DELETE_MEASURE_PROPERTY_TYPE: 'measurePropertyType/DELETE_MEASURE_PROPERTY_TYPE',
  RESET: 'measurePropertyType/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMeasurePropertyType>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type MeasurePropertyTypeState = Readonly<typeof initialState>;

// Reducer

export default (state: MeasurePropertyTypeState = initialState, action): MeasurePropertyTypeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MEASURE_PROPERTY_TYPE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MEASURE_PROPERTY_TYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_MEASURE_PROPERTY_TYPE):
    case REQUEST(ACTION_TYPES.UPDATE_MEASURE_PROPERTY_TYPE):
    case REQUEST(ACTION_TYPES.DELETE_MEASURE_PROPERTY_TYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_MEASURE_PROPERTY_TYPE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MEASURE_PROPERTY_TYPE):
    case FAILURE(ACTION_TYPES.CREATE_MEASURE_PROPERTY_TYPE):
    case FAILURE(ACTION_TYPES.UPDATE_MEASURE_PROPERTY_TYPE):
    case FAILURE(ACTION_TYPES.DELETE_MEASURE_PROPERTY_TYPE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_MEASURE_PROPERTY_TYPE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_MEASURE_PROPERTY_TYPE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_MEASURE_PROPERTY_TYPE):
    case SUCCESS(ACTION_TYPES.UPDATE_MEASURE_PROPERTY_TYPE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_MEASURE_PROPERTY_TYPE):
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

const apiUrl = 'api/measure-property-types';

// Actions

export const getEntities: ICrudGetAllAction<IMeasurePropertyType> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_MEASURE_PROPERTY_TYPE_LIST,
  payload: axios.get<IMeasurePropertyType>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntitiesByMeasureTypes: ICrudSearchAction<IMeasurePropertyType> = (search, page, size, sort) => ({
  type: ACTION_TYPES.FETCH_MEASURE_PROPERTY_TYPE_LIST,
  payload: axios.get<IMeasurePropertyType>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IMeasurePropertyType> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MEASURE_PROPERTY_TYPE,
    payload: axios.get<IMeasurePropertyType>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IMeasurePropertyType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MEASURE_PROPERTY_TYPE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IMeasurePropertyType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MEASURE_PROPERTY_TYPE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMeasurePropertyType> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MEASURE_PROPERTY_TYPE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
