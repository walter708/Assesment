const express = require('express');
const router = express.Router();

router.get("/ping" , (req, res, next) => {
  res.status(200);
  res.send({"success" : true});
})

router.get("/posts" , (req, res, next) => {
  if (Object.keys(req.query).indexOf('tags') != -1){
    let tagVal = req.query.tags
    tagVal = tagVal.split()
    let len = tagVal
    res.status(200)
    res.send({"success" : len})
  }else{
    res.send({"success" : false})
  }

})

module.exports = router;