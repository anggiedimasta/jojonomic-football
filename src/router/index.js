import { createRouter, createWebHistory } from 'vue-router'
import FrontRouter from './front'

const DefaultRouter = [
	{
		path: '/:catchAll(.*)',
		redirect: '/',
	},
]

const routes = [...FrontRouter, ...DefaultRouter]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

router.beforeEach((to, _from, _next) => {
	document.title = 'JOJO | ' + to.name
})

export default router
