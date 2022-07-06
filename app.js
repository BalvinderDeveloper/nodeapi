let express = require('express')
let app = express();
let bodyParser = require('body-parser');
let cors = require('cors');
let dotenv = require('dotenv');
dotenv.config()
let port = process.env.PORT || 9870;
let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
let mongoUrl = process.env.MongoUrl;
//    let mongoUrl =  process.env.MongoLiveUrl;
let db;
//  middleware (supporting library)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())


app.get('/', (req, res) => {
  res.send('Express server default')
})
app.get('/items/:collections', (req, res) => {
  db.collection(req.params.collections).find().toArray((err, result) => {
    if (err) throw err;
    res.send(result)
  })
})
app.get('/jewellery', (req, res) => {
  let rating = Number(req.query.rating)
  let query = {}
  if (rating) {
    query = { rating: rating }
  }
  db.collection('Jewllery').find().toArray((err, result) => {
    if (err) throw err;
    res.send(result)
  })

})

 
app.get('/details/:id', (req, res) => {
  let id = Number(req.params.id)
  db.collection('Jewllery').find({ jewel_id: id }).toArray((err, result) => {
    if (err) throw err;
    res.send(result)
  })
})
app.get('/jewellery/:id', (req, res) => {
  let id = Number(req.params.id)
  db.collection('Jewllery').find({ jewel_typeid: id }).toArray((err, result) => {
    if (err) throw err;
    res.send(result)
  })
})
app.get('/jewellery', (req, res) => {
 
  db.collection('Jewllery').find().toArray((err, result) => {
    if (err) throw err;
    res.send(result)
  })
})
app.get('/jewellery', (req, res) => {
  let jewel_type = req.query.jewel_type
  let query = {}
  if (jewel_type) {
    query = { jewel_type }
  }
  db.collection('Jewllery').find(query).toArray((err, result) => {
    if (err) throw err;
    res.send(result)
  })



})
 

app.get('/category_and_filter', (req, res) => {
  // let query = {};
  // let hcost = Number(req.query.hcost);
  query = { cost: { $lt: "20000" } }
  db.collection('Jewllery').find(query).sort({cost:1}).toArray((err, result) => {
    if (err) throw err;
    res.send(result)
  });
});
 

 
app.post('/jewelleryitem', (req, res) => {
  if (Array.isArray(req.body)) {
    db.collection('Jewllery').find({ menu_id: { $in: req.body } }).toArray((err, result) => {
      if (err) throw err;
      res.send(result)
    })
  } else {
    res.send('Invalid Input')
  }
})
app.get('/order', (req, res) => {
  let email = req.query.email
  let query = {}
  if (email) {
    query = { email }
  }
  db.collection('order').find(query).toArray((err, result) => {
    if (err) throw err;
    res.send(result)
  })



})
app.post('/placeorder', (req, res) => {
  console.log(req.body)
  db.collection('order').insert(req.body, (err, result) => {
    if (err) throw err;
    res.send(result)
  }
  )

})

app.put('/updateOrder/:id', (req, res) => {


  let oid = Number(req.params.id);
  db.collection('order').updateOne(
    { orderId: oid },
    {
      $set: {
        "status": req.body.status,
        "bank_name": req.body.bank_name,
        "date": req.body.date
      }
    }, (err, result) => {
      if (err) throw err;
      res.send('Order Updated')
    }
  )
})
app.get('/cart', (req, res) => {
  db.collection('Cart').find().toArray((err, result) => {
    if (err) throw err;
    res.send(result)
  })

})

app.delete('/deleteOrder/:id', (req, res) => {
  let oid = mongo.ObjectId(req.params.id)
  db.collection('order').remove({ _id: oid }, (err, result) => {
    if (err) throw err;
    res.send('Order Deleted')
  })
})
 

MongoClient.connect(mongoUrl, (err, client) => {
  if (err) console.log('Error While  Connecting');
  db = client.db('datanishq');
  // db = client.db('tanishq');
  app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Express Server Listening on Port ${port}`)
  })
}
)
 