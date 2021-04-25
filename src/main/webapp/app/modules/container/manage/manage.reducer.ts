import axios from 'axios';
import { ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IContainer } from 'app/shared/model/container.model';
import { IMeasureEntry } from 'app/shared/model/measure-entry.model';
import { cleanEntity } from 'app/shared/util/entity-utils';

export const ACTION_TYPES = {
  FETCH_CONTAINER_LIST: 'manage-containers/FETCH_CONTAINER_LIST',
  FETCH_MEASURE_ENTRY_LIST: 'measureEntry/FETCH_MEASUREENTRY_LIST',
  CREATE_MEASURE_ENTRY: 'measureEntry/CREATE_MEASURE_ENTRY',
  UPDATE_MEASURE_ENTRIES: 'measureEntry/UPDATE_MEASURE_ENTRIES',
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
  measureEntries: [] as ReadonlyArray<IMeasureEntry>,
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
    case REQUEST(ACTION_TYPES.FETCH_MEASURE_ENTRY_LIST):
    case REQUEST(ACTION_TYPES.CREATE_MEASURE_ENTRY):
    case REQUEST(ACTION_TYPES.UPDATE_MEASURE_ENTRIES):
      return {
        ...state,
        errorMessage: null,
        loading: true,
        loadSuccess: false,
        loadFailure: false,
      };

    case SUCCESS(ACTION_TYPES.FETCH_CONTAINER_LIST): {
      const containers = action.payload.data;
      containers.forEach(container => {
        container.currentMeasures = state.measureEntries.filter(
          measureEntry => measureEntry.currentContainer && container.id === measureEntry.currentContainer.id
        );
      });

      return {
        ...state,
        container: containers,
        loading: false,
        loadSuccess: true,
        loadFailure: false,
      };
    }

    case SUCCESS(ACTION_TYPES.FETCH_MEASURE_ENTRY_LIST):
      return {
        ...state,
        measureEntries: action.payload.data,
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

    case SUCCESS(ACTION_TYPES.CREATE_MEASURE_ENTRY):
    case SUCCESS(ACTION_TYPES.UPDATE_MEASURE_ENTRIES):
      return {
        ...state,
        loading: false,
        loadSuccess: true,
        loadFailure: false,
      };

    case FAILURE(ACTION_TYPES.FETCH_CONTAINER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MEASURE_ENTRY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MEASURE_ENTRIES_WITH_CURRENT_CONTAINERS):
    case FAILURE(ACTION_TYPES.CREATE_MEASURE_ENTRY):
    case FAILURE(ACTION_TYPES.UPDATE_MEASURE_ENTRIES):
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

export const hideAddMeasureModal = () => ({
  type: ACTION_TYPES.HIDE_ADD_MEASURE_MODAL,
});

export const getMeasureEntries: ICrudGetAllAction<IMeasureEntry> = () => ({
  type: ACTION_TYPES.FETCH_MEASURE_ENTRY_LIST,
  payload: axios.get<IMeasureEntry>(`${apiMeasureEntries}?cacheBuster=${new Date().getTime()}`),
});

export const getEntities: () => any = () => async dispatch => {
  const requestUrl = `${apiContainers}?cacheBuster=${new Date().getTime()}`;
  const measureEntryActionResult = await dispatch(getMeasureEntries());
  const containerActionResult = await dispatch({
    type: ACTION_TYPES.FETCH_CONTAINER_LIST,
    payload: axios.get<IContainer>(requestUrl),
  });

  return containerActionResult;
};

export const getMeasureEntriesWithCurrentContainer: ICrudGetAllAction<IMeasureEntry> = () => ({
  type: ACTION_TYPES.FETCH_MEASURE_ENTRIES_WITH_CURRENT_CONTAINERS,
  payload: axios.get<IMeasureEntry>(`${apiMeasureEntries}/with-current-container?cacheBuster=${new Date().getTime()}`),
});

export const showAddMeasureModal = (containerId: number) => ({
  type: ACTION_TYPES.SHOW_ADD_MEASURE_MODAL,
  payload: {
    containerId,
  },
});

export const createMeasureEntry: ICrudPutAction<IMeasureEntry> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MEASURE_ENTRY,
    payload: axios.post(apiMeasureEntries, cleanEntity(entity)),
  });
  dispatch(getEntities());
  dispatch(hideAddMeasureModal());
  return result;
};

export const createMeasureEntryOnly: ICrudPutAction<IMeasureEntry> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MEASURE_ENTRY,
    payload: axios.post(apiMeasureEntries, cleanEntity(entity)),
  });
  return result;
};

export const updateMeasureEntries: ICrudPutAction<IMeasureEntry[]> = entities => async dispatch => {
  entities.forEach(entity => cleanEntity(entity));
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MEASURE_ENTRIES,
    payload: axios.put(apiMeasureEntries + '/list', entities),
  });
  dispatch(getEntities());
  dispatch(hideAddMeasureModal());
  return result;
};
