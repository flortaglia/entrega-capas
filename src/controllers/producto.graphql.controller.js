const crypto = require ("crypto") ;
const Producto = require ("../graphqlClasses/producto.class.js") ;
const ProductoDaoFactory = require ('../classes/ProductoDaoFactory.class.js') 
const DAO = ProductoDaoFactory.getDao()


const createProducto = async ({ datos }) => {
  const newProducto = await DAO.create(datos )
  return newProducto;
};

const getProducto = async ({ id }) => {
  const producto = await DAO.getById(id)
  if(!producto){return res.status(404).json({error: "Producto no encontrado"})}
  return producto;
};

const getProductos = async ({ campo, valor }) => {
  const verProductos = await DAO.getAll()
  if (campo && valor) {
    return verProductos.filter((producto) => producto[campo] == valor);
  } else {
    return verProductos;
  }
};

const updateProducto = async ({ id, datos }) => {
  const producto = await DAO.getById(id)
  if(!producto){return res.status(404).json({error: "Producto no encontrado"})}
  const {title, description, code, price, thumbnail, stock} = datos
  const productoUpdated = await DAO.update(id, title, description, code, price, thumbnail, stock)
  return productoUpdated;
};

const deleteProducto = async ({ id }) => {
  const productoDeleted = await DAO.getById(id)
  if(!productoDeleted){return res.json({ error: "El parámetro no es un número o el id no existe" })}
  await DAO.deleteById(id)
  
  return productoDeleted;
};

module.exports= {
    createProducto,
    getProductos,
    getProducto,
    updateProducto,
    deleteProducto,
};