import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IMeasurePropertyTypeGroup, defaultValue } from 'app/shared/model/measure-property-type-group.model';

export const ACTION_TYPES = {
  FETCH_MEASUREPROPERTYTYPEGROUP_LIST: 'measurePropertyTypeGroup/FETCH_MEASUREPROPERTYTYPEGROUP_LIST',
  FETCH_MEASUREPROPERTYTYPEGROUP: 'measurePropertyTypeGroup/FETCH_MEASUREPROPERTYTYPEGROUP',
  CREATE_MEASUREPROPERTYTYPEGROUP: 'measurePropertyTypeGroup/CREATE_MEASUREPROPERTYTYPEGROUP',
  UPDATE_MEASUREPROPERTYTYPEGROUP: 'measurePropertyTypeGroup/UPDATE_MEASUREPROPERTYTYPEGROUP',
  DELETE_MEASUREPROPERTYTYPEGROUP: 'measurePropertyTypeGroup/DELETE_MEASUREPROPERTYTYPEGROUP',
  RESET: 'measurePropertyTypeGroup/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMeasurePropertyTypeGroup>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type MeasurePropertyTypeGroupState = Readonly<typeof initialState>;

// Reducer

export default (state: MeasurePropertyTypeGroupState = initialState, action): MeasurePropertyTypeGroupState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MEASUREPROPERTYTYPEGROUP_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MEASUREPROPERTYTYPEGROUP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_MEASUREPROPERTYTYPEGROUP):
    case REQUEST(ACTION_TYPES.UPDATE_MEASUREPROPERTYTYPEGROUP):
    case REQUEST(ACTION_TYPES.DELETE_MEASUREPROPERTYTYPEGROUP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_MEASUREPROPERTYTYPEGROUP_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MEASUREPROPERTYTYPEGROUP):
    case FAILURE(ACTION_TYPES.CREATE_MEASUREPROPERTYTYPEGROUP):
    case FAILURE(ACTION_TYPES.UPDATE_MEASUREPROPERTYTYPEGROUP):
    case FAILURE(ACTION_TYPES.DELETE_MEASUREPROPERTYTYPEGROUP):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_MEASUREPROPERTYTYPEGROUP_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_MEASUREPROPERTYTYPEGROUP):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_MEASUREPROPERTYTYPEGROUP):
    case SUCCESS(ACTION_TYPES.UPDATE_MEASUREPROPERTYTYPEGROUP):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_MEASUREPROPERTYTYPEGROUP):
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

const apiUrl = 'api/measure-property-type-groups';

// Actions

export const getEntities: ICrudGetAllAction<IMeasurePropertyTypeGroup> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_MEASUREPROPERTYTYPEGROUP_LIST,
  payload: axios.get<IMeasurePropertyTypeGroup>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IMeasurePropertyTypeGroup> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MEASUREPROPERTYTYPEGROUP,
    payload: axios.get<IMeasurePropertyTypeGroup>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IMeasurePropertyTypeGroup> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MEASUREPROPERTYTYPEGROUP,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IMeasurePropertyTypeGroup> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MEASUREPROPERTYTYPEGROUP,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMeasurePropertyTypeGroup> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MEASUREPROPERTYTYPEGROUP,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
