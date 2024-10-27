const fingerprint = async () => {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl')
    const webglinfo = gl.getExtension('WEBGL_debug_renderer_info')
    
    const extras = [
        navigator.userAgent,
        navigator.language,
        navigator.hardwareConcurrency,
        screen.colorDepth,
        screen.pixelDepth,
        new Date().getTimezoneOffset(),
        gl.getParameter(webglinfo.UNMASKED_RENDERER_WEBGL),
        gl.getParameter(webglinfo.UNMASKED_VENDOR_WEBGL),
        navigator.deviceMemory,
        navigator.platform,
        navigator.vendor
    ]
    // audio fingerprinting
    const audio = new (window.audio || window.webkitaudio)()
    const oscillator = audio.createOscillator()
    const analyser = audio.createAnalyser()
    oscillator.connect(analyser)
    const data = new Float32Array(analyser.frequencyBinCount)
    analyser.getFloatTimeDomainData(data)
    extras.push(data.slice(0,5).join(''))
    
    const str = extras.join('§')
    const buffr = await crypto.subtle.digest('SHA-512', new TextEncoder().encode(str))
    const array = Array.from(new Uint8Array(buffr))
    const hex = array.map(b => b.toString(16).padStart(2,'0')).join('')
    
    return hex
}

const connectws = async (functionName) => {
    const fp = await fingerprint()
    const ws = new WebSocket(`ws://localhost:8000/ws/${fp}/functions/${functionName}`)
    
    ws.onopen = () => {
        console.log('Connected to websocket')
    }
    
    ws.onmessage = (event) => {
        console.log('Received:', event.data)
    }
    
    ws.onerror = (error) => {
        console.error('WebSocket error:', error)
    }
    
    return ws
}

// Remove the automatic connection
// connectws()
