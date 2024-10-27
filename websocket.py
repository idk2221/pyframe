import websockets

ws = websockets.connect("ws://localhost:8000/ws/test")
def wait():

    recvv = await ws.recv()
    return recvv
print(recvv)