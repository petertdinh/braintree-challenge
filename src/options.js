export const options = (app, axios) => {
		return {
			id: "my-form",
			hostedFields: {
			  styles: {
			      // Style all elements
			      'input': {
			        'font-size': '32px',
			        'color': '#3A3A3A',
			      },

			      // Styling a specific field
			      '.number': {
			        'font-family': 'monospace'
			      },

			      // Styling element state
			      '.valid': {
			        'color': 'green'
			      },
			      '.invalid': {
			        'color': 'red'
			      },
			  },
			  number: {
			    selector: '#card-number',
			    placeholder: 'Credit Card Number'
			  },
			  cvv: {
			    selector: '#cvv',
			    placeholder: 'CVV'
			  },
			  expirationDate: {
			    selector: '#expiration-date',
			    placeholder: 'MM/YY'
			  }
			},
			onError(error) {
				app.setState({feedback: error.message});
			},
			onPaymentMethodReceived(event) {
				const { nonce } = event;
				//sending nonce to server
			  axios.post('/checkout', { nonce })
			  	.then((resp) => {
			  		if(resp.data.errors) {
			  			app.setState({feedback: `Your transaction failed for the following reason:   ${resp.data.message}`});
			  		} else {
			  			app.setState({feedback: 'Your transaction went through. WOOHOO!'});
			  		}
			  	})
			  	.catch((err) => {
			  		console.log(err);
			  	});
			}
		};
};