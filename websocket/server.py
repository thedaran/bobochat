import asyncio
import websockets

connected_clients = set()

async def handle_client(websocket):
    connected_clients.add(websocket)
    try:
        async for message in websocket:
            await asyncio.gather(*[client.send(message) for client in connected_clients])
    finally:
        connected_clients.remove(websocket)

async def main():
    server = await websockets.serve(handle_client, "localhost", 6789)
    await server.wait_closed()

if __name__ == "__main__":
    asyncio.run(main())
