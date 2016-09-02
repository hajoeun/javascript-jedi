var channels = (function() {
  var state = {"ESL_SC2" : {}, "OgamingSC2" : {}, "cretetion" : {}, "freecodecamp" : {}, "storbeck" : {}, "habathcx" : {}, "RobotCaleb" : {}, "noobs2ninjas" : {}};

  // 제이쿼리를 사용해서 데이터를 가져오는 방식
  // var setState = function(channel) {
  //   $.getJSON('https://api.twitch.tv/kraken/streams/'+ channel, function(data) { // 기본 api로부터 데이터를 가져오고
  //     state[channel] = data;
  //
  //     $.getJSON('https://api.twitch.tv/kraken/channels/'+ channel, function(data) { // 오프라인이면 이미지를 가져올 수 없는 채널들을 위해 다른 api로 가서 이미지 데이터를 가지고 온다.
  //       state[channel].logo = data.logo;
  //       load(channel, 0); // 여기서 0은 refresh의 0과 같은 의미
  //     });
  //   });
  // };

  // 순수한 자바스크립트를 이용하고 promise를 활용하는 방식
  var setState = function(channel) {
    httpGet('https://api.twitch.tv/kraken/streams/'+ channel) // 이 자리에는 반환된 프로미스 객체가 자리한다. (첫번째)
    .then(function(data) { // 첫번째 프로미스 객체의 함수가 성공적으로 동작하면, 그러면(then) 아래의 활동을 한다.
      state[channel] = data;


      // 오프라인이면 이미지를 가져올 수 없는 채널들을 위해 다른 api로 가서 이미지 데이터를 가지고 오기 위한 Ajax 호출
      httpGet('https://api.twitch.tv/kraken/channels/'+ channel) // 역시 프로미스 객체가 자리한다. (두번째)
      .then(function(data) { // 성공 (resolve)
        state[channel].logo = data.logo;
        load(channel, 0); // 여기서 0은 refresh의 0과 같은 의미
      },
      function (reason) { console.error('Logo image could\'t loaded', reason); } // 거절(reject)
    );


    },
    function(reason) { console.error('Channel state could\'t loaded', reason); } // 첫번째 프로미스 객체가 실패(거절)하면 에러를 출력한다.
    );
  };

  function httpGet(url) {
    return new Promise( function (resolve, reject) { // 프로미스, 특정 상황에 따라 행동할 양식에 대한 약속을 담은 객체 (첫번째 매개변수는 성공한 경우, 두번째는 실패한 경우에 실행된다.)
      var xhr = new XMLHttpRequest(); // Ajax 호출을 하기 위한 객체 선언

      xhr.onreadystatechange = function () { // readyState의 변화를 감지하는 메서드
        if (xhr.readyState === 4) { // 4는 응답 데이터를 모두 받았음을 의미한다. (0은 호출 전, 1은 열림, 2는 보냄, 3은 수신 중을 의미한다.)
          if (xhr.status === 200 && xhr.status < 300 || xhr.status === 304) { // 수신이 성공적이었을 경우의 상태값과 일치한다면
            resolve(JSON.parse(xhr.response)); // 약속한대로 성공했을 경우 사용할 함수를 반환한다.
          } else {
            reject(new Error(xhr.statusText)); // 약속한대로 실패했을 경우 사용할 함수를 반환한다.
          }
        }
      };

      xhr.onerror = function() { // 애초에 데이터 통신 자체가 실패했을 경우
        reject(new Error('XMLHttpRequest Error: ' + xhr.statusText));
      };

      xhr.open('get', url); // get 방식으로 url을 보낼 준비를 한다.
      xhr.send(null); // url에 실제 요청을 보낸다. 매개변수로 서버에 보낼 데이터를 적어줄 수 있다.
    });
  }


  var load = function(ch, type) { // 가져온 데이터를 html 코드에 로드하는 함수
    var ul = document.getElementsByClassName('list-group')[0],
    li = document.getElementById(ch);
    inner = "<img src='" + state[ch].logo + "' class='img-circle'></img> " + ch + // 온/오프라인에 상관없이 존재하는 엘리먼트
    (state[ch].stream ? //
      " [" + state[ch].stream.game + "] " + state[ch].stream.channel.status + " <span class='badge'>on</span>" // 온라인인 경우
      : "<span class='badge'>off</span>"); // 오프라인인 경우

      if (type === 1 && !state[ch].stream && li) { // 온라인 상태인 채널만 보여주기
        li.remove();
      } else if (type === 2 && state[ch].stream && li) { // 오프라인 상태인 채널만 보여주기
        li.remove();
      } else { // 모든 채널 보여주기
        if (li) { // 만약에 이미 해당 채널의 상태를 보여주는 요소가 있다면
          li.innerHTML = inner; // 갱신만 한다.
        } else { // 없다면
          li = document.createElement("a"); // 새로 만들어서
          li.id = ch; // id 값도 주고
          li.href = "https://www.twitch.tv/" + ch; // 링크도 걸어주고
          li.target = "_blank";
          li.innerHTML = inner; // 내용도 추가해준다.

          // 그리고 그 채널의 상태에 따라 다른 동작을 한다.
          if (inner.match(/off/g)) { // 오프라인인 채널이라면
            li.className = "list-group-item disabled"; // 비활성화된 상태로 보여주고
            ul.appendChild(li); // 가장 밑으로 붙여나간다.
          } else { // 온라인 상태인 채널이라면
            li.className = "list-group-item list-group-item-success"; // 활성화된 상태로 보여주고
            ul.insertBefore(li, ul.firstChild); // 가장 앞부분에 위치할 수 있도록 최상위 자식 엘리먼트 위에 올린다.
          }
        }
      }
    };

    var refresh = function(type) {
      if (type.data) type = type.data.param;

      for (var key in state) {
        if (type) { // 만약에 type에 관한 매개변수가 지정되어 있다면 기존에 저장된 데이터를 활용한다.
          load(key, type);
        } else { // 그렇지 않으면 데이터를 다시 가져오는 함수를 호출한다.
          setState(key);
        }
      }
    };

    refresh(0);

    return {
      getState: function() { return state; },
      refresh: refresh
    };
  })();

  $(document).ready(function() {
    $('#refresh-all').on('click', { param: 0 }, channels.refresh); // 클릭 이벤트가 발생했을 때 매개변수를 던질 수 있도록 만드는 방법
    $('#refresh-online').on('click', { param: 1 }, channels.refresh); // on() 메서드의 두번째 인자를 객체로 던지면 이벤트 객체에 data라는 객체로 형성되는데
    $('#refresh-offline').on('click', { param: 2 },  channels.refresh); // 이 data객체 내의 param이라는 프로퍼티를 매개변수로 사용하도록 코드를 짜면 된다.
  });
