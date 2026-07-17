!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    o = require("../../utils/api.js"),
    t = require("../../utils/wxuser.js");
  Array || e.resolveComponent("FloatButtonKf")(), Math || (n + i)();
  const n = () => "../../components/coustomHead.js",
    i = () => "../../components/empty.js",
    r = e.defineComponent({
      __name: "invoiceInfoList",
      setup(n) {
        e.ref("success");
        let i = t.getStorage("user"),
          r = t.getStorage("config"),
          s = e.ref([]);
        const a = (o) => {
          e.index.navigateTo({ url: o });
        };
        return (
          e.onShow(() => {
            (() => {
              e.index.showLoading({ title: "加载中..." });
              var t = {
                hotelCode: 0,
                hotelGroupCode: r.hotelGroupCode,
                memberId: i.memberId,
              };
              o.api
                .memberInvoice(t)
                .then((e) => {
                  1 == e.result && (s.value = e.retVal);
                })
                .finally(() => {
                  e.index.hideLoading();
                });
            })();
          }),
          (o, t) =>
            e.e(
              {
                a: e.p({ title: "常用开票信息", nativeMode: !0 }),
                b: e.f(e.unref(s), (o, t, n) =>
                  e.e(
                    { a: e.t(o.invoiceTitle), b: "person" == o.titleType },
                    "person" == o.titleType
                      ? {
                          c: e.t(o.uniformSocialCode.substring(0, 6)),
                          d: e.t(o.uniformSocialCode.substring(14, 18)),
                        }
                      : { e: e.t(o.taxPayerId) },
                    {
                      f: e.o(
                        (e) =>
                          a(
                            "/pagesF/invoice/invoiceInfo?editItem=" +
                              encodeURIComponent(JSON.stringify(o)) +
                              "&type=edit",
                          ),
                        t,
                      ),
                      g: t,
                    },
                  ),
                ),
                c: 0 == e.unref(s).length,
              },
              0 == e.unref(s).length
                ? {
                    d: e.p({
                      tips: "暂无发票信息",
                      subTips: "松赞，期待与您相遇。",
                    }),
                  }
                : {},
              { e: e.o((e) => a("/pagesF/invoice/invoiceInfo?type=add")) },
            )
        );
      },
    }),
    s = e._export_sfc(r, [["__scopeId", "data-v-67ad8d41"]]);
  wx.createPage(s);
})();
