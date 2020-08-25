import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IMeasureTypeGroup, defaultValue } from 'app/shared/model/measure-type-group.model';

export const ACTION_TYPES = {
  FETCH_MEASURETYPEGROUP_LIST: 'measureTypeGroup/FETCH_MEASURETYPEGROUP_LIST',
  FETCH_MEASURETYPEGROUP: 'measureTypeGroup/FETCH_MEASURETYPEGROUP',
  CREATE_MEASURETYPEGROUP: 'measureTypeGroup/CREATE_MEASURETYPEGROUP',
  UPDATE_MEASURETYPEGROUP: 'measureTypeGroup/UPDATE_MEASURETYPEGROUP',
  DELETE_MEASURETYPEGROUP: 'measureTypeGroup/DELETE_MEASURETYPEGROUP',
  RESET: 'measureTypeGroup/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMeasureTypeGroup>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type MeasureTypeGroupState = Readonly<typeof initialState>;

// Reducer

export default (state: MeasureTypeGroupState = initialState, action): MeasureTypeGroupState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MEASURETYPEGROUP_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MEASURETYPEGROUP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_MEASURETYPEGROUP):
    case REQUEST(ACTION_TYPES.UPDATE_MEASURETYPEGROUP):
    case REQUEST(ACTION_TYPES.DELETE_MEASURETYPEGROUP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_MEASURETYPEGROUP_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MEASURETYPEGROUP):
    case FAILURE(ACTION_TYPES.CREATE_MEASURETYPEGROUP):
    case FAILURE(ACTION_TYPES.UPDATE_MEASURETYPEGROUP):
    case FAILURE(ACTION_TYPES.DELETE_MEASURETYPEGROUP):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_MEASURETYPEGROUP_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_MEASURETYPEGROUP):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_MEASURETYPEGROUP):
    case SUCCESS(ACTION_TYPES.UPDATE_MEASURETYPEGROUP):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_MEASURETYPEGROUP):
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

const apiUrl = 'api/measure-type-groups';

// Actions

export const getEntities: ICrudGetAllAction<IMeasureTypeGroup> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_MEASURETYPEGROUP_LIST,
  payload: axios.get<IMeasureTypeGroup>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IMeasureTypeGroup> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MEASURETYPEGROUP,
    payload: axios.get<IMeasureTypeGroup>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IMeasureTypeGroup> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MEASURETYPEGROUP,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IMeasureTypeGroup> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MEASURETYPEGROUP,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMeasureTypeGroup> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MEASURETYPEGROUP,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
