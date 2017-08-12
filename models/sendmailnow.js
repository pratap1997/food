var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport( {
	service:  'Mailgun',
	auth: {
		user: 'postmaster@mg.extrameal.in',
		pass: 'Extra@123'   
		}
});

module.exports={
	registermail:function(recemail){		
            	var mailOptions = {
				    from: '"ExtraMeal Support ✔" <support@extrameal.in>', // sender address
				    to: recemail, // list of receivers
				    bcc: 'wmnitin@gmail.com',
				    subject: 'Welcome to ExtraMeal', // Subject line
				    text: 'use HTML version to view this mail', // plaintext body
				    html: '<p>Hello '+recemail+',<br/>Thank you for your registartion on ExtraMeal app.</p><p>As you people already know how much some food delivery tycoons like Foodpanda, Swiggy, TinyOwl etc are earning by increasing the price of your meal, by applying extra tax, service tax etc. <br/><br/>Do not worry we are here to solve your problems. How ? By simply providing you to access to make a call & order your food directly from seller.<br/><br/>This is just a starting.<br/>Regards,<br/>ExtraMeal Support</p>' // html body
				};
				transporter.sendMail(mailOptions, function(error, info){
			    if(error){
			        return console.log(error);
			    }
			    console.log('Message sent: ' + info.response);
			    });
	},
	loginmail:function(recemail){
	        	var mailOptions = {
				    from: '"ExtraMeal Support ✔" <support@extrameal.in>', // sender address
				    to: 'wmnitin@gmail.com',
				    subject: 'ExtraMeal Khabri', // Subject line
				    text: 'use HTML version to view this mail', // plaintext body
				    html: '<p>Hey Nitin, <br/><br/>I am your khabri & here to let you know that, emailid: '+recemail+' is using your extrameal app. <br/><br/>Thank me later :D Byee<br/><br/>Regards,<br/>ExtraMeal Khabri' // html body
				};
				transporter.sendMail(mailOptions, function(error, info){
			    if(error){
			        return console.log(error);
			    }
			    console.log('Message sent: ' + info.response);
			    });
	}
}