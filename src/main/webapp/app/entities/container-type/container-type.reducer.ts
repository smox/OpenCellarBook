import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IContainerType, defaultValue } from 'app/shared/model/container-type.model';

export const ACTION_TYPES = {
  FETCH_CONTAINERTYPE_LIST: 'containerType/FETCH_CONTAINERTYPE_LIST',
  FETCH_CONTAINERTYPE: 'containerType/FETCH_CONTAINERTYPE',
  CREATE_CONTAINERTYPE: 'containerType/CREATE_CONTAINERTYPE',
  UPDATE_CONTAINERTYPE: 'containerType/UPDATE_CONTAINERTYPE',
  DELETE_CONTAINERTYPE: 'containerType/DELETE_CONTAINERTYPE',
  SET_BLOB: 'containerType/SET_BLOB',
  RESET: 'containerType/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IContainerType>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type ContainerTypeState = Readonly<typeof initialState>;

// Reducer

export default (state: ContainerTypeState = initialState, action): ContainerTypeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CONTAINERTYPE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CONTAINERTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_CONTAINERTYPE):
    case REQUEST(ACTION_TYPES.UPDATE_CONTAINERTYPE):
    case REQUEST(ACTION_TYPES.DELETE_CONTAINERTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_CONTAINERTYPE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CONTAINERTYPE):
    case FAILURE(ACTION_TYPES.CREATE_CONTAINERTYPE):
    case FAILURE(ACTION_TYPES.UPDATE_CONTAINERTYPE):
    case FAILURE(ACTION_TYPES.DELETE_CONTAINERTYPE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_CONTAINERTYPE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_CONTAINERTYPE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_CONTAINERTYPE):
    case SUCCESS(ACTION_TYPES.UPDATE_CONTAINERTYPE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_CONTAINERTYPE):
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
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/container-types';

// Actions

export const getEntities: ICrudGetAllAction<IContainerType> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CONTAINERTYPE_LIST,
  payload: axios.get<IContainerType>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IContainerType> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CONTAINERTYPE,
    payload: axios.get<IContainerType>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IContainerType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CONTAINERTYPE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IContainerType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CONTAINERTYPE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IContainerType> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CONTAINERTYPE,
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

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
