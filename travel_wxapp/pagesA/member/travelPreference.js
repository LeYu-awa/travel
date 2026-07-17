!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../utils/api.js"),
    r = require("../../utils/wxuser.js"),
    o = require("../../base/jAlert/jAlert.js");
  Array || e.resolveComponent("FloatButtonKf")(), Math || (l + a)();
  const a = () => "../../components/bottomBtn.js",
    l = () => "../../components/coustomHead.js",
    s = e.defineComponent({
      __name: "travelPreference",
      setup(a) {
        let l = r.getStorage("config"),
          s = r.getStorage("user"),
          u = e.ref([]),
          n = e.ref(""),
          d = e.ref("member"),
          i = e.ref(!1),
          m = e.ref("edit"),
          f = e.ref(1),
          c = e.ref([]),
          h = e.ref(""),
          g = e.ref(""),
          p = e.ref(!1);
        e.watchEffect(() => {
          let e = !0;
          "edit" == m.value
            ? (e = !1)
            : u.value.forEach((t) => {
                t.tagList.length > 0 &&
                  t.tagList.forEach((t) => {
                    t.isChoose && (e = !1),
                      "T" == t.userDefined && t.userInput && (e = !1);
                  });
              }),
            (i.value = e);
        });
        const v = () => {
            e.index.navigateBack({ delta: f.value });
          },
          C = () => {
            if (i.value) return v(), !1;
            T();
          },
          T = () => {
            let r = [],
              a = [];
            u.value.forEach((t) => {
              t.tagList.length > 0 &&
                t.tagList.forEach((o) => {
                  (o.tagCode = o.code),
                    (o.tagName = o.name),
                    (o.tagSrc = "WECHAT"),
                    (o.flag = "OWN"),
                    o.isChoose && (r.push(o), a.push(e.toRaw(t))),
                    "T" == o.userDefined &&
                      o.userInput &&
                      ((o.tagName = o.userInput),
                      r.push(o),
                      a.push(e.toRaw(t)));
                });
            });
            let i = c.value.filter((e) => !r.some((t) => e.code === t.code)),
              m = r.filter((e) => !i.some((t) => e.code === t.code)),
              f = {
                hotelCode: l.hotelCode,
                hotelGroupCode: l.hotelGroupCode,
                delTagList: i,
                tagList: m,
                mode: 0,
                operatorName: `${s.name}(${s.mobile})`,
                operatorCode: s.memberId,
                flag: "OWN",
                channel: "WECHAT",
                tagSrc: "WECHAT",
                orderNo: h.value,
                orderType: g.value,
              };
            "member" !== d.value
              ? ((f.fromMemberId = s.memberId),
                (f.memberId = n.value),
                (f.isGuest = "T"))
              : (f.memberId = s.memberId);
            const C = [];
            for (let e = 0; e < a.length; e++) {
              const t = a[e].code;
              C.some((e) => e.code === t) || C.push(a[e]);
            }
            if (
              (console.log(C, 111111111111),
              C.map((e) => e.code).join(","),
              C.map((e) => e.name).join(","),
              p.value)
            )
              return !1;
            (p.value = !0),
              t.api
                .interfaceTransfer({
                  config: {
                    interfaceFrom: "member",
                    interfaceMethod: "/crm/v2/updateMemberAllTag",
                    hotelGroupCode: l.hotelGroupCode,
                    interfaceType: "POST",
                  },
                  query: f,
                })
                .then((e) => {
                  1 == e.result
                    ? 0 == e.retVal.result
                      ? (o.jAlert3("保存成功"),
                        setTimeout(() => {
                          (p.value = !1), v();
                        }, 1e3))
                      : (o.jAlert3(e.retVal.msg), (p.value = !1))
                    : (o.jAlert3(e.msg), (p.value = !1));
                });
          },
          b = () => {
            let e = [];
            u.value.forEach((t) => {
              t.tagList.forEach((t) => {
                (t.isChoose || t.userInput) && e.push(t);
              });
            }),
              (c.value = e);
          };
        return (
          e.onMounted(() => {
            ((e) => {
              let r = {
                hotelCode: l.hotelCode,
                hotelGroupCode: l.hotelGroupCode,
                firstResult: 0,
                pageSize: 100,
                channel: "WECHAT",
                tagSrc: "WECHAT",
              };
              "member" == d.value ? (r.isMember = "T") : (r.isGuest = "T"),
                t.api
                  .interfaceTransfer({
                    config: {
                      interfaceFrom: "member",
                      interfaceMethod: "crm/v2/querySystemTagConfig",
                      hotelGroupCode: l.hotelGroupCode,
                      interfaceType: "POST",
                    },
                    query: r,
                  })
                  .then((t) => {
                    if (1 == t.result)
                      if (0 == t.retVal.result) {
                        let r = t.retVal.retVal.datas;
                        r.forEach((e) => {
                          e.tagList.forEach((e) => {
                            (e.isChoose = !1),
                              (e.userInput = ""),
                              "T" !== e.userDefined &&
                                e.name.length > 7 &&
                                (e.name = e.name.substring(0, 7));
                          });
                        }),
                          (u.value = r),
                          e && e();
                      } else o.jAlert3(t.retVal.msg);
                    else o.jAlert3(t.msg);
                    console.log(t);
                  });
            })(() => {
              (() => {
                let e = {
                  hotelCode: l.hotelCode,
                  hotelGroupCode: l.hotelGroupCode,
                  firstResult: 0,
                  pageSize: 100,
                  channel: "WECHAT",
                  tagSrc: "WECHAT",
                };
                "member" !== d.value
                  ? ((e.memberId = n.value), (e.isGuest = "T"))
                  : (e.memberId = s.memberId),
                  t.api
                    .interfaceTransfer({
                      config: {
                        interfaceFrom: "member",
                        interfaceMethod: "/crm/v2/queryMemberTag",
                        hotelGroupCode: l.hotelGroupCode,
                        interfaceType: "POST",
                      },
                      query: e,
                    })
                    .then((e) => {
                      if (1 == e.result && 0 == e.retVal.result) {
                        let t = {},
                          r = [];
                        e.retVal.retVal &&
                          e.retVal.retVal.datas &&
                          e.retVal.retVal.datas.length > 0 &&
                          (r = e.retVal.retVal.datas),
                          r.forEach((e) => {
                            t[e.tagCode] = e;
                          }),
                          ((e) => {
                            u.value.forEach((t) => {
                              t.tagList.forEach((t) => {
                                if (e[t.code]) {
                                  let r = e[t.code];
                                  "T" !== r.userDefined
                                    ? (t.isChoose = !0)
                                    : (t.userInput = r.tagName);
                                }
                              });
                            }),
                              b();
                          })(t);
                      }
                    });
              })();
            });
          }),
          e.onLoad((e) => {
            e.type && (d.value = e.type),
              e.guestId && (n.value = e.guestId),
              e.mode && (m.value = e.mode),
              e.delta && (f.value = Number(e.delta)),
              e.orderNo && (h.value = e.orderNo),
              e.orderType && (g.value = e.orderType);
          }),
          (t, r) => ({
            a: e.p({ title: "旅行喜好", nativeMode: "true" }),
            b: e.f(e.unref(u), (t, r, o) => ({
              a: e.t(t.name),
              b: e.f(t.tagList, (r, o, a) =>
                e.e(
                  { a: "T" !== r.userDefined },
                  "T" !== r.userDefined
                    ? e.e(
                        { b: e.t(r.name), c: r.remark },
                        r.remark ? { d: e.t(r.remark) } : {},
                        {
                          e: 2 == t.tagList.length ? 1 : "",
                          f: r.isChoose ? 1 : "",
                          g: e.o((e) => {
                            var t;
                            (t = r).isChoose = !t.isChoose;
                          }, o),
                        },
                      )
                    : {},
                  { h: o },
                ),
              ),
              c: e.f(t.tagList, (r, o, a) =>
                e.e(
                  { a: "T" == r.userDefined },
                  "T" == r.userDefined
                    ? e.e(
                        { b: t.tagList.length > 1 },
                        t.tagList.length > 1 ? { c: e.t(r.name) } : {},
                        {
                          d: r.userInput,
                          e: e.o((e) => (r.userInput = e.detail.value), o),
                        },
                      )
                    : {},
                  { f: o },
                ),
              ),
              d: r,
            })),
            c: e.t(e.unref(i) ? "跳过" : "保存"),
            d: e.o(C),
          })
        );
      },
    }),
    u = e._export_sfc(s, [["__scopeId", "data-v-e20df15b"]]);
  wx.createPage(u);
})();
