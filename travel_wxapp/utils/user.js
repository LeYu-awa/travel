!(function () {
  "use strict";
  var e = require("./config.js"), t = require("./utils.js");
  exports.getWxUserInfo = function (t) { return Promise.resolve({ nickName: t || "微信用户", avatarUrl: "" }); };
  exports.updateUserInfo = function (e) {};
  exports.getUserToken = function () {
    try {
      var e = wx.getStorageSync("access_token"), t = wx.getStorageSync("refresh_token");
      return { accessToken: e || "", refreshToken: t || "" };
    } catch (e) { return { accessToken: "", refreshToken: "" }; }
  };
  exports.setUserToken = function (e) {
    e.accessToken && wx.setStorageSync("access_token", e.accessToken);
    e.refreshToken && wx.setStorageSync("refresh_token", e.refreshToken);
  };
  exports.removeUserToken = function () {
    wx.removeStorageSync("access_token"), wx.removeStorageSync("refresh_token");
  };
  exports.removeLocalUserInfo = function () {
    wx.removeStorageSync("user"), wx.removeStorageSync("wxuser"), wx.removeStorageSync("access_token"), wx.removeStorageSync("refresh_token");
  };
  exports.removeOpenIdAndSignOut = function (e, r) { t.toLogin({ redirect_url: r }); };
})();
