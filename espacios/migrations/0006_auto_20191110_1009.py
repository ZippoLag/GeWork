# Generated by Django 2.1.10 on 2019-11-10 13:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('espacios', '0005_auto_20191101_1159'),
    ]

    operations = [
        migrations.CreateModel(
            name='Localidad',
            fields=[
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('created_by', models.CharField(blank=True, editable=False, max_length=255)),
                ('modified_at', models.DateTimeField(auto_now=True)),
                ('modified_by', models.CharField(blank=True, editable=False, max_length=255)),
                ('id_localidad', models.AutoField(primary_key=True, serialize=False)),
                ('nombre_localidad', models.CharField(max_length=50)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Pais',
            fields=[
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('created_by', models.CharField(blank=True, editable=False, max_length=255)),
                ('modified_at', models.DateTimeField(auto_now=True)),
                ('modified_by', models.CharField(blank=True, editable=False, max_length=255)),
                ('id_pais', models.AutoField(primary_key=True, serialize=False)),
                ('nombre_pais', models.CharField(max_length=50)),
                ('siglas', models.CharField(max_length=3)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Provincia',
            fields=[
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('created_by', models.CharField(blank=True, editable=False, max_length=255)),
                ('modified_at', models.DateTimeField(auto_now=True)),
                ('modified_by', models.CharField(blank=True, editable=False, max_length=255)),
                ('id_provincia', models.AutoField(primary_key=True, serialize=False)),
                ('nombre_provincia', models.CharField(max_length=50)),
                ('pais', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='espacios.Pais')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.AddField(
            model_name='localidad',
            name='provincia',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='espacios.Provincia'),
        ),
        migrations.AddField(
            model_name='cowork',
            name='localidad',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='espacios.Localidad'),
            preserve_default=False,
        ),
    ]