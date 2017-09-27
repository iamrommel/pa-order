import { headerParamsToDoc, defaultParamsToDoc } from './pickup'

describe('Pickup Service', function () {
  describe('#headerParamsToDoc', function () {
    it('should get correct route even route is empty', function () {

      const params = {}
      const result = headerParamsToDoc({params})

      expect(result).to.containSubset({
        $set: {
          route: {}
        }
      })

    })
    it('should get correct route even route was specified', function () {

      const params = {route: {_id: 34}}
      const result = headerParamsToDoc({params})

      expect(result).to.containSubset({
        $set: {
          route: {
            _id: 34
          }
        }
      })

    })

  })
  describe('#defaultParamsToDoc', function () {
    it('should pick the expected fields', function () {

      const params = {_id: 10, timeStamp: Date.now(), ticketNo: 20}
      const result = defaultParamsToDoc({params})

      expect(result).to.containSubset({
        _id: params._id,
        timeStamp: params.timeStamp,
        ticketNo: params.ticketNo,
      })
    })
  })
})