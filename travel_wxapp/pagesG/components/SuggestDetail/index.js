!(function () {
  "use strict";
  const e = require("../../../common/vendor.js"),
    t = require("../../../hooks/useLayoutStart.js"),
    u = require("../../../hooks/useRequest.js"),
    s = require("../../../utils/api.js"),
    a = require("../../../utils/utils.js"),
    o = require("../../domain/suggestion/translator.js"),
    n = require("../../domain/suggestion/model.js"),
    r = require("../../domain/suggestion/pure.js"),
    i = require("../../../base/jAlert/jAlert.js"),
    l = require("./useHotelDetail.js");
  Math || (d + g + c + m + p)();
  const d = () => "../../../components/coustomHead.js",
    c = () => "../Order/Detail/components/Card.js",
    g = () => "../Order/Detail/components/KeyValue.js",
    m = () => "../base/GhostButton/index.js",
    p = () => "../base/SafeBottom/index.js",
    v = e.defineComponent({
      __name: "index",
      setup(d) {
        const { layoutStart: c } = t.useLayoutStart(),
          { data: g, run: m } = u.useRequest(
            (e) => s.api.getComplaintAndAdvice({ id: e }),
            { manual: !0 },
          ),
          { run: p, hotelDetail: v } = l.useHotelDetail();
        e.onMounted(() => {
          const t = a.getQuery().id || "",
            u = a.getQuery().hotelCode || "";
          u && e.index.setStorageSync("hotelCode", u), m(t), p(u);
        });
        const j = () => {
            const t = v.value.phone;
            t
              ? e.index.makePhoneCall({ phoneNumber: t })
              : i.jAlert3("联系方式未配置");
          },
          f = e.computed(() => o.SuggestionDetailDto2SuggestionDetail(g.value));
        return (t, u) =>
          e.e(
            { a: e.unref(g) },
            e.unref(g)
              ? e.e(
                  {
                    b: e.p({ title: "意见反馈详情", color: "#fff" }),
                    c: e.t(e.unref(n.SuggestionStatus)[f.value.status].title),
                    d: e.t(e.unref(n.SuggestionStatus)[f.value.status].desc),
                    e: e.unref(c),
                    f: e.p({
                      label: "意见类型",
                      value: e.unref(r.getBizDesc)(f.value),
                    }),
                    g: e.p({ label: "详细说明", value: f.value.content }),
                    h: f.value.imgList.length > 0,
                  },
                  f.value.imgList.length > 0
                    ? {
                        i: e.f(f.value.imgList, (t, u, s) => ({
                          a: t,
                          b: t,
                          c: e.o(() => {
                            return (
                              (t = u),
                              (s = f.value.imgList),
                              void e.index.previewImage({ current: t, urls: s })
                            );
                            var t, s;
                          }, t),
                        })),
                      }
                    : {},
                  {
                    j: e.p({ title: "服务项目" }),
                    k: e.p({
                      label: "创建时间",
                      value: f.value.createTime,
                      separate: !0,
                    }),
                    l: e.p({
                      label: "房间号",
                      value: f.value.roomNo,
                      separate: !0,
                    }),
                    m: e.p({ title: "服务单信息" }),
                    n: e.o(j),
                  },
                )
              : {},
          );
      },
    }),
    j = e._export_sfc(v, [["__scopeId", "data-v-c8be1778"]]);
  wx.createComponent(j);
})();
