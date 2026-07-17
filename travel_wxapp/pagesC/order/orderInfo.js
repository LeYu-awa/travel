!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    a = require("../../utils/api.js"),
    r = require("../../base/jAlert/jAlert.js"),
    t = require("../../utils/wxuser.js"),
    u = require("../../utils/filter.js"),
    l = require("../../utils/utils.js");
  Array || e.resolveComponent("mp-html")(),
    Math ||
      (
        o +
        f +
        (() => "../../uni_modules/mp-html/components/mp-html/mp-html.js") +
        v +
        n +
        s
      )();
  const o = () => "../../components/coustomHead.js",
    n = () => "../../components/kfDialog.js",
    f = () => "../../components/linkItem.js",
    v = () => "../../components/bottomDialog.js",
    s = () => "../../components/new/OrderCancelDialog.js",
    d = e.defineComponent({
      __name: "orderInfo",
      setup(o) {
        let n = t.getStorage("user"),
          f = t.getStorage("config");
        const v = e.ref("");
        let s = e.ref({}),
          d = e.ref({}),
          i = e.ref(""),
          p = e.ref("F"),
          m = e.ref(),
          c = e.ref(),
          h = e.ref(),
          S = e.ref("NI");
        const y = e.ref("60");
        let g = e.ref(""),
          C = e.reactive({
            "01": "身份证",
            "02": "临时身份证",
            14: "护照",
            21: "港澳通行证",
          });
        const R = e.ref(!1);
        let T = e.ref([]),
          D = e.ref({}),
          I = e.ref({}),
          F = e.ref(0),
          G = e.ref(0),
          N = e.ref(0),
          b = e.ref(0),
          j = e.ref(0),
          P = e.ref(0),
          A = e.ref(0),
          L = e.ref(0),
          w = e.ref(0),
          V = e.ref(0),
          x = e.ref(0),
          M = e.ref(0);
        const H = e.ref(""),
          _ = e.ref(null);
        e.ref();
        const k = (e) => {
            const a = Math.floor(e / 3600),
              r = Math.floor((e % 3600) / 60),
              t = e % 60;
            return `剩余${String(a).padStart(2, "0")}小时${String(r).padStart(
              2,
              "0",
            )}分${String(t).padStart(2, "0")}秒`;
          },
          q = () => {
            "CI" == S.value
              ? e.index.navigateTo({
                  url: `/pagesF/invoice/applyInvoice?orderNo=${v.value}&orderType=R&productType=hotel`,
                })
              : e.index.navigateTo({
                  url: `/pagesF/invoice/invoiceDetails?orderNo=${v.value}&orderType=R&productType=hotel`,
                });
          },
          O = () => {
            R.value = !0;
          },
          X = () => {
            e.index.redirectTo({
              url: `/pagesB/other/pay?orderNo=${s.value.crsNo}&productType=hotel`,
            });
          };
        let B = e.reactive([{ name: "预订政策", type: "dialog" }]);
        const E = (e) => {
            "dialog" == e.type && c.value.showDialog();
          },
          U = () => {
            m.value.showDialog();
          };
        e.onPageScroll((e) => {});
        const $ = e.computed(() => {
            var e = new Date(s.value.arr.replace(/\-/g, "/")).getTime(),
              a = new Date(s.value.dep.replace(/\-/g, "/")).getTime() - e;
            return Math.round(a / 864e5);
          }),
          z = e.computed(() => {
            let e = "",
              a = "";
            return (
              "R" == s.value.sta &&
                2 !== I.value.paySta &&
                ((e = "待付款"), (a = "请尽快完成支付。")),
              "R" == s.value.sta &&
                2 == I.value.paySta &&
                ((e = "待出行"), (a = "松赞期待与您相遇。")),
              "I" == s.value.sta &&
                ((e = "出行中"), (a = "松赞祝您旅途愉快。")),
              "O" == s.value.sta &&
                ((e = "已完成"), (a = "松赞感谢您的支持。")),
              "X" == s.value.sta &&
                ((e = "已取消"), (a = "松赞期待与您相遇。")),
              "N" == s.value.sta &&
                ((e = "预订未到店"), (a = "松赞期待与您相遇。")),
              "S" == s.value.sta &&
                ((e = "已挂账"), (a = "松赞期待与您相遇。")),
              "W" == s.value.sta &&
                ((e = "待处理"), (a = "松赞期待与您相遇。")),
              { topSta: e, subSta: a }
            );
          }),
          W = () => {
            a.api
              .showOrder({ orderNo: v.value, hotelGroupCode: f.hotelGroupCode })
              .then((e) => {
                var t;
                1 == e.result
                  ? ((s.value = e.retVal),
                    (i.value = s.value.hotelCode),
                    "000" !== s.value.memberLevel && n && n.memberId && J(),
                    K(),
                    (t = {
                      gcRsvNo: s.value.crsNo,
                      hotelGroupCode:
                        s.value.hotelGroupCode || f.hotelGroupCode,
                      miniAppid: f.appid,
                      miniHotelCode: 0,
                      productHotelCode: s.value.hotelCode,
                      productCode: s.value.productCode,
                    }),
                    a.api.getCancelRule(l.createUrl(t)).then((e) => {
                      1 == e.result && (h.value = e.retVal.cancelRule),
                        console.log(e);
                    }),
                    a.api
                      .getOrderInvoiceSta({
                        hotelCode: s.value.hotelCode,
                        hotelGroupCode: f.hotelGroupCode,
                        orderNo: s.value.crsNo,
                        orderType: "R",
                      })
                      .then((e) => {
                        1 == e.result &&
                          ((S.value = e.retVal.invoiceSta),
                          "HI" == S.value &&
                            a.api
                              .getInvoiceOrder({
                                hotelCode: s.value.hotelCode,
                                hotelGroupCode: f.hotelGroupCode,
                                orderNo: v.value,
                                orderType: "R",
                              })
                              .then((e) => {
                                1 == e.result &&
                                  0 == e.retVal.resultCode &&
                                  ((D.value = e.retVal.orderInvoice),
                                  D.value.eiinvoicePdfUrl &&
                                    T.value.push({
                                      name: "发票",
                                      url: D.value.eiinvoicePdfUrl,
                                    })),
                                  console.log(e);
                              }));
                      }),
                    s.value.leftTimeSeconds &&
                      "2" != I.value.paySta &&
                      "R" == s.value.sta &&
                      ((H.value = k(s.value.leftTimeSeconds)),
                      (_.value = setInterval(() => {
                        s.value.leftTimeSeconds > 0
                          ? (s.value.leftTimeSeconds--,
                            (H.value = k(s.value.leftTimeSeconds)))
                          : ((H.value = ""), clearInterval(_.value));
                      }, 1e3))))
                  : r.jAlert3(e.msg);
              });
          },
          J = () => {
            a.api
              .getAllCardLevel({
                isPhysical: "F",
                hotelGroupId: f.hotelGroupId,
                hotelGroupCode: f.hotelGroupCode,
                cardType: s.value.cardType,
              })
              .then((e) => {
                1 == e.result &&
                  e.retVal.listLevelDto &&
                  e.retVal.listLevelDto.length > 0 &&
                  e.retVal.listLevelDto.forEach((e) => {
                    e.code == s.value.cardLevel &&
                      (g.value = `已享受${e.descript}会员价`);
                  });
              });
          },
          K = () => {
            a.api
              .hotelInfo({
                channel: "wechat",
                hotelCode: i.value,
                hotelGroupCode: s.value.hotelGroupCode || f.hotelGroupCode,
              })
              .then((e) => {
                1 == e.result ? (d.value = e.retVal) : r.jAlert3(e.msg);
              });
          };
        return (
          e.onUnload(() => {
            clearInterval(_.value);
          }),
          e.onLoad((e) => {
            v.value = e.orderNo;
          }),
          e.onShow(() => {
            clearInterval(_.value),
              e.index.getSystemInfo({
                success: (e) => {
                  y.value = e.statusBarHeight + 60;
                },
                fail(e) {
                  console.log(e);
                },
              }),
              (T.value = []),
              W(),
              (() => {
                let e = {
                  unitCode: f.hotelGroupCode,
                  orderNo: v.value,
                  memberId: n.memberId,
                };
                a.api
                  .interfaceTransfer({
                    query: e,
                    config: {
                      interfaceType: "POST",
                      interfaceModule: "GC_TRAVEL_ORDER",
                      interfaceMethod: "/api/reserve/order/queryPayDetail",
                      interfaceFrom: "GC",
                      hotelGroupCode: f.hotelGroupCode,
                    },
                  })
                  .then((e) => {
                    1 == e.result &&
                      0 == e.retVal.result &&
                      ((I.value = e.retVal.retVal),
                      (G.value = I.value.rateSum),
                      (N.value = I.value.couponRateSum || 0),
                      I.value.travelRateSumDto &&
                        I.value.travelRateSumDto.singleRoomRateSum &&
                        (j.value = I.value.travelRateSumDto.singleRoomRateSum),
                      I.value.travelRateSumDto &&
                        I.value.travelRateSumDto.addBedSum &&
                        (P.value = I.value.travelRateSumDto.addBedSum),
                      I.value.travelRateSumDto &&
                        I.value.travelRateSumDto.addBfSum &&
                        (A.value = I.value.travelRateSumDto.addBfSum),
                      I.value.travelRateSumDto &&
                        I.value.travelRateSumDto.upRmTypeSum &&
                        (L.value = I.value.travelRateSumDto.upRmTypeSum),
                      I.value &&
                        I.value.exchangeRateSum &&
                        (x.value = I.value.exchangeRateSum),
                      I.value && I.value.point && (M.value = I.value.point),
                      (w.value = I.value.breakMoney),
                      (b.value = I.value.gwDiscount),
                      (V.value = G.value - N.value - b.value),
                      (F.value =
                        G.value - j.value - A.value - P.value - L.value),
                      (I.value.allRateSum = Number(
                        (I.value.couponRateSum + I.value.gwDiscount).toFixed(2),
                      )));
                  });
              })();
          }),
          (a, t) => {
            return e.e(
              { a: e.unref(s) && e.unref(s).hotelCode },
              e.unref(s) && e.unref(s).hotelCode
                ? e.e(
                    {
                      b: e.p({
                        color: "#fff",
                        title: "订单详情",
                        customClass:
                          "X" == e.unref(s).sta ? "" : "customPattern",
                        bgColor: "X" == e.unref(s).sta ? "#7f7d75" : "",
                      }),
                      c: e.t(z.value.topSta),
                      d: e.t(H.value ? H.value : z.value.subSta),
                      e: "X" == e.unref(s).sta ? 1 : "",
                      f: y.value + "px",
                      g: e.unref(s).logoUrl
                        ? e.unref(s).logoUrl
                        : "https://dsplatweb.oss-cn-chengdu.aliyuncs.com/songzan/images/defaultImage.png",
                      h: e.t(e.unref(s).hotelDescript),
                      i: e.t(e.unref(s).roomDescript),
                      j: e.t(e.unref(u.timeFilterMD)(e.unref(s).arr)),
                      k: e.t(e.unref(u.timeFilterMD)(e.unref(s).dep)),
                      l: e.t($.value),
                      m: e.t(e.unref(s).rmnum),
                      n: e.f(e.unref(s).guestList, (a, r, t) => ({
                        a: e.t(0 == r ? "入住人" : ""),
                        b: e.t(a.name),
                        c: e.t(e.unref(C)[a.idCode]),
                        d: e.t(e.unref(u.hideIdCard)(a.idNo, a.idCode)),
                        e: e.t(a.mobile),
                        f: r,
                      })),
                      o: e.t(
                        ((o = e.unref(s).arrStr), e.dayjs(o).format("HH:mm")),
                      ),
                      p: "T" != e.unref(p),
                    },
                    "T" != e.unref(p)
                      ? e.e(
                          {
                            q: e.t(e.unref(u.valFormat)(e.unref(G))),
                            r: e.unref(M) > 0,
                          },
                          e.unref(M) > 0
                            ? { s: e.t(e.unref(u.valFormat)(e.unref(M))) }
                            : {},
                        )
                      : {},
                    { t: "T" == e.unref(p) },
                    "T" == e.unref(p)
                      ? e.e(
                          {
                            v: e.t(e.unref(u.valFormat)(e.unref(G))),
                            w: e.unref(M) > 0,
                          },
                          e.unref(M) > 0
                            ? { x: e.t(e.unref(u.valFormat)(e.unref(M))) }
                            : {},
                          { y: "CASH" == e.unref(I).payType },
                          ("CASH" == e.unref(I).payType ||
                            "INTEGRALCASH" == e.unref(I).payType ||
                            e.unref(I).payType,
                          {}),
                          {
                            z: "INTEGRALCASH" == e.unref(I).payType,
                            A: "INTEGRAL" == e.unref(I).payType,
                            B: e.unref(G) > 0,
                          },
                          e.unref(G) > 0
                            ? e.e(
                                { C: e.unref(g) },
                                e.unref(g) ? { D: e.t(e.unref(g)) } : {},
                                { E: e.t(e.unref(u.valFormat)(e.unref(F))) },
                              )
                            : {},
                          { F: e.unref(j) > 0 },
                          e.unref(j) > 0 ? { G: e.t(e.unref(j)) } : {},
                          { H: e.unref(P) > 0 },
                          e.unref(P) > 0 ? { I: e.t(e.unref(P)) } : {},
                          { J: e.unref(A) > 0 },
                          e.unref(A) > 0
                            ? { K: e.t(e.unref(u.valFormat)(e.unref(A))) }
                            : {},
                          { L: e.unref(L) > 0 },
                          e.unref(L) > 0
                            ? { M: e.t(e.unref(u.valFormat)(e.unref(L))) }
                            : {},
                          { N: e.unref(I).allRateSum > 0 },
                          e.unref(I).allRateSum > 0
                            ? e.e(
                                {
                                  O: e.t(
                                    e.unref(u.valFormat)(e.unref(I).allRateSum),
                                  ),
                                  P:
                                    e.unref(I).couponSimpleInfoDtoList &&
                                    e.unref(I).couponSimpleInfoDtoList.length >
                                      0,
                                },
                                e.unref(I).couponSimpleInfoDtoList &&
                                  e.unref(I).couponSimpleInfoDtoList.length > 0
                                  ? {
                                      Q: e.f(
                                        e.unref(I).couponSimpleInfoDtoList,
                                        (a, r, t) =>
                                          e.e(
                                            {
                                              a: e.t(a.descript),
                                              b: a.num > 1,
                                            },
                                            a.num > 1 ? { c: e.t(a.num) } : {},
                                            {
                                              d: e.t(
                                                e.unref(u.valFormat)(
                                                  a.realValue,
                                                ),
                                              ),
                                              e: r,
                                            },
                                          ),
                                      ),
                                    }
                                  : {},
                                { R: e.unref(b) > 0 },
                                e.unref(b) > 0
                                  ? { S: e.t(e.unref(u.valFormat)(e.unref(b))) }
                                  : {},
                              )
                            : {},
                          {
                            T: e.t(e.unref(u.valFormat)(e.unref(V))),
                            U: e.unref(M) > 0,
                          },
                          e.unref(M) > 0
                            ? { V: e.t(e.unref(u.valFormat)(e.unref(M))) }
                            : {},
                          {
                            W:
                              e.unref(I).alreadyPayFund +
                                e.unref(I).alreadyPayMember >
                              0,
                          },
                          e.unref(I).alreadyPayFund +
                            e.unref(I).alreadyPayMember >
                            0
                            ? {
                                X: e.t(
                                  e.unref(u.valFormat)(
                                    e.unref(I).alreadyPayFund +
                                      e.unref(I).alreadyPayMember,
                                  ),
                                ),
                              }
                            : {},
                          {
                            Y:
                              2 != e.unref(I).paySta &&
                              e.unref(I).readyPay > 0 &&
                              "X" !== e.unref(s).sta,
                          },
                          2 != e.unref(I).paySta &&
                            e.unref(I).readyPay > 0 &&
                            "X" !== e.unref(s).sta
                            ? {
                                Z: e.t(
                                  e.unref(u.valFormat)(e.unref(I).readyPay),
                                ),
                              }
                            : {},
                          { aa: e.unref(w) },
                          e.unref(w)
                            ? {
                                ab: e.t(e.unref(u.valFormat)(e.unref(w))),
                                ac: e.t(e.unref(u.valFormat)(e.unref(w))),
                              }
                            : {},
                        )
                      : {},
                    { ad: "F" == e.unref(p) },
                    "F" == e.unref(p)
                      ? {
                          ae: e.o((a) =>
                            e.isRef(p) ? (p.value = "T") : (p = "T"),
                          ),
                        }
                      : {
                          af: e.o((a) =>
                            e.isRef(p) ? (p.value = "F") : (p = "F"),
                          ),
                        },
                    {
                      ag: e.t(e.unref(s).crsNo),
                      ah: e.o((a) =>
                        ((a) => {
                          e.index.setClipboardData({
                            data: a,
                            success: function () {
                              r.jAlert3("复制成功");
                            },
                          });
                        })(e.unref(s).crsNo),
                      ),
                      ai: e.t(e.unref(s).createDatetime),
                      aj: e.t(e.unref(s).crsPayDatetime),
                      ak: e.t(e.unref(s).rsvMan),
                      al: e.t(e.unref(s).mobile),
                      am: e.unref(T).length > 0,
                    },
                    e.unref(T).length > 0
                      ? {
                          an: e.f(e.unref(T), (a, r, t) => ({
                            a: e.t(a.name),
                            b: r,
                            c: e.o((r) => e.unref(l.goPage)(a.url), r),
                          })),
                        }
                      : {},
                    {
                      ao: e.f(e.unref(B), (a, r, t) => ({
                        a: r,
                        b: e.o(E, r),
                        c: "5e969fe2-1-" + t,
                        d: e.p({ linkItem: a }),
                      })),
                      ap: "R" == e.unref(s).sta,
                    },
                    "R" == e.unref(s).sta
                      ? e.e(
                          { aq: e.o(O), ar: "2" != e.unref(I).paySta },
                          "2" != e.unref(I).paySta ? { as: e.o(X) } : {},
                        )
                      : {},
                    { at: "X" == e.unref(s).sta },
                    "X" == e.unref(s).sta ? { av: e.o(U) } : {},
                    { aw: "O" == e.unref(s).sta },
                    "O" == e.unref(s).sta
                      ? e.e(
                          { ax: e.o(U), ay: "NI" !== e.unref(S) },
                          "NI" !== e.unref(S) ? { az: e.o(q) } : {},
                        )
                      : {},
                    {
                      aA: e.p({ content: e.unref(h) }),
                      aB: e.sr(c, "5e969fe2-2", { k: "ruleCompent" }),
                      aC: e.p({ title: "预订政策" }),
                      aD: e.sr(m, "5e969fe2-4", { k: "kf" }),
                      aE: e.p({ title: "如需取消订单请联系客服" }),
                      aF: e.o((e) => (R.value = e)),
                      aG: e.p({
                        orderNo: v.value,
                        productType: "hotel",
                        show: R.value,
                      }),
                    },
                  )
                : {},
            );
            var o;
          }
        );
      },
    });
  d.__runtimeHooks = 1;
  const i = e._export_sfc(d, [["__scopeId", "data-v-5e969fe2"]]);
  wx.createPage(i);
})();
