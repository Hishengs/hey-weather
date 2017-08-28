const config = require('./config.js')

module.exports = {
	// 获取当前天气
	getCurrentWeather (city){
		return new Promise((resolve,reject) => {
			config.http.post(config.api + '/all',{
				city
			}).then(res => {
				resolve(res)
			}).catch(reject)
		})
	},
	// 城市搜索
	search (city){
		return new Promise((resolve,reject) => {
			config.http.post(config.api + '/search',{
				city
			}).then(res => {
				setTimeout(() => {
					resolve(res)
				},1000)
				// resolve(res)
			}).catch(reject)
		})
	},
	// 城市定位
	locate (){
		return new Promise((resolve,reject) => {
			config.http.post(config.api + '/locate').then(res => {
				resolve(res)
			}).catch(reject)
			/*let url = `https://api.map.baidu.com/location/ip?ak=Zam5C9aBBGepyAEvTLN566X4`
			config.http.get(url).then(res => {
				if(res.data.status == 0){
					resolve(res.data.content.address_detail.city)
				}else reject('定位失败')
			}).catch(reject)*/
		})
	}
}