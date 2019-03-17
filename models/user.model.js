const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    googleId: {type: String, required: true},
    profile: {type: Object, required: true}
});


// Export the model
module.exports = mongoose.model('User', UserSchema);