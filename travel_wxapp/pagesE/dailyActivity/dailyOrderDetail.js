!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    a = require("../../utils/api.js"),
    u = require("../../base/jAlert/jAlert.js"),
    t = require("../../utils/wxuser.js"),
    l = require("../../utils/utils.js"),
    v = require("../../utils/filter.js"),
    r = require("../../base/channel.js");
  Math || (o + n + i)();
  const o = () => "../../components/coustomHead.js",
    n = () => "../../components/kfDialog.js",
    i = () => "../../components/new/OrderCancelDialog.js",
    c = e.defineComponent({
      __name: "dailyOrderDetail",
      setup(o) {
        let n = t.getStorage("user"),
          i = t.getStorage("config");
        const c = e.ref(!1),
          p = e.ref(""),
          m = e.ref(),
          s = e.ref("60"),
          d = e.ref(""),
          y = e.ref({}),
          f = e.ref({ activityInfo: {} });
        let b = e.ref(r.defaultActivityChannel);
        const h = e.ref([]),
          S = e.ref("F"),
          C = e.ref("F"),
          D = e.ref(""),
          T = e.ref(null);
        e.ref({}), e.ref(0), e.ref(0);
        const g = e.ref({}),
          F = e.ref(!1),
          I = e.ref({});
        let P = e.ref({});
        e.ref(""), e.ref([]);
        const x = e.ref([]);
        let R = e.ref([]),
          A = e.ref({}),
          N = e.ref("NI");
        e.ref(""), e.ref();
        let L = e.reactive({
          "01": "身份证",
          "02": "临时身份证",
          14: "护照",
          21: "港澳通行证",
        });
        const G = [
          { name: "已下单", val: "R" },
          { name: "待使用", val: "RW", desc: "松赞期待与您相遇。" },
          { name: "待签约", val: "DQY" },
          { name: "待使用", val: "RD", desc: "松赞期待与您相遇。" },
          { name: "待付款", val: "DFK", desc: "请尽快完成支付。" },
          { name: "待退款", val: "DTK", desc: "正在等待后台审核。" },
          { name: "退款中", val: "TKZ", desc: "预计3个工作天到账。" },
          { name: "出行中", val: "I", desc: "松赞祝您旅途愉快。" },
          { name: "已完成", val: "O", desc: "松赞感谢您的支持。" },
          { name: "已取消", val: "X", desc: "松赞期待与您相遇。" },
          { name: "已退款", val: "YTK", desc: "松赞祝您旅途愉快。" },
          { name: "待使用", val: "3", desc: "松赞祝您旅途愉快。" },
        ];
        e.onPageScroll((e) => {});
        const E = () => {
            "CI" == N.value
              ? e.index.navigateTo({
                  url: `/pagesF/invoice/applyInvoice?orderNo=${p.value}&orderType=A&productType=activity`,
                })
              : "HI" == N.value &&
                e.index.navigateTo({
                  url: `/pagesF/invoice/invoiceDetails?orderNo=${p.value}&orderType=A&productType=activity`,
                });
          },
          V = () => {
            m.value.showDialog();
          },
          K = () => {
            c.value = !0;
          },
          H = (a) => {
            e.index.setClipboardData({
              data: a,
              success: function () {
                u.jAlert3("复制成功");
              },
            });
          },
          M = (e) => {
            if (e) {
              var a = e.length;
              return j(e, 6, a - 2);
            }
          },
          j = (e, a, u) => {
            var t = e.length;
            if (t < a || t < u) return e;
            var l = e.substring(0, a),
              v = e.substring(u, t),
              r = ((e = ""), 0);
            try {
              for (r = 0; r < u - a; r++) e += "*";
            } catch (e) {}
            return l + e + v;
          },
          k = (e) => {
            a.api
              .interfaceTransfer({
                config: {
                  interfaceType: "GET",
                  interfaceModule: "GC_ACTIVITIES_CENTER",
                  interfaceMethod: "api/activity/getOneActivityIntroduce",
                  interfaceFrom: "GC",
                  hotelGroupCode: i.hotelGroupCode,
                },
                query: {
                  unitCode: i.hotelGroupCode,
                  activityCode: e.activityInfo.activityCode,
                  activityName: e.activityInfo.name,
                },
              })
              .then((e) => {
                1 == e.result &&
                  0 == e.retVal.result &&
                  (P.value = e.retVal.retVal);
              });
          };
        return (
          e.onUnload(() => {
            clearInterval(T.value);
          }),
          e.onLoad((e) => {
            (p.value = e.orderNo), e.productType && (d.value = e.productType);
          }),
          e.onMounted(() => {
            e.index.getSystemInfo({
              success: (e) => {
                s.value = e.statusBarHeight + 60;
              },
              fail(e) {
                console.log(e);
              },
            }),
              a.api
                .getPayDetail({
                  memberNo: n.memberId,
                  hotelGroupCode: i.hotelGroupCode,
                  hotelCode: i.hotelCode,
                  actRsvNo: p.value,
                  memberToken: n.memberToken,
                })
                .then((e) => {
                  if (1 == e.result) {
                    g.value = e.retVal;
                    let a = e.retVal.couponName
                        ? e.retVal.couponName.split(",")
                        : [],
                      u = e.retVal.couponNo ? e.retVal.couponNo.split(",") : [],
                      t = e.retVal.couponDisPriceStr
                        ? e.retVal.couponDisPriceStr.split(",")
                        : [],
                      l = [];
                    a.map((e, a) => {
                      let v = {
                        couponName: e,
                        couponNo: u[a],
                        couponDisPriceStr: t[a],
                      };
                      l.push(v);
                    }),
                      (x.value = l),
                      (F.value = !!e.retVal.payTypes.includes("chuzhi"));
                  }
                }),
              e.index.showLoading({ title: "加载中..." }),
              a.api
                .activityOrder({
                  memberNo: n.memberId,
                  hotelGroupCode: i.hotelGroupCode,
                  hotelCode: i.hotelCode,
                  actRsvNo: p.value,
                  memberToken: n.memberToken,
                })
                .then((a) => {
                  1 == a.result &&
                    ((y.value = a.retVal),
                    (f.value = a.retVal),
                    (I.value = a.retVal.aggregationOrder),
                    a.retVal.verifyList.map((e) => {
                      (e.couponNo = e.verifyCode), (e.couponSta = e.verifySta);
                    }),
                    (h.value = a.retVal.verifyList),
                    2 == I.value.payStatus && 1 == I.value.orderStatus
                      ? (f.value.sta = "DFK")
                      : "T" == f.value.agency &&
                          "R" == f.value.sta &&
                          "F" == f.value.isAgency
                        ? (f.value.sta = "DQY")
                        : ("1" != f.value.paySta && "8" != f.value.paySta) ||
                            ("R" != f.value.sta && "W" != f.value.sta)
                          ? "2" != f.value.paySta ||
                            ("R" != f.value.sta && "W" != f.value.sta)
                            ? "4" == f.value.paySta
                              ? (f.value.sta = "DTK")
                              : "5" == f.value.paySta
                                ? (f.value.sta = "YTK")
                                : "7" == f.value.paySta && (f.value.sta = "YTZ")
                            : (f.value.sta = "RW")
                          : (f.value.sta = "DFK"),
                    ("DQY" != f.value.sta && "DFK" != f.value.sta) ||
                      ("8" != f.value.paySta &&
                        f.value.leftTimeSeconds &&
                        (T.value = setInterval(() => {
                          f.value.leftTimeSeconds > 0
                            ? (f.value.leftTimeSeconds--,
                              (D.value = ((e) => {
                                const a = Math.floor(e / 3600),
                                  u = Math.floor((e % 3600) / 60),
                                  t = e % 60;
                                return `${String(a).padStart(
                                  2,
                                  "0",
                                )}小时${String(u).padStart(2, "0")}分${String(
                                  t,
                                ).padStart(2, "0")}秒`;
                              })(f.value.leftTimeSeconds)))
                            : (clearInterval(T.value), (f.value.sta = "X"));
                        }, 1e3))),
                    (f.value.indexPicture = f.value.activityInfo.indexPicture),
                    (f.value.bizDatetimeF = e
                      .dayjs(f.value.bizDatetime)
                      .format("YYYY.MM.DD")),
                    k(f.value));
                })
                .finally(() => {
                  e.index.hideLoading(),
                    (() => {
                      let e = {
                        unitCode: i.hotelGroupCode,
                        otaChannel: b.value,
                        ota: "DIRECT",
                        isGroup: "T",
                        payType: f.value.payType,
                        orderNo: p.value,
                        cardLevel: n.cardLevel,
                        cardType: n.cardType,
                        memberId: n.memberId,
                      };
                      a.api
                        .interfaceTransfer({
                          query: e,
                          config: {
                            interfaceType: "POST",
                            interfaceModule: "GC_TRAVEL_ORDER",
                            interfaceMethod:
                              "/api/reserve/order/queryPayDetail",
                            interfaceFrom: "GC",
                            hotelGroupCode: i.hotelGroupCode,
                          },
                        })
                        .then((e) => {
                          1 == e.result &&
                            0 == e.retVal.result &&
                            ((g.value = e.retVal.retVal),
                            g.value.activityRateSumDto &&
                              (g.value = Object.assign(
                                g.value,
                                g.value.activityRateSumDto,
                              )),
                            (g.value.needPay = Number(
                              (
                                g.value.rateSum -
                                g.value.memberDscAmount -
                                g.value.couponRateSum -
                                g.value.exchangeRateSum -
                                g.value.gwDiscount
                              ).toFixed(2),
                            )),
                            (g.value.aleadyPayPrice = Number(
                              (
                                g.value.alreadyPayFund +
                                g.value.alreadyPayMember +
                                g.value.alreadyPayOther
                              ).toFixed(2),
                            )),
                            console.log(
                              g.value.aleadyPayPrice,
                              " payData.value.aleadyPayPrice-------",
                            ),
                            (g.value.allRateSum = Number(
                              (
                                g.value.memberDscAmount +
                                g.value.couponRateSum +
                                g.value.gwDiscount
                              ).toFixed(2),
                            )),
                            g.value.couponSimpleInfoDtoList &&
                              g.value.couponSimpleInfoDtoList.length > 0 &&
                              ((g.value.couponDesc = ""),
                              g.value.couponSimpleInfoDtoList.forEach(
                                (e, a) => {
                                  a ==
                                  g.value.couponSimpleInfoDtoList.length - 1
                                    ? e.num > 1
                                      ? (g.value.couponDesc += `${e.descript} x${e.num}`)
                                      : (g.value.couponDesc += "" + e.descript)
                                    : e.num > 1
                                      ? (g.value.couponDesc += `${e.descript} x${e.num};`)
                                      : (g.value.couponDesc +=
                                          e.descript + ";");
                                },
                              )));
                        });
                    })();
                }),
              a.api
                .getOrderInvoiceSta({
                  hotelCode: i.hotelCode,
                  hotelGroupCode: i.hotelGroupCode,
                  orderNo: p.value,
                  orderType: "A",
                })
                .then((e) => {
                  1 == e.result &&
                    ((N.value = e.retVal.invoiceSta),
                    "HI" == N.value &&
                      a.api
                        .getInvoiceOrder({
                          hotelCode: i.hotelCode,
                          hotelGroupCode: i.hotelGroupCode,
                          orderNo: p.value,
                          orderType: "A",
                        })
                        .then((e) => {
                          1 == e.result &&
                            0 == e.retVal.resultCode &&
                            ((A.value = e.retVal.orderInvoice),
                            A.value.eiinvoicePdfUrl &&
                              R.value.push({
                                name: "发票",
                                url: A.value.eiinvoicePdfUrl,
                              })),
                            console.log(e);
                        }));
                });
          }),
          (a, u) =>
            e.e(
              {
                a: e.p({
                  color: "#fff",
                  title: "订单详情",
                  customClass: "X" == f.value.sta ? "" : "customPattern",
                  bgColor: "X" == f.value.sta ? "#7f7d75" : "",
                }),
                b: e.f(G, (a, u, t) =>
                  e.e(
                    { a: a.val == f.value.sta },
                    a.val == f.value.sta
                      ? e.e(
                          {
                            b: e.t(a.name),
                            c: "DFK" == f.value.sta && "8" != f.value.paySta,
                          },
                          "DFK" == f.value.sta && "8" != f.value.paySta
                            ? e.e(
                                { d: D.value },
                                D.value ? { e: e.t(D.value) } : {},
                              )
                            : { f: e.t(a.desc) },
                          { g: "X" == f.value.sta ? 1 : "", h: s.value + "px" },
                        )
                      : {},
                    { i: u },
                  ),
                ),
                c: f.value.indexPicture,
                d: e.t(f.value.activityInfo.name),
                e:
                  f.value.activityInfo.minCapacity ||
                  f.value.activityInfo.maxCapacity,
              },
              f.value.activityInfo.minCapacity ||
                f.value.activityInfo.maxCapacity
                ? e.e(
                    {
                      f: e.t(f.value.activityInfo.minCapacity),
                      g:
                        f.value.activityInfo.minCapacity &&
                        f.value.activityInfo.maxCapacity,
                    },
                    (f.value.activityInfo.minCapacity &&
                      f.value.activityInfo.maxCapacity,
                    {}),
                    {
                      h: e.t(f.value.activityInfo.maxCapacity),
                      i: "CHILD" == f.value.activityInfo.adapterPeople,
                    },
                    (f.value.activityInfo.adapterPeople, {}),
                    { j: "ADULT" == f.value.activityInfo.adapterPeople },
                    (f.value.activityInfo.adapterPeople, {}),
                    { k: "ALL" == f.value.activityInfo.adapterPeople },
                    (f.value.activityInfo.adapterPeople, {}),
                  )
                : {},
              {
                l: e.t(f.value.bizDatetimeF),
                m: e.t(f.value.activityInfo.activityBegin),
                n: e.t(f.value.activityInfo.activityEnd),
                o: e.o((a) => {
                  return (
                    (u = f.value.activityInfo),
                    void e.index.navigateTo({
                      url:
                        "/pagesE/dailyActivity/dailyActivityDetail?activityCode=" +
                        u.activityCode,
                    })
                  );
                  var u;
                }),
                p: "X" == f.value.sta,
              },
              (f.value.sta, {}),
              { q: h.value.length > 0 },
              h.value.length > 0
                ? {
                    r: e.f(h.value, (a, u, t) =>
                      e.e(
                        h.value.length > 1 ? { a: e.t(u + 1) } : {},
                        { b: e.t(a.couponNo), c: "WAIT" == a.couponSta },
                        "WAIT" == a.couponSta
                          ? { d: e.o((e) => H(a.couponNo), u) }
                          : ("USED" == a.couponSta || a.couponSta, {}),
                        {
                          e: "USED" == a.couponSta,
                          f: "OUTDATE" == a.couponSta,
                          g: "WAIT" != a.couponSta ? 1 : "",
                          h: u,
                        },
                      ),
                    ),
                    s: h.value.length > 1,
                  }
                : {},
              { t: e.unref(P).activityCode },
              e.unref(P).activityCode
                ? {
                    v: e.unref(P).priceExplain,
                    w: e.unref(P).extraTips,
                    x: e.unref(P).resrvNotice,
                  }
                : {},
              {
                y: "T" == S.value ? 1 : "",
                z:
                  "F" == S.value &&
                  (e.unref(P).priceExplain ||
                    e.unref(P).extraTips ||
                    e.unref(P).resrvNotice),
              },
              "F" == S.value &&
                (e.unref(P).priceExplain ||
                  e.unref(P).extraTips ||
                  e.unref(P).resrvNotice)
                ? { A: e.o((e) => (S.value = "T")) }
                : e.unref(P).priceExplain ||
                    e.unref(P).extraTips ||
                    e.unref(P).resrvNotice
                  ? { C: e.o((e) => (S.value = "F")) }
                  : {},
              {
                B:
                  e.unref(P).priceExplain ||
                  e.unref(P).extraTips ||
                  e.unref(P).resrvNotice,
                D:
                  f.value.adult ||
                  f.value.bigChildren ||
                  f.value.children ||
                  f.value.baby,
              },
              f.value.adult ||
                f.value.bigChildren ||
                f.value.children ||
                f.value.baby
                ? {
                    E: e.t(
                      f.value.adult +
                        f.value.bigChildren +
                        f.value.children +
                        f.value.baby,
                    ),
                  }
                : {},
              {
                F: e.f(f.value.guestInfo, (a, u, t) => ({
                  a: e.t(a.name),
                  b: e.t(e.unref(L)[a.licenseType || "01"]),
                  c: e.t(M(a.license)),
                  d: e.t(a.phone),
                  e: u,
                })),
                G: f.value.remark,
              },
              f.value.remark ? { H: e.t(f.value.remark) } : {},
              { I: "T" != C.value },
              "T" != C.value
                ? e.e(
                    { J: g.value.rateSum || !g.value.point },
                    g.value.rateSum || !g.value.point
                      ? {
                          K: e.t(
                            g.value.exchangeRateSum
                              ? e.unref(v.valFormat)(
                                  g.value.rateSum - g.value.exchangeRateSum,
                                )
                              : e.unref(v.valFormat)(g.value.rateSum),
                          ),
                        }
                      : {},
                    { L: g.value.rateSum && g.value.point },
                    (g.value.rateSum && g.value.point, {}),
                    { M: g.value.point },
                    g.value.point
                      ? { N: e.t(e.unref(v.valFormat)(g.value.point)) }
                      : {},
                    { O: "CASH" == g.value.payType },
                    ("CASH" == g.value.payType ||
                      "INTEGRALCASH" == g.value.payType ||
                      g.value.payType,
                    {}),
                    {
                      P: "INTEGRALCASH" == g.value.payType,
                      Q: "INTEGRAL" == g.value.payType,
                    },
                  )
                : {},
              { R: "T" == C.value },
              "T" == C.value
                ? e.e(
                    { S: "SINGLE" == g.value.priceType },
                    "SINGLE" == g.value.priceType
                      ? e.e(
                          { T: g.value.rateSum || !g.value.point },
                          g.value.rateSum || !g.value.point
                            ? {
                                U: e.t(
                                  g.value.exchangeRateSum
                                    ? e.unref(v.valFormat)(
                                        g.value.rateSum -
                                          g.value.exchangeRateSum,
                                      )
                                    : e.unref(v.valFormat)(g.value.rateSum),
                                ),
                              }
                            : {},
                          { V: g.value.rateSum && g.value.point },
                          (g.value.rateSum && g.value.point, {}),
                          { W: g.value.point },
                          g.value.point
                            ? { X: e.t(e.unref(v.valFormat)(g.value.point)) }
                            : {},
                          { Y: "CASH" == f.value.payType },
                          ("CASH" == f.value.payType ||
                            "INTEGRALCASH" == f.value.payType ||
                            f.value.payType,
                          {}),
                          {
                            Z: "INTEGRALCASH" == f.value.payType,
                            aa: "INTEGRAL" == f.value.payType,
                            ab: g.value.point,
                          },
                          g.value.point
                            ? {
                                ac: e.t(
                                  g.value.exchangeRateSum
                                    ? e.unref(v.valFormat)(
                                        g.value.rateSum -
                                          g.value.exchangeRateSum,
                                      )
                                    : e.unref(v.valFormat)(g.value.rateSum),
                                ),
                                ad: e.t(e.unref(v.valFormat)(g.value.point)),
                              }
                            : {
                                ae: e.t(e.unref(v.valFormat)(g.value.rateSum)),
                              },
                          { af: g.value.point },
                          g.value.point
                            ? {
                                ag: e.t(
                                  g.value.exchangeRateSum
                                    ? e.unref(v.valFormat)(
                                        g.value.priceCache -
                                          g.value.exchangeRateSum /
                                            (g.value.adult +
                                              g.value.bigChildren +
                                              g.value.children +
                                              g.value.baby),
                                      )
                                    : e.unref(v.valFormat)(g.value.priceCache),
                                ),
                                ah: e.t(
                                  e.unref(v.valFormat)(g.value.point) /
                                    (g.value.adult +
                                      g.value.bigChildren +
                                      g.value.children +
                                      g.value.baby),
                                ),
                                ai: e.t(
                                  g.value.adult +
                                    g.value.bigChildren +
                                    g.value.children +
                                    g.value.baby,
                                ),
                              }
                            : {
                                aj: e.t(
                                  e.unref(v.valFormat)(g.value.priceCache),
                                ),
                                ak: e.t(
                                  g.value.adult +
                                    g.value.bigChildren +
                                    g.value.children +
                                    g.value.baby,
                                ),
                              },
                          { al: g.value.allRateSum },
                          g.value.allRateSum
                            ? e.e(
                                {
                                  am: e.t(
                                    e.unref(v.valFormat)(g.value.allRateSum),
                                  ),
                                  an: g.value.memberDscAmount,
                                },
                                g.value.memberDscAmount
                                  ? e.e(
                                      {
                                        ao: e.t(g.value.memberLevelDesc),
                                        ap: g.value.memberDiscount,
                                      },
                                      g.value.memberDiscount
                                        ? {
                                            aq: e.t(
                                              Number(
                                                10 * g.value.memberDiscount,
                                              ).toFixed(1),
                                            ),
                                          }
                                        : {},
                                      {
                                        ar: e.t(
                                          e.unref(v.valFormat)(
                                            g.value.memberDscAmount,
                                          ),
                                        ),
                                      },
                                    )
                                  : {},
                                { as: g.value.couponDesc },
                                g.value.couponDesc
                                  ? {
                                      at: e.t(g.value.couponDesc),
                                      av: e.t(
                                        e.unref(v.valFormat)(
                                          g.value.couponRateSum,
                                        ),
                                      ),
                                    }
                                  : {},
                                { aw: g.value.gwDiscount },
                                g.value.gwDiscount
                                  ? {
                                      ax: e.t(
                                        e.unref(v.valFormat)(
                                          g.value.gwDiscount,
                                        ),
                                      ),
                                    }
                                  : {},
                              )
                            : {},
                        )
                      : e.e(
                          { ay: g.value.rateSum || !g.value.point },
                          g.value.rateSum || !g.value.point
                            ? {
                                az: e.t(
                                  g.value.exchangeRateSum
                                    ? e.unref(v.valFormat)(
                                        g.value.rateSum -
                                          g.value.exchangeRateSum,
                                      )
                                    : e.unref(v.valFormat)(g.value.rateSum),
                                ),
                              }
                            : {},
                          { aA: g.value.rateSum && g.value.point },
                          (g.value.rateSum && g.value.point, {}),
                          { aB: g.value.point },
                          g.value.point
                            ? { aC: e.t(e.unref(v.valFormat)(g.value.point)) }
                            : {},
                          { aD: "CASH" == f.value.payType },
                          ("CASH" == f.value.payType ||
                            "INTEGRALCASH" == f.value.payType ||
                            f.value.payType,
                          {}),
                          {
                            aE: "INTEGRALCASH" == f.value.payType,
                            aF: "INTEGRAL" == f.value.payType,
                            aG: g.value.point,
                          },
                          g.value.point
                            ? {
                                aH: e.t(
                                  g.value.exchangeRateSum
                                    ? e.unref(v.valFormat)(
                                        g.value.rateSum -
                                          g.value.exchangeRateSum,
                                      )
                                    : e.unref(v.valFormat)(g.value.rateSum),
                                ),
                                aI: e.t(e.unref(v.valFormat)(g.value.point)),
                              }
                            : {
                                aJ: e.t(e.unref(v.valFormat)(g.value.rateSum)),
                              },
                          { aK: g.value.adult && g.value.priceCache },
                          g.value.adult && g.value.priceCache
                            ? e.e(
                                { aL: g.value.point },
                                g.value.point
                                  ? {
                                      aM: e.t(
                                        g.value.exchangeRateSum
                                          ? e.unref(v.valFormat)(
                                              g.value.priceCache -
                                                g.value.exchangeRateSum /
                                                  g.value.adult,
                                            )
                                          : e.unref(v.valFormat)(
                                              g.value.priceCache,
                                            ),
                                      ),
                                      aN: e.t(
                                        e.unref(v.valFormat)(
                                          g.value.point / g.value.adult,
                                        ),
                                      ),
                                      aO: e.t(g.value.adult),
                                    }
                                  : {
                                      aP: e.t(
                                        e.unref(v.valFormat)(
                                          g.value.priceCache,
                                        ),
                                      ),
                                      aQ: e.t(g.value.adult),
                                    },
                              )
                            : {},
                          {
                            aR:
                              g.value.bigChildren && g.value.bigChildPriceCache,
                          },
                          g.value.bigChildren && g.value.bigChildPriceCache
                            ? {
                                aS: e.t(
                                  e.unref(v.valFormat)(
                                    g.value.bigChildPriceCache,
                                  ),
                                ),
                                aT: e.t(g.value.bigChildren),
                              }
                            : {},
                          { aU: g.value.children && g.value.childPriceCache },
                          g.value.children && g.value.childPriceCache
                            ? {
                                aV: e.t(
                                  e.unref(v.valFormat)(g.value.childPriceCache),
                                ),
                                aW: e.t(g.value.children),
                              }
                            : {},
                          { aX: g.value.babyPriceCache && g.value.baby },
                          g.value.babyPriceCache && g.value.baby
                            ? {
                                aY: e.t(
                                  e.unref(v.valFormat)(g.value.babyPriceCache),
                                ),
                                aZ: e.t(g.value.baby),
                              }
                            : {},
                          { ba: g.value.allRateSum },
                          g.value.allRateSum
                            ? e.e(
                                {
                                  bb: e.t(
                                    e.unref(v.valFormat)(g.value.allRateSum),
                                  ),
                                  bc: g.value.memberDscAmount,
                                },
                                g.value.memberDscAmount
                                  ? e.e(
                                      {
                                        bd: e.t(g.value.memberLevelDesc),
                                        be: g.value.memberDiscount,
                                      },
                                      g.value.memberDiscount
                                        ? {
                                            bf: e.t(
                                              Number(
                                                10 * g.value.memberDiscount,
                                              ).toFixed(1),
                                            ),
                                          }
                                        : {},
                                      {
                                        bg: e.t(
                                          e.unref(v.valFormat)(
                                            g.value.memberDscAmount,
                                          ),
                                        ),
                                      },
                                    )
                                  : {},
                                {
                                  bh:
                                    g.value.couponSimpleInfoDtoList &&
                                    g.value.couponSimpleInfoDtoList.length > 0,
                                },
                                g.value.couponSimpleInfoDtoList &&
                                  g.value.couponSimpleInfoDtoList.length > 0
                                  ? {
                                      bi: e.f(
                                        g.value.couponSimpleInfoDtoList,
                                        (a, u, t) =>
                                          e.e(
                                            {
                                              a: e.t(a.descript),
                                              b: a.num > 1,
                                            },
                                            a.num > 1 ? { c: e.t(a.num) } : {},
                                            { d: e.t(a.realValue), e: u },
                                          ),
                                      ),
                                    }
                                  : {},
                                { bj: g.value.gwDiscount },
                                g.value.gwDiscount
                                  ? {
                                      bk: e.t(
                                        e.unref(v.valFormat)(
                                          g.value.gwDiscount,
                                        ),
                                      ),
                                    }
                                  : {},
                              )
                            : {},
                        ),
                  )
                : {},
              { bl: g.value.needPay || !g.value.point },
              g.value.needPay || !g.value.point
                ? { bm: e.t(e.unref(v.valFormat)(g.value.needPay)) }
                : {},
              { bn: g.value.needPay && g.value.point },
              (g.value.needPay && g.value.point, {}),
              { bo: g.value.point },
              g.value.point
                ? { bp: e.t(e.unref(v.valFormat)(g.value.point)) }
                : {},
              { bq: g.value.point },
              g.value.point
                ? { br: e.t(e.unref(v.valFormat)(g.value.point)) }
                : {},
              { bs: g.value.aleadyPayPrice },
              g.value.aleadyPayPrice
                ? { bt: e.t(e.unref(v.valFormat)(g.value.aleadyPayPrice)) }
                : {},
              { bv: "DFK" == f.value.sta || "DQY" == f.value.sta },
              "DFK" == f.value.sta || "DQY" == f.value.sta
                ? { bw: e.t(e.unref(v.valFormat)(g.value.readyPay)) }
                : {},
              { bx: g.value.breakMoney && "T" == C.value },
              g.value.breakMoney && "T" == C.value
                ? {
                    by: e.t(e.unref(v.valFormat)(g.value.breakMoney)),
                    bz: e.t(e.unref(v.valFormat)(g.value.breakMoney)),
                  }
                : {},
              { bA: "F" == C.value },
              "F" == C.value
                ? { bB: e.o((e) => (C.value = "T")) }
                : { bC: e.o((e) => (C.value = "F")) },
              {
                bD: e.t(g.value.orderNo),
                bE: e.o((e) => H(g.value.orderNo)),
                bF: e.t(f.value.createDatetime),
                bG: f.value.payDatetime,
              },
              f.value.payDatetime ? { bH: e.t(f.value.payDatetime) } : {},
              {
                bI: e.t(f.value.contactMan),
                bJ: e.t(f.value.contactPhone),
                bK: e.unref(R).length > 0,
              },
              e.unref(R).length > 0
                ? {
                    bL: e.f(e.unref(R), (a, u, t) => ({
                      a: e.t(a.name),
                      b: u,
                      c: e.o((u) => e.unref(l.goPage)(a.url), u),
                    })),
                  }
                : {},
              { bM: "DFK" != f.value.sta },
              "DFK" != f.value.sta
                ? e.e(
                    { bN: "DFK" != f.value.sta },
                    "DFK" != f.value.sta ? { bO: e.o(V) } : {},
                  )
                : {},
              { bP: "O" == f.value.sta && "NI" != e.unref(N) },
              "O" == f.value.sta && "NI" != e.unref(N) ? { bQ: e.o(E) } : {},
              { bR: "DFK" == f.value.sta || "DQY" == f.value.sta },
              "DFK" == f.value.sta || "DQY" == f.value.sta
                ? e.e(
                    { bS: "DFK" == f.value.sta },
                    "DFK" == f.value.sta ? { bT: e.o(K) } : {},
                    { bU: "DFK" == f.value.sta },
                    "DFK" == f.value.sta
                      ? {
                          bV: e.o((a) =>
                            (() => {
                              let a = d.value || f.value.orderType;
                              e.index.redirectTo({
                                url: `/pagesB/other/pay?orderNo=${p.value}&productType=${a}`,
                              });
                            })(),
                          ),
                        }
                      : {},
                  )
                : {},
              {
                bW: e.sr(m, "3edb8087-1", { k: "kf" }),
                bX: e.p({ title: "联系客服" }),
                bY: e.o((e) => (c.value = e)),
                bZ: e.p({
                  orderNo: p.value,
                  productType: d.value || f.value.orderType,
                  show: c.value,
                }),
              },
            )
        );
      },
    });
  c.__runtimeHooks = 1;
  const p = e._export_sfc(c, [["__scopeId", "data-v-3edb8087"]]);
  wx.createPage(p);
})();
