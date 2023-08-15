const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
        },
        vintage: {
            type: Number,
        },
        ctscore: {
            type: Number,
        }        
    },{
        timestamps: true
    }
);

const Wine = mongoose.models.Wine || mongoose.model("Wine", wineSchema);

module.exports = Wine;





