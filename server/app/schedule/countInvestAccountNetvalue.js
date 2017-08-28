// 每天计算投资账户资金情况
module.exports = {
	config: {
		cron: '*/10 * * * * *',
	},
	getTask: (app) => {
		return () => {
			// console.log('>>> This is a schedule test.');
		}
	}
}