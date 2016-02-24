	// convert an equation to Reverse Polish Notation using the shunting-yard algorithm.

	// shunting-yard: https://en.wikipedia.org/wiki/Shunting-yard_algorithm
	// RPN: https://en.wikipedia.org/wiki/Reverse_Polish_notation

	(function() {

		var associativity = {
			left: 'left',
			right: 'right'
		};

		var operator = {
			'^': {
				precedence: 4,
				associativity: associativity.right
			},
			'*': {
				precedence: 3,
				associativity: associativity.left
			},
			'/': {
				precedence: 3,
				associativity: associativity.left
			},
			'+': {
				precedence: 2,
				associativity: associativity.left
			},
			'-': {
				precedence: 2,
				associativity: associativity.left
			}
		};

		function split(e) {
			return e.split(/\s+/);
		}

		function operatorPrecedence(value, stack) {
			if (operator[value].precedence < operator[stack].precedence) {
				// less than
				return {
					value: -1,
					associativity: operator[value].associativity
				};
			} else if (operator[value].precedence === operator[stack].precedence) {
				// equal
				return {
					value: 0,
					associativity: operator[value].associativity
				};
			} else if (operator[value].precedence > operator[stack].precedence) {
				// greater than
				return {
					value: 1,
					associativity: operator[value].associativity
				};
			}
		}

		function createRPN(equation) {
			console.log(equation);
			var a = split(equation);
			var result = [];
			var operator = [];
			a.forEach(function(v) {
				if (/\d/.test(v)) {
					result.push(v);
				} else if (/\(/.test(v)) {
					operator.push(v);
				} else if (/\)/.test(v)) {
					var op = operator.pop();
					// while not left parenthesis.
					while (!/\(/.test(op) && op !== undefined) {
						result.push(op);
						op = operator.pop();
						if (op === undefined) {
							throw new TypeError('Invalid equation: Missing left parenthesis.');
						}
					}
				} else if (/[\+\-*/\^]/.test(v)) {
					if (operator.length > 1) {
						var stack = operator.pop();
						if (/\(/.test(stack)) {
							operator.push(stack);
							operator.push(v);
						} else {
							var precedence = operatorPrecedence(v, stack);
							if (precedence.value === -1) {
								operator.push(v);
								operator.push(stack);
							} else if (precedence.value === 0) {
								if (precedence.associativity == associativity.left) {
									operator.push(v);
									result.push(stack);
								} else {
									operator.push(stack);
									operator.push(v);
								}
							} else if (precedence.value === 1) {
								operator.push(stack);
								operator.push(v);
							}
						}
					} else {
						operator.push(v);
					}
				}
			});
			var op = operator.pop();
			while (op !== undefined) {
				if (/[\(\)]/.test(op)) {
					throw new TypeError('Invalid equation: unmatched parenthesis.');
				}
				result.push(op);
				op = operator.pop();
			}
			return result;
		}

		module.exports = {
			createRPN: createRPN
		};
	})();
