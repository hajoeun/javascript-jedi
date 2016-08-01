// p.177 매개변수의 데이터 타입에 따라 유연하게 대처하는 sum 함수
function flexisum(a) {
    var total = 0;
    for(var i = 0; i < arguments.length; i++) {
        var element = arguments[i];
        if (!element) continue; // 모든 null, undefined 매겨변수를 무시한다.

        // 매개변수의 데이터 타입에 따라 숫자 n으로의 변환 작업을 시도한다.
        var n;
        switch (typeof element) {
            case "number":
                n = element; // 변환이 필요없다.
                break;
            case "object":
                if (element instanceof Array) // 배열을 처리하기 위해 재귀 호출을 한다.
                    n = flexisum.apply(this, element);
                else n = element.valueOf(); // 다른 객체들에 대해선 valueOf 메소드를 호출한다.
                break;
            case "function":
                n = element(); // 함수 호출을 시도한다.
                break;
            case "string":
                n = parseFloat(element); // 문자열 파싱을 시도한다.
                break;
            case "boolean":
                n = NaN; // 불리언 값을 변환할 수는 없다.
                break;
        }

        if (typeof n == "number" && !isNaN(n)) total += n; // 유효한 숫자를 얻으면 이를 total에 더한다
        else throw new Error("sum(): " + element + " 을 숫자로 변환하는데 실패했습니다."); // 그렇지 않다면 에러를 보고한다.
    }
    return total;
}