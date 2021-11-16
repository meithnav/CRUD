require('./db/conn') ;
const express = require("express") ;
// var bodyParser = require('body-parser');
const Router = require('./route/router');
const Student = require('./models/Student') ;
const path = require("path") ;
const hbs = require("hbs") ;
const app = express() ;


// This is IMP for passing of data through form 
app.use(express.json());
app.use(Router);
// app.use(express.urlencoded());



const PORT = process.env.PORT || 3000;
const static_path = path.join(__dirname , "../public")
const partialsPath = path.join(__dirname , "../views/partials")
const templatePath = path.join(__dirname , "../views/templates")

// PATH
app.use(express.static(static_path))
app.set("view engine" , "hbs") ;
app.set("views" , templatePath) ;
hbs.registerPartials(partialsPath) ;


app.listen(PORT , () => {console.log(`Listening to PORT ${PORT}`)}) ;
