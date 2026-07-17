!(function () {
  "use strict";
  var e = ((e) => (
      (e.PLAN_DETAIL = "planDetail"), (e.TRAVEL_DETAIL = "travelDetail"), e
    ))(e || {}),
    T = ((e) => (
      (e[(e.DESTINATION = 0)] = "DESTINATION"),
      (e[(e.HOTEL = 1)] = "HOTEL"),
      (e[(e.ACTIVITY = 2)] = "ACTIVITY"),
      e
    ))(T || {}),
    D = ((e) => ((e.ADD = "add"), (e.EDIT = "edit"), e))(D || {}),
    p = ((e) => ((e.SCF = "SCF"), (e.DCF = "DCF"), e))(p || {}),
    s = ((e) => ((e.SCF_DESC = "双床房"), (e.DCF_DESC = "大床房"), e))(s || {});
  (exports.AddOneDayDialogTypeType = D),
    (exports.DetailType = T),
    (exports.JourneyEditFromType = e),
    (exports.RoomTypesClassDescType = s),
    (exports.RoomTypesClassType = p);
})();
