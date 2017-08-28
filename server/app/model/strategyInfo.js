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
		type: {
			type: 'string',
			typeArgs: [50],
		},
		chinese_name: {
			type: 'string',
			typeArgs: [100],
			defaultValue: null,
			allowNull: true
		},
		followable: {
			type: 'integer',
			defaultValue: 0,
			allowNull: true
		},
	},
	options: {
		tableName: 'strategy_info',
		timestamps: false,
	},
	methods: {
		//
	}
}