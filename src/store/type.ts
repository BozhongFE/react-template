export type Action = {
  type: string;
  payload: {
    [key: string]: any;
  };
};

export type StoreState = {
  home: HomeState;
};
export type Home = {
  count: number;
};
export type HomeState = {
  isGettingHomeData: boolean;
  home: Home;
};
export interface HomeAction extends Action {
  payload: {
    home: Home;
  };
}
