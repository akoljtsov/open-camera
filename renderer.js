const openCameraBtn = document.getElementById('open-camera');
const cameraStreamDiv = document.getElementById('camera-stream');
const video = document.getElementById('video');
const takePhotoBtn = document.getElementById('take-photo');
const canvas = document.getElementById('canvas');

openCameraBtn.addEventListener('click', async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        cameraStreamDiv.classList.remove('hidden');
    } catch (error) {
        console.error('Error accessing camera: ', error);
    }
});

takePhotoBtn.addEventListener('click', () => {
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    const dataURL = canvas.toDataURL();
    console.log('Photo taken: ', dataURL);
});
