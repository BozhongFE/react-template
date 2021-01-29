import React from 'react';

export type RouteMeta = {
  [key: string]: any;
};

export type RouteConfig = {
  path: string;
  name: string;
  component:
    | React.ComponentClass
    | (() => JSX.Element)
    | React.LazyExoticComponent<() => JSX.Element>;
  meta?: RouteMeta;
};
