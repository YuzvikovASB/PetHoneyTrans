const {Schema, model, Types} = require('mongoose');

const LoadSchema = new Schema({
  title: {type: String, required: true},
  createdBy: {type: Types.ObjectId, ref: 'Shipper'},
  assignedTo: {type: String},
  logs: [{
    message: {type: String, required: true},
    time: {type: String, required: true},
  }],
  status: {type: String, required: true},
  state: {type: String},
  dimensions: {
    width: {type: Number},
    length: {type: Number},
    height: {type: Number},
  },
  payload: {type: Number},
});

module.exports = model('Load', LoadSchema);
