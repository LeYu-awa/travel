!(function () {
  "use strict";
  const e = require("../../../common/vendor.js"),
    o = require("../../../common/assets.js"),
    t = require("../../../base/jAlert/jAlert.js"),
    l = require("../../../utils/config.js"),
    s = require("../../../utils/platform.js");
  Math || a();
  const a = () => "../base/PickTrigger/index.js",
    r = e.defineComponent({
      __name: "ImagePicker",
      props: { modelValue: null },
      emits: ["update:modelValue"],
      setup(a, { emit: r }) {
        const i = a,
          n = r,
          u = () => {
            5 !== i.modelValue.length
              ? e.index.chooseImage({
                  count: 1,
                  sizeType: ["compressed"],
                  sourceType: ["album", "camera"],
                  success: (o) => {
                    e.index.showLoading({ title: "上传中" });
                    const s = o.tempFilePaths[0];
                    let a;
                    a = ["test", "pre"].includes(l.config.env)
                      ? "https://test.ihotel.cn"
                      : "https://miroom.ihotel.cn";
                    const r = a + "/rsapi/file/uploadImg";
                    e.index.uploadFile({
                      url: r,
                      filePath: s,
                      fileType: "image",
                      name: "file",
                      header: {
                        channel: "mini_app",
                        userCode: "nodata",
                        hotelGroupCode: l.config.hotelGroupCode,
                        hotelCode: e.index.getStorageSync("hotelCode"),
                      },
                      success: (o) => {
                        const l = JSON.parse(o.data);
                        if (l && 0 == l.code) {
                          const o = { url: l.data };
                          n("update:modelValue", e.append(o, i.modelValue));
                        } else t.jAlert3(l.message);
                      },
                      complete: () => {
                        e.index.hideLoading();
                      },
                    });
                  },
                })
              : t.jAlert3("最多只能上传5张图片");
          };
        return (t, l) => ({
          a: e.f(i.modelValue, (o, t, l) => ({
            a: e.o(
              (t) => e.unref(s.previewImage)({ current: o.url, urls: [o.url] }),
              o.url,
            ),
            b: o.url,
            c: e.o(
              (o) =>
                ((o) => {
                  n("update:modelValue", e.remove(o, 1, i.modelValue));
                })(t),
              o.url,
            ),
            d: o.url,
          })),
          b: o._imports_0$3,
          c: e.p({ title: "上传图片", display: i.modelValue.length > 0 }),
          d: e.o(u),
        });
      },
    }),
    i = e._export_sfc(r, [["__scopeId", "data-v-e0497351"]]);
  wx.createComponent(i);
})();
