const User = require ("../Models/employeeModel")
const { render } = require("../routes/employeeRoute")


const loadRegister= async(req,res)=>{
    try{
        res.render('registration')

    }catch{
        console.log("error.message")
    }
}


const registerUser= async(req,res)=>{
    try{

        const employee= new User({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mno,
        password:req.body.password

        })

        const result = await employee.save() 
       
        if (result){
            res.render("registration",{message:"Registered sucessfully"})
        }else{
            res.render("registration",{message:"Registration Failed"})
        }
        
    }catch (error){

        console.log("Error in registerUser:", error.message);
        res.status(500).send("Internal server error");

    }
}

// User Login

const userLogin= async(req,res)=>{
    try{
        res.render("login")

    }catch(error){
        console.log(error.message);

    }
}

const verifyLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const userData = await User.findOne({ email });

        if (userData) {
            // provided password matches the stored password
            if (password === userData.password) {
                
                // if the user is an admin
                if (userData.is_admin) {
                    req.session.isAdmin=true;
                    // If, redirect to admin dashboard
                    res.redirect('admin/adminHome');
                    
                } else {
                req.session.userId= userData._id;
                    // If not an admin, redirect to user dashboard
                    res.redirect('/home');
                }
            } else {
                // Incorrect password
                res.render('login', { message: "Incorrect Password!!!" });
            }
        } else {
            // No user found with the provided email
            res.render('login', { message: "Incorrect Email or Password!!!" });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
}




const loadHome= async(req,res)=>{
   try{
console.log('render-home')

    res.render('home')
   }catch(error){
    console.log(error.message)
   }
}

const logout= async(req,res)=>{
    try{
        res.redirect("/")
        req.session.destroy()

    }catch(error){
        console.log(error.message)
        res.status(500).send("Internal Server Error");
    }
}


const userSignUP= async(req,res)=>{
    try{

        res.render("register")

    }catch(error){
        console.log(error.message);

    }
}






module.exports={
    loadRegister,
    registerUser,
    userLogin,
    verifyLogin,
    loadHome,
    logout,
    userSignUP,
   
}