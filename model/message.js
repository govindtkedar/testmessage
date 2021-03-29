var mongoose = require('mongoose');
var conn = mongoose.connection;
var Schema = mongoose.Schema;


var messageSchema = new Schema({
    message: {
        type: String
    },
    createdat: {
        type: Date,
        default: Date.now
    },
    deleted_status: {
        type: Boolean,
        default: false
    }

});

module.exports = conn.model('message', messageSchema);