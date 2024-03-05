const mongoose = require('mongoose');
const Review = require('./review')
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String,
    reviews: [    //array of object ID to store 
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'     //object Id to access from review model
        }
    ]
});

CampgroundSchema.post('findOneAndDelete', async function (doc) {   //Delete a campground and the related reviews both from webpage and from db using Mongoose middleware
    if (doc) {                      //if a camground exists delete the reviews if the its id in present in doc.reviews. doc refers to the deleted content
        await Review.deleteMany({     
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Campground', CampgroundSchema);