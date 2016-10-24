from django.db.models import Count, F
from django.shortcuts import get_object_or_404
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status as http_status

from .models import Connection, Image, Vote
from .serializers import ConnectionSerializer


class ConnectionViewSet(ReadOnlyModelViewSet):
    queryset = (
        Connection.objects
        .select_related('image')
        .annotate(
            vote_count=Count('votes'),
            image_url=F('image__image'),
        )
    )
    serializer_class = ConnectionSerializer


class AddVoteView(APIView):
    
    @staticmethod
    def get_client_ip(request):
        """
        http://stackoverflow.com/questions/4581789/how-do-i-get-user-ip-address-in-django
        """

        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip

    def get(self, request, connection_id):
        ip = self.get_client_ip(request)
        vote = Vote.objects.filter(ip=ip, connection_id=connection_id).first()
        if vote is None:
            return Response(status=http_status.HTTP_404_NOT_FOUND)
        else:
            return Response(status=http_status.HTTP_200_OK)

    def delete(self, request, connection_id):
        ip = self.get_client_ip(request)
        count = Vote.objects.filter(ip=ip, connection_id=connection_id).delete()[0]
        if count == 0:
            return Response(status=http_status.HTTP_404_NOT_FOUND)
        else:
            return Response(status=http_status.HTTP_200_OK)
    
    def post(self, request, connection_id):
        ip = self.get_client_ip(request)
        if ip is None:
            return Response(status=http_status.HTTP_403_FORBIDDEN)
        connection = get_object_or_404(Connection, pk=connection_id)
        vote = Vote.objects.filter(ip=ip, connection=connection).first()
        if vote is not None:
            return Response(status=http_status.HTTP_409_CONFLICT)
        Vote.objects.create(ip=ip, connection=connection)
        return Response(status=http_status.HTTP_201_CREATED)

