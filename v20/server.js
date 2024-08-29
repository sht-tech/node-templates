const express = require('express')
const app = express()
const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// const db = require



require('./routes/user.js')(app)
const db = require("./models");
db.mongoose.connect('mongodb+srv://trinetech3:qGyTJqbvJzhCDg5f@trine.puklq.mongodb.net/?ssl=true&replicaSet=atlas-10nh35-shard-0&authSource=admin&retryWrites=true&w=majority&appName=trine,').then(() => {
    console.log("Successfully connect to MongoDB.");
    // initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });



app.listen(3000, ()=>console.log('running...'))