// p.192 클로저

// 클로저가 없는 경우
uniqueID = function() {
    if (!arguments.callee.id) arguments.callee.id = 0;
    return arguments.callee.id++;
};

uniqueID.id = 1;
console.log(uniqueID()); // 1을 기록
console.log(uniqueID()); // 2를 기록

uniqueID.id = 0; // 외부에서 초기화 할 수 있다.
console.log(uniqueID()); // 0을 기록
console.log(uniqueID()); // 1을 기록


// 클로저를 이용해서 private 하게 만든 경우
closureID = (function(n) {
    var id = n || 0;

    return function () {
        return id++;
    };
}());

console.log(closureID()); // 0을 기록
console.log(closureID()); // 1을 기록

closureID.id = 0; // 외부에서 초기화 할 수 없다. 별도의 프로퍼티가 정의된다. 문맥이 다르다.
console.log(closureID()); // 2를 기록
console.log(closureID()); // 3을 기록

