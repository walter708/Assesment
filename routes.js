const express = require('express');
const router = express.Router();

router.get("/ping" , (req, res, next) => {
  res.status(200);
  res.send({"success" : true});
})

router.get("/posts" , (req, res, next) => {
  if (Object.keys(req.query).indexOf('tags') != -1){
    res.status(200)
    res.send({"success" : true})
  }

})

module.exports = router;