var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var MenuSchema=new Schema({
	shop_id:String,
	menu_name:String,
	menu_desc:String,
	menu_price:String,
	menu_type:String,
	time:{
		type:Date,
		default:Date.now
	}
})

module.exports=mongoose.model('Menu', MenuSchema);