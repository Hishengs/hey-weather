module.exports = app => {
	class UserService extends app.Service {

		constructor (){
			super();
		}

		// 获取用户信息
		async getInfo (userIds){
			userIds = Array.isArray(userIds) ? userIds : [userIds]
			let postData = {
				msgType: "RawGetUserAccount",
				msgBody: {
					vecUsers: userIds
				},
				serviceType: "request"
			}
			return await app.dll.sendRequest(postData);
		}

		// 获取用户之间关系
		async getRelationWith (userId,objIds){
			objIds = Array.isArray(objIds) ? objIds : [objIds]
			let postData = {
				msgType: "IS_GetUserUserRelation",
				msgBody: {
					i64UserID: userId,
					vecUsers: objIds
				},
				serviceType: "request"
			}
			return await app.dll.sendRequest(postData);
		}

		// 搜索用户
		async search (keywords){
			keywords = Array.isArray(keywords) ? keywords : [keywords]
			let postData = {
				msgType: "RawSearchUserAcc",
				msgBody: {
					vecUsers: keywords,
				},
				serviceType: "request"
			}
			return await app.dll.sendRequest(postData);
		}

	}
	return new UserService();
}