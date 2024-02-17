const express = require("express")
const router = express.Router()

const {addSKU, updateSKU, fetchSKUSBySearch, searchSKUSByFilter, orderSKU} = require('../controllers/skuController')
const { skuValidation, skuUpdateValidation } = require("../middlewares/validationMware")

router.post('/addSKU', skuValidation, addSKU)
router.put('/updateSKU/:skuId', skuUpdateValidation, updateSKU)
router.get('/fetchSKUSBySearch', fetchSKUSBySearch)
router.get('/searchSKUSByFilter/:search', searchSKUSByFilter)
router.post('/orderSKU/:skuId', orderSKU)

router.all("/*", function (req, res) { 
    return res.status(400).send({ status: false, message: "invalid http request" });
});

module.exports = router