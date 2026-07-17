!(function () {
  "use strict";
  const e = require("../../../common/vendor.js");
  exports.useDatePicker = () => {
    const t = e.ref(
      (() => {
        const t = e.dayjs();
        return t
          .set("minute", 10 * Math.floor(t.get("minutes") / 10))
          .add(10, "minutes")
          .toDate();
      })(),
    );
    return {
      date: t,
      onConfirm: (n) => {
        n.getTime() < new Date().getTime()
          ? e.index.showToast({
              title: "所选时间不能早于当前时间",
              icon: "none",
            })
          : (t.value = n);
      },
    };
  };
})();
