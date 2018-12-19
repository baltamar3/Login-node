const localStrategy= require('passport-local').Strategy;
const User= require('../models/user')

module.exports=(passport)=>{
    
    passport.serializeUser((user,done)=>{
        done(null,user._id)
    })

    passport.deserializeUser((id,done)=>{
        User.findById(id,(err,user)=>{
            done(err,user)
        })
    })


    //singup
    passport.use("local-singup",new localStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback:true
    },function(req, email, password, done){
        User.findOne({"local.email":email},(err,user)=>{
            if (err) done(err) 
            if(user) done(null,false,req.flash("singupMensage", "El email ya existe"))
            else{
                var newUser= new User()
                newUser.local.email=email
                newUser.local.password=newUser.generateHash(password)
                newUser.save((err)=>{
                    if(err){ throw err;}
                    return done(null, newUser)
                }) 
            }
        })
    }))

    //login
    passport.use("local-login",new localStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    },function(req, email, password, done){ 
        User.findOne({"local.email":email},(err,user)=>{
            if (err) done(err) 
            if(!user) done(null,false,req.flash("loginMensage", "El email No existe"))
            if(!user.validatePassword(password)){
                done(null,false,req.flash("loginMensage","Clave incorrecta"))
            } 
            return done(null,user)
        })
    }))
}
