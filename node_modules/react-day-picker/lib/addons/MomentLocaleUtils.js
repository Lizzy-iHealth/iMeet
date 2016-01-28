"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

exports["default"] = {

  formatMonthTitle: function formatMonthTitle(date) {
    var locale = arguments.length <= 1 || arguments[1] === undefined ? "en" : arguments[1];

    return (0, _moment2["default"])(date).locale(locale).format("MMMM YYYY");
  },

  formatWeekdayShort: function formatWeekdayShort(day) {
    var locale = arguments.length <= 1 || arguments[1] === undefined ? "en" : arguments[1];

    return (0, _moment2["default"])().locale(locale).weekday(day).format("dd");
  },

  formatWeekdayLong: function formatWeekdayLong(day) {
    var locale = arguments.length <= 1 || arguments[1] === undefined ? "en" : arguments[1];

    return (0, _moment2["default"])().locale(locale).weekday(day).format("dddd");
  },

  getFirstDayOfWeek: function getFirstDayOfWeek() {
    var locale = arguments.length <= 0 || arguments[0] === undefined ? "en" : arguments[0];

    var localeData = _moment2["default"].localeData(locale);
    return localeData.firstDayOfWeek();
  },

  getMonths: function getMonths() {
    var locale = arguments.length <= 0 || arguments[0] === undefined ? "en" : arguments[0];

    var months = [];
    var i = 0;
    while (i < 12) {
      months.push((0, _moment2["default"])().locale(locale).month(i++).format("MMMM"));
    }
    return months;
  }

};
module.exports = exports["default"];
//# sourceMappingURL=MomentLocaleUtils.js.map