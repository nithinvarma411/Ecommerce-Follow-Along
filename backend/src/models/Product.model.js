import {Schema, model} from 'mongoose';

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    actualPrice: {
        type: Number,
        required: true
    },
    discountPrice: {
        type: Number,
        required: true
    },
    image: {
        type: String,
    },
    availableSizes: {
        type: [Number],
        enum: [6,7,8,9,10,11,12]
    }
})

export const Product = model("Product", ProductSchema)