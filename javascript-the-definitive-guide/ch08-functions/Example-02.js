// p.176 매개변수의 데이터 타입을 체크하는 법 (배열 및 배열 유사 객체)
function sum(a) {
    if((a instanceof Array) || // 만약 배열이거나
        (a && typeof a == "object" && "length" in a)) { // 배열과 유사한 객체라면
        var total = 0;
        for(var i = 0; i < a.length; i++) {
            var element = a[i];
            if (!element) continue; // 모든 null, undefined 원소를 무시한다.
            if (typeof element == "number") total += element;
            else throw new Error("sum() : 모든 배열의 원소는 숫자여야 합니다.");
        }
        return total;
    }
    else throw new Error("sum(): 모든 배열의 원소는 반드시 숫자여야 함.");
}