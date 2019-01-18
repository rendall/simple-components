"use strict";
const Microphone = () => {
    let audioRecorder = null;
    const onAudioDataAvailable = (e) => {
        const mimeType = e.target.mimeType; // default mimetype changes depending on browser
        const blob = new Blob([e.data], { type: mimeType });
        const audioURL = URL.createObjectURL(blob);
        const audio = document.getElementById('audio');
        audio.controls = true;
        audio.src = audioURL;
        audio.play();
    };
    const onAudioStart = (e) => document.querySelector('button#record_btn').innerHTML = "STOP";
    const onAudioStop = (e) => document.querySelector('button#record_btn').innerHTML = "RECORD";
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
    document.querySelector('button#record_btn').addEventListener('click', onRecordClick);
};
Microphone();
