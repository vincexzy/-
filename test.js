const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/test");
// mongoose.Promise = Promise;

const Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  password: String,
  age: Number
});

const User = mongoose.model("User", userSchema);

var leo = new User({
  name: "leo",
  password: "12345",
  age: 18
});

async function run() {
  await User.remove();
  await leo.save();
  const list = await User.find();
  console.log(list);
}

run();
