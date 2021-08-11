from channels.generic.websocket import AsyncWebsocketConsumer
import json


class ChatRoomConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = "game_{}".format(self.room_name)

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        username = text_data_json["username"]
        score = text_data_json["score"]

        await self.channel_layer.group_send(
            self.room_group_name,
            {"type": "turn", "username": username, "score": score},
        )

    async def turn(self, event):
        username = event["username"]
        score = event["score"]

        await self.send(text_data=json.dumps({"username": username, "score": score}))
