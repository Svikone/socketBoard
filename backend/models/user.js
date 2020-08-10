const { Schema, model } = require('mongoose');
const ObjectId = Schema.Types.ObjectId

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'erorr name'],
    unique: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  friends: [
    {
      _id: ObjectId ,
      name: String 
    }
  ],

});

module.exports = model('users', userSchema);
