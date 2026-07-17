!(function () {
  "use strict";
  const e = require("../../../../common/vendor.js");
  Math || (a + o + t)();
  const a = () => "../PickTrigger/index.js",
    t = () => "../../../../components/bottomDialog.js",
    o = () => "../../../../components/bottomBtn.js",
    n = e.defineComponent({
      __name: "index",
      props: { value: null },
      emits: ["confirm"],
      setup(a, { emit: t }) {
        const o = [0, 1, 2].map((a) =>
            e.dayjs().add(a, "days").format("MM月DD日"),
          ),
          n = e.range(0, 23).map((e) => (e < 10 ? "0" + e : "" + e)),
          s = ["00", "10", "20", "30", "40", "50"],
          r = e.ref(!1),
          u = () => {
            r.value = !0;
          },
          d = t,
          l = a,
          i = e.ref(
            l.value
              ? ((a) => {
                  const t = e.dayjs(),
                    o = e.dayjs(a);
                  return [
                    o.diff(t, "days"),
                    o.get("hours"),
                    o.get("minutes") / 10,
                  ];
                })(l.value)
              : [0, 0, 0],
          ),
          m = (e) => {
            i.value = e.detail.value;
          },
          f = () => {
            d(
              "confirm",
              ((a) => {
                const [t, o, n] = a;
                return e
                  .dayjs()
                  .startOf("day")
                  .add(t, "days")
                  .add(o, "hours")
                  .add(10 * n, "minutes")
                  .toDate();
              })(i.value),
            ),
              (r.value = !1);
          };
        return (a, t) => ({
          a: e.t(
            l.value ? e.unref(e.dayjs)(l.value).format("MM-DD HH:mm") : "",
          ),
          b: e.o(u),
          c: e.p({
            title: "上门时间",
            display: !!l.value,
            placeholder: "尽快",
          }),
          d: e.f(e.unref(o), (a, t, o) => ({ a: e.t(a), b: a })),
          e: e.f(e.unref(n), (a, t, o) => ({ a: e.t(a), b: a })),
          f: e.f(s, (a, t, o) => ({ a: e.t(a), b: a })),
          g: e.o(m),
          h: i.value,
          i: e.o(f),
          j: e.o((e) => (r.value = !!e)),
          k: e.p({ visible: r.value, title: "上门时间" }),
        });
      },
    }),
    s = e._export_sfc(n, [["__scopeId", "data-v-422ebb8f"]]);
  wx.createComponent(s);
})();
