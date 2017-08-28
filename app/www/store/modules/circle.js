// 圈子
const echarts = require('echarts/lib/echarts');

const circle = {
	state: {
		// 圈子评测维度配置(雷达图)
		circleAnalysisConfig: {
	    radar: {
        indicator: [
         { name: '活跃度', max: 100 },
         { name: '人气', max: 100 },
         { name: '策略数量', max: 100 },
         { name: '策略质量', max: 100 },
         { name: '策略广度', max: 100 },
        ],
        name: {
        	show: false
        },
        nameGap: 0,
        // radius: '100%'
	    },
	    grid: {
	    	// left: 0,
	    	// right: 0,
	    	// bottom: 0,
	    	// top: 0,
	    	containLabel: true
	    },
	    series: [{
        name: '圈子维度分析',
        type: 'radar',
        showSymbol: false,
	    	symbol: 'none',
	    	lineStyle: {
	    		normal: {
	    			color: '#4276d6',
	    			width: 1.5
	    		}
	    	},
	    	areaStyle: {
	    		normal: {
	    			color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgb(13, 121, 209)'
            }, {
              offset: 1,
              color: 'rgb(201, 214, 233)'
            }]),
	    			opacity: 0.5,
	    		}
	    	},
        data : []
	    }]
		},
	},
	mutations: {
		// 
	},
	actions: {
		// 
	},
}

module.exports = circle