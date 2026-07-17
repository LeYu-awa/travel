!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    r = require("../../utils/utils.js"),
    t = require("../../utils/api.js"),
    a = require("../../utils/wxuser.js"),
    l = require("../../hooks/useScroll.js"),
    u = require("../../base/jAlert/jAlert.js"),
    o = require("../../utils/md5.js"),
    n = require("../../utils/filter.js");
  Array || e.resolveComponent("FloatButtonKf")(), Math || (i + s + c + d + f)();
  const s = () => "../../components/switchBar.js",
    i = () => "../../components/coustomHead.js",
    c = () => "../components/accountItem.js",
    f = () => "../../components/bottomDialog.js",
    d = () => "../../components/empty.js",
    m = e.defineComponent({
      __name: "memberAccount",
      setup(s) {
        const { scrollTop: i, onPageScroll: c } = l.useScroll();
        c((e) => {
          i.value = e.scrollTop;
        });
        let f = e.ref("#ffffff"),
          d = a.getStorage("config"),
          m = a.getStorage("user"),
          p = e.ref("余额"),
          v = e.ref(1),
          h = e.ref();
        e.ref(!1);
        let g = e.ref(""),
          b = e.ref(""),
          C = e.ref(""),
          j = e.ref(!1),
          y = e.ref("XFJ"),
          A = e.ref("QDXFJ,DKHXFJ"),
          T = e.ref("BLJ"),
          L = e.ref("QDBLJ,DKHBLJ"),
          x = e.ref([]),
          V = e.ref([]),
          D = e.ref([]),
          w = e.ref(0),
          B = e.ref(0),
          I = e.ref(0),
          q = e.reactive([
            { name: "消费金", active: !0, index: 1 },
            { name: "风物卡", active: !1, index: 2 },
            { name: "保留金", active: !1, index: 3 },
          ]);
        const _ = (e) => {
            q.forEach((e) => {
              e.active = !1;
            }),
              (q[e].active = !0),
              (v.value = q[e].index);
          },
          F = () => {
            h.value.showDialog();
          },
          S = () =>
            g.value
              ? b.value
                ? ((C.value = o.hex_md5(b.value)), void E())
                : (u.jAlert3("请输入兑换码"), !1)
              : (u.jAlert3("请输入序列号"), !1),
          E = () => {
            if (j.value) return !1;
            (j.value = !0),
              t.api
                .bindCardToMember({
                  hotelGroupCode: d.hotelGroupCode,
                  hotelCode: d.hotelCode,
                  channel: "wechat",
                  cardNo: g.value,
                  memberId: m.memberId,
                  authCode: C.value,
                })
                .then((e) => {
                  1 == e.result
                    ? 0 == e.retVal.result
                      ? ((g.value = ""),
                        (C.value = ""),
                        (b.value = ""),
                        h.value.hideDialog(),
                        (j.value = !1),
                        u.jAlert3("绑定成功"),
                        G(y.value, "consumer", A.value))
                      : ((j.value = !1), u.jAlert3(e.retVal.msg))
                    : ((j.value = !1), u.jAlert3(e.msg));
                });
          },
          G = (e, a, l = "") => {
            t.api
              .queryMemberCardByCondition({
                hotelGroupCode: d.hotelGroupCode,
                cardType: e,
                isIncludeAbnormal: "F",
                memberId: m.memberId,
                channel: "wechat",
                cardLevel: l,
                cardLevelModel: "R",
              })
              .then((e) => {
                if (
                  1 == e.result &&
                  0 == e.retVal.result &&
                  e.retVal.retVal.cardList &&
                  e.retVal.retVal.cardList.length > 0
                ) {
                  let t = 0,
                    l = [];
                  e.retVal.retVal.cardList.forEach((e) => {
                    (e.title = e.cardLevelDescript),
                      (e.validTime = n.timeDay(e.endDate)),
                      (e.price = r.subtraction(e.recharge, e.pay)),
                      (e.type = a),
                      (t = r.addNum(t, e.price)),
                      e.price > 0 && l.push(e);
                  }),
                    "consumer" == a && ((x.value = l), (w.value = t)),
                    "reserve" == a && ((V.value = l), (B.value = t));
                }
              });
          },
          J = (e) => {
            if (2 == v.value) return r.goWmUrl("showCard"), !1;
            a.setStorage("accountItem", e),
              r.goPage("/pagesA/member/memberAccountInfo?type=" + e.type);
          },
          U = e.computed(() => {
            let e = 0;
            return (
              m && m.memberBalanceUsable && (e = m.memberBalanceUsable),
              (e = r.addNum(e, I.value)),
              e
            );
          });
        return (
          e.onMounted(() => {
            G(y.value, "consumer", A.value),
              G(T.value, "reserve", L.value),
              t.api
                .getUserAvailableCardList({
                  hotelCode: d.hotelCode,
                  hotelGroupCode: d.hotelGroupCode,
                  mobile: m.mobile,
                  vidType: 2,
                  scrollSize: 100,
                  cardType: 1,
                  cardStatus: 200,
                })
                .then((e) => {
                  1 == e.result &&
                    e.retVal.data &&
                    e.retVal.data.scrollList.length > 0 &&
                    (e.retVal.data.scrollList.forEach((e) => {
                      (e.logo = e.cardImageUrl),
                        (e.title = e.cardName),
                        (e.price = e.cardBalance),
                        (e.validTime = e.fixEndDate),
                        3 == e.expireType && (e.isForever = "T"),
                        (I.value = r.addNum(I.value, e.cardBalance));
                    }),
                    (D.value = e.retVal.data.scrollList));
                });
          }),
          (t, a) =>
            e.e(
              {
                a: e.p({
                  title: e.unref(p),
                  color: "#fff",
                  customClass: "customPattern",
                }),
                b: e.t(e.unref(n.valFormat)(U.value)),
                c: e.o(_),
                d: e.p({
                  switchList: e.unref(q),
                  color: e.unref(f),
                  padding: 16,
                }),
                e: 1 == e.unref(v),
              },
              1 == e.unref(v) ? { f: e.o(F) } : {},
              { g: 2 == e.unref(v) },
              2 == e.unref(v)
                ? { h: e.o((t) => e.unref(r.goWmUrl)("showCard")) }
                : {},
              { i: 1 == e.unref(v) },
              1 == e.unref(v)
                ? {
                    j: e.t(e.unref(w)),
                    k: e.o((t) =>
                      e.unref(r.goPage)(
                        "/pagesA/member/memberAccountExpire?type=consumer&cardType=" +
                          e.unref(y),
                      ),
                    ),
                  }
                : {},
              { l: 2 == e.unref(v) },
              2 == e.unref(v)
                ? {
                    m: e.t(e.unref(I)),
                    n: e.o((t) => e.unref(r.goWmUrl)("showCard")),
                  }
                : {},
              { o: 3 == e.unref(v) },
              3 == e.unref(v)
                ? {
                    p: e.t(e.unref(B)),
                    q: e.o((t) =>
                      e.unref(r.goPage)(
                        "/pagesA/member/memberAccountExpire?type=reserve&cardType=" +
                          e.unref(T),
                      ),
                    ),
                  }
                : {},
              { r: 1 == e.unref(v) },
              1 == e.unref(v)
                ? e.e(
                    {
                      s: e.f(e.unref(x), (r, t, a) => ({
                        a: e.o((e) => J(r), t),
                        b: "48029448-2-" + a,
                        c: e.p({ item: r }),
                        d: t,
                      })),
                      t: 0 == e.unref(x).length,
                    },
                    0 == e.unref(x).length
                      ? {
                          v: e.p({
                            tips: "暂无消费金",
                            subTips: "松赞，期待与您相遇",
                          }),
                        }
                      : {},
                  )
                : {},
              { w: 2 == e.unref(v) },
              2 == e.unref(v)
                ? e.e(
                    {
                      x: e.f(e.unref(D), (r, t, a) => ({
                        a: e.o((e) => J(r), t),
                        b: "48029448-4-" + a,
                        c: e.p({ item: r }),
                        d: t,
                      })),
                      y: 0 == e.unref(D).length,
                    },
                    0 == e.unref(D).length
                      ? {
                          z: e.p({
                            tips: "暂无风物卡",
                            subTips: "松赞，期待与您相遇",
                          }),
                        }
                      : {},
                  )
                : {},
              { A: 3 == e.unref(v) },
              3 == e.unref(v)
                ? e.e(
                    {
                      B: e.f(e.unref(V), (r, t, a) => ({
                        a: e.o((e) => J(r), t),
                        b: "48029448-6-" + a,
                        c: e.p({ item: r }),
                        d: t,
                      })),
                      C: 0 == e.unref(V).length,
                    },
                    0 == e.unref(V).length
                      ? {
                          D: e.p({
                            tips: "暂无保留金",
                            subTips: "松赞，期待与您相遇",
                          }),
                        }
                      : {},
                  )
                : {},
              {
                E: e.unref(g),
                F: e.o((r) =>
                  e.isRef(g)
                    ? (g.value = r.detail.value)
                    : (g = r.detail.value),
                ),
                G: e.unref(b),
                H: e.o((r) =>
                  e.isRef(b)
                    ? (b.value = r.detail.value)
                    : (b = r.detail.value),
                ),
                I: e.o(S),
                J: e.sr(h, "48029448-8", { k: "bindComponent" }),
                K: e.p({ title: "绑定" }),
              },
            )
        );
      },
    });
  m.__runtimeHooks = 1;
  const p = e._export_sfc(m, [["__scopeId", "data-v-48029448"]]);
  wx.createPage(p);
})();
