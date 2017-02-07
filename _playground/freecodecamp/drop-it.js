function dropElements(arr, func) {
  var idx = arr.findIndex(func);
  var idx2 = idx < 0 ? arr.length : idx;
  return arr.slice(idx2);
}

console.log(dropElements([1, 2, 3], function(n) {return n < 3; }));
console.log(dropElements([1, 2, 3, 4], function(n) {return n >= 3;}));
console.log(dropElements([0, 1, 0, 1], function(n) {return n === 1;}));