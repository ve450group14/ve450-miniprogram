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
    stickerShow: false,
    formShow: false,
    scanFail: false,
    itemShow: false,
    itemDeleted: false,
    food: [],
    info: "",
    showInfo: false,
    showDel: false,
    delButtons: [{ text: "Cancel" }, { text: "Delete" }],
    infoButton: [{ text: "OK" }],
    rules: [
      {
        name: "name",
        rules: { required: true, message: "name is required" },
      },
      {
        name: "manufacturer",
        rules: { required: true, message: "manufacturer is required" },
      },
      {
        name: "position",
        rules: { required: true, message: "position is required" },
      },
      {
        name: "expiration",
        rules: { required: true, message: "expiration is required" },
      },
    ],

    positions: [
      { name: "fridge", value: "0", checked: false },
      { name: "freezer", value: "1", checked: false },
      { name: "defrost zone", value: "2", checked: false },
    ],

    expiration: "---",

    formData: {
      name: "",
      manufacturer: "",
      position: "",
      expiration: "",
    },

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

  positionChange: function (e) {
    console.log("position change, value：", e.detail.value);

    var positions = this.data.positions;
    for (var i = 0, len = positions.length; i < len; ++i) {
      positions[i].checked = positions[i].value == e.detail.value;
    }

    this.setData({
      positions: positions,
      [`formData.position`]: e.detail.value,
    });
  },

  bindDateChange: function (e) {
    this.setData({
      expiration: e.detail.value,
      [`formData.expiration`]: e.detail.value,
    });
  },

  formInputChange: function (e) {
    const { field } = e.currentTarget.dataset;
    this.setData({
      [`formData.${field}`]: e.detail.value,
    });
  },

  submitForm: function () {
    this.selectComponent("#form").validate((valid, errors) => {
      console.log("valid", valid, errors);
      if (valid) {
        this.setData({
          food: this.data.food.concat([
            {
              name: this.data.formData.name,
              produce: this.data.formData.manufacturer,
              expiration: this.data.formData.expiration,
              position: this.data.positions[this.data.formData.position].name,
            },
          ]),
          scanFail: false,
          itemDeleted: false,
          stickerShow: true,
          formShow: false,
          itemShow: true,
        });
      } else {
        const firstError = Object.keys(errors);
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message,
          });
        }
      }
    });
  },

  open: function () {
    this.setData({
      show: true,
    });
  },

  openForm: function () {
    this.setData({
      formShow: true,
      show: false,
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
          scanFail: false,
          itemDeleted: false,
          itemShow: true,
          stickerShow: true,
          show: false,
        });
        //添加信息到数据库

        // db.add({
        //   data: {
        //     name: information[0],
        //     produce: information[1],
        //     expiration: information[2],
        //     position: information[3],
        //   },
        //   success(res) {
        //     console.log("添加成功", res);
        //   },
        //   fail(res) {
        //     console.log("添加失败", res);
        //   },
        // });
      },
      fail: (res) => {
        // wx.showToast({
        //   title: "Fail",
        //   icon: "error",
        //   duration: 2000,
        // });
        this.setData({
          scanFail: true,
          itemDeleted: false,
          stickerShow: false,
          show: false,
        });
      },
      complete: (res) => {},
    });
  },
});
