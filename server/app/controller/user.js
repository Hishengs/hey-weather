module.exports = app => {
  class UserController extends app.Controller {

    constructor (){
      super();
    }

    // 登录
    async login (){
      // 1. 发起登录请求
      // 2. 检测是否有投资账户，没有则新建
      // let userId = this.ctx.request.body.userId;
      let userId = 147;
      this.ctx.debug('userId: ',userId);
      let investAccount = await new Promise((resolve,reject) => {
        try {
          this.ctx.model.investAccount.findOrCreate({
            where: {
              user_id: userId
            },
            defaults: {
              name: '策略',
              initial_money: 1000000,
              available_money: 1000000,
              type: 1,
            }
          }).spread((account,created) => {
            this.ctx.debug('>>> account');
            console.log(account);
            this.ctx.debug('>>> created');
            console.log(created);
            resolve(account.get({ plain: true }));
          });
        }catch (e){
          reject(e);
        }
      });
      // 3. 返回登录结果
      this.ctx.body = {
        err: {
          level: 0,
          msg: ''
        },
        data: {
          investAccounts: [investAccount]
        }
      }
    }

    // 获取用户信息
    async getInfo (){
      if(this.ctx.request.body.userIds && this.ctx.request.body.userIds.length){
        let userInfo = await this.ctx.service.user.getInfo(this.ctx.request.body.userIds);
        this.ctx.body = {
          err: {
            level: 0,
            msg: ''
          },
          data: userInfo
        }
      }else {
        this.ctx.body = {
          err: {
            level: 1,
            msg: '无用户ID'
          },
          data: null
        }
      }
    }
    
  }
  return new UserController();
}