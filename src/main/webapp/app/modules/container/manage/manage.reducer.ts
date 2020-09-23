import axios from 'axios';
import { ICrudGetAllAction, ICrudPutAction, IPayload } from 'react-jhipster';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IContainer } from 'app/shared/model/container.model';
import { IMeasureEntry } from 'app/shared/model/measure-entry.model';
import {
  createEntity as createMeasureEntry,
  updateEntity as updateMeasureEntry,
  updateEntities as updateMeasureEntries,
} from 'app/entities/measure-entry/measure-entry.reducer';

export const ACTION_TYPES = {
  FETCH_CONTAINER_LIST: 'manage-containers/FETCH_CONTAINER_LIST',
  FETCH_MEASURE_ENTRIES_WITH_CURRENT_CONTAINERS: 'manage-containers/FETCH_MEASURE_ENTRIES_WITH_CURRENT_CONTAINERS',
  ADD_MEASURE_ENTRY: 'manage-containers/ADD_MEASURE_ENTRY',
  ADD_REFILL_MEASURE_ENTRY: 'manage-containers/ADD_REFILL_MEASURE_ENTRY',
  ADD_TRANSFILL_MEASURE_ENTRY: 'manage-containers/ADD_TRANSFILL_MEASURE_ENTRY',
  ADD_BOTTLED_MEASURE_ENTRY: 'manage-containers/ADD_BOTTLED_MEASURE_ENTRY',
  TRANSFER_MEASURE_ENTRIES_TO_CONTAINER: 'TRANSFER_MEASURE_ENTRIES_TO_CONTAINER',
  SHOW_ADD_MEASURE_MODAL: 'manage-containers/SHOW_ADD_MEASURE_MODAL',
  HIDE_ADD_MEASURE_MODAL: 'manage-containers/HIDE_ADD_MEASURE_MODAL',
};

const initialState = {
  container: [] as IContainer[],
  measureEntriesWithCurrentContainer: [] as ReadonlyArray<IMeasureEntry>,
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
    case REQUEST(ACTION_TYPES.FETCH_MEASURE_ENTRIES_WITH_CURRENT_CONTAINERS):
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
    case SUCCESS(ACTION_TYPES.FETCH_MEASURE_ENTRIES_WITH_CURRENT_CONTAINERS):
      return {
        ...state,
        measureEntriesWithCurrentContainer: action.payload.data,
        loading: false,
        loadSuccess: true,
        loadFailure: false,
      };
    case FAILURE(ACTION_TYPES.FETCH_CONTAINER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MEASURE_ENTRIES_WITH_CURRENT_CONTAINERS):
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
const apiContainers = 'api/containers';
const apiMeasureEntries = 'api/measure-entries';

export const getEntities: ICrudGetAllAction<IContainer> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CONTAINER_LIST,
  payload: axios.get<IContainer>(`${apiContainers}?cacheBuster=${new Date().getTime()}`),
});

export const getMeasureEntriesWithCurrentContainer: ICrudGetAllAction<IMeasureEntry> = () => ({
  type: ACTION_TYPES.FETCH_MEASURE_ENTRIES_WITH_CURRENT_CONTAINERS,
  payload: axios.get<IMeasureEntry>(`${apiMeasureEntries}/with-current-container?cacheBuster=${new Date().getTime()}`),
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
