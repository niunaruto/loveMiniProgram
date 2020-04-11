//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    systemInfoObj:null,
    menuRect:null,
    listData:[
      1,
      2,
    ],
  },
  jumpToDetail(item){
    wx.navigateTo({
      url: '../plazaDetail/index?id=' + 1,
    })
  },
  previewImage() {

  },

  onLoad: function() {
    let that = this
    that.pageNum = 1
    wx.getSystemInfo({
      success: function(res) {
        let menuRect = wx.getMenuButtonBoundingClientRect()
        that.setData({
          systemInfoObj:res,
          menuRect: menuRect
        })
      },
    })
  //  wx.startPullDownRefresh({
     
  //  })

    let createdAt = (new Date()).getTime()

    let dic = {
      

    }
    db.collection('db_topic_list').add({
      data: dic,
      success: function (res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      }
    })

   
  },
  onPullDownRefresh() {
    const db = wx.cloud.database()
    const _ = db.command
    wx.showLoading({
      title: '加载中...',
    })
    db.collection('db_topic_list').skip(20 * this.pageNum).get().then(res => {
      this.setData({
        listData: this.data.listData.concat(res.data)
      })
      wx.hideLoading()
      this.pageNum++
      wx.stopPullDownRefresh()
    }).catch(e=>{
      wx.stopPullDownRefresh()
    })

  },

  onReachBottom(){
    let that = this
    wx.request({
      url: 'https://xqlive.yetingfm.com/live/v1/users/recomend?pageSize=18&pageNum=' + this.pageNum,
      header: {
        token: 'fc58c8a7b4ed4babb4ee781c45a6fced'
      },
      success(res) {
        that.pageNum++
        that.setData({
          listData: that.data.listData.concat(res.data.data.list)
        })
      }
    })
  },
  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },
  onShareAppMessage: function () {
    this.onShareAppMessage = 1
    return {
      title: '牛郎织女鹊桥会 waiting for you 😝',
      path: '/pages/plaza/index',
      success: function (res) {

      },
      fail: function (res) {
      }
    }
  },

  // 上传图片
  doUpload: function () {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },

})
