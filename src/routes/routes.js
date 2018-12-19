module.exports= (app, passport)=>{

    app.get("/login",(req,res)=>{
        res.render("login",{
            mensaje: req.flash("loginMensage")
        })
    })

    app.get("/singup",(req,res)=>{
        res.render("singup",{
            mensaje: req.flash("singupMensage")
        })
    })

    app.post("/singup",passport.authenticate("local-singup",{
        successRedirect: "/profile",
        failureRedirect: "/singup",
        failureFlash:true
    }))

    app.get("/profile",isLoggedIn ,(req,res)=>{
        res.render("profile",{
            user:req.user
        })
    })

    app.get("/logout",(req,res)=>{
        req.logout()
        res.redirect("/")
    })

    app.post("/login",passport.authenticate("local-login",{
        successRedirect: "/profile",
        failureRedirect: "/login",
        failureFlash:true
    }))

    function isLoggedIn(req,res,next){
        if(req.isAuthenticated()){
            return next()
        }
        return res.redirect("/")
    }
    
}