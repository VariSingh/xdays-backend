const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let DaySchema = new Schema({
    description: {type: String, required: true},
    date: {type: Date, required: true}
});


// Export the model
module.exports = mongoose.model('Day', DaySchema);