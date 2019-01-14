const displayImage = (value:{}) => {
    const imageDisplay:HTMLImageElement = document.querySelector('img#image-display') as HTMLImageElement;

    const imageLoadPromise = new Promise((resolve) => imageDisplay.addEventListener('load', resolve));

    const inputChangeEvent:Event = value as Event;
    const imageInput = (inputChangeEvent.target as HTMLInputElement)!;
    const image = imageInput.files && imageInput.files.length > 0 ? imageInput.files[0] : null;
    const URL = window.URL || (window as any).webkitURL;

    const imageSrc = URL.createObjectURL(image);
    imageDisplay.src = imageSrc;

    return imageLoadPromise.then((e) => URL.revokeObjectURL(imageSrc));
}

const imgToBase64 = (img:HTMLImageElement) => {
    const getExt = (fileName:string) => fileName.slice(fileName.lastIndexOf('.')).replace('.', '');
    const getType = (ext:string) => {
        switch (ext) {
            case "jpg":
                return "image/jpeg";
            default:
                return `image/${ext}`;
        }
    }
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!;

    canvas.width = img.width
    canvas.height = img.height
    ctx.drawImage(img, 0, 0)

    const fileName = (document.querySelector('#image-input')! as HTMLInputElement).value;

    const imageType = getType(getExt(fileName));
    const dataURL = canvas.toDataURL(imageType);
    const base64 = dataURL.slice(dataURL.indexOf('base64,') + 7);

    return base64;
}

const inputPhotoStream = new Promise(resolve => document.querySelector('#image-input')!.addEventListener("change", resolve));

inputPhotoStream.then(displayImage);

// This helps to change the call to action label from the confusing 
// 'choose file' to the more relevant 'take photo'
document.querySelector("button#photo-button")!.addEventListener("click", () => document.getElementById("image-input")!.click());