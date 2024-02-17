const { skuModel, skuUpdate } = require('../utilities/validator')

module.exports = {
    skuValidation: (req, res, next) => {
        const { error } = skuModel.validate(req.body)
        if (error) {
            return res.status(400).send({ status: false, message: error.message })
        } else next()
    },
    skuUpdateValidation: (req, res, next) => {
        const { error } = skuUpdate.validate(req.body)
        if (error) {
            return res.status(400).send({ status: false, message: error.message })
        } else next()
    },
}