!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    o = require("../../utils/api.js"),
    t = require("../../utils/wxuser.js"),
    i = require("../../utils/utils.js");
  Math || (a + p)();
  const p = () => "../../components/empty.js",
    a = () => "../../components/coustomHead.js",
    r = e.defineComponent({
      __name: "prizeList",
      setup(p) {
        let a = t.getStorage("config"),
          r = t.getStorage("user");
        t.getStorage("wxuser");
        const l = e.ref([]),
          u = e.ref(!0);
        let n = e.ref(64);
        e.reactive({
          hotelCode: a.hotelCode,
          hotelGroupCode: a.hotelGroupCode,
        });
        const s = e.ref(99999),
          d = e.ref(0),
          c = e.ref(15),
          g = e.ref(""),
          v = () =>
            !(l.value.length > 0 && l.value.length >= s.value) &&
            !!u.value &&
            ((u.value = !1),
            void o.api
              .prizewinner({
                memberId: r.memberId,
                appid: g.value || t.getStorage("appid") || a.appid,
                componentAppid:
                  g.value ||
                  t.getStorage("appid") ||
                  a.componentAppid ||
                  a.appid,
                hotelGroupCode: a.hotelGroupCode,
                hotelGroupId: a.hotelGroupId,
                hotelCode: a.hotelCode,
                pageSize: c.value,
                firstResult: d.value,
              })
              .then((e) => {
                1 == e.result &&
                  e.retVal &&
                  e.retVal.datas.length > 0 &&
                  ((l.value = l.value.concat(e.retVal.datas)),
                  (s.value = e.retVal.totalRows),
                  (d.value = d.value + 15)),
                  console.log(l),
                  (u.value = !0);
              })),
          z = (o) => {
            console.log(o.prize),
              3 == o.prize.prizeType &&
                e.index.navigateTo({ url: "/pagesA/member/memberListPoint" }),
              (2 != o.prize.prizeType && 6 != o.prize.prizeType) ||
                e.index.navigateTo({ url: "/pagesA/member/couponList" }),
              1 == o.prize.prizeType &&
                e.index.navigateTo({
                  url: `/pagesF/prize/receivePrize?uuid=${o.uuid}&code=${o.activityCode}&appid=${g.value}`,
                });
          };
        return (
          e.onMounted(() => {
            if (
              (e.index.getSystemInfo({
                success: (e) => {
                  (n.value = e.statusBarHeight || 0), (n.value = n.value + 64);
                },
                fail(e) {
                  console.log(e);
                },
              }),
              !r || !r.memberId)
            )
              return i.toLogin(), !1;
            console.log("=====================》appid+++++++++++++++++++++++2"),
              console.log(g.value),
              v();
          }),
          e.onReachBottom(() => {
            v();
          }),
          e.onLoad((e) => {
            console.log(e),
              console.log(e.appid),
              e.appid && ((g.value = e.appid), t.setStorage("appid", e.appid)),
              console.log(
                "=====================》appid+++++++++++++++++++++++1",
              ),
              console.log(g.value);
          }),
          (o, t) =>
            e.e(
              {
                a: e.p({ title: "我的奖品", bgColor: "#fff" }),
                b: e.unref(n) + "px",
                c: e.f(l.value, (o, t, i) =>
                  e.e(
                    {
                      a: o.prize.picUrl,
                      b: e.t(o.prize.name),
                      c: e.t(o.prize.subName),
                      d: e.t(o.zjTime),
                      e: e.o((e) => z(o), t),
                      f: 3 != o.prizeState && 1 == o.prize.prizeType,
                    },
                    3 != o.prizeState && 1 == o.prize.prizeType
                      ? {
                          g: e.t(
                            0 == o.prizeState
                              ? "去领取"
                              : 1 == o.prizeState
                                ? "待发货"
                                : "已过期",
                          ),
                          h: e.o(
                            (t) =>
                              ((o) => {
                                console.log(o.prize),
                                  e.index.navigateTo({
                                    url: `/pagesF/prize/receivePrize?uuid=${o.uuid}&code=${o.activityCode}`,
                                  });
                              })(o),
                            t,
                          ),
                        }
                      : {
                          i: e.t(1 == o.prize.prizeType ? "已领取" : "去查看"),
                          j: e.o((e) => z(o), t),
                          k: 1 == o.prize.prizeType ? 1 : "",
                        },
                    { l: t },
                  ),
                ),
                d: 0 == l.value.length && u.value,
              },
              0 == l.value.length && u.value
                ? { e: e.p({ tips: "暂无数据" }) }
                : {},
            )
        );
      },
    }),
    l = e._export_sfc(r, [["__scopeId", "data-v-336bdc45"]]);
  wx.createPage(l);
})();
