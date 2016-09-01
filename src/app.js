import React, { Component } from 'react';
import braintree from 'braintree-web';
import axios from 'axios';
import { options } from './options';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = { token: "", formLoaded: false, feedback: "" };
	}

	componentWillMount() {
		//requesting client token from server
		axios.get('/client_token')
			.then(resp => this.setState({token: resp.data}));
	}

	componentDidUpdate() {
		if(!this.state.formLoaded){
			this.initPayments();
		}
	}

	initPayments() {
		braintree.setup(this.state.token, "custom", options(this, axios));
		this.setState({formLoaded: true});
	}

  render() {
  	if(!this.state.formLoaded) {
  		return <div>Loading...</div>
  	}

    return (
      <div>
      	<form id="my-form">
      		<div id="number-container">
      	  	<div id="card-number"/>
      	  </div>
      	  <div id="cvv-expiration-container">
	      	  <div id="cvv"/>
	      	  <div id="expiration-date"/>
      	  </div>
      	  <input type="submit" value="Pay" />
      	  <div>{this.state.feedback ? <div>{this.state.feedback}</div> : <div></div>}</div>
      	</form>
      </div>
    );
  }
}
