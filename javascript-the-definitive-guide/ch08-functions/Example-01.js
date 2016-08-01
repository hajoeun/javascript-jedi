function arraycopy (fromArray, fromStart, toArray, toStart, arrLength) {
    // 하나의 배열에서 다른 배열로 특정 길이만큼 복사하는 함수
}
function easycopy (args) {
    // 배열의 인자 값을 쉽게 호출하도록 돕는 함수
    arraycopy (args.from, args.fromStart || 0, args.to, args.toStart || 0, args.arrLength);
}

var a = [1,2,3,4];
var b = new Array(4);

easycopy({from:a, to:b, fromStart: 2, toStart: 1, arrLength: 2}); // 매개변수의 순서와 상관없이 호출이 가능하다