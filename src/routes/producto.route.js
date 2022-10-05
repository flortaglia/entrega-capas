const { Router } =require( 'express');
const router= Router();
const ProductoController = require('../controllers/productsController.js') 

class RouterProducto{
    constructor(){
        this.controller= new ProductoController()
    }

    start(){
        router.get('/', getProductos)
        //parte admin o ej 40
        router.get('/:id', getProductoId)
        router.post('/', postProductos)
        router.put('/:id', putProduct)
        router.delete('/:id', deleteProduct )

        return router
    }
}

export default RouterProducto