const Mock = require('mockjs');

module.exports = app => {
	class ResourceLibController extends app.Controller {

		constructor (){
			super();
		}

		index (){
	    this.ctx.body = `This is resourceLib page.`;
	  }

	  // 获取可跟投的策略列表
	  async getFollowableList (){
	  	let res = {
				err: {
					level: 0,
					msg: '',
				},
				data: Mock.mock({
					'list|1-10': [{
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
				})
			};
	    this.ctx.body = res;
	  }

	}
	return new ResourceLibController();
}

