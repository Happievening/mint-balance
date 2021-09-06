import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Labels from '@/views/Labels.vue';
import Money from '@/views/Money.vue';
import Statistics from '@/views/Statistics.vue';
import Home from '../views/Home.vue';
import NotFound from '../views/NotFound.vue';
import Edit from '../views/Edit.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
	{
		path: '/',
		name: '',
		component: Money,
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
		path: '/labels/edit/:tagname',
		name: 'Edit',
		component: Edit,
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
