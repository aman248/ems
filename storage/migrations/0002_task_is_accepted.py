# Generated by Django 3.1.4 on 2020-12-30 07:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('storage', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='is_accepted',
            field=models.BooleanField(default=False),
        ),
    ]
