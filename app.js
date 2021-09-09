const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')
const app = express();
const mongoose =  require('mongoose');

var nodemailer = require('nodemailer');
// const session = require('express-session');
// const passport = require('passport');
// const passportLocalMongoose = require('passport-local-mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

app.use(bodyParser.urlencoded({ extended: false }))
const { name } = require("ejs")
app.set('view engine','ejs');
app.use(express.static('public'));
// app.use(express.json())
// app.use(session({
//   secret:'this is a secret message',
//   resave:false,
//   saveUninitialized:false
// }));
// app.use(passport.initialize());
// app.use(passport.session())
mongoose.connect("mongodb://localhost:27017/eCommerceDB",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
}).then(()=>{
    console.log(`Connected to DB successfully`)
}).catch(()=>{
    console.log('did not connect')
});

const eCommerceSchema = new mongoose.Schema({
  
  email: {
    type: String,
    required:'please enter your email',
    unique:true
 
  },
 name: {
    type: String,
    required:'enter your name',
 },
  password: {
     type:String,
     required:true
  },  

});

// eCommerceSchema.plugin(passportLocalMongoose);
const User = mongoose.model("Regpeople",eCommerceSchema);

// passport.use(User.createStrategy());

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

app.get('/', (req, res) => {
    res.render('login', {bodyPara: 'how are you'});
  });

  app.get("/signup",(req,res)=>{
    res.render("signup")
  })
app.get("/home",(req,res)=>{
  // if(req.isAuthenticated()){
    res.render('home')
// }else{
//     res.redirect('/signup')
// }
})


  app.post("/signup", async(req,res)=>{
    try{

     const  password =  req.body.password
     const email =  req.body.email;
     const name = req.body.name;
     
     console.log(email)

      bcrypt.hash(password,saltRounds,(err,hash)=>{
        const registerPeople = new User ({ 
          email: email,
          name : name,
          password : hash
        });
     
     registerPeople.save((err, done) => {
       if(err) {
        console.log('Error occurred', err);

        if(err.code == 11000) {

          res.send({ msg: "Email already exists" , code:0}) 
        } 

        res.send({ msg: "Please enter all the" , code:0}) 

         
       } else {
         console.log('User saved successfully');

         res.send({ msg: "ok" , code:1}) 
       }
     });
     
        // res.send({ msg: "ok" , code:1}) 
      })

  }

// User.register({username:email,name:name},req.body.password,(err,user)=>{
//   if(err){
//       console.log(err);
//       res.send({
//         msg:'not ok',code:0
//       })
//   }else{
//       passport.authenticate('local')(req,res,()=>{
//           // res.redirect('/secrets')
         
//             res.redirect('/home')
        
//       })
//   }
// })


catch(err){
    
    console.log("error occured", err)
    res.send({ msg: "not ok" , code:0})

  }

  })

   app.post("/", async(req,res)=>{

    // // try{
    //  const email = req.body.email;
    //  const password = req.body.password;
    //  console.log(email,password);
      
    // // //  const userEmail = await registered.findOne({Email:email});
    // //  const user = await registered.findOne({Email:email})

    // //  if(user == null) {
    // //    res.send({ msg: 'Email/Password does not exist', code: 0})
    // //  } else {
    // //   let bPassword = user.Password;
    // //   let bEmail = user.Email;
    // //   console.log(bPassword);
    // //   console.log(bEmail)

    // //   if( bPassword === password){
    // //   res.send({code:1}) ;
       
    // //   } else{
       
    // //       res.send({ msg: "Please check ur email/password" , code: 0});
    // //    }

    // //  }

    // // }catch(err){
    // //   console.log("Error occurred", err);
    // // }

//     const user = new User ({
//       username: email,
//       password:password
//   })
//   req.login(user,(err)=>{
//    if(err){
//        console.log(err)
//        res.render('login')
//    }else{
//     passport.authenticate('local')(req,res,()=>{
//     res.redirect('/secrets')
//     })
// }
  
//   })


   });

   app.post("/home",(req,res)=>{
     const getInput = req.body.input;
     if(getInput === "hi"){
       res.render("login")
     }
   })
  

   // webtoken part 

  //  const createToken = async()=>{
  //    const token =  await jwt.sign({_id:"610b5195777c8e3e54367e8f"},"helloimdedipyamanbanerjeeabiggnerwebdeveloper", {expiresIn: "10 seconds"})
  //      console.log(token)
  //    const userVer = await jwt.verify(token , "helloimdedipyamanbanerjeeabiggnerwebdeveloper")
  //    console.log(userVer)
  //   }

  //   createToken()


app.listen(3000,()=>{
    console.log("server is running on port 3000")
})