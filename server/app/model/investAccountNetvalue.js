module.exports = {
	keys: {
		id: {
			primaryKey: true,
			type: 'integer',
			autoIncrement: true,
		},
		invest_account_id: {
			type: 'integer',
		},
		date: {
			type: 'date',
			defaultValue: 'now',
			allowNull: true
		},
		netvalue: {
			type: 'float',
		},
	},
	options: {
		tableName: 'invest_account_netvalue',
		timestamps: false,
	},
	methods: {
		//
	}
}