// p.449 자동 생성되는 목차
function maketoc() {
    // 컨테이너를 찾는다 만약 컨테이너가 없으면 그냥 리턴한다.
    var container = document.getElementById('toc');
    if (!container) return;

    // 문서를 순회하면서 <h1>...<h6> 태그들을 배열에 집어넣는다.
    var sections = [];
    findSection(document, sections);

    //컨테이너 엘리먼트 앞에 앵커를 삽입한다.
    var anchor = document.createElement("a");
    anchor.name = "TOCtop";
    anchor.id = "TOCtop";
    container.parentNode.insertBefore(anchor, container);

    var sectionNumbers = [0,0,0,0,0,0];

    for (var s = 0; s < sections.length; s++) {
        var section = sections[s];

        var level = parseInt(section.tagName.charAt(1));
        if (isNaN(level) || level < 1 || level > 6) continue;

        sectionNumbers[level-1]++;
        for(var i = level; i < 6; i++) sectionNumbers[i] = 0;

        var sectionNumber = "";
        for (i = 0; i < level; i++) {
            sectionNumber += sectionNumbers[i];
            if (i < level-1) sectionNumber += ".";
        }

        var frag = document.createDocumentFragment();
        var span = document.createElement("span");
        span.className = "TOCSectNum";
        span.appendChild(document.createTextNode(sectionNumber));
        frag.appendChild(span);
        frag.appendChild(document.createTextNode(" "));
        section.insertBefore(frag, section.firstChild);

        var anchor = document.createElement("a");
        anchor.name = "TOC" + sectionNumber;
        anchor.id = "TOC" + sectionNumber;

        var link = document.createElement("a");
        link.href = "#TOCtop";
        link.className = "TOCBankLink";
        link.appendChild(document.createTextNode(maketoc.backlinkText));
        anchor.appendChild(link);

        section.parentNode.insertBefore(anchor, section);

        var link = document.createElement("a");
        link.href = "#TOC" +sectionNumber;
        link.innerHTML = section.innerHTML;

        var entry = document.createElement("div");
        entry.className = "TOCEntry TOCLevel" + level;
        entry.appendChild(link);

        container.appendChild(entry);
    }

    function findSection(n, sects) {
        for(var m = n.firstChild; m != null; m = m.nextSibling) {
            if (m.nodeType != 1) continue;
            if (m == container) continue;
            if(m.tagName == "P") continue;

            if(m.tagName.length == 2 && m.tagName.charAt(0) == "H") sects.push(m);
            else findSection(m, sects);
        }
    }
}

maketoc.backlinkText = "Contents";

if(window.addEventListener) window.addEventListener("load", maketoc, false);
else if(window.attachEvent) window.attachEvent("onload", maketoc);

