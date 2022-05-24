const express = require('express');
const router = express.Router();
const {fetchData , sort}= require('./helper')

router.get("/ping" , (req, res, next) => {
  res.status(200);
  res.send({"success" : true});
})

router.get("/posts" , async (req, res, next) => {
  const [key , data] = await fetchData(req.query)
  
  if(key === 400){
    res.status(400).send(data)
  }else if(key === 500){
    res.status(500).send(data)
  }else{
    res.status(200).send(data)
  }
  

  
  
  

})

module.exports = router;