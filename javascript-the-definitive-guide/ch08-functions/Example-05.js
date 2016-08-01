// p.183 Function의 프로퍼티 사용 예제
function check(args) {
    var actual = args.length;
    var expected = args.callee.length;
    if (actual != expected) {
        throw new Error("Wrong number of arguments: expected: " + expected + "; actually passed " + actual);
    }
}

function f(x, y, z) {
    check(arguments);
    return x + y + z;
}