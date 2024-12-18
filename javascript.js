let startBtn = document.getElementById("startBtn");
let stopBtn = document.getElementById("stopBtn");
let downloadBtn = document.getElementById("downloadBtn");
let status = document.getElementById("status");
let recordedVideo = document.getElementById("recordedVideo");

let recorder; // RecordRTC instance
let mediaStream; // Media stream for screen recording
let recordedBlob; // The final recorded video

// Start recording
startBtn.addEventListener('click', () => {
    navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
        .then(stream => {
            mediaStream = stream;
            recorder = RecordRTC(stream, {
                type: 'video',
                mimeType: 'video/webm',
                audioBitsPerSecond: 128000,
                videoBitsPerSecond: 2500000,
                canvas: {
                    width: 1280,
                    height: 720
                }
            });
            
            recorder.startRecording();
            startBtn.disabled = true;
            stopBtn.disabled = false;
            status.textContent = "Recording in progress...";

            // Show video preview while recording
            recordedVideo.srcObject = stream;
            recordedVideo.style.display = "block";
        })
        .catch(error => {
            console.error("Error accessing screen media:", error);
            status.textContent = "Error: Unable to access screen or camera.";
        });
});

// Stop recording
stopBtn.addEventListener('click', () => {
    recorder.stopRecording(() => {
        recordedBlob = recorder.getBlob();
        recordedVideo.src = URL.createObjectURL(recordedBlob);
        recordedVideo.style.display = "block";
        stopBtn.disabled = true;
        downloadBtn.disabled = false;
        status.textContent = "Recording stopped. Ready to download!";
        mediaStream.getTracks().forEach(track => track.stop());
    });
});

// Download video
downloadBtn.addEventListener('click', () => {
    let url = URL.createObjectURL(recordedBlob);
    let a = document.createElement('a');
    a.href = url;
    a.download = 'recorded_video.webm';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    status.textContent = "Download complete!";
    downloadBtn.disabled = true;
    startBtn.disabled = false;
});