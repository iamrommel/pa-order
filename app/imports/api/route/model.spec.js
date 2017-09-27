import { RouteModel, _mutationCallback } from './model'
import td from 'testdouble'

describe('RouteModel', function () {

  let model, collection

  describe('constructor', function () {

    it('should throw error if collection was not defined', async function () {
      expect(function () {
        new RouteModel()
      }).to.throw(Error)

    })
  })

  describe('#createDefault()', function () {
    it('should be able to create expected object', function () {

      const result = RouteModel.createDefault()

      expect(result).to.have.property('_id')
      expect(result).to.have.property('code')
      expect(result).to.have.property('remarks')
      expect(result).to.have.property('tags')
      expect(result).to.have.property('status')
      expect(result).to.have.property('distance')
    })
  })

})