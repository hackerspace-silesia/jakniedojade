from django.db import models
from django_resized import ResizedImageField


class Core(models.Model):
    id = models.AutoField(primary_key=True)
    last_modified = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True


class Image(Core):
    name = models.CharField(max_length=80)
    image = models.FileField(upload_to='connects', blank=True, null=True)
    #image = ResizedImageField(size=[300, 200], upload_to='connects', blank=True, null=True)

    def __str__(self):
        return self.name or '-'

    def __unicode__(self):
        return self.name or u'-'


class Connection(Core):
    name = models.CharField(max_length=80)
    image = models.ForeignKey(Image, blank=True, null=True)
    iframe_url = models.TextField(blank=True, null=True)
    description = models.TextField(blank=True)
    connection_time = models.CharField(max_length=100)
    percent_more_than_2_transfer = models.CharField(max_length=100)

    def __str__(self):
        return self.name or '-'

    def __unicode__(self):
        return self.name or u'-'


class Vote(Core):
    connection = models.ForeignKey(Connection, related_name='votes')
    ip = models.CharField(max_length=45)
    user_agent = models.CharField(max_length=128, blank=True)

