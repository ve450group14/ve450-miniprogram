// index.js
// 获取应用实例
const app = getApp();

const util = require("../../utils/util.js");
//把winHeight设为常量，不要放在data里（一般来说不用于渲染的数据都不能放在data里）
const winHeight = wx.getSystemInfoSync().windowHeight;

Page({
  data: {
    logs: [],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
    canIUseGetUserProfile: false,
    canIUseOpenData:
      wx.canIUse("open-data.type.userAvatarUrl") &&
      wx.canIUse("open-data.type.userNickName"), // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap1() {
    //跳到扫码页
    wx.switchTab({
      url: "../test/test",
    });
  },

  bindViewTap2() {
    //跳到扫码页
    wx.switchTab({
      url: "../intro/intro",
    });
  },

  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true,
      });
    }
    this.setData({
      winH: wx.getSystemInfoSync().windowHeight,
      opacity: 1,
      //这个是微信官方给的获取logs的方法 看了收益匪浅
      logs: (wx.getStorageSync("logs") || []).map((log) => {
        return util.formatTime(new Date(log));
      }),
    });
  },

  onShow: function () {
    this.hide();
  },
  //核心方法，线程与setData
  hide: function () {
    var vm = this;
    var interval = setInterval(function () {
      if (vm.data.winH > 0) {
        //清除interval 如果不清除interval会一直往上加
        clearInterval(interval);
        vm.setData({
          winH: vm.data.winH - 10,
          opacity: vm.data.winH / winHeight,
        });
        vm.hide();
      }
    }, 15);
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: "Collect user profile", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        });
      },
    });
  },
});
