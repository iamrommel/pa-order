import { ProductController } from './controller'

export const ProductQuery = `
  allProducts(filter: String, options: String, projection : String): [Product]
`

export const ProductMutation = `
  createProduct(input : ProductInput!) : Product,
  updateProduct(input : ProductInput!, filter: String) : Product,
  deleteProduct(filter: String) : Product,
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
      return await productController.getAll(args)
    },
  },
  Mutation: {

    async createProduct (root, args, context) {
      return await productController.create(args)
    },
    async updateProduct (root, args, context) {
      return await productController.update(args)
    },
    async deleteProduct (root, args, context) {
      return await productController.delete(args)
    }
  }
}
