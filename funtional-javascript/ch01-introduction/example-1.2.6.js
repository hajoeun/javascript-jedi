// 무엇이 존재하는지 확인하기 위해 사용하는 함수 existy
function existy(x) { return x != null; } // 의도적으로 포괄적인 불일치 연산자(!=)를 사용한다. 덕분에 null과 undefined를 구분하지 않는다.

existy(null); // false
existy(undefined); // false
existy({}.notHere); // false
existy((function(){}())); // false
existy(0); // ture
existy(false); // true


// 어떤 것이 참인지 여부를 결정하는 함수 truthy
function truthy(x) { return (x !== false) && existy(x); } // x가 거짓이 아니고 존재한다면 참!

truthy(false); // false
truthy(undefined); // false
truthy(0); // true, 0이 참인 이유는 0 자체는 숫자값으로 참이기 때문이다. 0을 거짓으로 보길 원한다면 그렇게 설계하면 된다.
truthy(''); // true


// 특정 조건이 일치하면 특정 함수를 실행하는 함수
function doWhen(cond, action) {
  if(truthy(cond)) {
    return action();
  } else {
    return undefined;
  }
}

function executeIfHasField(target, name) {
  return doWhen(existy(target[name]), function() {
    var result = _.result(target, name);
    console.log(['The result is', result].join(' '));
    return result;
  });
}

executeIfHasField([1,2,3],'reverse'); // The result is 3,2,1
executeIfHasField({foo: 42}, 'foo'); // The result is 42
executeIfHasField([1,2,3], 'notHere'); // undefined
