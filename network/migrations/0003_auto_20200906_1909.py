# Generated by Django 3.0.7 on 2020-09-06 19:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0002_post_profile'),
    ]

    operations = [
        migrations.RenameField(
            model_name='post',
            old_name='liked',
            new_name='likes',
        ),
    ]
