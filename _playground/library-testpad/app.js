
  var logpad = document.getElementById('log'),
      log = function(str) {
        // if (typeof str !== 'string') str = str.toString();
        // console.log(typeof str.toString()); // 객체나 배열도 출력되도록 수정해보자 그리고 함수만 실행했을 때 반환값도 출력해주자, 호이스팅 문제도 해결해야할듯...
        logpad.innerHTML += str + "<br>";
      };

  function runCode(value) {
    logpad.innerText = "";
    var code = value.replace(/\/\/.+\n?/g, '').replace(/\n/g, '') // 주석 제거 줄바꿈 제거
    .replace(/console./g, '').replace(/<</g,"log(").replace(/;?>>/g,");"); // 테스트의 편의를 위해 console.log 함수 대신 로그를 띄워주는 기능 추가 쌍꺽세 <<>> 안의 문자열을 바로 로그를 남김

    try {
      setTimeout(code, 0);
    } catch (e) {
      log("<error>" + e + "</error>");
    }

    // alert의 경우 외부 창에서 키가 기록되면서 발생하는 문제가 있어서 이를 해결하기 위해서 또 삭제를 해줌
    delete keys[13];
    delete keys[17];
  }

  var keys = {};
  $('#code').keydown(function(e) {
    keys[e.which] = true;
    if(keys[13] && keys[17]) runCode(this.value);
  });

  $('#code').keyup(function(e) {
    delete keys[e.which];
  });

  $(document).keyup(function(e) {
    delete keys[e.which];
  });
