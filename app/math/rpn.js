// Reverse Polish Notation

// console.clear();

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
    var v;
    var op;
    eq.forEach(function(v) {
      if (/\d+/.test(v)) {
        st.push(v);
      } else {
        if (/[\+\-*/]/.test(v)) {
          if (op === undefined) {
            op = v;
          } else if (op !== v) {
            st.push(op);
            op = v;
          }
        }
      }
    });
    st.push(op); // last op code.
    return st;
  }

  function compute(infix) {
    var rpn = createRpn(infix);
    var ar = [];
    var v;
    rpn.forEach(function(v) {
      if (/\d+/.test(v)) {
        ar.push(v);
      } else {
        var r = ar.reduce(function(p, c) {
          return calc[v](parseInt(p), parseInt(c));
        });
        ar.length = 0;
        ar.push(r);
      }
    });
    return ar.pop();
  }

  return {
    compute: compute
  };
})();

// note: must have space between each element.
console.log(rpn.compute('1 + 2 + 3 + 4 + 5 * 2 / 10'));
