export const ProductQuery = `
  allProducts(filter: String, options: String): [Product]
`

export const ProductMutation = `
  mutateProducts(_id: String!, doc: String, _type : String) : Product
`

export const ProductTypeDefs = [`
type ProductDetail {
  _id : String
  product : Product
  quantity : Float
  price : Float
  total : Float
}

type Product {
    _id : String,
    code: String
    status: String
    tags : [String]
    remarks : String
    _histories : [History],
}
`]

export const ProductResolvers = {
  Query: {
    allProducts (root, args, context) {
      return context.ProductModel.find({args, context})
    },
  },
  Mutation: {
    mutateProducts (root, args, context) {
      return context.ProductModel.mutate({args, context})
    },
  }
}
