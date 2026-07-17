!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../base/jAlert/jAlert.js"),
    a = require("../../hooks/useSubscribeMessage.js"),
    o = require("../../utils/api.js"),
    r = require("../../utils/filter.js"),
    n = require("../../utils/getMemberUI.js"),
    l = require("../../utils/helper.js"),
    u = require("../../utils/platform.js"),
    s = require("../../utils/qdTracker.js"),
    i = require("../../utils/utils.js"),
    c = require("../../utils/wxuser.js");
  Array || e.resolveComponent("FloatButtonKf")(), Math || (p + v + d + m + h)();
  const d = () => "../../components/bottomNav.js",
    p = () => "../../components/customCenter/memberCenterUrl.js",
    v = () => "../../components/customCenter/whitespaceLine.js",
    m = () => "../../components/kfDialog.js",
    h = () => "../../components/new/OrderCancelDialog.js",
    g = e.defineComponent({
      __name: "memberCenter",
      setup(d) {
        const p = c.getStorage("config");
        let v = e.ref(c.getStorage("user"));
        const m = e.ref(c.getStorage("wxuser")),
          h = e.ref([]),
          g = e.ref(0),
          f = e.ref(0),
          b = e.ref(!1),
          y = e.ref(!1),
          C = e.ref(!1),
          w = e.ref(""),
          S = e.ref(0),
          D = e.ref(""),
          L = e.ref([]),
          T = e.ref([]),
          N = e.ref(0),
          I = e.ref(6),
          q = e.ref(),
          P = e.ref(""),
          V = e.ref(!1),
          k = e.ref(),
          A = e.ref({
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
          x = {
            setting: "设置",
            memberInfo: "个人资料",
            couponList: "券包",
            memberListPoint: "积分",
            memberAccount: "余额",
            travelOrderList: "酒旅订单",
            orderList: "查看全部订单",
            memberRight: "会员中心",
          },
          { subscribeMessage: _ } = a.useSubscribeMessage(["POINT_CHANGE"]),
          U = e.ref({
            items: [
              {
                business: "invite",
                desc: "邀请好友体验松赞",
                descLogo:
                  "https://website-10049437.cos.ap-shanghai.myqcloud.com/89f83b00-ac5d-4f47-aa00-2c55fb4afc1e",
                logo: "",
                moreDesc: "齐享好礼",
                url: "/pagesB/invite/invite",
              },
            ],
            sortType: "cols",
            title: "",
            titleUrl: "",
            type: "url",
          });
        function j(e) {
          f.value = e.target.current;
        }
        console.log(m.value, "wxuser"), console.log(v.value, "user");
        const $ = e.computed(() => v.value && v.value.memberId),
          B = e.computed(() => {
            let e = 0;
            return (
              v.value &&
                v.value.memberBalanceUsable &&
                (e = v.value.memberBalanceUsable),
              (e = i.addNum(e, S.value)),
              e
            );
          });
        function G(e) {
          q.value.showDialog();
        }
        async function E(e, t) {
          s.qdTracker.track("my_page_click", { button_name: x[t] }),
            "memberListPoint" === t && (await _()),
            i.goPageWithUser(e);
        }
        function F() {
          let e = "",
            t = "",
            a = "";
          v.value &&
            v.value.mobile &&
            ((t = v.value.memberId), (a = v.value.memberToken || "")),
            m.value && m.value.openid && (e = m.value.openid);
          const r = {
            firstResult: 0,
            mobile: "",
            channel: "",
            orderStatus: "1,3,7,8,11",
            payStatus: "",
            pageSize: 15,
            openid: e,
            memberid: t,
            hotelGroupCode: p.hotelGroupCode,
            searchword: "",
            memberToken: a,
            version: "1.0.1",
          };
          o.api.orderAggregation(r).then((e) => {
            if (1 === e.result) {
              const t = {
                  room: "酒店",
                  custom: "私人定制",
                  destpack: "酒店套餐",
                  butcustom: "管家定制",
                  freetravel: "自由行",
                  themegroup: "主题团",
                  shop: "自由行通兑券",
                  activity: "日活动",
                  pack: "组合",
                  spa: "餐饮",
                  travelroom: "酒店",
                },
                a = {
                  room: "icon-a-12_jiudian_hei",
                  custom: "icon-a-16_dingzhilvhang_hei",
                  destpack: "icon-a-12_jiudiantaocan_hui",
                  butcustom: "icon-a-16_dingzhilvhang_hei",
                  freetravel: "icon-a-16_lvhang",
                  themegroup: "icon-a-16_quanbulvhang",
                  shop: "icon-a-16_lvhang",
                  activity: "icon-a-16_huodong",
                  pack: "icon-a-12_jiudiantaocan_hui",
                  spa: "icon-a-16_quanbulvhang",
                  travelroom: "icon-a-12_jiudian_hei",
                },
                o = {
                  1: "待付款",
                  2: "已退款",
                  3: "待出行",
                  4: "退款中",
                  5: "已取消",
                  7: "已完成",
                  8: "待签约",
                  9: "已完成",
                  11: "出行中",
                };
              e.retVal.orderList.forEach((e, r) => {
                if (
                  (("shop" !== e.channel && "activity" !== e.channel) ||
                    (o[3] = "待使用"),
                  "7" === e.orderStatus && (e.orderStatus = "9"),
                  (e.channelDesc = t[e.channel]),
                  (e.iconfont = a[e.channel]),
                  (e.orderStaDesc = o[e.orderStatus]),
                  ("1" !== e.orderStatus && "8" !== e.orderStatus) ||
                    (e.enhanceSta = !0),
                  e.extraJson)
                ) {
                  const t = JSON.parse(e.extraJson);
                  t.prepayHoldSeconds && (e.countdown = t.prepayHoldSeconds),
                    t.couponNo && (e.couponNo = t.couponNo),
                    t.rateSum && (e.price = t.rateSum),
                    t.dscAmount > 0 &&
                      (e.price = i.subtraction(
                        Number(e.price),
                        Number(t.dscAmount),
                      )),
                    (e.webPay = Number(t.webPay)),
                    t.webPay < t.rateSum &&
                      (e.needPay = i.subtraction(
                        Number(t.rateSum),
                        Number(t.webPay),
                      ));
                }
                ["8"].includes(e.orderStatus) && (e.showSign = !0),
                  [
                    "freetravel",
                    "butcustom",
                    "themegroup",
                    "destpack",
                  ].includes(e.channel) &&
                    !e.isOrderGuestFinish &&
                    (e.isNeedAddContact = !0),
                  ["8", "3"].includes(e.orderStatus) &&
                    e.isNeedAddContact &&
                    (e.isShowAddContactBtn = !0),
                  ["2", "3", "4"].includes(e.orderStatus) ||
                  e.isShowAddContactBtn
                    ? (e.showKf = !0)
                    : ["2", "3", "4", "5", "7", "9"].includes(e.orderStatus) ||
                      (e.showCancel = !0),
                  ["1"].includes(e.orderStatus) && (e.showPay = !0),
                  ["9"].includes(e.orderStatus) &&
                    e.extraJson &&
                    "1" === JSON.parse(e.extraJson).invoiceStaV2 &&
                    (e.showInvoice = !0),
                  ["3"].includes(e.orderStatus) &&
                    [
                      "custom",
                      "destpack",
                      "butcustom",
                      "freetravel",
                      "themegroup",
                    ].includes(e.channel) &&
                    e.extraJson &&
                    "F" === JSON.parse(e.extraJson).isTransfer &&
                    (e.showTransfer = !0);
              }),
                (T.value = e.retVal.orderList);
            }
          });
        }
        function M() {
          $.value
            ? e.index.navigateTo({ url: "/pagesB/invite/invite" })
            : i.toLogin();
        }
        return (
          e.onPullDownRefresh(() => {
            setTimeout(() => {
              F(), e.index.stopPullDownRefresh();
            }, 1e3);
          }),
          e.onMounted(() => {
            v.value = c.getStorage("user");
          }),
          e.onShow(() => {
            var a;
            (v.value = c.getStorage("user")),
              v.value && v.value.memberId
                ? (o.api
                    .queryPointsExpiredRemindData({
                      hotelGroupCode: p.hotelGroupCode,
                      memberId: v.value.memberId,
                      channel: "WECHAT",
                    })
                    .then((e) => {
                      if (
                        1 === e.result &&
                        0 === e.retVal.result &&
                        e.retVal.retVal.length > 0
                      ) {
                        const t = e.retVal.retVal[0];
                        w.value = `${t.expirePoint}积分将在${r.timeDay(
                          t.expireDate,
                        )}到期`;
                      }
                    }),
                  v.value.cardListDto.length > 0 &&
                    "PICTURE" === v.value.cardListDto[0].picType &&
                    (D.value = v.value.cardListDto[0].picPath),
                  (function () {
                    const t = {
                      hotelGroupCode: p.hotelGroupCode,
                      allRuleInfo: "T",
                      cardId: v.value.cardId,
                    };
                    o.api.queryMemberUpgradeInfo(t).then((t) => {
                      if (1 === t.result && t.retVal.retVal.length > 0) {
                        const e = [];
                        t.retVal.retVal.forEach((t) => {
                          const a =
                              t.originalCardInfoDto
                                .cardAutoUpDegradeInfoDetailList[0],
                            o = t.originalCardInfoDto.isMatchCondition,
                            n = Number(a.actualQuotaValue);
                          if (
                            ((a.quotaDescript =
                              {
                                pay: "元",
                                recharge: "元",
                                accountBalance: "元",
                                timesIn: "次",
                                noShowTimes: "次",
                                cancelTimes: "次",
                                point: "积分",
                                nights: "房晚",
                                rsvChannelNights: "房晚",
                                closeEnd: "订单完成时",
                              }[a.quota] || ""),
                            "KEEP" === t.autoUpDownGradeCfgInfoDto.ruleType &&
                              v.value.cardLevel ===
                                t.autoUpDownGradeCfgInfoDto.oldCardLevel &&
                              (o
                                ? e.push({
                                    quotaValue: a.quotaValue,
                                    cardLevelDescript:
                                      t.autoUpDownGradeCfgInfoDto
                                        .cardLevelDescript,
                                    type: "KEEP",
                                    actualQuotaValue: n,
                                    desc: `距保级还需${r.valFormat(
                                      i.subtraction(a.quotaValue, Number(n)),
                                    )}${a.quotaDescript}`,
                                    speed: `width:${(n / a.quotaValue) * 100}%`,
                                    isMatchCondition: o,
                                  })
                                : e.unshift({
                                    quotaValue: a.quotaValue,
                                    cardLevelDescript:
                                      t.autoUpDownGradeCfgInfoDto
                                        .cardLevelDescript,
                                    type: "KEEP",
                                    actualQuotaValue: n,
                                    desc: `距保级还需${r.valFormat(
                                      i.subtraction(a.quotaValue, Number(n)),
                                    )}${a.quotaDescript}`,
                                    speed: `width:${(n / a.quotaValue) * 100}%`,
                                    isMatchCondition: o,
                                  })),
                            "UP" === t.autoUpDownGradeCfgInfoDto.ruleType &&
                              v.value.cardLevel ===
                                t.autoUpDownGradeCfgInfoDto.oldCardLevel)
                          ) {
                            const o = {
                              quotaValue: a.quotaValue,
                              cardLevelDescript:
                                t.autoUpDownGradeCfgInfoDto.cardLevelDescript,
                              type: "UP",
                              actualQuotaValue: n,
                              desc: `累计${r.valFormat(n)}${
                                a.quotaDescript
                              }，距升级还需${r.valFormat(
                                i.subtraction(a.quotaValue, Number(n)),
                              )}${a.quotaDescript}`,
                              speed: `width:${(n / a.quotaValue) * 100}%`,
                            };
                            a.quotaValue < n &&
                              ((o.desc = `累计${a.quotaValue}${a.quotaDescript},即将升级`),
                              (o.speed = "width:100%")),
                              e.push(o);
                          }
                        }),
                          e.length > 0 &&
                            ((L.value = []),
                            1 === e.length &&
                            "KEEP" === e[0].type &&
                            e[0].isMatchCondition
                              ? L.value.push({
                                  type: "KEEP",
                                  desc: "已完成保级",
                                  speed: "width:100%",
                                })
                              : L.value.push(e[0]));
                      }
                      0 === v.value.cardLevel.indexOf("JG") &&
                        ((L.value = []),
                        L.value.push({
                          type: "KEEP",
                          desc: `已成为${v.value.cardLevelDescript}会员${e
                            .dayjs(e.dayjs())
                            .diff(e.dayjs(v.value.beginLevelDate), "day")}天`,
                          speed: "width:100%",
                          isHideProcess: !0,
                        }));
                    });
                  })(),
                  o.api
                    .getUserAvailableCardList({
                      hotelCode: p.hotelCode,
                      hotelGroupCode: p.hotelGroupCode,
                      mobile: v.value.mobile,
                      vidType: 2,
                      scrollSize: 100,
                      cardType: 1,
                      cardStatus: 200,
                    })
                    .then((e) => {
                      1 === e.result &&
                        e.retVal.data &&
                        e.retVal.data.scrollList.length > 0 &&
                        ((S.value = 0),
                        e.retVal.data.scrollList.forEach((e) => {
                          S.value = i.addNum(S.value, e.cardBalance);
                        }));
                    }),
                  i.refreshMemberInfo((e) => {
                    v.value = e;
                  }),
                  F(),
                  (P.value = n.getMemberUI(v.value.cardLevel).memberCenterBg))
                : (P.value = n.getMemberUI("").memberCenterBg),
              e.index.getSystemInfo({
                success: (e) => {
                  const t = u.getMenuButtonBoundingClientRect();
                  console.log("menuButton:", t),
                    (g.value = t.top + (t.height - 20) / 2);
                },
                fail(e) {
                  console.log(e);
                },
              }),
              o.api
                .selectInvitationSpoilRules({
                  level: null == (a = v.value) ? void 0 : a.cardLevel,
                  hotelGroupCode: p.hotelGroupCode,
                  hotelCode: p.hotelCode,
                })
                .then((e) => {
                  1 === e.result
                    ? e.retVal.length && (C.value = !0)
                    : t.jAlert3(e.msg);
                }),
              (function () {
                const t = {
                  appid: p.appid,
                  componentAppid: p.componentAppid,
                  hotelGroupCode: p.hotelGroupCode,
                  hotelCode: p.hotelCode,
                  clientType: "wechat_mini",
                };
                o.api.getShopMemberCenterConfig(t).then((t) => {
                  if (1 === t.result && t.retVal.info) {
                    const a = JSON.parse(t.retVal.info);
                    if (a) {
                      const t = a.show;
                      if (t) {
                        const a = JSON.parse(t);
                        a &&
                          ((h.value = a.value),
                          console.log(h),
                          h.value.forEach((t) => {
                            "config" === t.type &&
                              e.index.setNavigationBarTitle({ title: t.title });
                          }));
                      }
                    }
                  }
                });
              })(),
              c.getStorage("wxuser") &&
                c.getStorage("wxuser").avatarUrl &&
                (m.value.avatarUrl = c.getStorage("wxuser").avatarUrl);
          }),
          e.onUnload(() => {
            clearInterval(N.value);
          }),
          (t, a) => {
            var o, n, u;
            return e.e(
              {
                a: g.value + "px",
                b: e.o((e) => E("/pagesA/member/setting", "setting")),
                c: P.value,
                d: $.value,
              },
              $.value
                ? {
                    e: e.unref(v).headPortraitUrl
                      ? e.unref(v).headPortraitUrl
                      : "https://dsplatweb.oss-cn-chengdu.aliyuncs.com/songzan/images/avatar.png",
                    f: e.t(
                      e.unref(v).nickname ? e.unref(v).nickname : "松赞家人",
                    ),
                    g: e.o((e) => E("/pagesA/member/memberInfo", "memberInfo")),
                  }
                : {
                    h: e.o(
                      (...t) => e.unref(i.toLogin) && e.unref(i.toLogin)(...t),
                    ),
                  },
              { i: $.value },
              $.value
                ? {
                    j: e.t(
                      e.unref(r.valFormat)(e.unref(v) && e.unref(v).couponNum),
                    ),
                  }
                : {},
              {
                k: e.t(x.couponList),
                l: e.o((e) => E("/pagesA/member/couponList", "couponList")),
                m: $.value,
              },
              $.value
                ? {
                    n: e.t(
                      e.unref(r.valFormat)(
                        e.unref(v) && e.unref(v).pointBalance,
                      ),
                    ),
                  }
                : {},
              {
                o: e.t(x.memberListPoint),
                p: e.o((e) =>
                  E("/pagesA/member/memberListPoint", "memberListPoint"),
                ),
                q: $.value,
              },
              $.value ? { r: e.t(e.unref(r.valFormat)(B.value)) } : {},
              {
                s: e.t(x.memberAccount),
                t: e.o((e) =>
                  E("/pagesA/member/memberAccount", "memberAccount"),
                ),
                v: $.value && w.value,
              },
              $.value && w.value ? { w: e.t(w.value) } : {},
              {
                x: e.t(x.travelOrderList),
                y: e.o((e) => E("/pages/member/orderList", "travelOrderList")),
                z: e.o(
                  (e) => (
                    s.qdTracker.track("my_page_click", {
                      button_name: "风物订单",
                    }),
                    void i.goPageWithUser("/pages/member/orderList?orderType=2")
                  ),
                ),
                A: $.value && T.value.length > 0,
              },
              $.value && T.value.length > 0
                ? e.e(
                    {
                      B: e.f(T.value, (t, a, o) =>
                        e.e(
                          { a: a < I.value },
                          a < I.value
                            ? e.e(
                                {
                                  b: t.link
                                    ? e.unref(l.imageMogr2)(t.link, "96x")
                                    : "https://dsplatweb.oss-cn-chengdu.aliyuncs.com/songzan/images/defaultImage.png",
                                  c: e.t(t.title),
                                  d: e.t(t.orderStaDesc),
                                  e: t.countTime,
                                },
                                t.countTime ? { f: e.t(t.countTime) } : {},
                                { g: t.enhanceSta ? 1 : "", h: t.showPay },
                                t.showPay
                                  ? {
                                      i: e.o(
                                        (a) =>
                                          (function (t) {
                                            let a = `/pagesB/other/pay?orderNo=${
                                              "shop" === t.channel
                                                ? t.orderId
                                                : t.orderNo
                                            }&productType=${
                                              {
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
                                              }[t.channel]
                                            }`;
                                            "T" === t.agency &&
                                              "F" === t.isAgency &&
                                              (a += "&contractFlag=1"),
                                              t.isNeedAddContact &&
                                                (a += "&addContactFlag=1"),
                                              e.index.navigateTo({ url: a });
                                          })(t),
                                        a,
                                      ),
                                    }
                                  : t.isShowAddContactBtn
                                    ? {
                                        k: e.o(
                                          (e) =>
                                            (function (e) {
                                              let t =
                                                "/pagesB/travel/orderGuest?orderNo=" +
                                                e.orderNo;
                                              "T" === e.agency &&
                                                "F" === e.isAgency &&
                                                (t += "&contractFlag=1"),
                                                i.goPage(t);
                                            })(t),
                                          a,
                                        ),
                                      }
                                    : t.showSign
                                      ? {
                                          m: e.o(
                                            (e) =>
                                              (function (e) {
                                                i.goPage(
                                                  "/pagesB/travel/tips?orderNo=" +
                                                    e.orderNo,
                                                );
                                              })(t),
                                            a,
                                          ),
                                        }
                                      : t.showTransfer &&
                                          !["room", "destpack"].includes(
                                            t.channel,
                                          )
                                        ? {
                                            o: e.o(
                                              (a) =>
                                                (function (t) {
                                                  e.index.navigateTo({
                                                    url:
                                                      "/pagesD/trip/takeInfo?orderNo=" +
                                                      t.orderNo,
                                                  });
                                                })(t),
                                              a,
                                            ),
                                          }
                                        : t.showInvoice
                                          ? {
                                              q: e.o(
                                                (a) =>
                                                  (function (t) {
                                                    e.index.navigateTo({
                                                      url: `/pagesF/invoice/applyInvoice?orderNo=${
                                                        t.orderNo
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
                                                        }[t.channel]
                                                      }&productType=${
                                                        A.value[t.channel]
                                                      }`,
                                                    });
                                                  })(t),
                                                a,
                                              ),
                                            }
                                          : t.showCancel
                                            ? {
                                                s: e.o(
                                                  (e) =>
                                                    (function (e) {
                                                      (k.value = e),
                                                        (V.value = !0);
                                                    })(t),
                                                  a,
                                                ),
                                              }
                                            : t.showKf
                                              ? { v: e.o((e) => G(), a) }
                                              : {},
                                {
                                  j: t.isShowAddContactBtn,
                                  l: t.showSign,
                                  n:
                                    t.showTransfer &&
                                    !["room", "destpack"].includes(t.channel),
                                  p: t.showInvoice,
                                  r: t.showCancel,
                                  t: t.showKf,
                                  w: e.o(
                                    (a) =>
                                      (function (t) {
                                        return "room" === t.channel
                                          ? (e.index.navigateTo({
                                              url: `/pagesC/order/orderInfo?orderNo=${t.orderNo}&hotelCode=${t.hotelCode}`,
                                            }),
                                            !1)
                                          : "freetravel" === t.channel ||
                                              "themegroup" === t.channel ||
                                              "destpack" === t.channel ||
                                              "custom" === t.channel ||
                                              "butcustom" === t.channel ||
                                              "travelroom" === t.channel
                                            ? (e.index.navigateTo({
                                                url:
                                                  "/pagesB/travel/orderDetail?orderNo=" +
                                                  t.orderNo,
                                              }),
                                              !1)
                                            : "shop" === t.channel
                                              ? (e.index.navigateTo({
                                                  url: `/pagesB/travel/orderDetail?orderId=${t.orderId}&orderNo=${t.orderNo}&productType=shop`,
                                                }),
                                                !1)
                                              : "activity" === t.channel
                                                ? (e.index.navigateTo({
                                                    url: `/pagesE/dailyActivity/dailyOrderDetail?orderNo=${t.orderNo}&productType=activity`,
                                                  }),
                                                  !1)
                                                : void 0;
                                      })(t),
                                    a,
                                  ),
                                },
                              )
                            : {},
                          { x: a },
                        ),
                      ),
                      C: b.value,
                      D: y.value,
                      E: e.o(j),
                      F: T.value.length > I.value,
                    },
                    T.value.length > I.value
                      ? {
                          G: e.t(x.orderList),
                          H: e.o((e) =>
                            E("/pages/member/orderList", "orderList"),
                          ),
                        }
                      : {},
                    {
                      I: e.f(T.value, (t, a, o) =>
                        e.e(
                          { a: a < I.value },
                          a < I.value ? { b: a === f.value ? 1 : "" } : {},
                          { c: a },
                        ),
                      ),
                      J: T.value.length < I.value ? 1 : "",
                    },
                  )
                : {},
              { K: $.value && T.value.length > 0 ? 1 : "", L: $.value },
              $.value
                ? e.e(
                    {
                      M: e.t(e.unref(v).cardLevelDescript),
                      N: L.value.length > 0,
                    },
                    L.value.length > 0 ? { O: e.t(L.value[0].desc) } : {},
                    { P: L.value.length > 0 },
                    L.value.length > 0 ? { Q: e.s(L.value[0].speed) } : {},
                    {
                      R: `url(${D.value})`,
                      S: e.o((e) =>
                        E("/pagesA/member/memberRight", "memberRight"),
                      ),
                    },
                  )
                : {},
              { T: C.value },
              C.value ? { U: e.o(M), V: e.p({ datas: U.value }) } : {},
              {
                W: e.f(h.value, (t, a, o) =>
                  e.e(
                    { a: "url" === t.type },
                    "url" === t.type
                      ? {
                          b: a,
                          c: e.o(G, a),
                          d: "d8dd45c3-1-" + o,
                          e: e.p({ datas: t }),
                        }
                      : {},
                    { f: "whitespace" === t.type },
                    "whitespace" === t.type
                      ? {
                          g: a,
                          h: e.o(G, a),
                          i: "d8dd45c3-2-" + o,
                          j: e.p({ datas: t }),
                        }
                      : {},
                  ),
                ),
                X: e.sr(q, "d8dd45c3-4", { k: "kf" }),
                Y: e.p({ title: "一键咨询" }),
                Z: !V.value,
                aa: e.o((e) => (V.value = e)),
                ab: e.p({
                  "order-no": null == (o = k.value) ? void 0 : o.orderNo,
                  "order-id": null == (n = k.value) ? void 0 : n.orderId,
                  "product-type":
                    A.value[null == (u = k.value) ? void 0 : u.channel],
                  show: V.value,
                }),
              },
            );
          }
        );
      },
    }),
    f = e._export_sfc(g, [["__scopeId", "data-v-d8dd45c3"]]);
  wx.createPage(f);
})();
