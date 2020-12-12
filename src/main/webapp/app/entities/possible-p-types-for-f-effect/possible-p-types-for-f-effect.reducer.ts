import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPossiblePTypesForFEffect, defaultValue } from 'app/shared/model/possible-p-types-for-f-effect.model';

export const ACTION_TYPES = {
  FETCH_POSSIBLEPTYPESFORFEFFECT_LIST: 'possiblePTypesForFEffect/FETCH_POSSIBLEPTYPESFORFEFFECT_LIST',
  FETCH_POSSIBLEPTYPESFORFEFFECT: 'possiblePTypesForFEffect/FETCH_POSSIBLEPTYPESFORFEFFECT',
  CREATE_POSSIBLEPTYPESFORFEFFECT: 'possiblePTypesForFEffect/CREATE_POSSIBLEPTYPESFORFEFFECT',
  UPDATE_POSSIBLEPTYPESFORFEFFECT: 'possiblePTypesForFEffect/UPDATE_POSSIBLEPTYPESFORFEFFECT',
  DELETE_POSSIBLEPTYPESFORFEFFECT: 'possiblePTypesForFEffect/DELETE_POSSIBLEPTYPESFORFEFFECT',
  RESET: 'possiblePTypesForFEffect/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPossiblePTypesForFEffect>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type PossiblePTypesForFEffectState = Readonly<typeof initialState>;

// Reducer

export default (state: PossiblePTypesForFEffectState = initialState, action): PossiblePTypesForFEffectState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_POSSIBLEPTYPESFORFEFFECT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_POSSIBLEPTYPESFORFEFFECT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_POSSIBLEPTYPESFORFEFFECT):
    case REQUEST(ACTION_TYPES.UPDATE_POSSIBLEPTYPESFORFEFFECT):
    case REQUEST(ACTION_TYPES.DELETE_POSSIBLEPTYPESFORFEFFECT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_POSSIBLEPTYPESFORFEFFECT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_POSSIBLEPTYPESFORFEFFECT):
    case FAILURE(ACTION_TYPES.CREATE_POSSIBLEPTYPESFORFEFFECT):
    case FAILURE(ACTION_TYPES.UPDATE_POSSIBLEPTYPESFORFEFFECT):
    case FAILURE(ACTION_TYPES.DELETE_POSSIBLEPTYPESFORFEFFECT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_POSSIBLEPTYPESFORFEFFECT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_POSSIBLEPTYPESFORFEFFECT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_POSSIBLEPTYPESFORFEFFECT):
    case SUCCESS(ACTION_TYPES.UPDATE_POSSIBLEPTYPESFORFEFFECT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_POSSIBLEPTYPESFORFEFFECT):
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

const apiUrl = 'api/possible-p-types-for-f-effects';

// Actions

export const getEntities: ICrudGetAllAction<IPossiblePTypesForFEffect> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_POSSIBLEPTYPESFORFEFFECT_LIST,
  payload: axios.get<IPossiblePTypesForFEffect>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IPossiblePTypesForFEffect> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_POSSIBLEPTYPESFORFEFFECT,
    payload: axios.get<IPossiblePTypesForFEffect>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IPossiblePTypesForFEffect> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_POSSIBLEPTYPESFORFEFFECT,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPossiblePTypesForFEffect> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_POSSIBLEPTYPESFORFEFFECT,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPossiblePTypesForFEffect> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_POSSIBLEPTYPESFORFEFFECT,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
