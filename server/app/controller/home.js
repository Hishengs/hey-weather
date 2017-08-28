const path = require('path');
const axios = require('axios');
const querystring = require('querystring')
const moment = require('moment')

module.exports = app => {
	class HomeController extends app.Controller {

		constructor (){
			super();
		}

		async index (){
			await this.ctx.render('index.html');
		}

		async all (){
			let today = moment().format('YYYYMMDD')
			let key = this.ctx.config.weather.hw.appKey
			let city = this.ctx.request.body.city || 'beijing'
			city = querystring.escape(city)
			let url = `${this.ctx.config.weather.hw.api}/weather?city=${city}&key=${key}`
			try {
				let allData = await this.ctx.redis.get(`hw.all-${today}`)
				if(allData){
					console.log('retrive all data from redis')
					this.ctx.done(JSON.parse(allData))
				}else {
					console.log('retrive all data from server')
					let data = (await axios.get(url)).data
					this.ctx.redis.set(`hw.all-${today}`,JSON.stringify(data),'EX',1*60) // 每1分钟更新一次
					this.ctx.done(data)
				}
			}catch (e){
				this.ctx.doneWithError(e.toString())
			}
	  }

	  async dayForecast (){
	  	let key = this.ctx.config.weather.hw.appKey
			let city = this.ctx.request.body.city || 'beijing'
			city = querystring.escape(city)
			let url = `${this.ctx.config.weather.hw.api}/forecast?city=${city}&key=${key}`
	    try {
				const data = (await axios.get(url)).data
				this.ctx.done(data)
			}catch (e){
				this.ctx.doneWithError(e.toString())
			}
	  }

	  async now (){
			let key = this.ctx.config.weather.hw.appKey
			let city = this.ctx.request.body.city || 'beijing'
			city = querystring.escape(city)
			let url = `${this.ctx.config.weather.hw.api}/now?city=${city}&key=${key}`
	    try {
				const data = (await axios.get(url)).data
				this.ctx.done(data)
			}catch (e){
				this.ctx.doneWithError(e.toString())
			}
	  }

	  async hourly (){
			let key = this.ctx.config.weather.hw.appKey
			let city = this.ctx.request.body.city || 'beijing'
			city = querystring.escape(city)
			let url = `${this.ctx.config.weather.hw.api}/hourly?city=${city}&key=${key}`
	    try {
				const data = (await axios.get(url)).data
				this.ctx.done(data)
			}catch (e){
				this.ctx.doneWithError(e.toString())
			}
	  }

	  async aqi (){
			let key = this.ctx.config.weather.hw.appKey
			let city = this.ctx.request.body.city || 'beijing'
			city = querystring.escape(city)
			let url = `${this.ctx.config.weather.hw.api}/aqi?city=${city}&key=${key}`
	    try {
				const data = (await axios.get(url)).data
				this.ctx.done(data)
			}catch (e){
				this.ctx.doneWithError(e.toString())
			}
	  }

	  async suggestion (){
			let key = this.ctx.config.weather.hw.appKey
			let city = this.ctx.request.body.city || 'beijing'
			city = querystring.escape(city)
			let url = `${this.ctx.config.weather.hw.api}/suggestion?city=${city}&key=${key}`
	    try {
				const data = (await axios.get(url)).data
				this.ctx.done(data)
			}catch (e){
				this.ctx.doneWithError(e.toString())
			}
	  }

	  async search (){
			let key = this.ctx.config.weather.hw.appKey
			let city = this.ctx.request.body.city || 'beijing'
			city = querystring.escape(city)
			let url = `${this.ctx.config.weather.hw.api}/search?city=${city}&key=${key}`
	    try {
				const data = (await axios.get(url)).data
				this.ctx.done(data)
			}catch (e){
				this.ctx.doneWithError(e.toString())
			}
	  }

	  async locate (){
			let url = `https://api.map.baidu.com/location/ip?ak=Zam5C9aBBGepyAEvTLN566X4`
			if(this.ctx.request.ip){
				let ips = this.ctx.request.ip.split(':')
				// let ip = ips[ips.length-1]
				let ip = '101.105.59.140'
				if(ip === '127.0.0.1' || ip === '10.0.0.1')
					this.ctx.doneWithError('无法获取您当前网络ip')
				else {
					url += ('&ip=' + ip)
					try {
						const data = (await axios.get(url)).data
						console.log(url)
						if(data.status == 0){
							await new Promise((r,j) => {
								setTimeout(() => {r()},2000)
							})
							this.ctx.done(data.content.address_detail.city)
						}else this.ctx.doneWithError('定位失败')
					}catch (e){
						this.ctx.doneWithError(e.toString())
					}
				}
			}else this.ctx.doneWithError('无法获取您当前网络ip')
	  }

	}
	return new HomeController();
}
