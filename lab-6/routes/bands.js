let express = require('express');
let router = express.Router();
let data = require("../data");
let bands = data.bands;

router.get("/", bands.GetAllBands);

router.post("/", bands.CreateBands);

router.get("/:id", bands.GetBandByID);

router.put("/:id", bands.Updateband);

router.delete("/:id", bands.deleteBand);

module.exports = router