!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    r = require("../../utils/miniProgram.js"),
    o = e.defineComponent({
      __name: "webview2Mp",
      setup(o) {
        let n = e.ref();
        return (
          e.onLoad((e) => {
            e.redirect_url && (n.value = decodeURIComponent(e.redirect_url));
          }),
          e.onMounted(() => {
            n.value && r.miniProgram.redirectTo({ url: n.value });
          }),
          (e, r) => ({})
        );
      },
    }),
    n = e._export_sfc(o, [["__scopeId", "data-v-1c9ce610"]]);
  wx.createPage(n);
})();
