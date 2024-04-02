const chatModel = require('../models/chat.model')

class ChatManager {
    constructor(){}

async getMessage (){
    try {
        const messages = await chatModel.find();
        return messages.map(d => d.toObject({ virtuals: true }));
    } catch (error) {
        console.log({ Error: error });
    }
}
async saveMessage (data) {
  
        await chatModel.create(data)
   
       
    
}
}
module.exports = ChatManager;