const userModel =require ('../models/user.model')
class UserManager {
    constructor(){}
    async getUser(data){
        try {
            const user = await userModel.findOne(data)
            //console.log(user)
            return user
        } catch (error) {
            throw new Error(`Error al leer Usuario`)
        }
    }
    async addUser(data){
      
            const {
                firstName,
                lastName,
                email,
                age,
                password
              } = data
            if (
                firstName === "" ||
                lastName === "" ||
                email === "" ||
                password === "" ||
                age < 0
              ) {
                throw new Error(`Invalid User Data`);
              }
         const user =     await userModel.create({
                firstName,
                lastName,
                age:parseInt(age),
                email,
                password       
              }); 
       return user
    }
}
module.exports = UserManager