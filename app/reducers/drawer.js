
import { OPEN_DRAWER, CLOSE_DRAWER, } from '../actions/drawer';

export const  State = {
    drawerState: '',
    drawerDisabled: false,
    themeState: '',
};

const initialState = {
  drawerState: 'closed',
  drawerDisabled: true,
  themeState: 'platform',
};

export default function (state = initialState, action){
  if (action.type === OPEN_DRAWER) {
    return {
      ...state,
      drawerState: 'opened',
    };
  }

  if (action.type === CLOSE_DRAWER) {
    return {
      ...state,
      drawerState: 'closed',
    };
  }
  return state;
}
