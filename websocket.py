import websockets

ws = websockets.connect("ws://localhost:8000/ws/test")
recvv = await ws.recv()
print(recvv)