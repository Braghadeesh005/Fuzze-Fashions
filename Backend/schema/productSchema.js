//Product Schema
const mongoose=require('mongoose')
const { Schema } = mongoose;


const userSchema= new Schema({


    name: {
        type: String,
        required: true
    },
    model_id: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    special_discount: {
        type: String,
        required: true
    },


    // image properties
    avatar: {
        type: String,
        required:true
      },
    filename: { 
        type: String, 
        required: true, 
        unique: true 
    },
    originalName: { 
        type: String, 
        required: true 
    },
    path: { 
        type: String, 
        required: true 
    },
    created: { 
        type: Date, 
        default: Date.now 
    },


})



const ProductSchema = mongoose.model('PRODUCT', userSchema);

module.exports = ProductSchema;