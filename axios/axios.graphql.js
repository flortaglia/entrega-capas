const axios = require("axios")  ;

const graphqlMutation = {
  operationName: "createProducto",
  query: `mutation createProducto {
    createProducto(datos: { 
                    title: "empanada de jamón y queso",
                    description: "empanada de jamón y queso",
                    code:200,
                    price:400,
                    thumbnail:"/img/jyq-empa.webp",
                    stock:50 }) {
                        id
                        title
                        description
                        code
                        price
                        thumbnail
                        stock
                    }
    }`,
};

const graphqlQuery = {
  operationName: "queryPizza",
  query: `query queryPizza{
    getProducto(id: "6325de39f5735397a6f8f447") {
        id,
        title,
        description,
        code,
        price,
        thumbnail,
        stock
        }
    }`,
};

const options = {
  url: "http://localhost:8080/graphql",
  method: "POST",
  data: graphqlQuery,
};

const response = await axios(options);

console.log(response.data.data);