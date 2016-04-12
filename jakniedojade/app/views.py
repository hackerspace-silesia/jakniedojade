from rest_framework.viewsets import ReadOnlyModelViewSet
from app.models import Connection, Image, Vote
from app.serializers import ConnectionSerializer
from django.db.models import Count, F


class ConnectionViewSet(ReadOnlyModelViewSet):
    queryset = (
        Connection.objects
        .select_related('image__image')
        .annotate(
            vote_count=Count('votes'),
            image_url=F('image__image'),
        )
    )
    serializer_class = ConnectionSerializer

