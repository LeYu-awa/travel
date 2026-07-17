/**
 * 下载图片
 * @param {String} image 图片文件路径，可以是临时文件路径或永久文件路径 (本地路径) ，不支持网络路径
 */
export function dowmImage(image) {
    //图片保存到本地
    uni.saveImageToPhotosAlbum({
        filePath: image,
        success: function(data) {
            uni.hideLoading();
            uni.showToast({
                title: "保存成功",
                icon: "success",
                duration: 2000,
            });
        },
        fail: function(err) {
            if (
                err.errMsg === "saveImageToPhotosAlbum:fail auth deny" ||
                err.errMsg === "saveImageToPhotosAlbum:fail:auth denied"
            ) {
                uni.showModal({
                    title: "提示",
                    content: "需要您授权保存相册",
                    showCancel: false,
                    success: (modalSuccess) => {
                        uni.openSetting({
                            success(settingdata) {
                                if (
                                    settingdata.authSetting[
                                        "scope.writePhotosAlbum"
                                    ]
                                ) {
                                    uni.showModal({
                                        title: "提示",
                                        content:
                                            "获取权限成功,再次点击图片即可保存",
                                        showCancel: false,
                                    });
                                } else {
                                    uni.showModal({
                                        title: "提示",
                                        content:
                                            "获取权限失败，将无法保存到相册哦~",
                                        showCancel: false,
                                    });
                                }
                            },
                            fail(failData) {
                                // console.log("failData", failData);
                            },
                            complete(finishData) {
                                // console.log("finishData", finishData);
                            },
                        });
                    },
                });
            }
        },
    });
}

var index = 0;
function getNewFileId() {
    return Date.now() + String(index++);
}
/**
 * base64转临时路径
 * @param base64
 * @returns
 */
export function base64ToPath(base64) {
    return new Promise(function(resolve, reject) {
        if (typeof window === "object" && "document" in window) {
            base64 = base64.split(",");
            var type = base64[0].match(/:(.*?);/)[1];
            var str = atob(base64[1]);
            var n = str.length;
            var array = new Uint8Array(n);
            while (n--) {
                array[n] = str.charCodeAt(n);
            }
            return resolve(
                (window.URL || window.webkitURL).createObjectURL(
                    new Blob([array], { type: type })
                )
            );
        }
        var extName = base64.match(/data\:\S+\/(\S+);/);
        if (extName) {
            extName = extName[1];
        } else {
            reject(new Error("base64 error"));
        }
        var fileName = getNewFileId() + "." + extName;
        if (typeof plus === "object") {
            var basePath = "_doc";
            var dirPath = "uniapp_temp";
            var filePath = basePath + "/" + dirPath + "/" + fileName;
            if (
                !biggerThan(
                    plus.os.name === "Android" ? "1.9.9.80627" : "1.9.9.80472",
                    plus.runtime.innerVersion
                )
            ) {
                plus.io.resolveLocalFileSystemURL(
                    basePath,
                    function(entry) {
                        entry.getDirectory(
                            dirPath,
                            {
                                create: true,
                                exclusive: false,
                            },
                            function(entry) {
                                entry.getFile(
                                    fileName,
                                    {
                                        create: true,
                                        exclusive: false,
                                    },
                                    function(entry) {
                                        entry.createWriter(function(writer) {
                                            writer.onwrite = function() {
                                                resolve(filePath);
                                            };
                                            writer.onerror = reject;
                                            writer.seek(0);
                                            writer.writeAsBinary(
                                                base64.replace(
                                                    /^data:\S+\/\S+;base64,/,
                                                    ""
                                                )
                                            );
                                        }, reject);
                                    },
                                    reject
                                );
                            },
                            reject
                        );
                    },
                    reject
                );
                return;
            }
            var bitmap = new plus.nativeObj.Bitmap(fileName);
            bitmap.loadBase64Data(
                base64,
                function() {
                    bitmap.save(
                        filePath,
                        {},
                        function() {
                            bitmap.clear();
                            resolve(filePath);
                        },
                        function(error) {
                            bitmap.clear();
                            reject(error);
                        }
                    );
                },
                function(error) {
                    bitmap.clear();
                    reject(error);
                }
            );
            return;
        }
        if (typeof wx === "object" && wx.canIUse("getFileSystemManager")) {
            var filePath = wx.env.USER_DATA_PATH + "/" + fileName;
            wx.getFileSystemManager().writeFile({
                filePath: filePath,
                data: base64.replace(/^data:\S+\/\S+;base64,/, ""),
                encoding: "base64",
                success: function() {
                    resolve(filePath);
                },
                fail: function(error) {
                    reject(error);
                },
            });
            return;
        }
        reject(new Error("not support"));
    });
}

/**
 * 临时图片路径转base64
 * @param {Object} param 传一个对象，对象里包括
 * url: 临时图片存放路径，选择图片返回的相对路径
 * type: 图片类型，如：png
 */
export function base64(url, type) {
    return new Promise((resolve, reject) => {
        if (!!uni.getFileSystemManager()) {
            uni.getFileSystemManager().readFile({
                filePath: url, //选择图片返回的相对路径
                encoding: "base64", //编码格式
                success: (res) => {
                    resolve(
                        "data:image/" +
                            type.toLocaleLowerCase() +
                            ";base64," +
                            res.data
                    );
                },
                fail: (res) => reject(res.errMsg),
            });
        } else {
            uni.request({
                url: url,
                method: "GET",
                responseType: "arraybuffer",
                success: (ress) => {
                    let base64 = wx.arrayBufferToBase64(ress.data); //把arraybuffer转成base64
                    base64 = "data:image/jpeg;base64," + base64; //不加上这串字符，在页面无法显示的哦
                    resolve(base64);
                },
                fail: (res) => reject(res.errMsg),
            });
        }
    });
}
