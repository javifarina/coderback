const bcrypt = require("bcrypt")
const userModel =require ('../models/user.model')
const { hashPassword } = require("../../utils/hashing")
class UserManager {
    constructor(){}
    async getUser(email,password){
        try {
            const user = await userModel.findOne({email})
            const userPAss = await bcrypt.compare(password, user.password)
            console.log(userPAss)
            if(!userPAss){
              throw new Error ('Invalid password!' )
            }
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
                password,
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
              const salt = await bcrypt.genSaltSync(10);
              const hashedPassword = await bcrypt.hashSync(password, salt)
         const user = await userModel.create({
                firstName,
                lastName,
                age:parseInt(age),
                email,
                password: hashedPassword
              }); 
        console.log(user)
        return user
    }
    async getUserById (data){
      try {
        const user = await userModel.findOne(data)
        return user
      } catch (error) {
        throw new Error(`Error al leer Usuario`)
      }
    }
}
module.exports = UserManager