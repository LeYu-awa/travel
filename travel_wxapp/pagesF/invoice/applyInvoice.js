!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    r = require("../../utils/api.js"),
    o = require("../../base/jAlert/jAlert.js"),
    t = require("../../utils/wxuser.js"),
    l = require("../../store/index.js");
  Math || (u + i)();
  const i = () => "../../components/bottomDialog.js",
    u = () => "../../components/coustomHead.js",
    a = e.defineComponent({
      __name: "applyInvoice",
      setup(i) {
        let u = e.reactive(t.getStorage("wxuser")),
          a = t.getStorage("config"),
          n = t.getStorage("user");
        const d = l.mainStore(),
          s = e.ref(),
          f = e.ref();
        let v = e.ref("F"),
          c = e.ref("F"),
          p = e.ref(),
          m = e.ref(),
          h = e.ref(),
          g = e.ref(),
          b = e.ref(1),
          I = e.ref(),
          C = e.ref(),
          y = e.ref(),
          T = e.ref(),
          j = e.ref(),
          A = e.reactive([]),
          G = e.reactive({}),
          S = e.ref(-1),
          V = e.reactive({});
        const x = e.ref([]);
        let w = e.ref(-1);
        const N = (r) => {
            e.index.navigateTo({ url: r });
          },
          M = (e) => {
            r.api
              .saveOrUpdateOrderInvoice({
                hotelCode: a.hotelCode,
                hotelGroupCode: a.hotelGroupCode,
                invoiceUuid: e.uuid,
                memberId: n.memberId,
                orderNo: T.value,
                orderType: y.value,
              })
              .then((r) => {
                if (1 == r.result)
                  if (0 == r.retVal.resultCode) {
                    (I.value = e.invoiceTitle),
                      (C.value = e.taxPayerId),
                      e.email && (g.value = e.email);
                    for (let r = 0; r < A.length; r++)
                      if (A[r].uuid == e.uuid) {
                        (S.value = r), (G = Object.assign(G, A[r]));
                        break;
                      }
                  } else o.jAlert3(r.retVal.resultMessage);
                else o.jAlert3(r.msg);
              });
          },
          k = (e) => {
            b.value = e;
          },
          F = (r) => {
            let o = { id: "" };
            r.id && (o.id = r.id),
              d.getEditAddress(r),
              e.index.navigateTo({
                url: "/pagesF/address/addAddress?id=" + o.id,
              });
          };
        return (
          e.onLoad((e) => {
            e.orderNo &&
              ((T.value = e.orderNo),
              (y.value = e.orderType),
              (j.value = e.productType));
          }),
          e.onShow(() => {
            var e;
            (e = {
              hotelCode: 0,
              hotelGroupCode: a.hotelGroupCode,
              memberId: n.memberId,
            }),
              r.api.memberInvoice(e).then((e) => {
                1 == e.result && (A = Object.assign(A, e.retVal));
              }),
              (() => {
                let e = {
                  hotelGroupId: a.hotelGroupId,
                  openid: u.openid,
                  hotelGroupCode: a.hotelGroupCode,
                  hotelCode: a.hotelCode,
                  memberId: "",
                };
                n && n.memberId && (e.memberId = n.memberId),
                  r.api.getMemberAddress(e).then((e) => {
                    console.log(e), 1 == e.result && (x.value = e.retVal);
                  });
              })(),
              r.api
                .getInvoiceAmountAndMsg({
                  hotelCode: a.hotelCode,
                  hotelGroupCode: a.hotelGroupCode,
                  memberId: n.memberId,
                  orderNo: T.value,
                  orderType: y.value,
                })
                .then((e) => {
                  1 == e.result &&
                    ((v.value = e.retVal.isShowPaper),
                    (p.value = e.retVal.normalTip),
                    (m.value = e.retVal.specialTip),
                    (h.value = e.retVal.sumAmount),
                    (c.value = e.retVal.isShowElectronic),
                    "T" == e.retVal.isShowElectronic && (b.value = 2));
                });
          }),
          (t, l) =>
            e.e(
              {
                a: e.p({ title: "申请发票", nativeMode: !0 }),
                b: -1 != e.unref(S),
              },
              -1 != e.unref(S)
                ? e.e(
                    {
                      c: e.t(e.unref(G).invoiceTitle),
                      d: "person" == e.unref(G).titleType,
                    },
                    "person" == e.unref(G).titleType
                      ? { e: e.t(e.unref(G).uniformSocialCode) }
                      : { f: e.t(e.unref(G).taxPayerId) },
                  )
                : {},
              { g: -1 == e.unref(S) },
              (e.unref(S), {}),
              {
                h: e.o((e) => {
                  s.value.showDialog();
                }),
                i: "T" == e.unref(c),
              },
              "T" == e.unref(c)
                ? { j: 2 == e.unref(b) ? 1 : "", k: e.o((e) => k(2)) }
                : {},
              { l: "T" == e.unref(v) },
              "T" == e.unref(v)
                ? { m: 1 == e.unref(b) ? 1 : "", n: e.o((e) => k(1)) }
                : {},
              { o: 1 == e.unref(b) },
              1 == e.unref(b)
                ? e.e(
                    { p: -1 != e.unref(w) },
                    -1 != e.unref(w)
                      ? {
                          q: e.t(e.unref(V).province),
                          r: e.t(e.unref(V).city),
                          s: e.t(e.unref(V).address),
                          t: e.t(e.unref(V).receiver),
                          v: e.t(e.unref(V).mobile.substring(0, 3)),
                          w: e.t(e.unref(V).mobile.substring(7, 11)),
                        }
                      : {},
                    { x: -1 == e.unref(w) },
                    (e.unref(w), {}),
                    {
                      y: e.o((e) => {
                        f.value.showDialog();
                      }),
                    },
                  )
                : {},
              { z: 2 == e.unref(b) },
              2 == e.unref(b)
                ? {
                    A: e.unref(g),
                    B: e.o((r) =>
                      e.isRef(g)
                        ? (g.value = r.detail.value)
                        : (g = r.detail.value),
                    ),
                  }
                : {},
              { C: 2 == e.unref(b) },
              (e.unref(b), {}),
              { D: 1 == e.unref(b) },
              (e.unref(b), {}),
              {
                E: e.o((t) =>
                  (() => {
                    if (-1 == S.value) return o.jAlert3("请选择发票抬头"), !1;
                    if (2 == b.value && !g.value)
                      return o.jAlert3("请输入邮箱"), !1;
                    if (1 == b.value && -1 == w.value)
                      return o.jAlert3("请选择收货地址"), !1;
                    let t = {
                      hotelCode: a.hotelCode,
                      hotelGroupCode: a.hotelGroupCode,
                      memberId: n.memberId,
                      orderNo: T.value,
                      orderType: y.value,
                      receiveWay: b.value,
                      receiverAddress: V.province + V.city + V.address,
                      receiverEmail: g.value,
                      receiverMobile: V.mobile,
                      receiverName: V.receiver,
                    };
                    r.api
                      .applyInvoice(t)
                      .then((r) => {
                        1 == r.result
                          ? 0 == r.retVal.resultCode
                            ? e.index.navigateTo({
                                url: `/pagesF/invoice/finishSucceed?type=success&orderNo=${T.value}&productType=${j.value}`,
                              })
                            : o.jAlert3(r.retVal.resultMessage)
                          : o.jAlert3(r.msg);
                      })
                      .finally((e) => {});
                  })(),
                ),
                F: e.o((e) => N("/pagesF/invoice/invoiceInfo?type=add")),
                G: e.f(e.unref(A), (r, o, t) =>
                  e.e(
                    {
                      a: e.o(
                        (e) =>
                          N(
                            "/pagesF/invoice/invoiceInfo?editItem=" +
                              encodeURIComponent(JSON.stringify(r)) +
                              "&type=edit",
                          ),
                        o,
                      ),
                      b: e.t(r.invoiceTitle),
                      c: "person" == r.titleType,
                    },
                    "person" == r.titleType
                      ? { d: e.t(r.uniformSocialCode) }
                      : { e: e.t(r.taxPayerId) },
                    { f: o == e.unref(S) },
                    (e.unref(S), {}),
                    {
                      g: e.o((e) => {
                        M(r);
                      }, o),
                      h: o,
                    },
                  ),
                ),
                H: e.o((e) => {
                  s.value.hideDialog();
                }),
                I: e.sr(s, "59294620-1", { k: "checkIn" }),
                J: e.p({ title: "选择开票信息" }),
                K: e.o(F),
                L: e.f(x.value, (r, o, t) =>
                  e.e(
                    {
                      a: e.o((e) => F(r), o),
                      b: e.t(r.receiver),
                      c: e.t(r.mobile.substring(0, 3)),
                      d: e.t(r.mobile.substring(7, 11)),
                      e: e.t(r.address),
                      f: r.id == e.unref(w),
                    },
                    (r.id, e.unref(w), {}),
                    {
                      g: e.o(
                        (e) =>
                          ((e) => {
                            for (let r = 0; r < x.value.length; r++)
                              if (x.value[r].id == e.id) {
                                (w.value = e.id),
                                  (V = Object.assign(V, x.value[r])),
                                  e.email && (g.value = e.email);
                                break;
                              }
                          })(r),
                        o,
                      ),
                      h: o,
                    },
                  ),
                ),
                M: e.o((e) => {
                  f.value.hideDialog();
                }),
                N: e.sr(f, "59294620-2", { k: "checkAddress" }),
                O: e.p({ title: "选择收件地址" }),
              },
            )
        );
      },
    });
  wx.createPage(a);
})();
