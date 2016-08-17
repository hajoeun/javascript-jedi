var results;
function assert(value, desc) {
    var li = document.createElement("li");
    li.className = value ? "pass" : "fail";
    li.appendChild(document.createTextNode(desc)); // jQuery의 $('.li').text()와 같은 역할을 수행하는 구문
    results.appendChild(li);
    return li;
}

function test(name, fn) {
    results = document.getElementById("results");

    if (!results) {
        results = document.createElement('ul');
        document.getElementsByTagName('body')[0].appendChild(results);
        results.setAttribute('id','results');
    }

    results = assert(true, name).appendChild(document.createElement("ul"));
    fn();
}