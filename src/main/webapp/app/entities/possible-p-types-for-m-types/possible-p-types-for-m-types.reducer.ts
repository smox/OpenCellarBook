import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPossiblePTypesForMTypes, defaultValue } from 'app/shared/model/possible-p-types-for-m-types.model';

export const ACTION_TYPES = {
  FETCH_POSSIBLEPTYPESFORMTYPES_LIST: 'possiblePTypesForMTypes/FETCH_POSSIBLEPTYPESFORMTYPES_LIST',
  FETCH_POSSIBLEPTYPESFORMTYPES: 'possiblePTypesForMTypes/FETCH_POSSIBLEPTYPESFORMTYPES',
  CREATE_POSSIBLEPTYPESFORMTYPES: 'possiblePTypesForMTypes/CREATE_POSSIBLEPTYPESFORMTYPES',
  UPDATE_POSSIBLEPTYPESFORMTYPES: 'possiblePTypesForMTypes/UPDATE_POSSIBLEPTYPESFORMTYPES',
  DELETE_POSSIBLEPTYPESFORMTYPES: 'possiblePTypesForMTypes/DELETE_POSSIBLEPTYPESFORMTYPES',
  RESET: 'possiblePTypesForMTypes/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPossiblePTypesForMTypes>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type PossiblePTypesForMTypesState = Readonly<typeof initialState>;

// Reducer

export default (state: PossiblePTypesForMTypesState = initialState, action): PossiblePTypesForMTypesState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_POSSIBLEPTYPESFORMTYPES_LIST):
    case REQUEST(ACTION_TYPES.FETCH_POSSIBLEPTYPESFORMTYPES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_POSSIBLEPTYPESFORMTYPES):
    case REQUEST(ACTION_TYPES.UPDATE_POSSIBLEPTYPESFORMTYPES):
    case REQUEST(ACTION_TYPES.DELETE_POSSIBLEPTYPESFORMTYPES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_POSSIBLEPTYPESFORMTYPES_LIST):
    case FAILURE(ACTION_TYPES.FETCH_POSSIBLEPTYPESFORMTYPES):
    case FAILURE(ACTION_TYPES.CREATE_POSSIBLEPTYPESFORMTYPES):
    case FAILURE(ACTION_TYPES.UPDATE_POSSIBLEPTYPESFORMTYPES):
    case FAILURE(ACTION_TYPES.DELETE_POSSIBLEPTYPESFORMTYPES):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_POSSIBLEPTYPESFORMTYPES_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_POSSIBLEPTYPESFORMTYPES):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_POSSIBLEPTYPESFORMTYPES):
    case SUCCESS(ACTION_TYPES.UPDATE_POSSIBLEPTYPESFORMTYPES):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_POSSIBLEPTYPESFORMTYPES):
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

const apiUrl = 'api/possible-p-types-for-m-types';

// Actions

export const getEntities: ICrudGetAllAction<IPossiblePTypesForMTypes> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_POSSIBLEPTYPESFORMTYPES_LIST,
  payload: axios.get<IPossiblePTypesForMTypes>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IPossiblePTypesForMTypes> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_POSSIBLEPTYPESFORMTYPES,
    payload: axios.get<IPossiblePTypesForMTypes>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IPossiblePTypesForMTypes> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_POSSIBLEPTYPESFORMTYPES,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPossiblePTypesForMTypes> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_POSSIBLEPTYPESFORMTYPES,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPossiblePTypesForMTypes> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_POSSIBLEPTYPESFORMTYPES,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
