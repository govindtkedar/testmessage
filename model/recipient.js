var mongoose = require('mongoose');
var conn = mongoose.connection;
var Schema = mongoose.Schema;


var recipientSchema = new Schema({
    recipient: {
        type: String
    },
    priority: {
        type: Number
    },
    totalMessageReceived: {
        type: Number
    }

});

module.exports = conn.model('recipient', recipientSchema);