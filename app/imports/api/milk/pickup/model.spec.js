import { PickupModel, _mutationCallback } from './model'
import td from 'testdouble'

describe('PickupModel', function () {

  let model, collection, findOne, getRepository, getTotalWeight, args

  describe('constructor', function () {

    it('should throw error if collection was not defined', async function () {
      expect(function () {
        new PickupModel()
      }).to.throw(Error)

    })
  })

  describe('#createDefault()', function () {
    it('should be able to create expected object', function () {

      const result = PickupModel.createDefault()

      expect(result).to.have.property('_id')
      expect(result).to.have.property('ticketNo')
      expect(result).to.have.property('timeStamp')
    })
  })

  describe('#getTotalWeight()', function () {
    const details = [{_id: 1, weight: 10}, {_id: 2, weight: 11}]
    const args = [
      {details, weight: null, _id: 1, totalWeight: 11},
      {details, weight: 4, _id: null, totalWeight: 25},
      {details, weight: 5, _id: 1, totalWeight: 16},
    ]

    beforeEach(function () {
      collection = td.object()
      model = new PickupModel('pickupModel', collection)
    })

    args.forEach((item) => {
      it(`should get correct totalWeight of '${item.totalWeight}' if weight is '${item.weight}' and _id is '${item._id}'`, function () {
        const {totalWeight} = item
        const result = model.getTotalWeight(item)

        expect(result).to.equal(totalWeight)

      })
    })
  })

  describe('#buildPickupWeight()', function () {
    afterEach(function () {
      td.reset()
    })
    beforeEach(function () {
      args = {filter: {_id: 1023, 'details._id': 12}}
      findOne = td.when(td.function()(), {ignoreExtraArgs: true}).thenReturn({_id: '1', _syncInfo: {externalId: 1}})
      collection = td.object()
      model = new PickupModel('pickupModel', collection)
      getRepository = () => ({findOne: () => ({findOne})})

      model.getRepository = getRepository
    })

    it('should be able to set totalWeight on details PUSH', async function () {
      const doc = {
        $push: {
          details: {
            weight: 11,
            _id: '1y'
          }
        }
      }

      getTotalWeight = td.when(td.function()({weight: 11, details: [], _id: null})).thenReturn(10)
      model.getTotalWeight = getTotalWeight

      await model.buildPickupWeightAsync(doc, args)

      expect(doc).to.containSubset({
        $set: {
          totalWeight: 10
        },
        $push: {
          details: {
            weight: 11,
            _id: '1y'
          }
        }
      })

    })
    it('should be able to set totalWeight on details PULL', async function () {
      const doc = {'$pull': {details: {_id: '1'}}}

      getTotalWeight = td.when(td.function()({weight: null, details: [], _id: 12})).thenReturn(10)
      model.getTotalWeight = getTotalWeight

      await model.buildPickupWeightAsync(doc, args)

      expect(doc).to.containSubset({
        $set: {
          totalWeight: 10
        },
        '$pull': {details: {_id: '1'}}
      })
    })
    it('should be able to set totalWeight on details UPDATE', async function () {
      const doc = {
        '$set': {
          'details.$.customer._id': 'wvrvZM5a8hLHgY0oT',
          'details.$.timeStamp': '2010-10-01',
          'details.$.weight': 54354
        }
      }

      getTotalWeight = td.when(td.function()({weight: 54354, details: [], _id: 12})).thenReturn(7)
      model.getTotalWeight = getTotalWeight

      await model.buildPickupWeightAsync(doc, args)

      expect(doc).to.containSubset({
        $set: {
          'details.$.customer._id': 'wvrvZM5a8hLHgY0oT',
          'details.$.timeStamp': '2010-10-01',
          'details.$.weight': 54354,
          totalWeight: 7
        }
      })
    })
    it('should NOT include totalWeight when details was not CHANGE', async function () {
      const doc = {
        '$set': {
          route: 1
        }
      }

      getTotalWeight = td.when(td.function()({weight: 54354, details: [], _id: 12})).thenReturn(7)
      model.getTotalWeight = getTotalWeight

      await model.buildPickupWeightAsync(doc, args)

      expect(doc).to.containSubset({
        $set: {
          route: 1,
        }
      })
    })
  })

  describe('#beforeUpdate()', function () {
    let customerModel

    afterEach(function () {
      td.reset()
    })
    beforeEach(function () {
      args = {filter: {_id: 1023, 'details._id': 12}}

      findOne = td.when(td.function()(), {ignoreExtraArgs: true}).thenReturn({_id: '1', _syncInfo: {externalId: 1}})
      customerModel = {
        getRepository: () => ({findOne})
      }

      collection = td.object()

      model = new PickupModel('pickupModel', collection, {customerModel})

      getRepository = () => ({findOne: () => ({findOne})})
      getTotalWeight = td.when(td.function()(td.matchers.anything())).thenReturn(10)

      model.getTotalWeight = getTotalWeight
      model.getRepository = getRepository
    })
    it('should update the summary if ticketNo and timeStamp is available', async function () {

      const doc = {$set: {ticketNo: 1, timeStamp: '2010-01-01'}}
      await model.beforeUpdateAsync(doc, args)
      expect(doc).to.have.nested.property('$set.summary')
      expect(doc).to.containSubset({
        $set: {summary: '1 - Jan 01, 2010 12:00 AM'}
      })

    })
    it('should not update the summary if ticketNo or timeStamp is not available', async function () {
      const doc = {$set: {timeStamp: '2010-01-01'}}
      await  model.beforeUpdateAsync(doc, args)
      expect(doc).to.not.have.nested.property('$set.summary')
    })

    it('should update delivery customer to include the sync info on ADD of delivery', async function () {

      const doc = {
        $push: {
          deliveries: {
            customer: {
              _id: '1023'
            },
            weight: 102,
            _id: '1y'
          }
        }
      }
      await model.beforeUpdateAsync(doc, args)
      expect(doc).to.containSubset({
        $push: {
          deliveries: {
            customer: {
              _syncInfo: {externalId: 1}
            }
          }
        }
      })
    })
    it('should update delivery customer to include the sync info on UPDATE of delivery', async function () {

      const doc = {
        '$set': {
          'deliveries.$.customer._id': 'wvrvZM5a8hLHgY0oT',
          'deliveries.$.timeStamp': '2010-10-01',
          'deliveries.$.weight': 54354
        }
      }

      await model.beforeUpdateAsync(doc, args)
      expect(doc).to.containSubset({
        '$set': {
          'deliveries.$.customer._id': 'wvrvZM5a8hLHgY0oT',
          'deliveries.$.customer._syncInfo.externalId': 1,
          'deliveries.$.timeStamp': '2010-10-01',
          'deliveries.$.weight': 54354
        }
      })
    })
    it('should DO NOTHING on delivery customer on DELETE of delivery', async function () {

      const doc = {'$pull': {deliveries: {_id: '1A3CziKrmTRdSgUZP'}}}
      await model.beforeUpdateAsync(doc, args)
      expect(doc).to.containSubset({'$pull': {deliveries: {_id: '1A3CziKrmTRdSgUZP'}}})
    })

    it('should update detail customer to include the sync info on ADD of detail', async function () {

      const doc = {
        $push: {
          details: {
            customer: {
              _id: '1023'
            },
            weight: 102,
            _id: '1y'
          }
        }
      }
      await model.beforeUpdateAsync(doc, args)
      expect(doc).to.containSubset({
        $push: {
          details: {
            customer: {
              _syncInfo: {externalId: 1}
            }
          }
        }
      })
    })
    it('should update detail customer to include the sync info on UPDATE of detail', async function () {

      const doc = {
        '$set': {
          'details.$.customer._id': 'wvrvZM5a8hLHgY0oT',
          'details.$.timeStamp': '2010-10-01',
          'details.$.weight': 54354
        }
      }

      await model.beforeUpdateAsync(doc, args)
      expect(doc).to.containSubset({
        '$set': {
          'details.$.customer._id': 'wvrvZM5a8hLHgY0oT',
          'details.$.customer._syncInfo.externalId': 1,
          'details.$.timeStamp': '2010-10-01',
          'details.$.weight': 54354
        }
      })
    })
    it('should DO NOTHING on detail customer on DELETE of detail', async function () {

      const doc = {'$pull': {details: {_id: '1A3CziKrmTRdSgUZP'}}}
      await model.beforeUpdateAsync(doc, args)
      expect(doc).to.containSubset({'$pull': {details: {_id: '1A3CziKrmTRdSgUZP'}}})
    })

  })

})