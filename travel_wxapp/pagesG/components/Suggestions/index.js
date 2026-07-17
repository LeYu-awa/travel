!(function () {
  "use strict";
  const e = require("../../../common/vendor.js"),
    s = require("../../../hooks/useRequest.js"),
    t = require("../../../utils/api.js"),
    o = require("../../../utils/config.js"),
    r = require("../../../base/jAlert/jAlert.js"),
    i = require("../../../common/assets.js"),
    a = require("../../store/useBaseStore.js"),
    u = require("./suggestTypes.js"),
    n = require("../../store/useServiceStore.js");
  Math || (j + p + l + m + g + c + d)();
  const d = () => "../Layout.js",
    p = () => "../base/BaseHeader/index.js",
    c = () => "../base/SafeBottom/index.js",
    l = () => "../base/BasePicker/index.js",
    g = () => "../../../components/bottomBtn.js",
    m = () => "./ImagePicker.js",
    j = () => "../../../components/coustomHead.js",
    f = e.defineComponent({
      __name: "index",
      setup(d) {
        const p = a.useBaseStore(),
          c = n.useServiceStore();
        e.onMounted(() => {
          p.init();
        });
        const l = e.reactive({ suggestType: "", text: "", images: [] }),
          { run: g, loading: m } = s.useRequest(
            () => {
              var s;
              return t.api.saveRecomm({
                appid: o.config.appid,
                bizType: l.suggestType,
                content: l.text,
                comptType: l.suggestType,
                masterId: p.base.masterId,
                roomMasterId: p.base.roomMasterId,
                rmno: p.base.areaCode,
                pictures: e.pipe(e.pluck("url"), e.join(","))(l.images),
                openid:
                  null == (s = e.index.getStorageSync("wxuser"))
                    ? void 0
                    : s.openid,
                userId: "",
                hotelCode: p.base.hotelCode,
                hotelGroupCode: o.config.hotelGroupCode,
              });
            },
            {
              manual: !0,
              onSuccess(s) {
                const t = s.id;
                t &&
                  (r.jAlert3("保存成功"),
                  setTimeout(() => {
                    e.index.redirectTo({
                      url: `suggest-detail?id=${t}&hotelCode=${p.base.hotelCode}`,
                    });
                  }, 1500));
              },
            },
          ),
          j = () => {
            l.suggestType
              ? l.text
                ? g()
                : r.jAlert3("请输入意见内容")
              : r.jAlert3("请选择意见类型");
          };
        return (s, t) => ({
          a: e.p({ color: "#fff", position: "fixed" }),
          b: e.p({
            title: "投诉建议",
            desc: e.defaultTo(
              "尊敬的宾客，您好！在本次住店过程中，如您遇到任何问题或者有其他意见，都可在此反馈，我们都将改进。",
              e.unref(c).service.serviceReminder,
            ),
          }),
          c: e.t(e.unref(p).base.hotelDesc),
          d: e.t(e.unref(p).base.areaCode),
          e: e.o((e) => (l.suggestType = e)),
          f: e.p({
            options: e.unref(u.SUGGEST_TYPES),
            title: "意见类型",
            modelValue: l.suggestType,
          }),
          g: l.text,
          h: e.o((e) => (l.text = e.detail.value)),
          i: e.t(l.text.length),
          j: e.o((e) => (l.images = e)),
          k: e.p({ modelValue: l.images }),
          l: e.o(j),
          m: e.p({ disabled: e.unref(m), layoutFlow: !0 }),
          n: e.p({ bg: e.unref(i.bg) }),
        });
      },
    }),
    b = e._export_sfc(f, [["__scopeId", "data-v-72efa162"]]);
  wx.createComponent(b);
})();
