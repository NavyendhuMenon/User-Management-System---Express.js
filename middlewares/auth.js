const isLogin= async(req,res,next)=>{
  try{
    if(req.session && req.session.userId){

      next()

    }else{
        res.redirect('/login')
    }
    
  }catch(error){
    console.log(error.message)
  }

}

const isLogout= async(req,res,next)=>{
    try{
        if(req.session.userId){
            res.redirect('/home')
            return
        }
        next()
  
    }catch(error){
      console.log(error.message)
    }
  
  }

  const isLog= async(req,res,next)=>{
    try{
        if(req.session.userId || req.session.isAdmin ){
          if(req.session.userId){
            res.redirect('/home')
          } else {
            res.redirect('/admin/adminHome')
          }
        } else{

          next()
        }
  
    }catch(error){
      console.log(error.message)
    }
  }

  module.exports={
    isLogin,
    isLogout,
    isLog
  }
  

