/*
 * 클로저, setTimeout, 재귀함수, 자기 호출 등을 복합적으로 사용한 countDown 함수다.
 * 재귀함수를 구현한 연습을 하다가, 재밌게 연습할 수 있는 상황을 찾다보니 setTimeout을 활용해보고 싶었다.
 * 아무래도 특정 값을 지속적으로 감소시키는 형태로 함수를 구현하다보니 메모이제이션 기법이 사용되었다.
 * count가 메모이제이션의 메모 역할을 하고, setTimeout에서 함수를 재귀적으로 호출한다.
 * 무엇보다도 이것이 가능하도록 하는 것은 클로저의 존재다.
 */

var countDown = function(){ //자기 호출 함수에 의해 내부에 존재하는 countdown 함수가 반환된다. (클로저가 동작한다.)
    var count = '';

    var countdown = function(n) { // 실제로 수행되는 함수
        if(typeof count !== 'number') count = n; // 매개변수로 받은 값에 따라 count값을 정한다.
        console.log(count--); // 카운트 다운을 위한 숫자를 출력하고, 감소시킨다.

        if(count > 0) { // 재귀가 반복될 조건
            setTimeout(countdown, 1000); // 재귀로 countdown을 호출하는데, 1초의 간격을 둔다.
        } else {
            setTimeout(function() {
                console.log("Fire!!!");
            }, 1000); // 재귀가 끝날때 역시 시간 간격을 둔다. 이 코드를 통해 setTimeout은 시간을 앞에 두는 것임을 알 수 있다.
        }
    };

    return countdown;
}();

countDown(10);