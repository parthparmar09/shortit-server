const mongoose = require('mongoose');

const URLSchema = new mongoose.Schema({
    id : {
        type : String,
        required : [true , `id can't be empty`]
    },
    url : {
        type : String,
        required : [true , `url can't be empty`]
    },
    createdAt: { type: Date, expires: 3600*24 }
})

module.exports = mongoose.model('URL' , URLSchema)