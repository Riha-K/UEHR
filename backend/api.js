const express = require('express')
const dbConnect = require('./mongodb')
const cors = require('cors');
const app = express()
app.use(cors());
app.use(express.json());
const port = 5001

app.post('/',async (req,resp)=>{
  try {
    let data = await dbConnect();
    console.log('You are inside post /');
    let result = await data.insertOne(req.body);
    resp.send(result);
  } catch (error) {
    console.error(error);
    resp.status(500).send('Internal Server Error');
  }
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
// const express = require('express');
// const dbConnect = require('./mongodb');
// const cors = require('cors');
// const app = express();
// app.use(cors());
// app.use(express.json());
// const port = 5001;

// // Define a route to handle GET requests to the root path
// app.get('/', (req, resp) => {
//   resp.send('Hello, this is the root route!');
// });

// // Define a route to handle POST requests to the root path
// app.post('/', async (req, resp) => {
//   try {
//     const data = await dbConnect();
//     const result = await data.insertOne(req.body);
//     resp.send(result);
//   } catch (error) {
//     resp.status(500).send('Internal Server Error');
//   }
// });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
