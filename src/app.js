const express= require('express')
const bodyparser= require('body-parser')
const path= require('path')
const passport= require('passport')//para la autenticacion
const session= require('express-session')
const flash= require('connect-flash')//modulo para mandar mensajes temporales
const cookieParser= require('cookie-parser')//convertir las cookies del navegador
const mongoose= require('mongoose')

const app=express()

//connected DB
mongoose.connect("mongodb://localhost/users",{ useNewUrlParser: true })

require("./config/passport")(passport)

//Settings
app.set('port',process.env.PORT || 3000)
app.set('views', path.join(__dirname,"views"))
app.set("view engine", "ejs")


//middelwhere
app.use(cookieParser())
app.use(bodyparser.urlencoded({extended: false}))
app.use(session({
    secret: "alohaaaaa",
    resave:false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session())
app.use(flash())


//import routes
require("./routes/routes")(app, passport)

//listening
app.listen(app.get('port'),()=>{
    console.log(`Server running on port: ${app.get('port')}`);
})