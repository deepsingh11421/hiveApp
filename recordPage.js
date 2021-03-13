var recordData = '';
var mediaRecorder;
var recordedBlobs;
var sourceBuffer;
var videoStream;

var uploadClicked = `
    <label for="video_file" style="width:100%;">
        <div class="uploadClicked">
        Upload from your device
        </div>
    </label>
    <div class="uploadClicked">
    Upload from Drive
    </div>
`;

var recordButton = `
    <div class="recordButton" onclick="toggleRecording()">
    </div>
`

var stopButton = `
    <div class="stopButton" onclick="stopRecording()">
    </div>
`

var readyUpload = `
    <div>
        Ready to upload?
    </div>
    <div class="videoButton">
        <div onclick="fileUpload()">Yes</div>
        <div onclick="reloadPage()">No</div>
    </div>
`

var recordUpload = `
    <div>
    Ready to upload?
    </div>
    <div class="videoButton">
    <div onclick="recordDataUpload()">Yes</div>
    <div onclick="reloadPage()">No</div>
    </div>
`

var mediaSource = new MediaSource();
mediaSource.addEventListener("sourceopen", handleSourceOpen, false);
var gumVideo = document.querySelector("video#videoTag");

navigator.mediaDevices.getUserMedia({audio: true, video: { width: 1280, height: 720,frameRate: { ideal: 15, max: 30 } }})
    .then(function(stream) {
        console.log("getUserMedia() got stream: ", stream);
        window.stream = stream;
        videoStream = stream;
        gumVideo.srcObject = stream;
    })
    .catch(function(err) { console.log(err.name + ": " + err.message); });

    function handleSourceOpen(event) {
        console.log("MediaSource opened");
        sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
        console.log("Source buffer: ", sourceBuffer);
    }

    function handleDataAvailable(event) {
        if (event.data && event.data.size > 0) {
        recordedBlobs.push(event.data);
        }
    }

    function handleStop(event) {
        console.log("Recorder stopped: ", event);
        console.log("Recorded Blobs: ", recordedBlobs);
    }

function uploadClick(){
    var container = document.getElementById('videoChoice');
    container.classList.add('backColor');
    container.innerHTML = uploadClicked;
}

var uploadFile = document.getElementById("video_file");
uploadFile.onchange = () => {
    videoStream.getTracks().forEach(function(track) {
        track.stop();
    });
    console.log("uploaded");
    var fdata = new FormData(document.getElementById("upload"));
    var fd;
    for (var pair of fdata.entries()) {
      fd = pair[1];
    }
    var container = document.getElementById('videoChoice');
    container.innerHTML = readyUpload;
    container.classList.remove('backColor');
    document.getElementById('readyVideo').src = window.URL.createObjectURL(fd);
    document.getElementById('readyVideo').style.display = 'block'
};

function fileUpload(){
    var aTag = document.createElement('a');
    aTag.href = './viewReport.html';
    var container = document.getElementById('videoChoice');
    container.appendChild(aTag);
    aTag.click();
}

function reloadPage(){
    var aTag = document.createElement('a');
    aTag.href = './recordPage.html';
    var container = document.getElementById('videoChoice');
    container.appendChild(aTag);
    aTag.click();
}

function recordClick(){
    var container = document.getElementById('videoChoice');
    container.innerHTML = recordButton
}

function toggleRecording(){
    var options = { mimeType: "video/webm", bitsPerSecond: 2500000 };
        recordedBlobs = [];
        try {
        mediaRecorder = new MediaRecorder(window.stream, options);
        } catch (e0) {
        console.log("Unable to create MediaRecorder with options Object: ", e0);
        try {
            options = { mimeType: "video/webm,codecs=vp9", bitsPerSecond: 2500000 };
            mediaRecorder = new MediaRecorder(window.stream, options);
        } catch (e1) {
            console.log("Unable to create MediaRecorder with options Object: ", e1);
            try {
            options = "video/vp8"; // Chrome 47
            mediaRecorder = new MediaRecorder(window.stream, options);
            } catch (e2) {
            alert(
                "MediaRecorder is not supported by this browser.\n\n" +
                "Try Firefox 29 or later, or Chrome 47 or later, with Enable experimental Web Platform features enabled from chrome://flags."
            );
            console.error("Exception while creating MediaRecorder:", e2);
            return;
            }
        }
        }
        console.log(
        "Created MediaRecorder",
        mediaRecorder,
        "with options",
        options
        );
        mediaRecorder.onstop = handleStop;
        mediaRecorder.ondataavailable = handleDataAvailable;
        mediaRecorder.start(10);
        console.log("MediaRecorder started", mediaRecorder);
        var container = document.getElementById('videoChoice');
        container.innerHTML = stopButton;
}

function stopRecording(){
    mediaRecorder.stop();
    if(videoStream.getTracks() !== undefined){
        videoStream.getTracks().forEach(function(track) {
            track.stop();
        });
    };
    var type = (recordedBlobs[0] || {}).type;
    recordData = new Blob(recordedBlobs, { type });
    document.getElementById('readyVideo').src = window.URL.createObjectURL(recordData);
    document.getElementById('readyVideo').style.display = 'block';
    var container = document.getElementById('videoChoice');
    container.innerHTML = recordUpload;
}

function recordDataUpload(){
    var aTag = document.createElement('a');
    aTag.href = './viewReport.html';
    var container = document.getElementById('videoChoice');
    container.appendChild(aTag);
    aTag.click();
}