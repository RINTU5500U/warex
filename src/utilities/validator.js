const joi = require('joi')
// joi.objectId = require('joi-objectid')(joi)

const errors = (check) => {
    let messages = { "string.base": `${check} should be a type of 'String'.`, "string.empty": `${check} cannot be an empty field.`, "any.required": `${check} is a required field.` }
    return messages
}

//"^[0-9]{5}(?:-[0-9]{4})?$"
// valid ISBN => 978-1-56619-909-4 , 1257561035 , 1248752418865
// ISBN => /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/

module.exports = {
    //SCHEMA VALIDATION FOR SKUMODEL
    skuModel: joi.object({
        productName: joi.string().trim().required().messages(errors("product name")),
        brandName: joi.string().trim().required().messages(errors("brand name")),
        categoryName: joi.string().trim().required().messages(errors("category name")),
        discount: joi.number().messages({ 'number.base': `discount should be a number.` }).required(),
        imageLink: joi.string().trim().regex(/^https:\/\/s3\.[a-z0-9-]+\.amazonaws\.com\/[a-zA-Z0-9-]+\/.+\.(jpg|jpeg|png|gif|bmp)$/).messages({ 'string.pattern.base': `image link is not valid.` }).messages(errors("Image link")),
        attribute1: joi.string().trim().required().messages(errors("attribute1")),
        attribute2: joi.string().trim().required().messages(errors("attribute2")),
        attribute3: joi.string().trim().required().messages(errors("attribute3")),
        units: joi.string().trim().regex(/^(Pcs|Pkt|Pouch)$/i).messages({ 'string.pattern.base': `units should be either Pcs or Pkt or Pouch.` }).required().messages(errors("units")),
        gst: joi.number().messages({ 'number.base': `GST should be a number.` }).required(),
        sku: joi.string().trim().regex(/^[A-Za-z0-9-]+$/i).messages({ 'string.pattern.base': `sku is not valiad.` }).required().messages(errors("sku")),
        hsn: joi.string().trim().regex(/^\d{4}$/).messages({ 'string.pattern.base': `hsn should be a 4 digit number.` }).required().messages(errors("hsn")),
        upc: joi.string().trim().regex(/^\d{12}$/).messages({ 'string.pattern.base': `upc is not valid.` }).required().messages(errors("upc")),
        listPrice: joi.number().messages({ 'number.base': `listprice should be a number` }).required(),
        minStockLevel: joi.number().messages({ 'number.base': `minimum stock level should be a number` }).required()
    }),

    skuUpdate: joi.object({
        productName: joi.string().trim().messages(errors("product name")),
        brandName: joi.string().trim().messages(errors("brand name")),
        categoryName: joi.string().trim().messages(errors("category name")),
        discount: joi.number().messages({ 'number.base': `discount should be a number.` }),
        imageLink: joi.string().trim().regex(/^https:\/\/s3\.[a-z0-9-]+\.amazonaws\.com\/[a-zA-Z0-9-]+\/.+\.(jpg|jpeg|png|gif|bmp)$/).messages({ 'string.pattern.base': `image link is not valid.` }).messages(errors("Image link")),
        attribute1: joi.string().trim().messages(errors("attribute1")),
        attribute2: joi.string().trim().messages(errors("attribute2")),
        attribute3: joi.string().trim().messages(errors("attribute3")),
        units: joi.string().trim().regex(/^(Pcs|Pkt|Pouch)$/i).messages({ 'string.pattern.base': `units should be either Pcs or Pkt or Pouch.` }).messages(errors("units")),
        gst: joi.number().messages({ 'number.base': `GST should be a number.` }),
        sku: joi.string().trim().regex(/^[A-Za-z0-9-]+$/i).messages({ 'string.pattern.base': `sku is not valiad.` }).messages(errors("sku")),
        hsn: joi.string().trim().regex(/^\d{4}$/).messages({ 'string.pattern.base': `hsn should be a 4 digit number.` }).messages(errors("hsn")),
        upc: joi.string().trim().regex(/^\d{12}$/).messages({ 'string.pattern.base': `upc is not valid.` }).messages(errors("upc")),
        listPrice: joi.number().messages({ 'number.base': `listprice should be a number` }),
        minStockLevel: joi.number().messages({ 'number.base': `minimum stock level should be a number` })
    }),
}