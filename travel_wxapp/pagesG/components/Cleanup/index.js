!(function () {
  "use strict";
  const e = require("../../../common/vendor.js"),
    r = require("../../../common/assets.js"),
    s = require("./useCreateOrder.js"),
    o = require("../../store/useServiceInfo.js"),
    t = require("./useDatePicker.js"),
    n = require("../../store/useBaseStore.js"),
    u = require("../../store/useServiceStore.js"),
    i = require("./useServePerson.js");
  Math || (v + c + f + d + a)();
  const a = () => "../Layout.js",
    c = () => "../base/BaseHeader/index.js",
    d = () => "../../../components/bottomBtn.js",
    f = () => "../base/TimePicker/index.js",
    v = () => "../../../components/coustomHead.js",
    m = e.defineComponent({
      __name: "index",
      setup(a) {
        const { run: c } = o.useServiceInfo("001"),
          d = n.useBaseStore(),
          f = u.useServiceStore(),
          { onConfirm: v, date: m } = t.useDatePicker(),
          { run: l, loading: j } = s.useCreateOrder(),
          { user: p, run: S } = i.useServePerson(),
          b = (r) => e.dayjs(r).format("YYYY-MM-DD HH:mm");
        e.onMounted(() => {
          d.init(), c(), S();
        }),
          e.watch(m, (e) => {
            S(b(e));
          });
        const q = e.ref(""),
          C = () => {
            var e;
            l({
              orderRemark: q.value,
              timeDo: b(m.value),
              typeTime: "P",
              userCode: null == (e = p.value) ? void 0 : e.userCode,
              serviceProvider: "HUMAN",
            });
          };
        return (s, o) => ({
          a: e.p({ color: "#fff", position: "fixed" }),
          b: e.p({
            title: "客房打扫",
            desc: e.unref(f).inServiceTime
              ? e.defaultTo(
                  "呼叫客房打扫后，服务人员将即时上门打扫",
                  e.unref(f).service.serviceReminder,
                )
              : "",
            time: e.unref(f).inServiceTime ? "" : e.unref(f).duration,
          }),
          c: e.t(e.unref(d).base.hotelDesc),
          d: e.t(e.unref(d).base.areaCode),
          e: e.o(e.unref(v)),
          f: e.p({ value: e.unref(m) }),
          g: q.value,
          h: e.o((e) => (q.value = e.detail.value)),
          i: e.t(q.value.length),
          j: e.t(e.unref(f).getServiceButtonTxt("提交")),
          k: e.o(C),
          l: e.p({
            layoutFlow: !0,
            disabled: !e.unref(f).inServiceTime || e.unref(j),
          }),
          m: e.p({ bg: e.unref(r.bg) }),
        });
      },
    }),
    l = e._export_sfc(m, [["__scopeId", "data-v-bd43be4a"]]);
  wx.createComponent(l);
})();
