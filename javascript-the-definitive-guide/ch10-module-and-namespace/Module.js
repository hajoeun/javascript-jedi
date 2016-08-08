var Module;
if (Module && (typeof Module != "object" || Module.NAME))
    throw new Error("Namespace 'Module' already exists");

Module = {};

// 이 네임스페이스에 관한 메타 정보, 이름과 버전
Module.NAME = "Module";
Module.VERSION = 0.1;

// 외부로 내보낼 public 변수들의 목록
Module.EXPORT = ["require", "importSymbols"];

// 네임스페이스 내부에서 사용될 변수들 목록
Module.EXPORT_OK = ["createNamespace", "isDefined", "registerInitializationFunction", "runInitializationFunctions", "modules", "globalNamespace"];

Module.globalNamespace = this;
Module.modules = { "Module": Module };

Module.createNamespace = function(name, version) {
    if (!name) throw new Error("Module.createNamespace(): name required");
    if (name.charAt(0) == '.' ||
        name.charAt(name.length-1) == '.' ||
        name.indexOf("...") != -1)
        throw new Error("Module.createNamespace(): illegal name: " + name);

    var parts = name.split('.');

    var container = Module.globalNamespace;
    for (var i = 0; i < parts.length; i++) {
        var part = parts[i];

        if (!container[part]) container[part] = {};
        else if (typeof container[part] != "object") {
            var n = parts.slice(0,i).join('.');
            throw new Error(n + " already exists and is not an object");
        }
        container = container[part];
    }

    var namespace = container;

    if (namespace.NAME) throw new Error("Module " + name + " is already defined");

    namespace.NAME = name;
    if (version) namespace.VERSION = version;

    Module.modules[name] = namespace;

    return namespace;
};


Module.isDefined = function(name) {
    return name in Module.modules;
};

Module.require = function(name, version) {
    if (!(name in Module.modules))
        throw new Error("Module " + name + " is not defined");


    if (!version) return;

    var n = Module.modules[name];

    if (!n.VERSION || n.VERSION < version)
        throw new Error("Module " + name + " has version " + n.VERSION + " but version " + version + " or greater is required.");
};

Module.importSymbols = function(from) {
    if (typeof from == "string") from = Module.modules[from];
    if (!from || typeof from != "object")
        throw new Error("Module.importSymbols(): " + "namespace object required");

    var symbols = [];
    var firstsymbol = 1;

    if (arguments.length > 1 && typeof arguments[1] == "object") {
        if (arguments[1] != null) to = arguments[1];
        firstsymbol = 2;
    }

    for (var a = firstsymbol; a < arguments.length; a++)
        symbols.push(arguments[a]);

    if (symbols.length == 0) {
        if (from.EXPORT) {
            for (var i = 0; i < from.EXPORT.length; i++) {
                var s = from.EXPORT[i];
                to[s] = from[s];
            }
            return;
        }
        else if (!from.EXPORT_OK) {
            for(s in from) to[s] = from[s];
            return;
        }
    }

    var allowed;
    if (from.EXPORT || from.EXPORT_OK) {
        allowed = {};

        if (from.EXPORT)
            for (var i = 0; i < from.EXPORT.length; i++)
                allowed[from.EXPORT[i]] = true;
        if (from.EXPORT_OK)
            for (var i = 0; i < from.EXPORT_OK.length; i++)
                allowed[from.EXPORT_OK[i]] = true;
    }

    for(var i = 0; i < symbols.length; i++) {
        var s = symbols[i];
        if (!(s in from))
            throw new Error("Module.importSymbols(): symbol " + s + " is not defined");
        if (allowed && !(s in allowed))
            throw new Error("Module.importSymbols(): symbol " + s + " is not public and cannot be imported.");

        to[s] = from[s];
    }
};

Module.registerInitializationFunction = function(f) {
    Module._initfuncs.push(f);
    Module._registerEventHandler();
};

Module.runInitializationFunctions = function() {
    for(var i = 0; i < Module._initfuncs.length; i++) {
        try { Module._initfuncs[i](); }
        catch(e) { /*예외를 무시한다.*/ }
    }
    Module._initfuncs.length = 0;
};

Module._initfuncs = [];


Module._registerEventHandler = function() {
    var clientside = "window" in Module.globalNamespace && "navigator" in window;

    if (clientside) {
        if (window.addEventListener) {
            window.addEventListener("load", Module.runInitializationFunctions, false);
        }
        else if (window.attachEvent) {
            window.attachEvent("onload", Module.runInitializationFunctions);
        }
        else {
            window.onload = Module.runInitializationFunctions;
        }
    }

    Module._registerEventHandler = function() {};
};