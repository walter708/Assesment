import express from 'express'
const router = express.Router();
import  {Ping, getData} from './controllers/posts/posts.js'


router.get('/ping' , Ping)

router.get('/posts', getData)

export default router;