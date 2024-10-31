const mongoose= require ("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/project6", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// ---------------------------------


const express= require("express")
const nocache = require('nocache')
const app = express()
app.use(nocache())

const userRoute = require("./routes/employeeRoute");

app.use('/', userRoute)

const adminRoute = require('./routes/adminRoute')
app.use('/admin',adminRoute)


const PORT= 3000
app.listen(PORT,()=>{
    console.log("Server started on http://localhost:3000");

})
