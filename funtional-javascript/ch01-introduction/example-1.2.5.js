var csvFile = "name,age,hair\nMerble,32,red\nBob,27,blonde"; // 쉼표로 구분된 CSV 파일을 읽어온다.
var peopleTable = convertCSV(csvFile); // 관리하기 편한 테이블 형태로 변환하는 함수를 호출한다.
var mergeResults = _.zip; // 특정 테이블을 합치기 위한 함수를 언더스코어로부터 가져와서 할당한다.

console.log(peopleTable); // 기존의 테이블을 출력한다.

function convertCSV(str) { // CSV 파일을 테이블로 변환하는 함수
  return _.reduce(str.split('\n'), function(table, row) {
    table.push(_.map(row.split(','), function(c) { return c.trim(); }));
    return table;
  }, []);
}

function selectNames(table) { // 이름이 있는 열만을 보여주는 함수
  return _.rest(_.map(table, _.first));
}

function selectAges(table) { // 나이가 있는 열만을 보여주는 함수
  return _.rest(_.map(table, _.second));
}

function selecHairColor(table) { // 머리색이 있는 열만을 보여주는 함수
  return _.rest(_.map(table, _.last));
}

_.mixin({ // 두번쩨 요소를 가져올 수 있는 함수를 언더스코어에 정의한다.
  second: function(arr) {
    return _.last(_.first(arr, 2));
  }
});
