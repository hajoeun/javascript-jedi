// p.186 [유용한 함수들] 함수용 함수들
function bindMethod(o, f) {
    return function() { return f.apply(o, arguments) }
}

function bindArguments(f) {
    var boundArgs = arguments;
    return function() {
        var args = [];
        for (var i = 0; i < boundArgs.length; i++) args.push(boundArgs[i]);
        for (var i = 0; i < arguments.length; i++) args.push(arguments[i]);

        return f.apply(this, args);
    }
}
