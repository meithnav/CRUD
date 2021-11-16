const mongoose = require("mongoose");
// const DB_URL = "mongodb://localhost:27017/CRUD"

const DB_URL = ' mongodb+srv://meith:12345@cluster0.8dmlt.mongodb.net/CRUD?retryWrites=true&w=majority' ;

mongoose.connect(DB_URL , {
    // Use for DB
    useNewUrlParser:true,
    // useCreateIndex:true,
    useUnifiedTopology:true ,
    // useFindAndModify:false

}).then(() =>  {
    console.log(`CONNECTION SUCCESSFUL`)
}

).catch((e) => {
    console.log(`CONNECTION ERROR : ${e}`)
})
