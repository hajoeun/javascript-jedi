var Shadows = {};

Shadows.add = function(element, shadows) {
    if (typeof element == "string")
        element = document.getElementById(element);

    // shadow 어트리뷰트의 값들을 정리해서 배열(args)로 저장한다.
    shadows = shadows.replace(/^\s+/, "").replace(/\s+$/, "");
    var args = shadows.split(/\s+/);

    var textnode = element.firstChild;

    element.style.position = "relative";

    var numshadows = args.length/3;
    for(var i  = 0; i < numshadows; i++) {
        var shadowX = args[i*3];
        var shadowY = args[i*3 + 1];
        var shadowColor = args[i * 3 + 2];

        var shadow = document.createElement("span");
        shadow.setAttribute("style", "position:absolute; " +
                            "left:" + shadowX + "; " +
                            "top:" + shadowY + "; " +
                            "color:" + shadowColor + ";");

        shadow.appendChild(textnode.cloneNode(false));
        element.appendChild(shadow);
    }

    var text = document.createElement("span");
    text.setAttribute("style", "position: relative");
    text.appendChild(textnode);
    element.appendChild(text);
};

Shadows.addAll = function(root, tagname) {
    if(!root) root = document;
    if(!tagname) tagname = '*';

    var elements = root.getElementsByTagName(tagname);
    for(var i = 0; i < elements.length; i++) {
        var shadow = elements[i].getAttribute("shadow");
        // shadow 어트리뷰트가 있을 때만 shadow를 추가한다.
        if (shadow) Shadows.add(elements[i], shadow);
    }
};