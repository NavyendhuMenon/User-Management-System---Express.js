const adminLogin = async (req,res,next)=>{
    try{
        if (req.session && req.session.isAdmin){
            next()
        }else{
         res.redirect('/login')
        // res.status(403).send('Forbidden');
        }
    }catch(error){
        console.error(error.message)
    }
};

const adminLogout= async(req,res,next)=>{
    try{
        if(req.session.isAdmin){
            res.redirect('/home')
            return
        }
        next()
  
    }catch(error){
      console.log(error.message)
    }
  
  }


module.exports={
    adminLogin,
    adminLogout
}