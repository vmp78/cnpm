const Admin = require("../src/app/models/Admin");
const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.DATABASE_URL;

async function main() {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const admin = new Admin({
    username: "admin",
    password: "admin",
  });

  await admin.save();

  await mongoose.disconnect();
}

main();
