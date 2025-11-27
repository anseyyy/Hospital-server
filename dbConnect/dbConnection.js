const mongoose = require ('mongoose')

const dbServer = process.env.dbServer

mongoose.connect(dbServer)
.then(res => {
    console.log("Server is Connected With MongoDB");
})
.catch(res => {
    console.log("Connection Faild with MongoDB");
})


