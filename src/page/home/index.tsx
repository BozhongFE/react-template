{{#if redux}}
import React, { useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getHomeDataRequest,
  setIsGettingHomeData,
} from 'src/store/action/home';

import { StoreState } from 'src/store/type';
{{else}}
import React from 'react';
{{/if}}

import Nav from 'src/components/nav';
import 'src/assets/css/home.css'

function Index() {
  {{#if redux}}
  const dispatch = useDispatch();
  const { isGettingHomeData, home } = useSelector(
    (state: StoreState) => state.home
  );
  const homeDataRef = useRef(home);

  const getHomeRequest = useCallback(() => {
    getHomeDataRequest(homeDataRef.current)(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  const setIsGettingHomeState = useCallback(
    (state: boolean) => dispatch(setIsGettingHomeData(state)),
    [dispatch]
  );

  useEffect(() => {
    isGettingHomeData && getHomeRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGettingHomeData]);
  useEffect(() => {
    homeDataRef.current = home;
  }, [home]);
  {{/if}}

  return (
    <div className='home'>
      <Nav />
      {{#if redux}}
      <div className='home__count'>
        <span>count: {home.count}</span>
        <button
          className='home__count--btn'
          onClick={() => setIsGettingHomeState(true)}>
          + 1
        </button>
      </div>
      {{/if}}
    </div>
  );
}

export default Index;
