const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/testmessage',
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, },
    (err) => {
        if (!err) {

            console.log('MongoDB connected');

        } else {
            console.log('error in db connection ' + err);
        }
    });