const express = require('express');
const router = express.Router();
const {fetchData , sort}= require('./helper')

router.get("/ping" , (req, res, next) => {
  res.status(200);
  res.send({"success" : true});
})

router.get("/posts" , async (req, res, next) => {
  let posts = []
  if (Object.keys(req.query).indexOf('tags') !== -1){
      const [key , data] = await fetchData(req.query.tags) 
      if(key){
        posts = data
        res.status(200).send(posts);
        // const [key , value] = sort(req.query, posts)
      }else{
        res.status(500).json({error:String(data)});
      }

  }else{
    res.status(400).json({error:"Tags parameter is required"});
  }
  
  
  

})

module.exports = router;