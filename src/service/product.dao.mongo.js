const ProductoDTO = require("../classes/ProductoDTO.class.js")  ;
const CustomError = require ("../classes/CustomError.class.js") ;
const DAO = require ("../classes/Dao.class.js") ;
const MongoClient = require ("../classes/MongoClient.class")
const Productos = require ("../models/producto.model.js")


class ProductoDaoMongo extends DAO {
  constructor() {
    super();
    // if(ProductoDaoMongo.instancia){
    //   console.log("creada")
    //   return ProductoDaoMongo.instancia
    // }
    this.collection = Productos;
    this.db = new MongoClient();
    // ProductoDaoMongo.instancia=this
  }

  async deleteById(id){
    try {
      // await this.db.connect();
      await this.collection.deleteOne({_id:id});
    } catch (error) {
      throw new CustomError(500, error);
    }//finally {
    //   await this.db.disconnect();
    // }
      
  }
  async getById(id)  {
    try {
      // await this.db.connect();
      const producto = await this.collection.findOne({ _id: id }, { __V: 0 });
      return new ProductoDTO(producto);
    } catch (error) {
      throw new CustomError(500, error);
    }//finally {
    //   await this.db.disconnect();
    // }
  
  }
  async getAll(){
    try {
      // await this.db.connect();
      const productos = await this.collection.find({ });
      const result = productos.map((producto)=>(new ProductoDTO(producto)))
      // console.log('product.dao.mogo getAll', result)
      return result;
    } catch (error) {
      throw new CustomError(500, error);
    }//finally {
    //   await this.db.disconnect();
    // }
  
  }
  async create(messageproducto){
    try {
      // await this.db.connect();
      const producto = new this.collection(messageproducto)
      await producto.save() 
      
      return new ProductoDTO(producto)
    } catch (error) {
      throw new CustomError(500, error);
    }//finally {
    //   await this.db.disconnect();
    // }
               
  }

  async update(id, title, description, code, price, thumbnail, stock){
    try {
      // await this.db.connect();
      await this.collection.updateOne({_id:id}, {title, description, code, price, thumbnail, stock})   
      const producto = await this.getById(id) 
       
      return new ProductoDTO(producto)
    } catch (error) {
      throw new CustomError(500, error);
    }//finally {
    //   await this.db.disconnect();
    // }
    
  }
  
  static getInstance() {
    let instance
    if (!instance) instance = new ProductoDaoMongo();

    return instance;
  }
  
}

module.exports = ProductoDaoMongo;





// const getProductosService = async () => {
//     const verProductos = await ProductoDao.getAll()
//     return  verProductos
// }

// module.exports = {
//     getProductosService
// }