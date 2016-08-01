// p.185 [유용한 함수들] 객체용 함수들
// 객체 o의 열거 가능한 프로퍼티들의 이름을 담은 배열을 반환한다.
function getPropertyNames(o) {
    var r = [];
    for(name in o) r.push(name);
    return r;
}

// 객체 from의 열거 가능한 프로퍼티들을 객체 to로 복사한다.
function copyProperties(from, to) {
    if (!to) to = {};
    for (p in from) to[p] = from[p];
    return to;
}

// 객체 from의 열거 가능한 프로퍼티들을 객체 to로 복사하되, to에 의해 정의되지 않은 프로퍼티들만 복사한다.
function copyUndefinedProterties(from, to) {
    for (p in from) {
        if (!p in to ) to[p] = from[p];
    }
}