# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-04-12 18:22
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0004_auto_20160412_1822'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vote',
            name='user_agent',
            field=models.CharField(max_length=128),
        ),
    ]