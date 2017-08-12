var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var Crypto=require('crypto');
SALT_WORK_FACTOR = 10;

var UserSchema=new Schema({
	name:String,
	email:String,
	number:String,
	password:String,
	time:{
		type:Date,
		default:Date.now
	}
})

UserSchema.pre('save', function(next) {
    var user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    user.password = Crypto.createHash('md5').update(user.password).digest('hex');
    next();
})


UserSchema.methods.validPassword = function(password, cb){
    var md5_password = Crypto.createHash('md5').update(password).digest('hex');

    console.log("password is"+md5_password);
    console.log("this.password is"+this.password);
    
    if(md5_password == this.password){
        console.log("true")
        return cb(true);
    }else{
        console.log("false")
        return cb(false);
    }
}

module.exports=mongoose.model('User',UserSchema);