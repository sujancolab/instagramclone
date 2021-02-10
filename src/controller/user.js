const User=require('../models/user');
const jwt =require('jsonwebtoken');
exports.signup=(req,res)=>{
    User.findOne({userEmail:req.body.email})
    .exec((error,user)=>{
        if(user) return res.status(400).json({
            message:"User not found"
        });
        const {userEmail,userPassword}=req.body;
        const _user=new User({
            userEmail:userEmail,
            userPassword:userPassword,
            userName:Math.random().toString(),
            role:'user'
        });
        _user.save((error,data)=>{
            if(error) {
                return res.status(400).json({
                    message:error.message//'Something went wrong'
                });
            }
            if(data){
                return res.status(201).json({
                    message:'User Created successfully'
                })
            }
        });

    });
}

exports.signin=(req, res)=>{
    User.findOne({userEmail:req.body.email})
    .exec((error,user)=>{
        if(error) return res.status(400).json({error});
        if(user){
            if(user.authenticate(req.body.password)){
                const token=jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'1h'});
                const {_id,userName,userFullName,userEmail} =user;
                res.status(200).json({
                    token,
                    rescode:'200',
                    user:{
                        _id,userName,userFullName,userEmail
                    }
                
                });
            }else{
                return res.status(400).json({
                    message: 'Invalid Password'
                });
            }
        }else{
            return res.status(400).json({message:'Something went wrong'});
        }
    });
}

exports.requireSignin=(req, res,next)=>{
    const token =req.headers.authorization.split(' ')[1];
    const user=jwt.verify(token,process.env.JWT_SECRET);
    req.user=user;
    next();
    //jwt.decode()
}

exports.profile=(req,res)=>{
    return res.status(200).json({user:'profile'})
}