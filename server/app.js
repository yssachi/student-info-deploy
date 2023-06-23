const express = require('express');
const app = express();

// importing the .dotenv
require('dotenv').config()

// importing the student-connect (database)
const connectDB = require('./db/student-connect')

//importing the routes for students
const studentInfoRouter = require('./routes/student-route')

//json middleware
app.use(express.json());

//static middleware
app.use(express.static('../client/public'))

//url middleware (only use when we have html forms)
app.use(express.urlencoded({ extended: true }));

//invoke the studentInfoRouter
app.use('/student/info', studentInfoRouter);



// port
const port = process.env.PORT || 3000;


const start = async() => {
    try {
        await connectDB(process.env.mongo_uri)
        app.listen(port, ()=> {
            console.log(`Server listening on port ${port}`);
        })
        
    } catch (error) {
        console.log(error)
        
    }

}

start()




