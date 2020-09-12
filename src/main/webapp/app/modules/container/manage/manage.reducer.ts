import axios from 'axios';
import { ICrudGetAllAction } from 'react-jhipster';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IContainer } from 'app/shared/model/container.model';

export const ACTION_TYPES = {
  FETCH_CONTAINER_LIST: 'manage-containers/FETCH_CONTAINER_LIST',
};

const initialState = {
  container: [] as ReadonlyArray<IContainer>,
  loading: false,
  errorMessage: null,
  loadSuccess: false,
  loadFailure: false,
};

export type ManageContainerState = Readonly<typeof initialState>;

// Reducer
export default (state: ManageContainerState = initialState, action): ManageContainerState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CONTAINER_LIST):
      return {
        ...state,
        errorMessage: null,
        loading: true,
        loadSuccess: false,
        loadFailure: false,
      };
    case SUCCESS(ACTION_TYPES.FETCH_CONTAINER_LIST):
      return {
        ...state,
        container: action.payload.data,
        loading: false,
        loadSuccess: true,
        loadFailure: false,
      };
    case FAILURE(ACTION_TYPES.FETCH_CONTAINER_LIST):
      return {
        ...state,
        loading: false,
        loadSuccess: false,
        loadFailure: true,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

// Actions
const apiUrl = 'api/containers';

export const getEntities: ICrudGetAllAction<IContainer> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CONTAINER_LIST,
  payload: axios.get<IContainer>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});
