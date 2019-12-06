const express = require('express');
const app = express();
const mongoose = require('mongoose');





const productRoute = require('./api/routes/product');
const orderRoute = require('./api/routes/order/');
const userRoute = require('./api/routes/user');





const mongoDBurl = "mongodb+srv://myounghwan:qnfmrh0228@cluster0-1dywn.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(mongoDBurl, 
    {useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true})
    .then(() => console.log("MongoDB connected..."))
    .catch(err => console.log(err.message));
    










app.use('/product', productRoute);
app.use('/order', orderRoute);
app.use('/user', userRoute);



const PORT = 3000;
app.listen(PORT, console.log("server started..."));