!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    o = require("../../utils/api.js"),
    t = require("../../utils/wxuser.js"),
    r = require("../../store/index.js");
  Array || e.resolveComponent("FloatButtonKf")(), Math || (s + d)();
  const s = () => "../../components/coustomHead.js",
    d = () => "../../components/empty.js",
    l = e.defineComponent({
      __name: "addressList",
      setup(s) {
        let d = t.getStorage("config"),
          l = t.getStorage("user"),
          n = t.getStorage("wxuser"),
          a = e.ref(),
          u = e.ref(64);
        const i = r.mainStore(),
          c = e.ref(!1),
          g = e.ref([]),
          m = (o) => {
            let t = { id: "" };
            o.id && (t.id = o.id),
              i.getEditAddress(o),
              e.index.navigateTo({
                url: "/pagesF/address/addAddress?id=" + t.id,
              });
          };
        return (
          e.onMounted(() => {
            e.index.getSystemInfo({
              success: (e) => {
                (u.value = e.statusBarHeight || 0), (u.value = u.value + 64);
              },
              fail(e) {
                console.log(e);
              },
            });
          }),
          e.onLoad((e) => {
            e.redirect_url && (a.value = e.redirect_url),
              (d = t.getStorage("config"));
          }),
          e.onShow(() => {
            (() => {
              let e = {
                hotelGroupId: d.hotelGroupId,
                openid: n.openid,
                hotelGroupCode: d.hotelGroupCode,
                hotelCode: d.hotelCode,
                memberId: "",
              };
              l && l.memberId && (e.memberId = l.memberId),
                o.api.getMemberAddress(e).then((e) => {
                  console.log(e),
                    1 == e.result && ((g.value = e.retVal), (c.value = !0));
                });
            })();
          }),
          (o, t) =>
            e.e(
              {
                a: e.p({ title: "地址列表", bgColor: "#fff" }),
                b: e.unref(u) + "px",
                c: e.f(g.value, (o, t, r) =>
                  e.e(
                    {
                      a: e.t(o.receiver),
                      b: e.t(o.mobile.substring(0, 3)),
                      c: e.t(o.mobile.substring(7, 11)),
                      d: "T" == o.isDefault,
                    },
                    (o.isDefault, {}),
                    {
                      e: e.t(o.address),
                      f: e.o(
                        (t) =>
                          ((o) => {
                            if ((console.log(o), a.value)) {
                              console.log(decodeURIComponent(a.value));
                              let t =
                                decodeURIComponent(a.value) +
                                "&addressId=" +
                                o.id;
                              e.index.redirectTo({ url: t });
                            }
                          })(o),
                        t,
                      ),
                      g: e.o((e) => m(o), t),
                      h: t,
                    },
                  ),
                ),
                d: 0 == g.value.length && c.value,
              },
              0 == g.value.length && c.value
                ? { e: e.p({ tips: "暂无收货地址" }) }
                : {},
              { f: e.o(m) },
            )
        );
      },
    }),
    n = e._export_sfc(l, [["__scopeId", "data-v-31f2ce82"]]);
  wx.createPage(n);
})();
