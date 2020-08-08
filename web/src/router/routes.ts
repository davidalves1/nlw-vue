import { RouteConfig } from 'vue-router';
import Landing from '../views/Landing.vue';

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Landing',
    component: Landing,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

export default routes;
