import { ProductController } from './controller'
import { buildGraphql } from '../common'

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

export const graphql = buildGraphql(productController)




