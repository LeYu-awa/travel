<template>
    <div>
        <div @click="getCanvas()">
            <slot></slot>
        </div>
        <canvas :style="{ width: (model.width || 100) + 'rpx', height: (model.height || 100) + 'rpx' }"
            class="canvas-style" canvas-id="myCanvas"></canvas>
    </div>
</template>
<script>
import { base64ToPath } from "./canvas-vue2.js";
const windowWidth = uni.getSystemInfoSync().windowWidth; // 可使用窗口宽度，单位px
const unit = windowWidth / 750;
export default {
    props: {
        model: {
            type: Object,
            default: {},
        },
    },
    watch: {
        model: {
            handler(value) {
                if (value) {
					console.log(value)
                    this.modelValue = value
                }

            },
            deep: true,
			immediate: true
        }
    },
    data() {
        return {
            modelValue: {}
        }
    },
    methods: {
        // 绘制canvas
        async getCanvas() {
            let flag = true;
            uni.showLoading({
                title: "加载中，请稍后",
                mask: true,
                success: () => {
                    setTimeout(() => {
                        // 15秒后还没加载完，就给出提示
                        if (flag) {
                            uni.showToast({
                                title: "加载有误，请重新加载",
                                icon: "none",
                            });
                        }
                    }, 15000);
                },
            });
            let that = this;
            var ctx = uni.createCanvasContext("myCanvas", this);
            // 循环展示内容
            if (this.modelValue && this.modelValue.data && this.modelValue.data.length) {
                for (let i = 0; i < this.modelValue.data.length; i++) {
                    if (this.modelValue.data[i].type == "image") {
                        await this.canvasImg(this.modelValue.data[i], ctx);
                    } else if (this.modelValue.data[i].type == "fillRect") {
                        await this.canvasFillRect(this.modelValue.data[i], ctx);
                    } else {
                        await this.canvasText(this.modelValue.data[i], ctx);
                    }
                }
            }
            ctx.draw(true, (() => {
                let a = setTimeout(() => {
                    uni.canvasToTempFilePath({
                        canvasId: "myCanvas",
                        quality: 0.8,
                        complete(result) {
                            that.$emit("changeImage", result.tempFilePath);
                            flag = false;
                            ctx.clearRect(0, 0, ctx.width, ctx.height);
                            uni.hideLoading();
                        },
                    });
                    clearTimeout(a);
                }, 250);
            })());
        },
        // 绘制矩形
        canvasFillRect(e, ctx) {
            ctx.fillStyle = e.background;
            ctx.fillRect(
                unit * e.x,
                unit * e.y,
                unit * e.width,
                unit * e.height
            );
        },
        // 绘制文本
        canvasText(e, ctx) {
            return new Promise((resolve, err) => {
                // ctx.font = "normal " + e.fontWeight + " sans-serif";
                ctx.setFillStyle(e.color);
                ctx.textAlign = e.textAlign;
                // setFontSize设置是防止ios字体无效
                ctx.setFontSize(unit * e.fontsize);
                let w = unit * Number(e.width || this.modelValue.width); // 文本限制宽度
                let y = unit * e.y + unit * e.fontsize * 1.4; // y的位置，从顶部开始计算
                let text = "";
                let line = 0;
                if (e.text) {
                    for (let i = 0; i < e.text.length; i++) {
                        text += e.text[i];
                        if (e.line - 1 === line) {
                            // 限制了行数
                            if (ctx.measureText(text + "...").width >= w) {
                                ctx.fillText(
                                    text.substring(0, text.length - 1) + "...",
                                    unit * e.x,
                                    y
                                ); //文字内容、x坐标，y坐标
                                break;
                            }
                        }
                        if (ctx.measureText(text).width >= w) {
                            // 超出限制的宽度，就切割
                            ctx.fillText(
                                text.substring(0, text.length - 1),
                                unit * e.x,
                                y
                            ); //文字内容、x坐标，y坐标
                            y += unit * e.fontsize * 1.4;
                            text = e.text[i];
                            line++;
                        } else if (i + 1 == e.text.length) {
                            line++;
                            // 最后一排
                            ctx.fillText(text, unit * e.x, y); //文字内容、x坐标，y坐标
                        }
                    }
                }

                resolve("text");
            });
        },
        // 绘制图片
        canvasImg(e, ctx) {
            return new Promise((resolve, err) => {
                // 网络图片需要使用getImageInfo
                if (e.url.indexOf("http") > -1) {
                    uni.getImageInfo({
                        src: e.url,
                        success: (res) => {
                            ctx.drawImage(
                                res.path,
                                unit * e.x,
                                unit * e.y,
                                unit * e.width,
                                unit * e.height
                            );
                            resolve("img");
                        },
                    });
                } else if (this.isBase64(e.url)) {
                    // base64转临时图片路径
                    base64ToPath(e.url).then((res) => {
                        e.url = res;
                        this.canvasImg(e, ctx).then((res) => {
                            resolve("img");
                        });
                    });
                } else {
                    ctx.drawImage(
                        e.url,
                        unit * e.x,
                        unit * e.y,
                        unit * e.width,
                        unit * e.height
                    );
                    resolve("img");
                }
            });
        },
        // 判断是否是base64
        isBase64(str) {
            if (str.indexOf("data:") != -1 && str.indexOf("base64") != -1) {
                return true;
            } else {
                return false;
            }
        },
    },
};
</script>
<style lang="scss" scoped>
.canvas-style {
    position: fixed;
    top: -6666666rpx;
    // bottom: 100px;
    opacity: 0;
    z-index: -1;
}
</style>
