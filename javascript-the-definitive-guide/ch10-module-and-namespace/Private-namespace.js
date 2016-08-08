var com; // 전역 변수를 담을 도메인을 만들어 준다.
if (!com) com = {};
else if (typeof com != "object")
    throw new Error("com already exist and is not an object");

if (!com.rabbylab) com.rabbylab = {}; // 도메인을 확장한다.
else if (typeof com.rabbylab != "object")
    throw new Error("com.rabbylab already exists and is not an object");

if (com.rabbylab.Class)
    throw new Error("com.rabbylab.Class already exists");

com.rabbylab.Class = {}; // 모듈을 위한 전역변수를 담을 최종 그릇

(function() { // 익명 함수로 호출해서 완전한 private 변수를 만든다.
    function define(data) { _counter++ }
    function provides(o, c) {}

    var _counter = 0; // private으로 사용될 변수

    function getCounter() { return _counter; } // 클로저를 발생시키는(?) 함수

    var public = com.rabbylab.Class; // public 네임스페이스로 보내기 위한 변수 그룹
    public.define = define;
    public.provides = provides;
    public.getCounter = getCounter;
})();

var Class = com.rabbylab.Class; // 익명 함수에 의해 public으로 보내진 클로저를 활용하기 위한 변수

Class.define(); // counter가 증가한다.
console.log(Class.getCounter()); // 1이 기록된다.
Class.define(); // counter가 증가한다.
console.log(Class.getCounter()); // 2가 기록된다.