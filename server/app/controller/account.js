module.exports = app => {
	class AccountController extends app.Controller {

		constructor (){
			super();
		}

		index (){
			this.ctx.body = `This is account page.`;
		}
	}
	return new AccountController();
}
