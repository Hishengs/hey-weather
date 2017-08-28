module.exports = {
	keys: {
		id: {
			primaryKey: true,
			type: 'integer',
			autoIncrement: true,
		},
		strategy_id: {
			type: 'integer',
		},
		invest_account_id: {
			type: 'integer',
		},
		start_at: {
			type: 'date',
			defaultValue: 'now',
			allowNull: true
		},
		end_at: {
			type: 'date',
			defaultValue: null,
			allowNull: true
		},
		follow_money: {
			type: 'float',
		},
		follow_portion: {
			type: 'integer',
		},
		follow_netvalue: {
			type: 'float',
		},
	},
	options: {
		tableName: 'strategy_follow',
		timestamps: false,
	},
	methods: {
		//
	}
}