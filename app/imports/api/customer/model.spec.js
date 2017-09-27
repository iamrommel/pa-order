import { CustomerModel, _mutationCallback } from './model'
import td from 'testdouble'

describe('CustomerModel', function () {
  let model, collection

  describe('constructor', function () {

    it('should throw error if collection was not defined', async function () {
      expect(function () {
        new CustomerModel()
      }).to.throw(Error)

    })
  })

  describe('#createDefault()', function () {
    it('should be able to create expected object', function () {

      const result = CustomerModel.createDefault()

      expect(result).to.have.property('_id')
      expect(result).to.have.property('summary')
      expect(result).to.have.property('code')
      expect(result).to.have.property('contact')
      expect(result).to.have.property('status')
      expect(result).to.have.property('logo')
      expect(result).to.have.property('remarks')

      expect(result).to.containSubset({
        name: '[TODO] Customer Name',
        title: 'Owner, [TODO] XYZ Company',
        type: 'Milk Producer',
        remarks: 'Newly created record!'
      })

    })
  })

  describe('#mutate()', function () {

    afterEach(function () {
      td.reset()
    })
    beforeEach(function () {
      collection = td.object()
      model = new CustomerModel('modelName', collection)
    })

    it('should be the same value for docObj if delete operation', async function () {

      // const getOperationType = td.function()
      // td.when(getOperationType(td.matchers.anything())).thenReturn(model.operationType.delete)
      // const docObj = {name: 'John', _id: '42434'}
      // const context = {}
      // const that = {
      //   getOperationType
      // }
      // const result = await _mutationCallback({docObj, context, that})
      //
      // expect(result).to.be.deep.equal(docObj)

    })
  })
})