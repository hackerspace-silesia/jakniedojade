from django.db import models


class Core(models.Model):
    id = models.AutoField(primary_key=True)
    last_modified = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True


class Image(Core):
    name = models.CharField(max_length=80)
    image = models.ImageField(upload_to='connects', blank=True, null=True)


class Connection(Core):
    name = models.CharField(max_length=80)
    image = models.ForeignKey(Image, blank=True, null=True)
    iframe_url = models.URLField(blank=True, null=True)
    descriptions = models.TextField(blank=True)
    point_a = models.DecimalField(decimal_places=6, max_digits=9, blank=True, null=True)
    point_b = models.DecimalField(decimal_places=6, max_digits=9, blank=True, null=True)


class Vote(Core):
    connection = models.ForeignKey(Connection)
    ip = models.IntegerField()
    session = models.CharField(max_length=64)
