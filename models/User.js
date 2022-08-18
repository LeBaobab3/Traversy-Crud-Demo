const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

//"User" is the collection name. Mongoose will create a collection for you if you dont' specifiy. It'll be in plural "Users"
module.exports = mongoose.model("User", UserSchema);
//if you had a collection name already set up in Mongodb, add a third argument with 'collection-name' to reference it.
