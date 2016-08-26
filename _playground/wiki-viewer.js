// 서클을 검색창으로 바꿔주는 애니메이션 함수
function barAnimate() {
  var sBar = document.getElementById('search-bar'), tBtn = document.getElementById('toggle-btn');   // 핸들링할 엘리먼트를 찾아서 가져온다.
  var barMethods = {
    show:  function() { // bar가 나타나는 애니메이션 부분
      var width = parseInt(sBar.style.width) + 10; // 스타일은 단위가 함께 표시되는데 여기서 숫자만 남기기 위해서 parseInt 메서드를 사용해서 숫자만 남기고 그 값을 갱신한다.

      if (width < 300) { // 바의 길이가 300이 되지 않았으면
        sBar.style.width = width + "px"; // 길이를 키운다.
        setTimeout(arguments.callee, 10); // 재귀로 다시 호출해서 같은 작업을 반복한다.
      } else {
        toggle(sBar); // 위의 작업이 완료되면 토글함수를 호출해서 내부의 인풋 엘리먼트와 버튼을 생성한다.
      }
    },
    hide: function() { // bar가 사라지는 애니메이션 부분, 위의 메서드와 반대로 행동한다.
      var width = parseInt(sBar.style.width) - 10;
      tBtn.style.display = "none";

      if (width > 30) {
        sBar.style.width = width + "px";
        setTimeout(arguments.callee, 10);
      } else {
        toggle(sBar);
      }
    }
  };
  barMethods[tBtn.style.display === "none" ? "show" : "hide"](); // 버튼의 존재로 어떤 동작을 할지 구분하여 호출한다.
}

var toggle = function(sBar) {
  var msg = ["아래를 클릭해 검색을 시작하세요", "이제 위키피디아를 탐험하세요"], // 메시지 창에 들어갈 내용을 담고 있는 배열
      tBtn = document.getElementById('toggle-btn'), // 토글 버튼
      iBar = document.getElementById('input-bar'), // 인풋바(실제 검색창)
      mBox = document.getElementById('msg-box'); // 메세지 박스

  if (iBar.style.display === "none") { // 만약에 인풋바가 보이지 않는 상태였다면,
    tBtn.style.display = iBar.style.display = "inline"; // 인풋바와 토글버튼을 보여주고
    tBtn.setAttribute('onclick', 'barAnimate()'); // 버튼에 함수를 부여하고
    sBar.setAttribute('onclick', ''); // 기존의 함수를 제거한다.
  } else {
    tBtn.style.display = iBar.style.display = "none"; // 보이는 상태였다면, 보이지 않도록 바꿔주고
    sBar.setAttribute('onclick', 'barAnimate()'); // 검색바에 애니메이션을 준다.
  }

  mBox.innerText = mBox.innerText === msg[0] ? msg[1] : msg[0]; // 메시지 창에 기존 내용에 따라 토글해준다.
};

$('#input-bar').keypress(function(e) {
  if(e.keyCode === 13) { // 엔터키를 누르면
    wikiSearch($('#input-bar')[0].value); // input에 저장된 데이터를 위키에 검색한다.
  }
});


// 검색 기능 구현 중
var wikiSearch = function(data) {
  var wikiUrl = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=images&titles=" + data + "&imlimit=20";
  console.log("wikiSearch@");

  // $.get(wikiUrl, function(j) {
  //   console.log(j);
  // });
};
