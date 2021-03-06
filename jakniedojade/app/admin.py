from django.template.defaultfilters import truncatechars
from django.utils.html import format_html
from django.contrib import admin
from django.conf import settings

from app import models


def image_tag(url):
    return format_html(
        "<img src='{root}{url}' />".format(
            root=settings.MEDIA_URL or '',
            url=url,
        )
    )


@admin.register(models.Connection)
class ConnectionAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'name', 'show_image', 'short_description',
        'last_modified', 'created','connection_time', 'percent_more_than_2_transfer',
    )
    list_display_links = ('id', 'name')
    fields = ('name', 'image', 'iframe_url', 'description','connection_time', 'percent_more_than_2_transfer')

    def short_description(self, obj):
        return truncatechars(obj.description, 50)

    def show_image(self, obj):
        image_obj = obj.image
        if image_obj is None:
            return '-'
        image = image_obj.image
        if not image:
            return '-'
        return image_tag(image)


@admin.register(models.Image)
class ImageAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'name', 'show_image', 'last_modified', 'created'
    )
    list_display_links = ('id', 'name')
    fields = ('name', 'image')

    def show_image(self, obj):
        image = obj.image
        if image is None:
            return '-'
        return image_tag(image)


@admin.register(models.Vote)
class VoteAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'ip', 'connection', 'user_agent' 
    )
    list_display_links = ('id', 'ip')
    fields = ('ip', 'connection', 'user_agent')
    list_filter = ('connection',)

