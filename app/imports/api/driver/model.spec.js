import { DriverModel } from './model'
import td from 'testdouble'

describe('DriverModel', function () {

  let model, collection

  describe('constructor', function () {

    it('should throw error if collection was not defined', async function () {
      expect(function () {
        new DriverModel()
      }).to.throw(Error)

    })
  })

  describe('#createDefault()', function () {
    it('should be able to create expected object', function () {

      const result = DriverModel.createDefault()

      expect(result).to.have.property('_id')
      expect(result).to.have.property('code')
      expect(result).to.have.property('name')
      expect(result).to.have.property('contact')
      expect(result).to.have.property('status')
      expect(result).to.have.property('logo')
      expect(result).to.have.property('remarks')
      expect(result).to.have.property('tags')

    })
  })

  describe('#mnutationCallback', function () {

    let context, args

    afterEach(function () {
      td.reset()
    })
    beforeEach(function () {

      collection = td.object()
      const imageModel = td.object()
      td.when(imageModel.setDefaultLogo(td.matchers.anything())).thenReturn({name: 'Logo here'})

      const ContactModel = td.object(['setupContactAddressGps'])
      context = {ContactModel}
      td.when(context.ContactModel.setupContactAddressGps(td.matchers.anything()))

      model = new DriverModel('driverName', collection, {imageModel})
    })

    it('should create only logo on create operation', async function () {

      //arrange
      const obj = {}
      args = {_type: 'create'}
      const mutationCallback = model.mutationCallback(args, context)

      //act
      await mutationCallback(obj)

      //assert
      expect(obj).to.containSubset({
        logo: {
          name: 'Logo here'
        }
      })

    })
    it('should not create logo on update operation', async function () {

      //arrange
      const obj = {}
      args = {_type: 'update'}
      const mutationCallback = model.mutationCallback(args, context)

      //act
      await mutationCallback(obj)

      //assert
      expect(obj).to.not.containSubset({
        logo: {
          name: 'Logo here'
        }
      })

    })

    it('should include $set on update operation', async function () {

      //arrange
      const obj = {}
      args = {_type: 'update'}
      const mutationCallback = model.mutationCallback(args, context)

      //act
      await mutationCallback(obj)

      //assert
      expect(obj).to.containSubset({
        $set: {}
      })

    })
    it('should not include $set on create operation', async function () {

      //arrange
      const obj = {}
      args = {_type: 'create'}
      const mutationCallback = model.mutationCallback(args, context)

      //act
      await mutationCallback(obj)

      //assert
      expect(obj).to.not.containSubset({
        $set: {}
      })

    })
    it('should include $set on when operation type is not specified', async function () {

      //arrange
      const obj = {}
      args = {_type: 'update'}
      const mutationCallback = model.mutationCallback(args, context)

      //act
      await mutationCallback(obj)

      //assert
      expect(obj).to.containSubset({
        $set: {}
      })

    })

  })
})