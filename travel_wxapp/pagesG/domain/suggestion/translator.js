!(function () {
  "use strict";
  exports.SuggestionDetailDto2SuggestionDetail = (t) => ({
    status: t.replyStatus,
    bizType: t.bizType,
    content: t.decodedContent,
    imgList: t.pictures.length > 0 ? t.pictures.split(",") : [],
    createTime: t.createDatetime,
    roomNo: t.rmno,
  });
})();
