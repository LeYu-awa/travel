!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    o = require("../../base/jAlert/jAlert.js"),
    t = require("../../utils/api.js"),
    u = require("../../utils/filter.js"),
    r = require("../../utils/platform.js"),
    a = require("../../utils/utils.js"),
    n = require("../../utils/wxuser.js");
  Array || e.resolveComponent("mp-html")(),
    Math ||
      (l + (() => "../../uni_modules/mp-html/components/mp-html/mp-html.js"))();
  const l = () => "../../components/coustomHead.js",
    i = e.defineComponent({
      __name: "couponInfo",
      setup(l) {
        const i = n.getStorage("config"),
          p = e.ref("券包详情"),
          d = e.ref("#fff"),
          c = e.ref("F"),
          s = e.ref(""),
          f = e.ref(!1);
        let v = e.ref(n.getStorage("coupon"));
        const h = e.ref("100%"),
          m = e.ref("60px"),
          C = e.ref(!1),
          g = e.ref([]),
          N = e.ref([]),
          G = e.ref("info"),
          V = e.ref(""),
          y = e.ref(!0),
          T = e.ref("");
        let b = e.ref(n.getStorage("user"));
        const D = e.ref(n.getStorage("wxuser")),
          I = e.ref(!1),
          A = e.ref(!0),
          x = e.ref(!1),
          P = e.ref(!1);
        function O() {
          if (!b.value || !b.value.memberId) return a.toLoginBack(), !1;
          if (I.value) return !1;
          I.value = !0;
          const u = {
            appid: i.appid,
            cardId: b.value.cardId,
            componentAppid: i.componentAppid,
            couponName: v.value.couponName,
            couponNo: v.value.no,
            hotelGroupId: i.hotelGroupId,
            hotelCode: i.hotelCode ? i.hotelCode : 0,
            hotelGroupCode: i.hotelGroupCode,
            isMiniApp: "T",
            memberId: b.value.memberId,
            memberName: b.value.name,
            openId: D.value.openid,
            shareId: T.value,
            cardNo: b.value.cardNo,
          };
          t.api
            .receiveGiftCoupon(u)
            .then((t) => {
              if (1 === t.result)
                if (0 !== t.retVal.resultCode) {
                  const e = {
                    701003: "非常抱歉，领取出现异常，请稍后再试",
                    701004: "非常抱歉，领取出现异常，请稍后再试",
                    701005: "非常抱歉，领取出现异常，请稍后再试",
                    701102: "不存在要领取的券",
                    701103: "来晚啦，已超过券领取时间，无法领取",
                    701104: "来晚啦，券已被其他好友领取",
                    "-2": "非常抱歉，领取出现异常，请稍后再试",
                  };
                  o.jAlert3(e[t.retVal.resultCode] || t.retVal.resultMsg);
                } else
                  e.index.navigateTo({
                    url: "/pagesA/member/couponReciveResult",
                  });
              else o.jAlert3(t.msg);
              I.value = !1;
            })
            .catch((e) => {
              (I.value = !1), o.jAlert3("当前网络有些拥挤，请稍后再试");
            });
        }
        function E() {
          "T" === c.value ? (c.value = "F") : (c.value = "T"), B();
        }
        function B() {
          e.nextTick$1(() => {
            e.index.getSystemInfo({
              success: (o) => {
                let t = o.windowHeight;
                (h.value = t - o.statusBarHeight - 110 + "px"),
                  (m.value = o.statusBarHeight + 84 + "px"),
                  (C.value = !0),
                  e.nextTick$1(() => {
                    setTimeout(() => {
                      Promise.all([
                        a.getBoundingClientRect(".couponItemBox"),
                        a.getBoundingClientRect("#topBox"),
                        a.getBoundingClientRect(".qrCodeBox"),
                        a.getBoundingClientRect(".exchangeBtn"),
                      ]).then((e) => {
                        e[0].height;
                        const o = e[1].height;
                        let t = 0;
                        e[2] && e[2].height && (t = e[2] && e[2].height);
                        let u = 0;
                        e[3] && e[3].height && (u = e[3].height);
                        let r = Number(h.value.split("px")[0]) - 85 - o - t - u;
                        r < 0 && (r = 1);
                        const a = `max-height: ${r}px;overflow-y: scroll;word-break: break-all;`;
                        (s.value = a), (P.value = !0);
                      });
                    }, 0);
                  });
              },
              fail(e) {
                console.log(e);
              },
            });
          });
        }
        function w() {
          r.setClipboardData({ data: v.value.no });
        }
        e.onLoad((e) => {
          e.mode && (G.value = e.mode),
            e.couponNo && (V.value = e.couponNo),
            e.shareId && (T.value = e.shareId);
        }),
          e.onShareAppMessage(
            () => (
              "info" === G.value &&
                t.api
                  .presentGiftCoupon({
                    couponCode: v.value.couponCode,
                    couponNo: v.value.no,
                    hotelGroupCode: i.hotelGroupCode,
                    memberId: b.value.memberId,
                    memberName: b.value.name,
                    openId: D.value.openid,
                    shareId: T.value,
                    hotelCode: i.hotelCode ? i.hotelCode : 0,
                    presentCardId: b.value.cardId,
                    hotelGroupId: i.hotelGroupId,
                    hotelId: i.hotelId,
                    isMiniApp: "T",
                    appid: i.appid,
                    componentAppid: i.componentAppid,
                    couponName: v.value.couponName || "",
                    presentCardNo: b.value.cardNo || "",
                  })
                  .then((e) => {
                    1 === e.result && e.retVal.resultCode;
                  }),
              {
                title: "您收到一张好友赠送的优惠券，点击领取",
                path: `/pagesA/member/couponInfo?couponNo=${V.value}&mode=gift&shareId=${T.value}`,
                imageUrl:
                  "https://dsplatweb.oss-cn-chengdu.aliyuncs.com/songzan/images/couponShare.png",
                success() {},
                fail() {},
              }
            ),
          ),
          e.onMounted(async () => {
            if ("gift" === G.value) {
              (y.value = !1),
                (p.value = "领取券包"),
                t.api
                  .getPresentCouponDetail({
                    appid: i.appid,
                    componentAppid: i.componentAppid,
                    hotelCode: i.hotelCode ? i.hotelCode : 0,
                    hotelGroupCode: i.hotelGroupCode,
                    isMiniApp: "T",
                    shareId: T.value,
                  })
                  .then((e) => {
                    1 === e.result &&
                      b.value &&
                      b.value.memberId &&
                      e.retVal &&
                      e.retVal.fromMemberId === b.value.memberId &&
                      (A.value = !1);
                  });
              const e = await t.api.interfaceTransfer({
                config: {
                  interfaceFrom: "coupon",
                  interfaceMethod: `api/coupon/findCouponDetailByCouponNo?couponNo=${V.value}&hotelGroupCode=${i.hotelGroupCode}`,
                  hotelGroupCode: i.hotelGroupCode,
                  interfaceType: "POST",
                },
                query: { couponNo: V.value, hotelGroupCode: i.hotelGroupCode },
              });
              if (1 === e.result && 0 === e.retVal.result) {
                if (
                  ((e.retVal.retVal.couponCodeDto.no =
                    e.retVal.retVal.couponOwnerDetailDto.no),
                  (e.retVal.retVal.couponCodeDto.beginDatetime =
                    e.retVal.retVal.couponOwnerDetailDto.beginDatetime),
                  (e.retVal.retVal.couponCodeDto.endDatetime =
                    e.retVal.retVal.couponOwnerDetailDto.endDatetime),
                  "LZ" === e.retVal.retVal.couponCodeDto.discountType ||
                    "MZ" === e.retVal.retVal.couponCodeDto.discountType)
                ) {
                  e.retVal.retVal.couponCodeDto.couponType = "RF";
                  let o = (
                    10 * Number(e.retVal.retVal.couponCodeDto.discountNum)
                  ).toFixed(1);
                  o - Number.parseInt(o) > 0 || (o = Number(o).toFixed(0)),
                    (e.retVal.retVal.couponCodeDto.discountNum = o);
                }
                v.value = e.retVal.retVal.couponCodeDto;
              } else o.jAlert3("获取优惠券详情失败");
            } else T.value = a.genSessionId(24);
            if (
              (v.value.introduction &&
                (v.value.introduction = v.value.introduction.replace(
                  /white-space:\s*pre;/g,
                  "white-space: normal;",
                )),
              v.value.suitCashierPoint)
            ) {
              const e = v.value.suitCashierPoint.split(","),
                o = e.filter((e) => e.includes("WEB") || e.includes("SC"));
              e.length === o.length && (f.value = !0);
            }
            "gift" === G.value && (f.value = !0),
              "T" === v.value.allowGift &&
                "EXCHANGECOUPON" !== v.value.groupCode &&
                (x.value = !0),
              "EXCHANGECOUPON" === v.value.groupCode
                ? t.api
                    .interfaceTransfer({
                      query: {
                        hotelGroupCode: i.hotelGroupCode,
                        couponNo: v.value.no,
                        channel: "WECHAT",
                      },
                      config: {
                        interfaceType: "POST",
                        interfaceModule: "",
                        interfaceMethod:
                          "/api/coupon/listCouponCodeUseConfigProductByCouponNo",
                        interfaceFrom: "coupon",
                        hotelGroupCode: i.hotelGroupCode,
                      },
                    })
                    .then((e) => {
                      if (1 === e.result && 0 === e.retVal.result) {
                        const o = e.retVal.retVal;
                        (g.value = o),
                          (function () {
                            N.value = [];
                            const e = [],
                              o = [],
                              u = [],
                              r = [],
                              a = {
                                unitCode: i.hotelGroupCode,
                                hotelGroupCode: i.hotelGroupCode,
                              };
                            g.value.forEach((t) => {
                              "4" === t.type && e.push(t.productCode),
                                "3" === t.type && u.push(t.productCode),
                                "1" === t.type && o.push(t.productCode),
                                "2" === t.type &&
                                  "Custom" !== t.productPrimaryClassification &&
                                  r.push(t.productPrimaryClassification);
                            }),
                              r.length > 0 && (a.categorySubs = r),
                              u.length > 0 && (a.itineraryCodes = u),
                              o.length > 0 && (a.travelTypes = o),
                              e.length > 0 && (a.travelGroupCodes = e),
                              t.api
                                .interfaceTransfer({
                                  query: a,
                                  config: {
                                    interfaceType: "POST",
                                    interfaceModule: "GC_PRODUCT_JOURNEY",
                                    interfaceMethod:
                                      "/api/travelGroup/listTravelProductForWechatTdqV2",
                                    interfaceFrom: "GC",
                                    hotelGroupCode: i.hotelGroupCode,
                                  },
                                })
                                .then((e) => {
                                  1 === e.result &&
                                    0 === e.retVal.result &&
                                    e.retVal.retVal &&
                                    e.retVal.retVal.forEach((e) => {
                                      (e.couponNo = v.value.no),
                                        N.value.push(e);
                                    }),
                                    B();
                                });
                          })();
                      }
                    })
                : B();
          }),
          e.onShow(() => {
            b.value = n.getStorage("user");
          });
        const j = e.ref(
            "https://api.wx.gcihotel.net/api/member/textQrcode.json?code=" +
              v.value.no,
          ),
          F = e.ref(
            "https://api.wx.gcihotel.net/api/member/textOneQrcode.json?code=" +
              v.value.no,
          );
        return (o, t) => {
          return e.e(
            {
              a: e.p({ title: p.value, color: d.value }),
              b: e.unref(v).groupName,
            },
            e.unref(v).groupName
              ? { c: e.t(e.unref(v).groupName), d: e.n(e.unref(v).groupCode) }
              : {},
            { e: e.t(e.unref(v).descript), f: y.value },
            y.value ? { g: e.t(e.unref(v).no), h: e.o(w) } : {},
            { i: e.unref(v).beginDatetime && e.unref(v).endDatetime },
            e.unref(v).beginDatetime && e.unref(v).endDatetime
              ? {
                  j: e.t(e.unref(u.timeDay2)(e.unref(v).beginDatetime)),
                  k: e.t(e.unref(u.timeDay2)(e.unref(v).endDatetime)),
                }
              : {},
            {
              l:
                "EXCHANGECOUPON" !== e.unref(v).groupCode &&
                e.unref(v).discountNum > 0,
            },
            "EXCHANGECOUPON" !== e.unref(v).groupCode &&
              e.unref(v).discountNum > 0
              ? e.e(
                  { m: "RF" === e.unref(v).couponType },
                  "RF" === e.unref(v).couponType
                    ? { n: e.t(e.unref(v).discountNum) }
                    : "LZ" === e.unref(v).discountType ||
                        "MZ" === e.unref(v).discountType
                      ? {
                          p: e.t(
                            ((n = 10 * e.unref(v).discountNum),
                            Number(Number(n).toFixed(2))),
                          ),
                        }
                      : {
                          q: e.t(e.unref(u.valFormat)(e.unref(v).discountNum)),
                        },
                  {
                    o:
                      "LZ" === e.unref(v).discountType ||
                      "MZ" === e.unref(v).discountType,
                  },
                )
              : {},
            { r: e.unref(v).discountPriceBegin > 0 },
            e.unref(v).discountPriceBegin > 0
              ? { s: e.t(e.unref(v).discountPriceBegin) }
              : {},
            { t: "EXCHANGECOUPON" === e.unref(v).groupCode },
            "EXCHANGECOUPON" === e.unref(v).groupCode
              ? e.e(
                  { v: y.value },
                  y.value
                    ? {
                        w: e.t(e.unref(v).no),
                        x: e.o((o) =>
                          (function (e) {
                            r.setClipboardData({ data: e });
                          })(e.unref(v).no),
                        ),
                      }
                    : {},
                  { y: N.value.length > 0 },
                  N.value.length > 0
                    ? e.e(
                        {
                          z: e.f(N.value, (o, t, u) =>
                            e.e(
                              { a: "F" === c.value ? t < 5 : t >= 0 },
                              ("F" === c.value ? t < 5 : t >= 0)
                                ? {
                                    b: e.t(o.title),
                                    c: e.o(
                                      (t) =>
                                        e.unref(a.goPage)(
                                          `/pagesB/travel/travelDetail?travelType=${
                                            o.travelType
                                          }&couponNo=${e.unref(v).no}`,
                                        ),
                                      t,
                                    ),
                                  }
                                : {},
                              { d: t },
                            ),
                          ),
                          A: N.value.length > 5 && "F" === c.value,
                        },
                        N.value.length > 5 && "F" === c.value
                          ? { B: e.o(E) }
                          : "T" === c.value
                            ? { D: e.o(E) }
                            : {},
                        { C: "T" === c.value },
                      )
                    : {},
                )
              : f.value
                ? {}
                : e.e(
                    { F: j.value },
                    j.value ? { G: j.value } : {},
                    { H: F.value },
                    F.value ? { I: F.value } : {},
                  ),
            { E: !f.value, J: P.value },
            P.value
              ? {
                  K: e.p({
                    content: e.unref(v).introduction,
                    "container-style": s.value,
                  }),
                }
              : {},
            {
              L:
                "EXCHANGECOUPON" === e.unref(v).groupCode && N.value.length > 0,
            },
            "EXCHANGECOUPON" === e.unref(v).groupCode && N.value.length > 0
              ? {
                  M: e.o((o) =>
                    e.unref(a.goPage)(
                      "/pagesB/exchangeCoupon/exchangeList?couponNo=" +
                        e.unref(v).no,
                    ),
                  ),
                }
              : {},
            { N: x.value && "info" === G.value },
            (x.value && G.value, {}),
            { O: x.value && "gift" === G.value && A.value },
            x.value && "gift" === G.value && A.value ? { P: e.o(O) } : {},
            { Q: h.value, R: m.value, S: C.value },
          );
          var n;
        };
      },
    });
  i.__runtimeHooks = 2;
  const p = e._export_sfc(i, [["__scopeId", "data-v-1fe2e8ea"]]);
  wx.createPage(p);
})();
