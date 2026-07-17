!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    a = require("../../utils/wxuser.js"),
    l = require("../../utils/api.js"),
    t = require("../../utils/utils.js"),
    o = require("../../hooks/useScroll.js");
  Array || e.resolveComponent("FloatButtonKf")(),
    Math || (u + v + s + i + c + r)();
  const u = () => "../../components/coustomHead.js",
    v = () => "../../components/switchBar.js",
    i = () => "../../components/empty.js",
    s = () => "../../components/wersal.js",
    r = () => "../../components/bottomDialog.js",
    c = () => "../../components/radioBox.js",
    n = e.defineComponent({
      __name: "myCollection",
      setup(u) {
        let v = e.ref(a.getStorage("user") || {});
        const i = e.ref(""),
          s = e.ref([]),
          r = e.ref([]);
        e.ref("搜索");
        const c = e.ref(),
          n = e.ref(!1),
          p = e.ref(""),
          d = e.ref(""),
          g = e.ref(!0),
          h = e.ref(""),
          m = e.ref("F"),
          f = e.ref(!1),
          T = e.ref(!1),
          { scrollTop: y, onPageScroll: b } = o.useScroll();
        let C = e.ref(40),
          E = e.reactive([
            { name: "全部", active: !0, productType: "" },
            { name: "管家定制", active: !1, productType: "ButlerCustomized" },
            { name: "自由行", active: !1, productType: "FreeTravel" },
            { name: "主题团", active: !1, productType: "ThemeGroup" },
            { name: "目的地套餐", active: !1, productType: "DestPackage" },
            { name: "酒店", active: !1, productType: "hotel" },
            { name: "通兑券", active: !1, productType: "shop" },
            { name: "日活动", active: !1, productType: "activity" },
          ]);
        const G = () => {
            T.value = !T.value;
          },
          I = a.getStorage("config"),
          w = () => {
            m.value = "T";
          },
          P = () => {
            l.api
              .getGoodsCollection({
                hotelGroupCode: I.hotelGroupCode,
                productType: p.value,
                memberId: v.value.memberId || "",
                goodsName: i.value,
              })
              .then((e) => {
                1 == e.result &&
                  ((s.value = []),
                  (r.value = []),
                  (h.value = i.value),
                  (n.value = !0),
                  (g.value = !1),
                  e.retVal.list.forEach((e) => {
                    "T" == e.isHalt ||
                    ("shop" == e.productType &&
                      "0" != e.shopGoods.onUnSale &&
                      null != e.shopGoods.onUnSale)
                      ? r.value.push(e)
                      : s.value.push(e);
                  }),
                  i.value);
              });
          };
        b((e) => {
          y.value = e.scrollTop;
        }),
          e.onShow(() => {
            P();
          });
        const N = e.ref([
            {
              id: 1,
              name: "内容",
              value: 0,
              active: !0,
              collectionType: "CONTENT",
            },
            {
              id: 2,
              name: "产品",
              value: 1,
              active: !1,
              collectionType: "PRODUCT",
            },
            {
              id: 3,
              name: "行程",
              value: 1,
              active: !1,
              collectionType: "TRAVEL",
            },
          ]),
          S = e.ref(0),
          j = e.ref(0),
          x = a.getStorage("config"),
          H = e.ref("CONTENT"),
          B = e.ref([[], []]),
          D = e.ref([]),
          F = e.ref([]);
        e.onLoad((e) => {
          1 == e.type
            ? ((N.value = [
                {
                  id: 1,
                  name: "内容",
                  value: 0,
                  active: !1,
                  collectionType: "CONTENT",
                },
                {
                  id: 2,
                  name: "产品",
                  value: 1,
                  active: !1,
                  collectionType: "PRODUCT",
                },
                {
                  id: 3,
                  name: "行程",
                  value: 1,
                  active: !0,
                  collectionType: "TRAVEL",
                },
              ]),
              (H.value = "TRAVEL"),
              _())
            : A();
        });
        const V = (e) => {
            N.value.forEach((e) => {
              e.active = !1;
            }),
              (N.value[e].active = !0),
              (H.value = N.value[e].collectionType),
              0 == e ? ((B.value = [[], []]), (D.value = []), A()) : _();
          },
          _ = () => {
            (v.value = a.getStorage("user")),
              l.api
                .shopGetGoodsCollection({
                  hotelGroupCode: x.hotelGroupCode,
                  mobile: v.value.mobile,
                  memberId: v.value.memberId,
                  collectionType: H.value,
                })
                .then((e) => {
                  0 != e.retVal.list.length &&
                    ((F.value = e.retVal.list),
                    F.value.forEach((e) => {
                      console.log(e.isHalt), "T" == e.isHalt && (f.value = !0);
                    }));
                });
          },
          A = () => {
            (v.value = a.getStorage("user")),
              l.api
                .shopGetGoodsCollection({
                  hotelGroupCode: x.hotelGroupCode,
                  mobile: v.value.mobile,
                  memberId: v.value.memberId,
                  collectionType: H.value,
                })
                .then((e) => {
                  let a = e.retVal.list;
                  a.forEach((e, a) => ((e.count = D.value.length + a), e)),
                    (D.value = [...D.value, ...a]),
                    D.value.forEach((e, a) => {
                      e.numberOfPreviews >= 1e4 &&
                        (D.value[a].numberOfPreviews =
                          parseFloat(e.numberOfPreviews / 1e4).toFixed(1) +
                          "w");
                    });
                  const l = O(a, 2),
                    t = [[], []];
                  l.forEach((e) => e.forEach((e, a) => t[a].push(e))),
                    (B.value[0] = [...B.value[0], ...t[0]]),
                    (B.value[1] = [...B.value[1], ...t[1]]);
                });
          },
          O = (e = [], a = 1) => {
            let l = [],
              t = [];
            return (
              e.forEach(
                (o, u) => (
                  t.push(o),
                  u % a == a - 1 || u === e.length - 1
                    ? (l.push(t), (t = []))
                    : null
                ),
              ),
              l
            );
          },
          q = (e) => {
            const a = D.value.findIndex((a) => a.id == e.id);
            D.value[a] = e;
            const l = D.value.filter((e) => e.element);
            if (l.length !== D.value.length) return;
            const t = [[], []];
            let o = 0,
              u = 0;
            l.forEach((e) =>
              o <= u
                ? ((o += e.element.height), t[0].push(e))
                : (t[1].push(e), (u += e.element.height)),
            ),
              (B.value = t);
          };
        return (
          e.onMounted(() => {
            e.index.getSystemInfo({
              success: (e) => {
                (C.value = (e.statusBarHeight || 0) + C.value),
                  (S.value = e.statusBarHeight || 0),
                  (j.value = S.value + 40);
              },
              fail(e) {
                console.log(e);
              },
            });
          }),
          (l, o) =>
            e.e(
              {
                a: e.p({ title: "我的收藏", nativeMode: !0 }),
                b: e.o(V),
                c: e.p({ switchList: N.value, padding: 16 }),
                d: j.value + "px",
                e: N.value[0].active,
              },
              N.value[0].active
                ? e.e(
                    { f: 0 != B.value[0].length },
                    0 != B.value[0].length
                      ? {
                          g: e.f(B.value, (a, l, t) => ({
                            a: e.f(a, (a, l, o) => ({
                              a: e.o(q, l),
                              b: "7bcaaeed-2-" + t + "-" + o,
                              c: e.p({ item: a }),
                              d: l,
                            })),
                            b: l,
                          })),
                        }
                      : {
                          h: e.p({
                            tips: "暂无收藏",
                            subTips: "松赞，期待与您相遇。",
                          }),
                        },
                  )
                : {},
              { i: N.value[1].active },
              N.value[1].active
                ? e.e(
                    {
                      j: e.f(s.value, (a, l, o) =>
                        e.e(
                          {
                            a: a.picture,
                            b: e.t(a.goodsName),
                            c: e.t(a.subGoodsName),
                            d: "-1" == a.price,
                          },
                          "-1" == a.price ? {} : { e: e.t(a.price) },
                          {
                            f: l,
                            g: e.o(
                              (e) =>
                                ((e) => {
                                  e.goodsId,
                                    "shop" == e.productType
                                      ? t.goPage(
                                          "/pagesB/exchangeCoupon/exchangeCouponDetail?id=" +
                                            e.goodsId,
                                        )
                                      : "hotel" == e.productType
                                        ? t.goPage(
                                            "/pagesC/order/hotel?hotelCode=" +
                                              e.goodsId,
                                          )
                                        : "activity" == e.productType
                                          ? t.goPage(
                                              "/pagesE/dailyActivity/dailyActivityDetail?activityCode=" +
                                                e.goodsId,
                                            )
                                          : t.goPage(
                                              "/pagesB/travel/travelDetail?travelType=" +
                                                e.goodsId,
                                            );
                                })(a),
                              l,
                            ),
                          },
                        ),
                      ),
                      k:
                        r.value.length > 0 &&
                        s.value.length > 0 &&
                        "F" == m.value,
                    },
                    r.value.length > 0 && s.value.length > 0 && "F" == m.value
                      ? { l: e.o(w) }
                      : {},
                    { m: "T" == m.value || s.value.length <= 0 },
                    "T" == m.value || s.value.length <= 0
                      ? {
                          n: e.f(r.value, (a, l, t) => ({
                            a: a.picture,
                            b: e.t(a.goodsName),
                            c: e.t(a.subGoodsName),
                            d: l,
                          })),
                        }
                      : {},
                    {
                      o:
                        0 == r.value.length &&
                        0 == s.value.length &&
                        n.value &&
                        h.value,
                    },
                    0 == r.value.length &&
                      0 == s.value.length &&
                      n.value &&
                      h.value
                      ? {
                          p: e.p({
                            tips: "没有相关收藏",
                            subTips: "松赞，期待与您相遇。",
                            emptyUrl:
                              "https://dsplatweb.oss-cn-chengdu.aliyuncs.com/songzan/images/empty_search.png",
                          }),
                        }
                      : 0 == r.value.length && 0 == s.value.length && n.value
                        ? {
                            r: e.p({
                              tips: "暂无收藏",
                              subTips: "松赞，期待与您相遇。",
                            }),
                          }
                        : {},
                    {
                      q: 0 == r.value.length && 0 == s.value.length && n.value,
                      s: e.sr("radio", "7bcaaeed-7,7bcaaeed-6"),
                      t: e.o((e) => (d.value = e)),
                      v: e.p({
                        datas: e.unref(E),
                        dataKey: "productType",
                        val: d.value,
                      }),
                      w: e.o((e) => {
                        d.value = "";
                      }),
                      x: e.o(
                        (e) => (
                          (p.value = d.value), c.value.hideDialog(), void P()
                        ),
                      ),
                      y: e.sr(c, "7bcaaeed-6", { k: "filterComponent" }),
                      z: e.p({ title: "筛选" }),
                    },
                  )
                : {},
              { A: N.value[2].active },
              N.value[2].active
                ? e.e(
                    { B: 0 != F.value.length },
                    0 != F.value.length
                      ? e.e(
                          {
                            C: e.f(F.value, (l, o, u) => ({
                              a: l.picture + "?imageView2",
                              b: e.t(l.collectNum),
                              c: "F" == l.isHalt,
                              d: o,
                              e: e.o(
                                (e) =>
                                  ((e) => {
                                    (v.value = a.getStorage("user")),
                                      t.goPage(
                                        `/pagesTravelAssistant/plan/detail?itineraryPlanCode=${e.goodsId}&memberId=${v.value.memberId}&fromType=1`,
                                      );
                                  })(l),
                                o,
                              ),
                            })),
                            D: f.value,
                          },
                          f.value ? { E: e.o(G) } : {},
                          { F: T.value },
                          T.value
                            ? {
                                G: e.f(F.value, (a, l, t) => ({
                                  a: a.picture + "?imageView2",
                                  b: e.t(a.collectNum),
                                  c: "T" == a.isHalt,
                                  d: l,
                                  e: e.o((a) => {
                                    e.index.showToast({
                                      title: "已失效",
                                      icon: "none",
                                    });
                                  }, l),
                                })),
                              }
                            : {},
                        )
                      : {
                          H: e.p({
                            tips: "暂无收藏",
                            subTips: "松赞，期待与您相遇。",
                          }),
                        },
                  )
                : {},
            )
        );
      },
    });
  n.__runtimeHooks = 1;
  const p = e._export_sfc(n, [["__scopeId", "data-v-7bcaaeed"]]);
  wx.createPage(p);
})();
