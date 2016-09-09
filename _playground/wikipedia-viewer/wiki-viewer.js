// 핸들링할 엘리먼트를 찾아서 가져온다.
var sBar = document.getElementById('search-bar'), // 검색바
tBtn = document.getElementById('toggle-btn'), // 토글 버튼
iBar = document.getElementById('input-bar'), // 인풋바(실제 검색창)
mBox = document.getElementById('msg-box'), // 메세지 박스
con = document.getElementsByClassName('contents')[0];

sBar.setAttribute('onclick', 'barAnimate.show()'); // 검색바에 애니메이션을 준다.

$('#input-bar').keypress(function(e) {
  if(e.keyCode === 13) { // 엔터키를 누르면
    wikiSearch($('#input-bar')[0].value); // input에 저장된 데이터를 위키에 검색한다.
    barAnimate.up();
  }
});

// 검색 함수
var wikiSearch = function(keyword) {
  $.ajax({
    url:'https://ko.wikipedia.org/w/api.php?action=opensearch&search='+ keyword +'&format=json&imlimit=20',
    dataType: 'jsonp',
    type: 'GET',
    success: function(data){
      dataCtr.main(data);
    }
  });
};

// 바의 애니메이션을 담당하는 객체
var barAnimate = {
  show:  function() { // bar가 나타나는 애니메이션 부분
    if(!sBar.style.width) {
      sBar.style.borderRadius = "20px";
      sBar.style.width = sBar.style.height = "40px";
    }
    if(!iBar.style.display) {
      var width = parseInt(sBar.style.width) + 10; // 스타일은 단위가 함께 표시되는데 여기서 숫자만 남기기 위해서 parseInt 메서드를 사용해서 숫자만 남기고 그 값을 갱신한다.

      if (width < 300) { // 바의 길이가 300이 되지 않았으면
        sBar.style.width = width + "px"; // 길이를 키운다.
        _.delay(arguments.callee, 10); // 재귀로 다시 호출해서 같은 작업을 반복한다.
      } else {
        toggle.on(); // 위의 작업이 완료되면 토글함수를 호출해서 내부의 인풋 엘리먼트와 버튼을 생성한다.
      }
    }
  },
  hide: function() { // bar가 사라지는 애니메이션 부분, 위의 메서드와 반대로 행동한다.
    if (iBar.style.display) {
      var width = parseInt(sBar.style.width) - 10;
      tBtn.style.display = "";

      if (width > 30) {
        sBar.style.width = width + "px";
        _.delay(arguments.callee, 10);
      } else {
        toggle.off();
      }
    }
    if (dataCtr.item[0]) dataCtr.delete(null, barAnimate.down);
  },
  up: function() { // bar의 높이를 올리는 애니메이션 부분
    if (!con.style.height) con.style.height = "15%";
    var pos = parseInt(con.style.height) + 5;
    if (pos < 100) {
      con.style.height = pos + "%";
      _.delay(barAnimate.up, 20);
    }
    document.getElementById('random-msg-box').style.display = "none";
  },
  down: function() { // bar의 높이를 낮추는 애니메이션 부분
    var pos = parseInt(con.style.height) - 5;
    if (pos > 15) {
      con.style.height = pos + "%";
      _.delay(barAnimate.down, 20);
    }
    document.getElementById('random-msg-box').style.display = "inherit";
  }
};

var toggle = {
  msg: ["아래를 클릭해 검색을 시작하세요", "이제 위키피디아를 탐험하세요"], // 메시지 창에 들어갈 내용을 담고 있는 배열
  on: function() { // 만약에 인풋바가 보이지 않는 상태였다면,
    tBtn.style.display = iBar.style.display = "inline"; // 인풋바와 토글버튼을 보여주고
    tBtn.setAttribute('onclick', 'barAnimate.hide()'); // 버튼에 함수를 부여하고
    sBar.setAttribute('onclick', ''); // 기존의 함수를 제거한다.
    mBox.innerText = this.msg[1];
  },
  off: function() {
    iBar.value = "";
    tBtn.style.display = iBar.style.display = ""; // 보이는 상태였다면, 보이지 않도록 바꿔주고
    sBar.setAttribute('onclick', 'barAnimate.show()'); // 검색바에 애니메이션을 준다.
    mBox.innerText = this.msg[0];
  }
};

// 검색 결과 보여주기 함수
var dataCtr = {
  item: document.getElementsByClassName('list-group-item'),
  main: function(data) {
    var item = dataCtr.item;
    if (item[0]) {
      dataCtr.delete(item);
      // // fadeout 애니메이션 구현 호출부
      // for (var i = 0; i < 10; i++){
      //   item[0].style.left = "0px";
      //   setTimeout(dataCtr.out(item[0]), 20);
      // }
    }
    if (!data[1][0]) {
      data[1][0] = "\"" + data[0] + "\"에 대한 검색 결과가 없습니다.";
      data[2][0] = "";
    }
    dataCtr.create(data);
  },
  create: function(data) {
    var i = 0;
    while (data[1][i]) newItem(i++);

    function newItem(i) {
      var item = document.createElement("a");
      item.className = "list-group-item";
      item.href = data[3][i];
      item.target = "_blank";
      // item.style.top = "500px"; // fadein 애니메이션 전처리 과정

      var heading = document.createElement("h4");
      heading.className = "list-group-item-heading";
      heading.innerText = data[1][i];

      var text = document.createElement("p");
      text.className = "list-group-item-text";
      text.innerText = data[2][i];
      item.appendChild(heading);
      item.appendChild(text);

      document.getElementsByClassName('list-group')[0].appendChild(item);
      // dataCtr.in(item); // fadein 애니메이션 콜 (동작에 이상이 있어서 주석처리)
    }
  },
  delete: function(elem, fn) {
    if (elem) {
      while(elem[0]) elem[0].remove();
    } else {
      while(dataCtr.item[0]) dataCtr.item[0].remove();
      fn();
    }
  },
  in: function(elem) {
    var pos = parseInt(elem.style.top) - 20;
    if (pos > 0) {
      elem.style.top = pos + "px";
      _.delay(dataCtr.in, 10, elem);
    }
  },
  out: function(elem) {
    var pos = parseInt(elem.style.left) + 20;
    if (pos < 1000) {
      elem.style.left = pos + "px";
      _.delay(dataCtr.out, 10, elem);
    } else {
      elem.remove();
    }
  }
};
