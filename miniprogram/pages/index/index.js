//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    systemInfoObj: null,
    menuRect: null,
    listData: [],
  },

  onLoad: function() {
    let that = this
    that.loadGirl = true
    that.dbName = 'db_user_list'
    that.pageNum = 0
    wx.getSystemInfo({
      success: function(res) {
        let menuRect = wx.getMenuButtonBoundingClientRect()
        that.setData({
          systemInfoObj: res,
          menuRect: menuRect
        })
      },
    })
    wx.startPullDownRefresh({
      
    })




  },
  changeCard(){
    this.loadGirl = !this.loadGirl
    if(this.loadGirl){
      this.dbName = 'db_user_list'
    }else{
      this.dbName = 'db_user_list_boys'
    }
    this.pageNum = 0
    wx.startPullDownRefresh({

    })

  },
  onPullDownRefresh() {

    wx.showLoading({
      title: '加载中...',
    })
    const db = wx.cloud.database()
    const _ = db.command
    db.collection(this.dbName).where({
      age: _.eq('20')
        .or(_.eq('21'))
        .or(_.eq('22'))
        .or(_.eq('23'))
        .or(_.eq('24'))
        .or(_.eq('25'))
        .or(_.eq('26'))
        .or(_.eq('27'))
        .or(_.eq('28'))
        .or(_.eq('29'))
        .or(_.eq('30'))
        .or(_.eq('31'))
        .or(_.eq('19'))
        .or(_.eq('18'))
    }).skip(20 * this.pageNum).get().then(res => {
      this.setData({
        listData: res.data
      })
      wx.stopPullDownRefresh()
      wx.hideLoading()
      this.pageNum ++
    }).catch(e=>{
      wx.stopPullDownRefresh()
    })

  },

  onReachBottom() {
    const db = wx.cloud.database()
    const _ = db.command
    wx.showLoading({
      title: '加载中...',
    })
    db.collection(this.dbName).where({
      age: _.eq('20')
        .or(_.eq('21'))
        .or(_.eq('22'))
        .or(_.eq('23'))
        .or(_.eq('24'))
        .or(_.eq('25'))
        .or(_.eq('26'))
        .or(_.eq('27'))
        .or(_.eq('28'))
        .or(_.eq('29'))
        .or(_.eq('30'))
        .or(_.eq('31'))
        .or(_.eq('19'))
        .or(_.eq('18'))
    }).skip(20 * this.pageNum).get().then(res => {
      this.setData({
        listData: this.data.listData.concat(res.data)
      })
      wx.hideLoading()
      this.pageNum++
    })

  },
  jumpToDetail(item) {
    wx.setStorage({
      key: 'uid',
      data: item.currentTarget.dataset.data._id,
    })
    
    wx.navigateTo({
      url: '../userDetail/index',
    })
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },
  onShareAppMessage: function () {
    this.onShareAppMessage = 1
    return {
      title: '牛郎织女鹊桥会 waiting for you 😝',
      path: '/pages/index/index',
      success: function (res) {

      },
      fail: function (res) {
      }
    }
  },
  // 上传图片
  doUpload: function() {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {

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