import update from 'react-addons-update';
import { SAVE_FIELD, PREVIOUS_PAGE, NEXT_PAGE } from './actions';

export const initialState = {
  ui: {
    page: 1,
  },
  data: {
    mood: undefined,
    feeling: undefined,
    comment: undefined,
  },
};

export const reducer = (state = initialState, action = {}) => {
  const { type, payload, meta } = action;
  switch (type) {
    case SAVE_FIELD:
      const { fieldName, value } = payload;
      return update(state, {
        data: { [fieldName]: { $set: value } },
      });
    case NEXT_PAGE:
      return update(state, { ui: { page: { $set: state.ui.page + 1 } } });
    case PREVIOUS_PAGE:
      return update(state, { ui: { $set: { page: state.ui.page - 1 } } });
    default:
      return state;
  }
};

export default reducer;
