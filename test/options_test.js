import { options } from '../src/options';
import { expect } from 'chai';

describe('options', () => {
	it('is a function', () => {
		const optionsType = typeof options;
		expect(optionsType).to.equal('function');
	});

	it('returns an object', () => {
		expect(options()).to.be.an('object');
	});

	it('has a hostedFields property', () => {
		expect(options()).to.include.keys('hostedFields');
	});

	it('handles errors', () => {
		expect(options()).to.include.keys('onError');
	});

	it('handles successful events', () => {
		expect(options()).to.include.keys('onPaymentMethodReceived');
	})
})