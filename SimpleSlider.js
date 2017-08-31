var simpleSlider = document.querySelector("#simpleSlider");
var simpleThumb = document.querySelector("#simpleThumb");
var onMouseDownSlider = function (e) {
    var hitX = e.clientX - simpleThumb.clientWidth / 2;
    simpleThumb.setAttribute("style", "left: " + hitX + "px;");
    var onMouseUpSlider = function (e) {
        document.removeEventListener('mouseup', onMouseUpSlider, true);
        simpleSlider.removeEventListener('mousemove', onMouseMoveSlider, true);
    };
    //const input = document.getElementById('bla') as HTMLInputElement;
    var onMouseMoveSlider = function (e) {
        e.preventDefault();
        var div = e.currentTarget;
        var touchX = e.clientX;
        var widthX = simpleSlider.clientWidth - simpleThumb.clientWidth;
        var minX = simpleThumb.clientWidth / 2;
        var maxX = widthX + minX;
        var x = Math.max(Math.min(maxX, touchX), minX) - minX;
        simpleThumb.setAttribute("style", "left: " + x + "px;");
        var ratio = x / (widthX);
        simpleSlider.dispatchEvent(new CustomEvent('slide', { detail: ratio }));
    };
    document.addEventListener('mouseup', onMouseUpSlider, true);
    simpleSlider.addEventListener('mousemove', onMouseMoveSlider, true);
};
var onTouchMoveSlider = function (e) {
    e.preventDefault(); // prevents mouse event
    var div = e.currentTarget;
    var touchX = e.touches.item(0).clientX;
    var widthX = simpleSlider.clientWidth - simpleThumb.clientWidth;
    var minX = simpleThumb.clientWidth / 2;
    var maxX = widthX + minX;
    var x = Math.max(Math.min(maxX, touchX), minX) - minX;
    simpleThumb.setAttribute("style", "left: " + x + "px;");
};
simpleSlider.addEventListener('touchmove', onTouchMoveSlider, true);
simpleSlider.addEventListener('mousedown', onMouseDownSlider, true);
