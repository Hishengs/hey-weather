import Vue from 'vue'
import VueRouter from 'vue-router'

import home from './page/home.vue'

Vue.use(VueRouter)

const router = new VueRouter({
	routes: [
		{
			name: 'home',
			path: '/',
			component: home
		}
	]
})

module.exports = router