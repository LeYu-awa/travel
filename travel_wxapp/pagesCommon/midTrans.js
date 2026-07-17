!(function () {
  "use strict";
  const e = require("../common/vendor.js"),
    t = require("../assets/index.js");
  Math || n();
  const n = () => "../components/new/StButton.js",
    a = e.defineComponent({
      __name: "midTrans",
      setup(n) {
        const a = e.ref(),
          o = e.ref("");
        function s() {
          const { appId: t, path: n } = a.value || {};
          t && e.index.navigateToMiniProgram({ appId: t, path: n });
        }
        return (
          e.onLoad((t) => {
            const { appId: n, path: p, title: c } = t || {};
            if (n && p) {
              const t = c ? decodeURIComponent(c) : "";
              c && e.index.setNavigationBarTitle({ title: "跳转至 " + t }),
                (a.value = { appId: n, path: p ? decodeURIComponent(p) : "" }),
                (o.value = t),
                s();
            }
          }),
          (n, a) => ({
            a: e.unref(t.assets).leave,
            b: e.o(s),
            c: e.p({ theme: "black", block: !0 }),
          })
        );
      },
    }),
    o = e._export_sfc(a, [["__scopeId", "data-v-0aa60a38"]]);
  wx.createPage(o);
})();
