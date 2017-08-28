require("babel-register");

const Heysoo = (require('./boot/index.js'));
const Redis = require('ioredis')
const redis = new Redis()

const app = new Heysoo({
	debugFlag: 'hwind',
});

app.hook(app => {
	app.context.redis = redis
	app.context.done = function(data){
		this.body =  {
			err: {
				level: 0,
				msg: '',
			},
			data: data
		}
	}
	app.context.doneWithError = function(err){
		this.body =  {
			err: {
				level: 3,
				msg: err,
			},
			data: null
		}
	}
});

app.start();