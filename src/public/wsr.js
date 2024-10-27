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
    if (window.isSecureContext && crypto.subtle) {
        const buffr = await crypto.subtle.digest('SHA-512', new TextEncoder().encode(str))
        const array = Array.from(new Uint8Array(buffr))
        const hex = array.map(b => b.toString(16).padStart(2,'0')).join('')
        return hex
    } else {
        let hash = 0
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i)
            hash = ((hash << 5) - hash) + char
            hash = hash & hash 
        }
        return Math.abs(hash).toString(16)
    }
}
//thanks gpt<3
const connectws = async (functionName) => {
    const fp = await fingerprint()
    try {
        const response = await fetch(`http://localhost:8000/receiver/${fp}`)
        const data = await response.json()
        
        if (data.status === "websockets created") {
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
        } else {
            throw new Error('Failed to set up WebSocket endpoints')
        }
    } catch (error) {
        console.error('Error setting up connection:', error)
        throw error
    }
}

// Remove the automatic connection
// connectws()
