// p.185 [유용한 함수들] 배열용 함수들
// 배열 a의 각 원소를 지정된 함수(predicate)로 전달한다.
function filterArray(/*Array*/ a, /*Boolean function*/ predicate) {
    var results = [];
    var length = a.length;

    for (var i = 0; i < length; i++) {
        var element = a[i];
        if (predicate(element)) results.push(element);
    }
    return results;
}
 // 배열 a의 원소를 지정된 함수 f로 전달하여 얻은 결과들을 원소로 하는 배열을 반환한다.
function mapArray(a, f) {
    var r = [];
    var length = a.length;
    for (var i = 0; i < length; i++) r[i] = f(a[i]);
    return r;
}