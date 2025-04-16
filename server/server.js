const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Authentication
const authRouter = require('./routes/auth')

// admin
const projectRouter = require('./routes/admin/project')

// create database connection

mongoose
    .connect('mongodb+srv://mubasilbehzad012:M0basil2108@cluster0.32p9z.mongodb.net/')
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
        origin: 'http://localhost:3000',
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

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})