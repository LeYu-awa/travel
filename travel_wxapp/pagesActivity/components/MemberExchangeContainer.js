!(function () {
  "use strict";
  const t = require("../../common/vendor.js"),
    e = require("../../assets/index.js"),
    o = require("../../utils/helper.js");
  Array || t.resolveComponent("mp-html")(),
    Math ||
      (
        (() => "../../uni_modules/mp-html/components/mp-html/mp-html.js") +
        a +
        i +
        n
      )();
  const n = () => "../../components/new/FixedBottomView.js",
    a = () => "../../components/new/SafeArea.js",
    i = () => "../../components/new/StButton.js",
    l = t.defineComponent({
      __name: "MemberExchangeContainer",
      props: {
        type: null,
        activityInfo: null,
        customStyle: null,
        buttonLoading: { type: Boolean },
        buttonDisabled: { type: Boolean },
        scrollTop: null,
      },
      emits: ["bgLoadSuccess", "bgLoadError", "bgLoadingChange", "clickButton"],
      setup(n, { emit: a }) {
        const i = n,
          l = a,
          u = {
            1: "立即参与",
            2: "活动还未开始，敬请期待",
            3: "来晚啦，活动已结束",
          },
          s = t.computed(() => Math.min(i.scrollTop / 100, 1)),
          c = t.ref();
        function r(t) {
          (c.value = !1), l("bgLoadingChange", c.value, t);
        }
        t.watch(
          () => {
            var t;
            return null == (t = i.activityInfo) ? void 0 : t.backgroundImage;
          },
          (t) => {
            t &&
              ((c.value = !0),
              l("bgLoadingChange", !0),
              setTimeout(() => {
                c.value && r(!0);
              }, 3e4));
          },
          { immediate: !0 },
        );
        const m = t.computed(() => {
          var t, e;
          return {
            1:
              null == (t = null == i ? void 0 : i.activityInfo)
                ? void 0
                : t.activityRule,
            2:
              null == (e = null == i ? void 0 : i.activityInfo)
                ? void 0
                : e.receiveRule,
          }[i.type];
        });
        return (n, a) => {
          var c, d, v, p;
          return t.e(
            { a: null == (c = i.activityInfo) ? void 0 : c.backgroundImage },
            (null == (d = i.activityInfo) ? void 0 : d.backgroundImage)
              ? {
                  b: i.activityInfo.backgroundImage,
                  c: t.o(() => r(!0)),
                  d: t.o(() => r(!1)),
                }
              : {},
            {
              e: s.value,
              f: t.unref(e.assets).icSlideDown,
              g: 1 - s.value,
              h: m.value,
            },
            m.value ? { i: t.p({ content: m.value }) } : {},
            {
              j: s.value,
              k: t.p({
                position: "bottom",
                "custom-style": { height: t.unref(o.pxTransform)(144) },
              }),
              l: t.t(
                u[null == (v = i.activityInfo) ? void 0 : v.status] ||
                  "来晚啦，活动已结束",
              ),
              m: t.o((t) => l("clickButton")),
              n: t.p({
                block: !0,
                loading: i.buttonLoading,
                disabled:
                  i.buttonDisabled ||
                  !(1 === (null == (p = i.activityInfo) ? void 0 : p.status)),
              }),
              o: t.p({ "custom-style": { zIndex: 10 } }),
              p: t.s(i.customStyle),
            },
          );
        };
      },
    }),
    u = t._export_sfc(l, [["__scopeId", "data-v-cd7fb533"]]);
  wx.createComponent(u);
})();
