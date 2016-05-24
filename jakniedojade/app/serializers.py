from rest_framework.serializers import ModelSerializer
from rest_framework.fields import CharField, IntegerField
from app.models import Connection

class ConnectionSerializer(ModelSerializer):
    image_url = SerializerMethodField()
    vote_count = IntegerField()
    
    SerializerMethodField()

    class Meta:
        model = Connection
        fields = (
            'id', 'image_url', 'name', 'description',
            'vote_count', 'iframe_url',
        )
