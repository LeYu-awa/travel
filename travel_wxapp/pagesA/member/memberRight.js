!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../utils/api.js"),
    r = require("../../utils/wxuser.js"),
    a = require("../../utils/utils.js"),
    o = require("../../base/jAlert/jAlert.js"),
    i = require("../../utils/getMemberUI.js"),
    s = require("../../utils/filter.js");
  Array || e.resolveComponent("FloatButtonKf")(), Math || (n + l)();
  const l = () => "../../components/bottomDialog.js",
    n = () => "../../components/coustomHead.js",
    u = e.defineComponent({
      __name: "memberRight",
      setup(l) {
        let n = r.getStorage("config"),
          u = r.getStorage("user");
        r.getStorage("wxuser");
        let d = e.ref(),
          c = e.ref([]),
          p = e.ref({});
        e.ref(1);
        const f = e.ref();
        let m = e.ref(),
          h = e.ref(0),
          g = e.ref(0),
          C = e.ref(0);
        e.ref(0);
        let v = e.ref(""),
          D = e.ref([]);
        e.onShow(() => {
          (u = r.getStorage("user")),
            I(),
            V(),
            (v.value = i.getMemberUI(u.cardLevel).memberCenterBg);
        }),
          e.onLoad((e) => {
            e.cardLevel && (m.value = e.cardLevel);
          });
        let L = e.reactive({
          dataArr: [],
          activityList: [],
          swpierCardList: [],
          cardLevelRightsList: [],
        });
        e.ref(!1);
        const b = (e) => {
            let t = e.target.current || e.detail.current;
            q(t),
              (L.cardLevelRightsList = L.swpierCardList[t].icons
                ? JSON.parse(L.swpierCardList[t].icons)
                : []),
              w(L.swpierCardList[t].code),
              (v.value = i.getMemberUI(
                L.swpierCardList[t].code,
              ).memberCenterBg);
          },
          w = (e) => {
            t.api
              .membercardInterestDesc({
                cardCode: e,
                hotelGroupCode: n.hotelGroupCode,
                hotelCode: n.hotelCode,
              })
              .then((e) => {
                1 == e.result
                  ? (D.value = e.retVal.icons ? JSON.parse(e.retVal.icons) : [])
                  : o.jAlert3(e.msg);
              });
          },
          q = (e) => {
            h.value != e && (h.value = e);
          },
          I = () => {
            t.api
              .activityTaskList({
                hotelGroupCode: n.hotelGroupCode,
                hotelCode: n.hotelCode,
                memberId: u.memberId,
                memberNo: u.memberId,
                taskType: "SMRZ",
              })
              .then((e) => {
                (L.activityList = []),
                  1 == e.result
                    ? (L.activityList = e.retVal)
                    : o.jAlert3(e.msg);
              });
          },
          V = () => {
            e.index.showLoading({ title: "加载中..." }),
              t.api
                .interfaceTransfer({
                  config: {
                    interfaceFrom: "member",
                    interfaceMethod: "/crm/v2/queryCardLevelSuitList",
                    hotelGroupCode: n.hotelGroupCode,
                  },
                  query: {
                    hotelCode: n.hotelCode,
                    hotelGroupCode: n.hotelGroupCode,
                    cardType: u.cardType,
                    isNeedRights: "T",
                    channel: "WECHAT",
                  },
                })
                .then((r) => {
                  if (
                    ((L.swpierCardList = []),
                    1 == r.result && 0 == r.retVal.result)
                  ) {
                    r.retVal.retVal.map((e) => {
                      "T" == e.configOnlineShow && L.swpierCardList.push(e);
                    }),
                      L.swpierCardList.map((e, r) => {
                        u &&
                          u.memberId &&
                          (async () => {
                            var e = {
                              hotelGroupCode: n.hotelGroupCode,
                              allRuleInfo: "T",
                              cardId: u.cardId,
                            };
                            let r = [];
                            return (
                              await t.api
                                .queryMemberUpgradeInfo(e)
                                .then((e) => {
                                  1 == e.result &&
                                    e.retVal.retVal.length > 0 &&
                                    e.retVal.retVal.forEach((e) => {
                                      var t =
                                          e.originalCardInfoDto
                                            .cardAutoUpDegradeInfoDetailList[0],
                                        o =
                                          e.originalCardInfoDto
                                            .isMatchCondition,
                                        i = Number(t.actualQuotaValue);
                                      if (
                                        ((t.quotaDescript =
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
                                          }[t.quota] || ""),
                                        "KEEP" ==
                                          e.autoUpDownGradeCfgInfoDto
                                            .ruleType &&
                                          (o
                                            ? r.push({
                                                cardLevel:
                                                  e.autoUpDownGradeCfgInfoDto
                                                    .cardLevel,
                                                tipDescript:
                                                  e.autoUpDownGradeCfgInfoDto
                                                    .descript,
                                                quotaValue: t.quotaValue,
                                                cardLevelDescript:
                                                  e.autoUpDownGradeCfgInfoDto
                                                    .cardLevelDescript,
                                                type: "KEEP",
                                                actualQuotaValue: i,
                                                desc: `距保级还需${s.valFormat(
                                                  a.subtraction(
                                                    t.quotaValue,
                                                    Number(i),
                                                  ),
                                                )}${t.quotaDescript}`,
                                                speed: `width:${
                                                  (i / t.quotaValue) * 100
                                                }%`,
                                                isMatchCondition: o,
                                              })
                                            : r.unshift({
                                                cardLevel:
                                                  e.autoUpDownGradeCfgInfoDto
                                                    .cardLevel,
                                                tipDescript:
                                                  e.autoUpDownGradeCfgInfoDto
                                                    .descript,
                                                quotaValue: t.quotaValue,
                                                cardLevelDescript:
                                                  e.autoUpDownGradeCfgInfoDto
                                                    .cardLevelDescript,
                                                type: "KEEP",
                                                actualQuotaValue: i,
                                                desc: `距保级还需${s.valFormat(
                                                  a.subtraction(
                                                    t.quotaValue,
                                                    Number(i),
                                                  ),
                                                )}${t.quotaDescript}`,
                                                speed: `width:${
                                                  (i / t.quotaValue) * 100
                                                }%`,
                                                isMatchCondition: o,
                                              })),
                                        "UP" ==
                                          e.autoUpDownGradeCfgInfoDto.ruleType)
                                      ) {
                                        let o = {
                                          cardLevel:
                                            e.autoUpDownGradeCfgInfoDto
                                              .cardLevel,
                                          tipDescript:
                                            e.autoUpDownGradeCfgInfoDto
                                              .descript,
                                          quotaValue: t.quotaValue,
                                          cardLevelDescript:
                                            e.autoUpDownGradeCfgInfoDto
                                              .cardLevelDescript,
                                          type: "UP",
                                          actualQuotaValue: i,
                                          desc: `累计${s.valFormat(i)}${
                                            t.quotaDescript
                                          }，距升级还需${s.valFormat(
                                            a.subtraction(
                                              t.quotaValue,
                                              Number(i),
                                            ),
                                          )}${t.quotaDescript}`,
                                          speed: `width:${
                                            (i / t.quotaValue) * 100
                                          }%`,
                                        };
                                        t.quotaValue < i &&
                                          ((o.desc = `累计${t.quotaValue}${t.quotaDescript},即将升级`),
                                          (o.speed = "width:100%")),
                                          r.push(o);
                                      }
                                      r.length > 0 &&
                                        ((c.value = []),
                                        1 == r.length &&
                                        "KEEP" == r[0].type &&
                                        r[0].isMatchCondition
                                          ? c.value.push({
                                              type: "KEEP",
                                              desc: "已完成保级",
                                              speed: "width:100%",
                                            })
                                          : c.value.push(r[0])),
                                        r.map((e) => {
                                          "KEEP" == e.type &&
                                            e.isMatchCondition &&
                                            ((e.desc = "已完成保级"),
                                            (e.speed = "width:100%"));
                                        });
                                    });
                                }),
                              r
                            );
                          })().then((t) => {
                            let r = {};
                            (r = t.find((t, r) => t.cardLevel == e.code)),
                              e.code == u.cardLevel && (r = t[0]),
                              (e = Object.assign(e, r));
                          }),
                          (async (e) => {
                            let r = "",
                              a = await t.api.membercardInterestDesc({
                                hotelGroupCode: n.hotelGroupCode,
                                hotelCode: n.hotelCode,
                                cardCode: e,
                              });
                            return (
                              1 == a.result &&
                                (a.retVal.interestDesc &&
                                  null != a.retVal.interestDesc &&
                                  (d.value = a.retVal.interestDesc),
                                (r = a.retVal)),
                              r
                            );
                          })(e.code).then((t) => {
                            e = Object.assign(e, t);
                          });
                      }),
                      (C.value = e
                        .dayjs(e.dayjs())
                        .diff(e.dayjs(u.beginLevelDate), "day"));
                    const o = L.swpierCardList.findIndex((e) => {
                      let t = u.cardLevel;
                      return (
                        ("JG-XZWL" != t && "JG-BAGD" != t) || (t = "JG"),
                        e.code == t
                      );
                    });
                    q(-1 == o ? 0 : o),
                      (g.value = -1 == o ? 0 : o),
                      w(L.swpierCardList[-1 == o ? 0 : o].code),
                      setTimeout(() => {}, 200);
                  } else o.jAlert3(r.msg);
                })
                .finally(() => {
                  e.index.hideLoading();
                });
          },
          y = () => {
            e.index.navigateTo({ url: "/pagesA/member/collectionCenter" });
          };
        return (
          e.onMounted(() => {}),
          (t, r) =>
            e.e(
              {
                a: e.p({ title: "会员中心", bgColor: "none", nativeMode: !0 }),
                b: e.unref(v),
                c: e.f(e.unref(L).swpierCardList, (t, r, a) =>
                  e.e(
                    { a: t.faceAttr, b: e.t(t.descript), c: r == e.unref(g) },
                    r == e.unref(g)
                      ? { d: e.t("当前等级") }
                      : { e: e.t(t.remark) },
                    { f: e.unref(g) == r },
                    e.unref(g) == r
                      ? e.e(
                          { g: 0 == t.code.indexOf("JG") },
                          0 == t.code.indexOf("JG")
                            ? { h: e.t(t.descript), i: e.t(e.unref(C)) }
                            : { j: e.t(t.desc) },
                        )
                      : e.e(
                          { k: r > e.unref(g) },
                          r > e.unref(g)
                            ? { l: e.t(t.desc) }
                            : { m: e.t("已超越该等级") },
                        ),
                    { n: t.speed && r >= e.unref(g) },
                    t.speed && r >= e.unref(g) ? { o: e.s(t.speed) } : {},
                    { p: r },
                  ),
                ),
                d: e.unref(h),
                e: e.o(b),
                f: e.o((t) => {
                  return (
                    (r = {
                      title: decodeURIComponent("会员政策"),
                      code: "memberRule",
                    }),
                    void e.index.navigateTo({
                      url: "/pagesA/other/codeText?" + a.createUrl(r),
                    })
                  );
                  var r;
                }),
                g: e.f(e.unref(D), (t, r, a) => ({
                  a: t.iconUrl,
                  b: e.t(t.name),
                  c: e.t(t.remark),
                  d: e.o(
                    (e) =>
                      ((e) => {
                        (p.value = e), f.value.showDialog();
                      })(t),
                    r,
                  ),
                  e: r,
                })),
                h: e.o(y),
                i: e.unref(L).activityList.length > 0,
              },
              e.unref(L).activityList.length > 0
                ? {
                    j: e.f(e.unref(L).activityList, (t, r, o) =>
                      e.e(
                        {
                          a: e.t(t.taskName),
                          b: e.t(t.prize),
                          c: "T" == t.isComplete,
                        },
                        (t.isComplete, {}),
                        {
                          d: e.o(
                            (e) =>
                              ((e) => {
                                "T" != e.isComplete &&
                                  a.goPageWithUser(
                                    `/pagesA/member/memberAuth?ruleCode=${e.taskCode}&isNeedPoint=T`,
                                  );
                              })(t),
                            r,
                          ),
                          e: r,
                        },
                      ),
                    ),
                  }
                : {},
              {
                k: e.unref(p).iconUrl,
                l: e.t(e.unref(p).name),
                m: e.t(e.unref(p).remark),
                n: e.unref(p).useDescript,
                o: e.unref(p).descript,
                p: e.sr(f, "a85b30f1-1", { k: "checkIn" }),
                q: e.p({ maxDialog: !0, titleBorder: "true" }),
              },
            )
        );
      },
    }),
    d = e._export_sfc(u, [["__scopeId", "data-v-a85b30f1"]]);
  wx.createPage(d);
})();
