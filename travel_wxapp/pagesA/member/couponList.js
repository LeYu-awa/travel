!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    o = require("../../base/jAlert/jAlert.js"),
    t = require("../../hooks/useScanCoupon.js"),
    a = require("../../utils/api.js"),
    r = require("../../utils/utils.js"),
    n = require("../../utils/wxuser.js");
  Array || e.resolveComponent("FloatButtonKf")(),
    Math || (s + u + d + p + i + l + c)();
  const u = () => "../../components/bannerSwiper.js",
    l = () => "../../components/bottomDialog.js",
    p = () => "../../components/couponItem.js",
    s = () => "../../components/coustomHead.js",
    i = () => "../../components/empty.js",
    c = () => "../../components/kfDialog.js",
    d = () => "../../components/switchBar.js",
    f = e.defineComponent({
      __name: "couponList",
      setup(u) {
        const l = n.getStorage("config"),
          p = n.getStorage("user"),
          s = e.ref([]),
          i = e.ref(""),
          c = e.ref(0),
          d = e.ref(15),
          f = e.ref(!1),
          g = e.ref("I"),
          h = e.ref(),
          C = e.ref([]),
          m = e.ref(!1),
          v = e.ref("padding: 16px;background:#fff"),
          y = e.ref(0),
          b = e.ref(""),
          G = e.ref(0),
          T = e.ref(),
          V = e.ref(""),
          { scanCode: N, bindCoupon: I, exchangeCoupon: j } = t.useScanCoupon(),
          x = e.ref(!1);
        function w() {
          N().then((e) => {
            I(e).then((e) => {
              o.jAlert3("兑换成功"), M(), E(), r.refreshMemberInfo();
            });
          });
        }
        function P() {
          j(V.value).then((e) => {
            o.jAlert3("兑换成功"),
              M(),
              E(),
              r.refreshMemberInfo(),
              T.value.hideDialog();
          });
        }
        function S() {
          T.value.showDialog();
        }
        function A() {
          r.goPage("/pagesA/member/couponHistory");
        }
        function M(e) {
          a.api
            .interfaceTransfer({
              config: {
                interfaceType: "GET",
                interfaceModule: "",
                interfaceMethod: "api/coupon/listCouponGroupCountByMemberId",
                interfaceFrom: "coupon",
                hotelGroupCode: l.hotelGroupCode,
              },
              query: {
                hotelGroupCode: l.hotelGroupCode,
                memberId: p.memberId,
                couponCode: "",
                sta: "I",
                couponType: "",
                discountType: "",
                withoutPackage: !0,
              },
            })
            .then((o) => {
              if (1 === o.result && 0 === o.retVal.result) {
                const e = [];
                o.retVal.retVal.forEach((o, t) => {
                  o.groupCode === b.value && (G.value = t),
                    e.push({
                      name: `${o.groupName}(${o.number})`,
                      active: t === y.value,
                      groupCode: "ALL" === o.groupCode ? "" : o.groupCode,
                      groupName: o.groupName,
                    });
                }),
                  (s.value = e),
                  b.value && k(G.value);
              }
              e && e(), console.log(o);
            });
        }
        function q() {
          if (f.value) return !1;
          (f.value = !0),
            a.api
              .listCouponWithHistoryByCardNo({
                ownMemberId: p.memberId || "",
                sta: g.value,
                hotelGroupId: l.hotelGroupId,
                hotelGroupCode: l.hotelGroupCode,
                firstResult: c.value,
                pageSize: d.value,
                hotelCode: l.hotelCode,
                beginDatetime: "",
                endDatetime: "",
                ownMobile: "",
                salesChannel: "",
                salesHotelCode: "",
                saleType: "",
                isFromGift: "",
                groupCode: i.value,
              })
              .then((e) => {
                if (((f.value = !1), 1 === e.result)) {
                  c.value = c.value + d.value;
                  for (let o = 0; o < e.retVal.datas.length; o++) {
                    if (
                      ("T" === e.retVal.datas[o].allowGift &&
                        "EXCHANGECOUPON" !== e.retVal.datas[o].groupCode &&
                        (e.retVal.datas[o].showGift = !0),
                      "MZ" === e.retVal.datas[o].discountType ||
                        "LZ" === e.retVal.datas[o].discountType)
                    ) {
                      e.retVal.datas[o].couponType = "RF";
                      let t = (
                        10 * Number(e.retVal.datas[o].discountNum)
                      ).toFixed(1);
                      t - Number.parseInt(t) > 0 || (t = Number(t).toFixed(0)),
                        (e.retVal.datas[o].discountNum = t);
                    }
                    e.retVal.datas[o].trackInfo = {
                      coupon_name: e.retVal.datas[o].descript,
                      coupon_type: e.retVal.datas[o].groupName,
                      price: Number(e.retVal.datas[o].discountNum),
                    };
                  }
                  (C.value = C.value.concat(e.retVal.datas)),
                    C.value.length >= e.retVal.totalRows && (m.value = !0);
                }
              })
              .finally(() => {
                x.value = !0;
              });
        }
        function k(e) {
          s.value.forEach((e) => {
            e.active = !1;
          }),
            (s.value[e].active = !0),
            (i.value = s.value[e].groupCode),
            (y.value = e),
            E();
        }
        function E() {
          (m.value = !1), (C.value = []), (c.value = 0), q();
        }
        function _(o, t) {
          "EXCHANGECOUPON" === o.groupCode
            ? (function (o, t) {
                a.api
                  .interfaceTransfer({
                    query: {
                      hotelGroupCode: l.hotelGroupCode,
                      couponNo: o.no,
                      channel: "WECHAT",
                    },
                    config: {
                      interfaceType: "POST",
                      interfaceModule: "",
                      interfaceMethod:
                        "/api/coupon/listCouponCodeUseConfigProductByCouponNo",
                      interfaceFrom: "coupon",
                      hotelGroupCode: l.hotelGroupCode,
                    },
                  })
                  .then((u) => {
                    if (1 === u.result && 0 === u.retVal.result) {
                      let p = !1;
                      const s = [],
                        i = [],
                        c = [],
                        d = [];
                      u.retVal.retVal.forEach((e) => {
                        "Custom" === e.orderType && (p = !0),
                          "4" === e.type && s.push(e.productCode),
                          "3" === e.type && c.push(e.productCode),
                          "2" === e.type &&
                            "Custom" !== e.productPrimaryClassification &&
                            d.push(e.productPrimaryClassification),
                          "1" === e.type && i.push(e.productCode);
                      });
                      const f = {
                        unitCode: l.hotelGroupCode,
                        hotelGroupCode: l.hotelGroupCode,
                      };
                      c.length > 0 && (f.itineraryCodes = c),
                        i.length > 0 && (f.travelTypes = i),
                        d.length > 0 && (f.categorySubs = d),
                        s.length > 0 && (f.travelGroupCodes = s),
                        p
                          ? a.api
                              .interfaceTransfer({
                                query: f,
                                config: {
                                  interfaceType: "POST",
                                  interfaceModule: "GC_PRODUCT_JOURNEY",
                                  interfaceMethod:
                                    "/api/travelGroup/listTravelProductForWechatTdqV2",
                                  interfaceFrom: "GC",
                                  hotelGroupCode: l.hotelGroupCode,
                                },
                              })
                              .then((a) => {
                                1 === a.result &&
                                  0 === a.retVal.result &&
                                  (a.retVal.retVal && a.retVal.retVal.length > 0
                                    ? "T" === t
                                      ? r.goPage(
                                          "/pagesB/exchangeCoupon/exchangeList?couponNo=" +
                                            o.no,
                                        )
                                      : (n.setStorage("coupon", o),
                                        e.index.navigateTo({
                                          url:
                                            "/pagesA/member/couponInfo?couponNo=" +
                                            o.no,
                                        }))
                                    : h.value.showDialog());
                              })
                          : "T" === t
                            ? r.goPage(
                                "/pagesB/exchangeCoupon/exchangeList?couponNo=" +
                                  o.no,
                              )
                            : (n.setStorage("coupon", o),
                              e.index.navigateTo({
                                url:
                                  "/pagesA/member/couponInfo?couponNo=" + o.no,
                              }));
                    }
                  });
              })(o, t)
            : (n.setStorage("coupon", o),
              e.index.navigateTo({
                url: "/pagesA/member/couponInfo?couponNo=" + o.no,
              })),
            console.log(o);
        }
        return (
          e.onReachBottom(() => {
            q();
          }),
          e.onLoad((e) => {
            e.groupCode && (b.value = e.groupCode);
          }),
          e.onShow(() => {
            M(() => {
              E();
            });
          }),
          (o, t) =>
            e.e(
              {
                a: e.p({ title: "券包", "native-mode": "true" }),
                b: e.p({ "show-location": "7", "ad-box-style": v.value }),
                c: e.o(k),
                d: e.p({
                  "switch-list": s.value,
                  "initial-active-index": G.value,
                  padding: 16,
                }),
                e: e.f(C.value, (o, t, a) => ({
                  a: e.o(_, t),
                  b: "d4bd4e53-3-" + a,
                  c: e.p({ "coupon-item": o, "show-btn": !0 }),
                  d: t,
                  e: JSON.stringify(o.trackInfo),
                })),
                f: 0 === C.value.length && m.value,
              },
              0 === C.value.length && m.value
                ? { g: e.p({ tips: "暂无券包" }) }
                : {},
              { h: m.value },
              m.value ? { i: e.o(A) } : {},
              {
                j: e.o(S),
                k: e.o(w),
                l: V.value,
                m: e.o((e) => (V.value = e.detail.value)),
                n: e.o(P),
                o: e.sr(T, "d4bd4e53-5", { k: "exchangeBox" }),
                p: e.p({ title: "兑换码领券" }),
                q: e.sr(h, "d4bd4e53-6", { k: "kf" }),
                r: e.p({ title: "一键咨询" }),
              },
            )
        );
      },
    }),
    g = e._export_sfc(f, [["__scopeId", "data-v-d4bd4e53"]]);
  wx.createPage(g);
})();
