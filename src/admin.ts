import bodyParser from 'body-parser'
import Router,{Request,Response} from 'express'
import {insertUpdate,deleteProduct} from './resolvers'
const admin = Router()


admin.post('/Inproducts',async (req:Request,res:Response)=>{
       
      console.log('in')
       if (req.session.role === 'admin')
    {
        
        
        let query = {title:req.body.title,description:req.body.description,
                 price:req.body.price,category:req.body.cat,img:req.file.originalname}
         
  await  insertUpdate({},query)

return
    }

return res.status(401).send()

})
admin.post('/deleteProducts',async (req:Request,res:Response)=>{
    
    if (req.session.role === 'admin'){
    
        let query :{title:string}={title:req.body.title}
        await deleteProduct({},query)
    }
    else {
        res.status(401).send()
    }
})
export =admin