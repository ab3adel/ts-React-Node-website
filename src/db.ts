const {MongoClient}= require('mongodb')

export async function  connectDb(){
    const client =new MongoClient('mongodb://localhost:27017/auth',{useUnifiedTopology:true})
    client.connect()
const db = client.db()
const collection = await db.collection('User')
return collection

}
