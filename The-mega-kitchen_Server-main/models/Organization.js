const mongoose = require("mongoose");
const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  }
});

mongoose.model("Organization", organizationSchema);
