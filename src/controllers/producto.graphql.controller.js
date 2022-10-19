const crypto = require ("crypto") ;
const Producto = require ("../graphqlClasses/producto.class.js") ;

const productoMap = {};

const createProducto = ({ datos }) => {
  const id = crypto.randomBytes(10).toString("hex");
  const newProducto = new Producto(id, datos);

  productoMap[id] = newProducto;

  return newProducto;
};

const getProducto = ({ id }) => {
  if (!productoMap[id]) throw new Error("El Producto no existe");

  return productoMap[id];
};

const getProductos = ({ campo, valor }) => {
  const productos = Object.values(productoMap);

  if (campo && valor) {
    return productos.filter((producto) => producto[campo] == valor);
  } else {
    return productos;
  }
};

const updateProducto = ({ id, datos }) => {
  if (!productoMap[id]) throw new Error("El Producto no existe");

  const productoUpdated = new Producto(id, datos);

  productoMap[id] = productoUpdated;

  return productoUpdated;
};

const deleteProducto = ({ id }) => {
  if (!productoMap[id]) throw new Error("El Producto no existe");

  const productoDeleted = productoMap[id];

  delete productoMap[id];

  return productoDeleted;
};

module.exports= {
    createProducto,
    getProductos,
    getProducto,
    updateProducto,
    deleteProducto,
};