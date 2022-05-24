const express = require('express');
const router = express.Router();
const {fetchData , sort}= require('./helper')
const apicache = require("apicache");

router.get("/ping" , (req, res, next) => {
  res.status(200);
  res.send({"success" : true});
})

const cache = apicache.middleware;

router.get("/posts" ,cache("60 minutes"), async (req, res, next) => {
  const [key , data] = await fetchData(req.query)
      if(key === 400){
        res.status(400).json({ error: String(data)})
      }else if(key === 500){
        res.status(500).json({ error: String(data)})
      }else{
        res.status(200).send({"posts":data})
      }
})

module.exports = router;