const { Schema, model } = require('mongoose');
const ObjectId = Schema.Types.ObjectId

const tasks = new Schema({
  name: String,
  description: String,
  state: String
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
  },

  state: [

  ]
  
});



module.exports = model('boards', boardSchema);