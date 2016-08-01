// p.193 클로저를 사용한 private 프로퍼티
function makeProperty(o, name, predicate) {
    var value;

    // **get 메소드와 set 메소드가 외부 객체 obj 에 저장되지 않고 함수 내부에서만 정의된다.**
    o["get" + name] = function() { return value; };

    o["set" + name] = function(v) {
        if (predicate && !predicate(v))
            throw "set" + name + ": invalid value " + v;
        else
            value = v;
    };
}

var obj = {};

makeProperty(obj, "Name", function(x) { return typeof x == "string"; });

obj.setName("Frank");
console.log(obj.getName());
obj.setName(1); // 데이터 타입 에러가 기록된다.