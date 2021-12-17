import { createRouter, createWebHistory } from 'vue-router'

const routes = [
	{
		path: '/areas',
		name: 'Areas',
		component: () =>
			import(/* webpackChunkName: "areas" */ '@/views/Areas.vue'),
	},
	{
		path: '/areas/:id',
		name: 'Teams',
		component: () =>
			import(/* webpackChunkName: "teams" */ '@/views/Teams.vue'),
		meta: {
			hide: true,
		},
	},
	{
		path: '/teams/:id',
		name: 'Team',
		component: () =>
			import(/* webpackChunkName: "team" */ '@/views/Team.vue'),
		meta: {
			hide: true,
		},
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

router.beforeEach((to, _from, next) => {
	document.title = 'JOJO | ' + to.name
	next()
})

export default router
