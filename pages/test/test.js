//test.js
//获取应用实例
const app = getApp();

//数据库初始化
const db = wx.cloud.database().collection("food");
var base64 = require("../../images/base64");

Page({
  onLoad: function () {
    this.setData({
      icon: base64.icon20,
    });
  },

  data: {
    show: false,
    scanFail: false,
    itemShow: false,
    itemDeleted: false,
    food: [],
    info: "",
    showInfo: false,
    showDel: false,
    delButtons: [{ text: "Cancel" }, { text: "Confirm" }],
    infoButton: [{ text: "OK" }],
    slideButtons: [
      {
        type: "primary",
        text: "info",
        extClass: "test",
        src: "/images/icon_nav_nav.png", // icon的路径
        data: "item.index",
      },
      {
        type: "warn",
        text: "delete",
        extClass: "test",
        src: "/images/icon_del.svg", // icon的路径
      },
    ],
  },

  open: function () {
    this.setData({
      show: true,
    });
  },

  slideButtonTap: function (e) {
    console.log("slide button tap", e.detail.index, e.mark.index);
    this.currentIndex = e.mark.index;
    this.setData({
      currentIndex: e.mark.index,
    });
    switch (e.detail.index) {
      case 0:
        this.tapInfoButton();
        break;

      case 1:
        this.tapDelButton();
        break;

      default:
        break;
    }
  },

  tapInfoButton: function (e) {
    this.setData({
      showInfo: true,
    });
  },

  tapDelButton: function (e) {
    this.setData({
      showDel: true,
    });
  },

  tapConfirmButton: function (e) {
    this.setData({
      showInfo: false,
      showDel: false,
    });
  },

  chooseDelButton: function (e) {
    console.log("slide button tap", e.detail.index);
    switch (e.detail.index) {
      case 0:
        this.tapConfirmButton();
        break;
      case 1:
        this.data.food.splice(this.currentIndex, 1);
        this.setData({
          food: this.data.food,
          itemDeleted: true,
        });
        if (this.data.food.length == 0) {
          this.setData({
            itemShow: false,
          });
        }
        this.tapConfirmButton();
      default:
        break;
    }
  },

  clickToScan: function () {
    wx.scanCode({
      success: (res) => {
        // wx.showToast({
        //   title: "Success",
        //   icon: "success",
        //   duration: 2000,
        // });
        var information = res.result.split(",");
        this.setData({
          food: this.data.food.concat([
            {
              name: information[0],
              produce: information[1],
              expiration: information[2],
              position: information[3],
            },
          ]),
          itemShow: true,
          show: false,
        });
        //添加信息到数据库

        db.add({
          data: {
            name: information[0],
            produce: information[1],
            expiration: information[2],
            position: information[3],
          },
          success(res) {
            console.log("添加成功", res);
          },
          fail(res) {
            console.log("添加失败", res);
          },
        });
      },
      fail: (res) => {
        // wx.showToast({
        //   title: "Fail",
        //   icon: "error",
        //   duration: 2000,
        // });
        this.setData({
          scanFail: true,
          show: false,
        });
      },
      complete: (res) => {},
    });
  },
});
