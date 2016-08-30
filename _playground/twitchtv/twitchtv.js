var channels = (function() {
  var list = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"],
      state = {};
  var obj = {
        logList: function() {
          console.log(list);
        },
        logState: function() {
          console.log(state);
        },
        setState: function(channel) {
          $.getJSON('https://api.twitch.tv/kraken/streams/'+ channel, function(data) { // 기본 api로부터 데이터를 가져오고
            state[channel] = data;

            $.getJSON('https://api.twitch.tv/kraken/channels/'+ channel, function(data) { // 오프라인이면 이미지를 가져올 수 없는 채널들을 위해 다른 api로 가서 이미지 데이터를 가지고 온다.
              state[channel].logo = data.logo;
              load(channel, 0); // 여기서 0은 refresh의 0과 같은 의미
            });
          });
        },
        getState: function() {
          return state;
        },
        refresh: function(type) {
          for (var i in list) {
            if (!type) obj.setState(list[i]); // 만약에 type에 관한 매개변수가 지정되어 있지 않거나 0이면 데이터를 다시 가져오는 함수를 호출한다.
            else load(list[i], type); // 그렇지 않으면 기존에 저장된 데이터를 활용한다.
          }
        }
      };


  function load(ch, type) { // 가져온 데이터를 html 코드에 로드하는 함수
    var ul = document.getElementsByClassName('list-group')[0],
        li = document.getElementById(ch);
        inner = "<img src='" + state[ch].logo + "' class='img-circle'></img> " + ch + // 온/오프라인에 상관없이 존재하는 엘리먼트
                (state[ch].stream ? //
                " [" + state[ch].stream.game + "] " + state[ch].stream.channel.status + " <span class='badge'>on</span>" // 온라인인 경우
                 : "<span class='badge'>off</span>"); // 오프라인인 경우

    if (type === 1 && !state[ch].stream) { // 온라인 상태인 채널만 보여주기
      if (li) li.remove();
    } else if (type === 2 && state[ch].stream) { // 오프라인 상태인 채널만 보여주기
      if (li) li.remove();
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
  }

  obj.refresh(0);
  return obj;
})();

$(document).ready(function() {
  $('#refresh-all').on('click', function() {
    channels.refresh(0);
  });
  $('#refresh-online').on('click', function() {
    channels.refresh(1);
  });
  $('#refresh-offline').on('click', function() {
    channels.refresh(2);
  });
});
