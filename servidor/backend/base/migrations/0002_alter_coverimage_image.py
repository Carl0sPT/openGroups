# Generated by Django 5.0.2 on 2024-02-18 17:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='coverimage',
            name='image',
            field=models.ImageField(blank=True, upload_to='group_covers/'),
        ),
    ]
