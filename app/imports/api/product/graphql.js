import { ProductController } from './controller'

export const ProductQuery = `
  allProducts(filter: String, options: String, projection : String): [Product]
`

export const ProductMutation = `
  createProduct(input : ProductInput!) : Product
`

export const ProductTypeDefs = [`

type Product {
    _id : String,
    code: String
    status: String
    name : String!
    tags : [String]
    remarks : String
    _histories : [History],
}


input ProductInput {
    _id : String,
    code: String
    status: String
    name : String!
    tags : [String]
    remarks : String
}

`]

const productController = new ProductController()

export const ProductResolvers = {
  Query: {
    async allProducts (root, args, context) {
      return await ProductController.getAll(args)
    },
  },
  Mutation: {

    async createProduct (root, args, context) {
      return await productController.create(args.input)
    }

  }
}
