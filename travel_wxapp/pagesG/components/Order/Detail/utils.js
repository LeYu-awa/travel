!(function () {
  "use strict";
  (exports.getOrderDesc = (t) =>
    ["S", "R"].includes(t.status)
      ? { title: "待服务", desc: "我们已收到您的服务请求，请耐心等待。" }
      : "I" === t.status
        ? { title: "服务中", desc: "我们正在为您提供服务，请耐心等待。" }
        : "O" === t.status
          ? { title: "已完成", desc: "您的服务已完成，如有问题，请联系前台。" }
          : "P" === t.status && "P" === t.timeType
            ? {
                title: "已预约",
                desc: "我们已收到您的服务请求，将会在指定时间内提供服务。",
              }
            : {
                title: "已取消",
                desc: "您的服务取消，如仍有需要，请重新下单。",
              }),
    (exports.showOperation = (t) => ["R", "I"].includes(t.status));
})();
