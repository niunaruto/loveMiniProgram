Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
        title: '色情低俗',
        selected: false
      }, {
        title: '头像，虚假资料',
        selected: false
      }, {
        title: '婚托，饭托，酒托等',
        selected: false
      }, {
        title: '骚扰信息',
        selected: false
      }, {
        title: '钱财，虚假中奖信息',
        selected: false
      }, {
        title: '其他',
        selected: false
      }
    ],
    interstitialAd:null,
  },
  itemSlected(item){
    item.currentTarget.dataset.item.selected = !item.currentTarget.dataset.item.selected
    let array = []
    this.data.list.forEach(element => {
      if (element.title == item.currentTarget.dataset.item.title){
        element = item.currentTarget.dataset.item
      }
      array.push(element)
    });
    this.setData({
      list: array
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.uid = options.uid
    wx.hideShareMenu({
      
    })
    // 在页面中定义插屏广告
    let interstitialAd = null

    // 在页面onLoad回调事件中创建插屏广告实例
    if (wx.createInterstitialAd) {
      interstitialAd = wx.createInterstitialAd({
        adUnitId: 'adunit-2902dcbd36848c79'
      })
      interstitialAd.onLoad(() => { })
      interstitialAd.onError((err) => { })
      interstitialAd.onClose(() => { })
    }
    this.data.interstitialAd = interstitialAd
  },
  commintClick(){
    let reportArray = []
    let that = this
    that.data.list.forEach(element => {
      if (element.selected) {
        reportArray.push(element.title)
      }
    });
    if (reportArray.length==0){
      wx.showToast({
        title: '请选择举报原因',
        icon:'none'
      })
      return
    }
    const db = wx.cloud.database()
    const _ = db.command
    wx.showLoading({
      title: '加载中...',
    })
    let dic = {
      report_uid: that.uid,
      reportArray: reportArray
    }
    db.collection('db_report_list').add({
      data: dic
    }).then(res=>{
      wx.showToast({
        title: '举报成功',
        icon: 'none'
      })
      
      setTimeout(()=>{
        wx.navigateBack({
          
        })
      },2500)

    }).catch(e=>{
      wx.showToast({
        title: '举报失败',
        icon: 'none'
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})