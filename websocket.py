import websockets

ws = websockets.connect("ws://localhost:8000/ws/test")
print(ws.text())