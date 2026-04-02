const mongoose = require("mongoose");

const ProductCategorySchema = new mongoose.Schema({
    product_category_id: {
        type: String,
        unique: true,
        required: true
    },
    product_category: {
        type: String,
        required: true
    },
    brand: [{
        type: String
    }],
    grade: [{
        type: String
    }],
    dimension: [{
        type: String
    }],
    unit: [{
        type: String
    }],
    tags: [{
        type: String
    }],
    is_active: {
        type: Boolean,
        default: true
    },
    image_url: {
        type: String
    }
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

ProductCategorySchema.index({ product_category: "text", tags: "text" });

const ProductCategory = mongoose.model("ProductCategory", ProductCategorySchema);

module.exports = ProductCategory;