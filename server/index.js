const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");

// Import Routes
const authRoute = require('./routes/auth');
const taskRoutes = require('./routes/task');

app.use(cors());

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
    
// Route Middlewares
app.use('/api/user', authRoute);
app.use('/api', taskRoutes);

app.listen(3000, () => console.log('Server running on 3000'));

