import createReducer from './create-reducer';

import { GET_HOME_DATA, SET_IS_GETTING_HOME_DATA } from '../action/type';
import { HomeState, HomeAction } from '../type';

const initState: HomeState = {
  isGettingHomeData: true,
  home: {
    count: 0,
  },
};

export default createReducer<HomeState, HomeAction>(
  [GET_HOME_DATA, SET_IS_GETTING_HOME_DATA],
  initState
);
