//함수의 네가지 패턴 실습

// 함수로서
function realFunction1(name) { // 함수 선언문
    console.log(name);
}

var realFunction2 = function(name) { // 함수 표현식, 함수 선언문을 할당하는 방법론
    console.log(name);
};

var realFunction3 = new Function("name", "console.log(name)"); // 함수 생성자

realFunction1("Function1");
realFunction2("Function2");
realFunction3("Function3");

// 메소드로서
var myObject = {
    name: "Method",
    sayName: function() {
        arguments[0] === undefined ? console.log(this.name) : console.log(this.name, arguments[0]);
    }
};

myObject.sayName();


// 생성자로서
var constructorFunction = function(name) {
    this.name = name;
};

var exampleInstance = new constructorFunction("Constructor");
console.log(exampleInstance.name);


// call(), apply()를 사용해서
var callAndApplyInstance = new constructorFunction("Call and Apply");
myObject.sayName.call(callAndApplyInstance, "call");
myObject.sayName.apply(callAndApplyInstance, ["apply"]);