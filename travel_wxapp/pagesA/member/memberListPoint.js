!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    r = require("../../utils/api.js"),
    t = require("../../utils/wxuser.js"),
    o = require("../../utils/filter.js"),
    a = require("../../base/jAlert/jAlert.js"),
    l = require("../../utils/utils.js"),
    u = require("../../hooks/useScroll.js");
  Array || e.resolveComponent("FloatButtonKf")(), Math || (f + n + i + s + c)();
  const n = () => "../../components/switchBar.js",
    f = () => "../../components/coustomHead.js",
    s = () => "../../components/empty.js",
    i = () => "../../components/lastText.js",
    c = () => "../../components/centerDialog.js",
    m = e.defineComponent({
      __name: "memberListPoint",
      setup(n) {
        const { scrollTop: f, onPageScroll: s } = u.useScroll();
        s((e) => {
          f.value = e.scrollTop;
        });
        let i = e.ref("#ffffff"),
          c = t.getStorage("config"),
          m = e.ref(t.getStorage("user")),
          p = e.ref("积分");
        e.ref("#ffffff");
        let v = e.ref(0),
          h = e.ref(15),
          d = e.ref(!1),
          g = e.ref(""),
          C = e.ref(""),
          V = e.ref([]),
          b = e.ref(0),
          y = e.reactive([
            { name: "全部", active: !0, value: "" },
            { name: "累积", active: !1, value: "P" },
            { name: "消费", active: !1, value: "C" },
            { name: "过期", active: !1, value: "O" },
          ]),
          j = e.computed(() => {
            let e = "";
            return (
              y.forEach((r) => {
                r.active && ((e = r.name), "全部" == r.name && (e = "积分"));
              }),
              "暂无" + e
            );
          }),
          P = e.ref({
            PA: "消费产生积分",
            CH: "使用积分",
            IN: "积分失效",
            PP: "积分奖励",
            PC: "积分录入",
            LT: "积分转出",
            LF: "积分转入",
            AP: "积分调整-产生积分",
            AC: "积分调整-使用积分",
            AR: "使用积分撤销",
            IM: "系统切换导入",
          }),
          G = e.ref(0),
          I = e.ref("");
        const T = e.ref(),
          q = () => {
            T.value.hideDialog();
          },
          D = (e) => {
            y.forEach((e) => {
              e.active = !1;
            }),
              (y[e].active = !0),
              (g.value = y[e].value),
              M();
          },
          A = () => {
            if (V.value.length > 0 && V.value.length >= b.value) return !1;
            if (d.value) return !1;
            d.value = !0;
            var e = {
              memberId: m.value.memberId,
              firstResult: v.value,
              pageSize: h.value,
              hotelGroupId: c.hotelGroupId,
              hotelGroupCode: c.hotelGroupCode,
              pointType: g.value,
            };
            r.api.listPointByMemberId(e).then((e) => {
              1 == e.result
                ? (e.retVal.cardPointList.forEach((e) => {
                    e.showSrc = P.value[e.src];
                  }),
                  (V.value = V.value.concat(e.retVal.cardPointList)),
                  (v.value += h.value),
                  (b.value = e.retVal.totalRows),
                  (d.value = !1))
                : (a.jAlert3(e.msg), (d.value = !1));
            });
          },
          M = () => {
            (b.value = 0), (v.value = 0), (V.value = []), A();
          };
        return (
          e.onReachBottom(() => {
            A();
          }),
          e.onMounted(() => {
            m.value &&
              m.value.memberId &&
              (r.api
                .queryPointsExpiredRemindData({
                  hotelGroupCode: c.hotelGroupCode,
                  memberId: m.value.memberId,
                  channel: "WECHAT",
                })
                .then((e) => {
                  if (
                    1 == e.result &&
                    0 == e.retVal.result &&
                    e.retVal.retVal.length > 0
                  ) {
                    let r = e.retVal.retVal[0];
                    C.value = `${r.expirePoint}积分将在${o.timeDay(
                      r.expireDate,
                    )}到期`;
                  }
                }),
              r.api
                .interfaceTransfer({
                  query: {
                    memberId: m.value.memberId,
                    firstResult: 0,
                    pageSize: 10,
                    hotelGroupCode: c.hotelGroupCode,
                    hotelCode: c.hotelCode,
                    channel: "WECHAT",
                    orderColumn: "expiryDate",
                  },
                  config: {
                    interfaceType: "POST",
                    interfaceModule: "",
                    interfaceMethod: "crm/v2/queryPointFreezeByMemberId",
                    interfaceFrom: "member",
                    hotelGroupCode: c.hotelGroupCode,
                  },
                })
                .then((r) => {
                  1 == r.result &&
                    0 == r.retVal.result &&
                    r.retVal.retVal.datas.length > 0 &&
                    ((G.value = r.retVal.retVal.datas[0].amount),
                    (I.value = e
                      .dayjs(r.retVal.retVal.datas[0].expiryDate)
                      .format("YYYY.MM.DD")));
                }),
              ((e) => {
                let t = {
                  hotelGroupCode: c.hotelGroupCode,
                  hotelCode: c.hotelCode,
                  parentCode: "pointType",
                  channel: "WECHAT",
                };
                r.api
                  .interfaceTransfer({
                    config: {
                      interfaceFrom: "member",
                      interfaceMethod: "crm/v2/querySysDictHelp",
                      hotelGroupCode: c.hotelGroupCode,
                    },
                    query: t,
                  })
                  .then((r) => {
                    if (1 == r.result)
                      if (0 == r.retVal.result) {
                        if (r.retVal.retVal.length > 0) {
                          let e = {};
                          r.retVal.retVal.forEach((r) => {
                            e[r.code] = r.descript;
                          }),
                            (P.value = e);
                        }
                        e && e();
                      } else e && e();
                    else e && e();
                    console.log(r);
                  });
              })(() => {
                A();
              }),
              l.refreshMemberInfo((e) => {
                m.value = e;
              }));
          }),
          (r, t) =>
            e.e(
              {
                a: e.p({
                  title: e.unref(p),
                  color: "#fff",
                  customClass: "customPattern",
                }),
                b: e.unref(G) > 0,
              },
              e.unref(G) > 0
                ? {
                    c: e.t(e.unref(o.valFormat)(e.unref(G))),
                    d: e.o((e) => {
                      T.value.showDialog();
                    }),
                  }
                : {},
              {
                e: e.t(e.unref(o.valFormat)(e.unref(m).pointBalance)),
                f: e.unref(C),
              },
              e.unref(C) ? { g: e.t(e.unref(C)) } : {},
              {
                h: e.o(D),
                i: e.p({ switchList: e.unref(y), color: e.unref(i) }),
                j: e.f(e.unref(V), (r, t, a) => ({
                  a: e.t(r.showSrc),
                  b: e.t(e.unref(o.timeDay)(r.pointGenDate)),
                  c: e.t(e.unref(o.valFormat)(r.point)),
                  d: t,
                })),
                k: e.unref(V).length > 0 && e.unref(b) == e.unref(V).length,
              },
              e.unref(V).length > 0 && e.unref(b) == e.unref(V).length
                ? { l: e.p({ tips: "没有更多了" }) }
                : {},
              { m: 0 == e.unref(V).length && !e.unref(d) },
              0 != e.unref(V).length || e.unref(d)
                ? {}
                : {
                    n: e.p({ tips: e.unref(j), subTips: "松赞，期待与您相遇" }),
                  },
              {
                o: e.t(e.unref(G)),
                p: e.t(e.unref(I)),
                q: e.o(q),
                r: e.sr(T, "b8ae04ce-4", { k: "tips" }),
              },
            )
        );
      },
    });
  m.__runtimeHooks = 1;
  const p = e._export_sfc(m, [["__scopeId", "data-v-b8ae04ce"]]);
  wx.createPage(p);
})();
