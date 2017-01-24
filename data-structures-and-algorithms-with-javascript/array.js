var sentence = "Stay hungry, Stay foolish";
var words = sentence.split(" ");
var others = [];
console.log(words, others);

for(var i = 0; i < words.length; i++) {
  others[i] = words[i];
}

words[0] = "Keep";
console.log(words, others);

function isNumber(v) {
  return typeof v === "number"
}

console.log(words.every(isNumber));

