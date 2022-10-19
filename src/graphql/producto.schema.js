const { buildSchema } = require( "graphql");
// const  { GraphQLScalarType, Kind } = require( 'graphql');

// const dateScalar = new GraphQLScalarType({
//   name: 'Date',
//   description: 'Date custom scalar type',
//   serialize(value) {
//     return value.getTime(); // Convert outgoing Date to integer for JSON
//   },
//   parseValue(value) {
//     return new Date(value); // Convert incoming integer to Date
//   },
//   parseLiteral(ast) {
//     if (ast.kind === Kind.INT) {
//       // Convert hard-coded AST string to integer and then to Date
//       return new Date(parseInt(ast.value, 10));
//     }
//     // Invalid hard-coded value (not an integer)
//     return null;
//   },
// });
// scalar Date
// type MyType {
//     created: Date
// }
 //   falta en schema    timestamp: Date,
const productoSchema = buildSchema(`
    input ProductoInput {
        title: String!,
        description: String,
        code: Int,
        price: Int!,
        thumbnail: String,
        stock: Int
    }
    type Producto {
        id: ID!,
        title: String!,
        description: String,
        code: Int,
        price: Int!,
        thumbnail: String,
        stock: Int
    }
    type Query {
        getProducto(id: ID!): Producto,
        getProductos(campo: String, valor: String): [Producto],
    }
    type Mutation {
        createProducto(datos: ProductoInput): Producto,
        updateProducto(id: ID!, datos: ProductoInput): Producto,
        deleteProducto(id: ID!): Producto,
    }
`);
// const resolvers = {
//     Date: dateScalar, 
    
//   }; 

module.exports =  productoSchema;