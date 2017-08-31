const simpleSlider = document.querySelector("#simpleSlider");
const simpleThumb = document.querySelector("#simpleThumb");

const onMouseDownSlider = (e:MouseEvent) => {
    const hitX = e.clientX - simpleThumb.clientWidth/2;

    simpleThumb.setAttribute("style", `left: ${hitX}px;`);
    
    const onMouseUpSlider = (e:MouseEvent) => {
        document.removeEventListener('mouseup', onMouseUpSlider, true);
        simpleSlider.removeEventListener('mousemove', onMouseMoveSlider, true);
    }

    const onMouseMoveSlider = (e: MouseEvent) => {
        e.preventDefault(); 
    
        const div = e.currentTarget as HTMLElement;
        const touchX = e.clientX;
        const widthX = simpleSlider.clientWidth - simpleThumb.clientWidth;
    
        const minX = simpleThumb.clientWidth /2;
        const maxX = widthX + minX;
    
        const x = Math.max(Math.min(maxX, touchX), minX) - minX;
        simpleThumb.setAttribute("style", `left: ${x}px;`);

        const ratio = x / (widthX);

        simpleSlider.dispatchEvent(new CustomEvent('slide', {detail:ratio}));
    }

    document.addEventListener('mouseup', onMouseUpSlider, true);
    simpleSlider.addEventListener('mousemove', onMouseMoveSlider, true);    
}


const onTouchMoveSlider = (e: TouchEvent) => {
    e.preventDefault(); // prevents mouse event
    const div = e.currentTarget as HTMLElement;
    const touchX = e.touches.item(0).clientX;
    const widthX = simpleSlider.clientWidth - simpleThumb.clientWidth;

    const minX = simpleThumb.clientWidth /2;
    const maxX = widthX + minX;

    const x = Math.max(Math.min(maxX, touchX), minX) - minX;
    simpleThumb.setAttribute("style", `left: ${x}px;`);
}

simpleSlider.addEventListener('touchmove', onTouchMoveSlider, true);
simpleSlider.addEventListener('mousedown', onMouseDownSlider, true);
