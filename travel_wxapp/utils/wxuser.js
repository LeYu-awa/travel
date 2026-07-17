!(function () {
  "use strict";
  exports.getStorage = function (e) {
    try { return wx.getStorageSync(e); } catch (t) { return null; }
  };
  exports.setStorage = function (e, t) {
    try { wx.setStorageSync(e, t); } catch (r) {}
  };
  exports.removeStorage = function (e) {
    return new Promise(function (t) { try { wx.removeStorageSync(e), t(); } catch (r) { t(); } });
  };
  exports.login = function () {
    return new Promise(function (e, t) { wx.login({ success: function (r) { e(r); }, fail: t }); });
  };
})();
