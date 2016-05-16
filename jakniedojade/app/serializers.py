from rest_framework.serializers import ModelSerializer
from rest_framework.fields import CharField, IntegerField
from app.models import Connection

class ConnectionSerializer(ModelSerializer):
    image_url = CharField()
    vote_count = IntegerField()
    class Meta:
        model = Connection
        fields = (
            'id', 'image_url', 'name', 'description',
            'vote_count', 'iframe_url',
        )
