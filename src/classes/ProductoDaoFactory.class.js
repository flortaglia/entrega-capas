const ProductoDaoMongo = require("../service/product.dao.mongo.js") ;

class ProductoDaoFactory {
  static getDao() {
    if (process.argv[2] === "mongo") return ProductoDaoMongo.getInstance();
  }
}

module.exports = ProductoDaoFactory;