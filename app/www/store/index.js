import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
// import modules from './modules';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		cityList: [/*'北京','上海','广州','杭州','厦门','成都','青岛','乌鲁木齐'*/],
		theme: {
			day: {
				dawn: ['#0e77ca','#000000','你起得好早啊～'], // 黎明
				morning: ['#ffe9a7','#0e77ca','早上好啊，又是新的一天呀'], // 早晨
				afternoon: ['#add8d5','#108ee9','老子曰，中午不睡，下午崩溃～'], // 中午
				dusk: ['#f78e3d','#d73435','是不是收拾收拾该下班啦～'], // 黄昏
				evening: ['#404040','#000000','晚上好啊'], // 晚上
				midnight: ['#333333','#000000','半夜三更的你怎么还不睡'], // 半夜
			},
			situation: {
				haze: ['#919191','#000000','今天有霾哦，你戴口罩了吗'], // 霾
			}
		},
		setting: {
			expandDetail: true,
			expandSuggestions: true,
			showDetail: true,
			showSuggestions: true,
			future3days: true,
			future24hours: true,
		}
	},
	getters: {},
	actions,
	mutations,
	// modules,
});

module.exports = store;