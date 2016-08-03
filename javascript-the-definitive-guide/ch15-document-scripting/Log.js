function log(category, message, object) {
    if (log.options[category + "Disable"]) return;

    var id = category + "_log";
    var c = document.getElementById(id);

    if (!c && log.options[category + "Enabled"]) {
        c = document.createElement("div");
        c.id = id;
        c.className = "log";
        document.body.appendChild(c);
    }

    if (!c) return;

    if (log.options.timestamp)
        message = new Date() + ": " + (message ? message : "");

    var entry = document.createElement("div");
    entry.className = category + "_message";

    if (message) {
        entry.appendChild(document.createTextNode(message));
    }

    if (object && typeof object == "object") {
        entry.appendChild(log.makeTable(object, 0));
    }

    c.appendChild(entry);
}

log.makeTable = function(object, level) {
    if (level > log.options.maxRecursion)
        return document.createTextNode(object.toString());

    // var table = document.createElement("table");
    // table.border = 1;
    //
    // var header = document.createElement("tr");
    // var headerName = document.createElement("th");
    // var headerType = document.createElement("th");
    // var headerValue = document.createElement("th");
    // headerName.appendChild(document.createTextNode("Name"));
    // headerType.appendChild(document.createTextNode("Type"));
    // headerValue.appendChild(document.createTextNode("Value"));
    // header.appendChild(headerName);
    // header.appendChild(headerType);
    // header.appendChild(headerValue);
    // table.appendChild(header);

    var table = make("table", {border:1}, make("tr", [make("th", "Name"), make("th", "Type"), make("th", "Value")]));

    // var table = maker("table"), tr = maker("tr"), th = maker("th");

    var names = [];
    for (var name in object) names.push(name);
    names.sort();

    for (var i = 0; i < names.length; i++) {
        var name, value, type;
        name = names[i];
        try {
            value = object[name];
            type = typeof value;
        }
        catch(e) {
            value = "<unknown value>";
            type = "unknown";
        }

        if (log.options.filter && !log.option.filter(name, value)) continue;

        if (type == "function") value = "{}";

        var row = document.createElement("tr");
        row.vAlign = "top";
        var rowName = document.createElement("td");
        var rowType = document.createElement("td");
        var rowValue = document.createElement("td");
        rowName.appendChild(document.createTextNode(name));
        rowType.appendChild(document.createTextNode(type));

        if (type == "object")
            rowValue.appendChild(log.makeTable(value, level+1));
        else
            rowValue.appendChild(document.createTextNode(value));

        row.appendChild(rowName);
        row.appendChild(rowType);
        row.appendChild(rowValue);

        table.appendChild(row);
    }

    return table;
};

log.options = {};

log.debug = function(message,object) { log("debug", message, object); };
log.warn = function(message,object) { log("warning", message, object); };



// p.445 Element 생성을 위한 유틸리티 함수
function make(tagname, attributes, children) {
    if (arguments.length == 2 &&
        (attributes instanceof Array || typeof attributes == "string")) {
        children = attributes;
        attributes = null;
    }

    var e = document.createElement(tagname);

    if (attributes) {
        for(var name in attributes) e.setAttribute(name, attributes[name]);
    }

    if (children != null) {
        if (children instanceof Array) {
            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                if (typeof child == "string")
                    child = document.createTextNode(child);
                e.appendChild(child);
            }
        }
        else if (typeof children == "string")
            e.appendChild(document.createTextNode(children));
        else e.appendChild(children);
    }

    return e;
}

// function maker(tag) {
//     return function(attr, kids) {
//         if (arguments.length == 1) return make(tag, attrs);
//         else return make(tag, attrs, kids);
//     }
// }