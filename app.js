// app.js
//云开发
require("./libs/Mixins.js");

const themeListeners = [];

App({
  globalData: {
    food: [],
    theme: "light", // dark
  },
  onLaunch: function () {
    wx.cloud.init({
      env: "cloud1-5goq2boj78791389",
    });

    wx.loadFontFace({
      family: "muli",
      source:
        'url("https://ve450group14.github.io/fonts/muli-latin-400.woff2")',
      success: console.log,
      global: true,
    });

    wx.loadFontFace({
      family: "muli-light",
      source:
        'url("https://ve450group14.github.io/fonts/muli-latin-200.woff2")',
      success: console.log,
      global: true,
    });

    wx.loadFontFace({
      family: "muli-bold",
      source:
        'url("https://ve450group14.github.io/fonts/muli-latin-700.woff2")',
      success: console.log,
      global: true,
    });

    wx.loadFontFace({
      family: "muli-bolder",
      source:
        'url("https://ve450group14.github.io/fonts/muli-latin-800.woff2")',
      success: console.log,
      global: true,
    });
  },
  themeChanged(theme) {
    this.globalData.theme = theme;
    themeListeners.forEach((listener) => {
      listener(theme);
    });
  },
  watchThemeChange(listener) {
    if (themeListeners.indexOf(listener) < 0) {
      themeListeners.push(listener);
    }
  },
  unWatchThemeChange(listener) {
    const index = themeListeners.indexOf(listener);
    if (index > -1) {
      themeListeners.splice(index, 1);
    }
  },
});
