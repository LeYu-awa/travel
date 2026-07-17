!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    r = require("../../utils/api.js"),
    o = require("../../utils/wxuser.js"),
    t = require("../../base/jAlert/jAlert.js");
  Math || (i + n)();
  const n = () => "../../components/kfDialog.js",
    i = () => "../../components/coustomHead.js",
    u = e.defineComponent({
      __name: "invoiceDetails",
      setup(n) {
        let i = o.getStorage("config");
        o.getStorage("user");
        let u = e.ref(),
          a = e.ref(),
          f = e.ref({}),
          l = e.ref();
        const s = e.ref();
        return (
          e.ref(""),
          e.ref(""),
          e.onLoad((e) => {
            e.orderNo && ((a.value = e.orderNo), (u.value = e.orderType));
          }),
          e.onShow(() => {
            e.index.showLoading({ title: "加载中..." }),
              r.api
                .getInvoiceOrder({
                  hotelCode: i.hotelCode || 0,
                  hotelGroupCode: i.hotelGroupCode,
                  orderNo: a.value,
                  orderType: u.value,
                })
                .then((e) => {
                  1 == e.result
                    ? ((l.value = e.retVal.invoiceStaV2),
                      (f.value = e.retVal.orderInvoice))
                    : t.jAlert3(e.msg);
                })
                .finally(() => {
                  e.index.hideLoading();
                });
          }),
          (r, o) =>
            e.e(
              {
                a: e.p({ title: "申请发票", nativeMode: !0 }),
                b: 2 == e.unref(l),
              },
              (e.unref(l), {}),
              { c: 3 == e.unref(l) },
              (e.unref(l), {}),
              { d: e.t(e.unref(f).invoiceTitle), e: e.unref(f).taxPayerId },
              e.unref(f).taxPayerId ? { f: e.t(e.unref(f).taxPayerId) } : {},
              {
                g: e.t(2 == e.unref(f).receiveWay ? "电子" : "纸质"),
                h: 2 == e.unref(f).receiveWay,
              },
              2 == e.unref(f).receiveWay
                ? { i: e.t(e.unref(f).receiverEmail) }
                : {},
              { j: 1 == e.unref(f).receiveWay },
              1 == e.unref(f).receiveWay
                ? {
                    k: e.t(e.unref(f).receiverAddress),
                    l: e.t(e.unref(f).receiverName),
                    m: e.t(
                      e.unref(f).mobile
                        ? e.unref(f).mobile.substring(0, 3)
                        : "",
                    ),
                    n: e.t(
                      e.unref(f).mobile
                        ? e.unref(f).mobile.substring(7, 11)
                        : "",
                    ),
                  }
                : {},
              {
                o: e.o((e) => {
                  s.value.showDialog();
                }),
                p: e.sr(s, "80db6fed-1", { k: "kf" }),
                q: e.p({ title: "联系客服" }),
              },
            )
        );
      },
    }),
    a = e._export_sfc(u, [["__scopeId", "data-v-80db6fed"]]);
  wx.createPage(a);
})();
