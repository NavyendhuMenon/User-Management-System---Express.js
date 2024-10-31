const express= require("express")
const adminRoute = express()
const path= require ("path")
const bodyParser=require("body-parser")
const session=require ('express-session')

const config = require("../config/config")
adminRoute.use(session({secret:config.sessionSecret}))


adminRoute.use(bodyParser.json());
adminRoute.use(bodyParser.urlencoded({extended:true}))

adminRoute.set('view engine','ejs');
adminRoute.set('views',path.join(__dirname,"../view/admin"))

const adminController= require("../controllers/adminController")
const  adminauth = require("../middlewares/adminauth")

adminRoute.get('/adminhome',adminauth.adminLogin,adminController.adminHome )

adminRoute.get('/create',adminauth.adminLogin,adminController.newUserLoad)
adminRoute.post('/create', adminController.addUser);

adminRoute.get('/edit',adminauth.adminLogin, adminController.editUser )
adminRoute.post('/edit',adminController.updateUser)

adminRoute.get('/delete',adminController.deleteUser)

adminRoute.use('/home',adminauth.adminLogout,adminController.loadDashboard)

module.exports= adminRoute