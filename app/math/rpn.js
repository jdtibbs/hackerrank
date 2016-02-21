// Reverse Polish Notation

var rpn = (function() {

  var calc = {
    '+': function(n1, n2) {
      return n1 + n2;
    },
    '-': function(n1, n2) {
      return n1 - n2;
    },
    '*': function(n1, n2) {
      return n1 * n2;
    },
    '/': function(n1, n2) {
      return n1 / n2;
    }
  };

  function createRpn(e) {
    var st = [];
    var eq = e.split(/\s+/);
    console.log('Infix: ' + eq);
    var v;
    var op;
    eq.forEach(function(v) {
      if (/\d+/.test(v)) {
        st.push(v);
      } else {
        if (/[\(\)\+\-*/]/.test(v)) {
          if (/\(/.test(v)) {
            if (op !== undefined) {
              st.push(op);
              op = undefined;
            }
          } else if (/\)/.test(v)) {
            if (op !== undefined) {
              st.push(op);
              op = undefined;
            }
          } else {
            if (op !== undefined && op !== v) {
              st.push(op);
            }
            op = v;
          }
        }
      }
    });
    st.push(op); // last op code.
    console.log('RPN: ' + st);
    return st;
  }

  function compute(infix) {
    //  TODO handle precedence.
    var rpn = createRpn(infix);
    var st = [];
    rpn.forEach(function(v) {
      if (/\d+/.test(v)) {
        st.push(v);
      } else {
        var r = st.reduce(function(p, c) {
          return calc[v](parseInt(p), parseInt(c));
        });
        st.length = 0;
        st.push(r);
      }
    });
    return st.pop();
  }

  return {
    compute: compute
  };
})();

// note: must have space between each element.
// console.log('Answer: ' + rpn.compute('1 +  2 / 3  + 4 + 5 * 4 / 10')); // = 4
console.log('Answer: ' + rpn.compute('1 + ( 2 / 3 ) + 4 + 5 * 4 / 10'));
