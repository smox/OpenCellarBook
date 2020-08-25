import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IMeasurePropertyType, defaultValue } from 'app/shared/model/measure-property-type.model';

export const ACTION_TYPES = {
  FETCH_MEASUREPROPERTYTYPE_LIST: 'measurePropertyType/FETCH_MEASUREPROPERTYTYPE_LIST',
  FETCH_MEASUREPROPERTYTYPE: 'measurePropertyType/FETCH_MEASUREPROPERTYTYPE',
  CREATE_MEASUREPROPERTYTYPE: 'measurePropertyType/CREATE_MEASUREPROPERTYTYPE',
  UPDATE_MEASUREPROPERTYTYPE: 'measurePropertyType/UPDATE_MEASUREPROPERTYTYPE',
  DELETE_MEASUREPROPERTYTYPE: 'measurePropertyType/DELETE_MEASUREPROPERTYTYPE',
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
    case REQUEST(ACTION_TYPES.FETCH_MEASUREPROPERTYTYPE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MEASUREPROPERTYTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_MEASUREPROPERTYTYPE):
    case REQUEST(ACTION_TYPES.UPDATE_MEASUREPROPERTYTYPE):
    case REQUEST(ACTION_TYPES.DELETE_MEASUREPROPERTYTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_MEASUREPROPERTYTYPE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MEASUREPROPERTYTYPE):
    case FAILURE(ACTION_TYPES.CREATE_MEASUREPROPERTYTYPE):
    case FAILURE(ACTION_TYPES.UPDATE_MEASUREPROPERTYTYPE):
    case FAILURE(ACTION_TYPES.DELETE_MEASUREPROPERTYTYPE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_MEASUREPROPERTYTYPE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_MEASUREPROPERTYTYPE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_MEASUREPROPERTYTYPE):
    case SUCCESS(ACTION_TYPES.UPDATE_MEASUREPROPERTYTYPE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_MEASUREPROPERTYTYPE):
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
  type: ACTION_TYPES.FETCH_MEASUREPROPERTYTYPE_LIST,
  payload: axios.get<IMeasurePropertyType>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IMeasurePropertyType> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MEASUREPROPERTYTYPE,
    payload: axios.get<IMeasurePropertyType>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IMeasurePropertyType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MEASUREPROPERTYTYPE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IMeasurePropertyType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MEASUREPROPERTYTYPE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMeasurePropertyType> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MEASUREPROPERTYTYPE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
