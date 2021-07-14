//test.js
//获取应用实例
const app = getApp();

//数据库初始化
const db = wx.cloud.database().collection("food");
// var base64 = require("../../img/base64");

Page({
  // onLoad: function () {
  //   this.setData({
  //     icon: base64.icon20,
  //     slideButtons: [{
  //       text: '普通',
  //       src: '/img/icon_footer.png', // icon的路径
  //     }, {
  //       text: '普通',
  //       extClass: 'test',
  //       src: '/img/icon_nav_nav.png', // icon的路径
  //     }, {
  //       type: 'warn',
  //       text: '警示',
  //       extClass: 'test',
  //       src: '/img/icon_intro.png', // icon的路径
  //     }],
  //   });
  // },
  //   onLoad: function(){
  //       this.setData({
  //           icon: base64.icon20,
  //           slideButtons: [{
  //             text: '普通',
  //             src: '/page/weui/cell/icon_love.svg', // icon的路径
  //           },{
  //             text: '普通',
  //             extClass: 'test',
  //             src: '/page/weui/cell/icon_star.svg', // icon的路径
  //           },{
  //             type: 'warn',
  //             text: '警示',
  //             extClass: 'test',
  //               src: '/page/weui/cell/icon_del.svg', // icon的路径
  //           }],
  //       });
  //   },
  // slideButtonTap(e) {
  //   console.log('slide button tap', e.detail)
  // },
  // data: {
  //   show: false,
  //   buttons: [{
  //       type: 'default',
  //       className: '',
  //       text: '辅助操作',
  //       value: 0
  //     },
  //     {
  //       type: 'primary',
  //       className: '',
  //       text: '主操作',
  //       value: 1
  //     }
  //   ]
  // },
  data: {
    itemShow: false,
  },
  open: function () {
    this.setData({
      show: true,
    });
  },
  buttontap(e) {
    console.log(e.detail);
  },
  clickToScan: function () {
    //扫码
    wx.scanCode({
      //扫码成功
      success: (res) => {
        wx.showToast({
          title: "成功",
          icon: "success",
          duration: 2000,
        });
        var information = res.result.split("|");
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
        this.setData({
          itemShow: true
        })
      },
      //扫码失败
      fail: (res) => {
        wx.showToast({
          title: "失败",
          icon: "success",
          duration: 2000,
        });
        this.setData({
          itemShow:false
        })
      },
      complete: (res) => {},
    });
  },
});
