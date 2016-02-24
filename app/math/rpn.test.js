var test = require('tape');
var rpn = require('./rpn');

// For online RPN calculator See:
// http://www.meta-calculator.com/learning-lab/reverse-polish-notation-calculator.php

test('missing equation', function(t) {

	try {
		rpn.compute(undefined);
		t.fail('should catch thrown error.');
	} catch (e) {
		t.ok(true);
	}

	try {
		rpn.compute();
		t.fail('should catch thrown error.');
	} catch (e) {
		t.ok(true);
	}
	t.end();
});

test('rpn power', function(t) {

	t.equal(rpn.compute('2 ^ 2'), 4);
	t.end();

});

test('rpn multiplication', function(t) {

	t.equal(rpn.compute('2 * 3'), 6);
	t.end();

});

test('rpn division', function(t) {

	t.equal(rpn.compute('6 / 3'), 2);
	t.end();

});

test('rpn addition', function(t) {

	t.equal(rpn.compute('6 + 3'), 9);
	t.end();

});

test('rpn subtraction', function(t) {

	t.equal(rpn.compute('9 - 3'), 6);
	t.end();

});

test('rpn complex', function(t) {

	t.equal(rpn.compute('2 + 2 * 5 / 2 - 2 + 2 ^ 2'), 9.5);
	t.end();

});

test('rpn complex', function(t) {

	t.equal(rpn.compute('( 2 + 2 ) * 5 / 2 - 2 + 2 ^ 2'), 10);
	t.end();

});

test('rpn complex', function(t) {

	t.equal(rpn.compute('( 2 * 5 + 4 ) / ( 3 * 2 + 1 )'), 4.4);
	t.end();

});
