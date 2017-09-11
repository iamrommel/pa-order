var express = require('express')
var router = express.Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.json([{name: 'Rommel and the house', age: 32}])
})

module.exports = router
