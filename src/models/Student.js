const mongoose = require("mongoose") ;
const {isEmail} =  require("validator")
const bcrypt = require("bcryptjs") ;
const jwt = require("jsonwebtoken") ;
const { truncate } = require("fs");

const StudentSchema = new  mongoose.Schema({
    name:{
        type:String,
        require:true,
        unique:[true, "Username already taken"]
    },
    // email:{
    //     type:String,
    //     require:true,
    //     unique:[isEmail , "Incorrect Email"]
    // },
    password:{
        type:String,
        require:true,
        // minlength:[4 , "Password too short!!"]
    },
    cpassword:{
        type:String,
        require:true,
        // minlength:[4 , "Password too short!!"]
    },
    tokens:[{
            token:{
                type:String,
                required:true
            }
    }]
});

StudentSchema.pre('save' , async function(next){

    if(this.isModified('password')){
        console.log(`Bcrypted Password.`)
        this.password = await bcrypt.hash( this.password , 12);
        this.cpassword = undefined;
    }
    next() ;

});

StudentSchema.methods.generateAuthToken = async function(){

    try{
        const SCERET_KEY = "324354565464534JFNJWKJF23433e3sdcsdDSGEBBDBDBDBLIWKNOIWRWR45SEGAFK23GSHe"
        let curToken = jwt.sign({id:this._id } , SCERET_KEY) ;
        this.tokens = this.tokens.concat({token:curToken}) ;
        console.log(`JWT : ${curToken}`) ;
        await this.save() ;
        return curToken ;
    }catch(e){
        console.log(`JWT ERROR : ${e}`) ;
    }
    
}


const Student =new mongoose.model("Student" , StudentSchema ) ;
module.exports = Student ;