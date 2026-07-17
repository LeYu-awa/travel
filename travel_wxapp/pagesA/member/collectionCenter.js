!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    o = require("../../base/common.js"),
    t = require("../../base/jAlert/jAlert.js"),
    r = require("../../hooks/useSubscribeMessage.js"),
    l = require("../../utils/api.js"),
    u = require("../../utils/filter.js"),
    a = require("../../utils/qdTracker.js"),
    c = require("../../utils/utils.js"),
    n = require("../../utils/wxuser.js"),
    i = () => "../../components/empty.js",
    s = e.defineComponent({
      name: "CollectionCenter",
      components: {
        RetryModal: () => "../../components/RetryModal.js",
        empty: i,
      },
      props: { title: { type: String, default: () => "" } },
      setup() {
        const s = n.getStorage("config"),
          d = n.getStorage("user"),
          p = e.ref(!1),
          m = e.ref([]),
          h = e.ref([]),
          g = e.ref(0),
          C = e.ref(0),
          v = e.ref(!0),
          y = e.ref(""),
          T = e.ref([]),
          f = e.ref(!1),
          N = e.ref(null),
          { subscribeMessage: b } = r.useSubscribeMessage([
            "COUPON_CREDITED",
            "COUPON_VALID",
            "NEW_ACTIVITY_MA",
          ]),
          k = () => {
            p.value = !0;
          },
          I = () => {
            p.value = !1;
          },
          j = (o = !1) => {
            o && e.index.showLoading({ title: "加载中..." });
            const r = {
              hotelGroupCode: s.hotelGroupCode,
              hotelCode: s.hotelCode,
              memberId: d.memberId,
              cardLevel: d.cardLevel,
            };
            l.api.getCanReceivedListNew(r).then((r) => {
              console.log(r),
                1 === r.result
                  ? (r.retVal.forEach((e) => (e.check = !1)),
                    (m.value = r.retVal),
                    (v.value = !1),
                    o && e.index.hideLoading())
                  : (t.jAlert3(r.msg), o && e.index.hideLoading());
            });
          };
        return (
          e.onMounted(() => {
            j(!0);
          }),
          {
            showGet: p,
            pageData: m,
            selectNum: g,
            totalNum: C,
            couponList: h,
            couponListName: y,
            user: d,
            receive: async function (e) {
              if (
                (console.log(s, "config"),
                console.log(d, "user"),
                console.log(e, "item"),
                (N.value = e),
                "T" !== d.isRealName && "KXQQ" === e.discountType)
              )
                return (
                  t.jAlert3("请在完成实名后领取！"),
                  void setTimeout(() => {
                    c.goPageWithUser(
                      "/pagesA/member/memberAuth?from=colletion",
                    );
                  }, 1500)
                );
              if (
                ("memberConsume" !== e.ruleType &&
                  "memberRegister" !== e.ruleType &&
                  "member" !== e.ruleType &&
                  "orderPendding" !== e.ruleType) ||
                !e.memberType[0]
              ) {
                const r = {
                  hotelGroupCode: s.hotelGroupCode,
                  hotelGroupCodes: s.hotelGroupCode,
                  hotelCode: s.hotelCode,
                  memberId: d.memberId,
                  couponCode: e.couponCode,
                  couponType: e.couponType,
                  mobile: d.mobile,
                  cardId: d.cardId,
                  cardNo: d.cardNo,
                  appid: s.appid,
                  hotelId: s.hotelId,
                  hotelGroupId: s.hotelGroupId,
                  cardLevel: d.cardLevel,
                };
                await b(),
                  l.api
                    .receiveSCCouponNewTransfer(r)
                    .then((e) => {
                      if ((console.log(e, "领取接口"), 1 === e.result)) {
                        (f.value = !1), (N.value = null);
                        const { couponDetailList: r } = e.retVal;
                        (null == r ? void 0 : r.length) > 0 &&
                          (null == r ||
                            r.forEach((e) => {
                              a.qdTracker.track("mini_receive_coupon", {
                                coupon_id: e.no,
                                coupon_name: e.descript,
                                coupon_type: o.couponTypeMeta[e.couponType],
                                coupon_code: e.couponCode,
                                current_module_name: "领券中心",
                              });
                            })),
                          j(),
                          I(),
                          t.jAlert3("领取成功");
                      } else t.jAlert3(e.msg);
                    })
                    .catch((e) => {
                      ((null == e ? void 0 : e.code) !==
                        o.RateLimitStatusCode &&
                        (null == e ? void 0 : e.status) !==
                          o.RateLimitStatusCode) ||
                        (f.value = !0);
                    });
              } else
                (h.value = e.memberType[0].runRecordDetailDtoList),
                  (g.value = Number(e.memberType[0].selectedNum)),
                  (y.value = e.memberType[0].promotionName),
                  (C.value = e.memberType[0].totalNum),
                  k(),
                  console.log(h);
            },
            onCheck: (e) => {
              if (!e.check && g.value === T.value.length) return;
              e.check = !e.check;
              let o = [];
              (o = h.value.filter((e) => e.check)),
                (T.value = o),
                console.log(T.value, "checkArr.value");
            },
            checkArr: T,
            isRateLimited: f,
            showDialog: k,
            hideDialog: I,
            confirm: async function () {
              let e = [];
              const r = [],
                u = [],
                c = [];
              if (
                ((e = h.value.filter((e) => e.check)),
                (T.value = e),
                e.forEach((e) => {
                  "COUPON" === e.type
                    ? r.push(e.rewardValue)
                    : "ACCOUNT" === e.type
                      ? u.push(e.rewardValue)
                      : "POINT" === e.type
                        ? c.push(e.rewardValue)
                        : r.push(e.rewardValue);
                }),
                console.log(h.value),
                console.log(e),
                e.length !== g.value)
              )
                return void t.jAlert3(`所选项数量应为${g.value}项！`);
              const n = h.value[0].promotionCode,
                i = h.value[0].promotionNo;
              h.value[0].type;
              const p = {
                hotelGroupCode: s.hotelGroupCode,
                rewardValue: r.length ? r.join(",") : "",
                treatMoney: u.length ? u.join(",") : "",
                treatPoint: c.length ? c.join(",") : "",
                promotionCode: n,
                promotionNo: i,
                couponCode: "",
                hotelCode: s.hotelCode,
                memberId: d.memberId,
                mobile: d.mobile,
                cardId: d.cardId,
                cardNo: d.cardNo,
                appid: s.appid,
                hotelId: s.hotelId,
                hotelGroupId: s.hotelGroupId,
                cardLevel: d.cardLevel,
              };
              await b(),
                l.api
                  .receiveSCCouponNewTransfer(p)
                  .then((e) => {
                    if (1 === e.result) {
                      const { couponDetailList: r } = e.retVal;
                      (null == r ? void 0 : r.length) > 0 &&
                        (null == r ||
                          r.forEach((e) => {
                            a.qdTracker.track("mini_receive_coupon", {
                              coupon_id: e.no,
                              coupon_name: e.descript,
                              coupon_type: o.couponTypeMeta[e.couponType],
                              coupon_code: e.couponCode,
                              current_module_name: "领券中心",
                            });
                          })),
                        j(),
                        I(),
                        t.jAlert3("领取成功！");
                    } else t.jAlert3(e.msg);
                  })
                  .catch((e) => {
                    ((null == e ? void 0 : e.code) !== o.RateLimitStatusCode &&
                      (null == e ? void 0 : e.status) !==
                        o.RateLimitStatusCode) ||
                      (f.value = !0);
                  });
            },
            isAjax: v,
            empty: i,
            getReallyPx: c.getReallyPx,
            valFormat: u.valFormat,
            currCouponItem: N,
          }
        );
      },
    });
  Array ||
    (
      e.resolveComponent("coustom-head") +
      e.resolveComponent("empty") +
      e.resolveComponent("RetryModal")
    )();
  const d = e._export_sfc(s, [
    [
      "render",
      function (o, t, r, l, u, a) {
        return e.e(
          {
            a: e.p({
              title: "领券中心",
              color: "#fff",
              position: "absolute",
              "native-mode": !0,
            }),
            b: e.f(o.pageData, (t, r, l) =>
              e.e(
                { a: "GIFTCOUPON" === t.groupCode },
                (t.groupCode, {}),
                { b: "CONSUMERCOUPON" === t.groupCode },
                (t.groupCode, {}),
                { c: "EXPERIENCECOUPON" === t.groupCode },
                (t.groupCode, {}),
                { d: "EXCHANGECOUPON" === t.groupCode },
                (t.groupCode, {}),
                {
                  e: e.t(t.name),
                  f: t.groupCode ? o.getReallyPx(20) + "px" : "0",
                  g: e.t(t.secondName),
                  h: t.couponTypeName && 0 !== t.presentValue,
                },
                t.couponTypeName && 0 !== t.presentValue
                  ? {
                      i: e.t(
                        "MZ" === t.discountType || "LZ" === t.discountType
                          ? (10 * t.presentValue || 0) + "折"
                          : "￥" + o.valFormat(t.presentValue),
                      ),
                    }
                  : {},
                {
                  j:
                    "memberConsume" === t.ruleType ||
                    "memberRegister" === t.ruleType ||
                    "member" === t.ruleType ||
                    "orderPendding" === t.ruleType,
                },
                "memberConsume" === t.ruleType ||
                  "memberRegister" === t.ruleType ||
                  "member" === t.ruleType ||
                  "orderPendding" === t.ruleType
                  ? { k: e.o((e) => o.receive(t), r) }
                  : "T" === t.canReceived &&
                      0 !== t.stock &&
                      ("KXQQ" !== t.discountType ||
                        ("KXQQ" === t.discountType &&
                          "T" === o.user.isRealName))
                    ? { m: e.o((e) => o.receive(t), r) }
                    : "KXQQ" === t.discountType && "T" !== o.user.isRealName
                      ? { o: e.o((e) => o.receive(t), r) }
                      : { p: e.t("T" === t.canReceived ? "取" : "完") },
                {
                  l:
                    "T" === t.canReceived &&
                    0 !== t.stock &&
                    ("KXQQ" !== t.discountType ||
                      ("KXQQ" === t.discountType && "T" === o.user.isRealName)),
                  n: "KXQQ" === t.discountType && "T" !== o.user.isRealName,
                  q: r,
                },
              ),
            ),
            c: 0 === o.pageData.length && !o.isAjax,
          },
          0 !== o.pageData.length || o.isAjax
            ? {}
            : {
                d: e.p({
                  tips: "暂无可领券",
                  "sub-tips": "松赞，期待与您相遇。",
                }),
              },
          { e: o.showGet },
          o.showGet
            ? e.e(
                {
                  f: e.t(`${o.couponListName}${o.totalNum}选${o.selectNum}`),
                  g: e.o((...e) => o.hideDialog && o.hideDialog(...e)),
                  h: e.f(o.couponList, (t, r, l) =>
                    e.e(
                      { a: e.t(t.descript), b: t.introduction },
                      t.introduction ? { c: t.introduction } : {},
                      { d: "POINT" === t.type },
                      "POINT" === t.type
                        ? { e: e.t(o.valFormat(t.rewardValue)) }
                        : {},
                      { f: o.selectNum !== o.checkArr.length || t.check },
                      o.selectNum !== o.checkArr.length || t.check
                        ? e.e(
                            { g: !t.check },
                            (t.check, {}),
                            { h: t.check },
                            (t.check, {}),
                          )
                        : {},
                      { i: r, j: e.o((e) => o.onCheck(t), r) },
                    ),
                  ),
                  i: o.selectNum === o.checkArr.length,
                },
                o.selectNum === o.checkArr.length
                  ? { j: e.o((...e) => o.confirm && o.confirm(...e)) }
                  : {},
              )
            : {},
          {
            k: e.o((e) => o.receive(o.currCouponItem)),
            l: e.o((e) => (o.isRateLimited = e)),
            m: e.p({ visible: o.isRateLimited }),
          },
        );
      },
    ],
    ["__scopeId", "data-v-5efcbd53"],
  ]);
  wx.createPage(d);
})();
