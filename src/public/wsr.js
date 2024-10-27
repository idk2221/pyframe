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
        const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
        const httpProtocol = window.location.protocol === 'https:' ? 'https:' : 'http:'
        const hostname = window.location.hostname
        const port = ':8000'
        const baseHost = hostname === '0.0.0.0' || hostname === 'localhost' ? 'localhost' : hostname
        const fullHost = `${baseHost}${port}`

        const response = await fetch(`${httpProtocol}//${fullHost}/reciever/${fp}`)
        const data = await response.json()
        
        if (data.status === "websockets created") {
            const ws = new WebSocket(`${wsProtocol}//${fullHost}/ws/${fp}/functions/${functionName}`)
            
            ws.onopen = () => {
                console.log('Connected to websocket')
            }
            
            ws.onmessage = (event) => {
                console.log('Received:', event.data)
            }
            
            ws.onerror = (error) => {
                console.error('WebSocket error:', error)
                console.log('Connection details:', {
                    url: ws.url,
                    readyState: ws.readyState,
                    protocol: wsProtocol,
                    host: fullHost
                })
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
