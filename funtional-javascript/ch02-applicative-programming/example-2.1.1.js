// 명령형 프로그래밍 imperative programming
// 99병의 맥주라는 노래의 가사를 만드는 프로그램
var lyrics = [];
for (var bottles = 99; bottles > 0; bottles--) {
  lyrics.push(bottles + " bottles of beer on the wall");
  lyrics.push(bottles + " bottles of beer");
  lyrics.push("Take one down, pass it around");
  if (bottles > 1) {
    lyrics.push((bottles - 1) + " bottles of beer on the wall.");
  } else {
    lyrics.push("No more bottles of beer the wall!");
  }
}

// 함수형 프로그래밍으로 작성한 코드
function lyricsSegment(n) {
  return _.chain([])
        .push(n + " bottles of beer on the wall")
        .push(n + " bottles of beer")
        .push("Take one down, pass it around")
        .tap(function(lyrics) {
          if (n > 1)
            lyrics.push((n-1) + " bottles of beer on the wall.");
          else {
            lyrics.push("No more bottles of beer on the wall!");
          }
        })
        .value();
}

function song(start, end, lyricGen) {
  return _.reduce(_.range(start, end, -1),
      function(acc, n) {
        return acc.concat(lyricGen(n));
      },[]);
}

// song(10, 0, lyricsSegment); // 10병의 맥주 노래 가사가 만들어진다.


// 메타프로그래밍 meta programming

function Point2D(x,y) {
  this._x = x;
  this._y = y;
}

new Point2D(0,1); // {_x:0, _y:1}

function Point3D(x,y,z) {
  Point2D.call(this, x, y);
  this._z = z;
}

new Point3D(10, -1, 100); // {_x: 10, _y: -1, _z: 100}
