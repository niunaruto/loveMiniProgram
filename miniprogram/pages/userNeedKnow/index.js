Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    
  },
  bindended(){
    debugger
  },

  
// U
// U
// 02
// 投资诈骗
// 行骗者多将自己包装为成功人士，按照管用的套路，交流
// 一段时间后取得征婚对象的信任，随后以帮助或建议的方
// 式推荐征婚对象在指定平台(股票、基金、期货等投资项
// 目)进行投资，接下来的情况可能有以下三类:
//     1、若投资暂时成功，要求征婚对象加大投注，最后全部赔
// 本;
//   2、若投资成功后，征婚对象想要取现，则告知需缴纳一
// 笔取现费，取现费缴纳后行骗者消失;
//   3、若投资失败，则告知是没选好，再次推荐另一只，结
// 果还是赔本。
//   她他会提示: 请千万不要轻信任何陌生人介绍的投资渠
// 道，尤其是承诺“稳赚不赔”、“一本万利”、“无风险”的
// 投资渠道，请一-定保持警惯。
//   U
// 03 假借贷
// 行骗者利用各式各样的借口向会员借钱，得手后立刻消失
// 无影。惯常使用的借口有以下几种，请各位会员留心注


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },
  /**
       * 生命周期函数--监听页面显示
       */
  onShow: function () {
    if (this.onShareAppMessage == 2) {
      // 在页面中定义插屏广告
      let interstitialAd = null

      // 在页面onLoad回调事件中创建插屏广告实例
      if (wx.createInterstitialAd) {
        interstitialAd = wx.createInterstitialAd({
          adUnitId: 'adunit-d14ce629abad2244'
        })
        interstitialAd.onLoad(() => { })
        interstitialAd.onError((err) => { })
        interstitialAd.onClose(() => { })
      }

      // 在适合的场景显示插屏广告
      if (interstitialAd) {
        interstitialAd.show().catch((err) => {
          console.error(err)
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    if (this.onShareAppMessage == 1) {
      this.onShareAppMessage = 2
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    this.onShareAppMessage = 1
    return {
      title: '有人@你 提高交友安全意识，警惕网络骗局',
      path: '/pages/userNeedKnow/index',
      success: function (res) {

      },
      fail: function (res) {
      }
    }
  }
})