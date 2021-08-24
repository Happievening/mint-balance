import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Labels from '@/views/Labels.vue';
import Money from '@/views/Money.vue';
import Statistics from '@/views/Statistics.vue';
import Home from '../views/Home.vue';
import NotFound from '../views/NotFound.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
	{
		path: '/',
		name: '',
		component: Money,
	},
	{
		path: '/about',
		name: 'About',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "about" */ '../views/About.vue'),
	},
	{
		path: '/labels',
		name: 'Labels',
		component: Labels,
	},
	{
		path: '/statistics',
		name: 'Statistics',
		component: Statistics,
	},
	{
		path: '/money',
		name: 'Money',
		component: Money,
	},

	{
		path: '*',
		name: 'Code404',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: NotFound,
	},
];

const router = new VueRouter({
	routes,
});

export default router;
