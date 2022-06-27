let express = require('express')
let app = express();
 let bodyParser =require('body-parser');
 let cors = require('cors');
 let dotenv = require('dotenv');
 dotenv.config()
 let port = process.env.PORT || 9870;
 let mongo = require('mongodb');
 let MongoClient = mongo.MongoClient;
    // let mongoUrl =  process.env.MongoUrl;
 let mongoUrl =  process.env.MongoLiveUrl;
 let db ;
//  middleware (supporting lib)
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())


app.get('/',(req, res) => {
    res.send('Express server default')
})
app.get('/items/:collections',(req,res) =>{
    db.collection(req.params.collections).find().toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})
app.get('/location',(req, res) => {
  db.collection('location').find().toArray((err,result) => {
         if(err) throw err;
         res.send(result)
     })
 
})

app.get('/mealtype',(req, res) => {
    db.collection('mealtype').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })

})

app.get('/jewel',(req, res) => {
    let JewelShopid  = Number(req.query.JewelShopid)
    let query = {}
    if(JewelShopid){
        query ={JewelShop_id:JewelShopid}
    }
        db.collection('jewel').find(query).toArray((err,result) => {
            if(err) throw err;
            res.send(result)
        })
    


})
app.get('/orders',(req, res) => {
    let email = Number(req.query.email)
    let query = {}
    if(email){
        query ={email}
    }
        db.collection('orders').find(query).toArray((err,result) => {
            if(err) throw err;
            res.send(result)
        })
    


})
app.post('/placeorder',(req, res) =>{
     db.collection('orders').insert(req.body,(err,result) =>{
        if(err) throw err;
        res.send(result)
     }
     )
    console.log(req.body)
    res.send('ok')
})
app.get('/get',(req, res) => {
    res.send('Uttamnagar')
})

MongoClient.connect(mongoUrl,(err,client) =>{
    if (err) console.log('Error While  Connecting');
    db = client.db('tanishq');
    // db = client.db('tanishq');
    app.listen(port,(err) => {
        if(err) throw err;
        console.log(`Express Server Listening on Port 9870 ${port}`)
    })
}
)

/*app.get('/location/:id',(req, res) => {
    let id =req.params.id;
    let state = req.query.state
    let country = req.query.country
    console.log('>>>>>>>>>state>>>>>>>>>>',state)
    console.log('>>>>>>>>>country>>>>>>>>>>',country)
    
    res.send(id)
    
    // db.collection('location').find().toArray((err,result) => {
    //      if(err) throw err;
    //      res.send(result)
    //  })

})
authentication
let authkey ="basic9a09b4dfda82e3e665e31092d1c3ec8d"
function auth(key){
    if (authkey === key){
        return true 

    }else{
        return false
    }

}
app.get('/location',(req, res) => {
    // let key = req.query.key;
    let key = req.header('x-basic-author')
    if (authkey === key){
  db.collection('location').find().toArray((err,result) => {
         if(err) throw err;
         res.send(result)
     })
    }
    else{
        res.send("Unauthorised")
    }

})

app.get('/mealtype',(req, res) => {
    db.collection('mealtype').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })

})

app.get('/menu',(req, res) => {
    if (auth(req.header('x-basic-author'))){
        db.collection('menu').find().toArray((err,result) => {
            if(err) throw err;
            res.send(result)
        })
    }else{   res.send("Unauthorised")}


})
*/ 
