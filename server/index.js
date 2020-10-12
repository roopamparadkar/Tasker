const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Import Routes
const authRoute = require('./routes/auth');
const taskRoutes = require('./routes/task');

// Connect To DB
mongoose.connect(
    process.env.DATABASE_STRING,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    },
    () => console.log('Connected to DB')
)
// Make Mongoose use `findOneAndUpdate()`
mongoose.set('useFindAndModify', false);

// Middlewares

app.use(express.json());
app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','http://localhost:4200');
    res.setHeader( 'Access-Control-Allow-Headers', 'Accept,Accept-Language,Content-Language,Content-Type');
    next();
    });
    
// Route Middlewares
app.use('/api/user', authRoute);
app.use('/api', taskRoutes);

app.listen(3000, () => console.log('Server running on 3000'));

