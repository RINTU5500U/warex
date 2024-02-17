const mongoose = require('mongoose');

const skuSchema = new mongoose.Schema({
    productName: {
        type: String,
        trim: true,
        required: true
    },
    brandName: {
        type: String,
        trim: true,
        required: true
    },
    categoryName: {
        type: String,
        trim: true,
        required: true
    },
    imageLink: {
        type: String,
        trim: true,
        required: true
    },
    attribute1: {
        type: String,
        trim: true,
        required: true
    },
    attribute2: {
        type: String,
        trim: true,
        required: true
    },
    attribute3: {
        type: String,
        trim: true,
        required: true
    },
    units: {
        type: String,
        enum: ['Pcs', 'Pckts', 'Pouch'],
        trim: true,
        required: true
    },
    gst: {
        type: Number,
        required: true
    },     // Example: "18%"
    sku: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    hsn: {
        type: String,
        trim: true,
        required: true
    },
    upc: {
        type: String,
        trim: true,
        required: true
    },
    listPrice: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    minStockLevel: {
        type: Number,
        required: true
    },
    createdAt: {
        type: String,
        default: new Date().toLocaleString()
    },
    updatedAt: {
        type: String,
        default: null
    }
})

skuSchema.index({ productName: 1 })
module.exports = mongoose.model('Sku', skuSchema)