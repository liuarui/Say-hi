// pages/camera/camera.js
Page({
  start() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath
        });
        console.log(res.tempImagePath);
        //console.log(wx.getFileSystemManager().readFileSync(res.tempImagePath, "base64"));
        wx.request({
          url: 'test.php', //仅为示例，并非真实的接口地址
          data: {
            x: wx.getFileSystemManager().readFileSync(res.tempImagePath, "base64")
          },
          method: "POST",
          success:(res)=> {
            console.log(res.data);
            this.setData({
              result: "res",
            })
          },
          fail:(res) =>{
            console.log("服务器故障");
            this.setData({
              result: "识别失败服务器故障",
            })
          }
        })
      }
    })
  },
  stop() {

  },
  error(e) {
    console.log(e.detail)
  }
})