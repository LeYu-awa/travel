!(function () {
  "use strict";
  const e = require("../../../../common/vendor.js"),
    t = require("./useOrderListStore.js"),
    o = require("../../../../hooks/useLayoutStart.js");
  Math || (r + s + n)();
  const s = () => "../../../../components/tabs.js",
    n = () => "./components/ScrollList.js",
    r = () => "../../../../components/coustomHead.js",
    i = e.defineComponent({
      __name: "index",
      setup(s) {
        const n = [
            { id: "all", name: "全部" },
            { id: "serve", name: "待服务" },
          ],
          r = t.useOrderListStore(),
          i = (e) => {
            r.setActiveTab(e.id);
          },
          a = (e) => {
            const t = e.detail.current;
            r.setActiveTab(n[t].id);
          };
        e.onMounted(() => {
          r.refresh();
        });
        const { layoutStart: c } = o.useLayoutStart();
        return (t, o) => ({
          a: e.p({ title: "工单", position: "fixed" }),
          b: e.o(i),
          c: e.p({
            datas: n,
            fullWidth: !0,
            activeType: e.unref(r).activeTab,
            type: "line",
            color: "#A43127",
            titleInactiveColor: "#808080",
          }),
          d: e.p({ type: "all" }),
          e: e.p({ type: "serve" }),
          f: e.unref(r).index,
          g: e.o(a),
          h: e.unref(c),
        });
      },
    }),
    a = e._export_sfc(i, [["__scopeId", "data-v-cc22906b"]]);
  wx.createComponent(a);
})();
