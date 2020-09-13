import axios from 'axios';
import { ICrudGetAllAction } from 'react-jhipster';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IContainer } from 'app/shared/model/container.model';

export const ACTION_TYPES = {
  SELECTED_MEASURE_TYPE: 'add-modal/SELECTED_MEASURE_TYPE',
};

const initialState = {
  selectedMeasureTypeId: 0,
};

export type AddMeasureEntryModalState = Readonly<typeof initialState>;

// Reducer
export default (state: AddMeasureEntryModalState = initialState, action): AddMeasureEntryModalState => {
  switch (action.type) {
    case ACTION_TYPES.SELECTED_MEASURE_TYPE:
      return {
        ...state,
        selectedMeasureTypeId: action.payload.selectedMeasureTypeId,
      };
    default:
      return state;
  }
};

export const setSelectedMeasureTypeId = (event, selectedMeasureTypeId) => ({
  type: ACTION_TYPES.SELECTED_MEASURE_TYPE,
  payload: {
    selectedMeasureTypeId,
  },
});
