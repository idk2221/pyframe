import asyncio
import websockets

async def wss():
    try:
        async with websockets.connect("ws://localhost:8000/ws/test") as ws:
            recvv = await ws.recv()
            print(f"{recvv}")
    except websockets.exceptions.ConnectionClosed:
        print("closed")
    except Exception as e:
        print(f"{e}")
asyncio.run(wss())
