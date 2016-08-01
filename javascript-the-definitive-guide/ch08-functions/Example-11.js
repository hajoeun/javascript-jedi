// p.194 클로저를 사용한 중단점 구현

function inspect(inspector, title) {
    var expression, result;

    if("ignore" in arguments.callee) return; // "ignore"라는 프로퍼티를 만들어서 중단점을 종료할 수 있다.

    while(true) {
        var message = "";

        if(title) message = title + "\n";

        if(expression) message += "\n" + expression + " ===>" + result + "\n";
        else expression = "";

        message += "Enter an expression to evaluate:";

        if (!expression) return;

        result = inspector(expression);
    }
}

function factorial(n) {
    var inspector = function($) { return eval($); };
    inspect(inspector, "Entering factorial()");

    var result = 1;
    while(n > 1) {
        result = result * n;
        n--;
        inspect(inspector, "factorial() loop");
    }

    inspect(inspector, "Exiting factorial()");
    return result;
}

console.log(factorial(5));