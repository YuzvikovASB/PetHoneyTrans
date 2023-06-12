const {Schema, model, Types} = require('mongoose');


const TruckSchema = new Schema({
  model: {type: String, required: true},
  type: {type: String, required: true},
  createdBy: {type: Types.ObjectId, ref: 'Driver'},
  assignedTo: {type: String},
  status: {type: String},
  dimensions: {
    width: {type: Number, required: true},
    length: {type: Number, required: true},
    height: {type: Number, required: true},
  },
  payload: {type: Number, required: true},
});


module.exports = model('Truck', TruckSchema);
