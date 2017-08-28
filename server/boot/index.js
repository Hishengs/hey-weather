'use strict';

const Koa = require('koa');
const path = require('path');
const debug = require('debug');
const koaBody = require('koa-body');

const db = require('./db.js');
const view = require('./view.js');
const router = require('./router.js');
const service = require('./service.js');
const schedule = require('./schedule.js');
const staticServer = require('./static.js');
const controller = require('./controller.js');

module.exports = class Heysoo extends Koa {

  constructor (opts){
    super();

    this.opts = Object.assign({
      debugFlag: 'Heysoo',
      logRequestTime: true,
    },opts || {});

    this._version = '1.0.0';
    this._name = 'Heysoo';
    this._author = 'Hisheng';

    this.hooks = [];

    this.initDebug();

    this.initConfig();
  }

  initDebug (){
    this.debug = debug(this.opts.debugFlag);
  }

  initConfig (){
    const defaultConfig = {
      host: 'localhost',
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
      }
    }

    let config = {};

    try {
      config = require(path.join(process.cwd(),`./config.js`));
    }catch (e){
      this.debug('[warning] A config file needed.');
    }

    this.config = Object.assign(defaultConfig,config);
  }

  hook (hook){
    if(typeof hook !== 'function')throw TypeError('Hook must be a function.');
    this.hooks.push(hook);
  }

  start (){
    this.debug('start app');

    this.context.config = this.config;

    this.context.debug = this.debug;

    this.Service = service.baseClass;
    service.init(this);

    this.Controller = controller.baseClass;
    controller.init(this);

    view.init(this);

    staticServer.init(this);

    // db.init(this);

    // schedule.init(this);

    // invoke hooks
    this.hooks.forEach((hook) => {
      hook(this);
    });

    // middlewares
    this.use(koaBody());

    // ctx injection
    this.use(async (ctx,next) => {
      this.Controller.prototype.ctx = ctx;
      // this.Controller.prototype.app = ctx.app;
      this.Service.prototype.ctx = ctx;
      // this.Service.prototype.app = ctx.app;
      await next();
    });

    if(this.opts.logRequestTime)
      this.use(async (ctx,next) => {
        this.debug('before request',new Date().getTime());
        await next();
        this.debug('after request',new Date().getTime());
      });
    
    router.init(this);

    return this.listen(this.config.port);
  }

}