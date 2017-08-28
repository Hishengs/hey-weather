module.exports = app => {
	class CircleService extends app.Service {

		constructor (){
			super();
		}

		// 获取用户圈子列表
		async getListOfUser (userId){
			let postData = {
				msgType: "IS_GetCircleList",
				msgBody: {
					i64UserID: userId
				},
				serviceType: "request"
			}
			return await app.dll.sendRequest(postData);
		}

		// 获取圈子成员列表
		async getMembers (circleId){
			let postData = {
				msgType: "IS_GetCircleMember",
				msgBody: {
					i64CircleID: circleId,
				},
				serviceType: "request"
			}
			return await app.dll.sendRequest(postData);
		}

		// 获取圈子通知消息
		async getNotices (userId){
			let postData = {
				msgType: "IS_GetCircleMessage",
				msgBody: {
					i64UserID: userId,
				},
				serviceType: "request"
			}
			return await app.dll.sendRequest(postData);
		}

		// 获取圈子未读通知消息
		async getUnreadNoticeNum (userId){
			let postData = {
				msgType: "IS_GetNotReadMessageNumber",
				msgBody: {
					i64UserID: userId,
				},
				serviceType: "request"
			}
			return await app.dll.sendRequest(postData);
		}

		// 设置圈子消息已读
		async setNoticeRead (userId,messageIds){
			messageIds = Array.isArray(messageIds) ? messageIds : [messageIds]
			let postData = {
				msgType: "IS_ReadCircleMessage",
				msgBody: {
					i64UserID: userId,
					vecMessageID: messageIds
				},
				serviceType: "request"
			}
			return await app.dll.sendRequest(postData);
		}

		// 删除圈子消息
		async deleteNotice (messageIds){
			messageIds = Array.isArray(messageIds) ? messageIds : [messageIds]
			let postData = {
				msgType: "IS_DeleteCircleMessage",
				msgBody: {
					veci64MesgID: messageIds
				},
				serviceType: "request"
			}
			return await app.dll.sendRequest(postData);
		}

		// 申请加入
		async applyJoinIn (circleId,userId,objId){
			let postData = {
				msgType: "IS_RequestToIn",
				msgBody: {
					i64CircleID: circleId,
					i64RequesterID: userId,
					i64RequesteeID: objId
				},
				serviceType: "request"
			}
			return await app.dll.sendRequest(postData);
		}

		// 接受申请
		async acceptJoinIn (messageId){
			let postData = {
				msgType: "IS_RequestSucceed",
				msgBody: {
					i64MesgID: messageId
				},
				serviceType: "request"
			}
			return await app.dll.sendRequest(postData);
		}

		// 拒绝申请
		async rejectJoinIn (messageId){
			let postData = {
				msgType: "IS_RequestFail",
				msgBody: {
					i64MesgID: messageId
				},
				serviceType: "request"
			}
			return await app.dll.sendRequest(postData);
		}

		// 退出圈子
		async quit (circleId,managerId,memberId){
			let postData = {
				msgType: "IS_QuitCircle",
				msgBody: {
					i64CircleID: circleId,
					i64ManagerID: managerId,
					i64MemberID: memberId
				},
				serviceType: "request"
			}
			return await app.dll.sendRequest(postData);
		}

		// 移除成员
		async removeMember (circleId,managerId,memberIds){
			memberIds = Array.isArray(memberIds) ? memberIds : [memberIds]
			let postData = {
				msgType: "IS_RemoveCircleMember",
				msgBody: {
					i64CircleID: circleId,
					i64ManagerID: managerId,
					veci64MemberID: memberIds,
				},
				serviceType: "request"
			}
			return await app.dll.sendRequest(postData);
		}

		// 设置圈子是否公开
		async setPublic (circleId,isPublic){
			let postData = {
				msgType: "IS_AutoLetOthersIn",
				msgBody: {
					i64CircleID: circleId,
					bAutoLetOthersIn: isPublic,
				},
				serviceType: "request"
			}
			return await app.dll.sendRequest(postData);
		}

	  // 热门圈子列表
	  async getHotList (){
	    let postData = {
				msgType: "IS_GetHotCircleList",
				msgBody: {
					// 
				},
				serviceType: "request"
			}
			return await app.dll.sendRequest(postData);
	  }

	}
	return new CircleService();
}