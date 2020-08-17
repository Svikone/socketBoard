const { Schema, model } = require('mongoose');
const ObjectId = Schema.Types.ObjectId

const boardSchema = new Schema({
  name: {
    type: String
  },

    users: [
        {
            _id: ObjectId
        }
    ],   

  friendWhoAppliedId: {
    type: ObjectId
  }
  
});

module.exports = model('boards', boardSchema);