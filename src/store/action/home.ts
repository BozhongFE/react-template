import { GET_HOME_DATA, SET_IS_GETTING_HOME_DATA } from './type';
import { Dispatch } from 'react';
import { Home } from '../type';

export const getHomeDataRequest = (home: Home) => {
  return (dispatch: Dispatch<any>) => {
    dispatch(setIsGettingHomeData(false));
    dispatch({
      type: GET_HOME_DATA,
      payload: { home: { count: home.count + 1 } },
    });
  };
};

export const setIsGettingHomeData = (isGettingHomeData: boolean) => ({
  type: SET_IS_GETTING_HOME_DATA,
  payload: { isGettingHomeData },
});
