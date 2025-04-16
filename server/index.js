require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');

// Authentication
const authRouter = require('./routes/auth')

// admin
const projectRouter = require('./routes/admin/project')

// create database connection

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log('connected to database');
    })
    .catch((err) => {
        console.log(err);
    })

const app = express();
const PORT = process.env.PORT || 5000;


app.use(
    cors({
        origin: process.env.CLIENT_BASE_URL,
        // function (origin, callback) {
        //     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        //         callback(null, true); // Allow the origin
        //     } else {
        //         callback(new Error('Not allowed by CORS')); // Block the origin
        //     }
        // },
        methods: ['GET', 'POST', 'DELETE', 'PUT'],
        allowedHeaders:[
            'Content-Type',
            'Authorization',
            'Cache-Control',
            'Expires',
            'Pragma',
        ],
        credentials: true
    })
)

app.use(cookieParser());
app.use(express.json());

// Authentication
app.use('/api/auth', authRouter);
app.use('/api/admin/projects', projectRouter);
app.get('/', (req, res) => {
    res.send('Backend is running 🚀');
});

app.use(express.static(path.join(__dirname, 'client/build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})