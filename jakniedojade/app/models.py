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

    def __str__(self):
        return self.name or '-'


class Connection(Core):
    name = models.CharField(max_length=80)
    image = models.ForeignKey(Image, blank=True, null=True)
    iframe_url = models.URLField(blank=True, null=True, max_length=1000)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name or '-'


class Vote(Core):
    connection = models.ForeignKey(Connection, related_name='votes')
    ip = models.CharField(max_length=45)
    user_agent = models.CharField(max_length=128, blank=True)
