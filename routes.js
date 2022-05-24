const express = require('express');
const router = express.Router();
const {fetchData}= require('./helper')

router.get("/ping" , (req, res, next) => {
  res.status(200);
  res.send({"success" : true});
})

router.get("/posts" , async (req, res, next) => {
  if (Object.keys(req.query).indexOf('tags') != -1){
      const [key , data] = await fetchData(req.query.tags) 
      if(key){
        res.status(200)
        res.send({"posts" : data})
      }else{
        res.status(500).json({error:String(data)});
      }

  }else{
    res.send({"success" : false})
  }

})

module.exports = router;