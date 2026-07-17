!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../utils/api.js"),
    r = require("../../utils/wxuser.js"),
    o = require("../../base/common.js"),
    a = require("../../utils/utils.js");
  Array || e.resolveComponent("FloatButtonKf")(), Math || (s + n)();
  const n = () => "../../components/empty.js",
    s = () => "../../components/coustomHead.js",
    u = e.defineComponent({
      __name: "travelersList",
      setup(n) {
        let s = r.getStorage("config"),
          u = r.getStorage("user"),
          l = e.ref([]),
          i = e.ref(!0);
        const d = (e) => {
            e && e.guestId
              ? a.goPage(
                  "/pagesB/travel/travelersInfo?delta=2&type=edit&id=" +
                    e.guestId,
                )
              : a.goPage("/pagesB/travel/travelersInfo?delta=2");
          },
          p = (e, t, r) => {
            var o = e.length;
            if (o < t || o < r) return e;
            var a = e.substring(0, t),
              n = e.substring(r, o),
              s = ((e = ""), 0);
            try {
              for (s = 0; s < r - t; s++) e += "*";
            } catch (e) {}
            return a + e + n;
          };
        return (
          e.onShow(() => {
            t.api
              .listGuestLinkExtraInfoWithMemberIdOrOpenId({
                channel: "WECHAT",
                hotelGroupCode: s.hotelGroupCode,
                hotelCode: s.hotelCode,
                memberId: u.memberId,
                openIdType: "WECHAT",
              })
              .then((e) => {
                if (
                  ((i.value = !1),
                  1 == e.result &&
                    0 == e.retVal.result &&
                    e.retVal.retVal.length)
                ) {
                  let t = [];
                  e.retVal.retVal.forEach((e) => {
                    e.guestId &&
                      (e.guestLinkRelationExtraSimpleDtoList.forEach((t) => {
                        "EXTRA_IDCODE" == t.type && (e.idCode = t.value),
                          "EXTRA_IDNO" == t.type && (e.idNo = t.value),
                          "CAMP_SEX" == t.type && (e.sex = t.value),
                          "EXTRA_EMAIL" == t.type && (e.email = t.value),
                          "EXTRA_MOBILE" == t.type && (e.mobile = t.value),
                          "EXTRA_NAME" == t.type && (e.name = t.value),
                          "EXTRA_BIRTH" == t.type && (e.birth = t.value);
                      }),
                      l.value.forEach((t) => {
                        e.guestId == t.guestId &&
                          ((e.active = t.active),
                          (e.activeNotCan = t.activeNotCan));
                      }),
                      t.push(e));
                  }),
                    (l.value = t);
                }
              });
          }),
          e.onMounted(() => {}),
          (t, r) =>
            e.e(
              {
                a: e.p({ title: "常用出行人", nativeMode: "true" }),
                b: e.f(e.unref(l), (t, r, a) => ({
                  a: e.t(t.name),
                  b: e.t(e.unref(o.IdTypeMeta)[t.idCode]),
                  c: e.t(t.idNo),
                  d: e.t(p(t.mobile, 3, 7)),
                  e: r,
                  f: e.o((e) => d(t), r),
                })),
                c: 0 == e.unref(l).length && !e.unref(i),
              },
              0 != e.unref(l).length || e.unref(i)
                ? {}
                : {
                    d: e.p({
                      tips: "暂无出行人",
                      subTips: "松赞，期待与您相遇。",
                    }),
                  },
              { e: e.o((e) => d("")) },
            )
        );
      },
    }),
    l = e._export_sfc(u, [["__scopeId", "data-v-5643c46e"]]);
  wx.createPage(l);
})();
