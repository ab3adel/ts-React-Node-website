
import express, {Request,Response} from 'express'
const routes= express()
import { connectDb }from './db'
import  passport  from 'passport'
require('dotenv').config()
import jwt from 'jwt-simple'
const clintID:string = '582541430340-595h9tdr5ur6chq8cfn0p53nho0saikb.apps.googleusercontent.com'
const clientSecret:string= "gYW-rZ_clHMdTG8nIjnfsBFL"
let jwtToken:string;
let userName:string;
let role:string;
const GoogleStrategy =require('passport-google-oauth20').Strategy

passport.use(new GoogleStrategy({
    clientID:clintID,
    clientSecret:clientSecret,
    callbackURL:"http://localhost:9000/google/callback"
},async function(accessToken:string,refreshtoken:string,profile:any,cb:Function){
     const  User = await connectDb()
    await User.updateOne({googleID:profile.id},{$set:{userName:profile.displayName,email:profile._json.email,role:'admin'}},{upsert:true})
   let result= await  User.find({userName:profile.displayName}).toArray()
   userName=result[0].userName
   role=result[0].role
  
   
    return cb(null,[userName,role])
})
)

routes.get ('/auth',passport.authenticate('google',{scope:['profile','email'],session:false}))
routes.get ('/callback',passport.authenticate('google',{failureRedirect:'/auth'}),function(req:Request,res:Response){
 req.session.user=userName
 req.session.role=role
   res.cookie('role',role) 
   res.cookie('user',userName)

     res.redirect('/')
})

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(id,  cb) {
    cb(null, {id: id});
});
routes.get('/success',(req:Request,res:Response)=>{
    if (req.session.user)
  { 
  

      
      res.status(200).send(JSON.stringify({user:req.session.user,role:req.session.role}))
     
      return
}
res.status(401).send()
  
    })
routes.post('/bearer',async (req:Request,res:Response)=>{
    console.log(req.sessionID)
})    
export default  routes