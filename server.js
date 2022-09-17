import  express from 'express';
// import dotenv from  'dotenv';
import cors  from 'cors' ;
import  bodyParser from  'body-parser';
import router from './routes.js'

// dotenv.config()
const app = express();


const port  = 5000;
    // MIDDLEWARE 
    app.options("*" , cors());
    app.use(cors());
    app.use(bodyParser.json())
    
    //Routes
    app.use('/api' , router)
   
    // SERVER LAUNCH
    app.listen(process.env.PORT || port, () => {
      console.log("listening to port " + (port));
    })
