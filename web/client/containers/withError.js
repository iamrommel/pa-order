import { withProps } from 'recompose'
import toastr from 'toastr'

export const withError = () => {
  return withProps({
    onError: (error) => {

      const errorMessage = error.message || error

      toastr.error(errorMessage)
      //we can do also some logic here
    }
  })
}

