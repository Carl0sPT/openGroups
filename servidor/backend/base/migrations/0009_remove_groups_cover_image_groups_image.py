# Generated by Django 5.0.2 on 2024-02-18 19:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0008_groups_cover_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='groups',
            name='cover_image',
        ),
        migrations.AddField(
            model_name='groups',
            name='image',
            field=models.ImageField(null=True, upload_to='item_images/'),
        ),
    ]
