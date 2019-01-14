"use strict";
const displayImage = (value) => {
    const imageDisplay = document.querySelector('img#image-display');
    const imageLoadPromise = new Promise((resolve) => imageDisplay.addEventListener('load', resolve));
    const inputChangeEvent = value;
    const imageInput = inputChangeEvent.target;
    const image = imageInput.files && imageInput.files.length > 0 ? imageInput.files[0] : null;
    const URL = window.URL || window.webkitURL;
    const imageSrc = URL.createObjectURL(image);
    imageDisplay.src = imageSrc;
    return imageLoadPromise.then((e) => URL.revokeObjectURL(imageSrc));
};
const imgToBase64 = (img) => {
    const getExt = (fileName) => fileName.slice(fileName.lastIndexOf('.')).replace('.', '');
    const getType = (ext) => {
        switch (ext) {
            case "jpg":
                return "image/jpeg";
            default:
                return `image/${ext}`;
        }
    };
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    const fileName = document.querySelector('#image-input').value;
    const imageType = getType(getExt(fileName));
    const dataURL = canvas.toDataURL(imageType);
    const base64 = dataURL.slice(dataURL.indexOf('base64,') + 7);
    return base64;
};
const inputPhotoStream = new Promise(resolve => document.querySelector('#image-input').addEventListener("change", resolve));
inputPhotoStream.then(displayImage);
// This helps to change the call to action label from the confusing 
// 'choose file' to the more relevant 'take photo'
document.querySelector("button#photo-button").addEventListener("click", () => document.getElementById("image-input").click());
