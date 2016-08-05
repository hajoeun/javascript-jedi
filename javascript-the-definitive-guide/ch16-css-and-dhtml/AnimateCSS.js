// 첫번째 인자는 적용 대상이 되는 엘리먼트
// 두번째, 세번째 인자는 애니메이션 프레임 수와 간격
// 네번째는 어떤 애니메이션이 될지 정하는 자바스크립트 객체
// 다섯번째는 옵션; 애니메이션이 종료된 후에 실행할 함수
function animateCSS(element, numFrames, timePerFrame, animation, whendone) {
    var frame = 0;
    var time = 0;

    var intervalId = setInterval(displayNextFrame, timePerFrame);

    function displayNextFrame() {
        if (frame >= numFrames) {
            clearInterval(intervalId);
            if(whendone) whendone(element);
            return;
        }
        for (var cssprop in animation) {
            try {
                element.style[cssprop] = animation[cssprop](frame, time);
            } catch(e) {}
        }

        frame++;
        time += timePerFrame;
    }
}