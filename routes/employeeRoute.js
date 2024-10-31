const express= require("express")
const userRoute = express()
const path= require ("path")
const bodyParser=require("body-parser")
const session=require ('express-session')

const config = require("../config/config")
userRoute.use(session({secret:config.sessionSecret}))

const auth = require ("../middlewares/auth")


userRoute.use(bodyParser.json());
userRoute.use(bodyParser.urlencoded({extended:true}))

userRoute.set('view engine','ejs');
userRoute.set('views',path.join(__dirname,"../view/User"))


const userController= require("../controllers/employeeController")

userRoute.get('/register',auth.isLogout,userController.loadRegister)

userRoute.get('/', auth.isLog ,userController.userLogin)
userRoute.get('/login',auth.isLog,userController.userLogin)
userRoute.post('/login',userController.verifyLogin)
userRoute.get('/home',auth.isLogin,userController.loadHome)
userRoute.get('/logout',auth.isLogout,userController.logout)

module.exports= userRoute

