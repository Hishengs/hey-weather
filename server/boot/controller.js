'use strict';

const path = require('path');
const getFolderFiles = require('./util.js').getFolderFiles;

exports.init = (app) => {
	let config = app.config;
	// get user controllers
	let controllerPath = `./${app.config.folder.app}/${app.config.folder.controller}/`;
  let files = getFolderFiles(controllerPath);
  let controllerModule = {};
  for(let i=0,ilen=files.length;i<ilen;i++){
    controllerModule[files[i].slice(0,-3)] = require(path.join(process.cwd(),controllerPath+files[i]))(app);
  }
	app.controller = app.context.controller = controllerModule;

	app.debug('controller init done.');
}

exports.baseClass = class Controller {
	constructor (){
		this._name = 'Controller';
	}
}