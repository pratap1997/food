var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Shop = require('./models/shop.js');
var Menu = require('./models/menu.js');
var Area = require('./models/area.js');
var User = require('./models/user.js');
var Rate = require('./models/rate.js');
var sendmailnow = require('./models/sendmailnow.js');

var Crypto = require('crypto');

mongoose.connect(mongodb://wmnitin:Nitin@123@ds011745.mlab.com:11745/extrameal);

	app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

router.use(function (req, res, next) {
	console.log('Something is happening');
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	next();
})


router.get('/', function (req, res) {
	res.json({ message: "Hello dude Nitinnn" });
});

router.route('/shops')
	.post(function (req, res) {
		var shop = new Shop(req.body);
		shop.save(function (err) {
			if (err) {
				return res.send(err);
			}
			res.json({ message: "Shop created" });
		})
	})

	.get(function (req, res) {
		Shop.find({}, function (err, shops) {
			if (err) {
				return res.send(err)
			}
			return res.send(shops)
		})
	})

	.put(function (req, res) {
		Shop.findById(req.body._id, function (err, shop) {
			if (err) {
				return res.send(err)
			}
			shop.shop_name = req.body.shop_name;
			shop.save(function (err) {
				if (err) {
					req.send(err)
				}
				res.json({ message: "Updated" })
			})
		})
	})

router.route('/shops/:shop_id')
	.delete(function (req, res) {
		Shop.findByIdAndRemove(req.params.shop_id, function (err) {
			if (err) {
				return res.send(err)
			}
			res.json({ message: "Shop has been removed" })
		})
	})
	.get(function (req, res) {
		Shop.find({ "_id": req.params.shop_id }, function (err, shops) {
			if (err) {
				return res.send(err)
			}
			return res.send(shops)
		})
	})

router.get('/shops/areas/:area_id', function (req, res) {
	Shop.find({ "area_id": req.params.area_id }, function (err, shops) {
		if (err) {
			return res.send(err)
		}
		return res.send(shops)
	})
})

router.get('/menus', function (req, res) {
	Menu.find({}, function (err, menus) {
		if (err) {
			return res.send(err)
		}
		return res.send(menus)
	})
})
router.get('/menus/shops/:shop_id', function (req, res) {
	Menu.find({ 'shop_id': req.params.shop_id }, function (err, menus) {
		if (err) {
			return res.send(err)
		}
		return res.send(menus)
	})
	//	Menu.findOne({'shop_id':req.params.shop_id}).sort(-'menu_price').exec(function(err,prc){
	//		return res.send(prc)
	//	})
})

router.post('/menus', function (req, res) {
	var menu = new Menu();
	menu.shop_id = req.body.shop_id,
		menu.menu_name = req.body.menu_name;
	menu.menu_desc = req.body.menu_desc,
		menu.menu_price = req.body.menu_price,
		menu.menu_type = req.body.menu_type
	menu.save(function (err) {
		if (err) {
			return res.send(err)
		}
		res.json({ message: "Menu has been added" })
	})
});

router.delete('/menus/:menu_id', function (req, res) {
	Menu.findByIdAndRemove(req.params.menu_id, function (err) {
		if (err) {
			return res.send(err)
		}
		res.json({ message: "Menu has beenn removed" })
	})
})

router.get('/areas/distinct', function (req, res) {
	Area.find({}).distinct('parent_area', function (err, areas) {
		if (err) {
			return res.send(err)
		}
		return res.send(areas)
	})
})

router.get('/areas', function (req, res) {
	Area.find({}, function (err, areas) {
		if (err) {
			return res.send(err)
		}
		return res.send(areas)
	})
})

router.get('/areas/:parent', function (req, res) {
	Area.find({ 'parent_area': req.params.parent }, function (err, areas) {
		if (err) {
			return res.send(err)
		}
		return res.send(areas)
	})
})

router.post('/areas', function (req, res) {
	var area = new Area();
	area.parent_area = req.body.parent_area,
		area.child_area = req.body.child_area
	area.save(function (err) {
		if (err) {
			return res.send(err)
		}
		res.json({ message: "Area created" })
	})
})
router.delete('/areas/:area_id', function (req, res) {
	Area.findByIdAndRemove(req.params.area_id, function (err) {
		if (err) {
			return res.send(err)
		}
		res.json({ message: "Area has beenn removed" })
	})
})

router.post('/users', function (req, res) {
	var user = new User(req.body);
	User.findOne({ 'email': req.body.email }, function (err, found) {
		if (err) {
			return res.send(err)
		}
		else if (found) {
			console.log("found ya")
			res.json({ status: "false", message: "Email is already Registered" })
		}
		else {
			user.save(function (err, userdata) {
				if (err) {
					return res.send(err)
				}
				res.json({ status: "true", message: "User Registered", realid: userdata._id })
				sendmailnow.registermail(req.body.email);
			})
		}
	})
})

router.post('/users/login', function (req, res) {
	console.log(req.body)
	User.findOne({ 'email': req.body.email }, function (err, user) {
		if (err) {
			return res.send(err)
		}
		if (user) {
			user.validPassword(req.body.password, function (resl) {
				if (resl) {
					res.json({ status: true, realid: user._id })
					sendmailnow.loginmail(req.body.email);
				} else {
					res.json({ status: false })
				}
			})
		} else {
			res.json({ status: false })
		}
	})
})

router.get('/users/:user_id', function (req, res) {
	User.findById(req.params.user_id, function (err, user) {
		if (err) {
			return res.send(err)
		}
		return res.send(user)
	})
})

router.post('/rate', function (req, res) {
	console.log(req.body)
	var rate = new Rate(req.body);
	Rate.findOne({ 'shop_id': req.body.shop_id, 'user_id': req.body.user_id }, function (err, found) {
		if (err) {
			return res.send(err)
		}
		else if (found) {
			res.json({ message: "Already rated" })
		}
		else {
			rate.save(function (err, ratedata) {
				if (err) {
					return res.send(err);
				}
				res.json({ message: "Rating Saved" })
			})
		}
	})
})

router.get('/version', function (req, res) {
	res.json({ version: "2.0.0" })
})

app.use('/api', router);

app.listen(port);
console.log("Your port is " + port);