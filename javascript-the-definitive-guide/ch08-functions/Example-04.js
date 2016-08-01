// p.179 함수를 데이터로서 사용하기
function add(x,y) { return x + y; }
function subtract(x,y) { return x - y; }
function multiply(x,y)  { return x * y; }
function divide(x,y) { return x / y; }

function operate(operator, operand1, operand2) {
    return operator(operand1, operand2);
}

var i = operate(add, operate(subtract, 2, 3), operate(multiply, 4, 5));


// 위와 같은 동작을 하는 함수들을 메소드로 정의한다.
var operators = {
    add: function(x,y) {return x+y},
    subtract: function(x,y) {return x-y},
    multiply: function(x,y) {return x*y},
    divide: function(x,y) {return x/y},
    pow: Math.pow
};


function operate2(op_name, operand1, operand2) {
    if (typeof operators[op_name] == "function")
        return operators[op_name](operand1, operand2);
    else throw "unknown operator";
}

var j = operate2("add", "hello", operate2("add", " ", "world"));
var k = operate2("divide", 10, 2);

console.log(i, j, k);