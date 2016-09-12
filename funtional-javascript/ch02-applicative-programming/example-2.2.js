// 응용형 프로그래밍


var nums = [1,2,3,4,5];

// map
function doubleAll(array) {
  return _.map(array, function(n) {return n*2;});
}
var doubleNums = doubleAll(nums);

// reduce
function average(array) {
  var sum = _.reduce(array, function(a, b) {return a+b;});
  return sum / _.size(array);
}
var averageNums = average(nums);

// filter
function onlyEven(array) {
  return _.filter(array, function(n) {
    return (n%2) === 0;
  });
}
var evenNums = onlyEven(nums);


var nums_2 = [100, 2, 25];

function div(x,y) {
  return x/y;
}

_.reduce(nums_2, div); // 2
var reduceRightNums = _.reduceRight(nums_2, div); // 0.125
