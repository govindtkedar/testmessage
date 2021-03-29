const express = require('express');
const app = express();
require('./config/db');
const addMessage = require('./addMessage');
app.use(express.json());

// message adding api
app.post('/addmessage', addMessage, (req, res) => {
    res.json({
        success: req.success,
        result: req.result,
    });
});

app.listen(5005, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`server running - 5005`);
});