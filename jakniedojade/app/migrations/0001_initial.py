# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-03-29 21:05
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Connection',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('last_modified', models.DateTimeField(auto_now=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('name', models.CharField(max_length=80)),
                ('point_a', models.FloatField(blank=True, null=True)),
                ('point_b', models.FloatField(blank=True, null=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('last_modified', models.DateTimeField(auto_now=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('name', models.CharField(max_length=80)),
                ('image', models.ImageField(blank=True, null=True, upload_to='connects')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Vote',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('last_modified', models.DateTimeField(auto_now=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('ip', models.IntegerField()),
                ('session', models.CharField(max_length=64)),
                ('connection', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.Connection')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.AddField(
            model_name='connection',
            name='image',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='app.Image'),
        ),
    ]
