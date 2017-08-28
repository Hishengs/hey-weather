// 应用路由配置

module.exports = app => {

  app.get('/',app.controller.home.index)

  app.post('/all',app.controller.home.all) // 全部天气

  app.post('/day-forcast',app.controller.home.dayForecast) // 3-10天预报

  app.post('/now',app.controller.home.now) // 实况天气

  app.post('/hourly',app.controller.home.hourly) // 未来每小时预报

  app.post('/aqi',app.controller.home.aqi) // 空气质量实况和预报

  app.post('/suggestion',app.controller.home.suggestion) // 生活指数

  app.post('/search',app.controller.home.search) // 城市查询

  app.post('/locate',app.controller.home.locate) // 定位

}
