import  express from 'express';
// import dotenv from  'dotenv';
import cors  from 'cors' ;
import  bodyParser from  'body-parser';
import router from './routes.js'

// dotenv.config()
const app = express();



    // MIDDLEWARE 
    app.options("*" , cors());
    app.use(cors());
    app.use(bodyParser.json())
    
    //Routes
    app.use('/api' , router)
    
export default app;