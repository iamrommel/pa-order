import { buildGraphql } from 'pcmli.umbrella.backend'
import { ProductController } from './controller'

export const ProductTypeDefs = [`

type Product {
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




