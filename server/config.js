module.exports = {
  host: '192.168.31.125',
  port: 91,
  folder: {
    app: 'app',
    controller: 'controller',
    service: 'service',
    model: 'model',
    view: 'view',
    static: 'static',
    schedule: 'schedule'
  },
  database: {
    type: 'mysql', // options: mysql | sqlite | postgres | mssql
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    dbname: '',
  },
  view: {
    engine: 'nunjucks',
    options: {
      autoescape: true,
      noCache: true,
      watch: true
    },
    extension: '.html',
  },
  static: {
    path: 'static',
  },
  weather: {
  	hw: {
  		appKey: '342873acfa67476fbad177230ab50e7a',
  		api: 'https://free-api.heweather.com/v5'
  	}
  },
}