const db = require('../models')
const User = db.user;


module.exports = function(app) {
    app.use((req, res, next) => {
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, Content-Type, Accept"
        );
        next();
      });
      app.get('/test',async (req,res) =>{
        console.log('working')
       let data = await  User.find()
       console.log(data)
        res.send("200")
      })
}