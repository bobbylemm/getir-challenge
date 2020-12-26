const { Router } = require("express");
const { filterPayload } = require("../controllers");
const { routeValidator } = require("../validators");

const router = Router();

router.post("/", routeValidator, filterPayload);

module.exports = router;
