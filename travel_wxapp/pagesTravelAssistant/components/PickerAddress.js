!(function () {
  "use strict";
  const e = require("../../base/cityData/data.js");
  require("../../utils/request.js");
  const t = require("../../common/vendor.js"),
    a = require("../../utils/wxuser.js");
  require("../../utils/config.js"),
    require("../../utils/log.js"),
    require("../../utils/qdTracker.js"),
    require("../../utils/umengAdaptor.js");
  const r = {
      data: () => ({ value: [0, 0], array: [], index: 0, selectVal: ["", ""] }),
      created() {
        a.getStorage("config"), this.initSelect();
      },
      methods: {
        initSelect() {
          this.updateSourceDate(), this.updateAddressDate();
        },
        columnchange(e) {
          this.updateSelectIndex(e.detail.column, e.detail.value),
            this.updateSourceDate(),
            this.updateAddressDate();
        },
        updateSourceDate() {
          return (
            (this.array = []),
            (this.array[0] = e.AllAddress.map((e) => ({ name: e.name }))),
            (this.array[1] = e.AllAddress[this.value[0]].city.map((e) => ({
              name: e.name,
            }))),
            this
          );
        },
        updateSelectIndex(e, t) {
          let a = JSON.parse(JSON.stringify(this.value));
          return (
            (a[e] = t),
            0 === e && ((a[1] = 0), (a[2] = 0)),
            1 === e && (a[2] = 0),
            (this.value = a),
            this
          );
        },
        updateAddressDate() {
          return (
            (this.selectVal[0] = this.array[0][this.value[0]].name),
            (this.selectVal[1] = this.array[1][this.value[1]].name),
            this
          );
        },
        bindPickerChange() {
          return (
            this.$emit("changeCity", {
              data: this.selectVal,
              index: this.value,
            }),
            this
          );
        },
      },
    },
    s = t._export_sfc(r, [
      [
        "render",
        function (e, a, r, s, i, u) {
          return {
            a: t.o((...e) => u.bindPickerChange && u.bindPickerChange(...e)),
            b: t.o((...e) => u.columnchange && u.columnchange(...e)),
            c: i.array,
            d: i.value,
          };
        },
      ],
    ]);
  wx.createComponent(s);
})();
