!(function () {
  "use strict";
  exports.goPage = function (e, t) {
    "string" == typeof e && (e.indexOf("http") >= 0 ? wx.navigateTo({ url: "/pages/webview/webview?url=" + encodeURIComponent(e) }) : t ? wx.redirectTo({ url: e }) : wx.navigateTo({ url: e }));
  };
  exports.goPageWithUser = function (e) {
    exports.goPage(e);
  };
  exports.toLogin = function (e) {
    var t = (e && e.redirect_url) || "";
    t && wx.setStorageSync("login_redirect", t), wx.navigateTo({ url: "/pagesA/member/memberLogin" });
  };
  exports.toLoginBack = function () {
    wx.navigateBack();
  };
  exports.goWmUrl = function (e) {};
  exports.createUrl = function (e) {
    if (!e) return "";
    return Object.keys(e).map(function (t) { return encodeURIComponent(t) + "=" + encodeURIComponent(e[t]); }).join("&");
  };
  exports.getUrlParams = function (e) {
    var t = {};
    return (e.split("?")[1] || "").split("&").forEach(function (e) { if (e) { var r = e.split("="); t[decodeURIComponent(r[0])] = decodeURIComponent(r[1] || ""); } }), t;
  };
  exports.getUrl = function (e) { return e; };
  exports.urlEncode = function (e, t, r) { return JSON.stringify(e); };
  exports.addNum = function (e, t) { return e + t; };
  exports.subtraction = function (e, t) { return e - t; };
  exports.getRect = function (e, t) {
    return new Promise(function (r) { e && wx.createSelectorQuery().in(e).select(t).boundingClientRect(function (e) { r(e); }).exec(); });
  };
  exports.getAllRect = function (e, t) {
    return new Promise(function (r) { e && wx.createSelectorQuery().in(e).selectAll(t).boundingClientRect(function (e) { r(e); }).exec(); });
  };
  exports.getBoundingClientRect = function (e) {
    return new Promise(function (t) { wx.createSelectorQuery().select(e).boundingClientRect(function (e) { t(e); }).exec(); });
  };
  exports.getCurrentCard = function () { return [null, -1]; };
  exports.refreshMemberInfo = function (e) { e && e(); };
  exports.queryOrderGuestIsAll = function (e, t) { t && t({ allAdded: !0 }); };
  exports.getQuery = function () { return {}; };
  exports.getReallyPx = function (e) { return e; };
  exports.getMaxWidthContent = function (e) { return e; };
  exports.genSessionId = function (e) {
    var t = e || 64, r = "abcdefghijklmnopqrstuvwxyz0123456789", n = "";
    for (var o = 0; o < t; o++) n += r.charAt(Math.floor(Math.random() * r.length));
    return n;
  };
  exports.hexToRgba = function (e, t) {
    var r = e.replace("#", ""), n = parseInt(r.substring(0, 2), 16), o = parseInt(r.substring(2, 4), 16), i = parseInt(r.substring(4, 6), 16);
    return "rgba(" + n + "," + o + "," + i + ", " + t + ")";
  };
  exports.convertToCSSColor = function (e) { return "#" + e.toString(16).padStart(6, "0"); };
  exports.hasIllegalInputValue = function (e) { return !1; };
  exports.requestMsg = function (e) {
    return new Promise(function (t) { wx.requestSubscribeMessage({ tmplIds: e, success: t, fail: t }); });
  };
  exports.isCmbchina = function () { return !1; };
})();
