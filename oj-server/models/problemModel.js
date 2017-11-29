const mongoose = require('mongoose');
const ProblemSchema = mongoose.Schema({
    id: Number,
    name: String,
    desc: String,
    diff: String
});

const ProblemModel = mongoose.model('ProblemModel', ProblemSchema);
module.exports = ProblemModel;