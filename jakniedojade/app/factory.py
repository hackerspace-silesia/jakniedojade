import factory
from factory import django
from .models import Connection, Vote, Image


class ImageFactory(django.DjangoModelFactory):
    class Meta:
        model = Image


class VoteFactory(django.DjangoModelFactory):
    class Meta:
        model = Vote


class ConnectionFactory(django.DjangoModelFactory):
    class Meta:
        model = Connection


    image = factory.SubFactory(ImageFactory)


