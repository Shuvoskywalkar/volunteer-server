const express = require('express')
const app = express()
const port = 5000
require('dotenv').config()
const cors=require('cors')
const bodyParser=require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const ObjectId=require('mongodb').ObjectId
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.znbhd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

app.use(cors())
app.use(bodyParser.json())
app.get('/',(req,res)=>{
  res.send("this is five thousand")
})

const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db(process.env.DB_NAME).collection('Programs');
  const collection2 = client.db(process.env.DB_NAME).collection('RegInfo');
  //posting the Fakedata
  app.post('/PostedFakedata',(req,res)=>{
    const product=req.body
   res.send(product)
    collection.insertMany(product)
    .then(result=>{
      // console.log(result.insertedCount)
    })
  })
  ///
  app.get('/getproducts',(req,res)=>{
    collection.find({})
    .toArray((err,documents)=>{
      res.send(documents)
    })
  })

  app.post('/RegistedData',(req,res)=>{
  const information=req.body
  
  collection2.insertOne(information)
  .then(result=>{
    // console.log(result)
    res.send(result.ops)
 
  })
  
  })

  
app.get('/Collection2',(req,res)=>{
  
  // console.log()
  collection2.find({Email:req.query.Email})
  .toArray((err,documents)=>{
     res.send(documents)
  })
})

 
  app.delete('/delete/:id',(req,res)=>{
    // console.log(req.params.id)
    collection2.deleteOne({_id:ObjectId(req.params.id)})
    .then(result=>{
      
      res.send(result)
      // console.log(result)
    }
    
    )
  })

  app.get('/fetchToAdmin',(req,res)=>{
    collection2.find({})
    .toArray((err,documents)=>{
      res.send(documents)
    })
  })



  // client.close();
});




app.listen( process.env.PORT||port)