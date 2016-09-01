const braintree = require("braintree");

const gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "2d89mfh7ngrtsyzm",
  publicKey: "gx7wgzp45rm7h6w7",
  privateKey: "ecb6e9053052bb0adb717b83110d3142"
});

module.exports = {
	gateway: gateway
}