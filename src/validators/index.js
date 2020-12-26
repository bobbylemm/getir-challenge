const { check } = require("express-validator");

exports.routeValidator = [
  check("startDate", "Please include a start date").isISO8601(),
  check("endDate", "Please include a start date").isISO8601(),
  check("minCount", "Please include a minCount").not().isEmpty().isInt(),
  check("maxCount", "Please include a maxCount").not().isEmpty().isInt(),
];
