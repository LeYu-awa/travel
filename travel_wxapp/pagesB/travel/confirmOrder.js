!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    a = require("../../assets/index.js"),
    o = require("../../base/channel.js"),
    r = require("../../base/common.js"),
    u = require("../../base/jAlert/jAlert.js"),
    t = require("../../hooks/useNavigatorRect.js"),
    l = require("../../utils/umengAdaptor.js"),
    n = require("../../utils/wxuser.js"),
    i = require("../../utils/utils.js"),
    s = require("../../utils/api.js");
  require("../../base/product.js");
  const c = require("../../utils/qdTracker.js");
  require("../../services/request/request.js"),
    require("../../utils/request.js");
  const d = require("../../hooks/useAdReport.js"),
    v = require("../../hooks/useCouponExclusion.js"),
    m = require("../../hooks/useSubscribeMessage.js"),
    p = require("../../hooks/useXhsReport.js"),
    f = require("../../services/common.js"),
    y = require("../../utils/filter.js"),
    h = require("../../utils/helper.js");
  Array || e.resolveComponent("FloatButtonKf")(),
    Math || (D + b + A + I + P + S + T + C + g + R + N + O)();
  const b = () => "../../components/bottomDialog.js",
    g = () => "../../components/calendar.js",
    T = () => "../../components/couponItem.js",
    D = () => "../../components/coustomHead.js",
    C = () => "../../components/empty.js",
    R = () => "../../components/kfDialog.js",
    N = () => "../../components/new/CustomerRetentionDialog.js",
    S = () => "../../components/new/NumberTransition.js",
    A = () => "../../components/new/Stepper.js",
    I = () => "../../components/new/StRadio.js",
    P = () => "../../components/radioBox.js",
    O = () => "../../components/RetryModal.js",
    G = e.defineComponent({
      __name: "confirmOrder",
      setup(b) {
        const g = d.useAdReport(),
          { subscribeMessage: T } = m.useSubscribeMessage([
            "ORDER_CANCEL_NOTICE",
            "NOT_COMPLETE_FIRST_PAYMENT",
          ]),
          D = p.useXshReport(),
          { checkExclusion: C } = v.useCouponExclusion();
        setTimeout(() => {
          g("VIEW_CONTENT", { actionParam: { object: "travelConfirmOrder" } });
        }, 300);
        const R = t.useNavigatorRect(),
          N = n.getStorage("config"),
          S = null == N ? void 0 : N.version,
          A = n.getStorage("user"),
          I = n.getStorage("wxuser"),
          P = n.getStorage("travelInfo"),
          O = e.computed(
            () =>
              ("ThemeGroup" === P.orderType && "FAMILY" !== P.priceModel) ||
              "ButlerCustomized" === P.orderType ||
              "FreeTravel" === P.orderType ||
              "DestPackage" === P.orderType,
          ),
          G = e.ref(!1),
          E = e.ref(),
          L = e.ref(""),
          F = e.ref(),
          M = e.ref(),
          V = e.ref({}),
          k = e.ref({}),
          j = e.computed(() => k.value.type || ""),
          _ = e.ref(0),
          x = e.ref([]),
          w = e.ref(),
          q = e.ref(!1),
          B = e.ref(""),
          H = e.ref(""),
          Y = e.ref(1),
          U = e.ref(),
          Q = e.ref(!0),
          W = e.ref([]),
          K = e.ref(!1),
          J = e.ref(o.defaultOtaChannel),
          $ = e.ref([]),
          Z = e.ref(!0),
          z = e.ref([]),
          X = e.ref(e.dayjs().format("YYYY-MM-DD")),
          ee = e.ref(e.dayjs().add(1, "days").format("YYYY-MM-DD")),
          ae = e.ref("");
        let oe = e.reactive({ remark: "", fromDate: "", toDate: "" });
        const re = e.ref([]),
          ue = e.computed(() => re.value.length > 0);
        function te(a) {
          (oe.fromDate = e.dayjs(a.checkInDay).format("YYYY.MM.DD")),
            (oe.toDate = e.dayjs(a.checkOutDay).format("YYYY.MM.DD"));
        }
        const le = e.ref(!0),
          ne = e.ref(0),
          ie = e.ref(0),
          se = e.ref(!0),
          ce = e.ref(!0),
          de = e.ref(!1),
          ve = e.ref([]),
          me = e.ref({
            basicTeamRateSum: 0,
            exchangeRateSum: 0,
            point: 0,
            rateSum: 0,
            readyPay: 0,
            memberDscAmount: 0,
            couponRateSum: 0,
            singleRoomRateSum: 0,
            guaranteedPrice: 0,
          }),
          pe = e.reactive([
            { id: "CASH", name: "现金" },
            { id: "INTEGRALCASH", name: "现金+积分" },
            { id: "INTEGRAL", name: "积分" },
          ]),
          fe = e.ref(!1),
          ye = e.ref(!1),
          he = e.ref({
            member: { memberDiscount: 0, memberDiscountAmount: 0 },
            coupon: {
              ownedCouponDiscountAmount: 0,
              pendingCouponDiscountAmount: 0,
              pendingCouponDetails: [],
            },
          }),
          be = e.ref({}),
          ge = e.ref([]),
          Te = e.ref(!1),
          De = e.ref(!1),
          Ce = e.ref(0),
          Re = e.ref(!1),
          Ne = e.ref(!1),
          Se = e.ref(!1),
          Ae = e.computed(() => Re.value || Ne.value || Se.value);
        e.watch(Ae, (a) => {
          a
            ? e.index.showLoading({ title: "加载中...", mask: !0 })
            : e.index.hideLoading();
        });
        const Ie = e.reactive({
            openid: null == I ? void 0 : I.openid,
            reserveOrderDto: {
              shareRoom: "",
              shareRoomType: "",
              appid: N.appid,
              price: 0,
              integral: 0,
              productUrl: P.productUrl,
              unitCode: N.hotelGroupCode,
              orderNo: "",
              otaRsvNo: "",
              teamNo: P.travelGroupCode,
              adviceNo: "",
              itineraryCode: P.itineraryCode,
              orderType: P.orderType,
              orderTypeDesc: P.orderTypeDesc,
              orderSource: "",
              orderSubSource: "",
              rsvClass: "",
              rsvMan: "",
              mobile: "",
              contactName: "",
              contactMobile: "",
              otaChannel: J.value,
              productCode: P.travelType,
              productDesc: P.title,
              meetingPoint: P.meetingPoint,
              memberNo: A.memberId,
              memberId: A.memberId,
              memberLevel: A.memberLevel,
              cardId: A.cardId,
              cardNo: A.cardNo,
              cardLevel: A.cardLevel,
              cardType: A.cardType,
              companyNo: "",
              companyDesc: "",
              beginDate: P.groupBeginDate,
              endDate: P.groupEndDate,
              priceType: P.specificationsType,
              specificationsType: P.specificationsType,
              adult: 0,
              bigChildren: 0,
              children: 0,
              baby: 0,
              num: P.number || 1,
              realRate: 0,
              rateSum: 0,
              singleRoomPrice: 0,
              counselor: "",
              isMiniProgram: "",
              agency: P.isSigning,
              belongMain: "",
              belongSeason: "",
              remark: "",
              payType: "",
            },
            dscAmountInfoDto: {
              cardNo: A.cardNo,
              memberDiscount: "",
              memberDiscountAmount: "",
              memberNo: A.memberId,
              pay: 0,
              payType: "",
              point: "",
              pointMoney: "",
              memberLevelDesc: "",
              adultTeamRateSum: "",
              basicTeamRateSum: "",
              childrenTeamRateSum: "",
              singleRoomRateSum: "",
              guaranteedPrice: 0,
            },
            rsvDtos: [
              {
                arr: "",
                dep: "",
                hotelGroupCode: N.hotelGroupCode,
                hotelCode: N.hotelCode,
                rmtype: "",
                rmtypeDesc: "",
                productCode: P.travelType,
                num: 1,
                rmClass: "",
                guestDtos: [],
              },
            ],
          }),
          Pe = e.ref(),
          Oe = e.ref(!1),
          Ge = e.computed(() => {
            const e = JSON.parse(JSON.stringify(z.value));
            for (let a = 0; a < e.length; a++) {
              const o = e[a];
              (me.value.basicTeamRateSum + me.value.singleRoomRateSum <
                o.discountPriceBegin ||
                "KFQ" === o.discountType) &&
                (e.splice(a, 1), a--);
            }
            return e;
          }),
          Ee = e.computed(() => {
            const e = !fe.value && !ye.value,
              a = x.value.length > 1 || Ge.value.length > 0,
              o = "shop" !== L.value;
            return e && a && o;
          });
        e.watch(
          () => [Te.value, ge.value],
          ([e, a]) => {
            e &&
              Array.isArray(a) &&
              a.length > 0 &&
              (a.forEach((e) => {
                ta(e, "auto");
              }),
              ua("auto"));
          },
          { immediate: !0 },
        );
        const Le = e.ref(),
          Fe = e.ref("");
        function Me() {
          Fe.value && Le.value.showDialog();
        }
        !(async function () {
          var e;
          try {
            const a = await f.getSysOptionsByCode({
              hotelCode: N.hotelCode,
              hotelGroupCode: N.hotelGroupCode,
              code: "RoomDescription",
            });
            (null == (e = null == a ? void 0 : a.retVal) ? void 0 : e.value) &&
              (Fe.value = a.retVal.value);
          } catch (e) {}
        })();
        const Ve = e.ref(0),
          ke = e.ref(0),
          je = e.ref(0),
          _e = e.ref(0),
          xe = e.computed(() => Ve.value + (ke.value + je.value + _e.value)),
          we = e.ref(1),
          qe = e.computed(() => {
            var e;
            return (
              (null == (e = P.priceDtos.find((e) => "CASH" === e.payType))
                ? void 0
                : e.singleSupplement) || 0
            );
          }),
          Be = e.computed(() => {
            if ("PEOPLE" === P.priceModel && "singleRoom" === Pe.value) {
              const e = 2 * we.value - xe.value;
              return e > 0 ? e : 0;
            }
            return 0;
          }),
          He = e.ref(1),
          Ye = e.ref(""),
          Ue = e.ref();
        function Qe(e) {
          (Oe.value = !0), (Pe.value = e);
        }
        const We = e.computed(
          () => (
            console.log(
              "<ConfirmOrder />",
              null == P ? void 0 : P.groupPt,
              we.value,
              Ue.value,
            ),
            "T" === (null == P ? void 0 : P.groupPt) &&
              1 === xe.value &&
              "SCF" === Ue.value
          ),
        );
        function Ke() {
          var a, o;
          const r = {
            unitCode: N.hotelGroupCode,
            travelType: P.travelType,
            payType: Ie.reserveOrderDto.payType,
            otaChannel: J.value,
            ota: "DIRECT",
            num: P.number,
            isGroup: "T",
            endDate: P.groupEndDate,
            beginDate: P.groupBeginDate,
            cardLevel: A.cardLevel,
            cardType: A.cardType,
            travelGroupCode: P.travelGroupCode,
            roomNum: we.value,
            babyNum: 0,
            bigChildrenNum: 0,
            memberDiscountEnable: !!j.value,
            memberId: A.memberIdStr,
            coupons: $.value.map((e) => e.couponNo),
          };
          if ("实时计价" === P.price) {
            const a = e.dayjs(P.groupEndDate).diff(P.groupBeginDate, "day") + 1;
            r.rsvRmClassList = [];
            for (let o = 0; o < a; o++)
              Ie.rsvDtos.forEach((a) => {
                r.rsvRmClassList.push({
                  rmClass: a.rmClass,
                  rmNum: a.num,
                  rsvDate: e
                    .dayjs(P.groupBeginDate)
                    .add(o, "day")
                    .format("YYYY-MM-DD"),
                });
              });
          }
          return (
            "FreeTravel" === P.orderType
              ? (r.isFreeTravel = "T")
              : (r.isFreeTravel = "F"),
            (null == (a = P.specificationsPriceDtos) ? void 0 : a.length) > 0 &&
              (r.specificationsType =
                P.specificationsPriceDtos[0].specificationsType),
            (null == (o = $.value) ? void 0 : o.length) > 0 &&
              ((r.isTdq = "FWQ" === $.value[0].couponType ? "T" : "F"),
              (r.memberStacking = $.value[0].memberStacking)),
            (r.adultNum = Ve.value || 0),
            (r.babyNum = _e.value || 0),
            (r.childrenNum = je.value || 0),
            (r.bigChildrenNum = ke.value || 0),
            (r.singleRoomPeople = Be.value || 0),
            r
          );
        }
        e.watch(
          () => [We.value, Be.value],
          ([e, a]) => {
            e
              ? Oe.value || (Pe.value = "shareRoom")
              : (Pe.value = "singleRoom");
          },
          { immediate: !0 },
        );
        let Je = {};
        const $e = e.ref(!1),
          Ze = e.debounce$1(async function () {
            if (
              ("shop" === L.value &&
                ("INTEGRALCASH" === Ie.reserveOrderDto.payType
                  ? ((me.value.point = Number(
                      Number(P.credit * oe.number).toFixed(2),
                    )),
                    (me.value.basicTeamRateSum = Number(
                      Number(P.creditPrice * oe.number).toFixed(2),
                    )))
                  : ((me.value.point = 0),
                    (me.value.basicTeamRateSum = Number(
                      Number(oe.price * oe.number).toFixed(2),
                    )))),
              "shop" === L.value)
            )
              return (
                (function () {
                  me.value.guaranteedPrice || (me.value.guaranteedPrice = 0);
                  const e =
                    me.value.basicTeamRateSum + me.value.guaranteedPrice;
                  j.value && e > 0
                    ? (x.value.forEach((e) => {
                        e.choosed && (_.value = e.discount);
                      }),
                      (ie.value = Number(
                        (Number(1 - _.value) * Number(e)).toFixed(2),
                      )))
                    : (ie.value = 0),
                    (ne.value = 0);
                  const a = Number(e - ie.value);
                  $.value.forEach((o) => {
                    const r = o;
                    let u = 0;
                    "LZ" === r.discountType || "MZ" === r.discountType
                      ? ((u =
                          Number(e) *
                          Number((1 - Number(r.discountNum)).toFixed(2))),
                        (ne.value += u))
                      : Number(Number(r.discountNum).toFixed(2)) >= Number(e)
                        ? ((u = Number(e)), (ne.value += u))
                        : ((u = Number(Number(r.discountNum).toFixed(2))),
                          (ne.value += u)),
                      ne.value > a
                        ? (o.realValue =
                            a - ne.value + u > 0
                              ? Number((a + u - ne.value).toFixed(2))
                              : 0)
                        : (o.realValue = u);
                  }),
                    ne.value > a && (ne.value = a),
                    (ne.value = Number(ne.value.toFixed(2)));
                })(),
                (me.value.memberDscAmount = ie.value),
                (me.value.couponRateSum = ne.value),
                void (me.value.readyPay = Number(
                  (me.value.basicTeamRateSum - ie.value - ne.value).toFixed(2),
                ))
              );
            const a = Ke();
            if (!e.isEqual$1(Je, a)) {
              (Je = a), (Re.value = !0);
              try {
                const o = await s.api.interfaceTransfer({
                  query: a,
                  config: {
                    interfaceType: "POST",
                    interfaceModule: "GC_TRAVEL_ORDER",
                    interfaceMethod: "/api/reserve/order/queryPayDetail",
                    interfaceFrom: "GC",
                    hotelGroupCode: N.hotelGroupCode,
                  },
                });
                1 === o.result && 0 === o.retVal.result
                  ? (($e.value = !0),
                    (q.value = !0),
                    (me.value = o.retVal.retVal),
                    me.value.rsvRmClassList &&
                      (W.value = me.value.rsvRmClassList),
                    me.value.travelRateSumDto &&
                      (me.value = Object.assign(
                        me.value,
                        me.value.travelRateSumDto,
                      )),
                    "FreeTravel" === P.orderType
                      ? (me.value.babyRoomNum = a.babyRoomNum)
                      : (me.value.babyRoomNum = 0),
                    (me.value.exchangeSum = Number(
                      (
                        me.value.exchangeRateSum +
                        me.value.memberDscAmount +
                        me.value.couponRateSum
                      ).toFixed(2),
                    )),
                    $.value.forEach((e) => {
                      const a = me.value.couponSimpleInfoDtoList.find(
                        (a) => a.num === e.couponNo,
                      );
                      a && (e.realValue = a.realValue || 0);
                    }))
                  : ("实时计价" === P.price
                      ? le.value &&
                        ((le.value = !1),
                        e.index.showModal({
                          title: "请联系松赞客服或顾问",
                          content:
                            "您选择的产品因资源保障原因暂无法购买，详讯400-0000-830。",
                          cancelText: "联系客服",
                          confirmText: "重新选择",
                          success(a) {
                            a.confirm
                              ? ((le.value = !0),
                                e.index.navigateBack({ delta: 1 }))
                              : a.cancel &&
                                ((le.value = !0), U.value.showDialog());
                          },
                        }))
                      : (e.index.hideToast(), u.jAlert3(o.retVal.msg || o.msg)),
                    (q.value = !1));
              } catch (e) {
                console.error("queryPayDetail error", e);
              } finally {
                Re.value = !1;
              }
            }
          }, 500);
        function ze(e) {
          return Number(Number(e).toFixed(2));
        }
        function Xe(e) {
          (k.value = x.value.find((e) => e.choosed) || {}),
            "manual" === e && ((fe.value = !0), w.value.hideDialog());
        }
        function ea(e) {
          se.value &&
            x.value.forEach((a) => {
              (a.choosed = !1), a.type === e.type && (a.choosed = !0);
            });
        }
        function aa() {
          if (!se.value && "shop" === L.value)
            return void ("FWQ" === $.value[0].couponType
              ? u.jAlert3("通用券不能与会员折扣共享")
              : u.jAlert3("折扣券不能与会员折扣共享"));
          const e = k.value.type;
          x.value.forEach((a) => {
            a.choosed = a.type === e;
          }),
            w.value.showDialog();
        }
        function oa() {
          M.value.showDialog();
        }
        function ra(a) {
          e.index.redirectTo({ url: a });
        }
        function ua(e = "manual") {
          ($.value = []),
            z.value.forEach((e) => {
              e.choosed && $.value.push(e);
            }),
            "manual" === e &&
              ((ye.value = !0),
              F.value.hideDialog(),
              setTimeout(() => {
                se.value ||
                  "shop" === L.value ||
                  u.jAlert3("您选择的券不支持与会员折扣叠加");
              }, 100));
        }
        function ta(a, o = "manual") {
          "shop" === L.value
            ? (function (e) {
                const a = z.value.find((a) => a.couponNo === e.couponNo);
                a && (a.choosed = !a.choosed),
                  (null == a ? void 0 : a.choosed) && "FWQ" === e.couponType
                    ? z.value.forEach((e) => {
                        "FWQ" !== e.couponType && (e.choosed = !1);
                      })
                    : (null == a ? void 0 : a.choosed) &&
                      "FWQ" !== e.couponType &&
                      z.value.forEach((a) => {
                        a.couponNo !== e.couponNo && (a.choosed = !1);
                      });
              })(a)
            : (async function (a, o) {
                const r = z.value.find((e) => e.couponNo === a.couponNo);
                if (r) {
                  if (!r.choosed) {
                    if ("YH" === a.couponType && !r.choosed) {
                      const o = z.value.find(
                        (e) =>
                          "YH" === e.couponType &&
                          e.choosed &&
                          e.couponNo !== a.couponNo,
                      );
                      if (o)
                        return void e.index.showModal({
                          title: "提示",
                          content:
                            "优惠券仅限使用1张，已使用优惠券：" + o.descript,
                          showCancel: !1,
                        });
                    }
                    if ("manual" === o) {
                      const e = Ge.value
                        .filter((e) => e.choosed)
                        .map((e) => e.couponNo);
                      if (await C(a.couponNo, e)) return !1;
                    }
                  }
                  r.choosed = !r.choosed;
                } else
                  console.error("❌ 未找到目标券", { couponNo: a.couponNo });
              })(a, o);
        }
        function la(e) {
          !(function (e) {
            if ("T" !== A.isRealName && "KXQQ" === e.discountType)
              return (
                u.jAlert3("请在完成实名后领取！"),
                void setTimeout(() => {
                  i.goPageWithUser("/pagesA/member/memberAuth?from=colletion");
                }, 1500)
              );
            const a = {
              hotelGroupCode: N.hotelGroupCode,
              hotelGroupCodes: N.hotelGroupCode,
              hotelCode: N.hotelCode,
              memberId: A.memberId,
              couponCode: e.couponCode,
              couponType: e.couponType,
              mobile: A.mobile,
              cardId: A.cardId,
              cardNo: A.cardNo,
              appid: N.appid,
              hotelId: N.hotelId,
              hotelGroupId: N.hotelGroupId,
              cardLevel: A.cardLevel,
            };
            (Se.value = !0),
              s.api
                .receiveSCCouponNewTransfer(a)
                .then(async (a) => {
                  var o;
                  if (1 === a.result) {
                    const { couponDetailList: r } = a.retVal;
                    if ((null == r ? void 0 : r.length) > 0) {
                      const a = z.value
                        .filter((e) => e.choosed)
                        .map((e) => e.couponNo);
                      await pa(),
                        z.value.forEach((e) => {
                          a.includes(e.couponNo) && (e.choosed = !0);
                        }),
                        setTimeout(() => {
                          u.jAlert3("领取成功");
                        }, 10),
                        (re.value = re.value.filter(
                          (a) => a.couponCode !== e.couponCode,
                        ));
                      const r =
                        null == (o = he.value.coupon.pendingCouponDetails)
                          ? void 0
                          : o.find((a) => a.couponCode === e.couponCode);
                      (null == r ? void 0 : r.discountAmount) &&
                        (he.value.coupon.pendingCouponDiscountAmount -=
                          r.discountAmount);
                    }
                  } else
                    setTimeout(() => {
                      u.jAlert3(a.msg);
                    }, 10);
                })
                .finally(() => {
                  Se.value = !1;
                });
          })(e);
        }
        function na(e) {
          "add" === e
            ? oe.number < oe.stock && oe.number++
            : oe.number > Y.value && oe.number--;
        }
        function ia(e) {
          return {
            ...e,
            descript: e.name,
            discountNum: e.presentValue,
            groupName: r.couponGroupTypeMeta[e.groupCode],
            beginDatetime: e.startTime,
            endDatetime: e.endTime,
          };
        }
        function sa(e) {
          return { ...e, no: e.couponNo };
        }
        function ca() {
          ea(V.value), Xe("auto");
        }
        function da() {
          const e = {
            mobile: A.mobile,
            memberId: A.memberId,
            goodsId: P.travelType,
            hotelGroupCode: N.hotelGroupCode,
            rightsType: "travelProductsRightsType",
            orderType: P.orderType,
          };
          "shop" === L.value &&
            ((e.rightsType = "exchangeCouponRightsType"),
            (e.orderType = "shop"),
            (e.goodsId = P.goodsId)),
            s.api.getDiscountOfMember(e).then((e) => {
              if (1 === e.result) {
                let a = -1;
                e.retVal.memberDiscount < 1 &&
                  (a++,
                  x.value.push({
                    discount: e.retVal.memberDiscount,
                    type: "member",
                    desc: A.cardLevelDescript + "会员",
                  })),
                  e.retVal.partnerDiscount < 1 &&
                    (e.retVal.partnerDiscount < e.retVal.memberDiscount && a++,
                    x.value.push({
                      discount: e.retVal.partnerDiscount,
                      type: "partner",
                      desc: "城市合伙人",
                      partnerId: e.retVal.partnerId,
                    })),
                  (V.value = x.value[a]),
                  x.value.length > 0 &&
                    "shop" === L.value &&
                    (ea(x.value[a]), Xe("auto")),
                  x.value.push({
                    discount: 1,
                    type: "",
                    desc: "不使用折扣",
                    choosed: !1,
                  }),
                  (De.value = !0);
              }
            });
        }
        function va() {
          (K.value = !1), (G.value = !0);
        }
        function ma(e) {
          K.value = e.showGuardDialog;
        }
        function pa() {
          const e = {
            hotelGroupCode: N.hotelGroupCode,
            memberId: A.memberId,
            productCode: P.travelType,
            orderType: "TRAVEL",
            beginDate: P.groupBeginDate,
            cardNo: A.cardNo,
            suitChannel: "WECHAT",
          };
          return (
            "shop" === L.value
              ? ((e.orderType = "SHOP"),
                (e.useSource = "SC"),
                (e.productCode = P.goodsId),
                (e.productPrimaryClassification = 3))
              : ((e.productPrimaryClassification = P.orderType),
                (e.productCode = P.travelType),
                (e.travelType = P.travelGroupCode),
                (e.itineraryCode = P.itineraryCode)),
            s.api
              .interfaceTransfer({
                query: e,
                config: {
                  interfaceType: "POST",
                  interfaceModule: "",
                  interfaceMethod: "api/coupon/listCouponByUse",
                  interfaceFrom: "coupon",
                  hotelGroupCode: N.hotelGroupCode,
                },
              })
              .then((e) => {
                1 === e.result &&
                  0 === e.retVal.result &&
                  e.retVal.retVal &&
                  e.retVal.retVal.length > 0 &&
                  ((z.value = []),
                  "shop" === L.value
                    ? e.retVal.retVal.forEach((e) => {
                        "FWQ" !== e.couponType && z.value.push(e);
                      })
                    : ((z.value = e.retVal.retVal), (Te.value = !0)));
              })
          );
        }
        function fa() {
          l.adaptor.sendEvent("click_travel_book_control"),
            "shop" === L.value
              ? (function () {
                  if (!Ie.reserveOrderDto.rsvMan)
                    return void u.jAlert3("请填写联系人姓名");
                  if (!Ie.reserveOrderDto.mobile)
                    return void u.jAlert3("请填写联系人手机号");
                  const a = {
                      hotelCode: N.hotelCode,
                      hotelGroupCode: N.hotelGroupCode,
                      hotelGroupId: N.hotelGroupId,
                      channel: "mini_app",
                      domain: "",
                      appid: N.appid,
                      listShopGoods: [],
                      totalCredit: me.value.point,
                      original: 1,
                      paymentMode: "1",
                      address: "",
                      addressId: "",
                      area: "",
                      city: "",
                      contact: Ie.reserveOrderDto.mobile,
                      receiver: Ie.reserveOrderDto.rsvMan,
                      remark: oe.remark,
                      openid: null == I ? void 0 : I.openid,
                      formId: "",
                      fromOriginal: n.getStorage("staticFrom") || N.hotelCode,
                      cardNo: A.cardNo,
                      cardName: A.name,
                      memberId: A.memberId,
                      cardId: A.cardId,
                      cardLevel: A.cardLevel,
                      winterCampAddInfo: `${oe.fromDate} - ${oe.toDate}`,
                      notMemberContact: (null == A ? void 0 : A.memberId)
                        ? "F"
                        : "T",
                      sourceActivityId: B.value,
                      sourceActivityName: H.value,
                      userCouponVersion: 1,
                      cardLevelDescript: A.cardLevelDescript,
                      utm_params: l.adaptor.getUtmParam("ALL"),
                    },
                    o = [];
                  let t = 0;
                  if ($.value.length > 0) {
                    const e = {};
                    $.value.forEach((a) => {
                      (e.couponNo = a.couponNo),
                        (e.concessionaryPrice = ne.value),
                        (e.type = "coupon"),
                        (e.couponName = a.couponName);
                    }),
                      (a.scCouponNo = e.couponNo),
                      (t += ne.value),
                      o.push(e);
                  }
                  "member" === j.value &&
                    ((Ie.dscAmountInfoDto.memberDiscount = k.value.discount),
                    (Ie.dscAmountInfoDto.memberLevelDesc = `${
                      A.cardLevelDescript
                    }会员${ze(10 * k.value.discount)}折`)),
                    ie.value > 0 &&
                      (o.push({
                        type: "member",
                        concessionaryPrice: ie.value,
                        memberLevelDesc: Ie.dscAmountInfoDto.memberLevelDesc,
                      }),
                      (t += ie.value));
                  const i = [];
                  (P.number = oe.number),
                    o.length > 0 && (a.couponAttr = o),
                    me.value.point <= 0 && (P.paymentMethod = "onlyPrice"),
                    (a.concessionaryPrice = Number(t)),
                    (P.concessionaryPrice = Number(t)),
                    i.push(P),
                    (a.listShopGoods = i),
                    ce.value &&
                      (e.index.showLoading({ title: "下单中..." }),
                      (ce.value = !1),
                      s.api
                        .submitOrder(a)
                        .then((a) => {
                          e.index.hideLoading(),
                            (de.value = !1),
                            1 === a.result
                              ? (g("COMPLETE_ORDER", {
                                  payCharge: 100 * Number(me.value.rateSum),
                                  orderNo: a.retVal.orderNo,
                                }),
                                c.qdTracker.track("mini_order", {
                                  commodity_id: P.goodsId,
                                  commodity_name: P.goodsName,
                                  order_id: a.retVal.orderNo,
                                }),
                                D.report(D.actionTypeEnum.order, {
                                  orderNo: a.retVal.orderNo,
                                  orderType: "2",
                                  orderCount: oe.number,
                                  payCharge: me.value.rateSum,
                                  productId: a.retVal.listShopGoods[0].goodsId,
                                  productName:
                                    a.retVal.listShopGoods[0].goodsName,
                                  productPrice:
                                    me.value.basicTeamRateSum +
                                    me.value.singleRoomRateSum +
                                    me.value.guaranteedPrice,
                                  productCategory: "通兑券",
                                }),
                                "3" === a.retVal.orderStatus
                                  ? ra(
                                      `/pagesB/travel/paySuccess?orderNo=${a.retVal.id}&productType=shop`,
                                    )
                                  : ra(
                                      `/pagesB/other/pay?orderNo=${a.retVal.id}&productType=shop`,
                                    ))
                              : "" === a.msg
                                ? u.jAlert3(a.retVal.resultMsg)
                                : u.jAlert3(a.msg),
                            (ce.value = !0);
                        })
                        .catch((a) => {
                          ((null == a ? void 0 : a.code) !==
                            r.RateLimitStatusCode &&
                            (null == a ? void 0 : a.status) !==
                              r.RateLimitStatusCode) ||
                            ((de.value = !0),
                            (ce.value = !0),
                            e.index.hideLoading());
                        }));
                })()
              : (async function () {
                  Ae.value ||
                    (Ie.reserveOrderDto.rsvMan
                      ? Ie.reserveOrderDto.mobile
                        ? ce.value &&
                          (await T(),
                          e.index.showLoading({ title: "下单中..." }),
                          (ce.value = !1),
                          (Ie.couponUseDtoList = []),
                          (Ie.memberDiscountEnable = !!j.value),
                          $.value.length > 0 &&
                            ($.value.forEach((e) => {
                              (e.beginDate = e.beginDatetime),
                                (e.channel = e.salesChannel),
                                (e.endDate = e.endDatetime),
                                (e.couponDetailCode = e.couponNo),
                                (e.isTdq = "FWQ" === e.couponType ? "T" : "F");
                            }),
                            (Ie.couponUseDtoList = $.value)),
                          (Ie.dscAmountInfoDto.payType =
                            Ie.reserveOrderDto.payType),
                          (Ie.dscAmountInfoDto.couponDscAmount =
                            me.value.couponRateSum),
                          (Ie.utm_params = l.adaptor.getUtmParam("ALL")),
                          (Ie.tagDesc = P.tagDesc),
                          "member" === j.value &&
                            ((Ie.dscAmountInfoDto.memberDiscount = Number(
                              k.value.discount.toFixed(2),
                            )),
                            (Ie.dscAmountInfoDto.memberLevelDesc =
                              "" + A.cardLevelDescript),
                            (Ie.dscAmountInfoDto.memberDiscountAmount =
                              me.value.memberDscAmount)),
                          "partner" === j.value &&
                            ((Ie.dscAmountInfoDto.distributorNo =
                              k.value.partnerId),
                            (Ie.dscAmountInfoDto.distributorDiscount =
                              k.value.discount),
                            (Ie.dscAmountInfoDto.memberLevelDesc = `合伙人${ze(
                              10 * k.value.discount,
                            )}折`),
                            (Ie.dscAmountInfoDto.distributorDiscountAmount =
                              ie.value)),
                          "FreeTravel" === P.orderType &&
                            "PACKAGE" !== P.priceModel &&
                            (Ie.reserveOrderDto.num = xe.value),
                          (Ie.dscAmountInfoDto.pay = me.value.readyPay),
                          (Ie.dscAmountInfoDto.point = me.value.point),
                          (Ie.dscAmountInfoDto.pointMoney =
                            me.value.exchangeRateSum || 0),
                          (Ie.dscAmountInfoDto.adultTeamRateSum =
                            me.value.adultTeamRateSum),
                          (Ie.dscAmountInfoDto.basicTeamRateSum =
                            me.value.basicTeamRateSum),
                          (Ie.dscAmountInfoDto.childrenTeamRateSum =
                            me.value.childrenTeamRateSum),
                          (Ie.dscAmountInfoDto.bigChildrenTeamRateSum =
                            me.value.bigChildrenTeamRateSum),
                          (Ie.dscAmountInfoDto.midChildrenTeamRateSum =
                            me.value.midChildrenTeamRateSum),
                          (Ie.dscAmountInfoDto.babyChildrenTeamRateSum =
                            me.value.babyTeamRateSum),
                          (Ie.dscAmountInfoDto.singleRoomRateSum =
                            me.value.singleRoomRateSum),
                          (Ie.dscAmountInfoDto.guaranteedPrice =
                            me.value.guaranteedPrice),
                          Ve.value && (Ie.reserveOrderDto.adult = Ve.value),
                          ke.value &&
                            (Ie.reserveOrderDto.bigChildren = ke.value),
                          je.value && (Ie.reserveOrderDto.children = je.value),
                          _e.value && (Ie.reserveOrderDto.baby = _e.value),
                          "singleRoom" === Pe.value && Be.value > 0
                            ? ((Ie.reserveOrderDto.singleRoomNum = Be.value),
                              (Ie.reserveOrderDto.singleRoomPrice =
                                qe.value * Be.value))
                            : ((Ie.reserveOrderDto.singleRoomNum = 0),
                              (Ie.reserveOrderDto.singleRoomPrice = 0)),
                          "shareRoom" === Pe.value &&
                            (Ie.reserveOrderDto.shareRoom = "T"),
                          (Ie.sourceActivityId = B.value),
                          (Ie.sourceActivityName = H.value),
                          (Ie.reserveOrderDto.orderSource = "DirectCustomer"),
                          (Ie.reserveOrderDto.orderSourceDesc = "直客"),
                          (Ie.reserveOrderDto.customerType = "PERSONAL"),
                          (Ie.reserveOrderDto.orderSubSource = "71"),
                          (Ie.reserveOrderDto.orderSubSourceDesc = "小程序"),
                          "实时计价" === P.price &&
                            (Ie.rsvRmClassList = W.value),
                          q.value
                            ? s.api
                                .saveOrder({ ...Ie, version: S })
                                .then((a) => {
                                  var o, r;
                                  if (
                                    (e.index.hideLoading(),
                                    (de.value = !1),
                                    1 === a.result)
                                  ) {
                                    g("COMPLETE_ORDER", {
                                      payCharge:
                                        100 * Number(me.value.readyPay),
                                      orderNo: a.msg,
                                    });
                                    let e = {
                                      order_id: a.msg,
                                      price: me.value.rateSum,
                                      preferential_scheme:
                                        Ie.reserveOrderDto.payType,
                                    };
                                    if (
                                      ((null == P ? void 0 : P.category) &&
                                        ["BZT", "DestPackage"].includes(
                                          P.category,
                                        ) &&
                                        ((e = {
                                          ...e,
                                          order_type: "旅行产品",
                                          order_name: P.title,
                                          business_type: P.orderTypeDesc,
                                          start_date: P.groupBeginDate,
                                          end_date: P.groupEndDate,
                                          trip_people_count: xe.value,
                                          room_count: we.value,
                                          travel_path: P.itineraryDesc,
                                        }),
                                        l.adaptor.sendEvent(
                                          "customize_produce_order",
                                          e,
                                          "OTHER",
                                        ),
                                        c.qdTracker.track("mini_order", {
                                          commodity_id: P.travelType,
                                          commodity_name: P.title,
                                          travel_date: P.groupBeginDate,
                                          adult_num: (
                                            null ==
                                            (o =
                                              null == P
                                                ? void 0
                                                : P.specificationsPriceDtos)
                                              ? void 0
                                              : o[0]
                                          )
                                            ? Ve.value
                                            : P.adult,
                                          children_num: (
                                            null ==
                                            (r =
                                              null == P
                                                ? void 0
                                                : P.specificationsPriceDtos)
                                              ? void 0
                                              : r[0]
                                          )
                                            ? _e.value + je.value + ke.value
                                            : P.children,
                                          order_id: e.order_id,
                                        }),
                                        D.report(D.actionTypeEnum.order, {
                                          orderNo: a.msg,
                                          orderType: "1",
                                          orderCount: 1,
                                          payCharge: Ie.dscAmountInfoDto.pay,
                                          productId:
                                            Ie.reserveOrderDto.productCode,
                                          productName:
                                            Ie.reserveOrderDto.productDesc,
                                          productPrice:
                                            me.value.basicTeamRateSum +
                                            me.value.singleRoomRateSum +
                                            me.value.guaranteedPrice,
                                          productCategory: "旅行产品",
                                        })),
                                      console.log(
                                        "[travel] <TravelDetail> {api.saveOrder} travelInfo:",
                                        P,
                                      ),
                                      me.value.readyPay <= 0)
                                    )
                                      ra(
                                        "/pagesB/travel/orderDetail?orderNo=" +
                                          a.msg,
                                      );
                                    else {
                                      let e = `/pagesB/other/pay?orderNo=${a.msg}&productType=${P.orderType}&addContactFlag=1`;
                                      "T" === P.isSigning &&
                                        (e += "&contractFlag=1"),
                                        ra(e);
                                    }
                                  } else {
                                    const o =
                                      a.msg.includes("超过允许使用张数");
                                    e.index.showModal({
                                      title: "下单失败",
                                      content: a.msg,
                                      showCancel: !1,
                                      confirmText: "我知道了",
                                      confirmColor: "#333333",
                                      success(a) {
                                        a.confirm &&
                                          !o &&
                                          e.index.navigateBack({ delta: 1 });
                                      },
                                    });
                                  }
                                  ce.value = !0;
                                })
                                .catch((a) => {
                                  ((null == a ? void 0 : a.code) !==
                                    r.RateLimitStatusCode &&
                                    (null == a ? void 0 : a.status) !==
                                      r.RateLimitStatusCode) ||
                                    ((de.value = !0),
                                    (ce.value = !0),
                                    e.index.hideLoading());
                                })
                            : e.index.hideLoading())
                        : u.jAlert3("请填写联系人手机号")
                      : u.jAlert3("请填写联系人姓名"));
                })();
        }
        return (
          e.watch(
            () => me.value.basicTeamRateSum,
            () => {
              Ze();
            },
          ),
          e.watch(
            () => j.value,
            () => {
              Ze();
            },
          ),
          e.watch(
            () => $.value,
            (e) => {
              if (e.length > 0) {
                let a = !0;
                (a =
                  "shop" === L.value
                    ? !(
                        "FWQ" === e[0].couponType ||
                        "LZ" === e[0].discountType ||
                        "MZ" === e[0].discountType
                      )
                    : !e.some((e) => "F" === e.memberStacking)),
                  a
                    ? ((se.value = !0),
                      fe.value ||
                        "shop" === L.value ||
                        (ea(be.value), Xe("auto")))
                    : ((se.value = !1),
                      x.value.forEach((e) => {
                        e.choosed = !1;
                      }),
                      Xe("auto"));
              } else se.value = !0;
              Ze();
            },
          ),
          e.watch(
            () => oe.number,
            () => {
              "shop" === L.value && Ze();
            },
          ),
          e.watch(
            () => Ie.reserveOrderDto.payType,
            () => {
              (Ie.dscAmountInfoDto.payType = Ie.reserveOrderDto.payType), Ze();
            },
          ),
          e.watch(
            () => [we.value, Ue.value],
            ([e, a]) => {
              (Ie.rsvDtos = Array.from({ length: Number(e) })
                .fill(null)
                .map(() => ({
                  arr: "",
                  dep: "",
                  hotelGroupCode: N.hotelGroupCode,
                  hotelCode: N.hotelCode,
                  productCode: P.travelType,
                  num: 1,
                  rmClass: a,
                  guestDtos: [],
                }))),
                Ze();
            },
          ),
          e.watch(
            () => Pe.value,
            () => {
              Ze("7");
            },
          ),
          e.watch(
            () => [De.value, be.value],
            ([a, o]) => {
              a && !e.isEmpty(o) && (ea(o), Xe("auto"));
            },
            { immediate: !0 },
          ),
          e.onLoad((e) => {
            (L.value = null == e ? void 0 : e.productType),
              (ae.value = null == e ? void 0 : e.couponNo),
              (B.value = null == e ? void 0 : e.sourceActivityId),
              e.sourceActivityName &&
                (H.value = decodeURIComponent(e.sourceActivityName));
          }),
          e.onMounted(async () => {
            var e;
            if (
              ((Ie.reserveOrderDto.rsvMan = A.name || ""),
              "T" === A.isRealName && A.name
                ? (Ie.reserveOrderDto.contactName = A.name)
                : (Ie.reserveOrderDto.rsvMan = A.nickname),
              A.mobile &&
                ((Ie.reserveOrderDto.mobile = A.mobile),
                (Ie.reserveOrderDto.contactMobile = A.mobile)),
              "shop" === L.value)
            ) {
              if (
                ((q.value = !0),
                setTimeout(() => {
                  E.value.init({
                    checkInDay: X.value,
                    checkOutDay: ee.value,
                    isCheckedInTxt: "开始日期",
                    isCheckedOutTxt: "结束日期",
                  });
                }, 500),
                P.skuId)
              ) {
                let e = [],
                  a = "";
                const o = P.skuInfo;
                e =
                  "string" == typeof o[0].sku ? JSON.parse(o[0].sku) : o[0].sku;
                for (const o in e) a += e[o].itemValue;
                P.skuInfoStr = a;
              }
              P.credit &&
                P.credit > 0 &&
                ((P.priceDtos = [
                  { payType: "CASH", name: "现金" },
                  { payType: "INTEGRALCASH", name: "现金+积分" },
                ]),
                (Ie.reserveOrderDto.payType = "CASH")),
                (oe = Object.assign(oe, P)),
                Object.assign(oe, P),
                P.minLimit &&
                  ((Y.value = P.minLimit), (oe.number = P.minLimit)),
                da(),
                pa();
            } else {
              if (
                (da(),
                pa(),
                "实时计价" === P.price && P.priceDtos.push({ payType: "CASH" }),
                pe.forEach((e) => {
                  P.priceDtos.forEach((a) => {
                    a.payType === e.id && (a.name = e.name),
                      A.pointBalance < a.integral && (a.invalid = !0),
                      Ie.reserveOrderDto.payType ||
                        a.invalid ||
                        (Ie.reserveOrderDto.payType = a.payType);
                  });
                }),
                "PEOPLE" === P.priceModel)
              )
                (Ve.value = P.adult), (je.value = P.children);
              else if (
                (null == (e = null == P ? void 0 : P.specificationsPriceDtos)
                  ? void 0
                  : e[0]) &&
                P.number
              ) {
                const {
                  adult: e,
                  children: a,
                  childType: o,
                } = P.specificationsPriceDtos[0];
                (Ve.value = e * P.number),
                  "BIGCHILDREN" === o
                    ? (ke.value = a * P.number)
                    : "CHILDREN" === o
                      ? (je.value = a * P.number)
                      : "BABY" === o && (_e.value = a * P.number);
              }
              await (async function () {
                var e, a, o, r, u, t, l;
                console.log(
                  "{initRoomData} adultNumber.value:",
                  Ve.value,
                  ke.value + je.value + _e.value,
                );
                try {
                  if (1 === Ve.value && ke.value + je.value + _e.value === 2)
                    He.value = 1;
                  else {
                    const r = await s.api.interfaceTransfer({
                      query: {
                        unitCode: N.hotelGroupCode,
                        travelGroupCode: P.travelGroupCode,
                        specsCode:
                          (null ==
                          (a =
                            null ==
                            (e = null == P ? void 0 : P.specificationsPriceDtos)
                              ? void 0
                              : e[0])
                            ? void 0
                            : a.specificationsType) || "",
                      },
                      config: {
                        interfaceType: "GET",
                        interfaceModule: "GC_PRODUCT_JOURNEY",
                        interfaceMethod:
                          "/api/travelGroup/getTravelGroupHotelAvailableNum",
                        interfaceFrom: "GC",
                        hotelGroupCode: N.hotelGroupCode,
                      },
                    });
                    0 ===
                      (null == (o = null == r ? void 0 : r.retVal)
                        ? void 0
                        : o.result) &&
                      r.retVal.retVal &&
                      (He.value = Math.min(
                        Math.ceil(xe.value / 2),
                        r.retVal.retVal,
                      ));
                  }
                  if (O.value) {
                    const e = await s.api.interfaceTransfer({
                      query: { unitCode: N.hotelGroupCode, isHalt: "T" },
                      config: {
                        interfaceType: "GET",
                        interfaceModule: "GC_PRODUCT_JOURNEY",
                        interfaceMethod: "/api/itinerary/listTravelRmclassDto",
                        interfaceFrom: "GC",
                        hotelGroupCode: N.hotelGroupCode,
                      },
                    });
                    if (1 === e.result && 0 === e.retVal.result) {
                      ve.value = e.retVal.retVal.map((e) => ({
                        ...e,
                        invalid: !0,
                        name: e.rmclassDescript,
                        rmClass: e.rmclass,
                      }));
                      const a = await s.api.interfaceTransfer({
                        query: {
                          unitCode: N.hotelGroupCode,
                          travelGroupCode: P.travelGroupCode,
                        },
                        config: {
                          interfaceType: "POST",
                          interfaceModule: "GC_PRODUCT_JOURNEY",
                          interfaceMethod:
                            "/api/travelGroup/listTravelGroupRmtypes",
                          interfaceFrom: "GC",
                          hotelGroupCode: N.hotelGroupCode,
                        },
                      });
                      if (
                        1 === a.result &&
                        0 === a.retVal.result &&
                        (null ==
                        (u = null == (r = a.retVal) ? void 0 : r.retVal)
                          ? void 0
                          : u.length)
                      ) {
                        const e = a.retVal.retVal.map((e) => e.rmClass);
                        ve.value.forEach((a) => {
                          e.includes(a.rmClass) &&
                            ((a.invalid = !1),
                            Ue.value || (Ue.value = a.rmClass));
                        });
                      }
                    }
                  } else {
                    const e = await s.api.interfaceTransfer({
                      query: {
                        unitCode: N.hotelGroupCode,
                        travelGroupCode: P.travelGroupCode,
                      },
                      config: {
                        interfaceType: "GET",
                        interfaceModule: "GC_PRODUCT_JOURNEY",
                        interfaceMethod:
                          "/api/travelGroup/getHotelRoomTypeByTravelGroupCode",
                        interfaceFrom: "GC",
                        hotelGroupCode: N.hotelGroupCode,
                      },
                    });
                    if (
                      0 ===
                        (null == (t = null == e ? void 0 : e.retVal)
                          ? void 0
                          : t.result) &&
                      (null == (l = null == e ? void 0 : e.retVal)
                        ? void 0
                        : l.retVal)
                    ) {
                      const { tips: a, rmClass: o } = e.retVal.retVal;
                      (Ye.value = a), (Ue.value = o);
                    } else (Ye.value = ""), (Ue.value = void 0);
                  }
                } catch (e) {
                  (Ye.value = ""), (Ue.value = void 0);
                }
              })(),
                await (async function () {
                  const e = {
                    beginDate: P.groupBeginDate,
                    cardLevel: A.cardLevel,
                    cardNo: A.cardNo,
                    cardType: A.cardType,
                    hotelCode: N.hotelCode,
                    hotelGroupCode: N.hotelGroupCode,
                    memberId: A.memberId,
                    itineraryCode: P.itineraryCode,
                    orderType: "TRAVEL",
                    productCode: P.travelType,
                    productPrimaryClassification: P.orderType,
                    suitChannel: "WECHAT",
                    travelType: P.travelGroupCode,
                    mobile: A.mobile,
                    rightsType: "travelProductsRightsType",
                    goodsId: P.travelType,
                    queryPayDetail: Ke(),
                  };
                  "shop" === L.value &&
                    ((e.rightsType = "exchangeCouponRightsType"),
                    (e.orderType = "shop"),
                    (e.goodsId = P.goodsId)),
                    e.queryPayDetail.isTdq &&
                      Reflect.deleteProperty(e.queryPayDetail, "isTdq"),
                    e.queryPayDetail.memberStacking &&
                      Reflect.deleteProperty(
                        e.queryPayDetail,
                        "memberStacking",
                      ),
                    (Ne.value = !0);
                  try {
                    const a = await s.api.maxDiscount(e);
                    if (1 !== a.result) return void ca();
                    const {
                      memberDiscountStatus: o,
                      memberDiscount: r,
                      discountType: u,
                      partnerId: t = "",
                      hasCoupons: l = [],
                      pendingCoupons: n = [],
                      pendingCouponDetails: i = [],
                      memberDiscountAmount: c = 0,
                      ownedCouponDiscountAmount: d = 0,
                      pendingCouponDiscountAmount: v = 0,
                    } = a.retVal;
                    Ce.value = a.retVal.orderAmount;
                    const m = (function (e) {
                      return e.filter(
                        (e) =>
                          !["MJ", "MZ"].includes(e.discountType) ||
                          !(null == e ? void 0 : e.discountPriceBegin) ||
                          Ce.value >= e.discountPriceBegin,
                      );
                    })(n);
                    (re.value = m.map(ia)),
                      (ge.value = l.map(sa)),
                      (he.value = {
                        member: { memberDiscount: r, memberDiscountAmount: c },
                        coupon: {
                          ownedCouponDiscountAmount: d,
                          pendingCouponDiscountAmount: v,
                          pendingCouponDetails: i,
                        },
                      }),
                      (function (e) {
                        const {
                          memberDiscountStatus: a,
                          memberDiscount: o,
                          discountType: r,
                          partnerId: u = "",
                        } = e;
                        a &&
                          ((be.value = {
                            discount: o,
                            type: "MEMBER" === r ? "member" : "partner",
                            desc:
                              "MEMBER" === r
                                ? A.cardLevelDescript + "会员"
                                : "城市合伙人",
                            choosed: !0,
                          }),
                          "PARTNER" === r && (be.value.partnerId = u));
                      })({
                        memberDiscountStatus: o,
                        memberDiscount: r,
                        discountType: u,
                        partnerId: t,
                      });
                  } catch {
                    ca();
                  } finally {
                    Ne.value = !1;
                  }
                })();
            }
          }),
          (o, r) => {
            var t, l;
            return e.e(
              {
                a: e.o(ma),
                b: e.p({
                  color: "#fff",
                  title: "确认订单",
                  "custom-class": "customPattern",
                  "go-back-next": G.value,
                }),
                c: "shop" === L.value,
              },
              "shop" === L.value
                ? e.e(
                    { d: e.t(e.unref(P).goodsName), e: e.unref(P).skuInfoStr },
                    e.unref(P).skuInfoStr
                      ? { f: e.t(e.unref(P).skuInfoStr) }
                      : {},
                    { g: e.unref(P).peopleNum },
                    e.unref(P).peopleNum
                      ? { h: e.t(e.unref(P).peopleNum) }
                      : {},
                    { i: "pack" !== e.unref(P).vrType },
                    "pack" !== e.unref(P).vrType
                      ? { j: e.t(e.unref(P).useTime) }
                      : {},
                    {
                      k: e.unref(h.addCssUnit)(
                        null == (t = e.unref(R)) ? void 0 : t.outerHeight,
                      ),
                    },
                  )
                : e.e(
                    {
                      l: e.t(e.unref(P).title),
                      m: e.t(e.unref(P).itineraryDesc),
                      n: e.t(e.unref(P).groupBeginDateFormat),
                      o: e.t(e.unref(P).groupEndDateFormat),
                      p: "PACKAGE" === e.unref(P).priceModel,
                    },
                    "PACKAGE" === e.unref(P).priceModel
                      ? { q: e.t(e.unref(P).number), r: e.t(xe.value) }
                      : { s: e.t(xe.value) },
                    {
                      t: e.t(we.value),
                      v: e.unref(h.addCssUnit)(
                        null == (l = e.unref(R)) ? void 0 : l.outerHeight,
                      ),
                    },
                  ),
              { w: "shop" === L.value },
              "shop" === L.value
                ? e.e(
                    { x: "pack" !== e.unref(P).vrType },
                    "pack" !== e.unref(P).vrType
                      ? {
                          y: e.unref(oe).number <= Y.value ? 1 : "",
                          z: e.o((e) => na("reduce")),
                          A: e.t(e.unref(oe).number),
                          B: e.unref(oe).number >= e.unref(oe).stock ? 1 : "",
                          C: e.o((e) => na("add")),
                        }
                      : {},
                    {
                      D: e.unref(oe).remark,
                      E: e.o((a) => (e.unref(oe).remark = a.detail.value)),
                    },
                  )
                : {},
              { F: "shop" !== L.value },
              "shop" !== L.value
                ? e.e(
                    { G: Fe.value },
                    Fe.value ? { H: e.unref(a.assets).icQuestionGray } : {},
                    { I: e.o(Me), J: Fe.value },
                    Fe.value
                      ? {
                          K: e.t(Fe.value),
                          L: e.sr(Le, "73858044-1", { k: "roomNumInfoPopup" }),
                          M: e.p({ title: "房间数说明", "max-dialog": !0 }),
                        }
                      : {},
                    {
                      N: e.o((e) => (we.value = e)),
                      O: e.p({
                        min: He.value,
                        max: Ve.value,
                        modelValue: we.value,
                      }),
                      P: O.value,
                    },
                    O.value
                      ? e.e(
                          {
                            Q: e.f(ve.value, (a, o, r) => ({
                              a: "73858044-3-" + r,
                              b: e.p({
                                "model-value": Ue.value === a.rmClass,
                                disabled: a.invalid,
                              }),
                              c: e.t(a.name),
                              d: "room-" + a.rmClass,
                              e: e.n({ "form-radio--disabled": a.invalid }),
                              f: e.o(
                                (e) =>
                                  (function (e) {
                                    if (e.invalid)
                                      return u.jAlert3(
                                        "您所选的出行日期没有" + e.name,
                                      );
                                    Ue.value = e.rmClass;
                                  })(a),
                                "room-" + a.rmClass,
                              ),
                            })),
                            R: We.value,
                          },
                          We.value
                            ? {
                                S: e.p({
                                  "model-value": "shareRoom" === Pe.value,
                                }),
                                T: e.o((e) => Qe("shareRoom")),
                                U: e.p({
                                  "model-value": "singleRoom" === Pe.value,
                                }),
                                V: e.o((e) => Qe("singleRoom")),
                              }
                            : {},
                          { W: "shareRoom" === Pe.value || Be.value > 0 },
                          "shareRoom" === Pe.value || Be.value > 0
                            ? e.e(
                                { X: "shareRoom" === Pe.value },
                                "shareRoom" === Pe.value
                                  ? {}
                                  : Be.value > 0
                                    ? {
                                        Z: e.t(
                                          e.unref(y.priceFormat)(qe.value),
                                        ),
                                        aa: e.t(Be.value),
                                      }
                                    : {},
                                { Y: Be.value > 0 },
                              )
                            : {},
                        )
                      : Ye.value
                        ? { ac: e.t(Ye.value) }
                        : {},
                    { ab: Ye.value, ad: O.value },
                    (O.value, {}),
                  )
                : {},
              {
                ae: Ie.reserveOrderDto.contactName,
                af: e.o(
                  (e) => (Ie.reserveOrderDto.contactName = e.detail.value),
                ),
                ag: Ie.reserveOrderDto.contactMobile,
                ah: e.o(
                  (e) => (Ie.reserveOrderDto.contactMobile = e.detail.value),
                ),
                ai: Ee.value,
              },
              (Ee.value, {}),
              {
                aj: Ee.value ? 1 : "",
                ak: e.unref(P).priceDtos && e.unref(P).priceDtos.length > 1,
              },
              e.unref(P).priceDtos && e.unref(P).priceDtos.length > 1
                ? {
                    al: e.sr("daysRadio", "73858044-6"),
                    am: e.o((e) => (Ie.reserveOrderDto.payType = e)),
                    an: e.p({
                      datas: e.unref(P).priceDtos,
                      dataKey: "payType",
                      val: Ie.reserveOrderDto.payType,
                    }),
                  }
                : e.unref(P).credit && "shop" === L.value
                  ? {
                      ap: e.sr("daysRadio", "73858044-7"),
                      aq: e.o((e) => (Ie.reserveOrderDto.payType = e)),
                      ar: e.p({
                        datas: e.unref(P).priceDtos,
                        dataKey: "payType",
                        val: Ie.reserveOrderDto.payType,
                      }),
                    }
                  : {},
              {
                ao: e.unref(P).credit && "shop" === L.value,
                as:
                  "FAMILY" === e.unref(P).priceModel &&
                  e.unref(P).specificationsPriceDtos &&
                  e.unref(P).specificationsPriceDtos.length > 1,
              },
              "FAMILY" === e.unref(P).priceModel &&
                e.unref(P).specificationsPriceDtos &&
                e.unref(P).specificationsPriceDtos.length > 1
                ? {
                    at: e.sr("daysRadio", "73858044-8"),
                    av: e.o((e) => (Ie.reserveOrderDto.payType = e)),
                    aw: e.p({
                      datas: e.unref(P).specificationsPriceDtos,
                      dataKey: "payType",
                      val: Ie.reserveOrderDto.payType,
                    }),
                  }
                : {},
              {
                ax:
                  "INTEGRAL" === Ie.reserveOrderDto.payType ||
                  "INTEGRALCASH" === Ie.reserveOrderDto.payType,
              },
              "INTEGRAL" === Ie.reserveOrderDto.payType ||
                "INTEGRALCASH" === Ie.reserveOrderDto.payType
                ? { ay: e.t(e.unref(y.valFormat)(me.value.point)) }
                : {},
              {
                az:
                  "CASH" === Ie.reserveOrderDto.payType ||
                  "INTEGRALCASH" === Ie.reserveOrderDto.payType ||
                  "shop" === L.value,
              },
              "CASH" === Ie.reserveOrderDto.payType ||
                "INTEGRALCASH" === Ie.reserveOrderDto.payType ||
                "shop" === L.value
                ? e.e(
                    { aA: x.value.length > 1 },
                    x.value.length > 1
                      ? e.e(
                          { aB: "shop" === L.value },
                          "shop" === L.value
                            ? e.e(
                                { aC: !j.value },
                                j.value
                                  ? me.value.memberDscAmount
                                    ? {
                                        aG: e.t(
                                          e.unref(y.valFormat)(
                                            me.value.memberDscAmount,
                                          ),
                                        ),
                                      }
                                    : {}
                                  : {
                                      aD: e.t(x.value[0].desc),
                                      aE: e.t(ze(10 * x.value[0].discount)),
                                    },
                                { aF: me.value.memberDscAmount },
                              )
                            : e.e(
                                { aH: !j.value },
                                j.value
                                  ? {
                                      aK: e.t(k.value.desc),
                                      aL: e.t(ze(10 * k.value.discount)),
                                      aM: e.t(
                                        e.unref(y.valFormat)(
                                          me.value.memberDscAmount,
                                        ),
                                      ),
                                    }
                                  : e.e({ aI: se.value }, (se.value, {}), {
                                      aJ: se.value ? 1 : "",
                                    }),
                              ),
                        )
                      : {},
                    { aN: e.o(aa) },
                  )
                : {},
              {
                aO:
                  "CASH" === Ie.reserveOrderDto.payType ||
                  "INTEGRALCASH" === Ie.reserveOrderDto.payType ||
                  "shop" === L.value,
              },
              "CASH" === Ie.reserveOrderDto.payType ||
                "INTEGRALCASH" === Ie.reserveOrderDto.payType ||
                "shop" === L.value
                ? e.e(
                    { aP: "shop" === L.value },
                    "shop" === L.value
                      ? e.e(
                          { aQ: Ge.value.length > 0 },
                          Ge.value.length > 0
                            ? e.e(
                                { aR: 0 === $.value.length },
                                0 === $.value.length
                                  ? { aS: e.t(Ge.value.length) }
                                  : {
                                      aT: e.t(
                                        e.unref(y.valFormat)(
                                          me.value.couponRateSum,
                                        ),
                                      ),
                                    },
                              )
                            : {},
                        )
                      : e.e(
                          { aU: ue.value },
                          ue.value
                            ? {
                                aV: e.t(
                                  e.unref(y.valFormat)(
                                    he.value.coupon.pendingCouponDiscountAmount,
                                  ),
                                ),
                              }
                            : {},
                          { aW: Ge.value.length > 0 },
                          Ge.value.length > 0
                            ? e.e(
                                { aX: 0 === $.value.length && !ue.value },
                                0 !== $.value.length || ue.value
                                  ? {}
                                  : { aY: e.t(Ge.value.length) },
                                { aZ: $.value.length > 0 },
                                $.value.length > 0
                                  ? e.e(
                                      {
                                        ba: e.t(
                                          e.unref(y.valFormat)(
                                            me.value.couponRateSum,
                                          ),
                                        ),
                                        bb: !se.value,
                                      },
                                      (se.value, {}),
                                    )
                                  : {},
                              )
                            : e.e({ bc: !ue.value }, (ue.value, {})),
                        ),
                    {
                      bd: e.o(
                        (e) => (
                          z.value.forEach((e) => {
                            (e.choosed = !1),
                              $.value.forEach((a) => {
                                e.couponNo === a.couponNo && (e.choosed = !0);
                              });
                          }),
                          void F.value.showDialog()
                        ),
                      ),
                    },
                  )
                : {},
              { be: !q.value },
              q.value
                ? e.e(
                    {
                      bf:
                        me.value.readyPay > 0 ||
                        (me.value.readyPay <= 0 && me.value.point <= 0),
                    },
                    me.value.readyPay > 0 ||
                      (me.value.readyPay <= 0 && me.value.point <= 0)
                      ? {
                          bg: e.p({
                            value: me.value.readyPay,
                            format: e.unref(y.priceFormat),
                          }),
                        }
                      : {},
                    { bh: me.value.point > 0 },
                    me.value.point > 0
                      ? { bi: e.t(e.unref(y.valFormat)(me.value.point)) }
                      : {},
                    {
                      bj:
                        me.value.readyPay <= 0 && me.value.point >= 0 ? 1 : "",
                      bk: e.o((e) => oa()),
                    },
                  )
                : {},
              { bl: Q.value },
              Q.value ? { bm: e.o((e) => fa()) } : {},
              { bn: ue.value },
              ue.value
                ? {
                    bo: e.t(re.value.length),
                    bp: e.f(re.value, (a, o, r) => ({
                      a: e.o(la, o),
                      b: "73858044-11-" + r + ",73858044-10",
                      c: e.p({ "coupon-item": a, mode: "receive" }),
                      d: o,
                    })),
                  }
                : {},
              { bq: Ge.value.length > 0 },
              Ge.value.length > 0
                ? {
                    br: e.t(Ge.value.length),
                    bs: e.f(Ge.value, (a, o, r) => ({
                      a: e.o(ta, o),
                      b: "73858044-12-" + r + ",73858044-10",
                      c: e.p({
                        "coupon-item": a,
                        mode: "select",
                        "single-select": "shop" !== L.value,
                      }),
                      d: o,
                    })),
                  }
                : {},
              { bt: 0 === Ge.value.length && !ue.value },
              0 !== Ge.value.length || ue.value
                ? {}
                : { bv: e.p({ tips: "暂无可用券" }) },
              {
                bw: e.o((e) => ua("manual")),
                bx: e.sr(F, "73858044-10", { k: "couponListLayer" }),
                by: e.p({ title: "选择券包" }),
                bz: !se.value,
              },
              (se.value, {}),
              {
                bA: e.f(x.value, (a, o, r) =>
                  e.e(
                    { a: e.t(a.desc), b: a.type },
                    a.type ? { c: e.t(ze(10 * a.discount)) } : {},
                    Z.value ? e.e({ d: a.choosed }, (a.choosed, {})) : {},
                    { e: o, f: e.o((e) => ea(a), o) },
                  ),
                ),
                bB: Z.value,
                bC: se.value ? "" : 1,
                bD: se.value,
              },
              se.value ? { bE: e.o((e) => Xe("manual")) } : {},
              {
                bF: e.sr(w, "73858044-14", { k: "discountListLayer" }),
                bG: e.p({ title: "选择折扣" }),
                bH:
                  me.value.basicTeamRateSum +
                    me.value.singleRoomRateSum +
                    me.value.guaranteedPrice >
                    0 || me.value.point <= 0,
              },
              me.value.basicTeamRateSum +
                me.value.singleRoomRateSum +
                me.value.guaranteedPrice >
                0 || me.value.point <= 0
                ? e.e(
                    {
                      bI: e.t(
                        e.unref(y.priceFormat)(
                          me.value.basicTeamRateSum +
                            me.value.singleRoomRateSum +
                            me.value.guaranteedPrice,
                        ),
                      ),
                      bJ:
                        me.value.basicTeamRateSum +
                          me.value.singleRoomRateSum +
                          me.value.guaranteedPrice >
                          0 && me.value.point > 0,
                    },
                    (me.value.basicTeamRateSum +
                      me.value.singleRoomRateSum +
                      me.value.guaranteedPrice >
                      0 && me.value.point,
                    {}),
                    { bK: me.value.point > 0 },
                    me.value.point > 0
                      ? { bL: e.t(e.unref(y.valFormat)(me.value.point)) }
                      : {},
                  )
                : me.value.basicTeamRateSum + me.value.singleRoomRateSum <= 0 &&
                    me.value.point > 0
                  ? { bN: e.t(e.unref(y.valFormat)(me.value.point)) }
                  : {},
              {
                bM:
                  me.value.basicTeamRateSum + me.value.singleRoomRateSum <= 0 &&
                  me.value.point > 0,
                bO: "shop" === L.value,
              },
              "shop" === L.value
                ? e.e(
                    { bP: e.t(e.unref(P).goodsName), bQ: me.value.point },
                    me.value.point
                      ? {
                          bR: e.t(
                            e.unref(y.priceFormat)(
                              me.value.basicTeamRateSum / e.unref(oe).number,
                            ),
                          ),
                          bS: e.t(
                            e.unref(y.valFormat)(
                              me.value.point / e.unref(oe).number,
                            ),
                          ),
                          bT: e.t(e.unref(oe).number),
                        }
                      : {
                          bU: e.t(
                            e.unref(y.priceFormat)(
                              me.value.basicTeamRateSum / e.unref(oe).number,
                            ),
                          ),
                          bV: e.t(e.unref(oe).number),
                        },
                  )
                : {},
              { bW: "shop" !== L.value },
              "shop" !== L.value
                ? e.e(
                    {
                      bX: me.value.basicTeamRateSum > 0 || me.value.point <= 0,
                    },
                    me.value.basicTeamRateSum > 0 || me.value.point <= 0
                      ? e.e(
                          {
                            bY: e.t(
                              e.unref(y.priceFormat)(me.value.basicTeamRateSum),
                            ),
                            bZ:
                              me.value.basicTeamRateSum > 0 &&
                              me.value.point > 0,
                          },
                          (me.value.basicTeamRateSum > 0 && me.value.point, {}),
                          { ca: me.value.point > 0 },
                          me.value.point > 0
                            ? { cb: e.t(e.unref(y.valFormat)(me.value.point)) }
                            : {},
                        )
                      : me.value.basicTeamRateSum <= 0 && me.value.point > 0
                        ? { cd: e.t(e.unref(y.valFormat)(me.value.point)) }
                        : {},
                    {
                      cc: me.value.basicTeamRateSum <= 0 && me.value.point > 0,
                    },
                  )
                : {},
              { ce: me.value.adultTeamRateSum > 0 },
              me.value.adultTeamRateSum > 0
                ? e.e(
                    { cf: me.value.point },
                    me.value.point
                      ? {
                          cg: e.t(
                            e.unref(y.priceFormat)(
                              me.value.adultTeamRateSum / me.value.adult,
                            ),
                          ),
                          ch: e.t(
                            e.unref(y.valFormat)(
                              me.value.point / me.value.adult,
                            ),
                          ),
                          ci: e.t(me.value.adult),
                        }
                      : {
                          cj: e.t(
                            e.unref(y.priceFormat)(
                              me.value.adultTeamRateSum / me.value.adult,
                            ),
                          ),
                          ck: e.t(me.value.adult),
                        },
                  )
                : {},
              { cl: me.value.bigChildrenTeamRateSum > 0 },
              me.value.bigChildrenTeamRateSum > 0
                ? {
                    cm: e.t(
                      e.unref(y.priceFormat)(
                        me.value.bigChildrenTeamRateSum / me.value.bigChildren,
                      ),
                    ),
                    cn: e.t(me.value.bigChildren),
                  }
                : {},
              { co: me.value.midChildrenTeamRateSum > 0 },
              me.value.midChildrenTeamRateSum > 0
                ? {
                    cp: e.t(
                      "FAMILY" === e.unref(P).priceModel ? "含中童" : "含儿童",
                    ),
                    cq: e.t(
                      e.unref(y.priceFormat)(
                        me.value.midChildrenTeamRateSum / me.value.midChildren,
                      ),
                    ),
                    cr: e.t(me.value.midChildren),
                  }
                : {},
              { cs: me.value.babyTeamRateSum > 0 },
              me.value.babyTeamRateSum > 0
                ? {
                    ct: e.t(
                      e.unref(y.priceFormat)(
                        me.value.babyTeamRateSum /
                          (me.value.baby - me.value.babyRoomNum),
                      ),
                    ),
                    cv: e.t(me.value.baby - me.value.babyRoomNum),
                  }
                : {},
              { cw: me.value.singleRoomRateSum > 0 },
              me.value.singleRoomRateSum > 0
                ? {
                    cx: e.t(e.unref(y.priceFormat)(qe.value)),
                    cy: e.t(Be.value),
                  }
                : {},
              { cz: me.value.guaranteedPrice },
              me.value.guaranteedPrice
                ? { cA: e.t(e.unref(y.priceFormat)(me.value.guaranteedPrice)) }
                : {},
              { cB: me.value.memberDscAmount + me.value.couponRateSum > 0 },
              me.value.memberDscAmount + me.value.couponRateSum > 0
                ? {
                    cC: e.t(
                      e.unref(y.priceFormat)(
                        me.value.memberDscAmount + me.value.couponRateSum,
                      ),
                    ),
                  }
                : {},
              { cD: me.value.memberDscAmount > 0 },
              me.value.memberDscAmount > 0
                ? { cE: e.t(e.unref(y.priceFormat)(me.value.memberDscAmount)) }
                : {},
              { cF: $.value.length > 0 },
              $.value.length > 0
                ? {
                    cG: e.f($.value, (a, o, r) => ({
                      a: e.t(a.couponName),
                      b: e.t(e.unref(y.valFormat)(a.realValue)),
                      c: o,
                    })),
                  }
                : {},
              {
                cH:
                  me.value.readyPay > 0 ||
                  (me.value.readyPay <= 0 && me.value.point <= 0),
              },
              me.value.readyPay > 0 ||
                (me.value.readyPay <= 0 && me.value.point <= 0)
                ? { cI: e.t(e.unref(y.priceFormat)(me.value.readyPay)) }
                : {},
              { cJ: me.value.point > 0 },
              me.value.point > 0
                ? { cK: e.t(e.unref(y.valFormat)(me.value.point)) }
                : {},
              {
                cL: me.value.readyPay <= 0 && me.value.point >= 0 ? 1 : "",
                cM: e.o((e) => oa()),
                cN: e.o((e) => fa()),
                cO: e.sr(M, "73858044-15", { k: "priceInfo" }),
                cP: e.p({ title: "费用明细" }),
                cQ: e.sr(E, "73858044-16", { k: "calendarCompent" }),
                cR: e.o(te),
                cS: e.p({ "check-in-day": X.value, "check-out-day": ee.value }),
                cT: e.sr(U, "73858044-17", { k: "kf" }),
                cU: e.p({ title: "联系客服" }),
                cV: e.o(va),
                cW: e.o(() => (K.value = !1)),
                cX: e.o((e) => (K.value = e)),
                cY: e.p({
                  "tracking-data": {
                    commodity_id: e.unref(P).travelType || e.unref(P).goodsId,
                    commodity_name: e.unref(P).title || e.unref(P).goodsName,
                    series: e.unref(P).series,
                    theme: e.unref(P).themes,
                    rendezvous: e.unref(P).rendezvousDesc,
                    dissolution: e.unref(P).dissolutionDesc,
                    travel_route: e.unref(P).itineraryDesc,
                    travel_date: e.unref(P).groupBeginDate,
                    end_date: e.unref(P).groupEndDate,
                  },
                  show: K.value,
                }),
                cZ: e.o((e) => fa()),
                da: e.o((e) => (de.value = e)),
                db: e.p({ visible: de.value }),
                dc: !K.value,
                dd: e.p({
                  "tracking-data": {
                    commodity_id: e.unref(P).travelType || e.unref(P).goodsId,
                    commodity_name: e.unref(P).title || e.unref(P).goodsName,
                  },
                }),
              },
            );
          }
        );
      },
    }),
    E = e._export_sfc(G, [["__scopeId", "data-v-73858044"]]);
  wx.createPage(E);
})();
