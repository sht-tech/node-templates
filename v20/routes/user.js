const db = require('../models')
const User = db.user;
const token = require('../middleware/token')
const bcrypt = require("bcryptjs");
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
       User.find().then((data) => {
        console.log(data)
        res.status(200).send(data)
       }).catch(err => console.log(err))
      })

      app.post('/api/signin', (req,res)=> {
        User.findOne({username: req.body.username}).then( async data => {
            if(data) {
                console.log(data)
                var passwordIsValid = bcrypt.compareSync(
                    req.body.password,
                    data.password
                  );
                  if(passwordIsValid) {
                    const tokenn = await token.generateToken(data)
                    console.log(tokenn)
                    data.tokens = tokenn
                    data.save().then(() => res.send(tokenn.token)).catch(err => {console.log(err); res.send(err)})
                    
                  }
                  else {
                    res.status(300).send("incorrect password")
                  }
            }
            else {
        res.status(300).send("User not found")
            }
        })
      })

      app.post('/api/signup', (req,res)=> {
        User.findOne({username: req.body.username}).then( async data => {
            console.log(data)
            if(data) {
               res.status(300).send({message:'User already exists'})
            }
            else {
                const user = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 8),
                  })
        user.save().then(() => res.send({message: 'user registered sucessfully'}).catch(err => res.status(400).send(err)))
            }
        })
      })
}
// generateToken
