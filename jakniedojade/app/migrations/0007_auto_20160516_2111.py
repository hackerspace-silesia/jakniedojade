# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-05-16 21:11
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0006_auto_20160425_2251'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='connection',
            name='point_a',
        ),
        migrations.RemoveField(
            model_name='connection',
            name='point_b',
        ),
    ]