require('babel-register')
import Vue from 'vue'
import { ToastPlugin, LoadingPlugin, ConfirmPlugin } from 'vux'
import FastClick from 'fastclick'
import router from './router.js'
import App from './app.vue'
import api from './api'
import situations from './situations.js'
import store from './store'

FastClick.attach(document.body)

api.install = function(Vue, options){ Vue.prototype.api = this }
Vue.use(api)

situations.install = function(Vue, options){ Vue.prototype.situations = this }
Vue.use(situations)

Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(ConfirmPlugin)

window.hwind = new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#mount-node')

