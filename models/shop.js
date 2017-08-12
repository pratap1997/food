var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var ShopSchema=new Schema({
	shop_name:{
		type:String,
		required:true,
		unique:true
	},
	shop_desc:String,
	shop_address:String,
	shop_number:String,
	shop_numbers:String,
	area_id:String,
	shop_nonveg:String,
	time:{
		type:Date,
		default:Date.now
	}
})

module.exports=mongoose.model('Shop',ShopSchema);