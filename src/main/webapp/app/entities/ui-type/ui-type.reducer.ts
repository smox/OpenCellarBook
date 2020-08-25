import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IUiType, defaultValue } from 'app/shared/model/ui-type.model';

export const ACTION_TYPES = {
  FETCH_UITYPE_LIST: 'uiType/FETCH_UITYPE_LIST',
  FETCH_UITYPE: 'uiType/FETCH_UITYPE',
  CREATE_UITYPE: 'uiType/CREATE_UITYPE',
  UPDATE_UITYPE: 'uiType/UPDATE_UITYPE',
  DELETE_UITYPE: 'uiType/DELETE_UITYPE',
  RESET: 'uiType/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IUiType>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type UiTypeState = Readonly<typeof initialState>;

// Reducer

export default (state: UiTypeState = initialState, action): UiTypeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_UITYPE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_UITYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_UITYPE):
    case REQUEST(ACTION_TYPES.UPDATE_UITYPE):
    case REQUEST(ACTION_TYPES.DELETE_UITYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_UITYPE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_UITYPE):
    case FAILURE(ACTION_TYPES.CREATE_UITYPE):
    case FAILURE(ACTION_TYPES.UPDATE_UITYPE):
    case FAILURE(ACTION_TYPES.DELETE_UITYPE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_UITYPE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_UITYPE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_UITYPE):
    case SUCCESS(ACTION_TYPES.UPDATE_UITYPE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_UITYPE):
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

const apiUrl = 'api/ui-types';

// Actions

export const getEntities: ICrudGetAllAction<IUiType> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_UITYPE_LIST,
  payload: axios.get<IUiType>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IUiType> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_UITYPE,
    payload: axios.get<IUiType>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IUiType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_UITYPE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IUiType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_UITYPE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IUiType> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_UITYPE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
