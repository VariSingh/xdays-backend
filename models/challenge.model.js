const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ChallengeSchema = new Schema({
    name: {type: String, required: true, max: 100},
    description: {type: String, required: true, max: 500},
    start_date: {type: Date, required: true},
    number_of_days: {type: Number, required: true},
    completed_days:{type: Number, required: true},
    status: {type: String,required: true},
    penality: {type: String, max: 100,required: true}
});


// Export the model
module.exports = mongoose.model('Challenge', ChallengeSchema);