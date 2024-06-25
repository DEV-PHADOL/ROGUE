const mongoose = require('mongoose');

mongoose
.connect("mongodb://localhost:27017/rogue")
.then(()=>{
    console.log("DB CONNECTED");
})
.catch((err)=>{
    console.log(err);
})

module.exports = mongoose.connection;