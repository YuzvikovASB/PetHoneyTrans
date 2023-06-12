const {Schema, model} = require('mongoose');

const DriverSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  role: {type: String, required: true},
});


module.exports = model('Driver', DriverSchema);
