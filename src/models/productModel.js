

const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true, 
    },
    product_category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductCategory",
      required: true,
      index: true, 
    },
    product_name: {
      type: String,
      required: true,
      maxlength: 100,
      index: "text", 
    },
    description: {
      type: String,
      index: "text",
    },
    brand: {
      type: String,
      maxlength: 50,
      index: true,
    },
    grade: {
      type: [String],
      index: true, 
    },
    dimension: {
      type: [String],
      maxLength :50,
    },
    location: {
        	type: [
				{
					city: {
						type: String,
						maxlength: 150,
					},
				},
			],
			required: true,
    },
   
        
    unit: {
      type: String,
     
      default: "MT",
     
      
    },
    price: {
      type: String,
    },
    thumbnail_url: {
      type: String,
      maxlength: 255,
    },
    is_active: {
      type: Boolean,
      default: true,
      index: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    average_rating: {
      type: String,
      default: "0",
      index: true, 
    },
    catalogue_url: {
      type: String,
      default: null,
    },
    no_of_enquiries: {
      type: Number,
      default: 0,
      index: true, 
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);





ProductSchema.index({ brand: 1, is_active: 1 }); 
ProductSchema.index({ "location.city": 1 }); 

ProductSchema.index({ product_name: "text", description: "text", brand: "text" });

module.exports = mongoose.model("Product", ProductSchema);