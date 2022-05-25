const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');


const port  = 3000;
    // MIDDLEWARE 
    app.options("*" , cors());
    app.use(cors());
    app.use(express.json());
    app.use('/' , express.static('public'));
    app.use(bodyParser.json())
    
    //Routes
    const router = require('./routes')
    app.use('/api' , router)
    
    
    
    
    
    
    
    // SERVER LAUNCH
    app.listen(process.env.PORT || port, () => {
      console.log("listening to port " + (port));
    })
