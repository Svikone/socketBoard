const { Schema, model } = require('mongoose');
const ObjectId = Schema.Types.ObjectId

const tasks = new Schema({
  name: String,
  description: String
})

const boardSchema = new Schema({
  name: {
    type: String
  },

    users: [
        {
            _id: ObjectId
        }
  ],   
    
  tasks: {
    type: [ tasks ]
    },

  friendWhoAppliedId: {
    type: ObjectId
  }
  
});



module.exports = model('boards', boardSchema);