!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    o = require("../../utils/api.js"),
    r = require("../../utils/wxuser.js"),
    t = require("../../utils/utils.js"),
    a = require("../../hooks/useScroll.js"),
    n = require("../../utils/filter.js"),
    u = require("../../utils/helper.js");
  Array || e.resolveComponent("FloatButtonKf")(),
    Math || (l + i + s + h + d + c + p)();
  const s = () => "../../components/switchBar.js",
    i = () => "../../components/searchInput.js",
    l = () => "../../components/coustomHead.js",
    c = () => "../../components/exchangeDialog.js",
    d = () => "../../components/kfDialog.js",
    p = () => "../../components/new/OrderCancelDialog.js",
    h = () => "../../components/empty.js",
    v = e.defineComponent({
      __name: "orderList",
      setup(s) {
        const i = {
            freetravel: "旅行",
            butcustom: "旅行",
            themegroup: "旅行",
            destpack: "目的地套餐",
            room: "酒店",
            custom: "私人定制",
            shop: "通兑券",
            activity: "Fun肆玩",
            pack: "组合",
            spa: "餐饮",
            travelroom: "酒店",
          },
          l = e.ref({
            room: "hotel",
            custom: "Custom",
            destpack: "DestPackage",
            butcustom: "ButlerCustomized",
            freetravel: "FreeTravel",
            themegroup: "ThemeGroup",
            shop: "shop",
            activity: "activity",
            travelroom: "SingleRoom",
          }),
          c = e.ref(!1),
          d = e.ref(),
          { scrollTop: p, onPageScroll: h } = a.useScroll();
        let v = e.ref(!0),
          m = r.getStorage("config"),
          f = r.getStorage("user"),
          g = e.reactive(r.getStorage("wxuser")),
          y = e.ref(0),
          S = e.ref(8),
          w = e.ref(1),
          C = e.ref([]),
          T = e.ref([]),
          I = e.ref(!1),
          N = e.ref(0),
          b = e.ref(""),
          P = e.ref(),
          D = e.ref(),
          k = e.reactive([
            { name: "全部", active: !0, value: "" },
            { name: "待签约", active: !1, value: "8" },
            { name: "待付款", active: !1, value: "1" },
            { name: "退款/售后", active: !1, value: "2,4" },
          ]),
          x = e.reactive([
            { name: "全部", active: !0, value: "1" },
            { name: "待付款", active: !1, value: "2" },
            { name: "待发货", active: !1, value: "3" },
            { name: "待收货", active: !1, value: "4" },
            { name: "待评价", active: !1, value: "5" },
            { name: "退款/售后", active: !1, value: "6" },
          ]),
          A = e.ref(!1),
          L = e.ref(""),
          G = e.reactive([
            { name: "酒旅订单", value: 1, active: !0 },
            { name: "风物订单", value: 2, active: !1 },
          ]),
          B = e.ref(1);
        const j = (e) => {
            o.api
              .shopOrderDetail({
                equipment: m.equipment,
                hotelGroupCode: m.hotelGroupCode,
                hotelGroupId: m.hotelGroupId,
                id: e,
              })
              .then((e) => {
                if (1 == e.result) {
                  let r = 0,
                    a = !1,
                    n = e.retVal.listShopOrderItemVO[0].counponList,
                    u = [],
                    s = [],
                    i = [],
                    l = [],
                    c = {
                      hotelGroupCode: m.hotelGroupCode,
                      unitCode: m.hotelGroupCode,
                    };
                  n.forEach((e) => {
                    "I" == e.couponSta &&
                      (r++,
                      e.couponCodeUseConfigProductDtoList.forEach((e) => {
                        "Custom" == e.orderType && (a = !0),
                          "4" == e.type && s.push(e.productCode),
                          "3" == e.type && l.push(e.productCode),
                          "2" == e.type &&
                            "Custom" != e.productPrimaryClassification &&
                            u.push(e.productPrimaryClassification),
                          "1" == e.type && i.push(e.productCode);
                      }));
                  }),
                    u.length > 0 && (c.categorySubs = u),
                    l.length > 0 && (c.itineraryCodes = l),
                    i.length > 0 && (c.travelTypes = i),
                    s.length > 0 && (c.travelGroupCodes = s),
                    a
                      ? o.api
                          .interfaceTransfer({
                            query: c,
                            config: {
                              interfaceType: "POST",
                              interfaceModule: "GC_PRODUCT_JOURNEY",
                              interfaceMethod:
                                "/api/travelGroup/listTravelProductForWechatTdqV2",
                              interfaceFrom: "GC",
                              hotelGroupCode: m.hotelGroupCode,
                            },
                          })
                          .then((e) => {
                            1 == e.result &&
                              0 == e.retVal.result &&
                              (e.retVal.retVal && e.retVal.retVal.length > 0
                                ? 1 == r
                                  ? t.goPage(
                                      "/pagesB/exchangeCoupon/exchangeList?couponNo=" +
                                        n[0].couponNo,
                                    )
                                  : P.value.showDialog()
                                : D.value.showDialog());
                          })
                      : 1 == r
                        ? t.goPage(
                            "/pagesB/exchangeCoupon/exchangeList?couponNo=" +
                              n[0].couponNo,
                          )
                        : P.value.showDialog();
                }
              });
          },
          F = () => {
            const r = {
              freetravel: "icon-travel-line",
              butcustom: "icon-travel-line",
              themegroup: "icon-travel-line",
              destpack: "icon-a-12_jiudiantaocan_hui",
              room: "icon-a-12_jiudian_hei",
              custom: "icon-a-16_dingzhilvhang_hei",
              shop: "icon-exchange-coupon",
              activity: "icon-activity-line",
              pack: "icon-a-12_jiudiantaocan_hui",
              spa: "icon-a-16_quanbulvhang",
              travelroom: "icon-a-12_jiudian_hei",
            };
            if (A.value) return !1;
            (A.value = !0), e.index.showLoading({ title: "加载中" });
            let a = "",
              n = "",
              u = "";
            f && f.mobile && ((n = f.memberId), (u = f.memberToken || "")),
              g && g.openid && (a = g.openid);
            let s = {
              firstResult: y.value,
              mobile: "",
              channel: "",
              orderStatus: L.value,
              payStatus: "",
              pageSize: S.value,
              openid: a,
              memberid: n,
              hotelGroupCode: m.hotelGroupCode,
              searchword: O.value,
              memberToken: u,
              version: "1.0.1",
            };
            o.api.orderAggregation(s).then((o) => {
              if (((A.value = !1), 1 == o.result)) {
                let e = {
                  1: "待付款",
                  2: "已退款",
                  3: "待出行",
                  4: "退款中",
                  5: "已取消",
                  7: "待评价",
                  8: "待签约",
                  9: "已完成",
                  11: "出行中",
                };
                o.retVal.orderList.forEach((o, a) => {
                  var n;
                  if (
                    ("7" == o.orderStatus && (o.orderStatus = "9"),
                    (o.channelDesc = i[o.channel]),
                    (o.iconfont = r[o.channel]),
                    (null == (n = o.iconfont)
                      ? void 0
                      : n.startsWith("st-icon")) && (o.isNewIconfont = !0),
                    (o.orderStaDesc = e[o.orderStatus]),
                    ("shop" != o.channel && "activity" != o.channel) ||
                      3 != o.orderStatus ||
                      (o.orderStaDesc = "待使用"),
                    ("1" != o.orderStatus && "8" != o.orderStatus) ||
                      (o.enhanceSta = !0),
                    (o.webPay = 0),
                    (o.num = 0),
                    (o.activityDate = ""),
                    (o.rateSum = o.price),
                    o.extraJson)
                  ) {
                    let e = JSON.parse(o.extraJson);
                    [
                      "butcustom",
                      "freetravel",
                      "themegroup",
                      "destpack",
                    ].includes(o.channel) &&
                      (o.itineraryDesc = `${e.orderTypeDesc} · ${e.itineraryName}`),
                      e.webPay && (o.webPay = Number(e.webPay)),
                      e.num && (o.num = e.num),
                      e.activityDate && (o.activityDate = e.activityDate),
                      e.prepayHoldSeconds &&
                        o.enhanceSta &&
                        0 === o.webPay &&
                        ((o.countdown = e.prepayHoldSeconds),
                        (o.countTime = _(o.countdown))),
                      e.couponNo && (o.couponNo = e.couponNo),
                      e.rateSum &&
                        ((o.price = e.rateSum), (o.rateSum = e.rateSum)),
                      (e.dscAmount > 0 || e.dscAmount < 0) &&
                        (o.price = t.subtraction(
                          Number(o.price),
                          Number(e.dscAmount),
                        )),
                      e.webPay < o.price &&
                        (o.needPay = t.subtraction(
                          Number(o.price),
                          Number(e.webPay),
                        ));
                  }
                  ["8"].includes(o.orderStatus) && (o.showSign = !0),
                    [
                      "freetravel",
                      "butcustom",
                      "themegroup",
                      "destpack",
                    ].includes(o.channel) &&
                      !o.isOrderGuestFinish &&
                      (o.isNeedAddContact = !0),
                    ["8", "3"].includes(o.orderStatus) &&
                      o.isNeedAddContact &&
                      (o.isShowAddContactBtn = !0),
                    ["2", "3", "4", "5", "9"].includes(o.orderStatus) ||
                    o.isShowAddContactBtn
                      ? (o.showKf = !0)
                      : ["2", "3", "4", "5", "7", "9"].includes(
                          o.orderStatus,
                        ) || (o.showCancel = !0),
                    ["1"].includes(o.orderStatus) && (o.showPay = !0),
                    ["3"].includes(o.orderStatus) &&
                      ["shop"].includes(o.channel) &&
                      (o.showExchange = !0),
                    ["9"].includes(o.orderStatus) &&
                      o.extraJson &&
                      "1" == JSON.parse(o.extraJson).invoiceStaV2 &&
                      (o.showInvoice = !0),
                    ["3"].includes(o.orderStatus) &&
                      [
                        "custom",
                        "destpack",
                        "butcustom",
                        "freetravel",
                        "themegroup",
                      ].includes(o.channel) &&
                      o.extraJson &&
                      "F" == JSON.parse(o.extraJson).isTransfer &&
                      (o.showTransfer = !0);
                }),
                  (C.value = C.value.concat(o.retVal.orderList)),
                  (y.value += S.value);
              }
              e.index.stopPullDownRefresh(), e.index.hideLoading();
            });
          },
          _ = (e) => {
            const o = Math.floor(e / 3600),
              r = Math.floor((e % 3600) / 60),
              t = e % 60;
            return `${String(o).padStart(2, "0")}:${String(r).padStart(
              2,
              "0",
            )}:${String(t).padStart(2, "0")}`;
          };
        e.onUnload(() => {
          clearInterval(N.value);
        });
        const O = e.ref(""),
          q = e.ref("订单查询"),
          V = (e) => {
            e > 0 && t.goWmUrl("orderList");
          },
          $ = (e) => {
            if (A.value) return !1;
            k.forEach((e) => {
              e.active = !1;
            }),
              (k[e].active = !0),
              (L.value = k[e].value),
              M();
          },
          E = () => {},
          J = (e) => {
            M();
          },
          R = () => {
            M();
          },
          M = () => {
            (C.value = []), (y.value = 0), F();
          },
          z = () => {
            (T.value = []), (w.value = 1), U();
          },
          U = () => {
            e.index.showLoading({ title: "加载中" }),
              o.api
                .shopOrderListSearch({
                  hotelCode: m.hotelCode,
                  hotelGroupCode: m.hotelGroupCode,
                  pageNum: w.value,
                  pageSize: 100,
                  queryWmcShopOrderListParam: {
                    keyword: "",
                    mobile: f.mobile,
                    orderDomains: [1, 2, 3],
                    queryTime: {
                      endTime: e.dayjs().valueOf(),
                      startTime: e.dayjs().subtract(30, "days").valueOf(),
                    },
                  },
                })
                .then((o) => {
                  (I.value = !0),
                    1 == o.result &&
                      o.retVal.code &&
                      0 == o.retVal.code.errcode &&
                      o.retVal.data &&
                      o.retVal.data.pageList.length > 0 &&
                      (o.retVal.data.pageList.forEach((e) => {
                        var o;
                        (null == (o = e.orderInfo.orderBaseInfo)
                          ? void 0
                          : o.autoCancelTime) &&
                          (e.countDown =
                            e.orderInfo.orderBaseInfo.autoCancelTime / 1e3),
                          (e.price = 0),
                          e.orderInfo.payInfo.shouldPayAmount &&
                            ((e.price = e.orderInfo.payInfo.shouldPayAmount),
                            e.orderInfo.payInfo.payAmount <
                              e.orderInfo.payInfo.shouldPayAmount &&
                              ((e.needPay = t.subtraction(
                                Number(e.orderInfo.payInfo.shouldPayAmount),
                                Number(e.orderInfo.payInfo.payAmount),
                              )),
                              (e.webPay = e.orderInfo.payInfo.payAmount))),
                          (e.orderStatus =
                            e.orderInfo.orderBaseInfo.orderStatus + ""),
                          9 == e.orderStatus && (e.invalid = !0),
                          (e.orderStaDesc = {
                            0: "待付款",
                            1: "待付款",
                            2: "待发货",
                            3: "待发货",
                            4: "待发货",
                            5: "待收货",
                            7: "已完成",
                            8: "已完成",
                            9: "已取消",
                          }[e.orderInfo.orderBaseInfo.orderStatus]),
                          e.orderInfo.items.length > 0 &&
                            ((e.title = e.orderInfo.items[0].goodsTitle),
                            (e.link = e.orderInfo.items[0].imageUrl),
                            (e.orderTimeStr =
                              e.orderInfo.items[0].skuAttrInfo)),
                          ["0", "1"].includes(e.orderStatus) &&
                            (e.showPay = !0),
                          ["3", "4", "5"].includes(e.orderStatus) &&
                            (e.showAfterSales = !0),
                          ["3", "4", "5"].includes(e.orderStatus) &&
                            (e.showConfirm = !0),
                          ["7"].includes(e.orderStatus) && (e.showCommit = !0),
                          ["7", "8"].includes(e.orderStatus),
                          ["7", "8", "9"].includes(e.orderStatus) &&
                            (e.showBook = !0);
                      }),
                      (T.value = T.value.concat(o.retVal.data.pageList)),
                      (w.value += 1)),
                    e.index.hideLoading();
                });
          };
        e.onMounted(() => {
          W(),
            (N.value = setInterval(function () {
              C.value.forEach((e) => {
                e.countdown > 0 &&
                  ((e.countTime = _(e.countdown)),
                  (e.countdown = e.countdown - 1));
              }),
                T.value.forEach((e) => {
                  e.countdown > 0 &&
                    ((e.countTime = _(e.countdown)),
                    (e.countdown = e.countdown - 1));
                });
            }, 1e3));
        }),
          e.onPullDownRefresh(() => {
            setTimeout(() => {
              W(), e.index.stopPullDownRefresh();
            }, 1e3);
          });
        const W = () => {
          1 == B.value && M(), 2 == B.value && z();
        };
        return (
          h((e) => {
            p.value = e.scrollTop;
          }),
          e.onReachBottom(() => {
            1 == B.value ? F() : U();
          }),
          e.onShow(() => {
            1 == B.value && C.value.length > 0 && M(),
              2 == B.value && T.value.length > 0 && z();
          }),
          e.onLoad((e) => {
            e.orderType && (B.value = e.orderType || 1),
              G.forEach((e) => {
                e.value == B.value ? (e.active = !0) : (e.active = !1);
              });
          }),
          (o, r) => {
            var a, s, i;
            return e.e(
              {
                a: e.f(e.unref(G), (o, r, t) => ({
                  a: e.t(o.name),
                  b: r,
                  c: o.active ? 1 : "",
                  d: e.o((e) => {
                    return (
                      (r = o),
                      (B.value = r.value),
                      G.forEach((e) => {
                        e.active = !1;
                      }),
                      (r.active = !0),
                      void W()
                    );
                    var r;
                  }, r),
                })),
                b: e.p({
                  position: "relative",
                  bgColor: "#fff",
                  nativeMode: "true",
                }),
                c: 1 == e.unref(B),
              },
              1 == e.unref(B)
                ? {
                    d: e.o(J),
                    e: e.o(R),
                    f: e.o(E),
                    g: e.o((e) => (O.value = e)),
                    h: e.p({ placeholder: q.value, modelValue: O.value }),
                    i: e.o($),
                    j: e.p({ switchList: e.unref(k), padding: 16 }),
                  }
                : {},
              { k: 2 == e.unref(B) },
              2 == e.unref(B)
                ? {
                    l: e.o((o) => e.unref(t.goWmUrl)("orderList")),
                    m: e.p({ placeholder: q.value }),
                    n: e.o(V),
                    o: e.p({ switchList: e.unref(x), padding: 16 }),
                  }
                : {},
              { p: e.unref(v) ? 1 : "", q: e.unref(v) },
              (e.unref(v), {}),
              { r: 1 == e.unref(B) },
              1 == e.unref(B)
                ? e.e(
                    { s: 0 == e.unref(C).length && !e.unref(A) },
                    0 != e.unref(C).length || e.unref(A)
                      ? {}
                      : {
                          t: e.p({
                            tips: "暂无订单",
                            subTips: "松赞，期待与您相遇。",
                          }),
                        },
                    {
                      v: e.f(e.unref(C), (o, r, a) =>
                        e.e(
                          {
                            a: e.n(o.iconfont),
                            b: e.n(
                              o.isNewIconfont ? "st-iconfont" : "iconfont",
                            ),
                            c: e.t(o.channelDesc),
                            d: e.t(o.orderStaDesc),
                            e: o.countTime,
                          },
                          o.countTime ? { f: e.t(o.countTime) } : {},
                          {
                            g: o.enhanceSta ? 1 : "",
                            h: 9 == o.orderStatus ? 1 : "",
                            i: o.link
                              ? e.unref(u.imageMogr2)(o.link, "160x")
                              : "https://dsplatweb.oss-cn-chengdu.aliyuncs.com/songzan/images/defaultImage.png",
                            j: e.t(o.title),
                            k: o.itineraryDesc,
                          },
                          o.itineraryDesc ? { l: e.t(o.itineraryDesc) } : {},
                          { m: o.activityDate },
                          o.activityDate ? { n: e.t(o.activityDate) } : {},
                          { o: o.num > 0 },
                          o.num > 0 ? { p: e.t(o.num) } : {},
                          { q: o.couponNo },
                          o.couponNo ? { r: e.t(o.couponNo) } : {},
                          {
                            s:
                              5 == o.orderStatus ||
                              4 == o.orderStatus ||
                              2 == o.orderStatus,
                          },
                          5 == o.orderStatus ||
                            4 == o.orderStatus ||
                            2 == o.orderStatus
                            ? { t: e.t(e.unref(n.valFormat)(o.rateSum)) }
                            : e.e(
                                { v: o.needPay },
                                o.needPay
                                  ? e.e(
                                      {
                                        w: e.t(e.unref(n.valFormat)(o.price)),
                                        x: o.webPay > 0,
                                      },
                                      o.webPay > 0
                                        ? {
                                            y: e.t(
                                              e.unref(n.valFormat)(o.needPay),
                                            ),
                                          }
                                        : {},
                                    )
                                  : { z: e.t(e.unref(n.valFormat)(o.price)) },
                              ),
                          { A: o.showCancel },
                          o.showCancel
                            ? {
                                B: e.o(
                                  (e) =>
                                    ((e) => {
                                      (d.value = e), (c.value = !0);
                                    })(o),
                                  r,
                                ),
                              }
                            : o.showKf
                              ? {
                                  D: e.o((e) => {
                                    D.value.showDialog();
                                  }, r),
                                }
                              : o.showInvoice
                                ? {
                                    F: e.o(
                                      (r) =>
                                        ((o) => {
                                          e.index.navigateTo({
                                            url: `/pagesF/invoice/applyInvoice?orderNo=${
                                              o.orderNo
                                            }&orderType=${
                                              {
                                                room: "R",
                                                custom: "L",
                                                destpack: "L",
                                                butcustom: "L",
                                                freetravel: "L",
                                                themegroup: "L",
                                                shop: "S",
                                                activity: "A",
                                                travelroom: "L",
                                              }[o.channel]
                                            }&productType=${
                                              l.value[o.channel]
                                            }`,
                                          });
                                        })(o),
                                      r,
                                    ),
                                  }
                                : {},
                          { C: o.showKf, E: o.showInvoice, G: o.showExchange },
                          o.showExchange
                            ? {
                                H: e.o(
                                  (e) =>
                                    ((e) => {
                                      (b.value = e.orderId), j(b.value);
                                    })(o),
                                  r,
                                ),
                              }
                            : o.showPay
                              ? {
                                  J: e.o(
                                    (r) =>
                                      ((o) => {
                                        let r = {
                                            room: "hotel",
                                            custom: "CUSTOM",
                                            destpack: "DestPackage",
                                            butcustom: "ButlerCustomized",
                                            freetravel: "FreeTravel",
                                            themegroup: "ThemeGroup",
                                            shop: "shop",
                                            activity: "activity",
                                            pack: "pack",
                                            spa: "spa",
                                            travelroom: "SingleRoom",
                                          },
                                          t =
                                            "shop" == o.channel
                                              ? o.orderId
                                              : o.orderNo;
                                        if (
                                          "freetravel" == o.channel ||
                                          "themegroup" == o.channel ||
                                          "destpack" == o.channel ||
                                          "custom" == o.channel ||
                                          "butcustom" == o.channel ||
                                          "travelroom" == o.channel
                                        ) {
                                          let a = `/pagesB/other/pay?orderNo=${t}&productType=${
                                            r[o.channel]
                                          }`;
                                          "T" === o.agency &&
                                            "F" === o.isAgency &&
                                            (a += "&contractFlag=1"),
                                            o.isNeedAddContact &&
                                              (a += "&addContactFlag=1"),
                                            e.index.navigateTo({ url: a });
                                        } else
                                          e.index.navigateTo({
                                            url: `/pagesB/other/pay?orderNo=${t}&productType=${
                                              r[o.channel]
                                            }`,
                                          });
                                      })(o),
                                    r,
                                  ),
                                }
                              : !o.showPay && o.isShowAddContactBtn
                                ? {
                                    L: e.o(
                                      (e) =>
                                        ((e) => {
                                          let o =
                                            "/pagesB/travel/orderGuest?orderNo=" +
                                            e.orderNo;
                                          "T" === e.agency &&
                                            "F" === e.isAgency &&
                                            (o += "&contractFlag=1"),
                                            t.goPage(o);
                                        })(o),
                                      r,
                                    ),
                                  }
                                : o.showSign
                                  ? {
                                      N: e.o(
                                        (r) =>
                                          ((o) => {
                                            t.queryOrderGuestIsAll(
                                              {
                                                unitCode: m.hotelGroupCode,
                                                orderNo: o.orderNo,
                                              },
                                              () => {
                                                e.index.navigateTo({
                                                  url:
                                                    "/pagesB/travel/tips?orderNo=" +
                                                    o.orderNo,
                                                });
                                              },
                                            );
                                          })(o),
                                        r,
                                      ),
                                    }
                                  : o.showTransfer &&
                                      !["room", "destpack"].includes(o.channel)
                                    ? {
                                        P: e.o(
                                          (r) =>
                                            ((o) => {
                                              t.queryOrderGuestIsAll(
                                                {
                                                  unitCode: m.hotelGroupCode,
                                                  orderNo: o.orderNo,
                                                },
                                                () => {
                                                  e.index.navigateTo({
                                                    url:
                                                      "/pagesD/trip/takeInfo?orderNo=" +
                                                      o.orderNo,
                                                  });
                                                },
                                              );
                                            })(o),
                                          r,
                                        ),
                                      }
                                    : {},
                          {
                            I: o.showPay,
                            K: !o.showPay && o.isShowAddContactBtn,
                            M: o.showSign,
                            O:
                              o.showTransfer &&
                              !["room", "destpack"].includes(o.channel),
                            Q: r,
                            R: e.o(
                              (r) =>
                                ((o) =>
                                  "room" == o.channel
                                    ? (e.index.navigateTo({
                                        url: `/pagesC/order/orderInfo?orderNo=${o.orderNo}&hotelCode=${o.hotelCode}`,
                                      }),
                                      !1)
                                    : "freetravel" == o.channel ||
                                        "themegroup" == o.channel ||
                                        "destpack" == o.channel ||
                                        "custom" == o.channel ||
                                        "butcustom" == o.channel ||
                                        "travelroom" == o.channel
                                      ? (e.index.navigateTo({
                                          url:
                                            "/pagesB/travel/orderDetail?orderNo=" +
                                            o.orderNo,
                                        }),
                                        !1)
                                      : "shop" == o.channel
                                        ? (e.index.navigateTo({
                                            url: `/pagesB/travel/orderDetail?orderId=${o.orderId}&orderNo=${o.orderNo}&productType=shop`,
                                          }),
                                          !1)
                                        : "activity" == o.channel
                                          ? (e.index.navigateTo({
                                              url: `/pagesE/dailyActivity/dailyOrderDetail?orderNo=${o.orderNo}&productType=activity`,
                                            }),
                                            !1)
                                          : void 0)(o),
                              r,
                            ),
                            S:
                              5 == o.orderStatus ||
                              4 == o.orderStatus ||
                              2 == o.orderStatus
                                ? 1
                                : "",
                          },
                        ),
                      ),
                    },
                  )
                : {},
              { w: 2 == e.unref(B) },
              2 == e.unref(B)
                ? e.e(
                    { x: 0 == e.unref(T).length && e.unref(I) },
                    0 == e.unref(T).length && e.unref(I)
                      ? {
                          y: e.p({
                            tips: "暂无订单",
                            subTips: "松赞，期待与您相遇。",
                          }),
                        }
                      : {},
                    {
                      z: e.f(e.unref(T), (o, r, a) =>
                        e.e(
                          { a: e.t(o.orderStaDesc), b: o.countTime },
                          o.countTime ? { c: e.t(o.countTime) } : {},
                          {
                            d: o.enhanceSta ? 1 : "",
                            e: o.link
                              ? o.link
                              : "https://dsplatweb.oss-cn-chengdu.aliyuncs.com/songzan/images/defaultImage.png",
                            f: e.t(o.title),
                            g: e.t(o.orderTimeStr),
                            h: o.couponNo,
                          },
                          o.couponNo ? { i: e.t(o.couponNo) } : {},
                          {
                            j: e.t(e.unref(n.valFormat)(o.price)),
                            k: o.showAfterSales,
                          },
                          (o.showAfterSales, {}),
                          { l: o.showConfirm },
                          (o.showConfirm, {}),
                          { m: o.showBook },
                          (o.showBook, {}),
                          { n: o.showInvoice },
                          (o.showInvoice, {}),
                          { o: o.showCommit },
                          (o.showCommit, {}),
                          { p: o.showPay },
                          (o.showPay, {}),
                          {
                            q: r,
                            r: e.o((o) => e.unref(t.goWmUrl)("orderList"), r),
                            s: o.invalid ? 1 : "",
                          },
                        ),
                      ),
                    },
                  )
                : {},
              {
                A: e.sr(D, "bde133e2-7", { k: "kf" }),
                B: e.p({ title: "一键咨询" }),
                C: e.sr(P, "bde133e2-8", { k: "exchange" }),
                D: e.p({ orderId: e.unref(b) }),
                E: !c.value,
                F: e.o((e) => (c.value = e)),
                G: e.p({
                  orderNo: null == (a = d.value) ? void 0 : a.orderNo,
                  orderId: null == (s = d.value) ? void 0 : s.orderId,
                  productType:
                    l.value[null == (i = d.value) ? void 0 : i.channel],
                  show: c.value,
                }),
              },
            );
          }
        );
      },
    });
  v.__runtimeHooks = 1;
  const m = e._export_sfc(v, [["__scopeId", "data-v-bde133e2"]]);
  wx.createPage(m);
})();
