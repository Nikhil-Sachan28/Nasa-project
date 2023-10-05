const mongoose = require('mongoose');

const launchSchema = new mongoose.Schema({
    flightNumber : {
        type : Number,
        required : true,
        default : 100,
        min : 100,
        max : 999,
    },

    launchDate : {
        type : Date,
        required : true,
    },
    mission : {
        type : String,
        required : true,
    },
    rocket : {
        type : String,
        required: true,
    },
    target : {
        // type : mongoose.ObjectId,
        // ref : "Planet",
        type : String,
        require : true,
    },
    customers : [String],
    upcoming : {
        type : Boolean,
        required : true,
    },
    success : {
        type : Boolean,
        required : true,
        default : true
    }
}); 


// first argument passed to mongoose.model should be singular and mongoose will then take the argument,
// you passed lowercase it, make it plural and talk to collection with lowercase pluralized name.

//connects launchesSchema with "launches" collection
module.exports = mongoose.model("Launch", launchSchema);