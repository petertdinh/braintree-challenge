const path = require('path');
const BrainTree = require('./braintree_helper');

module.exports = function(app) {

	app.get('/', function(req, res) {
	  res.sendFile(path.resolve(__dirname + '/../index.html'));
	});

	app.get('/bundle.js', function(req, res) {
	  res.sendFile(path.resolve(__dirname + '/../bundle.js'));
	});

	app.get('/style/style.css', function(req, res) {
		res.sendFile(path.resolve(__dirname + '/../style/style.css'));
	});

	app.get('/client_token', function (req, res) {
  	BrainTree.gateway.clientToken.generate({}, function (err, response) {
    	res.send(response.clientToken);
  });

  app.post('/checkout', function(req, res) {
  	//storing payment method in vault
  	BrainTree.gateway.paymentMethod.create({
  		customerId: '65767298',
  		paymentMethodNonce: req.body.nonce
  	}, function(err, results) {
  		if(err){
  			res.status(500);
  			res.render('error', { error: err });
  		} else {
  	//using payment to pay for transaction
			BrainTree.gateway.transaction.sale({
				paymentMethodToken: results.creditCard.token,
				amount: "10.00",
				options: {
					submitForSettlement: true
				}, 
			}, function(err, results) {
				if(err) {
					res.status(500);
					res.render('error', { error: err });
				} else {
					res.status(201).send(results);
				}
			})
  		}
  	})
  });
});
}