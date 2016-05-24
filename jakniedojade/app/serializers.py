from rest_framework.serializers import ModelSerializer, SerializerMethodField
from rest_framework.fields import CharField, IntegerField
from django.conf import settings

from app.models import Connection

class ConnectionSerializer(ModelSerializer):
    image_url = SerializerMethodField()
    vote_count = IntegerField()
    
    def get_image_url(self, obj):
        return '{}/{}'.format(settings.MEDIA_URL, obj.image_url)

    class Meta:
        model = Connection
        fields = (
            'id', 'image_url', 'name', 'description',
            'vote_count', 'iframe_url',
        )
