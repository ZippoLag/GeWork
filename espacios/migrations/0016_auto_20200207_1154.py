# Generated by Django 2.1.10 on 2020-02-07 14:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('espacios', '0015_auto_20200207_1150'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='dni_usuario',
            field=models.IntegerField(unique=True),
        ),
    ]
