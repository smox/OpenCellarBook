import axios from 'axios';
import { ICrudGetAllAction } from 'react-jhipster';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IContainer } from 'app/shared/model/container.model';

export const ACTION_TYPES = {
  FETCH_CONTAINER_LIST: 'manage-containers/FETCH_CONTAINER_LIST',
  SHOW_ADD_MEASURE_MODAL: 'manage-containers/SHOW_ADD_MEASURE_MODAL',
  HIDE_ADD_MEASURE_MODAL: 'manage-containers/HIDE_ADD_MEASURE_MODAL',
};

const initialState = {
  container: [] as ReadonlyArray<IContainer>,
  showAddMeasureModal: false,
  currentContainerId: 0,
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
    case ACTION_TYPES.SHOW_ADD_MEASURE_MODAL:
      return {
        ...state,
        showAddMeasureModal: true,
        currentContainerId: action.payload.containerId,
      };
    case ACTION_TYPES.HIDE_ADD_MEASURE_MODAL:
      return {
        ...state,
        showAddMeasureModal: false,
        currentContainerId: 0,
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

export const setShowAddMeasureModal = (containerId: number) => ({
  type: ACTION_TYPES.SHOW_ADD_MEASURE_MODAL,
  payload: {
    containerId,
  },
});
export const setHideAddMeasureModal = () => ({
  type: ACTION_TYPES.HIDE_ADD_MEASURE_MODAL,
});
