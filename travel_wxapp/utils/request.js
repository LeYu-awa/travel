!(function () {
  "use strict";
  var n = require("./config.js");
  function e(t) {
    return "function" == typeof t;
  }
  var r = {
    request: {
      get: function (t, n, o, i) {
        return r.request._request("GET", t, n, o, i);
      },
      post: function (t, n, o, i) {
        return r.request._request("POST", t, n, o, i);
      },
      put: function (t, n, o, i) {
        return r.request._request("PUT", t, n, o, i);
      },
      delete: function (t, n, o, i) {
        return r.request._request("DELETE", t, n, o, i);
      },
      _request: function (t, r, o, i, a) {
        var c = i || {},
          l = c.showLoading,
          u = void 0 !== l && l,
          d = c.showErrorToast,
          f = void 0 === d || d,
          p = c.baseUrl || n.config.baseUrlApi || "https://api.songtsam.com";
        if (u)
          wx.showLoading({ title: "加载中..." });
        return new Promise(function (n, i) {
          wx.request({
            url: p + r,
            method: t,
            data: o,
            header: { "content-type": "application/json" },
            success: function (t) {
              u && wx.hideLoading();
              var n = t.data;
              0 === n.code ? n.data !== undefined ? n.data : n : (f && console.error("[request]", r, n), i(n));
            },
            fail: function (t) {
              u && wx.hideLoading(), f && wx.showToast({ title: "网络异常", icon: "none" }), i(t);
            }
          });
        });
      }
    }
  };
  exports.request = r.request;
})();
