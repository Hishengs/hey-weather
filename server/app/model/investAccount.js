module.exports = {
	keys: {
		id: {
			primaryKey: true,
			type: 'integer',
			autoIncrement: true,
		},
		name: {
			type: 'string',
			typeArgs: [50],
		},
		user_id: {
			type: 'integer',
		},
		created_at: {
			type: 'date',
			defaultValue: 'now',
			allowNull: true
		},
		initial_money: { // 初始资金，不变，除非账户重置
			type: 'float',
		},
		available_money: { // 可用资金
			type: 'float',
		},
		type: { // 账户类型：1. 策略 2. ...
			type: 'integer',
			allowNull: true,
			defaultValue: 1,
		},
	},
	options: {
		tableName: 'invest_account',
		timestamps: false,
	},
	methods: {
		//
	}
}