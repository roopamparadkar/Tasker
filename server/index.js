const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");
const path = require('path');

// Import Routes
const authRoute = require('./routes/auth');
const taskRoutes = require('./routes/task');

app.use(cors());

mongoose.set('debug', true);
// Connect To DB
mongoose.connect(
    process.env.DATABASE_STRING,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    },
).then(result => {
    console.log('Connected to DB');
})
.catch(err => {
    console.log(err);
})
// Make Mongoose use `findOneAndUpdate()`
mongoose.set('useFindAndModify', false);

// Middlewares

app.use(express.json());
    
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin,access_token, X-Requested-With, Content-Type, Accept");
    next();
  });
  
// Route Middlewares
app.use('/api/user', authRoute);
app.use('/api', taskRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('Server running on 3000'));

app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname+
    '/index.html'));});