require('babel-core/register')
require('chai/register-expect')
var chai = require('chai')
var chaiSubset = require('chai-subset')
chai.use(chaiSubset)