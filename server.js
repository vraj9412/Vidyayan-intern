const express = require('express')
const app = express()
app.use(express.json())

//Database connection Function
const connectDataBase = require('./config/database')

//Routers 
const register = require('./router/register')
const studentRoute = require('./router/students')
const tutorRoute = require('./router/tutors')

app.use('/api', register)
app.use('/api', studentRoute)
app.use('/api', tutorRoute)

connectDataBase()
const port = 5000
app.listen(port, () => {
    console.log(`Server Started on Port ${port}`)
})