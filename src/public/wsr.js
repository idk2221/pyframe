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
    let data = "audio didnt workout."
    extras.push(data)
    
    const str = extras.join('§')
    const buffr = await crypto.subtle.digest('SHA-512', new TextEncoder().encode(str))
    const array = Array.from(new Uint8Array(buffr))
    const hex = array.map(b => b.toString(16).padStart(2,'0')).join('')
    
    return hex
}
//thanks gpt<3
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
