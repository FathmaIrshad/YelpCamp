const mongoose=require('mongoose');
const cities= require('./cities');
const {places, descriptors}=require('./seedHelpers');
const Campground= require('../models/campground');

//we can run this file separate from node to seed the database
mongoose.connect('mongodb://0.0.0.0:27017/yelp-camp')
// ,{
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true
// });
    //use local development or prduction database
    
const sample= array => array[Math.floor(Math.random() * array.length)];

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:')); 
db.once('open', () => {
    console.log("Database connected");  //if succesfully opened, display this message
});

//to create new campgrounds with random.city and random.location from cities.js
const seedDB= async() =>{
    await Campground.deleteMany({});
    for (let i=0; i<50; i++){
        const random1000=Math.floor(Math.random() *1000);
        const camp = new Campground({
            location:`${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`
        })
        await camp.save();
    }
 }

//to give title in Schema which is random.descriptor+random.place
//to run in terminal, >>node seeds/index.js
seedDB().then(() =>{
    mongoose.connection.close();
});