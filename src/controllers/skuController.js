const skuModel = require('../models/skuModel')
const { uploadFile } = require('../controllers/awsController')

module.exports = {
    addSKU: async (req, res) => {
        try {
            const { sku } = req.body
            const file = req.files
            if (!file[0]) {
                return res.status(400).send({ status: false, message: 'Upload image' })
            }
            await uploadFile(file[0]).then(async (generateImageLink) => {
                const findUniqueSku = await skuModel.findOne({ sku })
                if (findUniqueSku) {
                    return res.status(409).send({ status: false, message: 'Please try different SKU' })
                }
                req.body.imageLink = generateImageLink;
                let saveData = await skuModel.create(req.body)
                console.log(saveData)
                return res.status(201).send({ status: true, msg: "SKU created successfully", [`SKU DATA`]: saveData })
            }).catch((err) => {
                res.send(err)
            })
        } catch (error) {
            return res.status(500).send({ status: false, msg: error.message })
        }
    },

    updateSKU: async (req, res) => {
        try {
            if (Object.keys(req.body).length < 1) {
                return res.status(400).send({ status: false, message: "Please enter the SKU data whatever you want to update" })
            }

            req.body.updatedAt = new Date().toLocaleString()
            let updateData = await skuModel.findByIdAndUpdate(req.param.skuId, req.body, { new: true })
            if (!updateData) {
                return res.status(404).send({ status: false, msg: "SKU not found" })
            }
            return res.status(200).send({ status: true, SKUData: updateData })
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
        }
    },

    fetchSKUSBySearch: async (req, res) => {
        try {
            const { search, page } = req.query
            const criteria = {
                $or: [
                    { productName: { $regex: '.*' + search + '.*', $options: 'i' } },
                    { sku: { $regex: '.*' + search + '.*', $options: 'i' } },
                    { attribute1: { $regex: '.*' + search + '.*', $options: 'i' } },
                    { attribute2: { $regex: '.*' + search + '.*', $options: 'i' } },
                    { attribute3: { $regex: '.*' + search + '.*', $options: 'i' } },
                    { brandName: { $regex: '.*' + search + '.*', $options: 'i' } },
                ]
            };
            const findProducts = await skuModel.find(criteria).skip(2 * (page - 1) || 1).limit(2)
            return res.status(200).send({ status: true, [`SKU DATA`]: findProducts })
        } catch (error) {
            return res.status(500).send({ status: false, msg: error.message })
        }
    },

    searchSKUSByFilter: async (req, res) => {
        try {
            const { search } = req.param
            const { listPrice, minStockLevel, gst, page } = req.query
            const criteria = {
                $or: [
                    { productName: { $regex: '.*' + search + '.*', $options: 'i' } },
                    { sku: { $regex: '.*' + search + '.*', $options: 'i' } }
                ],
                listPrice: { $gte: parseFloat(listPrice || 0) },
                minStockLevel: { $gte: parseInt(minStockLevel || 0) },
                gst: { $gte: parseFloat(gst || 0) },
            };
            const findProducts = await skuModel.find(criteria).skip(2 * (page - 1) || 1).limit(2)
            return res.status(200).send({ status: true, [`SKU DATA`]: findProducts })
        } catch (error) {
            return res.status(500).send({ status: false, msg: error.message })
        }
    },

    orderSKU: async (req, res) => {
        try {
            const { quantity } = req.body
            const product = await skuModel.findById(req.params.skuId);
            const totalOrderAmount = (product.listPrice * quantity - (product.listPrice * quantity * (product.discount / 100))) * (1 + product.gst / 100);
            return res.status(200).send({ status: true, msg: "SKU created successfully", totalAmount: totalOrderAmount })
        } catch (error) {
            return res.status(500).send({ status: false, msg: error.message })
        }
    }
}


