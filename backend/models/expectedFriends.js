const { Schema, model } = require('mongoose');
const ObjectId = Schema.Types.ObjectId

const expectedFriendsSchema = new Schema({
  name: {
    type: String
  },

  expectedFriendID: {
    type: ObjectId
  }
  
});

module.exports = model('expectedFriends', expectedFriendsSchema);