const express = require('express');
const router = express.Router();
const {getTags}= require('./helper')

router.get("/ping" , (req, res, next) => {
  res.status(200);
  res.send({"success" : true});
})

router.get("/posts" , (req, res, next) => {
  if (Object.keys(req.query).indexOf('tags') != -1){
      const tags = getTags(req.query.tags)
    res.status(200)
    res.send({"success" : tags})
  }else{
    res.send({"success" : false})
  }

})

module.exports = router;