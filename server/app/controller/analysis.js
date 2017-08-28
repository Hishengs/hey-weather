const Mock = require('mockjs');

function getRandomStrategyList (min,max){
	return Mock.mock({
		[`list|${min}-${max}`]: [{
			'id|+1': 1,
			'name': () => {
				return '策略' + Mock.Random.string(2,5);
			},
			'profit|-30-100.2': 1,
			'following|1': false,
			'chartIns': null,
			'lineIns': null,
			'lineData': () => {
				return [
					['2017-06-23',Mock.mock('@float(-20, 100, 4)')],['2017-06-23',Mock.mock('@float(-20, 100, 4)')],
					['2017-06-24',Mock.mock('@float(-20, 100, 4)')],['2017-06-25',Mock.mock('@float(-20, 100, 4)')],
					['2017-06-26',Mock.mock('@float(-20, 100, 4)')],['2017-06-27',Mock.mock('@float(-20, 100, 4)')],
					['2017-06-28',Mock.mock('@float(-20, 100, 4)')],['2017-06-29',Mock.mock('@float(-20, 100, 4)')],
					['2017-06-30',Mock.mock('@float(-20, 100, 4)')],['2017-07-01',Mock.mock('@float(-20, 100, 4)')],
					['2017-07-02',Mock.mock('@float(-20, 100, 4)')],['2017-07-03',Mock.mock('@float(-20, 100, 4)')],
					['2017-07-04',Mock.mock('@float(-20, 100, 4)')],['2017-07-05',Mock.mock('@float(-20, 100, 4)')],
					['2017-07-06',Mock.mock('@float(-20, 100, 4)')],['2017-07-07',Mock.mock('@float(-20, 100, 4)')],
				];
			},
			'radarIns': null,
			'radarData': () => {
				return [
					Mock.mock('@integer(0, 100)'),Mock.mock('@integer(0, 100)'),
					Mock.mock('@integer(0, 100)'),Mock.mock('@integer(0, 100)'),
					Mock.mock('@integer(0, 100)'),Mock.mock('@integer(0, 100)'),
					Mock.mock('@integer(0, 100)'),Mock.mock('@integer(0, 100)'),
				];
			},
			'score|1-100.2': 1,
			'type|1-5': 1, // 策略类型
			'focus|1-100': 1, // 关注度
		}]
	}).list;
}

function getDimension(name){
	return {
		name: name,
		'value|0-100': 1,
		'score|-20-100.2': 1,
		'result': () => {
			return '该维度的分析结果如下：具体建议，具体建议，具体建议，具体建议，具体建议，具体建议。'
		},
		'recommends': getRandomStrategyList(1,10),
	}
}

module.exports = app => {
	class AnalysisController extends app.Controller {

		constructor (){
			super();
		}

		index (){
	    this.ctx.body = `This is user page.`;
	  }

	  // 获取分析数据
	  async getData (){
	  	const currentValue = 1.1495
	  	let data = Mock.mock({
	  		// 1. 投资账户信息
	  		investAccount: {
	  			'initialMoney|1000000-2000000': 1, // 初始资金
	  			'currentMoney|1000000-2000000': 1, // 当前资金
	  			// 'profit|-20-100.2': 1, // 收益率
	  			'overmarket|-20-100.2': 1, // 超越市场
	  		},
	  		// 2. 资金分布
	  		'fundDistributions|1-10': [{
	  			'id|+1': 1,
	  			'start_date': () => { // 跟投时间
	  				return Mock.mock('@date');
	  			},
	  			'name': () => { // 策略名称
	  				return '策略' + Mock.Random.string(2,5);
	  			},
	  			'current_portion|100-2000': 1, // 当前持仓份额
	  			'initial_portion|100-2000': 1, // 初始持仓份额
	  			'initial_netvalue|0-1.4': 1, // 初始投资净值
	  		}],
	  		// 3. 账户收益率曲线
	  		'profitLine': () => {
					return [
						['2017-06-23',Mock.mock('@float(-20, 100, 4)')],['2017-06-23',Mock.mock('@float(-20, 100, 4)')],
						['2017-06-24',Mock.mock('@float(-20, 100, 4)')],['2017-06-25',Mock.mock('@float(-20, 100, 4)')],
						['2017-06-26',Mock.mock('@float(-20, 100, 4)')],['2017-06-27',Mock.mock('@float(-20, 100, 4)')],
						['2017-06-28',Mock.mock('@float(-20, 100, 4)')],['2017-06-29',Mock.mock('@float(-20, 100, 4)')],
						['2017-06-30',Mock.mock('@float(-20, 100, 4)')],['2017-07-01',Mock.mock('@float(-20, 100, 4)')],
						['2017-07-02',Mock.mock('@float(-20, 100, 4)')],['2017-07-03',Mock.mock('@float(-20, 100, 4)')],
						['2017-07-04',Mock.mock('@float(-20, 100, 4)')],['2017-07-05',Mock.mock('@float(-20, 100, 4)')],
						['2017-07-06',Mock.mock('@float(-20, 100, 4)')],['2017-07-07',Mock.mock('@float(-20, 100, 4)')],
					];
				},
	  		// 4. 当前持仓
	  		'positionList|10-100': [{
	  			'id|+1': 1,
	  			'name': () => { // 标的名称
	  				return '标的' + Mock.Random.string(2,5);
	  			},
	  			'value|10-500': 1, // 数量
	  		}],
	  		// 5. 交易记录
	  		'tradeList|10-200': [{
	  			'id|+1': 1,
	  			'date': () => { // 交易时间
	  				return Mock.mock('@date');
	  			},
	  			'type|1-4': 1, // 买卖类型
	  			'name': () => { // 标的名称
	  				return '标的' + Mock.Random.string(2,5);
	  			},
	  			'price|1-100.2': 1, // 价格
	  			'volumn|10-500': 1, // 数量
	  		}],
	  		// 6. 分析数据
	  		'radar': {
	  			'score|-20-100.2': 1, // 总分
	  			'dimensions': [ // 各维度情况
	  				getDimension('收益情况'),
	  				getDimension('风险情况'),
	  				getDimension('进攻情况'),
	  				getDimension('防御情况'),
	  				getDimension('投资分散度'),
	  			]
	  		}
			})
			// 投资账户收益率
			data.investAccount.profit = Number((((data.investAccount.currentMoney - data.investAccount.initialMoney) / data.investAccount.initialMoney) * 100).toFixed(2))
			// 计算 1. 初始资金 2. 当前资金 3. 盈亏 4. 收益率
			data.fundDistributions = data.fundDistributions.map(item => {
				item.initial_money = Number((item.initial_portion * item.initial_netvalue).toFixed(2))
				item.current_money = Number((item.current_portion * currentValue).toFixed(2))
				item.gain_or_loss = Number((item.current_money - item.initial_money).toFixed(2))
				item.profit = Number( ( ( (item.current_money - item.initial_money) / item.initial_money ) * 100 ).toFixed(2) )
				return item
			})
			// 雷达图数据
			data.radar.data = data.radar.dimensions.map(dimension => {
				return dimension.score
			})
			let _data = await new Promise((resolve,reject) => {
				setTimeout(() => {
					resolve(data)
				}, 1000)
			})
			this.ctx.body = {
				err: {
					level: 0,
					msg: ''
				},
				data: _data
			}
			/*this.ctx.body = {
				err: {
					level: 0,
					msg: ''
				},
				data: data
			}*/
	  }
	  
	}
	return new AnalysisController();
}
