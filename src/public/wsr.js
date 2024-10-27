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
    
    // Check if we're in a secure context and crypto.subtle is available
    if (window.isSecureContext && crypto.subtle) {
        const buffr = await crypto.subtle.digest('SHA-512', new TextEncoder().encode(str))
        const array = Array.from(new Uint8Array(buffr))
        const hex = array.map(b => b.toString(16).padStart(2,'0')).join('')
        return hex
    } else {
        // Fallback to a simple hash function for non-secure contexts
        let hash = 0
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i)
            hash = ((hash << 5) - hash) + char
            hash = hash & hash // Convert to 32-bit integer
        }
        return Math.abs(hash).toString(16)
    }
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
