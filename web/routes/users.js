var express = require('express')
var router = express.Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.json([{name: 'Rommel', age: 32}])
})

module.exports = router
