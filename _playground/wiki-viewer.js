// 서클을 제거하고 검색창을 보여주는 함수
function barAnimate() {
  var sBar = document.getElementById('search-bar');
  var barMethods = {
    show:  function() {
      var width = parseInt(sBar.style.width) + 10;

      if (width < 300) {
        sBar.style.width = width + "px";
        setTimeout(arguments.callee, 10);
      } else toggle(sBar);
    },
    hide: function() {
      var width = parseInt(sBar.style.width) - 10;

      if (width > 30) {
        sBar.style.width = width + "px";
        setTimeout(arguments.callee, 10);
      } else toggle(sBar);

    }
  };
  barMethods[document.getElementById('input-bar') ? 'hide' : 'show']();
}

var toggle = function(sBar) {
  var text = ["아래를 클릭해 검색을 시작하세요", "이제 위키피디아를 탐험하세요"],
      tBtn = document.getElementById('toggle-btn'),
      iBar = document.getElementById('input-bar'),
      elem = document.getElementById('msg-box');

  if (!(tBtn && iBar)) {
    tBtn = document.createElement('button');
    iBar = document.createElement('input');

    tBtn.id = 'toggle-btn';
    iBar.id = 'input-bar';

    sBar.appendChild(iBar);
    sBar.appendChild(tBtn);

    tBtn.setAttribute('onclick', 'barAnimate()');
    sBar.setAttribute('onclick', '');
  } else {

    tBtn.remove();
    iBar.remove();

    sBar.setAttribute('onclick', 'barAnimate()');
  }

  elem.innerText = elem.innerText === text[0] ? text[1] : text[0];
};
