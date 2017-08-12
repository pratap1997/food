var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var AreaSchema=new Schema({
	parent_area:String,
	child_area:String
})

module.exports=mongoose.model('Area', AreaSchema)