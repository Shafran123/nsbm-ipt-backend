const express = require('express')
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoute = require('./routes/auth')


dotenv.config(); 

//DB Connection
mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true }, () =>
    console.log('connected to DB')
); 


const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());

app.use((req, res, next)=>{
        res.header('Access-Control-Allow-Origin', '*');
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
       // Pass to next layer of middleware
       next();
})

app.use('/api/v1', authRoute)

app.listen(3000, () => console.log('Server is up and running')) 