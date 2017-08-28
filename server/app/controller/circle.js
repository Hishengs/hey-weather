const _ = require('lodash');
const Mock = require('mockjs');

module.exports = app => {
  class CircleController extends app.Controller {

    constructor (){
      super();
    }

    index (){
      this.ctx.body = `This is circle page.`
    }

    // 获取圈子列表
    async getList (){
      try {
        console.time('time.getList')
        // 1. 圈子列表
        let circles = (await this.ctx.service.circle.getListOfUser(this.ctx.request.body.userId)).data
        // 异步并发
        async function getMembers(circleId,index){
          let memberIds = (await this.ctx.service.circle.getMembers(circleId)).data
          // 关联用户信息
          let members = (await Promise.all(memberIds.map((memberId) => {
            return this.ctx.service.user.getInfo(memberId);
          }))).map(res => res.data[0]);
          circles[index].members = members;
          let masterIndex = _.findIndex(members,{'iID':circles[index]['i64CircleID']})
          circles[index].master = masterIndex === -1 ? {} : members[masterIndex] // 圈主信息
        }
        await Promise.all(circles.map((circle,i) => {
          return getMembers(circles[i]['i64CircleID'],i)
        }));
        // 同步
        // 2. 圈子成员
        /*for(let i=0,ilen=circles.length;i<ilen;i++){
          let members = await this.ctx.service.circle.getMembers(circles[i]['i64CircleID']);
          circles[i]['members'] = members;
        }*/
        console.timeEnd('time.getList')
        this.ctx.body = {
          err: {
            level: 0,
            msg: ''
          },
          data: circles
        }
      }catch (e){
        this.ctx.body = {
          err: {
            level: 3,
            msg: e
          },
          data: null
        }
      }
    }

    // 获取未读圈子消息数目
    async getUnreadNoticeNum (){
      try {
        this.ctx.body = {
          err: {
            level: 0,
            msg: ''
          },
          data: (await this.ctx.service.circle.getUnreadNoticeNum(this.ctx.request.body.userId)).data
        }
      }catch (e){
        this.ctx.body = {
          err: {
            level: 3,
            msg: e
          },
          data: null
        }
      }
    }

    // 退出圈子
    async quit (){
      try {
        this.ctx.body = {
          err: {
            level: 0,
            msg: ''
          },
          data: (await this.ctx.service.circle.quit(this.ctx.request.body.circleId,this.ctx.request.body.managerId,this.ctx.request.body.memberId)).data
        }
      }catch (e){
        this.ctx.body = {
          err: {
            level: 3,
            msg: e
          },
          data: null
        }
      }
    }

    // 获取圈子消息列表
    async getNoticeList (){
      let notices = (await this.ctx.service.circle.getNotices(this.ctx.request.body.userId)).data
      // 关联用户信息
      async function linkUserInfo(notice,index){
        let sender = (await this.ctx.service.user.getInfo(notice.i64SenderID)).data[0] || {}
        let receiver = (await this.ctx.service.user.getInfo(notice.i64RecipientID)).data[0] || {}
        notices[index].sender = sender
        notices[index].receiver = receiver
      }
      await Promise.all(notices.map((notice,index) => {
        return linkUserInfo(notice,index)
      }))
      try {
        this.ctx.body = {
          err: {
            level: 0,
            msg: ''
          },
          data: notices
        }
      }catch (e){
        this.ctx.body = {
          err: {
            level: 3,
            msg: e
          },
          data: null
        }
      }
    }

    // 删除圈子消息
    async deleteNotice (){
      try {
        this.ctx.body = {
          err: {
            level: 0,
            msg: ''
          },
          data: (await this.ctx.service.circle.deleteNotice(this.ctx.request.body.noticeIds)).data
        }
      }catch (e){
        this.ctx.body = {
          err: {
            level: 3,
            msg: e
          },
          data: null
        }
      }
    }

    // 设置消息已读
    async setNoticeRead (){
      try {
        this.ctx.body = {
          err: {
            level: 0,
            msg: ''
          },
          data: (await this.ctx.service.circle.setNoticeRead(this.ctx.request.body.userId,this.ctx.request.body.noticeIds)).data
        }
      }catch (e){
        this.ctx.body = {
          err: {
            level: 3,
            msg: e
          },
          data: null
        }
      }
    }

    // 同意加圈
    async acceptJoinIn (){
      try {
        this.ctx.body = {
          err: {
            level: 0,
            msg: ''
          },
          data: (await this.ctx.service.circle.acceptJoinIn(this.ctx.request.body.noticeId)).data
        }
      }catch (e){
        this.ctx.body = {
          err: {
            level: 3,
            msg: e
          },
          data: null
        }
      }
    }

    // 拒绝加圈
    async rejectJoinIn (){
      try {
        this.ctx.body = {
          err: {
            level: 0,
            msg: ''
          },
          data: (await this.ctx.service.circle.rejectJoinIn(this.ctx.request.body.noticeId)).data
        }
      }catch (e){
        this.ctx.body = {
          err: {
            level: 3,
            msg: e
          },
          data: null
        }
      }
    }

    // 圈子搜索
    // 1. 通过用户信息搜索 2. 通过圈子信息(名称/ID)搜索
    async search (){
      try {
        let circles = []
        if(this.ctx.request.body.keywords.length){
          // 1. 通过用户信息搜索
          let users = (await this.ctx.service.user.search(this.ctx.request.body.keywords)).data
          // let userIds = users.map(user => user.iID)
          // 2. 通过圈子信息(名称/ID)搜索
          // 未完成 @YG

          // 关联圈子维度数据
          for(let i=0,ilen=users.length;i<ilen;i++){
            circles[i] = Mock.mock({
              'id': i+1,
              'memberNum|1-200': 1,
              'radarData': () => {
                return [
                  Mock.mock('@float(0, 100, 4)'),Mock.mock('@float(0, 100, 4)'),
                  Mock.mock('@float(0, 100, 4)'),Mock.mock('@float(0, 100, 4)'),
                  Mock.mock('@float(0, 100, 4)'),
                ];
              },
              'radarIns': null,
              'score|1-100.2': 1,
            })
            circles[i]['master'] = users[i]
          }
        }
        this.ctx.body = {
          err: {
            level: 0,
            msg: ''
          },
          data: circles
        }
      }catch (e){
        this.ctx.body = {
          err: {
            level: 3,
            msg: e
          },
          data: null
        }
      }
    }

    // 热门圈子列表
    async getHotList (){
      // 1. 获取热门圈子列表
      let hotCircles = (await this.ctx.service.circle.getHotList()).data;
      let masterIds = hotCircles.map(circle => circle.i64CircleID);
      let masters = (await this.ctx.service.user.getInfo(masterIds)).data;
      // 2. 关联用户信息
      for(let i=0,ilen=hotCircles.length;i<ilen;i++){
        let master = _.find(masters,{iID: hotCircles[i].i64CircleID});
        hotCircles[i].master = master ? master: {};
      }
      this.ctx.body = {
        err: {
          level: 0,
          msg: ''
        },
        data: hotCircles
      }
    }
    
  }
  return new CircleController();
}

