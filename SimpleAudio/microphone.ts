
declare class MediaRecorderOptions {
    public mimeType?: string;
    public audioBitsPerSecond?: number;
    public videoBitsPerSecond?: number;
    public bitsPerSecond?: number;
}

declare class MediaRecorder {
    public audioBitsPerSecond: number;
    public mimeType: string;
    public ondataavailable?: EventHandlerNonNull;
    public onerror?: EventHandlerNonNull;
    public onpause?: EventHandlerNonNull;
    public onresume?: EventHandlerNonNull;
    public onstart?: EventHandlerNonNull;
    public onstop?: EventHandlerNonNull;
    public state: string; // inactive, recording, paused
    public stream: MediaStream;
    public videoBitsPerSecond: number;

    public start: () => void;
    public stop: () => void;

    public addEventListener: (
        type: string,
        listener: ((evt: BlobEvent) => void) | null,
        options?: boolean | AddEventListenerOptions | undefined,
    ) => void;
    public removeEventListener: (
        type: string,
        listener?: ((evt: BlobEvent) => void) | null | undefined,
        options?: boolean | EventListenerOptions | undefined,
    ) => void;

    constructor(stream: MediaStream, options?: MediaRecorderOptions);
}

declare class BlobEvent {
    data: BlobPart;
    target: MediaRecorder;
}

// buttonSelector is the selector that Microphone will use to find the toggle button
// audioSelector is the selector that Microphone will use to find the audio output
const Microphone = (buttonSelector:string, audioSelector:string) => {
    let audioRecorder:any = null;

    const onAudioDataAvailable = (e: BlobEvent) => {
        const mimeType = e.target.mimeType; // default mimetype changes depending on browser
        const blob = new Blob([e.data], { type: mimeType });

        const audioURL = URL.createObjectURL(blob);
        const audio = document.getElementById(audioSelector)! as HTMLAudioElement;
        audio.controls = true;
        audio.src = audioURL;
        audio.play();
    }

    const onAudioStart = (e: any) => document.querySelector(buttonSelector)!.innerHTML = "STOP";
    const onAudioStop = (e: any) => document.querySelector(buttonSelector)!.innerHTML = "RECORD";

    const onRecordClick = (e: any) => {
        if (audioRecorder && audioRecorder.state === "recording") {
            audioRecorder.stop();
        }
        else navigator.mediaDevices.getUserMedia({ audio: true, video: false }) // getUserMedia works only in 'localhost' or 'https://'
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
    }
    document.querySelector(buttonSelector)!.addEventListener('click', onRecordClick);
};

Microphone('button#record_btn', 'audio');
