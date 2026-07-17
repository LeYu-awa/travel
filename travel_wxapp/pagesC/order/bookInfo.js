!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    a = require("../../base/common.js"),
    o = require("../../base/jAlert/jAlert.js"),
    t = require("../../hooks/useAdReport.js"),
    l = require("../../hooks/useCouponExclusion.js"),
    u = require("../../hooks/useScanCoupon.js"),
    r = require("../../hooks/useSubscribeMessage.js"),
    v = require("../../hooks/useXhsReport.js"),
    n = require("../../utils/api.js"),
    i = require("../../utils/filter.js"),
    c = require("../../utils/makeOrder.js"),
    d = require("../../utils/qdTracker.js"),
    s = require("../../utils/umengAdaptor.js"),
    p = require("../../utils/utils.js"),
    m = require("../../utils/wxuser.js");
  Array ||
    (e.resolveComponent("mp-html") + e.resolveComponent("FloatButtonKf"))(),
    Math ||
      (
        g +
        (() => "../../uni_modules/mp-html/components/mp-html/mp-html.js") +
        f +
        C +
        h +
        y +
        T
      )();
  const f = () => "../../components/bottomDialog.js",
    h = () => "../../components/couponItem.js",
    g = () => "../../components/coustomHead.js",
    C = () => "../../components/empty.js",
    y = () => "../../components/new/CustomerRetentionDialog.js",
    T = () => "../../components/RetryModal.js",
    D = e.defineComponent({
      __name: "bookInfo",
      setup(f) {
        const h = v.useXshReport(),
          { checkExclusion: g } = l.useCouponExclusion(),
          { scanCode: C, bindCoupon: y, exchangeCoupon: T } = u.useScanCoupon(),
          D = t.useAdReport(),
          { subscribeMessage: b } = r.useSubscribeMessage([
            "SINGLE_ROOM_PAY_SUCCESS",
            "SINGLE_CANCEL_NOTICE",
          ]);
        setTimeout(() => {
          D("VIEW_CONTENT", { object: "hotelConfirmOrder" });
        }, 300);
        const N = m.getStorage("config"),
          I = m.getStorage("user"),
          E = m.getStorage("wxuser"),
          j = e.ref(""),
          A = e.ref(""),
          R = e.ref(""),
          _ = e.ref(""),
          F = e.ref(""),
          M = e.ref(""),
          k = e.ref(""),
          L = e.ref(""),
          V = e.ref(""),
          x = e.ref(""),
          G = e.ref(""),
          P = e.ref(""),
          O = e.ref(""),
          S = e.ref(1),
          Y = e.ref(""),
          H = e.ref(""),
          q = e.ref(""),
          w = e.ref(""),
          B = e.ref(""),
          U = e.ref(""),
          $ = e.ref(""),
          W = e.ref(""),
          X = e.ref(""),
          K = e.ref(""),
          Q = e.ref(!1),
          z = e.ref(!1),
          J = e.ref(""),
          Z = e.ref(!0),
          ee = e.ref([]),
          ae = e.ref(""),
          oe = e.ref(""),
          te = e.ref(0),
          le = e.ref([]),
          ue = e.ref(""),
          re = e.ref(!0),
          ve = e.ref(0),
          ne = e.ref([]),
          ie = e.ref(""),
          ce = e.ref(),
          de = e.ref(),
          se = e.ref(),
          pe = e.ref([]),
          me = e.ref([0]),
          fe = e.ref(""),
          he = e.ref(""),
          ge = e.reactive(m.getStorage("hotelOrderRoom")),
          Ce = e.ref(""),
          ye = e.ref([]),
          Te = e.ref(!1),
          De = e.ref(!1),
          be = e.ref(0),
          Ne = e.ref(!1),
          Ie = e.ref([
            {
              name: "",
              guestId: "",
              mobile: "",
              idCode: "",
              idNo: "",
              sex: "",
            },
          ]),
          Ee = e.reactive({
            "01": "身份证",
            "02": "临时身份证",
            14: "护照",
            21: "港澳通行证",
          }),
          je = e.ref(""),
          Ae = e.ref(),
          Re = e.ref("");
        e.ref(!0);
        const _e = e.ref([]),
          Fe = e.ref(""),
          Me = e.ref(!0),
          ke = e.ref(""),
          Le = e.ref(!1),
          Ve = e.ref(""),
          xe = e.ref(0),
          Ge = e.ref(0),
          Pe = e.ref(0),
          Oe = e.ref(0);
        if (
          (ge.roomDescript && _e.value.push(ge.roomDescript),
          ge.productTags && ge.productTags.length > 0)
        ) {
          const e = [];
          ge.productTags.forEach((a) => {
            e.push(a.tagName);
          }),
            (Fe.value = e.join(","));
        }
        ge.gcRoomExtra &&
          ge.gcRoomExtra.bedNum &&
          ge.gcRoomExtra.bedType &&
          _e.value.push(`${ge.gcRoomExtra.bedType}床x${ge.gcRoomExtra.bedNum}`);
        const Se = e.computed(() => {
            const e = new Date(A.value.replace(/-/g, "/")).getTime();
            let a = new Date(R.value.replace(/-/g, "/")).getTime() - e;
            return (a = Math.round(a / 864e5)), a;
          }),
          Ye = e.computed(() => {
            let e = 0;
            for (let a = 0; a < ne.value.length; a++)
              ne.value[a].choosed && e++;
            return e;
          });
        function He() {
          (De.value = !1), (Te.value = !0);
        }
        function qe(e) {
          De.value = e.showGuardDialog;
        }
        function we() {
          C().then((e) => {
            y(e).then((e) => {
              o.jAlert3("兑换成功"), oa();
            });
          });
        }
        function Be() {
          T(Ve.value).then((e) => {
            (Ve.value = ""), o.jAlert3("兑换成功"), oa();
          });
        }
        function Ue(e) {
          Le.value = e;
        }
        function $e() {
          (ee.value = []),
            ne.value.forEach((e, a) => {
              e.choosed && ee.value.push(e);
            }),
            de.value.hideDialog();
        }
        function We() {}
        async function Xe(e) {
          if (
            (Se.value > 1 || S.value > 1) &&
            ("FR" === e.couponType || "RF" === e.couponType)
          )
            return o.jAlert3("当前优惠券只能选一个房晚"), !1;
          for (let a = 0; a < ne.value.length; a++) {
            if (("FR" === e.couponType || "RF" === e.couponType) && e.choosed)
              return (e.choosed = !e.choosed), !1;
            if (
              ("FR" === ne.value[a].couponType && ne.value[a].choosed) ||
              ("RF" === e.couponType && ne.value[a].choosed)
            )
              return o.jAlert3("此券仅限使用一张"), !1;
          }
          if (Ye.value >= ve.value && !e.choosed)
            return o.jAlert3(`可使用优惠券数${ve.value}张`);
          if (!e.choosed) {
            const a = ne.value.filter((e) => e.choosed).map((e) => e.couponNo);
            if (await g(e.couponNo, a)) return !1;
          }
          e.choosed = !e.choosed;
        }
        function Ke() {
          ce.value.showDialog();
        }
        function Qe(a) {
          let t = S.value;
          if (
            "plus" === a &&
            ee.value.length > 0 &&
            ("FR" === ee.value[0].couponType || "RF" === ee.value[0].couponType)
          )
            return o.jAlert3("当前优惠券只能选一个房晚"), !1;
          if ("mins" === a) {
            if (ee.value.length === S.value && S.value > 1)
              return (
                o.jAlert3(
                  "您当前选择的房间数量小于可使用的优惠券数量,请先取消一张优惠券再选择房间数量",
                ),
                !1
              );
            if (S.value <= 1) return !1;
            if (Q.value) return !1;
            t = S.value - 1;
          } else "plus" === a && (t = S.value + 1);
          if (z.value) return !1;
          z.value = !0;
          const l = {
            rmNum: t,
            fromDate: A.value,
            toDate: R.value,
            rsvMan: "testMan",
            mobile: 18888888888,
            remark: J.value,
            hotelCode: G.value,
            hotelGroupCode: W.value || N.hotelGroupCode,
            clientChannel: "WECHAT",
            otaChannel: X.value,
            productCode: j.value,
            openid: E.openid,
            memberNo: "",
            cardLevel: "",
            cardType: "",
            memberId: "",
            checkInGuests: [{ name: "testMan" }],
            appid: N.appid,
            componentAppid: N.componentAppid,
            srcHotelGroupCode: N.hotelGroupCode,
          };
          I &&
            I.memberId &&
            ((l.memberNo = I.cardNo ? I.cardNo : ""),
            (l.cardLevel = I.cardLevel ? I.cardLevel : ""),
            (l.cardType = I.cardType ? I.cardType : ""),
            (l.memberId = I.memberId ? I.memberId : "")),
            n.api.resrvCheck(c.makeOrder(l)).then((l) => {
              (z.value = !1),
                1 === l.result
                  ? (0 === l.retVal.isBookAble &&
                      ((Z.value = !0),
                      (Q.value = !1),
                      (S.value = t),
                      (function (e) {
                        "mins" === e
                          ? Ie.value.pop()
                          : "plus" === e &&
                            Ie.value.push({ name: "", idNo: "" });
                      })(a),
                      "init" === a &&
                        ((ae.value =
                          l.retVal.gcProductDetailDto.arrivalFrom || "12:00"),
                        (oe.value =
                          l.retVal.gcProductDetailDto.arrivalTo || "23:59"),
                        l.retVal.gcProductDetailDto &&
                          l.retVal.gcProductDetailDto.productGcLevel &&
                          "000" !==
                            l.retVal.gcProductDetailDto.productGcLevel &&
                          ((Me.value = !1),
                          I &&
                            I.memberId &&
                            n.api
                              .getAllCardLevel({
                                isPhysical: "F",
                                hotelGroupId: N.hotelGroupId,
                                hotelGroupCode: N.hotelGroupCode,
                                cardType: I.cardType,
                              })
                              .then((e) => {
                                1 === e.result &&
                                  e.retVal.listLevelDto &&
                                  e.retVal.listLevelDto.length > 0 &&
                                  e.retVal.listLevelDto.forEach((e) => {
                                    console.log(e.code, I.cardLevel),
                                      e.code === I.cardLevel &&
                                        (ke.value = `已享受${e.descript}会员价`);
                                  });
                              })))),
                    (te.value = Number(l.retVal.rateSum)),
                    l.retVal.everyDayDetails.forEach((a, o) => {
                      (a.rsvDateDesc = a.rsvDate),
                        (a.rsvDate = e.dayjs(a.rsvDate).format("MM-DD"));
                    }),
                    (le.value = l.retVal.everyDayDetails),
                    (ue.value = l.retVal.gcProductDetailDto.tickets || ""),
                    I && I.memberId && ((ee.value = []), oa()))
                  : (1 === t && (Z.value = !1), o.jAlert3(l.msg)),
                "init" === a &&
                  (function () {
                    const a = [],
                      o = Number(ae.value.split(":")[0]) || 12,
                      t = 25 - o;
                    for (let e = 0; e < t; e++) {
                      let t = o + e;
                      t < 10 && (t = "0" + t);
                      let l = `${A.value} ${t}:00`;
                      24 === t && (l = A.value + " 23:59"), a.push(l);
                    }
                    for (let o = 0; o < a.length; o++) {
                      let t = !0;
                      e.dayjs(a[o]).isBefore(e.dayjs()) && (t = !1),
                        (a[o] = {
                          canTap: t,
                          time: a[o],
                          isTap: !1,
                          displayTime: a[o].split(" ")[1],
                          chooseTime: a[o].split(" ")[1],
                        });
                    }
                    (pe.value = a),
                      pe.value.forEach((e, a) => {
                        if (ie.value) return !1;
                        e.canTap &&
                          ((e.isTap = !0),
                          (ie.value = e.chooseTime),
                          setTimeout(() => {
                            me.value = [a];
                          }, 0));
                      });
                  })();
            });
        }
        const ze = e.computed(() =>
            Z.value
              ? "SCORE" === x.value || "TICKET" === x.value
                ? "兑换"
                : "立即预订"
              : "不可订",
          ),
          Je = e.computed(() => {
            const e = [];
            if (
              (le.value.forEach((a, o) => {
                for (let o = 0; o < Number(S.value); o++) e.push(a.realPrice);
              }),
              e.sort(),
              ee.value.length > 0)
            ) {
              if (1 === ee.value.length) {
                const e = ee.value[0];
                return "DF" === e.couponType || "CP" === e.couponType
                  ? Number(Number(e.presentValue).toFixed(2)) >=
                    Number(te.value)
                    ? Number(te.value)
                    : Number(Number(e.presentValue).toFixed(2))
                  : "FR" === e.couponType
                    ? -(
                        Number(Number(e.presentValue).toFixed(2)) -
                        Number(te.value)
                      )
                    : "RF" === e.couponType
                      ? Number(te.value) *
                        Number((1 - Number(e.presentValue)).toFixed(2))
                      : 0;
              }
              {
                console.log(ee.value.length);
                let a = 0;
                for (let o = 0; o < ee.value.length; o++) {
                  const t = e.pop();
                  t - Number(ee.value[o].presentValue) >= 0
                    ? (a += Number(ee.value[o].presentValue))
                    : (a += Number(t));
                }
                return Number(a);
              }
            }
            return 0;
          }),
          Ze = e.computed(() => {
            let e = te.value - Je.value >= 0 ? te.value - Je.value : 0;
            return e % 1 != 0 && (e = Number(e.toFixed(2))), e;
          });
        function ea() {
          const [e] = me.value;
          (ie.value = pe.value[e].chooseTime), ce.value.hideDialog();
        }
        function aa(e) {
          (me.value = e.detail.value), console.log(e);
        }
        function oa() {
          "NONE" !== V.value && I && I.memberId
            ? ((re.value = !0),
              "NONE" === V.value
                ? (ve.value = 0)
                : "ROOM" === V.value
                  ? (ve.value = S.value)
                  : "ROOM_NIGHT" === V.value
                    ? (ve.value = S.value * Se.value)
                    : "RESRV" === V.value && (ve.value = 1),
              (function () {
                const a = {
                  couponType: "",
                  rateCode: k.value,
                  rmtype: L.value,
                  useDate: A.value,
                  hotelCode: G.value,
                  memberId: I.memberId,
                  hotelGroupCode: N.hotelGroupCode,
                  hotelGroupId: N.hotelGroupId,
                  totalPrice: Ze.value,
                  couponCode: ue.value,
                  suitGroupCode: W.value || N.hotelGroupCode,
                  channel: "WECHAT",
                  firstPrice: "",
                  couponTypeReal: "",
                };
                Me.value || (a.couponTypeReal = "DF,VF,CP"),
                  console.log(),
                  le.value &&
                    le.value.length &&
                    le.value[0] &&
                    (a.firstPrice = le.value[0].realPrice),
                  n.api.findCouponDetailListByCondi(a).then((a) => {
                    var t;
                    1 === a.result
                      ? (a.retVal.listCouponDetailWebDtos.forEach((a, o) => {
                          (a.choosed = !1),
                            (a.descript = a.couponName),
                            a.validFromDate &&
                              (a.validFromDate = e
                                .dayjs(a.validFromDate)
                                .format("YYYY.MM.DD")),
                            a.validToDate &&
                              (a.validToDate = e
                                .dayjs(a.validToDate)
                                .format("YYYY.MM.DD")),
                            "RF" === a.couponType
                              ? (a.discountNum = Number.parseFloat(
                                  (10 * a.presentValue).toFixed(1),
                                ))
                              : (a.discountNum = a.presentValue);
                        }),
                        (ne.value =
                          null == (t = a.retVal.listCouponDetailWebDtos)
                            ? void 0
                            : t.filter((e) => "KFQ" !== e.discountType)))
                      : o.jAlert3(a.msg);
                  });
              })())
            : (re.value = !1);
        }
        function ta() {
          const t = /^1\d{10}$/;
          let l = he.value;
          return (
            l.includes("*") && (l = I.mobile),
            !!Z.value &&
              (fe.value
                ? /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g.test(fe.value)
                  ? (o.jAlert3("请不要输入特殊字符"), !1)
                  : t.test(fe.value)
                    ? (o.jAlert3("为了保障您入住过程顺利，请填写真实姓名"), !1)
                    : /^[\u4E00-\u9FA5]{2,5}$|^[a-z/ ]{2,20}$/i.test(fe.value)
                      ? l
                        ? ((l = l.trim()),
                          t.test(l)
                            ? ie.value
                              ? 0 === Ie.value.length ||
                                (Ie.value &&
                                  Ie.value[0] &&
                                  "" === Ie.value[0].name)
                                ? (o.jAlert3("请输入入住人"), !1)
                                : "TICKET" === x.value && 0 === ee.value.length
                                  ? (o.jAlert3(
                                      "券兑换产品需要选择优惠券进行下单",
                                    ),
                                    !1)
                                  : void p.requestMsg(je.value).then(() => {
                                      let t = "";
                                      const u = [];
                                      ee.value.forEach((e, a) => {
                                        u.push(e.couponNo);
                                      }),
                                        (t = u.join(";"));
                                      const r = Ie.value.filter((e) => e.name),
                                        v = {
                                          rmNum: S.value,
                                          fromDate: A.value,
                                          toDate: R.value,
                                          rsvMan: I.name || "",
                                          mobile: I.mobile,
                                          contactName: fe.value,
                                          contactMobile: l,
                                          remark: J.value,
                                          hotelCode: G.value,
                                          hotelGroupCode:
                                            W.value || N.hotelGroupCode,
                                          clientChannel: "WECHAT",
                                          otaChannel: X.value,
                                          productCode: j.value,
                                          memberNo: "",
                                          cardLevel: "",
                                          cardType: "",
                                          memberId: "",
                                          couponDetailCodes: t,
                                          openid: E.openid,
                                          hotelGroupId: N.hotelGroupId,
                                          formId: "",
                                          appid: N.appid,
                                          componentAppid: N.componentAppid,
                                          distributorId: "",
                                          checkInGuests: r,
                                          payMethod: x.value,
                                          arriveTime: ie.value,
                                          srcHotelGroupCode: N.hotelGroupCode,
                                          serviceCouponDetailCodes: "",
                                          rsvClass: "F",
                                          depTime: "",
                                          sourceActivityId: _.value,
                                          sourceActivityName: F.value,
                                          utm_params:
                                            s.adaptor.getUtmParam("ALL"),
                                        };
                                      if (
                                        (I &&
                                          I.memberId &&
                                          ((v.memberNo = I.cardNo
                                            ? I.cardNo
                                            : ""),
                                          (v.cardLevel = I.cardLevel
                                            ? I.cardLevel
                                            : ""),
                                          (v.cardType = I.cardType
                                            ? I.cardType
                                            : ""),
                                          (v.memberId = I.memberId
                                            ? I.memberId
                                            : "")),
                                        "HOUR" === X.value)
                                      ) {
                                        v.rsvClass = "D";
                                        const a = Number(K.value),
                                          o = `${e
                                            .dayjs()
                                            .format("YYYY-MM-DD")} ${
                                            ie.value
                                          }:00`,
                                          t =
                                            e.dayjs().format("YYYY-MM-DD") +
                                            " 23:59:59",
                                          l = e
                                            .dayjs(o)
                                            .add(a, "hours")
                                            .format("YYYY-MM-DD HH:mm:ss");
                                        e.dayjs(l).isAfter(t)
                                          ? (v.depTime = "23:59:59")
                                          : (v.depTime = e
                                              .dayjs(o)
                                              .add(a, "hours")
                                              .format("HH:mm:ss"));
                                      }
                                      !(async function (t) {
                                        if (z.value) return !1;
                                        (z.value = !0),
                                          await b(),
                                          o.jAlert3("正在提交订单"),
                                          n.api
                                            .resrvCheck(t)
                                            .then((l) => {
                                              1 === l.result
                                                ? n.api
                                                    .makeOrder(t)
                                                    .then(async (a) => {
                                                      var l, u;
                                                      if (1 === a.result) {
                                                        (Ne.value = !1),
                                                          h.report(
                                                            h.actionTypeEnum
                                                              .order,
                                                            {
                                                              orderNo: a.retVal,
                                                              orderType: "1",
                                                              orderCount:
                                                                t
                                                                  .bookOrderInfoRQ
                                                                  .rmNum,
                                                              payCharge:
                                                                Ze.value,
                                                              productId:
                                                                t.productCode,
                                                              productName:
                                                                P.value,
                                                              productPrice:
                                                                te.value,
                                                              productCategory:
                                                                "酒店",
                                                            },
                                                          ),
                                                          D("COMPLETE_ORDER", {
                                                            payCharge:
                                                              100 *
                                                              Number(Ze.value),
                                                            orderNo: a.retVal,
                                                          }),
                                                          null ==
                                                            (l =
                                                              null == t
                                                                ? void 0
                                                                : t.bookOrderInfoRQ) ||
                                                            l.guests.forEach(
                                                              (e) => {
                                                                "adult" ===
                                                                  e.ageType &&
                                                                  xe.value++,
                                                                  "baby" ===
                                                                    e.ageType &&
                                                                    Ge.value++,
                                                                  "children" ===
                                                                    e.ageType &&
                                                                    Pe.value++,
                                                                  "bigChildren" ===
                                                                    e.ageType &&
                                                                    Oe.value++;
                                                              },
                                                            ),
                                                          d.qdTracker.track(
                                                            "hotel_order",
                                                            {
                                                              order_id:
                                                                a.retVal,
                                                              hotel_name:
                                                                P.value,
                                                              checkin_date:
                                                                A.value,
                                                              checkout_date:
                                                                R.value,
                                                              room_type:
                                                                ge.roomDescript,
                                                              room_remark:
                                                                Fe.value,
                                                              room_num: S.value,
                                                              arrival_time:
                                                                ie.value,
                                                              contact_name:
                                                                fe.value,
                                                              adult_num:
                                                                xe.value,
                                                              child_num:
                                                                Ge.value +
                                                                Pe.value +
                                                                Oe.value,
                                                              coupon_code: (
                                                                (null ==
                                                                (u = ee.value)
                                                                  ? void 0
                                                                  : u.map(
                                                                      (e) =>
                                                                        e.couponCode,
                                                                    )) || []
                                                              ).join(","),
                                                            },
                                                          );
                                                        const o = {
                                                          orderNo: a.retVal,
                                                          productType: "hotel",
                                                        };
                                                        e.index.redirectTo({
                                                          url:
                                                            "/pagesB/other/pay?" +
                                                            p.createUrl(o),
                                                        }),
                                                          (z.value = !1);
                                                      } else
                                                        (z.value = !1),
                                                          o.jAlert3(a.msg);
                                                    })
                                                    .catch((e) => {
                                                      ((null == e
                                                        ? void 0
                                                        : e.code) !==
                                                        a.RateLimitStatusCode &&
                                                        (null == e
                                                          ? void 0
                                                          : e.status) !==
                                                          a.RateLimitStatusCode) ||
                                                        ((z.value = !1),
                                                        (Ne.value = !0));
                                                    })
                                                : ((z.value = !1),
                                                  o.jAlert3(l.msg));
                                            })
                                            .catch((e) => {
                                              ((null == e ? void 0 : e.code) !==
                                                a.RateLimitStatusCode &&
                                                (null == e
                                                  ? void 0
                                                  : e.status) !==
                                                  a.RateLimitStatusCode) ||
                                                ((z.value = !1),
                                                (Ne.value = !0));
                                            });
                                      })(c.makeOrder(v));
                                    })
                              : (o.jAlert3("请选择到店时间"), !1)
                            : (o.jAlert3("手机号码有误"), !1))
                        : (o.jAlert3("请输入手机号码"), !1)
                      : (o.jAlert3("为了保障您入住过程顺利，请填写真实姓名"),
                        !1)
                : (o.jAlert3("请输入联系人姓名"), !1))
          );
        }
        function la() {
          if (1 === S.value) return !1;
          const e = ye.value.filter((e) => e.active);
          ye.value.forEach((a) => {
            a.active ||
              (e.length === S.value
                ? (a.activeNotCan = !0)
                : (a.activeNotCan = !1));
          });
        }
        return (
          e.onShow(() => {
            I &&
              I.memberId &&
              n.api
                .listGuestLinkExtraInfoWithMemberIdOrOpenId({
                  channel: "WECHAT",
                  hotelGroupCode: N.hotelGroupCode,
                  hotelCode: N.hotelCode,
                  memberId: I.memberId,
                  openIdType: "WECHAT",
                })
                .then((e) => {
                  if (
                    1 === e.result &&
                    0 === e.retVal.result &&
                    e.retVal.retVal.length
                  ) {
                    const a = [];
                    e.retVal.retVal.forEach((e) => {
                      e.guestId &&
                        (e.guestLinkRelationExtraSimpleDtoList.forEach((a) => {
                          "EXTRA_IDCODE" === a.type && (e.idCode = a.value),
                            "EXTRA_IDNO" === a.type && (e.idNo = a.value),
                            "CAMP_SEX" === a.type && (e.sex = a.value),
                            "EXTRA_EMAIL" === a.type && (e.email = a.value),
                            "EXTRA_MOBILE" === a.type && (e.mobile = a.value),
                            "EXTRA_NAME" === a.type && (e.name = a.value),
                            "EXTRA_BIRTH" === a.type && (e.birth = a.value);
                        }),
                        ye.value.forEach((a) => {
                          e.guestId === a.guestId &&
                            ((e.active = a.active),
                            (e.activeNotCan = a.activeNotCan));
                        }),
                        a.push(e));
                    }),
                      (ye.value = a);
                  }
                });
          }),
          e.onMounted(() => {
            e.index.getSystemInfo({
              success: (e) => {
                console.log(e), (be.value = e.statusBarHeight + 60);
              },
              fail(e) {
                console.log(e);
              },
            }),
              (function () {
                const e = {
                  arrDateStr: A.value,
                  cancelPrehour: w.value,
                  cancelPretime: B.value,
                  cancelPredays: U.value,
                  cancelCondition: $.value,
                  hotelGroupCode: W.value || N.hotelGroupCode,
                  miniAppid: N.appid,
                  miniHotelCode: N.hotelCode,
                  productHotelCode: G.value,
                  productCode: j.value,
                };
                n.api.getCancelRule(p.createUrl(e)).then((e) => {
                  1 === e.result && (Ce.value = e.retVal.cancelRule);
                });
              })(),
              Qe("init"),
              I &&
                I.memberId &&
                (I.mobile && (he.value = I.mobile),
                "T" === I.isRealName && (fe.value = I.name));
          }),
          e.onLoad((e) => {
            console.log(e, 11111111111),
              (j.value = e.productCode || ""),
              (A.value = e.fromDate || ""),
              (R.value = e.toDate || ""),
              (M.value = decodeURIComponent(e.productName)),
              (k.value = e.rateCode),
              (L.value = e.rmtype),
              (V.value = e.ticket),
              (x.value = e.payMethod),
              (G.value = e.hotelCode),
              (P.value = decodeURIComponent(e.descript)),
              (O.value = decodeURIComponent(e.address)),
              (S.value = Number(e.resrvNumMin) || 1),
              (Y.value = decodeURIComponent(e.prepayTimeLimit)),
              (H.value = e.prepayHoldTimeMax),
              (q.value = e.prepayMethod),
              (w.value = e.cancelPrehour),
              (B.value = decodeURIComponent(e.cancelPretime)),
              (U.value = e.cancelPredays),
              ($.value = e.cancelCondition),
              (W.value = e.hotelGroupCode),
              (X.value = e.otaChannel || "WECHAT"),
              (K.value = e.stayTime || 4),
              e.sourceActivityId && (_.value = e.sourceActivityId),
              e.sourceActivityName &&
                (F.value = decodeURIComponent(e.sourceActivityName));
          }),
          (a, t) =>
            e.e(
              {
                a: e.o(qe),
                b: e.p({
                  color: "#fff",
                  title: "确认订单",
                  "custom-class": "customPattern",
                  "go-back-next": Te.value,
                }),
                c: e.t(P.value),
                d: e.t(e.unref(i.timeFilterMD)(A.value)),
                e: e.t(e.unref(i.timeFilterMD)(R.value)),
                f: e.t(Se.value),
                g: e.t(_e.value.join("，")),
                h: e.t(Fe.value),
                i: be.value + "px",
                j: 1 === S.value ? 1 : "",
                k: e.o((e) => Qe("mins")),
                l: e.t(S.value),
                m: e.o((e) => Qe("plus")),
                n: e.f(Ie.value, (a, o, t) =>
                  e.e(
                    { a: a.name },
                    a.name
                      ? {
                          b: e.o((e) => {
                            return (
                              Ie.value,
                              (a = o),
                              ye.value.forEach((e) => {
                                e.name === Ie.value[a].name && (e.active = !1);
                              }),
                              (Ie.value[a] = { name: "", idNo: "" }),
                              void la()
                            );
                            var a;
                          }, o),
                          c: e.t(a.name),
                          d: e.t(Ee[a.idCode]),
                          e: e.t(e.unref(i.hideIdCard)(a.idNo, a.idCode)),
                        }
                      : {
                          f: e.o((e) => {
                            return (
                              (a = o),
                              Ie.value.length > 1
                                ? (Re.value = a)
                                : (Re.value = ""),
                              ye.value.forEach((e) => {
                                (e.active = !1),
                                  Ie.value.forEach((a) => {
                                    a.name === e.name && (e.active = !0);
                                  });
                              }),
                              void Ae.value.showDialog()
                            );
                            var a;
                          }, o),
                        },
                    { g: o },
                  ),
                ),
                o: ie.value,
                p: e.o((e) => (ie.value = e.detail.value)),
                q: e.o(Ke),
                r: J.value,
                s: e.o((e) => (J.value = e.detail.value)),
                t: fe.value,
                v: e.o((e) => (fe.value = e.detail.value)),
                w: he.value,
                x: e.o((e) => (he.value = e.detail.value)),
                y: ke.value,
              },
              ke.value ? { z: e.t(ke.value) } : {},
              { A: 0 === ee.value.length },
              0 === ee.value.length
                ? { B: e.t(ne.value.length) }
                : { C: e.t(e.unref(i.valFormat)(Je.value)) },
              {
                D: e.o((e) => {
                  de.value.showDialog();
                }),
                E: e.p({ content: Ce.value }),
                F: e.t(e.unref(i.valFormat)(Ze.value)),
                G: e.o((e) => {
                  se.value.showDialog();
                }),
                H: e.t(ze.value),
                I: e.o(ta),
                J: e.o((a) =>
                  e.unref(p.goPage)("/pagesB/travel/travelersInfo"),
                ),
                K: e.f(ye.value, (a, o, t) =>
                  e.e(
                    {
                      a: e.o(
                        (o) =>
                          e.unref(p.goPage)(
                            "/pagesB/travel/travelersInfo?type=edit&id=" +
                              a.guestId,
                          ),
                        o,
                      ),
                      b: e.t(a.name),
                      c: e.t(Ee[a.idCode]),
                      d: e.t(e.unref(i.hideIdCard)(a.idNo, a.idCode)),
                      e: a.activeNotCan,
                    },
                    (a.activeNotCan || a.active, {}),
                    {
                      f: a.active,
                      g: o,
                      h: e.o(
                        (e) =>
                          (function (e) {
                            let a = ye.value.filter((e) => e.active);
                            return 1 === S.value && 1 === a.length
                              ? (ye.value.forEach((e) => {
                                  e.active = !1;
                                }),
                                (e.active = !0),
                                !1)
                              : !(!e.active && a >= S.value) &&
                                  ((e.active = !e.active),
                                  (a = ye.value.filter((e) => e.active)),
                                  void la());
                          })(a),
                        o,
                      ),
                    },
                  ),
                ),
                L: e.o((a) =>
                  (function () {
                    const a = [];
                    if (
                      (ye.value.forEach((o) => {
                        if (o.active) {
                          o.guestId &&
                            (o.birth &&
                              (o.age = e.dayjs(R.value).diff(o.birth, "year")),
                            o.age >= 18
                              ? ((o.ageType = "adult"),
                                (o.ageTypeDesc = "成人"))
                              : o.age >= 12
                                ? ((o.ageType = "bigChildren"),
                                  (o.ageTypeDesc = "大童"))
                                : o.age >= 6
                                  ? ((o.ageType = "children"),
                                    (o.ageTypeDesc = "中童"))
                                  : ((o.ageType = "baby"),
                                    (o.ageTypeDesc = "幼童")));
                          const t = {
                            guestId: o.guestId,
                            name: o.name,
                            mobile: o.mobile,
                            idCode: o.idCode,
                            idNo: o.idNo,
                            birth: o.birth
                              ? e.dayjs(o.birth).format("YYYY-MM-DD")
                              : "",
                            sex: o.sex || "",
                            age: o.age,
                            ageType: o.ageType,
                            ageTypeDesc: o.ageTypeDesc,
                          };
                          a.push(t);
                        }
                      }),
                      a.length > S.value)
                    )
                      return o.jAlert3(`最多选择${S.value}人`), !1;
                    if (
                      (a.forEach((e) => {
                        e.activeNotCan = !0;
                      }),
                      a.length < Ie.value.length)
                    ) {
                      const e = Ie.value.length - a.length;
                      for (let o = 0; o < e; o++)
                        a.push({
                          name: "",
                          guestId: "",
                          mobile: "",
                          idCode: "",
                          idNo: "",
                          sex: "",
                          age: "",
                          ageType: "",
                          ageTypeDesc: "",
                        });
                    }
                    (Ie.value = a), Ae.value.hideDialog();
                  })(),
                ),
                M: e.sr(Ae, "fef7a60e-2", { k: "checkIn" }),
                N: e.p({ title: "选择入住人", "max-dialog": !0 }),
                O: e.o((e) => Ue(!1)),
                P: e.o((e) => Ue(!0)),
                Q: Ve.value,
                R: e.o((e) => (Ve.value = e.detail.value)),
                S: Le.value || Ve.value,
              },
              Le.value || Ve.value ? { T: e.o(Be) } : {},
              { U: e.o(we), V: 0 === ne.value.length },
              0 === ne.value.length
                ? { W: e.p({ tips: "暂无可用券" }) }
                : {
                    X: e.f(ne.value, (a, o, t) => ({
                      a: e.o(We, o),
                      b: e.o(Xe, o),
                      c: "fef7a60e-5-" + t + ",fef7a60e-3",
                      d: e.p({ "coupon-item": a, mode: "select" }),
                      e: o,
                    })),
                  },
              {
                Y: e.o($e),
                Z: e.sr(de, "fef7a60e-3", { k: "couponListLayer" }),
                aa: e.p({ title: "选择券包" }),
                ab: ke.value,
              },
              ke.value ? { ac: e.t(ke.value) } : {},
              {
                ad: e.t(e.unref(i.valFormat)(te.value)),
                ae: e.f(le.value, (a, o, t) => ({
                  a: e.t(a.rsvDateDesc),
                  b: e.t(e.unref(i.valFormat)(a.realPrice)),
                  c: o,
                })),
                af: e.t(S.value),
                ag: e.t(e.unref(i.valFormat)(Je.value)),
                ah: e.t(e.unref(i.valFormat)(Je.value)),
                ai: e.t(e.unref(i.valFormat)(Ze.value)),
                aj: e.o((e) => {
                  se.value.hideDialog();
                }),
                ak: e.o(ta),
                al: e.sr(se, "fef7a60e-6", { k: "priceInfo" }),
                am: e.p({ title: "费用明细" }),
                an: e.f(pe.value, (a, o, t) => ({
                  a: e.t(a.displayTime),
                  b: o,
                })),
                ao: me.value,
                ap: e.o(aa),
                aq: e.o(ea),
                ar: e.sr(ce, "fef7a60e-7", { k: "timeSelect" }),
                as: e.p({ title: "预计到店时间" }),
                at: e.o(He),
                av: e.o(() => (De.value = !1)),
                aw: e.o((e) => (De.value = e)),
                ax: e.p({
                  "tracking-data": {
                    commodity_id: G.value,
                    commodity_name: P.value,
                    room_type: ge.roomDescript,
                    room_product_name: ge.name,
                    travel_date: A.value,
                    end_date: R.value,
                  },
                  show: De.value,
                }),
                ay: !De.value,
                az: e.p({
                  "tracking-data": {
                    commodity_id: G.value,
                    commodity_name: P.value,
                    room_type: ge.roomDescript,
                    room_product_name: ge.name,
                  },
                }),
                aA: e.o(ta),
                aB: e.o((e) => (Ne.value = e)),
                aC: e.p({ visible: Ne.value }),
              },
            )
        );
      },
    }),
    b = e._export_sfc(D, [["__scopeId", "data-v-fef7a60e"]]);
  wx.createPage(b);
})();
