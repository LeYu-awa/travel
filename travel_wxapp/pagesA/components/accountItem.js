!(function () {
  "use strict";
  const e = require("../../common/vendor.js"),
    t = require("../../utils/filter.js"),
    o = e.defineComponent({
      props: { item: { type: Object, default: {} } },
      name: "accountItem",
      emits: ["chooseItem"],
      setup: (e, { emit: o }) => ({
        chooseItem: (e) => {
          o("chooseItem", e);
        },
        valFormat: t.valFormat,
      }),
    }),
    i = e._export_sfc(o, [
      [
        "render",
        function (t, o, i, m, r, s) {
          return e.e(
            { a: t.item.logo },
            t.item.logo ? { b: t.item.logo } : {},
            { c: t.item.isHistory },
            (t.item.isHistory, {}),
            { d: e.t(t.item.title), e: "T" == t.item.isForever },
            "T" == t.item.isForever ? {} : { f: e.t(t.item.validTime) },
            {
              g: e.t(t.valFormat(t.item.price)),
              h: e.o((e) => t.chooseItem(t.item)),
              i: t.item.isHistory ? 1 : "",
            },
          );
        },
      ],
      ["__scopeId", "data-v-f125c8af"],
    ]);
  wx.createComponent(i);
})();
