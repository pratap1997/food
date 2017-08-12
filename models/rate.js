var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var RateSchema=new Schema({
	user_id:String,
	shop_id:String,
	rating:String
});

module.exports=mongoose.model('Rate',RateSchema);