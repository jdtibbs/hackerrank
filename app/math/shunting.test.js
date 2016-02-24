var test = require('tape');
var shunting = require('./shunting');

test('addition', function(t) {
	t.plan(1);

	var r = ['1', '2', '+'];
	t.deepEqual(shunting.createRPN('1 + 2'), r);

});

test('addition & multiplication', function(t) {
	t.plan(1);

	var r = ['1', '2', '4', '*', '+'];
	t.deepEqual(shunting.createRPN('1 + 2 * 4'), r);

});

test('addition & multiplication w ()', function(t) {
	t.plan(1);

	var r = ['1', '2', '+', '4', '*'];
	t.deepEqual(shunting.createRPN('( 1 + 2 ) * 4'), r);

});

test('missing left parenthesis', function(t) {
	t.plan(1);

	try {
		shunting.createRPN('1 + 2 ) * 4');
		t.fail('should catch thrown error.');
	} catch (e) {
		t.ok(true);
	}
});

test('unmatched parenthesis', function(t) {
	t.plan(1);

	try {
		shunting.createRPN('( 1 + 2 * 4');
		t.fail('should catch thrown error.');
	} catch (e) {
		t.ok(true);
	}
});

test('everything', function(t) {
	t.plan(1);

	var r = ['3', '4', '2', '*', '1', '5', '-', '2', '3', '^', '^', '/', '+'];
	t.deepEqual(shunting.createRPN('3 + 4 * 2 / ( 1 - 5 ) ^ 2 ^ 3'), r);

});
