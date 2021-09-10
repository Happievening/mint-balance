import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Money from '@/views/Money.vue';
import Tags from '@/views/Tags/Tags.vue';
import Edit from '../views/Tags/Edit.vue';
import Statistics from '@/views/Statistics.vue';
import Details from '@/views/Details/Details.vue';
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
		path: '/tags',
		name: 'Tags',
		component: Tags,
	},
	{
		path: '/tags/edit/:tagname',
		name: 'Edit',
		component: Edit,
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
		path: '/details',
		name: 'Details',
		component: Details,
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
