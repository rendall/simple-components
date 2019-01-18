"use strict";
// buttonSelector is the selector that Microphone will use to find the toggle button
// audioSelector is the selector that Microphone will use to find the audio output
const Microphone = (buttonSelector, audioSelector) => {
    let audioRecorder = null;
    const onAudioDataAvailable = (e) => {
        const mimeType = e.target.mimeType; // default mimetype changes depending on browser
        const blob = new Blob([e.data], { type: mimeType });
        const audioURL = URL.createObjectURL(blob);
        const audio = document.getElementById(audioSelector);
        audio.controls = true;
        audio.src = audioURL;
        audio.play();
    };
    const onAudioStart = (e) => document.querySelector(buttonSelector).innerHTML = "STOP";
    const onAudioStop = (e) => document.querySelector(buttonSelector).innerHTML = "RECORD";
    const onRecordClick = (e) => {
        if (audioRecorder && audioRecorder.state === "recording") {
            audioRecorder.stop();
        }
        else
            navigator.mediaDevices.getUserMedia({ audio: true, video: false }) // getUserMedia works only in 'localhost' or 'https://'
                .then((stream) => {
                if (!audioRecorder) {
                    audioRecorder = new MediaRecorder(stream);
                    audioRecorder.addEventListener("start", onAudioStart);
                    audioRecorder.addEventListener("stop", onAudioStop);
                    audioRecorder.addEventListener("dataavailable", onAudioDataAvailable);
                }
                audioRecorder.start();
            })
                .catch(err => console.log('err', JSON.stringify(err)));
    };
    document.querySelector(buttonSelector).addEventListener('click', onRecordClick);
};
Microphone('button#record_btn', 'audio');
