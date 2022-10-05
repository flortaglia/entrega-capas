const { Server } = require( "socket.io");
const messages= []
const productos= []
const {escribir} = require ('./write.js')
const logger = require('../utils/logger.js')
const ChatDaoFactory = require ('../classes/ChatDaoFactory.class.js') 
const DAO = ChatDaoFactory.getDao()

// LADO SERVIDOR
async function configChatMongo(expressServer){
    const io = new Server(expressServer)

    io.on('connection', async socket=>{
        console.log('se conecto un usuario')
    
        io.emit('serverSend:Products', productos) //envio todos los productos
        try {
            socket.on('client:enterProduct', productInfo=>{
                productos.push(productInfo) //recibo productos
                io.emit('serverSend:Products', productos)//emito productos recibidos a los usuarios
            })
        } catch (error) {
            logger.error('problema productos lado server', error)
        }

        let chatmessages= await DAO.getAll()
        io.emit('serverSend:message',chatmessages)
        try {
            socket.on('client:message', async messageInfo=>{
                // messages.push(messageInfo) 
                //RECIBO mensaje y lo anido
                // escribir(messages)
                try {
                    await DAO.create(messageInfo)
                    chatmessages = await DAO.getAll()
                    
                } catch (error) {
                    console.log(error)
                }
                
                io.emit('serverSend:message', chatmessages)//EMITO CHATS
            })
           
        } catch (error) {
            logger.error('problema chat lado server', error)
        }
        
      
    })

}
module.exports = {configChatMongo}