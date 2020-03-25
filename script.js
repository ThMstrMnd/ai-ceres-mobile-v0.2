(async () => {
    const model = await mobilenet.load()
    const status = document.getElementById('status')
    const video = document.getElementById('video')
    const canvas = document.getElementById('canvas')
    const context = canvas.getContext('2d')

    const stream = await navigator.mediaDevices.getUserMedia ({
       audio: false,
       video: {
            facingMode: 'environment'
       }
    })

    video.srcObject = stream

    detectObject()

    async function detectObject() {
        context.drawImage(video, 0, 0, 500, 500)
        const classify = await model.classify(canvas)
        status.innerHTML = `Detected: ${classify[0].className} / ${classify[0].probability}`

        requestAnimationFrame(detectObject)
    }          
})()
