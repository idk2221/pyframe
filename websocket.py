import websockets

ws = websockets.connect("ws://localhost:8000/ws/test")
async def wait():
    recvv = await ws.recv()
    return recvv

print(wait())