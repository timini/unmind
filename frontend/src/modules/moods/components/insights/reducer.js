import update from 'react-addons-update';
import {
  INIT,
  LOAD_CHECKINS_SUCCESS,
  LOAD_CHECKINS_FAILURE,
  TOGGLE,
} from './actions';

export const initialState = {
  ui: {
    loading: true,
    expanded: {},
  },
  data: {
    checkins: [],
  },
};

export const reducer = (state = initialState, action = {}) => {
  const { type, payload, meta } = action;
  switch (type) {
    case INIT:
      return update(state, { ui: { loading: { $set: true } } });
    case LOAD_CHECKINS_SUCCESS:
      const { body = [] } = payload;
      const expanded = body.reduce((acc, obj) => {
        acc[obj.id] = false;
        return acc;
      }, {});
      return update(state, {
        ui: {
          loading: { $set: false },
          expanded: { $set: expanded },
        },
        data: { checkins: { $set: body } },
      });
    case LOAD_CHECKINS_FAILURE:
      return update(state, { ui: { loading: { $set: false } } });
    case TOGGLE:
      const { id } = payload;
      return update(state, {
        ui: {
          expanded: {
            $set: {
              ...state.ui.expanded,
              [id]: !state.ui.expanded[id],
            },
          },
        },
      });
    default:
      return state;
  }
};

export default reducer;
