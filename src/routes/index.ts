import React from 'react';
import { routes as homeRoutes } from './home';

const PageNotFoundComponent = React.lazy(() => import('src/page/404'));
const SitemapComponent = React.lazy(() => import('src/page/sitemap'));

export default [
  {
    path: '/404',
    name: '404',
    component: PageNotFoundComponent,
    meta: {},
  },
  {
    path: '/sitemap',
    name: 'sitemap',
    component: SitemapComponent,
    meta: {
      title: '站点地图'
    },
  },
  ...homeRoutes,
];
