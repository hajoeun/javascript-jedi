// 필터 함수를 이용해서 원하는 값을 찾아내기

function findElement(arr, func) {
  return arr.filter(func)[0];
}

console.log(findElement([1, 2, 3, 4], function(num){ return num % 2 === 0; }));
