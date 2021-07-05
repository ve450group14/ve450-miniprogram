//test.js
//获取应用实例
const app = getApp()

//数据库初始化
const db = wx.cloud.database().collection("food")

Page({
  //添加数据
  clickToScan: function (){
    var that = this;
    //扫码
    wx.scanCode({
      //扫码成功
      success: (res) => {
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
        //添加信息到数据库
        db.add({
          data:{
            information: res.result
          },
          success(res){
            console.log("添加成功", res)
          },
          fail(res){
            console.log("添加失败", res)
          }
        })
      },
      //扫码失败
      fail: (res) => {
        wx.showToast({
          title: '失败',
          icon: 'success',
          duration: 2000
        })
      },
      complete: (res) => {
      }  
    })
  }
})