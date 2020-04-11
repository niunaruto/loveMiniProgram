Page({

  /**
   * 页面的初始数据
   */
  data: {
    birthday: '1995-01-01',
    heightForPerson: [],
    weightForPerson: [],
    tabItemViewFix: false,
    height: 50,
    weight: 10,
    tabItemAt:0,
  },
  changeItemData(e) {
    this.setData({
      tabItemAt: e.currentTarget.dataset.id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let dic = {
      "age": "23",
      "avatar": {
        "authStatus": "unsubmited",
        "remarks": "",
        "type": "avatar",
        "url": "https://yeting-1256217146.file.myqcloud.com/live-prod/dca77a86a7cb450b8a946b6e1b583911.png"
      },
      "avatarAuthStatus": "unsubmited",
      "bindMobile": true,
      "bindWechat": false,
      "birthday": "1996-11-22",
      "city": "上海",
      "defaultAge": true,
      "gender": 2,
      "height": "186",
      "introduce": "不求最好，只求合适。",
      "matchInfo": {
        "selfCar": "had",
        "selfDrink": "no",
        "selfEducation": "doctor",
        "selfExpectChild": "yes",
        "selfExpectMarriage": "flash",
        "selfHadChildren": "no",
        "selfHouse": "purchased",
        "selfMarriage": "single",
        "selfMonthlyIncome": "up_5w",
        "selfNation": "汉族",
        "selfOriginPlace": "北京市-北京市-东城区",
        "selfProfessional": "计算机/互联网-IT技术经理",
        "selfShape": "sports",
        "selfSmoke": "no",
        "selfWeight": "64",
        "targetAge": "26-29",
        "targetDrink": "no",
        "targetEducation": "university",
        "targetExpectChild": "yes",
        "targetHadChildren": "no",
        "targetHeight": "158-205",
        "targetMarriage": "single",
        "targetMonthlyIncome": "bewteen_8k_1w2",
        "targetPics": "yes",
        "targetShape": "unlimited",
        "targetSmoke": "no",
        "targetWorkPlace": "上海市-上海市-徐汇区"
      },
      "mobile": "18694911918",
      "newReg": false,
      "nickname": "内心不安的蜘蛛",
      "nimToken": "a1682b4687c64dc790123236606f8926",
      "openGuard": false,
      "photoAlbum": [
        {
          "authStatus": "ing",
          "remarks": "",
          "type": "photo_album",
          "url": "https://yeting-1256217146.file.myqcloud.com/live-prod/745266374c08434fb19ee1994a16fce9.png"
        }
      ],
      "realname": null,
      "realnameAuthStatus": "unsubmited",
      "regChannel": "APP",
      "regTime": "2019-11-22 11:55:34",
      "safeMobile": "+86******1918",
      "selfMarriage": null,
      "token": "ca0745dba9974698aa61cbfbef0c7707",
      "userId": 167977,
      "vip": false,
      "vipEndDay": "",
      "workPlace": "上海市-上海市-徐汇区",
      "wxMaNewReg": false,
      "wxNickname": ""
    }
    let userInfoDefaultModel = wx.getStorageSync('userInfoDefaultModel')
    for (let index = 120; index < 212; index++) {
      this.data.heightForPerson.push(index + 'cm')
    }
    for (let index = 40; index < 131; index++) {
      let str = index
      if (index == 40) {
        str = 40 + 'kg以下'
        this.data.weightForPerson.push(str)
      } else if (index == 130) {
        str = 130 + 'kg以上'
        this.data.weightForPerson.push(str)
      } else {
        this.data.weightForPerson.push(str + 'kg')
      }
    }

    this.setData({
      heightForPerson: this.data.heightForPerson,
      weightForPerson: this.data.weightForPerson
    })


    this.getTopHeight()
  },
  getTopHeight(){
    let that = this
    const query = wx.createSelectorQuery()
    query.select('#tabItemView').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function (res) {
      that.tabItemViewTop = res[0].top
    })
  },
  onPageScroll(e) {
    let top = e.scrollTop;
    let that = this
    let status = top >= this.tabItemViewTop
    if (status != this.data.tabItemViewFix) {
      that.setData({
        tabItemViewFix: status
      })
    }

  },

})