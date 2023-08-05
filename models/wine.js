import mongoose, { Schema } from "mongoose";

const wineSchema = new Schema(
    {
        name: { 
            type: String, 
            required: true 
        },
        type: {
            type: String,
            enum: ['Red', 'White', 'Rosé', 'Sparkling', 'Dessert'],
            required: true
        }, 
        status: {
            type: String,
            enum: ['Available', 'Sold', 'Reserved'],
            default: 'Available',
            required: true
        },       
        price: { 
            type: Number, 
            required: true 
        },
        description: { 
            type: String, 
            required: true 
        }      
    },{
        timestamps: true
    }
);

const Wine = mongoose.models.Wine || mongoose.model("Wine", wineSchema);

export default Wine;





