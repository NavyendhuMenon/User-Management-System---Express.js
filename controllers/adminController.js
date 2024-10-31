const user = require("../Models/employeeModel")




const adminLogin= async (req,res)=>{
    

    try{
        const{email,password}= req.body;
        const admin= await user.findOne({email,password, is_admin: true})

      if (admin){
        req.session.admin= admin._id;
        res.render('adminDash')

      }else{
        res.redirect('/admin/login?error=1')
      }

    }catch(error){
        console.error(error)
        res.redirect('/admin/login?error=1')
    }

}
const adminLogout = (req, res) => {
    
    req.session.admin = null;
    res.redirect('/admin/login');
};






const loadDashboard = async (req,res)=>{
 
 try{
    res.render('home');

 }catch(error){
    console.log(error.message)
 }


}


const adminHome = async(req,res)=>{
  try{

   const userData = await user.find({is_admin:false})
      res.render("adminDash",{users:userData})

  }catch(error){
      console.log(error.message);

  }
}

          
const newUserLoad = async (req, res) => {
  try {
    const user = {}; 
    res.render('create', { user }); // Pass the user object to the EJS template
  } catch (error) {
    console.log(error.message);
  }
}



const addUser=async(req,res)=>{
  try {
     const newUser=new user({
      name:req.body.name,
      email:req.body.email,
      mobile:req.body.mno,
      password:req.body.password

     })
     await  newUser.save()
     res.render('create',{newUser,message:"Added new user"})
     
  
  } catch (error) {
      console.log(error.message)
      
  }
}


const editUser = async (req,res)=>{
  try{

    const id= req.query.id;

    const userData= await user.findById({_id:id})
     
    if(userData){
    
      res.render("edit",{user:userData})
    }else{
      res.redirect('/admin/adminHome')
    }
   res.render('edit')

  }catch (error){
   console.log(error.message)
  }
}


const updateUser = async (req, res) => {
  try {
    const id = req.query.id;
    const userData = await user.findByIdAndUpdate(id, {
      $set: {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mno
      }
    });
    if (userData) {
      res.redirect('/admin/adminHome');
    } else {
      // Handle the case where no user with the given id was found
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.log(error.message);
    // Handle other potential errors, like database errors
    res.status(500).send("Internal Server Error");
  }
};


const deleteUser= async(req,res)=>{
  try {

      const id=req.query.id;
     await user.deleteOne({_id:id})
     res.redirect('/admin/adminhome');

  } catch (error) {
      console.log(error.message)
      
  }
}



module.exports={
    adminLogin,
    adminLogout,
    adminLogin,
    adminHome,
    loadDashboard,
    newUserLoad,
    addUser,
    editUser,
    updateUser,
    deleteUser
}