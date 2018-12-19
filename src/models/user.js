const mongoose= require('mongoose')
const bcrypt = require('bcrypt-nodejs')

const userSchema= new mongoose.Schema({
    local:{
        email: String,
        password: String
    }
})

//Método propio para encriptar
userSchema.methods.generateHash=(password)=> bcrypt.hashSync(password, bcrypt.genSaltSync(8),null)

//método propio para validar password
userSchema.methods.validatePassword= function (password){
    return bcrypt.compareSync(password, this.local.password)
}

module.exports=mongoose.model("User",userSchema)