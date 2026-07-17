!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    o = require("../../utils/platform.js"),
    t = require("../../utils/utils.js");
  Math || s();
  const s = () => "../../components/coustomHead.js",
    n = e.defineComponent({
      __name: "couponReciveResult",
      setup(s) {
        let n = e.ref(80);
        return (
          e.onMounted(() => {
            e.index.getSystemInfo({
              success: (e) => {
                n.value = n.value + e.statusBarHeight;
              },
              fail(e) {
                console.log(e);
              },
            });
          }),
          (s, u) => ({
            a: e.p({ color: "#000" }),
            b: e.unref(n) + "px",
            c: e.o((t) => e.unref(o.makeTel)("400-0000-830")),
            d: e.o((o) => e.unref(t.goPage)("/pagesA/member/couponList")),
            e: e.o((o) => e.unref(t.goPage)("/pages/travel/index")),
          })
        );
      },
    }),
    u = e._export_sfc(n, [["__scopeId", "data-v-7bfcb4f7"]]);
  wx.createPage(u);
})();
