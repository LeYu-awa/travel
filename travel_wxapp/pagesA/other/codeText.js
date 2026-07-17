!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../utils/wxuser.js"),
    o = require("../../hooks/useSysOptions.js");
  Array ||
    (e.resolveComponent("mp-html") + e.resolveComponent("FloatButtonKf"))(),
    Math ||
      (n + (() => "../../uni_modules/mp-html/components/mp-html/mp-html.js"))();
  const n = () => "../../components/coustomHead.js",
    s = e.defineComponent({
      __name: "codeText",
      setup(n) {
        t.getStorage("config");
        let s = e.ref([]),
          a = e.ref(""),
          l = e.ref("");
        const u = e.ref("");
        e.onLoad((e) => {
          e.code && (s.value = [e.code]),
            e.type && (l.value = e.type),
            e.title && (a.value = decodeURIComponent(e.title));
        });
        const { result: r } = o.useSysOptions(s);
        return (
          e.watch(r, (e) => {
            if (e.length) {
              const t = s.value[0],
                o = e.find((e) => e.code == t);
              o && (u.value = o.value);
            }
          }),
          e.onMounted(() => {
            (() => {
              if ("storage" == l.value) {
                let e = t.getStorage(s.value[0]);
                e && ((a.value = e.title), (u.value = e.desc));
              }
              e.index.setNavigationBarTitle({ title: a.value });
            })();
          }),
          (t, o) => ({
            a: e.p({ title: e.unref(a), nativeMode: "true" }),
            b: e.p({ content: u.value }),
          })
        );
      },
    }),
    a = e._export_sfc(s, [["__scopeId", "data-v-9c0d179a"]]);
  wx.createPage(a);
})();
