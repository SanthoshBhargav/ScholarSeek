const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scholarshipSchema = new Schema({
    Eligibility: String,
    Region : String,
    Deadline : String,
    Name : String,
    Links : String,
})

const Sholarship = mongoose.model("Scholarship" , scholarshipSchema);
module.exports = Sholarship;