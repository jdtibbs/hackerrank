var shunting = require('./shunting');

// Evaluate an equation using Reverse Polish Notation.

(function() {

  var calc = {
    '^': function(n1, n2) {
      return Math.pow(n1, n2);
    },
    '*': function(n1, n2) {
      return n1 * n2;
    },
    '/': function(n1, n2) {
      return n1 / n2;
    },
    '+': function(n1, n2) {
      return n1 + n2;
    },
    '-': function(n1, n2) {
      return n1 - n2;
    }
  };


  function compute(equation) {
    if (arguments.length === 0 || equation === undefined) {
      throw new TypeException('Missing equation.');
    }
    var rpn = shunting.createRPN(equation);
    console.log('RPN: ' + rpn);
    var st = [];
    rpn.forEach(function(v) {
      if (/\d+/.test(v)) {
        st.push(v);
      } else {
        var n2 = st.pop();
        var n1 = st.pop();
        var r = calc[v](parseFloat(n1), parseFloat(n2));
        st.push(r);
      }
    });

    return st.pop();
  }

  module.exports = {
    compute: compute
  };

})();
