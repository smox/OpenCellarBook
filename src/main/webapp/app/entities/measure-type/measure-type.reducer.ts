import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { getEntitiesByMeasureTypes as getPropertyTypesByMeasureTypes } from 'app/entities/measure-property-type/measure-property-type.reducer';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IMeasureType, defaultValue } from 'app/shared/model/measure-type.model';
import { ILocation } from 'app/shared/model/location.model';

export const ACTION_TYPES = {
  FETCH_MEASURETYPE_LIST: 'measureType/FETCH_MEASURETYPE_LIST',
  FETCH_MEASURETYPE: 'measureType/FETCH_MEASURETYPE',
  CREATE_MEASURETYPE: 'measureType/CREATE_MEASURETYPE',
  UPDATE_MEASURETYPE: 'measureType/UPDATE_MEASURETYPE',
  DELETE_MEASURETYPE: 'measureType/DELETE_MEASURETYPE',
  SET_MEASURE_TYPE: 'measureType/SET_MEASURE_TYPE',
  SET_BLOB: 'measureType/SET_BLOB',
  RESET: 'measureType/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMeasureType>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type MeasureTypeState = Readonly<typeof initialState>;

// Reducer

export default (state: MeasureTypeState = initialState, action): MeasureTypeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MEASURETYPE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MEASURETYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_MEASURETYPE):
    case REQUEST(ACTION_TYPES.UPDATE_MEASURETYPE):
    case REQUEST(ACTION_TYPES.DELETE_MEASURETYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_MEASURETYPE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MEASURETYPE):
    case FAILURE(ACTION_TYPES.CREATE_MEASURETYPE):
    case FAILURE(ACTION_TYPES.UPDATE_MEASURETYPE):
    case FAILURE(ACTION_TYPES.DELETE_MEASURETYPE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_MEASURETYPE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_MEASURETYPE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_MEASURETYPE):
    case SUCCESS(ACTION_TYPES.UPDATE_MEASURETYPE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_MEASURETYPE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.SET_BLOB: {
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType,
        },
      };
    }
    case ACTION_TYPES.SET_MEASURE_TYPE: {
      return {
        ...state,
        entity: action.payload,
      };
    }
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/measure-types';

// Actions

export const getEntities: ICrudGetAllAction<IMeasureType> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_MEASURETYPE_LIST,
  payload: axios.get<IMeasureType>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IMeasureType> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MEASURETYPE,
    payload: axios.get<IMeasureType>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IMeasureType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MEASURETYPE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IMeasureType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MEASURETYPE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMeasureType> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MEASURETYPE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType,
  },
});

export const setEntity = (location: ILocation) => ({
  type: ACTION_TYPES.SET_MEASURE_TYPE,
  payload: location,
});

export const getEntitiesWithPossiblePropertyTypes = () => async dispatch => {
  const entities = await getEntities();
  const propertytypes = await getPropertyTypesByMeasureTypes();
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
