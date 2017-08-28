module.exports = app => {
  class InvestAccountController extends app.Controller {

    constructor (){
      super();
    }

    index (){
      this.ctx.body = `This is invest account page.`;
    }

    // 获取用户投资账户列表
    async getList (){
      let userId = this.ctx.request.body.userId;
      if(userId){
        await this.ctx.model.investAccount.findAll({
          where: {
            user_id: userId
          }
        }).then(accounts => {
          this.ctx.body = {
            err: {
              level: 0,
              msg: ''
            },
            data: accounts
          }
        }).catch(err => {
          this.ctx.body = {
            err: {
              level: 3,
              msg: err
            },
            data: null
          }
        });
      }else {
        this.ctx.body = {
          err: {
            level: 2,
            msg: '无用户ID'
          },
          data: null
        }
      }
    }

    // 重置账户
    async reset (){
      //
    }

  }
  return new InvestAccountController();
}

