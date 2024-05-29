var express = require('express');
var router = express.Router();
const userModel = require("./users");
const localStrategy =require("passport-local");
const passport = require('passport');
passport.use(new localStrategy(userModel.authenticate()));
/* GET home page. */
router.get('/', function(req, res, ) {
  res.render('index', );
});
//profile
router.get('/profile',isLoggedIn, function(req,res)
{
  res.render('profile')
});

//login
router.post('/login',passport.authenticate("local",
{successRedirect:"/profile",
failureRedirect:'/'}),function(req,res){})

//logout
router.get('/logout',function(req,res,next)
{ req.logout(function(err){
  if(err){return next(err);}
  res.redirect('/');
});
});

  //  register route
router.post('/register',function(req,res)
{
    var userdata=new userModel({
      username:req.body.username,
      secret:req.body.secret
    });

userModel.register(userdata,req.body.password)
.then(function(registerduser){
  passport.authenticate('local')(req,res,function(){
    res.redirect('/profile');
  })
})
});

//is loggedin middleware protection
function isLoggedIn(req,res,next)
{
  if(req.isAuthenticated())   //login ho to next nahi toh home page jau
    {
      return next();
    }
    res.redirect('/');
}



// router.get('/create', async function(req, res) {
//   let userdata = await userModel.create({
//     username: "krishsdabha",
//     nickname: "KrishzCCXsjdhskahcdvvd",
//     description: "tomorsadhgsadbrow 8pm meeting",
//     categories: ['javadsa', 'nodejs', 'react', 'gssap', 'modern animations'],
//     datecreated: Date.now() 
//   });
//   res.send(userdata);
// });
// router.get('/find',async function(req,res)   //case insensetive search in mongoose
// {
//   var regex = new RegExp("^Krish$", 'i');   //^ this is used for starting and $ ending exact match milega isse
//   let user = await userModel.find({username:regex});
//   res.send(user);
// });

// router.get('/find',async function(req,res)     //it find all documents where array field contains all of a set
// {
//   let user = await userModel.find({categories:{$all: ["javadsa"]}});
//   res.send(user);
// });


// router.get('/find',async function(req,res) //seqarch documents with specific date range in mongoose
// {
//   var date1 = new Date('2024-05-28');
//   var date2 = new Date('2024-05-29');
//   let user = await userModel.find({datecreated: {$gte: date1, $lte: date2}})

//   res.send(user);
// });

// router.get('/find',async function(req,res)  //filter documnets based on existence of a field 
// {
//   let user = await userModel.find({categories:{$exists: true}});
//   res.send(user);
// })

// router.get('/find',async function(req,res)  //filter documnets based on specific field length in mongoose
// {
//   let user = await userModel.find({$expr:{$and:[{$gte:[{$strLenCP: '$nickname'},0] },
//   {$lte: [{$strLenCP:'$nickname'},122]}]}
// });
//   res.send(user);
// })

// router.get('/failed',function(req,res) //create flash 
// //flash is used for to use the exsiting data to another route
// {
//     req.flash("age",25);
//     req.flash("name","krishna")
//     res.send("Flash created")
// });
// router.get('/check',function(req,res)
// {
//   console.log(req.flash("age"),req.flash("name")); //to read the data from flash
//   res.send("check on terminal")
// })

module.exports = router;
